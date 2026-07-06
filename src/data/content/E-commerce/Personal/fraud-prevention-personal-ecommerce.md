---
title: Fraud Prevention
slug: fraud-prevention
phase: Phase 4
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Fraud Prevention

Rate limiting slowed down abuse. Payment security hardened how money moves through your store. This module closes the gap between the two: catching the specific patterns fraudsters use against stores — patterns that can technically pass your rate limits and your secure payment flow, and still cost you money or trigger a payment provider suspension.

---

## Where This Fits

This is the last module of Phase 4. Everything here builds directly on Rate Limiting and Payment Security — if you skipped either, this module assumes both are already in place.

---

## Why This Matters Even at Personal Scale

> **️ Warning:** Fraudsters don't target stores based on size or popularity — they target stores based on how unprotected they are. A personal store with no fraud signals in place is, from an attacker's perspective, indistinguishable from an easy target. The most common consequence isn't a dramatic loss — it's your payment provider account getting flagged or suspended for unusual activity, which can interrupt your entire store, not just one order.

The goal here is not building a fraud-detection company. It's recognizing the handful of patterns that actually show up against small stores, and putting cheap, simple checks in place for them.

---

## What You're Building Today

- Detection for the most common pattern: **card testing** (many small/failed charge attempts in quick succession)
- A basic mismatch check between billing address and shipping address as a soft signal, not an automatic block
- Manual review flagging for orders that hit multiple risk signals at once
- Awareness of what your payment provider already detects for you — so you don't rebuild what's already covered

You're **not** building a machine-learning fraud model, IP geolocation blocking, or device fingerprinting. Those exist, but they're disproportionate tooling for a personal store and often cost more in false-positive lost sales than the fraud they'd prevent.

---

## What Your Payment Provider Already Does

Before adding anything yourself, know what's already covered:

| Signal | Covered by Provider? | Notes |
|---|---|---|
| Stolen card detection | Yes (Stripe Radar / equivalent) | Built into most modern providers, often free or low-cost |
| CVV/AVS mismatch | Yes | Provider checks this automatically against the card issuer |
| 3D Secure / SCA | Yes | Adds issuer-side verification for risky transactions |
| Velocity of attempts *on the provider's side* | Partially | Provider sees attempts across all their merchants, not just yours |
| Velocity of attempts *on your specific store* | **No — this is yours to build** | Your rate limiting from earlier covers most of this already |

> ** Best Practice:** Check whether your payment provider's built-in fraud detection (e.g., Stripe Radar) is actually enabled — many beginners integrate payments without realizing fraud detection is a setting, not an automatic default. This is often a five-minute dashboard change that covers more ground than anything you'd build yourself.

---

## The Patterns Worth Watching

### Card Testing
Many failed or very small charge attempts in a short window, often across different card numbers, same session or IP. Your Rate Limiting module already blocks the *volume* of this — this module adds recognizing the *pattern* even when it stays under the rate limit.

### Address Mismatch
Billing address and shipping address in different countries, or shipping to a freight-forwarder-style address pattern. Not proof of fraud on its own — plenty of real customers ship gifts elsewhere — but worth a soft flag when combined with other signals.

### Velocity from a New Account
A brand-new account placing a large or unusual order within minutes of signup. Legitimate, often — but a pattern worth a light flag, not a block.

---

## Implementation

**Copy Prompt:**

```
I'm adding lightweight fraud signals to a personal e-commerce store
using [Stripe / your payment provider]. Help me:

1. Confirm whether the provider's built-in fraud detection (e.g.,
   Stripe Radar) is active, and walk me through enabling it if not
2. Add a soft flag (not an automatic block) on orders where billing
   and shipping country differ
3. Add a soft flag on orders from accounts created within the last
   [X] minutes placing orders above [$ threshold]
4. Store these flags on the order record so I can review flagged
   orders manually before fulfillment, rather than auto-rejecting them

I want flags, not blocks — I'd rather review a handful of orders by
hand than risk rejecting real customers automatically.
```

> **️ Warning:** Auto-blocking orders based on simple heuristics like address mismatch will reject real customers far more often than it stops real fraud. For a personal store, flag for manual review instead of auto-rejecting — you have the time to check a handful of flagged orders by hand, and the cost of a false block (a lost real sale) is often worse than a small fraud loss.

---

## What to Do With a Flagged Order

A simple, low-effort manual review process:

1. Order comes in with one or more soft flags
2. Before fulfilling, check: does the order total seem unusually high for a first-time customer? Does the shipping address look like a real residence?
3. If still unsure, your payment provider's dashboard often shows its own risk score for the transaction — check it before deciding
4. When genuinely uncertain, it's reasonable to delay fulfillment and reach out to the customer to confirm — legitimate customers will respond

> ** Tip:** Don't build an automated email or SMS verification system for this at personal scale. A manual check on the rare flagged order is faster to build and just as effective until your order volume makes manual review impractical.

---

## Common Mistakes

- Auto-rejecting every flagged order, which silently turns away real customers far more often than it stops fraud
- Not checking whether the payment provider's own fraud detection is enabled, then rebuilding a weaker version of what was already available
- Treating address mismatch as proof of fraud rather than one weak signal among several
- No way to review flagged orders at all — flags are added to the database but nothing in the admin surfaces them
- Overbuilding this module relative to actual order volume — a few dozen orders a month doesn't need automated fraud scoring, it needs five minutes of manual judgment per flagged order

---

## Security Checklist

- [ ] Payment provider's built-in fraud detection is confirmed enabled, not assumed
- [ ] Flags are soft signals stored on the order, not automatic rejections
- [ ] Flagged orders are visible somewhere you'll actually see them (admin dashboard, email alert) — not just a silent database field
- [ ] No fraud-flag logic blocks a real customer without a human reviewing first

---

## Validation Checklist

- [ ] Confirm in your payment provider's dashboard that fraud detection is active
- [ ] Place a test order with mismatched billing/shipping countries and confirm it's flagged, not blocked
- [ ] Confirm flagged orders are visible in your admin view, not buried in raw database fields
- [ ] Walk through your own manual review process once, end to end, so you know what you'd actually do if a real flag appeared

---

## AI Review Prompt

```
Review the fraud prevention logic in this e-commerce store. Check:

1. Are any of these flags configured to auto-reject orders rather than
   flag them for manual review?
2. Is the payment provider's built-in fraud detection actually being
   used, or is custom logic duplicating something already covered?
3. Are flagged orders actually surfaced somewhere visible, or just
   written to the database with no review path?
4. Is the complexity here proportionate to a personal store's order
   volume, or overbuilt?

Flag anything that risks rejecting legitimate customers automatically.
```

---

## What Comes Next

Phase 4 — Production Readiness — is complete. Your store is fast, monitored, backed up, and protected against the abuse patterns that actually target small stores. Next: **Phase 5 — Store Launch**, starting with **Privacy Policy** and the legal groundwork required before you can sell to real customers.
