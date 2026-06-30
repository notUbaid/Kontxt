---
title: Email Marketing
slug: email-marketing
phase: Phase 6
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Email Marketing

The Retention module added two specific automated emails: a review request and a win-back trigger. This module builds the broader, ongoing email strategy around them — a regular but sustainable cadence of communication that keeps your store present in a customer's inbox without becoming the kind of sender people unsubscribe from immediately.

---

## Where This Fits

This uses the transactional email infrastructure from Phase 3 and the customer/order data already flowing through your store. The shift here is from automated, trigger-based emails (Retention) to deliberate, scheduled campaigns you choose to send.

---

## Why This Matters for a Solo Store

> **💡 Tip:** Email remains one of the highest-return channels available to a personal store specifically because it's nearly free to send and you already own the list — unlike social media reach, which can change or disappear based on a platform's algorithm. A list of even a few hundred genuinely engaged subscribers is a durable asset.

The trade-off: email is also the channel most likely to be revoked (unsubscribe) if used carelessly. Respect for the customer's inbox matters more here than almost any other growth channel.

---

## What You're Building Today

- A simple list-building mechanism (checkout opt-in, on-site signup)
- A realistic, sustainable sending cadence
- A short welcome sequence for new subscribers
- Clear segmentation: at minimum, customers vs non-customer subscribers
- Compliance with consent requirements already established in your Privacy Policy and Cookie Policy

You're **not** building complex multi-branch automation flows or daily sending cadences. For a solo store, a small number of well-targeted, well-spaced emails outperforms high-frequency generic blasts.

---

## Building the List

| Source | Consent Level | Notes |
|---|---|---|
| Checkout opt-in checkbox (unchecked by default) | Explicit, compliant | Required approach in most jurisdictions — never default to opted-in |
| On-site signup form (e.g., for a discount) | Explicit | Clear value exchange improves signup rate |
| Adding every customer automatically, no opt-in | **Not compliant in most jurisdictions** | Transactional emails (order confirmation) are fine without marketing opt-in; marketing emails are not |

> **⚠️ Warning:** Marketing emails require explicit opt-in in most jurisdictions — placing a customer on a marketing list automatically because they made a purchase, without a separate, clear opt-in, risks violating consent requirements already disclosed in your Privacy Policy. Transactional emails (order confirmation, shipping update) are a separate category and don't require marketing consent.

---

## A Sustainable Cadence

```
New Subscriber
   │
   ▼
Welcome email (1, immediately)
   │
   ▼
[Ongoing] Regular campaign — every 2-4 weeks, not more
   │
   ├─ New product announcements
   ├─ Seasonal/relevant promotions
   └─ Genuinely useful content (how-to, behind-the-scenes)
```

> **⚠️ Common Mistake:** Sending too frequently in an initial burst of enthusiasm, then stopping entirely a month later. A modest, consistent cadence (every 2-4 weeks) sustained over time outperforms an intense initial push that fizzles — and avoids the unsubscribe spike that high-frequency sending tends to cause.

---

## Implementation

**Copy Prompt:**

```
Help me set up email marketing for my personal e-commerce store, using
[your email service provider — likely already integrated from Phase 3].

Build:
1. A checkout opt-in checkbox (unchecked by default) and an on-site
   signup form, both feeding the same marketing list, separate from
   transactional email sending
2. A short welcome email sent immediately on signup — introduce the
   store, set expectations for what they'll receive and how often
3. A simple segmentation: customers (have purchased) vs subscribers
   (haven't purchased yet) — so messaging can differ appropriately
4. Confirm unsubscribe handling works correctly and immediately, and
   that unsubscribed contacts are excluded from all future sends
```

> **✅ Best Practice:** Segment customers from non-customer subscribers from day one, even with a small list. A non-customer subscriber benefits from a different message (why buy at all) than an existing customer (what's new, loyalty-relevant content) — sending identical content to both wastes the more valuable signal you have on actual customers.

---

## What to Actually Send

| Email Type | Audience | Purpose |
|---|---|---|
| Welcome | New subscribers | Set expectations, first impression |
| New product announcement | All, or customers first | Drive awareness and repeat visits |
| Seasonal/relevant promotion | All, segmented if relevant | Drive timely purchases |
| Genuinely useful content (how-to, care tips, behind-the-scenes) | All | Builds relationship beyond pure sales asks, improves long-term engagement |

> **💡 Tip:** Not every email needs to sell something directly. A mix that includes genuinely useful or interesting content (not just promotions) keeps engagement and open rates healthier over time than a purely promotional cadence.

---

## Common Mistakes

- Adding customers to a marketing list automatically without explicit, separate opt-in
- Sending too frequently in an initial burst, then going silent — inconsistent cadence underperforms a modest, steady one
- Sending identical content to customers and non-customer subscribers, missing the chance to tailor messaging to each
- No welcome email, missing the highest-engagement moment (right after signup) to set expectations
- Slow or broken unsubscribe handling, which damages sender reputation and trust, and may violate compliance requirements already stated in your Privacy Policy

---

## Validation Checklist

- [ ] Checkout opt-in checkbox is unchecked by default, and marketing/transactional sending are kept separate
- [ ] Welcome email sends immediately and correctly on new signup
- [ ] Customer vs non-customer subscriber segmentation exists and can be used to tailor content
- [ ] Unsubscribe is tested and confirmed to work immediately, excluding the contact from all future sends
- [ ] A sustainable cadence (every 2-4 weeks) is planned, not an unplanned, irregular send schedule

---

## AI Review Prompt

```
Review my email marketing setup for an e-commerce store. Check:

1. Is marketing list opt-in properly separated from transactional
   email sending, with explicit, non-default-checked consent?
2. Is there a welcome email, and does it set realistic expectations
   for cadence and content?
3. Is unsubscribe handling immediate and reliable?
4. Is my planned cadence sustainable long-term, or likely to burn out
   after an initial burst?
```

---

## What Comes Next

With ongoing communication in place, the next step rewards the customers who engage with it most. Next: **Loyalty Programs** — recognizing and incentivizing your best repeat customers specifically.
