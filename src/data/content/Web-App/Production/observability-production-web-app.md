---
title: Observability
slug: observability
phase: Phase 5
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Observability

Tests tell you your code worked before you deployed. Observability tells you what is happening right now, in production, with real users and real data.

Without observability, you are flying blind. You learn about problems when users complain. You debug with no context. You cannot tell if a deploy made things better or worse.

With observability, you know something is wrong before users report it. You find the root cause in minutes, not hours. You make decisions with data.

---

## The Three Pillars

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    LOGS     │    │   METRICS   │    │   TRACES    │
│             │    │             │    │             │
│ What        │    │ How much /  │    │ Where did   │
│ happened    │    │ how often   │    │ time go?    │
│ and why     │    │             │    │             │
│             │    │ p99 latency │    │ DB: 240ms   │
│ Error at    │    │ req/sec     │    │ Cache: 2ms  │
│ 14:32:01    │    │ error rate  │    │ API: 8ms    │
│ userId=abc  │    │ queue depth │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       └──────────────────┴──────────────────┘
                          │
                   Correlated by
                   Request ID / Trace ID
```

Each pillar answers different questions. You need all three.

---

## Tooling Recommendations

| Pillar | Self-hosted | Managed |
|---|---|---|
| Logs | Grafana Loki | Logtail, Datadog Logs, Axiom |
| Metrics | Prometheus + Grafana | Datadog, Grafana Cloud |
| Traces | Jaeger, Tempo | Datadog APM, Honeycomb |
| All-in-one | — | Datadog, Grafana Cloud, Sentry |

**For most production web apps starting out: Sentry (errors + traces) + Logtail or Axiom (logs) + Grafana Cloud (metrics).** This combination is fast to set up, cheap at low scale, and production-grade.

---

## Part 1: Structured Logging in Production

You configured Pino in the Error Handling module. Now use it correctly across your application.

### Log Levels — Use Them Deliberately

```typescript
// lib/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  base: { service: 'api', env: process.env.NODE_ENV },
  redact: {
    paths: [
      'body.password', 'body.token', 'body.cardNumber',
      'headers.authorization', 'headers.cookie',
      '*.email',      // Redact email anywhere in log object
    ],
    censor: '[REDACTED]',
  },
});
```

```typescript
// When to use each level
logger.debug({ query, params }, 'DB query executed');         // Dev only — verbose internals
logger.info({ userId, action }, 'User action completed');     // Normal operations
logger.warn({ jobId, attempt }, 'Job retry attempt');         // Recoverable issues
logger.error({ err, requestId }, 'Request failed');           // Errors requiring attention
logger.fatal({ err }, 'Unrecoverable failure — shutting down'); // Imminent crash
```

### Request Logging Middleware

```typescript
// middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const requestId = req.headers['x-request-id'] as string;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? 'error'
                : res.statusCode >= 400 ? 'warn'
                : 'info';

    logger[level]({
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      userId: req.user?.id,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    }, 'HTTP request');
  });

  next();
}
```

> **Log on response, not on request.** Logging on request gives you no status code or duration — the most important fields. Log in the `finish` event so you capture the full picture.

---

## Part 2: Error Tracking with Sentry

Sentry captures unhandled exceptions, gives you stack traces with source maps, and groups errors by root cause — not by volume.

```bash
npm install @sentry/node @sentry/profiling-node
```

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

export function initSentry() {
  if (!process.env.SENTRY_DSN) return;

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [
      nodeProfilingIntegration(),
    ],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: 0.1,

    // Never send PII to Sentry
    beforeSend(event) {
      // Strip user email from events
      if (event.user) {
        delete event.user.email;
        delete event.user.ip_address;
      }
      return event;
    },
  });
}
```

```typescript
// server.ts — initialize before everything else
import { initSentry } from './lib/sentry';
initSentry();

import * as Sentry from '@sentry/node';
import express from 'express';

const app = express();

// Sentry request handler — must be first middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// ... your routes ...

// Sentry error handler — must be before your error handler
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);
```

### Set User Context

```typescript
// middleware/auth.ts — after verifying token
import * as Sentry from '@sentry/node';

Sentry.setUser({ id: req.user.id, role: req.user.role });
// Never set email — it's PII
```

### Capture Manual Errors

```typescript
// For errors you catch and handle, but still want visibility into
try {
  await externalPaymentService.charge(amount);
} catch (err) {
  Sentry.captureException(err, {
    tags: { service: 'payment', action: 'charge' },
    extra: { orderId, amount },
  });
  throw new ExternalServiceError('Payment provider');
}
```

---

## Part 3: Metrics with Prometheus

Metrics answer "is the system healthy right now?" — something logs cannot efficiently answer.

```bash
npm install prom-client
```

```typescript
// lib/metrics.ts
import {
  register,
  collectDefaultMetrics,
  Counter,
  Histogram,
  Gauge,
} from 'prom-client';

// Collect Node.js default metrics (memory, CPU, event loop lag)
collectDefaultMetrics({ register });

// HTTP request duration
export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
});

// HTTP request counter
export const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Active background jobs
export const activeJobsGauge = new Gauge({
  name: 'background_jobs_active',
  help: 'Number of currently active background jobs',
  labelNames: ['queue'],
});

// Business metrics
export const userSignupsTotal = new Counter({
  name: 'user_signups_total',
  help: 'Total number of user signups',
  labelNames: ['plan'],
});

export const ordersTotal = new Counter({
  name: 'orders_total',
  help: 'Total number of orders',
  labelNames: ['status'],
});

export { register };
```

```typescript
// middleware/metrics.ts
import { Request, Response, NextFunction } from 'express';
import { httpRequestDuration, httpRequestTotal } from '../lib/metrics';

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    // Use route pattern, not path — prevents high cardinality from IDs
    const route = req.route?.path ?? req.path;

    httpRequestDuration
      .labels(req.method, route, String(res.statusCode))
      .observe(duration);

    httpRequestTotal
      .labels(req.method, route, String(res.statusCode))
      .inc();
  });

  next();
}
```

```typescript
// Expose /metrics endpoint for Prometheus scraping
import { register } from '../lib/metrics';

router.get('/metrics', async (_req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});
```

>  **Protect the `/metrics` endpoint.** It exposes internal system state. Restrict it to your internal network or a specific IP allowlist — never expose it publicly.

>  **Avoid high-cardinality labels.** Never use `userId` or `productId` as a Prometheus label. Each unique value creates a new time series — millions of users means millions of series, which will OOM your Prometheus instance. Use route patterns, not dynamic values.

---

## Part 4: Distributed Tracing

Traces answer "where did this request spend its time?" across your entire stack.

```typescript
// lib/tracing.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

// Must be initialized before any other imports
const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'my-api',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318/v1/traces',
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-pg': { enabled: true },
      '@opentelemetry/instrumentation-redis': { enabled: true },
    }),
  ],
});

sdk.start();
```

```typescript
// tracing.ts must be the very first import in server.ts
import './lib/tracing';
import express from 'express';
// ...
```

> Auto-instrumentation captures HTTP requests, database queries, Redis calls, and outbound HTTP — with zero manual span creation. The trace shows you exactly where time was spent across the full request lifecycle.

---

## Part 5: Health Check Endpoint

Load balancers, Kubernetes, and uptime monitors need a health check. Build a meaningful one.

```typescript
// routes/health.ts
import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { redis } from '../lib/redis';

const router = Router();

router.get('/health', async (_req, res) => {
  const checks = await Promise.allSettled([
    prisma.$queryRaw`SELECT 1`,
    redis.ping(),
  ]);

  const [db, cache] = checks;

  const status = {
    status: checks.every((c) => c.status === 'fulfilled') ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION ?? 'unknown',
    checks: {
      database: db.status === 'fulfilled' ? 'up' : 'down',
      cache: cache.status === 'fulfilled' ? 'up' : 'down',
    },
  };

  const httpStatus = status.status === 'healthy' ? 200 : 503;
  res.status(httpStatus).json(status);
});

// Liveness probe — just confirms process is running
router.get('/health/live', (_req, res) => {
  res.json({ status: 'alive' });
});

export { router as healthRouter };
```

Two endpoints because Kubernetes needs two:
- `/health/live` — **liveness probe**: is the process running? If this fails, restart the pod.
- `/health` — **readiness probe**: is the app ready to serve traffic? If this fails, stop routing requests to this instance.

---

## Part 6: Alerting

Metrics and logs are useless if no one is watching. Define alerts for the conditions that matter.

### The Four Golden Signals (Google SRE)

| Signal | What to Alert On |
|---|---|
| **Latency** | p99 response time > 2s for 5 minutes |
| **Traffic** | Sudden spike or drop (> 2x or < 0.5x baseline) |
| **Errors** | Error rate > 1% for 5 minutes |
| **Saturation** | CPU > 80%, memory > 85%, queue depth > 1000 |

### Grafana Alert Example (Prometheus query)

```
# Error rate alert
sum(rate(http_requests_total{status_code=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))
> 0.01
```

### What to Alert On vs What to Log

```
Alert = something requires human action right now
Log   = something that might be useful for debugging later

 Alert: error rate > 1% sustained
 Alert: /health returning 503
 Alert: background job queue depth > 500
 Alert: p99 latency > 2 seconds

 Don't alert: single 500 error
 Don't alert: single slow request
 Don't alert: scheduled job completed
 Don't alert: user login failed (log it, alert on rate)
```

> **Alert fatigue kills incident response.** An on-call engineer who receives 50 alerts per night starts ignoring them all. Every alert must be actionable. If you cannot describe the action to take, do not create the alert.

---

## Part 7: Dashboards

A production dashboard should answer these questions at a glance:

```
┌─────────────────────────────────────────────────────────┐
│  SYSTEM HEALTH                              Last 1 hour  │
├──────────────┬──────────────┬──────────────┬────────────┤
│ Request Rate │  Error Rate  │ p50 Latency  │p99 Latency │
│   142 req/s  │    0.3%      │    48ms      │   380ms    │
├──────────────┴──────────────┴──────────────┴────────────┤
│  HTTP Status Codes (time series)                         │
│  ████ 2xx  ░ 4xx  · 5xx                                  │
├──────────────────────────────────────────────────────────┤
│  DB Query Duration (p99)    │  Redis Hit Rate             │
│  [time series chart]        │  [time series chart]        │
├──────────────────────────────────────────────────────────┤
│  Background Job Queue Depth │  Active Workers             │
│  [time series chart]        │  email: 3  files: 1         │
└──────────────────────────────────────────────────────────┘
```

Build one dashboard. Keep it simple. Make it the first thing you open during an incident.

---

## Implementation Checklist

- [ ] Pino logger configured with redaction for PII and secrets
- [ ] Request logging middleware records method, path, status, duration, requestId, userId
- [ ] Log levels used deliberately — no `console.log` in production code
- [ ] Sentry initialized before all other middleware
- [ ] Sentry `beforeSend` strips email and IP from events
- [ ] User context set in Sentry after auth (ID only, no email)
- [ ] Prometheus metrics middleware recording request duration and count
- [ ] Route labels use route patterns, not dynamic path segments
- [ ] `/metrics` endpoint restricted to internal network
- [ ] OpenTelemetry tracing initialized as first import
- [ ] `/health` and `/health/live` endpoints implemented
- [ ] Four golden signal alerts configured (latency, traffic, errors, saturation)
- [ ] Production dashboard built covering the core health signals

---

## AI Prompt: Observability Gap Analysis

```prompt
You are a senior SRE reviewing the observability setup for a production Node.js web application.

Current setup:
- Logging: Pino with structured JSON output to stdout
- Error tracking: Sentry with Express integration
- Metrics: Prometheus via prom-client, scraped by Grafana Cloud
- Tracing: OpenTelemetry with auto-instrumentation

Here are my current metrics and log examples:
[paste sample log lines]
[paste current Prometheus metric names]

Review for:
1. Metrics that are missing for diagnosing common production incidents
2. Log fields that would be useful but are absent
3. Alerts that should exist but don't
4. Cardinality risks in current metric labels
5. PII that may be present in logs or Sentry events

Return specific, actionable findings only.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| `console.log` in production | Unstructured, unsearchable, no levels | Replace with Pino logger |
| Logging request body without redaction | PII and secrets in logs | Redact sensitive fields |
| High-cardinality Prometheus labels | OOM on Prometheus instance | Use route patterns, never user IDs |
| Exposing `/metrics` publicly | System internals leaked | Restrict to internal network |
| Too many alerts | Alert fatigue, real incidents ignored | Only alert on actionable conditions |
| Shallow health check (`200 OK` always) | Load balancer routes to broken instance | Check DB and cache connectivity |
| Sentry capturing emails | GDPR violation, PII exposure | `beforeSend` strips PII |
| No request ID in logs | Cannot correlate events to a request | Add `x-request-id` middleware |

---

## Next: Phase 6 — Launch & Growth →

Observability is the last engineering system to build. Phase 6 covers Analytics, SEO, Performance, and the Launch Checklist — everything needed to take your application public.
