---
title: Success Metrics
slug: success-metrics
phase: Phase 0
mode: personal
projectType: marketplace
estimatedTime: 20-25 min
filename: success-metrics-personal-marketplace.md
---

# Success Metrics

You now know who you're up against. Before you design or build anything, decide what "this is working" actually means — for your specific marketplace, not marketplaces in general. Without this, you'll find yourself three months in, unsure if the project is going well or quietly failing, with no real way to tell.

This module is short on purpose. The point isn't an exhaustive metrics dashboard — it's three or four numbers you'll actually look at.

---

## Why Generic Metrics Don't Work for Marketplaces

Most "success metrics" advice is written for single-sided products — an app with users, not a marketplace with two sides that depend on each other. A marketplace can have great total signups and still be completely broken if all the signups are buyers and there's nothing to buy.

> **Decision:** Every marketplace needs at least one metric per side (supply and demand) and one metric that measures whether the two sides are actually connecting. Total users alone tells you almost nothing about marketplace health.

---

## The Three Metrics That Actually Matter Early

| Metric | What it tells you | Example |
|---|---|---|
| **Supply count** | Is there anything to buy/use? | Number of active listings |
| **Demand engagement** | Are buyers actually showing up and looking? | Searches, listing views per week |
| **Successful matches** | Is the marketplace actually doing its job? | Completed transactions, messages that led to a deal |

A marketplace with 50 listings and zero completed transactions isn't a marketplace yet — it's a catalog. The third metric, successful matches, is the one that proves the core loop works. Prioritize getting a non-zero number here over growing the other two.

> **Tip:** For a personal project, "successful match" doesn't have to mean a processed payment. It can mean a buyer messaged a seller and they agreed on something outside the app. That still validates the core idea before you've built payments.

---

## Vanity Metrics to Ignore Early

These feel good and tell you almost nothing about whether the marketplace works:

- Total signups (without knowing the supply/demand split)
- Page views / time on site
- Social media followers
- App store downloads with no activation

> **Warning:** It's tempting to track these because they're easy to get and easy to show off. Resist building anything to optimize them this early — they don't tell you if the core exchange is happening, which is the only thing that matters before you have real users.

---

## Setting Realistic Numbers for a Solo Project

Don't borrow target numbers from funded startups — they have marketing budgets and teams you don't. Set numbers that are honest signals of progress for one person building part-time.

**Reasonable early targets for a personal marketplace, first 4-6 weeks after any real users arrive:**

- 10-20 real listings (not seed data) from actual people, not just yourself
- A handful of completed matches/transactions — even single digits is a real signal at this stage
- At least a few buyers returning a second time (the strongest signal that the experience was good enough to come back to)

These aren't impressive numbers. They're not supposed to be. They're enough to tell you, honestly, whether the core idea has legs before you invest more months into it.

---

## The One Question Behind All of This

Every metric in this module exists to answer one question: **is the exchange this marketplace exists to enable actually happening?**

Not "is the app being used." Not "do people like the design." Specifically: are the two sides finding each other and completing the thing your marketplace promises. If that's not happening at small scale with a handful of dedicated early users, more features or more polish won't fix it — the underlying idea or the trust/matching mechanism needs another look, which is exactly what the rest of Phase 0 is for.

---

## What to Actually Track (and How Simple It Can Be)

For a personal project, you do not need analytics infrastructure yet. A spreadsheet updated weekly is enough:

```
Week | Active Listings | Listing Views | Messages Sent | Completed Matches
1    |                |               |               |
2    |                |               |               |
```

> **Decision:** Don't build an analytics dashboard before you have users to put numbers in it. That's effort spent on infrastructure instead of validating the idea — exactly the kind of premature complexity Personal mode is designed to avoid. Revisit this once Phase 3's Analytics module is relevant.

---

## AI Prompts You Can Use

**Prompt 1 — Define metrics specific to your niche:**

```
I'm building a marketplace for [your niche]. Supply side is [who sells],
demand side is [who buys]. Suggest one supply metric, one demand metric,
and one "successful match" metric specific to this niche — not generic
marketplace metrics. Explain why each one is the right signal for this
specific exchange.
```

**Prompt 2 — Sanity-check your targets:**

```
Here are my early success targets for a solo-built marketplace with no
marketing budget: [paste your numbers]. Are these realistic for one
person, part-time, in the first 4-6 weeks of having real users? Push
back if they're too ambitious or too easy to be meaningful.
```

---

## Validating What AI Generates

- **Reject metrics that are generic SaaS metrics renamed** — "DAU/MAU" and "engagement score" aren't marketplace-specific; insist on supply/demand/match framing
- **Check suggested target numbers against your actual reach**, not industry benchmarks — AI sometimes anchors to numbers appropriate for a funded startup with a marketing budget you don't have
- **Make sure the "successful match" metric is actually measurable with what you're realistically building** — don't accept a metric that requires instrumentation you won't have until much later

---

## Implementation Checklist

- [ ] One supply-side metric defined, specific to your niche
- [ ] One demand-side metric defined, specific to your niche
- [ ] One "successful match" metric defined — the one that proves the core loop works
- [ ] Early targets set, honestly scoped to a solo part-time builder
- [ ] Simple tracking method chosen (spreadsheet is fine) — no premature dashboard

---

## What's Next

Next: **Marketplace Fundamentals** — the underlying mechanics every marketplace shares, which the rest of Phase 0's decisions build on.
