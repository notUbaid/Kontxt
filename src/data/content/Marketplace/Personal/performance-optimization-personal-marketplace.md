---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Performance Optimization

Performance work done too early wastes time on problems you don't have yet. Performance work done too late means shipping a slow product to real users. The skill is knowing which marketplace-specific bottlenecks are predictable enough to fix now, before they're a fire.

This module is deliberately narrow: a handful of high-leverage fixes specific to marketplace data patterns, not a general performance course.

---

## Where Marketplaces Actually Get Slow

Generic apps get slow from generic causes. Marketplaces have a predictable shape to their bottlenecks:

| Bottleneck | Why marketplaces hit this early |
|---|---|
| Listing search/browse | The highest-traffic, most-queried table in your app — every visitor hits it, repeatedly |
| N+1 queries on listing cards | Each listing card often needs seller info + rating + image — easy to fetch per-row instead of in bulk |
| Unindexed filters | Search/filter UI grows over time (category, price, location) — indexes don't grow with it automatically |
| Image payload size | Listing photos are usually the single largest asset on any page |

---

## The N+1 Query Problem

This is the single most common performance bug in marketplace listing pages, and AI-generated code produces it constantly because it looks correct.

> **🚩 Common Hallucination:** AI will often generate code that fetches listings, then loops over them fetching seller data and rating per listing — looking clean in isolation, but producing 1 + N database queries for a page of N listings. At 20 listings per page, that's 21 queries where 1-2 would do.

```js
// ❌ N+1: one query per listing
const listings = await db.listing.findMany({ where: { status: "active" } });
for (const listing of listings) {
  listing.seller = await db.user.findUnique({ where: { id: listing.sellerId } });
}

// ✅ One query, joined
const listings = await db.listing.findMany({
  where: { status: "active" },
  include: {
    seller: { select: { id: true, name: true, avatarUrl: true } },
  },
});
```

> **✅ Validation Checklist**
> - [ ] Does the listing browse/search query use a single `include`/join, not a loop with per-row fetches?
> - [ ] Does the seller rating calculation (from the Reviews module) get batched, not computed per-listing in a loop?
> - [ ] If you display "X messages" or "X active listings" counts anywhere in a list, are those counts batched too?

---

## Decision: Indexing Strategy

> **🧩 Decision Card — Database Indexes**
>
> **Option A: Index everything that's filterable**
> Covers every query path, but slows down writes and bloats storage — wasteful for fields rarely filtered on.
>
> **Option B: Index only what you actually query**
> Leaner, requires you to track what your search/filter UI actually uses and revisit when it changes.
>
> **For Personal Mode: use Option B**, but be deliberate about it. At minimum, index:
> - `status` + `category` together (your search module already needs this — confirm it's there)
> - `sellerId` on listings (for "my listings" views)
> - `createdAt` if you sort by "newest" (very common default sort)

```prisma
model Listing {
  // ...fields
  @@index([status, category])
  @@index([sellerId])
  @@index([createdAt])
}
```

> **🔑 Rule of thumb:** if a field appears in a `WHERE` or `ORDER BY` clause on a frequently-hit query, it needs an index. If it only ever appears in a `SELECT`, it doesn't.

---

## Image Optimization

Listing photos are almost always the largest payload on your highest-traffic pages (browse, search results). This is the highest-leverage performance fix available to you, and it's cheap.

> **✅ Validation Checklist**
> - [ ] Are uploaded images resized/compressed before storage, or stored at original upload size?
> - [ ] Does the listing grid use a thumbnail size, not the full-resolution image?
> - [ ] Are images served via a CDN or platform with automatic optimization (most storage providers like Cloudinary, S3+CloudFront, or even Vercel's image handling do this), rather than served raw from your own server?
> - [ ] Do images use lazy loading (`loading="lazy"`) below the fold?

---

## Pagination, Not "Load Everything"

If your `GET /listings` endpoint doesn't paginate, it will eventually return every active listing in one response — fine at 50 listings, broken at 5,000.

```js
router.get("/listings", async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20); // hard cap, see Security module

  const listings = await db.listing.findMany({
    where: { status: "active" },
    include: { seller: { select: { id: true, name: true, avatarUrl: true } } },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  res.json({ listings, page, limit });
});
```

This connects directly to the rate-limiting cap you set in the Security module — pagination and rate limiting solve related but distinct problems (response size vs. request frequency), and you need both.

---

## What NOT to Optimize Yet

Respecting your time matters as much as respecting the server's. Skip these at personal-project scale:

- **Caching layers (Redis, etc.)** — adds operational complexity; only justified once you have measured read-heavy traffic that a database can't handle directly
- **Read replicas / database sharding** — solves a scale problem you don't have yet
- **Server-side rendering optimization** — only chase this if you've actually measured slow page loads, not preemptively

> **⚠️ Warning:** The most common performance mistake in personal projects isn't being too slow — it's spending a weekend building caching infrastructure for a problem that pagination and an index would have solved in twenty minutes.

---

## AI Prompt: Find N+1 Queries

> **📋 Copy Prompt**
>
> ```
> Review this code for N+1 query patterns and missing indexes. This is a personal
> marketplace project — flag real issues, don't suggest caching layers or
> infrastructure changes.
>
> Specifically check for:
> 1. Any loop that makes a database call per iteration (classic N+1)
> 2. Any query filtering or sorting on a field without a corresponding index
> 3. Any endpoint returning an unbounded result set without pagination
>
> Code and schema:
> [PASTE YOUR CODE AND PRISMA SCHEMA]
>
> For each issue: show the current query count/behavior, then the fixed version using
> a single joined query or added index.
> ```
>
> **Why this prompt works:** explicitly excluding caching/infrastructure suggestions keeps AI focused on the cheap, high-leverage fixes appropriate for your project's actual scale, instead of defaulting to generic "add Redis" advice that doesn't match a personal project's needs.

---

## Token Efficiency Tip

Performance review prompts work best with the actual query code *and* schema together — without the schema, AI can't tell you which fields need indexes, only suspect them. Paste both, but trim the schema to just the models involved in the query you're reviewing.

---

## What You've Decided

By the end of this module you should have:

- Joined queries instead of per-row fetches for listing + seller + rating data
- Indexes on the fields your search and "my listings" queries actually filter/sort by
- Resized, compressed, lazy-loaded images served through a CDN or optimized storage
- Hard-capped pagination on every list endpoint
- A clear sense of what to defer (caching, replicas) until you have real traffic data

**Next:** Monitoring — knowing when something breaks before your users tell you.
