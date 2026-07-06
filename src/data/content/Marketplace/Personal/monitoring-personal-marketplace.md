---
title: Monitoring
slug: monitoring
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Monitoring

Right now, you find out about bugs when you happen to test that feature, or when a user emails you. Monitoring flips that: you find out within minutes, with the context needed to actually fix it, instead of guessing from a vague complaint.

For a personal project, this isn't about building an ops dashboard. It's about answering one question fast: **is anything broken right now, and what broke it?**

---

## The Three Things Worth Monitoring

Personal projects don't need full observability stacks. They need three specific signals, prioritized by how marketplace failures actually happen:

| Signal | Why it matters here | Effort |
|---|---|---|
| Error tracking | A failed checkout or broken listing page loses you a transaction silently | Low — one SDK |
| Uptime monitoring | If your API goes down, you want to know before a user tells you | Very low — free tier services exist |
| Key business events | "Did anyone actually complete a purchase today?" is invisible without logging it | Low — a few log lines |

> ** Rule of thumb:** if a failure would cost you a real transaction or a real user's trust, it needs monitoring. If it's a cosmetic bug, it doesn't need real-time alerting — your normal testing will catch it.

---

## Decision: Monitoring Stack

> ** Decision Card — Monitoring Setup**
>
> **Option A: Build custom logging + a dashboard**
> Full control, meaningfully more setup time, more to maintain — usually not worth it solo.
>
> **Option B: Managed error tracking (e.g. Sentry) + a free uptime checker (e.g. UptimeRobot, Better Uptime)**
> Production-grade error context (stack traces, request data, user context) in minutes, generous free tiers cover personal-project volume.
>
> **For Personal Mode: use Option B.** This is one of the rare cases where the "proper" production tool is also the fastest path for a solo developer — there's no good reason to build this yourself at this stage.

---

## What to Actually Alert On

Alert fatigue is real even solo — if everything pages you, you'll start ignoring all of it. Be deliberate:

> ** Validation Checklist — Alert-worthy**
> - [ ] Server is down / API unreachable
> - [ ] Payment/checkout flow throws an error (directly costs a transaction)
> - [ ] Error rate spikes above a baseline (e.g. 5x normal in 10 minutes)
> - [ ] Database connection failures

> **Not alert-worthy (log, but don't page yourself):**
> - A single 404 on a bad URL
> - A validation error from bad user input (that's the system working correctly)
> - Expected auth failures from unauthenticated requests

---

## Marketplace-Specific Events Worth Logging

Beyond errors, log business events that tell you whether the marketplace is actually *working* as a marketplace — these answer questions error tracking alone can't.

```js
// Lightweight structured logging — doesn't need a full analytics platform yet
function logEvent(event, data) {
  console.log(JSON.stringify({ event, timestamp: new Date().toISOString(), ...data }));
}

logEvent("listing_created", { listingId, sellerId, category });
logEvent("order_completed", { orderId, buyerId, sellerId, amount });
logEvent("review_submitted", { reviewId, sellerId, rating });
logEvent("thread_started", { threadId, listingId });
```

> ** Why this matters:** A full Analytics module comes later in your roadmap — this is just enough structured logging now to answer "did anything happen today?" without waiting to build a dashboard. These same log lines become the foundation your future Analytics module builds on.

---

## Error Tracking Setup

Wire this in once, near the start of your app, and every unhandled error gets full context automatically — no need to remember to add logging to every route.

```js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // sample, don't trace every request — keeps free tier usage sane
});

app.use(Sentry.Handlers.requestHandler());
// ...your routes
app.use(Sentry.Handlers.errorHandler()); // must be after routes, before your own error handler
```

> **️ Warning:** Make sure Sentry's error handler is registered *after* your routes but *before* your own custom error-handling middleware, or errors won't be captured. This ordering mistake is the most common reason "I set up Sentry but it's not catching anything."

---

## Uptime Monitoring

A free external uptime checker pings your API on an interval and alerts you (email/SMS) the moment it stops responding — something you can't detect from inside your own app if the whole server is down.

> ** Validation Checklist**
> - [ ] Is there a lightweight `/health` endpoint that checks the database connection, not just "the server process is running"?
> - [ ] Is the uptime checker pointed at `/health`, not just the homepage (which might serve cached/static content even when the backend is broken)?
> - [ ] Is the alert going somewhere you'll actually see promptly (email is often too slow — consider SMS or a push notification for a personal project you're actively monitoring)?

```js
app.get("/health", async (req, res) => {
  try {
    await db.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "unhealthy" });
  }
});
```

---

## AI Prompt: Add Monitoring to an Existing App

> ** Copy Prompt**
>
> ```
> Add monitoring to my existing marketplace project. This is a personal project —
> keep it lightweight, don't suggest a full observability platform.
>
> Stack: [YOUR STACK]
>
> Requirements:
> 1. Integrate Sentry (or equivalent) for error tracking, correctly ordered in middleware
>    (after routes, before my custom error handler)
> 2. Add a /health endpoint that verifies database connectivity, not just process uptime
> 3. Add structured logEvent() calls at these points: listing created, order completed,
>    review submitted, thread started — JSON logs with event name, timestamp, and relevant IDs
> 4. Don't log full request bodies or sensitive fields (passwords, payment details) anywhere
>
> Existing routes:
> [PASTE RELEVANT ROUTE FILES]
> ```
>
> **Why this prompt works:** explicitly stating the Sentry middleware ordering requirement prevents the single most common setup mistake, and the sensitive-field exclusion prevents AI from naively logging entire request objects — which would otherwise leak passwords or payment data straight into your error tracking dashboard.

---

## Validating This Setup

> ** Common Hallucination:** AI-generated logging often logs the full `req.body` "for debugging," which is convenient until it logs a password or payment token in plaintext into a third-party logging service. Always review what's actually being logged, field by field — don't accept `logEvent("error", { req })` as a shortcut.

---

## Token Efficiency Tip

You don't need a fresh AI conversation for monitoring — it benefits from the same context as Security and Performance, since alert thresholds and logged events follow directly from what you decided was critical there. If you're continuing that conversation, reference "the checkout and auth flows we already secured" rather than re-describing your whole app.

---

## What You've Decided

By the end of this module you should have:

- Error tracking wired in with correct middleware ordering
- A real `/health` endpoint backed by an actual database check, monitored externally
- A short, deliberate list of what actually pages you vs. what just gets logged
- Structured event logging for the handful of actions that define whether your marketplace is working
- No sensitive data leaking into logs or error reports

**Next:** Logging — going deeper on what to capture and how to keep it useful as your app grows.
