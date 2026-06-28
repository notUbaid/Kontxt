---
title: PRD
slug: prd
phase: Phase 1
mode: personal
projectType: mobile-app
estimatedTime: 45–60 min
---

# Product Requirements Document

A PRD is not bureaucracy.

It is the document that prevents you from building the wrong thing for three months and only realising it when you try to explain the app to someone else.

For a personal project, a PRD does one job: it forces you to make decisions on paper instead of in code. Decisions made in code are expensive to change. Decisions made in a document are free.

You are writing this for yourself. It does not need to be formal. It needs to be honest and specific.

---

## What a Personal Project PRD Contains

Enterprise PRDs are 40-page documents reviewed by committees. Yours is not.

A personal project PRD has six sections:

1. **Problem & User** — who you're building for and why
2. **Goals** — what success looks like, concretely
3. **Features** — what the app does, and what it explicitly does not do
4. **User Stories** — the experiences you are designing
5. **Screens** — a map of every screen and how they connect
6. **Open Questions** — decisions you have not made yet

That is it. A well-written personal PRD is 2–4 pages. If yours is longer, it is probably deferring decisions into words instead of making them.

---

## Section 1 — Problem & User

Copy your work from Idea Definition. Do not rewrite it. Paste it here.

- Your one specific user
- Your problem statement (specific, costly, unresolved)
- Your one-sentence success definition

This section exists so that every feature decision in the rest of the document can be evaluated against a human, not an abstraction.

---

## Section 2 — Goals

Define what v1 success looks like — not for the app, but for you.

Be honest. Personal project goals are different from startup goals.

**Examples of honest personal project goals:**

> "I want to use this app myself daily within 6 weeks of starting."

> "I want to ship this to the App Store and have at least 10 people who are not my friends use it."

> "I want to learn how to build a full-stack mobile app with auth and a real database."

> "I want something I can put in my portfolio that demonstrates I can ship a complete product."

None of these is wrong. All of them change what you should build and how.

If your goal is personal use: simplicity and speed matter most.
If your goal is public launch: polish, onboarding, and error handling matter more.
If your goal is learning: breadth of features matters over perfection of any one.

Write your real goals. They will prevent scope creep that serves no one.

---

## Section 3 — Features

List every feature the app will have in v1. Then mark each one.

| Feature | Priority | Notes |
|---|---|---|
| [Feature 1] | Must have | Core loop — app doesn't work without this |
| [Feature 2] | Must have | Required for any user to get value |
| [Feature 3] | Should have | Significantly improves experience |
| [Feature 4] | Nice to have | Can ship without; add in v1.1 |
| [Feature 5] | Not in v1 | On the not list — do not build |

**Must have:** The app is broken without this. If you cannot ship it, you cannot ship the app.
**Should have:** The app works without it, but the experience is notably worse.
**Nice to have:** Users would appreciate it, but it does not change core behaviour.
**Not in v1:** Written down so you stop thinking about it.

```
Copy Prompt ↓
```

> I'm writing a PRD for a personal mobile app. Here is my idea: [paste your one-sentence description and core loop].
>
> Generate a feature list with 8–12 features across these priority tiers: Must Have, Should Have, Nice to Have, and Not in V1. For each feature, write one sentence explaining what it is and why it belongs in that tier.
>
> Be opinionated. Flag any features that sound reasonable but typically cause scope creep in personal projects. Flag any missing features that would be required for a first-time user to understand the app.

---

## Section 4 — User Stories

User stories are not a formality. They are the most direct way to discover missing features and hidden complexity before you write code.

The format: **As a [user], I want to [action] so that [outcome].**

Write one story for each Must Have and Should Have feature. Write them from the user's perspective — not the app's.

**Examples:**

> As Anika, I want to start a timer with one tap so that I don't interrupt my flow to log time.

> As Anika, I want to see how many hours I've logged today so that I know when to stop working.

> As Anika, I want to assign a timer to a project so that I can separate billable hours per client.

> As Anika, I want my data to be there when I open the app without logging in every time so that the app doesn't slow me down.

Notice what user stories reveal: the last one implies persistent auth sessions. If you had not written that story, you might have built auth that signs users out every session — and then wondered why retention was terrible.

```
Copy Prompt ↓
```

> I'm writing user stories for a personal mobile app called [App Name]. The user is [describe your one person]. The core features are: [paste your Must Have and Should Have list].
>
> Write one user story per feature in the format: "As [user name], I want to [action] so that [outcome]."
>
> After each story, add one sentence noting: what this implies technically (e.g. persistent session, offline access, background processing) or any hidden complexity a beginner might miss.

---

## Section 5 — Screens

List every screen your app has. Then draw the connections between them.

You do not need design software for this. A text-based map is enough.

**Example:**

```
Onboarding
└── Login / Sign Up
    └── Home (Dashboard)
        ├── Active Timer View
        │   └── Project Selector (modal)
        ├── History View
        │   └── Entry Detail
        └── Settings
            ├── Account
            └── Export Data
```

Every screen should map to at least one user story. If you have a screen with no user story, ask why it exists. If you have a user story with no screen, you are missing a screen.

```
Copy Prompt ↓
```

> I'm mapping the screens for a personal mobile app called [App Name]. Here are my user stories: [paste your user stories].
>
> Generate a complete screen map as a text hierarchy showing:
- Every screen name
- How screens connect (what navigation action leads from one to another)
- Which screens are modals vs full screens vs tab bar items
- Any screens that might be missing based on the user stories
>
> Keep it practical. Flag any navigation decisions I should make now to avoid restructuring later.

---

## Section 6 — Open Questions

This is the most underrated section of a PRD.

Open questions are decisions you know you need to make but have not made yet. Writing them down prevents them from hiding in the back of your mind and surfacing as blockers mid-build.

**Examples:**

> Do I need accounts, or can this work with local-only storage?

> What happens to a user's data if they uninstall and reinstall the app?

> Do I need to support both iOS and Android from day one?

> What does the app look like with zero data — on first launch?

> If I add accounts later, how do I migrate existing local data?

Write every question you are currently avoiding. You do not need to answer them all now — but you need to know they exist.

---

## The PRD Anti-Patterns

Watch for these in your own document:

| Anti-pattern | What It Signals |
|---|---|
| Features described without a user story | You're building for yourself, not your user |
| Every feature is "Must Have" | You haven't made prioritisation decisions yet |
| No "Not in v1" section | Scope creep is already happening |
| Screens that don't map to user stories | You're designing by habit, not by need |
| No open questions | You're avoiding hard decisions |
| Vague language ("seamlessly", "easily", "smart") | The requirement isn't actually defined |

Go back and fix any of these before moving on.

---

## Generating Your Full PRD

Once you have worked through the sections above, use this prompt to produce a clean, complete document:

```
Copy Prompt ↓
```

> Generate a complete PRD for a personal mobile app called [App Name]. Use this information:
>
> User: [paste your one person description]
> Problem: [paste your problem statement]
> Success definition: [paste your one-sentence success definition]
> Goals: [paste your personal goals]
> Features: [paste your prioritised feature list]
> User stories: [paste your user stories]
> Screen map: [paste your screen hierarchy]
> Open questions: [paste your open questions]
>
> Format it as a clean Markdown document with clear sections. Where I've been vague, ask a clarifying question rather than inventing an answer. Flag any logical inconsistencies between sections. Flag any features that are underspecified and will cause ambiguity during development.

---

## PRD Checklist

- [ ] Problem & User section copied from Idea Definition — specific and human
- [ ] Goals written honestly — reflect what you actually want from this project
- [ ] Feature list complete with priority tiers — at least 5 Must Haves defined
- [ ] Not in v1 list has at least 3 items you were tempted to include
- [ ] User story written for every Must Have and Should Have feature
- [ ] Each user story has its technical implication noted
- [ ] Screen map covers every screen implied by the user stories
- [ ] No screen exists without a corresponding user story
- [ ] Open questions list written — at least 3 real decisions not yet made
- [ ] No vague language ("seamlessly", "smart", "easy") in any requirement

---

## Next Step

Your PRD is done when you can hand it to someone who has never heard of your app and they can tell you what it does, who it's for, and what it does not do.

Move to **Platform Guidelines** next.
