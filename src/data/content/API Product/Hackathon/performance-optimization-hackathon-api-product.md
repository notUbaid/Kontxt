---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Performance Optimization

This isn't about scaling to thousands of users — your demo will see a handful of concurrent requests at most. It's about your API feeling responsive during the few minutes that actually matter, and not having an awkward, unexplained delay live on stage.

---

## Measure Before You Optimize Anything

> **Tip — Time your actual core loop request before guessing where the slowness is.**
> A simple `console.time()` around your handler, or watching response time in your testing tool, tells you the real number. Optimizing code you *assume* is slow, while ignoring the part that's actually slow, is wasted effort you don't have time to spare.

For most hackathon API products, the answer is almost always the same:

> **Decision Card — Where the time is actually going**
> If your core logic calls an external API (an LLM, a third-party service), that call is very likely 80%+ of your total response time. Optimizing your own routing or database code while that external call dominates latency is solving the wrong problem.

---

## If the External Call Is the Bottleneck, Manage Perception, Not Speed

You usually can't make a third-party API faster. You can make the wait feel intentional instead of broken:

> **Quick Reference — Two real options**
- **You already designed for this** — if your core loop has processing time, the `202` + polling pattern from Response Design exists exactly to handle this. Make sure your demo app actually shows a loading state during that wait, not a frozen, unexplained pause.
- **If you didn't design for async and the call is fast enough to wait on** — a visible loading indicator in your demo app turns a 2-3 second wait from "is this broken?" into "it's working."

A clearly-communicated wait reads as intentional engineering. A silent one reads as a bug, even if it's actually fine.

---

## Check for the One Real Code-Level Risk: N+1 Queries

This is the one performance issue worth checking in your own code, because it's both common and genuinely cheap to introduce by accident.

> **Warning — A list endpoint that loops and queries the database once per item is an N+1 query problem.**
> `GET /transcripts/:id/actions` returning 20 action items by making 20 separate database calls (one per item) instead of one query that fetches them all is slow in a way that gets worse as your demo data grows — and it's an easy mistake when AI generates a loop-based implementation without being asked to batch it.

Check any endpoint that returns a list or fetches related data — confirm it's one query, not a query-per-item.

---

## Serverless Cold Starts: Warm Up Before You Present

> **Warning — The very first request to a serverless function after inactivity is often noticeably slower than every request after it.**
> If you're deployed on Vercel, Cloudflare Workers, or similar, and you haven't called your API in the last several minutes, your demo's *first* request could have an awkward delay that every subsequent request won't have.

> **Tip — Send a real request to your deployed API a minute or two before you go on stage.**
> This "warms up" the function so your actual demo doesn't open with an unexplained pause on the very first call.

---

## What's Not Worth Your Time Right Now

These are real production concerns and real hackathon over-engineering:

- Database read replicas or connection pooling tuning beyond what's already correctly set up
- CDN configuration for API responses
- Micro-optimizing individual function execution time when the external API call dwarfs it
- Load testing for concurrent user counts your demo will never approach

---

## Find the Actual Bottleneck With AI

> **Copy Prompt — Performance Review**
> ```
> Here is my core loop implementation: [paste handler, logic, and data
> access code]
> Measured response time for the core loop: [your actual timed number]
>
> Identify the single highest-impact thing slowing this down, based on
> the code and the timing I gave you — not a list of micro-optimizations.
> Specifically check for N+1 query patterns in any list/related-data
> fetch. If the bottleneck is an external API call I can't speed up,
> say so directly instead of suggesting unrelated code optimizations.
> ```

> **Tip — Give it your actual measured time, not just the code.**
> Without a real number, AI can only guess at what's slow from reading code — with a number, it can reason about whether the time is plausibly your code or plausibly an external call, which changes what's actually worth fixing.

---

## Validate the Output

- If AI suggests several optimizations, prioritize only the one with the largest realistic impact — this module's philosophy is one high-leverage fix, not five small ones.
- If it identifies an N+1 query, verify it by checking the actual database call count, not just trusting the description.
- If it confirms the external API call is the dominant cost, stop looking for code-level fixes and focus on the perceived-wait handling instead.

---

## Lock Your Performance Pass

- [ ] Core loop response time measured with a real number, not assumed
- [ ] Confirmed whether the bottleneck is your code or an external call
- [ ] Any list/related-data endpoint checked for N+1 query patterns
- [ ] Loading state or async handling confirmed visible in the demo app if there's a real wait
- [ ] Serverless warm-up request planned before presenting, if applicable

---

## What's Next

**API Testing** — a final, deployed-environment test pass before you lock in your submission.
