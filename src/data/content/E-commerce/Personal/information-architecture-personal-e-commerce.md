---
title: Information Architecture
slug: information-architecture
phase: Phase 1
mode: personal
projectType: e-commerce
estimatedTime: 20–25 min
---

# Information Architecture

Information Architecture (IA) is the structural skeleton of your store. It defines what pages exist, how they connect, what lives on each page, and how customers navigate from first visit to completed order.

Get this right before designing anything. A beautiful UI built on a broken IA will still lose customers at every navigation decision.

---

## What IA Answers

- What are all the pages in this store?
- How does a customer move between them?
- What is the primary navigation?
- What content belongs on each page?
- What are the entry points into the purchase flow?
- Where can the flow break, and what happens when it does?

---

## The Store Navigation Model

A personal e-commerce store has two distinct navigation systems operating simultaneously.

### Primary Navigation
The persistent header/nav. Present on every page. Anchors the customer's mental model of the store.

```
Logo → Homepage
Products (or your catalog name)
About
Contact
Cart icon (with item count)
```

Keep it to 4–5 items maximum. Every item added to primary nav reduces the weight of every other item.

### Contextual Navigation
Page-level navigation that guides the customer deeper into a specific flow. Not persistent.

Examples:
- Breadcrumbs on product detail pages (`Home > Candles > Cedar & Smoke`)
- Category filters on the product listing page
- Step indicators in checkout (`Shipping → Payment → Review`)
- Order status on the confirmation page

---

## The Full Page Map

Every page your store needs. Organized by zone.

### Public Store

```
/                           Homepage
├── /products               Product listing (all products)
│   └── /products/[slug]    Product detail page
├── /about                  Brand story and trust signals
└── /contact                Contact form or email
```

### Purchase Flow

```
/cart                       Cart review
/checkout                   Checkout (can be multi-step or single page)
/order/[id]/confirmation    Order confirmation
```

### Customer Account (deferred — post-MVP)

```
/account/login
/account/register
/account/orders
/account/orders/[id]
/account/profile
```

### Admin (internal — not customer-facing)

```
/admin                      Dashboard overview
/admin/orders               Order list
/admin/orders/[id]          Order detail
/admin/products             Product list
/admin/products/new         Add product
/admin/products/[id]        Edit product
/admin/inventory            Inventory overview
```

> 💡 **Tip: Admin Scope at MVP**
>
> Your admin at launch needs exactly three things: view orders, view inventory, update order status. Everything else can be done directly in your database until order volume justifies building more. Don't build a full CMS before you have customers.

---

## Page-Level Content Architecture

What lives on each critical page. This is the input to your wireframes in the next module.

### Homepage `/`

**Job:** Convert a first-time visitor into a product browser.

```
Hero section
  └── Brand statement or featured product
  └── Primary CTA → /products or featured /products/[slug]

Featured products or collections (3–6 items)
  └── Each links to /products/[slug]

Brand story (condensed)
  └── Links to /about

Trust signals
  └── Shipping info, return policy snippet, handmade/local signals

Optional: Email capture (newsletter)
```

### Product Listing `/products`

**Job:** Help the customer find what they want and create desire to click.

```
Page header (catalog name or category title)

Filter/sort controls (if catalog > 15 items)
  └── By category, price, availability

Product grid
  └── Product card: image, name, price, variant hint (e.g. "3 scents")
  └── Sold-out state on card level

Pagination or infinite scroll (if catalog > 20 items)
```

### Product Detail `/products/[slug]`

**Job:** Give the customer enough information and confidence to add to cart.

```
Product images (gallery)
  └── Main image + thumbnails
  └── Zoom on hover/tap

Product info
  └── Name
  └── Price (and compare_at_price if on sale)
  └── Short description (1–3 sentences)
  └── Variant selector (size, color, scent, etc.)
  └── Inventory signal ("Only 3 left" if stock ≤ 5)
  └── Add to Cart button
  └── Sold Out state (when applicable)

Full description / details
  └── Materials, dimensions, care instructions, etc.

Shipping and returns snippet
  └── Inline, not a link — customers need this before buying

Trust signals
  └── Handmade note, maker info, production time if made-to-order
```

### Cart `/cart`

**Job:** Review and confirm before committing to checkout.

```
Line items
  └── Image, name, variant, quantity control, line total
  └── Remove item

Order summary
  └── Subtotal
  └── Shipping estimate or "calculated at checkout"
  └── Total

Checkout CTA button

Optional: Cross-sell / upsell block (post-MVP)
Optional: Coupon code field (if in scope)
```

### Checkout `/checkout`

**Job:** Collect payment with minimum friction.

```
Step 1 — Contact + Shipping
  └── Email address
  └── Full name
  └── Shipping address
  └── Shipping method selector (if multiple options)

Step 2 — Payment
  └── Payment form (handled by payment provider UI)
  └── Order summary sidebar (always visible)

Step 3 — Review and Place Order
  └── Final total with shipping and tax
  └── Place Order button
```

> ⚠️ **Warning: Don't Build a Custom Payment Form**
>
> Your payment provider (Razorpay, Stripe) provides a hosted or embedded payment UI that handles PCI compliance for you. Never build your own card input fields. The security liability is not worth it for any personal store.

### Order Confirmation `/order/[id]/confirmation`

**Job:** Eliminate post-purchase anxiety. Create confidence the order is real.

```
Success signal (prominent)
  └── "Order confirmed" heading

Order summary
  └── Order number (for customer reference)
  └── Items purchased
  └── Shipping address
  └── Total paid

Next steps
  └── "You'll receive a confirmation email at [email]"
  └── Estimated fulfillment time (if known)

Optional: Social sharing prompt (if brand has strong social presence)
```

---

## Navigation Flow Diagram

The critical path from landing to purchase:

```
Entry (direct / social / search)
          ↓
     Homepage
          ↓
  Product Listing
          ↓
  Product Detail ←──────────────┐
          ↓                     │
      Add to Cart               │
          ↓                     │
        Cart ──── Continue Shopping
          ↓
      Checkout
     (Contact)
          ↓
     Checkout
     (Payment)
          ↓
   Order Placed
          ↓
  Confirmation Page
          +
  Confirmation Email
```

Every step in this path is a potential drop-off point. Your IA should minimize unnecessary steps and ensure there is always one obvious next action.

---

## IA Failure Patterns to Avoid

| Failure | What Happens |
|---|---|
| No breadcrumbs on product pages | Customer loses context, bounces to homepage instead of back to listing |
| Cart hidden behind icon with no visual feedback | Customer doesn't know item was added, adds it again or leaves |
| Checkout in a separate domain or tab | Breaks browser history, destroys trust |
| Order confirmation behind login wall | Guest customers can't see their confirmation |
| Admin mixed into public store routing | Security risk, accidental exposure |
| 404 on deleted products with no redirect | SEO loss, broken links from social |

---

## ✅ Information Architecture Checklist

- [ ] I have a complete page map covering all public, checkout, and admin pages
- [ ] I have defined primary navigation (max 5 items)
- [ ] I have mapped the content hierarchy for all critical pages
- [ ] The path from homepage to order confirmation has no unnecessary steps
- [ ] Every page has one clear primary action
- [ ] Admin routes are separate from public store routes
- [ ] I have accounted for error states (sold out, out of stock, payment failed)
- [ ] Guest checkout confirmation is accessible without login

---

## AI Prompt — Review and Extend Your IA

```
I am designing the information architecture for a personal e-commerce store.

My store:
[Paste your PRD Section 1 store overview paragraph]

My planned page map:
[List your pages]

My primary navigation:
[List your nav items]

Review my IA:
1. Are there any pages I'm missing that would break the customer journey?
2. Are there any pages I've included that are unnecessary at MVP?
3. Is my primary navigation scoped correctly — nothing missing, nothing redundant?
4. What is the most likely navigation failure point where customers will drop off?
5. What URL structure do you recommend for my product and category pages?

Then generate a content hierarchy outline for my product detail page specific to [your product type].
```

---

## What Comes Next

Your IA is the input to wireframing. Every wireframe you create in the next module maps to a page defined here. Without a complete IA, wireframes become speculative — you design pages you don't need and miss pages you do.

**Next: Wireframes →**
