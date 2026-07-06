---
title: Welcome
slug: welcome
phase: Phase 0
mode: hackathon
projectType: marketplace
estimatedTime: 5-10 min
filename: welcome-hackathon-marketplace.md
---

# Welcome

You're building a marketplace, in a hackathon, against a clock. That combination changes almost every decision you're about to make — this module sets the frame before you touch a single architectural choice.

---

## What Makes a Marketplace Different

A marketplace isn't an e-commerce store with extra steps. It's a fundamentally different shape of product: **two distinct user types who need each other to make the product work at all.**

- A store needs one happy user: the buyer.
- A marketplace needs two: a buyer with something to gain, and a seller with something to offer — and the product has to feel alive to both, simultaneously, even in a demo.

> **Reframe:** Every decision in this track gets filtered through one question: does this make the marketplace feel like it has real supply and real demand, right now, in front of judges? That single question will guide far more of your build than typical software architecture concerns.

---

## What "Hackathon Mode" Actually Means Here

You are not building a marketplace that survives production traffic. You are building the **most convincing 3-minute demonstration** of a marketplace that judges will see all day.

This isn't a shortcut you should feel guilty about — it's the correct strategic call. The phases ahead reflect this directly: notice this track has no Production Readiness or Store Launch phase. That's intentional. Time spent on rate limiting or backup strategy is time not spent on the thing judges actually evaluate.

| What judges actually notice | What judges almost never notice |
|---|---|
| Does the demo flow feel real and smooth | Whether the database is normalized correctly |
| Does the UI look intentional and polished | Whether auth handles every edge case |
| Is there a believable amount of activity (listings, messages, transactions) | Whether the codebase would scale to 10,000 users |
| Can you tell a clear story in under 3 minutes | Test coverage percentage |

> **Best Practice:** Internalize this now — later modules in this track (Demo Transactions, Demo Marketplace Data, Fake Messaging) will explicitly teach you how to fake the hard, real-time, two-sided parts of a marketplace convincingly. That's not cutting corners. That's correctly allocating a 24-48 hour budget toward what's actually being judged.

---

## The Road Ahead

This track is shorter than a production build for a reason — every phase here exists because it directly improves the demo, nothing more.

1. **Marketplace Discovery** (where you are) — define what kind of marketplace this is and lock your MVP scope tightly
2. **Product Design** — map both the buyer journey and the seller journey, because a marketplace has two
3. **Marketplace Architecture** — set up auth, core architecture, and decide what gets faked vs. genuinely built
4. **Development** — build the real core loop: auth, database, search, listings
5. **Growth & Presentation** — turn what you built into a pitch deck, demo script, and a submission that actually wins

Notice what's missing compared to a production track: no security hardening phase, no launch checklist, no scalability planning. That's not an oversight — it's the entire point of building in Hackathon Mode.

---

## The One Principle That Matters Most

Marketplaces fail demos for one specific reason more than any other: **they look empty.**

A buyer-side flow with zero listings, or a seller dashboard with zero activity, reads as broken even if every line of code behind it works perfectly. Judges form their impression in the first 10 seconds of seeing a screen — an empty marketplace loses before you've said a word.

> **Tip:** Every phase from here forward should be evaluated partly through this lens: does this decision help the marketplace feel populated, active, and real the moment someone looks at it? You'll see this principle resurface explicitly in Demo Marketplace Data and Fake Messaging later in this track.

---

## Before You Continue

- You understand this track deliberately skips production-hardening phases — that's correct, not incomplete
- You're thinking in two user journeys (buyer and seller), not one
- You've internalized that a populated, alive-feeling demo beats a technically perfect but empty one
- You're ready to lock a tight MVP scope next — the single biggest cause of hackathon failure is scope that's too wide to finish

**Next up:** Marketplace Fundamentals — the core mechanics every marketplace needs to get right, regardless of what you're matching buyers and sellers around.
