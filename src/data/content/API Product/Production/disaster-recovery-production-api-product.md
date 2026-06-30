---
title: Disaster Recovery
slug: disaster-recovery
phase: Phase 4
mode: production
projectType: api-product
estimatedTime: 25-30 min
---

# Disaster Recovery

Backup Strategy answers "do we have a copy of the data." Disaster Recovery answers a harder question: when something actually fails — a region outage, a corrupted database, a bad deploy that's already propagated — how long until your API is back, and how much data is gone forever in between?

## The Decision You're Actually Making

Not "what's our backup plan." It's: **what are we willing to lose, and how long are we willing to be down, measured in actual numbers — not "as little as possible"?**

Every disaster recovery architecture decision flows from two numbers you have to set deliberately, before any disaster, because deciding them during one is too late.

## The Two Numbers That Define Everything Else

| Term | Question it answers | Example |
|---|---|---|
| **RTO** (Recovery Time Objective) | How long can we be down? | "API must be back within 1 hour" |
| **RPO** (Recovery Point Objective) | How much recent data can we afford to lose? | "We can lose up to 15 minutes of writes" |

> **⚠️ Warning:** Teams that skip setting explicit RTO/RPO numbers don't avoid the decision — they just make it accidentally, during the incident, under pressure, usually arriving at a worse answer than they would have chosen calmly in advance. Set these numbers now, even if the answer is an imperfect estimate.

## Decision: What RTO/RPO Does Your API Actually Need?

| Your situation | Reasonable RTO | Reasonable RPO | Why |
|---|---|---|---|
| Early-stage API, few customers, no SLA | Hours | Up to 1 hour | Cost of stronger guarantees isn't justified yet |
| Paid API with customer integrations depending on it | Under 1 hour | Minutes | Customer's own product breaks when yours is down |
| API handling financial/health/critical data | Minutes | Near-zero | Data loss has legal/compliance consequences, not just inconvenience |

> **✅ Best Practice:** Don't default to "as close to zero as possible" for both numbers without checking the cost. Near-zero RPO typically requires synchronous multi-region replication, which adds real latency and infrastructure cost to every write. Match your RTO/RPO to what your actual customers and contracts require — not to an abstract ideal of "perfect."

## The Failure Modes Disaster Recovery Actually Covers

| Failure | Backup Strategy alone solves it? | Needs DR planning |
|---|---|---|
| Accidental data deletion | Yes — restore from backup | No |
| Database corruption | Partially — restore loses recent data | Yes — need point-in-time recovery |
| Entire cloud region outage | No — backups in the same region are also down | Yes — need cross-region failover |
| Bad deploy that corrupts data before anyone notices | No — by the time you notice, recent backups may also be corrupted | Yes — need detection + rollback plan |

> **⚠️ Warning:** A backup stored in the same region as your primary database doesn't protect you from a regional outage — it fails at exactly the moment you need it. If your RTO/RPO targets require regional resilience, your backups must live in a genuinely separate region, verified, not assumed.

## Designing for the Failure You're Least Prepared For

Most teams have *some* answer for "database server crashes" (restore from backup, restart). Far fewer have a real answer for the harder cases:

- [ ] What's the plan if your primary cloud region has an outage — not your server, the entire region?
- [ ] What's the plan if a bad migration or deploy corrupts data, and you don't notice for two hours?
- [ ] What's the plan if your DNS provider, not your infrastructure, is the thing that's down?
- [ ] Who is authorized to declare a disaster and trigger failover, and are they reachable at 3am?

> **💡 Tip:** The "bad deploy corrupts data silently" scenario is the one most teams are least prepared for, because it doesn't look like an outage at first — the API stays up and returns 200s while writing wrong data. Point-in-time recovery (not just periodic snapshots) is what saves you here, letting you restore to the exact moment before the bad deploy, not just the last nightly backup.

## Failover Architecture Options

| Approach | RTO achievable | Cost | Complexity |
|---|---|---|---|
| Manual restore from backup, single region | Hours | Low | Low |
| Warm standby in a second region, manual cutover | Tens of minutes | Medium | Medium |
| Active-active multi-region with automated failover | Minutes or less | High | High |

> **✅ Best Practice:** Most API products at early-to-mid scale should choose warm standby with manual (but rehearsed) cutover, not full active-active. Active-active multi-region is expensive and operationally complex — appropriate once you have the scale and customer commitments (and revenue) to justify it, not as a default starting point.

## A Disaster Recovery Plan You've Never Tested Isn't a Plan

This is the single biggest gap between teams that recover quickly and teams that don't: rehearsal.

- [ ] Schedule a deliberate failover drill, in a non-production environment, on a calendar — not "when we get to it"
- [ ] Time the actual recovery against your stated RTO — did it match, or was the estimate wrong?
- [ ] Document exactly what broke during the drill that the written plan didn't account for
- [ ] Repeat regularly — a plan that worked a year ago may not reflect your current architecture

> **⚠️ Warning:** An untested DR plan tends to fail in ways nobody anticipated — a runbook step that assumes access someone doesn't have, a script that breaks on a schema that's since changed, a contact who's left the company. The only way to find these gaps before a real disaster is to deliberately simulate one.

## Use AI to Pressure-Test Your DR Plan

**Prompt — Disaster Recovery Plan Review**
```
Here is our disaster recovery plan:

[paste your RTO/RPO targets, failover architecture, and runbook steps]

Act as an engineer running a tabletop exercise. Walk through these 
failure scenarios and identify gaps in the plan:
1. Primary database region has a multi-hour outage
2. A deploy 3 hours ago silently corrupted writes, just discovered
3. The person who normally executes failover is unreachable

For each scenario, flag any step in the plan that's vague, untested, 
or depends on an assumption that might not hold during a real incident.
```

> **💡 Token Efficiency:** Run this as a single focused review after your DR plan is drafted, rather than iterating scenario-by-scenario across multiple separate conversations — the tabletop format benefits from AI holding all three scenarios in context at once to spot plan-wide gaps, not just per-scenario ones.

## Validate Before Moving On

- [ ] RTO and RPO are written down as specific numbers, not aspirational language
- [ ] Backups (or replicas) genuinely exist outside the primary region, verified by an actual test restore
- [ ] Point-in-time recovery is available, not just periodic full snapshots
- [ ] A failover drill has actually been run, with the real recovery time measured against the stated RTO
- [ ] More than one person knows how to execute the failover plan

## Common Mistakes

- RTO/RPO never explicitly defined, leaving recovery expectations to be improvised during an incident
- Backups stored in the same region as primary infrastructure, defeating their purpose in a regional outage
- Only snapshot-based recovery, with no point-in-time recovery for silent data corruption scenarios
- A DR plan that exists only as a document, never actually rehearsed
- Single point of human failure — only one person knows how to execute failover

## Quick Reference

| Must-decide now | Can evolve later | Don't over-build early |
|---|---|---|
| Explicit RTO/RPO numbers | Tighter RTO/RPO as customer base grows | Full active-active multi-region |
| Cross-region backup/replica storage | Automated failover tooling | Custom DR orchestration platform |
| Point-in-time recovery capability | More frequent drill cadence | Multi-cloud redundancy |
| At least one rehearsed failover drill | Formal DR certification/compliance docs | 24/7 dedicated DR team |

## What's Next

With recovery from catastrophic failure planned, the next module covers Scalability Planning — preparing the system not for failure, but for growth, so success doesn't become the thing that takes your API down.
