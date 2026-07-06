---
title: MVP Features
slug: mvp-features
phase: Phase 0
mode: personal
projectType: web app
estimatedTime: 20–30 min
---

# MVP Features

You have a defined idea. Now you need to decide what to actually build first.

This is where most personal projects quietly become unshippable. Not because the developer can't build the features — but because they plan too many of them, and the finish line keeps moving.

This module gives you a system for cutting ruthlessly and building the smallest version worth shipping.

---

## What MVP Actually Means

MVP is overused to the point of meaninglessness. For a personal project, here's the only definition that matters:

> **An MVP is the smallest version of your app that solves the core problem well enough that one real person would choose to use it over their current workaround.**

Not a prototype. Not a demo. A real thing a real person finds genuinely useful.

It does not need to be polished. It does not need to handle every edge case. It does not need to scale. It needs to solve the one problem you defined in the last module — reliably, for at least one person.

---

## The Feature Trap

When you sit down to plan features, the list grows fast. Every idea feels important. Every edge case feels necessary. Every "wouldn't it be cool if" feels like it belongs in v1.

None of it belongs in v1.

> [!WARNING]
> Every feature you add to your MVP is a multiplier on time-to-ship. One extra feature doesn't add a week — it adds a week plus the integration complexity, the edge cases, the UI to support it, and the decisions that weren't necessary before. Cut harder than feels comfortable.

---

## The Three Lists

Take every feature you're considering and put it into one of three lists.

**List 1 — Core**
Features the app literally cannot function without. If this is missing, the product doesn't exist.

**List 2 — Important**
Features that meaningfully improve the experience but the core problem is solvable without them.

**List 3 — Nice to Have**
Everything else. Things you want. Things that would be cool. Things that would make it better.

**Your MVP is List 1 only.**

List 2 is v1.1. List 3 is the backlog. They are real — write them down — but they are not what you build first.

---

## The Core Feature Test

For every feature on your Core list, apply this test:

**"If I removed this feature, would my target user be unable to solve their core problem?"**

If yes — it's Core. Keep it.
If no — it belongs in List 2 or 3. Move it.

Run every single feature through this. Be brutal.

---

## The Feature Definition Table

For each Core feature, define it with enough specificity that you could start building it tomorrow.

| Feature | What it does | What it does NOT do (v1) |
|---|---|---|
| Example: User auth | Email/password signup and login | Social login, SSO, 2FA, account deletion |
| Example: Create entry | User can add a new item with a title and description | Rich text, file attachments, tags, due dates |
| Example: List view | Shows all entries, newest first | Filtering, sorting, search, pagination |

The "What it does NOT do" column is as important as the first. It's the explicit boundary that prevents scope creep from inside your own head.

---

## Using AI to Pressure-Test Your Feature List

**Copy Prompt**

```
I'm building a personal web app. Here's my project definition:

App: [one sentence description]
User: [specific user]
Problem: [the pain point]
Core features I'm planning for MVP: [list your features]

Play the role of a senior product manager doing a scope review.

For each feature I listed:
1. Is this truly core, or can the user solve the problem without it?
2. Am I overbuilding any part of this feature for an MVP?
3. What am I including that I haven't listed — hidden complexity I might be underestimating?

Then suggest the single smallest feature set that would still produce a usable product.
```

Read the output critically. Accept cuts that make sense. Push back mentally on cuts that break the core value. The AI doesn't know your users as well as you do — use it to challenge assumptions, not to make decisions for you.

---

## Estimating Honestly

Most developers estimate how long features take when everything goes right. Nothing goes right.

For each Core feature, estimate in days — not hours — and then double it.

| Feature | Optimistic Estimate | Realistic Estimate (×2) |
|---|---|---|
| User auth | 1 day | 2 days |
| Create / edit entry | 1 day | 2 days |
| List view | 0.5 days | 1 day |
| **Total** | **2.5 days** | **5 days** |

If your realistic total is more than 3–4 weeks of solo evening/weekend work, your MVP is still too large. Cut more.

> [!TIP]
> "3–4 weeks of solo evening work" is roughly 20–30 hours. If you're honest about how much time you have each week, this gives you a real deadline to aim for — which is the only way personal projects ship.

---

## The Version Map

Write down all three lists, but frame them as versions — not a backlog of things you failed to build.

```
MVP (build now):
- [Feature 1]
- [Feature 2]
- [Feature 3]

v1.1 (after first real users):
- [Feature 4]
- [Feature 5]

v2 (if this gets traction):
- [Feature 6]
- [Feature 7]
```

This does two things. It preserves your good ideas without letting them bloat v1. And it makes the MVP feel like the beginning of something, not a stripped-down compromise.

---

## The "Done" Definition

Before you start building, define what done means for your MVP.

Done is not "all my ideas are implemented." Done is a specific, testable state.

```
My MVP is done when:
- A new user can [do the core action] without any help from me
- The result they get is [specific output]
- It works on [specific device/browser] without errors
```

Write your done definition now. When you hit it — ship. Don't keep building.

---

## MVP Features Checklist

- [ ] Every planned feature has been categorized: Core, Important, or Nice to Have
- [ ] The Core list passes the removal test — nothing on it is optional
- [ ] Each Core feature has a "what it does NOT do in v1" boundary
- [ ] Realistic time estimate is under 3–4 weeks of solo work
- [ ] A version map exists with v1.1 and v2 ideas captured but separated
- [ ] A "done" definition is written down

---

## What's Next

Move to **PRD** — turning your MVP feature list into a lightweight product requirements document that gives your AI tools the context they need to help you build effectively.
