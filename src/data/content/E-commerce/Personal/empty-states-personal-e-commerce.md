---
title: Empty States
slug: empty-states
phase: Phase 1
mode: personal
projectType: e-commerce
estimatedTime: 15–20 min
---

# Empty States

Empty states are the screens your store shows when there is nothing to display yet. They are among the most neglected UI patterns in e-commerce — and among the most impactful for conversion and trust.

A bad empty state is a dead end. A good empty state is a redirect.

---

## Why Empty States Matter

Every empty state is a moment where a customer has arrived somewhere and found nothing. What happens next determines whether they continue or leave.

If your empty cart says "Your cart is empty" with no further guidance — that is a dead end. If it says "Your cart is empty" with a direct link back to your best-selling product — that is a redirect.

The difference is one line of copy and one button. The conversion impact is real.

---

## The Empty States Your Store Will Encounter

Map every empty state before you build. An unmapped empty state becomes a React rendering error or a blank white box in production.

| Page / Context | When It Appears | Stakes |
|---|---|---|
| Cart — empty | Customer navigates to `/cart` before adding anything | High — they're in purchase intent mode |
| Search — no results | Search query returns zero matches | High — active product-seeking intent |
| Product listing — no products | Filtered to a category with no items | Medium |
| Order history — no orders | Customer account with no past purchases | Low |
| Wishlist — empty | Customer opens wishlist before saving anything | Low |
| Admin — no orders yet | Store just launched, no orders received | Internal only |
| Admin — no products | Product list before first product is added | Internal only |

Focus your design effort on the high-stakes states. The others can be handled with minimal copy and a single CTA.

---

## The Empty State Formula

Every empty state needs three elements:

```
1. Honest acknowledgment    — What is empty and why
2. Helpful context          — What the customer can do about it
3. A clear next action      — One CTA that moves them forward
```

Optional fourth element for brand-appropriate stores:
```
4. A visual               — Icon, illustration, or product image
```

---

## Empty State: Cart

The highest-stakes empty state in your store.

**Bad:**
```
┌─────────────────────────────┐
│                             │
│      Your cart is empty     │
│                             │
└─────────────────────────────┘
```

**Good:**
```
┌─────────────────────────────────────────┐
│                                         │
│         [shopping bag icon]             │
│                                         │
│         Your cart is empty              │
│                                         │
│   Looks like you haven't added          │
│   anything yet.                         │
│                                         │
│       [ Browse Products → ]             │
│                                         │
│  ── You might like ──────────────────   │
│  [Product] [Product] [Product]          │  ← 2–3 featured products
│                                         │
└─────────────────────────────────────────┘
```

The featured products block transforms the dead-end cart into a passive merchandising surface. It does not require purchase history or personalization — just hardcode 2–3 of your best products.

**Copy options (match your brand voice):**

| Voice | Copy |
|---|---|
| Warm, personal | "Nothing here yet — but your next favourite thing is one click away." |
| Minimal, direct | "Your cart is empty. Start browsing." |
| Playful | "Suspiciously empty in here. Let's fix that." |
| Craft/maker | "Your cart is waiting. Every piece is made to order." |

---

## Empty State: Search — No Results

A customer who searched for something had specific intent. Don't lose them.

```
┌─────────────────────────────────────────┐
│                                         │
│   No results for "cedar soy"            │  ← Echo their query
│                                         │
│   Try checking for typos, or browse     │
│   all products to find what you need.   │
│                                         │
│   [ Browse All Products ]               │
│                                         │
│  ── Popular right now ───────────────   │
│  [Product] [Product] [Product]          │
│                                         │
└─────────────────────────────────────────┘
```

**Rules for search empty states:**
- Always echo the query back — confirms you received it
- Never say "Sorry, we couldn't find anything" — remove unnecessary apology
- Suggest typo checking only if your search has no fuzzy matching
- Surface popular or featured products — passive recovery from a dead search

---

## Empty State: Filtered Product Listing

When a customer filters to a category that exists but has no products (or applies a filter combination that returns nothing):

```
┌─────────────────────────────────────────┐
│                                         │
│   No products in this category yet      │
│                                         │
│   [ View All Products ]                 │
│   [ Clear Filters ]                     │
│                                         │
└─────────────────────────────────────────┘
```

Keep this minimal. The user is in browse mode, not purchase mode. A quick redirect is enough.

---

## Empty State: Order History

Shown when a logged-in customer has no past orders. Low stakes but worth handling cleanly.

```
┌─────────────────────────────────────────┐
│                                         │
│   No orders yet                         │
│                                         │
│   When you place an order, it'll        │
│   appear here.                          │
│                                         │
│   [ Shop Now ]                          │
│                                         │
└─────────────────────────────────────────┘
```

---

## Empty State: Admin — No Orders

You will see this on day one. Make it functional, not depressing.

```
┌─────────────────────────────────────────┐
│                                         │
│   No orders yet                         │
│                                         │
│   Orders will appear here once          │
│   customers start purchasing.           │
│                                         │
│   Test your checkout by placing         │
│   a test order.                         │
│                                         │
│   [ View Test Order Guide ]             │
│                                         │
└─────────────────────────────────────────┘
```

Adding a reminder to test checkout is genuinely useful. You should test your own checkout before launch.

---

## Visual Treatment

An icon or illustration in an empty state communicates faster than text alone. But it must be consistent with your design system.

**Options by effort:**

| Approach | Effort | Result |
|---|---|---|
| Plain text only | Minimal | Functional, not memorable |
| System icon (shopping bag, search, box) | Low | Clean, readable |
| Custom line illustration | Medium | Distinctive, brand-aligned |
| Product photography (e.g. "Cart is empty" showing a product) | Low (reuse existing assets) | Branded, conversion-focused |

For a personal store: a simple SVG icon from your icon set (Lucide, Heroicons, Phosphor) is the right choice at launch. Custom illustrations are a post-launch enhancement.

---

## The Empty State Component Pattern

All empty states should share a single composable component. Do not build each one individually.

```tsx
interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  actions: {
    label: string
    href?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
  }[]
  children?: React.ReactNode  // For featured products slot
}

// Usage:
<EmptyState
  icon={<ShoppingBag size={48} />}
  title="Your cart is empty"
  description="Looks like you haven't added anything yet."
  actions={[{ label: 'Browse Products', href: '/products', variant: 'primary' }]}
>
  <FeaturedProducts />
</EmptyState>
```

One component. Configured per context. No duplicated markup.

---

## ✅ Empty States Checklist

- [ ] Cart empty state designed with CTA and optional featured products
- [ ] Search no-results state designed with query echo and CTA
- [ ] Filtered listing empty state designed with clear filters / view all options
- [ ] Order history empty state handled (if accounts are in scope)
- [ ] Admin orders empty state handled with test checkout reminder
- [ ] All empty states have at least one clear next action
- [ ] Empty state copy matches brand voice from Brand Vision module
- [ ] Single reusable `<EmptyState>` component planned (not per-page implementations)
- [ ] Visual treatment decided (icon / illustration / photo) and consistent across all states

---

## AI Prompt — Generate All Empty State Copy

```
I am building a personal e-commerce store.

Brand voice: sounds like [X], not like [Y]
Brand personality: [3 adjectives]
Product type: [description]

Generate copy for the following empty states. For each, provide:
- A heading (max 6 words)
- A supporting sentence (max 20 words)
- A CTA label (max 4 words)

Empty states needed:
1. Cart — empty
2. Search — no results (use "[search query]" as placeholder for the echoed query)
3. Product listing — filtered with no results
4. Order history — no past orders
5. Wishlist — nothing saved yet

Write in my brand voice. No generic e-commerce defaults. No "Oops!" or "Sorry!"
```

---

## What Comes Next

Empty states handle the absence of content. Error states handle the presence of something going wrong. They are related but distinct — and in e-commerce, error states directly touch payment flows where the stakes are highest.

**Next: Error States →**
