---
title: Customer Journey
slug: customer-journey
phase: Phase 1
mode: hackathon
projectType: e-commerce
estimatedTime: 15–20 min
---

# Customer Journey

Judges don't read your store. They experience it.

In a 3-minute demo, a judge will follow a path through your store — consciously or not. If that path is unclear, confusing, or broken at any step, the impression sticks regardless of how good your code is.

Your job in this module is to design that path deliberately, then validate every step before you build.

---

## The Hackathon Judge Mental Model

Judges evaluate your store by simulating a real customer. They ask:

- Does this feel like a real store?
- Can I find something I'd want to buy?
- Can I actually buy it?
- Does the whole flow make sense?

They are not reading your code. They are not checking your architecture. They are clicking around and forming a gut feeling.

Design for that gut feeling.

---

## The Core Journey

Every e-commerce store has one primary flow. Optimise this above everything else.

```
Homepage
  ↓
Browse catalog (Product Listing)
  ↓
Click a product (Product Detail Page)
  ↓
Add to cart
  ↓
View cart
  ↓
Checkout
  ↓
Order confirmation
```

Every page in this flow must work. Every transition must feel smooth. Every CTA must be obvious.

If a judge gets stuck anywhere in this sequence, the demo is damaged.

---

## Designing Each Step

### Homepage → Catalog

The homepage has one job: get the judge into the catalog.

- Your primary CTA button should say something action-oriented: **Shop Now**, **Browse Collection**, **Explore the Store**
- It should be visible without scrolling
- It should go directly to the Product Listing page — not an "about us" section

**Common mistake:** Homepage CTA scrolls down to a product section on the same page instead of navigating to the catalog. This breaks the flow and confuses navigation.

---

### Catalog → Product Page

The catalog has one job: make judges want to click a product.

- Product cards need: image, name, price — nothing else is required
- The entire card should be clickable, not just the product name
- On hover, a subtle visual cue (shadow, scale, border) signals interactivity
- Load your featured product first in the grid

**Common mistake:** Product images are different sizes, creating a broken grid. Fix with consistent aspect ratios (1:1 or 4:3) enforced in CSS, not by hoping images match.

---

### Product Page → Cart

The product page has one job: make the Add to Cart action feel obvious and satisfying.

- **Add to Cart** button should be high contrast, full-width or prominently sized
- After clicking, give immediate feedback: button state change, cart count increment, toast notification — pick one, do it well
- Don't require an account to add to cart

**Common mistake:** Add to Cart works but nothing visually confirms it happened. Judges click it twice, add duplicates, and the cart looks broken.

---

### Cart → Checkout

The cart has one job: confirm what the judge is buying and move them forward.

- Show a clear **Proceed to Checkout** or **Checkout** button — primary, prominent, bottom of the cart
- Show the subtotal clearly
- Don't put friction here: no "create an account to continue," no coupon code fields that distract

**Common mistake:** Cart is a dead end with no obvious next step. Judge has to hunt for the checkout button.

---

### Checkout → Confirmation

The checkout has one job: complete the transaction and reward the judge with a satisfying success state.

- Keep the form minimal: name, email, address, payment section
- Use a real-looking payment form even if it's simulated
- The confirmation page should feel like a reward: clear success message, order summary, a next step

**Common mistake:** Confirmation page is a blank page or just says "success." This is the emotional peak of the purchase flow — make it feel good.

---

## Secondary Journeys (Design These Too)

Judges don't always follow the primary flow. Prepare for these:

| Journey | What to ensure |
|---|---|
| **Direct to product** | If someone lands on a product page, they can still navigate to the catalog |
| **Empty cart** | Cart page with no items shows a friendly empty state and a "Start Shopping" link |
| **Browse without buying** | Catalog is browsable, filters work, navigation is always visible |
| **Back button** | Pressing back from product detail returns to catalog at the same scroll position (or close to it) |

---

## Navigation Design

Your nav is visible on every page. It carries the whole journey.

**Minimum viable nav:**
- Store name / logo (links to homepage)
- Shop / Products link
- Cart icon with item count badge

**Optional but impressive:**
- Search icon (even if it just links to catalog)
- About link

**Avoid:**
- Dropdowns with subcategories (adds complexity, rarely worth it)
- Nav items that go nowhere (broken links destroy trust instantly)

---

## Use AI to Review Your Journey

```
I'm building a hackathon e-commerce store. Here is my intended customer journey:

Homepage → Product Listing → Product Detail → Cart → Checkout → Order Confirmation

Store concept: [brief description]
Payment approach: [Stripe test mode / simulated]
Navigation: [what's in your nav]

Review this journey as a UX designer preparing for a 3-minute demo:
1. Identify the 3 most likely points of friction or confusion
2. Suggest one micro-interaction or transition that would make the flow feel more polished
3. Flag any step where a judge might get stuck or lost
4. Recommend the exact CTA text for: homepage hero, product card, product detail page, cart page
```

> **What to watch for in the output:**
- If AI flags your cart as a friction point → add a persistent cart icon in the nav
- If AI suggests a micro-interaction you can't build in time → note it for the pitch ("we'd add X in the next iteration")
- Use the recommended CTA text directly — don't workshop it

---

## Journey Validation Checklist

Walk through this yourself before you start building. Physically trace the path.

- [ ] Homepage CTA navigates to Product Listing
- [ ] Every product card is fully clickable
- [ ] Add to Cart gives immediate visual feedback
- [ ] Cart shows subtotal and a clear Checkout button
- [ ] Checkout form is minimal and completable
- [ ] Confirmation page feels like a success, not an afterthought
- [ ] Navigation is consistent across all pages
- [ ] Empty cart has a friendly state
- [ ] No nav link goes to a missing page
- [ ] Back button doesn't break the experience

---

> **Next module:** Product Page Design →
>
> You'll design the single most important page in your store — the one judges spend the most time on and judge most critically.
