---
title: Usage Tracking
slug: usage-tracking
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# Usage Tracking

Usage tracking is the one piece of infrastructure that serves three separate needs you've already committed to: enforcing your rate limits (**Rate Limiting Strategy**), informing pricing decisions if you ever add them (**Billing Architecture**), and giving you real data instead of guesses when you reach **Analytics** in Phase 6. This module designs it once, correctly, so it can serve all three without rework.

## Two Levels of Tracking, Different Purposes

| Level | Captures | Used for |
|---|---|---|
| **Aggregated counters** | Request count per caller per time window | Real-time rate limit enforcement — needs to be fast |
| **Event log** | Individual request details (endpoint, timestamp, status code, caller) | Analytics, debugging, understanding usage patterns over time |

You likely need both, but for different reasons — don't try to serve rate limiting off a full event log (querying/counting rows on every request is slower than an incrementing counter) or try to do analytics off only aggregated counters (you'll have lost the detail).

## Aggregated Counters: Built for Speed

This is what your rate limiter actually reads on every request — it needs to be a fast increment-and-check, not a table scan:

```
rate_limit_counters
  owner_id (FK, indexed)
  window_start (timestamp, indexed)
  request_count (integer)
```

On each request: increment the counter for the current window; if it exceeds the limit from **Rate Limiting Strategy**, return `429`. Many backend frameworks and in-memory stores (Redis, if you're already using it — don't add it solely for this at personal scale) make this pattern efficient; a database-backed counter with a proper index is genuinely sufficient at personal-project traffic levels.

## Event Log: Built for Understanding, Not Speed

This can be written asynchronously — it doesn't need to block the response back to the caller:

```
usage_events
  id (PK)
  owner_id (FK, indexed)
  endpoint
  method
  status_code
  response_time_ms
  created_at (indexed)
```

> **Tip:** Log this *after* sending the response, not before — usage tracking should never be on the critical path that determines how fast a caller gets their answer. A slow logging write shouldn't slow down every single API response.

## What This Data Answers Later

This connects directly forward to modules you haven't reached yet — designing the schema well now means those modules are analysis, not new instrumentation:

- **Analytics** (Phase 6): which endpoints are actually used, by whom, how often
- **Load Testing** (Phase 4): real traffic patterns to base synthetic load tests on, rather than guesses
- **Pricing Evolution** (Phase 6): whether a paid tier makes sense, based on real usage distribution, not speculation

## Privacy: Track What You Need, Not Everything You Could

Log enough to answer real operational and product questions — don't log full request bodies or response payloads by default, especially if any of your resources ever contain anything sensitive. `endpoint`, `status_code`, and `response_time_ms` answer almost every question you'll actually ask later; full payload logging is a privacy liability with limited corresponding benefit at this stage.

> **Warning:** If you ever do need to log request/response bodies for debugging a specific issue, treat it as a temporary, deliberate action — not a permanent default — and make sure nothing in Authentication Architecture (like raw API keys) could ever end up in a log line.

## Personal Mode: Simple Counters + Async Event Log Is Enough

You don't need a dedicated analytics pipeline, a time-series database, or real-time dashboards for a personal MVP. A database table with sensible indexes, queried occasionally when you want to understand usage, is entirely sufficient. Add real infrastructure here only when query volume against this table becomes a genuine performance problem — unlikely at personal-project scale.

- [ ] Rate limit counters are fast, indexed, and checked synchronously on each request
- [ ] Event logging happens after the response is sent, not blocking it
- [ ] No sensitive data (raw keys, full request bodies) ends up in logs by default

## AI Prompt: Design the Tracking Schema

```
My rate limiting needs: "[paste from Rate Limiting Strategy]"
My endpoints: "[paste from Endpoint Planning]"

1. Design a rate_limit_counters schema optimized for a fast check-and-increment on every request.
2. Design a usage_events schema that would answer "which endpoints are most used" and "which callers are near their rate limit" later.
3. Confirm neither schema risks logging sensitive data like raw API keys or full request bodies by default.
```

## Before You Continue

- [ ] I have separate structures for fast rate-limit counting vs. detailed usage logging
- [ ] Event logging doesn't block the response path
- [ ] I'm not logging sensitive data by default

When all three are checked, move to **Monitoring Architecture**.
