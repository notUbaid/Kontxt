---
title: Fraud Prevention
slug: fraud-prevention
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Fraud Prevention

## Protecting the Business Logic

Security (WAFs, CSP) protects your servers. **Fraud Prevention** protects your money. 

In a production marketplace, fraudsters do not hack your database. They use your application exactly as designed, but with stolen credit cards, fake listings, or coordinated review rings. If your fraud rate exceeds 1% of GMV, Stripe will fine you, and Visa/Mastercard will ban your platform from the payment network permanently.

---

## Machine Learning Fraud Engines (Stripe Radar / Sift)

You cannot manually review every transaction at scale, and simple rule-based checks (e.g., "block transactions over $1,000") produce too many false positives, blocking legitimate buyers.

**The Production Standard:**
You must integrate a Machine Learning Fraud Engine like **Stripe Radar for Teams**, **Sift**, or **Sardine**.
These engines ingest hundreds of signals (IP distance from billing address, typing speed, email age) and return a Risk Score (`0-100`).
* **Score < 75:** Allow automatically.
* **Score 75 - 90:** Send to the Trust & Safety manual review queue (Escrow funds, do not release to seller).
* **Score > 90:** Block the transaction instantly.

---

## Device Fingerprinting

Fraudsters use residential proxies and VPNs to change their IP address on every request. Blocking an IP address is useless against a sophisticated attacker.

**The Defense Strategy:** Implement **Device Fingerprinting** (e.g., FingerprintJS).
This creates a unique hash of the buyer's browser, fonts, installed plugins, and hardware canvas. Even if the fraudster clears their cookies, uses incognito mode, and changes their IP, the device fingerprint remains the same. 
When a banned fraudster attempts to create a new account, the backend recognizes the fingerprint and immediately shadowbans them.

---

## 3D Secure (SCA) and Liability Shift

When a buyer purchases an item using a stolen credit card, the true owner will issue a Chargeback. By default, the marketplace loses the money *and* pays a $15 chargeback penalty fee.

**The Production Rule:**
Enforce **3D Secure (Strong Customer Authentication)** for high-risk transactions.
When 3DS is triggered, the buyer's bank pops up a window requiring them to enter an SMS code or approve the charge in their banking app.
If a transaction is 3DS authenticated, the **Chargeback Liability Shifts to the Bank**. Even if it turns out to be fraud, your marketplace keeps the money, and you do not pay the penalty fee.

---

## Velocity Checks

Fraudsters often buy lists of 10,000 stolen credit cards and use your checkout endpoint to "test" which ones are still active by attempting $1 purchases.

**The Production Defense:**
Implement strict **Velocity Checks** at the application layer.
If a user account, IP, or Device Fingerprint experiences 3 failed payment attempts within 10 minutes, automatically lock the account and block the checkout endpoint for 24 hours.

---

## Do's and Don'ts of Production Fraud Prevention

- **DO hold funds in Escrow.** Never route money instantly to a seller's bank account. Hold the funds in Stripe Connect for at least 7 days (or until the buyer confirms delivery). If the seller is a scammer, you can refund the buyer without taking a loss.
- **DON'T block VPNs globally.** Banning all VPN IP addresses will block a massive segment of legitimate, privacy-conscious buyers. Use fraud scores, not blanket IP bans.
- **DO require CVV and Zip Code.** Ensure Stripe is configured to decline charges that fail CVC/CVV or Zip Code verification. Attempting to process these charges is a massive fraud indicator.
- **DON'T automate permanent bans based on ML alone.** Machine Learning engines make mistakes. High risk scores should route to human review queues. Auto-block only at the most extreme confidence levels.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Stripe Radar Webhook:**

````prompt
Act as a Risk Engineer. Write a Next.js API route that handles the Stripe `radar.early_fraud_warning.created` webhook. The function must look up the associated `PaymentIntent` and internal `Order`, update the order status to `FROZEN_PENDING_REVIEW`, and trigger a PagerDuty/Slack alert for the Trust & Safety team. Ensure the webhook signature is cryptographically verified using `stripe.webhooks.constructEvent`.
````

> [!TIP]
> **Prompt 2 — Velocity Check Middleware:**

````prompt
Write a Node.js middleware that implements a Payment Velocity Check using Redis. It should track `payment_failed` events keyed by the user's `device_fingerprint`. If the count exceeds 3 failures within a 15-minute rolling window, it must return a `403 Forbidden` and log a high-severity security event to Datadog.
````

---

## Validating What AI Generates

- **Check for synchronous blocking:** If AI generates code that calls a third-party fraud API (like Sift) synchronously *during* the checkout request, ensure it has a strict 500ms timeout. If the fraud API goes down, the checkout should fail-open or route to manual review, rather than crashing the checkout flow entirely.
- **Verify Escrow Logic:** If AI generates a payment flow that uses Stripe `transfers` immediately upon checkout success, reject it. Production marketplaces must use `destination_charges` or separate Transfers held until fulfillment.

---

## Implementation Checklist

- [ ] Integrated a Machine Learning fraud engine (Stripe Radar, Sift) to score every transaction dynamically.
- [ ] Deployed Device Fingerprinting (FingerprintJS) to track and block sophisticated fraudsters across IP changes.
- [ ] Enforced 3D Secure (SCA) for high-value or high-risk transactions to shift chargeback liability to the issuer.
- [ ] Configured strict Velocity Checks to prevent credit card testing attacks on the checkout endpoint.
- [ ] Architected the payout flow to hold funds in Escrow until delivery is confirmed, protecting platform liquidity.

---

## What's Next

Next: **Scalability Planning** — Your platform is secure, fast, and protected from fraud. But what happens when you go viral? We will architect the infrastructure to scale horizontally, handling 10x or 100x traffic spikes without manual intervention.
