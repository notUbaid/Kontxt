---
title: Caching
slug: caching
phase: Phase 4
mode: personal
projectType: api-product
estimatedTime: 20-30 min
---

# Caching

Caching is the highest-leverage performance lever you have, and also the easiest one to break in a way that serves stale or wrong data to users. The rule that matters more than any implementation detail: **only cache what's safe to serve slightly out of date, and always have a clear invalidation trigger.**

This module covers what to cache, where, and — the part most tutorials skip — how to invalidate it correctly.

---

## What's Actually Worth Caching

| Data | Cacheable? | Why |
|---|---|---|
| A user's own resource list | Rarely | Changes frequently, staleness is visible to the owner immediately |
| Public, shared reference data (plans, categories) | Yes | Changes rarely, same for everyone, high read volume |
| Expensive computed aggregates (dashboard stats) | Yes, with short TTL | Expensive to compute, small staleness window is acceptable |
| Third-party API responses (rarely-changing lookups) | Yes | Saves both latency and third-party rate limit budget |
| Anything involving money or current inventory | No, or very short TTL | Staleness has real consequences |

> **Decision card**
> Don't reach for caching until Performance Optimization's fixes (indexes, N+1 elimination, pagination) are done. Caching a slow, badly-indexed query just hides the problem behind a TTL instead of fixing it — and the moment the cache misses or expires, the slowness is back, now with an extra layer of complexity to debug.

---

## Where to Cache

| Layer | Fits when |
|---|---|
| **In-memory (process)** | Single instance, personal project, data safe to lose on restart |
| **Redis** | You already have it (rate limiting, queues) — reuse it rather than adding a new dependency |
| **HTTP caching (CDN/browser)** | Public, non-personalized GET responses |

> **Decision card — Recommended for Personal mode**
> Use **Redis** for application-level caching. You almost certainly already have it running for rate limiting and queues from earlier modules — this is a config addition, not new infrastructure. Add HTTP caching headers separately for any genuinely public, non-personalized endpoints (see below); the two aren't mutually exclusive.

---

## Implementation: Cache-Aside Pattern

The standard, simplest caching pattern: check the cache first, fall through to the database on a miss, then populate the cache for next time.

```typescript
// lib/cache.ts
import { redis } from "./redis";

export async function cached<T>(
  key: string,
  ttlSeconds: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit);

  const value = await fetchFn();
  await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  return value;
}
```

```typescript
router.get("/plans", async (req, res) => {
  const plans = await cached("plans:all", 3600, () =>
    db.plan.findMany({ orderBy: { price: "asc" } })
  );
  res.json(plans);
});
```

> **Tip — TTL should match how stale is acceptable, not how long you want to "save load"**
> A 1-hour TTL on pricing plans is fine because plans rarely change and an hour of staleness costs nothing. The same TTL on order status would mean a user seeing "pending" for an hour after their order actually shipped. Set TTL based on the data's real-world volatility and the cost of showing stale data, not as a generic default.

---

## Invalidation: The Part That's Actually Hard

> "There are only two hard things in computer science: cache invalidation and naming things."

Caching without invalidation isn't caching — it's a slow-motion bug where writes silently stop being visible. Every write path that touches cached data needs an explicit invalidation step.

```typescript
router.post("/plans", authenticateAdmin, async (req, res) => {
  const plan = await db.plan.create({ data: parsed.data });
  await redis.del("plans:all"); // invalidate immediately on write
  res.status(201).json(plan);
});
```

> **Decision card — cache key design enables invalidation**
> Design cache keys around what changes together. `user:123:profile` can be invalidated precisely when user 123 updates their profile. A single giant cache blob covering multiple resources forces you to invalidate everything on any change, defeating the purpose. Granular keys cost a little more Redis memory and buy you precise, cheap invalidation.

---

## Cache Stampede Protection

When a popular cached key expires, many simultaneous requests can all miss at once and hammer the database with the same expensive query simultaneously — worse than having no cache at all for that moment.

```typescript
const locks = new Map<string, Promise<any>>();

export async function cachedWithLock<T>(
  key: string,
  ttlSeconds: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit);

  // If another request is already fetching this key, wait for it
  // instead of triggering a duplicate expensive query
  if (locks.has(key)) return locks.get(key);

  const promise = fetchFn().then(async (value) => {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
    locks.delete(key);
    return value;
  });
  locks.set(key, promise);
  return promise;
}
```

> **Tip — this matters most for your most expensive, most popular cached query**
> Not every cached endpoint needs stampede protection. Add it specifically to whichever query is both expensive to compute and hit by many concurrent requests — a public plans list, a popular dashboard aggregate. Low-traffic cached data doesn't need this complexity.

---

## HTTP Caching for Public Endpoints

For genuinely public, non-personalized GET endpoints, standard HTTP caching headers let CDNs and clients cache without hitting your server at all — far cheaper than even a Redis hit.

```typescript
router.get("/plans", async (req, res) => {
  const plans = await cached("plans:all", 3600, () => db.plan.findMany());
  res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=60");
  res.json(plans);
});
```

> **Warning — never set `Cache-Control: public` on personalized or authenticated responses**
> A response that includes anything specific to the requesting user (their orders, their profile) must never be marked publicly cacheable — a shared cache (CDN, proxy) could serve one user's data to another. Use `private` or omit caching headers entirely for anything gated by authentication.

---

## AI Prompt: Add Caching to an Endpoint

```
Add Redis-based caching to this endpoint using a cache-aside pattern:

[paste route handler]

Requirements:
- Cache key should be specific enough to invalidate precisely (not a
  single global key covering unrelated data)
- TTL of [X seconds] — [explain acceptable staleness for this data]
- Show every write path elsewhere in the codebase that would need to
  invalidate this cache key, and add the invalidation call
- If this endpoint is public and non-personalized, also add
  appropriate Cache-Control headers

[paste any related write routes/mutations that affect this data]
```

---

## Validating AI Output

- **Confirm every write path that affects cached data actually invalidates it.** This is the most commonly incomplete part of AI-generated caching code — it's easy to add the cache-aside read logic and forget to wire invalidation into every mutation.
- **Confirm cache keys aren't shared across unrelated data**, which would force broad invalidation and reintroduce staleness bugs elsewhere.
- **Confirm no personalized/authenticated response has public `Cache-Control` headers.** This is a real data-leak risk, not just a correctness issue.
- **Check the TTL choice is justified**, not a copy-pasted default — ask directly why that number was chosen for this specific data.

---

## Common Mistakes

- Adding caching before fixing the underlying slow query — hides the problem instead of solving it.
- Forgetting to invalidate on delete, only handling create/update.
- One giant cache key for "all data," forcing full invalidation on any single change.
- Public `Cache-Control` headers on authenticated, per-user responses.

---

## Validation Checklist

- [ ] Only genuinely cacheable data (rarely-changing, or acceptable-staleness) is cached
- [ ] Every write path that affects cached data has a matching invalidation call
- [ ] Cache keys are specific enough to invalidate precisely, not globally
- [ ] TTLs are chosen deliberately based on acceptable staleness, not a copy-pasted default
- [ ] Stampede protection is in place for the highest-traffic cached queries
- [ ] No `Cache-Control: public` on any authenticated or personalized response

---

## What's Next

With reads fast and cached appropriately, the next module — **Monitoring & Logging** — makes sure you actually find out when something breaks in production, instead of hearing about it from a user first.
