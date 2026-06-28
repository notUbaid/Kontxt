---
title: Post-launch Monitoring
slug: post-launch-monitoring
phase: Phase 6
mode: production
projectType: web-app
estimatedTime: 30–40 min
---

# Post-launch Monitoring

Launching is the beginning of your operational responsibility, not the end of your engineering work.

Production systems fail in ways you did not anticipate during development. The difference between a good engineering team and a mediocre one is not whether things break — it is how quickly they know, how accurately they diagnose, and how fast they recover.

This module builds the system that tells you when something is wrong before your users do.

---

## The Monitoring Stack You Actually Need

Most teams either monitor nothing or instrument everything and drown in noise. Both are failures.

The goal is **signal without noise**: know when something is genuinely wrong, know why, and have enough context to fix it without spending an hour reading logs.

You need four things:

| Layer | What It Answers | Tool Options |
|---|---|---|
| **Uptime** | Is my app reachable at all? | Better Uptime, Checkly, Pulsetic |
| **Errors** | What is breaking, and for whom? | Sentry, Highlight, Axiom |
| **Logs** | What was happening when it broke? | Your host's log viewer, Axiom, Logtail |
| **Business metrics** | Is the app doing what it exists to do? | PostHog, your own DB queries |

Start with uptime and errors. Add the rest progressively.

---

## Layer 1 — Uptime Monitoring

Uptime monitoring answers one question: can a user reach your app right now?

It works by sending HTTP requests to your app from external servers on a schedule (every 1–5 minutes) and alerting you if the request fails or takes too long.

### What to monitor

At minimum:
- Your homepage (`/`)
- Your health check endpoint (`/api/health`)
- Your login page (if separate)
- Your most critical API endpoint

### Health check endpoint

Your health check should verify that your app's dependencies are alive, not just that the process is running.

```ts
// app/api/health/route.ts (Next.js)
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Verify database is reachable
    await db.$queryRaw`SELECT 1`

    return Response.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json(
      { status: 'error', message: 'Database unreachable' },
      { status: 503 }
    )
  }
}
```

A health check that only returns 200 without checking dependencies gives you a false sense of availability. Your app can be "up" while your database is down.

### Alert configuration

- Alert on: 2 consecutive failures (avoid false positives from transient network issues)
- Alert channel: SMS or phone call for critical apps, email or Slack for lower-stakes apps
- Recovery alert: notify when the issue resolves (so you know the timeline)

> ⚠️ **Warning:** Uptime alerts at 3am are only useful if someone acts on them. Define your response protocol before you configure your alerts. An alert nobody responds to is noise.

---

## Layer 2 — Error Monitoring

Uptime tells you the app is reachable. Error monitoring tells you what is breaking inside it.

### Sentry setup (most common choice)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

The wizard handles most configuration. Verify these settings manually:

```ts
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Only send errors in production
  enabled: process.env.NODE_ENV === 'production',

  // Sample rate: 1.0 = capture all errors
  // Reduce if you hit Sentry's event limits
  sampleRate: 1.0,

  // Performance tracing sample rate
  // 0.1 = capture 10% of transactions
  tracesSampleRate: 0.1,
})
```

### What Sentry captures automatically

- Unhandled JavaScript exceptions (frontend)
- Unhandled promise rejections
- API route errors (backend)
- React component errors (with error boundaries)

### What you need to capture manually

User context — critical for debugging:

```ts
// Set when user logs in
Sentry.setUser({
  id: user.id,
  email: user.email,
})

// Clear when user logs out
Sentry.setUser(null)
```

Expected errors that are still worth tracking:

```ts
try {
  await processPayment(paymentData)
} catch (error) {
  // Log to Sentry with context, but handle gracefully
  Sentry.captureException(error, {
    tags: { feature: 'payments' },
    extra: { userId: user.id, amount: paymentData.amount },
  })

  return { error: 'Payment failed. Please try again.' }
}
```

### Alert configuration in Sentry

Configure alerts for:
- **New issue detected** — alert immediately (something new is breaking)
- **Issue regression** — alert when a previously resolved issue reappears
- **High frequency** — alert when an error occurs more than N times in 1 hour

Do not alert on every single occurrence of a known error. You will start ignoring alerts.

### Verifying Sentry works

Do not assume the integration works. Test it immediately after setup:

```ts
// Temporarily add to a route, trigger it, then remove
throw new Error('Sentry integration test — remove this')
```

Confirm the error appears in your Sentry dashboard within 30 seconds.

---

## Layer 3 — Structured Logging

Error monitoring captures exceptions. Logging captures everything else — the context around an error, the sequence of events that led to it, and the behaviour of background jobs.

### What to log

**Always log:**
- Authentication events (login success, login failure, logout)
- Payment events (charge created, charge failed, webhook received)
- Critical mutations (user deleted, data exported, role changed)
- Background job start, completion, and failure

**Never log:**
- Passwords, tokens, or secrets (even partially)
- Full credit card numbers or sensitive PII
- Request bodies that may contain sensitive data (log selectively)

### Structured log format

Plain text logs are difficult to search and parse. Use structured JSON.

```ts
// lib/logger.ts
type LogLevel = 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  [key: string]: unknown
}

export function log(level: LogLevel, message: string, context: Record<string, unknown> = {}) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...context,
  }

  // In production: outputs structured JSON for log aggregation services
  // In development: outputs readable format
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(entry))
  } else {
    console.log(`[${entry.level.toUpperCase()}] ${entry.message}`, context)
  }
}

// Usage
log('info', 'User logged in', { userId: user.id, ip: request.ip })
log('error', 'Payment failed', { userId: user.id, stripeError: error.code })
```

### Where logs go

| Hosting | Default Log Access |
|---|---|
| Vercel | Vercel Dashboard → Functions → Logs (24h retention on free) |
| Railway | Railway Dashboard → Deployment → Logs |
| Fly.io | `fly logs` or Fly dashboard |
| Self-hosted | Wherever you route stdout |

For longer retention and searchability, pipe logs to Axiom, Logtail, or Datadog.

---

## Layer 4 — Business Metrics

Technical monitoring tells you your app is working. Business metrics tell you it is working *for users*.

These are the metrics that tell you whether your launch is succeeding or silently failing.

### The metrics that actually matter

Define these before launch and query them daily for the first two weeks:

**Acquisition**
- New signups per day
- Signup funnel drop-off (where are users abandoning signup?)

**Activation**
- % of signups who complete the core action within 24 hours
- Time to first meaningful action (first project created, first file uploaded, etc.)

**Retention**
- Day 1, Day 7, Day 30 return rate
- Daily/Weekly active users

**Revenue (if applicable)**
- New paid subscriptions per day
- Trial to paid conversion rate
- Failed payment rate
- Churn rate

### Implementation options

**PostHog** — self-hostable analytics with funnel analysis, session recording, and feature flags:

```ts
// Track custom events
posthog.capture('project_created', {
  projectType: project.type,
  userId: user.id,
})
```

**Your own database** — the simplest approach for core business metrics:

```sql
-- New signups today
SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '24 hours';

-- Activated users (completed core action within 24h of signup)
SELECT COUNT(DISTINCT u.id)
FROM users u
JOIN projects p ON p.user_id = u.id
WHERE p.created_at < u.created_at + INTERVAL '24 hours';
```

> **Principle:** Instrument user actions from day one. You cannot retroactively add tracking to past events. Every week you delay instrumentation is a week of data you will never recover.

---

## Incident Response

When something breaks in production, panic is the enemy of diagnosis. A simple process helps.

### The incident loop

```
1. DETECT   — Alert fires or user reports an issue
2. ASSESS   — What is broken? How many users affected? How severe?
3. MITIGATE — Can you reduce impact immediately? (rollback, feature flag off, disable route)
4. DIAGNOSE — Find root cause using errors, logs, and metrics
5. FIX      — Deploy fix or permanent mitigation
6. REVIEW   — What allowed this to happen? What prevents recurrence?
```

### Severity levels

Define these for yourself before an incident happens — not during one:

| Level | Description | Response Time |
|---|---|---|
| **P1** | App is down or core feature is broken for all users | Immediate |
| **P2** | Core feature is broken for some users | Within 1 hour |
| **P3** | Non-critical feature is broken | Within 24 hours |
| **P4** | Minor issue, cosmetic, or low impact | Next deployment |

### Rollback plan

Know how to roll back before you need to. Test it before launch.

```bash
# Vercel: rollback to previous deployment
vercel rollback [deployment-url]

# Railway: redeploy a previous deployment from the dashboard

# Docker: redeploy the previous image tag
docker pull myapp:previous-tag
docker stop myapp && docker run -d myapp:previous-tag
```

The fastest fix for a broken deployment is often the previous working deployment.

---

## AI Prompt — Monitoring Audit

Use this to review your monitoring coverage before or after launch.

```
You are a senior SRE reviewing my monitoring setup.

My web app:
- Stack: [e.g. Next.js 14, PostgreSQL, Stripe, deployed on Vercel]
- Current monitoring:
  - Uptime: [tool and what URLs are monitored]
  - Error tracking: [tool and what is configured]
  - Logging: [what is logged and where]
  - Business metrics: [what is tracked]

Review my monitoring coverage and tell me:

1. What failure modes am I currently blind to?
2. What are the most likely issues I will encounter in my first 30 days that my current setup will not catch?
3. What is the single most important monitoring gap to close before launch?
4. For each gap, what is the minimum viable fix?

Be specific to my stack. Do not give generic monitoring advice.
```

---

## Post-launch Monitoring Schedule

### First 30 minutes after launch
- Keep error monitoring dashboard open
- Watch live logs for unexpected errors
- Watch uptime dashboard for availability

### First 24 hours
- Check error monitoring for new issues every 2–3 hours
- Query new signup count
- Manually test core flow again if any errors appear

### First week
- Review Sentry for most frequent errors — fix top 3
- Check Core Web Vitals in Search Console (may take a few days to populate)
- Review business metrics: signups, activation rate, core actions

### Ongoing (weekly)
- Error monitoring: any new or regressing issues?
- Uptime: any incidents this week?
- Business metrics: is the trend in the right direction?
- Database: any slow queries appearing?

---

## Validation Checklist

**Uptime**
- [ ] Uptime monitor is configured on homepage and `/api/health`
- [ ] Health check endpoint verifies database connectivity
- [ ] Alerts route to a channel someone actually checks
- [ ] Alert fires and recovers correctly (test by temporarily returning 500)

**Error Monitoring**
- [ ] Sentry (or equivalent) is installed and configured for production only
- [ ] A test error was triggered and confirmed visible in the dashboard
- [ ] User context (ID, email) is attached to errors after login
- [ ] Alerts configured for new issues and regressions
- [ ] Source maps are uploaded so stack traces show original code

**Logging**
- [ ] Auth events are logged (login, logout, failed login)
- [ ] Payment events are logged
- [ ] Logs are accessible without server access
- [ ] No passwords, tokens, or secrets appear in logs

**Business Metrics**
- [ ] Core user actions are instrumented with analytics events
- [ ] Signup count is queryable
- [ ] Core activation action is trackable
- [ ] You know where to check daily metrics without writing a new query each time

**Incident Readiness**
- [ ] You know how to roll back a deployment
- [ ] You know how to restore the database from backup
- [ ] Alert channels are tested and working
- [ ] Severity levels are defined for your app

---

## Common Mistakes

**Monitoring the wrong thing.**
Checking that your server process is running is not the same as checking that users can log in, pay, and use the core feature. Monitor user-facing outcomes, not internal processes.

**Alert fatigue.**
If you configure an alert for every error occurrence, you will start ignoring alerts within a week. Alert on new issues, regressions, and high-frequency spikes — not individual occurrences of known errors.

**Not testing your alerts.**
Configure an alert, then immediately test it by triggering the condition. An alert you have never seen fire may be silently misconfigured.

**Logging PII or secrets.**
A log line that includes a user's password, full credit card number, or auth token is a security incident. Audit your log output before deploying to production.

**No rollback plan.**
"We'll fix it forward" is a valid strategy — but only if you know what you're fixing. If a deployment breaks core functionality and you cannot diagnose it quickly, rollback is faster than debugging under pressure.

**Ignoring business metrics.**
An app with 99.9% uptime that nobody uses is still failing. Technical monitoring and business monitoring answer different questions. Both are necessary.
