---
title: Terms of Service
slug: terms-of-service
phase: Phase 5
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Terms of Service

Your Privacy Policy describes what you do with data. Your Terms of Service describes the actual rules of the marketplace — what buyers and sellers are allowed to do, what happens when they break those rules, and critically, what you're *not* responsible for when a transaction between two users goes wrong.

For a marketplace specifically, this last point matters more than almost any other clause in the document.

---

## Why Marketplaces Need Different Terms Than a Typical App

> ** Core distinction:** most apps have one relationship to manage — you and the user. A marketplace has three: you and the buyer, you and the seller, and the buyer-seller relationship that you're *facilitating but not party to*. Your Terms of Service exists largely to make that third relationship's boundaries explicit.

This is the structural reason marketplace platforms (eBay, Etsy, Airbnb) all have extensive language about being an "intermediary" rather than a party to the actual transaction — it's not boilerplate, it's the core of how marketplace liability works.

---

## What This Document Actually Needs to Cover

> ** Validation Checklist**
- [ ] **Platform role** — you facilitate listings, payments, and messaging; you are not the seller, and you don't guarantee the quality or legitimacy of listings (connects directly to the moderation limits you'll set below)
- [ ] **Acceptable use** — what's prohibited: fraudulent listings, harassment, scraping, ban evasion (mirrors what you built in Fraud Prevention and Abuse Detection — the terms are the user-facing statement of rules your code already enforces)
- [ ] **Account suspension/termination rights** — your right to suspend accounts for violations, and on what basis
- [ ] **Payment and fee terms** — how payments flow, what fees (if any) you take, refund handling
- [ ] **Dispute process** — what happens when a buyer and seller disagree (ties to your order confirmation flow from Fraud Prevention)
- [ ] **Limitation of liability** — you're not liable for the conduct of users, the quality of listed items, or losses from transactions between users
- [ ] **Content ownership** — who owns listing content/images (the seller does, but grants you a license to display it)

---

## The "Platform vs. Party" Distinction, in Practice

This single distinction shapes almost every other clause, so it's worth understanding directly rather than just copying language.

> **️ Warning:** If your Terms of Service is vague about whether you're a party to transactions, you risk being treated — legally and practically — as responsible for things you have no actual control over, like whether a seller ships a real product. Be explicit: you provide the platform, payment processing, and dispute tools; the actual sale is between buyer and seller.

```
Example structure (not copy-paste legal text — illustrative of the shape):

"[Platform] is a venue that connects buyers and sellers. We are not a party to
transactions between users. We do not own, inspect, or guarantee any listed item.
[Platform]'s role is limited to: facilitating payment processing, providing
communication tools, and enforcing these Terms."
```

---

## Decision: How Much Liability Protection to Build In

> ** Decision Card — Liability Posture**
>
> **Option A: Minimal terms, mostly acceptable-use rules**
> Faster to draft, leaves more legal exposure if a transaction dispute escalates.
>
> **Option B: Full marketplace-standard terms** — explicit intermediary language, liability limitations, indemnification clauses
> More protective, takes longer to get right, benefits significantly from at least one round of professional legal review given what's at stake.
>
> **For Personal Mode: draft toward Option B**, even at small scale. Unlike some other "defer until you need it" decisions in this curriculum, liability protection is cheap to draft now and expensive to be missing later — there's no real argument for skipping the core liability language just because your user base is currently small.

---

## Connecting Terms to What You Already Built

Your Terms of Service should be a true reflection of mechanisms you've already implemented — not aspirational language describing features that don't exist.

| Terms clause | Should match this earlier decision |
|---|---|
| "We may suspend accounts for [X] violations" | Your Abuse Detection and Fraud Prevention moderation logic |
| "Disputes are resolved through [process]" | Your order confirmation / auto-completion flow from Fraud Prevention |
| "Reviews must reflect genuine transactions" | Your Reviews module's completed-order requirement |
| "We do not guarantee delivery or item quality" | The buyer-seller intermediary distinction above |
| "Fees are [X]% per transaction" | Whatever you actually decided in Payments |

> ** Common Hallucination:** AI will sometimes draft terms describing a formal dispute resolution process, an appeals system, or moderation guarantees more elaborate than what you've actually built. Read your draft against the table above — if a clause promises a process your code doesn't implement, either build the mechanism or soften the language to match reality.

---

## Acceptable Use: Make It Specific to Your Marketplace

Generic "don't do illegal things" language is necessary but insufficient. Be specific to the abuse patterns you already designed defenses for — this also gives you clear contractual grounds to act when your detection systems flag something.

> ** Validation Checklist — Specific prohibitions worth naming explicitly**
- [ ] Creating fraudulent or misleading listings
- [ ] Attempting to complete transactions outside the platform to avoid fees or buyer protections
- [ ] Harassment or abusive communication through the messaging system
- [ ] Creating multiple accounts to evade suspension or manipulate reviews
- [ ] Scraping or automated data collection from the platform
- [ ] Posting fake reviews or manipulating the review system

---

## AI Prompt: Draft Terms Matching Your Actual Platform

> ** Copy Prompt**
>
> ```
> Draft Terms of Service for my personal marketplace project, reflecting what the
> platform actually does — not generic marketplace boilerplate.
>
> Platform facts:
- We are an intermediary connecting buyers and sellers; we are not a party to
>   transactions and don't guarantee listing accuracy or item quality
- Payments are processed via [your processor]; we [do/don't] take a platform fee of [X]%
- Orders move through this status flow: [paste your order status flow from
>   Fraud Prevention/Payments]
- We can suspend accounts for: fraudulent listings, harassment, ban evasion,
>   review manipulation, scraping
- Reviews require a completed order (per our Reviews system) and cannot be deleted
>   by sellers
- Dispute handling: [describe your actual process — e.g. buyer confirmation window,
>   reporting tools, manual review]
>
> Cover: platform role/liability limitation, acceptable use (specific to the
> prohibitions above), account termination rights, payment/fee terms, content
> ownership, dispute process. Plain language where possible. Flag any section where
> professional legal review is especially important given the liability stakes.
> ```
>
> **Why this prompt works:** supplying your actual order status flow and moderation rules — rather than letting AI invent a generic dispute process — is what keeps the document accurate to your real mechanisms, avoiding the mismatch problem covered above.

---

## This Module Is Not Legal Advice

Same disclaimer as Privacy Policy, and for the same reason: Terms of Service carries real liability implications once you have real transactions happening. Treat the AI-generated draft as a strong starting point that should get professional legal review before you're handling meaningful transaction volume — this matters even more here than for the Privacy Policy, given how directly liability limitation clauses can be tested in a real dispute.

---

## Token Efficiency Tip

Draft your Privacy Policy and Terms of Service in the same conversation if you're doing both back to back — they share factual context (your data flows, your platform's actual mechanisms) and keeping them in one conversation prevents inconsistencies between the two documents describing the same underlying app differently.

---

## What You've Decided

By the end of this module you should have:

- Clear platform-vs-party language establishing you as an intermediary, not a transaction participant
- Acceptable-use rules specific to the abuse patterns your code already detects
- Terms that accurately reflect your actual dispute, suspension, and review mechanisms — not aspirational processes you haven't built
- A document flagged for professional legal review before scaling beyond a small user base

**Next:** Beta Testing — getting real users into your marketplace before a full launch.
