---
title: Caching Implementation
slug: caching
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Caching Implementation

In a production e-commerce store, the database is the bottleneck. If you hit your Postgres database for every single page load during a Black Friday sale, the database will exhaust its connection pool and crash within seconds.

Caching is the layer that absorbs this impact. A world-class e-commerce architecture caches aggressively at the Edge, in memory, and in the browser, but relies on lightning-fast invalidation to ensure customers never see stale inventory or outdated prices.

---

## 1. The Cache Hierarchy

You must implement caching at three distinct layers, each with different Time-To-Live (TTL) strategies.

### Layer 1: Edge Caching (The CDN)
The CDN (e.g., Cloudflare, Vercel Edge, AWS CloudFront) sits physically closest to the user.
- **What to cache:** Product Detail Pages (PDPs), Category Pages, Images, CSS, JS.
- **The TTL:** Cache these indefinitely (`s-maxage=31536000`).
- **The Invalidation:** When a product is updated in the CMS or database, you must issue an API call to the CDN to **Purge** that specific URL immediately. This is known as On-Demand Revalidation.

### Layer 2: Application Caching (Redis)
Your Node.js/Next.js backend will need data that changes too fast for edge HTML caching, but is too heavy to query from Postgres on every request.
- **What to cache:** Complex promotion rules (e.g., active BOGO campaigns), global site settings (navigation menus), and active shopping carts.
- **The Infrastructure:** Use an in-memory key-value store like **Redis**. Redis can handle millions of operations per second, taking the load completely off Postgres.

### Layer 3: Client-Side Caching (React Query / SWR)
When the user navigates your site, the browser shouldn't refetch data it already knows.
- **What to cache:** The user's active cart state, their session/auth status.
- **The Strategy:** Use a library like `useSWR` or `react-query`. These libraries fetch the cached data instantly for a snappy UI, while simultaneously revalidating in the background to ensure absolute accuracy.

---

## 2. The Danger of Caching E-Commerce Data

Never cache user-specific or highly volatile transactional data at the Edge.

**Do NOT cache:**
1. **The Cart:** If you accidentally edge-cache a response containing Cart JSON, User A will see User B's items in their cart. This is a massive PII violation.
2. **The Checkout Page:** The checkout must always be dynamically rendered and purely server-driven to ensure absolute accuracy of shipping and tax rates.
3. **Inventory Decrements:** Never rely on a cached value when performing the final mathematical decrement of inventory. Always query the source of truth (Postgres) atomically.

---

## 3. The "Stale-While-Revalidate" Pattern

The holy grail of e-commerce rendering is Stale-While-Revalidate (SWR).

When a user visits a Product Page:
1. The CDN immediately serves the cached HTML (e.g., showing a price of $50 and "In Stock"). The page loads in 50ms.
2. The user sees the product.
3. Behind the scenes, the browser fires an invisible AJAX request to your backend: `GET /api/inventory/SKU123`.
4. If the backend returns that the price dropped to $40, or the item is actually Sold Out, React instantly updates the UI before the user can click "Add to Cart".

This pattern guarantees incredible SEO and initial load speeds while enforcing 100% transactional accuracy.

---

## AI Prompt — Architect Your Caching Strategy

```prompt
I am implementing the caching architecture for a production e-commerce store to prepare for a massive flash sale.

Tech Stack:
- Framework: [e.g., Next.js App Router]
- Database: [e.g., Postgres]
- Edge / CDN: [e.g., Vercel / Cloudflare]
- Memory Store: [e.g., Redis]

Act as a Principal Infrastructure Engineer:
1. Write the Next.js `Cache-Control` header logic required to cache a Product Page at the Edge, alongside the exact Webhook API code required to execute an On-Demand Revalidation (purge) when the inventory drops to zero in the database.
2. Provide the Redis implementation required to cache the complex "Global Navigation Menu" JSON, ensuring it has a TTL of 1 hour but gracefully falls back to Postgres if Redis is offline.
3. Outline a strict security matrix of which specific e-commerce routes MUST bypass the cache entirely (e.g., `/checkout`, `/account`) to prevent PII leaks.
4. Explain the "Stale-While-Revalidate" pattern using a client-side `useSWR` hook to hydrate real-time pricing on top of a statically cached product page.
```

---

## Caching Implementation Checklist

- [ ] Edge Caching configured for all static assets and catalog HTML pages
- [ ] On-Demand Revalidation (Cache Purging) webhooks implemented to fire when database records mutate
- [ ] Redis (or equivalent) deployed for Application-layer caching of heavy JSON structures (menus, rules)
- [ ] Stale-While-Revalidate (SWR) patterns implemented on the frontend for real-time price/inventory hydration
- [ ] Strict cache-busting headers (`Cache-Control: no-store`) applied to all checkout, cart, and account routes to prevent PII leaks
