---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 25–30 min
---

# MVP Scope

Phase 0 ends here. Everything you have defined — your audience, value proposition, metrics, fundamentals, business definition, brand, catalog, economics, and pricing — now gets compressed into one question:

**What is the smallest store that can validate your business model at production quality?**

Not the smallest thing you can ship. Not a prototype. The smallest production-grade store that can take real orders, generate real revenue, operate reliably under real load, and give you the signal you need to make confident investment decisions about what to build next.

---

## What MVP Means for Production E-Commerce

An e-commerce MVP at production level is not a prototype. It is not a mockup. It is not a waitlist page.

A production e-commerce MVP is a store that can:

1. Show products clearly enough that customers understand what they are buying
2. Accept payment securely and reliably
3. Confirm the order to the customer with a proper transactional email
4. Allow you to view, manage, and fulfil orders
5. Handle basic error cases without data corruption or customer confusion
6. Operate without manual intervention under normal load

Everything else is an enhancement. But the above six points are non-negotiable — each one of them, if absent, creates a broken purchase experience that destroys trust before you have had time to build any.

---

## The Feature Sorting Framework

Take every feature you have thought about building. Sort it into one of three buckets.

### Bucket 1 — Launch Blockers

Features the store literally cannot function without. Without these, you cannot take a real order reliably.

| Feature | Why It Is a Launch Blocker |
|---|---|
| Product listing page | Customers cannot see what you sell |
| Product detail page | Customers cannot make a purchase decision |
| Cart | Customers cannot accumulate items before checkout |
| Checkout flow (guest checkout minimum) | Customers cannot pay |
| Payment processing with proper error handling | Money cannot move, or errors cause confusion |
| Order confirmation email | Customer has no proof of purchase |
| Basic inventory tracking with oversell protection | You may fulfil orders you cannot ship |
| Admin: view and manage orders | You need to know what to fulfil and what is pending |
| Basic security hardening | Live stores are targeted by bots and fraud attempts immediately |

### Bucket 2 — Early Enhancements (Post-Launch Priority)

Features that meaningfully improve conversion or operations, but the store can function without them at launch.

| Feature | When to Build |
|---|---|
| Customer accounts | After first 50 orders — builds repurchase mechanics |
| Wishlist | When conversion data shows browse-and-leave behaviour |
| Product search | When catalog exceeds 30 items |
| Reviews and ratings | After you have real returning customers |
| Discount codes | When you have a specific campaign with ROI model |
| Abandoned cart emails | First growth lever — build within 2 weeks of launch |
| Real-time shipping tracking | After first fulfilment week |
| Related products / recommendations | After basic analytics are instrumented |
| Loyalty points program | After 90-day retention data shows repurchase patterns |

### Bucket 3 — Later or Never

Features that sound important but rarely move the needle in the first 6 months.

| Feature | Reality |
|---|---|
| Multi-currency support | Build when you have confirmed international order volume |
| Subscription / recurring billing | Only if your product model specifically requires it |
| Live chat support | Email and async support is sufficient at early scale |
| Mobile app | Your PWA/web store is the product. App is a Year 2 problem. |
| AI product recommendations | No purchase data to train on yet |
| Advanced analytics dashboards | GA4 + basic PostHog covers everything for months |
| Headless CMS integration | Defer until editorial content drives meaningful traffic |

> [!WARNING]
> **Scope Creep Disguised as Quality**: "I want to do this properly" is the most common reason production stores overshoot their launch timeline and budget. Bucket 2 and 3 features feel like quality improvements. They are actually scope decisions that consume engineering capacity that should be spent launching and iterating. Build Bucket 1 to production quality. Ship. Then build Bucket 2 features driven by actual customer behaviour data.

---

## The MVP Page Set

A production e-commerce store needs exactly these pages at launch:

```
/                    → Homepage
/products            → Product listing (catalog)
/products/[slug]     → Product detail page
/cart                → Cart
/checkout            → Checkout flow
/order/[id]          → Order confirmation and status
/account/login       → Optional at MVP if guest checkout is supported
/account/orders      → Optional at MVP (link via email instead)
/about               → Trust signal — essential for new stores
/contact             → Basic contact method with response SLA
/policies            → Privacy, Terms, Returns — legally required
```

Every additional page at launch is optional. The `/policies` pages are not optional — they are a legal requirement and a trust signal.

---

## The MVP Architecture Checklist

Before Phase 1, confirm you have defined:

### Data Model
- [ ] Core entities identified (Products, Variants, Cart, Orders, Customers, Addresses)
- [ ] Variant model designed from day one — even if current products are simple
- [ ] Inventory reservation strategy chosen
- [ ] Price stored as integers — not floats

### Infrastructure
- [ ] Hosting and deployment strategy decided
- [ ] Database provider and connection pooling approach decided
- [ ] Payment provider selected (Stripe, Razorpay, or other)
- [ ] Email provider selected for transactional emails
- [ ] CDN strategy for product images decided

### Security
- [ ] Authentication approach for admin decided
- [ ] Payment webhook signature verification planned
- [ ] Bot protection / rate limiting approach planned

---

## The MVP Data Model Snapshot

By the end of Phase 0, you should be able to state your MVP data model in plain terms.

**Example:**

> My store sells handmade candles. I will have 20 products at launch, each with 1–3 scent variants. All products are physical, tracked inventory, shipped flat-rate domestically. I need: Products, Variants (with SKU, price, inventory), Cart, CartItems, Orders, OrderItems, Customers (guest checkout only at launch), Addresses. No product search, no customer accounts, no wishlists in MVP. Discount codes deferred until post-launch campaign. Admin is a simple internal dashboard — view orders, mark as shipped.

Write yours. If you cannot write it clearly, you have not finished Phase 0.

---

## Timeline Realism

Production timelines fail for two reasons: optimistic estimates and scope that grows without formal approval.

A realistic MVP build timeline for a production e-commerce store:

| Phase | Realistic Duration |
|---|---|
| Phase 0 — Strategy | 1 week |
| Phase 1 — Design | 2–3 weeks |
| Phase 2 — Architecture | 1 week |
| Phase 3 — Development | 6–10 weeks |
| Phase 4 — Production Readiness | 2–3 weeks |
| Phase 5 — Launch | 1 week |

**Total: 3–5 months** for a production-quality solo or small-team build.

If your target is faster, compress Phase 1 (use a UI kit, adopt a component library, defer custom design system polish) and Phase 3 (use Shopify instead of a custom build). Do not compress Phase 4. Do not skip Phase 0.

> [!IMPORTANT]
> Production stores require Phase 4 — Production Readiness — to be treated as a first-class phase, not a final-day checklist. Security configuration, monitoring, error tracking, fraud prevention, and load testing are not cosmetic. They are what separates a store that can operate reliably from one that will have its first serious incident within 30 days of launch.

---

## MVP Scope Checklist

- [ ] I have listed every feature I initially planned and sorted each into Bucket 1, 2, or 3
- [ ] My Bucket 1 list has no features that belong in Bucket 2
- [ ] I can describe my MVP data model in 3–5 plain sentences
- [ ] I have defined the exact page set I need at launch including policy pages
- [ ] I have set a realistic launch target date based on the timeline above
- [ ] I have identified the one feature I most want to add that I am deliberately deferring
- [ ] Phase 4 (Production Readiness) is on my critical path, not an afterthought
- [ ] Everyone involved in this project agrees on what is and is not in scope

---

## AI Prompt — Pressure-Test Your MVP Scope

```prompt
I am building a production e-commerce store. I am about to move into design and development.

My MVP definition:
- Products: [count and brief description]
- Key features I plan to build for launch: [list everything]
- Features I am deferring: [list]
- Target launch date: [date]
- Building: [solo / with a team of N]
- Using: [custom build / Shopify / hybrid]
- Target order volume in first 3 months: [estimate]

Pressure-test my MVP scope:
1. Are there any features in my launch list that are not true launch blockers?
2. Are there any features missing from my launch list that would actually block me from taking orders safely at production scale?
3. Is my timeline realistic for my team size and build approach?
4. What is the single highest-risk item in my current scope — the thing most likely to delay launch?
5. What should I build first to get to a working checkout as fast as possible?
6. What security or operational gaps in my plan would create problems in the first 30 days of live operation?

Be direct. Challenge my assumptions about what is and is not necessary.
```

---

## Phase 0 Complete

You have now defined:

- Who you are building for and what success looks like at production scale
- How the store works mechanically and what that implies architecturally
- What you sell, who buys it, why they buy from you, and how the economics work
- What your brand signals and how it speaks across every channel
- What your catalog contains and how it is structured for scale
- Whether your economics are viable at production volume
- How you have priced your products and why, including CAC implications
- Exactly what you are building and what you are deliberately not building

This is the foundation. Everything built in Phase 1 through Phase 5 stands on these decisions. Change them later and you are refactoring from the root.

**Phase 1: Store Design →**
