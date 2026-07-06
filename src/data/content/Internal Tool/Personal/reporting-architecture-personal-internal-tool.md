---
title: Reporting Architecture
slug: reporting-architecture
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Reporting Architecture

Your dashboard (from Phase 1) answers one immediate question at a glance. Reporting is different: it's about looking at your data over time — trends, totals, summaries — rather than "what needs attention right now." Not every personal tool needs this. This module helps you decide, and if you do need it, keeps the implementation proportionate.

---

## Reporting Is Not the Same as Your Dashboard

It's easy to conflate these because both involve looking at aggregated data. The distinction matters architecturally:

| Dashboard | Reporting |
|---|---|
| "What needs my attention right now?" | "How has this looked over time?" |
| Checked frequently, often daily | Checked occasionally, often monthly or on-demand |
| Drives an immediate action | Informs a reflection or decision |

> **Example**
> "Which invoices are overdue right now" is a dashboard question. "How much did I invoice each month this year" is a reporting question. Same underlying data, completely different use pattern — and potentially, different technical requirements.

---

## Do You Actually Need Reporting for v1?

Go back to your MVP Scope module. If reporting-style features ("monthly summary," "trends over time") were deferred rather than included in your must-haves, that's a strong signal this module produces a short answer for you right now: not yet.

- Was any reporting-style feature explicitly included in your MVP's "must have" list?
- Or was it deferred to a later phase?

> **Rule of thumb**
> If reporting wasn't in your MVP scope, don't architect for it now. Revisit this module when you actually reach that deferred feature — needs often become clearer once you've used the tool for a while, and premature reporting architecture is easy to get wrong in ways that are annoying to fix later.

---

## If You Do Need It: Calculate on Read, Don't Pre-Aggregate

For the data volumes typical of a personal tool (hundreds or low thousands of records), you almost never need to pre-calculate and store summary numbers. Calculating them fresh, each time you view a report, is simpler, always accurate, and fast enough at this scale.

> **Example**
> "Total invoiced this month" can be calculated by summing matching rows every time you open the report screen — there's no need to maintain a separately stored, continuously updated running total. Storing a redundant pre-calculated value introduces a new failure mode: the stored number silently drifting out of sync with the real data.

> **Watch out for premature optimization**
> Pre-aggregation (storing summary values separately for speed) is a technique for datasets far larger than a personal tool will ever hold. Don't add this complexity based on patterns you've seen in production systems built for a different scale.

---

## Keep Reports Read-Only and Separate From Your Core Data

Whatever reporting view you build should only read from your existing schema — it shouldn't require new tables, new write paths, or changes to how your core data (like invoices) is structured. If a reporting need seems to require restructuring your schema, that's a sign to simplify the report, not complicate the schema.

- Can the report be built entirely from existing fields, using aggregation (sums, counts, groupings) at read time?
- Does adding this report require any change to how core data is created or stored? If so, reconsider the report's scope.

---

## Match Report Complexity to How Often You'll Actually Look

A report you'll check once a month deserves proportionally less engineering investment than a screen you use daily. Be honest about actual usage frequency before investing in polish or interactivity here.

> **Decision card**
> A simple table of numbers, generated on demand, is entirely sufficient for a monthly personal review. Interactive charts, date-range pickers, and export options are real features — but weigh their build cost against how often you'll genuinely use them before including them in scope.

---

## Using AI to Scope a Minimal Reporting View

> **Copy this prompt**
> ```
> Here's my data schema and the reporting question I actually want
> answered:
>
> Schema: [paste from Database Schema module]
> Question: [e.g. "how much did I invoice per month this year"]
>
> Help me design the simplest reporting approach:
> 1. Can this be answered with a read-time aggregation query against
>    my existing schema, with no new tables or stored summaries?
> 2. What's the simplest display format that answers this question
>    clearly, given I'll check it infrequently?
> 3. Flag if my question actually implies a schema change is needed
>    — and if so, suggest the smallest possible addition.
> ```

---

## What You Should Have Now

- A confirmed decision on whether reporting is in scope for this version at all
- If in scope, confirmation the report calculates from existing data at read time, with no new stored summary fields
- A report format matched to how infrequently you'll realistically check it

With your data architecture and reporting approach settled, the next module — Cost Estimation — puts a number on what your chosen stack and hosting decisions will actually cost to run.
