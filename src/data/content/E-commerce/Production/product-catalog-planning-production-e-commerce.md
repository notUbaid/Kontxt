---
title: Product Catalog Planning
slug: product-catalog-planning
phase: Phase 0 E Commerce Discovery
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Product Catalog Planning & Search Indexing

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 25 Minutes

For a beginner building a small store, a product catalog is simple: You create a table in your database called `Products`, give it a title and a price, and when a user visits the site, you query the database to show the items.

If you try to do that in a mass-production environment with 50,000 SKUs, complex filtering (color, size, price range), and thousands of concurrent users, your database will collapse under the load. 

As an AI-Assisted Architect, you must instruct your AI to build a system where the **Source of Truth** is completely decoupled from the **Discovery Layer**.

---

## 1. The PIM (Source of Truth)

In a production store, your backend commerce engine (like Shopify) or a dedicated PIM (Product Information Management system like Akeneo or Salsify) acts as the absolute Source of Truth. 

This is where the complex relational data lives. It holds the high-resolution images, the translated descriptions for international markets, and the exact inventory counts. 

However, you **never** query the PIM to build your category pages on the frontend. It is too slow.

## 2. The Search Index (Discovery Layer)

To achieve blazing-fast category pages (Product Listing Pages / PLPs) where users can instantly filter by "Blue Shirts under $50", we use a **NoSQL Search Index** (like Algolia, Typesense, or Elasticsearch).

**The Architecture:**
1. You add a new product in the PIM.
2. The PIM fires a Webhook in the background.
3. The Webhook automatically pushes a lightweight, flattened JSON version of the product to Algolia.
4. When a user clicks the "Mens Shirts" category on your Next.js site, the site queries Algolia, *not* your database. Algolia returns the results in sub-50 milliseconds.

## 3. Handling Complex Variants

Do not let your AI build a flat database for variants. You must enforce **Parent-Child** product relationships.

- **The Parent Node:** Holds the shared data (Description, Brand, Care Instructions).
- **The Child Node (Variant):** Holds the specific, atomic data (SKU, Price, Inventory Count, Color).

If the "Size Large" child node sells out, a webhook updates only that specific node in Algolia. The frontend instantly disables the "Size Large" button, but the overall Parent product remains visible on the site.

---

## ✅ Product Catalog Checklist

- [ ] Accept that your frontend will never query the main database directly to render category lists.
- [ ] Choose your NoSQL Search Index provider (Algolia or Typesense are highly recommended for Next.js).
- [ ] Define the Parent-Child schema for your products to ensure accurate inventory tracking.
- [ ] Use the AI prompt below to generate the webhook pipeline connecting your PIM to your Search Index.

---

## AI Prompt — Architect the Search Index Webhooks

Copy this prompt into your AI to have it generate the complex webhook pipeline required to keep your catalog in sync.

````prompt
I am building a headless e-commerce store with Next.js. I need you to act as my Principal Backend Architect. 

We are decoupling our Source of Truth (Commerce Backend) from our Discovery Layer (Search Index).
- Commerce Backend: [e.g., Shopify / Medusa / Swell]
- Search Index: [e.g., Algolia / Typesense]

I need you to write the complete backend synchronization flow:

**1. The Parent-Child JSON Schema:**
Define the exact flattened JSON structure we must use to send a product with multiple variants (Size, Color) into the Search Index. Ensure the schema is optimized for instant faceted filtering.

**2. The Webhook Sync Route:**
Write the Next.js API route (`/api/sync-catalog`) that receives a webhook from the Commerce Backend whenever a product is created or updated. 
This route must:
- Verify the webhook signature securely.
- Extract the updated product data.
- Transform it into the flat JSON schema.
- Push the update to the Search Index API (Algolia/Typesense) to keep discovery in real-time sync.

Provide the code and a brief explanation of how this architecture prevents our main database from crashing during heavy traffic.
````

**Next: Store Economics →**
