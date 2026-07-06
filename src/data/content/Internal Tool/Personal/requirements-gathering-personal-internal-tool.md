---
title: Requirements Gathering
slug: requirements-gathering
phase: Phase 0
mode: personal
projectType: internal-tool
estimatedTime: 20–25 min
---

# Requirements Gathering

You know your top pain point. Now you need to translate it into requirements — the specific, testable statements that tell you (and later, AI) exactly what the tool must do. This is the last step before you start making build-vs-buy and scope decisions, so precision here saves rework everywhere downstream.

---

## Requirements Are Not Features

A feature is a noun: "invoice dashboard." A requirement is a testable statement: "the tool must show me which invoices are more than 7 days overdue." The second one can be verified — you can look at the finished tool and say yes or no, does it do this. The first one can't.

> **Rule of thumb**
> If you can't imagine how you'd check whether a requirement is met, it's not specific enough yet.

---

## Two Types of Requirements

Split your requirements into two categories. Beginners usually only think about the first — but the second is what makes a personal tool pleasant to actually use.

**Functional requirements** — what the tool must *do*
> "The tool must let me mark an invoice as paid."
> "The tool must flag invoices overdue by more than 7 days."

**Non-functional requirements** — how the tool must *behave*
> "The tool must load my invoice list in under 2 seconds."
> "The tool must be usable from my phone, since I check it during the day."
> "The tool must not require me to log in more than once a week."

For a personal internal tool, non-functional requirements are often what determines whether you actually keep using it. A tool that's functionally perfect but annoying to open dies just as fast as one that's missing features.

---

## Derive Requirements From Your Top Pain Point

Take the top-ranked pain point from the previous module and break it into requirements directly. Don't invent new ones — every requirement should trace back to something you already identified.

**Worked example — "Forgetting to follow up on overdue invoices":**

| # | Requirement | Type |
|---|---|---|
| 1 | Tool must store invoice amount, client, and due date | Functional |
| 2 | Tool must visually flag invoices overdue by 7+ days | Functional |
| 3 | Tool must let me mark an invoice as paid | Functional |
| 4 | Tool must be checkable in under 30 seconds, since I'll glance at it daily | Non-functional |
| 5 | Tool must work without me manually re-entering data I already have in email | Non-functional |

Notice requirement 5 — it's a constraint that will directly influence a Build vs. Buy decision in the next module. Write these down now, even if you don't yet know how they'll be satisfied.

---

## Separate "Must Have" From "Would Be Nice"

Every requirement gets one label. Be strict — "must have" should be reserved for things that, if missing, mean the tool doesn't actually solve your top pain point.

- **Must have** — the tool fails at its core job without this
- **Nice to have** — genuinely useful, but the tool still works without it

> **Example**
> "Flag overdue invoices" → Must have (this *is* the pain point)
> "Color-coded client tags" → Nice to have (pleasant, not load-bearing)

Everything labeled "nice to have" moves to your deferred list from the previous module. This is what keeps your MVP small enough to actually finish — see the MVP Scope module for how this list becomes your version 1 boundary.

---

## Requirements You're Tempted to Skip (Don't)

Two categories get missed constantly in personal projects, precisely because it's "just for me":

> **Data requirements**
> Even a single-user tool needs you to think about: what happens if I lose this data? Do I need it backed up anywhere, or is losing it genuinely low-stakes? Write down your honest answer — it will shape a real decision in Phase 4 (Backup Strategy).

> **Failure requirements**
> What should happen if you enter a due date wrong, or the tool can't save your input? "Nothing, it's just for me" is a legitimate answer for a personal tool — but write it down as a decision, not an oversight.

---

## Using AI to Extract Requirements You Haven't Noticed

> **Copy this prompt**
> ```
> Here's my top-priority pain point and the process it comes from:
>
> Pain point: [paste]
> Process map: [paste, or summarize]
>
> Help me derive requirements:
> 1. List the functional requirements implied by this pain point —
>    only what's needed to actually solve it, nothing extra.
> 2. Suggest 2-3 non-functional requirements I might be missing
>    (speed, accessibility from different devices, how often I'd
>    realistically check it).
> 3. Flag any requirement that sounds like it's secretly a "nice to
>    have" dressed up as a "must have."
>
> Keep this focused on my top pain point only — don't expand scope
> to the rest of my workflow yet.
> ```

> **Validation warning**
> AI will sometimes generate requirements for a "complete" version of your idea — auth systems, multi-user support, admin panels — none of which a solo personal tool needs on day one. Cut anything that doesn't trace directly back to your top pain point.

---

## What You Should Have Now

- A list of functional requirements, each specific enough to verify
- A short list of non-functional requirements (speed, device, frequency of use)
- Every requirement labeled Must Have or Nice to Have
- An honest answer on data loss and failure handling, even if it's "doesn't matter here"

These "must have" requirements are what the next module, Automation Opportunities, will map against actual tools and techniques — deciding what gets built versus what gets solved with something simpler.
