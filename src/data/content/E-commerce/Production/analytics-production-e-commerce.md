---
title: Analytics
slug: analytics
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Analytics

You're about to launch a store you can't see into. Without analytics, "is this working?" has no answer except gut feeling. This module sets up just enough tracking to answer the questions that actually matter at your stage — not a full data warehouse.

---

## The Only Questions You Need Answered Right Now

Before picking any tool, get clear on what you're actually trying to learn:

1. Where are visitors coming from?
2. What do they look at?
3. Where do they drop off before buying?
4. What's actually converting?

If a metric doesn't help answer one of these four questions, you don't need it yet.

> **Reframe:** Analytics at this stage is a diagnostic tool, not a dashboard to admire. You're looking for friction points, not vanity numbers.

---

## Decision: Which Analytics Tool?

<table>
<tr><th>Tool</th><th>What it's good at</th><th>Cost</th><th>Fit</th></tr>
<tr><td><strong>Plausible / Fathom</strong></td><td>Simple, privacy-friendly, fast to set up</td><td>Paid (no generous free tier)</td><td>Good if privacy is a priority</td></tr>
<tr><td><strong>Google Analytics 4 (GA4)</strong></td><td>Free, deeply integrates with ads, very detailed</td><td>Free</td><td>Steep learning curve, heavier script</td></tr>
<tr><td><strong>PostHog</strong></td><td>Product analytics + session replay + free tier</td><td>Generous free tier</td><td>Best balance for a personal store</td></tr>
<tr><td><strong>Vercel Analytics</strong></td><td>Zero-config if hosted on Vercel, basic traffic stats</td><td>Free tier available</td><td>Good baseline, limited depth</td></tr>
</table>

**Recommendation for Personal Mode:** **PostHog**. It tracks page views, custom e-commerce events (add to cart, checkout, purchase), and funnels out of the box, has a free tier that comfortably covers a personal store's traffic, and doesn't require GA4's complexity to get useful answers.

If you're hosted on Vercel and want literally the fastest setup, **Vercel Analytics** gives you traffic basics with one click — but you'll outgrow it the moment you want to know *why* people aren't converting, not just *that* they visited.

> **Tip:** Don't install two analytics tools "just in case." Pick one. Running GA4 and PostHog simultaneously doubles your script weight for no benefit at your scale.

---

## What to Actually Track

Page views are the bare minimum and not very useful alone. The signal is in **events** — specific actions tied to your purchase funnel.

**Core e-commerce events to track:**

| Event | Fires when | Why it matters |
|---|---|---|
| `product_viewed` | Customer opens a product page | Shows interest, ranks popular products |
| `add_to_cart` | Customer adds an item | First real intent signal |
| `checkout_started` | Customer reaches checkout | Funnel entry point |
| `payment_info_added` | Customer enters payment details | Catches late-stage drop-off |
| `purchase_completed` | Order successfully placed | Your actual conversion metric |
| `search_performed` | Customer uses search | Reveals demand for products you may not stock |

> **Why this set, specifically:** These five events let you build a funnel: View → Cart → Checkout → Payment → Purchase. Wherever the numbers drop sharply between two steps, that's your highest-leverage fix. Everything else is secondary.

---

## Connecting Events to Real Money

Don't just track that a purchase happened — track its value. This turns your analytics from "what are people doing" into "what is each part of my funnel actually worth."

```javascript
// Example: PostHog purchase event with value
posthog.capture('purchase_completed', {
  order_id: order.id,
  value: order.total,
  currency: 'USD',
  items: order.items.map(i => ({ 
    product_id: i.productId, 
    name: i.name, 
    price: i.price, 
    quantity: i.quantity 
  }))
});
```

> **Best Practice:** Always pass `order_id` with your purchase event. It lets you cross-reference an analytics event with the actual order in your database if numbers ever look inconsistent — which they eventually will, and you'll want to debug it.

---

## Where Events Should Fire From

Same principle as the Notifications module: **critical events should be confirmed server-side, not just fired from the browser.**

<table>
<tr><th>Event type</th><th>Fire from</th><th>Why</th></tr>
<tr><td>product_viewed, search_performed, add_to_cart</td><td>Client (frontend)</td><td>These are UI interactions — no server confirmation needed</td></tr>
<tr><td>purchase_completed</td><td>Server (after webhook confirms payment)</td><td>Must match what actually happened, not what the browser assumed happened</td></tr>
</table>

If you only fire `purchase_completed` from your "Thank You" page, you'll undercount real purchases (browser closes, network drops) and you risk overcounting if someone refreshes that page. Fire it from the same Stripe webhook handler that triggers your confirmation email.

---

## AI Prompt: Set Up Analytics Tracking

```
I'm adding PostHog analytics to a personal e-commerce store built with [your stack].

I need to track this funnel:
product_viewed → add_to_cart → checkout_started → payment_info_added → purchase_completed

Requirements:
- Client-side events for product_viewed, add_to_cart, checkout_started, search_performed
- Server-side event for purchase_completed, fired from my Stripe webhook handler after payment is confirmed (not from the frontend)
- Include order_id, value, currency, and item details on the purchase event
- Show me how to set up a funnel view in PostHog using these events
- Keep the integration minimal — no extra tracking beyond what's listed

My relevant code:
[paste your checkout/webhook handler]
```

> **Token efficiency tip:** Paste your actual webhook handler, not a description of your flow. AI will place the tracking call correctly within your existing code instead of generating a generic example you have to adapt yourself.

---

## Validating AI-Generated Analytics Code

- [ ] Is `purchase_completed` firing from server-side code (webhook), not a client-side "Thank You" page?
- [ ] Are you accidentally tracking the same purchase twice (e.g., once client-side AND once server-side)?
- [ ] Is any personally identifiable information (full name, email, address) being sent in event properties unnecessarily? Keep events to IDs and product data — not raw customer PII.
- [ ] Does the analytics script load asynchronously, so it can't block your page from rendering?
- [ ] Are you tracking in development/localhost and polluting your real analytics data? Add an environment check.

> **Common AI mistake:** AI often wires `purchase_completed` to fire from the order confirmation page component, because that's the obvious place a human would look. This silently produces inaccurate purchase counts. Always double check this one specifically — it's the metric you'll actually make decisions from.

---

## Privacy Note

You're collecting customer behavior data — treat it accordingly, even as a personal project:

- Don't track raw emails or names as event properties; use internal IDs.
- Add a basic note in your Privacy Policy (Phase 5) disclosing that you use analytics.
- If you're targeting EU customers, look into cookie consent requirements before launch — PostHog has built-in tooling for this, but it's not on by default.

---

## Reading Your Funnel Once It's Live

Once you have a week or two of real traffic, look at your funnel and ask one question at each step: **"Why did people leave here?"**

| Big drop at... | Likely cause to investigate |
|---|---|
| product_viewed → add_to_cart | Pricing, product photos, unclear description |
| add_to_cart → checkout_started | Cart UX, unexpected costs (shipping shown too late) |
| checkout_started → payment_info_added | Checkout form too long, trust signals missing |
| payment_info_added → purchase_completed | Payment errors, declined cards, confusing payment UI |

> This table is a starting hypothesis list, not a diagnosis. Use it to know *where to look*, then go look at session recordings (PostHog has this) or actually test the flow yourself.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- A/B testing infrastructure
- Custom data warehouses or BI tools (Looker, Mixpanel cohort analysis)
- Server-side event deduplication systems
- Attribution modeling across multiple marketing channels
- Real-time analytics dashboards

These solve problems at a scale and budget you're not at yet. Revisit in Phase 6 — Growth.

---

## Implementation Checklist

- [ ] PostHog (or chosen tool) account created, project key in environment variables
- [ ] Client-side tracking installed and loading asynchronously
- [ ] `product_viewed`, `add_to_cart`, `checkout_started`, `search_performed` events firing client-side
- [ ] `purchase_completed` event firing server-side from the Stripe webhook, with order_id and value
- [ ] No PII (raw email/name) included in event properties
- [ ] Development/localhost traffic excluded from production analytics
- [ ] Funnel view configured in your analytics dashboard
- [ ] Privacy Policy note planned for Phase 5
- [ ] Verified events appear correctly after a real test purchase

---

## What's Next

With visibility into how customers actually move through your store, it's time to make sure that store doesn't break — that's **Testing**, next in this phase.
