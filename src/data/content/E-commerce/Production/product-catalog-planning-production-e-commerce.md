---
title: Product Catalog Planning
slug: product-catalog-planning
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Product Catalog Planning & Search Indexing

**Estimated Time:** 25 Minutes

Catalog planning in a mass-production system is fundamentally a database schema and search indexing challenge. Managing 50 SKUs on a single page is trivial; managing 50,000 SKUs with complex variant matrices, localized pricing, and real-time inventory requires a centralized PIM (Product Information Management) system and an enterprise search layer.

If you attempt to query a standard relational database (like PostgreSQL or MySQL) directly to render complex faceted product listing pages (PLPs), your database will collapse under the load.

## The PIM and The Search Index

Your architecture must strictly decouple the source of truth (the PIM) from the discovery layer (the Search Index). 

### 1. The PIM (Source of Truth)
Systems like Akeneo, Salsify, or a highly customized headless CMS. This is where product data is enriched, categorized, localized into multiple languages, and translated. It must handle complex relational graphs (e.g., "Bundle A contains Product X and Variant Y of Product Z, but only in the EU region").

### 2. The Search Index (Discovery Layer)
Relational databases are catastrophically slow for complex text search and faceted filtering at scale. Your catalog must be continuously synced via Webhooks to a highly optimized NoSQL search index like **Algolia, Typesense, or Elasticsearch**. 

> [!WARNING]
> Never query your database directly for category pages (PLPs) or search results. Every list page, search query, and facet filter should hit your Search Index API. This guarantees sub-50ms response times for incredibly complex queries (e.g., "Show me blue shirts, size large, under $50, currently in stock in the New York warehouse, sorted by highest margin").

## Handling Complex Variants

Do not flatten variants into single rows. Your schema must support strict Parent-Child product relationships. 

- **Parent Node (The Product):** Holds shared metadata that rarely changes (Description, Brand, Base SEO Tags, Care Instructions).
- **Child Node (The Variant):** Holds specific, atomic, highly volatile data (SKU, Price, Inventory Count, Color Hex Code, Dimensions).

This structure ensures that when a specific size (e.g., Size Large) sells out, the entire product does not disappear from the site. Instead, a real-time inventory Webhook triggers, updating only the specific Child Node in the Search Index, allowing the frontend to instantly disable the "Size Large" button while keeping the product visible.

## Checklist:
- [ ] Define the exact schema for Parent-Child variant relationships to ensure atomic inventory tracking and clean URL structures.
- [ ] Architect the Webhook pipeline that syncs volatile product updates (inventory/price changes) from the PIM/Commerce Engine directly to the Search Index (Algolia/Typesense) in real-time.
- [ ] Ensure all PLP (Product Listing Pages) and filtering queries bypass the backend database entirely and hit the high-speed search index.
