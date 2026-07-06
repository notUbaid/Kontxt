---
title: Privacy Policy
slug: privacy-policy
phase: Phase 5
mode: production
projectType: saas
estimatedTime: 20-30 min
---

# Privacy Policy

A Privacy Policy is not boilerplate text you paste in to make a footer link stop being empty. It's a legal document that describes what your system actually does with user data — and if it doesn't match reality, you have a compliance problem, not just a content gap.

This module focuses on what's actually your job as the engineer: knowing what data your system collects, so whoever drafts or reviews the policy (you, a lawyer, or a generator tool) is working from accurate facts instead of guesses.

> ** Important boundary**
> Kontxt is not a lawyer, and this module is not legal advice. AI-generated privacy policy text should be reviewed by a qualified professional before publishing, especially if you handle health data, payment data, children's data, or operate in the EU/UK (GDPR), California (CCPA/CPRA), or other regulated jurisdictions. What follows is the engineering groundwork that makes that review fast and accurate instead of a guessing exercise.

---

## The Core Idea: You Can't Write an Accurate Policy You Haven't Audited

The most common failure mode isn't a missing policy — it's a policy that says something different from what the codebase actually does. A generic template might claim "we do not share data with third parties" while your analytics tool, error tracker, and email provider are all third parties receiving user data right now.

Before any policy gets written, you need a **data inventory**.

---

## Step 1: Build Your Data Inventory

Go through your actual stack and list every place user data flows.

**Decision Card — Data Inventory Template**

| Data Type | Where It's Collected | Where It's Stored | Third Parties That Receive It | Purpose |
|---|---|---|---|---|
| Email address | Signup form | Primary database | Email provider (e.g., Postmark), Analytics tool | Account access, transactional emails |
| Payment info | Checkout | Never touches your DB | Payment processor (e.g., Stripe) | Billing |
| IP address | Every request | Server logs | Hosting provider, error tracker | Security, debugging |
| Usage events | In-app actions | Analytics tool's servers | Analytics provider | Product improvement |

Fill this out for your actual product. This single table is the source of truth that any privacy policy — AI-drafted or lawyer-drafted — must accurately reflect.

> [!TIP]
> Every third-party SDK or API you call is a data-sharing relationship, even if you didn't think of it that way. Your error tracker sees stack traces that may include user data. Your analytics tool sees user IDs and behavior. List all of them.

---

## Step 2: Know Which Regulations Apply

You don't need to become a privacy lawyer, but you do need to know which rules are even in scope, since that determines what the policy must contain.

| Regulation | Applies If | Key Requirement |
|---|---|---|
| GDPR (EU/UK) | You have users in the EU/UK, regardless of where your company is based | Lawful basis for processing, right to deletion, right to data export, data breach notification |
| CCPA/CPRA (California) | You meet revenue/data volume thresholds and have California users | Right to know, right to delete, right to opt out of "sale" of data |
| COPPA (US) | Your product could be used by children under 13 | Parental consent requirements — often easiest to simply prohibit under-13 use in your Terms |

> [!NOTE]
> If you have zero EU users and zero children using your product, your compliance burden is much lower — but "I don't think we have EU users" is not the same as verified. Check your analytics for actual visitor geography before assuming.

---

## Step 3: Draft With AI, Review With a Professional

AI can produce a structurally complete first draft fast. It cannot make legal judgment calls about your specific risk exposure, and it can confidently generate clauses that sound right but don't match your jurisdiction's actual requirements.

**Prompt: Privacy Policy Draft from Data Inventory**

```
I'm drafting a privacy policy for a SaaS product. Here is my actual
data inventory — what we collect, where it's stored, and which third
parties receive it:

[paste your completed data inventory table]

Our users are primarily located in: [list regions/countries]
We do / do not knowingly serve users under 18: [specify]

Draft a privacy policy section by section based ONLY on the data
inventory above. Do not invent data collection practices we haven't
listed. Flag clearly, in brackets, anywhere you're uncertain whether
a clause applies to our situation, so I can review it with a
professional.
```

> ** Why this prompt works**
> Constraining the draft to your actual data inventory prevents the model from generating generic boilerplate that claims practices you don't follow (or omits ones you do). The explicit instruction to flag uncertainty turns hallucination risk into visible markers you can hand to a reviewer, instead of confident-sounding text that quietly papers over gaps.

**Token efficiency note:** Draft once from a complete data inventory rather than iterating clause-by-clause across many separate prompts. A messy multi-session draft is harder for a legal reviewer to evaluate than one coherent document, even if the single draft takes more upfront prep.

---

## Validating the Output

Never publish AI-drafted legal text without checking it against reality. Specifically:

- [ ] Every third party named in the policy actually appears in your data inventory — and every third party in your inventory is named in the policy
- [ ] Claims like "we do not sell your data" are true given your actual analytics/ad integrations (some analytics tools' default configurations count as a "sale" under CCPA's broad definition)
- [ ] Data retention claims match reality — if the policy says "we delete your data within 30 days of account deletion," your backend actually has to do that
- [ ] The contact method listed for privacy requests is real and monitored
- [ ] A qualified professional has reviewed the final draft before it goes live, especially for any jurisdiction-specific clauses

> [!WARNING]
> The most expensive privacy policy mistake isn't a missing policy — it's a policy that makes promises your system can't keep. "We will delete all your data within 30 days" is a real commitment. If you say it, your backend needs an actual deletion job that fulfills it, not just good intentions.

---

## Implementation Note: Make the Policy Enforceable, Not Just Readable

A few engineering tasks usually fall out of a privacy policy and need to exist in your actual system:

- A data deletion endpoint or admin process (even manual, for early stage) that fulfills "right to be forgotten" requests
- A data export function if you commit to data portability
- A documented process for what happens when a privacy request email arrives — who handles it, in what timeframe

These don't need to be built before launch if your user base is small, but they need to exist before you make the promise in writing.

---

## What's Next

With your data practices documented and an accurate policy in review, move to **Terms of Service** — the document that defines what users are agreeing to when they use your product, including liability boundaries that a privacy policy doesn't cover.
