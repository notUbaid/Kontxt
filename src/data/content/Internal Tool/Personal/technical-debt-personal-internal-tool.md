---
title: Technical Debt
slug: technical-debt
phase: Phase 6
mode: personal
projectType: internal-tool
estimatedTime: 15-20 min
---

# Technical Debt

This is the final module in the internal tool journey. Technical debt is the quiet accumulation you can't see in any single module — every shortcut taken under Phase 3's "move fast" pressure, every "I'll fix this properly later" that never got revisited. This module is about making that debt visible and deciding, deliberately, what to do about it.

---

## Not All Debt Is Bad — That's the Point

Technical debt isn't a mistake to feel guilty about. Personal mode explicitly encouraged trading long-term polish for speed and learning throughout this build — that was the right call, repeatedly. The problem isn't that debt exists. The problem is debt that's invisible, or debt that's compounding somewhere you're not watching.

**The goal of this module: make your debt visible and intentional, not eliminate it.**

---

## Where Debt Likely Accumulated

Look back across specific modules where speed was explicitly prioritized over completeness:

| Source | What to check now |
|---|---|
| CRUD/Forms (early Phase 3) | Any validation or error handling deferred as "good enough for now" |
| Workflow Automation | Any automation built with a simple `if` that's since needed to handle more cases than it does |
| Testing | Anything on the "low priority, skip for now" list that's since become higher-stakes |
| Bulk Operations | Any confirmation/safety step that felt like overkill at the time, revisited now that real usage exists |
| Process Improvements | Anything repeatedly deferred across multiple improvement batches without ever being addressed |

>  **Tip:** The most useful debt to find isn't the code that looks ugly — it's the code whose original assumptions have quietly stopped being true. A shortcut that was fine at 20 records and is now running against 2,000 is exactly the kind of debt worth finding.

---

## A Simple Debt Audit

Rather than a vague "review the codebase," ask a specific question per area:

**"What did I build quickly here, and has the reason I rushed it changed?"**

- If the reason (low stakes, low volume, uncertain requirements) still holds — the debt is fine to leave as-is
- If the reason no longer holds (this is now used daily, holds real data, has real consequences) — that's debt worth addressing

This mirrors the same "measure before you optimize" discipline from the Performance module — don't fix debt based on how it looks, fix it based on whether its original justification still applies.

---

## AI Prompt: Technical Debt Audit

```
Review this codebase for technical debt, specifically looking for:

1. Validation or error handling that was deliberately simplified for speed (check TODO comments, simplified error messages, or missing edge case handling)
2. Any place a hardcoded value or assumption was made that might no longer hold (e.g., "handles up to X records" style limits)
3. Duplicated logic that was copy-pasted instead of shared, especially between similar entities
4. Any automation or bulk operation with weaker safety checks than similar ones elsewhere in the codebase

For each item found:
- Explain what shortcut was taken and why it was likely reasonable at the time
- Assess whether the original justification (low stakes, low volume, uncertainty) likely still holds today
- Don't recommend fixing everything — flag which items seem genuinely worth addressing now versus fine to leave
```

The instruction not to recommend fixing everything matters — an audit that flags every possible improvement as urgent isn't useful; you need it to help you prioritize, the same way the Process Improvements module did with feedback.

---

## Deciding What to Actually Fix

Apply the same frequency/friction/effort thinking from Process Improvements, with one addition specific to debt: **risk of silent failure.**

| Question | Why it matters here specifically |
|---|---|
| Does this debt risk silent data corruption or loss if it breaks? | This category deserves attention regardless of how rarely it's hit — the Security and Backup modules established why silent failure is worse than visible failure |
| Is this debt actively slowing down every future change in this area? | Debt that compounds (hard-to-modify code) costs more the longer it's left |
| Is this just cosmetic or stylistic? | Usually fine to leave — this doesn't meaningfully cost you anything |

> ️ **Warning:** Debt with silent-failure risk deserves different treatment than debt that's merely inconvenient. A shortcut that could quietly corrupt data under a condition you haven't hit yet is worth fixing proactively, even if it hasn't caused a visible problem — the same principle from the Security module's threat modeling.

---

## Addressing Debt: Same Discipline as Everything Else

Fixing debt isn't exempt from the practices built throughout this journey — if anything, it deserves more care, since you're changing code that's been quietly relied upon:

- Route schema-related debt through migrations, never manual changes
- Re-run your test suite, and add tests for the specific gap you're closing
- If it touches an automation, re-verify the failure-handling rigor from that module
- Update documentation if the fix changes how the tool behaves for a user

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Treating all technical debt as equally urgent | Wastes effort on low-risk cosmetic issues while real risk elsewhere goes unaddressed |
| Feeling obligated to eliminate debt entirely | Personal-mode debt was often the right tradeoff at the time — it doesn't all need fixing |
| Ignoring debt with silent-failure risk because it hasn't caused a visible problem yet | Silent failure risk doesn't announce itself until it's already costly |
| Fixing debt without the same rigor (tests, migrations) as original development | Debt fixes touching real, relied-upon code deserve at least as much care |
| Never revisiting this at all | Debt compounds quietly; an occasional deliberate pass keeps it visible instead of invisible |

---

## Before You Move On — Checklist

- [ ] I identified debt by checking whether original shortcuts' justifications still hold, not just by how the code looks
- [ ] Debt was prioritized using frequency, friction, effort, and specifically silent-failure risk
- [ ] I'm at peace with deliberately leaving some debt as-is, and can say why
- [ ] Debt fixes went through the same discipline (tests, migrations, review) as original development
- [ ] I have a plan to revisit this occasionally, rather than treating it as a one-time pass

---

## You've Completed the Internal Tool Journey

From Phase 0's problem definition through this final module, you've built a real, working internal tool — deliberately scoped for personal-mode use, with the judgment to know what deserved rigor and what deserved a fast, pragmatic shortcut. That judgment, more than any single module, is the actual skill this journey was built to teach.
