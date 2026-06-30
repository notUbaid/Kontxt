---
title: Search Architecture
slug: search-architecture
phase: Phase 2
mode: personal
projectType: e-commerce
estimatedTime: 20–30 min
---

# Search Architecture

Search is the highest-intent action a customer can take. A user typing into your search bar already wants to buy — your job is to not get in the way.

Bad search loses sales silently. Customers don't complain. They leave.

---

## Do You Actually Need Search?

Before choosing a search architecture, answer this honestly:

| Catalogue Size | Recommendation |
|---|---|
| < 20 products | Filter and browse only. Search is overkill. |
| 20–200 products | Simple database search is sufficient. |
| 200–2,000 products | Database search with good indexing works. Consider dedicated search. |
| 2,000+ products | Dedicated search engine is worth the complexity. |

For most personal e-commerce projects, **PostgreSQL full-text search is the right answer.** It is free, already in your stack, and handles hundreds of products with excellent performance.

---

## The Two Search Layers

Every search implementation has two distinct concerns:

```
Query Layer              Result Layer
─────────────            ─────────────────────────
"what matches?"    →     "what do we show, in what order?"

Full-text search         Relevance ranking
Typo tolerance           Filter application
Synonym handling         Faceted refinement
                         Pagination
```

Beginners build the query layer and ignore the result layer. A search that returns correct results in random order still frustrates customers. Rank by relevance, then by sales velocity or recency.

---

## Option 1: PostgreSQL Full-Text Search

The right default for personal projects.

PostgreSQL has a native full-text search engine. No external services, no extra cost, no sync jobs.

```sql
-- Add a search vector column to your products table
ALTER TABLE products ADD COLUMN search_vector tsvector;

-- Populate it from name, description, tags
UPDATE products SET search_vector =
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(tags::text, '')), 'C');

-- Index it
CREATE INDEX idx_products_search ON products USING GIN(search_vector);

-- Trigger to keep it updated automatically
CREATE TRIGGER products_search_update
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(search_vector, 'pg_catalog.english', name, description);
```

**Querying:**

```sql
SELECT id, name, price, ts_rank(search_vector, query) AS rank
FROM products, to_tsquery('english', 'leather:* & wallet:*') query
WHERE search_vector @@ query
  AND is_active = true
  AND stock > 0
ORDER BY rank DESC
LIMIT 24;
```

**What this gives you for free:**
- Stemming (searches for "running" also match "run", "runs")
- Weighted fields (name matches rank higher than description matches)
- Boolean operators (AND, OR, NOT)
- Prefix matching (`:*` suffix)

**What it doesn't give you:**
- Typo tolerance / fuzzy matching
- Synonym expansion
- AI-powered semantic search

For most personal stores, the first list covers 95% of real searches.

---

## Handling Typos: pg_trgm

PostgreSQL's `pg_trgm` extension adds trigram similarity — a simple form of fuzzy matching.

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_products_name_trgm ON products USING GIN(name gin_trgm_ops);

-- Find products with names similar to a misspelled query
SELECT id, name, similarity(name, 'lether walet') AS sim
FROM products
WHERE similarity(name, 'lether walet') > 0.2
ORDER BY sim DESC
LIMIT 10;
```

Combine full-text search with trigram fallback: if full-text returns zero results, run a trigram similarity query. This catches common typos without any external service.

---

## Option 2: Algolia

A hosted search service. Excellent typo tolerance, instant results, rich filtering. Free tier covers most personal projects (10,000 records, 10,000 searches/month).

**The tradeoff:** your product catalogue must be synced to Algolia. This means a sync job on every product create/update/delete — adding complexity and a new failure mode.

```
Product updated in your DB
    ↓
You must also update Algolia index
    ↓
If sync fails, search results are stale
```

**Use Algolia when:**
- Your catalogue has significant variant complexity (colour × size × material)
- You need faceted filtering that would be painful to build in SQL
- Typo tolerance is critical for your product category (fashion, cosmetics)
- You're willing to maintain the sync layer

**Stick with PostgreSQL when:**
- Your catalogue is under 500 products
- Your search queries are straightforward (name, category, tag)
- You want zero external dependencies

---

## Option 3: Typesense (Self-Hosted Algolia Alternative)

Open-source, self-hostable, Algolia-compatible API. Free if you host it yourself (e.g. on Railway, Render, or a small VPS).

Worth considering if you want Algolia-quality search without the cost at scale, and you're comfortable managing a service.

---

## Search Result Ranking

Whatever engine you use, ranking matters more than most builders realise.

A sensible default ranking for e-commerce:

```
1. Exact name match
2. Partial name match
3. Description / tag match
4. Within each tier: sort by
   → In-stock first
   → Then by sales volume (desc)
   → Then by recency (desc)
```

```sql
SELECT
  id, name, price, stock,
  ts_rank(search_vector, query) AS text_rank,
  sales_count
FROM products, to_tsquery('english', $1) query
WHERE search_vector @@ query
  AND is_active = true
ORDER BY
  stock > 0 DESC,          -- in-stock first
  text_rank DESC,           -- then relevance
  sales_count DESC          -- then popularity
LIMIT 24;
```

Always push out-of-stock products to the bottom. A customer clicking an out-of-stock result and hitting a dead end is a conversion lost.

---

## Filters and Facets

Search without filters is frustrating for any catalogue over ~50 products.

**Minimum viable filter set:**

- Category / collection
- Price range (min / max slider)
- In stock only (default: true)
- Sort order (relevance, price low→high, price high→low, newest)

**For apparel / variable products:**

- Size
- Colour
- Material / fabric

Design your filter UI as additive (AND logic between filter types, OR within a filter type):

```
Category: Wallets AND Bags
Price: ₹500–₹2000
Colour: Black OR Brown
```

This matches user mental models. Users expect multiple colours to expand results, not narrow them.

---

## Search UX Patterns

**Instant search (search-as-you-type)**
Show results after 2–3 characters, debounced by 200–300ms. Feels fast. Requires a fast query — PostgreSQL GIN index handles this well.

**Empty state**
When search returns zero results, do not show a blank page. Show:
- "No results for 'lether walet'"
- Suggest similar products (trigram fallback)
- Link to popular categories
- "Try searching for: Wallets, Bags, Accessories"

**Recent searches**
Store the last 5–10 search queries in localStorage. Show them as suggestions when the search box is focused. Zero backend cost, meaningfully improves UX.

**Search analytics**
Log every search query and its result count to a `searchEvents` table. This is your highest-signal dataset for understanding what customers want. If a common search returns zero results, that's a product gap or a naming problem.

```
SearchEvent
├── id
├── query (text)
├── resultCount (integer)
├── userId (nullable)
├── sessionId
└── createdAt
```

---

## AI Prompt: Search Architecture Review

```
You are a senior backend engineer reviewing a search architecture for a personal e-commerce project.

Here is my design:

CATALOGUE SIZE: [number of products]

SEARCH ENGINE CHOICE: [PostgreSQL FTS / Algolia / Typesense / other]
Reason for choice: [brief explanation]

SCHEMA ADDITIONS:
[paste any search-related columns or index definitions]

QUERY LOGIC:
[paste or describe your search query]

RANKING STRATEGY:
[describe how results are ordered]

FILTERS:
[list filters you're implementing]

TYPO HANDLING:
[pg_trgm / Algolia built-in / none]

SEARCH ANALYTICS:
[yes/no — describe if yes]

Review for:
1. Ranking problems (out-of-stock products surfacing, relevance issues)
2. Missing indexes (slow queries at scale)
3. Over-engineering for catalogue size
4. Missing filter types customers will expect
5. Empty state handling gaps
6. Sync complexity if using external search

Be specific. Flag critical issues first.
```

---

## Decision: Choosing Your Search Stack

Answer these four questions to pick the right approach:

**1. How many products do you have or expect?**
- Under 200 → PostgreSQL only
- 200–2,000 → PostgreSQL with pg_trgm
- 2,000+ → Consider Algolia or Typesense

**2. How important is typo tolerance?**
- Low (tools, hardware, technical products) → PostgreSQL is fine
- High (fashion, cosmetics, food) → pg_trgm or Algolia

**3. Do you need faceted filtering?**
- Simple category + price → PostgreSQL
- Complex multi-attribute facets (size × colour × material) → Algolia or Typesense

**4. Are you willing to manage sync complexity?**
- No → PostgreSQL only
- Yes → Algolia or Typesense are viable

---

## Validation Checklist

- [ ] Search engine chosen and appropriate for catalogue size
- [ ] GIN index created on search vector (PostgreSQL) or records synced (Algolia)
- [ ] Ranking puts in-stock products above out-of-stock
- [ ] Ranking uses relevance score, not arbitrary ordering
- [ ] Typo handling implemented (pg_trgm fallback or Algolia)
- [ ] Empty state designed — not a blank page
- [ ] Filters implemented: category, price range, in-stock, sort order
- [ ] Search debounced on frontend (200–300ms)
- [ ] Search queries logged to `searchEvents` table
- [ ] Recent searches stored in localStorage for UX

---

## What to Build Next

**Analytics Architecture** — search events are your first analytics signal. The analytics module covers what else to measure, how to capture it without third-party cookies, and how to turn data into product decisions.

---

> **Filename:** `search-architecture-personal-e-commerce.md`
