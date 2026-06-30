---
title: Inventory Architecture
slug: inventory-architecture
phase: Phase 2
mode: personal
projectType: e-commerce
estimatedTime: 25–35 min
---

# Inventory Architecture

Inventory is the part of e-commerce architecture that looks simple until it isn't.

A counter that goes down when something sells — that's the idea. The reality involves concurrent purchases, cart reservations, failed payments, returns, manual adjustments, and the question of what happens when two people buy the last unit at the same time.

Get inventory wrong and you oversell. Overselling means fulfillment failures, refunds, unhappy customers, and Stripe dispute fees. This module covers the architecture that prevents that.

---

## What Inventory Actually Tracks

Inventory is not one number. It's three.

```
on_hand        →  physical units you have right now
reserved       →  units held in active carts / pending checkouts
available      →  on_hand - reserved (what customers can actually buy)
```

Most beginner stores only track `on_hand` and decrement it at purchase. This works until two customers check out simultaneously.

**For a personal project at low volume**, tracking `on_hand` with database-level locking is sufficient. Explicit `reserved` tracking adds complexity that's only worth it at scale.

---

## The Oversell Problem

```
inventory_quantity = 1

User A adds to cart → reads quantity: 1 ✓
User B adds to cart → reads quantity: 1 ✓ (read before A's decrement)

User A completes payment → quantity becomes 0
User B completes payment → quantity becomes -1
```

Both orders succeed. You have one item. You've sold it twice.

**The solution: atomic database operations.**

Never read quantity, check it in application code, then update. Do it in one atomic transaction.

```sql
-- Safe inventory decrement
UPDATE product_variants
SET inventory_quantity = inventory_quantity - $quantity
WHERE id = $variant_id
  AND inventory_quantity >= $quantity
  AND inventory_policy = 'deny'
RETURNING inventory_quantity;
```

If this returns zero rows, the update failed — stock is insufficient. Reject the order. This entire operation is atomic at the database level — no race condition possible.

---

## Inventory Schema

Extend the `product_variants` table from the Product Architecture module:

```sql
-- Already on product_variants:
inventory_quantity  integer DEFAULT 0
inventory_policy    text DEFAULT 'deny'  -- deny | continue

-- Add for movement tracking:
CREATE TABLE inventory_movements (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid()
  variant_id    uuid NOT NULL REFERENCES product_variants(id)
  quantity      integer NOT NULL   -- positive = stock in, negative = stock out
  reason        text NOT NULL      -- sale | return | adjustment | restock
  reference_id  uuid               -- order_id, return_id, etc.
  note          text
  created_at    timestamptz DEFAULT now()
  created_by    uuid               -- admin user id
);
```

**Why track movements?**

Without a movement log, you have a number. With it, you have an audit trail. When your inventory shows 3 units but you expected 8, the movement log tells you exactly what happened — 2 sold, 1 returned, 2 manually adjusted by admin.

This is essential for any store operating beyond a spreadsheet.

---

## Inventory Lifecycle

```
Restock (purchase / manufacture)
        ↓ +quantity movement logged
    on_hand increases

Customer purchases
        ↓ -quantity movement logged (reason: sale)
    on_hand decreases

Payment fails / order cancelled
        ↓ +quantity movement logged (reason: adjustment)
    on_hand restored

Customer returns item
        ↓ +quantity movement logged (reason: return)
    on_hand increases (if item is resaleable)
```

Each state change creates an `inventory_movements` record. The current `inventory_quantity` on `product_variants` is your fast-read cache. The movements table is your source of truth for reconciliation.

---

## Low Stock and Out-of-Stock Handling

### Out-of-Stock — Three Behaviors

| Behavior | When to Use | Implementation |
|---|---|---|
| **Block purchase** | Physical goods, limited stock | `inventory_policy = 'deny'`, hide/disable Add to Cart |
| **Allow backorder** | Made-to-order, pre-orders | `inventory_policy = 'continue'`, show "Ships in X weeks" |
| **Notify me** | High-demand, will restock | Capture email, trigger when qty > 0 |

Never silently fail. If a customer adds an out-of-stock item to cart and tries to check out, give them a clear, specific error — not a generic "something went wrong."

### Low Stock Signals

Show low stock warnings on the product page when quantity is low. This is a legitimate urgency signal — not a dark pattern.

```
qty > 10   → no indicator
qty 4–10   → "Only X left"
qty 1–3    → "Only X left — selling fast"
qty = 0    → "Out of stock" + Notify Me
```

Thresholds depend on your typical sales velocity. Adjust per product if needed.

---

## Cart Reservation — Should You Implement It?

Cart reservation holds inventory for users who have added to cart but not yet purchased.

| Approach | Complexity | Recommended |
|---|---|---|
| **No reservation** | Low | Yes, for most personal stores |
| **Checkout-time reservation** | Medium | Yes, if oversell risk is real |
| **Add-to-cart reservation** | High | No, unless high-demand drops |

**No reservation (recommended for personal stores):**
- Inventory only decrements when payment is captured
- Simple — no expiry logic, no cron jobs
- Risk: two users can have the same item in cart, but only one can complete checkout
- The checkout failure is handled with a clear error message

**Checkout-time reservation (if needed):**
- Reserve inventory when customer begins checkout
- Release after 15 minutes if checkout isn't completed
- Requires a background job or Supabase Edge Function to expire reservations

```sql
-- Reserved inventory table (only if implementing reservation)
cart_reservations
  id          uuid PRIMARY KEY
  variant_id  uuid NOT NULL REFERENCES product_variants(id)
  quantity    integer NOT NULL
  session_id  text NOT NULL
  expires_at  timestamptz NOT NULL  -- now() + interval '15 minutes'
  created_at  timestamptz DEFAULT now()
```

For a personal store with low concurrent traffic, skip reservation entirely. Implement it when you have real oversell incidents, not in anticipation of them.

---

## Stock Validation at Checkout

Regardless of your reservation strategy, always validate stock server-side at payment time.

```ts
// In your checkout API route, before creating payment intent
async function validateStockBeforePayment(items: CartItem[]) {
  for (const item of items) {
    const { data: variant } = await supabase
      .from('product_variants')
      .select('inventory_quantity, inventory_policy, title')
      .eq('id', item.variantId)
      .single();

    if (
      variant.inventory_policy === 'deny' &&
      variant.inventory_quantity < item.quantity
    ) {
      throw new Error(
        `"${item.title}" is no longer available in the requested quantity.`
      );
    }
  }
}
```

Run this immediately before creating the Stripe PaymentIntent. If it throws, return the error to the customer before any charge attempt. Never charge a customer for something you can't fulfill.

---

## Admin Inventory Management

Your admin interface needs these inventory operations:

| Operation | Trigger | What It Does |
|---|---|---|
| **Restock** | New stock arrives | Increases qty, logs `restock` movement |
| **Manual adjustment** | Correction, damage, loss | Changes qty by delta, logs `adjustment` movement with note |
| **View history** | Reconciliation | Shows all movements for a variant |
| **Export** | Accounting | CSV of current stock and recent movements |

At launch, Supabase's table editor is sufficient for all of these. Build a custom admin UI when manual editing becomes error-prone or time-consuming.

---

## Webhook-Driven Inventory Decrement

Never decrement inventory on client-side checkout completion. Decrement only when the Stripe webhook confirms payment.

```ts
// In your Stripe webhook handler
if (event.type === 'payment_intent.succeeded') {
  const paymentIntent = event.data.object;
  const orderId = paymentIntent.metadata.order_id;

  await supabase.rpc('decrement_inventory_for_order', { order_id: orderId });
}
```

Create a Supabase database function (`decrement_inventory_for_order`) that loops through order items and applies the atomic decrement from earlier. Keeping this logic in the database ensures it runs as a single transaction — either all items decrement or none do.

---

## Handling Returns — Inventory Restoration

Not all returns result in restockable inventory. A damaged return shouldn't go back to available stock.

```ts
async function processReturn(returnId: string, restockItems: boolean) {
  const returnItems = await getReturnItems(returnId);

  if (restockItems) {
    for (const item of returnItems) {
      await supabase.rpc('adjust_inventory', {
        variant_id: item.variantId,
        quantity_delta: item.quantity,
        reason: 'return',
        reference_id: returnId,
        note: 'Customer return — item inspected, resaleable'
      });
    }
  }
  // If not restocking: log movement with quantity_delta = 0 and reason = 'return_damaged'
}
```

Always log the return in `inventory_movements` regardless of whether you restock. The audit trail matters.

---

## AI Prompt — Design Your Inventory System

<copy-prompt>
I'm building inventory architecture for my personal e-commerce store.

My store:
- Products: [what you sell]
- Fulfillment: [self-fulfilled / print-on-demand / dropship / digital]
- Typical stock levels: [e.g. 5–50 units per SKU, or unlimited for digital]
- Expected concurrent users: [low / medium — my estimate]
- Variant types: [size, color, etc.]
- Return policy: [yes / no / exchange only]
- Database: Supabase (PostgreSQL)

Design my inventory system:
1. Should I implement cart reservation, checkout-time reservation, or no reservation? Justify for my traffic level.
2. Complete SQL for inventory_movements table and the atomic decrement function
3. Low stock threshold recommendations for my product type
4. Out-of-stock behavior recommendation — deny, continue, or notify-me — and why
5. Supabase RPC function for safe atomic inventory decrement with movement logging
6. What my admin inventory interface needs at launch vs. what can wait
7. How to handle inventory for my specific fulfillment model (digital / print-on-demand / self-fulfilled)

Flag anything that's premature optimization for a personal store at launch.
</copy-prompt>

---

## Validating AI Output

- **Application-level stock check before database update** — if the AI generates code that reads inventory, checks it in JS/TS, then updates, reject it — this is not atomic and will cause race conditions
- **Float prices anywhere in inventory logic** — prices in financial calculations must be integers
- **Inventory decrement on client-side success** — decrement must only happen in the webhook handler, never on a client callback
- **Missing movement logging** — any inventory change without a movement record is an audit gap
- **Reservation without expiry logic** — if implementing reservation, expiry must be implemented or you'll permanently hold inventory for abandoned carts

---

## Inventory Architecture Checklist

- [ ] Inventory decrement is atomic — single SQL statement, not read-check-update in application code
- [ ] `inventory_movements` table created for audit trail
- [ ] Reservation strategy decided — no reservation is valid for personal stores at launch
- [ ] Stock validated server-side immediately before Stripe PaymentIntent creation
- [ ] Inventory decremented in webhook handler (`payment_intent.succeeded`), not on client success
- [ ] Out-of-stock behavior defined per product — deny vs. continue vs. notify
- [ ] Low stock thresholds defined — shown on product page
- [ ] Return inventory restoration logic planned — restockable vs. damaged
- [ ] Admin inventory operations identified — restock, adjustment, history view
