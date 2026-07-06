---
title: Buyer Journey
slug: buyer-journey
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Buyer Journey

## Why This Comes Before Any Code

Marketplaces don't fail because of bad code. They fail because nobody trusted the platform enough to make the first transaction.

You're building solo, which means every hour spent on a feature buyers don't need is an hour you don't get back. Before you design a database schema or pick a tech stack, you need to know exactly what a stranger has to believe, see, and do before they hand over money on a platform with no brand history.

This module produces one artifact: a clear map of how a buyer moves from "never heard of this" to "completed a purchase and came back." Everything you build in later phases — listings, search, checkout, trust badges — exists to serve this path.

---

## The Four Stages Every Buyer Moves Through

Every marketplace buyer, regardless of niche, passes through the same four stages. What changes is *how much friction* exists at each one.

| Stage | Buyer's Internal Question | What Breaks Trust | What Builds Trust |
|---|---|---|---|
| **Discovery** | "Is this place relevant to what I need?" | Generic, unfocused listings | A clear, specific niche signal |
| **Evaluation** | "Can I trust this specific seller/item?" | Thin profiles, no reviews, stock photos | Detail, specificity, social proof |
| **Decision** | "What happens if this goes wrong?" | Unclear refund/dispute process | Visible payment protection |
| **Post-Purchase** | "Was this worth coming back for?" | No follow-up, no easy reorder path | Confirmation, easy repeat action |

> ️ **Common mistake:** Founders obsess over Discovery (marketing, SEO, landing pages) and Decision (checkout flow) because those feel like "real product work." Evaluation is where most personal-mode marketplaces actually lose buyers — and it's the cheapest stage to fix.

---

## Map Your Specific Buyer Journey

Answer these before moving to architecture. Each answer should be one sentence — this is a decision record, not an essay.

- **Who is the buyer, specifically?** (Not "anyone who needs X" — name the persona: budget, urgency, expertise level)
- **What triggers them to start looking?** (A problem, an event, a recurring need)
- **Where would they naturally search first** if your marketplace didn't exist?
- **What's the one thing that would make them bounce immediately** on landing?
- **What's the smallest piece of proof** that makes a listing feel credible to them?
- **What do they expect to happen** if a transaction goes wrong?

If you can't answer one of these confidently, that's a research gap — not a reason to guess and build anyway. See the Validation section below.

---

## Trust at Small Scale (Personal Mode)

You do not need Stripe Connect, KYC verification, and a dispute-resolution team on day one. You need the *minimum trust signal that matches your transaction risk*.

| Trust Mechanism | Setup Effort | When You Actually Need It |
|---|---|---|
| Detailed profiles (bio, location, join date) | Low | Always — do this first |
| Manual seller vetting (you approve listings) | Low | Early on, while volume is low enough to do by hand |
| Reviews/ratings | Medium | Once you have repeat buyers, not before |
| Escrow / held payments | Medium–High | Only if transaction value is high or trust risk is high |
| Verified ID / KYC | High | Regulated categories, or once volume justifies the cost |
| Dispute resolution system | High | Once manual mediation (you, by email) becomes unsustainable |

>  **Best practice for Phase 1:** Pick exactly one trust mechanism beyond "detailed profiles" to launch with. Manual curation — you personally approving every seller — is a legitimate, professional strategy at low volume. Airbnb's founders manually photographed early listings. This doesn't scale, and it isn't supposed to yet.

---

## Common Mistake: Optimizing for Sellers First

> ️ It's tempting to build seller onboarding first because it feels like "supply." But a marketplace with great seller tools and zero buyer trust has zero transactions. Buyers are the harder side to convince because they're risking money on something they can't physically inspect. Design the buyer's confidence path before you design the seller's listing form.

---

## AI Prompt: Stress-Testing Your Buyer Journey

Use this once you've filled in the checklist above. Paste in your actual answers — do not send this with placeholders still in it, you'll get generic output back.

```
I'm building a personal-scale marketplace for [your niche].

Buyer persona: [your answer]
Trigger to start searching: [your answer]
Where they'd search without my platform: [your answer]
Bounce risk on landing: [your answer]
Minimum credibility signal needed: [your answer]
Expectation if something goes wrong: [your answer]

Critique this buyer journey as a skeptical marketplace operator who has
seen early-stage marketplaces fail. Specifically:
1. Where is the weakest trust point in this journey?
2. What's the cheapest fix for that weak point at near-zero budget?
3. What assumption here is most likely wrong, and how would I find out
   in under a week without writing code?

Be specific to my niche. Do not give generic marketplace advice.
```

This is a single focused prompt rather than a back-and-forth brainstorm — it costs one context window, not five, and forces specific critique instead of validation.

---

## Validating Before You Build

Don't write a line of code to test these assumptions. Test them this week:

- Talk to 5 people who match your buyer persona — ask what they currently do instead of using a marketplace like yours
- Build a single landing page describing the offer, no functionality — see if anyone tries to act on it
- Manually match one real buyer to one real seller yourself, by hand (DMs, spreadsheet, whatever) — this reveals trust gaps no survey will

>  **Tip:** If you can't manually broker even one transaction by hand, automating that process won't fix the underlying problem. The manual version is your cheapest possible prototype.

---

## What You Should Walk Away With

By the end of this module you should have, written down:

1. A one-paragraph buyer persona
2. The four-stage journey mapped to *your* niche specifically
3. One chosen trust mechanism for launch (not five)
4. At least one validated assumption from real conversations, not guesses

This becomes direct input into your next planning module, where you'll map the seller side of this same flow — and it should stay consistent with what you decide here. If your buyer trust mechanism is "manual approval," your seller onboarding design needs to support that, not fight it.
