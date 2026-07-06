---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Performance Optimization

## Milliseconds Cost Millions

In a personal project, a 2-second page load is fine. In a production marketplace, performance is directly correlated with revenue. Amazon famously found that every 100ms of latency cost them 1% in sales.

For a marketplace, poor performance also destroys your SEO. Google ranks pages based on **Core Web Vitals**. If your Largest Contentful Paint (LCP) takes 4 seconds because of unoptimized images and N+1 database queries, you will not rank on the first page of Google, and your Customer Acquisition Cost (CAC) will skyrocket.

---

## The N+1 Query Problem

This is the single most common performance bug in marketplace APIs. 

If your backend fetches a list of 50 active listings, and then loops through that list to fetch the Seller's name and Rating for each listing, you have just executed **51 separate SQL queries**. Under moderate traffic, this will exhaust your database connections instantly.

**The Production Fix:**
* **REST / Prisma:** You must use `JOIN`s (e.g., Prisma's `include: { seller: true }`) to fetch all related data in a single SQL query.
* **GraphQL:** If you are using GraphQL, you must use **DataLoader**. DataLoader batches and deduplicates requests, ensuring that fetching 50 listings and their sellers results in exactly 2 SQL queries, not 51.

---

## Database Connection Pooling

If you are hosting your API on Serverless infrastructure (e.g., AWS Lambda, Vercel), every single incoming HTTP request spins up a new ephemeral function, which opens a new connection to Postgres.

Postgres can only handle a few hundred concurrent connections. If 1,000 buyers hit your site at once, Postgres will throw `FATAL: sorry, too many clients already` and crash.

**The Production Standard:**
You must implement a **Connection Pooler**.
Use **PgBouncer**, **Supavisor**, or **Prisma Accelerate**. These tools sit between your Serverless functions and Postgres, multiplexing thousands of incoming requests into a safe pool of 50 persistent database connections.

---

## Core Web Vitals & Image Optimization

Marketplaces are highly visual. A listing page with 5 unoptimized 8MB JPEGs will ruin your Largest Contentful Paint (LCP) score.

**The Production Image Stack:**
1. **Never serve raw images.** When a seller uploads a photo, it must be stored in S3, but served through an Image CDN (e.g., **Cloudinary**, **Cloudflare Images**, or **Next.js `<Image>` component**).
2. **Format Conversion:** The CDN must automatically convert JPEGs to `WebP` or `AVIF` based on the buyer's browser support, reducing file size by 70%.
3. **Lazy Loading:** Images "below the fold" must have `loading="lazy"`. Images "above the fold" must have `priority` so the browser fetches them instantly.
4. **Prevent Cumulative Layout Shift (CLS):** Always provide explicit `width` and `height` attributes to your image tags. If images load and push text down the page, Google will penalize your SEO.

---

## Do's and Don'ts of Production Performance

- **DO paginate everything.** Never write `SELECT * FROM listings`. A malicious user can crash your server. Enforce strict `limit=50` and `cursor` pagination on every list endpoint.
- **DON'T index every column.** Indexes speed up Reads but slow down Writes. Index exactly what you filter and sort by (e.g., `category`, `price`, `status`, `created_at`), and nothing else.
- **DO use Edge Caching for static assets.** Your CSS, JS bundles, and public marketing pages should be cached at the CDN Edge (Cloudflare/Vercel) so they are served from a data center physically close to the buyer.
- **DON'T rely on client-side fetching for critical data.** If your Next.js app renders a blank shell and uses `useEffect` to fetch the core listing data, SEO crawlers will see a blank page. Core data must be Server-Side Rendered (SSR) or Statically Generated (SSG).

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Fixing N+1 Queries:**

````prompt
Act as a Senior Backend Engineer. Review this Node.js API route that fetches listings. It currently contains an N+1 query vulnerability because it loops through the listings to fetch the Seller details and the aggregated Review count. Rewrite this using Prisma to perform a single, efficient joined query (`include` and `_count`) that executes in exactly 1 database round-trip.
````

> [!TIP]
> **Prompt 2 — Next.js Image Optimization:**

````prompt
Write a React component for a Marketplace Listing Card using the Next.js `next/image` component. Ensure it prevents Cumulative Layout Shift (CLS) by defining aspect ratios, sets `sizes` appropriately for responsive breakpoints, uses a blurred placeholder generated from a base64 string, and sets `priority={true}` if a specific boolean prop is passed.
````

---

## Validating What AI Generates

- **Check for Missing Indexes:** If AI generates a complex query joining listings, users, and reviews, ask it to explicitly write out the SQL `CREATE INDEX` statements required to make that query performant in production.
- **Verify Serverless Compatibility:** If AI suggests a stateful, in-memory caching solution (like a global `Map()` variable in Node.js) for a Next.js/Vercel project, reject it. Serverless functions are ephemeral; stateful caching requires external Redis (e.g., Upstash).

---

## Implementation Checklist

- [ ] Audited the backend for N+1 queries and replaced them with Joins or DataLoaders.
- [ ] Implemented a Connection Pooler (PgBouncer/Supavisor) to prevent Serverless connection exhaustion.
- [ ] Migrated all listing images to an Image CDN for WebP conversion and strict sizing (preventing CLS).
- [ ] Verified that all public-facing pages (Home, Search, Listing) are Server-Side Rendered (SSR) for SEO.
- [ ] Added strict database indexes matching the primary search and sorting filters.

---

## What's Next

Next: **Monitoring** — With the application running fast and secure, you need to know immediately if something breaks. We will architect the observability stack (Datadog, Sentry, BetterStack) to track uptime, trace latency bottlenecks, and alert your on-call team when critical systems fail.
