---
title: Error Tracking
slug: error-tracking
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Error Tracking

Logging tells you what happened. Error tracking tells you what's broken — grouped, prioritized, and assigned before a user has to report it.

Without error tracking, production bugs surface through support tickets. A user hits an unhandled exception, gets a blank screen, gives up, and eventually emails you. By then, the error may have affected hundreds of sessions.

With error tracking, you know within minutes. You see exactly which users were affected, the full stack trace, the request context, and how many times it's happened.

---

## Logging vs Error Tracking

These are complementary tools, not substitutes for each other.

| | Logging | Error Tracking |
|---|---|---|
| **Purpose** | Record what happened | Detect and triage what's broken |
| **Format** | Structured events | Grouped exceptions with context |
| **Volume** | High | Low (errors only) |
| **Retention** | Days to weeks | Weeks to months |
| **Alerting** | Threshold-based | Per new issue or regression |
| **Primary user** | On-call engineer | Dev team, product team |

Both belong in a production SaaS. They answer different questions.

---

## Tool Selection

The market has converged. One tool dominates for good reason.

| Tool | Verdict |
|---|---|
| **Sentry** | Industry standard. Best SDKs, best DX, generous free tier. Default choice. |
| **Bugsnag** | Strong alternative. Better for mobile-heavy products. |
| **Rollbar** | Solid. Less common in modern stacks. |
| **Datadog Error Tracking** | Good if already using Datadog for observability. |
| **Highlight.io** | Open-source option. Session replay included. |

> **Recommendation:** Use Sentry unless you have a specific reason not to. Its SDK coverage, release tracking, performance monitoring, and team features are unmatched at its price point. The free tier is sufficient for early-stage SaaS.

---

## What Error Tracking Captures

An error event is more than a stack trace.

```
Exception type and message
Full stack trace with source maps (minified JS → original source)
User context (id, email, plan)
Request context (URL, method, headers, body excerpt)
Browser / OS / runtime environment
Release version (which deploy introduced this?)
Breadcrumbs (what did the user do before the error?)
Custom tags (tenant, feature flag, plan tier)
First seen / last seen / occurrence count
Affected user count
```

This is what makes error tracking genuinely different from reading logs.

---

## Sentry Setup

### Install

```bash
# Node.js / Next.js
npm install @sentry/nextjs

# Node.js (Express / Fastify)
npm install @sentry/node

# Python
pip install sentry-sdk

# React (client-side only)
npm install @sentry/react
```

### Initialise — Server

```typescript
// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.VERCEL_GIT_COMMIT_SHA, // or your CI commit SHA

  // Sample rates — start conservative, tune later
  tracesSampleRate: 0.1,   // 10% of transactions for performance
  profilesSampleRate: 0.1,

  // Ignore known non-issues
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "Network request failed",
    /^AbortError/,
  ],

  beforeSend(event) {
    // Strip sensitive data before it leaves your server
    if (event.request?.data) {
      delete event.request.data.password
      delete event.request.data.token
    }
    return event
  }
})
```

### Initialise — Client

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  tracesSampleRate: 0.05,  // Lower on client — higher volume

  // Replay captures video-like session replays on errors
  replaysOnErrorSampleRate: 1.0,   // Always capture on error
  replaysSessionSampleRate: 0.01,  // 1% of normal sessions

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,       // GDPR: mask all text by default
      blockAllMedia: true,     // Block images/video in replays
    })
  ]
})
```

---

## User Context

Without user context, you know an error happened. With it, you know who to contact, how many paying customers were affected, and whether it's isolated or systemic.

```typescript
// Set user context once at login / session start
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name,
  // Custom fields
  plan: user.subscription.plan,
  tenantId: user.tenantId
})

// Clear on logout
Sentry.setUser(null)
```

> **GDPR note:** Sentry stores user data on their servers. Confirm your Sentry data region (US vs EU). If storing email addresses in error events triggers compliance concerns, use internal IDs only and look users up in your own database.

---

## Custom Context and Tags

Tags make errors filterable. Add them for the dimensions you'll actually filter on.

```typescript
// Tags — filterable, indexed, low cardinality
Sentry.setTag("plan", user.subscription.plan)    // "free", "pro", "enterprise"
Sentry.setTag("tenant", user.tenantId)
Sentry.setTag("feature_flag", "new_checkout_v2")

// Extra context — not indexed but visible in event detail
Sentry.setContext("subscription", {
  plan: user.subscription.plan,
  billingCycle: user.subscription.billingCycle,
  trialEndsAt: user.subscription.trialEndsAt
})
```

After a deploy, you can immediately filter: *"Which errors are only hitting Enterprise tenants?"* or *"Is this only on the new checkout flag?"*

---

## Capturing Errors Manually

Sentry auto-captures unhandled exceptions. For handled errors — places where you catch and recover — you still want visibility.

```typescript
// Capture a specific error with context
try {
  await stripe.charges.create(chargeParams)
} catch (err) {
  Sentry.withScope((scope) => {
    scope.setTag("payment.provider", "stripe")
    scope.setExtra("chargeParams", {
      amount: chargeParams.amount,
      currency: chargeParams.currency,
      // Never log card details
    })
    Sentry.captureException(err)
  })

  // Handle gracefully for the user
  throw new PaymentError("Payment failed. Please try again.")
}
```

```typescript
// Capture a message (not an exception) for unexpected states
if (webhookEvent.type === "unknown_event_type") {
  Sentry.captureMessage(`Unhandled Stripe webhook: ${webhookEvent.type}`, "warning")
}
```

---

## Release Tracking

Release tracking lets you see exactly which deploy introduced a regression.

```bash
# In your CI/CD pipeline, after deploy
npx sentry-cli releases new $COMMIT_SHA
npx sentry-cli releases set-commits $COMMIT_SHA --auto
npx sentry-cli releases finalize $COMMIT_SHA
npx sentry-cli releases deploys $COMMIT_SHA new -e production
```

In Sentry, you can now see:
- First seen in release `abc1234`
- Regression in release `def5678`
- Which commits are between the working and broken release

This turns "something broke" into "this specific commit broke it."

---

## Source Maps

Without source maps, Sentry shows you minified stack traces: `a.b.c is not a function at bundle.min.js:1:84732`. With source maps, you see the original file, function name, and line number.

```typescript
// next.config.js — Next.js handles this automatically with @sentry/nextjs
const { withSentryConfig } = require("@sentry/nextjs")

module.exports = withSentryConfig(nextConfig, {
  org: "your-org",
  project: "your-project",
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,   // Don't ship source maps to browsers
  disableLogger: true
})
```

> Upload source maps to Sentry during CI. Never ship them to the browser — they expose your source code.

---

## Alert Configuration

The default Sentry alert (every new issue) creates noise. Configure alerts that require action.

### Recommended Alert Rules

```
Rule 1: New issue in production
→ Alert: Slack #engineering-alerts
→ When: A new issue is first seen in production
→ Why: Fast awareness of new regressions

Rule 2: Issue regression
→ Alert: Slack #engineering-alerts
→ When: A resolved issue re-appears
→ Why: Deploy introduced a regression

Rule 3: High volume spike
→ Alert: PagerDuty or phone notification
→ When: An issue occurs >100 times in 1 hour
→ Why: Something is systemically broken

Rule 4: Affected users threshold
→ Alert: Slack #engineering-alerts
→ When: An issue affects >10 unique users
→ Why: Signals user-facing impact, not edge case
```

Silence alerts that don't require action. Alert fatigue is real and causes engineers to ignore critical notifications.

---

## Issue Triage Workflow

When Sentry sends an alert, follow a consistent process.

```
1. ASSESS
   → How many users affected?
   → Is it growing or stable?
   → Which release introduced it?

2. REPRODUCE
   → Read the breadcrumbs
   → Watch the session replay (if available)
   → Check the request context

3. CLASSIFY
   → P0: Blocking core flow for many users → fix now
   → P1: Affecting a significant subset → fix today
   → P2: Edge case, isolated → add to backlog

4. RESOLVE
   → Fix and deploy
   → Mark resolved in Sentry linked to the fix commit
   → Sentry will alert if it regresses
```

Sentry issues should have an owner. Unassigned issues are ignored issues.

---

## What Not to Track

Error tracking volume affects cost and signal quality. Filter noise aggressively.

**Ignore in Sentry config:**
- Browser extension errors (`chrome-extension://`)
- Network failures outside your control (`Failed to fetch` with no stack)
- Known third-party script errors
- ResizeObserver and IntersectionObserver edge cases
- Bot traffic

**Do not capture as errors:**
- Expected validation failures (user typed a bad email)
- Business logic branches (user tried to access a feature they're not on)
- 404s from crawlers

> These belong in logs. Error tracking is for genuinely unexpected failures.

---

## AI Prompt — Error Review

Use this when debugging a Sentry issue you can't immediately understand.

<copy-prompt>
I'm debugging a production error in my SaaS application.

Stack: [YOUR STACK]

Error message:
[PASTE EXACT ERROR MESSAGE]

Stack trace:
[PASTE STACK TRACE]

Context:
- What the user was doing: [BREADCRUMBS OR DESCRIPTION]
- Frequency: [HOW OFTEN]
- Affected users: [COUNT]
- First seen: [DATE/RELEASE]

Help me:
1. Identify the root cause of this error
2. Identify where in my code this originates
3. Suggest the correct fix
4. Suggest what I should add to prevent similar errors from being silent in future
</copy-prompt>

---

## Error Tracking Checklist

- [ ] Sentry (or equivalent) installed on both client and server
- [ ] DSN stored in environment variables, not committed to source
- [ ] Correct environment set (`production`, `staging`)
- [ ] Release tracking configured in CI/CD pipeline
- [ ] Source maps uploading correctly (verify in Sentry issues)
- [ ] User context set at session start and cleared at logout
- [ ] Sensitive fields stripped in `beforeSend`
- [ ] GDPR data region confirmed (EU or US)
- [ ] Custom tags set for plan tier and tenant
- [ ] At least one alert rule configured and tested
- [ ] Alert routes to a monitored channel (Slack, PagerDuty)
- [ ] Noise filters configured (browser extensions, network errors)
- [ ] Session replay enabled with text masking
- [ ] Team members added to Sentry project
- [ ] Issue assignment process agreed with team

---

## Common Mistakes

> **Mistake: Ignoring Sentry after setup**
> Sentry sends an alert, nobody looks, the habit never forms. Assign a rotation or a specific owner for triage. Issues in Sentry without owners get ignored.

> **Mistake: Alerting on every issue**
> A new Sentry issue per bot 404 or browser extension crash creates alert fatigue. Engineers stop reading the alerts. Filter aggressively.

> **Mistake: Not setting user context**
> "10 users affected" is actionable. "Some users affected" is not. Always identify affected users.

> **Mistake: Shipping source maps to the browser**
> Your entire application source code is now public. Always upload source maps to Sentry and exclude them from your browser bundle.

> **Mistake: Not linking Sentry to your version control**
> Without release tracking, you can't answer "which deploy caused this?" — the most important question after "what broke?"

---

## Next

With error tracking capturing and grouping exceptions, the next layer is **Rate Limiting** — protecting your API from abuse, accidental thundering herds, and the costs that come with them.
