---
title: Feature Brainstorm
slug: feature-brainstorm
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 30–45 min
---

# Feature Brainstorm

This is the first module where you generate possibilities instead of making decisions.

Brainstorming has one rule: quantity over quality. You are not evaluating, filtering, or committing to anything yet. You are building the largest honest pool of potential features possible — so that when you prioritize in the next module, you're cutting from a complete picture rather than a partial one.

The mistake most builders make is brainstorming and prioritizing at the same time. They think of a feature, immediately decide it's too complex, and never write it down. This means the prioritization that follows is based on a filtered list — and the features that got quietly dropped might have been the most important ones.

Write everything down. Judge nothing yet.

---

## What You Bring Into This

You've already done significant work. Use it.

Your brainstorm should be grounded in:

- **Value proposition** — every feature should connect, directly or indirectly, to the outcome you promised
- **User pain points** — features exist to remove specific friction your users described
- **Competitor gaps** — the weaknesses you found are feature opportunities
- **Existing alternatives** — the breakdowns in current workflows point to what users actually need built

If a feature idea doesn't connect to any of these, it's a nice-to-have at best and a distraction at worst. Write it down anyway — but note the disconnection.

---

## How to Structure a Brainstorm That's Actually Useful

Unstructured brainstorming produces random lists. Structured brainstorming produces a list you can reason about.

Work through each lens below in order. Each one surfaces different types of features. Combining them gives you the most complete picture.

---

### Lens 1 — The User Journey

Walk through every step your target user takes from the moment they have the problem to the moment it's resolved. For each step, ask: what does the user need here that they don't currently have?

Map it like this:

```
Awareness       →  Discovery     →  Setup        →  Core Use     →  Output/Result
(they notice    (they find      (they get       (they do the   (they get the
 the problem)    your product)   started)        actual work)   value)
```

Features live at every stage — not just in the core use. Onboarding features, notification features, export features, and sharing features all come from this lens.

Common areas people forget to brainstorm:

- Empty states (what does the user see before they have data?)
- Error states (what happens when something goes wrong?)
- Collaborative features (what if more than one person uses this?)
- Mobile or async usage (what does the user need when they're not at a desk?)
- Offboarding (what does a user need when they want to export or leave?)

---

### Lens 2 — The Pain Points

Go back to your user research notes. For every frustration your users described, ask: what feature would make this frustration disappear?

Be literal. If users said "I have to manually copy this into three different places every week," the feature is: automated sync or a single source of truth. If users said "I never know if someone has actually seen my update," the feature is: read receipts or activity feeds.

User language is a feature specification. Mine it.

---

### Lens 3 — The Competitor Gaps

You mapped what competitors do poorly. For each gap:

- What would the feature that closes this gap look like?
- Is it a net-new feature, or an existing feature done significantly better?
- Is it a workflow improvement, a UX improvement, or a capability gap?

Don't just list "better UX." That's not a feature. "Single-click setup that takes under 5 minutes" is a feature. "Inline editing without a modal" is a feature.

---

### Lens 4 — The Outcome Expansion

Your core value proposition delivers one primary outcome. But users who get that outcome often want adjacent outcomes next.

Ask: what would a user want to do after they've gotten the core value from your product?

These become future features — but brainstorming them now ensures you don't accidentally build a product that dead-ends. Architecture decisions made in Phase 2 should account for where the product is going, not just where it starts.

---

### Lens 5 — The Trust and Safety Layer

These features are consistently under-brainstormed and consistently important in production SaaS:

- Audit logs — who did what, when
- Role-based access — who can see and do what
- Data export — users own their data
- Account deletion — users can leave
- 2FA / SSO — secure access
- Usage limits — protecting against abuse or runaway costs
- Notifications and alerts — keeping users informed without overwhelming them

None of these are glamorous. All of them matter in production. If your brainstorm doesn't include any of them, your MVP will ship without them — and you'll scramble to add them later under pressure.

---

## Use AI to Fill the Gaps

After you've gone through each lens yourself, use AI to surface what you missed. Give it your context first — a generic prompt produces generic features.

```prompt
I'm building a SaaS product with the following context:

Value Proposition: [paste yours]
Target User: [describe specifically]
Core Problem Solved: [1–2 sentences]
Primary Competitor Weaknesses: [list 2–3 from your analysis]
Existing Alternative Users Currently Use: [describe]

Generate a comprehensive feature brainstorm across these categories:

1. Core features — the features that directly deliver the value proposition
2. Onboarding features — what helps a new user get to value fast
3. Collaboration features — what enables multiple users or stakeholders
4. Notification and communication features
5. Data management features — import, export, search, filtering
6. Admin and settings features
7. Trust and safety features — permissions, audit logs, security
8. Integration features — connections to tools users already use
9. Analytics and reporting — what users need to measure success
10. Future expansion features — logical next steps after core value

For each feature, write one sentence describing what it does and why a user
would want it. Do not prioritize or evaluate — just generate.

Be specific. "Dashboard" is not a feature. "Real-time dashboard showing
[specific metric] broken down by [dimension]" is a feature.
```

Read the output critically. Remove anything that doesn't connect to your value proposition or user pain points. Add anything you missed in your own brainstorm. The goal is one combined, comprehensive list.

---

## Capture Format

Write every feature in the same format. Consistency makes the next module (prioritization) significantly easier.

```
Feature: [Short name]
What it does: [One sentence — concrete, not vague]
Why users want it: [The specific pain it removes or outcome it enables]
Source: [User research / competitor gap / value prop / journey mapping]
```

Example:

```
Feature: Bulk CSV import
What it does: Allows users to upload existing data from spreadsheets
              in a single step during onboarding
Why users want it: Users currently maintain their data in Excel;
                   manual re-entry is the biggest onboarding drop-off point
Source: User research (3/5 users mentioned this unprompted)
```

The Source field is more important than it looks. In the next module, features backed by user research will be weighted higher than features generated by AI or intuition alone.

---

## Volume Targets

By the time you finish this module, you should have:

- **15–25 core and supporting features** — things you can imagine in v1 or v2
- **5–10 future features** — logical expansions once the core is established
- **3–5 trust and safety features** — non-negotiable in production

If you have fewer than 15 total features, you haven't gone deep enough. Go back through the lenses.

If you have more than 60, you've likely gotten too granular — some of what you've listed are design decisions, not features. Consolidate.

---

## What You Are Not Doing Here

> [!WARNING]
> **Deciding what to build**
>
> That is the next module. The moment you start filtering here, you start building on a biased list. Trust the process — brainstorm completely, then prioritize separately.

---

> [!WARNING]
> **Estimating complexity**
>
> "That would take too long to build" is a prioritization concern, not a brainstorming concern. Write it down. You'll weigh effort against value in the next module.

---

> [!WARNING]
> **Designing the features**
>
> You don't need to know how a feature works yet. "Real-time collaboration" is enough for now. How it's implemented — WebSockets, operational transforms, conflict resolution — is a Phase 2 and Phase 3 concern.

---

> [!WARNING]
> **Only brainstorming features you know how to build**
>
> Your current technical knowledge should not constrain what you write down. AI tools, libraries, and APIs exist that can help you build things you've never built before. Scope your imagination to what users need, not what you currently know how to ship.

---

## Validation Checklist

- [ ] I've gone through all five brainstorming lenses
- [ ] I've run the AI prompt and merged the output with my own list
- [ ] Every feature has a one-sentence description and a source
- [ ] I have at least 15 features total
- [ ] I have at least 3 trust and safety features on the list
- [ ] I have not filtered or prioritized anything yet
- [ ] I have a separate section for future features that won't make v1

---

## Quick Reference

```
The Five Brainstorming Lenses
────────────────────────────────────────────────
1. User journey    →  Every step from problem to resolution
2. Pain points     →  Each user frustration → one feature
3. Competitor gaps →  Their weakness → your specific feature
4. Outcome expansion → What users want after core value
5. Trust & safety  →  Permissions, logs, export, security

Feature Capture Format
────────────────────────────────────────────────
Feature:       Short name
What it does:  One concrete sentence
Why users want it: Pain removed or outcome enabled
Source:        Research / gap / value prop / journey

Volume Targets
────────────────────────────────────────────────
Core + supporting features   →  15–25
Future features              →  5–10
Trust and safety features    →  3–5 minimum
```
