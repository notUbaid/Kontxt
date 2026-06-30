---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4
mode: personal
projectType: e-commerce
estimatedTime: 20-25 min
---

# Performance Optimization

A slow product page doesn't just feel bad — it directly costs you sales. This module is about fixing the handful of things that actually matter for a personal store's performance, and skipping the elaborate optimization work that only pays off at real scale.

---

## Where Personal Stores Actually Lose Performance

Not where you'd guess. The usual suspects, in order of actual impact:

1. **Unoptimized product images** — almost always the biggest single cost
2. **Unnecessary client-side JavaScript** on pages that don't need interactivity
3. **N+1 database queries** — fetching products one at a time instead of in a batch
4. **Missing database indexes** — slow queries as your catalog grows
5. **No caching on data that rarely changes**

Notice what's *not* on this list: CDN architecture, edge computing, database sharding, micro-optimizing bundle size byte-by-byte. Those matter at scale. They're not your bottleneck right now.

> **Reframe:** Performance work for a personal store should be boring and obvious — fix the big, clear wins, then stop. Diminishing returns kick in fast past a certain point, and that effort is better spent on features customers actually notice.

---

## Images: Your Highest-Leverage Fix

This connects directly to the Products module's image handling guidance — here's why it matters for performance specifically.

```javascript
// Next.js Image component — handles optimization automatically
import Image from 'next/image';

<Image
  src={product.imageUrl}
  alt={product.name}
  width={600}
  height={600}
  loading="lazy" // default for images below the fold
  placeholder="blur"
  blurDataURL={product.imageBlurHash} // optional, smooths the loading experience
/>
```

**What this gets you automatically:**
- Responsive image sizing (serves the right resolution per device, not a 4000px image to a phone)
- Modern format conversion (WebP/AVIF where supported)
- Lazy loading below the fold

> **Tip:** Never use a raw `<img>` tag for product images in a Next.js app — you'd be opting out of all of this for no benefit. If you're not on Next.js, your framework likely has an equivalent (Nuxt Image, Astro's image integration) — use it.

**Beyond the component — at the source:**
- Don't upload unedited 8MB camera photos to your product catalog. Resize to a reasonable max dimension (e.g., 1600px on the longest side) before upload.
- Use your storage provider's image transformation if available (Supabase Storage and Cloudflare R2 both support on-the-fly resizing via URL parameters).

---

## Server vs. Client Components: Don't Ship Unnecessary JavaScript

If you're on Next.js App Router, this is a genuinely important decision per page, not a minor detail.

<table>
<tr><th>Page type</th><th>Should be...</th><th>Why</th></tr>
<tr><td>Product listing page</td><td>Server Component</td><td>No interactivity needed to just display products — ship zero extra JS for this</td></tr>
<tr><td>Product detail page (static content)</td><td>Server Component</td><td>Description, images, price are all static display</td></tr>
<tr><td>Add to Cart button</td><td>Client Component (small, isolated)</td><td>Needs interactivity — but keep it as a small island, not the whole page</td></tr>
<tr><td>Cart page</td><td>Client Component</td><td>Reads from client-side cart state (Zustand)</td></tr>
<tr><td>Admin dashboard</td><td>Mix — lean toward Server Components where possible</td><td>Only you use this, but it's still good practice</td></tr>
</table>

```javascript
// Product page — Server Component, fetches data directly, zero client JS for display
export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug); // runs on the server

  return (
    <div>
      <ProductImages images={product.images} />
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <AddToCartButton productId={product.id} /> {/* small client island */}
    </div>
  );
}
```

> **Why this matters more than it might seem:** Every Client Component ships its JavaScript to the browser, which has to download, parse, and execute it before the page is interactive. A product page that's 95% static content (images, description, price) but built entirely as a Client Component ships JavaScript for none of that — only the "Add to Cart" button actually needs it. Isolating interactivity to small components is one of the highest-leverage, lowest-effort performance wins available in modern React frameworks.

---

## Database Query Patterns: Avoid N+1

This is a classic bug that AI-generated code sometimes introduces without you noticing, because it works correctly — just slowly.

```javascript
// WRONG — N+1 query pattern: 1 query for products, then N queries for images
const products = await getProducts(); // 1 query
for (const product of products) {
  product.images = await getProductImages(product.id); // N additional queries
}

// RIGHT — single query with a join, or a batched fetch
const products = await db.query(`
  SELECT p.*, 
    json_agg(json_build_object('url', pi.url, 'alt', pi.alt_text)) as images
  FROM products p
  LEFT JOIN product_images pi ON pi.product_id = p.id
  WHERE p.status = 'active'
  GROUP BY p.id
`);
```

> **Why this matters at even modest scale:** A product listing page showing 20 products with the N+1 pattern fires 21 database queries instead of 1. This is invisible in development with a handful of test products and a fast local connection — it becomes painfully obvious the moment you have a real catalog size and real network latency to your database. Catch this in code review, not in production.

---

## Indexes: Confirm What You Already Should Have

This is mostly a verification step — you should have added these as you built each feature, per the relevant module's guidance.

```sql
-- Products: from the Products module
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);

-- Search: from the Search module
CREATE INDEX products_search_idx ON products USING GIN(search_vector);
CREATE INDEX products_name_trgm_idx ON products USING GIN(name gin_trgm_ops);

-- Orders: from the Orders module
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_stripe_session ON orders(stripe_session_id);
CREATE INDEX idx_orders_status ON orders(status);
```

> **Tip:** Run `EXPLAIN ANALYZE` on your slowest-feeling queries to confirm indexes are actually being used, not just present. An index that exists but isn't being hit by the query planner provides zero benefit — this happens more often than expected, usually due to a mismatch between the indexed column and how it's queried (e.g., a function applied to the column in the WHERE clause that prevents index usage).

---

## Caching: What's Actually Worth Caching

<table>
<tr><th>Data</th><th>Cache it?</th><th>How</th></tr>
<tr><td>Product catalog listing</td><td>Yes — changes infrequently</td><td>Next.js built-in caching / ISR (revalidate every few minutes)</td></tr>
<tr><td>Individual product pages</td><td>Yes</td><td>Same — ISR with reasonable revalidation window</td></tr>
<tr><td>Cart contents</td><td>No — must always be current</td><td>N/A, client-side anyway per Cart module</td></tr>
<tr><td>Stock levels</td><td>No — must always be current</td><td>Always fetch fresh, especially near checkout</td></tr>
<tr><td>Search results</td><td>Light caching, short TTL</td><td>A few minutes at most</td></tr>
</table>

```javascript
// Next.js ISR (Incremental Static Regeneration) — product page revalidates 
// every 5 minutes instead of refetching on every single request
export const revalidate = 300; // seconds

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);
  // ...
}
```

> **Critical concept — never cache stock levels near checkout.** Caching is great for content that's safe to show slightly stale, but stock count is exactly the kind of data where staleness causes the overselling problem the Inventory module worked hard to prevent. Product descriptions can be 5 minutes stale with zero consequence; stock counts at the moment of "Add to Cart" or checkout cannot be.

---

## AI Prompt: Performance Audit

```
I'm doing a performance pass on a personal e-commerce store before launch, 
built with Next.js App Router and Supabase.

Review this code for:
1. Any component marked 'use client' that doesn't actually need client-side 
   interactivity and could be a Server Component instead
2. Any N+1 query pattern — looping over results to fetch related data 
   individually instead of joining or batching
3. Missing indexes on columns used in WHERE, JOIN, or ORDER BY clauses
4. Any place caching could safely apply (catalog/product display) versus 
   where it must NOT apply (stock counts, cart contents)
5. Raw <img> tags that should be using the framework's Image component

Here's my product listing page, product detail page, and database schema:
[paste the actual code and schema]

For each issue, explain the specific performance cost, not just that 
it's "not best practice."
```

> **Token efficiency tip:** Pasting your actual page components rather than describing them lets AI catch the specific 'use client' boundary issues — these are easy to miss when described abstractly but obvious when AI can see the actual component structure.

---

## Validating AI-Generated Performance Fixes

- [ ] Did AI correctly distinguish between data that's safe to cache (product catalog) and data that must never be cached (stock, cart)?
- [ ] Do the suggested Server Component conversions actually remove client-side interactivity that wasn't needed, or did AI suggest converting something that genuinely needs to be a Client Component (breaking functionality)?
- [ ] Are suggested index additions on columns actually used in your real query patterns, not generic "index everything" advice?
- [ ] Did AI suggest anything genuinely overkill for your scale (Redis caching layers, CDN edge logic) that adds complexity without proportional benefit yet?

> **Common AI mistake:** AI sometimes suggests converting a component to a Server Component without noticing it uses `useState` or an event handler internally, which would break it. Always verify the suggested conversion doesn't remove functionality you actually need — read the component's current behavior carefully before applying the change.

---

## Measuring: Don't Optimize Blind

Before and after any performance work, check actual numbers — don't guess.

- **Lighthouse** (built into Chrome DevTools) — quick, free, gives you Core Web Vitals scores
- **Vercel Analytics** (if hosted there) — real user performance data, not just synthetic lab tests

> **Tip:** Run Lighthouse on your product listing page and a product detail page before and after applying changes from this module. You should see meaningful, visible improvement — if you don't, you may have optimized something that wasn't actually your bottleneck. Let real measurements guide where you spend further effort, not intuition.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- CDN configuration beyond what your host provides automatically (Vercel/Cloudflare handle this)
- Database read replicas / sharding
- Redis or other dedicated caching layers
- Bundle size micro-optimization (tree-shaking individual dependencies by hand)
- Server-side rendering performance tuning beyond the Server/Client Component split already covered
- Edge function deployment for latency optimization

---

## Implementation Checklist

- [ ] All product images use the framework's Image component, not raw `<img>` tags
- [ ] Source images resized to reasonable dimensions before upload, not raw camera-resolution files
- [ ] Product listing and detail pages reviewed — unnecessary `'use client'` removed where no interactivity is needed
- [ ] Add to Cart and other interactive elements isolated as small Client Component islands
- [ ] N+1 query patterns checked and fixed in product/image fetching
- [ ] Indexes verified present and actually used (`EXPLAIN ANALYZE`) on slug, status, category, customer_id, stripe_session_id
- [ ] ISR/caching applied to product listing and detail pages with a reasonable revalidation window
- [ ] Confirmed stock counts and cart contents are never served from a cache
- [ ] Lighthouse run before and after changes, showing measurable improvement

---

## What's Next

With your store fast and responsive, it's time to make sure you'd actually know if something broke in production — that's **Monitoring**, next in this phase.
