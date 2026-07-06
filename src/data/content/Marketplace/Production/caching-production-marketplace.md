---
title: Caching
slug: caching
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Caching (High-Availability Reads)

## The Risk and Reward of Stale Data

Caching is the only way a marketplace can survive a massive traffic spike (e.g., getting featured on a major news site). If 100,000 users hit your homepage simultaneously and every request queries Postgres, your database will crash.

However, caching is notoriously dangerous in marketplaces. If you cache a listing's inventory status incorrectly, a buyer might purchase an item that was sold 5 minutes ago. 

The production caching strategy requires distinguishing between **Safe Public Reads** and **Strict Transactional Reads**.

---

## Edge Caching and ISR (Incremental Static Regeneration)

Your Homepage, Category pages, and Listing Detail pages are subjected to massive read volume. They must be cached at the CDN Edge (Cloudflare / Vercel Edge Network).

**The Production Standard:**
Use **Stale-While-Revalidate (SWR)** or Next.js **ISR**.
1. When a buyer requests a Listing Page, the Edge returns the cached HTML instantly (`HIT`).
2. In the background, the Edge checks if the cache is older than `revalidate: 60` (seconds).
3. If it is, it fetches the fresh data from Postgres and updates the cache for the *next* visitor.

This guarantees sub-100ms response times globally while keeping data relatively fresh.

---

## Tag-Based Cache Invalidation

Waiting 60 seconds for a cache to clear is unacceptable if a seller just updated their listing price from $50 to $500.

**The Production Invalidation Strategy:**
Do not rely purely on time-based (`TTL`) expiration. Use **Tag-Based Invalidation** (e.g., Next.js `revalidateTag()`).

1. When rendering the Listing page, tag the database query: `fetch('/api/listings/123', { next: { tags: ['listing-123'] } })`.
2. When the seller submits a `PATCH /listings/123` to update the price, your API must call `revalidateTag('listing-123')`.
3. The CDN instantly purges that specific listing across all global edge nodes. The next buyer sees the new $500 price immediately.

---

## Distributed Redis Caching

For data that cannot be statically rendered (e.g., personalized recommendations, active cart counts, aggregate seller ratings), you cannot use in-memory caching (`new Map()`) in a serverless environment.

**The Production Approach:**
Use a **Distributed Redis Cache** (e.g., Upstash).
If calculating a seller's average rating takes 500ms of database computation, wrap that function in a Redis cache with a 5-minute TTL. Because Redis is shared across all serverless instances, you only pay that 500ms compute cost once every 5 minutes globally.

---

## The Transactional Boundary (What NEVER to Cache)

> [!CAUTION]
> Never cache data that is involved in a financial transaction or inventory allocation. 

When a buyer clicks "Proceed to Checkout", the API must execute a direct, uncached `SELECT ... FOR UPDATE` query against the Postgres primary database to verify the item is still available and the price hasn't changed.

**Never Cache:**
* Shopping Cart contents.
* Checkout summary screens (Taxes, Shipping, Total Price).
* Inventory availability checks during payment intent creation.
* Active messaging threads.

---

## Do's and Don'ts of Production Caching

- **DO cache aggressively for logged-out users.** A guest viewing the homepage should never touch your Postgres database.
- **DON'T cache authenticated endpoints globally.** If you accidentally apply a CDN `Cache-Control` header to `GET /api/user/settings`, User B might receive a cached response containing User A's private data.
- **DO use `Cache-Control: private` for sensitive data.** This instructs the browser to cache the data locally on the user's device, but explicitly forbids CDNs from caching it publicly.
- **DON'T build custom cache logic if the framework provides it.** Next.js App Router has advanced Data Caching built-in. Use it instead of writing custom Redis logic for every `fetch`.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Next.js Tag-Based Invalidation:**

````prompt
Act as a Senior Next.js Developer. Write a Server Action that handles a seller updating their listing price. It must validate the input with Zod, update the Prisma database, and explicitly call `revalidateTag()` to purge the Edge cache for that specific listing, ensuring buyers instantly see the new price.
````

> [!TIP]
> **Prompt 2 — Redis Caching Wrapper:**

````prompt
Write a Node.js utility function called `withRedisCache` that takes a unique cache key, a TTL (Time To Live), and a fallback database callback function. It should check Upstash Redis first. If the key exists, return the parsed JSON. If it misses, execute the database callback, store the result in Redis with the TTL, and return the result. Include proper error handling to fail gracefully (bypass the cache) if Redis goes down.
````

---

## Validating What AI Generates

- **Check for Invalidation Leaks:** If the AI generates an update function for a listing but forgets to include the cache invalidation step, reject it. Stale prices lead to chargebacks and angry sellers.
- **Verify Authentication Awareness:** If AI suggests caching a `GET /orders` endpoint at the Edge level, correct it immediately. Authenticated routes must bypass public CDN caches.

---

## Implementation Checklist

- [ ] Implemented Next.js ISR (Incremental Static Regeneration) or Edge Caching for high-traffic public pages (Home, Category, Listing).
- [ ] Configured Tag-Based Cache Invalidation to instantly purge stale data when a seller updates a listing.
- [ ] Deployed a Distributed Redis Cache (Upstash) for expensive aggregate queries (e.g., seller ratings).
- [ ] Audited the checkout and inventory flows to explicitly guarantee they bypass all caches and hit the primary database.
- [ ] Verified that all authenticated routes include `Cache-Control: no-store` or `private` to prevent cross-user data leakage at the CDN layer.

---

## What's Next

Next: **Backups** — Caching makes your application fast, but Backups ensure it survives a disaster. We will configure Point-in-Time Recovery (PITR), test restoration protocols, and secure off-site storage to guarantee you never lose your marketplace data.
