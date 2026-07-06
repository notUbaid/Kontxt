---
title: Monitoring Architecture
slug: monitoring-architecture
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# Monitoring Architecture

Usage tracking tells you *what* happened. Monitoring tells you *when something's wrong*, ideally before a caller has to tell you first. For a personal project, this doesn't mean a full observability stack — it means deciding, right now, what "broken" looks like for your API, so you're not discovering it from a confused email or a silently failing integration weeks later.

## Three Signals That Actually Matter at Personal Scale

You don't need dozens of metrics. You need to know, at a glance, whether your API is healthy:

| Signal | What it tells you | Why it matters |
|---|---|---|
| **Error rate** | Percentage of requests returning `5xx` | A spike means something in your system is broken, not just a caller sending bad input |
| **Response time** | How long requests take, especially p95/p99 (the slower tail, not just average) | Averages hide problems — a p99 spike means some callers are having a genuinely bad experience even if "average" looks fine |
| **Uptime/availability** | Is the API reachable at all | The most basic signal — if this fails, nothing else matters |

Resist the urge to instrument everything possible from day one. These three, tracked consistently, catch the overwhelming majority of real problems a personal API will actually encounter.

## Structured Logging: The Foundation Everything Else Builds On

Before dashboards or alerts, make sure your logs are structured (JSON, not free-text) and consistent — this is what makes the rest of this module possible without expensive tooling:

```json
{
  "timestamp": "2026-07-01T14:30:00Z",
  "level": "error",
  "endpoint": "/v1/subscriptions/123",
  "method": "GET",
  "status_code": 500,
  "owner_id": "own_9f8e7d",
  "error": "database_connection_timeout",
  "response_time_ms": 4200
}
```

> **Tip:** Structured logs mean you can grep, filter, or query by field (`status_code >= 500`) instead of trying to parse free-text log lines. This single habit — log in JSON from day one — pays for itself the first time you're debugging a production issue at 11pm and need to filter fast.

## Error Tracking: Know About It Before They Tell You

Connects forward to **Error Tracking** later in this phase — but the architectural decision belongs here: every unhandled exception needs to be captured somewhere you'll actually see it, not just written to a log file you never open. A free tier of a hosted error tracking tool (Sentry and similar tools have generous free tiers well-suited to personal projects) is worth the five-minute setup — it turns "I found out my API was broken because a friend mentioned it" into "I got a notification the moment it happened."

- [ ] Every unhandled exception is captured by an error tracking tool, not just logged locally
- [ ] I'm notified (email, or a channel I actually check) when a new error type occurs

## Health Check Endpoint

A minimal, unauthenticated endpoint that confirms your API and its dependencies (database, at minimum) are reachable:

```
GET /health
Response: { "status": "ok", "database": "connected" }
```

This is what uptime monitoring services (many have free tiers) ping every few minutes to alert you if your API goes down entirely — cheap to build, and the single fastest way to know about an outage before a caller does.

> **Warning:** Don't put your health check behind authentication — an uptime monitor needs to reach it without a valid API key, and requiring auth here means you can't tell the difference between "API is down" and "auth is misconfigured."

## Personal Mode: Free-Tier Tools, Minimal Setup

You don't need a dedicated observability platform, custom dashboards, or on-call rotations for a personal project. A free-tier error tracker, a free-tier uptime monitor pinging `/health`, and structured JSON logs you can search when needed cover the realistic failure modes of a personal API. Set this up once, early — it's far easier to add before launch than to retrofit after you already have real callers depending on your API working.

## AI Prompt: Set Up Minimal Monitoring

```
My stack: [from Tech Stack Selection]
My deployment target: [wherever you're hosting, if decided]

1. Recommend a specific free-tier error tracking tool that integrates cleanly with my stack, and the minimal setup needed.
2. Write a /health endpoint that checks database connectivity and returns a clear status.
3. Suggest what structured log format (fields) would be most useful for debugging errors in this API specifically.
```

## Before You Continue

- [ ] I have structured (JSON) logging in place
- [ ] Unhandled errors are captured by an error tracking tool, not just written to a log file
- [ ] I have an unauthenticated `/health` endpoint an uptime monitor can check

When all three are checked, move to **Cost Estimation**.
