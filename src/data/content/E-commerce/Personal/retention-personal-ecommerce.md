---
title: Retention
slug: retention
phase: Phase 6
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Retention

Phase 5 got your store launched and capable of accepting orders. Phase 6 is about everything that happens after the first sale — starting here, with the cheapest growth lever available: getting someone who already bought once to buy again.

---

## Where This Fits

This uses infrastructure you already have: the email system from Phase 3, the analytics funnel from Phase 5, and real order data now accumulating in production. Nothing new needs to be built before this module — it's mostly configuration and a few new automated emails.

---

## Why This Matters More Than New Customer Acquisition

> **💡 Tip:** Acquiring a new customer is consistently more expensive than retaining an existing one — commonly cited estimates put new acquisition at five to seven times the cost of a repeat sale, since a returning customer requires no ad spend, no SEO ranking, no cold discovery at all. For a personal store with no marketing budget, retention isn't just cheaper — it may be your only realistic growth lever early on.

A repeat customer also typically has a higher average order value and lower price sensitivity than a first-time buyer, since trust is already established.

---

## What You're Building Today

- A post-purchase email sequence (not just the transactional confirmation)
- A simple win-back trigger for customers who haven't returned after a reasonable window
- A review/feedback request, timed appropriately
- Basic repeat-purchase tracking using your existing analytics and order data

You're **not** building a full marketing automation platform or a complex multi-segment lifecycle system. A small number of well-timed, relevant emails outperforms a large number of generic ones, especially at personal-store volume.

---

## The Retention Sequence That Matters Most

```
Purchase
   │
   ▼
Order Confirmation (already built, Phase 3)
   │
   ▼
Shipped Notification (already built, Phase 3)
   │
   ▼
[Few days after delivery] Review/Feedback Request
   │
   ▼
[Weeks later, if no repeat purchase] Win-Back Email
```

Each step already has supporting infrastructure except the last two — those are what this module adds.

---

## Review/Feedback Request

> **⚠️ Warning:** Timing matters more than wording here. Requesting a review immediately at delivery, before the customer has actually used the product, produces lower response rates and lower-quality reviews than waiting a few days. For most physical goods, 3-7 days after delivery is a reasonable default — adjust based on what you actually sell.

**Copy Prompt:**

```
Write a short, genuine post-purchase review request email for my
e-commerce store, sent [3-7 days] after delivery.

Tone: personal, not corporate — this is a small, solo-run store, and
that's a strength worth being honest about, not hiding.
Ask for: a product review, and optionally a photo if they're willing.
Keep it short — one clear ask, not multiple competing calls to action.
```

---

## Win-Back Trigger

For customers who bought once but haven't returned within a reasonable window for your product category (a clothing store's window differs from a consumables store's).

**Copy Prompt:**

```
Help me design a simple win-back email trigger for my e-commerce store.

My typical repurchase window for this product type is roughly:
[your estimate — e.g., "consumable, expect repurchase every ~60 days"
or "apparel, no fixed expected interval"]

Write:
1. The trigger logic — when should this email actually send, based on
   time since last order
2. A short, non-pushy win-back email — referencing they're a past
   customer specifically, not a generic "we miss you" template
3. One small, genuine incentive idea appropriate for a personal store
   (avoid deep discounting that erodes margin unnecessarily)
```

> **⚠️ Common Mistake:** A win-back email sent too soon (before a customer would realistically need to repurchase) reads as generic spam rather than a relevant nudge. Base the timing on your actual product's realistic repurchase cycle, not an arbitrary default like "30 days for everyone."

---

## Reading Retention From Your Existing Data

Your Phase 5 Analytics Setup already captures `purchase` events with order value — that's enough to answer the core retention question without new tooling:

| Question | How to Answer With What You Have |
|---|---|
| What % of customers buy more than once? | Query orders grouped by customer, count those with 2+ orders |
| How long between first and second purchase, typically? | Average the gap between order 1 and order 2 timestamps for repeat customers |
| Which products get repeat purchases vs one-time only? | Group repeat purchase rate by product |

> **✅ Best Practice:** Before adding new tools, check whether your existing order and analytics data already answers the question. A personal store with a few hundred orders can compute meaningful repeat-purchase metrics with a single database query — no dedicated retention-analytics platform needed yet.

---

## Common Mistakes

- Treating retention as only "send more emails" without first identifying what actually drives a customer to return (product fit, timing, price) — see the Analytics module's funnel reading
- Sending the review request immediately at delivery instead of after the customer has had time to use the product
- A win-back email with a timing window that doesn't match the product's real repurchase cycle
- Discounting too aggressively in win-back emails, training customers to wait for a discount rather than buying at full price
- Building retention automation before checking whether the underlying order/email infrastructure can actually trigger emails based on time-since-purchase — verify this works technically before writing copy

---

## Validation Checklist

- [ ] Review request email is confirmed sending at the right delay after delivery, not immediately at order placement
- [ ] Win-back trigger timing is based on an actual estimate of your product's repurchase cycle, not an arbitrary default
- [ ] You can answer, using existing data: what percentage of your customers have ordered more than once?
- [ ] Emails are tested end-to-end — trigger fires correctly, content renders correctly, unsubscribe/opt-out works

---

## AI Review Prompt

```
Review my retention email setup for an e-commerce store. Based on:

Review request timing: [your delay]
Win-back trigger timing: [your delay/logic]
Product type: [describe]

Check for:
1. Whether the timing for either email is realistic for my actual
   product type
2. Whether the win-back incentive (if any) risks training customers
   to wait for discounts
3. Whether I'm missing an obvious retention signal already available
   in my existing order/analytics data
```

---

## What Comes Next

With a process to bring customers back, the next step is sharpening what you measure about that process. Next: **Analytics** — going deeper than the launch-phase funnel setup, into the metrics that actually guide growth decisions.
