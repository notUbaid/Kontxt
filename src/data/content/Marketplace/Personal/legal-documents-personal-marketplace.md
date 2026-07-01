---
title: Legal Documents
slug: legal-documents
phase: Phase 5
mode: personal
projectType: marketplace
estimatedTime: 15-20 min
---

# Legal Documents

A marketplace is the one app type where "I'll figure out the legal stuff later" can genuinely sink the project — you're not just collecting data, you're standing between two strangers' money, goods, or services. This module isn't about becoming a lawyer. It's about knowing exactly which documents a solo-built marketplace actually needs, and which you can reasonably defer.

## The Decision You're Actually Making

Not "what legal documents exist." It's: **which of these protect me and my users in ways that actually matter at my current scale, and which are premature for a personal project with a handful of early users?**

A marketplace connecting friends-of-friends for a hobby project needs real protection but not the same depth as one processing thousands of transactions. Match the document to the actual risk.

## The Documents That Matter Specifically Because You're a Marketplace

| Document | Why a marketplace needs this beyond a typical app | Skip if... |
|---|---|---|
| Terms of Service | Defines who's actually liable when a transaction goes wrong between two users | Never skip — even at smallest scale |
| Privacy Policy | You're handling data from two distinct user types (buyers and sellers) with different needs | Never skip — required if you collect any personal data |
| Marketplace/Platform Agreement | Clarifies you're a platform connecting parties, not a party to the transaction yourself | You take on inventory/liability directly (then you're not really a marketplace) |
| Refund/Dispute Policy | Without this, every disagreement becomes an improvised judgment call | Never skip — disputes are inevitable, not hypothetical |
| Seller Agreement | Sets expectations for what sellers can list and how they get paid | If sellers are vetted manually, one-on-one, at very small scale |

> **⚠️ Warning:** The single most important legal concept for a marketplace is establishing that you are a *platform facilitating* transactions, not a *party to* them. Without clear terms saying this, you can end up legally treated as responsible for the quality, safety, or legality of what's actually being sold — a much bigger liability than running the software.

## Decision: How Much Custom Legal Work Does a Personal Project Need?

| Your situation | Reasonable approach |
|---|---|
| Hobby marketplace, friends/local community, no real money or low stakes | Adapted template ToS/Privacy Policy, reviewed by you carefully | 
| Real money changing hands, strangers transacting | Template as a strong starting point, ideally reviewed by a lawyer once there's real usage |
| Handling sensitive categories (services in someone's home, regulated goods) | Don't rely on templates alone — this is where professional review earns its cost |

> **✅ Best Practice:** A well-adapted template is a legitimate starting point for a personal project — this isn't about needing a $5,000 lawyer bill before writing any code. The goal is having something real in place before real money moves, then upgrading it as the project's stakes grow.

> **⚠️ Important:** I can help you understand what these documents need to cover and draft a starting template, but I'm not a lawyer, and this isn't legal advice. Once your marketplace handles real transactions at meaningful volume, have an actual lawyer review your terms — the cost is small relative to the liability it addresses.

## What Your Terms of Service Specifically Needs to Cover

- [ ] You are a platform connecting buyers and sellers, not a party to their transactions
- [ ] Who is responsible for the accuracy of listings (the seller, not the platform)
- [ ] What happens when a transaction goes wrong — refunds, disputes, who decides
- [ ] Grounds for removing a listing or suspending a user account
- [ ] Limitation of liability — capping what users can hold you responsible for
- [ ] How and when these terms can change, and how users are notified

> **💡 Tip:** Write the dispute and liability sections first, not last. These are the sections that actually get tested when something goes wrong between users — the rest of the document matters far less in practice.

## What Your Privacy Policy Needs That a Typical App's Doesn't

A marketplace collects and shares data between two parties who don't know each other, which is a meaningfully different privacy situation than a single-user app.

- [ ] What information is shared between buyer and seller (and what stays private)
- [ ] How payment information is handled (ideally: you never touch raw card data — that's your payment processor's job)
- [ ] What happens to a user's data and transaction history if they delete their account
- [ ] Whether and how listing/review data remains visible after a user leaves

> **⚠️ Warning:** Never let raw payment card details touch your own servers or database. Use a processor like Stripe Connect that handles this directly — beyond the engineering risk, storing card data yourself creates compliance obligations (PCI-DSS) that are seriously impractical for a personal project to meet.

## Use AI to Draft a Starting Template

**Prompt — Marketplace ToS Draft**
```
Draft a Terms of Service for a personal-project marketplace with these 
characteristics:
[describe: what's being bought/sold, whether payments go through a 
processor like Stripe, approximate scale, and any specific policies 
you already have in mind — e.g. no refunds after 7 days]

Cover specifically:
1. Platform vs. transaction-party liability (we facilitate, we don't 
   sell or guarantee what's listed)
2. Dispute and refund process
3. Grounds for listing removal or account suspension
4. Limitation of liability

Write in plain language a non-lawyer founder would actually understand, 
not dense legal boilerplate. Flag clearly which sections are most 
important to have a lawyer review before relying on this at real scale.
```

> **💡 Token Efficiency:** Describe your actual marketplace mechanics (what's sold, how payment flows, what disputes typically look like) rather than asking for a generic template — a generic ToS misses the specific liability questions that actually matter for your product, and you'll just end up iterating to add them anyway.

## Validate Before Launch

- [ ] Terms of Service explicitly states you're a platform, not a transaction party
- [ ] Privacy Policy reflects what data actually flows between buyers and sellers in your real implementation
- [ ] You've confirmed payment processing never touches raw card data on your own infrastructure
- [ ] Dispute/refund policy exists and is genuinely workable for you to enforce as a solo builder
- [ ] Both documents are linked and accessible before a user can complete a transaction, not buried in a footer

## Common Mistakes

- No clear statement that you're a platform, not a seller — leaves you exposed to liability for what users list
- Privacy Policy copied from a generic SaaS template that doesn't address two-sided data sharing
- Storing payment information directly instead of delegating to a processor
- Refund/dispute policy that sounds good in writing but isn't realistic for one person to actually enforce
- Treating legal documents as a checkbox instead of reading them closely enough to know what you've actually committed to

## Quick Reference

| Must-have before any real transaction | Reasonable to adapt from template | Get a lawyer before scaling |
|---|---|---|
| Terms of Service (platform vs. party) | Refund/dispute policy wording | Regulated goods/services categories |
| Privacy Policy (two-sided data flow) | Seller agreement basics | High transaction volume/revenue |
| Payment processor handling card data | Account suspension grounds | Cross-border transaction complexity |
| Liability limitation clause | Listing accuracy responsibility clause | Any dispute that escalates to legal action |

## What's Next

With your legal foundation in place, the next module covers Legal Policies — the more specific, operational rules (what can and can't be listed, community standards, enforcement) that sit underneath these foundational documents.
