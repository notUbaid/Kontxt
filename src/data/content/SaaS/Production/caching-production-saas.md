---
title: Caching
slug: caching
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Caching

Every request that hits your database costs time and money. Many of those requests ask for the same data that was fetched 50 milliseconds ago. Caching is the discipline of not doing the same work twice.

Done well, caching makes your application feel instant, reduces database load by 80%+, and cuts infrastructure costs as you scale. Done badly, it serves stale data, masks bugs, and creates invalidation nightmares that are genuinely hard to debug.

The goal is not to cache everything. The goal is to cache the right things, for the right duration, with a clear strategy for when data changes.

---

## The Caching Hierarchy

Data moves through several layers before reaching your user. Each layer is an opportunity.

```
Browser Cache
      ↓
CDN / Edge Cache         ← Static assets, public pages
      ↓
Application Cache        ← Redis, in-memory
      ↓
Database Query Cache     ← Connection-level, short TTL
      ↓
Database
```

You don't need all layers on day one. Understand the hierarchy so you add layers in the right order.

---

## What to Cache — and What Not to

This is the most important decision in caching. Get it wrong and you serve stale data to paying users.

### Cache These

| Data | Why | TTL |
|---|---|---|
| Public marketing pages | Never user-specific | Hours to days |
| Static assets (JS, CSS, images) | Never changes between deploys | Long (with cache-busting) |
| User session / auth tokens | Read on every request | Minutes to hours |
| Expensive database aggregations | Slow to compute, infrequently changed | Minutes |
| Third-party API responses | Rate-limited, slow, costs money | Minutes to hours |
| Feature flags | Same for all users on a plan | Seconds to minutes |
| Plan / subscription data | Read constantly, changes rarely | Minutes |

### Do Not Cache These

| Data | Why |
|---|---|
| Payment processing results | Must be real-time, no margin for stale state |
| Auth decisions (can this user access X?) | Stale permissions are a security vulnerability |
| User-generated content being actively edited | Concurrent edits require real-time reads |
| Anything where stale = incorrect billing | Revenue integrity depends on accuracy |
| Webhook delivery status | Must reflect actual delivery state |

> **The rule:** if serving stale data has a business or security consequence, don't cache it — or use a very short TTL with explicit invalidation.

---

## Caching Strategies

### Cache-Aside (Lazy Loading)

The most common pattern. Check cache first, fetch from database on miss, populate cache.

```typescript
async function getUser(userId: string): Promise<User> {
  const cacheKey = `user:${userId}`

  // 1. Check cache
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  // 2. Cache miss — fetch from DB
  const user = await db.users.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundError()

  // 3. Populate cache
  await redis.set(cacheKey, JSON.stringify(user), { ex: 300 }) // 5 min TTL

  return user
}
```

**Pros:** Only caches what's actually requested. Simple to implement.
**Cons:** First request after expiry is slow (cache miss penalty).

### Write-Through

Write to cache and database simultaneously on every mutation.

```typescript
async function updateUser(userId: string, data: Partial<User>): Promise<User> {
  // 1. Write to database
  const updated = await db.users.update({ where: { id: userId }, data })

  // 2. Immediately update cache
  await redis.set(`user:${userId}`, JSON.stringify(updated), { ex: 300 })

  return updated
}
```

**Pros:** Cache is always fresh after a write. No stale reads after updates.
**Cons:** Every write hits both systems. More complex.

### Cache Invalidation

Explicitly delete cache entries when underlying data changes.

```typescript
async function deleteUser(userId: string): Promise<void> {
  await db.users.delete({ where: { id: userId } })

  // Invalidate all related cache keys
  await redis.del([
    `user:${userId}`,
    `user:${userId}:permissions`,
    `team:${user.teamId}:members`
  ])
}
```

Use invalidation when a mutation affects multiple cache keys or when cache TTL would be too long to wait out.

---

## Redis — The Production Standard

Redis is the default choice for application-layer caching in SaaS. It's fast, supports rich data types, handles expiry natively, and works across multiple server instances.

### Managed Redis Options

| Provider | Best For |
|---|---|
| **Upstash** | Serverless / edge deployments, pay-per-request |
| **Redis Cloud** | Traditional server deployments, more control |
| **AWS ElastiCache** | Already on AWS, high throughput |
| **Railway / Render Redis** | Simple deployments, low ops overhead |

> **For most SaaS on Vercel / serverless:** Upstash. It's HTTP-based (no persistent connections), scales to zero, and is trivial to set up.

### Basic Redis Client Setup

```typescript
// lib/redis.ts
import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
})

// Type-safe cache helpers
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const value = await redis.get<string>(key)
    if (!value) return null
    try {
      return JSON.parse(value) as T
    } catch {
      return value as unknown as T
    }
  },

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    await redis.set(key, JSON.stringify(value), { ex: ttlSeconds })
  },

  async del(keys: string | string[]): Promise<void> {
    if (Array.isArray(keys)) {
      await redis.del(...keys)
    } else {
      await redis.del(keys)
    }
  },

  async invalidatePattern(pattern: string): Promise<void> {
    // Use sparingly — SCAN is expensive on large keyspaces
    const keys = await redis.keys(pattern)
    if (keys.length > 0) await redis.del(...keys)
  }
}
```

---

## Cache Key Design

Poor key design is the most common source of caching bugs. Keys must be:

- **Unique** — different data must never share a key
- **Predictable** — you must be able to construct the key to invalidate it
- **Namespaced** — avoid collisions between features and environments

```typescript
// Good key patterns
`user:${userId}`                          // Single entity
`user:${userId}:permissions`              // Entity sub-resource
`team:${teamId}:members`                  // Collection
`ai:usage:${userId}:${month}`             // Scoped aggregation
`plan:${planId}:features`                 // Reference data
`session:${sessionId}`                    // Session data

// Bad key patterns
`user`                  // Not unique
`data_${userId}`        // Inconsistent format
`cache1`                // Meaningless
```

### Namespace by Environment

```typescript
const prefix = process.env.NODE_ENV === "production" ? "prod" : "dev"
const key = `${prefix}:user:${userId}`
```

This prevents dev and staging data from polluting your production cache if they share a Redis instance.

---

## HTTP Caching — CDN and Browser

Not all caching requires Redis. HTTP cache headers are free, require no infrastructure, and can eliminate entire categories of requests.

### Static Assets

```typescript
// next.config.js
headers: [
  {
    source: "/_next/static/:path*",
    headers: [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable"
        // 1 year — Next.js content-hashes filenames so stale is impossible
      }
    ]
  }
]
```

### Public API Responses

```typescript
// Cache a public endpoint at the CDN layer
export async function GET(req: Request) {
  const data = await getPublicPricingPlans()

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
      // CDN serves cached version for 1 hour
      // Serves stale up to 24 hours while revalidating in background
    }
  })
}
```

### Authenticated Responses — Never Cache at CDN

```typescript
// Authenticated responses must never be CDN-cached
return Response.json(userData, {
  headers: {
    "Cache-Control": "private, no-store"
    // private: only browser cache, not CDN
    // no-store: don't cache at all (user-specific sensitive data)
  }
})
```

> Serving one user's data to another user via a misconfigured CDN cache is a serious privacy incident. Always set `Cache-Control: private` or `no-store` on authenticated responses.

---

## Next.js Data Cache

Next.js has a built-in data cache that works without Redis for server-side rendering and server components.

```typescript
// Cache a fetch for 1 hour, revalidate in background
const plans = await fetch("https://api.example.com/plans", {
  next: { revalidate: 3600 }
})

// Cache indefinitely until explicitly invalidated
const config = await fetch("https://api.example.com/config", {
  next: { tags: ["config"] }
})

// Invalidate by tag on mutation
import { revalidateTag } from "next/cache"
revalidateTag("config")

// Never cache (equivalent to no-store)
const liveData = await fetch("https://api.example.com/live", {
  cache: "no-store"
})
```

Use this for server-rendered pages and server components before reaching for Redis. It's zero-infrastructure and deeply integrated with Next.js rendering.

---

## Caching AI Responses

AI calls are your most expensive operations. Cache them aggressively where the output is deterministic.

```typescript
async function getAiSummary(documentId: string, contentHash: string) {
  // Key includes content hash — cache invalidates if content changes
  const cacheKey = `ai:summary:${documentId}:${contentHash}`

  const cached = await cache.get<string>(cacheKey)
  if (cached) return cached

  const summary = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: `Summarise: ${document.content}` }]
  })

  const result = summary.choices[0].message.content!

  // Cache for 24 hours — same content = same summary
  await cache.set(cacheKey, result, 86400)

  return result
}
```

**What to cache:** Summaries, classifications, embeddings, generated reports — anything where the same input produces the same useful output.

**What not to cache:** Conversational responses, personalised content, anything where the user expects fresh generation.

---

## Cache Stampede Prevention

When a popular cache key expires, many requests arrive simultaneously, all find a miss, and all hammer the database at once. This is a cache stampede.

```typescript
// Prevent stampede with a mutex lock
import { Mutex } from "async-mutex"
const mutex = new Mutex()

async function getExpensiveData(key: string) {
  const cached = await cache.get(key)
  if (cached) return cached

  // Only one request computes, others wait
  return mutex.runExclusive(async () => {
    // Re-check after acquiring lock — may have been populated
    const cached = await cache.get(key)
    if (cached) return cached

    const data = await computeExpensiveData()
    await cache.set(key, data, 300)
    return data
  })
}
```

Alternatively, use probabilistic early expiration: begin refreshing the cache slightly before it expires, so it's always warm.

---

## Observability — Is Your Cache Working?

A cache that isn't measured isn't managed.

```typescript
async function getCachedUser(userId: string) {
  const start = Date.now()
  const cached = await cache.get<User>(`user:${userId}`)

  if (cached) {
    logger.info("cache.hit", { key: `user:${userId}`, latencyMs: Date.now() - start })
    return cached
  }

  logger.info("cache.miss", { key: `user:${userId}` })
  // ...fetch and populate
}
```

**Metrics to track:**
- Cache hit rate per key type (target: >80% for stable data)
- Cache miss latency vs cache hit latency
- Redis memory usage and eviction rate
- Keys near expiry on high-traffic data

A hit rate below 50% on data you expect to be hot usually means your TTL is too short or your key design has a bug.

---

## AI Prompt — Caching Strategy Design

<copy-prompt>
You are a Staff Engineer helping design a caching strategy for a production SaaS application.

My application:
- Stack: [YOUR STACK]
- Database: [DATABASE]
- Hosting: [SERVERLESS / CONTAINERS / VMS]
- Expected traffic: [REQUESTS PER DAY ESTIMATE]
- Most frequent read operations: [LIST YOUR TOP 5 MOST COMMON DATA READS]
- Most expensive operations: [LIST SLOW QUERIES, AI CALLS, EXTERNAL API CALLS]
- Plans/tiers: [DESCRIBE YOUR USER TIERS]

Design a caching strategy including:
1. What to cache at each layer (HTTP headers, Next.js cache, Redis)
2. Cache key naming conventions for my data model
3. TTL recommendations per data type with reasoning
4. Invalidation strategy for each cached entity
5. How to cache AI/LLM responses safely
6. What NOT to cache and why
7. How to measure cache effectiveness

Be specific about my stack. Prioritise simplicity over sophistication.
</copy-prompt>

---

## Caching Checklist

- [ ] Redis (or equivalent) provisioned and connected
- [ ] Cache key naming convention documented and consistent
- [ ] Keys namespaced by environment (dev / staging / prod)
- [ ] TTLs defined per data type — not one global TTL
- [ ] Cache-aside or write-through pattern applied to frequent reads
- [ ] Invalidation implemented for every entity that gets mutated
- [ ] Static assets served with long-lived `Cache-Control: immutable`
- [ ] Authenticated API responses set `Cache-Control: private`
- [ ] Public API responses use `s-maxage` for CDN caching
- [ ] AI / LLM responses cached where output is deterministic
- [ ] Cache hit/miss events logged
- [ ] Cache hit rate measurable and being monitored
- [ ] Redis memory limit and eviction policy configured
- [ ] Cache stampede considered for high-traffic keys
- [ ] Tested: mutations correctly invalidate related cache keys
- [ ] Tested: cache returns correct data after invalidation

---

## Common Mistakes

> **Mistake: Caching authenticated responses at the CDN**
> One misconfigured `Cache-Control` header can serve User A's dashboard to User B. Always set `private` or `no-store` on anything user-specific.

> **Mistake: No cache invalidation strategy**
> Setting a TTL and hoping data isn't too stale is not a strategy. Every cached entity needs an explicit invalidation path when it changes.

> **Mistake: Caching too aggressively with long TTLs**
> A 24-hour TTL on a user's plan data means a user who upgrades might not see their new features until tomorrow. Match TTL to how quickly staleness causes user-visible problems.

> **Mistake: Using `redis.keys()` for bulk invalidation in production**
> `KEYS` is a blocking operation on large keyspaces. It can freeze your Redis instance. Use `SCAN` for pattern-based invalidation, or design keys so you can target them directly.

> **Mistake: Not caching AI responses**
> The same document gets summarised 50 times by 50 users. Each call costs money and takes 3 seconds. A content-hash cache key makes it instant and free after the first call.

---

## Next

With caching reducing load on your database and infrastructure, the next topic is **Backups** — ensuring that when data loss happens (and it will), you can recover completely and quickly.
