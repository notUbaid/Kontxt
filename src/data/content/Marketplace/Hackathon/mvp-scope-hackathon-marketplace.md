---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: mvp-scope-hackathon-marketplace.md
---

# MVP Scope

You now have a one-sentence marketplace definition. This module turns that sentence into the exact, finite list of things you'll build — and just as importantly, the list of things you will deliberately not build. Scope is the single biggest predictor of whether a hackathon marketplace ships a working demo or a collection of half-finished screens.

---

## Why Marketplaces Are Especially Dangerous to Scope

A to-do app has one user type and one core loop. A marketplace has two user types, each with their own journey, and a connection between them that has to work for both sides to feel real. That doubles your minimum surface area before you've added a single "nice to have" feature.

> **Warning:** The most common hackathon marketplace failure is building a full-featured seller dashboard and a full-featured buyer experience, and running out of time before either one connects to the other in a working demo. Two half-built journeys lose to one fully-working loop, every time.

---

## The One Loop Rule

Your MVP is not a feature list. It's **one complete loop**, end to end, that a judge can watch happen in front of them.

A complete loop, for a direct-purchase marketplace, looks like:

```
Seller creates a listing
       ↓
Buyer discovers it (search/browse)
       ↓
Buyer initiates a transaction
       ↓
Both sides see confirmation
```

> **Best Practice:** Build this exact loop first, with the ugliest possible UI, before touching anything else. A working loop with placeholder styling beats a beautifully styled app where the loop doesn't actually close. You can polish the UI in the time remaining after the loop works — you usually can't recover from a broken loop discovered the night before submission.

---

## The Three-List Method

For each feature you're considering, sort it into exactly one of three lists. This forces a decision instead of a vague sense of "we'll probably need this."

| List | Definition | Rule |
|---|---|---|
| **Must Build (Real)** | Required for the one loop to function and feel real | Build this for real, no shortcuts |
| **Fake It** | Makes the demo feel complete, but doesn't need real logic behind it | Static data, mocked responses, hardcoded states — covered in detail in Phase 2 |
| **Cut Entirely** | Would be nice in a real product, adds nothing to a 3-minute demo | Do not build, do not mention in the demo |

### Worked Example (Campus Textbook Marketplace)

| Feature | List | Why |
|---|---|---|
| Create a listing | Must Build (Real) | Core to the one loop |
| Search/browse listings | Must Build (Real) | Core to the one loop |
| "Buy" / "Reserve" action | Must Build (Real) | Closes the loop |
| Seller ratings | Fake It | Makes listings feel trustworthy, doesn't need a real review system |
| In-app messaging | Fake It | Covered explicitly in Fake Messaging later — looks real, isn't wired to a backend |
| Payment processing | Fake It | A real Stripe integration adds real risk for zero demo payoff |
| Password reset flow | Cut Entirely | Never seen in a 3-minute demo |
| Seller payout/withdrawal | Cut Entirely | Out of scope for what's being judged |
| Admin moderation tools | Cut Entirely | No judge will ask to see your admin panel |

> **Tip:** If you're unsure which list something belongs on, ask: "Will a judge directly interact with this in the 3-minute demo?" If no, it's Fake It or Cut Entirely — never Must Build.

---

## Sizing the Must-Build List

Even your "Must Build (Real)" list needs a hard ceiling. As a working rule for a 24-48 hour hackathon:

> **Best Practice:** If your Must Build (Real) list has more than 5-6 items, it's too big. Marketplaces specifically tempt scope creep because every feature feels essential to "a real marketplace" — but you're not building a real marketplace, you're building convincing evidence of one in front of judges.

Use this checklist as a ceiling, not a target — fewer is safer:

- [ ] One way for sellers to create a listing
- [ ] One way for buyers to discover listings (search or browse, not both)
- [ ] One transaction action that closes the loop
- [ ] One confirmation state both sides can see
- [ ] (Optional, only if time allows) One additional feature that's genuinely your differentiator

---

## Using AI Effectively Here

Use AI to sort your feature list ruthlessly — this is exactly the kind of task where a second, less emotionally attached opinion catches scope creep you can't see in your own idea.

**📋 Copy this prompt:**

```
My marketplace concept: [your one-sentence definition from the previous module]
My hackathon time budget: [e.g. "30 hours remaining"]
My team size: [number of people, and rough skill split if relevant]

Here's every feature I'm considering: [list everything, even ones you suspect are out of scope]

Sort each one into exactly one list:
1. Must Build (Real) — required for one complete buyer-to-seller loop to work in a live demo
2. Fake It — improves how complete the demo feels, but can be static/mocked data with no real logic
3. Cut Entirely — adds nothing a judge will see or interact with in a 3-minute demo

Be aggressive about Cut Entirely. If my Must Build list ends up longer than 5-6 items, tell me directly and push back on which ones to demote.
```

This prompt works because it gives AI explicit permission to be aggressive about cutting — without that instruction, AI tends to default toward keeping more features "just in case," which is exactly the failure mode this module exists to prevent.

---

## Validating the Output

- [ ] Does your Must Build (Real) list contain 5-6 items or fewer?
- [ ] Does every item on that list serve the single core loop (listing → discovery → transaction → confirmation)?
- [ ] Is everything else explicitly assigned to Fake It or Cut Entirely — nothing left unsorted or "maybe"?
- [ ] Would a judge directly see and interact with every single Must Build item during your demo?

> **Common Mistake:** Treating "Fake It" items as lower priority and leaving them for last. They're not lower priority — a marketplace with a real transaction loop but zero fake trust signals (ratings, messaging, populated listings) still reads as hollow. Budget real time for Fake It items; don't treat them as an afterthought.

---

## Before You Continue

- [ ] One core loop defined end to end, in the exact order a judge will see it demoed
- [ ] Every feature sorted into Must Build (Real), Fake It, or Cut Entirely — no ambiguous items
- [ ] Must Build (Real) list capped at 5-6 items
- [ ] Confirmed every Must Build item is something a judge will directly interact with

**Next up — Phase 1, Product Design:** PRD — turning this scoped concept into a concrete spec your team can build from without re-litigating these decisions mid-build.
