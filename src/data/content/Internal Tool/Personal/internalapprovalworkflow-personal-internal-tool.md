---
title: Approval Workflow
slug: approval-workflow
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 10–15 min
---

# Approval Workflow

An approval workflow means one person requests something and a different person has to sign off before it takes effect. Like Authorization (RBAC), this concept only makes sense when more than one person, with different roles, is genuinely involved. For most personal internal tools, this module will confirm you don't need one — quickly, and with a clear reason why.

---

## The One Question That Decides This

- Does any action in your tool require a *different person* to review or confirm it before it takes effect?

If you're the only user, the answer is almost always no — you don't need to approve your own actions. Marking an invoice paid, adding a record, or updating a status are all things you can do directly, with no intermediate review step. Confirm this and move on; there's nothing more to design here for a true single-user tool.

> **Rule of thumb**
> Approval workflows exist to create accountability *between* people. With one user, that accountability structure has no one to create it between.

---

## The Rare Legitimate Case: Two-Person Tools

If your User Architecture module identified a second occasional user (a partner, a family member, a co-founder for a very small shared tool), there might be one specific, real case where a lightweight approval step makes sense.

> **Example**
> A small shared expense tracker where one person logs an expense and the other should confirm it before it counts toward a shared total. This is a real approval need — but it's still small enough that it doesn't require a general-purpose workflow system, just one additional state and one additional check.

If this applies to you, model it as a simple extension of your existing state diagram from Workflow Engine, not a separate system:

```
[Submitted] ──(other person confirms)──> [Approved]
     │
     └──(other person rejects)──> [Rejected]
```

- Is there a real, specific action in my tool that benefits from a second person's confirmation?
- Can this be modeled as one additional state, rather than a new subsystem?

---

## What Not to Build

Resist adding approval steps that mimic "how real companies do it" without a genuine two-person need behind them. A few things to specifically avoid for a personal-mode tool:

- A general-purpose "request → approve → reject" system usable for any action
- Configurable approval chains or multiple approval levels
- Notifications routing approval requests to specific people by role

These solve real problems for teams and organizations. For a personal or two-person tool, they add real build time in exchange for a workflow that will realistically only ever have one specific use.

---

## Using AI to Confirm This Doesn't Apply

> **Copy this prompt**
> ```
> Here's my tool's user situation and workflow:
>
> Users: [paste from User Architecture]
> States/transitions: [paste from Workflow Engine]
>
> Confirm: does any part of this genuinely need an approval step
> where a different person reviews and confirms an action before it
> takes effect? If yes, suggest the smallest possible way to model
> it (as an additional state, not a new system). If no, just confirm
> that clearly so I can move on.
> ```

---

## What You Should Have Now

- A clear, confirmed answer on whether any approval step is genuinely needed
- If yes, a minimal model (one additional state, one confirming action) — not a general system
- If no, confirmation that this module requires no further design work for your tool

With workflow and approval questions settled, the next module — Integrations — covers whether your tool needs to connect to anything outside itself, like email or external services.
