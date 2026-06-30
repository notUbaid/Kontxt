---
title: Analytics
slug: analytics
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Analytics

## Replacing Guesses With Real Signal

Throughout Phase 1, you validated assumptions by hand — talking to 5 buyers, manually brokering transactions, watching what questions sellers asked. That worked at zero users. It doesn't scale even to dozens. Analytics is how you keep getting that same kind of signal once you have too many users to personally observe each one.

This isn't about vanity metrics or dashboards for their own sake. Every metric here exists to answer a specific question your Phase 1 and Phase 2 modules already told you matters.

---

## Track What Your Earlier Modules Already Said Mattered

Don't start analytics with a blank slate — your curriculum already defined what "working" looks like at each stage of the buyer and seller journey. This table turns those into trackable events.

| Question (from earlier modules) | Event to Track |
|---|---|
| Are buyers finding listings? (Buyer Journey: Discovery) | Search performed, search → zero results rate |
| Are buyers trusting listings enough to act? (Buyer Journey: Evaluation) | Listing view → message sent rate |
| Are buyers completing purchases? (Buyer Journey: Decision) | Checkout started → checkout completed rate |
| Are sellers listing once and leaving? (Seller Journey churn risk) | Listings per seller, time between first and second listing |
| Is the cold-start offer working? (Seller Journey) | Conversion rate of manually-recruited sellers who actually list |
| Are disputes a rare exception or a pattern? (Dispute Resolution) | Dispute rate as % of completed transactions |

> 💡 **Tip:** Each row in this table isn't a metric you're choosing because it's common in marketplace analytics tutorials — it's a direct, traceable answer to a question your own earlier planning raised. If a metric you're tempted to add doesn't trace back to a question like this, reconsider whether you actually need it yet.

---

## The Funnel That Matters Most: Listing → Sale

This is the single most important metric for a two-sided marketplace, because it's the one number that tells you whether the core loop — the entire reason the marketplace exists — is actually working.

```
Listing created → Listing approved → Listing viewed →
Message sent → Checkout started → Checkout completed
```

> ✅ **Best practice:** Track this as an actual funnel with drop-off rates at each step, not just final conversion. A marketplace where listings get plenty of views but few messages has a different problem (evaluation/trust) than one where messages happen but checkouts don't start (decision/friction). The funnel tells you *where* to focus, not just *that* something's wrong.

---

## Privacy: What You Track, and What You Don't

> ⚠️ A marketplace handles real names, real transactions, and real money — treat analytics data with the same care as any other personal data. Track behavioral events (searches, views, clicks) without attaching more personal detail than necessary. Don't log full message content into your analytics tool just because it's convenient; message content belongs in your Messaging System's database, governed by the access rules from Authorization — not duplicated into a third-party analytics service with different access controls.

---

## Tooling: Don't Build a Custom Analytics Pipeline

| Approach | Personal-Mode Fit |
|---|---|
| Custom event-tracking pipeline + dashboards | No — significant build effort for a problem already solved |
| A managed product analytics tool (event tracking + funnels built in) | Yes — fast to integrate, funnel analysis is often a built-in feature |
| Database queries against your own Transaction/Listing tables for core business metrics | Yes, alongside a managed tool — some numbers (revenue, take rate, dispute rate) are simplest to compute directly from your own data |

> 💡 Some of your most important numbers — total transaction volume, actual take-home revenue after fees, dispute rate — are best computed directly from your own Transaction table, not from a third-party analytics tool. Reserve the managed analytics tool for behavioral funnel data (views, clicks, search patterns) that your own database wasn't designed to capture.

---

## Don't Let Analytics Delay Launch

> ⚠️ It's possible to spend real time building a comprehensive analytics setup before you have any users to generate data worth analyzing. At personal-mode scale, with a handful of early users, a simple event-tracking integration and a few direct database queries are enough. A polished analytics dashboard with zero real traffic teaches you nothing — ship first, refine measurement as real usage starts.

---

## AI Prompt: Setting Up Core Event Tracking

```
I'm building a personal-scale marketplace using [your stack] and
[your chosen analytics tool, or "not yet chosen"].

I need to track this funnel: listing created → approved → viewed →
message sent → checkout started → checkout completed — with drop-off
visibility at each step.

I also need these specific metrics computed directly from my database
(not the analytics tool): total transaction volume, net revenue after
Stripe fees, dispute rate as % of completed transactions, listings
per seller.

1. Recommend a lightweight analytics tool integration appropriate for
   this scale, with event tracking for the funnel above
2. Write the direct database queries for the four business metrics
   listed, using my existing Transaction/Listing schema [paste fields]
3. Flag anywhere I'd be tempted to log personally identifying or
   message content data into the analytics tool, and recommend
   against it
```

---

## Common Mistake: Tracking Everything "Just in Case"

> ⚠️ Tracking every possible event from day one, without a specific question each one answers, produces a wall of data nobody reviews. Start with the funnel and the four core business metrics above — add a new tracked event only when you have a specific question it would answer, mirroring the same discipline applied to required listing fields back in Listing System.

---

## What You Should Walk Away With

1. The core listing-to-sale funnel instrumented with drop-off visibility
2. Direct database queries for revenue, transaction volume, dispute rate, and listings-per-seller
3. A lightweight analytics tool integrated, scoped to behavioral events only
4. Confirmed discipline around not logging unnecessary personal or message data

Admin Panel, next, is where you'll actually act on what this data shows you — approving listings, resolving disputes, and reviewing the same metrics defined here, all from one minimal internal tool.
