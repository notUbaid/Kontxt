---
title: Products
slug: products
phase: Phase 3
mode: personal
projectType: e-commerce
estimatedTime: 25-30 min
---

# Products

This is the core entity your entire store revolves around. Every other feature — cart, checkout, search, inventory — is ultimately just operating on the product data model you build here. Get this schema right early; reshaping it later means touching nearly every part of your app.

---

## Why This Comes Before Everything Else

You planned your Product Architecture back in Phase 2. Now you're implementing it. The decisions you make here ripple forward:

- A sloppy schema makes search worse (Search module, already built — revisit if needed)
- Missing fields here mean awkward workarounds in checkout
- Poor variant handling here means painful inventory logic later

> **Reframe:** You're not just creating a database table. You're defining the vocabulary your entire application will use to talk about what you sell.

---

## Core Product Schema

Every product needs a baseline set of fields, regardless of what you're selling.

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2), -- for showing "was $X, now $Y"
  sku TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  category_id UUID REFERENCES categories(id),
  stock INTEGER NOT NULL DEFAULT 0,
  weight DECIMAL(10,2), -- for shipping calculation
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0
);
```

> **Why `DECIMAL` and not `FLOAT` for price:** Floating point numbers introduce rounding errors with money (`0.1 + 0.2 !== 0.3` in most languages). `DECIMAL(10,2)` stores exact currency values. This is a classic beginner mistake that causes off-by-cent bugs in totals — avoid it from the start.

---

## Decision: Do You Need Product Variants?

This is the single most important decision in this module, and it depends entirely on what you're selling.

<table>
<tr><th>Selling...</th><th>Need variants?</th><th>Example</th></tr>
<tr><td>Physical goods with size/color options</td><td><strong>Yes</strong></td><td>T-shirt in S/M/L, in 3 colors</td></tr>
<tr><td>Digital products</td><td>Usually no</td><td>An ebook, a Figma template</td></tr>
<tr><td>Single-SKU physical goods</td><td>No</td><td>A specific handmade item, one size</td></tr>
<tr><td>Bundles/kits</td><td>Maybe — depends on bundle composition</td><td>"Starter Pack" combining fixed items</td></tr>
</table>

**If you need variants**, don't bolt them onto the products table as extra columns (`size`, `color`). Use a separate `product_variants` table — this is the pattern every real e-commerce platform uses, and it scales to any combination of options.

```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE,
  option_values JSONB NOT NULL, -- e.g. {"size": "M", "color": "Blue"}
  price_override DECIMAL(10,2), -- null = use parent product price
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

> **Why `JSONB` for option values instead of fixed `size`/`color` columns:** Products have different option types — a shirt has size/color, a phone case has size/material, a candle has scent only. A fixed-column approach forces nullable columns for irrelevant options or a schema migration every time you add a new product type. `JSONB` handles any combination without schema changes. Postgres can still query and index JSONB fields efficiently.

**If you don't need variants**, skip this table entirely. Don't build variant infrastructure for products that don't have variants — that's solving a problem you don't have.

---

## Categories: Keep Them Simple

Most personal stores need flat or, at most, two-level categories. Resist building a deep nested category tree.

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id) -- null for top-level
);
```

This single self-referencing table supports flat categories (ignore `parent_id`) or two levels (e.g., "Clothing" → "T-Shirts") without overengineering. You very likely don't need three+ levels of nesting at personal-store scale.

---

## Product Status: The Field That Prevents Embarrassing Bugs

The `status` field (`draft`, `active`, `archived`) is small but critical. Without it, you'll either:

- Accidentally show unfinished products to customers, or
- Have no clean way to discontinue a product without deleting its order history

| Status | Visible to customers? | Purchasable? | Use case |
|---|---|---|---|
| `draft` | No | No | Still being set up |
| `active` | Yes | Yes (if in stock) | Live in your store |
| `archived` | No | No | Discontinued, but order history must remain intact |

> **Best Practice:** Never delete a product that has ever been ordered. Archive it instead. Deleting it breaks the foreign key relationship to past orders — your order history page would show a broken or missing product. This is a common mistake that only surfaces when a customer asks about a past order.

---

## Handling Product Images

Images are usually the highest-impact, most overlooked part of product setup. A few rules:

- Store images in object storage (Supabase Storage, Cloudflare R2, or similar) — never as base64 blobs in your database.
- Always store multiple images per product via `product_images`, even if you only have one image today — the schema cost of supporting multiple is near zero, but retrofitting it later means a migration.
- Generate or request multiple sizes (thumbnail, full) if your traffic justifies it — for a personal store launch, a single reasonably-sized optimized image is fine; don't over-engineer an image pipeline on day one.

> **Tip:** Use Next.js's built-in `<Image>` component (or your framework's equivalent) for automatic optimization and lazy loading — don't hand-roll image resizing logic for a personal project.

---

## AI Prompt: Generate the Product Data Layer

```
I'm building the product data layer for a personal e-commerce store using 
Supabase (Postgres) and [your backend framework].

I'm selling: [describe what you sell — e.g., "handmade ceramics, no variants" 
or "apparel with size and color variants"]

Generate:
1. The SQL migration for products, product_images, categories[, product_variants 
   if needed based on what I'm selling]
2. CRUD functions: createProduct, updateProduct, archiveProduct (not delete), 
   getProductBySlug, listActiveProducts (with pagination)
3. Proper TypeScript types matching the schema

Requirements:
- Use DECIMAL for all price fields, never FLOAT
- Status field must be enforced via CHECK constraint: draft, active, archived
- Never hard-delete products — archiveProduct should set status only
- Include appropriate indexes (slug lookup, category filtering, status filtering)

Explain your variant approach if I described variant products, including why 
you structured option_values the way you did.
```

> **Token efficiency tip:** Telling AI exactly what you sell (with or without variants) up front avoids generating unnecessary variant infrastructure for a simple catalog, or worse — generating a flat schema that can't actually support the variants you need.

---

## Validating AI-Generated Product Code

- [ ] Are prices stored as `DECIMAL`/`NUMERIC`, not `FLOAT` or `REAL`?
- [ ] Does `archiveProduct` update status only, or does it actually `DELETE` the row? (Check this carefully — it's an easy AI shortcut that causes real data loss later.)
- [ ] Is `slug` enforced unique, and is there a sane way to generate it from `name` (lowercased, hyphenated, no special characters)?
- [ ] If variants exist, does stock live on the variant, not the parent product? (Parent-level stock makes no sense once variants exist — a "Blue, Medium" shirt and a "Red, Large" shirt have independent stock.)
- [ ] Does `listActiveProducts` actually filter by `status = 'active'`, or does it return everything including drafts?
- [ ] Are indexes created on commonly filtered/queried columns (`slug`, `status`, `category_id`)?

> **Common AI mistake:** When variants are involved, AI sometimes keeps a `stock` field on both the parent product and the variants, leading to two sources of truth that drift out of sync. If you have variants, stock should live **only** on the variant table — the parent product's "stock" is just the sum of its variants, computed on read, not stored.

---

## Admin-Side: How You'll Actually Add Products

Don't underestimate this. You'll be adding/editing products constantly, especially right after launch. A clunky admin flow will slow you down on every single product.

**Minimum viable admin product form:**
- Name, slug (auto-generated from name, editable)
- Description (plain text or markdown — don't build a rich text editor for a personal store)
- Price, compare-at-price (optional)
- Category dropdown
- Image upload (drag-and-drop, multiple files)
- Stock quantity (or variant stock if applicable)
- Status toggle (draft/active)

This connects to the **Admin Dashboard** module later in this phase — but plan your product schema with this form in mind now, so the two stay in sync.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Multi-warehouse inventory tracking
- Product bundling/kit logic (unless it's core to what you sell)
- Subscription/recurring product types
- Multi-currency pricing
- Product review/rating systems at the schema level (add later if needed)
- Advanced product recommendation/related-products algorithms

---

## Implementation Checklist

- [ ] `products` table created with `DECIMAL` pricing and `status` CHECK constraint
- [ ] `product_images` table created, images stored in object storage (not as blobs)
- [ ] `categories` table created (flat or two-level, self-referencing)
- [ ] Variant decision made explicitly — `product_variants` table created only if actually needed
- [ ] If variants exist, stock lives on variants only, not the parent product
- [ ] CRUD functions implemented: create, update, archive (not delete), get by slug, list active
- [ ] Indexes added on `slug`, `status`, `category_id`
- [ ] Slug auto-generation logic implemented and tested for uniqueness
- [ ] Basic admin form sketch matches the schema fields

---

## What's Next

With your product data model in place, the next step is making sure stock counts stay accurate as orders come in — that's **Inventory**, next in this phase.
