---
title: Metrics & KPIs
slug: metrics-kpis
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Metrics & KPIs

You define your metrics before you build — not after. The reason is simple: what you measure shapes what you build. If you decide post-launch that retention is your north star, you'll look back and realize you didn't instrument the events needed to measure it. Defining metrics now means your analytics, your database schema, and your product decisions are all pointed at the same thing.

This module is not about setting up analytics tools. That's Phase 3. This is about deciding what matters, why it matters, and what you'll do when the numbers move.

---

## The Hierarchy of Metrics

Not all metrics are equal. They sit in a hierarchy, and confusing the levels is how teams end up optimizing for the wrong thing.

```
North Star Metric
       │
       ├── Leading Indicators (predict the North Star)
       │
       ├── Lagging Indicators (confirm the North Star)
       │
       └── Health Metrics (detect problems early)
```

You need one of each. Not ten. One.

---

## The North Star Metric

Your North Star is the single number that best captures the value your product delivers to users. When it goes up, your business is working. When it goes down, something is wrong.

It is not revenue. Revenue is an outcome of delivering value — not the delivery itself. A product that charges users before delivering value will show revenue going up right before churn destroys it.

Good North Star Metrics measure **value delivered**, not activity or vanity:

| Product Type | Weak Metric | Strong North Star |
|---|---|---|
| Project management | Signups | Projects completed per active team |
| Analytics SaaS | Dashboards created | Insights acted on per user per month |
| Communication tool | Messages sent | Conversations resolved per user |
| Document editor | Documents created | Documents shared and viewed |
| Financial SaaS | Reports generated | Decisions made from reports |

The test for a good North Star: if this number went up for the wrong reason — users gaming the metric, bots, low-quality actions — would you still consider it a success? If yes, it's the wrong metric.

Ask: **what does a user do that proves they got the value I promised?**

That action — the moment of achieved outcome — is your North Star.

---

## Leading Indicators

Leading indicators are early signals that predict whether your North Star will move in the right direction. They tell you weeks before the North Star moves whether you're on track.

For most SaaS products, leading indicators live in the activation and engagement layer:

**Activation rate** — the percentage of new users who reach the "aha moment" within their first session or first week. Define your aha moment precisely. It's the moment a user first experiences the core value you promised.

**Time to value** — how long it takes from signup to first meaningful outcome. Shorter is almost always better. If this number is climbing, something in your onboarding is breaking.

**Feature adoption rate** — the percentage of active users who use your core feature in a given period. If users aren't using the feature that delivers your value prop, they won't stick around.

**Session frequency** — how often users return. Frequency expectations vary by product type — a daily tool and a weekly tool are different products. Define what healthy frequency looks like for yours specifically.

---

## Lagging Indicators

Lagging indicators confirm that your North Star movement is real and sustainable. They move slowly, which is why you need leading indicators to act before lagging metrics deteriorate.

**Monthly Recurring Revenue (MRR)** — the total recurring revenue contracted for the current month. The fundamental SaaS health metric.

**MRR breakdown:**
```
New MRR          →  Revenue from new customers
Expansion MRR    →  Revenue from upgrades / upsells
Churned MRR      →  Revenue lost from cancellations
Contraction MRR  →  Revenue lost from downgrades
Net New MRR      →  New + Expansion - Churned - Contraction
```

**Monthly churn rate** — the percentage of customers or revenue lost each month. For early-stage SaaS targeting SMBs, below 3% monthly churn is healthy. Above 5% is a product problem, not a sales problem.

**Net Revenue Retention (NRR)** — the percentage of revenue retained from existing customers after accounting for churn, contraction, and expansion. Above 100% means your existing customer base grows even without new customers. This is the most important long-term health metric in SaaS.

**Customer Lifetime Value (LTV)** — average revenue per customer over their full relationship with your product. Calculated as: `(Average MRR per customer) ÷ (Monthly churn rate)`.

---

## Health Metrics

Health metrics don't measure growth — they detect failure early. You don't optimize for these. You monitor them and act when they break.

**Support ticket volume per active user** — rising support load per user signals product confusion or bugs, not growth.

**Error rate** — the percentage of user actions that result in an error. Should be below 1% in production. Rising error rates precede churn.

**Onboarding completion rate** — the percentage of new signups who complete your onboarding flow. If this drops, something changed in your onboarding or signup quality.

**Trial-to-paid conversion rate** — the percentage of trial users who convert to a paid plan. Industry average for B2B SaaS is 15–25%. Below 10% is a product or pricing signal worth investigating immediately.

**Payment failure rate** — the percentage of subscription renewals that fail. Should be below 5%. Rising payment failures need dunning flows and proactive outreach.

---

## Define Your Metrics Before You Build

For each metric you'll track, define it completely before Phase 3:

```
Metric: [Name]
Definition: [Exact calculation — leave no ambiguity]
Why it matters: [What decision does this metric inform?]
Target: [What does good look like at 30 / 90 / 180 days?]
Data source: [What events or database fields produce this?]
Owner: [Who is responsible for monitoring and acting on this?]
Alert threshold: [At what value does this trigger immediate action?]
```

The **Definition** field matters more than it looks. "Active user" means something different to every team that hasn't defined it. Define it once, now, before any instrumentation decisions are made. An active user is: `a user who has performed [specific action] at least [N] times in the last [period]`. Nothing vaguer than that.

---

## The Instrumentation Handoff

The metrics you define here become instrumentation requirements in Phase 3. Every metric needs underlying events.

Walk through each metric and identify what your system needs to track to produce it:

| Metric | Required Events |
|---|---|
| Activation rate | `user_signed_up`, `aha_moment_achieved` |
| Feature adoption | `core_feature_used` with user_id and timestamp |
| Trial conversion | `trial_started`, `subscription_created` |
| North Star | The specific action that proves value was delivered |
| Churn rate | `subscription_canceled` with reason |

This list becomes the event tracking spec your analytics setup is built from. If an event isn't defined here, it won't be tracked, and the metric that depends on it won't exist.

---

## Vanity Metrics to Ignore

These numbers feel good. They don't tell you if your product is working.

> [!WARNING]
> **Total signups**
>
> Signups measure marketing performance, not product value. A user who signs up and never returns is counted the same as one who uses your product daily. Track activation, not signups.

---

> [!WARNING]
> **Page views and sessions**
>
> Traffic is an input, not an outcome. High traffic with low activation means your marketing is working and your product isn't. Track what users do after they arrive.

---

> [!WARNING]
> **Features shipped**
>
> Output is not outcome. The number of features you ship tells you how fast you're building, not whether users are getting value. Track what users do with what you build.

---

> [!WARNING]
> **App store ratings / NPS alone**
>
> Sentiment metrics are useful context but make terrible north stars. Users who give you 5 stars still churn. Users who give you 3 stars sometimes stay for years. Track behavior, not sentiment.

---

## Use AI to Stress-Test Your Metrics

```prompt
I'm building a SaaS product with the following context:

Value Proposition: [paste yours]
Target User: [describe]
Core User Action (the moment they get the value): [describe specifically]

Here are the metrics I plan to track:

North Star: [your metric]
Leading indicators: [list]
Lagging indicators: [list]
Health metrics: [list]

Review these and tell me:

1. Is my North Star metric truly measuring value delivered — or is it
   measuring activity that could increase without users getting real value?
2. Do my leading indicators actually predict the North Star, or are they
   just correlated with it?
3. Are there any critical failure modes in my product that none of my
   health metrics would catch early?
4. What events would I need to instrument in my product to produce
   each of these metrics?
5. What metric am I not tracking that SaaS products in this category
   typically find most predictive of long-term retention?

Be specific to my product type and target user.
```

---

## Validation Checklist

- [ ] I have one North Star metric that measures value delivered, not activity
- [ ] My North Star is defined precisely enough that there's no ambiguity in calculation
- [ ] I have 2–3 leading indicators that predict the North Star
- [ ] I have 3–5 lagging indicators that confirm business health
- [ ] I have health metrics that would surface product failures before they become churn
- [ ] Every metric has a definition, target, data source, and alert threshold
- [ ] I've mapped each metric to the events needed to produce it
- [ ] I've removed all vanity metrics from my tracking plan
- [ ] The AI prompt has been run and the metrics updated accordingly

---

## Quick Reference

```
Metric Hierarchy
────────────────────────────────────────────────
North Star      →  Value delivered. One metric only.
Leading         →  Activation, time to value, feature adoption
Lagging         →  MRR, churn, NRR, LTV
Health          →  Errors, support load, payment failures

North Star Test
────────────────────────────────────────────────
If this metric rose due to low-quality actions or
gaming, would it still feel like success?
If yes → wrong metric. Find the real value action.

SaaS Benchmarks
────────────────────────────────────────────────
Monthly churn          <3%   healthy, <5% acceptable
Trial-to-paid          15–25% B2B average
NRR                    >100% means existing base grows
Payment failure rate   <5%

Metric Definition Format
────────────────────────────────────────────────
Metric:     Name
Definition: Exact calculation, no ambiguity
Why:        What decision does this inform?
Target:     Good values at 30 / 90 / 180 days
Source:     Events or DB fields required
Threshold:  Value that triggers immediate action
```
