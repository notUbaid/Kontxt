---
title: Terms of Service
slug: terms-of-service
phase: Phase 5
mode: production
projectType: saas
estimatedTime: 20-30 min
---

# Terms of Service

Your Privacy Policy answers "what do you do with my data?" Your Terms of Service answers a different question: "what am I agreeing to by using this, and what happens when something goes wrong?"

Founders often treat these as the same document with different names. They're not. A Privacy Policy is about data practices. Terms of Service is about the legal relationship between you and the user — liability, acceptable use, payment terms, and what happens when either side breaks the deal.

> ** Important boundary**
> Kontxt is not a lawyer, and this is not legal advice. Terms of Service carry real liability consequences — a poorly worded limitation-of-liability clause can be unenforceable exactly when you need it most. AI-drafted terms should be reviewed by a qualified professional before publishing, especially once you're processing payments or operating at meaningful scale. This module covers the engineering-relevant groundwork: what decisions need to be made, and what to check before you trust a draft.

---

## The Core Idea: Terms of Service Is Risk Allocation

Every clause in a ToS exists to answer one question: **if something goes wrong, whose problem is it?**

- If your service goes down for 6 hours, is that your problem or the user's?
- If a user uploads content that gets your company sued, whose problem is that?
- If a user shares their account with 50 people instead of paying for 50 seats, what can you actually do about it?

Thinking about your ToS this way — as a list of "who's responsible when X happens" decisions — produces a far more useful document than starting from a generic template and hoping it fits.

---

## Step 1: Decisions You Actually Need to Make

These aren't legal questions yet — they're product and risk decisions only you can make, because they depend on your business model.

**Decision Card — Core ToS Decisions**

| Decision | Questions to Answer |
|---|---|
| Acceptable use | What is explicitly prohibited? (e.g., reselling access, scraping, illegal content, abuse of other users) |
| Account termination | Under what conditions can you suspend or delete an account? Can you do it without notice for severe violations? |
| Liability limits | Are you willing to cap your liability at the amount the user paid you? (Standard practice — but the legal enforceability varies by jurisdiction) |
| Service availability | Do you promise any uptime? (Most early-stage SaaS should NOT promise a specific SLA unless they can actually meet it) |
| User content ownership | Who owns content a user uploads or creates in your product? (Usually: the user owns it, you get a license to operate the service) |
| Payment and refunds | What's your actual refund policy? This must match what your Stripe/payment configuration enforces |
| Governing law | Which jurisdiction's laws apply if there's a dispute? |

> ** Tip**
> Don't promise an SLA (uptime guarantee) you haven't engineered for. If your ToS says "99.9% uptime guaranteed" but you're running on a single server with no redundancy, you've created a liability that your infrastructure can't back up. Either build the reliability first, or don't make the promise yet.

---

## Step 2: Match the ToS to What You Actually Built

This is the engineering-relevant check most founders skip. Your terms have to be consistent with your actual implementation, not aspirational.

- **Refund policy** must match what your billing system actually does (Stripe settings, cancellation flow)
- **Data export/account deletion clauses** must match real functionality, same as in your Privacy Policy
- **"We may suspend accounts for violations"** requires an actual admin process to do that — even a manual one
- **Subscription terms** (auto-renewal, cancellation notice period) must match your actual billing logic, not just the words in the document

> ** Warning**
> A mismatch between your ToS and your actual product behavior isn't just sloppy — it can be used against you in a dispute. If your terms say cancellations take effect "immediately" but your billing logic still charges the next cycle, that's a real, fixable bug with legal consequences, not just a UX inconsistency.

---

## Drafting With AI

AI can structure a complete, professional-sounding ToS quickly. The risk is the same as with any legal document: confident-sounding clauses that don't actually fit your business model or jurisdiction.

**Prompt: Terms of Service Draft from Your Decisions**

```
I'm drafting Terms of Service for a SaaS product. Here are the
specific decisions for my business:

- Acceptable use restrictions: [list yours]
- Account termination policy: [describe]
- Liability cap: [e.g., "limited to amount paid in the last 12 months" or "none decided yet"]
- Uptime/SLA commitment: [none / specific percentage]
- Content ownership: [e.g., "user retains ownership, grants us license to operate the service"]
- Refund policy: [describe, matching actual billing configuration]
- Governing law: [jurisdiction]

Draft Terms of Service based ONLY on these decisions. Do not invent
clauses I haven't specified. Where a standard SaaS ToS would normally
include something I haven't decided on, flag it in brackets rather
than assuming a default.
```

> ** Why this prompt works**
> Like the Privacy Policy prompt, constraining the draft to decisions you've explicitly made prevents the model from inventing liability terms, SLAs, or restrictions that don't reflect your actual business — and don't match what your codebase enforces. The bracket-flagging instruction surfaces gaps for you to decide on, rather than letting the model silently pick defaults that may not suit your risk tolerance.

**Token efficiency note:** Make all the decisions in the table above first, in one sitting, before drafting. Going back and forth — "actually change the liability clause," "actually add an SLA" — across many separate prompts produces a document with inconsistent tone and structure. One complete decision set, one draft, one review pass.

---

## Validating the Draft

- [ ] Every clause about functionality (refunds, deletion, suspension) matches what your system actually does
- [ ] No SLA or uptime promise exists unless your infrastructure can realistically back it up
- [ ] Liability limitation language has been reviewed by a professional — enforceability varies significantly by jurisdiction and this is one of the highest-stakes clauses in the document
- [ ] Governing law and dispute resolution clauses match where your company is actually incorporated/operating
- [ ] The document doesn't contradict your Privacy Policy (e.g., data retention claims should match across both documents)

> ** Note**
> Read your own Terms of Service as if you were the user. If a clause would feel like a bait-and-switch to you in that position, it's worth a second look — not necessarily because it's illegal, but because trust, once lost from a hostile-feeling ToS, is hard to win back.

---

## Quick Reference: Minimum Viable Terms for Launch

1. Acceptable use policy (what's prohibited)
2. Account termination conditions
3. Liability limitation (reviewed by a professional)
4. Payment and refund terms, matching your actual billing configuration
5. Governing law

Everything more elaborate — detailed SLAs, indemnification clauses, arbitration requirements — can be added as your business grows and your risk profile changes. Don't over-engineer the legal document before you've over-engineered the product.

---

## What's Next

With Privacy Policy and Terms of Service both grounded in what your product actually does, move to **Cookie Policy** — a smaller but still legally required document, especially if you have users in the EU/UK.
