---
title: Welcome
slug: welcome
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 10–15 min
---

# Welcome to Mobile App Production Mode

Building a mobile app is not building a web app with a smaller screen. It is a fundamentally different engineering discipline with different constraints, different user expectations, different distribution mechanics, and different failure modes.

This curriculum treats that difference seriously.

---

## What Makes Mobile Different

| Dimension | Web App | Mobile App |
|---|---|---|
| **Distribution** | Deploy a URL | Submit to App Store / Play Store — reviewed, approved, delayed |
| **Updates** | Instant | Users must update; old versions persist in the wild |
| **Connectivity** | Assumed | Intermittent — offline behaviour is a core feature |
| **Hardware** | Standardised | Fragmented — hundreds of device sizes, OS versions, capabilities |
| **Permissions** | Minimal | Camera, location, notifications, contacts — must be requested and justified |
| **Performance** | Forgiving | Battery, memory, CPU constraints are hard — users feel them |
| **Input** | Keyboard + mouse | Touch, gestures, swipe — different affordances entirely |
| **Platform rules** | None | Apple and Google impose technical and content rules — violations get rejected |

Every one of these differences has engineering implications. This curriculum addresses each explicitly.

---

## What This Curriculum Covers

Six phases from validated idea to live app in the store.

| Phase | Focus | Outcome |
|---|---|---|
| **0 — Discovery & Validation** | Who, what, and why — before any code | A validated product definition |
| **1 — Product Design** | UX and UI built for mobile | A complete, platform-appropriate design |
| **2 — Architecture** | Technical decisions that last | A stack and system that scales |
| **3 — Development** | Implementation with production standards | A working, tested app |
| **4 — Production Readiness** | Security, performance, reliability | An app that survives real usage |
| **5 — Store Deployment** | Submission, review, launch | A live app in both stores |
| **6 — Growth** | Retention, reviews, roadmap | A product that improves over time |

---

## The Platform Reality

Every decision you make in Phase 0 and Phase 1 will eventually pass through one of two gatekeepers: Apple and Google.

**Apple App Store:**
- Review takes 1–3 days (sometimes longer)
- Review rejects apps for policy violations, broken functionality, misleading descriptions
- Charges 15–30% of all in-app purchases
- Stricter on privacy, permissions, and content guidelines
- Requires a $99/year developer account

**Google Play Store:**
- Review takes hours to days
- Slightly more permissive than Apple but has own content and policy requirements
- Charges 15–30% of in-app purchases
- Requires a $25 one-time developer account fee

> [!WARNING]
> App store rejection can cost weeks. A rejected submission at launch is a launch delay you can't sprint through. Understanding review guidelines is not optional — it's part of shipping.

Build with both platforms in mind from Phase 0. Decisions that are easy to make now (permissions strategy, in-app purchase model, content approach) become costly to change after a rejection.

---

## The Production Standard

This curriculum targets production-grade software. That means:

**Reliable** — works on a 4-year-old Android on a slow connection, not just your development device on WiFi.

**Store-compliant** — passes App Store and Play Store review without rejection loops.

**Performant** — 60fps scrolling, sub-second screen transitions, no janky animations.

**Offline-capable** — the core experience works without connectivity. Sync when connection returns.

**Maintainable** — a codebase you can add features to without rewriting what exists.

**Instrumented** — errors are caught, crashes are reported, user behaviour is understood.

---

## How to Use This Curriculum

**Work in order.** Phase 0 decisions constrain Phase 1. Phase 1 decisions constrain Phase 2. Skipping phases doesn't save time — it creates rework.

**Be platform-specific.** Generic advice produces generic apps. Whenever a decision differs between iOS and Android, this curriculum says so explicitly. Know which platform you're making decisions for.

**Validate before building.** Mobile development is more expensive to reverse than web development. An app store submission with wrong architecture costs a full update cycle. Get Phase 0 right.

**Use AI with context.** Every module includes prompts designed for AI-assisted development. The quality of AI output is proportional to the context you provide. These prompts are structured to produce production-quality output — not prototypes.

---

## Before You Write a Line of Code

Three questions every mobile app must answer in Phase 0:

**1. Does this need to be a native app?**

Mobile apps cost more to build, more to maintain, and more to distribute than web apps. If your core use case works equally well in a browser, a Progressive Web App (PWA) is worth evaluating first. If you need camera access, push notifications, offline capability, app store distribution, or a native feel — a mobile app is the right call.

**2. iOS, Android, or both?**

Both is the default assumption — and it's often correct. But building for both doubles your testing surface and, if going native, doubles your codebase. A cross-platform framework (React Native, Flutter) is usually the right starting point for a solo developer or small team.

**3. What does the store submission timeline look like?**

If you're targeting a launch date, work backwards from it. iOS review alone adds 1–3 days. Build the submission process into your timeline, not as an afterthought.

---

## What Comes Next

**Idea Definition** — turning your concept into a precise product statement specific enough to drive every technical and design decision that follows.

The decisions you make in Phase 0 are not preliminary. They are structural. Build them carefully.
