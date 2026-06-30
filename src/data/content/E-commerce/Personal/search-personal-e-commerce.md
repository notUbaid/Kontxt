---
title: Search
slug: search
phase: Phase 3
mode: personal
projectType: e-commerce
estimatedTime: 20-30 min
---

# Search

Search feels like a small feature until a customer types "blu shirt" and gets zero results for the blue shirt sitting right there in your catalog. This module is about building search that's good enough to not lose sales — without reaching for infrastructure a personal store doesn't need.

---

## What Problem Are You Actually Solving?

Most personal stores have somewhere between 10 and 500 products. At that scale, the failure mode isn't "search is too slow" — it's "search is too literal."

A customer searching "hoodie" should find "Hoodie," "Pullover Hoodie," and "Zip-Up Hoodie." A customer typing "jaket" (typo) should still find "Jacket." This is the bar.

> **Reframe:** You are not building a search engine. You are building a forgiving product filter. Keep that framing — it'll stop you from overbuilding.

---

## Decision: Where Does Search Run?

<table>
<tr><th>Approach</th><th>How it works</th><th>Good fit for</th></tr>
<tr><td><strong>Database query (Postgres full-text search)</strong></td><td>SQL queries against your existing products table using built-in text search</td><td>Personal stores, &lt;1,000 products</td></tr>
<tr><td><strong>Dedicated search service (Algolia, Typesense, Meilisearch)</strong></td><td>Separate indexed search engine your app queries</td><td>Large catalogs, typo-tolerance at scale, faceted filtering</td></tr>
<tr><td><strong>Client-side filtering</strong></td><td>Load all products into the browser, filter with JS</td><td>Tiny catalogs (&lt;50 products) only</td></tr>
</table>

**Recommendation for Personal Mode:** Postgres full-text search (built into Supabase). It's already there, costs nothing extra, and handles typo-tolerance and ranking well enough for a personal catalog.

> **Why not Algolia/Meilisearch?** They're genuinely excellent products — but they're a separate service to configure, sync, pay for (eventually), and keep in sync with your database. That's real complexity for a problem Postgres already solves at your scale. Revisit this in Phase 6 if your catalog grows past a few thousand products.

---

## How Postgres Full-Text Search Works (The Short Version)

Postgres can convert text into a searchable format (`tsvector`) and match it against a search query (`tsquery`), with built-in relevance ranking.

```sql
-- Add a generated search column to your products table
ALTER TABLE products ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))
  ) STORED;

-- Index it for speed
CREATE INDEX products_search_idx ON products USING GIN(search_vector);

-- Query it
SELECT * FROM products
WHERE search_vector @@ plainto_tsquery('english', 'blue shirt')
ORDER BY ts_rank(search_vector, plainto_tsquery('english', 'blue shirt')) DESC;
```

This gives you:
- Relevance ranking (best matches first)
- Matching across multiple fields (name + description) at once
- Stemming (searching "running" matches "run", "runs")

What it does **not** give you out of the box: typo tolerance ("jaket" → "jacket"). More on that below.

---

## Handling Typos (Without Overbuilding)

Pure full-text search won't catch typos. You have two reasonable options for a personal store:

**Option 1 — Trigram similarity (`pg_trgm`)**
Postgres extension that measures string similarity, catching close misspellings.

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX products_name_trgm_idx ON products USING GIN(name gin_trgm_ops);

-- Fuzzy match query
SELECT *, similarity(name, 'jaket') AS score
FROM products
WHERE name % 'jaket'
ORDER BY score DESC;
```

**Option 2 — Combine full-text + trigram fallback**
Run full-text search first; if it returns zero results, fall back to a trigram similarity search. This gives you accurate ranked results most of the time, with typo tolerance as a safety net.

> **Recommendation:** Implement the fallback pattern. It's a small amount of extra logic for a meaningfully better experience — someone who can't find what they're searching for usually just leaves.

---

## What Should Be Searchable?

Decide this deliberately — searching too many fields creates noisy, irrelevant results.

| Field | Include in search? | Why |
|---|---|---|
| Product name | Yes | Primary match target |
| Description | Yes | Catches detail-level matches ("waterproof", "cotton") |
| Category | Yes (lower weight) | Helps broad queries like "shoes" |
| SKU/internal ID | No | Customers don't search by SKU |
| Price | No | This is a filter, not a search term |
| Tags (if you have them) | Yes | Often the highest-signal field |

> **Tip:** Weight your fields. A match in the product name should rank higher than a match buried in a long description. Postgres `ts_rank` supports field weighting (`setweight()`) — worth the extra 10 minutes to configure.

---

## AI Prompt: Implement Search

```
I'm building product search for a personal e-commerce store using Supabase (Postgres).

My products table schema:
[paste schema here]

Requirements:
- Full-text search across product name, description, and tags, with name weighted highest
- Typo-tolerant fallback using pg_trgm when full-text search returns no results
- Return results ranked by relevance
- Expose this as a single Supabase function or backend endpoint: search(query: string) -> Product[]
- Include the SQL migration for the necessary extensions, columns, and indexes

Explain any tradeoffs in your indexing approach before giving me the final code.
```

> **Token efficiency tip:** Don't ask AI to "build search" without your real schema. Generic schemas produce generic (often wrong) field names you'll spend more time fixing than if you'd included the schema up front.

---

## Validating AI-Generated Search Code

Search bugs are easy to miss because "it returns *something*" looks correct at a glance. Check specifically for:

- [ ] Does an empty search query return all products (or nothing) — and is that the behavior you want?
- [ ] Does the GIN index actually get created? (Search will work without it, just slowly — this is an easy thing for AI to silently skip.)
- [ ] Is the query parameterized/sanitized, or is user input concatenated directly into SQL? (Direct concatenation is a SQL injection risk.)
- [ ] Does search exclude out-of-stock or unpublished products, or does it leak them?
- [ ] Is there a reasonable limit on returned results (e.g., top 20), or could a broad query return your entire catalog?

> **Common AI mistake:** AI frequently forgets to filter search results by product status (published, in-stock). You'll end up with customers searching and finding draft or archived products. Always confirm the `WHERE` clause includes your visibility/status filters.

---

## Frontend: Search-as-You-Type vs Search-on-Submit

<table>
<tr><th></th><th>Search-as-you-type (debounced)</th><th>Search-on-submit</th></tr>
<tr><td>Feel</td><td>Modern, responsive</td><td>Simpler, more predictable</td></tr>
<tr><td>Backend load</td><td>Higher (many requests)</td><td>Lower</td></tr>
<tr><td>Implementation effort</td><td>Needs debouncing logic</td><td>Minimal</td></tr>
</table>

**Recommendation:** Search-as-you-type with a 300ms debounce. It's a small implementation cost (most UI libraries or a simple `setTimeout` pattern handle it) and meaningfully improves perceived quality. Customers expect this from any modern site.

```javascript
// Debounce pattern — wait 300ms after typing stops before firing the search
const debouncedSearch = useMemo(
  () => debounce((query) => runSearch(query), 300),
  []
);
```

---

## Empty States Matter Here

A "no results" page is often where customers decide to leave. Don't let it be a dead end.

**Good empty state includes:**
- Clear "No results for '[query]'" message
- A suggestion to check spelling
- 2-3 popular or related products shown anyway
- A link back to browse all categories

> **Best Practice card:** Treat your zero-results search page as a recovery opportunity, not a dead end. It directly affects conversion — don't ship a blank page here.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Dedicated search infrastructure (Algolia, Typesense, Elasticsearch)
- Search analytics/tracking ("what are people searching for")
- Faceted filtering combined with search (filter by price + category + search term simultaneously) — basic category filters are enough for now
- Search result personalization
- Voice search, image search

These are real features for a mature store, not requirements for launch.

---

## Implementation Checklist

- [ ] `pg_trgm` extension enabled
- [ ] `search_vector` generated column added to products table
- [ ] GIN indexes created for both full-text and trigram search
- [ ] Field weighting configured (name > tags > description)
- [ ] Fallback logic implemented (full-text → trigram on zero results)
- [ ] Search endpoint/function filters out unpublished/out-of-stock products
- [ ] Result limit enforced (e.g., top 20-50)
- [ ] Frontend search-as-you-type with debounce implemented
- [ ] Empty state designed with recovery suggestions
- [ ] Tested with: exact match, partial match, typo, empty query, gibberish query

---

## What's Next

With customers now able to find products reliably, it's time to understand how they're behaving once they find them — that's **Analytics**, next in this phase.
