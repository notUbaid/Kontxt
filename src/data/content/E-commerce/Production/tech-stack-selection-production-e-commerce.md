---
title: Tech Stack Selection
slug: tech-stack-selection
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Tech Stack Selection

Phase 1 was about what to build. Phase 2 is about how to build it.

Tech stack selection is the first decision of Phase 2 — and it sets constraints on everything that follows. The wrong stack doesn't just slow you down. It creates a ceiling on what your store can do without a full rewrite.

This module gives you a clear framework for making this decision, opinionated recommendations for a personal e-commerce store, and the tradeoffs you're accepting either way.

---

## The Real Question

Stack selection is not about what's most impressive or most popular. It's about:

> *What lets a solo developer ship a maintainable, production-quality store in the least time?*

Complexity is not sophistication. The best stack for a personal project is the one you can build, debug, and maintain alone — while still being professionally sound.

---

## The Core Decision — Build vs. Platform

Before choosing a framework, make this decision first.

| Approach | Examples | Build Time | Cost | Control |
|---|---|---|---|---|
| **Hosted platform** | Shopify, Squarespace Commerce | Days | $30–300/month | Low |
| **Headless platform** | Shopify + Next.js, Medusa.js | Weeks | $30–100/month + hosting | Medium |
| **Custom build** | Next.js + Stripe + Supabase | Months | $5–20/month | Full |

**For a personal project, the honest breakdown:**

| If your goal is... | Choose |
|---|---|
| Learning full-stack e-commerce engineering | Custom build |
| Shipping a real store fast and selling | Shopify |
| Learning while shipping (balanced) | Headless (Shopify API + your frontend) or Medusa.js |

> **Warning:** Custom-building payment processing, inventory management, tax calculation, and order management from scratch is a multi-month effort. If your goal is to learn — great. If your goal is to sell — use a platform. Don't confuse the two.

This module assumes your goal includes learning. The recommended stack below reflects that.

---

## Recommended Stack — Personal E-Commerce

This stack balances learning value, shipping speed, and low ongoing cost.

```
Frontend      →  Next.js 14 (App Router) + TypeScript
Styling       →  Tailwind CSS
Database      →  Supabase (PostgreSQL)
Auth          →  Supabase Auth
Payments      →  Stripe
File Storage  →  Supabase Storage (product images)
Email         →  Resend
Deployment    →  Vercel
```

**Why this combination:**

| Layer | Choice | Reason |
|---|---|---|
| Next.js | App Router + RSC | SSR for product pages (SEO), client components for cart/checkout |
| Supabase | PostgreSQL + Auth + Storage | One platform covers database, auth, and image storage — less config, lower cost |
| Stripe | Payments | Industry standard, best docs, handles PCI compliance, supports Apple/Google Pay |
| Resend | Email | Simplest transactional email API, generous free tier, works with React Email |
| Vercel | Hosting | Zero-config Next.js deployment, edge network, free tier sufficient for personal store |

**Monthly cost at zero sales:** ~$0–5 (all free tiers)  
**Monthly cost at moderate traffic:** ~$0–25

---

## Next.js Rendering Strategy for E-Commerce

This is the most important framework-level decision. Different pages need different rendering.

| Page | Rendering | Why |
|---|---|---|
| Homepage | SSG or ISR | Static — changes infrequently, fast load |
| Collection / Category | ISR (revalidate 60s) | Product list changes when inventory changes |
| Product Detail | ISR (revalidate 30s) | Price/stock changes need to reflect |
| Cart | Client-side only | User-specific, no SEO value |
| Checkout | Client-side only | Must be dynamic, no caching |
| Order Confirmation | Server-side | Must be fresh, authenticated |
| Account / Orders | Server-side | Authenticated, user-specific |

**ISR (Incremental Static Regeneration)** is the sweet spot for product pages. Pages are statically generated, but Vercel regenerates them in the background at your specified interval. Users always get a fast cached page; data stays reasonably fresh.

```ts
// app/products/[slug]/page.tsx
export const revalidate = 30; // regenerate every 30 seconds
```

---

## Database Schema Overview

Supabase gives you PostgreSQL. Plan your tables before you write code.

**Core tables:**

```
products
  id, title, slug, description, category_id,
  status, created_at, updated_at

product_variants
  id, product_id, sku, price, compare_at_price,
  inventory_quantity, options (jsonb), created_at

product_images
  id, product_id, variant_id (nullable),
  url, alt, sort_order

categories
  id, title, slug, parent_id, sort_order

orders
  id, user_id (nullable), email, status,
  shipping_address (jsonb), total, created_at

order_items
  id, order_id, variant_id, quantity, price_at_purchase,
  product_snapshot (jsonb)

customers
  id, email, created_at (links to Supabase Auth)
```

> **Tip:** Store `price_at_purchase` and `product_snapshot` on order items. If a product is later edited or deleted, you still have a complete record of what was sold and at what price — which is a legal and accounting requirement.

---

## Stripe Integration Architecture

Stripe has two integration patterns. Choose the right one.

| Pattern | How It Works | Use When |
|---|---|---|
| **Stripe Checkout** | Redirect to Stripe-hosted checkout page | Fast to implement, less control over UX |
| **Stripe Elements** | Embed card form in your own checkout | Full control, more implementation work |
| **Payment Intents API** | Manual payment flow with Stripe.js | Maximum control, custom flows |

**For a personal project: Stripe Elements** is the right balance. You keep your checkout UI and UX, but Stripe handles the card form, PCI compliance, and payment processing.

**Never build a card form from scratch.** Handling raw card numbers requires PCI DSS Level 1 compliance — an audit process that costs tens of thousands of dollars. Stripe Elements keeps card data off your server entirely.

---

## Supabase Storage for Images

Product images live in Supabase Storage.

**Bucket structure:**
```
products/
  {product-id}/
    main.webp
    gallery-1.webp
    gallery-2.webp
```

**Access rules:**
- Product images: public read (anyone can view)
- Admin uploads: authenticated write only

Convert images to WebP on upload. Either handle this client-side (browser Canvas API) or use a transformation service. Supabase Storage supports image transformations via URL parameters — you can serve resized versions without storing multiple copies:

```
/storage/v1/object/public/products/abc123/main.webp?width=400&quality=80
```

---

## What to Defer

You don't need everything on day one.

| Feature | Defer Until |
|---|---|
| Search (Algolia, Typesense) | You have 50+ products |
| CDN for images | Vercel/Supabase handles this for free initially |
| Redis / caching layer | You have measurable performance problems |
| Separate CMS (Sanity, Contentful) | Content editing becomes a real pain point |
| Multi-currency | You have international customers requesting it |
| Tax calculation API (TaxJar) | You're in multiple tax jurisdictions |

Adding these before you need them adds cost, complexity, and maintenance burden with zero user benefit. Supabase + Vercel covers the first 10,000 users comfortably.

---

## Alternative Stacks (and When to Choose Them)

| Stack | Choose If |
|---|---|
| **Medusa.js + Next.js** | You want an open-source Shopify alternative with a pre-built e-commerce backend |
| **Remix + Stripe + PlanetScale** | You prefer Remix's data loading model and want MySQL |
| **SvelteKit + Stripe + Supabase** | You prefer Svelte and want smaller bundle sizes |
| **Shopify Hydrogen** | You want Shopify's backend with a custom React frontend |

None of these are wrong. The recommended stack wins on ecosystem size, documentation quality, and free tier generosity — not on technical superiority.

---

## AI Prompt — Validate Your Stack Decision

<copy-prompt>
I'm building a personal e-commerce store with the following requirements:

- Products: [what you sell]
- Variants: [yes/no, describe]
- Expected catalog size: [number of products]
- User accounts: [yes/no]
- International shipping: [yes/no]
- My current skills: [React/Next.js experience level, backend experience]
- My goal: [learning / shipping / both]
- Monthly budget for infrastructure: [your budget]

I'm considering this stack:
- Frontend: Next.js 14 + TypeScript + Tailwind
- Database: Supabase (PostgreSQL)
- Payments: Stripe
- Email: Resend
- Hosting: Vercel

Evaluate this stack for my specific situation:
1. Is this appropriate for my goals and skill level?
2. What are the top 3 risks with this stack for my project?
3. What will I struggle with most and how should I prepare?
4. Are there any parts of this stack I should swap for something simpler given my constraints?
5. What should I absolutely not build myself (use a service instead)?
6. What's a realistic timeline to MVP with this stack given my experience level?
</copy-prompt>

---

## Stack Decision Checklist

- [ ] Build vs. platform decision made — and reason documented
- [ ] Next.js rendering strategy decided per page type (SSG / ISR / SSR / CSR)
- [ ] Database tables planned before writing any code
- [ ] Stripe integration pattern chosen (Elements vs. Checkout)
- [ ] Image storage strategy defined (Supabase Storage + WebP)
- [ ] Features deferred that aren't needed at launch
- [ ] Monthly infrastructure cost estimated
- [ ] Stack validated against your actual skill level — no aspirational complexity
