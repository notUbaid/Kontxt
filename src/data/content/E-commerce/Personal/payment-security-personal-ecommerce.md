---
title: Payment Security
slug: payment-security
phase: Phase 4
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Payment Security

You already built payment processing in Phase 3 and rate-limited the checkout endpoint in this phase. This module is the dedicated pass over the part of your store that touches money — making sure the *way* you handle payments, not just the volume of attempts, is sound.

The good news: if you used a proper payment provider (Stripe or similar) instead of handling card numbers yourself, most of the hard security work is already done for you. This module is mostly about not accidentally undoing that.

---

## Where This Fits

You're auditing, not rebuilding, your Phase 3 payment integration. If you used Stripe Checkout, Stripe Elements, or an equivalent provider's hosted/embedded flow, you're in a strong position already. If you're handling raw card numbers anywhere in your own code, that's the first thing this module needs to fix.

---

## The One Rule That Matters Most

> **️ Warning:** Your server should never see, log, or store a raw card number, CVV, or full card details — ever. If your code has a variable holding a card number at any point, something is wrong. Use your payment provider's hosted fields, Elements, or Checkout, which send card data directly from the customer's browser to the provider, never through your server.

This single rule eliminates the vast majority of payment-related compliance burden (PCI DSS) and most realistic attack surface. Everything else in this module is secondary to getting this right.

---

## What You're Building Today

- Confirmation that card data never touches your server or logs
- Webhook verification, so you can trust that "payment succeeded" events are genuinely from your provider
- Idempotency on order creation, so a retried payment never creates duplicate orders or charges
- Server-side price verification at checkout, so a manipulated client-side price can't be submitted
- A clear answer to "what happens if a webhook is delayed or arrives twice?"

You're **not** building your own PCI-compliant card vault, your own fraud-scoring model, or custom encryption for card data. None of that should exist in a personal store — it should exist entirely inside your payment provider.

---

## Server-Side Price Verification

This is the most commonly missed item in beginner checkout implementations.

> **️ Common Mistake:** If your checkout flow sends the cart total from the client to create the payment, a customer can modify that number in their browser before submitting. The server must independently calculate the total from the actual product prices and quantities in the database — never trust a price or total sent from the client.

```
Client sends: cart items (product IDs + quantities) — NOT prices, NOT totals
Server: looks up current price for each product ID, calculates total itself
Server: creates the payment charge using its own calculated total
```

---

## Implementation

**Copy Prompt:**

```
Review and harden the payment flow in my e-commerce store, built with
[your framework] and [Stripe / your payment provider].

Specifically check and fix, in this order:

1. Confirm no raw card data ever passes through my server — only
   provider-hosted fields/Checkout are used to collect it
2. Confirm the checkout total is calculated server-side from current
   database prices, not trusted from any client-sent value
3. Add webhook signature verification so payment-success events are
   confirmed to genuinely come from [provider], not spoofed
4. Add idempotency so a retried or duplicate webhook event can't create
   two orders or process two charges for the same purchase

Show me the webhook handler first — that's the part most likely to be
missing verification or idempotency if generated without being asked
explicitly.
```

> ** Tip:** Ask specifically about idempotency keys, even if you're not sure what they are yet. Payment providers retry webhook delivery if they don't get a fast response from your server, which means your handler *will* receive the same "payment succeeded" event more than once in normal operation, not just in edge cases.

---

## Webhooks: Trust, But Verify

Your server receives a "payment succeeded" notification from your payment provider via webhook. Without verification, anyone who knows your webhook URL could send a fake success event and get free products.

- [ ] Webhook signature is verified using your provider's signing secret before any order is marked as paid
- [ ] Webhook handler responds quickly (just acknowledges receipt) and does slower work like sending emails afterward — slow responses cause providers to retry unnecessarily
- [ ] Order creation/fulfillment logic is idempotent — processing the same webhook event twice has no additional effect

---

## Common Mistakes

- Trusting a price or total sent from the client instead of recalculating it server-side
- Logging the full request body of a checkout request "for debugging," which can accidentally capture sensitive payment data even when using a provider's hosted fields
- Skipping webhook signature verification, trusting that the webhook URL being secret is protection enough — it isn't, URLs leak
- No idempotency check, so a network retry or provider's duplicate webhook delivery creates two orders for one purchase
- Storing the full payment provider customer object in your own database when you only need the customer ID reference

---

## Security Checklist

- [ ] No raw card number, CVV, or expiry date is ever received, logged, or stored by your own server
- [ ] Checkout total is calculated server-side from current database prices, never trusted from the client
- [ ] Webhook events are signature-verified before being trusted
- [ ] Order/payment processing is idempotent against duplicate webhook delivery
- [ ] No full request/response bodies containing payment details are written to application logs
- [ ] Payment provider API keys are environment variables, never hardcoded, and test/live keys are never mixed across environments

---

## Validation Checklist

- [ ] Attempt to modify the cart total in browser dev tools before submitting checkout — confirm the server ignores it and uses its own calculation
- [ ] Manually resend a webhook test event (most providers offer this in their dashboard) and confirm it doesn't create a duplicate order
- [ ] Send a fake/unsigned webhook request and confirm it's rejected
- [ ] Search your application logs for any card number, CVV, or full payment payload — confirm none appear

---

## AI Review Prompt

```
Review the payment implementation in this e-commerce store. Specifically
check for:

1. Any path where raw card data could touch the server or get logged
2. Any point where checkout total or price is trusted from the client
   rather than recalculated server-side
3. Missing or incorrect webhook signature verification
4. Missing idempotency that could let a duplicate webhook create a
   duplicate order or charge

Treat any of these as a critical issue, not a style suggestion — these
are the failure modes that cost real money.
```

---

## What Comes Next

Payment handling is now hardened against the most common, realistic attack patterns. Next: **Fraud Prevention** — patterns specific to detecting and slowing down bad actors beyond what rate limiting and payment security already cover.
