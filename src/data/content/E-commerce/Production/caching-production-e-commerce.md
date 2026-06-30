---
title: Caching
slug: caching
phase: Phase 4
mode: production
projectType: ecommerce
estimatedTime: 15-20 min
---

# Caching

Rate limiting protected your store from abuse. Caching makes the legitimate traffic fast and cheap to serve. For a store, the catch is that not everything is safe to cache the same way — a stale product description is harmless, a stale stock count or price is not.

---

## Where This Fits

You're optimizing endpoints and pages you already built: product listings, product detail pages, search results, cart, checkout. The goal isn't "cache everything" — it's knowing exactly which pieces tolerate staleness and which don't.

---

## The Core Rule for E-Commerce Caching

Split everything in your store into two categories before you cache anything:

> **✅ Safe to cache (changes rarely, low cost of being briefly stale):**
> Product descriptions, images, category pages, store pages (About, Returns Policy), blog/SEO content.

> **⚠️ Never cache without care (changes often, high cost of being wrong):**
> Stock/inventory counts, prices, cart contents, checkout state, order status, anything tied to a logged-in user's account.

Most beginner caching mistakes come from treating these two categories the same way. A product page can be cached for an hour with no real harm. A "12 left in stock" badge cached for an hour can sell a product you don't have.

---

## What You're Building Today

- Static/long-cache for product and category pages
- Short-cache or no-cache for stock and price data, even on the same page
- Cache invalidation triggered when a product is updated or stock changes
- No caching at all for cart, checkout, account, and order data

You're **not** building a custom caching layer, a CDN, or a Redis cache for every query. For personal-scale traffic, your framework's built-in caching (Next.js, for example) and your host's CDN cover nearly everything you need.

---

## Choosing Your Approach by Content Type

| Content | Cache Strategy | Typical Duration |
|---|---|---|
| Product description, images, category pages | Static generation + CDN cache | Hours to days, until product is edited |
| Stock count / price | No cache, or cache 30-60 sec max | Seconds, or live |
| Search results | Short cache, keyed by query | 1-5 min |
| Cart / checkout | Never cached | — |
| Account / order history | Never cached | — |
| Homepage (featured products) | Cached, revalidated on product change | Minutes to hours |

> **💡 Tip:** A common pattern that resolves the "static page, live stock" tension cleanly: render the product page itself as static/cached, but fetch the live stock count client-side or via a fast, uncached API call. The page loads instantly; the number that actually changes stays accurate.

---

## Implementation

**Copy Prompt:**

```
I'm adding caching to a personal e-commerce store built with [your
framework] deployed on [your host].

Set up:
1. Static generation with revalidation for product pages — cache for
   1 hour, but invalidate immediately when that specific product is
   updated (use on-demand revalidation, not just a timer)
2. A live, uncached endpoint for stock count and price that the product
   page fetches client-side, so the page shell can stay cached even
   though stock changes frequently
3. Explicit no-cache headers on cart, checkout, and account routes
4. Short cache (1-5 min) on search results, keyed by the search query

Show me the revalidation trigger first — specifically how product
updates in the admin/database actually invalidate the cached page,
since that's the part most likely to be wrong if left implicit.
```

> **⚠️ Warning:** Time-based cache expiry alone ("just cache it for an hour") is not enough for product data. If you update a price or mark something out of stock, the cached page should invalidate *immediately*, not whenever the timer happens to expire. Ask explicitly for on-demand/event-based revalidation, not just a duration.

---

## Cache Invalidation: The Part People Skip

Caching is easy. Knowing *when to throw the cache away* is the actual engineering problem. For your store, invalidate when:

- A product's price, stock, or description is edited in the admin
- A product is deleted or unpublished
- An order is placed that affects stock count
- A coupon/discount is created, edited, or expired

> **✅ Best Practice:** Tie invalidation directly to the write action that changes the data — when the admin saves a product edit, that same code path should trigger the revalidation. Don't rely on a separate cron job to "eventually" catch up; that reintroduces the staleness you were trying to avoid.

---

## Common Mistakes

- Caching the entire product page including stock count, leading to "Add to Cart" working on a page that's been sold out for an hour
- Caching API responses that include user-specific data (e.g., "is this in *your* wishlist") under a shared cache key, leaking one user's state to another
- Setting a long cache duration "to be safe" without setting up invalidation, so edits in the admin don't show up until the cache happens to expire
- Caching checkout or payment-related responses at all, even briefly — these must always reflect the current cart and price
- Forgetting that cached pages served from a CDN may be geographically distributed — an invalidation needs to actually purge all edge locations, not just your origin server

---

## Security & Correctness Checklist

- [ ] Stock count and price are either uncached or cached for seconds, never hours
- [ ] Cart, checkout, and account pages send explicit no-cache headers
- [ ] Product edits trigger immediate cache invalidation, not just timer-based expiry
- [ ] No cached response includes data specific to one logged-in user under a shared cache key
- [ ] Search result caching doesn't leak one user's personalized results (if you have any) to another

---

## Validation Checklist

Before moving to Backups:

- [ ] Edit a product's price in the admin and confirm the storefront reflects it within seconds, not after a full cache cycle
- [ ] Mark a product out of stock and confirm "Add to Cart" disables promptly on the live storefront
- [ ] Load the cart and account pages and confirm response headers show no-cache (check browser dev tools, Network tab)
- [ ] Run a Lighthouse/PageSpeed check on a product page before and after — caching should show a measurable load-time improvement

---

## AI Review Prompt

```
Review this caching implementation for an e-commerce store. Check:

1. Is stock or price data ever served from a cache longer than a few
   seconds, anywhere in the app?
2. Does editing a product in the admin actually invalidate the cached
   storefront page immediately, or only after a timer expires?
3. Is any cached response keyed in a way that could leak one logged-in
   user's data to another?
4. Are cart, checkout, and account routes explicitly excluded from
   caching?

Flag anything where stale data could cause a customer to see incorrect
pricing or availability.
```

---

## What Comes Next

Your store is fast and your live data stays accurate. Next: **Backups** — making sure a bad deploy, accidental deletion, or database mistake doesn't cost you your product catalog or order history.
