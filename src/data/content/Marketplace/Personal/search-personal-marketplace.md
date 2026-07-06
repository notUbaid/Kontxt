---
title: Search
slug: search
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Search

## Implementing What Search Architecture Already Specified

Search Architecture made the decisions: Postgres full-text search, the specific capabilities buyers need (keyword, category, price range, sort), and the indexes required. This module is the implementation pass — turning that specification into working endpoints and a connected frontend experience, against the now-finalized Listing schema from Database.

---

## Build Order: Indexes Before Queries

Confirm the indexes specified in Search Architecture actually exist in your database before writing query logic against them. Querying without the right indexes will still return correct results — just slowly, and the slowness won't show up until you have enough listings for it to matter, which makes it easy to miss now.

- Full-text search index on title + description (`tsvector` or equivalent)
- Standard index on category
- Standard index on status
- Standard index on price

> ️ **Common mistake:** Writing the search query first, confirming it "works" against a handful of test listings, and never circling back to add the indexes — because everything feels fast at low data volume. Add the indexes now, even though you won't feel the difference yet; this is exactly the kind of issue that's invisible until it isn't.

---

## The Query: One Endpoint, Composable Filters

Rather than separate endpoints for "search by keyword" and "browse by category," build one search endpoint that accepts optional parameters and composes them — this matches how buyers actually use search (often combining a keyword with a price range, for instance).

```
GET /listings/search
  ?q=<keyword>
  &category=<category>
  &min_price=<number>
  &max_price=<number>
  &sort=<recent|price_asc|price_desc>
```

>  **Best practice:** Every variant of this query must include the hard `status = "Active"` filter, applied at the query level — not as a post-fetch filter in application code. Filtering in application code after fetching means you're pulling non-Active listings out of the database in the first place, which is both a performance issue and the exact visibility leak risk flagged in Search Architecture.

---

## Empty Results: A Specific Case Worth Designing For

A buyer who searches and gets zero results is at a critical moment in the Discovery stage of their Buyer Journey — this is exactly the kind of empty state Frontend flagged as needing real design attention, not a blank page.

| Scenario | What to Show |
|---|---|
| No listings match the search at all | A clear "no results" message, with a suggestion to broaden the search (different keyword, no category filter) |
| Marketplace genuinely has very few listings yet | Consider showing recent or featured listings instead of a stark empty page — honest about being early-stage, not broken |

>  **Tip:** At personal-mode scale, with relatively few listings, empty search results will happen often — possibly more often than successful ones, early on. Designing this state well isn't an edge case investment, it might be the median experience for your first buyers.

---

## Connecting Frontend Filters to the Backend Query

The Browse/Search screen from Frontend needs to map its filter UI directly to this query's parameters — keep this mapping simple and obvious rather than building an abstraction layer prematurely.

- Category dropdown maps directly to `category` parameter, using your fixed category list — never freeform
- Price range inputs map to `min_price`/`max_price`
- Sort dropdown maps to `sort`, with sensible default (likely recency)
- Search input debounced before triggering a request — avoid firing a query on every keystroke

---

## Performance: Confirm, Don't Assume

Search Architecture specified: measure before optimizing further. This is where you actually do that measurement, however informally.

- Run your search query against a realistic number of seeded listings (a few hundred, even if synthetic) and check response time
- If it's fast (it almost certainly will be, at Postgres full-text search scale), move on — don't add caching speculatively
- If something is unexpectedly slow, check first whether an index from the checklist above is actually being used by your query planner before reaching for any other fix

---

## AI Prompt: Implementing the Search Endpoint

```
I'm implementing search for a personal-scale marketplace using
[your stack], Postgres full-text search, against this Listing
schema: [paste fields and status values from Listing System/Database].

Build:
1. A single search endpoint accepting optional keyword, category,
   min_price, max_price, and sort parameters, composable together
2. A hard status = "Active" filter applied at the query level, not
   in application code after fetching
3. Confirmation that this query uses the indexes I've already
   defined: full-text on title+description, standard on category/
   status/price

Then connect this to a frontend search/browse screen with: a
debounced keyword input, a category dropdown from my fixed category
list, price range inputs, and a sort dropdown defaulting to recency.

Include a clear empty-state message for zero results.
```

---

## Common Mistake: Building Search in Isolation From the Status Rule

> ️ It's easy to build and test the keyword/category/price logic thoroughly while testing only against listings you've manually set to Active — meaning the status filter never actually gets exercised or verified. Explicitly test search with a mix of Active, Pending Approval, and Removed listings in your seed data, and confirm only Active ones ever appear. This is precisely the scenario Demo Transactions should have already caught, but verify it again here at the implementation level.

---

## What You Should Walk Away With

1. All specified indexes confirmed present in the actual database, not just planned
2. A single composable search endpoint with the hard Active-status filter applied at the query level
3. A well-designed empty-results state, treated as a likely-common case at this scale
4. Frontend filters mapped directly and simply to backend query parameters

Analytics, next, gives you visibility into how buyers are actually using this search and browse experience — which becomes real signal for what to refine, rather than guesswork.
