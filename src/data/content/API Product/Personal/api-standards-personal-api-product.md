---
title: API Standards
slug: api-standards
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 10–15 min
---

# API Standards

Every module so far in this phase made one decision at a time — how errors look, how responses are shaped, how fields are cased. This module isn't new decisions. It's writing all of them down in one place, as a single reference, so "wait, did I use snake_case or camelCase for this one?" never costs you a search through five previous modules again.

Think of this as your API's style guide. Short, boring, and exactly what keeps a solo-built API from feeling inconsistent by the time you're three endpoints deep.

## Assemble Your Standards Document

Pull directly from what you've already decided — this module produces zero new design decisions, only consolidation.

```markdown
# [API Name] — API Standards

## Naming
- Resource names: plural, [snake_case / camelCase]
- Field names: [snake_case / camelCase], consistent across all endpoints
- IDs: [integer / UUID / prefixed string, e.g. sub_1a2b3c]

## Formats
- Dates/times: ISO 8601 (2026-07-01T14:30:00Z)
- Currency (if applicable): [smallest unit, e.g. cents, or decimal]

## Response Envelope
- Success: { "data": ..., "meta": ... }
- Error: { "error": { "code", "message", "field" } }

## HTTP Status Codes
[Paste your status code table from Error Design]

## Pagination
- Style: [offset / cursor]
- Params: [e.g. page, limit / cursor, limit]

## Versioning
- [To be finalized in Versioning Strategy — placeholder for now]
```

This is meant to be short enough to re-read in under a minute, and precise enough to settle any "how did I do it last time" question without opening old modules.

## Why This Matters More for Solo Builders, Not Less

It's easy to assume a style guide is a team artifact — something you need when multiple engineers might diverge. On a solo project the risk is different but just as real: **you** diverge from yourself, three weeks and a dozen AI coding sessions later, because you don't remember the exact convention you picked in Phase 1. This document is what keeps a new AI session consistent with decisions you made in an old one.

> **Tip:** Paste this Standards doc, not your full PRD, into AI conversations focused on implementation detail (writing a specific endpoint's code). It's shorter, cheaper in tokens, and contains exactly the constraints that matter for writing consistent code — the PRD is for "what," this is for "how."

## Personal Mode: This Replaces a Full Style Guide

Production teams often maintain extensive API style guides covering dozens of edge cases. You don't need that. This one-page reference, kept accurate as you make new decisions in later phases, is sufficient for a project with one engineer and one reviewer — both of whom are you.

- [ ] Every convention decided in Request Design, Response Design, and Error Design is captured here
- [ ] The document is one page or less
- [ ] I'd actually reference this instead of re-deciding a convention from memory

## AI Prompt: Check for Inconsistencies

```
Here's my API Standards document:
[paste your filled-in doc]

Here's my endpoint list with request/response specs so far:
[paste from Request Design / Response Design]

Cross-check them:
1. Does every endpoint's field naming actually match the convention stated in Standards?
2. Are there any inconsistencies between endpoints — one using a different date format, ID style, or envelope shape than the rest?
3. Flag anything in Standards that's incomplete or contradicts itself.
```

## Before You Continue

- [ ] My Standards document is complete and fits on one page
- [ ] I've cross-checked it against my actual endpoint specs and found no contradictions
- [ ] I know to reference this document, not memory, for future convention questions

When all three are checked, move to **Versioning Strategy**.
