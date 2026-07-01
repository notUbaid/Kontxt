---
title: Orders
slug: orders
phase: Phase 3 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Order Processing & State Machines

**Estimated Time:** 60 Minutes

A beginner views an "Order" as a simple row in a database with a boolean flag: `isShipped: false`.

In a production environment, an order is a living, breathing entity that transitions through dozens of states. What happens if an order is paid, but the fraud system flags it as highly suspicious? What happens if the warehouse prints the label, but then the customer emails asking for a refund?

If you just use simple booleans (`isRefunded: true`), your codebase will become an unmaintainable disaster of `if/else` statements.

In Phase 3, you must engineer a **Finite State Machine (FSM)** to govern your Order lifecycle, implement **Idempotent Fulfillment**, and engineer an **Order Mutation API** for your admin dashboard.

---

## 1. The Finite State Machine (FSM)

An Order State Machine mathematically prevents an order from entering an impossible state. 
For example, an order cannot transition from `PENDING` directly to `DELIVERED` without first being `SHIPPED`. An order cannot be `REFUNDED` if it was never `PAID`.

**The Production Solution:**
You must enforce strict state transitions using an Enum in Prisma, and a State Machine logic layer in your Next.js backend.

```prisma
// schema.prisma
enum OrderStatus {
  PENDING
  PAID
  FRAUD_HOLD
  PROCESSING
  SHIPPED
  DELIVERED
  REFUNDED
  CANCELED
}

model Order {
  id          String      @id @default(uuid())
  status      OrderStatus @default(PENDING)
  // ...
}
```

When your webhook attempts to update an order, it must route through the State Machine:

```typescript
// lib/orderState.ts
const validTransitions = {
  PENDING: ['PAID', 'CANCELED'],
  PAID: ['PROCESSING', 'FRAUD_HOLD', 'REFUNDED'],
  FRAUD_HOLD: ['PROCESSING', 'CANCELED'],
  PROCESSING: ['SHIPPED', 'REFUNDED'],
  SHIPPED: ['DELIVERED', 'REFUNDED'],
};

export async function transitionOrderStatus(orderId: string, newStatus: OrderStatus) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  
  // Mathematically block impossible logic
  if (!validTransitions[order.status].includes(newStatus)) {
    throw new Error(`Cannot transition from ${order.status} to ${newStatus}`);
  }

  await prisma.order.update({ where: { id: orderId }, data: { status: newStatus } });
}
```

This prevents a rogue API call from accidentally marking a canceled order as "Shipped", which would cause your 3PL warehouse to illegally mail out a product to a refunded customer.

## 2. Idempotent Fulfillment (3PL Integration)

When an order enters the `PAID` state, your Event Bus (Inngest) fires a worker to send the order JSON to your 3PL Warehouse (e.g., ShipStation).

If your Next.js server sends the request, but the internet drops before ShipStation can respond, your server will retry. If you don't use Idempotency, ShipStation receives two identical requests and mails the customer *two boxes of inventory*.

**The Production Solution:**
You must send your internal `orderId` as the unique external reference ID to the warehouse API.

```typescript
// Background Worker
await fetch('https://ssapi.shipstation.com/orders/createorder', {
  method: 'POST',
  headers: { 'Authorization': `Basic ${token}` },
  body: JSON.stringify({
    orderNumber: order.id, // THE IDEMPOTENCY KEY
    orderDate: order.createdAt,
    orderStatus: 'awaiting_shipment',
    // ...
  })
});
```

Because `orderNumber` must be unique in ShipStation, the second retry request will simply be rejected as a duplicate. You are protected from double-shipping.

## 3. The Mutation Audit Log

If an order is suddenly refunded, and you have a team of three customer service agents, how do you know *who* clicked the refund button in your Admin dashboard?

**The Production Solution:**
Every time an order transitions state, you must write an entry to an `OrderEventLog` table. This provides an immutable paper trail for legal compliance and debugging.

```prisma
model OrderEventLog {
  id        String   @id @default(uuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id])
  oldStatus String
  newStatus String
  userId    String   // The Admin who made the change, or 'SYSTEM' for webhooks
  createdAt DateTime @default(now())
}
```

---

## ✅ Orders Engineering Checklist

- [ ] Abandon boolean flags for order states. Engineer a strict Finite State Machine (FSM).
- [ ] Prevent double-shipping by enforcing Idempotency Keys when communicating with external 3PL warehouse APIs.
- [ ] Engineer an immutable `OrderEventLog` in your database to track exactly who changed an order's status and when.
- [ ] Use the AI prompt below to generate the Order FSM architecture.

---

## AI Prompt — Engineer the Order Processing Layer

Copy this prompt into your AI to have it generate the fault-tolerant order state machine.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Backend Engineer. We are engineering our Order Processing and State Machine architecture.

I need you to generate the following strict, mathematical implementations:

**1. The FSM Validator:**
Write a highly robust TypeScript utility (`lib/fsm.ts`). 
- It must contain the valid transition mapping object for an order (Pending -> Paid -> Processing -> Shipped -> Delivered).
- Write a function `updateOrderStatus(orderId, newStatus, adminUserId)`.
- Show the exact code that checks the mapping, throws an HTTP 400 error if the transition is illegal, and executes a Prisma `$transaction`.

**2. The Audit Log Transaction:**
Inside the `updateOrderStatus` transaction, show how Prisma updates the main `Order` row, AND simultaneously creates a new row in an `OrderEventLog` table. Ensure the `oldStatus` and `newStatus` are captured, along with the `adminUserId` making the change.

**3. The Idempotent 3PL Worker:**
Write the background Event Worker (e.g., using Inngest) that triggers when the `order.paid` event fires.
- Show a mock `fetch` call to a generic Warehouse API (like ShipStation).
- Explicitly highlight how you are mapping our internal `order.id` to the external `orderNumber` field to guarantee idempotency and prevent double-shipping.
- Write the logic that updates our database `status` to `PROCESSING` only after the 3PL API returns a 200 Success.
````

**Next: Account Implementation →**
