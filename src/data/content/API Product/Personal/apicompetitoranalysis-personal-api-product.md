---
title: Competitor Analysis
slug: competitor-analysis
phase: Phase 0
mode: personal
projectType: api-product
estimatedTime: 15–20 min
---

# Competitor Analysis

You're not analyzing competitors to see if you should give up. You're analyzing them because every existing API in your space has already made — and publicly exposed — hundreds of design decisions. Reading their docs for twenty minutes teaches you more about API design tradeoffs than a week of building in isolation would.

This module isn't about market validation. It's about theft — the good, honest kind, where you learn from decisions other engineers already paid to get wrong.

## What to Actually Look At

Don't read marketing pages. Read the parts that reveal real engineering decisions:

- **Authentication docs** — API key, OAuth, or both? What's the friction to get a first key?
- **Error response format** — Do errors have codes, human messages, both? Can you tell what went wrong without cross-referencing docs?
- **Rate limit headers** — Do responses tell you your remaining quota, or do you find out by getting rate-limited?
- **Versioning scheme** — URL path (`/v1/`), header-based, or none? What happens if they've never had to make a breaking change yet?
- **Quick start example** — How many steps from "sign up" to "first successful request"? Count them.

> **Tip:** The fastest way to evaluate a competitor's API isn't reading their docs — it's trying to make one real request against it. Docs describe intent. A live response shows you the truth.

## Comparison Table

Pick 2–3 existing APIs that solve a problem close to yours — even loosely. Fill this in with real observations, not impressions.

| | Competitor A | Competitor B | Your API (planned) |
|---|---|---|---|
| Auth method | | | |
| Time to first request | | | |
| Error format | | | |
| Rate limit clarity | | | |
| Pricing model | | | |
| Biggest strength | | | |
| Biggest weakness | | | |

The last row matters most. A gap in someone else's API — one you can name specifically — is worth more to your design than any amount of brainstorming.

## What You're Looking For

- [ ] **One thing to copy** — a design decision that's clearly right and worth adopting as-is
- [ ] **One thing to avoid** — a friction point real developers likely complain about (check their GitHub issues or forums if public)
- [ ] **One gap** — something no competitor does well, that your problem statement suggests you should

If you can't find a gap, that's useful information too — it means your value has to come from execution quality (better docs, faster response times, simpler auth) rather than a unique capability. Not a dealbreaker for a personal project, just be honest about it.

## Personal Mode: Scope This Down

You don't need a spreadsheet of ten competitors. Two or three, examined properly, teach you more than ten skimmed superficially. This is a learning exercise as much as a research one — the goal is absorbing what good API design looks like in practice, not producing a competitive intelligence report.

## AI Prompt: Extract Design Lessons

Best used *after* you've looked at real docs yourself — AI can help you interpret what you found, but shouldn't be your only source, since it may describe APIs based on outdated or incomplete knowledge.

```
I looked at these APIs for inspiration: [list names]

Here's what I noticed about their auth, errors, and docs:
[paste your raw notes]

Help me:
1. Identify the single strongest pattern across these APIs I should adopt.
2. Identify a friction point that shows up in more than one of them — a shared weakness worth deliberately avoiding.
3. Suggest one place where doing the opposite of the "standard" pattern might actually serve my specific use case better.
```

## Before You Continue

- [ ] I've examined at least 2 real APIs' auth, errors, and docs firsthand
- [ ] I can name one specific thing I'm copying and why
- [ ] I can name one specific gap or weakness I'm deliberately avoiding

When all three are checked, move to **Feature Prioritization**.
