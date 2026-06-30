---
title: Growth Analytics
slug: growth-analytics
phase: Phase 6
mode: production
projectType: ecommerce
estimatedTime: 15-20 min
---

# Growth Analytics

Phase 5's Analytics Setup got events flowing — page views, funnel stages, purchases. This module is about turning that raw event stream into a small number of numbers you actually check and act on. Growth-stage analytics isn't about collecting more data; it's about asking better questions of the data you already have.

---

## Where This Fits

No new tracking is added here. This module is the analytical layer on top of Phase 5's instrumentation and the order data accumulating since launch — plus the repeat-purchase questions introduced in the Retention module.

---

## Why More Data Isn't the Answer

> **⚠️ Warning:** The most common mistake at this stage isn't too little data — it's too many dashboards nobody checks. A personal store owner has limited time; a dashboard with thirty metrics gets opened once and abandoned. Five numbers, checked weekly, beats thirty numbers checked never.

The goal of this module is narrowing, not expanding.

---

## What You're Building Today

- A short list of metrics that actually drive decisions, not just describe activity
- A simple cohort view: how repeat-purchase rate changes as your store matures
- Channel attribution: which traffic sources actually produce paying customers, not just visitors
- A weekly review habit — five minutes, same five numbers, every time

You're **not** building a custom BI tool or a real-time dashboard. A scheduled query or your analytics tool's built-in reports, checked on a fixed cadence, is the right scope here.

---

## The Five Numbers Worth Checking Weekly

| Metric | What It Tells You | Where It Comes From |
|---|---|---|
| New visitors | Top-of-funnel reach | Phase 5 analytics tool |
| Conversion rate (visitor → purchase) | Whether the store itself is doing its job | Phase 5 funnel events |
| Average order value | Whether upsells/pricing are working | Order data |
| Repeat purchase rate | Whether retention efforts are working | Order data, from the Retention module's query |
| Revenue by traffic source | Where to spend limited time/budget | Analytics tool, channel attribution |

> **💡 Tip:** Write these five numbers down somewhere — a spreadsheet, a notes doc, doesn't matter — every week, even informally. The trend across weeks is more valuable than any single week's number; a static dashboard you glance at doesn't build that trend the way a recorded log does.

---

## Channel Attribution: Knowing What's Actually Working

Visitors arrive from search, social, direct links, maybe early word of mouth. Not all traffic is equal — this is where limited marketing time should concentrate.

**Copy Prompt:**

```
Help me set up channel attribution reporting in [your analytics tool],
so I can see, for each traffic source (organic search, social, direct,
referral):

1. Number of visitors
2. Conversion rate to purchase
3. Revenue generated

I want to identify which channels are actually producing paying
customers versus just traffic, so I can prioritize where to spend
limited time on marketing efforts in upcoming growth work.
```

> **⚠️ Common Mistake:** Treating all traffic sources as equally valuable based on visitor count alone. A channel with fewer visitors but a much higher conversion rate is often a better use of limited time than a high-traffic, low-conversion one — the revenue-by-source view catches this, visitor count alone doesn't.

---

## Cohort Thinking: Is Retention Actually Improving?

This builds directly on the repeat-purchase query from the Retention module — now tracked over time instead of as a single snapshot.

**Copy Prompt:**

```
Using my order data, help me build a simple cohort view: group
customers by the month of their first purchase, then show what
percentage of each monthly cohort made a second purchase within
60 days.

I want to see whether repeat-purchase rate is improving, staying flat,
or declining as my store matures and as I add retention efforts from
the Retention module.
```

> **✅ Best Practice:** A single repeat-purchase percentage tells you where you are. A cohort view — tracked monthly — tells you whether your retention efforts are actually working, which is the more useful question once you've started acting on them.

---

## Setting Up the Weekly Review

- [ ] Pick a fixed day/time to check the five numbers — consistency matters more than frequency
- [ ] Record the numbers somewhere, even a simple spreadsheet row per week
- [ ] After a few weeks, look for trend, not just the latest snapshot
- [ ] When a number moves unexpectedly, ask why before reacting — a single bad week is often noise, a multi-week trend is signal

---

## Common Mistakes

- Building elaborate dashboards that get checked once and then ignored
- Reacting to single-week fluctuations as if they were trends, before enough data exists to tell the difference
- Treating all traffic sources as equally worth pursuing without checking which actually convert to revenue
- Tracking repeat-purchase rate as a single current number instead of a trend over cohorts, missing whether retention work is actually improving things
- Adding new tracking events instead of first asking whether the five core metrics already answer the question at hand

---

## Validation Checklist

- [ ] The five core metrics are identified and can be pulled without building new tracking
- [ ] Channel attribution shows revenue by source, not just visitor count by source
- [ ] A cohort view of repeat-purchase rate by first-purchase month is available, even if early cohorts are small
- [ ] A weekly review habit is actually scheduled, not just intended

---

## AI Review Prompt

```
Review my analytics setup for an e-commerce store at the growth stage.
I'm tracking: [list your five metrics and how you're getting them]

Check for:
1. Whether these five metrics are actually sufficient to guide growth
   decisions, or if something important is missing
2. Whether my channel attribution distinguishes traffic volume from
   actual revenue contribution
3. Whether my cohort/retention tracking would actually reveal if
   retention efforts are working over time, or just shows a static
   snapshot
```

---

## What Comes Next

You now know what to measure and how to read it. Next: **Roadmap** — turning what the data tells you into a prioritized plan for what to build or fix next.
