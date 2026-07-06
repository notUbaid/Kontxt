---
title: Monitoring & Logging
slug: monitoring-logging
phase: Phase 4
mode: personal
projectType: api-product
estimatedTime: 20-30 min
---

# Monitoring & Logging

Right now, if something breaks in production, how do you find out? For most solo-built APIs, the honest answer is "a user emails me." This module fixes that — not with an enterprise observability stack, but with the minimum that lets you catch problems before your users do.

This covers logging and metrics. Deep error-tracking tool setup (Sentry) gets its own focus in the next module — here, the goal is knowing what happened and being able to reconstruct it.

---

## Structured Logging, Not `console.log`

Plain `console.log` strings are fine for local development and useless for production debugging — you can't filter, search, or correlate them at scale.

```typescript
// Unstructured — hard to query later
console.log(`Order ${orderId} created for user ${userId}`);

// Structured — filterable, greppable, machine-parseable
logger.info("order.created", { orderId, userId, itemCount: items.length });
```

```typescript
// lib/logger.ts
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  formatters: {
    level: (label) => ({ level: label }),
  },
});
```

> **Decision card — log levels**
> Use `error` for things that need a human's attention, `warn` for things worth reviewing but not urgent, `info` for significant business events (order created, payment processed), and `debug` for anything else — set to off in production by default. If everything is logged at `info`, nothing is findable when you actually need it.

---

## Request Correlation IDs

When a user reports "my request failed," you need to find *that specific request* in your logs, not guess based on timestamp. A correlation ID threaded through every log line for a request makes this trivial.

```typescript
// middleware/request-id.ts
import { randomUUID } from "crypto";

export function requestId(req, res, next) {
  req.requestId = req.headers["x-request-id"] ?? randomUUID();
  res.set("X-Request-Id", req.requestId);
  next();
}
```

```typescript
// Include it in every log line for this request
logger.info("order.created", { requestId: req.requestId, orderId, userId });
```

> **Tip — return the request ID in error responses**
> Include `requestId` in your API's error response bodies. When a developer integrating with your API reports a problem, asking them for the request ID from their error response lets you find the exact log entry in seconds instead of reconstructing the timeline from a timestamp and a guess.

```typescript
res.status(500).json({ error: "Internal server error", requestId: req.requestId });
```

---

## What to Log — and What Never to Log

| Log this | Never log this |
|---|---|
| Request method, path, status, duration | Full request bodies containing passwords or API keys |
| User/resource IDs | API keys, tokens, or webhook signing secrets |
| Business events (order created, payment failed) | Full credit card numbers or other raw payment data |
| Error messages and stack traces | Full `Authorization` headers |

```typescript
// middleware/http-logger.ts
app.use((req, res, next) => {
  res.on("finish", () => {
    logger.info("request.completed", {
      requestId: req.requestId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: Date.now() - req.startTime,
      // deliberately NOT logging req.body or req.headers.authorization
    });
  });
  next();
});
```

> **Warning — this connects directly to the Security module**
> Logs are a common, overlooked place secrets leak. A logging middleware that dumps the full request object "for debugging" will capture API keys in the `Authorization` header and any secrets in the body. Explicitly allow-list what gets logged; never log full request/response objects by default.

---

## Health Checks

A basic health endpoint lets uptime monitors (and you) verify the API and its dependencies are actually working, not just that the process is running.

```typescript
router.get("/health", async (req, res) => {
  const checks = {
    database: false,
    redis: false,
  };

  try {
    await db.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch {}

  try {
    await redis.ping();
    checks.redis = true;
  } catch {}

  const healthy = Object.values(checks).every(Boolean);
  res.status(healthy ? 200 : 503).json({ status: healthy ? "ok" : "degraded", checks });
});
```

> **Tip — check dependencies, not just "is the process alive"**
> A health check that only returns `200 OK` unconditionally tells you the server process is running, not that it can actually serve requests. If the database connection is down, you want your uptime monitor to notice — that's a real outage even though the process itself is fine.

---

## Uptime Monitoring

Set up an external check that pings your `/health` endpoint on an interval and alerts you on failure. This is the single cheapest way to know about an outage before a user tells you.

> **Decision card — Recommended for Personal mode**
> Use a free-tier uptime monitor (UptimeRobot, Better Stack, or your hosting platform's built-in monitoring) pinging `/health` every 1–5 minutes with email or SMS alerting. This costs nothing and takes ten minutes to set up — there's no good reason to skip it, even for a side project.

---

## Minimum Viable Metrics

You don't need a full metrics stack (Prometheus/Grafana) yet. Track these three numbers, even informally, and you'll catch most real problems:

| Metric | Why it matters |
|---|---|
| **Error rate** (% of requests returning 5xx) | Direct signal something is broken |
| **p95 latency** | Catches "it's slow for some requests" that averages hide |
| **Request volume** | Context for the other two — an error rate spike matters more at high volume |

```typescript
// A simple in-memory rolling window is enough at personal scale
// Log these from the request.completed event above, and review
// periodically, or wire into your logging provider's dashboard if
// it aggregates structured logs (most do — Better Stack, Axiom, etc.)
```

> **Tip — your log aggregator probably already gives you this**
> If you're shipping structured JSON logs (as set up above) to a provider like Better Stack, Axiom, or even your hosting platform's log viewer, you can usually build a dashboard from `request.completed` events without adding a separate metrics system. Check what your existing tools support before adding new infrastructure.

---

## AI Prompt: Add Structured Logging

```
Add structured logging to this [framework] API using pino.

Requirements:
- Request correlation ID middleware (generate if not provided in
  X-Request-Id header, echo it back in the response header)
- HTTP request logging middleware logging method, path, status,
  duration, and requestId — explicitly excluding request body and
  Authorization header
- A /health endpoint checking database and Redis connectivity,
  returning 503 if either is down
- Include requestId in all 4xx/5xx error responses

[paste app entry point / existing middleware setup]
```

---

## Validating AI Output

- **Confirm the request logger explicitly excludes sensitive fields** rather than logging the full request object "for completeness" — this is the most common way AI-generated logging code accidentally captures secrets.
- **Confirm the health check actually checks dependencies**, not just returning a static 200.
- **Test the health check's failure path** by temporarily pointing it at a wrong database URL — confirm it actually returns 503, not a crash or a false 200.

---

## Common Mistakes

- Logging full request/response objects, capturing secrets by accident.
- A health check that always returns 200 regardless of actual dependency status.
- No correlation ID, making it impossible to reconstruct what happened for a specific failed request.
- Setting up logging but never actually looking at it — schedule even a weekly five-minute review of error-level logs.

---

## Validation Checklist

- [ ] Logging is structured (JSON), not raw string concatenation
- [ ] Every request has a correlation ID, echoed in the response and included in error bodies
- [ ] Request bodies and `Authorization` headers are explicitly excluded from logs
- [ ] `/health` checks actual dependency connectivity (database, Redis), not just process liveness
- [ ] An external uptime monitor is pinging `/health` with alerting configured
- [ ] You have a way to see error rate and latency, even informally, without digging through raw logs manually

---

## What's Next

The next module — **Error Tracking** — goes deeper on capturing and triaging exceptions specifically: integrating a tool like Sentry, grouping related errors, and setting up alerts for new error types the moment they appear.
