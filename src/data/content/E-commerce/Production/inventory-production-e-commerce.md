---
title: Inventory
slug: inventory
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 20-25 min
---

# Inventory

Inventory bugs are the kind that don't show up in development — they show up three weeks after launch when two customers buy your last unit at the same moment, and now you owe someone a refund and an apology. This module is about getting the core inventory logic right, without building a warehouse management system.

---

## The One Problem That Actually Matters

Almost everything in inventory comes down to one question: **at what point in the purchase flow does stock actually decrease?**

Get this wrong, and you either oversell (two people buy your last item) or undersell (stock looks unavailable when it isn't). Everything else in this module supports getting this one decision right.

---

## Decision: When Does Stock Decrement?

<table>
<tr><th>Approach</th><th>Stock decreases when...</th><th>Risk</th><th>Fit</th></tr>
<tr><td><strong>On payment success</strong></td><td>Stripe webhook confirms payment</td><td>Slight oversell risk during high-traffic moments</td><td><strong>Personal Mode default</strong></td>
</tr>
<tr><td>On checkout start (reservation)</td><td>Customer reaches checkout, stock is "held" temporarily</td><td>Complex — needs expiry/release logic for abandoned checkouts</td><td>Higher-traffic stores, limited-drop items</td></tr>
<tr><td>On add to cart</td><td>Stock decreases the moment it's added to a cart</td><td>High undersell risk — items get "stuck" in abandoned carts</td><td>Avoid — rarely correct</td></tr>
</table>

**Recommendation for Personal Mode:** Decrement stock **on confirmed payment success**, via the Stripe webhook — the same trigger point you used for Notifications and Analytics. This is simple, has one source of truth, and the oversell risk is genuinely low at personal-store traffic levels.

> **Why not reserve stock at checkout?** Reservation systems require tracking reservation expiry (what happens if someone starts checkout and never finishes?), releasing held stock, and handling race conditions between reservations. That's real complexity, justified at scale — not justified for a personal store doing a few orders a day. If you sell limited, high-demand drops later, revisit this.

---

## The Core Risk: Race Conditions

Here's the scenario this module exists to prevent: two customers click "Buy Now" on your last unit within the same second. Without proper handling, both payments could succeed, and you've now oversold by one unit.

**The fix is an atomic database operation**, not application-level logic.

```sql
-- WRONG: Read-then-write (race condition possible)
-- 1. SELECT stock FROM products WHERE id = ?
-- 2. Check in application code: if stock > 0
-- 3. UPDATE products SET stock = stock - 1 WHERE id = ?
-- Between steps 1 and 3, another request can read the same stale stock value.

-- RIGHT: Atomic conditional update
UPDATE products 
SET stock = stock - 1 
WHERE id = $1 AND stock >= 1
RETURNING stock;
-- If this returns 0 rows, there wasn't enough stock — the database 
-- itself enforces the check atomically. No race condition possible.
```

> **Why this matters:** The "wrong" pattern above looks completely reasonable in code review and works fine in testing with one user. It only breaks under concurrent load — exactly when you can least afford it (launch day, a viral moment). Build it correctly from the start; this isn't something to "optimize later."

For multi-item orders or variant stock, apply the same atomic pattern per line item, and reject the entire order if any item fails the stock check — don't partially fulfill an order.

---

## Inventory Schema Additions

Building on the `products` (and `product_variants`, if applicable) tables from the Products module:

```sql
-- Track inventory changes for debugging and accountability
CREATE TABLE inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id), -- nullable
  change INTEGER NOT NULL, -- negative for sales, positive for restocks
  reason TEXT NOT NULL CHECK (reason IN ('sale', 'restock', 'manual_adjustment', 'return')),
  order_id UUID REFERENCES orders(id), -- nullable, set for sale/return
  created_at TIMESTAMPTZ DEFAULT now()
);
```

> **Why log movements instead of just updating the stock number:** When a customer asks "why does this say 3 in stock but I thought I had 5," a single stock number gives you no way to investigate. A movement log lets you trace exactly what happened — every sale, restock, and manual correction, in order. This is cheap to add now and genuinely useful the first time something looks wrong.

---

## Low Stock & Out of Stock Handling

Decide upfront how your storefront behaves at each stock level — this affects both UX and your atomic update logic.

| Stock level | Storefront behavior |
|---|---|
| Stock > low-stock threshold | Normal "Add to Cart" |
| Stock ≤ low-stock threshold (e.g., ≤ 3) | "Add to Cart" + "Only X left" message |
| Stock = 0 | "Out of Stock" — button disabled, no add to cart possible |

```javascript
// Simple, configurable threshold — no need for per-product thresholds 
// in a personal store
const LOW_STOCK_THRESHOLD = 3;

function getStockStatus(stock) {
  if (stock === 0) return 'out_of_stock';
  if (stock <= LOW_STOCK_THRESHOLD) return 'low_stock';
  return 'in_stock';
}
```

> **Tip:** "Only 3 left!" messaging is a genuine, well-studied conversion driver — not just a dark pattern, as long as it's accurate. Don't fake scarcity with a hardcoded message; only show it when stock is actually low. Fake scarcity is both an ethical problem and, eventually, a trust problem when customers notice the same "3 left" message for months.

---

## Handling Cancellations & Refunds

When an order is cancelled or refunded, stock should return — but this needs the same atomic discipline as the original decrement.

```sql
UPDATE products 
SET stock = stock + $1 
WHERE id = $2
RETURNING stock;

-- Log the restock movement
INSERT INTO inventory_movements (product_id, change, reason, order_id)
VALUES ($2, $1, 'return', $3);
```

> **Decision point:** Does every cancellation automatically restock, or only some? A damaged/lost item refund shouldn't restock (you don't actually have the item back). Build a simple flag or reason code into your cancellation flow rather than assuming all refunds mean "add it back."

---

## AI Prompt: Implement Inventory Logic

```
I'm implementing inventory management for a personal e-commerce store using 
Supabase (Postgres).

My products table: [paste schema]
[Include product_variants schema if applicable]

Requirements:
1. An atomic stock decrement function that prevents overselling under 
   concurrent requests — use a conditional UPDATE, not read-then-write
2. If decrementing multiple line items in one order, the entire operation 
   should be transactional — if any item fails the stock check, roll back 
   the whole order, don't partially fulfill it
3. An inventory_movements table and logging for every stock change 
   (sale, restock, manual_adjustment, return), with the SQL migration
4. A restockProduct function for returns/cancellations that logs the 
   movement with reason
5. A getStockStatus helper that returns 'in_stock' | 'low_stock' | 'out_of_stock' 
   based on a configurable threshold

Explain how your decrement function prevents the race condition where two 
simultaneous orders both succeed for the last unit in stock.
```

> **Token efficiency tip:** Explicitly asking AI to explain its race condition handling forces it to actually reason through the atomicity of its own solution, rather than generating plausible-looking code that silently has the read-then-write bug.

---

## Validating AI-Generated Inventory Code

- [ ] Does the decrement use a single atomic `UPDATE ... WHERE stock >= quantity` statement, or does it read stock first and check in application code? (The latter has the race condition — reject it.)
- [ ] For multi-item orders, is the whole operation wrapped in a database transaction? If one item's stock check fails, does the entire order roll back?
- [ ] Does every stock change get logged to `inventory_movements`, or only some paths?
- [ ] Is there a distinct, clear function for restocking (returns/cancellations) separate from the sale decrement — not the same function with a sign flip buried in a parameter?
- [ ] If variants are involved, is stock checked and updated on the variant row, not the parent product?

> **Common AI mistake:** AI frequently generates the read-then-write pattern because it's simpler and more "readable" — and it passes all single-user tests. Explicitly reject this pattern every time you see it in inventory code; it is the single most consequential bug type in this module.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Multi-warehouse/multi-location inventory
- Stock reservation with expiry timers
- Automated reorder point notifications/purchase order generation
- Real-time stock sync across multiple sales channels
- Batch/lot tracking, expiration date tracking (unless selling perishables — then this becomes essential, not optional)

---

## Implementation Checklist

- [ ] Stock decrement implemented as a single atomic conditional `UPDATE`, not read-then-write
- [ ] Multi-item orders wrapped in a database transaction — partial fulfillment prevented
- [ ] `inventory_movements` table created and logging every change (sale, restock, manual, return)
- [ ] Low-stock threshold defined and storefront UI reflects in-stock/low-stock/out-of-stock states accurately
- [ ] "Add to Cart" disabled when stock is 0
- [ ] Restock function implemented for returns/cancellations, separate from sale logic
- [ ] Manually tested: two rapid simultaneous "purchases" of an item with stock = 1 — confirm only one succeeds

---

## What's Next

With stock now tracked accurately and safely, it's time to build where customers actually accumulate what they want to buy — that's **Cart**, next in this phase.
