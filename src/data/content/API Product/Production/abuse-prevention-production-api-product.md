---
title: Abuse Prevention
slug: abuse-prevention
phase: Phase 4
mode: production
projectType: api-product
estimatedTime: 25-30 min
---

# Abuse Prevention

Rate limiting stops a single client from overwhelming you. Abuse prevention stops a determined actor from working around rate limiting entirely — credential stuffing across thousands of fake accounts, scraping your entire dataset through legitimate-looking individual requests, or using your API as free infrastructure for something you never intended to enable.

## The Decision You're Actually Making

Not "how do we block bad actors." It's: **what does abuse actually look like for our specific API, and how much friction are we willing to add to legitimate users to stop it?**

This is a real tradeoff, not a free win. Every abuse-prevention measure has a false-positive cost — a legitimate developer who gets blocked, throttled, or annoyed. The goal isn't zero abuse; it's the right point on that tradeoff curve for your specific product and threat model.

## Abuse Looks Different Depending on What Your API Does

| Your API does this | Abuse typically looks like |
|---|---|
| Returns proprietary/licensed data | Bulk scraping via many accounts to rebuild your dataset elsewhere |
| Sends communications (email, SMS) | Spam, phishing campaigns routed through your sending infrastructure |
| Processes payments | Card testing — using your API to validate stolen card numbers |
| Calls an expensive third-party (AI inference) | Cost exhaustion — running up your bill via free-tier accounts |
| Creates content/accounts on behalf of users | Bot account creation, fake engagement |

> **⚠️ Warning:** Don't design generic "abuse prevention" — design for *your* specific abuse vector. A payment API and a content-generation API face completely different threats, and generic rate limiting alone stops neither effectively.

## Rate Limiting Is Necessary, Not Sufficient

A sophisticated actor doesn't violate your rate limit — they create 500 free-tier accounts and stay under it on each one. This is why abuse prevention needs signals beyond "requests per minute from this key."

| Signal | What it catches |
|---|---| 
| Sign-up velocity from one IP/device fingerprint | Mass fake account creation |
| Free-tier accounts with near-identical usage patterns | Coordinated abuse across multiple keys |
| Disposable email domains at signup | Low-effort bot account creation |
| Usage pattern mismatched to stated use case | An account claiming "personal project" generating production-scale traffic |
| Geographic/network anomalies (datacenter IPs on a consumer-facing API) | Automated, non-human traffic |

> **✅ Best Practice:** Layer signals instead of relying on any single one. A datacenter IP alone isn't proof of abuse — plenty of legitimate developers test from cloud servers. Combine multiple weak signals into a confidence score rather than hard-blocking on one signal alone.

## Decision: Where to Add Friction

| Friction point | Cost to legitimate users | Effectiveness against abuse |
|---|---|---|
| Email verification at signup | Low — one extra click | Stops the laziest bot signups |
| Phone verification at signup | Medium — some users won't have/want to provide this | Strong against mass fake accounts |
| Manual approval for free tier | High — kills self-serve, hurts adoption | Very strong, but expensive in lost legitimate growth |
| CAPTCHA on signup only | Low if done once | Moderate — modern bots increasingly solve these |
| Require payment method even for free tier | Medium-high — filters out low-intent users entirely | Strong — most abuse doesn't want to attach a real card |

> **💡 Tip:** Requiring a payment method (charged $0, or a small refundable hold) for free-tier access is one of the highest-leverage anti-abuse measures available, because it raises the cost of mass account creation significantly while adding minimal friction for genuine developers who intend to actually use your product.

## Designing the Response to Detected Abuse

How you respond matters as much as how you detect. A binary "ban immediately" approach generates support tickets from false positives and tips off real attackers to adjust tactics.

- [ ] Define a graduated response: flag → throttle → require re-verification → suspend → ban
- [ ] Build an appeals path — a legitimate developer wrongly flagged needs a way back in
- [ ] Log every abuse-prevention action with the reasoning, for later review and tuning
- [ ] Avoid telling a blocked actor exactly which signal triggered the block — this teaches them what to change

> **⚠️ Warning:** Immediate hard bans on first detection create two problems: legitimate users with no recourse, and confirmed abusers who simply learn your detection logic and route around it next time. A graduated response is harder to build but performs better against both failure modes.

## Don't Let Abuse Prevention Become a New Attack Surface

Abuse-detection systems that use user-controllable signals can themselves be exploited.

> **⚠️ Warning:** An attacker who learns your system flags datacenter IPs will simply route through residential proxies. An attacker who learns your system flags rapid signups will space them out. Treat your abuse-detection logic itself as sensitive — don't document specific thresholds anywhere a customer or attacker could read them, including in public API docs or error messages.

## Use AI to Threat-Model Your Specific API

**Prompt — Abuse Vector Analysis**
```
My API does the following: [describe core functionality, e.g. "sends 
SMS messages on behalf of authenticated users"].

Identify the 3 most likely abuse vectors specific to this functionality 
— not generic API abuse, but abuse that exploits exactly what this API 
does. For each vector, suggest:
1. What signal would detect it early
2. What graduated response would stop it without over-blocking 
   legitimate users
3. Any abuse pattern specific to this category that's easy to miss
```

> **💡 Token Efficiency:** Be specific about what your API actually does — "an API" gets generic rate-limiting advice you already know; "an API that sends SMS on behalf of users" gets you the actual relevant threat (spam/phishing routing) worth designing against.

## Validate Before Moving On

- [ ] You've identified the 2-3 abuse vectors specific to your API's actual function, not generic threats
- [ ] Detection uses layered signals, not a single hard-coded trigger
- [ ] Response is graduated, with a defined appeals path for false positives
- [ ] Free-tier signup has at least one meaningful friction point against mass account creation
- [ ] Abuse-detection thresholds are not exposed in public docs or error messages

## Common Mistakes

- Treating rate limiting alone as complete abuse prevention
- Hard-banning on first detection with no appeals path, generating support load from false positives
- Generic abuse rules that don't account for what this specific API enables
- Free tier with zero friction, making mass fake-account abuse essentially free for an attacker
- Exposing exact detection thresholds publicly, teaching attackers exactly how to stay under them

## Quick Reference

| Must-have at launch | Add as abuse patterns emerge | Don't over-engineer early |
|---|---|---|
| Email verification at signup | Device/network fingerprinting | Custom ML fraud-detection model |
| Layered signal-based detection | Payment method requirement for free tier | Manual review queue for every signup |
| Graduated response (flag→throttle→ban) | Geographic anomaly detection | Real-time behavioral biometrics |
| Appeals path for false positives | Coordinated multi-account detection | Third-party fraud-scoring integration |

## What's Next

With abuse-specific threats addressed, the next module covers DDoS Protection — defending against volumetric attacks aimed at taking your API offline entirely, a different threat model than the account-level abuse covered here.
