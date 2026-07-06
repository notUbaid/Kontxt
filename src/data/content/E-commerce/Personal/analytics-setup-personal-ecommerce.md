---
title: Analytics Setup
slug: analytics-setup
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Analytics Setup

SEO gets people to the store. Analytics tells you what they did once they arrived — and more importantly, where they left without buying. Without this, every decision in Phase 6 (Growth) is a guess.

---

## Where This Fits

This is separate from the Analytics *Architecture* you designed back in Phase 2 — that was about what data your own system tracks for order/business records. This module is about *behavioral* analytics: page views, funnel drop-off, traffic sources — the layer that tells you why, not just what.

---

## Why This Matters for a Store Specifically

Generic web analytics (page views, sessions) tells you traffic exists. Store-specific analytics tells you whether that traffic converts, and exactly where it stops converting — product page, cart, or checkout. Those three failure points have completely different fixes, and you can't tell them apart without funnel data.

> ** Tip:** A store with low traffic and a 40% checkout abandonment rate has a different, more fixable problem than a store with high traffic and a 2% product-page-to-cart rate. Set up analytics specifically to tell these apart, not just to count visitors.

---

## What You're Building Today

- Page view and traffic source tracking (where visitors come from)
- E-commerce funnel tracking: product view → add to cart → begin checkout → purchase
- Conversion rate visibility at each funnel stage
- Privacy-respecting configuration, consistent with your Privacy Policy

You're **not** building a custom analytics platform or tracking every possible micro-interaction. A properly configured e-commerce analytics tool covers what a personal store actually needs to act on.

---

## Choosing Your Approach

| Tool | E-Commerce Funnel Support | Privacy Profile | Cost |
|---|---|---|---|
| **Google Analytics 4 (GA4)** | Built-in e-commerce events | Requires cookie consent in many jurisdictions | Free |
| Plausible / Fathom | Basic, lighter e-commerce tracking | Privacy-friendly, often no consent banner needed | Paid, low cost |
| PostHog | Full funnel + session replay | Self-hostable for full control | Free tier generous |

> ** Best Practice:** Whatever you choose, it must match what your Privacy Policy already discloses. If you add a new analytics tool after publishing your privacy policy, go back and update the policy's third-party list — don't let the two drift out of sync.

---

## The Funnel That Actually Matters

```
Product Page View
      │
      ▼
Add to Cart      ← drop-off here = pricing, photos, or description problem
      │
      ▼
Begin Checkout   ← drop-off here = cart friction, surprise shipping cost
      │
      ▼
Purchase         ← drop-off here = checkout flow, payment friction, trust signals
```

Each stage points to a different fix. Tracking only "visitors" and "purchases" with nothing in between gives you a conversion rate but no idea what to change.

---

## Implementation

**Copy Prompt:**

```
Set up e-commerce analytics for my store built with [your framework],
using [GA4 / Plausible / PostHog].

Track these events with accurate parameters (product ID, price,
quantity where relevant):
1. product_view
2. add_to_cart
3. begin_checkout
4. purchase (with order value)

Make sure events fire from the actual user action, not just page load
— e.g., add_to_cart should fire on the real "Add to Cart" click, not
just because the product page rendered.

Also confirm: does this tool require a cookie consent banner in my
jurisdiction, and if so, set that up too, consistent with what my
Privacy Policy already discloses.
```

> **️ Warning:** A common implementation mistake is firing `purchase` events on every visit to the order confirmation page, including page refreshes — this inflates revenue numbers with duplicate counts. Make sure the purchase event fires once per actual completed order, not once per page load.

---

## Reading Your Funnel Once You Have Data

| Pattern | Likely Cause | Where to Look Next |
|---|---|---|
| High product views, low add-to-cart | Price, photos, or description not convincing | Product Photography / Descriptions modules |
| High add-to-cart, low begin-checkout | Cart friction, unexpected costs shown too late | Cart Architecture |
| High begin-checkout, low purchase | Checkout flow friction, payment failures, trust concerns | Checkout Architecture, Payment Security |
| High traffic, low product views | Landing/category pages aren't guiding visitors to products | Store Architecture, Information Architecture |

---

## Common Mistakes

- Tracking page views only, with no e-commerce funnel events — gives a vanity metric, not an actionable one
- Firing `purchase` on every confirmation page load instead of once per actual order, inflating revenue numbers
- Adding an analytics tool without updating the Privacy Policy's third-party list to match
- Not setting up conversion goals/funnel views in the tool's dashboard, so the data is collected but never actually looked at in a useful form
- Tracking too many custom events from the start, creating dashboard noise that makes the four events that actually matter harder to find

---

## Validation Checklist

- [ ] All four core funnel events fire correctly — test by manually walking through product view → add to cart → checkout → purchase with a test order
- [ ] `purchase` event fires exactly once per completed order, confirmed by refreshing the confirmation page and checking it doesn't double-count
- [ ] Analytics tool is named in your Privacy Policy's third-party list
- [ ] Cookie consent (if required in your jurisdiction) is implemented and functioning before any tracking fires
- [ ] Funnel/conversion view is set up in the tool's dashboard, not just raw event data with no visualization

---

## AI Review Prompt

```
Review my e-commerce analytics implementation. Check:

1. Do all four funnel events (product_view, add_to_cart, begin_checkout,
   purchase) fire from real user actions, not page loads alone?
2. Could the purchase event double-fire on page refresh or revisit?
3. Does this analytics setup require cookie consent in my jurisdiction,
   and is that properly implemented if so?
4. Is the analytics tool listed in my Privacy Policy's third-party
   disclosures?
```

---

## What Comes Next

You can now see what happens after a visitor arrives. Next: **Shipping Setup** — configuring real-world shipping rates, zones, and carrier integration before you can actually fulfill an order.
