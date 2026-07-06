---
title: Empty States
slug: empty-states
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 10–15 min
---

# Empty States

You flagged empty states as a "revisit later" note back in User Flows and Dashboard Strategy. This is that revisit. Every list-based screen in your tool has at least one moment with zero data — and for an invoice tracker or similar tool, "zero overdue items" is actually the outcome you want most of the time.

---

## Two Very Different Kinds of Empty

Not all empty states mean the same thing, and treating them identically wastes an opportunity to make the tool feel genuinely well-made.

| Type | Meaning | Example |
|---|---|---|
| **Good empty** | Everything is fine — nothing needs your attention | "No overdue invoices — you're all caught up " |
| **Neutral empty** | You simply haven't added data yet (first use) | "No invoices yet — add your first one to get started" |

Confusing these is a real usability miss: a first-time user (or you, on day one) seeing "you're all caught up " before ever entering data is misleading — there's nothing to be "caught up" on yet.

---

## Design the "Good Empty" State Deliberately

This is the state your dashboard should ideally be in most often, if the tool is doing its job. It deserves to feel like a small reward, not just an absence of content.

> **Example**
> Instead of a blank list under the "Overdue" header, show: " Nothing overdue — nice work." This reframes "no data" from looking broken to confirming the tool is actively working *for* you.

- Does your "nothing urgent" state clearly read as good news, not as a missing feature?
- Is it visually distinct from a loading state or an error (so you're never unsure which one you're looking at)?

---

## Design the First-Use Empty State With a Clear Next Step

The very first time you (or anyone) opens the tool, there's no data at all. This state should point directly at the one action that solves it — not just describe the absence.

> **Weak version**
> "No invoices."

> **Better version**
> "No invoices yet. Add your first one to start tracking." + a visible "+ Add Invoice" button right there in the empty state, not just in the header.

> **Tip callout**
> Put the primary action directly inside the empty state, not only in a header icon. The first thing a new (or returning-after-a-break) user needs is an obvious, unambiguous next step — don't make them hunt for the "+" button.

---

## Check Every List for Its Own Empty Case

Go back through your wireframed screens and confirm each list-based view has a defined empty state — not just your main dashboard.

- Invoice List — no invoices at all (first use)
- Invoice List — invoices exist, but none overdue (good empty)
- Search/filter results — no matches for the current search

That third case is easy to miss and easy to get wrong — "no results" reading like "no data at all" can make you think something's broken with the whole tool, rather than just your search term.

---

## Keep the Tone Consistent With the Rest of the Tool

An empty state is a small moment of personality, but it shouldn't clash with the plain, functional tone of the rest of a personal internal tool. A little warmth ("Nice work," "You're all caught up") is welcome — elaborate illustrations or lengthy copy are effort spent where it won't be seen often.

> **Decision card**
> One short sentence and, optionally, a simple emoji or icon is enough. If you're spending more than a few minutes designing an empty state, that effort is likely better spent elsewhere in the tool.

---

## Using AI to Draft Empty State Copy

> **Copy this prompt**
> ```
> Here are the empty states my tool needs:
>
> [list each: e.g. "Invoice List, first use — no invoices at all,"
> "Invoice List, good empty — no overdue invoices,"
> "Search — no results for current query"]
>
> For each, write a single short sentence of copy that:
> 1. Clearly distinguishes "nothing here yet" from "everything is
>    fine, nothing needed"
> 2. Points to the next action, if there is one
> 3. Matches a plain, functional tone — no marketing language
> ```

---

## What You Should Have Now

- A distinct "good empty" state for when nothing needs attention
- A distinct first-use empty state with a clear, visible next action
- Every list-based screen checked for its own empty case, including search results
- Copy that's short, clear, and consistent in tone with the rest of the tool

With both loading and empty states covered, the next module — Error States — handles the third and final non-happy-path: what the tool shows when something actually goes wrong.
