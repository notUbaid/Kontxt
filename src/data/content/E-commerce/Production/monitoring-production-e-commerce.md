---
title: Monitoring
slug: monitoring
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Monitoring

Right now, the only way you'd know your store broke is a customer emailing you — or worse, silence, because they just left. This module is about closing that gap with the minimum setup that actually tells you when something's wrong, fast.

---

## The One Question Monitoring Answers

"Is my store working right now, and if not, what broke?"

That's it. For a personal store, monitoring isn't about deep observability into every system — it's about not being the last to know when checkout breaks.

> **Reframe:** You're not building a NOC (network operations center). You're building a smoke detector. It needs to go off reliably when there's actually a fire, and otherwise stay out of your way.

---

## What Actually Needs Monitoring

<table>
<tr><th>What</th><th>Why it matters</th><th>Priority</th></tr>
<tr><td>Checkout/payment errors</td><td>Directly costs you money, every minute it's broken</td><td><strong>Critical</strong></td></tr>
<tr><td>Webhook failures</td><td>Silent failures here mean orders never get created despite successful payment</td><td><strong>Critical</strong></td></tr>
<tr><td>Site uptime</td><td>If the site is down, nothing else matters</td><td><strong>Critical</strong></td></tr>
<tr><td>Email delivery failures</td><td>Customers not getting confirmations erodes trust</td><td>Important</td></tr>
<tr><td>Slow page loads</td><td>Affects conversion but isn't an emergency</td><td>Nice to have</td></tr>
<tr><td>General application errors</td><td>Catches bugs you didn't anticipate</td><td>Important</td></tr>
</table>

---

## Decision: What Tooling Do You Actually Need?

<table>
<tr><th>Tool</th><th>What it covers</th><th>Cost</th></tr>
<tr><td><strong>Sentry</strong></td><td>Application error tracking — catches and reports JavaScript/backend exceptions with full context</td><td>Generous free tier</td></tr>
<tr><td><strong>Vercel built-in monitoring</strong></td><td>Deployment status, function errors, basic uptime (if hosted on Vercel)</td><td>Included</td></tr>
<tr><td><strong>Better Uptime / UptimeRobot</strong></td><td>External uptime checks — pings your site and alerts if it's down</td><td>Free tier covers personal use</td></tr>
<tr><td><strong>Stripe Dashboard</strong></td><td>Payment failures, webhook delivery status — already available, just needs checking</td><td>Free, already have it</td></tr>
</table>

**Recommendation for Personal Mode:** **Sentry** for application errors + **Stripe's built-in webhook monitoring** (you already have this, just need to know where to look) + a free **uptime checker**. This combination covers all three critical priorities above without adding meaningful cost or complexity.

> **Why not a full observability platform (Datadog, New Relic):** These are built for teams monitoring distributed systems with many services, dashboards, and on-call rotations. A personal store is one application with a handful of critical paths — Sentry plus Stripe's existing dashboard gives you real signal without the setup and cost overhead of enterprise observability tooling.

---

## Setting Up Sentry

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

The wizard configures error tracking automatically for both client and server code. The key thing to verify afterward:

```javascript
// sentry.server.config.js — confirm this captures backend errors, 
// especially in your API routes and webhook handler
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1, // sample 10% of transactions — full sampling is overkill at your scale
  environment: process.env.NODE_ENV,
});
```

> **Tip:** Make sure your Stripe webhook handler specifically has error tracking — this is your single most important endpoint to monitor, since a silent failure there means a customer paid but no order was created, and you'd have no way to know without checking manually.

---

## Catching Webhook Failures Specifically

This deserves dedicated attention beyond generic error tracking, because of how consequential a silent failure here is.

```javascript
export async function POST(req: Request) {
  try {
    const event = stripe.webhooks.constructEvent(/* ... */);
    
    if (event.type === 'checkout.session.completed') {
      await processCheckoutCompleted(event.data.object);
    }
    
    return Response.json({ received: true });
  } catch (error) {
    // Capture with full context — this is critical enough to want 
    // immediate visibility, not just a logged error you check later
    Sentry.captureException(error, {
      tags: { critical: 'webhook_failure' },
      extra: { eventType: event?.type },
    });
    
    // Still return 200 if you've already processed critical parts but a 
    // non-critical side effect failed — returning an error to Stripe 
    // causes it to retry, which is correct behavior ONLY if the core 
    // order creation actually failed
    return Response.json({ error: 'Processing failed' }, { status: 500 });
  }
}
```

> **Critical concept — webhook response codes control Stripe's retry behavior.** If your webhook handler returns a 500 error, Stripe will retry the webhook automatically (this is actually useful — it's part of why you built idempotency into order creation in the Checkout module). But if it returns 200 when something actually failed, Stripe assumes success and won't retry — and you've now lost the order permanently unless you catch it through monitoring. Get this status code logic right; it directly determines whether a transient failure self-heals or becomes a permanent lost order.

---

## Stripe's Own Webhook Monitoring — Use What You Already Have

Stripe's dashboard shows webhook delivery success/failure without any additional setup.

**Check this regularly (or set up Stripe's email alerts for failed webhooks):**
- Dashboard → Developers → Webhooks → your endpoint → delivery attempts

> **Tip:** Stripe retries failed webhooks automatically for a period of time, but if your endpoint is down or broken for an extended stretch, those retries eventually stop. Check this dashboard during your first week post-launch especially — it's the most direct evidence of whether your payment-to-order pipeline is actually working in production, not just in your local testing.

---

## Uptime Monitoring

A simple external check that pings your site and alerts you if it goes down — catches infrastructure-level failures that application error tracking wouldn't (e.g., your hosting provider has an outage, your domain's DNS breaks).

```
Setup (UptimeRobot or Better Uptime, free tier):
1. Add a monitor pointing to your store's homepage URL
2. Set check interval (5 minutes is fine for a personal store)
3. Add your email (and optionally SMS) as alert contacts
4. Optionally: add a second monitor for your /api/checkout endpoint specifically
```

> **Why this matters even with Sentry already in place:** Sentry catches errors *within* your running application. If your entire site is down (deployment failure, DNS issue, hosting outage), there's no running application to throw an error — Sentry would see nothing. An external uptime check is the only thing that catches "the site isn't responding at all," which is a real and not-uncommon failure mode.

---

## Alert Fatigue: Configure This Carefully

A monitoring setup that pages you for every minor warning will train you to ignore it — which defeats the purpose.

| Alert | Channel | Why |
|---|---|---|
| Site down | Email + SMS (if available) | Needs immediate attention |
| Webhook processing failure | Email | Needs same-day attention |
| General application error | Sentry dashboard (check periodically) | Not urgent unless frequency spikes |
| Minor warnings/low-severity issues | Dashboard only, no notification | Would create noise |

> **Best Practice:** Set Sentry's alert rules to only notify you for new, unhandled errors or significant frequency spikes — not every single occurrence of every error. Review the dashboard periodically for the rest. The goal is that when you *do* get notified, you trust it's worth dropping what you're doing to check.

---

## AI Prompt: Set Up Monitoring

```
I'm adding monitoring to a personal e-commerce store using Next.js, 
deployed on Vercel, with Stripe for payments.

Requirements:
1. Set up Sentry for both client and server-side error tracking
2. Add specific, well-tagged error capturing in my Stripe webhook handler — 
   critical errors here need to be immediately visible, not just logged
3. Confirm my webhook handler returns the correct status codes: 500 (causing 
   Stripe to retry) only when order processing genuinely fails, and 200 
   when it succeeds OR when a non-critical side effect (like an email) fails 
   but the order itself was created successfully
4. Configure Sentry alert rules so I'm only notified for new/unhandled 
   errors and significant spikes, not every occurrence of known minor issues

My webhook handler: [paste your actual webhook code]

Explain the retry implications of each status code path in my handler.
```

> **Token efficiency tip:** Asking AI to explain the retry implications of each code path forces verification of this specific, easy-to-get-wrong logic rather than just generating monitoring boilerplate without checking it against your actual handler's behavior.

---

## Validating AI-Generated Monitoring Code

- [ ] Does the webhook handler return 500 only when the order genuinely failed to process, not for every possible error (including non-critical ones)?
- [ ] Is Sentry actually capturing server-side errors (in API routes, webhook handler), or only client-side errors? (A common gap — verify both are configured.)
- [ ] Are alert rules configured to avoid notifying on every single error occurrence, or will this create alert fatigue from day one?
- [ ] Is the Sentry DSN (or equivalent) correctly placed as a public-safe value, not confused with a secret that needs server-only protection? (Sentry DSNs are generally safe to expose client-side — but confirm this matches your specific setup.)

> **Common AI mistake:** AI sometimes wraps the entire webhook handler in a single try/catch that returns 500 for *any* error, including ones where the order was actually created successfully but a downstream side effect (like sending an email) failed. This causes Stripe to retry a webhook that already succeeded at its core job, which can trigger your idempotency check (good) but also generates noisy, confusing error alerts for failures that aren't actually critical (bad). Be specific about which failures are critical enough to warrant a retry-triggering response.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Full observability platforms (Datadog, New Relic, Grafana stacks)
- Custom metrics dashboards
- On-call rotation/paging systems (PagerDuty) — you're the only responder
- Distributed tracing across services
- Synthetic transaction monitoring beyond basic uptime checks

---

## Implementation Checklist

- [ ] Sentry installed and configured for both client and server-side error tracking
- [ ] Webhook handler has specific, tagged error capturing for critical failures
- [ ] Webhook status codes verified: 500 only for genuine processing failures, 200 otherwise
- [ ] Sentry alert rules configured to avoid notification fatigue
- [ ] Uptime monitor configured (UptimeRobot or Better Uptime) pointing at your homepage
- [ ] Stripe's webhook delivery dashboard checked and understood as a monitoring source
- [ ] Tested: intentionally trigger a webhook failure (e.g., temporarily break the handler) and confirm an alert actually arrives

---

## What's Next

With visibility into errors and uptime, the next step is making sure you can actually trace through what happened when something does go wrong — that's **Logging**, next in this phase.
