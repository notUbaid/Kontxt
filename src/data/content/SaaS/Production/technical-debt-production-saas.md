---
title: Technical Debt
slug: technical-debt
phase: Phase 6
mode: production
projectType: saas
estimatedTime: 20-25 min
---

# Technical Debt

Technical debt doesn't show up on your feature roadmap, which is exactly why it loses to every feature that does. Nobody opens a ticket titled "the codebase is slightly worse than yesterday." It accumulates silently until a routine change takes three times longer than it should, and only then does anyone notice the cost was real all along.

This module is about making that invisible cost visible enough to compete fairly for engineering time — not about eliminating it, which isn't realistic or even desirable.

---

## The Core Idea: Not All Debt Is Bad, and Not All Debt Is the Same

"Technical debt" gets used as a catch-all guilt word. It's more useful to think of it the way the metaphor actually implies: a deliberate or accidental loan against future velocity, taken out for a reason.

> ** Tip**
> Some debt is *good* debt — a shortcut taken deliberately to ship and validate an idea faster, with a clear plan to pay it down once you know the feature matters. Other debt is *bad* debt — code that's just poorly understood, accumulated by accident with no one tracking it. Treat these differently; only one of them was a real tradeoff decision.

---

## Step 1: Classify Your Debt

**Decision Card — Technical Debt Types**

| Type | Example | How It Accumulates |
|---|---|---|
| Deliberate, tracked | "We hardcoded this instead of building a config system, because we needed to ship the MVP" | A conscious shortcut, ideally written down somewhere |
| Deliberate, untracked | Same shortcut, but nobody wrote it down and the reasoning is now lost | Same origin, worse outcome — the team forgets why it exists |
| Accidental | Code that grew organically without anyone deciding on an architecture | No single decision point — just incremental drift |
| Inherited | Debt from a library, framework, or pattern that's now outdated or unsupported | External dependency aging out from under you |

Deliberate, tracked debt is the healthiest kind — it was a real tradeoff, made with eyes open, and it's findable later. The goal isn't to avoid all debt; it's to convert the other three categories into this one wherever possible.

---

## Step 2: Make It Visible — Write It Down Where It Will Actually Be Seen

The single highest-leverage practice here is absurdly simple and constantly skipped: **write debt down the moment you create or discover it**, in the same place you track features.

**Best Practice Card — A Debt Entry Worth Keeping**

```
Title: Hardcoded plan limits in billing service
What: Subscription tier limits are hardcoded constants instead of
      being stored in the database / config.
Why it exists: Shipped fast for launch with 3 fixed plans.
Cost if left alone: Every new plan requires a code deploy instead
                     of a config change. Currently low cost (3 plans,
                     rare changes). Will become a real cost if we
                     add custom enterprise pricing.
Trigger to fix: When we sign our first custom-pricing enterprise deal.
```

This format does the actual work: it explains the tradeoff, names the real cost, and — critically — defines a **trigger** for when it stops being acceptable. Debt entries without a trigger condition just sit on a list forever, never quite urgent enough to address.

> **️ Warning**
> A technical debt backlog that only ever grows and never gets paid down isn't a tracking failure — it's a sign that debt items are being logged without real cost analysis attached. If every single entry feels equally vague and equally low-priority, the team has no actual way to compare them against feature work, and debt will always lose that comparison by default.

---

## Step 3: Give Debt a Fair Shot Against Features

Debt loses to features in prioritization conversations because its cost is diffuse (a little slower, every time) while a feature's benefit is concrete (a specific customer gets a specific thing). Counter this by translating debt cost into the same currency you use for feature impact.

- **Translate to velocity:** "This debt adds roughly 2 extra days to every billing-related feature we ship" is comparable to a feature's RICE score in a way "the code is messy" never will be.
- **Translate to risk:** "This debt means a single bad migration could corrupt subscription data with no rollback" is a severity argument, not a tidiness argument — frame debt with real failure consequences in those terms.
- **Reserve a fixed capacity, not a one-time sprint.** Teams that allocate a consistent slice of every cycle (e.g., 15-20% of engineering time) to debt paydown tend to actually pay it down. Teams that wait for a dedicated "debt sprint" tend to keep deferring it, because there's always a more urgent feature request crowding it out.

---

## Using AI to Identify and Triage Debt

AI is genuinely strong at spotting code smells, inconsistent patterns, and structural issues across a codebase systematically — better than a tired human doing a manual pass. It can't know your business context, so it can flag *what* looks risky but not *whether* it's currently worth fixing.

**Prompt: Codebase Debt Audit**

```
Review this code for technical debt specifically in these categories:
duplicated logic, missing error handling on external calls, outdated
or deprecated dependency usage, and any pattern that would make a
common future change (e.g., adding a new field, adding a new plan
tier) disproportionately difficult.

For each issue found, state:
1. What it is, specifically
2. What kind of future change it would make harder, and how much harder
3. Whether this looks like deliberate debt (a clear shortcut) or
   accidental drift

Do not flag stylistic preferences (naming, formatting) unless they
create a genuine functional risk.

[paste relevant code]
```

> ** Why this prompt works**
> Asking the model to connect each issue to a specific future change it would complicate turns a generic "this code is messy" critique into the velocity-cost framing from Step 3 — something you can actually weigh against a feature in a prioritization conversation. Excluding pure style nitpicks keeps the output focused on debt with real consequences, the same discipline applied to code review prompts elsewhere in this curriculum.

**Token efficiency note:** Run this audit on the specific area you're about to touch next (the module you're adding a feature to), not your entire codebase at once. A focused audit of code you're already working in produces actionable findings; a full-codebase audit produces an overwhelming list most of which won't matter for months.

---

## Validating AI's Debt Findings

- **Verify the claimed future difficulty is real**, not a generic concern that applies to any code pattern in the abstract. "This could be hard to extend" is a weak claim unless tied to something you actually plan to extend.
- **Check whether flagged "deprecated" dependency usage is actually deprecated currently** — verify against the library's real, current documentation rather than trusting the model's training-data knowledge, which may be outdated (see the product-self-knowledge skill's broader caution about relying on memory for anything that changes over time).
- **Resist treating every finding as equally urgent.** Apply the same trigger-condition thinking from Step 2 — ask "what would have to be true for this to matter" before adding it to an active priority list.

---

## Quick Reference: A Sustainable Debt Practice

1. Classify debt by type — deliberate tracked debt is healthy, accidental untracked debt is the real problem
2. Write every debt item down with a cost and a trigger condition, not just a vague complaint
3. Translate debt cost into velocity or risk terms so it can compete fairly against feature requests
4. Reserve consistent capacity every cycle rather than waiting for a dedicated cleanup sprint
5. Use AI to find debt systematically, but apply your own judgment on what's actually worth fixing now

---

## What's Next

With both your forward roadmap and your accumulated debt honestly accounted for, move to **Presentation Prep** — translating everything you've built and learned into a narrative you can communicate clearly to investors, customers, or your own team.
