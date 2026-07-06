---
title: Idea Definition
slug: idea-definition
phase: Phase 1
mode: personal
projectType: mobile-app
estimatedTime: 30–45 min
---

# Idea Definition

Most apps fail before a single line of code is written.

Not because the idea was bad. Because the idea was never made specific enough to build.

"An app that helps people be more productive" is not an idea. It is a wish. You cannot make decisions from a wish. You cannot write a spec, design a screen, or choose a database for a wish.

This module turns your wish into a buildable idea.

---

## The Problem With Most App Ideas

New builders typically start with one of three things:

- A feature ("I want to build an app with a habit tracker")
- A category ("I want to build a fitness app")
- A solution ("I want to build an app like X but better")

None of these is a problem.

And apps that do not solve a specific problem for a specific person do not get used — even if they are beautifully built.

The starting point is always the same: **who has this problem, and what does it cost them?**

---

## The One Person Framework

Before anything else, name one person.

Not a demographic. Not "people aged 18–35 who are interested in fitness." A real or realistic person with a name, a context, and a specific frustration.

**Example:**

> Anika is a freelance graphic designer. She works from home and takes on 4–6 projects at a time. She loses track of how many hours she's spent on each project and consistently undercharges clients because she can't remember to log her time in the moment. She has tried Toggl and Harvest but finds them too heavy for how she works. She wants something she can tap once to start and once to stop — nothing else.

That is a person. That is a problem. That is a constraint ("too heavy"). That is a standard to meet ("tap once to start, once to stop").

Every good app idea can be expressed this way.

```
Copy Prompt ↓
```

> I'm building a personal mobile app. Help me articulate my idea using the One Person Framework. Here is my rough idea: [describe your idea in 2–4 sentences].
>
> Generate:
> 1. A specific fictional user (name, context, daily situation)
> 2. The exact problem they face — specific, not generic
> 3. What they've already tried and why it didn't work
> 4. What the ideal solution feels like to them (not features — the feeling)
> 5. One sentence that defines success: "This app works if [specific person] can [do specific thing] without [friction they currently face]."

---

## Sharpening the Problem

A sharp problem statement has three qualities:

**Specific** — It describes a moment, not a general struggle.
Vague: "People forget things."
Specific: "Anika forgets to log time the moment a client calls mid-task."

**Costly** — It has a real consequence.
"She consistently undercharges by 20–30% because her estimates are guesswork."

**Unresolved** — Existing solutions don't fix it well enough.
"She's tried three time-tracking apps. They all require too many taps."

If your problem statement has all three, you have something worth building.

If it doesn't — that is not a reason to stop. It is a signal to keep sharpening.

---

## The Mobile-First Test

Not every problem is best solved with a mobile app.

Before committing to a mobile build, ask:

| Question | If Yes → | If No → |
|---|---|---|
| Does the solution need to be with the user constantly? | Mobile is right | Consider web |
| Does it rely on device sensors (camera, GPS, motion)? | Mobile is right | Web may be simpler |
| Is the core interaction a quick tap or capture? | Mobile is right | Web form may suffice |
| Does it need to work offline? | Mobile is right | Web is fine |
| Will users need it in a physical context (moving, working with hands)? | Mobile is right | Consider web |

If you answered "yes" to at least two of these, you are in the right place.

If you answered "no" to most of them — a web app might serve the idea better. This is worth knowing now, not six months from now.

---

## Define the Core Loop

Every app that gets used daily has a core loop — a sequence of actions the user repeats.

Define yours in three steps or fewer.

**Examples:**

| App Type | Core Loop |
|---|---|
| Time tracker | Tap start → do work → tap stop → see total |
| Habit tracker | Open app → check off today's habit → see streak |
| Note-taking | Capture thought → find it later |
| Language learning | See word → recall meaning → mark known/unknown |
| Expense tracker | Spend money → log it immediately → see weekly total |

Your core loop is the heartbeat of your app. Everything else is secondary.

```
Copy Prompt ↓
```

> I'm building a mobile app for [describe your user and problem]. Define the core loop for this app — the sequence of 2–4 actions a user repeats every time they use it. Then identify: what triggers the loop (what makes them open the app), what the minimum viable version of the loop looks like, and what would make a user skip the loop (friction to eliminate). Be specific and practical.

---

## Scope: What This App Is Not

Personal projects expand until they cannot be finished.

The second most important thing you will write — after your problem statement — is a "not list."

**Example not list for a time-tracking app:**
- Not a project management tool
- Not a team/collaborative feature
- Not invoice generation
- Not integrations with accounting software (in v1)
- Not a web dashboard (in v1)
- Not reporting beyond weekly totals

Every item on this list is a real temptation. It will come up while you are building. Having it written down gives you something to point to when scope creep whispers.

Write your not list now. You can always remove things from it. The discipline is in writing it.

---

## Validate Before You Build

Building the wrong thing is the most expensive mistake in software.

Before writing a line of code, do at least one of these:

**Talk to one person.** Find someone who matches your user description. Describe the problem — not the app. Ask if it resonates. Ask what they currently do instead. Listen for what surprises you.

**Write a fake App Store listing.** Write the title, the one-liner, and three bullet points for your app's listing. If you struggle to write them, the idea is not sharp enough yet.

**Sketch three screens.** Not designed — sketched. On paper or in a notes app. If you cannot sketch the three most important screens, the core loop is not clear yet.

You do not need all three. You need at least one.

---

## Idea Definition Checklist

- [ ] One specific person identified — named, contextualised, real enough to design for
- [ ] Problem statement is specific, costly, and unresolved by existing tools
- [ ] Mobile-first test passed — mobile is genuinely the right platform
- [ ] Core loop defined in 3 steps or fewer
- [ ] Not list written — at least 5 things this app will not do in v1
- [ ] At least one validation step completed (conversation, fake listing, or sketches)
- [ ] One-sentence success definition written

---

## The Deliverable

Before moving on, write this down somewhere you will see it throughout the build:

```
[App Name] helps [specific person] [do specific thing] 
without [friction they currently face].

It works when they can [core loop in one sentence].

It does not do [top item from not list].
```

This is your north star. Every design decision, every feature debate, every "should we add X?" question gets answered by coming back to this.

---

## Next Step

Idea Definition is done when you have a sharp problem statement, a clear core loop, and a not list you believe in.

Move to **PRD** next.
