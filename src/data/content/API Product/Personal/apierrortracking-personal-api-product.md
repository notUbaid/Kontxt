---
title: Error Tracking
slug: error-tracking
phase: Phase 4
mode: personal
projectType: api-product
estimatedTime: 15-25 min
---

# Error Tracking

The Monitoring & Logging module gets you structured logs and a health check — good for reconstructing what happened once you know something's wrong. Error tracking closes the other gap: **finding out a new kind of failure exists at all**, grouped, deduplicated, and alerting you the moment it first occurs — not buried in a log stream you'd have to be actively watching to notice.

---

## Why Not Just Use Logs

| | Logs | Error tracking (Sentry) |
|---|---|---|
| Grouping | Manual — you grep for patterns | Automatic — identical stack traces group into one issue |
| Alerting | You'd need to build it | Built in — new issue types alert immediately |
| Context | Whatever you logged | Full stack trace, breadcrumbs, request context, user, environment |
| Trend visibility | Requires querying | "This error started happening 20 minutes ago, affecting 12 requests" out of the box |

> **Decision card**
> Set up Sentry (or an equivalent — Bugsnag, Rollbar). The free tier covers a personal project's volume comfortably, setup takes about fifteen minutes, and the alternative is finding out about bugs from user reports days after they started.

---

## Implementation: Basic Setup

```typescript
// lib/sentry.ts
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
});
```

```typescript
// app.ts — must be registered before your routes, error handler after
app.use(Sentry.Handlers.requestHandler());
// ... your routes ...
app.use(Sentry.Handlers.errorHandler());
```

> **Tip — sample rate matters for cost, not just correctness**
> `tracesSampleRate: 1.0` captures performance data for every single request, which burns through free-tier quotas fast. `0.1` (10%) is enough to spot trends without blowing your quota. Errors themselves are always captured regardless of this setting — this only controls performance trace sampling.

---

## Scrubbing Sensitive Data Before It Leaves Your Server

Sentry is a third-party service. Anything captured in an error report — including request bodies, headers, and query params — leaves your infrastructure. This needs the same discipline as the logging module's "never log secrets" rule, because it's easy to forget error reporting is a second place secrets can leak.

```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  beforeSend(event) {
    // Strip Authorization headers and API keys from any captured request
    if (event.request?.headers) {
      delete event.request.headers["authorization"];
      delete event.request.headers["Authorization"];
    }
    if (event.request?.data) {
      const sensitiveFields = ["password", "apiKey", "secret", "token"];
      for (const field of sensitiveFields) {
        if (event.request.data[field]) event.request.data[field] = "[REDACTED]";
      }
    }
    return event;
  },
});
```

> **Warning — do this before your first deploy, not after a leak**
> The default Sentry Node SDK behavior captures request context to help you debug, which is exactly the context that contains API keys and tokens if you don't scrub it. Set `beforeSend` scrubbing up during initial integration, not as a fix after you notice a key showed up in an error report.

---

## Capturing Errors Outside the Request Cycle

Errors thrown in background jobs (from the Queues module) don't have an HTTP request to hook into automatically — capture them explicitly.

```typescript
// worker.ts
worker.on("failed", (job, err) => {
  Sentry.captureException(err, {
    tags: { jobName: job?.name },
    extra: { jobId: job?.id, attemptsMade: job?.attemptsMade },
  });
});
```

This is important specifically because background job failures are otherwise invisible unless someone checks the dead-letter table — routing them into the same alerting pipeline as request errors means you find out immediately either way.

---

## Adding Context: User and Request Correlation

Connect the request ID from the Monitoring & Logging module to Sentry events, so a user-reported request ID lets you jump straight to the matching error report.

```typescript
app.use((req, res, next) => {
  Sentry.setTag("requestId", req.requestId);
  if (req.user) {
    Sentry.setUser({ id: req.user.id }); // ID only — never email/name unless
                                          // your Sentry data handling policy
                                          // explicitly covers PII
  }
  next();
});
```

> **Decision card — what user context to attach**
> Attach the user ID, not email or name, unless you've deliberately decided your Sentry account is an approved place to store that PII (check your own privacy policy commitments). An opaque ID is enough to say "this specific user hit this error" and cross-reference in your own database if needed, without duplicating PII into a third-party tool by default.

---

## Alerting on New Issues

By default, most error tracking tools alert on every occurrence, which gets noisy fast. Configure alerts around what actually needs your attention:

| Alert on | Don't alert on every occurrence of |
|---|---|
| A brand-new error type appearing for the first time | An already-known, already-triaged issue recurring |
| Error rate spike (e.g., 10x normal in 5 minutes) | Expected, handled errors (e.g., validation failures returning 400) |
| An issue affecting a growing number of unique users | A single flaky occurrence with no repeat |

> **Tip — route alerts somewhere you'll actually see them**
> Email alerts get lost. Route Sentry alerts to a Slack/Discord webhook or a dedicated channel you actually check — the value of error tracking is proportional to how quickly you notice, and an unread email folder defeats the purpose.

---

## Distinguishing Expected Errors From Real Bugs

Not every non-2xx response is a bug. A validation failure returning 400, or an authorization check returning 404 for someone else's resource, is your API working correctly — capturing these as "errors" drowns out the reports that actually need attention.

```typescript
app.use(Sentry.Handlers.errorHandler({
  shouldHandleError(error) {
    // Only send 5xx (genuine server errors) to Sentry.
    // 4xx responses are expected client behavior, not bugs.
    return !error.status || error.status >= 500;
  },
}));
```

---

## AI Prompt: Integrate Error Tracking

```
Integrate Sentry into this [framework] API.

Requirements:
- Capture unhandled exceptions from HTTP requests, with the
  requestId (see existing request-id middleware) attached as a tag
- Capture exceptions from background job failures (BullMQ worker
  "failed" event) with jobName and jobId as context
- Only report 5xx errors as issues — 4xx responses are expected
  client behavior and shouldn't create noise
- Scrub Authorization headers and any fields named password, apiKey,
  secret, or token from captured request data before sending
- Attach user.id (not email/name) when the request is authenticated
- Set tracesSampleRate to 0.1 in production, 0 in development

[paste app entry point and worker.ts]
```

---

## Validating AI Output

- **Confirm the `beforeSend` scrubbing is actually wired into the Sentry init**, not just written as a standalone function that's never called.
- **Confirm 4xx responses are excluded from issue creation** — generated integrations often capture everything by default, which you'll want to narrow immediately or your issue list becomes unusable noise within days.
- **Confirm background job failures are captured** — this is the piece most commonly forgotten, since most Sentry quickstart guides only cover the HTTP request path.
- **Trigger a real test error locally** (throw intentionally in a route) and confirm it actually appears in your Sentry dashboard with scrubbing applied correctly before considering this done.

---

## Common Mistakes

- Never testing that scrubbing actually works — assuming the `beforeSend` config is correct without verifying a test error's payload.
- Capturing every 4xx as an issue, making the dashboard too noisy to be useful within the first week.
- Forgetting background job errors entirely, so failures there stay invisible even after "setting up error tracking."
- Attaching full user objects (including email) as Sentry user context without a deliberate decision to do so.

---

## Validation Checklist

- [ ] Sentry (or equivalent) is integrated for both HTTP request errors and background job failures
- [ ] `beforeSend` scrubbing removes Authorization headers and common secret field names — verified with a real test error
- [ ] Only 5xx errors create issues; expected 4xx responses don't
- [ ] Request ID is attached as a tag, enabling correlation with your structured logs
- [ ] User context, if attached, is limited to an ID unless you've deliberately decided otherwise
- [ ] Alerts route to a channel you actually check, not just email
- [ ] `tracesSampleRate` is set deliberately, not left at a default that burns through quota

---

## What's Next

With visibility into both performance and errors, the next module — **Load Testing** — verifies your API actually holds up under realistic traffic before real users find the breaking point for you.
