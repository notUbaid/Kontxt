---
title: Monitoring
slug: monitoring
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 25–40 min
---

# Monitoring

Monitoring is how you find out something is wrong before your users email you about it.

Without monitoring, you are blind. A database runs out of connections at 2am. An API endpoint starts returning 500s for one specific plan tier. Memory leaks slowly until the server crashes. You find out hours later when a user tweets about it.

With monitoring, you get paged. You investigate. You fix it. Users never notice.

This module covers the three layers of monitoring every production SaaS needs: infrastructure health, application behaviour, and user-facing uptime.

---

## The Three Monitoring Layers

```
Layer 3: Uptime monitoring       ← "Is the product reachable?"
              ↓
Layer 2: Application monitoring  ← "Is the product behaving correctly?"
              ↓
Layer 1: Infrastructure metrics  ← "Are the servers healthy?"
```

Most teams only have layer 1. They know CPU is at 40% but have no idea that 12% of API requests are returning 500s.

Build all three. They answer different questions and catch different failures.

---

## Layer 1: Infrastructure Metrics

These are the server-level signals that indicate resource pressure before things break.

**What to track:**

| Metric | Warning threshold | Critical threshold |
|---|---|---|
| CPU usage | > 70% sustained | > 90% sustained |
| Memory usage | > 75% | > 90% |
| Disk usage | > 70% | > 85% |
| Database connections | > 70% of pool | > 90% of pool |
| Database disk I/O | Baseline + 3× | Baseline + 5× |

Most hosting platforms provide these out of the box:

| Platform | Built-in metrics |
|---|---|
| **Railway** | CPU, memory, network in dashboard |
| **Fly.io** | Metrics via Grafana or Prometheus |
| **Render** | CPU, memory in dashboard |
| **AWS / GCP / Azure** | CloudWatch / Cloud Monitoring — comprehensive |
| **Vercel** | Function invocations, duration, errors |

**If you're on a managed platform, infrastructure metrics are mostly handled for you.** The gap is always application-level monitoring — which you must build yourself.

---

## Layer 2: Application Monitoring

This is where most production issues live. Your server is healthy. Your app is not.

### The Four Golden Signals

These four metrics, popularized by Google's SRE book, describe the health of any service:

**1. Latency** — How long are requests taking?
Track p50, p95, and p99 separately. A rising p99 with a stable p50 means edge cases are degrading — a specific query, a specific user, a specific code path.

**2. Traffic** — How many requests per second?
Unusual spikes or drops both indicate problems. A traffic drop can mean your app is unreachable.

**3. Errors** — What percentage of requests are failing?
Track error rate as a percentage of total requests, not an absolute count. 100 errors at 0.1% rate is fine. 100 errors at 50% rate is an outage.

**4. Saturation** — How close are you to capacity?
DB connection pool, queue depth, memory headroom.

### Implementing Application Metrics

```typescript
// middleware/metrics.ts
// Track latency and error rate per endpoint

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const route = `${req.method} ${req.route?.path ?? req.path}`;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusClass = Math.floor(res.statusCode / 100);

    // Emit to your metrics system
    metrics.histogram('http.request.duration_ms', duration, {
      route,
      method: req.method,
      status: res.statusCode,
    });

    metrics.increment('http.requests.total', {
      route,
      method: req.method,
      status_class: `${statusClass}xx`,
    });

    // Log slow requests
    if (duration > 1000) {
      logger.warn('Slow request', { route, duration, userId: req.user?.id });
    }
  });

  next();
}
```

### Datadog vs Grafana vs Self-Hosted

| Tool | Best for | Cost |
|---|---|---|
| **Datadog** | Full observability stack in one product, fast setup | $15–23/host/month |
| **Grafana Cloud** | Open-source stack (Prometheus + Grafana), generous free tier | Free to start |
| **New Relic** | APM with code-level traces, good free tier | Free to 100GB/month |
| **Axiom** | Log-first observability, excellent for serverless | Free to 500GB/month |

For most early SaaS products: **Grafana Cloud** (free, powerful, respects your runway) or **Datadog** if you're post-revenue and want everything in one place.

---

## Setting Up Structured Logging

Logs are only useful if you can query them. Unstructured logs (`console.log("user logged in")`) are noise. Structured logs are queryable, filterable, and alertable.

```typescript
// lib/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    env: process.env.NODE_ENV,
    service: 'api',
  },
  redact: {
    paths: ['*.password', '*.token', '*.secret', '*.authorization', '*.cookie'],
    censor: '[REDACTED]',
  },
});
```

```typescript
// Usage — structured, not interpolated strings
logger.info({
  event: 'user.login',
  userId: user.id,
  organizationId: user.organizationId,
  method: 'email',
  duration_ms: Date.now() - start,
});

logger.error({
  event: 'payment.failed',
  userId: user.id,
  stripeError: err.code,
  amount: charge.amount,
}, 'Payment processing failed');
```

**Why structured logging matters:**

```
# Unstructured — you can grep but you can't aggregate
"Payment failed for user abc123: card_declined"

# Structured — you can query: "show me all card_declined errors in the last hour, grouped by plan"
{ "event": "payment.failed", "userId": "abc123", "stripeError": "card_declined", "plan": "pro" }
```

Add a request context to every log line:

```typescript
// middleware/request-context.ts
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage<{ requestId: string; userId?: string }>();

export function requestContextMiddleware(req: Request, res: Response, next: NextFunction) {
  const requestId = crypto.randomUUID();
  res.setHeader('X-Request-Id', requestId);

  context.run({ requestId, userId: req.user?.id }, next);
}

// In your logger, automatically include requestId in every log line
export function getLogContext() {
  return context.getStore() ?? {};
}
```

---

## Layer 3: Uptime Monitoring

Uptime monitoring answers a simple question from outside your infrastructure: "Can real users reach the product right now?"

It is not the same as your server being up. Your server can be up while your DNS is broken, your CDN is serving a stale error page, or your database is refusing connections.

### What to Monitor

```
Critical paths to monitor externally:
  ├── Homepage / login page                 ← marketing + auth entry point
  ├── POST /api/auth/login                  ← can users actually log in?
  ├── GET /api/health                       ← app + DB health check
  ├── Your most-used API endpoint           ← core product function
  └── Stripe webhook endpoint               ← revenue-critical
```

### Build a Health Check Endpoint

```typescript
// GET /api/health
// This endpoint is called by uptime monitors every minute
async function healthCheck(req: Request, res: Response) {
  const checks: Record<string, 'ok' | 'error'> = {};

  // Database connectivity
  try {
    await db.$queryRaw`SELECT 1`;
    checks.database = 'ok';
  } catch {
    checks.database = 'error';
  }

  // Redis connectivity (if used)
  try {
    await redis.ping();
    checks.cache = 'ok';
  } catch {
    checks.cache = 'error';
  }

  const allHealthy = Object.values(checks).every(v => v === 'ok');

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
  });
}
```

**Return 503 when unhealthy.** Uptime monitors check the HTTP status code. A 200 with `{"status": "error"}` in the body will not trigger an alert.

**Do not put this endpoint behind authentication.** It needs to be callable by external monitors without a session.

### Uptime Monitoring Tools

| Tool | Check interval | Free tier | Alerting |
|---|---|---|---|
| **Better Uptime** | 30 seconds | 10 monitors | Email, Slack, PagerDuty |
| **UptimeRobot** | 5 minutes | 50 monitors | Email, SMS |
| **Checkly** | 1 minute | Limited | Full — also runs E2E checks |
| **Grafana Synthetic** | 1 minute | Free | Integrates with Grafana alerting |

Set up at minimum: homepage, `/api/health`, and your login endpoint. Configure alerts to your phone for any failure longer than 2 consecutive checks.

---

## Alerting

An alert that wakes you up for every minor fluctuation is worse than no alerting — you start ignoring it.

### Alerting Principles

**Alert on symptoms, not causes.**
"Error rate > 1% for 5 minutes" is a symptom — something is wrong for users.
"CPU > 60%" is a cause — it may or may not affect users.

Alert on symptoms. Investigate causes.

**Severity tiers:**

| Tier | Condition | Response |
|---|---|---|
| **Critical (page immediately)** | Error rate > 5%, site unreachable, payment failures | Wake up, fix now |
| **Warning (notify during hours)** | p99 latency > 2s, error rate 1–5%, disk > 80% | Investigate today |
| **Info (weekly review)** | Gradual metric drift, non-critical slowdowns | Note and schedule |

**Avoid alert fatigue.** Start with 3–5 critical alerts. Add more only as you understand your system's normal behaviour.

### Recommended Alert Set

```
Critical (PagerDuty / phone call):
  ├── Uptime check failing for > 2 consecutive checks
  ├── Error rate > 5% for 5 minutes
  ├── Health check returning 503
  └── Stripe webhook failures > 3 in 10 minutes

Warning (Slack #alerts):
  ├── p99 API latency > 2000ms for 10 minutes
  ├── Error rate > 1% for 10 minutes
  ├── Database connection pool > 80%
  ├── Disk usage > 80%
  └── Background job queue depth > 500
```

---

## AI Prompt — Monitoring Strategy Review

```
You are a senior SRE reviewing the monitoring strategy for a SaaS product.

Product context:
[Describe your product, its core user flows, and what would constitute an outage]

Current infrastructure:
[Hosting platform, database, Redis, background jobs, CDN]

Current monitoring in place:
[What you currently track and alert on]

Monthly active users: [X]
Revenue criticality: [e.g. "payments fail silently" or "outage = direct MRR loss"]

Please:
1. Identify the 3 scenarios most likely to cause user-visible failures that I'm not currently detecting
2. Define what an "outage" means for my specific product and suggest the alert that catches it
3. Write the exact health check endpoint logic I should implement given my stack
4. Suggest my top 5 alerts ranked by importance, with specific thresholds
5. Tell me one metric I'm probably tracking that I should stop caring about

Be specific to my stack and revenue model.
```

---

## Implementation Checklist

### Infrastructure Metrics

- [ ] CPU, memory, disk monitored with threshold alerts
- [ ] Database connection pool utilization tracked
- [ ] Hosting platform dashboard reviewed

### Application Monitoring

- [ ] Structured JSON logging implemented (pino / winston)
- [ ] Passwords, tokens, secrets redacted from all log output
- [ ] Request ID added to every log line
- [ ] HTTP request duration and error rate tracked per endpoint
- [ ] Slow request threshold defined and logged (e.g. > 1000ms)
- [ ] Background job failures logged with full context

### Uptime Monitoring

- [ ] `/api/health` endpoint implemented and returns 503 when unhealthy
- [ ] Health check tests database connectivity
- [ ] Health check tests Redis connectivity (if applicable)
- [ ] External uptime monitor configured for homepage
- [ ] External uptime monitor configured for `/api/health`
- [ ] External uptime monitor configured for login endpoint
- [ ] Alerts configured to notify within 2 minutes of failure

### Alerting

- [ ] Critical alerts go to phone/PagerDuty (not just email)
- [ ] Error rate alert: > 5% for 5 minutes
- [ ] Latency alert: p99 > 2s for 10 minutes
- [ ] Uptime alert: 2 consecutive failed checks
- [ ] Alert runbook exists (what to check when alert fires)

---

## Common Mistakes

> **⚠️ Health check endpoint behind authentication**
> An authenticated health check that returns 401 when your session service is broken tells you nothing. Health checks must be public and dependency-aware.

> **⚠️ Alerting on averages instead of percentiles**
> Average latency of 200ms can coexist with p99 latency of 8,000ms. 1% of your users are having a terrible experience. Always alert on p95 or p99.

> **⚠️ Only monitoring infrastructure, not application behaviour**
> Your server can show green on CPU and memory while returning 500s to every user. Infrastructure metrics and application metrics are not the same thing. You need both.

> **⚠️ `console.log` in production**
> Unstructured logs can't be queried or alerted on. They fill up disk. They contain no context. Replace with structured logging before you go to production.

> **⚠️ No on-call process**
> An alert that fires to a Slack channel nobody watches at 3am is not monitoring. Define who gets paged, how, and what they should do. Even for a solo founder: set up PagerDuty to call your phone for critical alerts.

---

## What's Next

Monitoring is in place. Before moving on, confirm:

- Your health check endpoint returns 503 when you intentionally break the database connection
- A test alert has fired and reached the right person via the right channel
- At least one external uptime monitor is actively checking your production URL
- Structured logs are flowing and queryable in your log platform

Next up: **Logging**
