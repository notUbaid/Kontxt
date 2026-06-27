---
title: Presentation Prep
slug: presentation-prep
phase: Phase 6
mode: production
projectType: saas
estimatedTime: 20-25 min
---

# Presentation Prep

You've built a real product with real users, real retention data, and real engineering decisions behind it. Presentation Prep is about translating that into a narrative someone outside your head can follow in a few minutes — whether that's an investor, a customer, a teammate, or a hiring manager.

This is the module right before Pitch Deck, and the two are deliberately separate: this one is about figuring out *what story your data actually supports*. The next one is about packaging that story into slides.

---

## The Core Idea: A Presentation Is an Argument, Not a Status Report

A status report tells someone everything that happened. A presentation makes a specific claim and supports it with the minimum necessary evidence. Most weak presentations are status reports wearing a presentation's clothing — exhaustive, accurate, and completely unpersuasive because the audience can't find the actual point.

> ** Tip**
> Before building a single slide, write the conclusion you want someone to reach in one sentence. "Retention has flattened at a healthy 35%, proving product-market fit in our core segment" is a claim. "Here's our retention chart" is not — it's just data, waiting for someone else to draw a conclusion you should have drawn for them.

---

## Step 1: Identify Your Actual Audience and What They Need to Decide

Every presentation exists because someone needs to make a decision. Match your content to that decision, not to everything you know.

**Decision Card — Audience-Driven Content**

| Audience | Decision They're Making | What They Actually Need to See |
|---|---|---|
| Investor | Whether to fund you | Growth trajectory, retention/unit economics, market size, why now |
| Enterprise customer | Whether to buy/adopt | Security posture, reliability evidence, case studies, integration fit |
| Internal team | Whether to align on direction | The roadmap reasoning (see Feature Roadmap module), honest tradeoffs, what's being deprioritized and why |
| Hiring candidate | Whether to join | Real technical challenges, growth evidence, what they'd actually own |

The same data — your retention curve, your architecture, your roadmap — gets framed completely differently depending on which of these you're talking to. Don't reuse one deck across audiences without re-cutting it for the actual decision in front of that specific audience.

---

## Step 2: Build the Narrative Arc Before the Slides

A presentation that works usually follows a recognizable shape: a real problem, why it matters now, what you built, evidence it works, and what's next. Skipping straight to "here's our product" without establishing why anyone should care is the most common structural failure.

**Best Practice Card — A Defensible Narrative Skeleton**

```
1. Problem: What's actually broken for the user, stated concretely
   (not "the market is huge" — that's a market claim, not a problem)
2. Why now: What's changed that makes this solvable/timely today
3. Solution: What you built, briefly — this is the shortest section,
   not the longest
4. Evidence: Real data proving it works — retention, usage, feedback
   themes, anything from earlier modules that's actually true
5. What's next: The roadmap, framed as the next logical step, not
   a wishlist
```

> **️ Warning**
> Don't open with your solution. Audiences who don't yet believe the problem is real won't be persuaded by how elegant your solution is — they'll just wonder why you're solving something they don't think matters. Earn the problem first.

---

## Step 3: Use Real Evidence, Stated Honestly

Every claim in your presentation should trace back to something you can actually defend if asked a follow-up question. This is where the discipline from earlier modules pays off directly — if you've been honest about confidence levels in your Feature Roadmap, and honest about retention curve shape in Product Analytics, you already have a presentation's worth of credible material instead of a list of optimistic guesses.

- [ ] Every metric cited has a clear definition behind it (e.g., "activation" means a specific, statable event — see Analytics Setup)
- [ ] Any comparison to "industry benchmarks" is sourced, not assumed
- [ ] Known weaknesses or open questions are acknowledged rather than hidden — a sharp question that exposes an unaddressed weakness damages credibility far more than proactively naming it does
- [ ] Projections are clearly labeled as projections, distinct from historical fact

> ** Note**
> The fastest way to lose a room's trust is one inflated number that someone in the audience happens to know is wrong. Precision and honesty about what you don't yet know is a stronger credibility signal than an impressively confident but unverifiable claim.

---

## Using AI to Sharpen the Narrative

AI is useful for stress-testing your argument structure and for surfacing the hard questions you should pre-empt — it cannot supply real metrics it doesn't have, and it cannot tell you whether your story is true. That verification is yours alone.

**Prompt: Narrative Stress Test**

```
I'm preparing a presentation for [audience type] about [your product].
Here's the narrative I'm planning:

Problem: [your stated problem]
Why now: [your stated timing argument]
Solution: [brief description]
Evidence: [your actual metrics/data]
What's next: [your roadmap framing]

1. Identify the weakest link in this argument — the place a skeptical
   member of this specific audience would push back hardest.
2. Suggest 3 likely follow-up questions for this audience, given
   their typical priorities.
3. Do not soften or rewrite my claims to sound better. Just identify
   where they're vulnerable.
```

> ** Why this prompt works**
> Explicitly forbidding the model from polishing your claims keeps it in a red-team role instead of a cheerleading one — the same principle as constraining AI code review to flag real issues rather than validate whatever you wrote. Tailoring the follow-up questions to a specific audience type produces more useful prep than generic "questions investors ask" lists, because an enterprise buyer and an investor will attack completely different parts of the same story.

**Token efficiency note:** Run this stress-test once your narrative skeleton is roughly complete, not on every individual slide as you draft it. A full-arc review catches structural weaknesses (missing evidence, weak "why now") that slide-by-slide editing won't surface, since those gaps only become visible when you see the whole argument together.

---

## Validating the Final Narrative

- [ ] You can state your core claim in one sentence, and every section supports it
- [ ] You've identified your weakest evidence point and have an honest answer ready, not a deflection
- [ ] The narrative is tailored to this specific audience's decision, not a generic "about us" overview
- [ ] Every number you'll say out loud, you could also defend if challenged on its definition or source

---

## What's Next

With a defensible, audience-specific narrative in hand, move to **Pitch Deck** — where this story gets translated into the actual visual format you'll present.
