---
title: Product Catalog Planning
slug: product-catalog-planning
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Product Catalog Planning

In production e-commerce, your Product Catalog is the central nervous system of the database. 

If you design a poor catalog architecture on Day 1, you will spend months rewriting your database schema later when marketing wants to bundle products, or logistics needs to track physical inventory across multiple variants.

---

## 1. The SKU Architecture (Stock Keeping Unit)

A SKU is not just a random string of numbers. It is a highly structured ID that humans (warehouse workers) and machines (APIs) rely on for perfect accuracy.

**The Production Standard:**
A SKU must be deterministic, dash-separated, and instantly readable.
- `[BRAND]-[CATEGORY]-[PRODUCT]-[VARIANT_1]-[VARIANT_2]`
- **Bad SKU:** `492019482` (Means nothing. High chance of picking error).
- **Good SKU:** `NKE-SHO-AJ1-RED-10` (Nike, Shoe, Air Jordan 1, Red, Size 10).

Your database must enforce a strict `UNIQUE` constraint on the SKU column. If two different products accidentally share a SKU, your fulfillment center will ship the wrong item to the customer, leading to catastrophic return rates.

---

## 2. Products vs. Variants (Database Normalization)

You cannot store every possible version of a t-shirt as an independent, unrelated product in your database.

**The Implementation:**
You must implement a strict Parent-Child relationship.
- **Product (Parent):** Stores global data (e.g., Title: "The Heavyweight Tee", Description, Base Price, SEO metadata).
- **Variant (Child):** Stores specific data (e.g., Color: Red, Size: L, SKU: `TEE-HVY-RED-L`, Inventory Count: 45, Barcode/UPC).
- **The UX Constraint:** The frontend Product Detail Page (PDP) queries the Parent product, and dynamically updates the URL, price, and Add-to-Cart logic based on the user's selected Child variant.

---

## 3. Product Bundles (Virtual SKUs)

Bundling (e.g., "The Starter Kit") is the fastest way to increase Average Order Value (AOV). However, bundles break naive inventory systems.

**The Engineering Problem:**
If you create a physical SKU for "The Starter Kit", your warehouse won't know they need to pick 3 individual items off the shelf. 

**The Implementation:**
You must architect **Composite Products**.
- The Bundle exists in the database as a "Virtual SKU" (e.g., `BNDL-START-01`).
- This virtual record maps to an array of physical SKUs (`TEE-HVY-BLK-L`, `HAT-CP-BLK`).
- When the user adds the Bundle to their cart, the Cart API explodes the bundle into its component parts, applies the discounted pricing proportionally, and decrements the physical inventory of the underlying SKUs.

---

## 4. Categorization and Taxonomy

If your catalog has 5,000 SKUs, users cannot find what they want without a strict taxonomy.

**The Implementation:**
- Do not use a flat "Tags" array as your primary organization system.
- Implement a hierarchical Taxonomy (e.g., `Mens > Apparel > Shirts > T-Shirts`).
- This hierarchy is critical for your SEO URL structure (e.g., `/collections/mens/apparel/shirts`) and powers the faceted filtering in your search engine (e.g., Algolia).

---

## AI Prompt — Architect Your Catalog Schema

```prompt
I am architecting the database schema for a production e-commerce product catalog.

Tech Stack:
- Database: [e.g., Postgres / Prisma]
- PIM: [e.g., MedusaJS / Sanity]

Act as a Principal Data Architect:
1. Provide the exact Prisma schema required to model a strict Parent-Child relationship between a `Product` and its `Variants`, enforcing a `UNIQUE` constraint on the Variant SKU.
2. Draft a programmatic SKU generation function (TypeScript) that automatically builds deterministic SKUs (e.g., `BRAND-CAT-PROD-VAR`) based on user inputs in the CMS.
3. Design the database schema required to support "Composite Products" (Bundles), ensuring that a single Virtual SKU maps to multiple physical SKUs for accurate inventory deduction.
```

---

## Product Catalog Checklist

- [ ] Deterministic SKU naming convention established and documented for all current and future inventory
- [ ] Database schema normalized with a strict Parent (Product) and Child (Variant) relationship
- [ ] `UNIQUE` constraints enforced on all SKU and Barcode/UPC database columns
- [ ] Composite Product (Bundle) architecture defined to ensure accurate physical inventory tracking
- [ ] Hierarchical taxonomy mapped out to support SEO URL structures and faceted search filtering
