---
title: Tech Stack
slug: tech-stack
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 20-25 min
---

# Tech Stack

A marketplace is not the place to learn five new technologies at once. Two independent user types, real money, and trust-critical features (reviews, messaging, disputes) already make this one of the more complex app types to build solo — your stack choice should reduce that complexity, not add to it.

## The Decision You're Actually Making

Not "what's the best tech stack." It's: **what stack lets me, alone, ship a working two-sided marketplace without getting stuck fighting the tools instead of building the product?**

For a personal project, "best" almost always means "most productive for one person," not "most scalable" or "most impressive." You're optimizing for finishing, not for a resume line.

## What Makes a Marketplace's Stack Requirements Different

| Typical app needs | Marketplace additionally needs |
|---|---|
| Auth, database, basic CRUD | Two distinct user roles with different permissions (buyer/seller) |
| One primary data flow | Listings, search, messaging, payments, and reviews as interconnected systems |
| Simple payment (if any) | Split payments — money has to reach a seller, not just you |

> **️ Warning:** Don't pick a stack based on a tutorial for a single-user app (todo list, blog) and assume it'll extend cleanly to a marketplace. The two-sided nature and payment splitting are the parts that most commonly reveal a stack's limitations partway through — check for marketplace-specific support (like Stripe Connect compatibility) before committing.

## Recommended Stack for a Solo-Built Marketplace

| Layer | Recommendation | Why |
|---|---|---|
| Frontend | Next.js (React) | Huge ecosystem, AI tools generate it well, handles both marketing pages and app in one framework |
| Backend | Next.js API routes or a lightweight Node.js API | Avoids running two separate codebases/deployments for a solo builder |
| Database | PostgreSQL (via Supabase or Neon) | Relational structure fits marketplace data (users, listings, transactions, reviews) naturally |
| Auth | Supabase Auth or Clerk | Handles two user roles without building auth from scratch |
| Payments | Stripe Connect | The de facto standard for split marketplace payments — built specifically for this exact problem |
| File/image storage | Supabase Storage or Cloudinary | Listing photos need reliable, easy image handling |
| Hosting | Vercel (frontend/API) + Supabase/Neon (database) | Minimal DevOps, generous free tiers, fast to deploy |

> ** Best Practice:** Choose Stripe Connect specifically, not generic Stripe payments, from day one. Retrofitting split-payment logic (getting money to a seller, not just yourself) after building on plain Stripe is a significant rework — this is the single highest-cost mistake to avoid in a marketplace tech stack decision.

## Decision: Relational vs Document Database

| Choice | Fit for a marketplace |
|---|---|
| PostgreSQL (relational) | Strong fit — listings, users, transactions, and reviews have clear relationships that relational structure models naturally |
| MongoDB (document) | Workable, but marketplace data tends to need joins (a listing's seller, a transaction's buyer and seller) that relational databases handle more naturally |

> ** Tip:** Default to PostgreSQL for a marketplace unless you have a specific reason not to. The relationships between users, listings, transactions, and reviews are exactly the kind of structured, interconnected data relational databases were designed for — fighting a document database into that shape adds friction you don't need.

## What to Avoid at Personal-Project Scale

| Avoid | Why it's premature here |
|---|---|
| Microservices architecture | Massive operational overhead for a solo builder with no team to split services across |
| Building your own auth system | Auth is a solved problem (Supabase, Clerk) — building it yourself risks security gaps for no real benefit |
| Custom payment processing | Never build this yourself — Stripe Connect exists specifically to avoid this |
| Kubernetes / complex container orchestration | Solves a scaling problem you don't have yet; adds DevOps burden with no current payoff |

> **️ Warning:** Building custom payment processing or auth from scratch isn't just slower — it introduces real security and compliance risk (handling card data, managing password security) that a solo builder is poorly positioned to get right. These are the two areas where "use an established service" isn't a compromise, it's the responsible choice.

## Search: A Marketplace-Specific Consideration

Unlike many apps, a marketplace's core value depends on buyers finding relevant listings — search matters more here than in most app types.

| Approach | When it's enough |
|---|---|
| Database full-text search (Postgres built-in) | Sufficient for most personal-project marketplaces at launch |
| Dedicated search service (Algolia, Meilisearch) | Worth adding once listing volume or search complexity (filters, typo-tolerance) genuinely outgrows built-in search |

> ** Tip:** Start with PostgreSQL's built-in full-text search rather than adding a dedicated search service on day one. It's one less system to configure and maintain, and it's genuinely sufficient until your listing volume and search needs grow past what a simple query can handle.

## Use AI to Validate Your Stack Choice

**Prompt — Marketplace Stack Fit Check**
```
I'm building a personal-project marketplace for [describe what's being 
bought/sold] and I'm the only developer. I'm considering:
[list your proposed stack: frontend, backend, database, auth, payments, 
hosting]

Check specifically for:
1. Does this stack have good, well-documented support for split 
   payments (Stripe Connect or equivalent)?
2. Any piece of this stack likely to cause friction specifically 
   because of the two-sided (buyer/seller) nature of a marketplace?
3. Anything here that's overkill for a solo builder at personal-project 
   scale?
```

> ** Token Efficiency:** List your specific proposed stack rather than asking "what stack should I use" generically — a concrete list lets AI evaluate fit and flag specific gaps, instead of generating a generic recommendation you'll have to compare against your own research anyway.

## Validate Before Moving to Implementation

- Payment layer specifically supports split payments (Stripe Connect or a comparable marketplace-payment service)
- Database choice comfortably models the relationships between users, listings, transactions, and reviews
- Auth solution supports two distinct roles (buyer/seller) without custom-building role logic from scratch
- You've deliberately avoided microservices, custom auth, and custom payment processing at this scale
- Search approach (even basic) is planned from the start, not an afterthought

## Common Mistakes

- Starting with plain Stripe instead of Stripe Connect, requiring a painful rework once split payments are needed
- Choosing a stack based on a single-user-app tutorial without checking marketplace-specific fit
- Building custom auth or payment logic instead of using an established, secure service
- Over-engineering with microservices or container orchestration at solo, personal-project scale
- No search strategy at all, leaving buyers unable to actually find relevant listings

## Quick Reference

| Use this | Not this (at this scale) | Add later if needed |
|---|---|---|
| Stripe Connect | Plain Stripe or custom payment logic | Multi-currency payment support |
| PostgreSQL (Supabase/Neon) | Custom-built database layer | Dedicated search service (Algolia/Meilisearch) |
| Supabase Auth / Clerk | Custom-built auth system | Advanced role/permission systems |
| Next.js + Vercel | Microservices / Kubernetes | Multi-region deployment |

## What's Next

With your stack chosen and validated against marketplace-specific needs, the next module covers Authentication — implementing the two-sided (buyer/seller) auth model this stack is built to support.
