---
title: Loading States
slug: loading-states
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 10–15 min
---

# Loading States

Every screen that fetches or saves data has a moment where nothing has happened yet. This module decides what you see during that moment — a decision small enough to skip, but common enough that skipping it makes a personal tool feel broken every single day you use it.

---

## Why This Deserves Its Own Module, Briefly

A tool with no loading state doesn't feel fast — it feels unresponsive. The gap between tapping something and seeing a result is where trust in the tool is won or lost, especially on a slower connection or an older phone.

> **Rule of thumb**
> Every action that takes longer than about 300ms needs some visible acknowledgment. Below that threshold, a loading state just adds flicker; above it, silence reads as "did that even work?"

---

## Three Situations, Three Different Treatments

Not all loading is the same. Match the treatment to what's actually happening.

| Situation | Treatment |
|---|---|
| Initial screen load (opening the Invoice List) | Skeleton layout or simple spinner in place of content |
| Saving a form (Add Invoice) | Disable the save button, show inline "Saving..." text |
| Quick action (Mark as Paid) | Optimistic update — change the UI immediately, confirm in background |

> **Example**
> When you tap "Mark Paid," you don't need to wait for a server round-trip before the badge changes — update it instantly, and only revert with an error if something actually fails. For a fast, frequent action like this, waiting for confirmation before showing any change makes the tool feel sluggish for no real benefit.

---

## Skeletons Beat Spinners for Initial Loads

For your primary list view, a rough outline of where content will appear (a "skeleton") feels faster than a generic spinner, even when the actual load time is identical — because it previews the coming structure instead of showing pure uncertainty.

> **Tip callout**
> You don't need custom-built skeleton components for a personal tool. A simple grey placeholder block roughly matching your row height is enough — this is a small polish detail, not a place to over-invest.

---

## Never Let a Loading State Block Input Silently

If a form is mid-save, the save button should visibly reflect that (disabled, showing "Saving...") — not just silently ignore a second tap. A silent block is indistinguishable from a broken button, and you'll end up double-checking or refreshing out of uncertainty.

- Does every "save" or "submit" action visually change while in progress?
- Is it clear the tool registered your tap, even before the action completes?

---

## Set a Realistic Timeout Expectation

Decide, even loosely, what should happen if a load takes unusually long — this is rare for a personal tool with light data, but worth a one-line decision now rather than an undefined freeze later.

> **Minimum viable answer**
> "If loading takes more than ~10 seconds, show a simple message: 'This is taking longer than expected — try again?' No need for retry logic or elaborate error recovery at this stage."

---

## Don't Over-Engineer This

For a lightweight personal tool with a small amount of data, most loads will be near-instant. Resist spending real effort on elaborate loading animations or complex skeleton screens — a plain spinner and a disabled button cover the vast majority of real situations here.

> **Decision card**
> Ask: "Will I actually notice this loading state often, given how little data this tool handles?" If the honest answer is "rarely," a minimal treatment is the right level of investment — save your effort for screens you'll interact with daily.

---

## Using AI to Fill In the Gaps

> **Copy this prompt**
> ```
> Here are the actions in my tool that involve loading or saving:
>
> [list actions — e.g. "load invoice list," "save new invoice,"
> "mark as paid"]
>
> For each one:
> 1. Recommend the simplest appropriate loading treatment (skeleton,
>    spinner, optimistic update, or disabled-button-with-text).
> 2. Flag any action where an optimistic update (changing the UI
>    immediately, confirming in the background) makes sense given
>    how frequently I'll use it.
> 3. Keep every suggestion minimal — this is a lightweight personal
>    tool, not a scenario requiring elaborate loading UX.
> ```

---

## What You Should Have Now

- A loading treatment decided for your initial screen load
- A visible in-progress state for your primary form's save action
- A decision on whether "Mark as Paid" (or equivalent) should update optimistically
- A one-line fallback plan for unusually slow loads

With normal delays accounted for, the next module — Empty States — covers the opposite situation: what the tool looks like when there's simply nothing there yet.
