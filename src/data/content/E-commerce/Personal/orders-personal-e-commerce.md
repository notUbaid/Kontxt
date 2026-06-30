---
title: Orders
slug: orders
phase: Phase 3
mode: personal
projectType: e-commerce
estimatedTime: 20-25 min
---

# Orders

The order is the permanent record of a transaction — the one piece of data that must never be wrong, never silently change in ways you can't trace, and never disappear. Everything before this module *led to* an order being created. This module is about modeling that record correctly and managing its lifecycle after checkout.

---

## Why Orders Deserve Their Own Module

It's tempting to think of an order as "just a row that says someone paid." It's actually a snapshot that needs to remain historically accurate even as everything else in your store changes around it.

> **Core principle:** A product's price can change. A product can be archived. A customer's address can update. None of that should ever change what a past order shows. The order is a frozen record of what happened at the moment it happened — not a live reference to current data.

This is the single most important concept in this module, and it shapes the entire schema below.

---

## Order Schema: Snapshot, Not Reference

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE, -- human-friendly, e.g. "ORD-1042"
  stripe_session_id TEXT NOT NULL UNIQUE, -- idempotency key from Checkout module
  customer_id UUID REFERENCES customers(id), -- nullable for guest checkout
  customer_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'paid' 
    CHECK (status IN ('paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  subtotal DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL, -- snapshot, not a reference
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id), -- for reference/reporting only
  product_name TEXT NOT NULL,       -- snapshot at time of purchase
  product_price DECIMAL(10,2) NOT NULL, -- snapshot at time of purchase
  quantity INTEGER NOT NULL,
  variant_details JSONB -- snapshot, e.g. {"size": "M", "color": "Blue"}
);
```

> **Why `order_items` duplicates `product_name` and `product_price` instead of joining to the live `products` table:** This is the snapshot principle in practice. If you only stored `product_id` and joined to get the name/price, every past order's displayed total would silently change whenever you edit a product. A customer looking at an order from two months ago should see exactly what they paid then — not today's price. This duplication is intentional and correct, not a normalization mistake.

---

## Why `shipping_address` Is JSONB, Not a Foreign Key

Same principle, different field. If a customer has a saved address that gets edited or deleted later, their past order's shipping address shouldn't change retroactively — you shipped to *that* address, and the record should reflect it permanently.

```json
{
  "name": "Jane Doe",
  "line1": "123 Main St",
  "line2": "Apt 4B",
  "city": "Austin",
  "state": "TX",
  "postal_code": "78701",
  "country": "US"
}
```

---

## Order Status: The Lifecycle

<table>
<tr><th>Status</th><th>Meaning</th><th>Set by</th></tr>
<tr><td><code>paid</code></td><td>Payment confirmed, order created (initial state from webhook)</td><td>System (webhook)</td></tr>
<tr><td><code>processing</code></td><td>You're preparing/packing the order</td><td>You (manual, admin dashboard)</td></tr>
<tr><td><code>shipped</code></td><td>Order has left for delivery</td><td>You (manual — triggers shipping email)</td></tr>
<tr><td><code>delivered</code></td><td>Order confirmed delivered</td><td>You (manual, or carrier webhook if integrated later)</td></tr>
<tr><td><code>cancelled</code></td><td>Order cancelled before fulfillment</td><td>You or customer request</td></tr>
<tr><td><code>refunded</code></td><td>Payment refunded</td><td>You (synced with Stripe refund)</td></tr>
</table>

```
paid → processing → shipped → delivered
  ↓
cancelled / refunded (can branch off from paid or processing)
```

> **Tip:** For a personal store, you'll be updating most of these statuses manually from your admin dashboard as you actually pack and ship orders. Don't try to automate carrier tracking integration on day one — that's real complexity (carrier APIs, webhook integrations) better suited for Phase 6 once you have order volume that justifies it.

---

## Order Numbers: Don't Expose Raw UUIDs

Your `id` is a UUID — correct for a primary key, bad for a customer-facing reference. Generate a human-friendly `order_number` instead.

```javascript
async function generateOrderNumber() {
  // Simple sequential approach using a Postgres sequence
  const { data } = await supabase.rpc('next_order_number');
  return `ORD-${String(data).padStart(5, '0')}`; // ORD-00042
}
```

```sql
CREATE SEQUENCE order_number_seq START 1000;

CREATE OR REPLACE FUNCTION next_order_number()
RETURNS INTEGER AS $$
  SELECT nextval('order_number_seq')::INTEGER;
$$ LANGUAGE SQL;
```

> **Why a sequence instead of `COUNT(*) + 1`:** Counting existing orders to generate the next number has the exact same race condition problem covered in the Inventory module — two simultaneous orders could compute the same "next" number. A database sequence is atomic by design and avoids this entirely.

---

## Connecting Orders to Everything Else This Phase

This module is the integration point for nearly everything you've built so far:

| Module | Connection |
|---|---|
| Checkout | Creates the order inside the webhook handler |
| Inventory | Stock decrement happens in the same transaction as order creation |
| Notifications | Confirmation/shipping emails are triggered by order creation and status changes |
| Analytics | `purchase_completed` event fires alongside order creation |
| Customer Accounts | Orders link to `customer_id` when the buyer is logged in |
| Admin Dashboard | Where you'll view and update order status |

If you find yourself duplicating order-creation logic anywhere outside the webhook handler, stop — that's a sign you're breaking the single-source-of-truth principle from the Checkout module.

---

## Building the Order Creation Transaction

This is the function referenced (but not fully shown) in the Checkout module — here's the complete picture, tying together orders, order_items, and inventory atomically.

```javascript
async function createOrderTransaction({ stripeSessionId, customerEmail, items, shippingAddress, totals }) {
  return await db.transaction(async (tx) => {
    // 1. Atomic stock check + decrement for every item first
    for (const item of items) {
      const result = await tx.query(
        `UPDATE products SET stock = stock - $1 
         WHERE id = $2 AND stock >= $1 
         RETURNING stock`,
        [item.quantity, item.productId]
      );
      if (result.rowCount === 0) {
        throw new Error(`Insufficient stock for product ${item.productId}`);
      }
    }

    // 2. Create the order record
    const orderNumber = await generateOrderNumber();
    const order = await tx.query(
      `INSERT INTO orders (order_number, stripe_session_id, customer_email, 
        subtotal, discount_amount, shipping_amount, tax_amount, total, shipping_address)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [orderNumber, stripeSessionId, customerEmail, totals.subtotal, 
       totals.discount, totals.shipping, totals.tax, totals.total, shippingAddress]
    );

    // 3. Create order_items as SNAPSHOTS of current product data
    for (const item of items) {
      const product = await tx.query('SELECT name, price FROM products WHERE id = $1', [item.productId]);
      await tx.query(
        `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, variant_details)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.productId, product.name, product.price, item.quantity, item.variantDetails]
      );
    }

    // 4. Log inventory movements (from Inventory module)
    for (const item of items) {
      await tx.query(
        `INSERT INTO inventory_movements (product_id, change, reason, order_id) VALUES ($1, $2, 'sale', $3)`,
        [item.productId, -item.quantity, order.id]
      );
    }

    return order;
  });
  // If anything throws inside this block, the entire transaction rolls back —
  // no partial orders, no partial stock decrements.
}
```

> **Why everything is inside one transaction:** If stock decrements for item 1 and 2 succeed but item 3 fails due to insufficient stock, you do not want items 1 and 2 permanently decremented for an order that never actually completes. The transaction ensures it's all-or-nothing — exactly the behavior described in the Inventory module's "reject the entire order" guidance.

---

## AI Prompt: Implement Order Management

```
I'm implementing the order model for a personal e-commerce store using 
Supabase (Postgres) and Next.js.

Generate:
1. SQL migrations for `orders` and `order_items`, following the snapshot 
   principle — order_items must store product_name and product_price as 
   snapshots, not rely on joining to the live products table. shipping_address 
   should be JSONB, not a foreign key.
2. A sequence-based order number generator (not COUNT-based, to avoid race 
   conditions)
3. A single createOrderTransaction function that: decrements stock atomically 
   per item, creates the order, creates order_items as snapshots, and logs 
   inventory_movements — all within one database transaction that rolls back 
   entirely if any step fails
4. An updateOrderStatus function enforcing valid transitions only 
   (e.g., can't go from 'delivered' back to 'paid')
5. A getOrderById function for the success page and customer order history

My products schema: [paste schema]

Confirm explicitly: if stock decrement fails for one item in a multi-item 
order, does the entire transaction roll back, including items that already 
succeeded?
```

> **Token efficiency tip:** Asking for explicit confirmation on the rollback behavior forces AI to reason through the transaction boundary rather than assuming it's correct — this is the exact failure mode that's hardest to catch in casual code review.

---

## Validating AI-Generated Order Code

- [ ] Does `order_items` store `product_name` and `product_price` as snapshots, or does it only store `product_id` and rely on a live join?
- [ ] Is `shipping_address` stored as JSONB (a snapshot), or as a foreign key to a mutable addresses table?
- [ ] Is the order number generated via a database sequence, not `COUNT(*) + 1`?
- [ ] Is the entire order creation (stock decrement + order + order_items + inventory_movements) wrapped in one transaction?
- [ ] Does `updateOrderStatus` validate the transition (e.g., reject `delivered → paid`), or does it allow any status to be set at any time?
- [ ] If a transaction fails partway through, does it actually roll back — test this by intentionally forcing a failure on the last item.

> **Common AI mistake:** AI sometimes generates `order_items` with only a `product_id` foreign key "to keep things normalized," missing the business reason for denormalizing here. If you see this, explicitly point out the snapshot requirement — it's a deliberate exception to normalization, not an oversight.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Automated carrier tracking integration (ShipStation, EasyPost APIs)
- Partial order fulfillment / split shipments
- Order editing after creation (cancel and recreate instead, if needed)
- Multi-currency order totals
- Automated status transitions based on carrier webhooks — manual updates are fine at this scale

---

## Implementation Checklist

- [ ] `orders` table created with status CHECK constraint and JSONB shipping_address
- [ ] `order_items` table created with snapshot fields (product_name, product_price), not live joins
- [ ] Order number generated via a Postgres sequence
- [ ] `createOrderTransaction` wraps stock decrement, order creation, order_items, and inventory_movements in one atomic transaction
- [ ] Transaction rollback verified — a forced failure on one item doesn't leave partial data
- [ ] `updateOrderStatus` enforces valid status transitions only
- [ ] Order successfully links to `customer_id` when the buyer is logged in, remains null-safe for guest checkout
- [ ] Manually verified: viewing an old order still shows the original price even after editing that product's current price

---

## What's Next

With orders modeled and created reliably, it's time to give customers a way to view their order history and manage their account — that's **Customer Accounts**, next in this phase.
