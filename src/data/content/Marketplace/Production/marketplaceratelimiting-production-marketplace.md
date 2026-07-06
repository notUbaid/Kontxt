---
title: Rate Limiting
slug: rate-limiting
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Rate Limiting & Abuse Prevention

## Defending the Infrastructure

In a personal project, an in-memory rate limiter (like `express-rate-limit`) is sufficient. In a production marketplace running on Serverless infrastructure (Next.js Edge, Vercel, AWS Lambda), in-memory rate limiting is entirely useless. 
Every incoming request spins up a new ephemeral function with its own memory. A bot sending 1,000 requests per second will bypass in-memory limits completely, exhausting your database connections and spiking your cloud bill.

Production marketplaces require **Distributed Rate Limiting** and **Edge Protection**.

---

## Distributed Rate Limiting (Redis)

To limit a user to 5 checkout attempts per minute across a fleet of 50 serverless instances, the counter must live in a centralized, low-latency datastore.

**The Production Standard:**
You must use a **Redis-backed Rate Limiter** (e.g., Upstash Redis).
When a request hits your API middleware:
1. It queries Redis: `INCR rate_limit:checkout:user_123`.
2. If the value exceeds the limit (e.g., `> 5`), the API immediately returns `429 Too Many Requests`.
3. Because Redis operates in single-digit milliseconds, this does not noticeably slow down legitimate traffic.

---

## WAF-Level Rate Limiting (Cloudflare / Edge)

Your Node.js API should not be responsible for blocking volumetric DDoS attacks. If a botnet hits your `/search` endpoint 50,000 times a second, even checking Redis will cost you money and compute.

**The Production Defense:**
Configure Rate Limiting at the **Web Application Firewall (WAF)** level (Cloudflare, AWS WAF).
* Block IPs that make > 100 requests per 10 seconds to any endpoint.
* Challenge suspicious IPs (via Cloudflare Turnstile / CAPTCHA) before they reach your domain.
* Block Tor exit nodes and high-risk VPNs from accessing the `POST /checkout` route.

---

## Targeted Abuse Scenarios

Rate limiting is not a single global number. You must configure strict, targeted limits based on the economic incentive to abuse specific routes.

| Endpoint | Abuse Incentive | Production Limit |
|---|---|---|
| `/auth/login` | Credential Stuffing | 5 attempts / 15 min per IP |
| `/api/checkout` | Credit Card Testing / Inventory Hoarding | 3 attempts / min per User ID |
| `/api/messages` | Spam / Phishing links to buyers | 15 messages / min per User ID |
| `/api/listings` (GET) | Competitor Scraping | 100 requests / min per IP |

---

## Circuit Breakers

Rate limiting protects *you* from bad actors. Circuit Breakers protect *you* from failing dependencies (like Stripe or SendGrid).

If Stripe's API goes down and takes 10 seconds to timeout, and 500 users click "Buy", your serverless functions will hang for 10 seconds, locking up your entire infrastructure.

**The Production Standard:**
Implement a **Circuit Breaker** pattern (e.g., using `opossum`). If Stripe requests fail or timeout 5 times in a row, the circuit "opens." Subsequent checkout attempts instantly return a `503 Service Unavailable` with a friendly UI message ("Checkout is temporarily degraded, please try again in 5 minutes") without waiting 10 seconds to timeout.

---

## Do's and Don'ts of Production Rate Limiting

- **DO return specific 429 headers.** Always include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After` headers. Your frontend should intercept `429` responses and show a polite UI message, not a blank crash.
- **DON'T rate limit Webhooks.** If Stripe sends a webhook confirming a payment, do not block it with a strict IP rate limit. Webhooks must bypass standard limits and use strict Cryptographic Signature verification instead.
- **DO use Device Fingerprinting.** Sophisticated attackers will rotate IPs using botnets. Use a service like **FingerprintJS** to rate limit based on the unique device hash, catching attackers even when their IP changes.
- **DON'T block Googlebot.** Ensure your WAF rate limits explicitly allowlist known Good Bots (Google, Bing, Twitter preview crawlers) so you don't destroy your SEO while trying to block scrapers.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Upstash Redis Rate Limiting:**

````prompt
Act as a Senior Backend Engineer. Write a Next.js App Router Middleware function that implements Distributed Rate Limiting using `@upstash/ratelimit`. It should enforce a sliding window limit of 10 requests per 10 seconds for the `/api/search` route, keying off the user's IP address. If the limit is exceeded, return a `429` response with the `Retry-After` header correctly formatted.
````

> [!TIP]
> **Prompt 2 — Circuit Breaker Pattern:**

````prompt
Write a Node.js service function that wraps a call to the Stripe API (`stripe.paymentIntents.create`) inside a Circuit Breaker using the `opossum` library. Configure the breaker to open if the failure rate exceeds 50% over 10 requests, with a 30-second reset timeout. Ensure it throws a specific `DependencyOfflineError` when the circuit is open so the API controller can return a graceful 503 response.
````

---

## Validating What AI Generates

- **Check for In-Memory Limits:** If the AI generates code using `express-rate-limit` or a local `Map()` variable for a Serverless environment, reject it. Remind the AI that serverless functions are ephemeral and require Redis.
- **Verify Fallback Logic:** Ensure that if the Redis connection itself fails or times out, the rate limiter "fails open" (allows the request) rather than blocking all traffic to your marketplace.

---

## Implementation Checklist

- [ ] Replaced in-memory rate limiters with a distributed Redis-backed limiter (Upstash) for serverless compatibility.
- [ ] Configured WAF-level rate limits (Cloudflare) to block aggressive scraping and DDoS attacks at the edge.
- [ ] Applied strict, targeted limits to high-risk routes (Login, Checkout, Messaging) based on distinct abuse profiles.
- [ ] Implemented Circuit Breakers around critical third-party dependencies (Stripe, SendGrid, Algolia).
- [ ] Ensure Webhooks (Stripe, Chat providers) are allowlisted and bypass standard rate limiting.

---

## What's Next

Next: **Caching** — We have protected the API from abuse, but legitimate traffic can still overwhelm the database. We will architect Edge Caching, Stale-While-Revalidate strategies, and Redis data caching to handle massive traffic spikes gracefully.
