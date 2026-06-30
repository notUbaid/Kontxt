---
title: Store Fundamentals
slug: store-fundamentals
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 20–25 min
---

# Store Fundamentals

Before architecture, before code, before design — you need to understand what an e-commerce store actually is as a system. Not conceptually. Mechanically.

Most beginners think of a store as a product list with a checkout button. Engineers think of it as a set of interconnected state machines. At production scale, the difference between these two mental models is the difference between a store that ships cleanly and one that has undiscovered edge cases in its payment, inventory, and order logic.

---

## What a Store Actually Does

Every e-commerce store, regardless of size, performs the same core operations:

```
Customer browses products
       ↓
Customer selects product + variant
       ↓
Customer adds to cart (cart is created)
       ↓
Customer modifies cart (quantity, remove, coupon)
       ↓
Customer initiates checkout
       ↓
Store collects shipping info
       ↓
Store calculates shipping + tax
       ↓
Store collects payment
       ↓
Payment provider confirms or rejects
       ↓
Order is created (inventory decremented)
       ↓
Fulfilment begins (email sent, order tracked)
       ↓
Order ships → delivered → complete
```

Every phase of this flow has its own failure modes, state management requirements, and user experience decisions. In production, each failure mode also has a customer service, financial reconciliation, or compliance implication. You need to be aware of the full chain before you design any individual piece of it.

---

## The Five Core Entities

Every e-commerce system is built around five core data entities. Everything else hangs off these.

### 1. Product

A product is what you sell. It has a name, description, images, and belongs to one or more categories.

A product is **not** a purchasable item by itself — that is a variant.

### 2. Variant

A variant is the specific purchasable version of a product. A t-shirt product has variants: `[Small, Blue]`, `[Large, Red]`, etc.

Every variant has:
- Its own SKU (Stock Keeping Unit)
- Its own price (variants can be priced differently)
- Its own inventory count
- Its own weight/dimensions (for shipping calculations)

> [!WARNING]
> **The Variant Trap**: Skipping variants because your store starts with "simple products" is a technical debt trap. The moment you add sizes, colors, or bundles, you will need to retrofit variant support into your entire codebase — products, cart, checkout, inventory, and orders all change. In a production store handling real order volume, that refactor is extremely painful. Model variants from day one.

### 3. Cart

A cart is a temporary, session-scoped container holding variant quantities before checkout. It is not an order. It may never become an order.

Cart state is transient. Orders are permanent. This distinction matters for database design, analytics event tracking, and abandoned cart recovery flows.

### 4. Order

An order is created the moment payment is confirmed. It is an immutable record of what was purchased, at what price, with what shipping details. Orders should never be edited after creation — only statuses change.

In production, orders are financial records. They must be preserved accurately for accounting, tax reporting, and dispute resolution. Treat them accordingly.

### 5. Customer

A customer is a person who has completed at least one order. Visitors browsing your store are not yet customers.

At production scale, the customer entity carries significantly more state: order history, saved addresses, saved payment methods, loyalty data, email preferences, and segmentation attributes.

---

## The Inventory Problem

Inventory is one of the hardest parts of e-commerce to get right under load.

The core challenge: **two customers can add the last unit to their carts simultaneously**. If both complete checkout, you have oversold. At low volume this is embarrassing. At production volume it is a fulfilment and customer service crisis.

There are three standard strategies:

| Strategy | How It Works | Best For |
|---|---|---|
| **Reserve on Add-to-Cart** | Inventory decrements when added to cart, restores if cart expires | High-demand, limited inventory (drops, limited editions) |
| **Reserve on Checkout Start** | Inventory holds when checkout begins (15–30 min window) | Most standard production stores |
| **Reserve on Payment** | Inventory decrements only on confirmed payment | Digital goods, print-on-demand |

For most production stores, **Reserve on Checkout Start** is the pragmatic choice. It prevents the most common oversell scenario while keeping catalog inventory counts accurate for browsing customers.

> [!IMPORTANT]
> Whichever strategy you choose, implement a **cart expiry job** — a background process that restores inventory from abandoned carts after the hold window expires. Without this, inventory slowly leaks into phantom holds.

---

## Money Is Not a Float

> [!WARNING]
> Never store prices or monetary amounts as floating-point numbers.
>
> `0.1 + 0.2 = 0.30000000000000004` in JavaScript and most languages.
>
> Store all money as **integers in the smallest currency unit** (cents for USD, paise for INR). Display by dividing. Calculate by multiplying.

```
// ❌ Wrong
price: 29.99

// ✅ Correct
price: 2999  // stored as paise/cents, displayed as ₹29.99 / $29.99
```

This is non-negotiable. Getting this wrong causes real financial discrepancies that compound with order volume — and are extremely difficult to audit and correct retroactively.

---

## Tax and Shipping Are Not Simple

Two things consistently underestimated at the architecture stage:

**Tax** is jurisdiction-dependent. The tax rate for an order depends on where the customer is located, what product category it is, and sometimes the seller's nexus. For a domestic-only production store with simple scope, a destination-based approach or a tax automation service (TaxJar, Avalara) is appropriate. Never hardcode tax rates — jurisdiction rules change.

**Shipping** is weight + dimensions + origin + destination + carrier. Unless you are using flat-rate or free shipping, real-time carrier rates require API integration (ShipStation, EasyPost, Shippo). Real-time rates are the right default for a production store handling real volume — flat-rate shipping at scale means either losing money on heavy orders or overcharging customers on light ones.

---

## The Order State Machine

An order moves through states. Never treat order status as a free-text field — it is a state machine with valid transitions. In production, invalid state transitions cause fulfilment errors, incorrect payment holds, and broken customer communications.

```
pending_payment
      ↓
   paid
      ↓
processing
      ↓
 shipped
      ↓
 delivered
      ↓
 complete

(At any point before shipped) → cancelled
(After delivered, within return window) → return_requested → returned → refunded
(Payment failure) → payment_failed → (retry or cancelled)
```

Invalid transitions (e.g., jumping from `pending_payment` to `delivered`) should be impossible in your data model, not just in your UI. Enforce this at the service layer.

---

## Idempotency in Payment Flows

At production scale, payment webhooks can be delivered multiple times (network retries, provider failures, infrastructure restarts). Your order creation and payment confirmation logic must be **idempotent** — processing the same webhook twice must produce the same result, not two orders or two inventory decrements.

```
// Idempotency check before processing
if (order_already_exists_for_payment_intent) {
  return order  // skip creation, return existing record
}
create_order()
```

This is a production requirement, not an optimisation. Failing to implement idempotency leads to duplicate orders, double-charged customers, and inventory errors that are difficult to diagnose.

---

## Fundamentals Checklist

Before moving to Phase 1, confirm you understand these:

- [ ] I understand the difference between a product and a variant — and will model variants from day one
- [ ] I have chosen my inventory reservation strategy and know I need a cart expiry background job
- [ ] I will store all prices as integers (cents/paise), not floats
- [ ] I understand that a cart is temporary and an order is a permanent financial record
- [ ] I have decided on my shipping strategy (flat-rate, free, or real-time carrier rates)
- [ ] I understand that order status is a state machine with enforced valid transitions
- [ ] I know my tax approach and will not hardcode rates
- [ ] I understand that payment webhooks must be handled idempotently

---

## AI Prompt — Validate Your Store Model

```prompt
I am building a production e-commerce store with the following characteristics:

- Products: [brief description, e.g. "physical apparel, ~50 SKUs, size and color variants"]
- Inventory: [limited / unlimited / print-on-demand / digital]
- Shipping: [domestic only / international / flat-rate / real-time carrier rates]
- Tax: [single country / multi-region / tax automation service]
- Currency: [INR / USD / multi-currency]
- Expected order volume: [e.g. "target 200 orders/month within 6 months"]

Based on this, tell me:
1. Which inventory reservation strategy fits my use case and expected volume
2. What order statuses I actually need (remove unnecessary ones for my model)
3. What my payment webhook idempotency approach should look like
4. Any complexity I am likely underestimating for my specific setup at production scale
5. What background jobs I will need from day one (not just cart expiry — all of them)

Be direct. Point out the production-scale traps I might be walking into.
```

---

## What Comes Next

You now have a mechanical model of what you are building. Every design and architecture decision in the phases ahead maps back to these fundamentals.

In Phase 1, you will design the customer-facing experience. In Phase 2, you will architect the system that makes these fundamentals production-ready at scale.

**Next: Business Definition →**
