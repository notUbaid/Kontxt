---
title: Products
slug: products
phase: Phase 3
mode: hackathon
projectType: e-commerce
estimatedTime: 20–30 min
---

# Products

Your product catalog is the data backbone of your entire store. Every page that displays a product — the listing, the detail page, the cart, the order confirmation — pulls from the same source.

Get your data structure right once. Everything else becomes straightforward.

---

## The Core Decision: Where Does Product Data Live?

For a hackathon, you have three options:

| Approach | Setup time | Complexity | Recommended if... |
|---|---|---|---|
| **Static JSON file** | 5 min | Minimal | You have a fixed catalog and no admin needs |
| **Database (SQLite / Postgres)** | 30–60 min | Medium | You want filtering, search, or dynamic inventory |
| **Headless CMS (Contentful, Sanity)** | 45–90 min | Medium-high | Your team has CMS experience and wants a content editor |

> **Hackathon recommendation:** Static JSON. It is fast to set up, trivial to modify, works everywhere, and requires zero infrastructure. Move to a database only if your concept genuinely requires dynamic data (inventory tracking, user-generated products, admin panel).

---

## The Product Data Structure

Define this once. Use it everywhere.

```typescript
// types/product.ts
export interface Product {
  id: string;           // unique slug: "matte-slate-mug"
  name: string;         // "Matte Slate Pour-Over Mug"
  price: number;        // in dollars: 45 (not cents — convert at payment time)
  compareAtPrice?: number; // original price for strikethrough display
  shortDescription: string;
  longDescription: string;
  category: string;     // "mugs" | "accessories" | "bundles"
  images: string[];     // array — first image is primary
  featured: boolean;
  inStock: boolean;
  stockCount?: number;  // optional — drives "Only X left" UI
  tags?: string[];      // optional — for filtering
}
```

> **Use string IDs, not integers.** URL-safe slugs (`matte-slate-mug`) are better than numeric IDs (`42`) for product pages. They're readable, shareable, and require no database sequence.

---

## Static JSON Catalog

```typescript
// data/products.ts
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'matte-slate-mug',
    name: 'Matte Slate Pour-Over Mug',
    price: 45,
    compareAtPrice: 65,
    shortDescription: 'A precision-weight ceramic mug built for the ritual of a slow morning.',
    longDescription: 'The Slate Mug is designed for the pour-over purist...',
    category: 'mugs',
    images: ['/images/slate-mug-1.jpg', '/images/slate-mug-2.jpg'],
    featured: true,
    inStock: true,
    stockCount: 4,
  },
  // ... more products
];

// Helper functions — use these instead of filtering inline everywhere
export const getFeaturedProducts = () =>
  products.filter(p => p.featured);

export const getProductsByCategory = (category: string) =>
  products.filter(p => p.category === category);

export const getProductById = (id: string) =>
  products.find(p => p.id === id);

export const getRelatedProducts = (id: string, limit = 3) =>
  products.filter(p => p.id !== id).slice(0, limit);
```

> **Why helper functions?** You will call these in 5–6 different places. Centralising them means one change fixes everything. Filtering inline in every component means bugs in multiple places.

---

## Routing: Product Detail Pages

Your product URLs should look like `/products/matte-slate-mug` — not `/products/3`.

**Next.js App Router:**

```
app/
  products/
    page.tsx          ← Product Listing (/products)
    [id]/
      page.tsx        ← Product Detail (/products/matte-slate-mug)
```

```typescript
// app/products/[id]/page.tsx
import { getProductById, products } from '@/data/products';
import { notFound } from 'next/navigation';

// Generate static pages for all products at build time
export async function generateStaticParams() {
  return products.map(p => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return <ProductDetailView product={product} />;
}
```

> `generateStaticParams` pre-renders all product pages. Your store loads instantly. This is a 3-line addition that meaningfully improves demo performance.

---

## Product Images: Local vs Remote

**Local images** (in `/public/images/`) are simplest and fastest for a hackathon. No CDN setup, no environment variables, no CORS issues.

**Remote images** (from Unsplash, etc.) require configuration in `next.config.js`:

```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
```

> Without this config, Next.js `<Image>` blocks remote sources. This is a common 30-minute debugging trap. Add it now if you're using remote images.

**Consistent image sizing:** enforce aspect ratio in your Image component to prevent layout shift:

```jsx
<Image
  src={product.images[0]}
  alt={product.name}
  width={600}
  height={600}
  className="object-cover w-full aspect-square"
/>
```

---

## Category Filtering on the Listing Page

Simple, effective, no library needed:

```tsx
const [activeCategory, setActiveCategory] = useState('all');

const categories = ['all', ...new Set(products.map(p => p.category))];

const filtered = activeCategory === 'all'
  ? products
  : products.filter(p => p.category === activeCategory);
```

```tsx
<div className="filter-bar">
  {categories.map(cat => (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat)}
      className={activeCategory === cat ? 'active' : ''}
    >
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  ))}
</div>
```

---

## Use AI to Generate Your Product Data File

```
I'm building a hackathon e-commerce store. Generate a complete TypeScript product data file for my store.

Store details:
- Store name: [name]
- Product category: [category]
- Number of products: [number]
- Price tier: [budget / mid-range / premium]
- Categories: [list your categories]

For each product generate:
- id (URL-safe slug)
- name (specific, brandable)
- price (realistic number)
- compareAtPrice (10–30% higher than price, for 2–3 products only)
- shortDescription (1–2 sentences)
- longDescription (3–5 sentences)
- category
- featured (true for 1–2 products only)
- inStock (true for all, except mark 1 product as false)
- stockCount (low number like 3–6 for 1–2 products)

Format as a valid TypeScript export using this interface:
[paste your Product interface here]

Use placeholder image paths in the format: /images/[product-id]-1.jpg
```

> **Validate the output:**
> - [ ] All IDs are URL-safe (no spaces, lowercase, hyphens only)
> - [ ] No two products have the same ID
> - [ ] Featured is true for no more than 2 products
> - [ ] At least one product has a `compareAtPrice` for demo polish
> - [ ] At least one product has a low `stockCount` for urgency signaling

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Price stored in cents in JSON | Math errors, display bugs | Store in dollars in JSON, convert to cents only when calling Stripe |
| No `notFound()` on missing product | Blank page or crash on bad URL | Always call `notFound()` when `getProductById` returns undefined |
| Images hardcoded in components | Changing a product requires editing components | Always reference `product.images[0]`, never hardcode paths |
| Filtering products in every component | Inconsistent results, hard to maintain | Use the centralised helper functions exclusively |
| No alt text on product images | Accessibility failure, broken if image doesn't load | Always use `product.name` as alt text |

---

## Validate Before You Move On

- [ ] Product interface defined in a shared types file
- [ ] All products defined in a single data file
- [ ] Helper functions created for featured, by-category, by-id, related
- [ ] Product detail pages route via slug, not numeric ID
- [ ] `generateStaticParams` added for static rendering
- [ ] Images render at consistent aspect ratio with no layout shift
- [ ] Category filter works on listing page
- [ ] Navigating to a non-existent product ID shows 404, not a crash
- [ ] No product data hardcoded in any component

---

> **Next module:** Cart →
>
> You'll implement cart state — the piece of logic that connects product pages, the cart view, and checkout into a coherent purchase flow.
