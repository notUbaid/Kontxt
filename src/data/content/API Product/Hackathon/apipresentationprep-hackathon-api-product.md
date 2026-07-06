---
title: Presentation Prep
slug: presentation-prep
phase: Phase 6
mode: hackathon
projectType: api-product
estimatedTime: 15-20 min
---

# Presentation Prep

You're about to do something counterintuitive: present an API to people who can't see code, can't run a CLI, and have about three minutes to decide if your project is interesting. Judges don't evaluate your codebase. They evaluate what you put in front of them in that window.

## The Decision You're Actually Making

Not "what should we say." It's: **what's the one thing this API does that a non-technical judge will remember five projects later?**

APIs are the hardest hackathon category to present, because the product is invisible by default — it's not a UI someone can click around. Your job in this module is to make the invisible visible.

## The Core Problem with Presenting an API

| What judges see in a web app demo | What you have to manufacture for an API demo |
|---|---|
| A button, a click, a visible result | Nothing, unless you build it |
| Visual proof something happened | A request/response that means nothing on a screen by itself |
| Immediate "I get it" | Requires translation into a visible outcome |

> **️ Warning:** Never present raw JSON as your demo's centerpiece. Even a technical judge needs three seconds to parse it, and you don't have three seconds to spare in a pitch. JSON is for the docs page, not the stage.

## Decision: How Do You Make an API Visible?

| Approach | Effort | Impact |
|---|---|---|
| Build a minimal demo UI that calls your API live | Medium | High — judges see cause and effect instantly |
| Use Postman/curl in terminal, narrated | Low | Medium — works for technical judges, weaker for mixed panels |
| Pre-recorded screen capture of real calls | Low | Medium — safe fallback, less impressive live |
| Architecture diagram only, no live call | Very low | Low — feels like you're hiding something |

> ** Best Practice:** If you have any time left, build the smallest possible frontend — even a single page with one button and one result box — that calls your real API. A visible before/after (click → real data appears) does more for judge comprehension than any amount of explanation.

## What to Show, In Order

1. **The problem** — 15 seconds, plain language, no jargon
2. **One live call** — show the request being made, then the response landing
3. **Why it's hard** — the one technical decision you're proud of (rate limiting, schema design, auth strategy — pick exactly one)
4. **What's next** — one sentence on what you'd build with more time

> ** Tip:** Pick exactly one technical decision to highlight. Trying to explain your auth strategy *and* your database schema *and* your rate limiting in a three-minute pitch means judges retain none of them. One well-explained decision beats four rushed ones.

## Use AI to Pressure-Test Your Pitch

**Prompt — Judge Simulation**
```
I'm presenting an API product at a hackathon to a mixed panel of 
technical and non-technical judges. Here's my pitch outline:

[paste your outline]

Act as a skeptical judge. Ask the 3 hardest questions you'd actually 
ask after this pitch. Then tell me, in one sentence each, what's 
unclear to someone who has never seen this project before.
```

> ** Token Efficiency:** Run this prompt once your outline is close to final, not on a rough draft — iterating on a fully-formed pitch gets you sharper, more specific pushback than asking AI to react to fragments.

## Validate Before You Present

- [ ] Time yourself — most hackathon slots are 2-3 minutes, not 5
- [ ] Practice the live call at least 3 times on the actual deployed API, not localhost
- [ ] Confirm your demo doesn't depend on a third-party API that could rate-limit or go down mid-pitch
- [ ] Have a non-technical friend watch once — if they're lost, judges who aren't engineers will be too

> **️ Warning:** Never demo against `localhost` or a tunnel like ngrok in front of judges. If your laptop sleeps, your wifi drops, or the tunnel expires mid-sentence, the whole pitch stalls. Demo against your real deployed URL, and have the recorded backup from your deployment checklist ready regardless.

## Common Mistakes

- Opening with tech stack instead of the problem
- Showing raw JSON as the emotional climax of the demo
- Explaining every endpoint instead of one meaningful use case
- No live call at all — purely slides, which reads as "it might not actually work"
- Running over time and getting cut off before the strongest point

## Quick Reference

| Must-have | Nice-to-have | Skip entirely |
|---|---|---|
| One live, working API call | Minimal demo UI | Full architecture walkthrough |
| Plain-language problem statement | One judge-simulation rehearsal | Every endpoint explained |
| One highlighted technical decision | Recorded backup demo | Roadmap beyond "what's next" |
| Rehearsed timing under the limit | Non-technical practice audience | Live coding during the pitch |

## What's Next

With your pitch structure set, the next module builds the actual deck — what goes on each slide, how many slides you need, and which visuals make an invisible API product feel concrete to a room full of judges.
