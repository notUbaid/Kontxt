---
title: Tech Stack Selection
slug: tech-stack-selection
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# Tech Stack Selection

Phase 1 was about what to build. Phase 2 is about how to build it.

At production scale, tech stack selection is the highest-leverage decision you will make. It determines your hosting costs, your deployment velocity, your hiring pool, and your store's ceiling. A personal project can afford to rewrite its stack; a production store with active customers and orders cannot. 

This module gives you a clear framework for making this decision, opinionated recommendations for high-volume production stores, and the tradeoffs you accept with each architectural pattern.

---

## The Real Question

Stack selection at production scale is not about what is trendiest. It is about:

> *What allows a professional engineering team to ship a highly available, secure, and performant store that scales during peak traffic events (like Black Friday)?*

Complexity in production is a liability. Every service you add is another point of failure. The best stack is the one that provides the exact degree of control you need, while outsourcing undifferentiated heavy lifting (like CDN management, PCI compliance, and basic CMS capabilities) to managed platforms.

---

## The Core Architectural Decision

Before choosing a framework, you must choose an architectural pattern.

| Architecture | Description | Use When | Engineering Cost |
|---|---|---|---|
| **Hosted Platform** | Shopify Plus, BigCommerce. Frontend and backend are tightly coupled. | You want to focus 100% on marketing and logistics, not engineering. | Low |
| **Headless (Composable)** | Shopify/BigCommerce Backend + Custom Frontend (Next.js/Remix). | You need a bespoke user experience, edge speed, or multi-region routing, but want a managed backend. | Medium |
| **Fully Custom Build** | Next.js + Stripe + Postgres (Medusa.js / Custom API). | You are building complex B2B features, custom multi-vendor logic, or have unique digital fulfillment models. | High |

> [!WARNING]
> Building a fully custom e-commerce backend (inventory, tax compliance, promotions engine, order state machines) is a massive undertaking. Unless your core business model *requires* a custom backend, **Headless Commerce** is the recommended default for modern production stores.

---

## Recommended Stack — Headless Production Store

This stack balances extreme performance (edge delivery), developer velocity, and robust backend reliability.

```
Frontend        →  Next.js 14 (App Router) + TypeScript
Styling         →  Tailwind CSS + shadcn/ui
E-commerce Core →  Shopify Storefront API (or Medusa.js)
Database (App)  →  PostgreSQL (Supabase / Neon) for custom app data
Cart State      →  Redis (Upstash) or Client-side cookies
Payments        →  Stripe (via platform or direct) / Shopify Payments
Search          →  Algolia / Typesense
Deployment      →  Vercel / AWS Amplify
```

**Why this combination:**

| Layer | Choice | Reason |
|---|---|---|
| Next.js | App Router + RSC | Server Components provide unmatched SEO and initial load speed. Edge routing handles multi-region logic. |
| Commerce API | Shopify Storefront API | Outsourcing inventory, admin UI, and PCI compliance saves months of engineering. |
| PostgreSQL | Supabase / Neon | For custom features (e.g., user profiles, custom wishlists, reviews) that don't belong in the e-commerce engine. |
| Redis | Upstash | Essential for high-performance session carts and rate-limiting at scale. |
| Tailwind | Utility CSS | Prevents CSS bloat at scale. Standardizes design tokens across large engineering teams. |
| Vercel | Edge Network | Zero-downtime deployments, automatic global CDN, and built-in edge caching. |

---

## Next.js Rendering Strategy for E-Commerce

At production scale, rendering strategy dictates both infrastructure cost and TTFB (Time to First Byte).

| Page | Rendering | Strategy |
|---|---|---|
| Homepage | SSG / ISR | Cache heavily at the edge. Revalidate on demand when CMS changes. |
| Product Detail (PDP) | ISR | Statically generate with a 60s revalidation window. Fetch real-time price/inventory client-side if highly volatile. |
| Collection Pages | SSR / ISR | Use SSR if relying on complex, user-specific filtering. Use ISR with URL search params for standard facets. |
| Cart | CSR | Never cache. Fetch client-side or use a lightweight API route. |
| Checkout | CSR / External | Must be dynamic. Often handled entirely by the commerce platform's hosted checkout. |
| Account | SSR | Authenticated routes must never be cached. |

> [!TIP]
> **The Golden Rule of E-Commerce Rendering:** Cache the catalog, but never cache the cart, the price, or the inventory count. Stale product copy is fine; overselling out-of-stock items is a disaster.

---

## The Composable Edge: When to Add Services

In a production composable architecture, you wire together best-in-class APIs. Do not add these on Day 1 unless required. Add them as you hit scale limits.

| Service Category | Launch Stack | Scale Stack (Add when...) |
|---|---|---|
| **Search** | Native database ILIKE | **Algolia** (When typo-tolerance and merchandising matter) |
| **CMS** | Hardcoded / Platform native | **Sanity / Contentful** (When marketing needs daily layout control) |
| **Images** | Vercel Image Optimization | **Cloudinary / imgix** (When you need dynamic transformations at scale) |
| **Email** | Resend / Postmark | **Klaviyo** (When marketing needs complex lifecycle flows) |

---

## Handling the "Black Friday" Problem

Production tech stacks must survive traffic spikes. 

1. **Edge Caching:** Ensure all catalog pages are served from a CDN. Your origin server should only see traffic for checkouts and cache misses.
2. **Database Connection Pooling:** Serverless environments (like Vercel) can exhaust database connections during traffic spikes. You *must* use a connection pooler (like PgBouncer or Supabase's built-in pooler).
3. **Queue-Based Processing:** Do not process heavy tasks synchronously. If a user places an order, push a message to a queue (e.g., Inngest, AWS SQS) to send the email and update downstream inventory.

---

## AI Prompt — Validate Your Production Stack

```prompt
I am architecting a production e-commerce store with the following requirements:

- Business model: [B2C / B2B / Subscription / Digital]
- Expected SKU count: [e.g., 500 SKUs]
- Traffic profile: [Steady / Highly seasonal with massive spikes]
- Team size: [Number of engineers]
- Multi-region: [Yes/No - which regions?]
- Existing systems: [Any legacy ERP or PIM systems we must integrate with?]

I am proposing the following stack:
- Frontend: [Framework]
- Commerce Engine: [Shopify / Medusa / Custom]
- Database: [Database]
- Search: [Search Engine]
- Hosting: [Hosting Provider]

Act as a Principal Staff Engineer. Critique this stack:
1. What is the single biggest operational risk with this architecture at scale?
2. How will this stack handle a 10x traffic spike on Black Friday? Where is the bottleneck?
3. What data synchronization issues will I face between the commerce engine and my database?
4. Are there any over-engineered components I should swap for managed services?
5. Outline the CI/CD pipeline required to deploy this stack safely with zero downtime.
```

---

## Stack Decision Checklist

- [ ] Architecture pattern selected (Headless vs. Custom vs. Hosted) and documented in ADR
- [ ] Rendering strategy explicitly mapped per page type
- [ ] Database connection pooling strategy defined for serverless environments
- [ ] Checkout PCI compliance boundary clearly defined (using hosted elements/checkout)
- [ ] Third-party service integrations (CMS, Search, Email) scoped and budget-approved
- [ ] Tech stack validated against team expertise and hiring goals
