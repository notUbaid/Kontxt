---
title: Caching
slug: caching
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Caching

The Performance Optimization module explicitly told you to skip caching layers until you've measured a real need. This module is for when that point arrives — or for the narrower, lower-risk forms of caching that are worth adding even now, because they're cheap and hard to get wrong.

Caching's reputation for being dangerous is earned: stale data in a marketplace means showing a sold listing as available, or a buyer paying a price that's no longer correct. The goal here isn't "add caching everywhere" — it's "cache the few things that are expensive to compute and safe to serve slightly stale."

---

## The Caching Decision Tree

Before caching anything, ask one question: **what's the cost of this data being briefly wrong?**

> ** Core rule:** cache aggressively where staleness is harmless or cosmetic. Never cache where staleness causes a buyer to act on wrong information — pricing, availability, payment status.

| Data | Safe to cache? | Why |
|---|---|---|
| Seller average rating |  Yes, briefly | A rating that's a few minutes stale has no real consequence |
| Category list / static filters |  Yes, aggressively | Changes rarely, identical for all users |
| Listing search results | ️ Cache briefly (seconds, not minutes) | Staleness risk is low but real — a sold item lingering in cached search results is a bad experience |
| Listing detail page (price, status) |  No, or very short TTL with explicit invalidation | Directly affects purchase decisions |
| Order/payment status |  Never | Must always be current — this is the one place staleness is unacceptable |
| Authenticated user session/profile |  Don't cache server-side past the session itself | Permission and identity must always be current |

---

## Decision: What Kind of Cache

> ** Decision Card — Caching Approach**
>
> **Option A: In-memory cache** (e.g. a simple `Map` with TTL, or `node-cache`)
> Zero infrastructure, resets on restart, doesn't share across multiple server instances — fine for a single-server personal project.
>
> **Option B: Redis**
> Shared across instances, survives restarts, persistent — the right call once you're running more than one server instance or need caching to survive deploys.
>
> **Option C: HTTP/CDN caching** (`Cache-Control` headers on public, non-personalized responses)
> No backend code at all — the CDN or browser handles it. Best fit for static or rarely-changing public data.
>
> **For Personal Mode: use Option A for computed values (ratings, aggregates) and Option C for static public data (category lists).** Skip Redis until Performance Optimization's scale signals actually show up.

---

## Caching the Seller Rating

This connects directly to the Reviews module's "compute on read" decision — caching is what makes that decision scale without changing the underlying approach.

```js
const ratingCache = new Map(); // sellerId -> { value, expiresAt }
const TTL_MS = 5 * 60 * 1000; // 5 minutes — staleness here is harmless

async function getSellerRating(sellerId) {
  const cached = ratingCache.get(sellerId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const result = await db.review.aggregate({
    where: { sellerId },
    _avg: { rating: true },
    _count: true,
  });

  ratingCache.set(sellerId, { value: result, expiresAt: Date.now() + TTL_MS });
  return result;
}
```

> ** Validation Checklist**
- [ ] Is there a TTL, not an indefinite cache? (Indefinite caches are the most common source of "why is this showing old data" bugs)
- [ ] Is the cache invalidated (or just left to expire naturally) when a new review is submitted?
- [ ] Does the cache key correctly scope to the entity (per `sellerId`), not a single global value?

---

## Cache Invalidation: The Part People Actually Get Wrong

There's a well-known saying that cache invalidation is one of the genuinely hard problems in computer science — not because the code is complex, but because it's easy to forget an invalidation path exists and silently ship stale data.

> ** Common Hallucination:** AI will often add a cache with a TTL but skip explicit invalidation entirely, relying purely on expiry. For low-stakes data (ratings) that's an acceptable tradeoff. For anything closer to "is this still purchasable," relying on TTL alone instead of invalidating immediately on the relevant write (e.g. when a listing's status changes to `sold`) means a real window where buyers can see incorrect availability.

```js
// When a listing status changes, invalidate immediately — don't wait for TTL
async function updateListingStatus(listingId, newStatus) {
  await db.listing.update({ where: { id: listingId }, data: { status: newStatus } });
  searchResultsCache.deletePattern(`listings:*`); // invalidate any cached search pages containing it
}
```

> **️ Warning:** if you can't cleanly invalidate a cache when the underlying data changes, that's a signal the data shouldn't be cached at all — or needs a much shorter TTL than you'd otherwise choose. Don't reach for complex invalidation logic to justify caching something that's safer left uncached.

---

## HTTP Caching for Static Public Data

Category lists, platform-wide settings, and similar rarely-changing public data don't need application-level caching at all — let HTTP do it.

```js
router.get("/categories", (req, res) => {
  res.set("Cache-Control", "public, max-age=3600"); // 1 hour — browsers and CDNs handle it
  res.json(CATEGORIES);
});
```

> ** Why this matters:** this requires zero backend caching infrastructure and offloads the work to browsers and any CDN in front of your app. It's the cheapest possible caching win, and it's available right now with no new dependencies.

---

## What NOT to Cache

> ** Validation Checklist — Never cache these**
- [ ] Order status / payment confirmation
- [ ] Listing price or availability on the detail page where a purchase happens
- [ ] Anything inside an authenticated, per-user response (messages, "my listings," account settings)
- [ ] Search results beyond a few seconds — long enough to deduplicate identical rapid requests, not long enough to show meaningfully outdated availability

---

## AI Prompt: Add Safe Caching

> ** Copy Prompt**
>
> ```
> Add caching to my marketplace project, but only where staleness is safe.
> This is a personal project — use in-memory caching, not Redis.
>
> Specifically:
> 1. Cache seller average rating with a 5-minute TTL
> 2. Add Cache-Control headers to the public categories/static-data endpoint
> 3. Do NOT cache: order status, payment status, listing price/availability on the
>    detail page, or any authenticated per-user data
> 4. For anything you do cache, show how it gets invalidated when the underlying
>    data changes — don't rely on TTL alone if the data affects a purchase decision
>
> Existing code:
> [PASTE RELEVANT ROUTE/SERVICE FILES]
> ```
>
> **Why this prompt works:** the explicit "do NOT cache" list prevents AI's general tendency to cache aggressively for performance — which is the right instinct for a generic app but actively dangerous in a marketplace where stale data means showing wrong prices or sold-out items as available.

---

## Validating AI Output

> ** Validation Checklist**
- [ ] Does every cached value have a TTL — no indefinite caches?
- [ ] Is order/payment/price data confirmed as explicitly excluded from caching?
- [ ] Where invalidation is shown, does it trigger on the actual write path (e.g. listing status update), not just rely on expiry?
- [ ] Are cache keys scoped correctly (per-seller, per-listing), not accidentally shared/global?

---

## Token Efficiency Tip

Caching decisions are short and don't need much code context — you mostly need AI to reason about *what's safe to cache*, not generate large amounts of caching infrastructure. Keep this prompt focused on the specific values you're considering caching rather than pasting your whole data layer.

---

## What You've Decided

By the end of this module you should have:

- A short, deliberate list of what's safe to cache and what's explicitly excluded
- In-memory TTL-based caching for low-stakes computed values like ratings
- HTTP `Cache-Control` headers for static public data, with zero backend caching code
- Explicit invalidation on the write path for anything closer to purchase-affecting data
- Confidence that order, payment, and listing-availability data is never served stale

**Next:** Backups — making sure a database mistake doesn't mean losing your marketplace's data permanently.
