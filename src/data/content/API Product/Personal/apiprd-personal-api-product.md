---
title: PRD
slug: prd
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 15–20 min
---

# PRD

You've spent Phase 0 making decisions in fragments — a problem statement here, a use case there, a scope boundary somewhere else. A PRD isn't new work. It's the moment those fragments become one document you can actually build from, and — more importantly — one document you can hand to an AI coding tool as context instead of re-explaining your project from scratch every conversation.

Think of this less as a deliverable and more as your project's memory. Everything from here forward references it.

## Why an API Product's PRD Looks Different

A PRD for a UI product describes screens and user flows. A PRD for an API product describes **contracts** — resources, requests, responses, and guarantees. There's no visual design to reference; the API surface itself *is* the product experience.

That means your PRD needs to be precise about things a UI-focused PRD could leave fuzzy: exact resource names, response shapes, and error behavior. Vagueness here becomes ambiguity in code later.

## What Goes In

Pull each section directly from what you already decided in Phase 0 — you're assembling, not inventing.

| Section | Source |
|---|---|
| Problem & Purpose | Problem Definition, API Purpose |
| Primary Caller | Target Developers |
| Core Use Cases | API Use Cases |
| MVP Endpoints | MVP Scope, Feature Prioritization |
| Out of Scope | MVP Scope's exclusion list |
| Rate Limits & Access | Monetization Strategy |
| Success Criteria | Success Metrics |

If a section has nothing to pull from, go back and finish that Phase 0 module first — a PRD built on skipped decisions just relocates the vagueness instead of resolving it.

## Template

```markdown
# [API Name] — PRD

## Problem
[One paragraph, from Problem Definition]

## Purpose
[One sentence, from API Purpose]

## Primary Caller
[Profile, from Target Developers]

## Core Use Cases
1. [Use case 1 — the non-negotiable one]
2. [Use case 2]
3. [Use case 3, if applicable]

## MVP Endpoints (high-level)
- [Resource]: [what it does, not yet the full spec]
- [Resource]: [what it does]

## Explicitly Out of Scope
- [Excluded item 1]
- [Excluded item 2]

## Access & Limits
- Auth: [method, from what you'll design in Authentication Strategy — placeholder is fine here]
- Rate limit: [number, from Monetization Strategy]

## Success Criteria
- [Checkable outcome 1]
- [Checkable outcome 2]
```

Keep the endpoint list high-level here — exact request/response shapes belong in the next few modules. This document answers "what and why," not yet "exactly how."

> **Tip:** Keep this PRD under one page. If it's growing past that, you're either duplicating detail that belongs in later modules, or your MVP scope has quietly grown since the last module. Check which one before continuing.

## Using This as AI Context

This PRD is the single most valuable piece of context you'll paste into AI conversations for the rest of this build. When starting a new AI session for implementation work, paste the PRD first, then ask your specific question — this keeps every conversation grounded in the same decisions instead of AI re-guessing your project's shape each time.

> **Warning:** Don't paste your entire Phase 0 module output into every AI conversation "just in case." That burns tokens on context the AI doesn't need for the task in front of it. The PRD exists specifically so you don't have to — it's the distilled version.

## AI Prompt: Tighten the Draft

```
Here's my API product PRD draft:

[paste your filled-in PRD]

Review it as a staff engineer would before approving it for implementation:
1. Is anything here vague enough that two different engineers might implement it differently?
2. Does the "Core Use Cases" list match the "MVP Endpoints" list — does every use case have the endpoints it needs, and does every endpoint serve a listed use case?
3. Tighten the language throughout without changing any decisions — I want it shorter, not different.
```

## Before You Continue

- [ ] My PRD fits on one page
- [ ] Every endpoint listed traces to a use case, and every use case has the endpoints it needs
- [ ] I could paste this into a new AI conversation and get a correct understanding of my project with no follow-up questions

When all three are checked, move to **API Resources**.
