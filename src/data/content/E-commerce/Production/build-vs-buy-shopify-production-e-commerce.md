---
title: Build vs Buy (Commerce Engines)
slug: build-vs-buy-shopify
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Build vs Buy: Commerce Engines

At production scale, the "Build vs. Buy" decision is rarely a binary choice between coding everything from scratch and using a monolithic platform. It is a spectrum of composability.

How much of the e-commerce backend—inventory allocation, tax calculation, payment gateways, and merchandising admin—should you own, and how much should you rent?

This module breaks down the realistic commerce engine architectures for production stores doing $1M–$100M+ in GMV.

---

## The Three Production Architectures

### 1. Hosted Monolith (Shopify Plus / BigCommerce Enterprise)
You rent both the backend and the frontend. You customize the frontend using platform-specific templating languages (Liquid for Shopify) and manage everything through their admin panel.

- **Best for:** High-volume brands where marketing velocity is more important than bespoke technical features (e.g., standard apparel, CPG).
- **Pros:** Zero infrastructure maintenance. Massive app ecosystem. Immediate PCI compliance.
- **Cons:** You are locked into their API rate limits, their URL structures, and their checkout flow. High GMV percentage fees.

### 2. Headless / Composable (Shopify Storefront API / Swell)
You rent the backend (inventory, payments, admin) but build and host a custom frontend (Next.js/Remix) deployed on edge infrastructure (Vercel).

- **Best for:** Brands needing sub-second edge performance, complex multi-region routing, or rich interactive experiences (e.g., 3D configurators) that monolithic frontends cannot support.
- **Pros:** Ultimate frontend freedom. Incredible performance. Can merge content (Sanity CMS) and commerce seamlessly.
- **Cons:** High engineering overhead. You now have two systems to monitor. You still pay Shopify's platform fees.

### 3. Open Source / API-First (Medusa.js / Commerce Layer)
You host the backend (often on AWS/GCP) and build the frontend. The commerce engine is entirely API-driven and deeply extensible via code, not just webhooks.

- **Best for:** B2B companies with complex pricing tiers, multi-vendor marketplaces, or companies with highly non-standard fulfillment (e.g., digital-physical hybrids).
- **Pros:** Zero GMV percentage fees. Full control over the database and core logic. 
- **Cons:** Highest operational burden. You are responsible for uptime, database scaling, and security patches.

---

## The True Cost of Building Custom

When engineering teams advocate for a fully custom e-commerce backend (writing their own `orders` and `inventory` tables from scratch), they severely underestimate the long-tail complexity.

If you build custom, you are committing to building and maintaining:
1. **PCI Compliance:** If you touch raw credit card data, you need Level 1 PCI DSS compliance (annual audits costing $20k+).
2. **Global Tax Logic:** Keeping up with changing economic nexus laws across 50 US states and the EU.
3. **The Admin Dashboard:** Your operations and merchandising teams need a UI to refund orders, update tracking numbers, and manage variants. Building an internal CMS for this takes as much time as building the storefront.

> [!CAUTION]
> **The Engineering Trap:** Do not build a custom commerce backend just to save on Shopify's $2,000/month Plus fee. The engineering time required to maintain a custom admin dashboard and integration layer will cost 10x that amount in salaries alone. Build custom *only* if the platform's core data model cannot support your business model.

---

## Why Headless is the Modern Default

For most mid-market to enterprise engineering teams, **Headless Shopify** or a similar headless provider (BigCommerce, Swell) is the sweet spot.

1. **Operations gets the Admin:** The fulfillment and merchandising teams get the mature, battle-tested Shopify admin dashboard they already know how to use.
2. **Engineering gets the Edge:** Engineers get to build in Next.js/React, utilizing edge caching, custom routing, and modern CI/CD pipelines.
3. **Security is Outsourced:** The platform handles the checkout (often via a redirect or hosted elements), absorbing all PCI compliance and fraud liability.

---

## Replatforming at Scale

If you are migrating an existing production store to a new architecture, note these critical risks:

- **SEO Migration:** URLs will change. A botched 301 redirect mapping plan can destroy organic traffic overnight.
- **Customer Password Migration:** If migrating away from Shopify, you cannot export customer passwords (they are hashed). You must force a password reset for all legacy users, which causes massive customer service friction.
- **Order History:** Migrating millions of historical orders into a new schema is complex and often unnecessary. Consider storing historical data in a data warehouse (Snowflake/BigQuery) and starting fresh on the new platform.

---

## AI Prompt — Evaluate Your Commerce Engine Strategy

```prompt
I am evaluating the commerce engine architecture for a production e-commerce store.

Business Profile:
- Business Model: [B2C / B2B / Marketplace / Digital]
- Annual GMV: [e.g., $5 Million]
- Product Complexity: [Simple variants vs. Complex configurable bundles]
- Technical Team: [Number of frontend and backend engineers]
- Primary Pain Point with Current System (if replatforming): [e.g., Page speed, checkout limitations, B2B pricing]

I am deciding between:
Option A: [e.g., Headless Shopify Plus with Next.js]
Option B: [e.g., Medusa.js fully custom build]

Act as a Principal E-Commerce Architect and evaluate this decision:
1. Which option aligns better with my team size and business model?
2. What are the hidden operational costs of Option B that my team is likely underestimating?
3. If I choose Option A, what are the strict limitations I will hit within the next 2 years of scaling?
4. How should I handle the Admin UI/Dashboard requirement for my merchandising team under both options?
5. Make a definitive recommendation based on minimizing operational risk while maximizing frontend flexibility.
```

---

## Build vs Buy Checklist

- [ ] Technical capability vs. business model complexity mapped
- [ ] Operational burden of an internal Admin dashboard accounted for in the engineering budget
- [ ] Compliance liability (PCI, Tax, GDPR) accounted for in the custom-build evaluation
- [ ] Hidden GMV fees calculated for platform options over a 3-year horizon
- [ ] Replatforming risks (SEO, user passwords) assessed if migrating an existing store
