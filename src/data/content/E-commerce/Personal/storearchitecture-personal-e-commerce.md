---
title: Store Architecture
slug: store-architecture
phase: Phase 1
mode: personal
projectType: e-commerce
estimatedTime: 30–40 min
---

# Store Architecture

Architecture is the set of decisions that are expensive to change later.

Choosing the wrong URL structure after launch means broken links and lost SEO. Choosing the wrong data relationships means rewriting your entire product system when you add variants. These decisions happen in Phase 1 — before any code — because fixing them post-launch costs ten times more than getting them right now.

This module covers the structural decisions your store needs before design becomes implementation.

---

## What Store Architecture Actually Means

Architecture is not your tech stack. It's the skeleton everything else is built on:

- How your pages are structured and connected
- How your URLs are organized
- How products, categories, and variants relate to each other
- How data flows from catalog → cart → checkout → order
- What your store can and cannot scale to without a rewrite

---

## Page Structure

Every e-commerce store is built from a finite set of page types. Define yours now.

**Core pages — every store needs these:**

| Page | URL Pattern | Purpose |
|---|---|---|
| Homepage | `/` | First impression, brand, featured products |
| Collection / Category | `/collections/:slug` | Browse by category |
| Product Detail | `/products/:slug` | Convert browsers into buyers |
| Cart | `/cart` | Review before checkout |
| Checkout | `/checkout` | Capture payment |
| Order Confirmation | `/orders/:id/confirmation` | Post-purchase trust |
| Account | `/account` | Order history, saved addresses |
| Search Results | `/search?q=` | Discovery via search |

**Supporting pages — add what applies:**

| Page | URL Pattern |
|---|---|
| About | `/about` |
| Contact | `/contact` |
| Shipping Policy | `/shipping` |
| Return Policy | `/returns` |
| Privacy Policy | `/privacy` |
| Terms of Service | `/terms` |
| FAQ | `/faq` |

> **Tip:** Policy pages are not optional. They're required for payment processor approval (Stripe, PayPal) and for customer trust. Build them before launch, not after.

---

## URL Design

URLs are permanent. Changing them after launch breaks external links, bookmarks, and SEO rankings.

**Rules:**

- Lowercase only — `/products/leather-wallet` not `/products/Leather-Wallet`
- Hyphens, not underscores — `/products/leather-wallet` not `/products/leather_wallet`
- No IDs in product URLs — `/products/leather-wallet` not `/products/14823`
- Slugs should be human-readable and descriptive
- Category slugs should reflect actual category names

**Good URL structure:**
```
/collections/wallets
/collections/wallets/leather
/products/slim-bifold-leather-wallet
/products/canvas-tote-bag
```

**Bad URL structure:**
```
/category?id=4
/item/14823
/p/slim_Bifold_Leather_Wallet_v2
```

> **Warning:** If your product name changes, your slug should not automatically change. A product titled "Slim Bifold Wallet" that gets renamed to "Classic Bifold Wallet" should keep `/products/slim-bifold-wallet` unless you set up a redirect. Breaking URLs costs SEO authority that took months to build.

---

## Product Data Architecture

This is the most important structural decision in your store. Get it wrong and you'll rebuild your entire product system.

**The core question: do your products have variants?**

| Product Type | Examples | Architecture Needed |
|---|---|---|
| Simple product | Poster, digital download, single candle | `Product` only |
| Product with variants | T-shirt (S/M/L), shoe (size + color) | `Product` + `Variant` |
| Product with options | Custom engraving, gift wrapping | `Product` + `Option` |
| Bundle | Gift set, starter kit | `Product` + `Bundle` |

**Most physical stores need variants.** Even if your MVP only sells one size, building without variant support means a full rewrite the moment you add one.

**Recommended data model:**

```
Product
  ├── id
  ├── title
  ├── slug
  ├── description
  ├── images[]
  ├── category_id
  ├── status (active | draft | archived)
  └── variants[]
        ├── id
        ├── sku
        ├── price
        ├── compare_at_price (for sales)
        ├── inventory_quantity
        ├── options { size, color, ... }
        └── images[]
```

Even if you only ever have one variant per product, this structure costs you nothing. Flattening it saves you nothing and costs you everything when you scale.

---

## Category Architecture

**Flat vs. hierarchical:**

| Structure | Example | Use When |
|---|---|---|
| Flat | Wallets, Bags, Belts | Under 20 products, simple catalog |
| Two-level | Accessories > Wallets, Accessories > Bags | 20–200 products |
| Three-level | Clothing > Men's > Jackets | 200+ products, department-store scale |

For a personal store, flat or two-level is almost always right. Three levels adds navigation complexity that hurts conversion more than it helps discovery.

**Category data model:**

```
Category
  ├── id
  ├── title
  ├── slug
  ├── description
  ├── image
  ├── parent_id (null for top-level)
  └── sort_order
```

---

## Cart Architecture

**Session-based vs. persistent cart:**

| Type | How It Works | Use When |
|---|---|---|
| Session cart | Stored in browser (localStorage / cookie) | Guest users, simple stores |
| Persistent cart | Stored in database, tied to account | Logged-in users |
| Hybrid | Session for guests, syncs on login | Best UX, most stores |

For a personal project, start with a session cart. Build persistent cart when you have user accounts working.

**What lives in the cart:**

```
Cart
  ├── id (session ID or user ID)
  ├── items[]
  │     ├── variant_id
  │     ├── quantity
  │     ├── price_at_time_of_add  ← snapshot, not live
  │     └── product snapshot { title, image, slug }
  ├── created_at
  └── updated_at
```

> **Warning:** Store the price at the time the item was added, not a live reference to the current price. If you run a flash sale and a user added items before the sale, they should get the original price. If someone adds to cart, leaves, and the price changes — that's a business decision, not a technical one, but you need the snapshot to make it.

---

## Checkout Flow Architecture

```
Cart Review
    ↓
Contact Info (email)
    ↓
Shipping Address
    ↓
Shipping Method Selection
    ↓
Payment
    ↓
Order Review + Place Order
    ↓
Confirmation
```

**Single-page vs. multi-step:**

Single-page checkout (everything on one page) feels faster but is harder to build and debug. Multi-step is easier to implement and easier to add analytics to (you can see exactly where users drop off).

For a personal project: multi-step. You can optimize to single-page later.

---

## Order Lifecycle

Define your order states before you build. Adding new states later breaks existing order handling logic.

```
pending → confirmed → processing → shipped → delivered
                                           → cancelled
                                           → refunded
                         → cancelled
              → cancelled
```

**Order states:**

| State | Meaning |
|---|---|
| `pending` | Payment initiated, not confirmed |
| `confirmed` | Payment successful, awaiting fulfillment |
| `processing` | Being packed / prepared |
| `shipped` | Dispatched, tracking available |
| `delivered` | Confirmed delivered |
| `cancelled` | Cancelled before shipment |
| `refunded` | Refunded after payment |

---

## AI Prompt — Design Your Store Architecture

<copy-prompt>
I'm building a personal e-commerce store with the following details:

- Products: [describe what you sell]
- Variants: [yes/no — describe variant types e.g. size, color]
- Categories: [list your planned categories]
- Expected catalog size: [approximate number of products]
- User accounts: [yes/no]

Design the complete store architecture for me:

1. Full URL structure for every page type I'll need
2. Product and variant data model (as a schema with field names and types)
3. Category structure recommendation (flat / two-level / three-level and why)
4. Cart architecture recommendation (session / persistent / hybrid and why)
5. Order states I'll need with valid transitions between them
6. Any architectural decisions specific to my product type I should make now

Flag any decision that would be expensive to change after launch.
</copy-prompt>

---

## Validating AI Output

When reviewing the architecture output, check for:

- **Missing variant support** — if you sell any physical product, variants should exist even if your first product only has one
- **ID-based URLs** — AI sometimes generates `/products/:id` instead of `/products/:slug`; reject this
- **Missing price snapshot in cart** — a cart item that references live price instead of snapshotting it at add-time is a billing bug waiting to happen
- **Incomplete order states** — check for `refunded` and `cancelled` states; AI often forgets edge cases
- **Overcomplicated category hierarchy** — for a personal store, flat or two-level is almost always correct; push back if AI recommends three levels

---

## Architecture Decisions Checklist

- [ ] Page types defined with URL patterns
- [ ] URL structure: lowercase, hyphenated, slug-based (not ID-based)
- [ ] Product model supports variants, even if current catalog doesn't use them
- [ ] Category hierarchy decided (flat / two-level)
- [ ] Cart type decided (session / persistent / hybrid)
- [ ] Price snapshot in cart (not live price reference)
- [ ] Order states defined with valid transitions
- [ ] Policy pages planned (shipping, returns, privacy, terms)
