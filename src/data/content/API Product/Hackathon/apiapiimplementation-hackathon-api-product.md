---
title: API Implementation
slug: api-implementation
phase: Phase 3
mode: hackathon
projectType: api-product
estimatedTime: 15-20 min
---

# API Implementation

Everything before this phase was decisions on paper. This is where code starts existing. The biggest risk now isn't writing bad code — AI tools are good at syntax. It's losing the design discipline from Phases 1 and 2 by prompting in a way that drifts from what you actually locked.

---

## Build in This Order, Not All At Once

> **Quick Reference — Implementation sequence**
> 1. **Scaffold** the project using your Tech Stack Selection setup commands
> 2. **Core logic** — the actual transformation that proves your purpose statement, built and tested in isolation
> 3. **Wire routes** to that logic (the Routing module already designed the wiring pattern)
> 4. **Connect the database** (next module) — only once core logic works against fake/in-memory data

> **Warning — Asking AI to "build the whole API" in one prompt produces code you can't debug.**
> A single giant prompt generates routes, logic, and database calls all tangled together, often inconsistent with your locked schemas in small ways you won't notice until something breaks. Build in the four stages above, testing after each one, even though it feels slower upfront.

---

## Start With Core Logic, Not Routes

The part of your API that's actually valuable is the transformation — not the routing, not the database calls. Build and test that first, with fake input, before it's wired to anything.

> **Tip — Test your core logic as a plain function before it's an endpoint.**
> If your purpose statement is "turns a transcript into action items," write and verify `extractActionItems(rawText)` as an isolated function first. If it works correctly in isolation, wiring it to a route is mechanical. If you build the route first and the logic is wrong, you're debugging two problems at once.

---

## Prompt in Small, Testable Increments

> **Copy Prompt — Scaffold the Project**
> ```
> My stack: [from Tech Stack Selection]
> My locked route table: [paste]
>
> Scaffold a new project: folder structure, dependencies, and a working
> "hello world" route that I can run and curl immediately. Don't implement
> business logic yet — just confirm the server runs and responds.
> ```

> **Copy Prompt — Core Logic**
> ```
> My purpose statement: "[paste]"
> Core transformation needed: [describe the input → output transformation]
> Input shape: [paste relevant request field]
> Output shape: [paste relevant response field]
>
> Implement this as a standalone function, not wired to any route or
> database yet. Include 2-3 example inputs and expected outputs I can
> use to manually verify it works.
> ```

> **Tip — Two focused prompts beat one large one, and cost roughly the same in tokens.**
> Splitting scaffold from logic means you can verify each piece works before building on it. If something breaks, you know which prompt's output caused it — with one giant prompt, you're debugging everything at once.

---

## Don't Re-Explain Your Whole Project Every Time

> **Tip — Reuse outputs, don't restate context.**
> Once your scaffold works, paste the actual generated file back into your next prompt rather than re-describing the project from scratch. AI editing existing code with full context produces more consistent results than regenerating from a fresh description each time — and costs fewer tokens than re-explaining your stack, schema, and purpose statement in every message.

If a single conversation starts handling unrelated concerns (e.g. you're now debugging deployment in the same thread you scaffolded the project in), start a new conversation. Long, sprawling threads make it harder for AI to track what's actually current versus what you've since changed.

---

## Validate AI-Generated Code Like an Engineer, Not a User

This is the highest-risk moment for blind trust. Specific things to check every time:

- **Does it use packages that actually exist?** AI occasionally references plausible-sounding but nonexistent library functions, especially for less common libraries. Run it before trusting it.
- **Does it match your locked schemas exactly?** Field names drifting (`rawText` becoming `transcript_text` halfway through) is a common, subtle failure that breaks integration between pieces built in separate prompts.
- **Is error handling present, or just the happy path?** AI defaults to demonstrating that something *can* work, not that it handles failure — you'll add explicit error handling in a later module, but don't accept code that would crash on the first bad input.

> **Warning — "It compiled" is not the same as "it's correct."**
> Code that runs without errors can still silently produce wrong results — a transformation function that "works" but returns malformed data is worse than one that visibly fails, because it fails quietly during your actual demo instead of during testing.

---

## Lock Your Implementation Foundation

- [ ] Project scaffolded and runs locally, confirmed with a real request
- [ ] Core logic implemented and manually verified against example inputs/outputs
- [ ] Field names match your locked schemas exactly, with no silent drift
- [ ] Code reviewed for nonexistent packages or hallucinated APIs before moving on

---

## What's Next

**Database Setup** — connect your verified core logic to the schema you designed in Phase 2, replacing fake data with real persistence.
