---
title: Welcome
slug: welcome
phase: Phase 0
mode: hackathon
projectType: ai tool
estimatedTime: 5-10 min
---

# Welcome

You're building an AI tool, in a hackathon, on the clock. That combination has a specific failure mode worth naming before you start: AI tools are uniquely easy to demo badly even when the underlying capability is genuinely impressive, because the gap between "the model can do this" and "the judge watched it do this smoothly, live" is wider here than in almost any other category of hackathon project.

This module sets the actual rules of the game before you touch a prompt or a line of code.

---

## The Core Idea: You're Not Just Building With AI, You're Performing AI Live

Most hackathon categories let you pre-build and just run through a rehearsed flow. An AI tool often has to actually call a model live, in front of judges, with real latency, real variance in output quality, and real risk of an unexpected response. Your entire build philosophy here should account for that risk from hour one, not discover it the night before submission.

> ** Warning**
> The single most common AI-tool hackathon failure isn't a bad idea — it's a live demo where the model takes 12 seconds to respond, or returns something subtly wrong, and the team has no plan for either. Both are foreseeable. Both are addressed later in this curriculum (Streaming UX and AI Failure States), but the planning starts now, with how you think about the project overall.

---

## What Makes This Different From a Regular Web App Hackathon

**Decision Card — AI Tool-Specific Considerations**

| Regular Hackathon Concern | AI Tool Adds |
|---|---|
| Does the feature work? | Does the feature work *reliably enough*, given model variance? |
| Is the UI polished? | Does the UI make waiting for a model response feel intentional, not broken? |
| Is the demo scripted? | What's the fallback if the live model output isn't as good as your rehearsal run? |
| Is the backend correct? | Is the prompt actually doing what you think it's doing — verified, not assumed? |

None of this means AI tools are harder to build well in a hackathon — they're often faster to get an impressive first result from than a traditional app. It means the *verification and risk-mitigation* work matters more here, and this curriculum weights it accordingly.

---

## How This Curriculum Will Guide You

Every module ahead is tuned for building an AI tool under hackathon time pressure specifically. **Model Selection** and **Prompt Engineering** get you a working core fast. **Streaming UX** and **AI Failure States** — easy to skip, expensive to skip — make sure your live demo survives contact with a real model call in front of judges. **Trust & Transparency** addresses something AI tools specifically need that other apps don't: showing the user (and the judge) enough about what the AI is doing that the output feels credible rather than magical-and-suspicious.

> ** Tip**
> If you only remember one thing from this module: build your fallback for "the AI gives a bad answer live" at the same time you build the happy path, not after. It's the single highest-leverage piece of risk mitigation specific to this category of hackathon project.

---

## Using AI to Build an AI Tool

Yes, this is recursive, and it matters. You'll likely use one AI tool (your coding assistant) to help build a *different* AI tool (your actual hackathon project, using a model API). Keep these mentally separate: the coding assistant's output (code) needs the same verification discipline as any hackathon code. Your *product's* AI integration needs an entirely separate layer of verification — does the prompt actually produce good, consistent outputs for your real use case, independent of whether the code calling it is well-written.

---

## What's Next

Move to **Problem Definition** — locking in the specific problem your AI tool solves, scoped realistically to what you can build and demo reliably in the time you have.
