---
title: Trust & Safety Planning
slug: trust-safety-planning
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Trust & Safety Planning

## The Bridge Between Policy and Architecture

You now have a buyer journey, a seller journey, and a set of policies. None of that means anything until you decide *how it's actually enforced*. Trust & Safety is where policy stops being a document and becomes a set of mechanisms — verification steps, reporting flows, moderation actions — that you'll implement in Phase 2 and 3.

This module isn't about building a Trust & Safety team. You're a team of one. The goal is to design the smallest set of mechanisms that make your specific marketplace safe enough to launch, without building infrastructure sized for a platform you don't have yet.

---

## Risk Is Not Uniform — Score Your Marketplace First

Before deciding what mechanisms you need, identify where your actual risk lives. Not every marketplace needs the same defenses.

| Risk Factor | Low Risk | High Risk |
|---|---|---|
| Transaction value | Low-dollar items | High-dollar items or services |
| Physical meetup required | No (shipped/digital) | Yes (in-person handoff) |
| Reversibility | Digital goods, easy refund | Physical goods, services already rendered |
| Identity stakes | Anonymous is fine | Real identity matters (e.g. trades, services in someone's home) |

> ️ **Common mistake:** Copying the trust mechanisms of a marketplace that doesn't share your risk profile. A digital goods marketplace doesn't need in-person safety features. A local services marketplace where strangers enter people's homes needs far more identity verification than a marketplace for selling used books.

Answer this before continuing: **where on this table does your marketplace actually sit?** Your mechanism choices below should map directly to this.

---

## The Trust & Safety Stack, Ordered by Cost

Build top to bottom. Stop once your risk profile is covered — don't keep adding mechanisms because bigger marketplaces have them.

| Mechanism | Effort | Solves |
|---|---|---|
| Manual seller approval (you review every listing) | Low | Prevents obviously bad actors before they're visible |
| Clear, literal reporting flow ("report this listing/user") | Low | Gives users a way to flag problems even with no automation |
| Profile completeness requirements | Low | Reduces anonymous bad-actor listings |
| Manual dispute mediation (you, by message) | Low–Medium | Resolves the cancellation/refund rule from your policy module |
| Payment holds / delayed payout | Medium | Reduces fraud risk on reversible, high-value transactions |
| Identity verification (ID upload) | High | Only justified for high-stakes, in-person, or high-value categories |
| Automated fraud detection | High | Not appropriate until you have volume and transaction history to detect patterns from |

>  **Best practice:** At launch, most personal-mode marketplaces only need the first three rows. You're not protecting against sophisticated fraud rings yet — you're protecting against obvious bad listings and giving honest users a way to flag problems.

---

## Design the Reporting Flow — Even a Manual One

This is the single highest-leverage mechanism for a solo founder, and it's cheap to build. Every listing and profile should have an obvious way to report it. Where that report goes matters more than how it's processed.

A workable personal-mode version:
- A "Report" action on every listing and user profile
- It sends you (the founder) a notification — email is fine, no dashboard required at v1
- You personally review and act within a stated timeframe (be honest about what's achievable — 24-48 hours is realistic solo)

>  **Tip:** Don't promise instant moderation if you can't deliver it. A clear "we review reports within 48 hours" sets honest expectations and is something one person can actually keep.

---

## What Verification Actually Buys You — and When It's Worth the Friction

Verification is a trade: every step you add reduces bad actors but also reduces the sellers willing to sign up at all. At low volume, this trade-off matters more, not less — you can't afford to lose the few sellers you have to friction that doesn't match your actual risk.

| Verification Level | What It Catches | Add It When |
|---|---|---|
| Email/phone confirmation | Bots, throwaway accounts | Almost always — minimal friction, baseline hygiene |
| Profile photo + bio required | Anonymous low-effort bad actors | Always — also helps the buyer trust signal from the Buyer Journey module |
| Government ID verification | Identity fraud, repeat banned users | Only if your risk table above showed high stakes |
| Payment method verification | Chargebacks, payment fraud | Once you process real payments at meaningful volume |

---

## Common Mistake: Designing for Adversaries You Don't Have Yet

> ️ It's easy to spiral into designing defenses against sophisticated fraud, coordinated bad actors, and scaled abuse. At a handful of users you personally recruited, your actual risk is closer to "an honest disagreement between two people" than "an organized fraud ring." Build for the risk you have, not the risk a 10,000-user platform has. You can add layers later — Phase 4 covers fraud prevention and abuse detection at production scale.

---

## AI Prompt: Mapping Mechanisms to Your Actual Risk

```
I'm building a personal-scale marketplace for [your niche].

Transaction value range: [your answer]
Physical meetup required: [yes/no]
Reversibility (digital goods vs. physical/services): [your answer]
Identity stakes (does real identity matter here): [your answer]

Given this risk profile, recommend the minimum trust & safety stack
I should launch with — ranked by what's essential vs. what can wait.
Be specific about what I'm choosing NOT to build yet and why that's
defensible at low volume, not just what to add.

Also flag: is there a risk specific to my niche that the standard
trust & safety mechanisms (reviews, reporting, verification) wouldn't
catch?
```

---

## Validating Before You Build

- Walk through your own reporting flow as if you were a user — is it actually findable on a listing page?
- Write down your real response time commitment for reports/disputes — can you actually keep it solo?
- Check your verification requirements against your Seller Journey friction map — does anything here contradict the low-friction onboarding you designed there?

---

## What You Should Walk Away With

1. Your marketplace's risk profile, scored against the table above
2. A chosen trust & safety stack — the specific mechanisms you're launching with, in priority order
3. A working reporting flow, even if fully manual
4. An honest, statable response-time commitment for disputes

This closes out Phase 1. Everything decided across Buyer Journey, Seller Journey, Policies, and Trust & Safety now becomes direct input into Phase 2 — Marketplace Architecture, where these decisions get translated into actual system design: your user model, authorization rules, and listing schema.
