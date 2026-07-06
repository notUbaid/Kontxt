---
title: Automation Opportunities
slug: automation-opportunities
phase: Phase 0
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Automation Opportunities

You have "must have" requirements. Before you assume every one of them needs custom software, it's worth asking a harder question: does this requirement need a *tool*, or does it need *automation* — and are those the same thing?

This module exists to stop you from building a full application to solve something a scheduled script, a spreadsheet formula, or a five-minute integration could handle.

---

## Three Levels of Solving a Requirement

For each "must have" requirement, there are usually three possible levels of solution, in increasing order of effort:

| Level | What it means | Example |
|---|---|---|
| **1. Manual, but smarter** | Same process, less friction (a template, a checklist, a naming convention) | A spreadsheet with a formula that auto-flags overdue rows |
| **2. Automated, no custom app** | A script, scheduled task, or existing tool wired together | A script that emails you a daily overdue-invoice summary |
| **3. Custom internal tool** | Purpose-built software with its own interface | A web app with a dashboard, database, and UI you build from scratch |

Most beginners jump straight to Level 3 for everything. Sometimes that's the right call — especially if you're here specifically to learn how to build software, which is a legitimate reason on its own. But make that choice knowingly, requirement by requirement.

> **Rule of thumb**
> If a requirement can be fully satisfied at Level 1 or 2, and you're not specifically trying to practice building that part, don't build it. Save your Level 3 effort for requirements that genuinely need an interface.

---

## Walk Each Requirement Through the Levels

Take your "must have" list from the previous module and ask, for each one:

- Could a spreadsheet formula or template solve this?
- Could a scheduled script or existing no-code automation solve this?
- Does this genuinely need a custom interface — a place to click, view, and interact?

**Worked example:**

| Requirement | Could Level 1 solve it? | Could Level 2 solve it? | Needs Level 3? |
|---|---|---|---|
| Flag invoices overdue 7+ days | Yes — conditional formatting | Yes — scheduled email digest | Only if you want it visual and interactive |
| Store invoice data reliably | Partially | Yes — a simple database + script | Yes, if you want to query/filter it easily |
| Check status in under 30 seconds | No — spreadsheets aren't fast to open on mobile | No | Yes — this is genuinely a UI requirement |

This is where you'll notice something important: not all your requirements point to the same level. It's common — and correct — for a personal internal tool to be Level 3 for the core interaction, while quietly relying on a Level 1 or 2 solution for something in the background (like a backup or a notification).

---

## When Building Custom Is the Right Call — Even If a Shortcut Exists

If your primary goal here is learning software engineering, choosing Level 3 for a requirement that *could* be solved more simply is a valid, deliberate decision. The test is whether you're choosing it on purpose.

> **Decision card**
> Ask yourself honestly: "Am I building this custom because the requirement genuinely needs it, or because I want the practice?" Either answer is fine. What's not fine is not asking the question at all.

---

## Where Automation Quietly Reduces Scope

Sometimes an automation you set up at Level 1 or 2 removes an entire requirement from your custom tool's scope entirely — which directly shrinks what you need to build in Phase 3.

> **Example**
> If a scheduled script already emails you a daily overdue summary, your custom tool no longer needs to solve "notify me" at all — it only needs to handle "let me manage and update records," which is a meaningfully smaller build.

Look back at your requirements list and cross out anything now fully handled by a Level 1 or 2 solution. What remains is the real scope for your custom tool.

---

## Using AI to Find Automation You Haven't Considered

> **Copy this prompt**
> ```
> Here are my "must have" requirements for a personal internal tool:
>
> [paste your requirements list]
>
> For each one, tell me:
> 1. Could this be solved with a spreadsheet, template, or naming
>    convention alone?
> 2. Could this be solved with a simple scheduled script or existing
>    no-code automation, without a custom interface?
> 3. Does this genuinely require a custom interface to work well?
>
> Be honest even if the answer is "you don't need custom software
> for this" — I'd rather know now than after building it.
> ```

> **Watch out for over-automating**
> Not every manual step is worth automating, even if it's technically possible. A step you do once a month and takes two minutes usually isn't worth an hour of automation setup. Automation earns its complexity through frequency, not through being technically interesting.

---

## What You Should Have Now

- Each "must have" requirement evaluated against all three solution levels
- Any requirements now fully solved by something outside your custom tool, crossed off
- A remaining, smaller list of requirements that genuinely need a custom interface
- An honest note on which Level 3 choices are deliberate learning decisions, if any

This trimmed list is exactly what the next module, Build vs. Buy, will evaluate — deciding whether even your remaining custom-tool requirements are better served by an existing product.
