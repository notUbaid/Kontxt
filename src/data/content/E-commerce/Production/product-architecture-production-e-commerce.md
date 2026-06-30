---
title: Product Architecture
slug: product-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Product Architecture

At a small scale, a product is a title, an image, and a price. At production scale, product architecture is a deeply complex data modeling problem involving variant matrices, digital assets, metadata, and multi-system synchronization.

If you get the product schema wrong in Phase 2, you will eventually hit a wall where merchandising teams cannot sell items the way they want to without requiring custom engineering work for every new product launch.

---

## The Core Product Model

A production e-commerce catalog is almost never flat. It is hierarchical.

### 1. The Parent Product (The Container)
The `Product` entity holds the shared attributes: the title, the core description, the category relationship, and the overarching marketing imagery. The Parent Product *cannot be purchased*.

### 2. The Variant (The Sellable Unit)
The `Variant` is the actual item that has a SKU, a price, an inventory count, and a physical weight. Customers buy variants, not products.
Even if a product only comes in one size and one color, it must still be modeled as a Product containing a single Variant. This prevents a catastrophic database migration when the business inevitably decides to launch a second color next year.

### 3. The Options (The Matrix)
Variants are defined by a matrix of `Options` (e.g., Size, Color, Material).
*Example:* A shirt with 3 sizes and 3 colors generates 9 distinct Variants.

> [!WARNING]
> **The Shopify Variant Limit:** Shopify enforces a hard limit of 100 variants and 3 option types per product. If you sell custom furniture with 5 wood types, 10 fabrics, and 3 leg styles (150 variants), you cannot model this natively in Shopify. You must architect a "split product" model or use a headless approach to combine multiple backend products into a single frontend PDP.

---

## Advanced Product Architectures

Production stores frequently require data models beyond the basic Product/Variant hierarchy.

### Kits and Bundles
A bundle is a sellable unit (e.g., "The Skincare Starter Kit") that is composed of multiple independent SKUs.
- **The Architecture:** The bundle exists as a parent product, but its inventory is dynamically calculated based on the Bill of Materials (BOM). If the kit requires SKU A and SKU B, the bundle's available inventory is `Math.min(inventory(A), inventory(B))`.
- **The Trap:** Do not treat bundles as independent inventory. If you do, you will oversell the underlying components.

### Digital / Physical Hybrids
Selling a physical textbook that includes a digital access code requires a split fulfillment model. The product schema must flag the variant with `requires_shipping: true` AND trigger a webhook to a digital delivery service (like SendOwl) upon payment capture.

### Configurable Products (Made-to-Order)
If a customer can input a custom text engraving, that text is *not* a variant. It is **Line Item Property** (or metadata) attached to the cart and the final order. Do not generate a new database variant for every custom engraving string.

---

## The Role of a PIM (Product Information Management)

In a small store, the e-commerce engine (Shopify/Medusa) is the Source of Truth (SoT) for product data.
At production scale, this breaks down.

When your catalog reaches thousands of SKUs, and you need to feed product data to your storefront, a mobile app, Amazon, Google Shopping, and wholesale partners, the commerce engine is no longer the SoT.

You must integrate a **PIM (Product Information Management)** system (e.g., Akeneo, Salsify, or a custom database).
- The PIM holds the rich marketing copy, translated content, tech specs, and heavy media assets.
- The PIM pushes a *subset* of this data (Title, SKU, Price, basic images) to the commerce engine just so the engine can process the transaction.
- Your frontend fetches data from *both* the commerce engine (for real-time price/inventory) and the PIM (for rich static content).

---

## Schema Design (If Building Custom)

If you are using Prisma or building a custom database, your schema must look roughly like this:

```prisma
model Product {
  id          String    @id @default(uuid())
  handle      String    @unique // SEO URL slug
  title       String
  description String    @db.Text
  status      Status    @default(DRAFT)
  variants    Variant[]
  options     Option[]  // e.g., Size, Color
  metadata    Json?     // Flexible attributes (e.g., care instructions)
}

model Variant {
  id               String   @id @default(uuid())
  productId        String
  sku              String   @unique
  price            Int      // ALWAYS store money in cents/paise
  inventoryCount   Int      @default(0)
  weightGrams      Int?     // Crucial for shipping API calculations
  optionValues     Json     // e.g., { "Size": "M", "Color": "Red" }
  product          Product  @relation(fields: [productId], references: [id])
}
```

---

## AI Prompt — Architect Your Catalog Data Model

```prompt
I am designing the product data architecture for a production e-commerce store.

Catalog Profile:
- Core Product Types: [e.g., Apparel / Electronics / Furniture / Digital]
- Max Variants per Product: [Estimate]
- Option Dimensions: [e.g., Size, Color, Material, Voltage]
- Bundle/Kit Requirements: [Do you sell grouped products?]
- Customization: [Do users provide custom text, uploads, or measurements?]
- Tech Stack: [e.g., Headless Shopify / Custom Postgres Database]

Act as a Principal Data Architect:
1. Design the exact data schema (or platform configuration) needed to support this catalog.
2. If using a platform like Shopify, identify if I will hit the 100-variant or 3-option limit, and provide the technical workaround.
3. Detail how I should architect the data model for my bundles/kits so that underlying inventory stays perfectly synced.
4. Explain how custom user inputs (like engravings) should be passed from the PDP, into the cart state, and finally onto the finalized Order record.
5. At what specific SKU count or channel complexity should I introduce a dedicated PIM system?
```

---

## Product Architecture Checklist

- [ ] Every product modeled to support variants (even single-option products)
- [ ] Money stored strictly as integers (cents/paise) to avoid floating-point math errors
- [ ] Bundles and kits architected to calculate inventory dynamically from component SKUs
- [ ] Line-item properties (customizations) separated from core Variant definitions
- [ ] Platform variant limits (e.g., Shopify's 100 limit) evaluated against the largest expected product matrix
- [ ] Weight/Dimensions included in Variant schema for real-time shipping calculation readiness
