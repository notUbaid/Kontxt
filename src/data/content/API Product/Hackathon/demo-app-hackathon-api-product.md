---
title: Demo App
slug: demo-app
phase: Phase 2
mode: hackathon
projectType: api-product
estimatedTime: 12-18 min
---

# Demo App

You've heard this warning twice already, and it's worth a third time because it's the single most common reason strong API products score poorly: **an API with no visible demo is invisible to judges.** This module builds the thin client that fixes that — not a product, just enough surface to show your API working.

---

## What a Demo App Actually Is

It is not your second product. It's a single page, or a single script, whose only job is to call your real endpoints and show the real result clearly. The bar is "makes the transformation visible," not "looks like a funded startup's frontend."

> **Decision Card — Pick the format that proves your purpose statement fastest**
> - **HTML + vanilla JS page** → best default for most API products: visual, no build tooling, deployable as a single static file
> - **Postman/Insomnia collection** → fastest to set up, but less visually compelling for a live audience watching a screen
> - **CLI script with formatted output** → fits if your target developer (Phase 0) is explicitly backend/CLI-oriented
> - **Minimal frontend framework** → only if you have real time to spare and a UI-heavy story to tell

For most teams, a single HTML file with `fetch()` calls is the sweet spot: visual enough for a room of judges, fast enough to build in well under an hour.

---

## What It Must Show

> **Quick Reference — The three things your demo app needs**
> 1. A way to trigger the core loop (a form, a button, a pre-filled example)
> 2. The actual request being sent — not hidden, ideally visible or at least describable
> 3. The actual response, formatted as the result a human would care about — not a raw JSON dump

The third point is where most teams undersell their own work. If your purpose statement is "turns a transcript into action items," your demo app should render a clean list of action items — not a `<pre>{JSON.stringify(response)}</pre>` block. The formatting *is* the proof that your transformation actually has value.

---

## The One Rule That Can't Be Broken

> **Warning — The demo app must call your real, live API. No hardcoded or mocked responses, ever.**
> This sounds obvious, but under time pressure it's tempting to hardcode a "known good" response to guarantee a clean demo. Don't. If a judge asks you to try a different input live — which happens constantly — a faked demo collapses instantly and costs you more credibility than a rough-but-real one ever would.

---

## Don't Over-Invest Here

> **Warning — The demo app is a supporting artifact, not the deliverable.**
> Time spent perfecting demo app CSS is time not spent making your actual API correct. Budget this as a fixed, capped block of time — once it clearly shows your core loop working, stop. A clean, simple demo app beats a beautiful one that ate the time you needed for error handling.

---

## Connect It to What You Already Built

This module has almost no new decisions — it's assembly of locked work:

- **Endpoints called** → your locked route table (Phase 1)
- **Request shape sent** → your locked request schemas (Phase 1)
- **Response rendered** → your locked response schemas (Phase 1)
- **CORS requirement** → already flagged in Routing — if you decided you need it, this is where it gets tested for real

> **Tip — If your demo app fails with a CORS error, that's the Routing module's CORS decision coming due, not a new problem.**
> Go back and confirm CORS middleware is actually applied to the routes your demo app calls — this is the most common reason a working API and a working demo app fail to talk to each other.

---

## Build It With AI

> **Copy Prompt — Demo App Generation**
> ```
> My purpose statement: "[paste]"
> My locked route table: [paste core loop routes]
> My locked request/response schemas: [paste]
> Demo format: single HTML file with vanilla JS fetch calls
> API base URL: [your local or deployed URL]
>
> Build a single-page demo app that:
> - has a simple form or input matching my core loop's request shape
> - calls my real API endpoint(s) on submit, no mocked data
> - renders the response in a clear, human-readable way that shows
>   the transformation my purpose statement promises — not raw JSON
> - shows a clear error message if the API call fails, instead of
>   breaking silently
> ```

> **Tip — Give it your real base URL, even if it's still `localhost` for now.**
> A demo app built against a placeholder URL is one more thing to fix right before you go on stage. Wire it to your actual local dev server now; swap to the deployed URL once Phase 4 deployment is done.

---

## Validate the Output

- Open it and actually click through your core loop — confirm it hits your real running API, not a hardcoded fixture.
- Try an invalid or edge-case input and confirm it shows a readable error instead of a blank screen or a console-only failure.
- Check the response rendering actually reflects your purpose statement — if it's just dumping JSON, ask for a second pass that formats it meaningfully.

---

## Lock Your Demo App

- [ ] Calls real, live endpoints — confirmed by testing, not assumed
- [ ] Triggers the full core loop, not just one isolated call
- [ ] Renders the result in a way that visibly proves your purpose statement
- [ ] Handles a failed request without breaking the page
- [ ] Time-boxed — stopped once it clearly works, not polished further

---

## What's Next

Phase 2 — System Architecture is complete. Your stack, schema, routing, and demo app are all decided and scaffolded.

**API Implementation** (Phase 3) — start building the real endpoint logic behind your locked design.
