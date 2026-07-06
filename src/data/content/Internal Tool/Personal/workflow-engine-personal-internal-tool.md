---
title: Workflow Engine
slug: workflow-engine
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Workflow Engine

"Workflow engine" sounds like enterprise software — a system that routes tasks through approval chains and configurable stages. For most personal internal tools, you don't need one of those. You need something much smaller: a clear definition of the states your data moves through, and the rules for moving between them. This module is about right-sizing that.

---

## Do You Actually Have a Workflow?

Not every internal tool has one. A workflow exists when a record moves through distinct states over time, in a defined order — not just when data gets created, viewed, and edited.

- Does a record in your tool move through more than one meaningful status? (e.g., unpaid → paid)
- Are there rules about which transitions are allowed? (e.g., can you go from "paid" back to "unpaid"?)
- Does something (a date, an action) trigger a state change automatically, not just a manual click?

If you answered no to all three, you likely don't have a workflow to engineer — your tool is closer to simple CRUD (Create, Read, Update, Delete), which the next module covers directly. That's a completely valid, simple outcome — not every tool needs this module to produce much.

---

## Most Personal Tools Need a State Diagram, Not an Engine

If you do have a workflow, the right-sized solution is almost always a small, explicit state diagram — not a general-purpose configurable workflow system. Draw every state your data can be in, and every allowed transition between them.

**Worked example — invoice status:**

```
[Unpaid] ──(mark as paid)──> [Paid]
   ↑                             │
   └────(mark as unpaid)─────────┘
```

Two states, two transitions, both manually triggered. This is the entire "workflow engine" a tool like this needs — implemented as a single status field with a couple of allowed values, not a separate system.

---

## Automatic State Changes Need Explicit Triggers

If any transition happens automatically (not from a user clicking something), define exactly what triggers it — this connects directly back to your Business Rules module.

> **Example**
> "Overdue" isn't really a separate stored state in most designs — it's a *calculated* label, derived live from `due_date` and `status`, not a state something transitions into. Confirm which of your states are genuinely stored (like `paid`/`unpaid`) versus calculated on the fly (like `overdue`). Storing a calculated value redundantly is a common source of bugs when the underlying data changes but the stored label doesn't update.

- For each state, is it stored directly, or calculated from other fields?
- If calculated, is it being correctly treated as calculated everywhere in your tool — not accidentally also stored somewhere?

---

## Keep Transitions Symmetric Where Real Life Is Symmetric

Decide deliberately whether transitions are reversible. This is a business rule as much as a technical one, and it should already be resolved from earlier modules — this is where you confirm it's reflected structurally.

> **Example**
> If you can mark an invoice "paid" and then realize that was a mistake, can you un-mark it? If yes (as decided back in Business Rules), your state model needs both transitions defined, not just the forward one. An easy bug to introduce is building only the "happy path" transition and forgetting the correction path exists.

---

## When You'd Actually Need a Real Workflow Engine

A genuine workflow engine — configurable stages, approval routing, conditional branching based on rules that change over time — becomes relevant when you have many possible states, complex conditional transitions, or multiple people involved in moving something through stages. For a single-user personal tool with a handful of statuses, this is almost always more infrastructure than the problem justifies.

> **Decision card**
> If your workflow has more than 4-5 states or transitions that depend on multiple conditions combined, it's worth pausing to check: is this workflow genuinely this complex, or did complexity creep in from over-designing? Revisit your MVP scope before building elaborate state logic.

---

## Using AI to Formalize Your State Diagram

> **Copy this prompt**
> ```
> Here's my data entity and its statuses, from my schema and
> business rules:
>
> Entity: [e.g. Invoice]
> Statuses/states: [list]
> Known transitions: [describe what you know]
>
> Help me formalize this:
> 1. Draw out every state and every valid transition between them.
> 2. Flag any state that's actually a calculated value (like
>    "overdue") rather than a truly stored state — and confirm it
>    shouldn't be stored redundantly.
> 3. Check whether any transition I've described as one-directional
>    should actually be reversible, based on my business rules.
>
> Keep this as a simple state diagram — don't propose a general
> workflow engine or configuration system unless the complexity
> genuinely requires it.
> ```

---

## What You Should Have Now

- A confirmed decision on whether this tool has a real workflow at all
- If it does, a complete state diagram with every state and valid transition
- Calculated states (like "overdue") clearly distinguished from stored states (like "paid")
- Reversibility of each transition confirmed against your Business Rules module

With your states and transitions defined (or confirmed unnecessary), the next module — Approval Workflow — covers a specific, common case: whether any transition in your tool requires a distinct approval step before it takes effect.
