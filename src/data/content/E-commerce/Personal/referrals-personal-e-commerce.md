---
title: Referrals
slug: referrals
phase: Phase 6
mode: personal
projectType: ecommerce
estimatedTime: 20-25 min
filename: referrals-personal-e-commerce.md
---

# Referrals

Your store is live. Some people have bought from you. Now the cheapest customer you'll ever get is one your existing customers bring you for free.

That's what this module is about: turning happy customers into an acquisition channel, without building a marketing department.

---

## Why This Matters Now, Not Earlier

Referral programs only work after you have something worth referring.

> **Prerequisite check:** You need real orders and at least a handful of customers who'd genuinely recommend you. A referral program bolted onto a store with zero traction just adds complexity with no payoff. If you're pre-launch, skip this module and come back after your first 10–20 sales.

Referrals matter for a solo store specifically because:

- **Paid ads are expensive and getting worse.** iOS privacy changes and rising CPMs mean your cost-per-click keeps climbing. A referral costs you a discount, not a media budget.
- **Referred customers convert better.** They arrive with trust already transferred from a friend. You skip most of the "can I trust this stranger's store" friction.
- **It scales without your time.** Once it's set up, customers do the recruiting. This matters enormously when you're a team of one.

---

## The Referral Loop

Every referral program is the same five-step loop. If any step is broken, the whole thing fails silently — you won't get an error, you'll just get zero referrals and no idea why.

1. **Customer has a good experience** → they're willing to share
2. **You give them an easy way to share** → a link or code, not a manual process
3. **A friend uses that link/code** → gets a reason to act now (a reward)
4. **The friend converts** → you fulfill their order
5. **You reward the referrer** → closing the loop reinforces sharing again

Most beginner mistakes happen at step 2 (too much friction to share) or step 5 (reward is delayed, unclear, or forgotten). Keep that in mind as you make decisions below.

---

## Decision 1: Build Custom or Use an Existing Tool

This is the single most important decision in this module, and for Personal Mode the answer is usually **don't build it yourself.**

| Factor | Build Custom | Use Existing Tool |
|---|---|---|
| Time to launch | Days to weeks | Hours |
| Fraud prevention | You build it from scratch | Handled for you |
| Code generation/attribution | You build it from scratch | Handled for you |
| Email automation (reward delivery) | You build it | Built in |
| Cost | Free (your time) | Often free tier, then $10–30/mo |
| Maintenance burden | Ongoing, on you | None |
| Learning value | High if referrals are core to your product | Low — it's a solved problem |

> **Best Practice:** Unless referrals are a core differentiator of your business (they almost never are for a solo store), use an existing tool. Your engineering time is better spent on product, not reinventing fraud detection that referral platforms have spent years hardening.

**If your stack is Shopify** (decided back in Phase 2): apps like ReferralCandy, Smile.io, or Goaffpro plug in directly, sync with your existing customer and order data, and require no backend work.

**If you're on a custom stack** (Phase 3 build): look for a referral API/SaaS (e.g. ReferralCandy, Genius Referrals, Tapfiliate) with a REST API you call after order creation, rather than building code generation, double-sided reward tracking, and fraud checks yourself.

Only build custom if:
- Your existing tool's pricing breaks your unit economics at your order volume, **or**
- You need a referral mechanic existing tools genuinely don't support (rare).

---

## Decision 2: Reward Structure

This determines both your conversion rate and whether you accidentally lose money on every referral.

### Single-sided vs. Double-sided

- **Single-sided** — only the referrer gets a reward. Cheaper for you, weaker incentive for the friend to actually buy.
- **Double-sided** — both referrer and friend get a reward (e.g. "Give $10, Get $10"). Consistently outperforms single-sided in conversion, because the friend has their own reason to act, not just goodwill toward the referrer.

> **Recommendation for Personal Mode:** start double-sided. The friend's reward is what actually drives the click-to-purchase conversion — the referrer's reward only drives the initial share.

### Reward Type

| Type | Pros | Cons |
|---|---|---|
| Store credit | No cash outlay, drives repeat purchase | Useless if customer doesn't want to buy again |
| Percentage discount | Easy to implement, feels generous | Can erode margin on already-thin product pricing |
| Fixed-dollar discount | Predictable cost, easy to budget | Less appealing on low-cart-value stores |
| Free product | High perceived value | Adds fulfillment/shipping cost you must track |

> **Warning:** Whatever you pick, calculate the worst case: *(cost of referrer reward) + (cost of friend's reward) + (payment processing fee on a discounted order)*. If that number is close to or above your margin on an average order, your referral program is losing you money per acquisition. Run this math before launch, not after.

---

## Decision 3: Where Referrals Get Triggered

Pick one or two trigger points — don't scatter referral prompts everywhere, it reads as desperate and adds clutter.

- **Post-purchase confirmation page** — highest-intent moment, customer just had a good experience
- **Order confirmation email** — second chance to catch them once the dust settles
- **Account dashboard** — for repeat customers who didn't act the first two times

Skip: pop-ups on the homepage to anonymous visitors. They haven't bought anything yet — they have nothing to refer.

---

## Implementation Notes (Custom Stack)

If you've concluded a custom build is justified, here's the minimum viable architecture — keep it this simple, nothing more:

1. **Unique referral code per customer** — generate at account creation or first order (e.g. `customerID` hashed to a short alphanumeric code).
2. **Referral link** — `yourstore.com/?ref=CODE`, stored in a cookie or query param carried through to checkout.
3. **Attribution at checkout** — when an order completes, check for a referral code; if present, log `referrer_id`, `referred_order_id`, `reward_status: pending`.
4. **Reward issuance** — triggered only after the referred order is **fulfilled and past the return window**, not at checkout. Rewarding before that opens you up to refund abuse (customer orders, gets reward, returns the item, keeps the reward).
5. **Fraud guardrails** — block self-referral (same email/payment method/IP as referrer), cap rewards per referrer per month, and require a minimum order value before a referral counts.

> **Common Mistake:** Issuing the reward immediately at checkout instead of after the return window closes. This is the #1 way solo store owners get exploited by referral fraud — someone refers themselves with a second email, orders, gets the reward, refunds the order, nets free money.

---

## Using AI Effectively Here

Use AI to scaffold the attribution logic and reward rules — not to "build me a referral program," which is too vague and will produce generic, unverified code.

**📋 Copy this prompt** (use only if you've decided to build custom):

```
I'm building a referral system for a solo-run e-commerce store on [your stack, e.g. Next.js + Postgres + Stripe].

Reward structure: double-sided, $[X] credit to both referrer and referred friend.
Trigger: reward issued only after the referred order is fulfilled AND past a [N]-day return window.
Fraud rules: block self-referral by matching email, payment method, and IP; cap rewards at [N] per referrer per month; require a minimum order value of $[X] for a referral to count.

Give me:
1. A database schema for tracking referral codes, referral events, and reward status (pending/issued/blocked)
2. The attribution logic for capturing a referral code at checkout and linking it to an order
3. A scheduled job (or webhook-triggered function) that checks fulfilled orders past the return window and issues pending rewards
4. The specific fraud checks as a standalone validation function I can unit test

Flag any assumption you're making about my stack instead of guessing.
```

This prompt works because it gives AI the actual business rules instead of asking it to invent them — invented reward logic is exactly where fraud holes come from.

---

## Validating AI Output

Before you trust generated referral code, check for these specific failure points:

- [ ] Does the reward get issued at checkout, or after the return window? (It must be the latter.)
- [ ] Is there a self-referral check, and does it match on more than just email? (Email alone is trivially bypassed.)
- [ ] Is there a cap on rewards per referrer? (Without one, a single bad actor can drain your margin.)
- [ ] Does the referral code persist through checkout if the customer browses other pages first? (Cookie/session handling is a common silent bug.)
- [ ] Is the reward status stored as a separate field (`pending`/`issued`/`blocked`), not just a boolean? You need the audit trail when a customer disputes a missing reward.

> **Tip:** Test the full loop yourself with two real accounts and real (small) money before announcing the program publicly. This is the one part of your store where a bug costs you cash directly, not just a bad user experience.

---

## What Good Looks Like

A referral program that's working shows up in three numbers, not vibes:

- **Participation rate** — % of customers who actually share their link (healthy: 2–5% for an unprompted program, higher if you actively ask post-purchase)
- **Conversion rate of referred visitors** — should be meaningfully higher than your overall site conversion rate; if it isn't, your reward or trigger placement is off
- **Cost per referred acquisition** — total rewards paid ÷ number of referred customers; compare directly against what you'd pay for the same customer via ads

If you can't measure these, you don't have a referral program — you have a discount code nobody's tracking.

---

## Before You Continue

- [ ] Decided: build custom or use an existing tool
- [ ] Decided: reward type and amount, with the worst-case cost calculated against your margin
- [ ] Decided: single-sided or double-sided rewards
- [ ] Decided: trigger point(s) for the referral prompt
- [ ] Confirmed: reward issuance is gated on fulfillment + return window, not checkout
- [ ] Confirmed: basic fraud guardrails are in place before public launch

**Next up in Growth:** Email Marketing — the channel that will carry most of your referral traffic, and the one that turns one-time referred customers into repeat ones.
