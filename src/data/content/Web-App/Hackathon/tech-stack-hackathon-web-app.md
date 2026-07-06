---
title: Tech Stack
slug: tech-stack
phase: Phase 2
mode: hackathon
projectType: web app
estimatedTime: 15-20 min
---

# Tech Stack

Every hour you spend fighting unfamiliar tooling is an hour not spent building your wow moment. Tech stack choice in a hackathon has exactly one dominant criterion, and it's not "what's technically best" — it's **what can your specific team move fastest in, starting right now.**

---

## The Core Idea: Familiarity Beats "Best"

The "best" stack for a production SaaS optimizes for things that don't matter today — long-term maintainability, team scalability, hiring pools. The best hackathon stack optimizes for one thing: your team's actual, current fluency with it.

> [!WARNING]
> Don't pick a new framework because you read it's impressive, or because you want to learn it. A hackathon is the worst possible place to learn a new tool for the first time — every unfamiliar error message costs you build time you don't have, and there's no time buffer to recover from a wrong guess about how something works.

---

## Decision Card: Default Stack by Scenario

| Your Situation | Recommended Stack | Reasoning |
|---|---|---|
| Team already knows React + a backend framework | Stick with it | Zero ramp-up time beats any theoretical advantage of switching |
| Team is unfamiliar with most options, needs a safe default | Next.js (full-stack) + Supabase or Firebase + Tailwind CSS | Minimizes the number of separate services to configure; auth, database, and hosting come pre-integrated |
| Solo builder, extremely time-constrained | A full-stack framework with built-in auth/database helpers (Next.js + Supabase, or similar) | Fewer moving parts for one person to manage alone |
| Heavy AI/LLM integration is the core feature | Same defaults above + a single AI provider's SDK, called directly — don't add an orchestration framework you haven't used before | Simplicity at the integration layer matters more than flexibility you won't need in 24 hours |

If your team already has strong opinions and experience, ignore this table — your familiarity outweighs any of these recommendations.

---

## Step 1: Minimize the Number of Services You're Integrating

Every additional service (separate auth provider, separate database host, separate file storage, separate hosting platform) is another sign-up flow, another API key, another thing that can fail independently during setup. In a hackathon, **fewer integrated services beats more "best-in-class" individual services.**

**Best Practice Card — Service Consolidation**

```
Instead of: separate auth provider + separate Postgres host +
            separate file storage + separate hosting

Prefer: a single platform that bundles auth, database, and storage
        together (e.g., Supabase or Firebase), paired with a hosting
        platform that deploys directly from your git repo with zero
        config (e.g., Vercel or Netlify)

Fewer dashboards to configure. Fewer API keys to manage. Fewer
places for a typo in an environment variable to silently break
something at 2am.
```

---

## Step 2: Pick Boring, Well-Documented Tools Over Cutting-Edge Ones

A tool with massive adoption has more Stack Overflow answers, more AI training data behind it (meaning your AI coding assistant will generate more accurate code for it), and fewer surprising bugs you'll hit for the first time. Cutting-edge tools are exciting in a side project with no deadline — they're a liability when every hour matters.

> [!TIP]
> If you're choosing between a tool you've never used that's "the new hot thing" and a boring, mature tool you've at least seen used before, pick the boring one. The hackathon clock doesn't care which one is more interesting to put on a resume — it cares whether you can debug it fast when something breaks.

---

## Step 3: Confirm Setup Time Before Committing

Some tools take 5 minutes to get running. Others take an hour of configuration before you write a single line of actual feature code. Check this before you commit, especially for anything involving OAuth setup, payment provider sandbox accounts, or third-party API key approval.

**Decision Card — Setup Time Reality Check**

| Tool/Service | Typical Setup Time | Risk |
|---|---|---|
| Vercel/Netlify deploy from git | Minutes | Low |
| Supabase/Firebase project + auth | 10-20 minutes | Low |
| A major AI provider API key | Minutes, usually instant | Low |
| OAuth app review (some providers) | Can take hours to days for approval | High — avoid unless already pre-approved |
| Payment provider live integration | Hours, often requires business verification | High — almost never worth it; fake it for the demo instead |

> [!WARNING]
> If a service's setup involves an approval queue or a verification process with an unknown wait time, assume it won't be ready before your deadline. Build your demo path around services with instant, self-serve setup only.

---

## Using AI to Confirm Your Stack Choice Fast

AI is useful here for a quick sanity check against your specific idea and team — not for generating an exhaustive comparison of every framework that exists, which wastes time you don't have.

**Prompt: Stack Confirmation, Not Exploration**

```
My hackathon idea: [one-sentence idea]
Core technical requirement: [e.g., "needs real-time updates," "needs
  file upload and AI processing," "just needs a simple CRUD app"]
My team's existing familiarity: [list languages/frameworks you
  already know well]
Time remaining: [hours]

Given my team's existing familiarity, confirm whether sticking with
what we already know is sufficient for this idea, or whether there's
a specific gap (e.g., we don't know how to do real-time updates and
the idea requires it) that justifies learning one new tool.

If there's a gap, recommend the single most well-documented, fastest
to learn option for that specific gap only — not a full alternative
stack.
```

> ** Why this prompt works**
> Framing the question as "confirm sufficiency" rather than "what's the best stack" pushes the model toward validating your existing familiarity instead of defaulting to listing impressive alternatives — directly countering the temptation to switch tools mid-decision under time pressure. Scoping any recommended new tool to "the single gap only" prevents a cascading stack change when you actually just need one new piece, not a full rebuild of your plan.

**Token efficiency note:** This should be one quick confirmation, not a back-and-forth exploration. If the answer comes back "stick with what you know," that's the correct outcome most of the time — don't keep prompting for alternatives hoping for a more exciting answer.

---

## Validating the Final Stack Choice

- [ ] Every tool chosen is one at least one team member has real, working experience with — not just "read about"
- [ ] Total number of separate services/dashboards is minimized
- [ ] No part of the stack depends on an approval process with unpredictable timing
- [ ] The stack genuinely supports your specific wow moment's technical requirement (real-time, AI processing, file handling — whatever it actually needs)
- [ ] Setup has been tested by actually running it, not just assumed to work from documentation

---

## What's Next

Move to **Database Architecture** — designing the minimum data structure your chosen stack needs to support the user flow you've already mapped out.
