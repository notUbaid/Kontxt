---
title: User Flows
slug: user-flows
phase: Phase 1
mode: hackathon
projectType: web app
estimatedTime: 10-15 min
---

# User Flows

Your PRD has a rough numbered flow already. This module turns it into something more concrete: the actual screen-by-screen path, with enough detail that two people can build different parts of it in parallel without guessing what the other person is assuming.

This is still not a full UX design exercise. It's the minimum detail needed to split work safely and to know exactly what your demo will walk through.

---

## The Core Idea: One Flow, Not a Flowchart

A real product needs to handle many paths — new users, returning users, error states, edge cases. A hackathon demo follows exactly one path, every time, on stage. Your job here is to define that one path with total clarity, and to explicitly *not* design for paths the demo will never take.

> **️ Warning**
> Don't design a flow with five different branches "just in case." Every branch is a screen someone has to build and a state someone has to handle. If a branch doesn't appear in your literal demo script, it doesn't belong in your hackathon user flow — build it later only if time allows, never before the core path is solid.

---

## Step 1: Define the Happy Path as Screens, Not Just Actions

Your PRD's numbered list described actions. Now attach a screen to each step — what's actually on the page at that moment.

**Best Practice Card — Screen-Level Flow**

```
Step 1: Landing/Login screen
  - Shows: app name, one-line value prop, single sign-in button
  - User does: clicks sign in
  - Leads to: Step 2

Step 2: Main input screen
  - Shows: upload area / input field, brief instructions
  - User does: provides input, clicks submit
  - Leads to: Step 3 (loading state)

Step 3: Processing state
  - Shows: loading indicator, ideally something more interesting
    than a generic spinner (see UI Polish module)
  - Leads to: Step 4 automatically

Step 4: Result screen — THE WOW MOMENT
  - Shows: the actual output, front and center
  - User does: [one follow-up action, e.g., export, share, save]
  - This is what judges remember — give it the most design attention
```

Notice that Step 4 gets called out specifically. Every flow has one step that matters most — identify it explicitly so your team doesn't spend equal effort on the login screen and the moment that actually wins you points.

---

## Step 2: Decide What Happens When Things Go Wrong — But Only for the Demo Path

You don't need comprehensive error handling. You need to know what happens in the **one or two failure modes most likely to occur live**, because an unhandled error screen during your actual demo is far worse than a missing edge case nobody will ever trigger.

**Decision Card — Which Errors to Actually Handle**

| Error Type | Handle for Demo? | Reasoning |
|---|---|---|
| The exact failure your wow moment depends on (e.g., API timeout during generation) | Yes — build a graceful fallback | This is the single most likely thing to go wrong live, on stage, in front of judges |
| Invalid input you'll actually demo with | Yes, briefly | If your demo input could plausibly trigger it, handle it |
| Obscure edge cases (empty strings, unusual file types) | No | Won't occur in a scripted demo; not worth the time |
| Network failure mid-session | Maybe — only if your venue's wifi is a known risk | Weigh against your actual time budget |

---

## Step 3: Map Screens to Team Members Before Anyone Starts Coding

Once the flow is screen-by-screen, assigning ownership becomes obvious — and conflicts become visible immediately, while they're still cheap to resolve.

> ** Tip**
> Write the flow in a shared doc and literally put a name next to each screen before building starts. If two screens share state (e.g., the result screen needs data shaped a specific way from the processing step), make sure both owners agree on that shape before either starts — this is the same handoff-point discipline from the PRD's data model section, applied at the UI level.

---

## Using AI to Flesh Out the Flow Quickly

AI is useful for converting your rough PRD flow into the more detailed screen-by-screen version fast, and for catching missing transitions you didn't think to specify.

**Prompt: Screen-Level Flow from PRD**

```
Here's my hackathon PRD's user flow (numbered actions):
[paste from PRD module]

My wow moment is: [describe]

Expand this into a screen-by-screen flow. For each screen, specify:
1. What's shown on the screen
2. What the user does
3. What screen it leads to next
4. Whether this screen is the wow moment (mark exactly one as such)

Then identify the single most likely failure point in this flow that
could occur during a live demo, and suggest a graceful fallback for
that one failure only. Do not suggest handling for failures unrelated
to the literal demo path.
```

> ** Why this prompt works**
> Requiring exactly one screen to be marked as the wow moment forces a clear prioritization decision instead of treating every screen as equally important — directly enforcing the Step 1 discipline. Limiting failure handling to "the single most likely" failure point keeps the model from generating a comprehensive error-handling list you don't have time to build, the same restraint applied throughout this curriculum's hackathon-mode guidance.

**Token efficiency note:** Generate the screen-level flow once your PRD is finalized, in the same sitting. Don't iterate on this flow extensively after build starts — small adjustments are fine, but a fundamentally different flow mid-build means you're re-doing work already in progress across your team.

---

## Validating the Flow Before Splitting Work

- [ ] Every screen in the flow appears in your literal demo script — nothing extra
- [ ] Exactly one screen is identified as the wow moment, and it has the team's design attention
- [ ] The one or two most likely live-demo failure points have a graceful fallback planned
- [ ] Every screen has an owner, assigned before coding starts
- [ ] Anywhere two screens share data, both owners have agreed on the shape of that data

---

## What's Next

Move to **Design System** — establishing the visual language (colors, typography, spacing) that makes every screen in this flow feel like one cohesive product instead of pieces built by different people.
