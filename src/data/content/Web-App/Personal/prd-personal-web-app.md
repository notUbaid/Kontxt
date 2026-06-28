---
title: PRD
slug: prd
phase: Phase 1
mode: personal
projectType: web app
estimatedTime: 25–40 min
---

# PRD

A Product Requirements Document sounds like corporate overhead. For a solo personal project, it's something much more practical: a single source of truth that keeps your decisions consistent across weeks of building — and gives your AI tools the context they need to actually help you.

Without it, every AI conversation starts from zero. With it, you paste one document and get immediately useful output.

---

## What a Personal Project PRD Is Not

It is not a 40-page specification document.
It is not a formal requirements matrix.
It is not something you write for a team to review.

It is a living reference file — probably 300–600 words — that you update as your project evolves and paste into AI tools whenever you need context-aware help.

---

## Why It Matters More Than You Think

> ** Tip**
> AI tools have no memory between conversations. Every time you start a new chat, you're talking to something that knows nothing about your project. A PRD is the context layer that turns generic AI output into output that's actually useful for your specific product.

The difference between "write me a user auth flow" and "here's my PRD — write me a user auth flow for this specific product" is significant. The second prompt produces something you can use. The first produces something you spend 20 minutes adapting.

---

## The PRD Structure

Your personal project PRD has five sections. Nothing more.

---

### 1. Project Overview

Three to five sentences. What you're building, who it's for, and what problem it solves.

```
[App name] is a web app for [specific user] that [does the core thing].

The problem: [pain point in one sentence].

The current workaround: [what people do today].

[App name] solves this by [your core approach].
```

---

### 2. Target User

One paragraph. Get specific. Not a persona with a stock photo name — a real description of the type of person this is built for.

Include:
- What they do (role, context)
- What they struggle with (specific to your problem)
- What they care about (what would make them switch from their current workaround)
- Their technical comfort level (matters for how complex the UI can be)

---

### 3. MVP Features

Paste your Core list from the MVP Features module. For each feature, include the one-line scope boundary — what it does and what it explicitly does not do in v1.

```
## MVP Features

### [Feature Name]
Does: [what it does]
Does not: [explicit v1 boundary]

### [Feature Name]
Does: [what it does]
Does not: [explicit v1 boundary]
```

---

### 4. Technical Constraints

Any decisions already made or constraints that are real:

- Hosting budget (e.g., "must run for under $5/month")
- Tech preferences (e.g., "React frontend, open to any backend")
- Non-negotiable integrations (e.g., "must use Stripe for payments")
- Devices to support (e.g., "desktop only for MVP, mobile later")
- Timeline (e.g., "want to ship in 4 weeks")

Don't invent constraints that don't exist. Only include what's genuinely true.

---

### 5. Out of Scope (v1)

An explicit list of things you are not building in the MVP. This section is as valuable as the features list.

Every time you're tempted to add something mid-build, check it against this list. If it's here, it doesn't get built now.

```
Not building in v1:
- Mobile app
- Social features / sharing
- Team / multi-user support
- Admin dashboard
- API for third-party integrations
- [anything from your List 2 and List 3]
```

---

## Generating Your PRD With AI

**Copy Prompt**

```
I'm building a personal web app. Help me write a concise PRD.

Here is what I know so far:

App name: [name]
What it does: [one sentence]
Who it's for: [specific user]
Problem it solves: [pain point]
Current workaround: [what people do today]
MVP features: [your core feature list]
Technical constraints: [budget, stack preferences, timeline]
Out of scope for v1: [your list 2 and 3 items]

Write a PRD using exactly this structure:
1. Project Overview (3–5 sentences)
2. Target User (one focused paragraph)
3. MVP Features (each with a "Does / Does not" scope boundary)
4. Technical Constraints (bullet list)
5. Out of Scope v1 (bullet list)

Be specific and concrete. Remove any vague language. If something I've written is unclear, rewrite it to be precise.
Return only the PRD. No preamble.
```

---

## Reviewing the AI Output

Before you lock in your PRD, read it critically.

- [ ] Does the Project Overview sound like your actual product — or something generic?
- [ ] Does the Target User description match a real person you can picture?
- [ ] Are the MVP feature boundaries specific enough that you'd know when each one is done?
- [ ] Are the technical constraints accurate to your real situation?
- [ ] Does the Out of Scope list capture everything that's tempting but not necessary?

Rewrite anything that feels like it could describe someone else's product. The PRD is only useful if it's precise to yours.

---

## Keeping the PRD Alive

Your PRD is not a document you write once and forget.

Update it when:
- You make a significant architecture decision
- A feature scope changes
- You add something to Out of Scope that wasn't there before
- You cut a feature from the MVP

Keep it in your project repo as `PRD.md`. Every time you start an AI session that involves product or architecture decisions, paste it at the top of the prompt.

> ** Tip**
> Keep your PRD under 600 words. Longer than that and it stops being useful as a quick-paste context document. If it's growing, it means decisions are getting buried in prose — pull them out into the relevant sections and cut the rest.

---

## PRD Checklist

- [ ] Project Overview is 3–5 sentences and describes your specific product
- [ ] Target User is a real description, not a generic persona
- [ ] Each MVP feature has a clear "does / does not" scope boundary
- [ ] Technical constraints reflect your actual situation
- [ ] Out of Scope list includes everything from your Lists 2 and 3
- [ ] PRD is saved as `PRD.md` in your project repo
- [ ] Total length is under 600 words

---

## What's Next

Move to **User Flows** — taking your PRD and mapping out the exact paths a user takes through your app, screen by screen, before you design or build anything.
