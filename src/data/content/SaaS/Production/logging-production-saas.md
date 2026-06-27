---
title: Logging
slug: logging
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Logging

Logging is your eyes inside a running system. Without it, production failures are archaeology — you dig through guesses after the damage is done. With structured, intentional logging, incidents become investigations: you know exactly what happened, when, and why.

Most SaaS applications underlog until the first serious production incident. Then they overlog everything and bury signal in noise. The goal is neither. The goal is **purposeful logging** — knowing what to capture, at what level, and how to make it searchable when it matters.

---

## What Logging Actually Does

There are three distinct use cases. Conflating them leads to bad systems.

| Purpose | What It Serves |
|---|---|
| **Debugging** | Development and staging. Verbose. Ephemeral. |
| **Audit Trails** | Compliance, security, user activity. Permanent. Structured. |
| **Operational Observability** | Production health, error rates, latency. Structured. Queryable. |

Each has different retention requirements, different audiences, and different formats. Design for all three, not just one.

---

## The Logging Stack Decision

> **Make this decision before writing a single log line.** Retrofitting logging format and destination is painful.

### What You Need

- **Log aggregation** — a single place to search all logs
- **Structured log ingestion** — JSON, not plaintext
- **Retention policies** — different TTLs per log type
- **Alerting integration** — trigger alerts from log patterns
- **Cost predictability** — logging costs scale with volume

### Modern Options

| Tool | Best For | Pricing Model |
|---|---|---|
| **Datadog** | Full observability suite, large teams | Per GB ingested + retention |
| **Axiom** | Cost-efficient, developer-friendly | Per GB, generous free tier |
| **Grafana Loki** | Self-hosted, cost control | Infrastructure cost |
| **BetterStack (Logtail)** | Simple SaaS, fast setup | Per GB |
| **AWS CloudWatch** | Already on AWS, basic needs | Per GB + query cost |
| **Sentry** | Error logs specifically | Per error event |

> **Recommended for early-stage SaaS:** Axiom or BetterStack for application logs, Sentry for errors. They're affordable, fast to integrate, and queryable from day one.

---

## Log Levels — Use Them Correctly

Log levels are not decoration. They control what gets written, what gets alerted, and what gets retained.

```
TRACE   → Extremely verbose. Never in production.
DEBUG   → Useful during development. Disable in production by default.
INFO    → Normal system behavior worth recording.
WARN    → Something unexpected happened but the system recovered.
ERROR   → Something failed. Action may be required.
FATAL   → System cannot continue. Immediate action required.
```

### The Common Mistake

Logging everything at `INFO` because it's "safe." This buries real warnings and errors in noise. When you search for `ERROR` in your logs, you want to find actual errors — not every database query.

### Production Log Level Policy

```
Default level: INFO
Error tracking: ERROR and above → also sent to Sentry
High-traffic endpoints: WARN and above only (suppress INFO)
Background jobs: INFO and above
Auth events: always INFO regardless of volume
```

---

## Structured Logging

**Never log plain strings in production.**

```javascript
// ❌ Unstructured — unsearchable, unqueryable
console.log("User 12345 failed to login at 2:34pm")

// ✅ Structured — filterable, queryable, alertable
logger.warn("auth.login.failed", {
  userId: "usr_12345",
  email: "user@example.com",
  reason: "invalid_password",
  ip: "1.2.3.4",
  attempt: 3,
  timestamp: new Date().toISOString(),
  requestId: "req_abc123"
})
```

Every log entry should be a JSON object with consistent field names. This is what makes logs searchable.

### Required Fields on Every Log

```typescript
interface LogEntry {
  level: "debug" | "info" | "warn" | "error" | "fatal"
  message: string           // Human-readable event name: "auth.login.failed"
  timestamp: string         // ISO 8601
  requestId: string         // Trace requests across services
  userId?: string           // When authenticated
  tenantId?: string         // For multi-tenant SaaS
  service: string           // "api", "worker", "webhook"
  environment: string       // "production", "staging"
  // ...domain-specific fields
}
```

---

## What to Log in a SaaS

### Always Log

- Authentication events (login, logout, failed attempts, token refresh)
- Authorization failures (access denied, permission checks that fail)
- Payment events (charge initiated, succeeded, failed, refunded)
- User lifecycle events (signup, plan change, cancellation, deletion)
- Critical data mutations (delete, bulk update, export)
- External API calls (request, response status, latency)
- Background job execution (start, complete, failure, duration)
- Webhooks (received, processed, failed)

### Log With Caution

- Database queries — log slow queries, not all queries
- Inbound HTTP requests — log errors and slow requests, not every 200
- Cache operations — log misses and errors, not hits

### Never Log

- Passwords (ever, in any form)
- Full credit card numbers or CVVs
- API keys or tokens
- PII beyond what's necessary (SSNs, full DOBs)
- Full request bodies if they may contain secrets

> **GDPR/privacy note:** Log the minimum PII required. For user identification, prefer internal IDs (`usr_123`) over email addresses where possible. Document your retention policy.

---

## Request Tracing

In a distributed system, a single user action may touch multiple services. Without tracing, debugging is impossible.

Assign a `requestId` at the API gateway or first middleware layer and propagate it everywhere.

```typescript
// Middleware — attach requestId to every request
app.use((req, res, next) => {
  req.requestId = req.headers['x-request-id'] || generateId()
  res.setHeader('x-request-id', req.requestId)
  next()
})

// Pass it into every logger call
logger.info("payment.charge.initiated", {
  requestId: req.requestId,
  userId: req.user.id,
  amount: charge.amount,
  currency: charge.currency
})
```

When a user reports an error, ask for their `x-request-id` from their browser network tab. You can now find every log line that touched their request.

---

## Log Routing — Don't Send Everything Everywhere

Different logs belong in different places.

```
Application logs    → Axiom / BetterStack  (7–30 day retention)
Error events        → Sentry               (90 day retention)
Audit logs          → Separate cold storage (1–7 year retention)
Security events     → SIEM if required     (compliance-dependent)
```

Sending audit logs to a short-retention operational log store is a compliance failure waiting to happen. Sending high-volume debug logs to paid aggregation is a billing surprise waiting to happen.

---

## Audit Logging

Audit logs are different from operational logs. They answer: **who did what, when, and to what.**

```typescript
interface AuditLog {
  id: string
  timestamp: string
  actor: {
    userId: string
    email: string
    role: string
    ip: string
  }
  action: string            // "user.deleted", "plan.upgraded", "export.triggered"
  resource: {
    type: string            // "user", "subscription", "document"
    id: string
  }
  changes?: {
    before: Record<string, unknown>
    after: Record<string, unknown>
  }
  outcome: "success" | "failure"
  metadata?: Record<string, unknown>
}
```

Audit logs should be:
- **Immutable** — never delete or modify an audit log
- **Long-retention** — minimum 1 year for most SaaS; longer for regulated industries
- **Separate storage** — not mixed with operational logs
- **Searchable by actor, action, and resource**

---

## Logging in Background Jobs

Background jobs fail silently if you don't log carefully.

```typescript
async function processInvoice(jobId: string, invoiceId: string) {
  const log = logger.child({ jobId, invoiceId, job: "processInvoice" })

  log.info("job.started")

  try {
    const invoice = await fetchInvoice(invoiceId)
    log.info("job.invoice.fetched", { customerId: invoice.customerId })

    await chargeCustomer(invoice)
    log.info("job.charge.completed", { amount: invoice.amount })

    log.info("job.completed", { durationMs: Date.now() - startTime })
  } catch (err) {
    log.error("job.failed", {
      error: err.message,
      stack: err.stack,
      durationMs: Date.now() - startTime
    })
    throw err // Re-throw so the queue can retry
  }
}
```

Always log job start, completion, and failure. Always include duration. Always re-throw errors so your queue system can handle retries correctly.

---

## Logging Libraries

Don't use `console.log` in production code.

| Runtime | Recommended Library |
|---|---|
| Node.js | `pino` (fastest), `winston` (most flexible) |
| Python | `structlog` |
| Go | `zap` or `slog` (stdlib) |
| Ruby | `semantic_logger` |

### Pino Setup (Node.js)

```typescript
import pino from "pino"

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: {
    service: "api",
    environment: process.env.NODE_ENV
  },
  transport: process.env.NODE_ENV === "development"
    ? { target: "pino-pretty" }   // Human-readable in dev
    : undefined                    // JSON in production
})

export default logger
```

---

## AI Prompt — Logging Architecture Review

Use this when you've written your initial logging setup and want a senior review.

<copy-prompt>
You are a Staff Engineer reviewing the logging architecture for a production SaaS application.

My tech stack: [YOUR STACK]
My log aggregation tool: [TOOL]
My infrastructure: [WHERE IT RUNS]

Here is my current logging setup:
[PASTE YOUR LOGGER CONFIG AND KEY LOG EXAMPLES]

Review this for:
1. Structured log format — are fields consistent and queryable?
2. Missing events — what important events am I not logging?
3. Log level usage — are levels used correctly?
4. PII risks — what sensitive data might leak into logs?
5. Volume concerns — what will cause expensive log volume at scale?
6. Audit trail gaps — what regulatory or compliance risks exist?
7. Tracing — can I trace a single request end-to-end?

For each issue, tell me exactly what to change and why.
</copy-prompt>

---

## Logging Validation Checklist

Work through this before considering logging complete.

- [ ] All logs are structured JSON in production
- [ ] Every log entry includes `requestId`, `service`, `timestamp`, `level`
- [ ] Log levels are used consistently across the codebase
- [ ] `console.log` has been removed from production code paths
- [ ] No passwords, tokens, or raw PII in any log entry
- [ ] Auth events are logged (login, logout, failure, token refresh)
- [ ] Payment events are logged with outcome and amount
- [ ] External API calls are logged with response status and latency
- [ ] Background job start, completion, and failure are logged
- [ ] Audit logs are stored separately with long retention
- [ ] Audit logs are immutable
- [ ] `requestId` is propagated from gateway through all services
- [ ] Log aggregation is connected and receiving logs
- [ ] Log retention policy is defined per log type
- [ ] Error logs route to error tracking (Sentry or equivalent)
- [ ] High-volume endpoints do not log every successful request
- [ ] GDPR / data residency requirements considered for log storage

---

## Common Mistakes

> **Mistake: Logging everything at INFO**
> Signal drowns in noise. Use WARN and ERROR for abnormal events. Reserve INFO for meaningful state transitions.

> **Mistake: Logging full request bodies**
> Request bodies often contain passwords, tokens, or payment data. Log specific fields only, never the full body.

> **Mistake: Not logging external API failures**
> When Stripe is down or SendGrid bounces, you need logs that tell you exactly what call failed, with what payload, at what time.

> **Mistake: Treating audit logs like operational logs**
> Operational logs get deleted after 30 days. Audit logs must survive for compliance. Different systems, different retention.

> **Mistake: Skipping logging in background jobs**
> Jobs fail silently at 3am and nobody knows until a user reports a missing invoice three days later.

---

## Next

With logging in place, you have visibility into what's happening. Next: **Error Tracking** — capturing, grouping, and triaging errors before users report them.
