---
title: Product Catalog Planning
slug: product-catalog-planning
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Product Catalog Planning

**Estimated Time:** 25 Minutes

Catalog planning in a mass-production system is fundamentally a database schema and search indexing challenge. Managing 50 SKUs is easy; managing 50,000 SKUs with complex variant matrices, localized pricing, and real-time inventory requires a centralized PIM (Product Information Management) system and an enterprise search layer.

## The PIM and The Index

Your architecture must decouple the source of truth (the PIM) from the discovery layer (the Search Index). 

1. **The PIM (Akeneo, Salsify, or Headless CMS):** This is where product data is enriched, categorized, and translated. It must handle complex relationships (e.g., "Bundle A contains Product X and Variant Y of Product Z").
2. **The Search Index (Algolia, Typesense, Elasticsearch):** Relational databases (PostgreSQL) are too slow for complex text search and faceted filtering at scale. Your catalog must be continuously synced to a NoSQL search index. 

> [!WARNING]
> Do not query your database directly for category pages (PLPs). Every list page, search query, and filter should hit your Algolia/Typesense index. This ensures sub-50ms response times for complex faceted filtering (e.g., "Show me blue shirts, size large, under $50, in stock").

## Handling Complex Variants

Do not flatten variants. Your schema must support parent-child product relationships. 
- **Parent (Product):** Holds shared metadata (Description, Brand, Base Tags).
- **Child (Variant):** Holds specific, atomic data (SKU, Price, Inventory Count, Color Code).

This structure ensures that when a specific size sells out, the entire product does not disappear, but the specific variant button is disabled instantly via realtime inventory Webhooks.

## Checklist:
- [ ] Define the schema for Parent-Child variant relationships to ensure atomic inventory tracking.
- [ ] Architect the Webhook pipeline that syncs product updates from the PIM to the Search Index (Algolia/Typesense).
- [ ] Ensure all PLP (Product Listing Pages) and filtering queries bypass the database and hit the high-speed search index.
