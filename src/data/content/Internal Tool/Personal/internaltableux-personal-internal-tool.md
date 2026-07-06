---
title: Table UX
slug: table-ux
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Table UX

Your form gets data in. This module covers how that data gets displayed back to you — as a list or table — in a way that's actually scannable at a glance, not just technically present on screen.

For most internal tools, the list view is where you'll spend the majority of your time. It deserves more thought than "just show all the rows."

---

## A List Is an Answer, Not a Dump

Go back to your Dashboard Strategy core question. Your list view exists to answer that question quickly — it's not a database viewer. Every design decision here should serve that one question first.

> **Rule of thumb**
> If you have to read every row to find the one that matters, the list has failed its job — regardless of how complete or accurate the data is.

---

## Sort Order Is a Business Rule, Not a Detail

You may have already written a sort rule in your Business Rules module. If not, write one now — sort order is one of the highest-leverage decisions in a list view, because it determines what you see first without any effort.

**Worked example:**

```
Rule name: Invoice List Sort Order
Condition: N/A (applies to all rows)
Result: Overdue invoices first (soonest due date = most overdue,
        shown at top), then upcoming invoices by due date ascending,
        then paid invoices last (or hidden by default — see below)
```

> **Tip callout**
> Default sort should always put the thing you'd act on first at the very top. If "act on this" and "default sort" don't match, you'll develop a habit of manually re-scanning every time — friction that compounds daily.

---

## Decide What's Hidden by Default

Not every row needs to be visible all the time. Paid invoices, completed tasks, closed records — these are usually historical, not actionable. Hiding them by default keeps the list focused on what actually needs attention today.

- What status or category of record is no longer actionable?
- Should it be hidden entirely, collapsed into a "show completed" toggle, or moved to a separate view?

> **Example**
> Paid invoices don't need daily visibility — collapsing them behind a "Show Paid (12)" toggle keeps the primary view focused on the 2-3 rows that actually need your attention, while still keeping history accessible when you want it.

---

## Choose Columns Based on Scan Speed, Not Completeness

It's tempting to show every field you're storing. Resist this. A list view is read at a glance — every additional column is more for your eyes to process before finding the answer to your core question.

| Field | Show in list? | Reasoning |
|---|---|---|
| Client name | Yes | Needed to identify the row |
| Amount | Yes | Directly relevant to your core question |
| Due date | Yes | Drives the overdue calculation |
| Notes (if any) | No | Only needed in detail view, adds clutter |

> **Rule of thumb**
| A row in your list should be scannable in under 2 seconds. If it isn't, you likely have too many columns, or the wrong ones prioritized.

---

## Visual Weight Should Match Urgency, Not Just Presence

A red badge next to an overdue amount does more work than a neutral-looking cell containing the same information. Decide, deliberately, which values deserve visual emphasis versus which should stay quiet.

> **Example**
> Overdue amount → bold, red, maybe with a warning icon. Upcoming due date → normal text weight, muted color. Paid status → grey, de-emphasized. The visual hierarchy should let you distinguish "urgent" from "fine" without reading any text at all.

---

## Plan for the List to Grow

A list that looks fine with 5 rows can become unusable at 50. Even for a personal tool, think ahead one step:

- Does the sort order still make sense with many rows, or does it need grouping (e.g., "This Week" / "Later")?
- Is there a search or filter need once the list gets long enough that scrolling isn't enough?

For most personal internal tools, a simple search-by-name field is enough — you rarely need faceted filtering for a single-user list. Don't over-build this; add it only once you notice you actually need it.

---

## Using AI to Refine the List Design

> **Copy this prompt**
> ```
> Here's my core question and the fields I'm tracking:
>
> Core question: [paste]
> Fields: [list all fields]
> Current sort rule (if any): [paste]
>
> Help me design the list view:
> 1. Which fields should actually appear as columns, given my core
>    question — which should be cut to keep it scannable?
> 2. Is my sort order optimal for surfacing what needs action first?
> 3. What status or category of record should be hidden or collapsed
>    by default, and how should it be revealed when needed?
> 4. What visual emphasis (bold, color, icon) would help distinguish
>    urgent rows from routine ones, without adding new UI elements?
> ```

---

## What You Should Have Now

- A formalized sort rule that puts the most actionable data first
- A decision on what's hidden by default and how to reveal it
- A trimmed column list, chosen for scan speed over completeness
- A visual hierarchy plan distinguishing urgent from routine rows
- A basic plan for what happens as the list grows

With your data entry and data display both designed, the next module — Design System — establishes the visual language (colors, type, spacing) that ties every screen you've wireframed into one consistent tool.
