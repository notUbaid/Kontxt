---
title: Logging
slug: logging
phase: Phase 4
mode: personal
projectType: e-commerce
estimatedTime: 15-20 min
---

# Logging

Monitoring tells you *that* something broke. Logging tells you *why*. This module is about logging the right things in the right places — enough to actually debug a problem after the fact, without drowning yourself in noise or accidentally logging sensitive customer data.

---

## Monitoring vs. Logging: Where They Differ

It's worth being precise about this distinction, since the two modules are easy to conflate.

| | Monitoring (previous module) | Logging (this module) |
|---|---|---|
| Answers | "Is something wrong right now?" | "What exactly happened, step by step?" |
| When you use it | Alerted in real-time | Investigated after the fact, often hours/days later |
| Tooling | Sentry, uptime checks | Structured console logs, log aggregation |

You already have Sentry catching exceptions. This module is about the logs that exist *around* those exceptions — the trail that lets you reconstruct what actually happened to a specific order or request.

---

## What's Actually Worth Logging

<table>
<tr><th>Event</th><th>Log it?</th><th>Why</th></tr>
<tr><td>Webhook received + processed</td><td><strong>Yes — critical</strong></td><td>Your only record of what Stripe sent and how you handled it</td></tr>
<tr><td>Order creation (success/failure)</td><td><strong>Yes — critical</strong></td><td>Core business event, needed for debugging discrepancies</td></tr>
<tr><td>Stock decrement failures</td><td><strong>Yes — important</strong></td><td>Helps diagnose oversell/race condition issues if they occur</td></tr>
<tr><td>Email send failures</td><td>Yes — important</td><td>Explains "customer says they never got their confirmation"</td></tr>
<tr><td>Every page view</td><td>No</td><td>That's what Analytics (PostHog) is for, not logs</td></tr>
<tr><td>Every database query</td><td>No</td><td>Far too noisy, not useful in aggregate</td></tr>
<tr><td>Successful, routine requests</td><td>No, or minimal</td><td>Logging happy paths in detail mostly adds noise</td></tr>
</table>

> **Reframe:** Good logging answers the question "what happened to order ORD-1042?" by reconstructing a timeline from your logs. If you can't currently answer that question for a real order, that's the gap this module closes.

---

## Structured Logging, Not String Concatenation

This is the single most important practice in this module — it's the difference between logs you can actually search and logs that are just noise.

```javascript
// WRONG — unstructured string logging, hard to search/filter later
console.log(`Order ${orderId} created for ${email}, total: ${total}`);

// RIGHT — structured logging with consistent fields
console.log(JSON.stringify({
  event: 'order_created',
  orderId,
  customerEmail: email,
  total,
  timestamp: new Date().toISOString(),
}));
```

> **Why this matters:** When you're searching logs for a specific order weeks later, structured fields let you filter precisely (`event = 'order_created' AND orderId = 'xyz'`). String-concatenated logs only support text search, which is unreliable when formatting varies even slightly between log statements. This small habit, applied consistently, is what makes logs actually useful during a real investigation instead of just noise you scroll past.

---

## A Minimal Logging Helper

For a personal project, you don't need a dedicated logging library — a small consistent wrapper is enough.

```javascript
// lib/logger.ts
type LogEvent = {
  event: string;
  level?: 'info' | 'warn' | 'error';
  [key: string]: unknown;
};

export function log({ level = 'info', event, ...data }: LogEvent) {
  const entry = {
    event,
    level,
    timestamp: new Date().toISOString(),
    ...data,
  };
  
  // In development: readable. In production: structured JSON for log 
  // aggregation tools (Vercel automatically captures console output).
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(entry));
  } else {
    console.log(`[${level.toUpperCase()}] ${event}`, data);
  }
}
```

```javascript
// Usage in the webhook handler
log({ event: 'webhook_received', stripeEventId: event.id, type: event.type });

log({ event: 'order_created', orderId: order.id, total: order.total });

log({ 
  level: 'error', 
  event: 'stock_decrement_failed', 
  productId, 
  requestedQuantity: quantity 
});
```

> **Tip:** Vercel automatically captures `console.log` output from your serverless functions and makes it searchable in your project's dashboard — for a personal store, this is genuinely sufficient. You don't need a separate log aggregation service (Datadog Logs, Logtail) until you outgrow what's built into your hosting platform.

---

## Critical Path: Log the Full Webhook Lifecycle

This connects directly to the Checkout and Monitoring modules — the webhook handler is where logging matters most, because it's the one place a silent failure costs real money.

```javascript
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    log({ level: 'error', event: 'webhook_signature_invalid', error: err.message });
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  log({ event: 'webhook_received', stripeEventId: event.id, type: event.type });

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const existing = await getOrderByStripeSessionId(session.id);
    if (existing) {
      log({ event: 'webhook_duplicate_skipped', sessionId: session.id, existingOrderId: existing.id });
      return Response.json({ received: true });
    }

    try {
      const order = await createOrderTransaction(/* ... */);
      log({ event: 'order_created', orderId: order.id, sessionId: session.id, total: order.total });
    } catch (err) {
      log({ 
        level: 'error', 
        event: 'order_creation_failed', 
        sessionId: session.id, 
        error: err.message 
      });
      Sentry.captureException(err); // from Monitoring module
      return Response.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}
```

> **Why log the duplicate-skip case too:** This isn't an error, but it's valuable evidence. If you're ever investigating "why didn't I get two confirmation emails when Stripe says it sent the webhook twice," this log line is exactly what confirms your idempotency check from the Checkout module worked correctly. Logging expected, correct behavior — not just errors — is part of having a debuggable system.

---

## Never Log Sensitive Data

This is the most important constraint in this module, and the easiest one to violate accidentally.

**Never log:**
- Full credit card numbers (you shouldn't have access to these at all via Stripe Checkout, but be vigilant)
- Passwords, even hashed ones
- Full customer addresses in plaintext logs that might be widely accessible
- API keys or secrets, even partially

**Generally safe to log:**
- Order IDs, product IDs, customer IDs (internal identifiers)
- Customer email (useful for support investigation — but be mindful of where logs are stored/who can access them)
- Aggregate values (totals, quantities, statuses)

```javascript
// WRONG — logs the entire raw webhook payload, which may include more 
// customer detail than necessary
log({ event: 'webhook_received', payload: event });

// RIGHT — log only the specific fields you actually need for debugging
log({ event: 'webhook_received', stripeEventId: event.id, type: event.type });
```

> **Why this matters even for a personal project:** Logs often live in third-party tools (Vercel's dashboard, Sentry) with their own access and retention policies you may not have fully audited. Treat anything you log as something that could persist somewhere outside your direct control, and only log what you'd genuinely need to debug a problem — not everything available "just in case."

---

## AI Prompt: Add Structured Logging

```
I'm adding structured logging to a personal e-commerce store's critical 
paths, built with Next.js and Stripe.

Requirements:
1. A minimal logger helper: structured JSON output in production, readable 
   output in development, with event name, level, timestamp, and arbitrary 
   additional fields
2. Add logging to my Stripe webhook handler covering: webhook received, 
   signature validation failure, duplicate event skipped, order created 
   successfully, order creation failed
3. Add logging to stock decrement failures and email send failures
4. Audit what I'm logging for any sensitive data — flag anything that 
   shouldn't be in logs (raw payment details, passwords, full payloads 
   that include more than necessary)

My webhook handler and order creation function: [paste actual code]

Flag specifically if I'm logging entire request/response objects instead 
of the specific fields needed.
```

> **Token efficiency tip:** Explicitly asking AI to flag overly broad logging (entire objects vs. specific fields) catches a common AI tendency to log everything "for completeness," which works against the sensitive-data principle above.

---

## Validating AI-Generated Logging Code

- [ ] Are logs structured (JSON objects with consistent fields), not string-concatenated?
- [ ] Does the webhook handler log each meaningful state: received, duplicate-skipped, created, failed — not just errors?
- [ ] Is any sensitive data (raw payloads, full customer objects, anything payment-related beyond IDs) being logged unnecessarily?
- [ ] Are error logs actually distinguishable from info logs (via a `level` field), so you can filter for just what needs attention?
- [ ] Does logging happen consistently across similar code paths, or only in some places, leaving gaps in the debugging trail?

> **Common AI mistake:** AI often logs entire objects (`log(order)`, `log(event)`) rather than the specific relevant fields, both creating noise and risking sensitive data exposure. Always review generated logging calls for what's actually being passed in, not just whether logging exists.

---

## Reading Your Logs When Something Goes Wrong

When a customer says "I paid but never got my order," here's the actual debugging flow this module enables:

1. Search logs for their email or order session ID
2. Find the `webhook_received` entry — confirm Stripe actually sent the event
3. Check for `order_created` or `order_creation_failed` — this tells you exactly where it broke
4. If `order_creation_failed`, the error message tells you why (stock issue, database error, etc.)
5. Cross-reference with Stripe's dashboard to confirm payment status independently

This is the entire point of this module — turning "I have no idea what happened" into a five-minute investigation.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Dedicated log aggregation services (Datadog, Logtail, Better Stack) — Vercel's built-in log capture is sufficient at this scale
- Log retention policies/archival systems
- Distributed tracing/correlation IDs across services (you have one application, not a microservices architecture)
- Audit logging for compliance purposes (not required at personal-project scale)

---

## Implementation Checklist

- [ ] Structured logger helper created, used consistently across critical paths
- [ ] Webhook handler logs: received, signature failure, duplicate skipped, order created, order failed
- [ ] Stock decrement failures logged
- [ ] Email send failures logged
- [ ] Logging audited for sensitive data — no raw payment details, passwords, or unnecessary full payloads
- [ ] Verified logs are actually visible/searchable in your hosting platform's dashboard (Vercel or equivalent)
- [ ] Practiced the debugging flow: pick a real test order, confirm you can trace its full lifecycle through your logs

---

## What's Next

With errors caught and the ability to trace what happened, it's time to protect against abuse of your endpoints — that's **Error Tracking**, next in this phase.
