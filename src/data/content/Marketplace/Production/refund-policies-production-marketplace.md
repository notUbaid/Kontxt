---
title: Refund Policies
slug: refund-policies
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Refund Policies & Chargeback Defense

## The Financial Reality of Marketplaces

In a SaaS business, if a user demands a refund, you click a button and return $20 from your own bank account. 

In a marketplace, the money doesn't belong to you. If a buyer pays $1,000 for a camera, you take a $100 fee, and pass $900 to the seller. If the buyer demands a refund a week later, **where does the $1,000 come from?**
If you already paid the seller, and they refuse to give the $900 back, the platform (you) takes a catastrophic $900 loss.

A production refund policy is not just a block of text on a website. It is a strictly engineered financial workflow designed to protect the platform's capital.

---

## Escrow and Payout Holds (The Ultimate Defense)

The only way to guarantee a refund is to hold the money until the transaction is definitively successful.

**The Production Standard:**
You must implement an **Escrow-like Payout Delay**.
1. The buyer pays $1,000 via Stripe. The money sits in your Stripe Platform account.
2. The seller ships the item.
3. The item is marked as `Delivered` (via an API integration with USPS/FedEx).
4. **The Buyer Inspection Window:** The buyer has exactly 48 hours to inspect the item and report an issue.
5. If 48 hours pass with no dispute, the $900 is automatically released to the Seller's bank account via Stripe Connect.

If a dispute is raised *during* the 48 hours, the funds remain frozen until your admin team resolves the case.

---

## Chargebacks (The Existential Threat)

If a buyer bypasses your refund policy and calls their credit card company to report the charge as "Fraudulent," you are hit with a **Chargeback**.
* You instantly lose the $1,000.
* You are hit with a $15-$25 penalty fee by Visa/Mastercard.
* If your chargeback rate exceeds 1%, Stripe will permanently ban your account and seize your funds.

**The Production Defense:**
1. **Prevent Fraud Upfront:** Use **Stripe Radar** to automatically block transactions from high-risk IP addresses or cards with failed CVC/Zip checks.
2. **Dynamic Descriptors:** Ensure the charge on the buyer's bank statement explicitly mentions your marketplace AND the seller (e.g., `MKTPLC* SELLER_NAME`). Vague descriptors cause "friendly fraud" chargebacks.
3. **Automated Evidence Submission:** When a chargeback occurs, you must automatically respond via the Stripe API with evidence (delivery tracking numbers, chat logs showing the buyer was happy) to win the dispute.

---

## The Dispute Resolution Flow

When the buyer clicks "Report Issue" during the 48-hour window, you must enforce a structured resolution process.

1. **The Mediation Phase:** Force the buyer and seller into a dedicated "Dispute Chat" for 48 hours. Provide buttons for the seller to "Offer Partial Refund" or "Accept Return." Let them resolve it without your intervention.
2. **The Escalation Phase:** If they cannot agree, the case escalates to your Support Team.
3. **The Final Ruling:** Your team reviews the evidence (photos of the damaged item vs. the original listing photos). You click "Rule in favor of Buyer" (triggering the refund) or "Rule in favor of Seller" (releasing the payout). This decision must be final and binding per your Terms of Service.

---

## Do's and Don'ts of Production Refunds

- **DO require photo evidence immediately.** A buyer cannot just say "it's broken." The "Request Refund" UI must mandate uploading at least 2 photos of the damage. This eliminates 50% of frivolous requests.
- **DON'T refund the platform fee.** When a transaction is refunded, Stripe does not refund the processing fees. Your policy must state that platform fees are non-refundable, and you must code your backend to only refund the seller's portion.
- **DO handle return shipping logistics.** If you rule in favor of the buyer, do not just send them the money. You must hold the funds until the tracking number proves the item was successfully shipped *back* to the seller.
- **DON'T rely on manual payouts.** Payouts and clawbacks must be completely automated via Stripe Connect webhooks. Humans make rounding errors.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Escrow/Payout Hold Logic:**

````prompt
Act as a Payments Engineer. Write a Next.js API route that listens for a Shippo/EasyPost webhook indicating a package was marked `DELIVERED`. When received, update the `Order` status in Postgres to `AWAITING_INSPECTION`, and schedule an Inngest background job to run exactly 48 hours later. The background job must check if a `Dispute` exists for the order; if not, it should trigger the Stripe Connect Transfer to release the funds to the seller.
````

> [!TIP]
> **Prompt 2 — Chargeback Defense Evidence:**

````prompt
Write a Node.js script using the Stripe SDK that listens for the `charge.dispute.created` webhook. The script should automatically gather evidence for the dispute by fetching the related `Order`'s shipping tracking number and the user's IP address from the database, and submit this evidence directly to Stripe using `stripe.disputes.update()` to fight the chargeback automatically.
````

---

## Validating What AI Generates

- **Check for immediate payouts:** If AI generates code that triggers a `stripe.transfers.create()` the moment a buyer checks out, reject it immediately. This breaks the Escrow model and guarantees you will take a massive financial loss on the first refund request.
- **Verify integer math:** If AI writes code calculating refunds using floating-point math (e.g., `amount = 10.50 * 0.9`), fix it. All financial calculations must be done in the smallest currency unit (e.g., cents: `1050`) to avoid rounding errors that crash the Stripe API.

---

## Implementation Checklist

- [ ] Engineered an Escrow-style payout delay, holding funds in the platform account until a strict 48-hour buyer inspection window closes.
- [ ] Configured Stripe Radar and strict CVC/AVS checks to block high-risk transactions and prevent chargebacks.
- [ ] Built a structured Dispute Resolution UI requiring mandatory photo evidence for all refund requests.
- [ ] Automated the collection and submission of shipping/tracking evidence to fight chargebacks via the Stripe API.
- [ ] Ensured the Terms of Service explicitly states that platform decisions on disputes are final and binding.

---

## What's Next

Next: **Launch Checklist** — The code is written. The policies are in place. The money is secure. Now, we execute the final engineering and operational checks required to safely push a production marketplace to the public.
