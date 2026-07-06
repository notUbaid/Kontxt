---
title: Logging
slug: logging
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Logging (Log Aggregation & Audit Trails)

## The Source of Truth

In a personal project, `console.log` is sufficient because you are tailing a single server process. In a production marketplace, your infrastructure is distributed. A single checkout flow might touch a Next.js Edge function, a Node.js backend worker, a Postgres database, and an Inngest background queue. 

If a buyer's payment fails and you have to SSH into three different servers to grep through text files to piece together what happened, you are not production-ready.

---

## Log Aggregation and Structured JSON

Production logging requires **Log Aggregation** (e.g., **Axiom**, **Datadog**, **ELK Stack**). All servers and serverless functions must stream their logs to a central, searchable database.

To make logs queryable, they must be formatted as **Structured JSON**.

```json
// WRONG: Hard to search, impossible to graph.
"User 123 failed checkout because card was declined for order 456"

// CORRECT: Fully indexed, easily searchable in Datadog/Axiom.
{
  "level": "error",
  "event": "checkout_failed",
  "user_id": "123",
  "order_id": "456",
  "reason": "card_declined",
  "timestamp": "2026-08-01T12:00:00Z"
}
```

**The Production Rule:** Use a high-performance JSON logger like **Pino** (Node.js) or standard JSON output. Never concatenate strings for log messages.

---

## Correlation IDs (`x-request-id`)

When 1,000 users are checking out simultaneously, your aggregated logs will be a chaotic stream of interlaced events.

To trace a single user's journey through your distributed system, you must implement **Correlation IDs**.
1. When a request hits your edge router or Next.js middleware, generate a UUID and attach it to the `x-request-id` header.
2. Inject that UUID into your logger's context using Async Local Storage (Node.js).
3. Every log emitted during that request lifecycle will automatically include `"request_id": "uuid-here"`.
4. If a request hits a background queue (e.g., BullMQ), pass the `request_id` into the job payload so the background worker continues logging with the same ID.

---

## PII Redaction & Compliance

If a developer accidentally logs a `req.body` that contains a user's password, credit card number, or unredacted government ID, you have created a massive security and compliance (GDPR/SOC2) breach.

**The Production Defense:**
Configure your logger (e.g., Pino redaction paths) to automatically scrub sensitive keys *before* the JSON is serialized and shipped to the aggregation service.

```js
const logger = pino({
  redact: {
    paths: ['req.headers.authorization', 'req.body.password', 'req.body.card_number', 'user.ssn'],
    censor: '[REDACTED]'
  }
});
```

---

## Log Retention and Cost Management

Log aggregation services charge by ingest volume and retention duration. Storing 100GB of `debug` logs for 30 days is a massive waste of money.

**Production Retention Strategy:**
* **Debug / Info Logs:** Retain for 7 to 14 days. These are only useful for immediate troubleshooting.
* **Error / Warning Logs:** Retain for 30 to 90 days.
* **Audit Logs (Payments, Logins, Moderation actions):** Ship these directly to cold storage (e.g., Amazon S3 Glacier) and retain for 1 to 7 years to comply with financial and legal requirements.

---

## Do's and Don'ts of Production Logging

- **DO use appropriate log levels.** Errors that wake people up (`error`), recoverable failures (`warn`), business events (`info`), and verbose traces (`debug`). Ensure `debug` is disabled in production unless specifically toggled.
- **DON'T log the full Error object blindly.** `console.error(err)` often stringifies poorly or includes massive nested objects. Explicitly log `err.message`, `err.stack`, and any relevant `err.code`.
- **DO establish a standard schema.** Agree on standard keys across your engineering team. If the frontend logs `userId` but the backend logs `user_id`, correlating events becomes a nightmare.
- **DON'T log successful health checks.** If your load balancer pings `/health` every 5 seconds, filter those out of your `info` logs. They will drown out real traffic.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Pino Setup with Redaction and AsyncLocalStorage:**

````prompt
Act as a Senior Backend Engineer. Write a Node.js logging module using `pino` and `AsyncLocalStorage`. It must automatically extract the `x-request-id` from the Express request, store it in ALS, and inject it into every subsequent `logger.info()` or `logger.error()` call made during that request lifecycle without having to pass the `req` object manually. Include strict redaction paths for passwords, auth tokens, and standard PII fields.
````

> [!TIP]
> **Prompt 2 — Next.js Edge Logging:**

````prompt
Write a Next.js App Router Middleware function that intercepts every incoming request, generates a `crypto.randomUUID()`, attaches it to a custom `x-request-id` header, and logs a structured JSON `info` event containing the path, method, and user agent. Ensure this middleware is optimized to run on the Vercel Edge.
````

---

## Validating What AI Generates

- **Check for String Concatenation:** If AI generates code like `logger.info("User " + id + " did action")`, rewrite it to structured format: `logger.info({ user_id: id }, "User did action")`.
- **Verify Redaction Scope:** Ensure the redaction paths cover deeply nested objects (e.g., `req.body.user.password`) and not just top-level keys.

---

## Implementation Checklist

- [ ] Replaced all `console.log` statements with a structured JSON logger (e.g., Pino).
- [ ] Configured Log Aggregation (Axiom, Datadog) to collect logs from all services in a centralized dashboard.
- [ ] Implemented Correlation IDs (`x-request-id`) to trace distributed requests end-to-end.
- [ ] Defined strict PII redaction rules to prevent sensitive data from leaking into the log aggregation service.
- [ ] Established Log Retention policies that balance debugability, compliance, and infrastructure costs.

---

## What's Next

Next: **Error Tracking** — Logs capture the timeline, but Error Tracking captures the context. We will architect Sentry integration to group unhandled exceptions, upload sourcemaps, and track application crash rates.
