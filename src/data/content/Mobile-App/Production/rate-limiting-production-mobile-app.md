---
title: Rate Limiting
slug: rate-limiting
phase: Phase 4
mode: production
projectType: mobile-app
estimatedTime: 15–25 min
filename: rate-limiting-production-mobile-app.md
---

A mobile app multiplies the ways your backend gets hammered. Retries on flaky cellular connections, a bug that loops a request, a scraper hitting your public endpoints, or a single user's app stuck in a refresh loop — all of it lands on the same backend. Without limits, any one of these can take your API down for everyone else.

## Why Mobile Makes This Worse

- Mobile networks drop and reconnect constantly, and naive retry logic can turn one user action into dozens of requests
- Background app refresh and push-triggered fetches run without the user even looking at the screen
- A single compromised or reverse-engineered API key/token can be scripted to hit your endpoints far faster than any real user could
- Client bugs (infinite loops, missing debounce) ship to thousands of devices at once — unlike a web bug you can hotfix instantly, a bad client build can hammer your API for days until users update

> **Best Practice:** Rate limiting isn't about distrust of your users — it's about making sure one misbehaving client, retry storm, or bad actor can't degrade the experience for everyone else.

## Where to Rate Limit

| Layer | Protects Against | Example |
|---|---|---|
| Edge / CDN | Volumetric abuse, basic bots | Cloudflare, Vercel Edge Config |
| API Gateway / Middleware | Per-user, per-endpoint abuse | Express middleware, AWS API Gateway throttling |
| Application logic | Business-rule abuse | "Max 3 password reset emails per hour" |

Don't rely on a single layer. Edge limiting stops obvious floods cheaply before they reach your app; application-level limiting handles nuanced, business-specific rules edge rules can't express.

## Picking Limits That Make Sense

Generic "100 requests per minute for everyone" limits are usually wrong in both directions — too strict for legitimate power users, too loose for cheap-to-abuse endpoints.

| Endpoint Type | Suggested Approach |
|---|---|
| Login / auth | Strict, IP + account-based (e.g., 5 attempts / 15 min) |
| Password reset / OTP | Very strict, per-account (e.g., 3 / hour) — these are common abuse targets |
| Read-heavy (feed, search) | Generous, per-user token bucket |
| Write-heavy (posts, uploads) | Moderate, per-user with burst allowance |
| AI/LLM-backed endpoints | Strict — these cost real money per request |

> **Warning:** Auth and password-reset endpoints are the most commonly forgotten rate limits and the most commonly attacked. Brute-force and credential-stuffing attacks specifically target unthrottled login endpoints.

## Algorithm Choice

You don't need to build this from scratch — pick a library or managed service that implements one of these:

| Algorithm | Behavior | Good For |
|---|---|---|
| Fixed window | Resets every N seconds | Simple, but allows bursts at window edges |
| Sliding window | Smooths the edge-burst problem | Better accuracy, slightly more overhead |
| Token bucket | Allows bursts, refills steadily | Most APIs — feels natural to real usage patterns |

For most production mobile backends, a token bucket implemented with Redis (e.g., Upstash) is the standard choice — it's fast, supports atomic operations, and works cleanly across distributed server instances.

## Implementation Notes

- Rate limit by authenticated user ID where possible, not just IP — mobile carriers and corporate networks often share IPs across many real users (carrier-grade NAT), so IP-only limiting punishes innocent users sharing an address
- For unauthenticated endpoints (login, signup), combine IP-based and device/account-based signals
- Always return a clear `429 Too Many Requests` with a `Retry-After` header — don't fail silently or return a generic 500
- Log rate-limit hits separately from normal errors; a spike here is often your earliest signal of abuse or a client-side bug

## Handling Limits Gracefully on the Client

A rate limit that crashes the app or shows a raw error is worse than no rate limit at all.

- [ ] Client respects `Retry-After` and backs off rather than hammering retries
- [ ] User-facing message is calm and specific ("Too many attempts, try again in 2 minutes") not a generic error screen
- [ ] Background sync/retry logic uses exponential backoff with jitter, not fixed-interval retries
- [ ] Critical actions (like login) show remaining attempts when reasonable, rather than a hard wall with no explanation

> **Tip:** Exponential backoff without jitter means every client that got rate-limited at the same moment retries at the same moment again — creating synchronized retry storms. Add randomized jitter to spread retries out.

## Using AI to Implement This

```
Implement rate limiting for this [endpoint / API route].

Stack: [your backend framework + Redis/Upstash or equivalent]
Endpoint purpose: [what it does, why it might be abused]
Expected legitimate usage pattern: [e.g., "user checks this 5-10x per session"]

Requirements:
- Use a token bucket algorithm
- Rate limit by authenticated user ID, falling back to IP for unauthenticated requests
- Return 429 with a Retry-After header
- Make limits configurable, not hardcoded

Explain the tradeoffs of the specific limit values you choose.
```

> **Validation:** AI-suggested rate limit numbers are guesses unless you give it real usage data. Don't accept arbitrary defaults like "100/min" without reasoning about your actual expected traffic — too strict breaks real users, too loose doesn't protect anything.

## Common Mistakes

- Rate limiting only at one layer (usually none at all) and discovering the gap during an actual abuse incident
- IP-only limiting that blocks legitimate users on shared/carrier NAT
- No limits on password reset, OTP, or auth endpoints specifically
- Returning a generic error instead of `429` + `Retry-After`, leaving the client unable to respond intelligently
- Fixed-interval client retries with no jitter, causing synchronized retry storms
- Hardcoding limits instead of making them configurable per environment

## Before You Move On

- [ ] Auth, password reset, and OTP endpoints have strict, account-based limits
- [ ] Limiting is applied at both edge and application layers
- [ ] Limits are by user ID where authenticated, not IP alone
- [ ] Client handles `429` responses gracefully with backoff and clear messaging
- [ ] Rate-limit hits are logged and monitored as a signal, not just blocked silently

Next: **Feature Flags** — controlling what ships to which users without needing a new app store release.
