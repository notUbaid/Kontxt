---
title: Search Implementation
slug: search
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# Search Implementation

Implementing search in a production e-commerce environment is an exercise in data synchronization and sub-50ms query latency.

If you query your primary transactional database for search (e.g., `SELECT * FROM products WHERE description ILIKE '%shirt%'`), you will bring down your database during high-traffic events, and the user experience will suffer due to a lack of typo-tolerance.

---

## 1. The Separation of Concerns

You must treat Search as a distinct microservice, utilizing specialized indexing engines like **Algolia**, **Typesense**, or **ElasticSearch**.

**The Architecture:**
1. **Primary Database (Postgres):** The Source of Truth. Stores complex relational data (Orders, Variants, Inventory, Users).
2. **Search Engine (Algolia/Typesense):** The Read-Optimized Index. Stores a flattened, JSON-optimized version of the product catalog.
3. **The Sync Pipeline:** Event-driven infrastructure that pushes changes from Postgres to the Search Engine instantly.

---

## 2. Flattening the Payload

Search engines do not understand SQL JOINs. You must flatten your relational data into a single JSON document per sellable unit.

**Do NOT index heavy data.**
Do not send the 2,000-word HTML product description to the search index. It bloats the index size (costing you money) and dilutes search relevance.

**The Production Payload:**
```json
// One record in the Search Engine
{
  "objectID": "variant_999", // The unique ID for the search engine
  "sku": "TSHIRT-RED-M",
  "title": "Vintage Red Tee",
  "brand": "Nike",
  "price": 2500, // Stored as integer
  "image_url": "https://cdn.example.com/red-tee-thumb.jpg",
  "available_inventory": 45,
  "options": {
    "size": "M",
    "color": "Red"
  },
  "margin_percentage": 65, // Used for algorithmic boosting, NEVER displayed
  "created_at_timestamp": 1700000000
}
```

---

## 3. The Synchronization Pipeline (CDC)

How do you guarantee the search index is up to date when inventory changes by the millisecond?

**The Anti-Pattern:** A nightly cron job that deletes and re-uploads the whole catalog. (Your search results will show out-of-stock items for 23 hours a day).

**The Production Pattern: Event-Driven Updates**
When a checkout completes and inventory is decremented in Postgres, your backend must publish an event.
1. `EventQueue.publish('inventory.updated', { sku: 'TSHIRT-RED-M', newQty: 44 })`
2. A background worker consumes this event.
3. The worker calls `algoliaIndex.partialUpdateObject({ objectID: 'variant_999', available_inventory: 44 })`.

For massive enterprise catalogs, use **Change Data Capture (CDC)** tools like Debezium, which listen directly to the Postgres Write-Ahead Log (WAL) and pipe changes directly to the search engine, bypassing the application layer entirely.

---

## 4. Algorithmic Merchandising (Boosting)

Search is not just about relevance; it is about revenue optimization.

You must configure the Search Engine's ranking algorithm.
1. **Typo Tolerance:** Standardize the Levenshtein distance (e.g., 1-2 character mistakes).
2. **Custom Ranking (Business Metrics):** If two items perfectly match the search "red shirt", which shows up first? 
   - Tie-breaker 1: Sort by `available_inventory > 0` (never show out-of-stock items first).
   - Tie-breaker 2: Sort descending by `margin_percentage` (show the most profitable shirt).
   - Tie-breaker 3: Sort descending by `created_at_timestamp` (show the newest shirt).

---

## 5. Instant UI and Faceted Filtering

The frontend implementation must feel instantaneous.

**Implementation Rules:**
- **No Backend Hops:** The frontend React components must query the Search Engine API directly using a public, read-only search key. Do not route search keystrokes through your Next.js API routes; it adds unnecessary latency.
- **Faceted Filters:** Request facet counts (e.g., `Color: Red (14), Blue (5)`) in the same API call as the search results.
- **URL State:** Bind all search queries and active filters to the URL `?q=shirt&size=M`. If the state is only in React, users cannot share links to their filtered results.

---

## AI Prompt — Implement Your Search Engine

```prompt
I am implementing the search microservice for a production e-commerce store.

Tech Stack:
- Database: [e.g., Postgres]
- Search Engine: [e.g., Algolia / Typesense]
- Frontend: [e.g., Next.js / React InstantSearch]

Act as a Principal Search Engineer:
1. Provide the exact Node.js/TypeScript code for the Event-Driven worker that listens for a database `inventory_change` and executes a `partialUpdate` to the search index.
2. Define the JSON payload schema for indexing a complex product variant (including the hidden attributes needed for profit-based boosting).
3. Write the configuration logic (ranking formula) for the Search Engine to prioritize items that are: In Stock > High Margin > Newly Released.
4. Provide a React component architecture demonstrating how to bind faceted filter state directly to the URL parameters.
```

---

## Search Implementation Checklist

- [ ] Search engine (Algolia/Typesense) deployed and decoupled from the transactional database
- [ ] Product payload flattened, stripping heavy HTML descriptions and optimizing for small JSON sizes
- [ ] Event-driven synchronization (or CDC) implemented to update index inventory in near real-time
- [ ] Business logic ranking configured (boosting high-margin or high-converting items)
- [ ] Frontend query logic routed directly to the Search API (bypassing backend hops for speed)
- [ ] Search queries and active faceted filters bound strictly to URL state
