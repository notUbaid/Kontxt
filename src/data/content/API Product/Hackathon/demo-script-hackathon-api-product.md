---
title: Demo Script
slug: demo-script
phase: Phase 6
mode: hackathon
projectType: api-product
estimatedTime: 15-20 min
---

# Demo Script

The live demo is the riskiest 45 seconds of your entire pitch — and the most convincing, if it works. A script isn't about sounding rehearsed. It's about removing every decision you'd otherwise have to make live, under pressure, in front of judges.

## The Decision You're Actually Making

Not "what do we say during the demo." It's: **what is the exact, single sequence of actions that proves this API works, with zero room for something to go visibly wrong?**

Every unscripted moment in a live demo is a moment where you might fumble, forget, or hit an edge case you didn't test. The script's job is to eliminate those moments before they happen.

## Script Format That Actually Works

Write it as two columns — action and words — not prose. You should be able to glance at it mid-pitch without losing your place.

| Action | Say |
|---|---|
| Open terminal, cursor already in position | "Let me show you this live." |
| Run the prepared curl command | "This is a real request to our deployed API." |
| Pause while response prints | *(silence — let it land)* |
| Point at the response | "This came back in under 200ms, fully validated." |
| Switch to demo UI (if built) | "Here's what that looks like for an actual user." |

> ** Best Practice:** Build in one deliberate pause after the response appears. Silence while judges read the result is more persuasive than narrating over it — let the working API speak for itself for two seconds before you continue.

## What to Pre-Stage Before You Ever Stand Up

- [ ] Terminal already open, already authenticated, font size increased for projector visibility
- [ ] The exact command typed and ready — never type live, paste or use shell history
- [ ] Browser tab on your deployed API's health check, already loaded
- [ ] Demo UI (if you built one) already loaded with a clean starting state
- [ ] Notifications, Slack, email — everything that could pop up on screen — closed or silenced

> **️ Warning:** Typing a curl command live, character by character, is the single most common way hackathon API demos lose time and composure. A typo under pressure costs you 20 seconds you don't have. Have it ready to paste, every time.

## Pick One Path Through Your API, Not a Tour

Resist the urge to show multiple endpoints. One coherent user story — create something, then immediately show its effect — is more convincing than five disconnected calls.

> ** Tip:** A "create → read it back" pair is the strongest two-call demo: it proves both that your API accepts input correctly and that it persists and returns it correctly. That's a complete proof of a working system in two requests.

## Decision: Live Call vs Pre-Recorded Backup

| Approach | Risk | When to use |
|---|---|---|
| Fully live call during pitch | Network/server failure mid-pitch | Default — most convincing if it works |
| Pre-recorded video as primary | Looks less impressive, feels safer | Only if you've had repeated wifi failures in rehearsal |
| Live attempt, recorded backup ready | Best of both | Recommended — try live, fall back instantly if needed |

> **️ Warning:** Decide your fallback trigger *before* you're on stage — for example, "if no response in 5 seconds, switch to backup video" — not in the moment. Deciding under pressure wastes exactly the time you don't have.

## Use AI to Tighten the Script

**Prompt — Script Timing Review**
```
Here's my demo script for a hackathon API pitch, with timing estimates:

[paste your action/words script]

Total time budget: [X] seconds. Flag:
1. Any step that could realistically take longer than estimated
2. Any unscripted moment where I'd need to improvise
3. Redundant narration that repeats what the audience can already see
```

> ** Token Efficiency:** Include your timing estimates directly in the script you paste — asking AI to flag realistic overruns only works if it has your actual time budget to check against.

## Validate Before You Present

- [ ] Rehearse the full script at least 5 times, against the real deployed API, not localhost
- [ ] Time every run — confirm it consistently fits inside your slot with margin
- [ ] Deliberately disconnect your wifi once during rehearsal and execute the fallback
- [ ] Have someone else read your script aloud while you watch — does the pacing feel natural or robotic?

## Common Mistakes

- Demo depends on typing a command live instead of having it pre-staged
- No rehearsed fallback if the live call fails
- Showing too many endpoints instead of one complete story
- Narrating over the response instead of pausing to let it land
- Script never tested against the actual deployed URL, only localhost

## Quick Reference

| Must-have | Nice-to-have | Skip entirely |
|---|---|---|
| Pre-staged terminal/command | Demo UI walkthrough | Live typing of commands |
| One create→read story | Rehearsed fallback trigger | Multiple unrelated endpoints |
| Deliberate pause after response | 5+ full rehearsals | Improvised narration |
| Tested against deployed URL | Backup recorded video | Untested wifi-dependent calls |

## What's Next

Deck, pitch, and demo are rehearsed. The final module is the submission checklist — everything that needs to be true about your repo, deployment, and materials before you hand the project to the judges.
