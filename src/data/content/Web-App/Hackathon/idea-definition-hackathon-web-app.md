---
title: Idea Definition
slug: idea-definition
phase: Phase 0
mode: hackathon
projectType: web app
estimatedTime: 10-15 min
---

# Idea Definition

Before any code, any tech stack decision, any design — you need an idea sized correctly for the clock you're actually working against. This is the single highest-leverage decision in the entire hackathon, and it happens before you write a line of code.

Most hackathon teams don't fail because their idea was bad. They fail because their idea was a great idea for a 3-month project, attempted in 24 hours.

---

## The Core Idea: Scope Is the Idea

In a hackathon, "what should we build?" and "what should we cut?" are the same question asked twice. An idea that sounds impressive but requires five integrated systems to demo will lose to a narrow idea that does one thing flawlessly, every time.

> [!WARNING]
> The most common hackathon idea-stage mistake: describing your idea as a platform, an ecosystem, or "like Uber but for X" — and meaning it literally. You have hours, not months. Your idea needs to compress into one core loop a judge can see work, live, in under two minutes.

---

## Step 1: Find the One Sentence

If you can't state your idea in one sentence that a stranger immediately understands, the idea isn't defined yet — it's still a vibe.

**Best Practice Card — The One-Sentence Test**

```
Format: [Who] can [do what] without [the current pain]

 "Freelancers can generate a client-ready invoice from a voice
   memo, without manually itemizing each line."
 "Students can turn a lecture recording into flashcards, without
   manually writing study notes."

 "A productivity platform for modern professionals."
   (No specific who, no specific what, no specific pain — this is
   a mission statement, not an idea.)
```

If your team can't agree on this one sentence in the first 15 minutes, that disagreement is the actual problem to solve — not something to paper over by building everyone's idea simultaneously.

---

## Step 2: Size It to Your Actual Time

**Decision Card — Idea Sizing by Time Available**

| Time Available | Realistic Scope | What to Avoid |
|---|---|---|
| Under 12 hours | One core interaction, one screen that matters, minimal auth | Multi-role systems, real-time collaboration, anything needing two synced clients |
| 12-24 hours | One core flow end-to-end, basic auth, 2-3 screens | Complex permission systems, payment integration, anything requiring extensive third-party approval/setup |
| 24-48 hours | A complete narrow product with a few supporting features | Still avoid: building for scale, supporting multiple user types with genuinely different experiences |

Whatever your actual time budget, cut your first idea in half. Then check if it still demonstrates something genuinely interesting. If yes, you've found the right size. If the cut idea now feels boring, you picked an idea whose value lived entirely in its complexity — which is exactly the kind of idea that doesn't survive a real hackathon clock.

---

## Step 3: Identify the One "Wow" Moment

Every winning hackathon demo has a specific moment the judge remembers afterward — not a feature list, one moment. Decide what yours is *before* you build, so every hour of work points toward making that moment land.

> [!TIP]
> Your wow moment is usually the one place AI does something that looks like magic to someone watching — instant generation, a surprisingly accurate transformation, something that would have taken a human noticeably longer. Build everything else as the minimum scaffolding required to set that single moment up convincingly.

---

## Using AI to Pressure-Test Your Idea

AI is useful here for a narrow, specific task: stress-testing scope before you commit hours to it. It's not a substitute for your own judgment about what's actually interesting — that's a creative call only your team can make.

**Prompt: Scope Reality Check**

```
I'm building this for a hackathon with [X] hours total, as a team of
[N] people with [skill levels/stack experience].

Idea: [your one-sentence idea]

1. List the minimum technical components required to demo this
   convincingly (e.g., auth, specific API integration, real-time
   sync, file upload).
2. For each component, estimate honestly whether it's realistic in
   the time available given my team's stated experience.
3. Flag anything that depends on third-party approval, rate limits,
   or setup time that could eat into build time unpredictably
   (e.g., API key approval delays, OAuth app review).
4. Suggest one specific cut that would meaningfully reduce risk
   without removing the core "wow" moment I described.
```

> ** Why this prompt works**
> Asking for an honest feasibility estimate against your actual team experience — not a generic "how hard is this" answer — surfaces real risk instead of the kind of optimistic timeline every team starts with. The instruction to flag external dependencies (API approvals, rate limits) catches a specific, common hackathon failure mode: losing hours to a third-party service's approval process instead of your own build time.

**Token efficiency note:** Do this scoping conversation once, early, with your full idea and constraints laid out clearly. This is a planning task, not an iterative one — get a clear answer, make your cut decision, and move to building. Don't keep re-running this prompt hoping for a more flattering risk assessment.

---

## Validating Your Final Idea

- [ ] You can state it in one sentence using the Who/What/Pain format
- [ ] You've identified the specific "wow" moment and what it takes to make it land
- [ ] You've cut the idea once already, and it's still genuinely interesting after the cut
- [ ] No part of your plan depends on an external approval process (API access, OAuth review) that could stall you unpredictably
- [ ] Every team member could explain the idea the same way, in the same sentence, if asked separately

> [!NOTE]
> If two teammates describe the idea differently when asked separately, you don't have one idea yet — you have two ideas wearing the same name. Resolve this now; it's far cheaper than discovering it mid-build.

---

## What's Next

Move to **MVP Features** — translating this one-sentence idea into the specific, minimal feature list that gets you to your wow moment without scope creep.
