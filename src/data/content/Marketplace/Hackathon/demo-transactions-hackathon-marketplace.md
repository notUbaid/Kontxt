---
title: Demo Transactions
slug: demo-transactions
phase: Phase 2
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: demo-transactions-hackathon-marketplace.md
---

# Demo Transactions

This is the module where the philosophy from Welcome and Marketplace Fundamentals — fake the hard parts convincingly — gets applied to the single highest-risk part of your build: the transaction itself. Get this decision right and your core loop closes convincingly. Get it wrong and you've either burned hours on payment infrastructure nobody asked for, or built something so obviously fake it undermines trust in the rest of your demo.

---

## The Spectrum: Real Money to Pure Theater

Transactions in a hackathon marketplace exist on a spectrum. Almost no team should be at either extreme.

| Level | What happens | Build effort | Demo risk |
|---|---|---|---|
| Real payment processing | Actual Stripe/PayPal charge goes through | High | High — real third-party failure modes live, on stage |
| Test-mode payment | Real payment provider, test API keys, no real money | Medium | Low — looks completely real, costs nothing if it fails |
| Simulated transaction | Your own logic marks something "purchased," no payment provider involved | Low | Very low — but must be done carefully to still feel real |
| Pure UI theater | Button click triggers an animation, nothing persists | Very low | High — judges who probe (refresh the page, check another account) immediately see through it |

> **Best Practice:** Test-mode payment (using your payment provider's official sandbox, like Stripe test cards) or a carefully built simulated transaction are almost always the right choice. Both look completely real on screen. Test-mode payment additionally proves you know how to integrate a real provider, which is itself a credibility signal — without the risk of an actual charge failing live.

---

## Why Real Payment Processing Is Usually the Wrong Call

> **Warning:** Real payment processing in a hackathon demo means a live financial transaction can fail in front of judges for reasons completely outside your control — a declined test card, a network hiccup with the provider, a webhook delay. None of that risk buys you anything a test-mode integration doesn't already demonstrate.

The only reason to use real (non-test) payment processing is if your concept's actual differentiator is something payment-specific judges need to see verified for real — and even then, most teams overestimate how necessary this is.

---

## Building a Convincing Simulated Transaction

If you're not using a payment provider at all (a valid, common choice for many marketplace concepts), the transaction still needs to feel real, not theatrical. The difference comes down to **persistence and consistency**.

> **Reframe:** A simulated transaction isn't "fake" in the sense of being low-quality — it's a transaction your own system genuinely processes and records, you've simply removed the part where a third-party financial institution is involved. The logic, the state change, and the resulting confirmation should all be completely real.

### What Makes It Feel Real

- The transaction actually writes to your database — not just a client-side animation
- The listing's status genuinely changes (e.g. `available` → `sold` or `reserved`) and that change is visible to other users browsing
- Refreshing the page after a "purchase" still shows the correct state — this is the single test that separates real persistence from UI theater
- The seller's view reflects the change too — this is your buyer/seller connection point from Seller Journey, proven live

> **Best Practice:** Test this exact scenario before your demo: complete a transaction, then open the listing in a second browser tab or incognito window. If the status hasn't changed there too, your transaction isn't actually persisting — it's UI theater, and a judge who happens to refresh or check will see through it immediately.

---

## Test-Mode Payment Integration (If You Use One)

If you do integrate a real payment provider in test mode:

| Provider | Test mechanism |
|---|---|
| Stripe | Test API keys + documented test card numbers (e.g. `4242 4242 4242 4242`) |
| PayPal | Sandbox accounts |
| Most providers | A clearly documented "test mode" or "sandbox mode" — use it, never live keys |

> **Warning:** Double-check before your demo that you're using test keys, not live keys. This sounds obvious, but it's a common late-night hackathon mistake — accidentally leaving live keys in an environment variable is the difference between a safe demo and an actual charge.

The integration itself should be minimal: create a payment intent or order, confirm it with a test card, and treat the confirmation webhook (or response) the same way you'd treat a simulated transaction completing — update the listing status, show confirmation, done. Don't build subscription billing, refunds, or payout logic — none of that serves your demo.

---

## What NOT to Build

Regardless of which level of the spectrum you choose, these are consistently the wrong investment for a hackathon timeframe:

- Real payout/withdrawal flows for sellers
- Refund or dispute handling
- Multi-currency support
- Tax calculation
- Saved payment methods / stored cards
- Subscription or recurring billing

> **Common Mistake:** Building real payout logic because "a real marketplace would need this." A judge evaluating a 3-minute demo will never ask to see seller payouts. Every hour spent here is an hour not spent making the core loop and its persistence rock-solid.

---

## Using AI Effectively Here

Use AI to implement whichever level you've chosen cleanly, with explicit attention to the persistence test above.

** Copy this prompt:**

```
I'm implementing the transaction step for a hackathon marketplace.

My decision: [test-mode payment via (provider) / simulated transaction with no payment provider]
My data model: [paste your listings/transactions schema]
My core loop: [paste from PRD]

Implement this so that:
1. Completing a transaction updates the listing's status in the database (not just client state)
2. The updated status is visible to any other user/session viewing that listing, including after a page refresh
3. Both buyer and seller views reflect the change
4. [If test-mode payment]: use test API keys/sandbox mode explicitly, never live keys

After implementing, tell me exactly how to test that this isn't just UI theater — the specific steps to verify real persistence.
```

---

## Validating the Output

- Does the transaction write to the database, not just update client-side state?
- Does a second browser session (or incognito window) show the updated listing status after a "purchase"?
- Does the seller's view reflect the transaction, proving the buyer/seller connection works?
- If using a payment provider, are you certain you're using test/sandbox keys, not live keys?
- Have you avoided building payout, refund, or subscription logic that serves no demo purpose?

> **Tip:** Run the refresh-and-second-session test described above at least once, deliberately, before considering this feature done. It's the fastest way to catch the difference between a real transaction and convincing-looking theater.

---

## Before You Continue

- Transaction level explicitly chosen (test-mode payment or simulated) — not left ambiguous or accidentally built as UI theater
- Transaction persists to the database and survives a page refresh
- Buyer and seller views both reflect the transaction outcome
- No payout, refund, or subscription logic built
- If using a payment provider, test/sandbox keys confirmed, not live keys

**Next up:** Demo Marketplace Data — populating the marketplace so it feels alive before a single real user touches it.
