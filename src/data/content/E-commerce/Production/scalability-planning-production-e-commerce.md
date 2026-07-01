---
title: Scalability Planning
slug: scalability-planning
phase: Phase 4 Production Readiness
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Global Scalability & Black Friday Readiness

**Estimated Time:** 60 Minutes

A beginner launches their store, tells their friends, and gets 5 visitors a day. The site feels fast.
Then, a famous TikTok influencer makes a viral video about their product. 50,000 people click the link simultaneously. 

The database runs out of connections. The Redis cache exhausts its memory limit. The Stripe API rate-limits the server. The entire Next.js edge network goes down in a cascade failure. The founder loses $100,000 in potential revenue in 15 minutes.

In Phase 4, you must engineer for the absolute worst-case scenario. You must master **Connection Pooling Limits**, **Queue Throttling**, and **Edge Caching**.

---

## 1. The Database Connection Pool Math

As discussed in the Database module, Vercel Edge functions auto-scale infinitely. PostgreSQL does not.

If you have a Supabase database with a limit of 100 concurrent connections, and you use PgBouncer as your pooler, PgBouncer acts as a funnel. But even PgBouncer has limits.

**The Production Solution:**
You must calculate your maximum throughput mathematically.

If your Checkout API route takes `200ms` to execute, one database connection can handle 5 requests per second (1000ms / 200ms = 5).
If your pooler allows 100 connections, your theoretical maximum throughput is 500 checkout requests per second.

If TikTok sends you 2,000 checkout requests per second, your pooler will queue them. If the queue gets too long, the API times out (504 Gateway Timeout).

**The Fix:** 
You must aggressively move read-queries off the database entirely using the Redis Cache and Next.js ISR (as engineered in the Caching module). If 99% of requests never touch the database, your 100 connections are reserved strictly for mutations (Checkouts), allowing you to handle 50,000 concurrent users easily.

## 2. Asynchronous Queue Throttling (Inngest)

If 500 people checkout successfully, your Event Bus (Inngest) receives 500 `order.paid` events instantly.

If your Event Bus instantly fires 500 background workers to send receipts via Resend (Email API) and ping ShipStation (Warehouse API), you will instantly hit the Rate Limits of those third-party APIs. ShipStation will return a `429 Too Many Requests` error, and your fulfillment pipeline crashes.

**The Production Solution:**
You must configure **Concurrency Limits** and **Throttling** on your Event Bus workers.

```typescript
// inngest/warehouseWorker.ts
import { inngest } from './client';

export const warehouseWorker = inngest.createFunction(
  { 
    id: "sync-warehouse",
    // 1. MATHEMATICAL THROTTLING
    concurrency: {
      limit: 10, // Never run more than 10 workers simultaneously
    },
    rateLimit: {
      limit: 50, // Max 50 requests...
      period: "1m" // ...per 1 minute (ShipStation API strict limits)
    }
  },
  { event: "order.paid" },
  async ({ event }) => {
    // This fetch is now mathematically guaranteed to never hit a 429 error
    await fetch('https://api.shipstation.com/...');
  }
);
```

By throttling the background workers, the checkout remains instant for the user, but the actual email and warehouse sync might be delayed by 2 minutes during a massive traffic spike. **Delayed is infinitely better than Broken.**

## 3. The Edge Cache Fallback (Stale Data)

What happens if Supabase goes down entirely? If your caching layer expires (because you set `revalidate: 3600`), Next.js will attempt to fetch the database, fail, and the homepage will break.

**The Production Solution:**
You must configure `stale-while-revalidate` caching at the CDN level. If the backend is dead, the CDN must serve the stale cached version of the homepage indefinitely until the backend recovers.

```typescript
// app/layout.tsx
// Tell Vercel CDN to serve stale data for up to 1 year if the database crashes
export const fetchCache = 'default-cache';
```

A user can still view the product catalog and read reviews. Only the actual checkout button will fail, isolating the blast radius of the database crash.

---

## ✅ Scalability Engineering Checklist

- [ ] Mathematically calculate your PgBouncer throughput based on your API latency to ensure your database can survive Black Friday.
- [ ] Enforce strict `concurrency` and `rateLimit` configurations on all Event Bus workers to protect third-party APIs from 429 errors.
- [ ] Architect your caching layer to fall back to Stale Data automatically if the primary database cluster goes offline.
- [ ] Use the AI prompt below to generate the ultimate scalability architecture.

---

## AI Prompt — Engineer for Black Friday

Copy this prompt into your AI to have it calculate and generate your massive scaling infrastructure.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Site Reliability Engineer. We are engineering our Black Friday Scalability plan.

I need you to generate the following strict architectural implementations:

**1. The API Rate Limit Buffer:**
Write the Inngest (or Upstash QStash) configuration code for our `sendOrderTo3PL` worker. 
- Look up the standard rate limits for ShipStation or Shopify Admin API.
- Configure the exact `concurrency` and `rateLimit` parameters to guarantee we never exceed those limits during a 10,000-order spike. 
- Explain why "Queueing" is the mathematical savior of distributed systems.

**2. The Database Connection Math:**
Provide a Markdown mathematical breakdown. 
- Assume our Supabase instance has a PgBouncer limit of 150 connections.
- Assume our Prisma checkout transaction takes exactly 120ms to execute.
- Calculate the maximum possible orders per second we can handle. 
- Explain how implementing Upstash Redis to cache the initial "Get Product Price" query cuts the Prisma transaction time down to 60ms, effectively doubling our maximum throughput.

**3. The Edge Cache Directives:**
Write the exact Next.js Route Segment Config (`export const revalidate = ...`) and `fetch` cache tags required to instruct the Vercel Edge Network to serve stale HTML pages in the event that our entire backend infrastructure goes offline, preventing a 500 error on the homepage.
````

**Congratulations. The E-Commerce Curriculum is fully engineered.**
