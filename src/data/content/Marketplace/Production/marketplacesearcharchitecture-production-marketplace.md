---
title: Search Architecture
slug: search-architecture
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Search Architecture (Discovery Engine)

## Why Postgres `LIKE` Will Crash Your Production Database

In a personal project, searching means running `SELECT * FROM listings WHERE title ILIKE '%query%'`. In a production marketplace, doing this on a table with 50,000 rows will cause a table scan that spikes your CPU to 100%, taking down your entire API and preventing buyers from checking out.

Search is the most read-heavy operation in your entire application. You must decouple the search read-path from the transactional write-path (CQRS: Command Query Responsibility Segregation).

---

## The Production Search Stack

For a production marketplace, you must offload search to a dedicated engine optimized for inverted indexes and memory-level reads.

| Search Engine | The Production Use Case |
|---|---|
| **Algolia** | The gold standard. Fully managed, sub-50ms latency, typo-tolerance, and out-of-the-box UI components (InstantSearch). Very expensive at high scale. |
| **Typesense / Meilisearch** | Open-source alternatives to Algolia. Extremely fast, typo-tolerant, and much cheaper to host yourself or use via their cloud tiers. |
| **ElasticSearch** | Enterprise standard. Best for massive data sets and complex analytical querying, but requires significant DevOps expertise to maintain. |
| **Postgres (PostGIS + pg_trgm)** | Acceptable *only* if you are building a highly geospatial marketplace (e.g., real estate) and have a dedicated Read-Replica database so searches don't block writes. |

> [!DECISION]
> Default to **Algolia** or **Typesense Cloud** for your MVP. The engineering time saved on typo-tolerance and faceted filtering will pay for the API cost ten times over.

---

## The Synchronization Pipeline (CQRS)

If you use a dedicated search engine, your primary challenge is keeping it in sync with your Postgres database. If a seller changes a price, or an item goes out of stock, the search index must update instantly.

**The Production Sync Architecture:**
1. Seller updates a listing. The backend saves to Postgres.
2. The backend fires a background job (e.g., via Inngest, BullMQ, or AWS SQS).
3. The background job transforms the database row into a flat JSON object.
4. The job pushes the JSON object to the Search Engine API (e.g., Algolia).

> [!CAUTION]
> Never update the search index synchronously in the same API route as the database write. If the Algolia API is down, the database write will fail, and the seller will see an error. Sync must be asynchronous.

---

## Required Search Capabilities at Scale

A production search bar is not just keyword matching. It must support:

* **Typo Tolerance:** If a user searches for "Macbok Pro," your engine must return "MacBook Pro." Postgres cannot do this easily.
* **Faceted Filtering:** Buyers expect to filter by `Category`, `Price Range`, `Condition`, and `Brand` simultaneously, with the UI dynamically updating the available counts for each facet.
* **Geolocation (Bounding Box):** For service or rental marketplaces, the search must query within a geospatial radius (e.g., "Plumbers within 15 miles of 90210").
* **Algorithmic Ranking:** Search results should not just sort by "newest." They must be ranked by a combination of relevance, seller rating, and conversion rate.

---

## Do's and Don'ts of Production Search

- **DO format data specifically for the index.** Do not dump your entire relational database row into Algolia. Flatten the data. If a listing belongs to a category, push `{ "category_name": "Electronics" }` to the index, not just the `category_id`.
- **DON'T index PII or private data.** The search index is inherently public-facing data. Never push seller email addresses, internal database IDs, or unapproved listings to the search engine.
- **DO enforce Authorization at the Index Level.** If your marketplace has private B2B catalogs, the search engine must support API keys scoped to specific user permissions so buyers cannot search inventory they aren't authorized to see.
- **DON'T build your own search UI from scratch.** Use libraries like Algolia React InstantSearch or Typesense InstantSearch. Building complex multi-faceted filtering logic from scratch is a massive waste of engineering resources.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Background Sync Job:**

````prompt
Act as a Senior Backend Engineer. I am using [Postgres/Prisma] and [Algolia/Typesense]. Write the background job logic (using a queue like BullMQ or Inngest) that triggers when a Listing is updated. It must fetch the Listing, flatten the relational data (Category, Seller Rating), and push the optimized JSON payload to the search index safely. Include error handling and retry logic.
````

> [!TIP]
> **Prompt 2 — Faceted Search UI:**

````prompt
I am using React and [Algolia/Typesense]. Provide the boilerplate component architecture for a complex faceted search page. It must include a Search Bar, a Price Range slider, a multi-select Category filter, and the Results grid. Use the official [InstantSearch] library components to wire up the state management automatically.
````

---

## Validating What AI Generates

- **Check for synchronous blocking:** If the AI writes an API endpoint that awaits the database write and the search index write sequentially in the main thread, reject it. Demand a decoupled, asynchronous queue approach.
- **Verify data flattening:** If the AI sends raw relational objects with nested arrays of UUIDs to the search index, ask it to transform the data into flat, human-readable strings that the search engine can actually index and filter.

---

## Implementation Checklist

- [ ] Selected a dedicated Search Engine (Algolia, Typesense, ElasticSearch).
- [ ] Architected the asynchronous CQRS synchronization pipeline via a background queue.
- [ ] Defined the flattened JSON schema that will be sent to the search index.
- [ ] Configured typo-tolerance and faceted attributes within the search engine dashboard.
- [ ] Ensured strict logic to prevent `Draft`, `Removed`, or `Pending_Approval` listings from ever reaching the search index.

---

## What's Next

Next: **Payments Architecture** — With discovery solved, we must architect the most critical part of the marketplace: moving the money. We will design the complex routing, escrow, and multi-party payout flows required for a production transaction.
