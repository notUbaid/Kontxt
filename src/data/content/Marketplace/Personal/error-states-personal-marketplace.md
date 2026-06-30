---
title: Error States
slug: error-states
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 20-25 min
filename: error-states-personal-marketplace.md
---

# Error States

Empty states handle "nothing here yet." Error states handle "something went wrong" — a failed payment, a network drop, an invalid form submission. For a marketplace specifically, this matters more than in most apps: a failed transaction with no clear error feels like the platform stole money or broke a deal, even when it's a recoverable, ordinary failure.

This module designs the response before it's needed, so a real error doesn't become a real trust problem with a real user.

---

## Why Marketplace Error States Carry Higher Stakes

In most apps, an error means "try again." In a marketplace, an error can mean "did my payment go through or not," "did my message send or not," "is this listing still available or not" — ambiguity at exactly the moment trust matters most (the Marketplace Fundamentals module's core insight, applied here directly). A vague error message in a marketplace context creates doubt about the transaction itself, not just the UI.

> **Decision:** Every marketplace error message needs to answer one implicit question: "did the thing I was trying to do actually happen, or not?" Never leave that ambiguous.

---

## The Error Categories You Need to Design For

| Category | Example | What the user needs to know |
|---|---|---|
| **Validation errors** | Invalid email, missing required field | What's wrong, specifically, before they resubmit |
| **Network/connection errors** | Request failed, no internet | Nothing was lost, safe to retry |
| **Conflict errors** | Listing was just sold/removed by someone else | The state changed, here's what to do now |
| **Permission errors** | Trying to edit someone else's listing | Clear explanation, not a cryptic failure |
| **Server errors** | Something broke on your end | Acknowledge it's not their fault, give a path forward |

> **Tip:** Conflict errors are the one category that's genuinely marketplace-specific and easy to forget — a listing being sold or removed between when a buyer viewed it and when they tried to message about it is a real scenario, not an edge case to ignore.

---

## Writing Error Messages That Actually Help

A weak error message states that something failed without saying what to do. A strong one is specific and actionable.

**Weak:** "An error occurred."

**Stronger:** "We couldn't send your message — check your connection and try again."

**For a conflict error:** "This listing was just sold by someone else. Browse similar listings instead."

> **Decision:** Never show a raw technical error (a stack trace, an HTTP status code, a database error message) to a user. Translate every error into plain language before it reaches the UI — this is a deliberate translation layer in your code, not something to leave to chance.

---

## Form Validation: Show Errors Inline, Not in a Generic Banner

For your listing creation form and signup form specifically, validation errors should appear next to the specific field that's wrong, not as a generic "form has errors" message at the top.

```
[Title field, empty]
"Title is required" ← appears directly under the field

[Price field, negative number]
"Price must be a positive number" ← specific to what's actually wrong
```

> **Warning:** A generic top-of-form "please fix the errors below" with no per-field indication forces the user to hunt for what's actually wrong. This is a common AI-generated form pattern when not explicitly asked for inline, per-field errors — check for this specifically when reviewing generated form code.

---

## The Conflict Error: Marketplace-Specific and Easy to Miss

This deserves its own attention because it doesn't show up in generic error-handling advice. Multiple users interacting with the same listing creates a real possibility: a buyer views a listing, takes a few minutes to decide, and by the time they act, the seller has marked it sold or removed it.

```markdown
## Conflict Error: Listing No Longer Available

Trigger: Buyer attempts to message or interact with a listing that
was sold/archived/deleted since they loaded the page.

Message: "This listing is no longer available. It may have just sold."
Action: Link back to browse, ideally with similar listings if that's
in scope (otherwise just a clear path back to browsing).
```

> **Decision:** Decide now whether your MVP checks listing status at the moment of action (sending a message, attempting a purchase) or only relies on the page load state. Checking at action-time is a small backend addition that prevents a confusing failure later — worth doing even at MVP scope.

---

## Network Errors: Reassure, Don't Just Report

When a request fails due to connectivity rather than a real problem with the data, the message should reassure the user that nothing was lost, not just report failure.

**Weak:** "Request failed."

**Stronger:** "Couldn't connect. Your listing draft is saved — try again when you're back online."

> **Tip:** If your form data is easy to preserve client-side on a failed submission (most frameworks make this straightforward), do it. Losing a half-written listing description to a network blip is a disproportionately frustrating experience relative to how small the actual failure was.

---

## What's Reasonable to Skip at MVP

- Detailed error logging/monitoring dashboards (covered properly in Phase 4's Error Tracking module)
- Automatic retry logic with backoff strategies — manual "try again" is sufficient for MVP
- Localized error messages in multiple languages, unless your specific audience requires it

---

## AI Prompts You Can Use

**Prompt 1 — Write error messages for your core flows:**

```
Here are the actions in my marketplace MVP: [list: create listing,
send message, sign up, view listing]. For each, write plain-language
error messages for: validation failure, network failure, and (where
relevant) conflict errors like "listing no longer available." Make
each message specific and actionable, never generic.
```

**Prompt 2 — Audit existing error handling code:**

```
Here's my [form/API call] code: [paste it]. Check whether errors are
shown inline per-field (not just a generic banner), whether raw
technical errors could leak to the UI, and whether a conflict scenario
(the underlying data changed since the user loaded the page) is handled
at all. Flag gaps specifically.
```

---

## Validating What AI Generates

- [ ] **Confirm no raw technical error text reaches the user-facing message** — check generated error handling for accidentally surfaced stack traces or status codes
- [ ] **Verify conflict error handling actually exists**, not just validation and network errors — this is the category most likely to be missed since it's marketplace-specific and not part of generic error-handling advice
- [ ] **Read every generated error message out loud** — if it sounds like something a real person would find confusing or alarming, rewrite it; this is a fast, reliable check that catches more than reviewing silently

---

## Implementation Checklist

- [ ] Validation errors appear inline, per-field, not as a generic top-of-form message
- [ ] Network/connection errors reassure that nothing was lost, suggest retry
- [ ] Conflict error ("listing no longer available") designed and connected to a status check at action-time
- [ ] No raw technical error text can reach the user-facing UI
- [ ] Every error message specifies what went wrong and what to do next, not just that something failed

---

## What's Next

Next: **Loading States** — the last of the three non-happy-path modules, designing what users see while waiting, not just before or after.
