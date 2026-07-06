---
title: Existing Pain Points
slug: existing-pain-points
phase: Phase 0
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Existing Pain Points

Your process map has steps marked  Automate and  Assist. That's a list of *candidates* — not a build plan. This module ranks them, so your first version targets the one or two pain points that actually matter, instead of trying to fix everything at once.

---

## Why Ranking Matters More Than Listing

A personal internal tool that tries to solve five pain points at once usually solves zero of them well — and burns your motivation before any of it ships. A tool that solves the single worst pain point, well, gets used. Used tools get iterated on. Unused tools get abandoned.

> **Rule of thumb**
> Your MVP should target the pain point that is simultaneously the most frequent and the most costly — not the one that's most interesting to build.

---

## Score Each Pain Point

Take every  and  step from your process map and score it on two dimensions, 1–5:

- **Frequency** — how often does this actually happen? (1 = rarely, 5 = constantly)
- **Cost** — how much does it hurt when it happens? (1 = mild annoyance, 5 = real time/money/consequence lost)

| Pain point | Frequency | Cost | Score (F × C) |
|---|---|---|---|
| Forgetting to follow up on overdue invoices | 4 | 5 | 20 |
| Manually copying invoice amounts into notes | 5 | 2 | 10 |
| Deciding if a client is "repeat" | 3 | 1 | 3 |

Multiply the two numbers. The highest score is your strongest candidate for what to build first — not necessarily what feels most "automatable" or most fun to code.

> **Tip callout**
> Resist the urge to score everything a 5. If you're honest, most pain points cluster in the 2–3 range for frequency or cost. Reserve 4–5 for things that genuinely disrupt your week or cost real money.

---

## Distinguish Annoyance from Actual Cost

Not everything that bothers you is actually expensive. A step can feel tedious but cost very little — and a step that feels routine can be quietly expensive.

> **Example**
> "Manually copying invoice amounts" *feels* tedious every time you do it, but if it only takes 30 seconds, its real cost is low. "Forgetting to follow up," by contrast, might feel like nothing until you notice you're owed $2,000 three months late. Score the actual consequence, not the irritation level.

---

## Watch for Pain Points That Aren't Really Yours to Solve

Some frustrations in your workflow come from someone else's process, not your own — a client who's slow to respond, a bank that takes days to clear a deposit. No internal tool fixes another person's behavior or an external system's speed.

- Is this pain point something *I* control the process for?
- Or is it dependent on someone else's action, outside my system?

If it's the latter, your tool can *surface* the problem (e.g., "flag invoices with no response in 7 days") but shouldn't be designed to *eliminate* it — that's an unrealistic bar that sets your MVP up to feel like it failed even when it's working correctly.

---

## Rank and Cut

Sort your scored list. Then apply a hard rule:

> **MVP scope rule**
> Your first version addresses the top-scoring pain point only — maybe the second, if it's tightly related. Everything else goes on a list for later phases. Writing it down now, explicitly deferred, makes it easier to say no without feeling like you're losing the idea.

**Deferred list example:**
- Auto-categorizing clients as repeat vs. new *(scored 3 — later)*
- Exporting a monthly summary PDF *(scored 4 — Phase 6 candidate)*

---

## Using AI to Sanity-Check Your Ranking

> **Copy this prompt**
> ```
> Here are the pain points from my current workflow, each scored on
> frequency (1-5) and cost (1-5):
>
> [paste your scored list]
>
> Review this ranking:
> 1. Does the frequency × cost math actually reflect real impact, or
>    am I over/under-scoring anything based on how "annoying" it
>    feels rather than what it actually costs?
> 2. Is my top-ranked pain point something I fully control, or does
>    it depend on someone else's behavior?
> 3. If I could only fix one thing next month, does my top score
>    still hold up as the right pick?
>
> Push back if my ranking looks driven by what sounds fun to build
> rather than what actually matters.
> ```

---

## What You Should Have Now

- Every candidate pain point scored on frequency and cost
- A clear top pain point (and possibly a closely related second one)
- An explicit "deferred for later" list — so cut ideas don't feel lost
- Confirmation that your top pain point is something you actually control

This ranked list feeds directly into the next module — Requirements Gathering — where your top pain point gets translated into concrete requirements for your MVP.
