---
title: Product Architecture
slug: product-architecture
phase: Phase 2
mode: personal
projectType: e-commerce
estimatedTime: 30–40 min
---

# Product Architecture

A product is not a database row. It's a system.

A single product listing touches your database schema, your image storage, your search index, your inventory system, your cart logic, and your SEO structure. Designing it correctly now means every downstream system works cleanly. Designing it poorly means rebuilding when you add your tenth product and realize variants don't fit.

This module covers the complete data model and architecture for products in a personal e-commerce store.

---

## The Product Model — What Actually Needs to Exist

Start with what a product actually is in the real world, then model it.

A product is the thing you sell. A variant is a specific purchasable version of that thing. A customer never buys a "T-Shirt" — they buy a "Medium, Navy T-Shirt." That distinction drives your entire data model.

```
Product (the concept)
  └── Variant (the specific purchasable SKU)
        └── has: price, inventory, SKU, option values
  └── Images (belongs to product or specific variant)
  └── Options (the axes of variation: Size, Color, Material)
```

---

## Full Schema

```sql
-- The product concept
products
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid()
  title         text NOT NULL
  slug          text NOT NULL UNIQUE
  description   text
  category_id   uuid REFERENCES categories(id)
  status        text DEFAULT 'draft'  -- draft | active | archived
  tags          text[]
  created_at    timestamptz DEFAULT now()
  updated_at    timestamptz DEFAULT now()

-- The purchasable unit
product_variants
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid()
  product_id          uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE
  sku                 text UNIQUE
  price               integer NOT NULL  -- stored in cents, never floats
  compare_at_price    integer           -- original price for sale display
  inventory_quantity  integer DEFAULT 0
  inventory_policy    text DEFAULT 'deny'  -- deny | continue (oversell allowed?)
  options             jsonb DEFAULT '{}'   -- { "size": "M", "color": "Navy" }
  weight_grams        integer
  is_default          boolean DEFAULT false
  created_at          timestamptz DEFAULT now()

-- Images for product or specific variant
product_images
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  product_id  uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE
  variant_id  uuid REFERENCES product_variants(id) ON DELETE SET NULL
  url         text NOT NULL
  alt         text
  sort_order  integer DEFAULT 0
  created_at  timestamptz DEFAULT now()

-- Option definitions (Size, Color, Material)
product_options
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
  product_id  uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE
  name        text NOT NULL   -- "Size", "Color"
  values      text[]          -- ["S", "M", "L", "XL"]
  sort_order  integer DEFAULT 0
```

---

## Critical Design Decisions

### Store Prices in Cents

Never store prices as floats.

```
-- Wrong
price DECIMAL(10,2)  -- floating point arithmetic causes $49.999999 bugs

-- Right
price INTEGER  -- 4999 = $49.99
```

Convert to display currency only at render time:

```ts
const formatPrice = (cents: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);

formatPrice(4999) // "$49.99"
```

Every financial calculation in your system — cart totals, order totals, refund amounts — happens in integers. This eliminates an entire class of rounding bugs.

---

### The Options + Variants Relationship

A product with Size (S/M/L) and Color (Black/Navy) has 6 possible variants. You need to model this cleanly.

**Options** define the axes. **Variants** represent every combination.

```
product_options:
  { name: "Size",  values: ["S", "M", "L"] }
  { name: "Color", values: ["Black", "Navy"] }

product_variants:
  { options: { size: "S", color: "Black" }, sku: "SHIRT-S-BLK", price: 4999 }
  { options: { size: "S", color: "Navy" },  sku: "SHIRT-S-NVY", price: 4999 }
  { options: { size: "M", color: "Black" }, sku: "SHIRT-M-BLK", price: 4999 }
  ... and so on
```

Storing options as `jsonb` on the variant keeps the schema simple while allowing arbitrary option combinations without new columns.

---

### Simple Products Still Use Variants

A product with no variations (a poster, a candle, a single-size item) should still have one variant record. This keeps your cart, checkout, and order systems uniform — they always reference a `variant_id`, never a `product_id` directly.

```
products: { id: "abc", title: "Beeswax Candle" }
product_variants: { id: "xyz", product_id: "abc", price: 1800, options: {} }
```

Cart items, order items, and inventory all point to `variant_id: "xyz"`. When you later add a "Large" variant, you add a new variant row — no other system changes.

---

### Inventory Policy

`inventory_policy` on a variant controls what happens when stock hits zero:

| Policy | Behavior | Use When |
|---|---|---|
| `deny` | Block purchase when qty = 0 | Physical goods with real inventory |
| `continue` | Allow purchase even at qty = 0 | Pre-orders, made-to-order, digital goods |

Set `deny` as your default. Override to `continue` explicitly for products where overselling is intentional.

---

### Slug Generation

Product slugs must be URL-safe, unique, and stable.

```ts
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')            // spaces to hyphens
    .replace(/-+/g, '-')             // collapse multiple hyphens
    .trim();
}

// "Slim Bifold Leather Wallet" → "slim-bifold-leather-wallet"
```

Generate the slug on product creation. If the slug already exists, append `-2`, `-3`, etc. Never auto-update the slug when the title changes — that breaks URLs and SEO.

---

## Product Status Lifecycle

```
draft → active → archived
  ↑_________↓        ↓
                (never delete)
```

| Status | Visible in storefront | Purchasable |
|---|---|---|
| `draft` | No | No |
| `active` | Yes | Yes |
| `archived` | No | No |

**Never hard-delete products.** Order history references `variant_id`. If you delete a product, order records break. Archive instead. Store a `product_snapshot` on order items (title, image, price at time of purchase) so orders remain readable even if the product is archived.

---

## Image Architecture

Images live in Supabase Storage. The `product_images` table stores metadata and references.

**Storage path structure:**
```
products/{product-id}/{filename}.webp
```

**Two types of images:**
- Product-level images: shown for all variants (main shots, lifestyle)
- Variant-level images: shown only when that variant is selected (color swatches, specific configurations)

Link variant-specific images via `variant_id` on `product_images`. When a customer selects "Navy," your frontend queries for images where `variant_id = navy_variant_id` OR `variant_id IS NULL`.

---

## Product Query Patterns

**Fetch product with all variants and images:**

```ts
const { data: product } = await supabase
  .from('products')
  .select(`
    *,
    product_variants (*),
    product_images (*)
  `)
  .eq('slug', slug)
  .eq('status', 'active')
  .single();
```

**Fetch active catalog for collection page:**

```ts
const { data: products } = await supabase
  .from('products')
  .select(`
    id, title, slug,
    product_variants (id, price, compare_at_price, inventory_quantity),
    product_images (url, alt, sort_order)
  `)
  .eq('status', 'active')
  .eq('category_id', categoryId)
  .order('created_at', { ascending: false });
```

Fetch only what you need per page. The collection page doesn't need full descriptions or all variant options — just enough to render a product card.

---

## AI Prompt — Generate Your Product Schema

<copy-prompt>
I'm building a personal e-commerce store and need a complete product architecture.

My store:
- Products: [describe what you sell]
- Variant types: [list your variation axes — e.g. size, color, material, scent]
- Number of options per axis: [e.g. 5 sizes, 8 colors]
- Catalog size: [approximate number of products at launch]
- Special requirements: [e.g. digital downloads, pre-orders, bundles, custom options]
- Database: Supabase (PostgreSQL)

Generate:
1. Complete SQL schema for products, variants, images, and options — tailored to my variant types
2. TypeScript types that match the schema (for use with Supabase's generated types)
3. A slug generation utility function
4. The 3 most important database indexes for my query patterns
5. Row Level Security policies for: public read on active products, authenticated write for admin
6. Any schema decisions I should make differently given my specific product type

Flag any simplifications I can make if my catalog is smaller than 50 products.
</copy-prompt>

---

## Validating AI Output

- **Prices as floats** — reject any schema using `DECIMAL` or `FLOAT` for price; prices must be `INTEGER` (cents)
- **Hard deletes** — reject any migration with `DELETE FROM products`; archiving is always correct
- **No variant for simple products** — reject any schema where a cart item references `product_id` instead of `variant_id`
- **Missing `ON DELETE CASCADE`** — variant and image records must cascade delete from their parent product
- **Missing `updated_at` trigger** — Supabase doesn't auto-update `updated_at`; a trigger is required or you update it manually

---

## Product Architecture Checklist

- [ ] Prices stored as integers (cents) — never floats
- [ ] All products have at least one variant, even single-option products
- [ ] Cart and order items reference `variant_id`, not `product_id`
- [ ] `options` stored as `jsonb` on variants — flexible for any combination
- [ ] Product images linked at product level and/or variant level
- [ ] `inventory_policy` defined — `deny` as default
- [ ] Slug generated on creation, never auto-updated on title change
- [ ] Product status: `draft | active | archived` — no hard deletes
- [ ] `product_snapshot` planned for order items (title, image, price at purchase)
- [ ] Supabase Storage path structure defined for images
- [ ] RLS policies planned: public read on active, authenticated write for admin
