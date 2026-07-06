---
title: Buyer Onboarding
slug: buyer-onboarding
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Buyer Onboarding (Demand Side)

## The War Against Friction

Sellers will endure friction because you are offering them money. Buyers will tolerate zero friction because you are asking them to spend money.

In a production marketplace, every single click between a buyer landing on a listing and completing the payment reduces your conversion rate by 20%. If you require a buyer to create an account, verify their email, and fill out a profile before they can add an item to their cart, your marketplace will die.

---

## Guest Checkout (Mandatory)

You do not need a buyer's password to take their money. You only need their email and their credit card.

**The Production Standard:**
You must implement **Guest Checkout**.
1. The buyer clicks "Buy Now".
2. They are taken directly to a Stripe Checkout page (or an embedded Stripe Element).
3. They enter their email, shipping address, and payment details.
4. The payment succeeds.
5. *Only then*, on the "Thank You" page, do you say: *"Save your details for next time? Create a password."*

This reverses the friction. You secure the revenue first, and ask for the account creation second.

---

## One-Click Digital Wallets

Typing a 16-digit credit card number on a mobile phone is a conversion killer. 

**The Production Strategy:**
Integrate **Apple Pay**, **Google Pay**, and **Link by Stripe**.
When a mobile user clicks "Buy Now", the Apple Pay sheet slides up. They double-click the side button on their iPhone, FaceID verifies them, and the transaction is complete in 3 seconds. The shipping address and email are automatically passed to your backend.

---

## Social Proof (Building Instant Trust)

A buyer onboarding to your platform does not trust you yet. They assume every listing is a scam until proven otherwise.

**The Production Defense:**
You must architect **Social Proof** into the core UI of every listing.
* **Verified Badges:** Show a distinct checkmark next to sellers who have completed Stripe Identity KYC.
* **Aggregate Ratings:** Display the seller's star rating and total review count immediately below the listing title.
* **Scarcity/Urgency Indicators:** "3 people have this in their cart" or "Last purchased 2 hours ago." (Do not fake these; use real Redis counters).

---

## Abandoned Cart Recovery

60% of buyers will add an item to their cart, reach the checkout page, and leave. 

**The Production Recovery Loop:**
1. Because you ask for the buyer's email at the *very first step* of the checkout flow, you capture it even if they don't complete the payment.
2. A background queue (e.g., Inngest or AWS SQS) schedules a task for 4 hours later.
3. If the database shows the `Order` is still `PENDING`, the queue triggers an email (SendGrid) or SMS (Twilio): *"You left something behind! Complete your purchase of [Item Name]."*
4. This single automated loop recovers 10-15% of lost revenue.

---

## Do's and Don'ts of Production Buyer Onboarding

- **DO allow unrestricted browsing.** Never hide your marketplace catalog behind a login wall (like Pinterest). Buyers must see the value before they will ever consider signing up.
- **DON'T ask for unnecessary data.** If you are selling digital goods, do not ask for a physical shipping address. Every input field is a barrier to conversion.
- **DO provide clear guarantees.** Right below the "Buy Now" button, include a "Money Back Guarantee" or "Secure Checkout" badge. Explain exactly how disputes are handled.
- **DON'T redirect buyers to a generic dashboard.** If they sign up in order to message a seller, the successful signup redirect must take them exactly back to that specific seller's message thread, pre-populated with their draft.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Stripe Express/Link Checkout:**

````prompt
Act as a Payment Integrations Engineer. Write a React component using `@stripe/react-stripe-js` that renders the `Express Checkout Element`. It must dynamically support Apple Pay and Google Pay. Ensure the `onConfirm` handler properly captures the shipping address provided by the digital wallet and passes it to the backend `PaymentIntent` confirmation endpoint.
````

> [!TIP]
> **Prompt 2 — Abandoned Cart Background Job:**

````prompt
Write an Inngest background function in Node.js that handles Abandoned Cart Recovery. It should be triggered by a `checkout.started` event, wait for 4 hours using `step.sleep()`, and then query the database to check if the `Order` status is still `PENDING`. If it is, send a dynamic email via the SendGrid API containing the item name, price, and a direct link to resume the checkout session.
````

---

## Validating What AI Generates

- **Check for account walls:** If AI generates a `requireAuth` middleware and applies it to the `POST /api/checkout` endpoint, reject it. The checkout endpoint must support guest users passing an email address in the payload.
- **Verify Sleep functions:** If AI uses a `setTimeout()` to wait 4 hours for an abandoned cart email, correct it immediately. Node.js `setTimeout` does not survive server restarts. It must use a persistent queue or a scheduler like Inngest/Upstash QStash.

---

## Implementation Checklist

- [ ] Implemented Guest Checkout, allowing buyers to complete purchases without creating an account first.
- [ ] Integrated Apple Pay, Google Pay, and Stripe Link to enable 3-second mobile checkouts.
- [ ] Embedded Social Proof (Verified Seller badges, real-time cart counters) directly into the listing UI to build instant trust.
- [ ] Engineered an Abandoned Cart Recovery loop using a persistent background queue to email buyers who drop off.
- [ ] Ensured the Post-Checkout flow smoothly transitions the guest buyer into creating a password to track their order.

---

## What's Next

Next: **Analytics Setup** — You have optimized the funnels, but without data, you are flying blind. We will architect a production-grade analytics pipeline (PostHog/Mixpanel) to mathematically measure every drop-off point and prove your marketplace is growing.
