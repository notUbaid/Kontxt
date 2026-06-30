---
title: Inventory Implementation
slug: inventory
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Inventory Implementation

Implementing inventory at production scale requires solving one core computer science problem: high-concurrency state mutation.

If 1,000 users attempt to buy the last 10 pairs of limited-edition sneakers at the exact same millisecond, your application layer and database must orchestrate the queue perfectly. If it fails, you sell 1,000 pairs, cancel 990 orders, refund thousands of dollars, and destroy your brand's reputation.

---

## 1. The Atomic Decrement (Database Layer)

You cannot trust application-level math for inventory.

**The Failure Pattern:**
1. Node.js reads: `inventory = 10`
2. Node.js subtracts 1: `new_inventory = 9`
3. Node.js writes: `UPDATE variants SET inventory = 9`
If 10 requests hit Node.js simultaneously, they all read `10`, they all subtract `1`, and they all write `9`. You just sold 10 items, but the database says you have 9 left.

**The Production Implementation:**
The decrement must happen atomically inside the database engine.
```sql
-- PostgreSQL Atomic Update
UPDATE variants 
SET available_to_promise = available_to_promise - 1 
WHERE sku = 'SNKRS-RED-10' 
  AND available_to_promise >= 1
RETURNING id;
```
If this query returns `0` rows, the item is sold out, and your application layer immediately aborts the checkout and returns an `Out of Stock` error.

---

## 2. Flash Sales and Queueing (Redis)

Atomic database decrements work fine for normal traffic. During a massive flash sale (e.g., a hyped product drop or Black Friday), hammering Postgres with thousands of concurrent `UPDATE` locks will exhaust your connection pool and crash the database.

**The Flash Sale Implementation:**
You must protect the relational database using an in-memory datastore like **Redis**.

1. **Pre-warm Redis:** 5 minutes before the sale, sync the inventory counts from Postgres to Redis.
2. **The LUA Script:** When a user clicks "Checkout", execute a Redis LUA script. LUA scripts in Redis are single-threaded and atomic.
```lua
-- Redis LUA Script to reserve inventory
local inventory = tonumber(redis.call('get', KEYS[1]))
if inventory and inventory >= 1 then
    redis.call('decr', KEYS[1])
    return 1 -- Success
else
    return 0 -- Sold out
end
```
3. **The Handoff:** If the LUA script returns `1`, allow the user into the checkout flow. If it returns `0`, reject them instantly without ever touching Postgres.
4. **The Settlement:** When the payment actually succeeds, asynchronously update the persistent Postgres database.

---

## 3. Webhooks & ERP Syncing

Your e-commerce database is not the ultimate source of physical inventory truth; the warehouse is. 

If a forklift crushes a pallet of goods, the Warehouse Management System (WMS) will update its count. Your e-commerce system must sync this change immediately.

**The Implementation:**
1. Your backend must expose a secured `/api/webhooks/inventory` endpoint.
2. The WMS/ERP pushes inventory adjustments here.
3. **Safety Check:** The webhook payload should include the *delta* (e.g., `-50 units`), not just the *absolute total*. If the WMS pushes an absolute total based on old data, it will overwrite sales that happened in the last 5 minutes.
4. **Cache Invalidation:** The instant the database inventory is updated, your backend must fire a cache invalidation request to your frontend (Next.js On-Demand ISR) to ensure the PDP reflects the new stock level immediately.

---

## AI Prompt — Implement Your Inventory Concurrency

```prompt
I am implementing the inventory decrement logic for a production e-commerce store facing high-concurrency traffic spikes.

Tech Stack:
- Database: [e.g., Postgres + Prisma]
- Cache/Queue: [e.g., Redis / Upstash]
- Backend: [e.g., Next.js Route Handlers]

Act as a Principal Backend Engineer:
1. Write the exact database query (Raw SQL or Prisma) required to atomically decrement inventory and prevent race conditions.
2. Provide the Redis LUA script implementation required to protect the primary database during a massive flash sale, acting as a high-speed reservation queue.
3. Explain the fallback logic: if a user reserves inventory in Redis but their credit card is declined 2 minutes later, how is the inventory restored to the pool?
4. Write the webhook handler architecture for receiving inventory reconciliation updates from a third-party Warehouse Management System (WMS), ensuring it doesn't overwrite recent sales.
```

---

## Inventory Implementation Checklist

- [ ] All inventory decrements strictly enforced as atomic database operations
- [ ] Redis (or similar memory store) queue implemented for flash sale concurrency protection
- [ ] Cart reservation TTLs (Time-To-Live) configured to release locked inventory if checkout is abandoned
- [ ] Webhook endpoints configured and secured for external WMS/ERP inventory syncing
- [ ] Cache invalidation webhooks implemented to purge stale frontend PDPs on inventory changes
