---
title: Error Tracking
slug: error-tracking
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Error Tracking

You already wired up Sentry in the Monitoring module — errors are being captured. This module is about what happens *after* capture: triaging what matters, grouping noise, and actually closing the loop instead of letting your error dashboard become a graveyard you never check.

This is the difference between having error tracking and *using* it.

---

## The Real Failure Mode

Most personal projects don't fail at error capture. They fail at error **response**. Six months in, the dashboard has 400 unresolved issues, most of them noise, and the one error that actually matters is buried on page 4.

> ** Core rule:** an error tracker is only useful if you have a habit of triaging it. Capturing errors you never look at is barely better than not capturing them.

---

## Triage: Not Every Error Is Equally Urgent

> ** Decision Card — Triage Categories**
>
> **Critical — fix same day**
> Payment/checkout failures, auth failures blocking login, data corruption risks (e.g. an order created with no listing reference).
>
> **High — fix this week**
> Feature-breaking bugs affecting a subset of users (e.g. messaging fails for threads with deleted listings).
>
> **Low / ignore**
> Single occurrences from bots/scrapers hitting malformed URLs, expected validation errors that got miscategorized as exceptions, third-party flakiness with built-in retries already handling it.
>
> Apply this triage weekly, not just when something feels urgent — low-priority noise left unsorted is exactly what buries the next critical error.

---

## Grouping: Fix the Pattern, Not the Instance

Sentry and similar tools group errors by stack trace signature automatically — but the grouping is only as good as your error messages and context.

```js
//  Generic — every different failure groups into one bucket, or doesn't group at all
throw new Error("Something went wrong");

//  Specific — groups correctly, and the message alone tells you what broke
throw new Error(`Failed to create order: listing ${listingId} not found or inactive`);
```

> **️ Warning:** Vague error messages don't just hurt you when reading the dashboard — they actively break grouping. "Something went wrong" thrown from five different places either collapses into one misleading bucket or fragments randomly, depending on stack trace details. Specific messages group reliably and tell you what happened without opening the stack trace.

---

## Adding Context to Errors

A stack trace tells you *where* something broke. It rarely tells you *why* without additional context — which user, which listing, what they were trying to do.

```js
Sentry.withScope((scope) => {
  scope.setUser({ id: req.user?.id });
  scope.setContext("order_attempt", {
    listingId: req.body.listingId,
    amount: req.body.amount,
  });
  Sentry.captureException(err);
});
```

> ** Validation Checklist**
> - [ ] Does every captured exception include the relevant user ID (when authenticated)?
> - [ ] Do payment/order errors include the listing or order ID being acted on?
> - [ ] Are you attaching context without leaking sensitive data (no full payment details, no password fields — same rule as the Logging module)?

---

## Closing the Loop

An error that's been triaged and fixed but never marked resolved will keep cluttering your view and may re-alert you on every future occurrence, training you to ignore alerts entirely.

> ** Validation Checklist**
> - [ ] When you fix a bug, do you mark the corresponding error as resolved in your tracker?
> - [ ] Does your tracker re-open an issue automatically if it recurs after being marked resolved? (Most do by default — confirm yours does, this is the signal that your fix didn't actually work)
> - [ ] Are recurring "resolved" errors treated as a signal the original fix was incomplete, not just re-dismissed?

---

## What's Worth Alerting You vs. Just Logging

This builds directly on the alert-worthy list from Monitoring — error tracking adds nuance: frequency and trend matter more than any single occurrence.

| Pattern | Action |
|---|---|
| New error type, never seen before | Worth a look, not necessarily urgent |
| Existing error spikes 5x above baseline | Alert — something changed |
| Same low-severity error, steady trickle | Batch-review weekly, don't alert per-occurrence |
| Error affecting checkout/payment, any volume | Always alert immediately — see Monitoring's critical list |

---

## AI Prompt: Improve Error Messages and Context

> ** Copy Prompt**
>
> ```
> Review my error handling for tracking quality, not just correctness. This is a
> personal marketplace project using Sentry (or equivalent).
>
> For each thrown error or caught exception:
> 1. Is the error message specific enough to group correctly and be understood without
>    opening the stack trace? Rewrite vague ones (e.g. "Something went wrong").
> 2. Is relevant context attached (user ID, listing/order ID) before the error is captured?
> 3. Are validation errors (expected, user-caused) distinguished from real exceptions
>    (unexpected, system-caused)? They should not be captured/alerted the same way.
>
> Code:
> [PASTE YOUR ERROR HANDLING / CATCH BLOCKS]
> ```
>
> **Why this prompt works:** point 3 specifically targets a common pattern where AI-generated code wraps everything in generic try/catch blocks that capture expected validation failures (like "price must be positive") with the same severity as a genuine server bug — flooding your tracker with noise that trains you to stop checking it.

---

## Validating AI Output Here

> ** Common Hallucination:** AI frequently wraps entire route handlers in a single broad `try/catch` that calls `Sentry.captureException` on anything, including expected 400-level validation errors. This means a user typing an invalid price triggers the same alert as a real database failure. Separate expected client errors (return a 400, log at `info`/`warn`, don't alert) from genuine exceptions (capture, alert per your triage rules).

```js
//  Distinguishing expected vs. unexpected
try {
  await createOrder(req.body);
} catch (err) {
  if (err instanceof ValidationError) {
    logger.warn({ error: err.message }, "order validation failed");
    return res.status(400).json({ error: err.message });
  }
  Sentry.captureException(err); // only genuine, unexpected failures
  return res.status(500).json({ error: "Internal error" });
}
```

---

## Token Efficiency Tip

This is a good module to revisit periodically rather than treat as one-time setup — every few weeks, paste a fresh batch of your tracker's top unresolved errors (not your whole codebase) into a short prompt asking AI to help triage and suggest fixes. Smaller, recurring reviews beat one giant audit.

---

## What You've Decided

By the end of this module you should have:

- A weekly habit (or system) for triaging captured errors by actual urgency
- Specific, descriptive error messages that group correctly
- User and resource context attached to every captured exception
- A clear split between expected validation errors and genuine unexpected exceptions
- A working definition of "resolved" that includes verifying recurrence, not just dismissing the alert

**Next:** Rate Limiting — protecting your endpoints from abuse at the request level.
