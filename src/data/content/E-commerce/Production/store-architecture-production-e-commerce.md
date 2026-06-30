---
title: Store Architecture
slug: store-architecture
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Store Architecture (Headless)

If you are building a production e-commerce store with over $5M in annual revenue, building on a monolithic Shopify Liquid theme or a traditional Magento PHP template is an unacceptable technical compromise. 

Monoliths tightly couple the backend database to the frontend UI, severely bottlenecking engineering velocity, restricting UX customization, and fundamentally breaking modern web performance metrics (Core Web Vitals).

---

## 1. The Headless Decoupling

A headless architecture physically separates the presentation layer from the commerce engine.

**The Production Blueprint:**
1. **The Edge (Frontend):** Next.js (React) deployed globally via a CDN (Vercel, Cloudflare Pages). The frontend handles routing, UI, rendering, and edge-caching.
2. **The Commerce API (Backend):** Shopify Plus (Storefront API), MedusaJS, or Commerce Layer. This engine handles the unglamorous, highly-regulated work: PCI compliance, tax math, inventory decrementing, and 3PL webhook dispatching.
3. **The Content API (CMS):** Sanity, Contentful, or Builder.io. Because a Commerce API is terrible at storing rich blog posts and complex page layouts, you must decouple the content into a dedicated Headless CMS.
4. **The Search API:** Algolia or Typesense. A specialized engine specifically for handling typos, synonyms, and sub-50ms query returns.

---

## 2. API Stitching (The BFF Pattern)

When a user loads a Product Detail Page (PDP), the frontend needs data from 4 different databases:
- The Price/Inventory (Commerce API)
- The Marketing Copy (CMS API)
- The Customer Reviews (Yotpo/Reviews API)
- The Cross-Sells (Algolia API)

**The Engineering Constraint:**
Do not make the client's browser execute 4 separate HTTP requests to 4 different APIs. It will be incredibly slow on 3G mobile networks.
- **The Solution:** Implement the **BFF Pattern (Backend for Frontend)**.
- Use a Next.js Server Component or a GraphQL Federation layer. The Next.js server makes the 4 internal API calls (which are fast because they occur inside the datacenter), stitches the JSON payload together, and returns exactly one optimized HTML document to the user's browser.

---

## 3. Caching & Invalidation (ISR)

Fetching data from a database on every page load is mathematically unscalable during a flash sale. 

**The Implementation (Incremental Static Regeneration):**
- Use Next.js ISR (or the App Router Data Cache).
- The HTML for the PDP is generated statically at build time and cached at the CDN Edge. Page load is effectively 0ms.
- **The Webhook Invalidation:** If the marketing team changes the price of a shirt in Shopify, Shopify fires a webhook to your Next.js API route (`/api/revalidate?tag=product-123`). Next.js instantly purges the cached HTML for that specific product and regenerates it in the background. You get the speed of static HTML with the real-time accuracy of a dynamic database.

---

## AI Prompt — Architect Your Headless Stack

```prompt
I am designing the Headless Commerce architecture for a production e-commerce brand handling $10M in annual GMV.

Tech Stack:
- Frontend: [e.g., Next.js App Router on Vercel]
- Commerce API: [e.g., Shopify Storefront API / MedusaJS]
- Headless CMS: [e.g., Sanity / Contentful]

Act as a Principal Solutions Architect:
1. Diagram the data flow of the BFF (Backend for Frontend) pattern when loading a Product Page. How does Next.js stitch together the Price data from Shopify and the rich marketing data from Sanity into a single Server Component payload?
2. Write the exact Next.js Webhook API route logic required to listen for a Shopify `product.updated` event and execute an On-Demand Revalidation (purging the CDN cache for that specific product URL).
3. Explain the architectural split between what data is strictly owned by the Commerce API (e.g., Inventory) versus what is strictly owned by the Headless CMS (e.g., Hero Banners), and why crossing these streams leads to technical debt.
```

---

## Store Architecture Checklist

- [ ] Headless decoupled architecture established (separating UI, Commerce Engine, and CMS)
- [ ] BFF (Backend for Frontend) pattern engineered to prevent the client browser from making excessive third-party API calls
- [ ] Next.js ISR (Incremental Static Regeneration) or App Router caching implemented for sub-second page loads
- [ ] On-Demand Webhook Revalidation configured to instantly purge CDN caches when database inventory/prices change
- [ ] Strict boundaries established preventing the Commerce API from managing content, and the CMS from managing inventory
