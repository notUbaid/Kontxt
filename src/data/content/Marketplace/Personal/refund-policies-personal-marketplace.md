---
title: Refund Policies
slug: refund-policies
phase: Phase 5
mode: personal
projectType: marketplace
estimatedTime: 15-20 min
---

# Refund Policies

Legal Policies defined the rule in writing. This module turns that rule into something that actually works inside Stripe Connect or whatever payment processor you're using — because a refund policy that doesn't match how money actually flows between buyer, seller, and platform is a policy you can't honor when someone invokes it.

## The Decision You're Actually Making

Not "what's a fair refund window." It's: **when a refund happens, who actually loses the money — the seller, the platform, or do we split it — and does our payment integration even support executing that decision?**

This is where marketplace refunds get genuinely harder than single-seller app refunds: there are three parties, not two, and the money has already moved through your platform to someone else's account.

## Why Marketplace Refunds Are Structurally Different

| Single-seller app | Marketplace |
|---|---|
| You refund from your own Stripe balance | The seller already received their cut — does it come back from them? |
| One party to satisfy | Buyer wants money back, seller may dispute that they did anything wrong |
| Full platform control over the decision | Platform is often mediating a disagreement between two other parties |

> **️ Warning:** If your payment architecture already paid out the seller's share before a refund is requested, you need a mechanism to claw that back (or absorb the loss yourself) — this has to be designed into your payment flow, not improvised after the first dispute arrives. Check this now, before it's a live problem with real money already moved.

## Decision: Who Bears the Cost of a Refund?

| Approach | How it works | Best for |
|---|---|---|
| Seller bears it | Refund reverses the seller's payout, or is deducted from their next payout | Most common — keeps platform financially neutral |
| Platform absorbs it | You eat the cost to keep the experience smooth | Rare, deliberate cases — e.g. building trust early, or platform error |
| Split based on fault | Refund cost shared based on dispute outcome | More complex, usually only worth it once disputes are frequent enough to justify the logic |

> ** Best Practice:** Default to seller-bears-it for buyer-fault-free refunds (item not as described, didn't arrive) — this mirrors how most established marketplaces work and keeps your own finances predictable. Reserve platform-absorbed refunds for cases that are genuinely your error (a bug, a payment processing mistake), not disputes between buyer and seller.

## Stripe Connect Specifically: What to Configure Now

If you're using Stripe Connect (the standard choice for marketplace payments), refund behavior depends on decisions made at integration time, not adjustable after the fact without engineering work.

- Decide whether you're using Standard, Express, or Custom Connect accounts — this affects who initiates refunds
- Configure whether a refund automatically reverses the connected account's (seller's) earnings, or comes from your platform balance
- Decide what happens if a seller's connected account doesn't have sufficient balance to cover a clawback
- Test the actual refund flow in Stripe's test mode before any real transaction happens

> **️ Warning:** A common gap: a seller's payout was already withdrawn to their bank account by the time a refund request arrives, and there's no balance left to reverse. Decide now what happens in that scenario — does the platform absorb it, does it become a seller debt to recover, or do you hold payouts for a delay window specifically to prevent this? This needs an answer before launch, not during your first real dispute.

## A Concrete, Specific Refund Window Protects Everyone

Vague timing creates disputes. Specific timing prevents most of them before they start.

```
Weak: "Refunds available within a reasonable timeframe."

Strong: "Buyers may request a refund within 48 hours of marking an 
item as received. After 48 hours, the transaction is considered final 
and funds are released to the seller."
```

> ** Tip:** Tie your refund window to a buyer action (marking received) rather than just a fixed calendar date from purchase — this accounts for shipping time variability and gives you a clear trigger point for when the window starts, instead of an ambiguous "from when, exactly?"

## Designing the Actual Dispute Flow

- Buyer initiates a refund request with a required reason and evidence (photo, description of issue)
- Seller is notified and given a defined window to respond (e.g. 48 hours)
- If unresolved between the two parties, it escalates to you as the platform to make a final call
- Your decision authority and process is the same one defined in your Legal Policies enforcement tiers

> ** Best Practice:** Require evidence (photos, specifics) at the moment a refund is requested, not after you ask for it later. This single change dramatically reduces frivolous requests and gives you something concrete to evaluate instead of a he-said-she-said dispute with nothing to go on.

## Use AI to Map Your Policy to Your Payment Architecture

**Prompt — Refund Flow Implementation Review**
```
I'm using [Stripe Connect Standard/Express/Custom] for marketplace 
payments. My refund policy is:
[paste your refund policy from the Legal Policies module]

Walk through:
1. Exactly what API calls/configuration this requires to execute 
   correctly (refund creation, transfer reversal, balance checks)
2. What happens if the seller's payout has already been withdrawn 
   when a refund is requested
3. Whether my stated refund window is realistic given Stripe's payout 
   timing, or whether it should be adjusted to align with when sellers 
   actually receive funds

Be specific to Stripe Connect's actual behavior, not generic payment 
advice.
```

> ** Token Efficiency:** Paste your actual policy text rather than re-describing it — this ensures the technical review checks your real stated terms against your real payment setup, instead of producing generic advice disconnected from what you've already committed to in writing.

## Validate Before Launch

- Refund window is tied to a concrete trigger (delivery confirmation), not a vague timeframe
- You know exactly what happens, technically, when a refund is requested after a seller's payout already left
- Evidence requirements are built into the refund request flow, not just stated in a policy document
- You've tested the full refund flow in Stripe test mode end to end, including the edge case above
- Refund policy text matches what your payment integration can actually execute — no promises your system can't keep

## Common Mistakes

- Refund policy promises something the payment integration can't technically execute
- No plan for refunds requested after a seller's payout has already been withdrawn
- Vague refund windows that don't tie to a concrete, checkable trigger event
- No evidence requirement, turning every refund request into an unresolvable dispute
- Refund logic never tested against Stripe's actual behavior before real transactions begin

## Quick Reference

| Must-decide before launch | Refine with real disputes | Don't build prematurely |
|---|---|---|
| Who bears refund cost (seller/platform) | Fault-split logic for complex disputes | Automated fraud-based refund denial |
| Concrete refund window with clear trigger | Escalation process refinements | Multi-currency refund handling |
| Payout delay or clawback mechanism | Evidence requirement adjustments | Dedicated dispute resolution team tooling |
| Tested Stripe refund flow end to end | Seller debt recovery process for failed clawbacks | Arbitration/legal escalation systems |

## What's Next

With refunds fully mapped to your payment architecture, the next module is the Launch Checklist — pulling together every decision from Phase 5, legal and operational, into a final verification pass before real buyers and sellers start using the marketplace.
