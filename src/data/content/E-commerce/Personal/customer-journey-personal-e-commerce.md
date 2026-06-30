---
title: Customer Journey
slug: customer-journey
phase: Phase 1
mode: personal
projectType: e-commerce
estimatedTime: 25–35 min
---

# Customer Journey

Before writing a single line of code, you need to understand the path a real person takes through your store — from the moment they land to the moment they receive their order.

Most beginner stores are built page-by-page. Professional stores are built journey-first. The difference shows in conversion rates.

This module maps the complete customer journey for a personal e-commerce store, identifies the decisions each stage forces, and shows you where poor UX silently kills sales.

---

## The Five Stages

```
Discover → Browse → Decide → Buy → Receive
```

Every customer moves through these stages. Your job is to make each transition effortless.

---

## Stage 1 — Discover

**Where they come from:**
- Google search (organic)
- Instagram / TikTok link
- Direct link from a friend
- Google Shopping ad

**What they see first:**
Your homepage or a product page — depends on the traffic source. If someone clicks a Google Shopping result, they land directly on a product page. They've never seen your homepage.

**What they need immediately:**
- What is this store?
- Can I trust it?
- Is this for me?

**Design decisions this forces:**

| Element | What It Communicates |
|---|---|
| Logo + store name | Brand identity |
| Hero image / headline | What you sell, who it's for |
| Social proof (reviews, count) | Trust |
| Clear navigation | What else exists here |

> **Warning:** If a user lands on your homepage and can't tell what you sell in 3 seconds, they leave. "Welcome to our store" is not a headline. "Handmade leather wallets, made in Portugal" is a headline.

---

## Stage 2 — Browse

**What they're doing:**
Scanning, not reading. They're forming an impression of your catalog before committing attention to any single product.

**The browse experience is built from:**
- Category navigation
- Product grid layout
- Filters and sorting
- Product card design

**Product card — the most repeated UI in your store:**

```
┌─────────────────────┐
│                     │
│    [product image]  │
│                     │
├─────────────────────┤
│ Product Name        │
│ Short descriptor    │
│ $XX.XX              │
│ ★★★★☆ (42)         │
└─────────────────────┘
```

Every card needs: image, name, price. Reviews and short description improve conversion. Everything else is noise.

**Friction points in Browse:**
- Too many categories → decision paralysis
- No filters on collections with 20+ products
- Images that are inconsistent sizes or styles
- Price hidden until product page → distrust

---

## Stage 3 — Decide

This is where most sales are won or lost.

The customer is on your product page. They're not yet committed. They're asking:

- Is this actually what I want?
- Is this worth the price?
- Will it fit / work / arrive on time?
- What if I don't like it?

**Product page anatomy:**

```
┌──────────────────────────────────────────┐
│  [Images]           [Name]               │
│  [Gallery]          [Price]              │
│                     [Variants]           │
│                     [Add to Cart]        │
│                     [Shipping estimate]  │
│                     [Return policy]      │
├──────────────────────────────────────────┤
│  [Description]                           │
│  [Reviews]                               │
│  [Related products]                      │
└──────────────────────────────────────────┘
```

**What removes hesitation:**

| Element | Why It Works |
|---|---|
| Multiple images (3–6) | Shows the product from every angle — reduces returns |
| Size guide / dimensions | Eliminates the "will this fit?" question |
| Estimated delivery date | Converts impulse buyers who need something by a date |
| Real reviews | Peer trust > brand trust |
| Clear return policy | Removes purchase risk |
| Low stock indicator | Creates urgency without lying |

> **Tip:** "Free returns within 30 days" near the Add to Cart button increases conversion more than most discounts. Remove purchase risk at the moment of decision.

---

## Stage 4 — Buy

The checkout. The highest-stakes stage. Users who reach checkout have decided they want to buy — your only job is to not break their confidence.

**Checkout stages:**

```
Cart → Contact → Shipping → Payment → Confirmation
```

**What breaks checkout:**

- Forced account creation before purchase (Guest checkout is mandatory)
- Too many form fields
- Unexpected costs at payment step (shipping, tax revealed late)
- Unfamiliar payment processor UI
- No order summary visible during payment entry

**The checkout trust checklist:**

- [ ] HTTPS lock icon visible
- [ ] Recognized payment logos (Visa, Mastercard, PayPal, Stripe badge)
- [ ] Order summary always visible (don't hide it)
- [ ] No surprise costs — show estimated shipping before the payment step
- [ ] Progress indicator so users know how many steps remain

> **Warning:** Every additional form field in checkout reduces conversion. Ask only for what you absolutely need. Address autofill, saved cards, and one-click payment options (Apple Pay, Google Pay) dramatically improve completion rates.

---

## Stage 5 — Receive

The journey doesn't end at payment confirmation. It ends when the customer has the product and is happy.

**Post-purchase touchpoints your store controls:**

| Touchpoint | Timing | Purpose |
|---|---|---|
| Order confirmation email | Immediately | Confirm purchase, reduce anxiety |
| Shipping confirmation email | On dispatch | Tracking link, set expectations |
| Delivery confirmation | On delivery | Close the loop |
| Review request email | 7–14 days after | Social proof for future customers |

These emails are not optional. A customer who receives no post-purchase communication will raise a dispute. These emails are also your lowest-cost retention tool.

---

## Journey Map — Full View

```
DISCOVER
  └─ First impression: 3 seconds to communicate value
  └─ Trust signals visible above the fold

BROWSE
  └─ Consistent product cards
  └─ Useful filters on large catalogs
  └─ Fast image loading

DECIDE
  └─ Multiple product images
  └─ Risk removers: returns, delivery estimate, reviews
  └─ Clear variant selection (size, color)

BUY
  └─ Guest checkout available
  └─ No surprise costs
  └─ Familiar payment options
  └─ Confirmation clear and immediate

RECEIVE
  └─ Order confirmation email (immediate)
  └─ Shipping email with tracking
  └─ Review request (1–2 weeks)
```

---

## Where Stores Lose Sales — Silent Killers

> **Slow images on mobile.** 53% of mobile users abandon a page that takes more than 3 seconds to load. Your biggest conversion lever before you write any marketing copy is image optimization.

> **No guest checkout.** Forcing account creation before purchase costs 35% of conversions on average. Offer guest checkout. Let users create an account after purchase.

> **Shipping cost revealed at payment.** Show shipping cost on the product page or at the cart stage. "Free shipping over $X" banners work because they set expectations early.

> **No return policy on the product page.** Customers read it before buying, not after. It belongs near the Add to Cart button.

> **Generic product descriptions.** "High quality product made with premium materials" says nothing. "1.2mm full-grain leather, saddle-stitched with waxed linen thread, built to outlast the phone it's made for" sells.

---

## AI Prompt — Map Your Specific Customer Journey

<copy-prompt>
I'm building a personal e-commerce store. Here are my details:

- Product type: [describe what you sell]
- Target customer: [describe who buys this]
- Price range: [your price range]
- Primary traffic source: [Instagram / Google / word of mouth / etc.]

Map the complete customer journey for my store. For each stage (Discover, Browse, Decide, Buy, Receive), tell me:
1. What my customer is thinking and feeling at that moment
2. The one most important thing my UI must communicate
3. The most common mistake stores in my category make at this stage
4. One specific copy line or UI element I should include

Be specific to my product type. Do not give generic e-commerce advice.
</copy-prompt>

---

## Decision — What to Build from This Module

You now understand the journey. Use it to audit your Phase 1 designs before moving into development.

**Review each of your wireframes against this question:**

*Does this screen make the next stage of the journey easier or harder?*

If a screen adds friction without adding value, cut it or simplify it.

---

## Journey Audit Checklist

- [ ] Homepage communicates what you sell within 3 seconds
- [ ] Product cards show image, name, price — nothing extraneous
- [ ] Product page has multiple images, return policy, delivery estimate
- [ ] Checkout offers guest checkout
- [ ] Shipping cost shown before payment step
- [ ] Order confirmation email is set up (not just a page)
- [ ] Shipping notification email is set up
- [ ] Review request email is planned
