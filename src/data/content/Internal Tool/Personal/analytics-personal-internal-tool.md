---
title: Analytics
slug: analytics
phase: Phase 6
mode: personal
projectType: internal-tool
estimatedTime: 15-20 min
---

# Analytics

Phase 6 is about running this tool over time, not just shipping it. Analytics here means something narrower than a product-analytics platform — it's about knowing whether the tool is actually working the way you intended, so you can improve the right things instead of guessing.

---

## Analytics for an Internal Tool Means Something Different

Public-product analytics answers "how do we grow." A personal internal tool doesn't need that question answered — it needs a much smaller one:

**"Is this tool actually doing what I built it to do?"**

That's a narrower, more answerable question, and it's what this module focuses on.

---

## What's Actually Worth Tracking

Go back to the original problem this tool was built to solve (Phase 0 — Problem Definition) and ask what would prove it's working.

| Original goal | What to track |
|---|---|
| "Save time on X manual process" | How often the tool is used for X, roughly how long each use takes |
| "Reduce errors in Y" | Whether errors/corrections are actually less frequent than before (compare to your pre-tool baseline if you have one) |
| "Make Z visible/reportable" | Whether the reports (from the Reports module) are actually being checked, not just built |

If you can't connect a metric back to the original reason you built this tool, it's probably not worth tracking — this is the same discipline from the Reports module: build for real questions, not hypothetical dashboards.

---

## The Lightest Useful Approach

For personal-mode scale, you almost never need a dedicated analytics platform. What you likely already have is enough:

- **Database queries** — "how many records were created this week" is just a query against data you already have, not a new tracking system
- **The reports you already built** — Phase 3's Reports module may already answer most of what you'd want to know
- **Simple event logging**, only if you need to track something not naturally captured as a database record (e.g., "how many times was the search feature used" — a click, not a stored entity)

> ️ **Warning:** Adding a dedicated analytics service (even a free one) for a personal internal tool is usually solving a problem you don't have. Most of what you'd want to know is already answerable from your existing database — reach for a new tool only if there's a specific question your current data genuinely can't answer.

---

## AI Prompt: Build a Usage Summary

```
Build a simple usage summary for my internal tool, answering these specific questions:
[list your real questions — e.g., "how many records created per week over the last 8 weeks", "which features/pages are actually being used"]

Requirements:
- Use existing data (database records, timestamps already captured) wherever possible — don't introduce a new tracking system unless the question genuinely requires it
- If new event logging is needed for something not naturally captured as a record: [specify exactly what, e.g., "track when the search feature is used, with no personal data beyond a timestamp"]
- Present this as a simple view I can check periodically — reuse existing table/report components, don't build a separate analytics dashboard system
```

---

## Validating the Data

-  **Sanity-check the numbers against what you actually remember doing** — if the summary says you created 40 records this week and you know it was closer to 10, something's wrong with the query, not your memory
-  **Confirm any new event logging isn't capturing more than it needs to** — a timestamp and a feature name is usually enough; avoid logging unnecessary personal data even in a tool only you use, since habits here carry forward if the tool ever gets more users
-  **Check the summary actually maps back to your original goal** — if it doesn't help answer "is this working," reconsider whether it's worth keeping

---

## Using What You Learn

The point of this module isn't the dashboard — it's the decision it enables. After a few weeks of real data:

- If usage is much lower than expected, ask why — is the tool missing something, or was the original problem smaller than assumed?
- If a specific feature (search, a particular report, bulk operations) is barely used, that's a signal for the Process Improvements module later, not necessarily a problem to fix immediately
- If the tool is being used constantly for something it wasn't originally designed around, that's worth noting — it may point to where the tool should grow next

>  **Tip:** Revisit this roughly monthly, not daily. Personal-mode usage patterns take a little time to become meaningful — checking too frequently mostly just shows noise.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Adding a dedicated analytics platform for a personal tool | Solves a scale/complexity problem you don't have |
| Tracking metrics with no connection to the original problem | Data collected with no clear use, cluttering the picture |
| Not sanity-checking numbers against lived experience | A wrong query can produce a confident, wrong answer |
| Logging more detail than a question actually requires | Unnecessary data collection, even in a low-stakes personal tool |
| Checking usage data too frequently to draw meaningful conclusions | Short time windows mostly show noise, not real patterns |

---

## Before You Move On — Checklist

- [ ] Every metric tracked connects back to the tool's original purpose
- [ ] I used existing data/reports wherever possible, rather than adding new tracking infrastructure
- [ ] Any new event logging captures the minimum needed, nothing extra
- [ ] I sanity-checked the numbers against what I actually remember happening
- [ ] I have a realistic cadence (not daily) for reviewing this going forward

---

## What's Next

With a way to know if the tool is working, the next step is understanding usage patterns at a more granular level — usage tracking.
