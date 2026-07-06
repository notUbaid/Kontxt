---
title: Presentation Prep
slug: presentation-prep
phase: Phase 6
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Presentation Prep

Everything up to this point has been about the project working. This module is about someone outside the project understanding why it matters, in under two minutes — whether that's a launch post, a portfolio review, or a demo in front of other developers. Technical depth doesn't translate on its own; it needs a narrative wrapped around it, and that narrative has to be built deliberately, not improvised on the spot.

---

## The Decision: Who's the Actual Audience?

Presentation depth and framing change completely depending on who's on the other end. Identify this before writing anything.

| Audience | What They Actually Care About |
|---|---|
| Public launch (Show HN, Product Hunt, Twitter) | The problem, the hook, whether it's worth trying right now |
| Portfolio / technical interview | Engineering decisions, trade-offs you made and why, what you'd do differently |
| Live demo for other developers | Whether the API actually works, how fast they could integrate it |

> ** Best Practice:** Write one core narrative, then adjust emphasis per audience rather than writing three separate stories from scratch. The underlying facts don't change — what you lead with does.

---

## The Core Narrative Structure

```
Problem → Why existing options fall short → What you built →
One standout technical decision → Real usage/traction (if any) → What's next
```

This compresses months of work into a shape a stranger can follow. Most of it should be short — the value is in the sequence, not the length of any one part.

> ** Tip:** "What's next" is not filler — pointing to your public Roadmap here does double duty: it shows the project is alive, and it gives a technical audience a natural next thing to look at.

---

## Choose One Killer Detail

You built a lot: an OpenAPI-driven SDK, atomic usage metering, a full changelog and deprecation process, a beta program. Don't present all of it. Pick the single most compelling technical decision and lead with that — the one thing that, explained in 30 seconds, makes someone think "oh, that's actually well thought out."

For this project, strong candidates might be: the atomic usage-counting approach that avoids race conditions in billing, or the decision to generate the SDK from your OpenAPI spec instead of hand-maintaining it. Pick whichever one best demonstrates judgment, not just effort.

> **️ Warning:** Trying to explain everything you built is the most common way to lose an audience. A list of features reads as a changelog, not a story — pick one detail worth going deep on and mention the rest in a single sentence.

---

## Assets to Have Ready

- **A working live link** — not localhost, not "trust me it works." If your demo depends on a live API call, test it minutes before presenting, not the night before.
- **A short screen recording as backup** — live demos fail for reasons that have nothing to do with your code (wifi, rate limits, a dependency's outage). Have a 60–90 second recording ready so a failure doesn't end the presentation.
- **Real numbers, if you have them** — uptime percentage, real usage counts, response times. Specific numbers are more convincing than adjectives.
- **A clean visual** — one screenshot or diagram that reads clearly at a glance, for anywhere the presentation gets shared without you narrating it (a launch post, a portfolio page).

---

## AI Prompts

**Prompt: Draft the compressed narrative**

```text
Here's what I built: [paste a brief project summary — what the API does, key technical decisions, current usage/traction if any].

Write a compressed narrative following this structure:
1. Problem (1-2 sentences)
2. Why existing options fall short (1 sentence)
3. What you built (2-3 sentences)
4. One standout technical decision, explained simply (2-3 sentences)
5. Real traction, if any (1 sentence, use actual numbers, don't inflate)
6. What's next (1 sentence)

Total under 200 words. No buzzwords, no "revolutionary" or "game-changing" language — plain, confident, specific.
```

**Prompt: Identify your killer detail**

```text
Here are the technical decisions I made building this API: [list several — e.g. SDK generation approach, usage metering design, error handling, versioning strategy].

Which one is the strongest single thing to lead a presentation with, and why? Consider: which one best demonstrates real engineering judgment rather than just effort, and which one is easiest to explain clearly in under 30 seconds to someone unfamiliar with the project.
```

---

## Validation Checklist

- [ ] Core narrative fits the Problem → Solution → Standout Detail → Traction → Next structure
- [ ] One technical detail is chosen to lead with, not a list of everything built
- [ ] Live demo link tested within the last hour before presenting
- [ ] A backup screen recording exists in case the live demo fails
- [ ] Real numbers used where available, no inflated or vague claims

---

## Common Mistakes

> **️ Warning:** Leading with implementation details before establishing why anyone should care. "I used atomic Postgres upserts for usage tracking" means nothing until the audience knows what problem that solves and why it matters.

> **️ Warning:** No working live link ready. A presentation that can only show localhost or screenshots reads as unfinished, even if the actual API is solid — test the public URL specifically, not your dev environment.

> **️ Warning:** Presenting a demo flow that hasn't been run end-to-end recently. APIs depend on live infrastructure, rate limits, and sometimes third-party services — a flow that worked last week can silently break by presentation day.

---

## Practical Note

Never demo with real production data or a real customer's API key. Use a seeded demo account with realistic but fabricated data — this avoids exposing anything sensitive live, and it means the demo's data looks the same every time regardless of what's happened to real production data since.

---

## Implementation Checklist

- [ ] Primary audience for this presentation identified
- [ ] Core narrative drafted and trimmed to fit the structure above
- [ ] One standout technical detail chosen to lead with
- [ ] Live link and backup recording both ready and recently tested
- [ ] Demo uses a seeded account, not real production data

---

## What's Next

Next in Phase 6: **Pitch Deck** — turning this narrative into a visual deck for contexts that call for one.
