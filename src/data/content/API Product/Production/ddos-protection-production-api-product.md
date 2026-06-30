---
title: DDoS Protection
slug: ddos-protection
phase: Phase 4
mode: production
projectType: api-product
estimatedTime: 20-25 min
---

# DDoS Protection

Abuse Prevention defends against actors working *within* your system — fake accounts, scraping, card testing. DDoS is a different threat entirely: an attempt to make your API unavailable to everyone, often without ever passing authentication. The defense has to start before your application code ever runs.

## The Decision You're Actually Making

Not "how do we stop attacks." It's: **how much of this defense do we build ourselves versus push to infrastructure that already does this at a scale we can't match?**

This is one of the few areas in API engineering where building it yourself is almost never the right call. The decision here is choosing and correctly configuring the right layer, not designing custom defense logic.

## Why This Is an Infrastructure Decision, Not an Application One

| Attack type | Where it must be stopped |
|---|---|
| Volumetric (overwhelming bandwidth) | Network edge — your application servers never even see this traffic if defended correctly |
| Protocol-level (exploiting TCP/TLS handshakes) | Network/transport layer, before requests reach your app |
| Application-layer (high volume of legitimate-looking requests) | Can require app-layer logic, but still benefits enormously from edge filtering first |

> **⚠️ Warning:** If a volumetric attack is reaching your application servers at all, your DDoS protection is already failing — by the time your app code is processing the flood, the damage to availability is done. The defense has to happen at the network edge, before traffic reaches infrastructure you control directly.

## Decision: Which Layer Handles What

| Layer | Tooling | Handles |
|---|---|---|
| CDN / Edge (Cloudflare, AWS CloudFront + Shield, Fastly) | Always-on, managed | Volumetric and most protocol-level attacks, automatically |
| API Gateway | Kong, AWS API Gateway, your reverse proxy | Application-layer rate limiting, request validation |
| Application | Your code | Business-logic abuse (covered in Abuse Prevention) — last line, not first |

> **✅ Best Practice:** Put a CDN/edge provider with built-in DDoS protection in front of every production API, with no exceptions, regardless of current traffic scale. This isn't a "we'll add it when we're bigger" decision — Cloudflare and AWS Shield's free/standard tiers already provide meaningful volumetric protection from day one, at effectively zero marginal engineering cost.

## What "Production-Ready" DDoS Protection Actually Requires

- [ ] All traffic routes through a CDN/edge layer — no direct path to your origin servers exists
- [ ] Origin servers are not publicly known or reachable (IP allowlisting from edge provider only)
- [ ] TLS termination happens at the edge, not your application servers
- [ ] Auto-scaling or absorption capacity exists for legitimate traffic spikes that look attack-like (e.g. a viral launch)
- [ ] An incident response plan exists for what happens if an attack does get through

> **⚠️ Warning:** A surprisingly common gap: teams configure Cloudflare correctly, but their origin server's IP is still directly reachable because it was never firewalled to only accept traffic from the CDN. An attacker who finds the origin IP bypasses your entire edge protection layer completely. Lock origin access down to the edge provider's IP ranges only.

## Application-Layer Attacks Need Different Thinking

The hardest DDoS variant to stop is application-layer — traffic that looks like real API requests, often from real (compromised) devices, at a volume designed to exhaust your backend resources rather than your bandwidth.

| Defense | Why it helps |
|---|---|
| Aggressive rate limiting at the gateway, per-IP and per-key | Limits how much damage any single source can do |
| Request validation before expensive operations | Reject malformed/oversized requests before they consume backend resources |
| Caching aggressively at the edge | Reduces what fraction of an attack flood actually reaches your origin |
| Circuit breakers on downstream dependencies | Prevents a flood from cascading into your database or third-party API limits |

> **💡 Tip:** Application-layer DDoS defense overlaps heavily with good rate limiting and abuse prevention generally — there usually isn't a separate system to build. The distinction matters for monitoring and response, not necessarily for the underlying mechanism.

## Defining Your Incident Response Before You Need It

Deciding your response plan during an active attack is too slow. Decide it now.

- [ ] Who gets paged when traffic anomaly alerts fire (see Monitoring Architecture)?
- [ ] What's the escalation path to your CDN/edge provider's support for an active large-scale attack?
- [ ] Is there a "lockdown mode" — temporarily requiring stricter auth or blocking entire regions — and who's authorized to enable it?
- [ ] How do you communicate an active incident to customers (status page, see Phase 5)?

> **✅ Best Practice:** Write this as a short runbook, not a mental plan. During an actual attack, with alerts firing and a team under pressure, a written checklist with exact steps and contact paths performs far better than relying on someone remembering the plan correctly under stress.

## Use AI to Audit Your Edge Configuration

**Prompt — DDoS Defense Configuration Review**
```
Review this infrastructure setup for DDoS protection gaps:

[describe your CDN/edge provider, origin server access rules, and 
current rate limiting configuration]

Focus only on:
1. Whether origin servers are actually unreachable except through 
   the edge layer
2. Gaps between edge-layer rate limiting and application-layer limits
3. Single points of failure that an attacker could specifically target
4. Whether TLS termination and caching are configured to minimize 
   what reaches origin servers

Do not suggest abuse-prevention or fraud-detection logic — 
infrastructure-layer DDoS resilience only.
```

> **💡 Token Efficiency:** This review needs your infrastructure configuration, not your application code — keep the prompt scoped to network/edge setup so the response stays focused on what's actually relevant to this specific threat model.

## Validate Before Moving On

- [ ] Origin server IPs are firewalled to accept traffic only from your CDN/edge provider
- [ ] You've confirmed (not assumed) that direct requests to the origin IP are rejected
- [ ] A written incident response runbook exists and has been read by everyone on the on-call rotation
- [ ] Rate limiting exists at both the edge and application layers, with different, complementary thresholds
- [ ] You know your CDN/edge provider's support escalation path before you ever need it

## Common Mistakes

- No edge/CDN layer at all, leaving origin servers as the first and only line of defense
- Edge provider configured, but origin IP still directly reachable, completely bypassing the protection
- Treating DDoS protection as "we'll add it once we're bigger" instead of day-one infrastructure
- No incident response plan, leading to confused, slow reaction during an actual attack
- Conflating DDoS defense with abuse prevention, missing that one is a network problem and the other an application problem

## Quick Reference

| Must-have at launch | Add as you scale | Don't build from scratch |
|---|---|---|
| CDN/edge provider in front of all traffic | Dedicated DDoS mitigation tier (e.g. AWS Shield Advanced) | Custom traffic-scrubbing infrastructure |
| Origin IP locked to edge provider only | Multi-region failover | In-house anomaly detection ML |
| Edge + app layer rate limiting | Automated lockdown mode triggers | Custom TLS termination infrastructure |
| Written incident response runbook | Regular incident response drills | Bespoke CDN replacement |

## What's Next

With both abuse and large-scale attack vectors covered, the next module shifts to Load Testing — proactively finding out how your system behaves under heavy legitimate traffic, before a launch, a viral moment, or an attack forces you to find out in production.
