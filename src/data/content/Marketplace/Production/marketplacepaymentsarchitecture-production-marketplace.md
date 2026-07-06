---
title: Payments Architecture
slug: payments-architecture
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 25-30 min
---

# Payments Architecture (Money Routing)

## The Most Dangerous Module

In a personal project, a payment bug is an annoyance. In a production marketplace, a payment bug is a financial catastrophe. If your database marks a transaction as paid, but the payment failed, you are liable for the missing funds.

You must architect your payments layer to be completely fault-tolerant. You must assume the network will fail, the database will lock, and users will refresh the page during checkout.

---

## The Stripe Connect Routing Models

You decided on Stripe Connect in the Tech Stack module. Now you must decide exactly how the money physically moves. 

| Routing Model | How It Works | The Production Use Case |
|---|---|---|
| **Destination Charges** | Buyer is charged. Funds are split automatically. Stripe handles refunds. | Default for 90% of marketplaces. Easiest to implement. You are liable for chargebacks. |
| **Separate Charges & Transfers** | Buyer is charged (funds go to your platform). You manually transfer a cut to the seller later. | Necessary if one buyer checkout involves multiple sellers (e.g., a "Cart" marketplace). |
| **Direct Charges** | Buyer is charged directly by the Seller. You take an application fee. | Seller is liable for chargebacks. Stripe fees are billed to the seller. |

> [!DECISION]
> Default to **Destination Charges** unless your marketplace requires a single shopping cart spanning multiple sellers. It significantly reduces your accounting and compliance burden.

---

## Architecting the Escrow Flow

In production, you never release funds to a seller the moment a buyer clicks "Purchase". You must hold the funds in Escrow to prevent fraud.

**The Production Escrow Architecture:**
1. **Authorization (`capture_method: manual`):** The buyer enters their card. Stripe puts a hold on the funds for up to 7 days. The buyer's bank shows the charge as "Pending."
2. **Fulfillment:** The seller delivers the good or service.
3. **Capture:** The buyer clicks "Confirm Delivery" (or 7 days pass). Your backend calls the Stripe Capture API. The funds physically move from the buyer's bank into Stripe Connect.
4. **Payout:** The funds settle into the seller's connected account based on their payout schedule (e.g., a 2-day rolling window).

> [!IMPORTANT]
> If a transaction is canceled during the Authorization window, you just cancel the hold. You pay $0 in Stripe fees. If you capture the funds immediately and refund them later, Stripe keeps the original 2.9% transaction fee, meaning you lose money on every refund.

---

## Idempotency: Preventing Double Charges

If a buyer clicks "Submit Order", and their cell service drops before your backend returns a success message, they will click "Submit Order" again. 

If your backend simply creates a new Stripe charge, you have just stolen money from the buyer.

**The Solution:** You must generate a unique `Idempotency Key` (usually a UUID) on the frontend when the checkout modal opens. Pass this key to Stripe on every charge attempt. If Stripe sees the same key twice within 24 hours, it will safely ignore the second request and return the result of the first one.

---

## Webhooks: The Source of Truth

Your database is not the source of truth for financial data. Stripe is. 

You must build a robust webhook ingestion pipeline. If Stripe successfully charges a card, it fires a `payment_intent.succeeded` webhook to your server. Your server listens for this webhook, verifies the cryptographic signature, and *then* updates your database to `PAID`. 

> [!CAUTION]
> Never update a database transaction to `PAID` based on a synchronous frontend callback. A malicious user can spoof a frontend success payload and trick your server into fulfilling an unpaid order. Always rely on signed webhooks.

---

## Do's and Don'ts of Production Payments

- **DO log every financial event.** Create an `audit_logs` table. Every time a transaction state changes (e.g., from `AUTHORIZED` to `CAPTURED`), log the timestamp, the user ID who triggered it, and the raw Stripe JSON payload. 
- **DON'T store credit card numbers.** Never let a credit card number touch your server or your database. Use Stripe Elements (frontend iFrames) so the card data goes directly from the buyer's browser to Stripe's PCI-compliant vaults.
- **DO map your chargeback liability.** Understand who pays the $15 penalty when a buyer issues a chargeback. If you use Destination Charges, your platform pays it, and you must build mechanisms to claw back those funds from the seller.
- **DON'T build custom seller dashboards early.** Use the Stripe-hosted Express Dashboard. Building a custom UI for sellers to view their tax documents and 1099s is a massive waste of Phase 2 engineering time.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Escrow Implementation:**

````prompt
Act as a Principal Payments Engineer. I am using Stripe Connect with Destination Charges on a Node.js backend. I need to hold funds in Escrow for up to 7 days before paying the seller. Provide the exact Node.js code to create a `PaymentIntent` with `capture_method: manual`, and the subsequent code required to Capture those funds and route them to the seller's connected account ID when fulfillment is verified.
````

> [!TIP]
> **Prompt 2 — Secure Webhook Ingestion:**

````prompt
I need to build a webhook listener for Stripe in my [Next.js/Node] application. Write the endpoint code that securely parses the raw body, verifies the `Stripe-Signature` header using my endpoint secret, and cleanly handles the `payment_intent.succeeded` and `charge.dispute.created` events. Include database transaction logic so that the update is atomic.
````

---

## Validating What AI Generates

- **Check for Idempotency Keys:** If the AI generates code to create a Stripe charge but omits the `idempotencyKey` header parameter, reject the code. It is not production-safe.
- **Verify frontend vs. backend secrets:** Ensure the AI is using the `sk_live_...` (Secret Key) only on the backend, and the `pk_live_...` (Publishable Key) on the frontend. Exposing the Secret Key will bankrupt your company.

---

## Implementation Checklist

- [ ] Decided on the Stripe Connect routing model (Destination Charges vs. Separate Charges).
- [ ] Architected the Escrow timeline (Manual Capture vs. Automatic Capture).
- [ ] Enforced Idempotency Keys on all mutating payment endpoints.
- [ ] Built and secured the Stripe Webhook ingestion pipeline.
- [ ] Defined the operational process for handling disputes and chargeback clawbacks.

---

## What's Next

Next: **Messaging System** — Transactions often require communication. We will now architect the messaging infrastructure, ensuring it is performant, scalable, and secure against platform leakage.
