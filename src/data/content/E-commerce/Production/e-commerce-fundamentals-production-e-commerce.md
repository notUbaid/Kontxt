---
title: E-Commerce Fundamentals
slug: e-commerce-fundamentals
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# E-Commerce Fundamentals

Before you architect database schemas or payment integrations, you must understand how e-commerce functions as a distributed system. 

At production scale, a store is not "a website that sells things." It is a complex state machine managing money, physical inventory, and compliance obligations across multiple third-party systems concurrently. When you process 100 orders an hour, the naive assumptions of a side project—that payments always succeed instantly, that inventory is a static number, that webhooks arrive in order—will cause catastrophic financial errors.

This module builds the production mental model required for Phase 2 architecture.

---

## The Distributed Transaction Problem

A single customer purchase touches at least three independent systems: your database, the payment processor (e.g., Stripe), and the fulfillment provider (e.g., a 3PL). 

Because these systems are separate, **there is no such thing as a single database transaction for an e-commerce order.** 

You must design for partial failures:
- What happens if the payment succeeds, but your database crashes before saving the order?
- What happens if the order saves, but the inventory decrement fails?
- What happens if Stripe sends the webhook twice?

**The Production Solution: Idempotency & Webhooks**
You cannot rely on client-side API calls to finalize orders. The client can close their browser or lose connection. 
1. The client initiates the intent.
2. The payment provider processes the charge.
3. The payment provider fires an asynchronous webhook to your server.
4. Your server processes the webhook **idempotently** (ensuring that processing the same webhook twice does not create two orders or double-decrement inventory).

---

## Money Flow & Fraud

Understanding how money actually moves dictates your risk exposure.

| State | What It Means | Risk Level |
|---|---|---|
| **Authorization** | Card is valid, funds are held by the issuing bank. | Low. No money has moved yet. |
| **Capture** | Funds are moved from the issuing bank to the payment processor. | High. You are now liable for chargebacks. |
| **Settlement** | Funds reach your actual bank account. | Zero. The money is yours (barring disputes). |

**Auth vs. Capture Strategies:**
- **Standard (Auto-Capture):** Money is captured immediately at checkout. Best for digital goods or items that ship instantly.
- **Delayed Capture (Auth-and-Capture):** You authorize the card at checkout, but only *capture* the funds when the item actually ships. **This is mandatory for high-volume physical goods.** If you capture funds for backordered items and fail to ship, you will face massive chargeback ratios and processor bans.

**Card Testing Fraud:**
Botnets will use your checkout to test stolen credit cards by making hundreds of $1 purchases. At production scale, you *must* implement rate-limiting on your checkout endpoints and use fraud detection (like Stripe Radar) to block high-risk IPs.

---

## Inventory: Hard vs. Soft Allocation

Inventory is not just an integer column in a database. It is a highly concurrent state machine.

**The Race Condition:**
If you have 1 unit left, and 50 people add it to their cart during a flash sale, who gets it?

| Approach | How It Works | Tradeoff |
|---|---|---|
| **Soft Allocation (First to Pay)** | Inventory is only decremented upon successful payment. | High oversell risk if two payments process at the exact same millisecond. Results in forced refunds. |
| **Hard Allocation (Cart Reservation)** | Inventory is locked for 10 minutes when added to the cart. | Requires a complex Redis layer to handle expirations. Can be abused by bots locking up all stock. |
| **Checkout Reservation** | Inventory is locked only when the user enters the payment step. | The best production compromise. Short lock window, prevents double-charging. |

**The Production Standard:**
Use a database transaction with a row-level lock (`SELECT FOR UPDATE` in Postgres) or an atomic Redis decrement script to verify and deduct inventory at the exact moment the payment intent is created, *not* when the user adds to cart.

---

## Order State Machines

An order is a workflow with strictly enforced, unidirectional transitions. 

```text
pending_payment → processing → fulfilled → shipped → delivered
                      ↘ payment_failed       ↘ returned
                                 ↘ refunded (post-shipment)
```

**Why strict transitions matter:**
A `refunded` order cannot move back to `processing`. A `shipped` order cannot move back to `pending_payment`. If your API allows arbitrary updates to the `status` column, a race condition or a customer service rep's mistake will create impossible states. This destroys financial reporting and breaks ERP integrations.

Your backend must enforce valid state transitions using a state machine pattern, rejecting any invalid updates with a 400 Bad Request.

---

## Tax Nexus & Compliance

At production scale, tax is a legal liability, not a UI feature.

**Economic Nexus:**
In the US, if you sell more than $100,000 (or 200 transactions) into a specific state within a year, you establish "Economic Nexus" and are legally required to collect and remit sales tax for that state. Similar rules (VAT thresholds) exist in the EU and UK.

**Production Requirements:**
1. **Never calculate tax manually.** Use an API like TaxJar, Avalara, or Stripe Tax.
2. **Validate addresses.** A typo in a ZIP code can change the local tax rate. Use an address validation API (like Lob or Google Maps) before calculating tax.
3. **Store the tax snapshot.** When an order is placed, store the exact tax rate and amount calculated *at that millisecond*. Do not rely on dynamic recalculation for past orders.

---

## AI Prompt — Map Your E-Commerce System

```prompt
I am architecting the core state machines for a production e-commerce store.

Store Profile:
- Business Model: [Physical Goods / Digital / Subscription / Dropshipping]
- Average Order Value: [$XXX]
- Peak Concurrency: [e.g., 500 simultaneous checkouts during drops]
- Payment Processor: [Stripe / Adyen / Braintree]

Map out the complete system I need to build:

1. **Order State Machine:** List all exact order statuses, the strict valid transitions between them, and what triggers each transition.
2. **Inventory Strategy:** Recommend an inventory allocation strategy (Soft, Checkout, or Hard) based on my peak concurrency, and write the pseudocode/SQL for the decrement logic.
3. **Auth & Capture:** Should I use Auto-Capture or Delayed Capture based on my fulfillment model? Why?
4. **Webhook Idempotency:** Write the exact architecture for how I should process webhooks to guarantee an order is never created twice, even if the webhook is received three times simultaneously.
5. **Tax Strategy:** What are my immediate compliance risks based on this model, and what tooling should I integrate?

Be specific to my high-concurrency needs. Do not provide generic advice.
```

---

## Fundamentals Checklist

- [ ] Webhook idempotency strategy defined (using unique event IDs)
- [ ] Auth vs. Capture payment strategy selected based on fulfillment timelines
- [ ] Inventory race condition risk mitigated via atomic database locks or Redis
- [ ] Order states defined as a strict state machine with enforced transitions
- [ ] Tax calculation outsourced to a certified API (Stripe Tax, Avalara, TaxJar)
- [ ] Card testing fraud mitigation planned (rate limiting + fraud scoring)
- [ ] Price re-validated server-side before payment intent creation
- [ ] Historical data immutability planned (snapshotting prices and taxes on the order record)
