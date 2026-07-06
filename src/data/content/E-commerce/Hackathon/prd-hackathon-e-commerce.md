---
title: PRD
slug: prd
phase: Phase 1
mode: hackathon
projectType: e-commerce
estimatedTime: 20–25 min
---

# Product Requirements Document

A PRD sounds like corporate overhead. In a hackathon it's a weapon.

Without one, your team debates features mid-build. You lose 2 hours deciding whether to add a wishlist. Someone builds a page nobody asked for. Someone else rebuilds a page that was already done.

With one, everyone knows exactly what exists, what it does, and what's out of scope. You build faster because you stop making decisions twice.

This module produces a PRD scoped specifically for a hackathon e-commerce store. It takes 20 minutes. It saves significantly more.

---

## What a Hackathon PRD Is Not

- Not a 40-page spec document
- Not a backlog of nice-to-haves
- Not a roadmap for future versions

It is a single source of truth for what you are building right now, and what you are explicitly not building.

---

## Pages Your Store Needs

These are the non-negotiable pages for a credible e-commerce demo:

| Page | Purpose | Priority |
|---|---|---|
| **Homepage** | First impression, hero product, brand identity |  Critical |
| **Product Listing / Shop** | Browsable catalog with filters |  Critical |
| **Product Detail Page** | Individual product with images, description, add-to-cart |  Critical |
| **Cart** | Items selected, quantity control, subtotal |  Critical |
| **Checkout** | Form, order summary, payment trigger |  Critical |
| **Order Confirmation** | Post-purchase success state | 🟠 High |
| **About** | Brand story, builds trust during demo | 🟡 Medium |
| **404** | Signals production quality | 🟡 Medium |

> **Cut everything else.** A contact page, blog, FAQ, and account dashboard are not worth your time. Judges don't need them. Build the 6 critical pages exceptionally well.

---

## Feature Scope

Define exactly what each page does. Use this as your reference.

### Homepage
- Hero section with headline, subheadline, and CTA button
- Featured product(s) — 1 to 3 max
- Brief brand value section (3 short points)
- Footer with store name and nav links

### Product Listing
- Grid of product cards (image, name, price)
- Category filter (if you have multiple categories)
- Sort by price (optional — only if it takes under 1 hour)
- "Add to cart" from the card (optional, but impressive)

### Product Detail Page
- Product image(s)
- Name, price, short and long description
- Quantity selector
- Add to Cart button
- Related products section (optional — 2–3 products)

### Cart
- Line items with image, name, price, quantity
- Remove item
- Subtotal
- Proceed to Checkout button

### Checkout
- Customer info form (name, email, address)
- Order summary sidebar
- Payment section (see note below)
- Place Order button

### Order Confirmation
- Thank you message
- Order summary
- "Continue Shopping" link

---

## The Payment Question

This is the most common point of confusion in hackathon e-commerce builds.

You have three options:

| Option | Effort | Demo quality | Recommendation |
|---|---|---|---|
| **Stripe test mode** | Medium | Excellent — real payment flow |  Best choice if you have the time |
| **Simulated checkout** | Low | Good — fake it convincingly |  Valid for most hackathons |
| **No checkout at all** | None | Poor — judges notice |  Avoid |

**Simulated checkout** means: the form is real, the button works, the confirmation page appears — but no actual payment is processed. For most hackathon judges, this is sufficient. State it clearly in your pitch.

**Stripe test mode** means: real Stripe integration using test card numbers. Judges can complete a full checkout. This is visually identical to production.

> Decide now. Write it in your PRD. Do not revisit this decision mid-build.

---

## Out of Scope (Write This Down)

Explicitly list what you are not building. This prevents scope creep.

Suggested out-of-scope list for a hackathon store:

- User authentication / accounts
- Wishlist / saved items
- Product reviews
- Search functionality
- Email notifications
- Inventory management
- Admin dashboard
- Mobile app
- Multi-currency
- Discount codes (unless your concept specifically requires them)

If a teammate suggests adding something from this list, point here.

---

## Use AI to Generate Your PRD

```
I'm building an e-commerce store for a hackathon. Here are my project details:

Store name: [name]
Product category: [category]
Number of products: [number]
Payment approach: [Stripe test mode / simulated checkout]
Team size: [number]
Time remaining: [hours]

Generate a concise hackathon PRD that includes:
1. Pages to build with a one-line description of each
2. Core features per page (bullet points, no fluff)
3. Explicit out-of-scope list
4. Suggested build order based on dependencies
5. Risk flags — anything likely to take longer than expected

Format it as a clean markdown document I can share with my team.
```

> **Review the output for:**
- [ ] Build order is logical (don't build checkout before cart)
- [ ] No feature listed that takes more than 2–3 hours solo
- [ ] Payment approach matches your earlier decision
- [ ] Out-of-scope list is genuinely out of scope — no creep

---

## Build Order

Dependencies matter. Build in this order:

```
1. Project setup + routing
2. Product data (static JSON or simple database)
3. Product Listing page
4. Product Detail page
5. Cart (state management)
6. Checkout form
7. Order Confirmation
8. Homepage (easiest to build last — copy from existing pages)
9. About + 404
10. Polish pass
```

> Homepage last is counterintuitive but correct. By the time you build it, you'll have real components to drop in. Building it first means rebuilding it later.

---

## Validate Before You Move On

- [ ] All pages listed with clear scope
- [ ] Payment decision made and written down
- [ ] Out-of-scope list exists
- [ ] Build order agreed by team
- [ ] PRD shared with everyone building

---

> **Next module:** Customer Journey →
>
> You'll map the exact path a judge will take through your store — and design every step to be intentional, fast, and impressive.
