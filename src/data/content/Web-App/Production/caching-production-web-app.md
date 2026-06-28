---
title: Caching
slug: caching
phase: Phase 4
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Caching

Caching is not an optimization you add when things get slow. It is an architectural decision that shapes how your data flows through your system.

Done right, caching reduces database load by 80–95%, cuts API response times from hundreds of milliseconds to single digits, and makes your application feel instant. Done wrong, it serves stale data, causes subtle bugs, and becomes a source of production incidents.

---

## The Caching Mental Model

Before you cache anything, answer three questions:

```
1. How often does this data change?
2. How expensive is it to compute or fetch?
3. How bad is it if a user sees stale data?
```

| Data | Changes | Cost | Staleness Risk | Cache? |
|---|---|---|---|---|
| User profile | Rarely | Low | Medium | Yes — long TTL |
| Product catalog | Occasionally | Medium | Low | Yes — medium TTL |
| Dashboard stats | Frequently | High | Low | Yes — short TTL |
| User notifications | Often | Low | High | No — or very short TTL |
| Financial balances | Real-time | Low | Critical | No |
| Public landing page | Rarely | Low | None | Yes — CDN |

---

## Caching Layers

Production applications cache at multiple levels simultaneously:

```
[Browser Cache]          → Static assets, API responses with cache headers
       ↓
[CDN / Edge Cache]       → Public pages, API responses, static files
       ↓
[Application Cache]      → Redis: computed results, DB query results, sessions
       ↓
[Database Query Cache]   → Postgres: query plan cache (automatic)
       ↓
[Database]               → Source of truth
```

Each layer serves a different purpose. Don't collapse them into one.

---

## Part 1: Redis Application Cache

Redis is your primary application-level cache. If you already have it for background jobs, you're using the same instance.

### Cache Client Abstraction

Never scatter raw Redis calls throughout your codebase. Wrap it.

```typescript
// lib/cache.ts
import { Redis } from 'ioredis';
import { logger } from './logger';

const redis = new Redis(process.env.REDIS_URL!, {
  enableReadyCheck: false,
  lazyConnect: true,
});

type CacheOptions = {
  ttl?: number; // seconds
  tags?: string[]; // for tag-based invalidation
};

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redis.get(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (err) {
      logger.warn({ key, err }, 'Cache get failed — falling through to source');
      return null; // Fail open: cache miss is safe
    }
  },

  async set(key: string, value: unknown, options: CacheOptions = {}): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (options.ttl) {
        await redis.setex(key, options.ttl, serialized);
      } else {
        await redis.set(key, serialized);
      }
    } catch (err) {
      logger.warn({ key, err }, 'Cache set failed — continuing without cache');
      // Fail open: not caching is safe, not serving data is not
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (err) {
      logger.warn({ key, err }, 'Cache delete failed');
    }
  },

  async delByPattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (err) {
      logger.warn({ pattern, err }, 'Cache pattern delete failed');
    }
  },
};
```

> **Fail open.** If Redis is down, your application should continue working — just slower. Never let a cache failure take down your API. Always catch errors and fall through to the source of truth.

---

### Cache-Aside Pattern

The most common pattern. Check cache first; on miss, fetch from DB and populate cache.

```typescript
// services/productService.ts
import { cache } from '../lib/cache';
import { prisma } from '../lib/prisma';
import { NotFoundError } from '../lib/errors';

const CACHE_TTL = {
  product: 60 * 10,       // 10 minutes
  productList: 60 * 5,    // 5 minutes
  userProfile: 60 * 30,   // 30 minutes
} as const;

export async function getProduct(productId: string) {
  const cacheKey = `product:${productId}`;

  // 1. Check cache
  const cached = await cache.get(cacheKey);
  if (cached) return cached;

  // 2. Cache miss — fetch from DB
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true, images: true },
  });

  if (!product) throw new NotFoundError('Product');

  // 3. Populate cache
  await cache.set(cacheKey, product, { ttl: CACHE_TTL.product });

  return product;
}

export async function updateProduct(productId: string, data: UpdateProductInput) {
  const product = await prisma.product.update({
    where: { id: productId },
    data,
  });

  // Invalidate on write
  await cache.del(`product:${productId}`);
  await cache.delByPattern('product:list:*'); // Invalidate list caches

  return product;
}
```

---

### Cache Key Design

Poorly designed cache keys cause cache collisions, stale data, and impossible-to-debug bugs.

```typescript
//  Good cache key patterns
`product:${id}`                          // Single resource
`product:list:page:${page}:limit:${limit}`  // Paginated list
`user:${userId}:profile`                 // User-scoped resource
`user:${userId}:orders:page:${page}`     // User-scoped list
`analytics:dashboard:${tenantId}:${date}` // Tenant + date scoped
`search:${encodeURIComponent(query)}:page:${page}` // Search results

//  Bad cache key patterns
`products`                  // Too broad — invalidates everything on any change
`list`                      // Collides across entity types
`${userId}`                 // No namespace — what does this hold?
`cache_${Math.random()}`    // Uncacheable by definition
```

**Rules:**
- Always namespace by entity type: `product:`, `user:`, `order:`
- Include all parameters that affect the result
- Keep keys deterministic — same inputs always produce same key
- Use `:` as a separator for readability and pattern matching

---

## Part 2: Write Strategies

### Cache-Aside (Lazy Loading)
Best for read-heavy data. Populate on first miss.

```
Read:  Cache hit? → return. Cache miss? → DB → cache → return.
Write: Update DB → invalidate cache key.
```

### Write-Through
Write to cache and DB simultaneously. Keeps cache always warm but adds write latency.

```typescript
async function updateUserProfile(userId: string, data: UpdateProfileInput) {
  const [updated] = await Promise.all([
    prisma.user.update({ where: { id: userId }, data }),
    cache.del(`user:${userId}:profile`), // Or set the new value directly
  ]);
  return updated;
}
```

### Write-Behind (Write-Back)
Write to cache immediately, sync to DB asynchronously. Fastest writes. Risk of data loss on cache failure. Use only when eventual consistency is acceptable.

> For most web apps: **cache-aside for reads, invalidate on write.** Simple, correct, debuggable.

---

## Part 3: TTL Strategy

TTL (Time To Live) is your safety net for cache invalidation failures.

```typescript
const TTL = {
  // Near-static data
  publicConfig: 60 * 60 * 24,    // 24h
  featureFlags: 60 * 60,          // 1h
  
  // Slow-changing data
  userProfile: 60 * 30,           // 30 min
  productDetails: 60 * 15,        // 15 min
  
  // Moderate freshness required
  dashboardStats: 60 * 5,         // 5 min
  searchResults: 60 * 2,          // 2 min
  
  // Near real-time
  notificationCount: 30,          // 30 sec
  activeUserCount: 10,            // 10 sec
  
  // Session data
  session: 60 * 60 * 24 * 7,     // 7 days
} as const;
```

> **Set TTL on everything.** A cache key without a TTL lives forever and will serve stale data indefinitely. The only exception is session data with explicit logout invalidation.

---

## Part 4: HTTP Caching

Application-level Redis caching is for your backend. HTTP caching is for your clients and CDN. Both matter.

### Cache-Control Headers

```typescript
// middleware/cacheHeaders.ts

export function publicCache(maxAge: number) {
  return (_req, res, next) => {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}, stale-while-revalidate=${maxAge * 2}`);
    next();
  };
}

export function privateCache(maxAge: number) {
  return (_req, res, next) => {
    res.setHeader('Cache-Control', `private, max-age=${maxAge}`);
    next();
  };
}

export function noCache() {
  return (_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  };
}
```

```typescript
// Apply to routes
router.get('/products', publicCache(300), asyncHandler(getProducts));         // CDN-cacheable
router.get('/user/profile', privateCache(60), asyncHandler(getUserProfile));  // Browser only
router.get('/user/balance', noCache(), asyncHandler(getUserBalance));         // Never cache
```

### ETags for Conditional Requests

```typescript
import { createHash } from 'crypto';

export function etagMiddleware(req, res, next) {
  const originalJson = res.json.bind(res);
  
  res.json = (body) => {
    const etag = `"${createHash('md5').update(JSON.stringify(body)).digest('hex')}"`;
    res.setHeader('ETag', etag);
    
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end(); // Not Modified — save bandwidth
    }
    
    return originalJson(body);
  };
  
  next();
}
```

> **ETag impact:** Clients that already have the data send `If-None-Match`. Your server validates and returns `304 Not Modified` — no body, just headers. Reduces bandwidth by 50–90% for repeat requests.

---

## Part 5: Memoization for Expensive In-Process Computations

Some computations are expensive but don't need cross-server caching. Memoize in-process.

```typescript
// lib/memoize.ts

export function memoize<T>(
  fn: (...args: unknown[]) => Promise<T>,
  options: { ttl: number; maxSize?: number } = { ttl: 60000 }
) {
  const cache = new Map<string, { value: T; expiresAt: number }>();

  return async (...args: unknown[]): Promise<T> => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() < cached.expiresAt) {
      return cached.value;
    }

    const value = await fn(...args);
    cache.set(key, { value, expiresAt: Date.now() + options.ttl });

    // Evict if too large
    if (options.maxSize && cache.size > options.maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }

    return value;
  };
}
```

```typescript
// Usage
const getFeatureFlags = memoize(
  async () => prisma.featureFlag.findMany({ where: { enabled: true } }),
  { ttl: 60 * 1000 * 5 } // 5 minutes in-process
);
```

> Use in-process memoization for config, feature flags, and lookup tables that are read thousands of times per second. It avoids Redis round-trips entirely for the hottest paths.

---

## Part 6: Cache Stampede Prevention

When a popular cache key expires, hundreds of concurrent requests can simultaneously miss and hammer the database. This is a cache stampede.

```typescript
// lib/cache.ts — add to existing cache client

const inflightRequests = new Map<string, Promise<unknown>>();

export async function getOrSet<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  // 1. Check cache
  const cached = await cache.get<T>(key);
  if (cached !== null) return cached;

  // 2. Deduplicate concurrent fetches for the same key
  const inflight = inflightRequests.get(key) as Promise<T> | undefined;
  if (inflight) return inflight;

  // 3. Single fetch, all waiters share the result
  const fetchPromise = (async () => {
    const value = await fetcher();
    await cache.set(key, value, options);
    inflightRequests.delete(key);
    return value;
  })();

  inflightRequests.set(key, fetchPromise);
  return fetchPromise;
}
```

```typescript
// Usage — replaces manual cache-aside
export async function getProduct(productId: string) {
  return getOrSet(
    `product:${productId}`,
    () => prisma.product.findUniqueOrThrow({ where: { id: productId } }),
    { ttl: CACHE_TTL.product }
  );
}
```

---

## Part 7: What Not to Cache

> Knowing what to skip is as important as knowing what to cache.

| Never Cache | Why |
|---|---|
| Authentication tokens | Security — must invalidate on logout |
| Payment / financial state | Must always reflect real-time truth |
| User-specific write results | High invalidation complexity, low benefit |
| Large binary data | Store in S3/CDN instead |
| Highly personalized feeds | Cache hit rate too low |
| Audit logs | Must be real-time and tamper-proof |
| Anything with user PII in the key | Key exposure leaks data |

---

## Implementation Checklist

- [ ] Redis cache client wrapped with error handling (fail open)
- [ ] Cache keys namespaced by entity type with consistent format
- [ ] TTL set on every cached key — nothing lives forever
- [ ] Cache invalidated on every write to affected data
- [ ] `getOrSet` helper used for stampede prevention on hot keys
- [ ] HTTP `Cache-Control` headers set on public API routes
- [ ] Authenticated routes use `private` or `no-store` cache headers
- [ ] ETags implemented for bandwidth reduction on repeat requests
- [ ] In-process memoization used for feature flags and config
- [ ] Sensitive data (tokens, balances, PII) explicitly excluded from caching
- [ ] Cache TTLs documented per entity type in one central location

---

## AI Prompt: Cache Strategy Review

```prompt
You are a senior backend engineer reviewing the caching strategy for a production Node.js web application.

Database: [your DB]
Cache layer: Redis via BullMQ (ioredis)
Framework: [Express / Fastify / Next.js API routes]

Here are my current cached resources and TTLs:
[paste your TTL config and cache-aside implementations]

Here are my write paths:
[paste relevant update/delete service functions]

Review for:
1. Cache keys that could collide across tenants or users
2. Write operations that forget to invalidate related cache keys
3. Data that should not be cached for security or consistency reasons
4. Missing stampede protection on high-traffic keys
5. TTLs that are too long given how often the underlying data changes

Return specific findings with file/function references.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| No TTL on cache keys | Stale data served indefinitely | Always set TTL |
| Cache failure crashes the request | Worse availability than no cache | Always fail open |
| Caching user A's data under a shared key | User B sees User A's data | Include `userId` in key |
| Invalidating only the item, not lists | List endpoints serve deleted items | Invalidate `list:*` pattern on writes |
| Caching financial or auth-sensitive data | Serving wrong balance, session bypass | Explicitly exclude these |
| Not caching at CDN level for public routes | Paying DB cost for every crawler hit | Add `Cache-Control: public` on public routes |
| Cache stampede on popular key expiry | DB spike, potential outage | Use `getOrSet` with inflight dedup |

---

## Next: Security →

With caching in place, the final backend topic is hardening your application against the most common and damaging attack vectors.
