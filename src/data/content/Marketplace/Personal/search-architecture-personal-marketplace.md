---
title: Search Architecture
slug: search-architecture
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Search Architecture

## Search Is Core Product, Not a Nice-to-Have

Your Tech Stack Selection module already flagged search as something marketplaces can't treat as optional — discovery is half of the Buyer Journey. This module decides exactly how, given the Listing schema you just finalized.

The good news: at personal-mode scale, the answer is simpler than most tutorials suggest.

---

## The Threshold That Actually Matters

The single most common mistake here is solving for a scale you don't have. Use this as your actual decision rule, not a guess:

| Listing Volume | Recommended Approach |
|---|---|
| Up to a few thousand listings | Postgres full-text search — genuinely sufficient |
| Tens of thousands+, with complex relevance needs | Consider a dedicated search service (Algolia, Meilisearch, Elasticsearch) |

> ✅ **Best practice for personal mode:** Build on Postgres full-text search. You are almost certainly in the first row of this table, possibly for your entire personal-mode lifetime. A dedicated search engine adds an entire new service to operate, monitor, and keep in sync with your database — operational overhead with no payoff until you're well past thousands of active listings.

---

## What Buyers Actually Need From Search at This Scale

Don't build a search system more sophisticated than your Buyer Journey planning calls for. Map this back to what you decided buyers actually need.

| Capability | Needed at Personal Mode? | Why |
|---|---|---|
| Keyword search across title/description | Yes | Core discovery mechanism |
| Category filter | Yes | You built a fixed category list specifically for this |
| Price range filter | Yes | Cheap to implement, high buyer value |
| Sort by recency/price | Yes | Simple, expected baseline |
| Typo tolerance / fuzzy matching | Maybe | Nice but not essential at low listing volume where buyers browse more than they precision-search |
| Personalized/ML-ranked results | No | Needs data volume and infrastructure you don't have yet |
| Faceted search across many attributes | No | Your Listing schema deliberately kept optional fields minimal — there isn't much to facet on yet |

---

## Indexing Strategy: Keep It Simple

Postgres full-text search needs an index on the fields buyers actually search by. Don't index everything — index what's queried.

| Field | Index Type |
|---|---|
| Title + description (combined) | Full-text search index (e.g. `tsvector`) |
| Category | Standard index (it's a filter, not a text search) |
| Status | Standard index — every search query filters to `Active` listings only |
| Price | Standard index, supports range queries |

> ⚠️ **Common mistake:** Forgetting to filter search results by listing status. If your search query doesn't explicitly exclude Draft, Pending Approval, and Removed listings, you've just leaked unapproved or removed content into public search — a direct violation of the visibility table you built in the Listing System module. This is an authorization concern wearing a search-feature costume; test it explicitly.

---

## Search Performance: What to Watch, Not What to Pre-Optimize

> 💡 **Tip:** Don't add caching, search result pre-computation, or query optimization before you've measured an actual slow query. Postgres full-text search on a few thousand rows is fast by default. Premature optimization here is time spent solving a problem you don't have, taken from time you could spend on a problem you do have — like getting your first sellers onboarded.

If you do hit real slowness later, the fix path is: add missing indexes first, then consider caching popular queries, and only reach for a dedicated search service if both of those are insufficient.

---

## AI Prompt: Implementing Search Against Your Listing Schema

```
I'm building a personal-scale marketplace for [your niche] using
[your stack — confirm Postgres or equivalent relational DB].

My Listing schema includes: title, description, category, price,
status, created_at [paste your actual fields from Listing System].

Implement search with:
1. Full-text search across title + description
2. Category filter (exact match against my fixed category list)
3. Price range filter
4. Sort by recency or price
5. A hard filter ensuring only status = "Active" listings are ever
   returned — explain where this filter is applied so I can verify
   it can't be bypassed

Don't suggest a dedicated search service — I'm intentionally scoping
to Postgres full-text search at this stage. Flag only if something
about my schema would make this approach genuinely insufficient.
```

---

## Common Mistake: Reaching for Algolia Because It's the "Proper" Choice

> ⚠️ Dedicated search services are excellent products solving a real problem — at scale. Adding one to a personal-mode marketplace with a few hundred listings adds a recurring cost, an external dependency, and a sync-keeping-data-fresh problem, in exchange for search quality improvements your users won't perceive at this volume. This is the same trap as premature microservices from Architecture Fundamentals — sophisticated infrastructure solving a scale problem you don't have.

---

## What You Should Walk Away With

1. Confirmed approach: Postgres full-text search, not a dedicated service
2. Indexes defined for title/description (full-text), category, status, and price
3. A verified, explicit status filter ensuring only Active listings appear in results
4. A clear escalation path (indexes → caching → dedicated service) if volume ever justifies it

Search depends entirely on the Listing schema being stable — if you're still iterating on Listing System, finish that first. Next: Payments Architecture, which defines how a buyer actually completes the transaction this search made possible.
