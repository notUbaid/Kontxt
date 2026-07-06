---
title: Reports
slug: reports
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 20-30 min
---

# Reports

Tables show you individual records. Reports answer a different kind of question — "how are things trending," "what's the total," "how many of X happened last month." This module is about building exactly the reports you'll actually look at, not a generic reporting engine.

---

## Start From the Question You Actually Ask Yourself

Before building anything, list the 2-4 questions you find yourself wanting to answer about this data. Not hypothetical questions — the ones you'd genuinely check weekly or monthly.

Examples for a typical internal tool:
- "How many records did we process this week vs. last week?"
- "What's our current total across all open items?"
- "Which status are most records stuck in right now?"

If you can't name a real question, you don't need a report yet — a well-built table view (from the Tables module) is often enough.

> ️ **Warning:** Reporting is one of the easiest places to overbuild in a personal internal tool. A dashboard with 10 charts nobody checks is wasted effort compared to 2 numbers you actually look at every week. Build for the questions you have, not the questions a "real" analytics dashboard might have.

---

## Three Report Types, Pick What You Actually Need

| Type | What it answers | Personal-mode complexity |
|---|---|---|
| Aggregate numbers (totals, counts, averages) | "How much / how many, right now" | Low — a single query, often the whole report |
| Trend over time | "Is this growing/shrinking" | Medium — needs a time-bucketed query |
| Breakdown by category | "What's the split across status/type/owner" | Low-medium — a GROUP BY query |

Most personal internal tools need some combination of the first and third. Trend-over-time is genuinely useful but costs more to build well — only add it for a question you'll check regularly, not because dashboards "should" have a chart.

---

## Computed at Query Time vs. Precomputed

For personal-mode scale, compute reports at query time (run the aggregate query when the report loads) rather than maintaining precomputed/cached summary tables.

**Switch to precomputing only if:**
- The underlying dataset is large enough that the query is noticeably slow
- The report is viewed often enough that recomputing every time is wasteful
- You're willing to handle the complexity of keeping a cached value in sync with the source data

>  **Tip:** "Noticeably slow" for a personal tool usually means multiple seconds, not milliseconds. Don't add caching complexity preemptively — a report that takes 200ms to compute doesn't need it.

---

## AI Prompt: Build a Report

```
Build a report that answers this question: [exact question — e.g., "how many Orders were completed each week for the last 8 weeks"]

Schema context:
[paste the relevant table(s)]

Requirements:
- [Aggregate query / time-bucketed query / grouped breakdown — specify which]
- Compute this at query time, not precomputed, given [your realistic data volume]
- Display as [a number / a simple bar chart / a table] — keep the visualization as simple as the question requires
- Handle the empty-data case (e.g., "no completed orders in this period" instead of a broken empty chart)
```

Keep this prompt scoped to one report at a time — a prompt asking for "a reporting dashboard" produces generic, unfocused output. A prompt asking for one specific question produces a report you'll actually trust.

---

## Validating the Generated Report

-  **Check the query's math against a manual count** — pick a small date range, count matching records yourself, and confirm the report agrees. Aggregate queries are exactly where subtle off-by-one or timezone bugs hide.
-  **Test timezone handling explicitly** if this is a time-bucketed report — "this week" means something different in UTC vs. your local timezone, and generated queries default to whichever the database happens to use
-  **Confirm the empty-data case renders sensibly**, not a broken chart or a `NaN`
-  **Check whether soft-deleted records are included or excluded** — if you're using soft deletes (from the CRUD module), the report needs to explicitly decide whether deleted records count
-  **Re-verify after real usage accumulates**, not just against seed data — seed data is often too uniform to reveal an aggregation bug that real, messy data will expose

> ️ **Warning:** Never trust a generated report's numbers on the first read. Manually verify at least one report against a small, countable sample before relying on it for a real decision — a silently wrong report is worse than no report, because it looks trustworthy.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Building a full dashboard before knowing what questions you actually ask | Wasted effort on charts that go unchecked |
| Precomputing/caching reports at personal-mode data volume | Added complexity (keeping cache in sync) for a performance problem you don't have |
| Not verifying report numbers against a manual count | A subtly wrong report looks just as convincing as a correct one |
| Ignoring timezone handling in time-bucketed reports | "This week" silently means the wrong week for your actual location |
| Forgetting to decide how soft-deleted records are treated | Report totals can be quietly inflated or deflated depending on an unexamined default |

---

## Before You Move On — Checklist

- [ ] Each report answers a specific question I actually ask myself, not a generic metric
- [ ] I manually verified at least one report's numbers against a small countable sample
- [ ] Time-bucketed reports handle timezone correctly for how I actually think about "this week/month"
- [ ] Empty-data states render sensibly, not broken
- [ ] I made a deliberate choice about whether soft-deleted records are included
- [ ] I did not precompute/cache reports without an actual performance reason to

---

## What's Next

With reports giving you visibility into your data, the next step is giving yourself (or trusted others) a dedicated space to manage the tool itself — the admin panel.
