---
title: Database Implementation
slug: database
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 45–60 min
---

# Database Implementation

At production scale, your database is not just a place to store rows. It is the absolute Source of Truth for financial data, inventory concurrency, and order state machines.

If you architect the application layer poorly, you can rewrite it. If you implement the database layer poorly, you will lose money, oversell inventory during high-traffic drops, and face catastrophic data migrations when you attempt to scale.

---

## 1. The Concurrency Problem (Inventory)

The most critical database operation in e-commerce is the inventory decrement. If two users check out simultaneously for the last item in stock, your database must enforce atomicity.

### The Naive (Dangerous) Approach
```javascript
// DO NOT DO THIS
const variant = await db.variant.findUnique({ id });
if (variant.inventory > 0) {
  await db.variant.update({ 
    where: { id }, 
    data: { inventory: variant.inventory - 1 } 
  });
}
```
*Why this fails:* A race condition. Between the `find` and the `update`, another thread can read the same `inventory` value. Both threads decrement from `1`, resulting in `-1` inventory and a forced refund.

### The Production Approach (Atomic Decrement)
You must push the math down to the database level so the decrement happens within a single atomic operation.
```typescript
// Prisma example
const updatedVariant = await prisma.variant.update({
  where: { 
    id: variantId,
    inventoryCount: { gte: quantityRequested } // Optimistic concurrency check
  },
  data: {
    inventoryCount: {
      decrement: quantityRequested
    }
  }
});
```
If you are using raw Postgres, use row-level locking:
```sql
BEGIN;
SELECT inventory FROM variants WHERE id = '123' FOR UPDATE;
UPDATE variants SET inventory = inventory - 1 WHERE id = '123' AND inventory > 0;
COMMIT;
```

---

## 2. Financial Precision (The Float Problem)

Never, ever store money as a floating-point number (`DECIMAL`, `FLOAT`, or `REAL`). 
Floating-point math in programming languages introduces rounding errors (`0.1 + 0.2 = 0.30000000000000004`). In e-commerce, a rounding error on a 10% discount across 50,000 orders is an accounting disaster.

**The Rule:** Store all monetary values as integers representing the smallest currency unit (e.g., cents in USD, paise in INR, pence in GBP).

```prisma
// Correct Database Schema
model OrderItem {
  id             String  @id @default(uuid())
  unitPriceCents Int     // e.g., 2999 for $29.99
  taxCents       Int
  discountCents  Int
}
```
Only format the integer back into a decimal string when rendering it to the UI (`(price / 100).toFixed(2)`).

---

## 3. Data Immutability (The Snapshot Pattern)

A massive mistake beginners make is relying purely on foreign keys for historical data.

Imagine this schema:
`Order` → has many `OrderItems` → belongs to `Product`.

A customer buys a "Red T-Shirt" for $20. Six months later, the merchandising team changes the `Product` title to "Vintage Red Tee" and updates the price to $25. 
Because your `OrderItem` relies on a relation to the `Product` table, the customer's historical receipt now shows they paid $25 for a "Vintage Red Tee." You have falsified financial records.

**The Snapshot Pattern:**
When an order is created, you must take a snapshot of the product data and store it statically on the `OrderItem` row.

```prisma
model OrderItem {
  id              String   @id @default(uuid())
  orderId         String
  variantId       String?  // Can be null if variant is later deleted!
  
  // Statically captured at the exact moment of checkout
  titleSnapshot   String
  skuSnapshot     String
  priceSnapshot   Int
  taxSnapshot     Int
}
```

---

## 4. Database Connection Pooling

Serverless environments (like Vercel functions or AWS Lambdas) scale infinitely by spinning up new instances. Every instance opens a new connection to your database. 

If you get hit by a bot attack or a Black Friday spike, Vercel will spin up 1,000 functions. Postgres can typically only handle ~100 direct connections. Your database will crash with a `Too many connections` error, taking your store offline exactly when you have the most traffic.

**The Solution:**
You must route your database traffic through a Connection Pooler (like PgBouncer, Supabase Supavisor, or Prisma Accelerate). The pooler maintains a small number of persistent connections to the database, and multiplexes the thousands of serverless requests through them.

---

## 5. Soft Deletes

In e-commerce, you rarely `DELETE` records.
- If you delete a user, you orphan their historical orders.
- If you delete a product, you break the returns process.
- If you delete a discount code, you break analytics reporting.

Implement soft deletes across all critical tables. Add a `deletedAt DateTime?` column. When a merchandising manager "deletes" a product, set the timestamp. Your queries must then filter `WHERE deletedAt IS NULL` for active storefront rendering, but backend financial queries can still access the data.

---

## AI Prompt — Generate Your Production Database Schema

```prompt
I am implementing the database schema for a production e-commerce store using [Prisma / Drizzle / Raw SQL].

Business Profile:
- DB Engine: [e.g., PostgreSQL]
- Product Complexity: [e.g., Multi-tier variants, digital goods, physical goods]
- Order Volume: [e.g., 5,000+ orders/month]

Act as a Principal Database Architect:
1. Generate the exact schema models (DDL/Prisma schema) for the core E-Commerce loop: Products, Variants, Users, Orders, OrderItems, and Discounts.
2. Implement the "Snapshot Pattern" explicitly on the OrderItems model.
3. Use integers (cents) for all financial fields.
4. Add the necessary indexes (`@@index` or `CREATE INDEX`) required to ensure fast reads for the Storefront (e.g., indexing Product handle/slug, Order user_id).
5. Provide the exact Typescript/SQL code for safely decrementing inventory atomically to prevent race conditions during a flash sale.
```

---

## Database Implementation Checklist

- [ ] Atomic decrement logic implemented for all inventory updates
- [ ] All financial fields stored strictly as integers (cents/smallest unit)
- [ ] Snapshot pattern implemented on Orders/OrderItems to guarantee historical immutability
- [ ] Database connection pooling configured (PgBouncer/Supavisor) to survive serverless traffic spikes
- [ ] Soft deletes (`deletedAt`) implemented for Users, Products, and Orders
- [ ] Indexes applied to all frequently queried storefront fields (e.g., product handles, category IDs)
