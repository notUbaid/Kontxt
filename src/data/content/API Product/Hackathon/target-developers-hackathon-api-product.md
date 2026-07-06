---
title: Target Developers
slug: target-developers
phase: Phase 0
mode: hackathon
projectType: api-product
estimatedTime: 8-12 min
---

# Target Developers

Your purpose statement says what your API does. This module decides **who's calling it** — and that answer quietly determines your auth strategy, your rate limits, your response format, and even your docs structure in every phase from here forward.

Skip this step and you'll design generic endpoints for an imaginary "everyone." Specific endpoints for a real caller always win in a demo.

---

## Why "Everyone" Isn't a Target

"Developers in general" need contradictory things: some want raw JSON, some want SDKs, some need enterprise auth, some just need a single API key. Designing for all of them means designing for none of them well — and you don't have the hours to support multiple integration styles in a hackathon.

> **Decision Card — Pick exactly one primary caller**
> Not "mostly backend devs, but also maybe mobile apps." One archetype. Everything else is a future feature, not a Phase 0 decision.

---

## Common API Consumer Archetypes

| Archetype | What they integrate into | What they actually need |
|---|---|---|
| **Backend service** | Another server, calling server-to-server | Simple API key auth, stable JSON, no UI concerns |
| **Frontend / mobile client** | Apps with end users behind them | User-level auth (tokens), fast responses, CORS handled |
| **Third-party integrator** | Their own product, as a feature | Strong docs, predictable versioning, clear errors |
| **AI agent / tool-calling system** | An LLM choosing when to call your API | Extremely clear schemas, deterministic responses, low latency |

Pick the row that matches your purpose statement — don't pick the one that sounds most impressive.

> **Tip — AI-agent callers are increasingly common in hackathons.**
> If your API is meant to be called by an AI agent (via tool-calling or MCP) rather than a human-written client, say so explicitly now. It changes how strict and predictable your response schemas need to be later in Phase 1.

---

## What This Decision Locks In Early

You're not designing auth or rate limiting yet — that's Phase 1 and Phase 3. But this choice previews the constraints:

- **Backend service callers** → API key auth is usually sufficient. Don't build OAuth you don't need.
- **Frontend/mobile callers** → you likely need per-user auth, not just a static key.
- **Third-party integrators** → docs quality matters as much as the API itself.
- **AI agents** → schema clarity and consistent error shapes matter more than raw speed.

> **Warning — Don't build enterprise auth for a hackathon demo.**
> Multi-tenant permission systems, OAuth scopes, and SSO are common over-engineering traps. If your target caller is "a backend service for our own demo app," a single API key is correct — not lazy. Match auth complexity to your real caller, not to what sounds production-grade.

---

## Define Your Target Developer

Answer in one or two sentences:

1. **What are they building** when they call your API? (a feature, a bot, an internal tool, a demo app)
2. **What's their skill level and context?** (a solo hackathon teammate vs. an external third-party dev)
3. **What do they already have** that your API needs to work with? (an existing auth token, a webhook listener, an LLM tool-calling setup)

---

## Build the Persona With AI

> **Copy Prompt — Define Target Developer Persona**
> ```
> My API's purpose: "[paste your purpose statement from the previous module]"
>
> Based on this purpose, propose ONE specific target developer persona:
- What are they building that calls this API?
- What's the simplest auth method that fits their use case (not the most secure — the simplest that's still reasonable)?
- What would make them abandon integration in the first 5 minutes?
>
> Keep the persona narrow and concrete. Do not propose multiple personas.
> ```

> **Tip — Reuse the purpose statement, don't re-explain your idea.**
> You already have the purpose statement locked from the last module. Paste it directly instead of re-describing your project from scratch — shorter prompt, same result.

---

## Validate the Output

- If AI proposes a persona that's actually two personas ("backend devs, but also end users via mobile") — reject it and force a single choice.
- If it recommends OAuth, multi-tenancy, or SSO for a hackathon-scale single-caller use case, that's over-engineering. Override it with the simplest auth that fits.
- If the "5-minute abandonment" answer is generic ("bad docs"), push back and ask for something specific to your API's shape.

---

## Lock Your Target Developer

- [ ] One specific caller archetype chosen (not multiple)
- [ ] Clear on what they're building when they call your API
- [ ] Auth complexity previewed and matched to real need, not assumed enterprise need
- [ ] Persona is concrete enough to write a docs page for

---

## What's Next

**MVP Scope** — convert your problem, purpose, and target developer into the exact set of endpoints you'll actually build before the deadline.
