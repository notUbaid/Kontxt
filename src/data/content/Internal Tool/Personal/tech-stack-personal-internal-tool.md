---
title: Tech Stack
slug: tech-stack
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 20–25 min
---

# Tech Stack

Internal Tool Fundamentals established the principle: choose boring, well-documented technology over novel or "impressive" options. This module applies that principle directly, walking through each layer of your stack and the actual decision criteria for a personal-mode internal tool.

---

## The Four Layers You're Choosing

Every internal tool, no matter how simple, involves four decisions. You don't need to research each one exhaustively — but you do need to make each one deliberately, not by default.

```
1. Frontend — what renders your screens
2. Backend / logic layer — where your business rules run
3. Database — where your data persists
4. Hosting — where it all actually runs
```

For a personal tool, these four choices should optimize for one thing above all: how fast can you go from "nothing" to "working tool I can use today."

---

## Frontend: Match the Complexity of Your Wireframes

Look back at your Phase 1 wireframes. A tool with 2-3 screens, simple forms, and a list view doesn't need the same frontend approach as a complex multi-view application.

| Your wireframes look like... | Reasonable frontend approach |
|---|---|
| A handful of simple screens, mostly forms and lists | A lightweight framework with minimal setup, or even a no-code/low-code builder |
| Multiple interactive views, real-time updates | A component-based framework (React, Vue, etc.) |
| You specifically want to practice a particular framework | Choose it deliberately — that's a valid, stated reason |

> **Rule of thumb**
> If your wireframes could be built with a form, a list, and a detail view, don't reach for a framework designed for complex, highly interactive applications. Match the tool to the actual shape of what you're building.

---

## Backend: Do You Even Need a Separate One?

This is the question beginners skip most often. For many personal internal tools, a full separate backend service is unnecessary complexity — modern frameworks increasingly let you handle data and logic within the same project as your frontend.

- Does your tool need to run scheduled jobs (e.g., automatic overdue checks) independent of you opening the app?
- Does your tool need to talk to external services (email, APIs) that require hidden credentials?
- Or does everything happen when you interact with the app directly?

> **Example**
> An invoice tracker where "overdue" is calculated live every time you open the list doesn't need a scheduled backend job — the calculation can happen on load. If you later wanted proactive email reminders, that would introduce a real need for backend logic running independently of your visits.

If your answer to all three questions leans toward "everything happens when I open the app," a combined frontend+backend framework, or even a backend-as-a-service platform, likely removes an entire layer of complexity you don't need yet.

---

## Database: Match Data Volume and Structure, Not Ambition

Your data model (defined in the next module) will drive this more precisely, but a general principle applies now: a personal tool's data volume is almost always small — hundreds or low thousands of records, not millions.

| Situation | Reasonable database choice |
|---|---|
| Simple, mostly flat data (a few related tables) | A lightweight relational database (e.g., SQLite, or a managed Postgres free tier) |
| Data that's naturally document-shaped, few relationships | A simple document store |
| You're using a backend-as-a-service platform | Its built-in database is usually sufficient — don't add a separate one unnecessarily |

> **Watch out for premature scaling decisions**
> Choosing a database because "it scales to millions of rows" is solving a problem you don't have. Choose based on how well it fits your actual data shape and how quickly you can start using it today.

---

## Hosting: Free or Near-Free, Minimal Ops

For a personal internal tool, hosting should cost close to nothing and require minimal ongoing maintenance. Many modern platforms offer generous free tiers specifically suited to exactly this kind of low-traffic, single-user project.

- Does the hosting option have a genuinely usable free tier for your expected (very low) traffic?
- Does deploying an update require more than a simple push or click?

This gets covered in depth in Phase 5 (Hosting) — for now, just confirm your chosen frontend/backend combination has a straightforward, low-effort hosting path, so you're not backing yourself into a complicated deployment later.

---

## Write Down Your Stack and Why

Once you've decided, write a short record — this becomes something you reference constantly during Phase 3, and something an AI coding assistant will need as context for every prompt.

```
Frontend: [choice] — chosen because [reason]
Backend: [choice, or "none — handled within frontend framework"]
Database: [choice] — chosen because [reason]
Hosting: [choice] — chosen because [reason]
```

---

## Using AI to Validate Your Stack Choice

> **Copy this prompt**
> ```
> I'm building a personal, single-user internal tool. Here's my
> PRD summary and wireframe complexity:
>
> [paste summary]
>
> I'm considering: [your draft stack choices]
>
> Sanity-check this:
> 1. Is this stack proportional to the complexity of what I'm
>    building, or is it heavier than necessary?
> 2. Do I actually need a separate backend service, given my
>    described functionality?
> 3. Is there a simpler combination that would get me to a working
>    tool faster, without sacrificing anything I actually need?
>
> Assume I want the fastest realistic path to a working, maintainable
> personal tool — not a production-scale architecture.
> ```

> **Validation warning**
> If AI recommends a stack with more moving pieces than modules in your MVP scope, that's a signal to push back and ask for the simpler alternative directly.

---

## What You Should Have Now

- A frontend choice matched to your wireframe complexity
- A clear decision on whether you need a separate backend layer at all
- A database choice matched to your actual data volume and shape
- A hosting option with a low-effort, low-cost path confirmed
- A written record of your stack and the reasoning behind each choice

With your stack decided, the next module — User Architecture — covers how your tool handles the concept of "who's using it," even when the answer is simply "just me."
