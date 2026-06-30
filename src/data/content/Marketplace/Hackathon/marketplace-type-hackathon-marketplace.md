---
title: Marketplace Type
slug: marketplace-type
phase: Phase 0
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: marketplace-type-hackathon-marketplace.md
---

# Marketplace Type

Marketplace Fundamentals gave you the mechanics every marketplace shares. This module narrows that down to a specific, committed category — because "marketplace" is too broad a target to design, build, or demo against. By the end of this module you should be able to say what your marketplace is in one sentence, without hedging.

---

## Why This Decision Comes Before the PRD

A PRD assumes you already know what you're building. Marketplace type is the decision that makes that assumption true. Skip this and your PRD will be vague in exactly the places that matter — because you haven't actually decided what kind of marketplace this is yet, you've just decided it's "a marketplace."

> **Warning:** The most common hackathon marketplace failure isn't bad code — it's an idea that's still ambiguous on stage. "It's like Airbnb but for X" is a starting point, not a finished decision. This module forces the next step.

---

## The Core Dimensions

Every marketplace type is a combination of choices along these dimensions. Lock each one deliberately.

### 1. Transaction Model

| Model | How money/value moves | Demo complexity |
|---|---|---|
| Direct purchase | Buyer pays, gets the thing | Lowest — clearest to demo |
| Booking/reservation | Buyer reserves a time/slot | Medium — needs availability logic |
| Bidding/offer | Price negotiated or auctioned | Higher — needs real-time-feeling logic |
| Subscription/access | Ongoing access rather than one transaction | Higher — less natural to demo in 3 minutes |

> **Best Practice:** Direct purchase is almost always the right choice for a hackathon. It's the easiest to make feel complete and real with faked data, and judges instantly understand it without explanation — you don't burn any of your demo time teaching them the model.

### 2. Curation Model

| Model | Who controls what's listed | Implication |
|---|---|---|
| Open | Anyone can list anything | Faster to seed with demo data, less "quality" signal needed |
| Curated/approved | Listings reviewed before going live | Adds a trust signal, but adds a workflow you'd need to fake or explain |
| Invite-only | Closed seller pool | Strong trust signal, but harder to demo "growth" |

> **Tip:** Open is the default for hackathon speed. If your concept benefits from feeling curated (e.g. a premium goods marketplace), you can simulate that with copy and badges ("Hand-reviewed sellers") rather than building real moderation tooling.

### 3. Geographic / Community Scope

| Scope | Example | Why it matters for a demo |
|---|---|---|
| Global | Generic goods marketplace | Harder to make feel "real" with a small fake dataset |
| Local/hyperlocal | Neighborhood services, campus marketplace | Easier to demo convincingly — smaller, specific dataset feels complete |
| Niche community | Marketplace for a specific hobby/profession | Easiest to demo — judges immediately grasp the specific value |

> **Best Practice:** Narrow scope wins in hackathons. "A marketplace for college students to resell textbooks on this campus" is more convincing in a 3-minute demo than "a general marketplace for used goods," because a narrow scope lets a small amount of seeded demo data feel genuinely complete rather than obviously sparse.

---

## Putting It Together: The One-Sentence Test

Once you've made these three decisions, you should be able to state your marketplace type in a single, specific sentence:

> "[Buyer type] can [direct purchase/booking/bid] [what's exchanged] from [seller type], within [scope]."

**Weak:** "A marketplace where people can buy and sell things locally."

**Strong:** "Students at one campus can directly purchase used textbooks from other students, listed by course code."

The strong version immediately tells you what to seed your demo data with, what the buyer and seller journeys look like, and what trust signal matters most (course code accuracy, condition honesty) — the weak version tells you none of that.

---

## Decision Matrix: Common Hackathon-Friendly Types

Use this as a sanity check against your own concept, not a menu to pick from blindly.

| Type | Transaction | Curation | Scope | Demo difficulty |
|---|---|---|---|---|
| Peer resale (textbooks, gear) | Direct purchase | Open | Niche/local | Low |
| Local services (tutoring, repairs) | Booking | Open or light curation | Local | Medium |
| Skill/gig marketplace | Direct purchase or booking | Light curation | Niche | Medium |
| Creator/content marketplace | Direct purchase | Open | Niche | Low–Medium |

> **Common Mistake:** Choosing a transaction model that requires real-time logic (live bidding, dynamic availability) because it sounds impressive, then running out of time to make it actually work — and a broken "impressive" feature reads far worse in a demo than a simple feature that works flawlessly.

---

## Using AI Effectively Here

Use AI to stress-test your one-sentence definition against the dimensions above, and to catch scope creep before it costs you build time.

**📋 Copy this prompt:**

```
My marketplace concept, in one sentence: "[your sentence using the buyer/transaction/exchange/scope format above]"

Evaluate this against:
1. Transaction model — is this the simplest model that still makes the concept compelling, or am I adding unnecessary complexity (bidding, real-time availability) that's risky to build in a hackathon timeframe?
2. Curation — does "open" listing work for this concept, or does it genuinely need curation logic, and if so, can I fake that with UI/copy instead of real workflow?
3. Scope — is this narrow enough that a small set of seeded demo listings will feel complete, or is it so broad that any demo dataset will look sparse?

Give me a tightened version of my one-sentence definition if you see a way to reduce complexity without losing what makes the idea compelling.
```

---

## Validating the Output

- [ ] Can you state your marketplace type in one sentence, with no hedging or "sort of like X but Y"?
- [ ] Is your transaction model the simplest one that still serves the concept?
- [ ] Is your scope narrow enough that a realistic amount of seeded demo data will feel complete, not sparse?
- [ ] Does your curation model avoid requiring real moderation workflow you don't have time to build?

---

## Before You Continue

- [ ] One-sentence marketplace definition written and tested against the buyer/transaction/exchange/scope format
- [ ] Transaction model chosen, with complexity risk consciously accepted or avoided
- [ ] Scope narrowed enough to demo convincingly with a small dataset
- [ ] Curation approach decided, faked with UI/copy if full workflow isn't justified

**Next up:** MVP Scope — turning this definition into the specific, minimal feature set you'll actually build before the clock runs out.
