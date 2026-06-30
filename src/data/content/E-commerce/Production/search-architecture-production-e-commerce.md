---
title: Search Architecture
slug: search-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Search Architecture

At a small scale, a `SELECT * FROM products WHERE title ILIKE '%query%'` is a perfectly fine search implementation. 

At production scale, search is not a database query. It is a dedicated **Merchandising Engine**. Up to 30% of e-commerce revenue comes from users who use the search bar, and those users convert at 2-3x the rate of standard browsers. 

If your search architecture cannot handle typos, synonyms, or algorithmic sorting, you are actively burying your own products and losing high-intent buyers.

---

## 1. The Limitations of Database Search

Why you must move away from standard Postgres/MySQL searches at scale:

1. **Typo Tolerance:** If a user types "iphne", a SQL query returns 0 results. A production search engine understands the Levenshtein distance and returns iPhones.
2. **Synonyms:** A user searches for "couch." Your database only has products labeled "sofa." SQL fails.
3. **Speed:** Heavy `LIKE` queries with multiple `JOIN`s across variant and tag tables will crater your database performance under load.
4. **Faceted Filtering:** Users expect to filter search results by size, color, and price. Calculating these aggregations dynamically in SQL across a million-row catalog is prohibitively slow.

---

## 2. Dedicated Search Engines (The Production Standard)

You must decouple your search layer from your transactional database.

**The Architecture:**
Your primary database (Postgres) remains the Source of Truth for inventory and orders. You replicate a *flattened subset* of your product data to a dedicated search engine.

**Leading Solutions:**
- **Algolia:** The enterprise gold standard. Incredible speed, unmatched typo tolerance, and a massive dashboard for marketing teams to tune results. Very expensive at high volumes.
- **Typesense / Meilisearch:** Open-source alternatives to Algolia. Blistering fast, excellent typo tolerance, much cheaper to self-host or use via their cloud tiers.
- **ElasticSearch / OpenSearch:** The legacy enterprise choice. Infinitely customizable, but requires significant DevOps engineering to maintain.

---

## 3. The Synchronization Pipeline

The hardest part of search architecture is keeping the index up to date.

If an item goes out of stock in Postgres, it must disappear from the search results within seconds, or users will click into dead ends.

**The Event-Driven Sync Pattern:**
1. Do not run a cron job that syncs the whole catalog every night. That leaves your search index stale for 23 hours.
2. Implement **Change Data Capture (CDC)** or application-level event hooks.
3. When a product's inventory hits 0, or a price changes, fire an event to a queue (e.g., AWS SQS or Inngest).
4. A worker consumes the event and pushes a lightweight JSON update to the Search Engine (Algolia/Typesense) specifically updating that one document.

---

## 4. Merchandising & Boosting

Search results should not be sorted alphabetically. They should be sorted to maximize revenue.

**Algorithmic Boosting:**
Your search engine must allow you to assign varying weights to different fields.
- A match in `title` is worth 10 points.
- A match in `description` is worth 2 points.
- If the item is marked `high_margin: true` in your data payload, apply a 1.5x multiplier to its ranking score.

**Manual Overrides (Pinning):**
Marketing teams need the ability to say: "When a user searches 'running shoes', I don't care what the algorithm says, pin this specific new Nike release to position #1." Your search architecture must expose a Merchandising UI (native to tools like Algolia) to allow non-engineers to set these rules.

---

## 5. Faceted Search & URL State

When a user searches for "shirts", they expect a sidebar to filter by Size, Color, and Brand.

**The Architecture:**
The search engine returns not just the product hits, but the **Facets** (the available filter options and their counts).

**URL State is Mandatory:**
If a user filters by "Color: Red" and "Size: M", the URL must update to `?q=shirts&color=red&size=m`. 
If you store filter state entirely in React/Vue state, the user cannot share the link with a friend, and if they refresh the page, their filters are destroyed. 

---

## AI Prompt — Architect Your Search Pipeline

```prompt
I am architecting the search and merchandising engine for a production e-commerce store.

Catalog Profile:
- Total SKUs: [e.g., 50,000]
- Volatility: [e.g., Prices change daily, inventory changes by the minute]
- Key Filters: [e.g., Make/Model/Year for auto parts, or Size/Color for apparel]
- Tech Stack: [e.g., Postgres + Next.js]

Act as a Principal Search Architect:
1. Recommend a dedicated Search Engine (Algolia, Typesense, Elastic) based on my catalog size and expected query volume. Justify the choice.
2. Design the exact synchronization pipeline required to keep the Search Engine updated when my Postgres inventory drops to zero.
3. Write the exact JSON payload shape I should send to the Search Engine for a single product. (Exclude heavy data, include boosting attributes).
4. Outline the technical strategy for implementing Faceted Filtering that keeps the UI lightning fast and the URL state shareable.
5. Explain how I should configure synonym mappings and typo-tolerance thresholds for my specific product domain.
```

---

## Search Architecture Checklist

- [ ] Dedicated search engine (Algolia, Typesense, ElasticSearch) selected and budgeted
- [ ] Real-time or queue-based synchronization pipeline architected to prevent stale search indexes
- [ ] Product payload flattened and optimized for search (omitting heavy descriptions/images, including margins/tags for boosting)
- [ ] Faceted filtering state tied strictly to the browser URL (avoiding trapped client-side state)
- [ ] Typo tolerance and synonym dictionaries configured for industry-specific terms
- [ ] Merchandising controls (pinning, boosting) exposed to marketing teams without requiring code changes
