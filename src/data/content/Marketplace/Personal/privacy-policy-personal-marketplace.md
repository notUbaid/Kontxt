---
title: Privacy Policy
slug: privacy-policy
phase: Phase 5
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Privacy Policy

A privacy policy isn't a formality you paste in before launch and forget. For a marketplace, it's a real description of what you actually do with buyer and seller data — names, addresses, messages, payment metadata — and real users will, eventually, ask about it.

This module isn't legal advice (you'll see that disclaimer again below, deliberately). It's about understanding what your privacy policy actually needs to cover *given what you built in this curriculum*, so you're not shipping a generic template that doesn't match your real data practices.

---

## Why This Can't Just Be a Generic Template

> **️ Warning:** A privacy policy that doesn't match what your app actually does is worse than no policy at all — it's a binding statement you can be held to, and a mismatch (e.g. claiming you don't share data with third parties when your payment processor clearly receives it) is a real liability, not just an oversight.

Your marketplace has specific data flows a generic template won't capture correctly:

- Messages between buyers and sellers (private, but stored — who can access them, and for how long?)
- Payment data that flows through a third-party processor (you likely never store card numbers, but you do store transaction metadata)
- Reviews tied to real transactions (publicly visible, but linked to your internal order data)
- Reports submitted about other users (sensitive — about a third party, not just the user themselves)

---

## What a Marketplace Privacy Policy Actually Needs to Cover

> ** Validation Checklist**
> - [ ] **What data you collect** — account info, listing content, messages, payment metadata (not full card numbers — your processor handles those), IP addresses logged for security/abuse purposes
> - [ ] **Why you collect it** — tie each category to an actual purpose (fraud prevention, enabling transactions, platform safety) rather than vague language
> - [ ] **Who you share it with** — your payment processor, your hosting/database provider, your error tracking service (Sentry sees real user data when exceptions are captured — this is genuinely worth disclosing)
> - [ ] **How long you retain it** — connects directly to your Logging and Backups decisions; if you said 7-14 days of logs, your policy should reflect that, not claim indefinite retention or vice versa
> - [ ] **User rights** — ability to request account deletion, data export, message/data access
> - [ ] **How buyers and sellers see each other's information** — this is marketplace-specific: does a buyer see a seller's real name? Email? Only through your messaging system?

---

## Decision: Building vs. Buying Your Policy

> ** Decision Card — Privacy Policy Approach**
>
> **Option A: Generic free template, lightly edited**
> Fast, but risks the mismatch problem above — generic templates often claim practices (or omissions) that don't match what you built.
>
> **Option B: AI-assisted draft based on your actual data flows, reviewed carefully**
> Faster than writing from scratch, and can be made accurate to your specific app if you provide the right input — covered in the prompt below.
>
> **Option C: A paid privacy policy generator service** (e.g. Termly, iubenda)
> Often includes jurisdiction-specific compliance handling (GDPR, CCPA) that's genuinely hard to get right manually — worth it if you're handling EU or California users and want more legal robustness.
>
> **For Personal Mode: use Option B as your starting point**, and consider upgrading to Option C if you have or expect users in jurisdictions with specific legal requirements (the EU and California have the most well-known ones). Either way, **have a real lawyer review this before you have real paying users at meaningful scale** — this curriculum can help you draft something reasonable, not replace legal review.

---

## Data You Should NOT Be Collecting (If You Are, Fix the Code First)

> ** Common Hallucination:** AI sometimes drafts a privacy policy that *describes* careful data handling your code doesn't actually implement — e.g. claiming "we never store full payment details" while your code does exactly that. Before finalizing your policy, re-verify against the Security and Payments modules: confirm card numbers genuinely never touch your database, confirm passwords are hashed not stored plaintext, confirm message bodies aren't logged in full (per the Logging module).

> ** Validation Checklist — Verify before writing the policy, don't just write the policy**
> - [ ] No full payment card numbers in your database (your processor should handle this entirely)
> - [ ] Passwords are hashed (bcrypt/argon2), never stored or logged in plaintext
> - [ ] Message content isn't logged in full anywhere (per Logging module's rules)
> - [ ] You actually know what your error tracker (Sentry) captures by default — it may include more user data than you'd assume unless configured otherwise

---

## Jurisdiction: Know What Applies to You

> ** Core rule:** you don't need to comply with every privacy law globally on day one, but you do need to know which ones plausibly apply, based on where your users actually are.

| Law | Applies if | What it generally requires |
|---|---|---|
| GDPR (EU) | You have EU users, regardless of where you're based | Explicit consent, right to deletion, data portability, breach notification |
| CCPA (California) | You have California users above certain thresholds | Right to know what's collected, right to opt out of sale, right to deletion |
| No specific law | Smaller/local personal project, no EU/CA users | Still good practice to follow privacy basics; no legal requirement doesn't mean no policy |

This table is a starting orientation, not a compliance checklist — actual applicability depends on specifics (user volume, revenue, data types) that change over time as your project grows. Don't treat this table as the final word.

---

## AI Prompt: Draft a Policy Matching Your Actual App

> ** Copy Prompt**
>
> ```
> Draft a privacy policy for my personal marketplace project, based on what it actually
> does — not a generic template.
>
> Data we collect:
> - Account info: [email, name, etc. — list what you actually collect at signup]
> - Listing content: title, description, images, price
> - Messages between buyers and sellers (stored in our database)
> - Payment metadata via [Stripe/your processor] — we never store full card numbers
> - IP addresses, logged for rate limiting and abuse prevention
> - Error tracking via Sentry, which may capture user ID and request context on errors
>
> Data retention:
> - Logs retained for [N] days (per your Logging module decision)
> - Account data retained until deletion is requested
> - [Your actual backup retention from the Backups module]
>
> Third parties we share data with:
> - [Payment processor], [hosting provider], [Sentry/error tracking]
>
> Write this in plain language, not dense legalese, while covering: what we collect,
> why, who we share it with, retention periods, and how users can request deletion
> or export of their data. Flag anywhere you're uncertain whether something requires
> specific legal language (e.g. GDPR-specific clauses) so I know what to have reviewed.
> ```
>
> **Why this prompt works:** providing your *actual* data flows (not asking AI to guess what a marketplace "typically" collects) is what prevents the mismatch problem — and asking it to flag uncertain legal language tells you exactly where professional review matters most, rather than treating the whole document as equally settled.

---

## This Module Is Not Legal Advice

This curriculum, and any AI-generated draft, gives you a working starting point — not a substitute for an actual lawyer, especially once you have real users, real payments, and real liability. Treat the AI-generated draft as version 0.1 of a document a professional should eventually review, particularly before scaling beyond a small personal user base.

---

## Token Efficiency Tip

This is a one-time document that should be revisited only when your actual data practices change (a new third-party integration, a new data type collected) — not regenerated every time you touch the app. When something does change, ask AI to *update the specific affected section* of your existing policy, rather than redrafting the whole document and risking inconsistency with sections that didn't need to change.

---

## What You've Decided

By the end of this module you should have:

- A privacy policy that describes your actual data flows, not generic marketplace assumptions
- Verified alignment between what your code does and what your policy claims
- A clear sense of which jurisdictions' privacy laws plausibly apply to your user base
- An understanding that this is a starting draft, not a finished legal document

**Next:** Terms of Service — the rules governing how buyers and sellers use your platform.
