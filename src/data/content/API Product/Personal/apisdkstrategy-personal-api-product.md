---
title: SDK Strategy
slug: sdk-strategy
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 10 min
---

# SDK Strategy

An SDK is a wrapper library that lets callers use your API without writing raw HTTP requests. It's also one of the easiest places to sink real time into something your MVP doesn't need yet. This module is short on purpose — its main job is helping you decide, correctly, whether to build one at all right now.

## The Real Question: Does Your Target Developer Need It?

Go back to **Target Developers**. An SDK's value is entirely dependent on who's calling your API.

| Your caller | SDK value |
|---|---|
| Experienced developer, comfortable with raw HTTP/`fetch`/`curl` | Low — a good quick start example is often enough |
| Beginner, building their first integration | Higher — a wrapper removes real friction (auth headers, error parsing) |
| You, integrating your own API into your own frontend | Situational — sometimes a thin internal client is worth it just for your own convenience |
| Hypothetical future callers you haven't validated yet | Not yet — build this when real usage tells you it's needed |

> **Tip:** If you're unsure whether your callers need an SDK, they probably don't yet. Ship clean docs and solid example requests (Phase 5) first. If people keep asking "is there a JS package for this," that's your real signal — not a guess made in Phase 1.

## What an SDK Actually Needs to Do Well

If you do decide to build one — even a minimal one — it only earns its place if it does these better than a caller could do themselves in five minutes with `fetch`:

- [ ] Handles auth header construction automatically
- [ ] Parses your consistent error shape into a real, catchable error type
- [ ] Provides types (if your language supports it) matching your Request/Response Design exactly
- [ ] Handles retries for transient failures (like `429` with `Retry-After`) if that's genuinely useful for your use cases

An SDK that's just a thin, type-free wrapper around `fetch` with no real error handling isn't worth maintaining — it adds a second thing to keep in sync with your API forever, for marginal benefit over calling the API directly.

## Personal Mode: Skip It for the MVP

For nearly every personal API product, the right call is: **no SDK in your MVP.** Build one only if, after launch, you notice either (a) real callers explicitly asking for one, or (b) you're rewriting the same client wrapper code in every project that consumes your own API.

This isn't a permanent "no" — it's deferred to **SDK Development** in Phase 3, and revisited with real information instead of a guess made before you have a single caller.

## If You Build a Minimal One Anyway

Sometimes building a thin client for your own use is worth it even pre-launch — mainly to dogfood your own API design and catch awkward request/response shapes before anyone else hits them. If you do this, keep it deliberately minimal:

```
// Minimal client — auth + error parsing only, nothing more
class MyAPIClient {
  constructor(apiKey) { this.apiKey = apiKey; }
  async get(path) { /* attaches auth header, parses standard error shape */ }
  async post(path, body) { /* same */ }
}
```

Don't build language-specific packages, publish to a package registry, or write SDK documentation for something only you use. That's real work aimed at zero external callers.

## AI Prompt: Decide, Don't Guess

```
My target caller: "[paste from Target Developers]"
My API's endpoints: "[paste from Endpoint Planning]"

1. Given this caller profile, does an SDK meaningfully reduce their integration friction, or is a good quick-start example equally effective?
2. If an SDK would help, what's the single highest-value thing it should handle (auth, error parsing, retries, types) — not a full feature list, just the one thing that matters most?
3. Confirm whether building this now or deferring to post-launch is the better call for an MVP.
```

## Before You Continue

- [ ] I've decided whether my MVP needs an SDK, based on my actual caller profile — not by default
- [ ] If skipping it, I know what signal would tell me to revisit this decision later
- [ ] If building a minimal one, its scope is limited to auth + error parsing, nothing speculative

When all three are checked, move to **API Documentation Strategy**.
