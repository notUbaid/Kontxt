---
title: Frontend
slug: frontend
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 35–50 min
---

# Frontend

The frontend is what customers actually experience. Every architectural decision you've made — cart logic, checkout flow, product variants — now becomes UI. This module covers how to structure your component tree, manage state, fetch data efficiently, and build a storefront that feels fast and coherent.

---

## Technology Assumptions

This module assumes:
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** for base components (or equivalent)
- **TanStack Query** (React Query) for server state
- **Zustand** for client state (cart UI)

If your stack differs, the patterns translate — the library names change, not the thinking.

---

## Folder Structure

Organise by feature, not by file type. Flat folders full of `components/Button.tsx`, `components/Card.tsx` scale badly. Feature folders scale well.

```
app/
├── (store)/                    ← customer-facing pages
│   ├── layout.tsx              ← store shell (header, footer)
│   ├── page.tsx                ← homepage
│   ├── products/
│   │   ├── page.tsx            ← product listing
│   │   └── [slug]/
│   │       └── page.tsx        ← product detail
│   ├── cart/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── orders/
│   │   ├── page.tsx            ← order history
│   │   └── [id]/page.tsx       ← order detail
│   └── account/
│       └── page.tsx
├── (admin)/                    ← admin-only pages
│   ├── layout.tsx              ← admin shell + auth guard
│   └── admin/
│       ├── page.tsx            ← dashboard
│       ├── products/page.tsx
│       └── orders/page.tsx
└── api/                        ← backend (already built)

components/
├── ui/                         ← shadcn/ui primitives (Button, Input, etc.)
├── store/                      ← store-specific components
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductImages.tsx
│   ├── VariantSelector.tsx
│   ├── AddToCartButton.tsx
│   ├── CartDrawer.tsx
│   ├── CartItem.tsx
│   └── PriceDisplay.tsx
├── checkout/
│   ├── AddressForm.tsx
│   ├── ShippingSelector.tsx
│   └── PaymentForm.tsx
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Nav.tsx
│   └── CartIcon.tsx
└── shared/
    ├── LoadingSpinner.tsx
    ├── EmptyState.tsx
    └── ErrorBoundary.tsx

lib/
├── api/                        ← typed fetch wrappers for each endpoint
│   ├── products.ts
│   ├── cart.ts
│   ├── orders.ts
│   └── checkout.ts
├── store/                      ← Zustand stores
│   └── cart.ts
└── utils/
    ├── price.ts                ← formatPrice, formatCurrency
    └── cn.ts                   ← Tailwind class merging
```

---

## Data Fetching Strategy

The App Router gives you two distinct data fetching contexts. Use each for what it's good at.

```
Server Components (default)           Client Components (opt-in)
────────────────────────────          ──────────────────────────
Runs on the server                    Runs in the browser
Direct DB access or fetch             Must use fetch / API calls
No client-side state                  Can use useState, useEffect
Fast initial load, SEO-friendly       Necessary for interactivity
No hydration cost                     Requires hydration

Use for:                              Use for:
  Product listings                      Cart drawer
  Product detail pages                  Variant selection
  Order history                         Add to cart button
  Homepage                              Search input
                                        Checkout form
                                        Payment form
```

**Default to Server Components.** Add `'use client'` only when you need interactivity or browser APIs. Every unnecessary client component increases bundle size and hydration cost.

```tsx
// app/(store)/products/[slug]/page.tsx
// Server Component — no 'use client'

import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { ProductImages } from '@/components/store/ProductImages'
import { AddToCartButton } from '@/components/store/AddToCartButton'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await db.product.findUnique({
    where: { slug: params.slug, isActive: true },
    include: {
      images: { orderBy: { position: 'asc' } },
      variants: { where: { isActive: true } },
      category: true,
    }
  })

  if (!product) notFound()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductImages images={product.images} />       {/* Server Component */}
      <div>
        <h1>{product.name}</h1>
        <PriceDisplay price={product.basePrice} />
        <AddToCartButton product={product} />          {/* Client Component */}
      </div>
    </div>
  )
}
```

---

## Cart State: The Critical Decision

The cart is the most stateful part of your UI. It must:
- Be accessible from any page (header icon, drawer)
- Update instantly on add/remove without full page reload
- Stay in sync with the server

**Recommended approach: Zustand for optimistic UI + React Query for server sync.**

```ts
// lib/store/cart.ts
import { create } from 'zustand'

interface CartItem {
  id: string
  productId: string
  variantId?: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  setItems: (items: CartItem[]) => void
  optimisticAdd: (item: CartItem) => void
  optimisticRemove: (itemId: string) => void
  optimisticUpdateQty: (itemId: string, quantity: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  setItems: (items) => set({ items }),
  optimisticAdd: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  optimisticRemove: (itemId) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== itemId) })),
  optimisticUpdateQty: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((i) => i.id === itemId ? { ...i, quantity } : i)
    })),
}))
```

```tsx
// components/store/AddToCartButton.tsx
'use client'

import { useCartStore } from '@/lib/store/cart'
import { addToCart } from '@/lib/api/cart'

export function AddToCartButton({ product, variantId }: Props) {
  const { optimisticAdd, openCart } = useCartStore()
  const [isPending, setIsPending] = useState(false)

  async function handleAdd() {
    setIsPending(true)

    // Optimistic update — feels instant
    optimisticAdd({
      id: 'temp-' + Date.now(),
      productId: product.id,
      variantId,
      name: product.name,
      price: product.basePrice,
      quantity: 1,
      imageUrl: product.images[0]?.url ?? ''
    })
    openCart()

    try {
      // Actual server call
      const updatedCart = await addToCart({ productId: product.id, variantId, quantity: 1 })
      // Replace optimistic data with real server data
      useCartStore.getState().setItems(updatedCart.items)
    } catch (e) {
      // Rollback on failure
      useCartStore.getState().optimisticRemove('temp-' + Date.now())
      toast.error('Failed to add to cart')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button onClick={handleAdd} disabled={isPending}>
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
```

Optimistic updates make your UI feel instant. Always roll back on failure.

---

## Price Formatting

Money is stored as integers (paise). Always format it before display. Never format it in-line across the codebase.

```ts
// lib/utils/price.ts

export function formatPrice(paise: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(paise / 100)
}

// Usage
formatPrice(149900)  // → ₹1,499
formatPrice(9900)    // → ₹99
```

Create a `<PriceDisplay>` component that wraps this. Every price in your UI goes through this single function. When you add discount logic later, you change one place.

---

## Typed API Client

Every frontend API call goes through a typed wrapper. No raw `fetch` calls scattered across components.

```ts
// lib/api/cart.ts

import type { Cart } from '@prisma/client'

const BASE = '/api'

export async function fetchCart(): Promise<Cart> {
  const res = await fetch(`${BASE}/cart`)
  if (!res.ok) throw new Error('Failed to fetch cart')
  return res.json()
}

export async function addToCart(input: {
  productId: string
  variantId?: string
  quantity: number
}): Promise<Cart> {
  const res = await fetch(`${BASE}/cart/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error ?? 'Failed to add to cart')
  }
  return res.json()
}

export async function removeCartItem(itemId: string): Promise<void> {
  const res = await fetch(`${BASE}/cart/items/${itemId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to remove item')
}
```

This gives you one place to handle auth headers, error parsing, and base URL changes.

---

## Key Pages to Build

### Product Listing (`/products`)

- Server Component — fetch products with filters
- URL-driven filters: `?category=apparel&sort=price-asc&page=2`
- Filter sidebar (category, price range, in-stock)
- ProductGrid renders ProductCards
- Pagination or infinite scroll
- Search input — client-side, debounced, hits `/api/products?q=`

### Product Detail (`/products/[slug]`)

- Server Component for product data
- `<ProductImages>` — image gallery, client component for interaction
- `<VariantSelector>` — colour/size picker, updates selected variant in state
- `<AddToCartButton>` — client component
- Stock status display (In Stock / Low Stock / Out of Stock)
- Related products (same category, server-rendered)

### Cart (`/cart` or drawer)

- Full cart page for desktop fallback
- CartDrawer component — slides in from right, triggered by header icon
- Item list with quantity controls and remove buttons
- Subtotal, free shipping progress bar
- "Proceed to Checkout" CTA
- Empty state with "Continue Shopping" link

### Checkout (`/checkout`)

- Client Component — multi-step form, heavy interactivity
- Step 1: Address form (validate with Zod on submit)
- Step 2: Shipping selector (fetch options after address)
- Step 3: Payment (Stripe Elements)
- Order summary sidebar stays visible throughout
- Never navigate away on payment — handle all states in-place

### Order Confirmation (`/orders/[id]`)

- Server Component
- Full order detail: items, address, total
- Order number prominently displayed
- "Continue Shopping" CTA

---

## Loading and Error States

Every async operation needs three states: loading, error, data. Build these once as reusable components.

```tsx
// components/shared/EmptyState.tsx
export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

// Usage: empty cart
<EmptyState
  title="Your cart is empty"
  description="Add something to get started."
  action={<Link href="/products">Browse products</Link>}
/>
```

Design empty states as invitations to act, not apologies for having nothing.

---

## Performance Defaults

These cost nothing to implement and prevent common performance problems:

**Image optimisation:** Use Next.js `<Image>` for all product images. It handles lazy loading, WebP conversion, and responsive sizes automatically.

```tsx
import Image from 'next/image'

<Image
  src={image.url}
  alt={image.altText ?? product.name}
  width={600}
  height={800}
  className="object-cover"
  priority={isFirstImage}   // ← only for above-the-fold images
/>
```

**Metadata for SEO:** Add `generateMetadata` to product and category pages.

```ts
export async function generateMetadata({ params }: Props) {
  const product = await getProduct(params.slug)
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.images[0]?.url],
    }
  }
}
```

**Skeleton loading:** Use Suspense boundaries with skeleton UIs rather than full-page spinners.

```tsx
// app/(store)/products/page.tsx
import { Suspense } from 'react'
import { ProductGridSkeleton } from '@/components/store/ProductGrid'

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGrid />
    </Suspense>
  )
}
```

---

## AI Prompt: Frontend Architecture Review

```
You are a senior frontend engineer reviewing a storefront implementation for a personal e-commerce project.

FRAMEWORK: Next.js App Router
STYLING: Tailwind CSS + shadcn/ui
STATE: Zustand (cart) + React Query (server state)

COMPONENT STRUCTURE:
[paste your component folder structure]

CART STATE APPROACH:
[describe how cart state is managed and synced with the server]

DATA FETCHING PATTERN:
[describe how you split server vs client components]

KEY PAGES:
[list your main pages and their rendering strategy]

Review for:
1. Unnecessary client components that should be server components
2. Missing loading / error / empty states
3. Cart state sync problems (optimistic update gaps, stale data)
4. N+1 data fetching (components that fetch individually instead of together)
5. Missing SEO metadata on product pages
6. Performance issues (unoptimised images, missing Suspense boundaries)

Be specific. Flag critical issues first.
```

---

## Validation Checklist

- [ ] Server Components used by default; `'use client'` only where necessary
- [ ] Product listing and detail pages are Server Components
- [ ] Cart UI is client-side with optimistic updates and server sync
- [ ] Zustand cart store initialised from server on first load
- [ ] All API calls go through typed wrappers in `lib/api/`
- [ ] `formatPrice()` used for every price display — no inline division by 100
- [ ] `<Image>` used for all product images with `alt` text
- [ ] `priority` set only on above-the-fold images
- [ ] `generateMetadata` added to product and category pages
- [ ] Suspense boundaries wrapping async Server Components
- [ ] Skeleton UIs built for product grid and product detail
- [ ] Empty states designed for: empty cart, no search results, no orders
- [ ] Checkout form validates client-side before submitting
- [ ] Payment form uses Stripe Elements — no custom card input fields
- [ ] Admin pages protected by layout-level auth guard

---

## What to Build Next

**Payments** — the payment form and Stripe Elements integration lives at the boundary of frontend and backend. The payments module walks through the exact Stripe.js implementation, 3DS handling, and the success/failure UI states your checkout needs.

---

> **Filename:** `frontend-personal-e-commerce.md`
