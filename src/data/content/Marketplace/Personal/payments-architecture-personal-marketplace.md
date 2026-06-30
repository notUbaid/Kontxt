---
title: Payments Architecture
slug: payments-architecture
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 25–30 min
---

# Payments Architecture

## The Module Where Mistakes Cost Real Money

Everything before this module has been about trust, structure, and discovery. This one moves real currency between real people. Bugs here aren't cosmetic — they're refunds you owe, sellers who don't get paid, or money stuck in limbo. Take this module more seriously than any other in Phase 2.

The good news: you already decided to use Stripe Connect in Tech Stack Selection, specifically because it's purpose-built for the exact problem a marketplace has — splitting one payment between a platform and a seller.

---

## Why Marketplaces Can't Just Use "Regular" Stripe

A normal e-commerce site collects payment and keeps all of it. A marketplace has three parties in every transaction: the buyer, the seller, and you (taking a fee). Stripe Connect exists specifically to handle this split — without it, you'd be manually calculating payouts and wiring money to sellers yourself, which is both error-prone and likely a regulatory problem (you'd be acting as an unlicensed money transmitter).

| Without Stripe Connect | With Stripe Connect |
|---|---|
| You collect 100%, then manually pay sellers | Stripe splits the payment automatically at the point of sale |
| You hold seller funds — real liability | Funds route directly to the seller's connected account |
| You handle tax reporting for sellers yourself | Stripe handles much of this compliance burden |

---

## Connect Account Types: Pick the Right One Now

This is a foundational choice — switching later means re-onboarding every seller.

| Account Type | Seller Experience | Fits When |
|---|---|---|
| **Standard** | Seller has a full, independent Stripe account, manages their own dashboard | Sellers are more like independent businesses |
| **Express** | Lightweight onboarding, Stripe-hosted dashboard, you control more of the experience | Best fit for most personal-mode peer-to-peer marketplaces |
| **Custom** | You build the entire seller-facing payment UI yourself | Avoid at personal-mode scale — significant engineering and compliance overhead |

> ✅ **Best practice for personal mode:** Use **Express accounts**. Onboarding is fast (a few minutes), Stripe handles the compliance-heavy parts, and it matches the low-friction seller onboarding goal from your Seller Journey module. Custom accounts solve a problem — full UI control — that you don't have a use case for yet.

---

## The Payment Flow, Step by Step

```
1. Buyer initiates checkout on a Listing (status: Active)
2. Payment is charged to buyer, held by Stripe
3. Platform fee is calculated and split
4. Funds are routed to seller's Express account (per your payout
   timing decision below)
5. Transaction status updates: Initiated → Payment Held → Completed
6. Listing status updates: Active → Sold/Completed
```

> 💡 **Tip:** Notice this touches three entities from your Architecture Fundamentals map at once — Transaction, Listing, and the User/SellerProfile holding the Connect account ID. This is exactly the kind of multi-entity operation that needs to succeed or fail as a single unit (a database transaction), not partially complete. If the Listing status updates but the payment fails, you have a sold-but-unpaid listing — a real bug class to explicitly test for.

---

## Payout Timing: Hold or Release Immediately?

This decision directly implements the cancellation/refund rule from your Marketplace Policies module.

| Approach | How It Works | Fits When |
|---|---|---|
| **Immediate release** | Seller gets funds as soon as payment clears | Low-risk, digital, or low-value transactions |
| **Delayed/held release** | Funds held until buyer confirms receipt or a time window passes | Physical goods, services, or any transaction where "buyer received nothing" disputes are realistic |

> ⚠️ **Common mistake:** Releasing funds immediately on a marketplace where physical handoff or service delivery happens after payment. If a transaction goes wrong, you have no funds left to refund from — you'd be refunding the buyer out of your own pocket while the seller already has the money. Match this decision to your Trust & Safety risk profile: physical/in-person transactions should default to held release.

---

## Where the Platform Fee Lives

Your Cost Estimation module already calculated your net take rate after Stripe's cut. This is where that number becomes code, not just a spreadsheet line.

- [ ] Confirm your platform fee percentage (decided in Revenue Model, validated in Cost Estimation)
- [ ] Configure Stripe Connect's application fee parameter to take this cut automatically at the point of charge
- [ ] Never calculate and transfer the fee manually after the fact — let Stripe split it atomically at charge time

---

## Refunds and Disputes: The Code Path, Not Just the Policy

Your Marketplace Policies module defined the rule ("resolve directly within 48 hours, then contact you for mediation"). This is where that rule needs an actual implementation path, however minimal:

| Scenario | What Needs to Exist |
|---|---|
| Buyer requests refund, seller agrees | A refund action that reverses the Stripe charge and updates Transaction status to "Refunded" |
| Dispute, unresolved after 48 hours | A flag/status that surfaces it to you for manual mediation — doesn't need automation, just visibility |
| Stripe-side chargeback | A webhook handler that updates your Transaction status when Stripe notifies you — don't let your database silently disagree with Stripe's record |

> ⚠️ Webhooks aren't optional. Stripe is the source of truth for payment state — if your app doesn't listen for and handle Stripe webhook events, your database can drift out of sync with what actually happened to the money. Build webhook handling now, not as a "later" item.

---

## AI Prompt: Implementing Your Payment Flow

```
I'm building a personal-scale marketplace for [your niche] using
Stripe Connect Express accounts on [your stack].

Platform fee: [your %]
Payout timing: [immediate / held until confirmation]
Transaction risk profile: [from your Trust & Safety module]

Implement:
1. Express account onboarding for sellers (link creation, status
   tracking on SellerProfile)
2. Checkout flow that charges the buyer and applies my platform fee
   via Stripe's application fee parameter
3. Transaction status updates (Initiated → Payment Held → Completed)
   wrapped in a single atomic operation with the Listing status update
4. A webhook handler for the key Stripe events I need to listen for
   (charge succeeded, refund, dispute/chargeback) — tell me which
   events specifically and why

Flag anywhere this flow assumes immediate release when held release
would be safer given my risk profile.
```

---

## Common Mistake: Testing Only the Happy Path

> ⚠️ It's easy to test "payment succeeds, everything works" and call payments done. The dangerous bugs live in the failure paths: payment fails after listing is marked sold, webhook arrives out of order, seller's Express account isn't fully verified yet when a sale happens. Explicitly test what happens when each step in the flow fails, not just when it all goes right — this is the one area of your marketplace where an untested edge case has a direct financial cost.

---

## What You Should Walk Away With

1. Stripe Connect Express accounts integrated for seller onboarding
2. A confirmed payout timing decision matched to your risk profile
3. Platform fee applied automatically via Stripe's split, not manual calculation
4. Webhook handling for charge, refund, and dispute events
5. Transaction and Listing status updates treated as one atomic operation

This is the most consequential module in Phase 2 to get right before Phase 3 development begins. Messaging System, the next module, is lower-stakes by comparison — but builds on the same Transaction entity you've now fully defined here.
