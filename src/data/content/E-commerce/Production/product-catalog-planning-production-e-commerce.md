---
title: Product Catalog Planning
slug: product-catalog-planning
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Product Catalog Planning

Your product catalog is not a spreadsheet of things you want to sell. It is the schema your entire store is built around.

Every architectural decision downstream — your database model, your search implementation, your filtering UI, your checkout logic, your inventory management system, and your analytics event taxonomy — is shaped by catalog decisions you make right now.

Get this wrong and you will be refactoring core systems mid-development when order volume is already building.

---

## Catalog Complexity Is a Spectrum

Production stores fail most often by either undermodeling or overmodeling their catalog at launch.

| Undermodeling | Overmodeling |
|---|---|
| No variants — adding sizes later breaks everything | Infinite attribute system for 12 products |
| No categories — filtering impossible to add later | 8-level category hierarchy for a 20-item store |
| Flat price field — discounts and sales require schema changes | Real-time dynamic pricing engine before first order |
| No SKUs — inventory tracking requires a full rebuild | Full WMS integration before proving the model works |
| No `compare_at_price` field — flash sales require schema change | Multi-warehouse inventory before validating single-location ops |

The goal is to model enough to support your real catalog at production volume without building a platform you do not need yet.

---

## Step 1 — Catalog Inventory

Before making any schema decisions, list everything you plan to sell at launch and in the next 12 months.

For each product, answer:

| Question | Why It Matters |
|---|---|
| Does it have variants? (size, color, material, format) | Determines if you need a variant system |
| Is inventory tracked per unit? | Determines inventory reservation strategy |
| Is it physical, digital, or print-on-demand? | Affects fulfilment, shipping, and file delivery logic |
| Does it have a fixed price or is it variable? | Affects pricing model and checkout calculation |
| Does it belong to a category or collection? | Determines navigation and filtering architecture |
| Does it require custom input from the buyer? | Affects cart and order model (notes, engraving, etc.) |
| What is the expected reorder frequency? | Affects inventory management and supplier integration |

You do not need every answer to be definitive. You need to know which answers vary across your catalog — those variations drive schema decisions.

---

## Step 2 — Variant Modeling

If any of your products have options, you need a variant model. There is no middle ground.

### The Standard Variant Model

```
Product
  └── has many Variants
        └── each Variant has:
              - SKU (unique identifier)
              - price (integer, cents/paise)
              - compare_at_price (integer, nullable — for sales)
              - inventory_count
              - option values (e.g. size: "M", color: "Black")
              - weight
              - dimensions (for real-time shipping rates)
              - is_active
              - barcode (optional, for warehouse integration)
```

### Option Sets

Options are the dimensions of variation. Values are the specific choices within a dimension.

```
Option: Size       → Values: XS, S, M, L, XL
Option: Color      → Values: Black, White, Slate
Option: Material   → Values: Cotton, Linen
```

A variant is one combination of option values: `[M, Black, Cotton]`.

> [!WARNING]
> **Combinatorial Explosion**: 3 sizes × 4 colors × 2 materials = 24 variants per product. You do not need to create all combinations — only the ones that actually exist. But you do need to model the system to support them. At production scale with hundreds of active SKUs, your variant management UI and import tooling become as important as the storefront.

---

## Step 3 — Category Architecture

Categories and collections serve different purposes.

| Concept | What It Is | Use Case |
|---|---|---|
| **Category** | Hierarchical taxonomy | "Candles > Soy > Unscented" |
| **Collection** | Curated grouping | "Best Sellers", "New Arrivals", "Gift Sets" |
| **Tag** | Flat label | "vegan", "limited", "seasonal" |

For production stores:

- 2–3 levels of categories supports most catalogs up to 1,000 SKUs
- Collections are essential for homepage merchandising and campaign landing pages
- Tags enable flexible filtering and dynamic collection rules without category proliferation
- Consider SEO implications of your category structure — category pages can be high-value organic landing pages

> [!TIP]
> If you have fewer than 50 products, a flat list with collections is almost always better than a category hierarchy. Category trees create navigation complexity without adding discoverability for small catalogs. Build the hierarchy when the catalog size justifies it.

---

## Step 4 — Catalog Size and Growth Rate

How many products will you launch with, and how fast will the catalog grow over the next 12 months?

This determines your search, filtering, and catalog management requirements:

| Catalog Size | Implications |
|---|---|
| **< 20 products** | No search needed at launch. Simple grid with filters. |
| **20–100 products** | Client-side filtering is fine. Category nav needed. |
| **100–500 products** | Server-side search required. Consider Algolia or Typesense. |
| **500–2,000 products** | Full search architecture required from day one. Faceted filtering. |
| **2,000+ products** | Enterprise search and a PIM system become necessary. |

Do not build search infrastructure for a 15-product store. But do plan for it if your catalog will cross 100 SKUs within 12 months — retrofitting search architecture mid-operation is disruptive and expensive.

---

## Step 5 — Digital vs. Physical vs. Hybrid

If you sell digital products, your fulfilment model is fundamentally different.

| Dimension | Physical | Digital | Print-on-Demand |
|---|---|---|---|
| Inventory | Tracked, finite | Infinite | Managed by supplier |
| Fulfilment | You ship | Secure file delivery | Supplier ships |
| Returns | Complex | No returns (usually) | Supplier policy |
| Shipping logic | Required | Not applicable | Supplier handles |
| File storage | Not needed | S3 or equivalent | Not needed |
| Tax treatment | Physical goods tax | Digital goods tax (varies by jurisdiction) | Physical goods tax |

Hybrid stores (physical + digital) require both models. This is manageable but must be explicit in your schema — do not let physical and digital products share the same fulfilment logic path. At production scale, the tax and compliance implications of selling digital goods across jurisdictions require specific handling.

---

## Step 6 — Catalog Operations at Scale

At production scale, catalog management is an ongoing operational task, not a one-time setup.

Consider ahead of time:
- **Bulk import/export**: How will you update prices, inventory, and descriptions across hundreds of SKUs?
- **Media management**: Where do product images live? How are they resized, compressed, and delivered via CDN?
- **Inventory sync**: If you sell on multiple channels (your store + marketplaces), how does inventory stay consistent?
- **Supplier/vendor integration**: If you source from suppliers, how do you receive their product data?

These questions do not need to be solved in Phase 0 — but the catalog schema you design needs to support the answers you will need later.

---

## The Catalog Schema Sketch

Before Phase 2 architecture, you should be able to sketch this:

```
[ Products ]
  - id
  - name
  - description
  - category_id
  - is_active
  - created_at
  - type (physical | digital | print_on_demand)

[ Variants ]
  - id
  - product_id
  - sku
  - barcode (nullable)
  - price (integer)
  - compare_at_price (integer, nullable)
  - inventory_count
  - option_values (JSON or relational)
  - weight
  - dimensions (JSON: length, width, height)
  - is_active

[ Options ]
  - id
  - product_id
  - name (e.g. "Size")
  - position (display order)

[ Option Values ]
  - id
  - option_id
  - value (e.g. "Medium")

[ Categories ]
  - id
  - name
  - parent_id (nullable, for hierarchy)
  - slug
  - seo_title (nullable)
  - seo_description (nullable)

[ Collections ]
  - id
  - name
  - slug
  - is_automated (rule-based vs. manual)
  - rule_conditions (JSON, for automated collections)
```

This is a sketch, not a final schema. Phase 2 will refine it. But if this sketch surprises you, your catalog planning is not complete.

---

## Product Catalog Planning Checklist

- [ ] I have listed all products I plan to launch with and projected catalog size at 12 months
- [ ] I know which products have variants and what their option dimensions are
- [ ] I have decided on my category and collection structure
- [ ] I know whether I need search infrastructure at launch
- [ ] I have identified any digital, physical, or POD distinctions in my catalog
- [ ] I have added `compare_at_price` to my variant schema
- [ ] I have considered how bulk catalog management will work at scale
- [ ] I can sketch the core entities of my catalog schema from memory

---

## AI Prompt — Design Your Catalog Schema

```prompt
I am building a production e-commerce store with the following catalog:

- Products at launch: [number and brief description]
- Projected catalog size in 12 months: [estimate]
- Variant dimensions: [e.g. "T-shirts have Size (S/M/L/XL) and Color (5 options)"]
- Category structure: [e.g. "Two top-level categories: Apparel and Accessories"]
- Collections needed: [e.g. "New Arrivals, Best Sellers, Sale"]
- Catalog type: [physical / digital / print-on-demand / hybrid]
- Sales channels: [store only / store + Etsy / store + Amazon]

Design a production-ready relational database schema for this catalog. Include:
1. All core tables with fields, types, and constraints
2. The relationships between tables (foreign keys, indexes)
3. Any indexes I should add for query performance at scale
4. How to handle multi-channel inventory sync if applicable
5. One thing I am likely to regret not modeling now

Use PostgreSQL conventions. Store all prices as integers in the smallest currency unit.
```

---

## What Comes Next

Your catalog plan feeds directly into Phase 2 architecture. When you reach the Product Architecture and Database modules, you will have already made the hard decisions — the schema work becomes execution, not discovery.

**Next: Store Economics →**
