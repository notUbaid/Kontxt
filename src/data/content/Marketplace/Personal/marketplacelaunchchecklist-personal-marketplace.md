---
title: Launch Checklist
slug: launch-checklist
phase: Phase 5
mode: personal
projectType: marketplace
estimatedTime: 15-20 min
---

# Launch Checklist

Everything in Phase 5 has been a separate decision — legal documents, policies, refunds, onboarding. This module is where they get verified together, because a marketplace fails at launch from gaps *between* well-built pieces, not usually from any single piece being broken.

## The Decision You're Actually Making

Not "is the app done." It's: **if a real stranger shows up right now, lists something, another stranger buys it, and something goes wrong — does every piece of this actually connect, end to end?**

A launch checklist isn't a list of features. It's a rehearsal of the worst-case real scenario, checked against everything you've built.

## Run the Full Loop Once, As a Stranger Would

Before anything else, do this literally: create two real accounts (not your dev/admin account), list a real item, buy it with real test payment credentials, and walk the entire flow as if you had no inside knowledge of how the app works.

- Sign-up flow works without any manual intervention from you
- A listing can be created, published, and found via search/browse
- A purchase completes, payment processes, and both parties get notified
- A refund request can actually be filed and resolved using the flow you built in the previous module

> **️ Warning:** Testing individual features in isolation hides integration gaps. A search function and a listing function can both work perfectly alone while the connection between them — a new listing not appearing in search for several minutes due to indexing lag — goes unnoticed until a real buyer can't find what a real seller just posted.

## Legal & Policy Verification

Cross-check that what you documented in the prior three modules actually matches what the live app does.

- Terms of Service and Privacy Policy are linked somewhere a user sees them before transacting, not buried
- The refund window stated in your policy matches what your Stripe integration actually enforces
- Listing exclusions from your Legal Policies are reflected in actual moderation capability, not just written down
- Your platform-vs-party liability language matches how the app actually presents listings (not implying you endorse or guarantee items)

> ** Best Practice:** Read your own Terms of Service and Refund Policy fresh, as if you were a new user, immediately before launch. It's common to write a policy early, then build features afterward that drift slightly from what was promised — catching this now is far cheaper than catching it during your first real dispute.

## Trust & Safety Reality Check

- You, personally, can be notified of a flagged listing or reported user within a reasonable time — not just "it's in a database somewhere"
- You have a defined first action for the most likely bad scenario in your specific category (e.g. a clearly fraudulent listing)
- Payment processor (Stripe) account is fully verified and able to process real transactions, not still in test/restricted mode

> **️ Warning:** Don't launch with your payment processor account still partially verified or in a restricted state — this is a common gap that only surfaces when a real payout fails, often after a seller has already shipped or delivered something. Confirm full account activation before any real transaction is possible.

## Technical Readiness, Specific to a Marketplace

| Check | Why marketplaces specifically need this |
|---|---|
| Listing creation → search indexing latency tested | Search lag specifically breaks the buyer-seller connection a marketplace depends on |
| Notification delivery confirmed (email/push) for both buyer and seller events | Two-sided notifications are easy to build for one side and forget for the other |
| Empty states tested (no listings yet, no search results) | A marketplace with zero initial supply needs to not look broken on day one |
| Mobile responsiveness checked for both browsing and listing creation | Sellers often list from mobile; a broken mobile listing flow blocks supply entirely |

> ** Tip:** Empty states matter more for a marketplace than almost any other app type — your first visitors will see an empty or near-empty marketplace, and a broken or jarring empty state at that exact moment can cost you your very first users before liquidity ever builds.

## Use AI for a Final Cross-Check

**Prompt — Pre-Launch Gap Analysis**
```
I'm about to launch a personal-project marketplace. Here's what I've 
built and decided:
[summarize: core transaction flow, refund policy, legal documents in 
place, payment processor status]

Walk through the full buyer and seller journey as a skeptical first-time 
user would experience it, end to end. Flag:
1. Any point where the stated policy and the actual built flow might 
   not match
2. Any step in the journey that depends on something I haven't 
   explicitly confirmed is live (e.g. notifications, search indexing)
3. The single most likely way this breaks in someone's very first 
   real transaction
```

> ** Token Efficiency:** Run this once, as a final gate, rather than repeatedly through development — it's most valuable as a last cross-check against a near-final system, not as an ongoing development tool duplicating earlier module-specific reviews.

## Validate, For Real, Before Launch

- Two real (non-admin) accounts completed a full buy/sell/refund cycle successfully
- Legal documents are linked and visible at the point a user needs them, not just published somewhere
- Payment processor account is fully verified, not in test or restricted mode
- You have a way to be notified of a real problem (flagged listing, failed payment) without manually checking
- Empty states look intentional, not broken, for a marketplace with little initial content

## Common Mistakes

- Testing only as the admin/developer account, missing what a genuine new user actually experiences
- Legal documents that exist but were never actually linked into the live signup or checkout flow
- Payment processor still in restricted/test mode at the moment of "launch"
- No personal notification path for problems — issues sit undiscovered until a user complains directly
- Launching with an empty marketplace and no empty-state design, making day one look abandoned

## Quick Reference

| Verify before launch | Acceptable to monitor post-launch | Don't let block launch |
|---|---|---|
| Full end-to-end transaction as a real user | Long-tail edge cases in disputes | Every possible listing category covered |
| Legal documents linked at point of need | Search relevance tuning | Perfect mobile polish on every screen |
| Payment processor fully verified | Notification delivery speed optimization | Admin panel feature completeness |
| A way to be alerted to real problems | SEO performance | Large initial seller base |

## What's Next

The app is verified end to end and ready for real users. The next phase shifts to Growth — starting with Retention, where the focus moves from "does this work" to "do people come back."
