---
title: Business Process Mapping
slug: business-process-mapping
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Business Process Mapping

In Phase 0, you mapped how your process works *today* — the manual, current-state version. In User Flows, you mapped how the tool's screens will work. This module overlays the two, checking that the interface you're about to design actually fits the real process, instead of quietly reshaping the process to fit whatever was easiest to design.

This is a short but important check — skipping it is how tools end up technically functional but subtly wrong to use.

---

## Why This Overlay Matters

It's easy, while designing screens, to simplify away a detail from your real process because it's inconvenient to build. That simplification can feel harmless in the moment and turn into a tool that doesn't actually match how you work — meaning you fall back to your old manual habit anyway.

> **Rule of thumb**
> If a step in your real process map has no corresponding place in your user flow, that's not necessarily wrong — but it needs to be a deliberate decision, not an accident.

---

## Line Up the Two Maps Side by Side

Take your Phase 0 process map and your Phase 1 user flow. For each real-world step, find its counterpart in the new flow — or confirm it was deliberately left out.

| Real process step (Phase 0) | Corresponding screen/action (Phase 1) | Status |
|---|---|---|
| Client sends invoice payment terms | *(happens outside the tool — email)* | Deliberately out of scope |
| Log amount + due date | Add Invoice Form |  Covered |
| Check if 7+ days overdue | Invoice List, red badge |  Covered |
| Decide "repeat client" discount | *(none)* | ️ Not covered — check: was this deferred on purpose? |
| Mark as paid | Invoice Detail → "Mark Paid" |  Covered |

The ️ row is the entire point of this exercise. It's not automatically a problem — you may have deliberately deferred "repeat client" logic in Phase 0. This table just forces you to confirm that, rather than discover the gap mid-build.

---

## Watch for Steps the Tool Accidentally Adds

The reverse gap matters too: sometimes a screen introduces a step that doesn't exist in your real process at all, adding friction rather than removing it.

> **Example**
> If your Add Invoice Form requires selecting a "category" for every invoice, but your real process never involved categorizing anything, you've added a step — not removed one. Ask: does this field trace back to an actual requirement, or did it get added because it "seemed useful" while designing?

---

## Confirm Business Rules Survived the Translation

Go back to the Key Business Rules section of your PRD. For each rule, confirm it's expressed somewhere concrete in your user flow — not just implied.

- Is every business rule from the PRD visible as a specific screen behavior, badge, or validation?
- Are there any rules that exist only in your head and haven't made it into a screen yet?

> **Example check**
> PRD rule: "An invoice is overdue if more than 7 days past due and not marked paid." Flow: Invoice List shows a red badge under that exact condition.  — the rule made it through intact.

---

## When the Real Process Should Change, Not the Tool

Occasionally, this overlay reveals that your *real* process has a step that's genuinely worth eliminating — not translating into the tool, but dropping entirely, because the tool makes it unnecessary.

> **Example**
> If your old process included "periodically re-check email for payment confirmations," and your new tool lets you mark paid directly and confidently, that manual re-checking step simply goes away. That's a legitimate outcome — note it, don't force a UI element to replicate a step that's now obsolete.

---

## Using AI to Check for Silent Gaps

> **Copy this prompt**
> ```
> Here is my original process map from Phase 0:
>
> [paste process map]
>
> Here is my planned user flow for the tool:
>
> [paste user flow]
>
> Compare them:
> 1. Which real-world steps have no equivalent in the new flow?
>    For each, tell me if it looks like a deliberate simplification
>    or a likely oversight.
> 2. Does the new flow introduce any steps or fields that don't
>    trace back to anything in the real process?
> 3. Are all my business rules from the PRD expressed as concrete
>    behavior somewhere in the flow?
>
> Flag anything uncertain rather than assuming it's fine.
> ```

---

## What You Should Have Now

- A side-by-side table mapping every real process step to its counterpart in the new flow (or a deliberate "out of scope" note)
- Confirmation that no unnecessary steps were silently added by the interface
- Every PRD business rule traced to a specific, visible behavior in the flow
- Any real-world steps that are now genuinely obsolete, noted as such

With the flow verified against reality, the next module — Business Rules — formalizes each rule into the precise, implementable form your database and code will rely on directly.
