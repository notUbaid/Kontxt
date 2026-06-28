---
title: Demo Script
slug: demo-script
phase: Phase 5
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# Demo Script

Your deck sets up the problem. This is the literal, rehearsed plan for the live minutes that follow — what you say, what you click, what input you use, and crucially, what you do if something doesn't go exactly as rehearsed. For an AI tool, this script carries more weight than for most hackathon categories, because you're running a real model call live, with real variance, in front of the people deciding your score.

---

## The Core Idea: A Demo Script Is a Plan for the Whole Range of Outcomes, Not Just the Best One

A script that only accounts for "everything works perfectly" is a script for the demo you wish you were giving, not the one you're actually giving. Given real model variance and live conditions, plan explicitly for your best-case run, a slightly-off run, and a genuine failure — because any of these is plausible, and only one of them benefits from rehearsal you haven't done.

> ** Warning**
> The single biggest demo script mistake for an AI tool: rehearsing only the happy path, dozens of times, until it's smooth — while never once rehearsing what you'll say or do if the live run produces a mediocre or failed result. Confidence in delivering the happy path doesn't transfer to handling the moment it doesn't happen, and that moment is genuinely likely to occur at least once across all your live attempts (rehearsals plus the real one).

---

## Step 1: Write the Literal Script, Word by Word, for the Happy Path

This builds directly on your Conversation Design module's scripted turns — now extended to include what *you* say aloud while the app does its thing, not just what the interface displays.

**Best Practice Card — Script Structure**

```
[You say]: "I'm going to show you [specific input type] — this is
           [briefly, why this represents a real use case, tying
           back to Target Users]"
[You do]: Provide the input, click submit
[You say, during the wait]: A brief, natural line that fills the
           silence without being filler — e.g., "It's pulling out
           the key points now" — this also doubles as a moment that
           reinforces your Trust & Transparency design, narrating
           what's happening rather than standing in silence
[Result appears]
[You say]: Point at the specific thing that matters — the wow
           moment — don't just gesture vaguely at the whole screen
```

> ** Tip**
> Plan a specific, brief line to say during the wait, timed to roughly match your actual measured latency from AI Integration. This turns dead air (which feels long and awkward live) into something that feels deliberate, and reinforces that you understand and control what's happening — rather than just hoping it finishes soon.

---

## Step 2: Script the "Slightly Off" Response, Not Just Pass/Fail

Between a perfect result and a hard failure, there's a real, common middle case: the model returns something technically valid but slightly underwhelming or imperfect. Have a planned, honest line ready for this, rather than being caught flat-footed by a result that's fine but not your best rehearsed outcome.

> ** Note**
> A confident, honest line like "this is a good example of why we built in a retry/review step" or "you can see it's not always perfect — that's why we focused on graceful handling rather than assuming perfect output every time" can turn a mediocre live result into a moment that actually showcases your engineering maturity, rather than a moment you have to awkwardly wave past. This connects directly to the AI Failure States module's reframing — a visible, handled imperfection can read as a strength, not just an absence of failure.

---

## Step 3: Script the Genuine Failure Response

If your AI Failure States rehearsal already confirmed your error UI works cleanly, your demo script just needs a calm, prepared verbal response to pair with it — something brief that keeps momentum rather than visibly derailing.

**Decision Card — Failure Response Options**

| If This Happens | Say/Do This |
|---|---|
| A clean, designed error state appears | "And here's what happens if something goes wrong — we built this to fail gracefully rather than crash" — turn it into a deliberate feature showcase |
| You hit a rate limit or timeout specifically | Have a backup input/cached result ready to switch to immediately, with a brief acknowledgment: "Let me try that again" or switch to your prepared fallback |
| Something genuinely breaks with no graceful state (worst case) | Stay calm, briefly acknowledge it, move to your backup plan (pre-recorded clip, cached screenshot sequence, or a second rehearsed input) rather than spending visible time trying to debug live |

---

## Using AI to Pressure-Test Your Script's Timing and Flow

AI is useful here for a final read-through — checking pacing, identifying where your script might run long, and confirming your fallback responses are actually concise enough to deliver smoothly under live pressure.

**Prompt: Script Pacing and Fallback Review**

```
Here's my demo script: [paste your full script, including happy
path, slightly-off response, and failure response]

My total demo time slot: [X minutes]

1. Estimate realistic timing for each section, accounting for the
   fact that live delivery is usually slower than reading it silently.
2. Flag if the happy path alone risks eating most of my time slot,
   leaving too little room if I need to use a fallback response.
3. Check that my failure and slightly-off responses are genuinely
   short enough to say smoothly under pressure — not just acceptable
   when read calmly.
```

> ** Why this prompt works**
> Asking for realistic live-delivery timing (not silent-reading timing) catches a common rehearsal mistake — practicing a script by reading it makes it feel shorter than actually speaking it live, under adrenaline, often with pauses. Checking fallback response brevity specifically matters because a fallback line that's too long defeats its own purpose — the whole point is to recover quickly, not deliver a second mini-speech while flustered.

**Token efficiency note:** Run this review once your script is fully drafted, as a final pacing check — not as a way to generate the script's content from scratch. The content itself should come from your own rehearsed understanding of the product; this prompt is specifically about timing and delivery risk.

---

## Validating the Script Before Your Slot

- [ ] You've rehearsed the happy path enough times that the words feel natural, not memorized-sounding
- [ ] You've also rehearsed the slightly-off and failure responses out loud at least once each — not just written them down
- [ ] Total timing, accounting for live delivery pace, fits comfortably within your actual time slot with margin for a fallback if needed
- [ ] You have a concrete fallback (cached result, backup input, or pre-recorded clip) ready to switch to instantly if a genuine failure occurs

---

## What's Next

Move to **Submission Checklist** — the final pass confirming everything required for actual submission is in place, separate from the demo performance itself.
