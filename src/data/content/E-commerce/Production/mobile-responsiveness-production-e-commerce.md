---
title: Mobile Responsiveness
slug: mobile-responsiveness
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Mobile Responsiveness

Over 70% of e-commerce traffic is mobile. Most of that traffic converts at half the rate of desktop — not because people don't want to buy on mobile, but because most stores are designed on desktop and adapted to mobile as an afterthought.

Mobile-first is not a trend. It's where your customers are.

This module covers how to design and build a store that works natively on mobile — not one that shrinks to fit.

---

## Mobile-First vs. Responsive

These are not the same thing.

| Approach | What It Means | Result |
|---|---|---|
| **Desktop-first** | Design for desktop, shrink for mobile | Mobile feels cramped, broken |
| **Responsive** | Design for desktop, add mobile breakpoints | Mobile works but feels like an afterthought |
| **Mobile-first** | Design for mobile, enhance for desktop | Mobile feels native, desktop feels rich |

For e-commerce, mobile-first is the only approach worth building. Start every component by asking: *how does this work on a 390px screen?* Then enhance for larger viewports.

---

## The Five Mobile-Critical Surfaces

These are the screens where mobile UX directly determines whether you make a sale.

### 1 — Homepage

**Desktop:** Hero image with text overlay, 3-column featured products, full navigation bar.

**Mobile:**
```
┌─────────────────────┐
│ [☰]   BRAND    [🛒] │  ← Hamburger + cart icon only
├─────────────────────┤
│                     │
│   [Hero image]      │  ← Full width, 60vh max
│   Headline          │
│   [Shop Now]        │
│                     │
├─────────────────────┤
│ [Product] [Product] │  ← 2-column grid
│ [Product] [Product] │
└─────────────────────┘
```

Keep the mobile nav minimal. A full desktop nav bar on mobile is a wall of text. Hamburger menu for categories, persistent cart icon in the top right, logo centered.

---

### 2 — Product Grid

**Desktop:** 3–4 columns.

**Mobile:** 2 columns is the standard. 1 column only for stores with large lifestyle images.

**Card sizing on mobile:**
- Images: square (1:1) or portrait (4:5) — never landscape on mobile grid
- Title: 2 lines max, truncate with ellipsis after that
- Price: always visible without interaction
- No hover states — mobile has no hover; anything that reveals on hover is invisible on mobile

```
┌──────────┐ ┌──────────┐
│          │ │          │
│  [img]   │ │  [img]   │
│          │ │          │
│ Title    │ │ Title    │
│ $XX.XX   │ │ $XX.XX   │
└──────────┘ └──────────┘
```

---

### 3 — Product Page

The most complex mobile layout in your store.

**Component order (mobile, top to bottom):**
```
[Image carousel — full width, swipeable]
[Product title]
[Rating + review count]
[Price]
[Variant selectors — full width buttons]
[Add to Cart — full width, high contrast]
[Trust signals — icons + short text]
[Description — collapsed by default if long]
[Reviews]
[Related products — horizontal scroll]
```

**Sticky Add to Cart:**
As the user scrolls past the CTA, show a persistent bottom bar:

```
┌─────────────────────────────────┐
│ $89.00          [Add to Cart]   │  ← Sticky bottom bar
└─────────────────────────────────┘
```

This is the single highest-impact mobile conversion optimization you can implement. Users read descriptions and reviews before buying — make the buy action available wherever they are on the page.

**Image carousel:**
- Full-width swipeable carousel, not a side-by-side gallery
- Dot indicators showing position (don't show thumbnails — too small to tap)
- Support both swipe gesture and tap-to-advance

---

### 4 — Cart

**Mobile cart layout:**
- Full-screen page (not a slide-out drawer — drawers are harder to interact with on mobile)
- Each item: thumbnail left, details right, quantity control and remove accessible without precision tapping
- Order summary sticky at bottom with "Proceed to Checkout" button

**Touch target rules:**
All interactive elements (buttons, quantity +/-, remove) must be at minimum 44×44px. Anything smaller fails Apple's Human Interface Guidelines and frustrates users with average-sized fingers.

---

### 5 — Checkout

Mobile checkout is where most sales die.

**Critical mobile checkout requirements:**

- Input fields must trigger the correct keyboard — email field opens email keyboard, phone opens numeric, postal code opens numeric
- No horizontal scrolling at any step
- Form labels above inputs (not placeholder-only labels — they disappear when typing)
- Error messages below the field, in red, specific
- One-tap payment (Apple Pay on iOS, Google Pay on Android) as the prominent option

```
┌─────────────────────────────┐
│  [  Pay with Apple Pay  ]   │  ← Prominent, above card form
│  ─────────── or ──────────  │
│  Card number                │
│  [____________________]     │
│  Expiry      CVC            │
│  [_______]   [___]          │
│                             │
│  [  Place Order — $89.00 ]  │
└─────────────────────────────┘
```

---

## Breakpoints

Use these as your standard breakpoints. Don't invent custom ones without a reason.

| Name | Width | Target |
|---|---|---|
| `sm` | 640px | Large phones (landscape) |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape), small laptops |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

With Tailwind, these map directly to prefixes: `sm:`, `md:`, `lg:`, `xl:`.

**For a personal e-commerce store, you realistically need three states:**
- Mobile (< 768px) — your primary design target
- Tablet (768px–1024px) — usually a 2-column product grid, desktop nav starts appearing
- Desktop (> 1024px) — full experience

---

## Typography on Mobile

Text that works on desktop often fails on mobile.

| Element | Desktop | Mobile |
|---|---|---|
| Body text | 16px | 16px minimum (never go below) |
| Product title (grid) | 14–16px | 13–14px acceptable |
| Product title (PDP) | 24–28px | 20–24px |
| Price | 18–20px | 18px |
| CTA button | 16px | 16–18px |
| Navigation | 14px | Hidden behind hamburger |

Line height on mobile: 1.5–1.6 for body text. Tighter line-height feels cramped on small screens.

---

## Images and Performance

Mobile users are often on slower connections and paying for data. Image performance is not optional.

**Rules:**
- Use `srcset` to serve appropriately sized images — a 1200px product image served to a 390px screen wastes bandwidth and slows load
- Use WebP format — 25–35% smaller than JPEG at equivalent quality
- Compress before upload — target under 200KB per product image
- Use `loading="lazy"` on below-the-fold images
- Never use `loading="lazy"` on the first visible image

```html
<img
  src="product-400.webp"
  srcset="product-400.webp 400w, product-800.webp 800w, product-1200.webp 1200w"
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
  alt="Slim Bifold Leather Wallet in Tan"
  loading="lazy"
/>
```

---

## Common Mobile Mistakes

> **Tap targets too small.** Quantity controls, remove buttons, filter chips — if a user needs to zoom to tap it, it's broken. Minimum 44×44px for anything interactive.

> **Horizontal scroll on mobile.** One element that overflows its container causes the entire page to scroll horizontally. Test every page at 390px width. A horizontal scrollbar means something is broken.

> **Input zoom on iOS.** iOS Safari automatically zooms in when an input field has `font-size` smaller than 16px. This breaks your layout and disorients users. Set `font-size: 16px` minimum on all inputs.

> **Fixed elements blocking content.** A sticky header + sticky bottom bar + cookie banner can consume 30% of a mobile screen. Audit how much of your viewport is occupied by fixed UI before the user sees any content.

> **Hover-only interactions.** Tooltips, secondary actions, and quick-add buttons that only appear on hover are invisible on mobile. Every interactive feature must be accessible via tap.

---

## Testing Protocol

Don't rely on browser DevTools alone. DevTools simulates screen size — it doesn't simulate touch, thumb reach, or real network conditions.

**Test on real devices when possible. When not:**

| Test | How |
|---|---|
| Screen sizes | DevTools → Device toolbar → iPhone 14 Pro (393px), Pixel 7 (412px) |
| Slow network | DevTools → Network → Slow 3G |
| Touch targets | DevTools → Toggle device toolbar → tap to see exact tap zones |
| Input keyboards | Real device or BrowserStack |
| iOS Safari quirks | Real iPhone or BrowserStack — Safari on iOS behaves differently to Chrome's mobile emulation |

---

## AI Prompt — Audit Your Mobile Layout

<copy-prompt>
I'm building a personal e-commerce store and want to audit my mobile responsiveness before development begins.

My store has these pages:
- Homepage with hero + featured products
- Product collection/grid page
- Product detail page with [list your variant types]
- Cart
- Multi-step checkout

For each page, tell me:
1. The recommended mobile component order (top to bottom)
2. What changes between mobile and desktop layout
3. The most common mobile UX mistake for this page type
4. Any specific Tailwind classes or CSS patterns I should use to implement the responsive behavior

Also tell me:
- Which breakpoints I actually need for this store (not all five)
- The three mobile-specific components that will most impact my conversion rate
- What to test on a real device vs. what DevTools simulation is sufficient for
</copy-prompt>

---

## Mobile Responsiveness Checklist

- [ ] Designed mobile layout first, desktop second
- [ ] Navigation collapses to hamburger + cart icon on mobile
- [ ] Product grid is 2-column on mobile
- [ ] Product images use full-width swipeable carousel on mobile
- [ ] Sticky Add to Cart bar on product page (mobile)
- [ ] All touch targets are minimum 44×44px
- [ ] No horizontal scroll at 390px width
- [ ] Input fields have `font-size: 16px` minimum (prevents iOS zoom)
- [ ] Apple Pay / Google Pay shown prominently in mobile checkout
- [ ] Images use `srcset` and WebP format
- [ ] Lazy loading on below-the-fold images only
- [ ] Tested on at minimum iPhone 14 Pro (393px) and Pixel 7 (412px) viewport sizes
- [ ] Slow 3G test performed — all loading states visible and functional
