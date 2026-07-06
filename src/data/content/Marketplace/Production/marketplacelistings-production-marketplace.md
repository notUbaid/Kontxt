---
title: Listings
slug: listings
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Listings (Core Asset Architecture)

## The High-Throughput Core of Your Marketplace

In a personal project, you query the database directly for every listing view. In a production marketplace, the `Listing` resource is subjected to a massive read-to-write imbalance. A listing might be viewed 10,000 times for every 1 time it is edited.

If you architect the Listing API as a standard CRUD REST endpoint hitting Postgres on every read, your database will collapse under a traffic spike. You must architect for **High-Performance Reads** and **Strict, Concurrent Writes**.

---

## CQRS (Command Query Responsibility Segregation)

Production marketplaces separate the "Write" path from the "Read" path.

* **Commands (Writes):** When a seller creates or edits a listing, the API writes to Postgres. This guarantees ACID compliance and structural integrity.
* **Queries (Reads):** When a buyer views a listing, the API should not touch Postgres. The read should hit a Redis cache, or be served directly from the Search Engine (Algolia/Typesense) which acts as a Read-Replica.

If you must query Postgres for a listing read, you must implement caching (e.g., `Cache-Control: s-maxage=60, stale-while-revalidate`) at your CDN layer (Cloudflare/Vercel Edge) so the database is shielded from traffic spikes.

---

## Inventory and Optimistic Concurrency Control (OCC)

If your marketplace sells unique physical items (or limited inventory), you face the "Double-Spend" problem. 
If Buyer A and Buyer B both click "Checkout" at the exact same millisecond, a standard SQL `UPDATE listings SET status = 'SOLD' WHERE id = 1` might execute twice, charging both buyers but only delivering one item.

**The Production Standard: Optimistic Concurrency Control (OCC)**
You must add a `version` column to your Listing table.
When updating the inventory, your SQL must assert the version hasn't changed:
`UPDATE listings SET status = 'SOLD', version = version + 1 WHERE id = 1 AND version = 5;`

If the query affects `0` rows, it means another buyer beat them to it. The transaction must roll back, and the second buyer receives an "Out of Stock" error.

---

## The Strict State Machine

Listings do not just have a boolean `isActive`. They have a complex lifecycle. You must enforce these transitions strictly on the backend.

````
Draft -> Pending_Review -> Active -> Paused -> Sold -> Archived
                            |
                         Removed (Admin)
````

> [!CAUTION]
> If your API accepts `PATCH /listings/1 { status: "Sold" }` directly from the frontend, a malicious user can mark another seller's active item as "Sold" to remove it from search. Status mutations must be internal side-effects of business logic (e.g., an Order completing), NEVER directly exposed to client-side updates.

---

## Media Architecture (Images and Video)

A listing with 5 unoptimized 8MB images will destroy your Core Web Vitals, destroying your SEO rankings.

**The Production Rule:**
Your backend must never serve images directly. 
1. The frontend requests a Pre-Signed S3 Upload URL from your backend.
2. The frontend uploads the raw image directly to an S3 Bucket.
3. An event trigger (AWS Lambda / Inngest) resizes the image into `.webp` format and creates thumbnails.
4. The frontend serves the images through a CDN (Cloudflare or Cloudinary).

---

## Do's and Don'ts of Production Listings

- **DO use Soft Deletes.** Never execute `DELETE FROM listings`. If a seller deletes a listing, update `status = 'ARCHIVED'`. If you hard delete a listing, you will break Foreign Key constraints on past Orders, Messages, and Reviews.
- **DON'T store prices as floats.** Storing a price as `19.99` (Float) will result in precision errors during fee calculation (`19.99 * 0.05 = 0.9995`). Always store prices as Integers (cents). `$19.99` is stored as `1999`.
- **DO use JSONB for dynamic attributes.** If you sell Guitars and Laptops, don't create `neck_type` and `ram_size` columns on the Listing table. Use a `JSONB` column named `attributes` for category-specific metadata.
- **DON'T return sensitive seller data on the Listing endpoint.** The `GET /api/listings/:id` endpoint must explicitly omit the seller's `email`, `stripe_account_id`, and `address`. 

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Optimistic Concurrency Checkout:**

````prompt
Act as a Senior Backend Engineer. I am using Node.js, Prisma, and Postgres. Write a `purchaseListing` service function. It must implement Optimistic Concurrency Control (OCC) using a `version` field to ensure a listing cannot be double-sold. It should attempt the update, and if the Prisma query returns a `PrismaClientKnownRequestError` for a version mismatch, it must throw a specific `InventoryConflictError`.
````

> [!TIP]
> **Prompt 2 — Pre-Signed S3 Upload Route:**

````prompt
Write an API endpoint in Next.js that generates a securely signed AWS S3 `PutObject` URL. It must validate that the user is authenticated, generate a unique UUID for the filename to prevent overwrites, enforce a strict `ContentType` (e.g., `image/jpeg`), and limit the maximum file size. Return the pre-signed URL and the final public CDN URL to the client.
````

---

## Validating What AI Generates

- **Check for direct status mutations:** If the AI generates a generic `updateListing` function that blindly applies `req.body.status` to the database, reject it. Demand strict state-transition guards.
- **Verify Price Types:** Ensure any AI-generated schema uses `Int` for prices (cents), and verify that any frontend display code correctly divides by 100 before rendering.

---

## Implementation Checklist

- [ ] Architected CQRS or Edge Caching (Cloudflare/Vercel) to protect the Postgres database from high-volume read traffic.
- [ ] Implemented Optimistic Concurrency Control (OCC) to mathematically prevent double-selling of unique inventory.
- [ ] Defined the strict Listing State Machine on the backend (Draft, Pending, Active, Sold, Archived).
- [ ] Converted all `DELETE` operations to Soft Deletes (`status = 'ARCHIVED'`) to preserve relational integrity.
- [ ] Built the S3 Pre-Signed URL flow to offload media uploads and delivery to a CDN.

---

## What's Next

Next: **Messaging** — With listings optimized and secured, we must build the communication layer. We will architect a real-time messaging system (WebSockets or Polling) that enforces Trust & Safety, prevents platform leakage, and integrates seamlessly with our notification engine.
