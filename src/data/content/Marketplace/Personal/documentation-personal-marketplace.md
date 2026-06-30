---
title: Documentation
slug: documentation
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Documentation

## Closing Phase 3 by Capturing What You'd Otherwise Forget

You've made dozens of specific decisions across two phases — account models, status state machines, fee structures, deferred features. Right now they're fresh. In three months, mid-debugging a production issue, they won't be. This module isn't about writing polished docs for other people; it's about writing the notes that future-you actually needs, while the reasoning is still in your head.

This is the last module of Phase 3 for a reason — document the system as it actually got built, not as it was originally planned. The two have likely diverged in small ways, and the gap matters.

---

## What's Actually Worth Documenting at This Scale

> ⚠️ Don't write comprehensive documentation covering every function and endpoint — that goes stale almost immediately and nobody, including you, will maintain it. Document the things that are expensive to re-derive if forgotten: decisions, not implementation details your code already shows.

| Document This | Skip This |
|---|---|
| Why you chose dual-role over separate accounts | Function-by-function code comments explaining obvious logic |
| The full status state machines (Listing, Transaction) and valid transitions | A complete API reference (your code/types already are that reference) |
| What you deliberately deferred, and the threshold to revisit it | Detailed UI component documentation |
| Your fee structure and how it's calculated | Step-by-step setup instructions for tools with their own official docs |

---

## The One Document That Matters Most: Your Deferred-Features List

Across this entire curriculum, you've made dozens of "not yet, defer until X" decisions — dedicated search until thousands of listings, RBAC until a second admin, read receipts, automated dispute rules. These are easy to forget and easy to accidentally re-litigate later without remembering you already made the call.

- [ ] Compile every "defer until ___" decision from Phase 2 and 3 into one list
- [ ] For each, note the specific trigger condition (not just "later" — "once listing volume exceeds X")
- [ ] Revisit this list, not your memory, when you're tempted to add complexity later

> ✅ **Best practice:** This single document prevents the most common form of scope creep in personal-mode projects — re-adding complexity you specifically and correctly decided to avoid, simply because you forgot you'd already made that call deliberately.

---

## Document State Machines as Diagrams, Not Prose

Your Listing and Transaction status flows are referenced constantly across modules — capture them visually, once, rather than re-explaining them in prose every time they're relevant.

```
Listing:    Draft → Pending Approval → Active → Sold/Completed
                          ↓                ↓
                      Rejected          Removed

Transaction: Initiated → Payment Held → Completed
                                ↓
                            Disputed → Resolved (Refunded/Released/Partial)
```

> 💡 **Tip:** A diagram like this, kept in a single README or architecture doc, answers "wait, can a Disputed transaction go back to Payment Held?" in two seconds instead of requiring you to re-read the Dispute Resolution and Backend modules to reconstruct the answer.

---

## The Setup Doc: For You, Three Months From Now

A short, practical doc covering exactly what's needed to run this project locally and understand its current state — not a polished onboarding guide for hypothetical future hires.

- [ ] Environment variables needed (Stripe keys, auth provider keys, database URL) — names only, never actual secrets
- [ ] How to run the project locally
- [ ] Current state: what's built, what's explicitly not built yet (link to your deferred-features list)
- [ ] Where the test suite lives and how to run the core end-to-end test from Testing

---

## AI Prompt: Generating Your Documentation Set

```
I'm finishing Phase 3 of a personal-scale marketplace built with
[your stack]. Help me produce three documents:

1. A deferred-features list — go through these areas and list what
   I explicitly chose to defer and the trigger condition to revisit:
   search infrastructure, admin/roles system, review features,
   messaging features, dispute automation, [add any others specific
   to your build]

2. A state machine reference — diagram my Listing status flow
   (Draft, Pending Approval, Active, Sold/Completed, Rejected,
   Removed) and Transaction status flow (Initiated, Payment Held,
   Completed, Disputed, Resolved variants), with valid transitions
   only

3. A local setup doc — environment variables needed (names only),
   how to run locally, and a brief "current state" summary

Keep all three short and practical — written for me to reference in
three months, not for external readers.
```

---

## Common Mistake: Documenting Before You're Done Iterating

> ⚠️ Writing detailed documentation mid-build, before a feature has stabilized, means redoing the documentation every time the implementation shifts — a cost compounding with every change. This module sits at the end of Phase 3 specifically because the core system is now stable enough that documenting it won't immediately go stale.

---

## What You Should Walk Away With

1. A complete deferred-features list with specific revisit triggers, not vague "later" notes
2. A visual reference for your Listing and Transaction state machines
3. A short, practical local setup doc covering env vars, run instructions, and current state

This closes Phase 3 — Development. Everything from here forward in Phase 4, Production Readiness, assumes the system you've just documented is the accurate, current state of the project — not the original plan from Phase 1 and 2.
