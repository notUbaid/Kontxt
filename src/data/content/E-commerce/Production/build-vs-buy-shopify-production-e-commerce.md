---
title: Build vs Buy (Shopify)
slug: build-vs-buy-shopify
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 20–25 min
---

# Build vs Buy (Shopify)

This is the most consequential decision in Phase 2. Everything downstream — your tech stack, your timeline, your cost structure, your learning outcome — depends on it.

Most developers default to building because it feels more legitimate. Most product people default to Shopify because it ships faster. Both instincts are sometimes wrong.

This module gives you a framework to make the right call for your actual situation.

---

## What You're Actually Choosing Between

| | Custom Build | Shopify |
|---|---|---|
| **What you own** | Everything | Your storefront theme and content |
| **What you control** | Every pixel and every system | Frontend only (unless headless) |
| **Time to first sale** | Weeks to months | Hours to days |
| **Monthly cost** | $0–25 (infrastructure) | $39–399 (plan) + 0–2% transaction fee |
| **Payment flexibility** | Any processor | Stripe via Shopify Payments or 0.5–2% surcharge |
| **Technical complexity** | High | Low |
| **Learning value** | High | Low |
| **Ongoing maintenance** | You own it | Shopify owns it |

---

## The Honest Case for Shopify

Shopify has solved problems that will take you weeks to solve yourself:

- Checkout conversion optimization (Shopify's checkout converts better than most custom builds)
- PCI compliance and payment security
- Inventory management with multi-location support
- Tax calculation in 170+ countries
- Fraud detection
- Mobile-optimized checkout out of the box
- Abandoned cart recovery
- Shipping carrier integrations
- App ecosystem for features you'd otherwise build

**If your goal is to sell things**, Shopify is the professional choice. Companies doing $10M/year use Shopify. The ceiling is not the platform — it's your marketing.

> **Warning:** Shopify's transaction fee (0.5–2% on non-Shopify Payments) is a hidden cost most people miss. On a $50,000/month store using a third-party processor at 1% surcharge, that's $500/month — $6,000/year — purely for the privilege of not using Stripe via Shopify Payments. Always use Shopify Payments where available.

---

## The Honest Case for Custom Build

Custom build makes sense when:

- **Learning is the primary goal.** Building your own store teaches you payment architecture, inventory systems, webhook handling, and order management that no tutorial covers. This is career-valuable.
- **You need functionality Shopify can't support.** Custom pricing logic, complex B2B workflows, unusual product types, deep third-party integrations.
- **You need full data ownership.** Shopify owns your store's data. If you ever migrate off, exporting is painful. With Supabase, you own everything.
- **You're building a platform, not just a store.** If your store is the product — a marketplace, a rental platform, a subscription box — Shopify is the wrong foundation.

---

## The Headless Middle Ground

Shopify as backend, your own frontend.

```
Your Next.js frontend
        ↕  (Shopify Storefront API)
Shopify backend
(products, inventory, cart, checkout, orders, payments)
```

**What you get:**
- Full frontend control — your design, your UX, your performance
- Shopify handles every backend concern (payments, inventory, orders, taxes)
- Shopify Payments — no transaction surcharge

**What you give up:**
- Shopify's built-in checkout UX (you'll build your own or use Shopify's hosted checkout)
- Simpler architecture

**When headless makes sense:**
- You want to learn frontend e-commerce without building a backend from scratch
- You want design freedom but don't want to build payment and inventory systems
- You're comfortable with GraphQL (Shopify Storefront API is GraphQL-only)

**Monthly cost:** Shopify Basic ($39/month) + Vercel free tier + your domain.

---

## Decision Framework

Answer these four questions:

**1. Is learning the goal or is selling the goal?**
- Learning → custom build
- Selling → Shopify
- Both → headless Shopify or Medusa.js

**2. How complex is your product catalog?**
- Standard products with variants → Shopify handles this perfectly
- Unusual product types, custom pricing, complex bundles → custom build

**3. What is your runway before you need revenue?**
- Weeks → Shopify
- Months → custom build is viable

**4. Will you maintain this yourself long-term?**
- Yes, solo → custom build means you own every bug
- Yes, with help → doesn't change the calculus much
- No, handing off → Shopify is more maintainable for non-developers

---

## Feature Comparison for Personal Store Needs

| Feature | Custom Build | Shopify Basic | Headless Shopify |
|---|---|---|---|
| Product management | Build it | ✓ Included | ✓ Via admin |
| Inventory tracking | Build it | ✓ Included | ✓ Via API |
| Variant support | Build it | ✓ Up to 100 variants | ✓ Via API |
| Checkout | Build it | ✓ Optimized | Build it or use hosted |
| Payment processing | Stripe integration | ✓ Shopify Payments | ✓ Shopify Payments |
| Tax calculation | Stripe Tax or manual | ✓ Automatic | ✓ Automatic |
| Email notifications | Resend integration | ✓ Built-in templates | ✓ Built-in |
| Abandoned cart | Build it | ✓ Included | ✓ Via webhook |
| Analytics | PostHog or manual | ✓ Basic included | ✓ Basic included |
| Custom domain | Vercel | ✓ $39+/month | ✓ $39+/month |
| App ecosystem | NPM | ✓ 8,000+ apps | Partial |

---

## Medusa.js — The Third Option

If you want to build but don't want to architect everything from scratch, Medusa.js is worth knowing.

Medusa is an open-source commerce engine — essentially a self-hosted Shopify backend. It gives you:
- Pre-built product, inventory, order, and cart APIs
- Stripe and PayPal integrations out of the box
- A React-based storefront starter
- Full data ownership

**When Medusa makes sense:**
- You want to learn e-commerce architecture without building every subsystem
- You want a portfolio project that shows real engineering judgment
- You want Shopify-like functionality at infrastructure cost only

**When Medusa doesn't make sense:**
- You want maximum learning from first principles (build custom)
- You want zero maintenance and fast shipping (use Shopify)

---

## AI Prompt — Make Your Decision

<copy-prompt>
I'm deciding between building a custom e-commerce store vs. using Shopify (or a headless approach) for my personal project.

My situation:
- What I'm selling: [describe products]
- Primary goal: [learning / selling / both]
- Timeline to first sale: [your target]
- Monthly infrastructure budget: [amount]
- Technical skills: [your stack experience]
- Long-term plan for the store: [grow it / portfolio project / experiment]
- Special requirements: [any unusual product types, pricing logic, or integrations]

Evaluate my three options:
1. Custom build (Next.js + Supabase + Stripe)
2. Shopify (hosted, Shopify Payments)
3. Headless Shopify (Next.js frontend + Shopify backend)

For each option, tell me:
- Whether it fits my situation and why
- The top 2 risks for my specific goals
- The realistic time to a working store
- Total cost at 0 orders/month and at 100 orders/month

Give me a clear recommendation with your reasoning. Don't hedge — tell me what you'd choose.
</copy-prompt>

---

## Build vs Buy Checklist

- [ ] Primary goal clarified — learning vs. selling vs. both
- [ ] Shopify transaction fee calculated for your expected volume
- [ ] Headless option evaluated if you want Shopify backend + custom frontend
- [ ] Medusa.js evaluated if you want open-source backend
- [ ] Decision made and documented — including the reason
- [ ] Timeline to first sale estimated against chosen approach
- [ ] Monthly cost model updated based on chosen approach (from Cost Estimation module)
