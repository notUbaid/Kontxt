---
title: E-Commerce Fundamentals
slug: e-commerce-fundamentals
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# E-Commerce Fundamentals

Before you touch a database schema or payment integration, you need a working mental model of how e-commerce actually functions as a system.

Most beginners think of an online store as "a website that sells things." That framing leads to missing entire subsystems — inventory state, order lifecycle, payment webhooks, tax obligations — until they become production problems.

This module builds the mental model that makes every architectural decision in Phase 2 make sense.

---

## The Core Loop

Every e-commerce transaction is the same loop, regardless of what you're selling:

```
Product exists in catalog
        ↓
Customer discovers it
        ↓
Customer adds to cart (intent, no commitment)
        ↓
Customer initiates checkout (soft commitment)
        ↓
Payment is captured (hard commitment)
        ↓
Inventory is decremented
        ↓
Order is created
        ↓
Fulfillment begins
        ↓
Customer receives goods
        ↓
(Optional) Return / refund
```

Each arrow in this diagram is a system transition. Each transition can fail. Your store's reliability is measured by how gracefully it handles failures at each step.

---

## Money Flow

Understanding how money actually moves tells you where to put your error handling.

```
Customer's bank
      ↓  (authorization — money held, not moved)
Stripe
      ↓  (capture — money moves, usually same time)
Stripe balance
      ↓  (payout — 2 business days by default)
Your bank account
```

**Authorization vs. Capture:**

| Term | What It Means | When It Happens |
|---|---|---|
| Authorization | Card is valid, funds are held | At checkout |
| Capture | Money actually moves | At checkout (usually instant) or at fulfillment |
| Settlement | Funds reach your account | 2 business days after capture |

For a standard store, authorization and capture happen together. You only split them if you're charging after fulfillment (e.g. pre-orders, made-to-order products).

**Refunds move money backwards through this chain.** Stripe returns funds to the customer's bank but keeps its transaction fee. Processing time for refunds: 5–10 business days to appear on the customer's card statement.

---

## Inventory as a State Machine

Inventory is not just a number. It's a state that multiple concurrent users can affect simultaneously.

```
in_stock (qty > 0)
      ↓ customer adds to cart
reserved (qty decremented in cart)
      ↓ payment captured
sold (qty permanently decremented)

      OR

reserved (qty decremented in cart)
      ↓ cart abandoned / payment fails
in_stock (qty restored)
```

**The race condition problem:**

Two customers simultaneously view the last unit of a product. Both add to cart. Both proceed to checkout. Both attempt payment at the same time.

If you decrement inventory only after payment:
- Both payments succeed
- You've sold one item twice
- One customer is disappointed, you issue a refund, you pay a Stripe fee

**Solutions:**

| Approach | How It Works | Tradeoff |
|---|---|---|
| **Reserve on add-to-cart** | Decrement immediately, restore on abandonment | Complex — requires cart expiry logic |
| **Reserve on checkout start** | Decrement when checkout begins | Simpler — short reservation window |
| **First-payment-wins** | Decrement only on payment success, refund the loser | Simplest code, worst UX |
| **Supabase row-level locking** | Database transaction ensures atomicity | Right answer for most personal stores |

For a personal store with low concurrent traffic, Supabase transactions with `SELECT FOR UPDATE` give you safe inventory decrement without complex reservation systems.

```sql
BEGIN;
SELECT inventory_quantity FROM product_variants
  WHERE id = $variant_id FOR UPDATE;
-- Check quantity > 0
UPDATE product_variants
  SET inventory_quantity = inventory_quantity - $quantity
  WHERE id = $variant_id AND inventory_quantity >= $quantity;
COMMIT;
```

---

## Order States — Why They Matter

An order is not just a database row. It's a workflow with defined valid transitions.

```
pending → confirmed → processing → shipped → delivered
                    ↘ cancelled
           ↘ cancelled (payment failed)
                                  ↘ refunded (post-shipment)
```

**Why invalid transitions matter:**

A `delivered` order should never move back to `processing`. A `refunded` order should never move to `shipped`. If your code doesn't enforce valid transitions, customer service mistakes and automation bugs will create impossible order states that break your reporting, your accounting, and your customer communications.

Enforce transitions in your business logic layer, not just in your UI.

---

## Webhooks — The Event System You Cannot Skip

Stripe does not call your API and wait. It fires events and expects your server to handle them asynchronously.

**Critical Stripe webhooks for a personal store:**

| Event | When It Fires | What You Must Do |
|---|---|---|
| `payment_intent.succeeded` | Payment captured | Create order, decrement inventory, send confirmation email |
| `payment_intent.payment_failed` | Payment declined | Notify customer, restore reserved inventory |
| `charge.dispute.created` | Customer filed chargeback | Flag order, gather evidence |
| `charge.refunded` | Refund processed | Update order status, notify customer |

> **Warning:** Never fulfill an order based on a client-side success callback. A user can fake a client-side success. Only fulfill orders when your webhook receives `payment_intent.succeeded` from Stripe's servers. This is not optional — it's the difference between a secure store and one that can be exploited to get free products.

**Webhook verification:**

Every Stripe webhook comes with a signature. Verify it before processing:

```ts
const sig = request.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  rawBody,        // must be raw bytes, not parsed JSON
  sig,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

If signature verification fails, return 400 and do nothing. Unverified webhooks could be forged.

---

## Tax Obligations

Tax is the most ignored e-commerce topic until it becomes a legal problem.

**The basics:**

| Situation | Obligation |
|---|---|
| Selling within your home country | Charge and remit VAT/GST/sales tax per local law |
| Selling internationally | Varies by country and order value (EU VAT thresholds, etc.) |
| Digital products | Often taxed differently from physical goods |

**For a personal store at launch:**

- If selling domestically only: configure Stripe Tax (free, adds ~0.5% per transaction for automatic calculation and filing assistance) or handle manually per your local rules
- If selling internationally: start with Stripe Tax enabled; consult a tax professional when revenue is meaningful

> **Warning:** "I'll figure out taxes later" is how people get unexpected tax bills. The longer you operate without proper tax collection, the larger the liability you're building. Stripe Tax is the lowest-effort solution — enable it before your first sale.

---

## The Admin Layer

Your store needs two user-facing systems: the customer storefront and the admin interface.

**What admin needs to handle:**

| Function | Complexity |
|---|---|
| View / search orders | Low |
| Update order status | Low |
| Manage inventory | Medium |
| Add / edit products | Medium |
| Process refunds | Low (via Stripe dashboard initially) |
| View revenue analytics | Medium |

For a personal project, start with Supabase's built-in table editor for data management and Stripe's dashboard for payment/refund management. Build a custom admin UI only when the built-in tools create a real operational bottleneck.

---

## What E-Commerce Is Not

These are common beginner misconceptions:

> **Cart = order.** It isn't. A cart is intent. An order is a completed transaction. Never treat cart data as fulfillment data.

> **Client-side payment success = payment success.** The client can be manipulated. Only trust Stripe's webhook.

> **Price shown = price stored.** Always re-validate price server-side at payment time. A user could manipulate a client-side cart to send a lower price to your API. Fetch the real price from your database at checkout.

> **Inventory decrement is simple.** Under concurrent load, naive decrement logic causes overselling. Use database transactions.

> **Fulfillment is automatic.** Orders need to be picked, packed, and shipped. This is a manual workflow unless you're using a 3PL (third-party logistics provider). Budget time for it.

---

## AI Prompt — Map Your E-Commerce System

<copy-prompt>
I'm building a personal e-commerce store and want to understand the complete system I need to build.

My store:
- Products: [what you sell]
- Fulfillment: [you ship yourself / dropship / print-on-demand / digital]
- Payment processor: Stripe
- Stack: Next.js + Supabase + Vercel

Map out the complete system I need to build:

1. Every subsystem my store requires (not just frontend pages — include backend logic, webhooks, emails, admin)
2. The data that flows between each subsystem
3. The failure points most likely to cause a real customer problem
4. Which Stripe webhooks I must handle and exactly what each one should trigger
5. How I should handle inventory for my fulfillment model
6. The minimum viable admin interface I need before launch
7. What I can skip entirely at launch and add later without a rewrite

Be specific to my fulfillment model. A store I ship myself has different operational needs than a print-on-demand store.
</copy-prompt>

---

## Fundamentals Checklist

- [ ] Core transaction loop understood (discovery → cart → checkout → payment → fulfillment)
- [ ] Authorization vs. capture distinction understood
- [ ] Inventory race condition risk understood — database transaction strategy chosen
- [ ] Order states defined with valid transitions enforced in code (not just UI)
- [ ] Stripe webhook handling planned — `payment_intent.succeeded` as the fulfillment trigger
- [ ] Webhook signature verification implemented (not optional)
- [ ] Price re-validated server-side at payment time (never trust client-side price)
- [ ] Tax strategy decided — Stripe Tax enabled before first sale
- [ ] Admin workflow planned — Supabase table editor + Stripe dashboard sufficient at launch
- [ ] Cart vs. order distinction clear in data model
