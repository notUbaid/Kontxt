---
title: Pitch Deck
slug: pitch-deck
phase: Phase 6
mode: hackathon
projectType: api-product
estimatedTime: 15-20 min
---

# Pitch Deck

Your deck has one job: survive being skimmed. Judges see 10-30 projects in a row. They're not reading slides — they're glancing at them while you talk and listening for the one sentence that tells them whether to lean in or check their phone.

## The Decision You're Actually Making

Not "what slides do we need." It's: **if a judge only looked at this deck for 20 seconds with the sound off, would they understand what we built and why it matters?**

That's the actual bar. Design every slide against it.

## How Many Slides You Actually Need

For a 2-3 minute hackathon pitch, more slides than this is working against you:

| Slide | Purpose | Time on screen |
|---|---|---|
| 1. Title + one-line pitch | Sets context instantly | 5-10 sec |
| 2. The problem | Why this needs to exist | 20-30 sec |
| 3. The solution / live demo cue | What you built | 30-45 sec |
| 4. Technical highlight | The one decision worth explaining | 20-30 sec |
| 5. What's next | Shows ambition beyond the hackathon | 10-15 sec |

> **️ Warning:** Six or more content slides for a 3-minute pitch means you will either rush incomprehensibly or get cut off before your strongest point. Cut slides, not your speaking pace.

## API Products Need a Different Slide 3 Than Web Apps

A web app's "solution" slide is a screenshot. An API's solution slide has to show *integration* — because the product isn't something you stare at, it's something other software calls.

> ** Best Practice:** On your solution slide, show a before/after: a tiny snippet of the request a developer sends, next to the response they get back, next to one sentence on what that unlocks for them. This is more convincing than a feature list, because it shows the actual value exchange instead of describing it abstractly.

## Decision: What Goes on the Technical Highlight Slide

| Option | When to use it |
|---|---|
| Architecture diagram | If your system design is genuinely the interesting part |
| Rate limiting / auth strategy | If reliability or security was a real engineering challenge |
| A specific hard bug you solved | If it reveals genuine technical depth, not just effort |
| Schema/data model decision | If your API's value comes from how it models the domain |

> ** Tip:** Pick the one that's true, not the one that sounds most impressive. Judges who are engineers themselves can tell the difference between a real technical decision and a slide that's there to look technical.

## What to Leave Off Every Slide

- Full code snippets — nobody reads code on a projected slide from row 10
- Your entire tech stack as a logo wall — interesting to you, irrelevant to judges
- A roadmap longer than one sentence
- Walls of bullet points — three words per line, not three sentences

## Generate the Deck Outline with AI

**Prompt — Structure a 5-Slide Pitch Deck**
```
I built [one-sentence API description] for a hackathon. Help me draft 
a 5-slide pitch deck outline using this structure:
1. Title + one-line pitch
2. Problem (max 2 sentences)
3. Solution — show as request/response value exchange, not a feature list
4. One technical highlight: [describe the decision]
5. What's next (1 sentence)

For each slide, write the exact on-screen text (max 15 words per slide) 
and a one-sentence speaker note for what I say while it's shown.
```

> ** Token Efficiency:** Ask for on-screen text and speaker notes in the same response, in this structure, rather than two separate prompts — you need them together to actually rehearse, and generating them separately doubles your iteration cost for no benefit.

## Validate Before You Present

- [ ] Read only the on-screen text, nothing else — does it tell a coherent story alone?
- [ ] Confirm no slide requires you to read text directly off it (that's a speaker note, not a slide)
- [ ] Check slide 3 actually shows a request/response, not just a description of one
- [ ] Time a full run-through with the deck, not just the talking points

> **️ Warning:** A deck that only makes sense with your narration isn't a deck a judge can later recall from memory or notes — and many judging processes involve panel discussion after you've left the room, working from exactly what's on the slides.

## Common Mistakes

- Title slide buries the actual one-line pitch under a project name and team names
- Solution slide is a screenshot of code instead of a request/response value exchange
- Technical highlight slide picked for impressiveness over honesty
- More than 5 content slides for a sub-3-minute pitch
- Speaker notes and slide text are identical — redundant, wastes the slide

## Quick Reference

| Must-have | Nice-to-have | Skip entirely |
|---|---|---|
| 5-slide structure | Subtle brand color/theme | Full tech stack slide |
| Request/response value exchange | One architecture visual | Long-form roadmap |
| One honest technical highlight | Team slide (only if required) | Full code on slides |
| On-screen text readable in 5 sec | Live demo cue on slide 3 | Bullet-heavy paragraphs |

## What's Next

Deck and pitch structure are set. The next module writes the demo script — the exact sequence of actions and words for the live portion of your presentation, timed second by second.
