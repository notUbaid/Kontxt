---
title: Product Architecture
slug: product-architecture
phase: Phase 2 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Product Data Architecture

**Estimated Time:** 25 Minutes

A beginner looks at a t-shirt and sees one product. 
An Enterprise Architect looks at a t-shirt and sees a **Parent Node with 12 Child SKU Variants**, each requiring separate inventory tracking, unique localized pricing, and dynamic URL routing.

If you let your AI build a flat database (where every size and color is just a column on a single row), your store will physically be unable to handle out-of-stock logic for specific sizes. 

As an AI-Assisted Architect, you must command your AI to build a rigid **Relational Product Schema** that scales effortlessly.

---

## 1. The Parent-Variant Relationship

In a production environment, you must strictly decouple the "Marketing Data" from the "Transactional Data".

- **The Parent Product:** Holds the shared marketing data (Title, Main Description, Brand). It does NOT have a price, and it does NOT have inventory.
- **The Variant (SKU):** Holds the transactional data (Price, Inventory Count, Specific Color Image, Barcode). 

If a user buys the last "Large Red" t-shirt, the *Variant* goes out of stock. The *Parent* product remains active on the store because "Medium Blue" is still available. 
You must explicitly instruct your AI to enforce this Parent-Variant hierarchy when querying your Commerce API (like Shopify).

## 2. Metafields and Extensibility

A standard Commerce Engine only gives you basic fields (Title, Price, Description). But premium brands need custom data: "Care Instructions," "Material Composition," or "Model Height."

Do not let your AI build a separate database just to store this extra text.

**The Production Solution:**
You must use **Metafields** (or Custom Attributes). 
Instruct your AI to query the native Metafield APIs of your Commerce Engine. This ensures that the custom data is attached directly to the Parent Product object and returned in the exact same GraphQL query, keeping your API surface area minimal and fast.

## 3. SEO-Optimized Image Architecture

High-end product photography is beautiful but massively heavy. A single product page might have 10 images. 

If you let your AI write standard `<img src="...">` tags, all 10 images will download simultaneously, freezing the browser.

**The Production Solution:**
You must mandate the use of the `next/image` component with strict **Priority Caching**.
- The primary product image must have `priority={true}` so the browser preloads it instantly to pass the LCP (Largest Contentful Paint) metric.
- The remaining 9 gallery images must be strictly lazy-loaded (`loading="lazy"`) and optimized on the edge using next-gen formats (WebP).

---

## ✅ Product Architecture Checklist

- [ ] Enforce the Parent-Variant relational schema; never let the AI build a "flat" product table.
- [ ] Utilize Metafields in your Commerce Engine for custom data, avoiding external databases.
- [ ] Mandate strict image lazy-loading to protect Core Web Vitals on the Product Detail Page.
- [ ] Use the AI prompt below to generate the exact GraphQL queries.

---

## AI Prompt — Architect the Product Data Layer

Copy this prompt into your AI to have it generate the complex, strictly-typed data layer required for handling enterprise product catalogs.

````prompt
I am building a headless e-commerce store with Next.js. I need you to act as my Principal Data Architect. We are defining the Product Data Architecture using our Commerce Engine API (e.g., Shopify Storefront GraphQL).

I need you to generate the following architectural code:

**1. The Parent-Variant GraphQL Query:**
Write the exact GraphQL query required to fetch a single Product. 
- You MUST fetch the Parent metadata (Title, Description).
- You MUST fetch up to 100 Variants (Nodes), specifically querying their unique ID, Price, and `availableForSale` boolean.
- Show how to use `graphql-codegen` to strictly type this response.

**2. Metafield Extraction:**
Update the GraphQL query to also fetch a custom Metafield (e.g., namespace: `custom`, key: `care_instructions`). Write the Next.js TypeScript interface that parses this Metafield safely, falling back to a null state if it doesn't exist.

**3. The Highly Optimized Image Gallery:**
Write a React component (`<ProductGallery />`) that receives an array of Image nodes. 
- Use `next/image`.
- You MUST set `priority={true}` for `index === 0`.
- You MUST set `loading="lazy"` for all subsequent images. 
- Explain how this specific configuration guarantees a perfect LCP score.
````

**Next: Search Architecture →**
