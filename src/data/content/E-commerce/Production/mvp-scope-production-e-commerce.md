---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 20–25 min
---

# MVP Scope

Phase 0 ends here. Everything you've defined — your audience, value proposition, metrics, fundamentals, business definition, brand, catalog, economics, and pricing — now gets compressed into one question:

**What is the smallest store that can validate your business?**

Not the smallest store you can imagine. The smallest store that can take real orders, generate real revenue, and give you real signal about whether this business works.

---

## What MVP Means for E-Commerce

MVP in e-commerce is not a prototype. It is not a mockup. It is not a waitlist page.

An e-commerce MVP is a store that can:

1. Show products clearly enough that customers understand what they're buying
2. Accept payment securely
3. Confirm the order to the customer
4. Allow you to fulfill the order

Everything else is an enhancement.

---

## The Feature Sorting Framework

Take every feature you've thought about building. Sort it into one of three buckets.

### Bucket 1 — Launch Blockers

Features the store literally cannot function without. Without these, you cannot take an order.

| Feature | Why It's a Launch Blocker |
|---|---|
| Product listing page | Customers can't see what you sell |
| Product detail page | Customers can't make a purchase decision |
| Cart | Customers can't accumulate items before checkout |
| Checkout flow | Customers can't pay |
| Payment processing | Money cannot move |
| Order confirmation email | Customer has no proof of purchase |
| Basic inventory tracking | You need to know if you can fulfill |
| Admin: view orders | You need to know what to ship |

### Bucket 2 — Early Enhancements

Features that meaningfully improve conversion or operations, but the store can function without them at launch.

| Feature | When to Build |
|---|---|
| Customer accounts | After first 20 orders |
| Wishlist | After conversion rate is stable |
| Product search | When catalog exceeds 20 items |
| Reviews and ratings | After you have repeat customers |
| Discount codes | When you have a specific campaign |
| Abandoned cart emails | After launch, first growth lever |
| Shipping tracking | After first week of fulfillment |
| Related products | After basic analytics are in place |

### Bucket 3 — Later or Never

Features that sound important but rarely move the needle for a personal store at this stage.

| Feature | Reality |
|---|---|
| Loyalty points program | Premature. You have no retention data yet. |
| Advanced analytics dashboard | GA4 is enough for months. |
| Multi-currency support | Build when you have international orders. |
| Subscription / recurring billing | Only if your product model requires it. |
| Live chat support | Email is enough at low order volume. |
| Mobile app | Web is your store. App is a later problem. |
| AI product recommendations | No data to train on yet. |

> ⚠️ **Warning: Scope Creep Disguised as Quality**
>
> "I just want to do it properly" is the most common reason personal stores never launch. Bucket 2 and 3 features feel like quality improvements. They are actually scope creep. Build Bucket 1. Ship. Then build Bucket 2 features one at a time, driven by actual customer behavior.

---

## The MVP Page Set

A personal e-commerce store needs exactly these pages at launch:

```
/                    → Homepage
/products            → Product listing (catalog)
/products/[slug]     → Product detail page
/cart                → Cart
/checkout            → Checkout flow
/order/[id]          → Order confirmation
/account/login       → Optional at MVP (guest checkout is fine)
/about               → Trust signal (especially for personal brands)
/contact             → Basic contact method
```

That is nine pages. Every additional page at launch is optional.

---

## The MVP Data Model Snapshot

By the end of Phase 0, you should be able to state your MVP data model in plain terms.

**Example:**

> My store sells handmade candles. I have 12 products at launch, each with 1–3 scent variants. All products are physical, tracked inventory, shipped flat-rate domestically. I need: Products, Variants, Cart, CartItems, Orders, OrderItems, Customers (guest only at launch). No search, no accounts, no wishlists. Discount codes deferred until post-launch.

Write yours. If you can't write it clearly, you haven't finished Phase 0.

---

## Timeline Realism

Personal projects fail silently because timelines are set optimistically and never revisited.

A realistic MVP build timeline for a personal e-commerce store, building solo with AI assistance:

| Phase | Realistic Duration |
|---|---|
| Phase 0 — Strategy | 3–5 days |
| Phase 1 — Design | 1–2 weeks |
| Phase 2 — Architecture | 3–5 days |
| Phase 3 — Development | 4–8 weeks |
| Phase 4 — Production Readiness | 1–2 weeks |
| Phase 5 — Launch | 3–5 days |

**Total: 2–4 months** for a solo build with meaningful quality.

If your target is faster, compress Phase 1 (use a UI kit, skip custom design system) and Phase 3 (use Shopify instead of custom build). Do not compress Phase 4. Do not skip Phase 0.

---

## ✅ MVP Scope Checklist

- [ ] I have listed every feature I initially planned and sorted each into Bucket 1, 2, or 3
- [ ] My Bucket 1 list has no features that belong in Bucket 2
- [ ] I can describe my MVP data model in 3–5 plain sentences
- [ ] I have defined the exact page set I need at launch
- [ ] I have set a realistic launch target date based on the timeline above
- [ ] I have identified the one feature I most want to add that I am deliberately deferring
- [ ] Everyone involved in this project agrees on what is and is not in scope

---

## AI Prompt — Pressure-Test Your MVP Scope

```
I am building a personal e-commerce store. I am about to move into design and development.

My MVP definition:
- Products: [count and brief description]
- Key features I plan to build for launch: [list everything]
- Features I am deferring: [list]
- Target launch date: [date]
- Building: [solo / with a team of N]
- Using: [custom build / Shopify / other platform]

Pressure-test my MVP scope:
1. Are there any features in my launch list that are not true launch blockers?
2. Are there any features missing from my launch list that would actually block me from taking orders?
3. Is my timeline realistic for my team size and build approach?
4. What is the single highest-risk item in my current scope — the thing most likely to delay launch?
5. What should I build first to get to a working checkout as fast as possible?

Be direct. Challenge my assumptions.
```

---

## Phase 0 Complete

You have now defined:

- ✅ Who you're building for and what success looks like
- ✅ What your store is mechanically and how it works
- ✅ What you sell, who buys it, and why they buy from you
- ✅ What your brand signals and how it speaks
- ✅ What your catalog contains and how it's structured
- ✅ Whether your economics are viable
- ✅ How you've priced your products and why
- ✅ Exactly what you're building and what you're not

This is the foundation. Everything built in Phase 1 through Phase 5 stands on these decisions.

**Phase 1: Store Design →**
