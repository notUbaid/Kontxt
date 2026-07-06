---
title: MVP Features
slug: mvp-features
phase: Phase 0
mode: hackathon
projectType: mobile-app
estimatedTime: 20–30 min
---

# MVP Features

Your idea is defined. Now you need to decide exactly what you are building.

This is the most important engineering decision of the hackathon.

Build too much and you ship nothing polished. Build too little and you have nothing to demo. The teams that win draw a precise line — and then defend it ruthlessly for the next 20 hours.

---

## The Demo-First Rule

In a normal product context, you define features around user needs.

In a hackathon, you define features around the demo.

Ask this question for every feature you are considering:

> **"Will a judge see this during a 2-minute demo?"**

If the answer is no — it does not belong in your MVP.

This is not a compromise. It is a strategy. Judges cannot evaluate what they cannot see. A beautiful, working, polished demo of three screens beats a broken demo of twelve.

---

## The Feature Cutting Framework

Take your initial feature list and put every item through this sequence:

```
Is this visible in the demo?
├── No  → Cut it
└── Yes → Does the demo fail without it?
          ├── No  → Cut it (add to "nice to have" list)
          └── Yes → Does your team have time to build it?
                    ├── No  → Simplify it or fake it
                    └── Yes → Keep it
```

"Fake it" is not a dirty phrase in hackathons. Hardcoded data, mock responses, and pre-built states are legitimate tools when they let you ship a better demo of the thing that actually matters.

---

## Core vs. Supporting vs. Fake

Categorise every feature into one of three buckets:

**Core** — Must work end-to-end. This is your demo flow. No shortcuts.

**Supporting** — Needs to exist but does not need to be functional during the demo. Can be simplified, stubbed, or pre-seeded.

**Fake** — Appears in the demo but is hardcoded or mocked. No real logic needed.

| Feature Type | Example | Approach |
|---|---|---|
| Core | AI generates a personalised plan | Build fully. Polish the UI. |
| Supporting | User profile settings | Pre-fill with demo data. Skip edit flow. |
| Fake | "1,247 users joined this week" | Hardcode the number. |
| Cut | Push notification system | Not visible in demo. Eliminate. |

---

## Define Your Demo Flow

Before writing a feature list, write your demo script as a sequence of screens.

```
Screen 1 → Screen 2 → Screen 3 → [Wow Moment] → Screen 4
```

Every screen in this sequence is a core feature. Everything outside this sequence is supporting or fake.

**Example — AI Fitness App:**
```
Onboarding (30s) → Goal input → AI generates plan [WOW] → Weekly schedule view
```

Core features:
- Onboarding screen
- Goal input form
- AI plan generation (must actually work)
- Weekly schedule view (must look great)

Everything else — edit history, social sharing, progress tracking, notifications — is cut from the hackathon build.

---

## The Scope Budget

You have a fixed time budget. Spend it explicitly.

Use this as a rough guide for a 24-hour hackathon with a team of 3:

| Area | Time Budget |
|---|---|
| Setup, auth, navigation shell | 2–3 hours |
| Core feature (the wow moment) | 6–8 hours |
| Supporting screens | 3–4 hours |
| UI polish and demo data | 3–4 hours |
| Testing, fixing, rehearsing | 2–3 hours |
| Buffer (things always break) | 2 hours |

If your feature list requires more than your time budget allows — cut features, not sleep. A tired team ships broken software.

---

## AI Prompt — MVP Scoping

Use this to get a fast second opinion on your feature list before you start building.

```
I am building a mobile app for a hackathon.

My app: [one-sentence pitch]
My demo anchor (the wow moment): [describe it]
My demo flow: [Screen 1 → Screen 2 → Screen 3 → ...]

Team: [size and skills, e.g. "3 people: React Native, Node.js/Python, UI design"]
Time remaining: [hours]

My current feature list:
[List every feature you are considering]

Help me:
1. Categorise each feature as: Core / Supporting / Fake / Cut
2. Flag anything that is likely to take longer than I think
3. Identify the single highest-risk item in my Core list
4. Suggest one "fake" that would make the demo significantly more impressive
   without adding real build time

Be ruthless. I need a scope I can actually ship in the time I have.
```

> **Apply judgment to the output:** AI will sometimes mark things as "Core" that are actually supporting features, or underestimate build time for AI integrations. Cross-check against your team's actual skills and pace.

---

## The "Nice to Have" List

Every feature you cut should go on a named list — not the trash.

This list serves two purposes:

1. It keeps your team from relitigating cut decisions mid-build ("we should add notifications" — "it's on the nice-to-have list, we agreed to cut it")
2. If you finish early, you have a pre-prioritised extension list ready

Keep this list somewhere visible to the whole team.

---

## Red Flags to Watch For

**"We can build that quickly."**
This phrase precedes most hackathon disasters. If someone says this, ask them to estimate hours. Then double it.

**A feature list longer than 8 items.**
If your MVP has more than 8 features, it is not an MVP. Cut until it hurts, then cut one more.

**No fake data plan.**
Every demo needs realistic data. If you have not planned how to seed your demo account with compelling content, you will be scrambling at hour 22.

**The "it works" trap.**
Functional is not the same as demo-ready. An app that works but looks unpolished will lose to an app that looks beautiful and works for 80% of the flow. Budget explicit time for polish.

**Dependencies on third-party approvals.**
App Store submission, API access approvals, OAuth app reviews — these take time you do not have. Identify any dependency that requires external approval and either eliminate it or have a backup plan before you start building.

---

## MVP Definition Checklist

Complete these before moving to Phase 1.

- [ ] Demo flow written as a screen sequence (Screen 1 → Screen 2 → ...)
- [ ] Demo anchor (wow moment) is identified and is a Core feature
- [ ] Every feature categorised: Core / Supporting / Fake / Cut
- [ ] Core feature count is 5 or fewer
- [ ] Time budget estimated and fits within available hours
- [ ] "Nice to have" list exists and is separate from the build plan
- [ ] Demo data / seed plan is defined (what will the demo account contain?)
- [ ] No external approval dependencies in the critical path
- [ ] Every team member agrees on the scope and their role within it

---

## What Comes Next

Scope is locked. Now you design.

Next module: **PRD** — a lightweight product requirements document that gives your whole team a shared source of truth before anyone writes a line of code.
