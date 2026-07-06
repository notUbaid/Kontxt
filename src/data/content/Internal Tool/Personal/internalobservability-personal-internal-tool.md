---
title: Observability
slug: observability
phase: Phase 4
mode: personal
projectType: internal-tool
estimatedTime: 15-25 min
---

# Observability

Security closed the gaps where something could go wrong silently on purpose. Observability closes the gaps where something goes wrong by accident and you simply never find out — until someone asks why a record is missing or an automation never fired.

---

## The Personal-Mode Observability Question

Not "how do I monitor everything" — that's enterprise-scale thinking for a tool with one or a handful of users. The right question:

**"If this broke right now, how would I find out?"**

For most personal-mode internal tools, the honest current answer is "I'd notice when something looks wrong, eventually." This module is about shortening that gap for the things that matter.

---

## Three Layers, Not One Big System

| Layer | What it answers | Personal-mode approach |
|---|---|---|
| Error tracking | "Did something crash?" | A free-tier error tracking service (Sentry free tier is the common default) |
| Logs | "What happened, in what order?" | Your platform's built-in logs (Vercel, Render, etc.) — no separate log aggregator needed |
| Automation/job outcomes | "Did my scheduled/triggered actions actually run correctly?" | The logging you already added in the Workflow Automation module — this section makes sure it's actually visible, not just written |

You almost certainly don't need a dedicated observability platform, metrics dashboards, or distributed tracing at this scale. Those solve problems (multiple services, high request volume, on-call rotations) that a personal internal tool doesn't have.

---

## Error Tracking: The One Piece Worth Adding Explicitly

Platform logs capture request-level info but are easy to forget to check. A dedicated error tracker sends you (or shows you) unhandled exceptions as they happen, without you having to go looking.

**Minimum setup:**
- Add the error tracking SDK to your app (frontend and backend, if separate)
- Confirm it captures unhandled exceptions automatically
- Set up one notification channel (email is fine) for new errors

>  **Tip:** Free tiers of error trackers are generous enough for personal-tool volume — you're very unlikely to need a paid tier here. Revisit the Cost Estimation module's habit: confirm the free tier's limits before assuming it's forever free.

---

## Making Automation Outcomes Actually Visible

You already log automation runs (Workflow Automation module). The gap is usually that those logs sit in a table or console output nobody looks at. Close that gap here:

- Surface recent automation runs and their outcomes somewhere you'll actually see them — the Admin Panel is a natural home for this (referenced in that module)
- For automations where silent failure would be costly, add a notification (Notifications module) specifically on failure, not just success

> ️ **Warning:** A log that exists but is never viewed provides the appearance of observability without the substance. If you built logging in Phase 3 but haven't looked at it since, that's the specific gap this module should close — not adding more logging, but making the logging you have actually visible.

---

## AI Prompt: Add Error Tracking and Surface Automation Logs

```
Add error tracking to my app using [Sentry / your chosen provider].

Requirements:
- Capture unhandled exceptions on both frontend and backend
- Include enough context in each error report to debug without reproducing it manually: [e.g., "which user, which action, relevant IDs"] — but don't log sensitive data like passwords or full payment info
- Set up a notification for new errors via [email/your preferred channel]

Separately, build a simple view (in the admin panel) showing recent automation run logs from [your automation logging table], including outcome (success/failure) and timestamp, sorted most recent first.
```

The explicit note about not logging sensitive data matters — error trackers capture a lot of context by default, and it's easy to accidentally send passwords or tokens to a third-party service inside an error payload.

---

## Validating the Setup

-  **Trigger a deliberate error** and confirm it actually shows up in your error tracker with useful context — don't assume the integration works without testing it once
-  **Confirm sensitive data isn't leaking into error reports** — check what an actual captured error looks like, not just the integration code
-  **Confirm the automation log view actually reflects real runs** — trigger an automation and check it appears in the view within a reasonable time
-  **Test the failure-notification path specifically** — force an automation to fail and confirm you're actually notified, not just that a log entry was written

---

## What Not to Build at This Scale

Explicitly skip these unless you have a concrete reason:

- Custom metrics/dashboards beyond what your hosting platform already shows
- Uptime monitoring with paging/on-call (fine as a simple free uptime check if you want peace of mind, but no need for anything elaborate)
- Distributed tracing (only relevant once you have multiple services calling each other)
- Log aggregation services beyond your platform's built-in logs

>  **Tip:** If you find yourself wanting more visibility than this setup provides, that's useful signal — it usually means either your tool has grown past personal-scale, or there's a specific recurring problem worth solving directly rather than through more general monitoring.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| No error tracking at all, relying on "I'll notice" | Silent failures go unnoticed until someone reports a symptom |
| Logging automation outcomes but never surfacing them anywhere visible | Logging exists in name only if nobody looks at it |
| Sensitive data captured in error reports by default | Creates a data exposure risk inside a third-party tool |
| Building enterprise-scale observability tooling for a personal tool | Real setup and maintenance cost for a problem this scale doesn't have |
| Setting up error tracking but never testing that it actually captures and notifies | An untested integration is not a reliable safety net |

---

## Before You Move On — Checklist

- [ ] Error tracking is set up and verified with a deliberate test error
- [ ] Sensitive data is confirmed absent from captured error context
- [ ] Automation run outcomes are visible somewhere I'll actually check, not just logged silently
- [ ] Failure-specific notifications work for automations where silent failure would be costly
- [ ] I deliberately avoided adding observability tooling beyond what this scale needs

---

## What's Next

With visibility into failures, the next step is making sure the tool itself stays responsive as real usage accumulates — performance.
