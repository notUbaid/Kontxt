---
title: Listing System
slug: listing-system
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Listing System (Inventory Architecture)

## Single Forms vs. Enterprise Ingestion

In a basic application, a user fills out a React form to create a single listing. In a production marketplace, enterprise sellers have thousands of SKUs (Stock Keeping Units). If you force them to manually fill out a form for every item, they will abandon your platform.

You must architect your Listing System not just as a database schema, but as an **Inventory Ingestion Pipeline**. It must support single-item creation (for retail users) alongside Bulk CSV uploads and REST API syncing (for B2B sellers).

---

## The Production Listing Schema

A production listing is not just a `title`, `description`, and `price`. It requires complex relational data to support variants, search filters, and inventory tracking.

| Data Layer | Fields & Purpose | The Production Reality |
|---|---|---|
| **Core Metadata** | `title`, `description_html`, `base_price` | Descriptions must be sanitized (DOMPurify) to prevent XSS attacks before saving. |
| **Taxonomy** | `category_id`, `tags[]` | Categories must be strict Foreign Keys linking to a `Categories` table, never free-text. Free-text destroys search filters. |
| **SKU & Variants** | `sku`, `size`, `color`, `inventory_count` | A shirt is one listing, but it has 12 variants (Small/Red, Large/Blue). Your schema must handle `ListingVariants` as a child table. |
| **Fulfillment Data** | `weight_oz`, `dimensions`, `shipping_class` | Required for calculating real-time shipping rates via APIs like Shippo or EasyPost. |
| **Media** | `images[]` (JSONB or relation) | Store an array of image URLs linking to a CDN, along with `alt` text for ADA accessibility. |

---

## State Machine: The Listing Lifecycle

A listing in production is a strict state machine. You must use Database Enums to enforce these states.

```
DRAFT -> PENDING_APPROVAL -> ACTIVE -> OUT_OF_STOCK -> ARCHIVED
```

> [!CAUTION]
> Never allow a listing to be hard-deleted (`DELETE FROM listings`). If a listing is deleted, it breaks the Foreign Key constraints on every historical transaction tied to it. When a seller deletes a listing, update the status to `ARCHIVED`. It disappears from search, but the financial ledger remains intact.

---

## Image Architecture (CDNs)

Marketplaces are visual. If you serve 5MB unoptimized images from an S3 bucket, your app will load slowly, your SEO will tank (due to Core Web Vitals penalties), and your bandwidth bill will explode.

**The Production Image Stack:**
1. Seller uploads a high-res image.
2. The upload hits a dedicated Image CDN (like Cloudinary, Imgix, or Cloudflare Images).
3. The CDN automatically strips EXIF data (which can leak GPS coordinates/PII).
4. The CDN resizes the image into thumbnails, standardizes the aspect ratio, and converts it to WebP/AVIF formats.
5. Your database only stores the base CDN URL.

---

## Do's and Don'ts of Production Listings

- **DO use strict schema validation.** Use a library like `Zod` or `Yup` to mathematically validate incoming listing payloads (e.g., `price > 0`, `title.length <= 100`) before they ever touch your database.
- **DON'T store prices as floats/decimals.** Always store financial amounts in the smallest currency unit (e.g., cents in USD) as an `Integer`. Floating-point math will cause rounding errors that break Stripe payments.
- **DO implement Optimistic Concurrency Control (OCC).** If there is only 1 ticket left, and two buyers click "Buy" at the exact same millisecond, OCC (usually implemented via a `@version` column) prevents the database from selling the ticket twice.
- **DON'T rely on raw SQL `LIKE` queries for Search.** As soon as your listings table hits 10,000 rows, a `WHERE description LIKE '%phone%'` query will scan the entire table and crash your database. Sync this data to Algolia/ElasticSearch for querying.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Schema Validation (Zod):**

````prompt
Act as a Senior Typescript Engineer. I am building the POST endpoint to create a new marketplace listing. Write a comprehensive `Zod` validation schema for the payload payload. It must enforce that the price is a positive integer (cents), the description contains no malicious HTML, the category is a valid UUID, and the images array contains 1 to 5 valid URLs.
````

> [!TIP]
> **Prompt 2 — Concurrency Control Logic:**

````prompt
I am using Postgres/Prisma. Write the exact database query or Prisma transaction required to implement Optimistic Concurrency Control when a buyer purchases an item. Ensure that if `inventory_count` drops below 0 during a simultaneous purchase, the transaction rolls back and throws a specific error.
````

---

## Validating What AI Generates

- **Check the Price Data Type:** If the AI generates a database schema using `FLOAT`, `REAL`, or `DECIMAL` for the price, reject it immediately. Demand `INTEGER` (cents).
- **Verify Variant Handling:** If the AI lumps variant data (like Size and Color) directly onto the main `Listing` table, ask it to normalize the schema by creating a separate `ListingVariants` table connected via a Foreign Key.

---

## Implementation Checklist

- [ ] Architected the Listing schema with strict Foreign Keys for Categories.
- [ ] Designed the `ListingVariants` sub-table to handle SKUs, inventory counts, and variant-specific pricing.
- [ ] Stored all financial values as Integers (cents).
- [ ] Configured an Image CDN pipeline (e.g., Cloudinary) to strip EXIF data and convert formats.
- [ ] Implemented Zod (or equivalent) validation on all listing creation/update endpoints.

---

## What's Next

Next: **Search Architecture** — With our inventory schema locked, we must build the engine that allows buyers to actually find it. We will architect a high-performance search layer that offloads complex queries from our primary database.
