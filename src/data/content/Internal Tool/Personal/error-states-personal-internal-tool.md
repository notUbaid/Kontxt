---
title: Error States
slug: error-states
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Error States

This is the last module in Phase 1. Loading states covered "not yet." Empty states covered "nothing here." This one covers "something went wrong" — the least fun state to design, and the one most often skipped entirely in personal projects, right up until it happens to you mid-use with no explanation on screen.

---

## Why Skipping This Costs You Later

An undesigned error state doesn't mean errors won't happen — it means that when they do, you'll be staring at a frozen button, a silent failure, or a raw technical message, trying to guess whether your data saved or not. For a tool you rely on daily, that uncertainty is worse than the error itself.

> **Rule of thumb**
> Every action that can fail needs a defined response — even if that response is just one honest sentence. "Undefined" is not an acceptable error state.

---

## Categorize the Errors Your Tool Can Actually Hit

You don't need to handle every theoretical failure — just the ones realistic for how you'll actually use this tool. Go through your form and actions from earlier modules and sort likely failures into these buckets.

| Category | Example | Typical response |
|---|---|---|
| **Validation error** | Amount left blank | Inline message next to the field, form not submitted |
| **Network/connection error** | No internet when saving | "Couldn't save — check your connection and try again" |
| **Unexpected/system error** | Something fails for an unknown reason | Generic honest message + option to retry |

Notice validation errors were already covered in Forms Design — this module fills in the other two categories, which are about the tool's connection to its data, not just what you typed.

---

## Write Error Messages a Human Would Actually Understand

Raw technical errors ("Error 500: Internal Server Error") mean nothing to you in the moment, even though you built the tool yourself. Translate every likely error into plain language that tells you what happened and what to do next.

> **Weak version**
> "Request failed."

> **Better version**
> "Couldn't save this invoice — check your connection and try again. Nothing was lost; your entry is still here."

That last sentence matters enormously: telling someone their input is preserved, not wiped out, is often more valuable than the error explanation itself.

---

## Never Lose Input on Failure

This is the single highest-impact error-handling decision for a form-heavy personal tool: if a save fails, the data you typed should still be sitting in the form, untouched, ready to retry — not cleared as if nothing happened.

- If saving an invoice fails, does the form retain everything you entered?
- Is there a clear, obvious way to retry without re-typing anything?

> **Best practice**
> Design every error path around one principle: failure should never cost you the work you already did. This one rule prevents the most frustrating possible experience with a personal tool — redoing data entry because something broke.

---

## Decide What "Retry" Actually Means for Each Action

Not every failed action needs an automatic retry mechanism. For a personal tool, a simple, visible "Try Again" button the user taps intentionally is usually sufficient — automatic retries add complexity that rarely pays off at this scale.

> **Minimum viable retry**
> A button labeled "Try Again" that re-attempts the exact same action. No exponential backoff, no retry limits, no queuing — those are Production Mode concerns, not needed here.

---

## What Happens With Partial Failures

For a simple personal tool, most actions are single-step (save one invoice, mark one item paid), so partial failure is rare. But if any action in your tool involves multiple steps (e.g., saving a record and updating a related summary), decide now what happens if the first step succeeds and the second fails.

> **Example**
> If marking an invoice paid also updates a running "total collected" number, and the total update fails while the status change succeeds — what should the user see? For a personal tool, an honest "status updated, but totals may be out of date — refresh to check" is a reasonable, low-effort answer.

---

## Don't Over-Build Error Handling

A personal, single-user tool doesn't need centralized error logging, alerting, or elaborate recovery flows — those become relevant in Phase 4 (Production Readiness) if this tool ever needs that level of rigor. Right now, the bar is: every likely failure has an honest, plain-language message, and no failure destroys unsaved work.

> **Decision card**
> If you're using this project partly to practice production-grade error handling, note that explicitly as a learning goal — otherwise, keep this proportional to a tool only you will use.

---

## Using AI to Cover Your Likely Failure Cases

> **Copy this prompt**
> ```
> Here are the actions in my tool that can fail:
>
> [list actions — e.g. "save new invoice," "mark invoice as paid,"
> "load invoice list"]
>
> For each one:
> 1. What's the realistic failure mode (validation, network,
>    unexpected)?
> 2. Write a plain-language error message a non-technical version
>    of me would immediately understand.
> 3. Confirm whether user input would be preserved on failure — flag
>    any case where it might not be.
>
> Keep this proportional to a lightweight personal tool — no need
> for retry queues, logging systems, or elaborate recovery flows.
> ```

---

## What You Should Have Now

- Every likely failure categorized as validation, network, or unexpected
- A plain-language message written for each realistic failure
- Confirmation that no failure path clears or loses user input
- A simple, manual "Try Again" pattern defined for retryable actions

---

## Phase 1 Complete

You now have a full product design: a PRD, mapped user flows verified against your real process, formalized business rules, a dashboard hierarchy, wireframes, form and table design, a minimal design system, and every non-happy-path — loading, empty, and error — accounted for.

This is what Phase 2 (Architecture) will translate into an actual technical foundation: tech stack, data model, and system structure built to support exactly what you've designed here, nothing more.
