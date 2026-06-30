---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# Performance Optimization

At production scale, performance is directly tied to revenue. Amazon famously found that every 100ms of latency cost them 1% in sales. 

If your frontend is bloated, mobile users on 3G connections will abandon your site. If your backend is slow, checkout drops off. Production performance optimization requires surgical interventions at the Edge, the Browser, and the Database.

---

## 1. Edge Caching & CDNs

The fastest database query is the one you never make.

**The Architecture:**
- **Static Assets:** All images, CSS, and JS bundles must be served via a Content Delivery Network (CDN) like Cloudflare or AWS CloudFront.
- **HTML Caching:** Your Product Detail Pages (PDPs) must be cached at the Edge. If a user in Tokyo requests a PDP, they should receive the HTML from a CDN node in Tokyo (TTFB < 50ms), not from your origin server in Virginia (TTFB > 200ms).
- **Cache Invalidation:** Use Stale-While-Revalidate (SWR) or Incremental Static Regeneration (ISR). When a product's price changes, your backend must fire an On-Demand Revalidation webhook to purge the edge cache for that specific URL.

---

## 2. Image Optimization (The Payload Killer)

E-commerce sites are image-heavy. Serving unoptimized 4MB JPEGs will destroy your Largest Contentful Paint (LCP) score and your conversion rate.

**The Implementation:**
1. **Format:** Serve images in WebP or AVIF formats. They are 30-50% smaller than JPEGs with no quality loss.
2. **Sizing (Srcset):** Never serve a 2000px image to a mobile phone screen. Use HTML `<picture>` or `srcset` attributes to serve exact sizes based on the user's device width.
3. **Dedicated Image CDN:** Do not serve images directly from your S3 bucket. Put an Image CDN (e.g., Cloudinary, Imgix, or Next.js Image component) in front of S3. It will automatically detect the user's browser support and serve the optimal format and size dynamically.

---

## 3. Third-Party Script Offloading (Partytown)

Marketing teams rely on third-party scripts: Facebook Pixel, Google Tag Manager, Yotpo Reviews, Klaviyo Popups, Intercom Chat.

If you load these synchronously on the main thread, the browser will freeze for 3 seconds while parsing them. The user will click "Add to Cart" and nothing will happen (Interaction to Next Paint failure).

**The Solution: Web Workers**
Use a tool like **Partytown**. It moves resource-intensive scripts off the main thread and into a background Web Worker. The main thread remains 100% dedicated to your UI code, ensuring the site feels instantly responsive while the analytics load silently in the background.

---

## 4. Database Query Optimization (The N+1 Problem)

If your frontend is fast but your backend is slow, you likely have an N+1 query problem.

**The Anti-Pattern:**
You query 50 orders on the admin page. Then, for *each* order, you run a query to fetch the user's email. You just executed 51 database queries. At 1,000 concurrent users, your database will collapse.

**The Production Fix:**
1. Use SQL `JOIN`s or Prisma `include` to fetch all related data in a single query.
2. Ensure you have explicit indexes on foreign keys. If you frequently query `SELECT * FROM orders WHERE user_id = X`, you must have an index on `user_id`. Without an index, the database executes a full table scan, checking every single row in the millions-large table.

---

## AI Prompt — Audit Your Performance Metrics

```prompt
I am auditing the performance architecture for a production e-commerce store.

Tech Stack:
- Frontend: [e.g., Next.js]
- Database: [e.g., Postgres]
- Third-Parties: [e.g., Klaviyo, GTM, Yotpo, Algolia]

Act as a Principal Performance Engineer:
1. Write the Next.js `next/image` configuration (or Cloudinary URL parameters) required to automatically serve AVIF images sized perfectly for mobile viewports.
2. Provide the Webpack/Next.js configuration required to implement Partytown to offload Google Tag Manager and the Facebook Pixel to a Web Worker.
3. Show the Prisma query to fetch 50 Orders with their nested OrderItems and User details in a single query (avoiding N+1), and write the SQL `CREATE INDEX` command for the `user_id` column to ensure it is performant.
4. Explain how to implement a stale-while-revalidate (SWR) cache strategy for the Cart total, ensuring the UI feels instant but the server truth is respected.
```

---

## Performance Optimization Checklist

- [ ] Edge Caching (CDN) configured for all static assets and HTML pages
- [ ] On-Demand Cache Invalidation configured for inventory and price updates
- [ ] Images served via a dedicated Image CDN (Cloudinary/Next.js Image) in WebP/AVIF formats
- [ ] Third-party marketing scripts offloaded to Web Workers (e.g., via Partytown) to protect the main thread
- [ ] Database queries audited for N+1 vulnerabilities
- [ ] Indexes applied to all foreign keys and frequently filtered database columns
