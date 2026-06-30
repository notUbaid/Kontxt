---
title: Payments
slug: payments
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Payments

## Implementing What Payments Architecture Already Decided

Payments Architecture made every meaningful decision: Stripe Connect Express accounts, payout timing, fee structure, webhook handling. This module is where that becomes the actual checkout and payout experience a real buyer and seller interact with — built on the screen foundation from Frontend and the endpoint discipline from Backend.

If you find yourself reconsidering account type or payout timing here, stop and revisit Payments Architecture directly — don't redesign mid-implementation.

---

## Seller Onboarding: Make Express Setup Actually Smooth

Stripe's Express onboarding is hosted by Stripe, which means your job is mostly orchestration: generating the onboarding link, tracking completion status, and handling the return flow.

- [ ] Generate an Express account onboarding link when a user creates their first listing (the SellerProfile creation trigger from Auth Implementation)
- [ ] Store the Connect account ID on SellerProfile once created
- [ ] Track onboarding completion status — a seller with an incomplete Express account shouldn't be able to receive payouts yet
- [ ] Handle the return redirect from Stripe gracefully, with clear UI feedback either way

> ⚠️ **Common mistake:** Letting a listing go live before the seller's Express account onboarding is actually complete. If a sale happens before the account can receive funds, you've created exactly the kind of payment-succeeds-but-money-has-nowhere-to-go bug flagged in Demo Transactions. Gate "Active" listing status, or at minimum checkout availability, on Express onboarding completion.

---

## Checkout: The User-Facing Side of an Atomic Operation

Payments Architecture specified that Transaction and Listing status updates must happen as one atomic operation. Here's what that looks like from the checkout screen's perspective:

```
1. Buyer clicks "Buy" on an Active listing
2. Frontend calls checkout endpoint
3. Backend: charges buyer, applies platform fee split, updates
   Transaction status, updates Listing status — atomically
4. Frontend shows success only after backend confirms all of the
   above succeeded together
5. If any part fails, buyer sees a clear failure message and the
   listing remains Active and purchasable
```

> 💡 **Tip:** Never show a "purchase successful" UI state optimistically before the backend confirms the entire atomic operation completed. A frontend that shows success while the backend is still processing — or worse, failed — directly causes the confusion Demo Transactions was designed to catch before launch.

---

## Surfacing Fees Honestly

Your Cost Estimation module calculated your real take rate after Stripe's cut. The checkout and payout UI should reflect this transparently — sellers should see what they'll actually receive, not just the listing price.

| Shown To | What They See |
|---|---|
| Buyer | Total charge (listing price + any buyer-facing fees, if applicable) |
| Seller | Listing price, platform fee deducted, net payout amount |

> ✅ **Best practice:** Show the seller's net payout amount before they list, not just at sale time. A seller surprised by the fee deduction after a sale damages exactly the trust your Seller Journey module worked to establish during onboarding.

---

## Payout Status Visibility

Per the held-vs-immediate decision from Payments Architecture, sellers need to actually see where their money is — this is the implementation of that decision, not a new one.

| Transaction Status | Seller-Facing Payout Message |
|---|---|
| Payment Held | "Payment received, funds release on [condition]" |
| Completed | "Funds released to your account" |
| Disputed | "Payout paused pending dispute resolution" |
| Resolved – Refunded | "This transaction was refunded to the buyer" |

---

## Test Mode Discipline

Continue using Stripe test mode through this entire implementation — only switch to live mode once Demo Transactions-style testing has been re-run against the finished checkout and payout UI.

- [ ] Use Stripe test cards for every checkout test during development
- [ ] Verify webhook events fire correctly in test mode before considering this module complete
- [ ] Do not switch to live keys until Security (Phase 4) and a final pass of testing are complete

---

## AI Prompt: Implementing Checkout and Payout UI

```
I'm implementing the payments UI for a personal-scale marketplace
using Stripe Connect Express on [your stack]. My backend already
handles the atomic Transaction+Listing status update and fee split
(from Payments Architecture / Backend).

Build:
1. Express onboarding flow: link generation, completion tracking on
   SellerProfile, graceful return-redirect handling
2. A gate preventing checkout on listings where the seller's Express
   onboarding isn't complete
3. A checkout flow that only shows success after backend confirmation
   of the full atomic operation — no optimistic success states
4. A seller-facing payout status display matching these transaction
   states: [paste your Transaction status values], with honest
   messaging for held vs. released funds
5. A pre-listing fee preview showing the seller their net payout
   before they submit a listing

Use Stripe test mode throughout — flag if anything here would need
to change before going live.
```

---

## Common Mistake: Confusing "Payment Succeeded" With "Transaction Complete"

> ⚠️ A Stripe charge succeeding is one event among several that need to happen together — fee split, status updates, notification. Showing the buyer a success screen the moment Stripe confirms the charge, before your backend has finished updating Transaction and Listing status, risks a UI that says "success" while your database briefly (or permanently, if something fails) disagrees. Wait for your own backend's confirmation, not just Stripe's.

---

## What You Should Walk Away With

1. A smooth Express onboarding flow with completion tracking
2. Checkout gated on seller onboarding completion
3. A checkout UI that only confirms success after full atomic backend confirmation
4. Honest, status-matched payout visibility for sellers
5. Continued test-mode discipline, with live mode deferred until Phase 4 security review

Notifications, next, extends this same honesty principle — making sure both buyers and sellers are actually informed as these payment and listing state changes happen, not just able to check manually.
