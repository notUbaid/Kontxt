---
title: Product Catalog Planning
slug: product-catalog-planning
phase: Phase 0
mode: personal
projectType: e-commerce
estimatedTime: 20–25 min
---

# Product Catalog Planning

Your product catalog is not a spreadsheet of things you want to sell. It is the schema your entire store is built around.

Every architectural decision downstream — your database model, your search implementation, your filtering UI, your checkout logic — is shaped by catalog decisions you make right now.

Get this wrong and you'll refactor core systems mid-development.

---

## Catalog Complexity Is a Spectrum

Personal stores fail most often by either undermodeling or overmodeling their catalog at launch.

| Undermodeling | Overmodeling |
|---|---|
| No variants — adding sizes later breaks everything | Infinite attribute system for 12 products |
| No categories — filtering impossible to add later | 8-level category hierarchy for a 20-item store |
| Flat price field — discounts and sales require schema changes | Real-time dynamic pricing engine for handmade goods |
| No SKUs — inventory tracking requires a full rebuild | Full WMS integration before first order is placed |

The goal is to model enough to support your real catalog without building a platform you don't need.

---

## Step 1 — Catalog Inventory

Before making any schema decisions, list everything you plan to sell at launch and in the next 6 months.

For each product, answer:

| Question | Why It Matters |
|---|---|
| Does it have variants? (size, color, material, format) | Determines if you need a variant system |
| Is inventory tracked per unit? | Determines inventory reservation strategy |
| Is it physical, digital, or print-on-demand? | Affects fulfillment, shipping, and file delivery logic |
| Does it have a fixed price or is it variable? | Affects pricing model and checkout calculation |
| Does it belong to a category or collection? | Determines navigation and filtering architecture |
| Does it require custom input from the buyer? | Affects cart and order model (notes, engraving, etc.) |

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
              - inventory_count
              - option values (e.g. size: "M", color: "Black")
              - weight
              - is_active
```

### Option Sets

Options are the dimensions of variation. Values are the specific choices within a dimension.

```
Option: Size       → Values: XS, S, M, L, XL
Option: Color      → Values: Black, White, Slate
Option: Material   → Values: Cotton, Linen
```

A variant is one combination of option values: `[M, Black, Cotton]`.

> ⚠️ **Warning: Combinatorial Explosion**
>
> 3 sizes × 4 colors × 2 materials = 24 variants per product. You do not need to create all combinations — only the ones that actually exist. But you do need to model the system to support them.

---

## Step 3 — Category Architecture

Categories and collections serve different purposes.

| Concept | What It Is | Use Case |
|---|---|---|
| **Category** | Hierarchical taxonomy | "Candles > Soy > Unscented" |
| **Collection** | Curated grouping | "Best Sellers", "New Arrivals", "Gift Sets" |
| **Tag** | Flat label | "vegan", "limited", "seasonal" |

For a personal store at launch:

- 1–2 levels of categories is almost always enough
- Collections are high-value for homepage merchandising
- Tags enable flexible filtering without category proliferation

> 💡 **Tip**
>
> If you have fewer than 30 products, a flat list with collections is almost always better than a category hierarchy. Category trees create navigation complexity without adding discoverability for small catalogs.

---

## Step 4 — Catalog Size and Growth Rate

How many products will you launch with, and how fast will the catalog grow?

This determines:

| Catalog Size | Implications |
|---|---|
| **< 20 products** | No search needed at launch. Simple grid with filters. |
| **20–100 products** | Client-side filtering is fine. Category nav needed. |
| **100–500 products** | Server-side search needed. Consider Algolia or Typesense. |
| **500+ products** | Full search architecture required from day one. |

Don't build search infrastructure for a 15-product store. Do plan for it if your catalog will cross 100 SKUs within 6 months.

---

## Step 5 — Digital vs. Physical vs. Hybrid

If you sell digital products, your fulfillment model is fundamentally different.

| Dimension | Physical | Digital | Print-on-Demand |
|---|---|---|---|
| Inventory | Tracked, finite | Infinite | Managed by supplier |
| Fulfillment | You ship | Secure file delivery | Supplier ships |
| Returns | Complex | No returns (usually) | Supplier policy |
| Shipping logic | Required | Not applicable | Supplier handles |
| File storage | Not needed | S3 or equivalent | Not needed |

Hybrid stores (physical + digital) require both models. This is manageable but must be explicit in your schema — don't let physical and digital products share the same fulfillment logic path.

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

[ Variants ]
  - id
  - product_id
  - sku
  - price (integer)
  - inventory_count
  - option_values (JSON or relational)
  - weight
  - is_active

[ Options ]
  - id
  - product_id
  - name (e.g. "Size")

[ Option Values ]
  - id
  - option_id
  - value (e.g. "Medium")

[ Categories ]
  - id
  - name
  - parent_id (nullable, for hierarchy)
  - slug

[ Collections ]
  - id
  - name
  - slug
  - is_automated (rule-based vs. manual)
```

This is a sketch, not a final schema. Phase 2 will refine it. But if this sketch surprises you, your catalog planning isn't complete yet.

---

## ✅ Product Catalog Planning Checklist

- [ ] I have listed all products I plan to launch with
- [ ] I know which products have variants and what their option dimensions are
- [ ] I have decided on my category and collection structure
- [ ] I know my launch catalog size and 6-month growth projection
- [ ] I know whether I need search infrastructure at launch
- [ ] I have identified any digital, physical, or POD distinctions in my catalog
- [ ] I can sketch the core entities of my catalog schema from memory

---

## AI Prompt — Design Your Catalog Schema

```
I am building a personal e-commerce store with the following catalog:

- Products at launch: [number and brief description]
- Variant dimensions: [e.g. "T-shirts have Size (S/M/L/XL) and Color (5 options)"]
- Category structure: [e.g. "Two top-level categories: Apparel and Accessories"]
- Collections needed: [e.g. "New Arrivals, Best Sellers, Sale"]
- Catalog type: [physical / digital / print-on-demand / hybrid]
- Expected catalog size in 6 months: [estimate]

Design a normalized relational database schema for this catalog. Include:
1. All core tables with fields and types
2. The relationships between tables
3. Any indexes I should add for query performance
4. One thing I'm likely to regret not modeling now

Use PostgreSQL conventions. Store all prices as integers in the smallest currency unit.
```

---

## What Comes Next

Your catalog plan feeds directly into Phase 2 architecture. When you reach the Product Architecture and Database modules, you will have already made the hard decisions — the schema work becomes execution, not discovery.

**Next: Store Economics →**
