---
title: Payments
slug: payments
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Payments

Payments is where a subtle bug becomes a billing incident, not just a UX issue. The core principle that shapes everything in this module: **your application's source of truth for subscription state is webhooks, not the checkout redirect.** Get that one thing right and most other payment bugs become much easier to avoid.

---

## Decision 1: Payment Processor

> ✅ **Best Practice**
> Default to **Stripe** for production SaaS billing. It's the industry standard for a reason: mature subscription primitives, a hosted checkout that keeps raw card data off your servers entirely, and a customer portal you don't have to build yourself.

---

## Decision 2: Pricing Model

| Model | Use when |
|---|---|
| Flat-rate tiers | Predictable usage per customer, simplest to reason about and bill |
| Seat-based | Value scales with team size — common for collaboration tools |
| Usage-based | Value scales with consumption (API calls, storage, AI tokens) — more complex to implement and to explain to customers |

> 💡 **Tip**
> Start with the simplest model that reflects your value — usually flat-rate tiers or seat-based. Usage-based billing adds real implementation complexity (metering, proration edge cases) that's only worth it once your cost-to-serve genuinely scales with usage, which you should already know from Cost Estimation.

---

## Decision 3: Checkout Implementation

> **Decision Card**
> Use **Stripe Checkout** (hosted) rather than building a custom payment form with Stripe Elements, unless you have a specific design requirement that demands a fully embedded experience. Hosted Checkout means Stripe — not your servers — ever touches raw card numbers, which substantially reduces your PCI compliance burden. Don't take on that scope without a clear reason.

---

## Decision 4: Webhooks Are Your Source of Truth

> ⚠️ **Warning**
> **Never grant access based solely on the client-side redirect after checkout.** A user landing on your "success" page after Stripe Checkout is a UX signal, not a payment confirmation — the redirect can happen before your backend has confirmed payment, and a user could even reach that URL without paying (e.g., a browser back button, a flaky network). Grant or update access **only** when you receive and verify the corresponding webhook event (`checkout.session.completed`, `invoice.paid`, etc.).

This connects directly to your Third Party Integrations webhook handling: verify the signature, process idempotently (a webhook can be delivered more than once), and update your local subscription record from the event — not from anything the client told you.

---

## Decision 5: Handling Failed Payments (Dunning)

- [ ] Listen for `invoice.payment_failed` and trigger a retry/dunning flow (Stripe's Smart Retries can handle the retry schedule itself)
- [ ] Define a grace period before downgrading or restricting access — don't lock a customer out on the first failed charge; payment failures are frequently transient (expired card, temporary decline)
- [ ] Notify the customer clearly when a payment fails, with a direct path to update their payment method

---

## Decision 6: Plan Changes & Cancellation

- [ ] Upgrades/downgrades use Stripe's proration so customers aren't double-charged or under-charged for the transition period
- [ ] Cancellations: decide whether access ends immediately or continues until the end of the current billing period (the latter is the more common, more customer-friendly default)
- [ ] All of this state is reflected in your database via webhooks (`customer.subscription.updated`, `customer.subscription.deleted`), not computed ad-hoc in your application logic

---

## Decision 7: Test Mode vs. Live Mode

> ⚠️ **Warning**
> Stripe test and live mode use **entirely separate API keys and webhook signing secrets.** Mixing them — accidentally using a live key in staging, or a test webhook secret in production — either silently fails or, worse, processes real charges somewhere you didn't intend. Keep these clearly separated in your environment variable setup per environment (tie back to Third Party Integrations secrets management).

---

## Decision 8: Customer Self-Service

> ✅ **Best Practice**
> Use Stripe's **Customer Portal** for self-service plan changes, payment method updates, and invoice history, rather than building this UI yourself. It's a significant amount of UI and edge-case handling you don't need to build, test, or maintain.

---

## Common AI Mistakes to Watch For

- **Grants access based on the checkout success redirect alone**, with no webhook confirmation — always require webhook-driven activation explicitly.
- **Processes webhook events non-idempotently** — verify duplicate event handling, same as any webhook in Third Party Integrations.
- **No grace period on payment failure** — immediate downgrade on first failed charge is harsher than necessary and frustrates customers over transient card issues.
- **Mixes test and live keys/secrets** across environments — verify explicitly which mode each environment uses.
- **Builds a custom billing management UI** instead of using Stripe's Customer Portal — question this unless there's a specific reason the portal doesn't fit.

---

## AI Prompt: Implement Subscription Billing

```
Implement Stripe subscription billing for a production SaaS with these plans: [list your plan tiers and prices].

Requirements:
- Use Stripe Checkout (hosted), not custom Elements, unless I specify otherwise
- Subscription status in our database is updated ONLY via verified webhook events (checkout.session.completed, invoice.paid, invoice.payment_failed, customer.subscription.updated, customer.subscription.deleted) — never from the client-side success redirect
- Webhook handler verifies Stripe's signature and processes events idempotently
- On invoice.payment_failed: do not immediately restrict access — apply a grace period of [X days] before downgrading, and notify the customer
- Cancellations keep access until the end of the current billing period, not immediate
- Use separate Stripe keys/webhook secrets per environment (test for dev/staging, live for production)
- Link out to Stripe's Customer Portal for self-service plan changes and payment method updates rather than building custom UI for this

Show the webhook handler and the database update logic explicitly — I want to verify subscription state is never derived from anything except verified webhook events.
```

---

## Validate Before You Move On

- [ ] Subscription/access state in your database is updated only by verified webhook events, never the client-side redirect
- [ ] Webhook signature verification and idempotent processing are both in place
- [ ] A grace period exists before restricting access on payment failure
- [ ] Cancellation behavior (immediate vs. end-of-period) is a deliberate decision, not a default you didn't examine
- [ ] Test and live keys/secrets are clearly separated per environment
- [ ] Customer self-service billing uses Stripe's Customer Portal, not custom-built UI
- [ ] You've tested the failure path (declined card) as carefully as the success path

> 💡 **Tip**
> Use Stripe's CLI to forward webhook events to your local environment during development — this lets you test the full webhook-driven flow before deploying, rather than discovering webhook bugs for the first time in production.

---

**Next:** Emails — implement the transactional emails this billing flow (and the rest of your product) depends on.
