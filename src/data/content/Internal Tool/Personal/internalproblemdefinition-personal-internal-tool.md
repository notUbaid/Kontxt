---
title: Problem Definition
slug: problem-definition
phase: Phase 0
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Problem Definition

Every internal tool that gets abandoned halfway through has the same root cause: the problem was never actually defined. "I want to build a tracker for X" is a feature idea, not a problem definition. Feature ideas lead to scope creep. Problem definitions lead to finished tools.

This module gets you to a single, precise sentence that will guide every decision from here forward.

---

## The Difference Between a Feature and a Problem

> **Feature idea**
> "I want a dashboard that shows my client invoices."

> **Problem definition**
> "I lose track of which clients haven't paid, and I find out too late to follow up politely — so I either chase people awkwardly late or eat the loss."

The feature idea tells you *what to build*. The problem definition tells you *why it matters* and *what "solved" looks like*. You need the second one first. The first one falls out of it naturally.

---

## The Problem Definition Formula

Fill in this template. Don't skip ahead to solutions — stay in the problem space.

```
Right now, [who] has to [current process],
which causes [specific negative outcome],
happening [how often],
costing [time / money / stress / errors].
```

**Example:**
> Right now, *I* have to *manually check five different client email threads to see who still owes me money*, which causes *late or missed invoices*, happening *every week*, costing *2-3 hours and occasional lost income when I forget entirely*.

Notice what's absent: no mention of dashboards, databases, or tech stack. That comes later. A problem definition that already contains a solution is a red flag — it means you're designing before you understand.

---

## Why Specificity Beats Ambition

> **Common mistake**
> "I want to build a tool to manage my entire freelance business."

This isn't wrong, exactly — it's just too large to be useful yet. A problem this broad will produce an MVP that tries to do everything and finishes nothing.

Compare:

| Vague | Specific |
|---|---|
| "Manage my freelance business" | "Know at a glance which invoices are overdue" |
| "Organize my job search" | "Stop losing track of which recruiters I've already followed up with" |
| "Improve my team's workflow" | "Know who's supposed to approve a request before it stalls for a week" |

Specific problems produce specific tools. You can always expand scope later — Phase 6 exists exactly for that. Right now, the goal is the smallest true problem that's actually worth solving.

---

## A Test for Whether Your Problem Is Real

Ask these three questions. If you can't answer "yes" to at least two, keep refining.

- **Has this problem cost you something concrete in the last 30 days?** (time, money, a missed deadline, an awkward conversation)
- **Would you still care about solving this if no one ever saw the tool but you?**
- **Can you describe the current workaround in one sentence?** (a spreadsheet, a sticky note, a mental list — if the workaround is "I just remember," that's a real pain point)

> **Watch out for "resume-driven" problems**
> It's tempting to invent a problem because it sounds impressive to build ("I'll make a Kanban board!"). Tools built for a problem that doesn't really exist get abandoned at 60% completion, because there's no real annoyance pulling you back to finish it. Pick something that actually bothers you.

---

## Using AI to Pressure-Test Your Definition

Once you have a draft problem definition, use AI to find the gaps — not to write the definition for you. AI is good at spotting vagueness you're too close to see.

> **Copy this prompt**
> ```
> Here is my problem definition for an internal tool I'm building:
>
> "[paste your definition]"
>
> Challenge it:
> 1. Is this actually a problem, or a solution in disguise?
> 2. Is it specific enough to build a small first version against?
> 3. What's the simplest possible workaround I haven't considered
>    (e.g. a spreadsheet, a naming convention, a recurring reminder)
>    that would make this tool unnecessary?
> 4. What question am I not answering yet?
>
> Be direct. Don't validate me — help me sharpen this.
> ```

This third question matters more than it looks. If a spreadsheet with a color-coded column would genuinely fix your problem, that's worth knowing *before* you spend a weekend building software. Not every real problem needs custom software — but if you're here to learn engineering by building something real, a slightly-oversized tool for practice is a legitimate choice too. Just make that choice knowingly.

---

## Write Your Problem Definition

Use the formula above. Keep it to one or two sentences. You'll carry this forward into the next module, where you'll map the actual workflow this problem lives inside.

> **Before moving on**
> Read your definition out loud. If it contains the words "dashboard," "app," "system," or "platform" — you've slipped into solution language. Strip those out and describe only the pain.
