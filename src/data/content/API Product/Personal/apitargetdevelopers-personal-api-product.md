---
title: Target Developers
slug: target-developers
phase: Phase 0
mode: personal
projectType: api-product
estimatedTime: 10 min
---

# Target Developers

Every API design decision you're about to make — auth complexity, error verbosity, docs depth, whether you need an SDK — has a correct answer that depends entirely on one thing: who's calling your API. Skip this step and you'll end up guessing at each of those decisions individually, later, with no way to check your guess.

## Why This Isn't Optional

An API for junior devs building their first side project and an API for senior engineers integrating into a production pipeline are, functionally, different products — even if the endpoints are identical.

| Decision | Junior / hobbyist caller | Experienced / production caller |
|---|---|---|
| Auth | API key in a header, simple | May expect OAuth, scoped tokens |
| Errors | Verbose, human-readable messages | Structured error codes they can branch on |
| Docs | Copy-paste examples, quick start | Full reference, edge cases, rate limit specifics |
| Rate limits | Generous, hard to hit by accident | Clearly documented, they'll design around them |
| SDK | Genuinely helpful — reduces their setup time | Often skipped — they'll just call the REST API |
| Response shape | Forgiving, flat, easy to read | Precise, versioned, won't silently change |

Design for the wrong caller and you either overwhelm someone who wanted a five-minute integration, or annoy someone who wanted a serious tool and got a toy.

## Picking Your Primary Caller

You can't design equally well for everyone. Pick one primary profile — you can still be usable by others, but every close call gets decided in this profile's favor.

- [ ] **Skill level:** beginner / intermediate / experienced
- [ ] **Context:** hobby project, learning exercise, or something they intend to ship
- [ ] **Time pressure:** exploring casually, or need this working today
- [ ] **Tolerance for reading docs:** will they read a full reference, or do they need it to work from one example?

> **Tip:** If you're building this partly for yourself — a common and completely valid reason for a personal project — put "past-you, six months from now, having forgotten all context" in as your primary caller. That version of you will thank present-you for good error messages.

## Personal Mode: Keep This Realistic

You likely have zero real users yet, and that's fine. Don't fake a persona with invented demographics — just answer honestly:

- Who do you picture actually using this? A specific type of person is enough; you don't need a name or a stock photo.
- If nobody ever calls this except you, is it still worth the design effort? (Usually yes — you're learning API design, not just serving traffic. But be honest about which goal you're optimizing for.)

## AI Prompt: Pressure-Test the Profile

```
I'm designing an API. Here's who I think will primarily call it:

Skill level: [X]
Context: [X]
Time pressure: [X]

Given this profile:
1. What's the biggest mismatch risk — where might my instincts (as the API builder) differ from what this caller actually needs?
2. Should this caller get a generous rate limit or a strict one, and why?
3. Do they need an SDK, or is a well-documented REST API enough?

Answer based on the profile I gave you, not a generic "best practices" answer.
```

## Before You Continue

- [ ] I've picked one primary caller profile, not "everyone"
- [ ] I know whether they'll tolerate reading full documentation or need copy-paste simplicity
- [ ] I can explain how this profile will change at least one design decision later in this project

When all three are checked, move to **API Use Cases**.
