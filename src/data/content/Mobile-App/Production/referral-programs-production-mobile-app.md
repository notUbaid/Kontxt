---
title: Referral Programs
slug: referral-programs
phase: Phase 6
mode: production
projectType: mobile-app
estimatedTime: 15–20 min
filename: referral-programs-production-mobile-app.md
---

A referral program turns your existing, retained users into an acquisition channel — and unlike paid ads, referred users typically arrive with built-in trust from the friend who invited them, which tends to show up as better activation and retention than cold-acquired users. But a referral program only works on top of a product people genuinely want to share — it can't manufacture word-of-mouth that doesn't exist organically.

## Referrals Only Amplify, They Don't Create

This is the most important precondition, and it connects directly back to the Retention module: if your retention curve hasn't flattened at a healthy level, a referral program will mostly just bring in more users who churn at the same rate — amplifying a leak, not fixing one.

> **Best Practice:** Validate that users are already organically referring others (check if "how did you hear about us" data shows word-of-mouth, or look for spontaneous social mentions) before investing engineering time in a formal program. A referral mechanic works best when it removes friction from sharing that's already happening, not when it's trying to manufacture sharing from scratch.

## Incentive Structures

| Model | Mechanism | Good For |
|---|---|---|
| Double-sided | Both referrer and referee get a reward | Most common, balances incentive for both parties |
| Single-sided (referrer only) | Only the inviter is rewarded | Risk of feeling transactional/spammy to the referee |
| Single-sided (referee only) | Only the new user gets a reward (e.g., discount) | Common for marketplaces, less viral since referrer has less direct incentive |
| Non-monetary | Status, unlocked features, recognition | Works well for apps where money/discounts don't fit the product (e.g., social/community apps) |

Double-sided incentives generally outperform single-sided ones for viral growth, because both parties have genuine reason to participate rather than it feeling like the referrer is just farming rewards off people they invite.

## What to Offer

The reward needs to be valuable enough to motivate sharing, but sustainable at scale — model the cost per referred user against their actual lifetime value before committing to a reward structure.

- Free premium time/features (for subscription apps) — costs you marginal infrastructure, not direct cash
- In-app currency/credits (if your app has them) — flexible, scalable cost
- Direct cash/discounts — highest motivational pull, but the cost model needs the most careful validation against actual referred-user LTV
- Exclusive features or status — lowest direct cost, works best when your user base genuinely values recognition/status within the product

> **Warning:** Model your reward cost against actual referred-user lifetime value before launching, not just against the cost of acquiring a similar user through paid channels. A referral program with an unsustainable cost-per-acquisition can scale a financial problem just as fast as it scales growth.

## Making Sharing Frictionless

The mechanics matter as much as the incentive — a great offer with high sharing friction underperforms a modest offer that's effortless to act on.

- [ ] One-tap share to common channels (Messages, WhatsApp, social) with pre-filled, personalized copy — don't make users write their own invite message
- [ ] Deep links that take the referred user directly into the relevant context (not just a generic app store link), connecting back to the Deep Linking work from Phase 2/3
- [ ] Referral code/link auto-applies on the referee's first open — don't require manual code entry, which is a significant drop-off point
- [ ] Track attribution reliably through install — this typically requires a deferred deep linking solution (Branch, AppsFlyer, or similar) since standard deep links don't survive the app-store-install gap on a fresh install

## Tracking and Measuring

Treat the referral program with the same funnel discipline as any other acquisition channel from the Analytics module:

| Metric | What It Tells You |
|---|---|
| Share rate | % of users who actually send an invite |
| Conversion rate | % of invited friends who install |
| Activation rate of referred users | Whether referred users actually engage, not just install |
| Retention of referred vs. organic users | Validates whether referral quality matches or beats other channels |
| Viral coefficient (K-factor) | Whether the loop is actually compounding (K > 1 means genuinely viral) |

> **Tip:** A referral program with high share rate but low activation/retention among referred users isn't actually working, even if it looks good on a raw install-count dashboard. Track it through to retention, the same way you'd evaluate any other acquisition channel.

## Fraud and Abuse Considerations

Reward-based referral systems attract gaming — self-referrals, fake accounts, bulk-generated invite codes.

- [ ] Require a minimum activation threshold (not just install) before either party receives the reward — this filters out low-effort fraud significantly
- [ ] Rate-limit referral code generation and redemption per account/device
- [ ] Monitor for suspicious patterns (many accounts from the same device, rapid sequential redemptions) and have a plan to revoke fraudulent rewards

## Using AI Here

```
Help me design a referral program for this app.

App core function: [one sentence]
Business model: [subscription / one-time purchase / free with ads / marketplace]
Current organic referral signal: [any evidence users already share this, e.g., "how did you hear about us" data]
Approximate user lifetime value: [if known]

Suggest:
- Whether a double-sided or alternative incentive structure fits this business model
- A reward type and amount, reasoned against approximate LTV
- The activation threshold that should gate reward payout, to reduce fraud
- Key metrics to track to validate the program is working, not just generating installs
```

> **Validation:** Don't accept an AI-suggested reward value without grounding it in your own actual LTV data — a generic suggestion risks being either too generous (unsustainable) or too weak (no real motivation to share) without that context.

## Common Mistakes

- Launching a referral program before retention has validated the product is worth sharing
- Single-sided incentives that feel transactional and underperform double-sided structures
- High-friction sharing flows (manual code entry, no pre-filled message) that suppress an otherwise good offer
- No activation gate on reward payout, inviting fraud
- Measuring only install count instead of tracking referred-user activation and retention through the funnel
- Reward costs not validated against actual referred-user LTV, creating an unsustainable growth channel

## Before You Move On

- [ ] Organic sharing signal validated before investing in a formal referral mechanic
- [ ] Incentive structure and reward size are modeled against actual user LTV
- [ ] Sharing flow is one-tap with pre-filled copy and deep links into relevant context
- [ ] Reward payout is gated behind a real activation threshold, not just install
- [ ] Referred-user activation and retention are tracked through the funnel, not just raw invite/install counts

Next: **Roadmap** — turning everything you've learned from retention, feedback, and growth data into what gets built next.
