---
title: Tables
slug: tables
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 20-30 min
---

# Tables

If forms are how data gets in, tables are how you find it again. For internal tools, the table view is often the screen you'll stare at the most — which makes it worth more care than a generic data grid.

---

## Start With the Question, Not the Columns

Before building the table, answer: **what question does this view help me answer, most often?**

"All my orders" is not a question. "Which orders need action today" is. The default sort, default filter, and visible columns should all point at that answer — not just mirror every field in your schema.

>  **Tip:** A table with 15 columns because "the schema has 15 fields" is a common generated-code default and a common UX mistake. Show what you scan daily; put the rest behind a row-click into detail view.

---

## The Non-Negotiables for a Working Table

| Feature | Why it's not optional |
|---|---|
| Pagination or virtualized scrolling | Rendering every row unbounded will eventually freeze the page as data grows |
| Server-side (not client-side) filtering/sorting, once data grows | Client-side is fine at first, but silently breaks once you're not fetching the whole table anyway |
| Loading state | Distinguishes "empty because loading" from "empty because there's no data" |
| Empty state | Tells the user what to do next, not just a blank table |
| Row-level actions accessible without extra clicks | Internal tools live or die on how fast common actions (edit, delete, approve) are to reach |

---

## Client-Side vs. Server-Side: Decide Deliberately

For a personal-mode internal tool with modest data volume, client-side filtering/sorting on an already-fetched page of data is simpler and often the right call — don't over-engineer this for a table with 200 rows.

**Switch to server-side when any of these is true:**
- The full dataset is too large to reasonably fetch in one request
- Filters need to search across data not present on the current page
- Load time is noticeably degrading as data grows

> ️ **Warning:** Building server-side filtering prematurely, for a table that will realistically hold a few hundred rows, adds real complexity for no benefit. Match the solution to the actual data volume, not the volume a SaaS product might have.

---

## AI Prompt: Generate the Table

```
Build a table view for [Entity] records.

Schema:
[paste the relevant table definition]

The primary question this table answers: [e.g., "which orders need my action today"]

Requirements:
- Show these columns by default: [list 4-6 columns, the ones actually scanned regularly]
- Default sort: [field + direction]
- Default filter: [if any — e.g., "status != completed"]
- Support [pagination / infinite scroll] since expected row count is [your realistic estimate]
- Row click opens [detail view / inline expand / edit form] — specify which
- Include [row-level actions] accessible directly from the table, e.g. quick status change
- Show a clear empty state when there's no data, and a distinct loading state while fetching
```

**Why specifying "expected row count" matters:** it stops the AI from defaulting to enterprise-scale patterns (virtualized infinite scroll, server-side everything) for a table that will hold 300 rows, or under-building pagination for one that will hold 50,000.

---

## Validating the Generated Table

-  **Confirm loading and empty states are actually different UI**, not the same blank space
-  **Test sort and filter together** — a common generated-code bug resets the filter when you change sort, or vice versa
-  **Check pagination state survives a page refresh** if that matters for your workflow (bookmarking page 3, for example)
-  **Confirm row-level actions don't require navigating away** for the most common operations — if "mark as done" needs a full page load, that's friction you'll feel daily
-  **Look for unbounded queries** — if pagination exists in the UI but the underlying query still fetches everything, you haven't actually solved the scaling problem, just hidden it

>  **Tip:** Load the table with your seeded edge-case data from the Database module (long text values, nulls, boundary dates) and confirm nothing overflows or breaks the layout. Generated tables are usually tested against clean, short sample data — real data won't be that polite.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Showing every schema field as a column | Turns a daily-use screen into something you have to scroll and squint at |
| No distinction between loading and empty | Users can't tell if something's broken or if there's genuinely no data |
| Building server-side everything for a small dataset | Unnecessary complexity that slows down development for no real benefit |
| Row actions buried behind multiple clicks | Adds friction to the actions you'll perform most often |
| Testing only with clean sample data | Real data (nulls, long strings, edge dates) breaks layouts that looked fine in testing |

---

## Before You Move On — Checklist

- [ ] The table's default view answers a specific, real question — not just "show everything"
- [ ] Loading, empty, and populated states are visually distinct
- [ ] Pagination (or virtualization) matches my actual expected data volume — not over- or under-built
- [ ] Common row-level actions are reachable without leaving the table
- [ ] I tested the table against realistic/edge-case seed data, not just clean samples
- [ ] Sort and filter work correctly together, not just independently

---

## What's Next

With forms feeding data in and tables surfacing it back out, you have a working data loop. Next, you'll add the automation that makes this an actual *tool* rather than a glorified spreadsheet — workflow automation.
