---
title: Dashboard Strategy
slug: dashboard-strategy
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Dashboard Strategy

Most internal tools have a "home screen" — the view you land on first, the one you'll see most often. This module decides what that view actually needs to show, before you get to wireframes and start arranging boxes on a page.

Get this wrong and you'll build a beautiful screen that answers questions you don't actually ask yourself.

---

## A Dashboard Is a Question, Not a Layout

Before thinking about widgets, charts, or lists, answer this: **what question do you actually open this tool to answer?**

> **Example**
> You don't open your invoice tracker to admire your data. You open it to answer: "Is anything overdue right now?" That single question should dominate the screen. Everything else is secondary.

If you can't state the one question your dashboard answers in a single sentence, you're not ready to design it yet — go back to your PRD's Success Criteria for the answer.

---

## Rank What Belongs on the Home Screen

Not every piece of data you're tracking deserves equal visual weight. Sort what you're storing into three tiers, based on how it maps to your core question.

| Tier | Definition | Example |
|---|---|---|
| **Primary** | Directly answers your core question — needs to be immediately visible | Overdue invoices, sorted first |
| **Secondary** | Useful context, but not urgent | Total amount currently owed |
| **Tertiary** | Nice to know, rarely acted on | All-time paid invoice count |

> **Rule of thumb**
> A personal-tool dashboard should be readable in the time it takes to glance at your phone — under 5 seconds for the primary tier. If you have to scroll or search to find the thing you actually check daily, the hierarchy is wrong.

---

## Resist the Urge to Build a "Real" Dashboard

It's tempting, especially when you've seen polished SaaS dashboards, to add charts, trends, and summary statistics because they look professional. For a personal tool solving one specific pain point, most of that is decoration that adds build time without adding decisions.

> **Decision card**
> Ask, for every element you're considering: "Would I change what I do next based on seeing this?" If the honest answer is no, it belongs in Tertiary at most — or not on the dashboard at all.

---

## One Primary View, Not Several Competing Ones

A common mistake is designing a dashboard that tries to answer multiple unrelated questions at once — "what's overdue," "what's my monthly total," "which clients pay fastest" — all with equal visual weight. This usually means none of them get answered quickly.

> **Example**
> If "monthly total earned" and "what's overdue right now" both matter to you, don't give them equal space. Pick the one tied to your core pain point (overdue tracking) as primary, and let the other live in a secondary section or a separate, deliberately less prominent view.

---

## Consider What "Nothing to Show" Looks Like Here Too

Your dashboard will, ideally, sometimes have nothing urgent to report — no overdue invoices at all. This is a *good* outcome, and it deserves a moment of design thought now, even though the full Empty States module comes later.

- What does the dashboard communicate when everything is fine?
- Does "nothing overdue" feel like an absence (blank screen) or a positive confirmation ("All caught up ")?

For a tool you're checking daily out of low-grade anxiety about missing something, a clear "you're fine" state is often the single highest-value screen in the whole tool.

---

## Using AI to Sharpen the Dashboard's Focus

> **Copy this prompt**
> ```
> Here's my tool's core question and the data I'm tracking:
>
> Core question: [paste — e.g. "Is anything overdue right now?"]
> Data tracked: [paste your fields from Business Rules /
> requirements]
>
> Help me design the dashboard strategy:
> 1. Sort this data into Primary / Secondary / Tertiary tiers based
>    on how directly each piece answers my core question.
> 2. Challenge anything I've marked Primary that might actually be
>    Secondary — I want to be strict here, not generous.
> 3. Suggest what a strong "all clear, nothing urgent" state should
>    communicate, given my core question.
>
> Don't suggest charts, graphs, or analytics widgets unless they
> directly serve my core question — I want to avoid decorative
> complexity.
> ```

> **Watch out for building a dashboard for the wrong user**
> If you're building this for eventual use by other people too, don't assume everyone shares your core question. Note that distinction now — for a truly personal tool, one dashboard for one question is right; for a shared tool, this may need revisiting once you reach multi-user considerations.

---

## What You Should Have Now

- A single, clearly stated core question your dashboard answers
- Your tracked data sorted into Primary / Secondary / Tertiary tiers
- A decision on what the "all clear" / empty state should communicate
- Confidence that nothing decorative is competing for space with your primary tier

With the dashboard's priorities set, the next module — Wireframes — turns this hierarchy into an actual layout, deciding where each tier lives on the screen.
