---
title: Feature Prioritization
slug: feature-prioritization
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 30–45 min
---

# Feature Prioritization

You have a list of features. Now you make the hardest decisions in product development.

Prioritization is not sorting by what you're most excited to build. It's not sorting by what's easiest. It's answering one question for every feature on your list: **does this belong in v1, v2, or never?**

Getting this wrong is expensive. Build too much and you ship late, burn runway, and dilute the product's focus. Build too little and users can't get to the value you promised. The goal is to find the minimum coherent product — the smallest version that fully delivers your value proposition to your target user.

---

## The Mental Model: Necessary vs. Sufficient

Most features fall into one of three buckets:

```
┌─────────────────────────────────────────────────────┐
│  NECESSARY       Features without which the product  │
│                  cannot deliver the core value at all │
├─────────────────────────────────────────────────────┤
│  VALUABLE        Features that improve the product   │
│                  meaningfully but aren't blockers     │
├─────────────────────────────────────────────────────┤
│  NICE TO HAVE    Features users would enjoy but      │
│                  won't switch or churn over           │
└─────────────────────────────────────────────────────┘
```

Your MVP ships Necessary. V2 ships the highest-value Valuable. Nice to Have goes on a backlog and gets revisited when you have real user data.

The hard part is that most founders classify too many features as Necessary. A feature is only truly necessary if its absence means users cannot get the core value you promised. Be ruthless about this.

---

## Step 1 — Apply the Value Proposition Filter

Before any framework, run every feature through this single question:

> [!WARNING]
> **If a user could only use this one feature, would they get closer to the outcome I promised them?**
If yes — it's a candidate for Necessary.
If no — it belongs in Valuable or Nice to Have.

This sounds obvious. It isn't. Teams routinely build admin panels, notification preferences, and export features before the core workflow works. Those features don't get users to the outcome — they improve the experience around it. Valuable, but not Necessary.

---

## Step 2 — Score Every Feature

Take your full feature list from the brainstorm. Score each feature across four dimensions.

Use a simple 1–3 scale per dimension. Don't overthink the scores — your first instinct is usually right.

| Dimension | 1 | 2 | 3 |
|---|---|---|---|
| **Value** | Minor improvement | Meaningful improvement | Core to the value prop |
| **Confidence** | Assumption only | Some signal | User research confirms it |
| **Reach** | Niche use case | Many users sometimes | All users every session |
| **Effort** | Weeks of work | Days of work | Hours of work |

Calculate a priority score: `(Value × Confidence × Reach) ÷ Effort`

This is a simplified version of the RICE framework. It's not a perfect formula — it's a thinking tool. The score surfaces which features you're overestimating and which you're undervaluing. Use it to challenge your instincts, not to replace them.

---

## Step 3 — Apply the Switching Cost Test

For every feature scored as high priority, ask:

> [!WARNING]
> **Would a user choose not to try my product if this feature was missing on day one?**
If yes — it must ship in v1.
If no — it can wait.

This is a different question from "do users want this?" Users want everything. The question is whether its absence is a dealbreaker at the adoption decision point.

Examples of features that commonly fail this test despite high enthusiasm:

- Advanced analytics (users need data before they need analytics)
- Team collaboration (many trials start with a single user)
- API access (most early users aren't developers)
- Custom branding (irrelevant until the core value is proven)
- Mobile app (desktop-first is usually fine for v1 B2B SaaS)

---

## Step 4 — Sequence What Remains

After filtering to your Necessary features, sequence them. Not everything necessary ships simultaneously — some features unlock others.

Map your dependencies:

```
[Feature A] must exist before [Feature B] makes sense
[Feature B] must exist before [Feature C] is accessible
```

This gives you a build order, not just a feature list. It also surfaces hidden complexity — sometimes Feature A depends on an architectural decision that takes weeks, which means Feature C is further away than it looked.

---

## The Table Stakes Trap

Some features are necessary not because they deliver value but because their absence signals that your product isn't serious. These are table stakes.

In production SaaS, common table stakes include:

- Password reset
- Email verification
- Basic account settings
- Data deletion / account removal
- HTTPS everywhere
- Responsive layout (at minimum, usable on mobile)

These features don't differentiate you. Users don't praise them. But their absence triggers immediate distrust — especially from users evaluating paid products.

Table stakes features often get deprioritized because they're unglamorous. They ship in v1 without exception.

---

## Use AI to Challenge Your Prioritization

Don't use AI to prioritize for you. Use it to poke holes in the priorities you've already set.

```prompt
I'm building a SaaS product with the following context:

Value Proposition: [paste yours]
Target User: [describe]
Primary Competitor Weakness I'm Exploiting: [describe]

Here is my current v1 feature list — the features I plan to ship first:

[paste your v1 list]

Here is what I've decided to defer to v2:

[paste your deferred list]

Challenge my prioritization by answering:

1. Are there any features in my v1 list that a user could realistically
   live without on day one? What would happen if I cut them?
2. Are there any features in my deferred list that users would expect
   to exist before they'd pay for this product?
3. Am I missing any table stakes features that aren't on either list?
4. Is my v1 coherent — can a user complete the full core workflow
   with only the features I've listed?
5. What is the single riskiest assumption embedded in my v1 feature set?

Be specific. Reference the value proposition I've stated.
```

The output will often surface one or two features you deprioritized that are actually blockers, and two or three features in your v1 that can safely wait. That's the point.

---

## The Coherence Test

Before locking your v1 list, walk through the complete user journey using only the features you plan to ship.

```
New user arrives → [Onboarding feature] → 
Gets set up → [Core feature 1] →
Does the core workflow → [Core feature 2] →
Gets the outcome → [Result/output feature] →
Returns and does it again → [Retention feature]
```

If you hit any step where there's no feature to cover it, you have a gap. Either add the missing feature to v1 or reconsider whether you've scoped the right starting workflow.

A v1 that covers 80% of the journey isn't an MVP — it's an incomplete product. The core loop must be completable end to end.

---

## What Good Prioritization Produces

When you've done this well, you should have:

- A v1 list of 8–15 features that form a complete, coherent user journey
- A v2 backlog ordered by the same scoring framework
- A "never" or "later" list of features you've explicitly decided not to build yet
- A clear build sequence based on feature dependencies
- At least 3 table stakes features confirmed for v1

If your v1 list has more than 20 features, it's not an MVP. Cut until it hurts, then cut one more.

---

## Common Prioritization Mistakes

> [!WARNING]
> **Building for the demo, not for retention**
>
> Features that look impressive in a demo are not always the features users need to come back. Prioritize the features that make users succeed, not the features that make investors nod.

---

> [!WARNING]
> **Prioritizing what you know how to build**
>
> Effort scores should reflect actual complexity, not your personal familiarity. A feature being unfamiliar doesn't make it high effort — it means you need to research it before estimating.

---

> [!WARNING]
> **Treating the v2 backlog as a commitment**
>
> The v2 list is a hypothesis. Real user behavior after v1 launches will change it significantly. Prioritize v2 loosely — you'll reprioritize it with actual data.

---

> [!WARNING]
> **Skipping the coherence test**
>
> A list of high-scoring features is not a product. A complete user journey is a product. Always walk the journey before locking v1.

---

## Validation Checklist

- [ ] Every feature on my v1 list is Necessary — not just Valuable
- [ ] I've scored every feature using Value, Confidence, Reach, and Effort
- [ ] I've applied the switching cost test to every high-priority feature
- [ ] My v1 list includes all relevant table stakes features
- [ ] I've mapped feature dependencies and have a build sequence
- [ ] I've walked the complete user journey using only v1 features and found no gaps
- [ ] My v1 list is 8–15 features
- [ ] I've used AI to challenge my prioritization and updated the list accordingly

---

## Quick Reference

```
Priority Score Formula
────────────────────────────────────────────────
(Value × Confidence × Reach) ÷ Effort
Score each dimension 1–3. Higher = higher priority.

The Three Filters
────────────────────────────────────────────────
Value prop filter   →  Does this get users to the outcome?
Switching cost test →  Would its absence prevent adoption?
Coherence test      →  Can the user complete the full journey?

V1 Feature Targets
────────────────────────────────────────────────
Total v1 features       →  8–15
Table stakes minimum    →  3–5
Must-have: complete user journey from entry to outcome

Bucket Definitions
────────────────────────────────────────────────
Necessary    →  V1. Absent = core value undeliverable.
Valuable     →  V2. Ordered by priority score.
Nice to Have →  Backlog. Revisit with real user data.
```
