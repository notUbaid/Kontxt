---
title: Tech Stack
slug: tech-stack
phase: Phase 2
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Tech Stack

For a personal mobile project, your stack choice should optimize for one thing above all else: how fast can you get a real, working app onto your own phone and in front of a few users. Native development for both platforms, or a custom backend built from scratch, are both legitimate choices for a team with time and a specific reason — for a solo personal project, they're usually the slow path.

---

## Decision 1: Cross-Platform vs. Native

| Option | Tradeoff |
|---|---|
| React Native (via Expo) | One codebase for iOS + Android, huge ecosystem, fastest iteration via over-the-air updates | 
| Flutter | One codebase, strong performance, growing ecosystem, slightly steeper learning curve if you don't already know Dart |
| Native (Swift/SwiftUI + Kotlin/Compose separately) | Best possible platform-specific performance and API access, but means building and maintaining two separate codebases solo |

>  **Best Practice**
> Default to **React Native with Expo** for a personal project unless you have a specific reason not to (e.g., you're specifically trying to learn native iOS development, or your app needs deep native API access Expo doesn't support well). It has the largest community, the most tutorials and AI training data to draw on, and Expo's tooling dramatically simplifies builds and app store submission — all things that matter a lot when you're working solo.

> [!WARNING]
> Building native apps for both iOS and Android as a solo personal project effectively doubles your development work for a benefit (best possible native performance) that most personal app ideas don't actually need at this stage. Save that investment for if/when the app has real traction and the performance ceiling actually matters.

---

## Decision 2: Backend Approach

> **Decision Card — Backend-as-a-Service First**
> For a personal project, a managed backend-as-a-service (BaaS) almost always beats building a custom backend from scratch. You get auth, database, and file storage out of the box, with generous free tiers, and you spend your limited time on the app itself rather than re-implementing infrastructure that's already solved.

| Option | Best for |
|---|---|
| Supabase | Postgres-based, generous free tier, built-in auth and storage, good default for most personal apps |
| Firebase | Mature, huge ecosystem, real-time database option, slightly different (NoSQL) data model than Supabase |
| Custom backend (Node/Express + your own database) | Only if you need backend logic too complex/custom for a BaaS, or you're specifically trying to learn backend development as part of the project |

---

## Decision 3: Cost Awareness

> [!TIP]
> Stay within free tiers as long as realistically possible. Supabase, Firebase, and Expo's build/update services all offer free tiers generous enough for a personal project with a small number of real users. Don't pre-pay for scale you don't have — revisit cost only once you have actual usage data suggesting you're approaching a free tier limit.

---

## Decision 4: Over-the-Air (OTA) Updates

>  **Best Practice**
> If you're using Expo, take advantage of **OTA updates** for JavaScript/asset changes — this lets you push fixes and most feature updates without waiting for app store review each time. This dramatically speeds up your iteration cycle as a solo developer; reserve full app store submissions for changes that require native code updates.

---

## Common Mistakes (Including AI's)

- **Recommends or defaults to building separate native apps** for a personal project without weighing the solo-development cost — push back and ask for the cross-platform tradeoff explicitly.
- **Suggests a custom backend by default** instead of a BaaS — ask explicitly why a BaaS wouldn't work before building custom infrastructure.
- **Ignores free tier limits and OTA update capability** when recommending a stack — these matter disproportionately for a solo, cost-conscious project.
- **Over-specifies infrastructure** (custom CI/CD, multiple environments, complex deployment pipelines) at a scale a personal project doesn't need yet.

---

## AI Prompt: Get a Stack Recommendation for a Personal Project

```
I'm building a personal mobile app project, solo, prioritizing speed of development and low/no cost over scalability I don't need yet.

App idea: [one-sentence description]
My experience: [e.g., "comfortable with JavaScript/React, no mobile experience" or "complete beginner"]

Recommend:
1. Cross-platform framework (React Native/Expo or Flutter) vs native, with a one-line reason
2. A backend approach — default to a backend-as-a-service (Supabase or Firebase) unless my app's needs genuinely require a custom backend, and explain why if you think it does
3. Whether OTA updates (if using Expo) materially help my iteration speed for this app

Optimize for what lets me ship and test a working version fastest, not for theoretical scalability.
```

---

## Validate Before You Move On

- [ ] You're using a cross-platform framework unless you have a specific, deliberate reason for native development
- [ ] Your backend choice is a BaaS unless your app's logic genuinely requires a custom backend
- [ ] You're aware of (and starting within) the free tier limits of every service you've chosen
- [ ] You understand whether OTA updates apply to your stack and how they'll speed up iteration
- [ ] Your stack choice was made for speed-to-working-app, not resume-building or novelty

> [!TIP]
> Write this stack decision down in one place — you'll reference it directly in every subsequent Phase 2 and Phase 3 module instead of re-deciding per topic.

---

**Next:** State Management — decide how data flows through this app.
