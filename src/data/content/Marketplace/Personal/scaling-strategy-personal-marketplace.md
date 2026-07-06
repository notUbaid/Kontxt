---
title: Scaling Strategy
slug: scaling-strategy
phase: Phase 6
mode: personal
projectType: marketplace
estimatedTime: 15-20 min
---

# Scaling Strategy

Your roadmap decided what to build next based on evidence. Scaling strategy is a different question: as usage genuinely grows, what about how you *operate* this marketplace — not just the code — needs to change before growth turns into a crisis you didn't see coming?

## The Decision You're Actually Making

Not "how do we handle more traffic." That's largely covered by the technical Scalability Planning work from Phase 4. This is about the parts that don't scale automatically just because your servers do: your own time, your moderation capacity, and your ability to personally know what's happening on your own marketplace.

## What Doesn't Scale Just Because Your Code Does

| Thing that scales with infrastructure | Thing that scales with you, personally |
|---|---|
| Database can handle 10x the listings | Can you still personally review flagged content at 10x volume? |
| Servers handle 10x the traffic | Can you still personally answer support requests at 10x volume? |
| Payment processor handles 10x the transactions | Can you still personally catch a fraud pattern by noticing it manually? |

> **️ Warning:** A solo-built marketplace's real scaling ceiling is usually the founder's personal attention, not the technology. Growth that outpaces your ability to monitor trust & safety, respond to disputes, or notice fraud patterns is growth that's actively making the product worse for users, even while the numbers look like success.

## Decision: What to Automate vs What to Keep Manual

| At small scale (manual is fine) | Signal you've outgrown manual | What to automate next |
|---|---|---|
| Personally reviewing every new listing | Review queue regularly has a backlog of more than a day | Automated content flagging (keyword/image checks) before human review |
| Answering support emails individually | Same questions repeated weekly | A simple FAQ or help doc that deflects the repeated ones |
| Manually checking for refund/dispute patterns | You only notice a pattern after multiple complaints | Basic dashboard tracking dispute rate over time |
| Personally onboarding each new seller | Onboarding takes meaningfully long per seller | A self-serve onboarding flow with clear guardrails |

> ** Best Practice:** Automate the parts of your workload that are repetitive and low-judgment first (FAQ deflection, basic flagging rules), and keep the parts requiring real judgment (final dispute decisions, ambiguous trust & safety calls) manual longer. This preserves quality where it matters most while freeing your time where automation genuinely works as well as you would.

## Designing Trust & Safety to Scale With You, Not Against You

This is the area most likely to break silently as a marketplace grows, because problems don't announce themselves — they just slowly stop getting caught.

- Set a personal threshold: if your moderation queue exceeds a specific size for more than a day, that's a signal to invest in automation or a review process change
- Track dispute rate as a percentage of transactions, not just an absolute count — a rising percentage is a real signal even if absolute volume looks manageable
- Revisit your enforcement tiers from the Legal Policies module — do they still hold up at higher volume, or were they designed assuming a small, easily-overseen community?

> **️ Warning:** A rule that worked fine when you personally knew most active users by their listing history breaks down anonymously at scale. Don't assume your original trust & safety approach still works just because nothing has visibly broken yet — check the actual dispute rate trend, not just the absence of a crisis so far.

## Decision: When to Bring in Help

| Signal | Reasonable response |
|---|---|
| Support volume consistently exceeds what you can answer same-day | Consider part-time help, even a few hours a week, for first-line support |
| Moderation backlog growing despite automation | Time to bring in a second reviewer, even informally |
| You're the single point of failure for payment/dispute decisions | Document your decision process well enough someone else could follow it |

> ** Tip:** Documenting your own decision-making process (how you actually resolve a dispute, what you actually check before approving a flagged listing) is valuable even before you bring in help — it forces you to notice when your own judgment has been inconsistent, and it's the foundation for anyone else stepping in later.

## Use AI to Identify Your Personal Bottleneck

**Prompt — Founder Bottleneck Analysis**
```
I run a solo-built marketplace. Here's roughly how I spend my time on 
operations each week, and how that's changed as usage has grown:
[describe: hours on support, moderation, dispute resolution, and how 
each has trended as user count has grown]

Based on this:
1. Which of these is most likely to become unsustainable first as 
   growth continues at a similar rate?
2. What's the lowest-effort automation or process change that would 
   meaningfully reduce that specific bottleneck?
3. What should I explicitly NOT automate yet, because it still 
   requires my personal judgment at this scale?
```

> ** Token Efficiency:** Give actual rough time estimates, even imprecise ones, rather than asking generically "how do I scale operations" — the goal is identifying your specific bottleneck, and that requires your specific numbers, not generic operational scaling advice.

## Validate Before Scaling Further

- You've identified which personal-capacity bottleneck (support, moderation, disputes) is closest to its limit
- At least one repetitive, low-judgment task has been automated or deflected (FAQ, basic flagging rules)
- Dispute rate is tracked as a trend, not just monitored anecdotally
- Your trust & safety enforcement approach has been re-checked against current scale, not just inherited from launch
- You have a documented (even informal) decision process for disputes, in case you ever need to hand part of this off

## Common Mistakes

- Assuming infrastructure scalability (Phase 4) means the whole operation scales, ignoring personal-capacity limits
- Letting moderation or support backlog grow silently until it becomes a visible crisis
- Automating judgment-heavy decisions (final dispute calls) before automating the repetitive, low-judgment ones
- No tracking of dispute rate as a trend, missing a slowly worsening trust & safety problem
- Never documenting your own decision process, making it impossible for anyone else to ever help

## Quick Reference

| Watch for these signals | Automate or deflect | Keep manual longer |
|---|---|---|
| Growing support/moderation backlog | Repeated FAQ-style support questions | Final dispute resolution decisions |
| Rising dispute rate as a percentage | Basic content flagging before human review | Ambiguous trust & safety judgment calls |
| You're the single point of failure | Self-serve seller onboarding flow | Novel or first-time-seen fraud patterns |
| Inconsistent personal decision-making | Dashboard tracking for dispute/fraud trends | Hiring decisions about bringing in help |

## What's Next

With operational scaling addressed, the next module returns to the supply side specifically — Supply Growth — for deliberate strategies to grow the seller base now that you can actually support more of them without breaking.
