---
title: Marketplace Policies
slug: marketplace-policies
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Marketplace Policies

## Why This Is a Product Decision, Not a Legal Afterthought

"Policies" sounds like something you bolt on before launch — a Terms of Service page nobody reads. That's a different module (Phase 5 handles the legal documents themselves). This module is earlier and more important: it's about deciding the *rules of your marketplace* before you design the features that enforce them.

Every policy decision here directly shapes what you build in Phase 2 and 3. If you don't decide now who's allowed to list what, you'll be retrofitting moderation logic into a listing system that wasn't designed for it. Policy is architecture input, not legal paperwork.

---

## The Five Decisions Every Marketplace Must Make

| Decision | Question You're Answering | Why It Can't Wait |
|---|---|---|
| **What's allowed** | What categories/items/services are permitted? | Defines your listing schema and moderation rules |
| **Who's allowed** | Any seller, or vetted/approved only? | Defines your onboarding flow and trust mechanism |
| **Pricing rules** | Fixed price, offers, auctions, negotiable? | Defines your transaction and payments model |
| **Cancellation/refunds** | What happens when a deal falls through? | Defines your dispute and payments architecture |
| **Enforcement** | What happens when someone breaks the rules? | Defines your moderation tooling needs |

> ⚠️ **Common mistake:** Founders write a Terms of Service template found online, change the company name, and consider policy "done." Then in Phase 3 they realize the database has no field for tracking listing approval status, because nobody decided whether approval was required.

---

## Scope Your Policy to Personal-Mode Reality

You are not Etsy. You don't need a 40-page policy document, an automated content moderation pipeline, or a legal team. You need clear, simple rules you can actually enforce by yourself.

| Policy Area | Personal-Mode Approach |
|---|---|
| Prohibited items/content | A short explicit list — write down exactly what's not allowed, not vague language |
| Seller approval | Manual review by you, for every listing, while volume is low |
| Refund/cancellation | One clear rule (e.g. "buyer and seller resolve directly within 48 hours, you mediate after") |
| Enforcement | You personally remove violating listings and can ban a user — no automated system needed yet |
| Dispute escalation | A documented manual process: how a user contacts you, what you do, how fast |

> ✅ **Best practice:** Write your prohibited-items list as a literal checklist a person could use, not legal prose. "No weapons, no counterfeit goods, no items requiring age verification" beats "Users shall not list any item deemed inappropriate by the Company in its sole discretion." The second version doesn't tell *you* what to enforce either.

---

## Decide Your Approval Model Now

This single decision changes your entire listing flow architecture.

| Model | How It Works | When It Fits Personal Mode |
|---|---|---|
| **Pre-approval** | You review every listing before it goes live | Best for low volume, high-trust-risk categories |
| **Post-moderation** | Listings go live immediately, you review after/on report | Fits if volume is low enough to review daily, lower-risk categories |
| **Open with reporting** | No active review, users flag problems | Only viable once you have more sellers than you can personally vet — usually too early for Phase 1 |

> 💡 **Tip:** Pre-approval feels slow, but at your current scale (a handful of sellers) it's the cheapest trust mechanism you have. It doubles as quality control and lets you personally learn what bad listings look like before you ever need to automate detection.

---

## Cancellation & Refunds: Pick One Rule, Not a Policy Tree

Personal-mode marketplaces over-engineer this constantly. You don't need tiered refund windows or category-specific rules yet. Pick one default rule that's fair and simple, and only add complexity when a real situation forces it.

A workable default for most personal-mode marketplaces:

> *"Buyers and sellers should resolve cancellations directly. If unresolved after 48 hours, contact [you] for mediation. Refunds are issued at [your] discretion based on the situation."*

This isn't a permanent policy — it's a placeholder that lets you launch without a documented edge case ever blocking you, while you personally handle disputes and learn what patterns actually emerge.

---

## AI Prompt: Drafting Your Policy Skeleton

```
I'm building a personal-scale marketplace for [your niche].
I will personally moderate everything by hand at this stage — no
automated tooling, no legal team, just me.

Category/items being sold: [your answer]
Who can sell (anyone / vetted only): [your answer]
Pricing model (fixed / offers / auction): [your answer]

Draft a plain-language policy skeleton covering:
1. A specific, literal list of prohibited items for this category
   (not generic boilerplate — actual things relevant to my niche)
2. A one-rule cancellation/refund default I can enforce manually
3. A simple enforcement ladder (warning → listing removal → ban)

Keep it short enough that I could paste it directly into a policies
page without editing. This is not a legal document — it's an
operating rule set for a marketplace with a handful of users.
```

This produces an operating draft, not a legal document — Phase 5 covers the actual Terms of Service and legal review. Don't conflate the two or you'll over-invest in legal language for a marketplace that doesn't have liability exposure yet.

---

## Common Mistake: Copy-Pasting Another Marketplace's Policy

> ⚠️ A policy copied from a marketplace 1000x your size will reference enforcement mechanisms you don't have (automated fraud detection, support teams, escalation tiers) and miss the specific risks of your actual niche. A short, honest, manually-enforceable policy beats an impressive-looking one you can't actually uphold.

---

## What You Should Walk Away With

1. A literal, short list of what's prohibited on your marketplace
2. A decided approval model (pre-approval, post-moderation, or open)
3. One clear cancellation/refund default rule
4. A simple enforcement ladder you can execute personally

This feeds directly into Trust & Safety Planning next, where these rules turn into the actual mechanisms — verification, reporting, moderation tools — that enforce them.
