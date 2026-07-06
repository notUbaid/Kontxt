---
title: Payments
slug: payments
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 25-35 min
---

# Payments

Payments is the part of your app where mistakes cost real money — yours, or your users'. This module covers the architecture and implementation discipline that matters most: never handling raw card data yourself, treating every payment operation as idempotent, and respecting the platform rules that determine whether your app even gets approved for distribution.

---

## The Rule That Overrides Everything Else Here

> ️ **Never let your app or backend touch raw card numbers, CVVs, or full payment credentials.** Use your payment provider's SDK to tokenize payment details directly on-device — your backend should only ever see a token/payment method ID, never the underlying card data. Handling raw card data yourself pulls you into full PCI-DSS compliance scope, which is a serious, ongoing compliance burden almost no app needs to take on. Every reputable payment provider's mobile SDK is designed specifically to keep you out of that scope — use it as designed.

---

## Decision 1 — Provider Choice

| Provider | Best For | Mobile SDK Maturity |
|---|---|---|
| **Stripe** | Most general-purpose apps — broad payment method support, strong docs, mature RN SDK | High |
| **RevenueCat** (wraps App Store/Play Store IAP) | Subscriptions and in-app purchases specifically | High — purpose-built for this |
| **Apple In-App Purchase / Google Play Billing (direct)** | Required for digital goods/subscriptions sold within the app (see platform rules below) | Native, no third-party needed but more implementation work |

> **Recommendation:** for physical goods, services, or anything outside the platform-mandated IAP requirement, use **Stripe**. For digital content/subscriptions where Apple/Google mandate their own payment system, use **RevenueCat** rather than implementing raw StoreKit/Play Billing directly — it handles the considerable cross-platform receipt validation and subscription state complexity for you.

---

## Decision 2 — Know Which Payment Model You're Required to Use

This is a platform policy decision, not a technical one, and getting it wrong can mean app store rejection:

> ️ **Apple requires In-App Purchase (and takes its commission) for digital content, subscriptions, and virtual goods consumed within the app.** You cannot route around this with Stripe for a subscription unlocking in-app features — this is one of the most common App Store rejection reasons for apps with a paid tier. Physical goods, in-person services, and most B2B/marketplace transactions are generally exempt and can use Stripe or similar directly. If you're unsure which category your product falls into, this is worth resolving before building the payment flow, not after submission.

Android has a similar Play Billing requirement for digital goods, with somewhat more flexibility depending on category — verify current policy for your specific product type before committing to an implementation.

---

## Decision 3 — Idempotency on Every Payment Operation

> ️ Network failures on mobile are common — a payment request can time out on the client after it actually succeeded server-side, and a naive retry creates a duplicate charge. Every payment-creating request must include an idempotency key, generated client-side, that your backend (and most payment providers natively) uses to guarantee the same logical request is never processed twice, no matter how many times the client retries it.

```typescript
const idempotencyKey = generateUUID(); // generated once per attempt, reused across retries

await api.createPayment({
  amount,
  currency,
  paymentMethodId,
  idempotencyKey,
});
```

Most providers (Stripe included) support idempotency keys natively on their charge-creation endpoints — use that mechanism rather than building your own deduplication layer from scratch.

---

## Decision 4 — Client-Side Flow

```
1. Client collects payment method via provider SDK UI component (never raw fields you built yourself)
2. Provider SDK tokenizes on-device → returns a payment method token, not card data
3. Client sends token + idempotency key to your backend
4. Backend creates the charge/payment intent server-side, using the token
5. Backend returns success/failure; client updates UI accordingly
```

>  Use the provider's pre-built UI components (Stripe's `PaymentSheet`, for example) rather than building custom card input forms — they handle a meaningful amount of validation, formatting, and platform-specific UX (Apple Pay/Google Pay sheet integration) that's not worth reimplementing, and keeps you further from any PCI scope.

---

## Decision 5 — Webhook-Driven State, Not Client-Reported Success

> ️ **Never mark a payment as successful in your database based solely on the client telling you it succeeded.** A client can lie (maliciously or through a bug), lose connectivity right after a successful charge, or crash before reporting back. The authoritative source of truth for payment state is your provider's webhook — listen for `payment_intent.succeeded` (or equivalent) server-side, and treat that as the actual confirmation. The client-side success response is for UX (showing a confirmation screen immediately); the webhook is for truth (actually fulfilling the order, granting access, etc.).

```
Client confirms payment → shows optimistic "Processing..." UI
                              ↓
Provider sends webhook to your backend on actual completion
                              ↓
Backend verifies webhook signature → updates order status → fulfills
                              ↓
Client polls/subscribes for the real status update → shows final confirmation
```

This also means your backend must handle the case where the webhook arrives **before** the client's own request completes (race condition) — design the fulfillment logic to be triggered by whichever arrives, idempotently, rather than assuming a strict order.

---

## Decision 6 — Webhook Security

- **Verify webhook signatures** using your provider's signing secret — an unverified webhook endpoint is a direct path for anyone to fake a "payment succeeded" event and get free fulfillment.
- **Make webhook handlers idempotent** — providers retry webhook delivery on failure, so the same event can arrive more than once; your handler must produce the same end state whether processed once or five times.

```typescript
const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
// constructEvent throws if signature is invalid — let it
```

---

## Decision 7 — Failure and Edge Case Handling

- **Declined cards:** surface the provider's specific decline reason where available (insufficient funds vs. card expired vs. generic decline) — generic "payment failed" messages cause unnecessary support tickets for problems the user could self-resolve.
- **Refunds:** decide whether refunds are user-initiated (self-service, within rules you define) or support-mediated only — and implement webhook handling for refund events the same way as payment success events.
- **Currency/locale:** confirm your provider and pricing display handle the currencies your target markets actually need — this is easy to design around correctly from the start and painful to retrofit.

---

## AI Prompts

### Prompt 1 — Payment Flow Implementation

```
Implement a payment flow for a production [React Native] app using [Stripe /
RevenueCat / specify provider].

Product type: [physical goods / digital subscription / service / marketplace]
(this determines whether platform IAP is required — confirm before implementing)

Implement: client-side tokenized payment collection using the provider's
SDK UI components, idempotency-key-protected payment creation, webhook-driven
order fulfillment (not client-reported success), signature verification on
the webhook endpoint, and idempotent webhook handling for duplicate delivery.
```

### Prompt 2 — Payment Security Review

```
Review this payment implementation for production readiness:

[paste your payment flow code]

Check specifically for: any path where raw card data touches your backend
or app code instead of being tokenized client-side, missing idempotency
keys on payment creation, order fulfillment triggered by client-reported
success instead of webhook confirmation, missing webhook signature
verification, and non-idempotent webhook handlers.
```

---

## Validating AI Output

- [ ] No raw card data ever reaches your backend or is stored anywhere — only provider tokens
- [ ] Every payment-creating request includes an idempotency key
- [ ] Order/access fulfillment is triggered by verified webhook events, not client-reported success
- [ ] Webhook signatures are verified before any event is trusted
- [ ] Webhook handlers produce the same end state whether an event is delivered once or multiple times
- [ ] The correct payment model (platform IAP vs. direct provider) is used based on actual product type and platform policy
- [ ] Decline reasons are surfaced specifically, not collapsed into a single generic failure message

---

## What's Next

- **Maps & Location** and **Media Uploads** (next in this phase) are unrelated to payments directly but share the same idempotency and never-trust-the-client discipline for anything that writes meaningful state.
- **App Permissions Strategy** covers consent/permission UX patterns that also apply to sensitive flows like payment-adjacent biometric confirmation.
- **Security** (Phase 4) will revisit payment infrastructure specifically as part of a system-wide attack-surface review.
