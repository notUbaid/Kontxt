---
title: Launch Checklist
slug: launch-checklist
phase: Phase 5
mode: production
projectType: saas
estimatedTime: 25-35 min
---

# Launch Checklist

A launch checklist is not a to-do list you write the night before. It's a forcing function that catches the gap between "the code works on my machine" and "this survives contact with real users, real payment cards, and real attackers."

Most failed launches don't fail because of missing features. They fail because of missing **seams** — the boundaries between systems where nobody checked what happens when something goes wrong.

This module gives you a production-grade checklist organized by failure domain, not by vibes.

---

## The Core Idea: Verify Seams, Not Features

Beginners check: "Does signup work? Does checkout work?"

Staff engineers check: "What happens when Stripe's webhook arrives twice? What happens when the database connection pool is exhausted? What happens when a user signs up with an email that's already in a half-completed state from a failed transaction?"

Every seam between two systems is where production incidents live:

- Frontend ↔ Backend
- Backend ↔ Database
- Backend ↔ Payment provider
- Backend ↔ Email provider
- Your app ↔ Auth provider
- Your app ↔ Third-party APIs

> ** Tip**
> If you only have time to test one category before launch, test the seams involving money and auth. A broken "forgot password" page is annoying. A broken webhook that double-charges a customer is a support nightmare and a refund liability.

---

## Pre-Launch Checklist

This is organized by domain. Treat each section as a gate — don't skip ahead because earlier sections felt fine.

### 1. Authentication & Access

- [ ] Password reset flow tested end-to-end (including expired token handling)
- [ ] Session expiry behaves correctly (no infinite sessions unless explicitly designed)
- [ ] Logout actually invalidates the session server-side, not just client-side
- [ ] Email verification required before sensitive actions (if applicable)
- [ ] Rate limiting on login endpoint (prevents credential stuffing)
- [ ] OAuth redirect URIs locked to production domains only

### 2. Payments

- [ ] Webhook endpoint verifies signatures (never trust an unverified webhook)
- [ ] Webhook handler is idempotent — duplicate events don't double-process
- [ ] Failed payment flow tested (card declined, insufficient funds)
- [ ] Subscription cancellation actually stops future billing
- [ ] Refund path tested and documented for support team
- [ ] Test mode keys removed; live keys confirmed in production environment only

### 3. Data Integrity

- [ ] Database backups running automatically and **restore tested at least once**
- [ ] Migrations are reversible or have a documented rollback plan
- [ ] No destructive migration can run without a manual confirmation step
- [ ] Soft deletes used where data recovery matters (avoid hard deletes on user data)

### 4. Error Handling & Observability

- [ ] Error tracking (e.g., Sentry) capturing both frontend and backend errors
- [ ] Alerts configured for 5xx error rate spikes, not just downtime
- [ ] Logs contain request IDs for tracing a single request across services
- [ ] You have actually looked at a real error in your error tracker, not just confirmed it's "connected"

### 5. Performance Under Load

- [ ] Database queries on hot paths (login, dashboard, checkout) checked for missing indexes
- [ ] No N+1 queries on primary user-facing pages
- [ ] Static assets served via CDN, not directly from your app server
- [ ] Basic load test run against expected launch-day traffic (even a simple script beats nothing)

### 6. Security

- [ ] All secrets in environment variables, none committed to git history
- [ ] HTTPS enforced everywhere, no mixed content
- [ ] CORS configured to allow only your actual frontend origin(s)
- [ ] Rate limiting on public API endpoints
- [ ] Input validation on every endpoint that accepts user data, not just the obvious ones

### 7. Legal & Compliance

- [ ] Privacy Policy and Terms of Service published and linked in footer
- [ ] Cookie consent implemented if targeting EU users
- [ ] Data deletion request process exists (even if manual, for GDPR/CCPA)

### 8. Customer-Facing Readiness

- [ ] Support contact method visible and monitored
- [ ] 404 and 500 pages don't expose stack traces or internal paths
- [ ] Empty states designed (new user with zero data shouldn't see a broken-looking blank page)
- [ ] Transactional emails (welcome, reset, receipt) tested for actual delivery, not just "sent" status

---

> **️ Warning — The Most Common Beginner Mistake**
> Testing only the "happy path." Every flow above should be tested with at least one deliberate failure: wrong password, declined card, expired token, malformed input. If you've never seen your app fail gracefully, you don't know that it does.

---

## Decision Card: How Strict Should Your Checklist Be?

| Launch Context | Strictness Level | Reasoning |
|---|---|---|
| Public launch, paying customers day one | Full checklist, no exceptions | Real money and real reputation are at stake immediately |
| Private beta, invite-only | Core sections only (Auth, Payments, Data) | Smaller blast radius; you can fix issues with direct user contact |
| Soft launch to a waitlist | Full checklist minus heavy load testing | Traffic is controlled, but trust still matters |

---

## Using AI to Audit Your Launch Readiness

AI is excellent at systematically reviewing code against a checklist — it won't get bored on item 47 the way a human reviewer will. Use it as a second pass, not a replacement for actually testing flows yourself.

**Prompt: Pre-Launch Code Audit**

```prompt
Act as a staff engineer doing a pre-launch review.

I'm about to launch a production SaaS. Review the following code/config
for issues in these categories only: webhook idempotency, secret exposure,
missing input validation, and missing error handling on external API calls.

Do not comment on code style or naming. Only flag issues that could cause
a production incident or security vulnerability.

For each issue found, state:
1. The specific risk
2. The realistic scenario that triggers it
3. The minimal fix

[paste relevant file or files]
```

> ** Why this prompt works**
> It restricts scope explicitly. A vague "review my code" prompt produces 40 stylistic nitpicks and buries the one real bug. Naming the exact failure categories forces the model to think like a reviewer hunting for incidents, not a linter.

**Token efficiency note:** Run this prompt per-domain (auth, payments, data) in separate focused conversations rather than pasting your entire codebase at once. A focused 200-line webhook handler gets a sharper review than a 5,000-line dump where the model has to guess what matters.

---

## Validating AI's Audit Output

AI code reviews commonly miss or fabricate the following — check for these specifically:

- **False confidence on "this looks idempotent."** AI sometimes assumes a database unique constraint exists when it doesn't. Verify the actual constraint in your schema.
- **Missing webhook replay attacks.** AI catches signature verification often, but rarely flags whether an attacker could replay an old, validly-signed webhook. Check for timestamp validation too.
- **Overengineering suggestions.** AI may suggest adding a message queue or circuit breaker for a problem your current traffic doesn't have yet. Politely ignore complexity you don't need at launch.

---

## Quick Reference: Launch Day Sequence

1. Final backup taken and restore-verified
2. Feature flags confirmed off for anything unfinished
3. Monitoring dashboards open and watched for first 2 hours
4. Support channel staffed or actively monitored
5. Rollback plan written down, not just "in your head"

> ** Best Practice**
> Write your rollback steps down *before* launch, when you're calm, not during an incident, when you're not. "If X breaks, we run Y to revert" takes two minutes to write and can save twenty minutes of panic later.

---

## What's Next

Once your checklist is clear, move to **Analytics Setup** to make sure you can actually measure what happens after launch — traffic alone tells you nothing about whether users are succeeding.
