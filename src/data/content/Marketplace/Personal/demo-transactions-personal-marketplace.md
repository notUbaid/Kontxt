---
title: Demo Transactions
slug: demo-transactions
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Demo Transactions

## The Cheapest Bug-Finding You'll Do in This Entire Project

Every module in Phase 2 has been a design decision. This is the first one that's pure verification — you're about to simulate real usage of a system that, on paper, looks complete: listings, payments, messaging, disputes. Paper completeness and working completeness are different things, and the gap between them is exactly what this module finds, before real users (and real money) ever touch it.

This isn't formal QA. It's you, walking through the system as both a buyer and a seller, end to end.

---

## Why "Demo" Transactions, Not Just "Test" Transactions

The distinction matters. A unit test checks one function in isolation. A demo transaction walks the *entire* path a real user takes — across every entity in your Architecture Fundamentals map at once. This is the level where integration bugs hide: the ones where each piece works individually but the handoff between them doesn't.

| What Unit Tests Catch | What a Demo Transaction Catches |
|---|---|
| A function returns the wrong value | A listing gets marked "Sold" but the payment actually failed |
| A schema field has the wrong type | A buyer can message a seller about a Removed listing |
| An endpoint returns the wrong status code | A dispute flag doesn't actually notify you |

---

## The Minimum Path to Walk Through

Use Stripe's test mode for this — never real money during this phase. Walk every step yourself, switching between a buyer account and a seller account.

- [ ] Create a seller account, complete Stripe Connect Express onboarding (test mode)
- [ ] Create a listing, submit it, and verify it correctly sits in "Pending Approval" — not visible publicly
- [ ] Approve it as yourself (admin), verify it becomes visible and searchable
- [ ] As a buyer, find it via search, open it, message the seller with a question
- [ ] Verify the seller receives an email notification for that message
- [ ] Complete a checkout with a Stripe test card, verify the platform fee split is correct
- [ ] Verify Transaction and Listing statuses update correctly and atomically
- [ ] Flag a dispute on that transaction, verify it notifies you and links to the message thread
- [ ] Resolve the dispute (test both a refund and a release on separate runs)
- [ ] Leave a review tied to the completed transaction, verify it's rejected if attempted without a transaction

> ⚠️ **Common mistake:** Only testing the happy path once and calling it done. Run this twice — once where everything goes smoothly, and once where you deliberately trigger a failure (decline the test payment, flag a dispute, try to message about a Removed listing). The failure path is where the real bugs live, exactly as Payments Architecture warned.

---

## What "Pass" Actually Means at Each Step

A step passing isn't just "didn't crash." Check it against the specific rule each earlier module defined:

| Step | Pass Condition (from earlier modules) |
|---|---|
| Pending listing visibility | Not visible to buyers — per Listing System's visibility table |
| Approval | Only you can perform this — per Authorization's admin scope |
| Search results | Only Active listings appear — per Search Architecture's status filter |
| Messaging | Only buyer and seller can view the thread — per Authorization's party check |
| Payment split | Fee matches your configured rate — per Payments Architecture's fee setup |
| Dispute flag | Notifies you, links to the thread — per Dispute Resolution's flow |
| Review | Rejected without a verified transaction — per Reviews & Ratings' core rule |

> 💡 **Tip:** This table is effectively a checklist version of every rule you designed across Phase 2. If a step fails here, it's not just "a bug" — it's a specific earlier decision that didn't make it into the actual implementation. Trace it back to the module that defined the rule, not just the code that broke.

---

## Use Realistic Data, Not Placeholder Junk

"Test Listing 1" with a price of $1 tells you the code runs, but not whether the experience feels right. Use a real listing from your actual niche, real-sounding messages, a realistic price. This surfaces UX issues — awkward copy, confusing flows — that pure functional testing misses entirely.

---

## AI Prompt: Generating a Demo Transaction Test Plan

```
I'm building a personal-scale marketplace for [your niche] using
[your stack]. Here's my full flow: Listing (with approval), Search,
Messaging, Payments (Stripe Connect Express, [your fee]%), Dispute
Resolution, Reviews.

Generate a step-by-step manual test script covering the happy path
AND at least 3 deliberate failure scenarios (e.g. declined payment,
attempted review without a transaction, attempted message on a
removed listing). For each step, state exactly what the correct
system behavior should be, referencing: listing visibility rules,
authorization (who can do what), and the payment/dispute flow.

Format this as a literal checklist I can run through manually in
Stripe test mode.
```

---

## Common Mistake: Skipping This Because "It Should Work"

> ⚠️ Every module in Phase 2 was a sound decision in isolation. Integration bugs aren't usually about any single decision being wrong — they're about the handoff between two correct decisions being mismatched (e.g. the Listing status update and the Payment status update not being wrapped in the same atomic operation, exactly as flagged in Payments Architecture). The only way to find these is to actually run the full path, not to reason about it in your head.

---

## What You Should Walk Away With

1. A completed end-to-end walkthrough in Stripe test mode, both happy path and failure paths
2. Every checklist item verified against the specific rule it was meant to enforce
3. A list of any gaps found, traced back to the module responsible for that rule
4. Confidence that listing, search, messaging, payments, and disputes work together — not just individually

This closes Phase 2 — Marketplace Architecture. Every design decision from here forward in Phase 3 (Development) is implementation of what you've already specified across these modules. You're not designing anymore; you're building what you designed.
