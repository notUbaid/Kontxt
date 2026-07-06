---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4
mode: personal
projectType: api-product
estimatedTime: 20-30 min
---

# Performance Optimization

For an API product, performance isn't a "nice to have" polish step — it's part of your contract with every developer who integrates with you. A slow endpoint doesn't just feel bad; it makes their application slow, their timeouts fire, and their retries pile onto your rate limiter.

This module targets the handful of issues that cause the overwhelming majority of real-world API slowness — not general "optimize everything" advice. Chase these first; everything else is premature until you've measured a problem.

---

## Measure Before You Optimize

> **Decision card**
> Don't optimize based on guesswork. Add basic request timing first, find your actual slow endpoints, then fix those specifically. Optimizing code you haven't measured is how solo developers spend a weekend speeding up an endpoint nobody calls.

```typescript
// middleware/timing.ts
export function timing(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (duration > 500) {
      console.warn(`SLOW: ${req.method} ${req.path} took ${duration}ms`);
    }
  });
  next();
}
```

This one middleware, logged and reviewed occasionally, tells you exactly where to spend the rest of this module's effort.

---

## The #1 Cause of API Slowness: N+1 Queries

This single pattern causes more real-world API slowness than everything else in this module combined. It happens when fetching a list, then fetching related data for each item in a loop instead of in one query.

```typescript
// N+1 — one query for orders, then ONE MORE QUERY PER ORDER
const orders = await db.order.findMany({ where: { userId } });
for (const order of orders) {
  order.items = await db.orderItem.findMany({ where: { orderId: order.id } });
}
// 50 orders = 51 queries

// FIXED — one query, related data included
const orders = await db.order.findMany({
  where: { userId },
  include: { items: true },
});
// 50 orders = 1 query
```

> **Warning — N+1 is invisible in local testing**
> With 5 test records, an N+1 query adds a few milliseconds — unnoticeable. With 5,000 records in production, the same code adds seconds. This is exactly why measuring in production (or with realistic seed data) matters more than "it feels fast on my machine."

---

## Indexing

A query that filters or sorts on a column without an index does a full table scan — fine at 100 rows, catastrophic at 100,000.

```prisma
model Order {
  id        String   @id @default(cuid())
  userId    String
  status    String
  createdAt DateTime @default(now())

  @@index([userId])              // every ownership-scoped query filters by this
  @@index([userId, status])      // composite index for "user's pending orders" style queries
}
```

> **Tip — index what you actually query by, not everything**
> Every index speeds up reads but slows down writes and costs storage. Index the columns you filter, sort, or join on — particularly `userId` on every table, since ownership-scoped queries (from the Authorization Implementation module) run on nearly every request. Don't index columns you never filter by "just in case."

---

## Pagination: Never Return Unbounded Lists

An endpoint that returns "all of a user's orders" with no limit is a performance bug waiting for a user with enough data to trigger it.

```typescript
router.get("/orders", authenticate, async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 25, 100); // cap the max
  const orders = await db.order.findMany({
    where: { userId: req.user.id },
    take: limit + 1, // fetch one extra to know if there's a next page
    ...(req.query.cursor ? { cursor: { id: String(req.query.cursor) }, skip: 1 } : {}),
    orderBy: { createdAt: "desc" },
  });

  const hasMore = orders.length > limit;
  const data = orders.slice(0, limit);

  res.json({
    data,
    nextCursor: hasMore ? data[data.length - 1].id : null,
  });
});
```

> **Decision card — cursor vs offset pagination**
> Use cursor-based pagination (above), not `OFFSET`/`LIMIT`. Offset pagination gets progressively slower as the offset grows (the database still has to scan and discard all skipped rows), and it produces inconsistent results if records are inserted while a user is paging through. Cursor pagination stays fast and consistent regardless of dataset size.

---

## Parallelize Independent Work

Sequential `await`s for operations that don't depend on each other waste time for no reason.

```typescript
// SLOW — sequential, each waits for the previous to finish
const user = await db.user.findUnique({ where: { id } });
const orders = await db.order.findMany({ where: { userId: id } });
const invoices = await db.invoice.findMany({ where: { userId: id } });

// FAST — independent queries run concurrently
const [user, orders, invoices] = await Promise.all([
  db.user.findUnique({ where: { id } }),
  db.order.findMany({ where: { userId: id } }),
  db.invoice.findMany({ where: { userId: id } }),
]);
```

> **Warning — only parallelize truly independent operations**
> If a later call depends on an earlier one's result, `Promise.all` will break it (or worse, race silently). Parallelize only when you're certain there's no data dependency between the calls.

---

## Connection Pooling

Every request opening a fresh database connection instead of reusing a pool adds real, avoidable latency — and can exhaust your database's connection limit under load.

```typescript
// Most ORMs pool by default, but verify your config, especially in serverless
// Prisma example: cap pool size explicitly to match your DB plan's limits
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```
# DATABASE_URL with explicit pool size
postgres://user:pass@host/db?connection_limit=10
```

> **Warning — serverless deployments need this checked specifically**
> On serverless platforms (Vercel functions, AWS Lambda), each invocation can open its own connection, and a burst of traffic can exceed your database's max connections. If you're deploying serverless, use a pooler (like PgBouncer, or your DB provider's built-in pooling endpoint) rather than connecting directly.

---

## Response Payload Size

Don't send data the caller didn't ask for. A response with every column of every related record, when the caller needed three fields, wastes bandwidth and parse time on both ends.

```typescript
// Wasteful — returns every field, including ones the caller likely doesn't need
const orders = await db.order.findMany({ include: { items: true, user: true } });

// Intentional — select only what the response actually needs
const orders = await db.order.findMany({
  select: { id: true, status: true, createdAt: true, items: { select: { sku: true, quantity: true } } },
});
```

---

## AI Prompt: Find N+1 Queries and Missing Indexes

```
Review this codebase for performance issues, specifically:

1. N+1 query patterns — any loop that queries the database per
   iteration instead of using an include/join
2. Missing indexes — check schema.prisma against the actual query
   patterns in the route files; flag columns that are filtered,
   sorted, or joined on without a corresponding index
3. Unbounded list endpoints — any route returning findMany() results
   without a limit/pagination
4. Sequential awaits that could safely run in parallel with
   Promise.all

[paste schema.prisma and relevant route files]

For each finding, show the specific code and the fix.
```

---

## Validating AI Output

- **Confirm suggested `Promise.all` changes don't introduce data dependencies** — check each parallelized call really doesn't need a previous call's result.
- **Confirm added indexes match real query patterns**, not a blanket "index everything" suggestion — verify each recommended index against an actual `where`/`orderBy` in your code.
- **Test pagination changes with more than a handful of rows** — cursor logic bugs (off-by-one on `hasMore`, wrong cursor field) often only surface with realistic data volumes.

---

## Common Mistakes

- Optimizing based on intuition instead of the timing middleware's actual output.
- Adding indexes to every column "to be safe," slowing down writes for no read benefit.
- Offset-based pagination that silently degrades as a table grows.
- `include`-ing entire related objects when the response only needs two fields from them.

---

## Validation Checklist

- [ ] Request timing logging is in place and you've reviewed it at least once for slow endpoints
- [ ] No loop issues N+1 queries — related data is fetched via `include`/join
- [ ] Every foreign key and frequently-filtered column has an index
- [ ] Every list endpoint is paginated with an enforced max page size
- [ ] Pagination uses cursors, not offset/limit, for anything that could grow large
- [ ] Independent async operations run via `Promise.all`, not sequential `await`s
- [ ] Database connection pooling is configured appropriately for your deployment target (especially if serverless)

---

## What's Next

With the underlying queries fast, the next module — **Caching** — adds a layer in front of the expensive-but-repeatable reads so identical requests don't hit the database at all.
