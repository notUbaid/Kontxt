---
title: Wireframes
slug: wireframes
phase: Phase 1
mode: personal
projectType: e-commerce
estimatedTime: 25–35 min
---

# Wireframes

Wireframes are layout decisions made cheaply. Every structural choice you make in a wireframe would cost ten times more to change after the design system is built and twenty times more after development.

This module does not teach you to use a design tool. It teaches you what decisions to make and how to make them fast.

---

## What Wireframes Are Not

- Not visual design (no colors, no fonts, no brand)
- Not pixel-perfect layouts
- Not a deliverable for a client
- Not something that requires Figma to produce

A wireframe is a structural agreement with yourself: what goes where, in what order, with what hierarchy. Everything else comes later.

---

## The Wireframing Stack for Personal Projects

You have three options. Pick one and move.

| Tool | Best For | Cost |
|---|---|---|
| **Figma** (free tier) | If you're comfortable with it | Free |
| **Excalidraw** | Fast, rough, zero friction | Free |
| **Paper + photo** | Absolute fastest, no setup | Free |

Do not spend more than 30 minutes choosing a tool. The wireframe is not the output — the layout decision is.

> 💡 **Tip**
>
> For a personal store, Excalidraw is the pragmatic choice. It's fast, shareable, and produces rough enough output that you won't waste time polishing boxes instead of thinking about layout.

---

## What to Wireframe

You do not need wireframes for every page. Wireframe only the pages where layout decisions meaningfully affect conversion or complexity.

**Must wireframe:**
- Homepage
- Product Detail Page
- Cart
- Checkout

**Useful but optional:**
- Product Listing Page (if you have filters or complex grid logic)
- Order Confirmation Page

**Skip:**
- About, Contact, simple informational pages — these are content decisions, not layout decisions

---

## Wireframe 1 — Homepage

The homepage has one job: get the customer to a product. Measure every layout decision against that.

### Desktop Layout

```
┌─────────────────────────────────────────────────┐
│  LOGO              Products  About  Contact  🛒  │  ← Nav
├─────────────────────────────────────────────────┤
│                                                 │
│         HERO IMAGE or BRAND STATEMENT           │  ← Full width
│                                                 │
│              [ Shop Now ]                       │  ← Single CTA
│                                                 │
├─────────────────────────────────────────────────┤
│  ── Featured Products ──────────────────────    │
│                                                 │
│  ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐    │  ← 4-col grid
│  │ IMG  │   │ IMG  │   │ IMG  │   │ IMG  │    │
│  │      │   │      │   │      │   │      │    │
│  │Name  │   │Name  │   │Name  │   │Name  │    │
│  │₹999  │   │₹799  │   │₹1299 │   │₹499  │    │
│  └──────┘   └──────┘   └──────┘   └──────┘    │
│                                                 │
│              [ View All Products ]              │
├─────────────────────────────────────────────────┤
│  ── Brand Strip ───────────────────────────     │
│  Short story / trust statement  |  About link   │
├─────────────────────────────────────────────────┤
│  Footer: Links | Policy | Contact | Social      │
└─────────────────────────────────────────────────┘
```

### Mobile Layout

```
┌──────────────────────┐
│ LOGO           🛒 ☰  │  ← Hamburger nav
├──────────────────────┤
│                      │
│   HERO IMAGE         │  ← Full bleed
│                      │
│   Brand Statement    │
│   [ Shop Now ]       │
│                      │
├──────────────────────┤
│  Featured Products   │
│  ┌──────┐ ┌──────┐  │  ← 2-col grid
│  │ IMG  │ │ IMG  │  │
│  │Name  │ │Name  │  │
│  │₹999  │ │₹799  │  │
│  └──────┘ └──────┘  │
│  ┌──────┐ ┌──────┐  │
│  │ IMG  │ │ IMG  │  │
│  └──────┘ └──────┘  │
│  [ View All ]        │
├──────────────────────┤
│  Brand strip         │
├──────────────────────┤
│  Footer              │
└──────────────────────┘
```

---

## Wireframe 2 — Product Detail Page

This is your highest-stakes layout. It converts browsers into buyers.

### Desktop Layout

```
┌─────────────────────────────────────────────────┐
│  NAV                                       🛒 2 │
├─────────────────────────────────────────────────┤
│  Home > Candles > Cedar & Smoke                  │  ← Breadcrumb
├──────────────────────┬──────────────────────────┤
│                      │  Product Name             │
│  ┌────────────────┐  │  ₹999  ~~₹1299~~          │
│  │                │  │                           │
│  │  MAIN IMAGE    │  │  ── Variant Selector ──   │
│  │                │  │  Scent: [Cedar] [Vanilla]  │
│  │                │  │         [Smoke]            │
│  └────────────────┘  │                           │
│                      │  Qty: [-] [1] [+]          │
│  ┌──┐ ┌──┐ ┌──┐     │                           │
│  │  │ │  │ │  │     │  [ Add to Cart ────────── ]│  ← Primary CTA
│  └──┘ └──┘ └──┘     │                           │
│  Thumbnails          │  ✓ Free shipping over ₹999│
│                      │  ✓ Handmade in Ahmedabad  │
│                      │  ✓ 7-day returns           │
│                      │                           │
│                      │  ── Description ──────    │
│                      │  Full product details...   │
│                      │                           │
│                      │  ── Details ───────────   │
│                      │  Size: 200ml              │
│                      │  Burn time: 45 hrs        │
│                      │  Materials: Soy wax, ...  │
├──────────────────────┴──────────────────────────┤
│  Footer                                         │
└─────────────────────────────────────────────────┘
```

### Mobile Layout

```
┌──────────────────────┐
│ NAV                  │
├──────────────────────┤
│ ┌────────────────────┐│
│ │                    ││  ← Full-width image
│ │   MAIN IMAGE       ││     swipeable gallery
│ │                    ││
│ └────────────────────┘│
│ ○ ○ ● ○              │  ← Dot indicators
├──────────────────────┤
│ Product Name         │
│ ₹999  ~~₹1299~~      │
├──────────────────────┤
│ Scent:               │
│ [Cedar] [Vanilla]    │
│ [Smoke]              │
├──────────────────────┤
│ [ Add to Cart ────── ]│  ← Sticky bottom bar
├──────────────────────┤
│ ✓ Free ship over ₹999│
│ ✓ Handmade           │
│ ✓ 7-day returns      │
├──────────────────────┤
│ Description          │
│ Details              │
├──────────────────────┤
│ Footer               │
└──────────────────────┘
```

> ⚠️ **Warning: Sticky Add-to-Cart on Mobile**
>
> On mobile, the Add to Cart button should remain accessible without scrolling back up. A sticky bottom bar or a floating button is standard practice. If the customer has to scroll back to add to cart, you will lose conversions.

---

## Wireframe 3 — Cart

```
┌─────────────────────────────────────────────────┐
│  NAV                                       🛒 2 │
├──────────────────────────┬──────────────────────┤
│  Your Cart               │  Order Summary        │
│                          │  ──────────────────   │
│  ┌──┐ Cedar & Smoke      │  Subtotal    ₹1,998   │
│  │  │ Qty: [-] [2] [+]   │  Shipping    ₹0       │
│  │  │ ₹999 each  Remove  │  ──────────────────   │
│  └──┘                    │  Total       ₹1,998   │
│                          │                       │
│  ┌──┐ Vanilla Dusk       │  [ Checkout ───────── ]│
│  │  │ Qty: [-] [1] [+]   │                       │
│  │  │ ₹799       Remove  │  ← Back to shopping   │
│  └──┘                    │                       │
│                          │  Coupon code (if scope)│
│                          │  [ _________ ] Apply  │
└──────────────────────────┴──────────────────────┘
```

**Mobile:** Stack vertically. Summary below line items. Checkout button full-width and prominent.

---

## Wireframe 4 — Checkout

Checkout is not the place for brand expression. It is the place for friction elimination.

```
┌─────────────────────────────────────────────────┐
│  LOGO                          [Order Summary ▼] │
├──────────────────────────────────────────────────┤
│  ① Contact & Shipping  ② Payment  ③ Review       │  ← Step indicator
├──────────────────────┬──────────────────────────┤
│  Contact             │  Order Summary            │
│  Email _____________ │  ─────────────────────    │
│                      │  Cedar & Smoke ×2  ₹1,998 │
│  Shipping address    │  Vanilla Dusk ×1   ₹799   │
│  Name  _____________ │  ─────────────────────    │
│  Address ___________  │  Subtotal          ₹2,797 │
│  City  _____________  │  Shipping          ₹0     │
│  State _____________  │  Total             ₹2,797 │
│  Pincode ___________  │                           │
│  Phone ______________  │                           │
│                      │                           │
│  Shipping Method     │                           │
│  ● Standard (Free)   │                           │
│  ○ Express (₹150)    │                           │
│                      │                           │
│  [ Continue to Payment ──────────────────────── ]│
└──────────────────────┴──────────────────────────┘
```

> ⚠️ **The Order Summary Must Always Be Visible**
>
> Customers need to see what they're paying for throughout checkout. Hiding the summary behind a toggle (especially on desktop) increases abandonment. On mobile, a collapsible summary is acceptable — but it should default to expanded.

---

## Layout Decisions to Lock In Now

Before moving to the design system, answer these:

| Decision | Options | Choose One |
|---|---|---|
| Product grid on listing page | 2-col / 3-col / 4-col (desktop) | |
| Product images: aspect ratio | Square (1:1) / Portrait (3:4) / Landscape (4:3) | |
| Checkout: single page or multi-step | Single page / 2-step / 3-step | |
| Mobile nav: hamburger or bottom tab bar | Hamburger / Bottom tabs | |
| Cart: page or slide-out drawer | Full page / Drawer | |
| Homepage hero: image-led or text-led | Full image / Split / Text-primary | |

These decisions affect your component architecture in Phase 3. Lock them in now.

---

## ✅ Wireframes Checklist

- [ ] Homepage wireframe complete (desktop + mobile)
- [ ] Product detail page wireframe complete (desktop + mobile)
- [ ] Cart wireframe complete
- [ ] Checkout wireframe complete
- [ ] Sticky Add to Cart confirmed for mobile product detail
- [ ] Order summary always visible in checkout
- [ ] All layout decisions from the table above are answered
- [ ] No design details (colors, fonts) have entered the wireframes yet

---

## AI Prompt — Generate Component List from Wireframes

Once your wireframes are complete, use this to generate an implementation-ready component list for Phase 3.

```
I have completed wireframes for a personal e-commerce store. Based on my layout decisions, generate a complete React component list for my store.

Layout decisions:
- Product grid: [your choice]
- Image aspect ratio: [your choice]
- Checkout: [single page / multi-step]
- Mobile nav: [hamburger / bottom tabs]
- Cart: [page / drawer]
- Hero: [image-led / text-led / split]

For each component, provide:
1. Component name (PascalCase)
2. Which page(s) it appears on
3. Its props interface (TypeScript)
4. Whether it has meaningful internal state

Organize by: Layout components → Page components → Feature components → UI primitives
```

---

## What Comes Next

Your wireframes answer where. Your design system answers how it looks. Without wireframes done first, design systems get built for imaginary layouts.

**Next: Design System →**
