---
title: Demo Script
slug: demo-script
phase: Phase 6
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
filename: demo-script-personal-e-commerce.md
---

# Demo Script

A deck tells people what you built. A demo script is what makes them believe it actually works. This is the part where your project either feels real because they watched it run, or feels like a slideshow that might be vaporware.

This module is about writing the actual words and actions for that moment — not the slides, not the architecture, just what happens and what you say while it happens.

---

## How This Differs From What You've Already Built

If you completed Presentation Prep, you may already have a recorded walkthrough. A demo script is related but distinct:

- **Recorded walkthrough** — a finished, edited artifact you share asynchronously
- **Demo script** — the plan you follow when presenting **live**, in real time, possibly with questions interrupting it

You need this module specifically if you'll ever present live — to a mentor, a panel, a single interested person over a call. If you'll only ever share a recording, your Presentation Prep walkthrough already covers this; you can stop here.

---

## Decision 1: Live or Pre-Recorded Fallback

> **Warning:** Live demos fail at the worst possible moment — flaky wifi, a seed-data bug you've never hit before, a payment webhook that times out because Stripe test mode hiccups. This isn't pessimism, it's the single most common reason a strong project loses credibility in the room.

| Approach | Risk | Recommendation |
|---|---|---|
| Fully live, no backup | High | Only if you've rehearsed the exact flow 3+ times on the exact environment you'll use |
| Live with a recorded fallback ready | Low | Best default — switch to the recording the moment something breaks |
| Fully pre-recorded, narrated live | Lowest | Fine for high-stakes moments where reliability matters more than spontaneity |

> **Best Practice:** Have a 60-90 second recorded backup of your core flow ready on your machine, queued up, before any live demo. Treat it like a parachute — you hope not to need it, but the cost of having it is a few minutes of recording, and the cost of not having it is your demo collapsing in front of your audience.

---

## The Script Structure

A demo script is a two-column document: what you **do**, and what you **say** while doing it. Writing only one of these is the most common reason demos feel either silent and awkward, or narrated but visually static.

| Time | Action (what you click/show) | Talk track (what you say) |
|---|---|---|
| 0:00-0:10 | Land on homepage | One sentence: who this is for, what problem it solves |
| 0:10-0:30 | Browse to a product, add to cart | Narrate one real decision here — not "and here's the product page," but why it's built the way it is |
| 0:30-0:55 | Go through checkout | This is your strongest technical moment — say so explicitly: "this is where I handled [specific hard problem]" |
| 0:55-1:15 | Show order confirmation / admin view | Prove the order actually landed somewhere real, not just a frontend illusion |
| 1:15-1:35 | Show one growth mechanic (referral link, email trigger) | Connects the demo to business thinking, not just CRUD |
| 1:35-1:50 | Close | Restate the one thing you want them to remember |

> **Tip:** 90 seconds to 2 minutes is the right length for most live demo contexts. Longer than that and you're relying on the audience's patience instead of your content's strength.

---

## Writing the Talk Track

The biggest gap between a flat demo and a compelling one is whether you narrate **decisions** or just **actions**.

**Weak:** "So here's the product page, and if I click add to cart, it goes to the cart, and then I click checkout..."

**Strong:** "Here's the product page — notice the price updates instantly when you change variants, no page reload. I built that with optimistic UI updates so it feels instant even before the server confirms the change."

The weak version narrates what's already visible on screen — wasted breath. The strong version tells the audience something they couldn't see just by looking, which is the entire reason you're talking instead of sending a silent screen recording.

> **Common Mistake:** Clicking through the flow in total silence and only talking at the start and end. If you're not saying something the audience couldn't infer from the screen, you're wasting the live format's only advantage over a recording.

---

## Demo Environment Prep

This is unglamorous but determines whether your script survives contact with reality.

- [ ] Seed your store with realistic test data beforehand — real-looking product names and images, not "Test Product 1"
- [ ] Use a payment test mode (e.g. Stripe test cards) you've personally run through end-to-end at least twice
- [ ] Clear your browser of unrelated tabs, notifications, and dev tools before you start
- [ ] Know your fallback if a step fails: do you have a recorded clip ready, or do you skip ahead and explain verbally?
- [ ] Time yourself once, out loud, before the real thing — scripts always run longer than they look on paper

> **Warning:** Never demo against your real production payment flow with real cards in front of an audience. Test mode exists for exactly this. A failed real charge live is far worse than a smooth test-mode flow.

---

## Using AI Effectively Here

Use AI to convert your feature list and key decisions into a tight two-column script — not to invent a flow you haven't actually built and tested.

** Copy this prompt:**

```
I'm writing a 90-second live demo script for a solo e-commerce project.

The flow I'll actually demo, in order: [list the real screens/actions, e.g. "homepage → product page → add to cart → checkout → order confirmation → referral link"]

Technical decisions worth narrating at the right moment: [list 2-3, e.g. "optimistic UI updates on variant selection," "Stripe webhook idempotency on checkout," "referral fraud guardrails"]

My one-sentence problem statement: [your hook from Presentation Prep, if you have one]

Write a two-column script: timestamp + action in one column, talk track in the other. Keep total runtime under 2 minutes. For each action, only add a talk track line if it conveys something the audience can't already see on screen — don't narrate obvious UI actions.
```

This prompt works because it forces AI to work from your actual flow instead of guessing one — and explicitly tells it not to pad silent screen actions with narration, which is the single biggest quality gap in generic demo scripts.

---

## Validating the Output

- [ ] Does every talk-track line say something the screen doesn't already show?
- [ ] Is there at least one moment narrating a real technical decision, not just an action?
- [ ] Does the total runtime fit your actual time slot, timed out loud — not estimated on paper?
- [ ] Is there a fallback plan if any single step fails live?
- [ ] Does the script open with the problem, not "let me show you my app"?
- [ ] Does it close with one clear takeaway, not a trailing "...and that's basically it"?

> **Tip:** Rehearse this out loud at least twice before presenting it live, ideally once in front of another person. A script that reads fine silently often reveals awkward pacing the moment you actually speak it.

---

## Quick Reference: Common Failure Patterns

| Symptom | Likely Cause | Fix |
|---|---|---|
| Demo feels long and boring | Narrating obvious actions instead of decisions | Cut narration that just describes what's visible |
| Audience looks confused at the start | No problem statement before diving into the product | Add a one-sentence hook before any clicking |
| Demo breaks live, no recovery | No fallback prepared | Always have a 60-90s recorded backup ready |
| Demo runs over time | Never timed out loud beforehand | Rehearse with a timer, cut to fit |

---

## Before You Continue

- [ ] Decided live, live-with-fallback, or pre-recorded
- [ ] Two-column script written: actions and talk track, not just one or the other
- [ ] Every talk-track line earns its place by saying something the screen doesn't
- [ ] Demo environment seeded with realistic data, tested end-to-end at least twice
- [ ] Timed out loud at least once, fits the actual time slot
- [ ] Fallback recording ready if presenting live

**Next up in Growth:** Submission Checklist — the final pass before you actually send this project out into the world.
