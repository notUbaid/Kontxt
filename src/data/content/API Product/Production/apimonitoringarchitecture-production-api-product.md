---
title: Monitoring Architecture
slug: monitoring-architecture
phase: Phase 2
mode: production
projectType: api-product
estimatedTime: 25-30 min
---

# Monitoring Architecture

You will not be staring at your API when it breaks. A customer will hit it at 2am, get a failure, and either retry quietly or file a support ticket — and the only difference between those outcomes is whether your monitoring told you about the problem before they did.

## The Decision You're Actually Making

Not "what tools do we use to watch the system." It's: **what's the maximum amount of time a real problem can exist before a human knows about it — and is that number actually acceptable for a paid API product?**

Monitoring architecture is fundamentally about choosing that number deliberately, then building systems that hit it, instead of discovering it by accident during your first real incident.

## Three Layers of Observability, Not One

| Layer | Answers | Example tool category |
|---|---|---|
| **Metrics** | Is the system healthy, in aggregate, right now? | Prometheus, Datadog, CloudWatch |
| **Logs** | What exactly happened on this specific request? | Structured logging + a log aggregator (Datadog, Better Stack) |
| **Traces** | Where did time go across services for one request? | OpenTelemetry, Honeycomb |

> **️ Warning:** Logs alone are not monitoring. Searching logs after a customer reports a problem is debugging, not observability — by definition it only happens after someone already noticed the failure. Metrics and alerting are what catch problems before a customer does.

## What an API Product Specifically Must Monitor

| Signal | Why it matters more for an API than a typical app |
|---|---|
| Per-endpoint latency (p50, p95, p99) | Developers building on your API have their own latency budgets — you're a dependency in someone else's SLA |
| Error rate by status code class | A spike in 401s might mean an auth bug; a spike in 500s means your system is failing |
| Rate limit / quota rejection rate | A sudden spike often signals a bug in a customer's integration, not abuse — worth knowing before they file a ticket |
| Webhook delivery success rate | Silent webhook failures break downstream systems with zero visibility for you |
| Third-party dependency latency | If you call out to other APIs, their slowness becomes your latency, invisibly |

> ** Best Practice:** Track latency as percentiles (p95, p99), never as an average. An average can look perfectly healthy while 5% of your customers experience multi-second delays — averages hide exactly the tail behavior that erodes developer trust fastest.

## Decision: Build vs Buy Your Monitoring Stack

| Approach | Setup cost | Best for |
|---|---|---|
| Self-hosted (Prometheus + Grafana) | High — you maintain the infrastructure | Cost-sensitive at scale, full control needed |
| Managed platform (Datadog, New Relic, Better Stack) | Low — running in hours | Most production API products, especially pre-scale |
| Cloud-native (CloudWatch, GCP Monitoring) | Low if already on that cloud | Teams already committed to a single cloud provider |

> ** Tip:** Start managed. The engineering time saved by not running your own metrics infrastructure is almost always worth more than the subscription cost, especially before you know your actual traffic patterns. Migrate to self-hosted only once cost at scale becomes a real, measured problem — not a hypothetical one.

## Alerting: The Part Teams Get Wrong Most Often

Monitoring without alerting is a dashboard nobody's watching. But alerting badly designed creates the opposite problem — a team that ignores every alert because most of them don't matter.

- [ ] Every alert has a clearly defined "so what do I do" response, not just a threshold breach
- [ ] Alerts are tiered — page a human immediately only for things that need a human immediately
- [ ] Non-urgent anomalies go to a dashboard or async channel, not a 2am page
- [ ] Alert thresholds are based on customer-impacting symptoms (error rate, latency), not internal implementation details (CPU usage) as the primary trigger

> **️ Warning:** Alert fatigue is a security and reliability risk, not just an annoyance. A team that's been paged 40 times this month for non-issues will be slow to react on the 41st page — the one that's a real outage. Tune alert thresholds aggressively; an alert that doesn't require action shouldn't exist.

## What "Healthy" Means for an API Has to Be Explicit

Don't let "the server is up" stand in for "the API is working." Define what healthy actually means for your specific product:

```
Healthy = 
  p99 latency < 500ms 
  AND error rate < 0.1% 
  AND webhook delivery success > 99.5%
  AND no dependency degraded beyond its own SLA
```

> ** Best Practice:** Write this definition down explicitly before launch, and build your `/health` and `/status` endpoints to reflect it — not just "process is running." A health check that only confirms the server process exists misses the failures that actually matter to a developer calling your API.

## Use AI to Design Your Alert Thresholds

**Prompt — Alerting Threshold Review**
```
I'm designing monitoring for a production API with these characteristics:

[describe expected traffic volume, latency targets, and SLA commitments 
if any]

Propose alert thresholds for:
1. Error rate (warning vs page-worthy)
2. Latency degradation (p95/p99)
3. Rate limit/quota rejection spikes
4. Webhook delivery failures

For each, specify the threshold, the time window it should be 
sustained over before alerting (to avoid noise from brief blips), 
and whether it should page immediately or go to a dashboard.
```

> ** Token Efficiency:** Give AI your actual SLA commitments or latency targets if you have them — vague prompts produce vague generic thresholds. Specific inputs produce thresholds you can actually implement and defend, not placeholder numbers you'll have to redo.

## Validate Before Moving On

- [ ] You can name your p95 and p99 latency targets from memory, not just "it should be fast"
- [ ] Every critical alert has a documented response action, not just a notification
- [ ] Your health check endpoint reflects actual API health, not just process uptime
- [ ] You've tested what an alert actually looks like by deliberately triggering one in staging
- [ ] Dashboards exist for the five signals in the table above, not just generic server metrics

## Common Mistakes

- Monitoring server CPU/memory as the primary signal instead of customer-facing error rate and latency
- Using average latency instead of percentiles, hiding tail-end pain
- No tiering between "page a human now" and "show on a dashboard" — everything pages, so nothing gets attention
- Health check endpoint that returns 200 even when a critical dependency is down
- Building custom monitoring infrastructure before validating real traffic patterns justify the investment

## Quick Reference

| Must-have at launch | Add as you scale | Don't build custom early |
|---|---|---|
| p95/p99 latency tracking | Distributed tracing across services | Self-hosted metrics infrastructure |
| Error rate by status code | Anomaly detection (ML-based alerting) | Custom dashboard framework |
| Tiered alerting (page vs dashboard) | Per-customer usage anomaly alerts | In-house log aggregation system |
| Meaningful `/health` endpoint | SLA-backed status page | Custom APM tooling |

## What's Next

With observability defined, the next module covers Cost Estimation — translating your architecture decisions (database, metering, monitoring, infrastructure) into a realistic picture of what this API will actually cost to run at different traffic levels.
