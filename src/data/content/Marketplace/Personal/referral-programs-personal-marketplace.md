---
title: Referral Programs
slug: referral-programs
phase: Phase 6
mode: personal
projectType: marketplace
estimatedTime: 15-20 min
---

# Referral Programs

A referral program amplifies whatever's already true about your marketplace. If retention is solid, referrals bring in users who stick. If retention is weak, referrals just bring in users who churn faster than you can acquire them — and now you're paying (in incentives) to accelerate a leak you haven't fixed.

## The Decision You're Actually Making

Not "should we add a referral program." It's: **is retention actually solid enough right now that new users coming in through referrals will stay — or would this effort be better spent finishing the fix from the previous module?**

This is a sequencing decision as much as a feature decision. Referrals are a multiplier, and multiplying a problem makes it worse, not better.

## Why Marketplace Referrals Are Different From Typical App Referrals

| Typical app referral | Marketplace referral |
|---|---|
| Refer a friend, both get a discount | Has to work for two distinct sides — referring a buyer is different from referring a seller |
| Value is in using the product more | Value is in adding to liquidity — a referred seller adds supply, a referred buyer adds demand |
| One referral mechanic usually suffices | May need separate mechanics or messaging for buyer-side and seller-side referrals |

> **️ Warning:** A referral program that only thinks about "refer a friend" generically often defaults to buyer-side framing (discount on your next purchase), which does nothing to solve a supply-side liquidity problem. If your actual bottleneck is sellers, design the referral mechanic around bringing in supply, not just more buyers chasing the same limited inventory.

## Decision: What Should the Incentive Actually Be?

| Incentive type | Works well for | Risk |
|---|---|---|
| Cash/credit for both referrer and referee | General growth, low complexity | Can attract low-intent users chasing the credit, not the marketplace itself |
| Reduced platform fee for sellers who refer sellers | Specifically growing supply | Requires you to already have fee-based revenue to discount |
| Priority placement/visibility for active referrers | Engaged, established users | Less appealing to brand-new users with nothing to gain yet |
| Simple social recognition (no monetary cost) | Very early-stage, low-budget personal projects | Weaker pull than monetary incentives |

> ** Best Practice:** For a personal project with real budget constraints, a modest credit or fee discount tied specifically to the side of the marketplace you need most (usually supply, early on) is more effective than a generic cash-for-both-sides program you can't actually afford to scale.

## Designing Around Fraud From Day One

Referral programs are one of the most commonly abused features in any product with monetary incentive — self-referrals, fake accounts, and farming are predictable, not edge cases.

- Referral reward only triggers after a real transaction completes, not just signup
- Basic checks prevent the same payment method or device from claiming multiple referral bonuses
- Reward caps exist per user, per time period, to limit damage from any abuse that slips through
- You've connected this to your existing Abuse Detection work from Phase 4 — this is the same threat model, applied to a new feature

> **️ Warning:** Tying a referral reward to signup alone, with no transaction requirement, is close to an open invitation for fake-account farming. Require a completed, real transaction before any reward is issued — this single rule eliminates most low-effort abuse without needing sophisticated fraud detection.

## Keep It Simple for a Personal Project

A referral program doesn't need a dedicated dashboard, complex tier system, or real-time tracking UI to be effective at small scale.

> ** Tip:** A unique referral code or link, a manual or lightly-automated reward process, and a simple "you referred 3 people, here's your credit" email is entirely sufficient for a personal project's early scale. Build the elaborate self-service referral dashboard only once manual tracking genuinely becomes a bottleneck — not before.

## Use AI to Design the Mechanic for Your Specific Bottleneck

**Prompt — Referral Mechanic Design**
```
My marketplace's current bottleneck is [buyer demand / seller supply — 
be specific, based on your Retention module findings]. I have a 
limited budget for incentives.

Design a referral mechanic that:
1. Specifically targets growing the side I'm short on, not generic 
   growth
2. Has a reward structure I can afford and realistically administer 
   as a solo builder, without dedicated tooling
3. Includes basic abuse prevention (what should trigger the reward, 
   what should block it)

Keep this simple enough to build and manage manually or with minimal 
automation.
```

> ** Token Efficiency:** State your specific bottleneck (from the Retention module's diagnosis) directly in the prompt — this is the single input that changes the entire design, and skipping it produces a generic two-sided referral program that may not target your actual problem.

## Validate Before Launching a Referral Program

- You've confirmed retention is solid enough that referred users are likely to stick, not churn immediately
- The incentive specifically targets your actual bottleneck (buyer or seller side), not generic growth
- Reward triggers on a completed transaction, not just signup
- Basic abuse limits exist (caps, device/payment checks) before real incentives are live
- You can realistically administer the reward process yourself at expected volume

## Common Mistakes

- Launching a referral program before fixing a known retention leak, amplifying churn instead of growth
- Generic "refer a friend" mechanic that doesn't address whichever side (buyer/seller) is actually the bottleneck
- Rewarding signups instead of completed transactions, inviting fake-account farming
- Building an elaborate referral dashboard before manual tracking has actually become a bottleneck
- No reward caps, leaving the program exposed to unlimited abuse from a single bad actor

## Quick Reference

| Confirm before launching | Keep simple at small scale | Don't build prematurely |
|---|---|---|
| Retention is solid for the side you're targeting | Manual/lightly-automated reward tracking | Self-service referral dashboard |
| Incentive targets your actual bottleneck | Simple unique link/code per user | Tiered multi-level referral system |
| Reward triggers on completed transaction | Email-based reward notification | Real-time referral analytics |
| Basic abuse caps in place | Modest, affordable incentive size | Automated fraud-detection ML for referrals |

## What's Next

With a referral mechanic designed around your actual bottleneck, the next module is the Roadmap — turning everything you've learned from retention and referral data into a deliberate plan for what to build next, instead of reacting feature by feature.
