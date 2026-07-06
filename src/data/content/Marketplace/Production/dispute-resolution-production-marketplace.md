---
title: Dispute Resolution
slug: dispute-resolution
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Dispute Resolution (Chargeback Architecture)

## Why Disputes Are an Engineering Problem

In a personal project, a dispute means a user emails you and you log into the Stripe Dashboard to click "Refund." In a production marketplace, disputes are algorithmic events. 

When a transaction goes bad, buyers don't always politely ask for a refund; they call their bank and issue a **Chargeback**. When a chargeback occurs, Stripe immediately pulls the funds (plus a $15 fee) from your account, and a ticking clock begins. If you do not submit structured evidence within a strict timeframe, you lose the money permanently.

Your architecture must automate evidence collection and provide an admin interface for rapid mediation.

---

## The Dispute State Machine

A dispute is a complex branch off your primary Transaction state machine. It can be triggered internally (a user clicks "Report Issue") or externally (a Stripe Webhook fires `charge.dispute.created`).

**The Database States:**
1. `DISPUTE_OPENED`: The Escrow timer pauses. Funds are frozen.
2. `EVIDENCE_SUBMITTED`: Automated logs are pushed to Stripe via API.
3. `UNDER_REVIEW`: Waiting for the bank's decision (can take 60 days).
4. `RESOLVED_PLATFORM_WON`: The bank sided with you. Funds are released to the Seller.
5. `RESOLVED_PLATFORM_LOST`: The bank sided with the Buyer. Funds are clawed back.

> [!CAUTION]
> If you are using Stripe Connect Destination Charges, your platform is financially liable for the chargeback by default. You must engineer a mechanism to claw back funds from the Seller's future payouts if you lose the dispute.

---

## Automated Evidence Collection

When a dispute opens, you have roughly 72 hours to compile evidence. Doing this manually for every dispute will require a massive Trust & Safety team. You must automate it.

Your backend must compile a JSON payload for the Stripe Disputes API containing:
* **Fulfillment Proof:** The FedEx tracking number or digital access logs.
* **Customer Communication:** An export of the Messages Thread tied to the transaction.
* **IP & Fingerprint:** The IP address logged during checkout (proving the buyer actually made the purchase).
* **TOS Agreement:** A timestamp of when the buyer checked the "I agree to the Terms of Service" box.

---

## The Admin Mediation Dashboard

Internal disputes (before a bank gets involved) require human mediation. You must build an internal Admin UI that aggregates data from across your micro-domains.

**Required Admin Features:**
- **The Consolidated View:** An admin must see the Transaction Details, the linked Message Thread, and the User Trust Scores on a single screen.
- **Action Buttons (Mutations):**
  - `Issue Full Refund` (Calls Stripe API to refund buyer, cancels Escrow).
  - `Issue Partial Refund` (Splits the Escrow manually).
  - `Release to Seller` (Overrules the buyer and forces the Escrow payout).
- **Account Action:** If the admin determines one party is committing fraud, the UI must have a one-click button to update the `User.account_status` to `BANNED`.

---

## Do's and Don'ts of Production Disputes

- **DO pause the Escrow timer immediately.** If a dispute opens internally, your CRON job that pays out sellers must skip that transaction until the dispute is resolved.
- **DON'T try to build a custom external dispute flow.** Do not build a UI where the buyer and seller argue with each other in a special "Dispute Modal." Just point them to the existing Message Thread for the transaction, and have an Admin review the thread.
- **DO listen for Stripe Webhooks.** A buyer can initiate a chargeback 3 months after a transaction is completed. Your system must listen for `charge.dispute.created`, find the historical transaction, and update its status.
- **DON'T issue a manual refund if a chargeback is open.** If a bank has initiated a chargeback, the money is already gone. If you click "Refund" in your admin dashboard, you will double-refund the buyer.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Stripe Dispute API Evidence Builder:**

````prompt
Act as a Senior Backend Engineer. I am using Node.js and Stripe. Write the backend logic to automatically respond to a `charge.dispute.created` webhook. The script must query my database for the transaction's shipping tracking number, the buyer's IP address, and the timestamp of purchase, format it according to Stripe's Evidence Object schema, and push it back to the Stripe API.
````

> [!TIP]
> **Prompt 2 — Escrow Pause Logic:**

````prompt
I have a CRON job that runs daily to payout all `Transactions` that are older than 7 days. Write the SQL or Prisma query that selects the eligible transactions, explicitly ensuring that any transaction with a status of `DISPUTED` or `UNDER_REVIEW` is skipped and its funds remain locked in Escrow.
````

---

## Validating What AI Generates

- **Verify webhook payload handling:** If the AI writes webhook logic, ensure it is extracting the `charge_id` or `payment_intent` from the Stripe event, and then using that to query your database. It cannot assume your internal `transaction_id` matches Stripe's ID unless you specifically mapped them.
- **Check for Double-Refund logic:** Ensure any Admin Dashboard mutations check the Stripe API to see if a chargeback is already in progress before executing a refund.

---

## Implementation Checklist

- [ ] Mapped the Dispute State Machine (`DISPUTED`, `UNDER_REVIEW`, `RESOLVED`).
- [ ] Architected the Webhook listener for `charge.dispute.created` events.
- [ ] Built the automated evidence collection script for the Stripe API.
- [ ] Designed the internal Admin Dashboard with mutations for Full, Partial, and Denied refunds.
- [ ] Added strict Escrow-pause logic to your payout CRON jobs.

---

## What's Next

Phase 2 is now complete. You have architected the exact database schemas, tech stack, and state machines required to process transactions at scale.

Next: **Phase 3: Development** — It is time to write the code. We will transition from architectural planning to the concrete implementation of Authentication, the Database, and the Frontend.
