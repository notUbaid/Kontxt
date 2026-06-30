---
title: Orders Implementation
slug: orders
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Orders Implementation

An order in an e-commerce database is not a static receipt. It is a highly active State Machine that dictates the movement of physical goods, financial reconciliation, and customer communications.

If you allow your application to update an order's status arbitrarily (e.g., changing it from `refunded` back to `processing`), you will break integrations with your warehouse and your accounting software.

---

## 1. The Strict State Machine

You must enforce strict, unidirectional state transitions at the database level.

**The Implementation:**
Define an Enum for the Order Status. Your backend must enforce that transitions only move forward.
```prisma
enum OrderStatus {
  PENDING_PAYMENT // Created, waiting for Stripe webhook
  UNFULFILLED     // Payment secured, waiting for warehouse
  PARTIALLY_FULFILLED // Split shipment (e.g., 1 of 2 items shipped)
  FULFILLED       // All items shipped
  CANCELED        // Canceled before shipping
  RETURNED        // Canceled after shipping
}
```

**The Transition Logic:**
In your API route that handles status updates (e.g., receiving a webhook from the warehouse):
```typescript
function transitionOrder(order, newStatus) {
  const allowedTransitions = {
    'UNFULFILLED': ['PARTIALLY_FULFILLED', 'FULFILLED', 'CANCELED'],
    'FULFILLED': ['RETURNED'],
    // RETURNED cannot transition to anything. It is a terminal state.
  };

  if (!allowedTransitions[order.status].includes(newStatus)) {
    throw new Error(`Invalid state transition from ${order.status} to ${newStatus}`);
  }
}
```

---

## 2. Immutability (The Snapshot Pattern)

As covered in the Database architecture, **an Order is a historical artifact.** It must never change just because upstream data changed.

**The Implementation:**
When the `UNFULFILLED` state is reached, the order row must contain hardcoded snapshots:
- `shipping_address_snapshot`: If the user moves to a new house next year and updates their profile, their old order receipts must still show their old address.
- `tax_rate_snapshot`: If the government changes the VAT rate from 20% to 22% next month, your past orders must still calculate mathematically using the 20% rate.
- `product_title_snapshot`: If the merchandising team renames a product, the old receipt must show the old name.

---

## 3. Split Fulfillments

At production scale, customers will buy items that cannot ship together. 
- Example: A pre-order item (shipping in 2 months) and an in-stock item (shipping today).
- Example: An item shipping from the East Coast warehouse, and an item shipping from the West Coast warehouse.

**The Implementation:**
Your database must support a `Fulfillment` table that sits between the `Order` and the `OrderItem`.
1. An `Order` has many `Fulfillments`.
2. A `Fulfillment` contains specific `OrderItems` and a unique `tracking_number`.
3. If an order has 3 items, and 2 are shipped today, the system creates `Fulfillment A` and marks the main Order as `PARTIALLY_FULFILLED`. 
4. The backend sends an email to the customer: "Some items in your order have shipped!" containing only the items in `Fulfillment A`.

---

## 4. The Idempotent Creation Flow

When the `payment_intent.succeeded` webhook arrives from Stripe, you must create the order idempotently.

**The Implementation:**
1. Transaction Start.
2. Check if an Order with `transaction_id == stripe_intent_id` exists. If yes, return 200 OK and abort.
3. Fetch the Cart from Redis using the metadata attached to the Stripe intent.
4. Decrement the Inventory atomically in Postgres. (If this fails due to a race condition, issue an automatic refund via Stripe API).
5. Insert the Order and OrderItems (with snapshots) into Postgres.
6. Publish `order.created` to the Event Queue (for emails and warehouse syncing).
7. Delete the Cart from Redis.
8. Transaction Commit.

---

## AI Prompt — Architect Your Order System

```prompt
I am implementing the Order Management layer for a production e-commerce store.

Tech Stack:
- Database: [e.g., Postgres + Prisma]
- Fulfillment Model: [e.g., In-house / Multi-Warehouse 3PL]
- Backend: [e.g., Node.js / TypeScript]

Act as a Principal Backend Engineer:
1. Provide the TypeScript implementation of a strict State Machine class for Order Statuses, explicitly defining allowed transitions and throwing errors for invalid updates.
2. Write the Prisma schema required to support Split Fulfillments (an Order that has multiple shipments, each with their own tracking numbers and subsets of OrderItems).
3. Draft the exact database transaction (or Prisma `$transaction`) required to safely convert a Redis Cart into a Postgres Order upon receiving a Stripe Webhook, ensuring the "Snapshot Pattern" is strictly enforced for pricing and addresses.
4. Explain how the system should automatically issue a Stripe Refund if the atomic inventory decrement fails during order creation.
```

---

## Orders Implementation Checklist

- [ ] Strict State Machine enforced in backend code for all order status transitions
- [ ] Snapshot Pattern implemented to freeze addresses, prices, and taxes permanently on the order record
- [ ] Database schema built to support multiple `Fulfillments` per `Order` (for split shipments)
- [ ] Order creation logic wrapped in a database transaction to ensure atomicity
- [ ] Automatic refund logic implemented if inventory decrement fails after payment capture
- [ ] `order.created` event published to an asynchronous queue to decouple email/WMS syncing from the webhook response
