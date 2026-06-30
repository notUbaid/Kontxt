---
title: Payment Architecture
slug: payment-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Payment Architecture

Payments are the one place where a bug has immediate financial consequences — for you or your customer. This module covers how to configure your payment layer correctly, handle every outcome gracefully, and avoid the mistakes that cause real money to go missing.

---

## Choose Your Provider First

For India: **Razorpay** or **Stripe** (Stripe now supports INR and Indian cards).
For global: **Stripe**.

| | Stripe | Razorpay |
|---|---|---|
| Indian cards / UPI | Yes (limited UPI) | Excellent |
| International cards | Excellent | Good |
| Documentation quality | Industry-best | Good |
| Webhook reliability | Excellent | Good |
| Developer experience | Best-in-class | Solid |
| Free tier | No (pay per transaction) | No |

**Recommendation for personal projects:** Stripe if your customers are international or you want the best developer experience. Razorpay if UPI support is a priority.

This module uses Stripe terminology. Razorpay concepts are equivalent — refer to their docs for exact API names.

---

## Environment Separation

Before anything else, set up two completely isolated environments.

```
.env.local (development)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...

.env.production
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_live_...
```

**Never** use live keys in development. Test mode has test card numbers, simulated failures, and zero real charges. Develop entirely in test mode. Switch keys only at production deployment.

> Your publishable key is safe to expose to the browser. Your secret key must never leave your server. If you accidentally commit a secret key, rotate it immediately in the Stripe dashboard.

---

## Payment Flows You Must Handle

There are more than just "payment succeeds." Design for all of them.

```
Payment Initiated
    ├── Succeeds immediately          → create order, send confirmation
    ├── Requires authentication       → 3DS challenge presented to user
    │       ├── Auth succeeds         → create order, send confirmation
    │       └── Auth fails / timeout  → payment failed, cart preserved
    ├── Card declined                 → payment failed, cart preserved
    ├── Network timeout               → status unknown — check via webhook
    └── Webhook fires late            → idempotency check prevents duplicate
```

### 3D Secure (3DS)

3DS is mandatory for Indian card payments (RBI mandate) and increasingly common globally. Stripe handles 3DS automatically when you use Payment Intents — you do not implement it yourself. But your UI must handle the `requires_action` status from Stripe and call `stripe.handleNextAction()` to present the authentication challenge.

If you skip this, a significant portion of Indian card payments will silently fail.

---

## Payment Status Lifecycle

A PaymentIntent moves through these statuses. Your system must respond to each.

| Status | Meaning | Your Action |
|---|---|---|
| `requires_payment_method` | Awaiting card details | Show payment form |
| `requires_confirmation` | Ready to confirm | Confirm via Stripe.js |
| `requires_action` | 3DS challenge needed | Call `handleNextAction()` |
| `processing` | Payment in flight | Show spinner, wait for webhook |
| `succeeded` | Payment confirmed | Create order (via webhook) |
| `canceled` | Payment intent cancelled | Cart remains active |
| `payment_failed` | Declined or error | Show error, allow retry |

Map these statuses to your UI states. Never rely on a single "success/fail" binary.

---

## Handling Failed Payments

When a payment fails, the cart must survive intact. The user should be able to fix their card details and retry without rebuilding their cart.

```
Payment fails
    ↓
Stripe returns decline code (card_declined, insufficient_funds, etc.)
    ↓
Display human-readable error message
    ↓
Keep cart intact
    ↓
Allow retry with same or different payment method
    ↓
Create a NEW PaymentIntent for the retry
    (do not reuse a failed PaymentIntent)
```

Common decline codes worth handling explicitly:

| Code | User-facing message |
|---|---|
| `card_declined` | Your card was declined. Please try a different card. |
| `insufficient_funds` | Insufficient funds. Please try a different card. |
| `expired_card` | Your card has expired. Please try a different card. |
| `incorrect_cvc` | Incorrect CVC. Please check and try again. |
| `do_not_honor` | Your bank declined this payment. Please contact your bank or try a different card. |

Never show raw Stripe error codes to customers.

---

## Refund Architecture

Refunds are not just a payment concern — they touch orders, inventory, and customer communication.

```
Refund requested (admin action or customer request)
    ↓
Server calls stripe.refunds.create({ payment_intent: id, amount: X })
    ↓
Stripe processes refund (usually instant, sometimes 5–10 business days)
    ↓
Stripe sends charge.refunded webhook
    ↓
Your server updates order status → refunded (or partial_refund)
    ↓
Optionally restock inventory if items are returned
    ↓
Send refund confirmation email
```

**Partial refunds** are common (one item from a multi-item order). Store refunded amounts on the order — `refundedAmount` field — so you can track partial states.

Never update order status before the Stripe webhook confirms the refund. The webhook is the source of truth.

---

## Webhook Reliability

Stripe retries failed webhooks for up to 72 hours. Your webhook endpoint must:

**Always return 200 quickly.** Process synchronously only what's necessary to respond. Queue heavy work (email, inventory, fulfilment) for async processing.

```js
// Webhook handler
export async function POST(req) {
  const event = verifyWebhookSignature(req) // throws if invalid

  // Respond immediately
  // Heavy processing should be queued, not awaited inline

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSucceeded(event.data.object)
      break
    case 'charge.refunded':
      await handleRefund(event.data.object)
      break
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object)
      break
  }

  return Response.json({ received: true }, { status: 200 })
}
```

**Log every webhook event.** Create a `webhookEvents` table and record each event with its ID, type, and processing status. This gives you an audit trail and lets you replay events during debugging.

```
WebhookEvent
├── id (stripe event ID — unique)
├── type
├── payload (json)
├── processedAt (nullable)
├── error (nullable)
└── createdAt
```

---

## Testing Payments

Never skip this. Test every scenario before going live.

**Stripe test cards:**

| Scenario | Card number |
|---|---|
| Successful payment | 4242 4242 4242 4242 |
| Requires 3DS auth | 4000 0027 6000 3184 |
| 3DS auth fails | 4000 0082 6000 3178 |
| Card declined | 4000 0000 0000 0002 |
| Insufficient funds | 4000 0000 0000 9995 |
| Expired card | 4000 0000 0000 0069 |

Use any future expiry date, any 3-digit CVC, any postal code.

**Test your webhook locally** using the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This tunnels Stripe's test events to your local server. Test every status transition before deploying.

---

## Security Checklist

- [ ] Secret key never exposed to browser or committed to git
- [ ] Webhook signature verified on every incoming event
- [ ] PaymentIntent amount set server-side, never passed from client
- [ ] All money stored as integers (paise/cents), never floats
- [ ] Stripe.js loaded from `js.stripe.com` only — never self-hosted
- [ ] HTTPS enforced on all payment routes in production
- [ ] Refunds only possible via authenticated admin action
- [ ] Test keys and live keys never mixed in the same environment

---

## AI Prompt: Payment Implementation Review

```
You are a senior backend engineer reviewing a payment integration for a personal e-commerce project using Stripe.

Here is my implementation:

PAYMENT INTENT CREATION:
[paste your server-side PaymentIntent creation code]

WEBHOOK HANDLER:
[paste your webhook handler]

FRONTEND PAYMENT FLOW:
[describe how you're using Stripe.js and handling 3DS]

REFUND HANDLING:
[describe your refund flow]

Review for:
1. Security issues (exposed keys, unsigned webhooks, client-trusted amounts)
2. Missing payment status handling (especially requires_action for 3DS)
3. Idempotency and double-processing risks
4. Refund edge cases
5. Anything that would cause real money to go missing or duplicate orders

Be specific. Flag critical issues first.
```

---

## Validation Checklist

- [ ] Both test and live Stripe environments configured separately
- [ ] PaymentIntent amount computed server-side before creation
- [ ] 3DS (`requires_action`) handled in frontend with `handleNextAction()`
- [ ] All payment status transitions mapped to UI states
- [ ] Failed payments preserve cart and allow retry with new PaymentIntent
- [ ] Human-readable error messages for common decline codes
- [ ] Refund flow triggers from webhook, not from API response
- [ ] Partial refunds tracked with `refundedAmount` on order
- [ ] All webhook events logged to database
- [ ] Webhook endpoint tested locally with Stripe CLI
- [ ] Every test card scenario verified before production deployment

---

## What to Build Next

**Customer Accounts** — how authenticated users track orders, manage addresses, and re-order. The payment and order data you've just architected feeds directly into what account holders need to see.

---

> **Filename:** `payment-architecture-personal-e-commerce.md`
