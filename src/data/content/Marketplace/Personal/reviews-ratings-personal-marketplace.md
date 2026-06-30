---
title: Reviews & Ratings
slug: reviews-ratings
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Reviews & Ratings

## Why This Is Architecture, Not a Feature You Bolt On Later

Reviews look like a simple feature — a star rating and a text box. The architecture underneath isn't simple, because reviews touch trust (Phase 1), authorization (who can review whom, and when), and your user model (whose reputation is this attached to — the listing, or the person?). Getting the data model right now avoids a painful migration later, once real reviews exist that you can't easily restructure.

Your Trust & Safety module flagged reviews as a Medium-effort mechanism you add "once you have repeat buyers, not before." This module assumes you've reached that point and are designing it properly.

---

## The Core Decision: What Gets Reviewed?

| Model | What's Reviewed | Fits When |
|---|---|---|
| **Review the listing** | Item/service quality | Marketplaces where the same seller has many different listings of varying quality |
| **Review the seller** | The person/account overall | Marketplaces where trust is primarily about the person, not the specific item |
| **Both** | Listing quality + seller reliability separately | More complex but more accurate — appropriate once you have the engineering budget for it |

> ✅ **Best practice for personal mode:** Start with reviewing the **seller**, not the listing. It directly reinforces the trust signal your Buyer Journey module identified as a credibility factor, it's simpler to build (one rating per transaction, attached to a user), and it avoids fragmenting reputation across many low-volume listings where a single review would swing the average wildly.

---

## Reviews Must Be Tied to a Real Transaction

> ⚠️ **Critical rule:** Never allow reviews without a verified completed transaction between the two parties. Open reviews (anyone can review anyone) are immediately exploitable — fake reviews, competitor sabotage, review manipulation. This single constraint eliminates most review fraud risk without any additional moderation tooling.

This means your review system has a hard dependency: it can't be built before your transaction/order model exists, because every review needs to reference a specific completed transaction. Sequence this after Payments Architecture, not before.

---

## What a Review Record Actually Needs

| Field | Purpose |
|---|---|
| Linked transaction ID | Enforces the "must have transacted" rule above |
| Reviewer ID and reviewee ID | Who left it, who it's about |
| Rating (numeric) | The core trust signal |
| Written comment (optional) | Adds context — required field would create friction for a quick rating |
| Direction (buyer→seller or seller→buyer) | Determines whether you support two-way reviews (see below) |
| Timestamp | Recency matters — see Reviews Optimization in Phase 6 |

---

## One-Way or Two-Way Reviews?

| Model | How It Works | Trade-off |
|---|---|---|
| **One-way** | Only buyers review sellers | Simpler; matches the asymmetric trust need from your Buyer Journey |
| **Two-way** | Buyers and sellers review each other | More complete picture, but adds complexity and a retaliation-review risk |

> 💡 **Tip:** If you do implement two-way reviews, don't reveal either party's review until both have submitted or a time window expires. Visible-immediately reviews create retaliation dynamics — a seller who got a bad review can retaliate with one of their own, which discourages honest buyer feedback. This is a well-known failure mode; design around it from the start rather than patching it after launch.

---

## Personal-Mode Scope: What to Skip For Now

| Feature | Skip Until |
|---|---|
| Weighted/verified review badges | You have enough volume that review authenticity becomes a real concern |
| Review response (seller replies to a review) | Post-launch — nice-to-have, not core to trust |
| Photo reviews | Adds storage/moderation overhead disproportionate to early value |
| Review moderation queue | Your manual reporting flow from Trust & Safety already covers this — don't build a separate system |

---

## How Reviews Feed Back Into Trust

This isn't a standalone feature — it directly upgrades the trust mechanism stack you designed in Trust & Safety Planning. Once real reviews exist, they should start replacing your early manual-approval reliance:

- A new seller with zero reviews still needs your Phase 1 trust signals (profile completeness, manual approval)
- A seller with several positive reviews can reasonably graduate out of mandatory pre-approval, if your risk profile allows it
- A seller with negative reviews or reports should be flagged for your manual review — this is your enforcement ladder in action, not a new system

---

## AI Prompt: Designing Your Review Schema

```
I'm building a personal-scale marketplace for [your niche] using
[your chosen stack from Tech Stack Selection].

Review direction: [one-way buyer→seller / two-way]
What's reviewed: [seller / listing / both]
Transaction model: [briefly describe how transactions are recorded,
if decided yet — otherwise note "not yet designed"]

Design a review schema that:
1. Enforces reviews only on verified completed transactions
2. Supports the direction and target I specified above
3. Avoids the retaliation-review problem if two-way

Keep this scoped to what a solo developer ships at launch — flag
clearly which parts of a "full" review system (verified badges,
photo reviews, response threads) I'm correctly deferring.
```

---

## Common Mistake: Launching Without Any Reviews Visible

> ⚠️ A reverse mistake also happens: founders build the review system but don't surface it anywhere visible on listings or profiles, because it feels like a "backend feature." If reviews exist but buyers can't see them at the point of decision, you've built the trust signal and then hidden it. Surface average rating and review count directly on listings and seller profiles — this is exactly the credibility signal your Buyer Journey module said buyers need.

---

## What You Should Walk Away With

1. A decided review target: seller, listing, or both
2. A decided direction: one-way or two-way, with a retaliation-handling approach if two-way
3. A review schema tied to verified transactions
4. A plan for where reviews surface in the UI (listings, profiles)

This module assumes a transaction record already exists to attach reviews to — if Payments Architecture isn't designed yet, revisit this module after that one.
