---
title: Business Rules
slug: business-rules
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Business Rules

You've confirmed every rule from your PRD is expressed somewhere in your flow. Now you'll formalize each one into a precise, unambiguous statement — the exact form your database schema and code logic will implement directly in later phases.

This module produces the single most reused artifact from Phase 1. Every rule you write here gets referenced again in Architecture, Development, and Testing.

---

## What Makes a Rule "Formalized"

A business rule is formalized when it has no room for interpretation — when you, an AI tool, or your future self reading this in six months would all implement it identically.

> **Not formalized**
> "Flag invoices that are late."

> **Formalized**
> "An invoice is `overdue` when `today's date - due_date > 7 days` AND `status != 'paid'`."

The second version reads almost like code, because it's meant to become code. That's the target for every rule in this module.

---

## The Rule-Writing Template

For each business rule, fill out this structure:

```
Rule name: [short identifier]
Condition: [the exact, testable condition]
Result: [what happens when the condition is true]
Edge case: [what happens at the boundary — exactly 7 days? exactly $0?]
```

**Worked example:**

```
Rule name: Overdue Status
Condition: today's date is more than 7 days past due_date,
           AND status is not "paid"
Result: invoice displays with a red "Overdue" badge
Edge case: exactly 7 days past due = NOT yet overdue
           (overdue starts on day 8)
```

That edge case line matters more than it looks. "More than 7 days" and "7 or more days" produce different behavior on day 7 — and if you don't decide now, whoever (or whatever) implements this will guess, and might guess wrong.

---

## Find the Rules Hiding in Your Flow

Go back through your user flow and PRD, and pull out every place a decision gets made — not just the obvious ones.

- Every diamond/branch in your user flow → a rule
- Every badge, flag, or visual state → a rule about when it appears
- Every validation ("this field is required if...") → a rule
- Every sort order or filter → a rule about what determines it

> **Example: rules hiding in plain sight**
> "Invoice List shows overdue items at the top" sounds like a design detail, but it's actually a rule: *sort order = overdue first, then by due date ascending.* Write it down explicitly — sort logic is a common source of "wait, why is this in the wrong order" bugs later.

---

## Boundary Conditions Are Where Bugs Live

Every rule involving a number, date, or threshold has an edge case at the boundary. Resolve these now, while it costs you a sentence — not later, while it costs you a debugging session.

| Rule | Boundary question | Resolved answer |
|---|---|---|
| Overdue after 7 days | Is day 7 itself overdue? | No — overdue starts day 8 |
| Invoice amount must be positive | Can amount be exactly $0? | No — must be greater than $0 |
| Due date required | Can due date be in the past when created? | Yes — for invoices logged retroactively |

> **Tip callout**
> A fast way to find missing boundary decisions: for every number or date in a rule, ask "what happens at exactly this value?" If you don't have an instant answer, that's a decision you haven't made yet.

---

## Rules About Data You Haven't Thought Of Yet

Some rules aren't about display logic — they're about what's allowed to exist at all. These are easy to skip because they don't show up in a visual flow, only in what the system permits.

- Can two invoices have the same client and amount? (Probably yes — not a duplicate error)
- Can an invoice be un-marked as paid once marked? (Decide now — this affects your data model)
- Is there any field that must be unique?

> **Example**
> "Can an invoice be un-marked as paid?" seems like a minor UI question, but the answer changes your data model: if yes, `status` needs to be a toggle-able field, not a one-way flag. Decide this now — it's expensive to change after Phase 2.

---

## Using AI to Extract and Formalize Rules

> **Copy this prompt**
> ```
> Here's my PRD and user flow for a personal internal tool:
>
> PRD: [paste]
> User flow: [paste]
>
> Help me formalize business rules:
> 1. Extract every implicit rule you can find — including sort
>    orders, validations, and visual states I may not have described
>    as "rules."
> 2. For each rule, write it as: Condition → Result, precise enough
>    to implement directly.
> 3. For every rule involving a number, date, or threshold, ask me
>    the boundary question explicitly rather than assuming an answer.
>
> Flag anything where you had to guess at my intent instead of
> guessing silently.
> ```

> **Validation warning**
> When AI proposes a boundary answer on your behalf ("I'll assume overdue starts immediately at day 7"), don't accept it silently. Confirm it matches what you actually meant — these small assumptions compound into real behavior differences once implemented.

---

## What You Should Have Now

- Every rule from your flow and PRD written in Condition → Result form
- Every numeric or date-based rule with its boundary condition explicitly resolved
- Decisions made on data-existence questions (uniqueness, reversibility) that aren't visible in the UI
- A single reference list of all formalized rules, ready to hand to later phases

This rule list is what Phase 2 (Architecture) will translate directly into database constraints and validation logic — and what Phase 3 (Testing) will use to write test cases against. Keep it accurate; everything downstream trusts it.
