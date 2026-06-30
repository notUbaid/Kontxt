---
title: Error Handling
slug: error-handling
phase: Phase 3
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Error Handling

This is the final pass of Phase 3: a deliberate audit across your whole API, not a new feature. You've built error handling incrementally — a central handler in Routing, validation per endpoint, auth failures, rate limits. Now confirm it actually holds together everywhere, because the way your API fails matters as much as the way it succeeds when something breaks live in front of judges.

---

## The Five Failure Categories, Confirmed Everywhere

| Category | Status | Where it should be caught |
|---|---|---|
| Validation failure (missing/bad field) | `422` | Per-endpoint, before logic runs |
| Auth failure | `401` | Auth middleware |
| Resource not found | `404` | Logic layer, when a lookup returns nothing |
| Rate limit exceeded | `429` | Rate limiting middleware |
| Unexpected/internal failure | `500` | Centralized error handler, as a catch-all |

Walk your route table and confirm each endpoint actually produces the right category in the right situation — not just that it has *some* error handling.

---

## Never Leak Internal Details to the Caller

> **Warning — A stack trace in an API response is an information disclosure issue, not just an ugly response.**
> Stack traces can reveal your file structure, library versions, and sometimes fragments of your database queries — useful information to an attacker, and unprofessional to show a judge testing edge cases. Log the full error server-side (console, or your hosting platform's logs) and return only a safe, generic message to the caller.

> **Example — Safe vs. unsafe error response**
> ```json
> // Unsafe — leaks internals
> { "error": "TypeError: Cannot read property 'id' of undefined at /app/src/logic/transcript.js:42" }
>
> // Safe — matches your locked error shape, no internals exposed
> { "error": { "code": "INTERNAL_ERROR", "message": "Something went wrong processing this request" } }
> ```

---

## Handle External Calls Defensively

If your core logic calls anything external — a paid LLM API, a third-party service — that call *will* occasionally fail, time out, or return something unexpected. Untested external failure paths are one of the most common things to break live, precisely because they didn't fail during your own testing.

> **Tip — Wrap every external call in a try/catch with a specific fallback response.**
> A timeout from an external API should produce a clear `502` or `503` with a message like "upstream service unavailable," not an unhandled exception that crashes your process. If you can explain this gracefully to a judge — "this happens when the external API is slow, here's how I handle it" — that reads as engineering maturity, not a flaw.

---

## Catch Process-Level Failures Too

A single unhandled promise rejection or uncaught exception can crash your entire server, taking down every endpoint — not just the one that triggered it.

> **Warning — One unhandled async error can take your whole demo offline, not just the failing request.**
> Add a process-level handler (e.g. `process.on('unhandledRejection', ...)` in Node) that logs the error and keeps the server running, rather than letting Node's default behavior terminate the process. This is a few lines of code that prevents the worst possible failure mode: total silence when a judge's browser tab just stops responding.

---

## A Clean Failure Is a Better Demo Moment Than No Failure

> **Tip — If something does break during your demo, a clear error response you can narrate beats a frozen screen.**
> "That's a 503 — this means our LLM call timed out, here's our fallback handling" is a recoverable, even impressive, moment. A request that just hangs with no response, or a server that's crashed entirely, gives you nothing to say and no way to continue the demo gracefully.

---

## Audit With AI

> **Copy Prompt — Error Handling Audit**
> ```
> Here is my current implementation: [paste your route handlers, logic
> layer, and centralized error handler]
>
> Audit this for:
> - any place a raw error/stack trace could leak to the API caller
>   instead of my locked error shape
> - any external/async call not wrapped in a try/catch
> - whether an unhandled rejection would crash the whole process
> - any endpoint where the wrong status code category would be returned
>   for a given failure type
>
> List every issue found, with the specific line or function affected.
> ```

> **Tip — This is the one prompt in this phase worth pasting your full implementation into.**
> An error-handling audit needs to see real code, not a description of it — this is exactly the kind of check that's cheap to do thoroughly now and expensive to discover live during a demo.

---

## Validate the Output

- Confirm every flagged issue is real by checking the actual code, not just trusting the audit — then fix each one before moving on.
- Manually trigger one external-call failure (e.g. temporarily break your API key for a third-party service) and confirm your API responds cleanly instead of crashing.
- Re-run your test matrix from the Testing module after fixes — an error-handling fix can sometimes change a status code you'd already verified.

---

## Lock Your Error Handling

- [ ] No raw stack traces or internal details ever returned to a caller
- [ ] Every external/async call wrapped in a try/catch with a clear fallback response
- [ ] Process-level handler in place so one failure doesn't crash the whole server
- [ ] Every failure category (validation, auth, not found, rate limit, internal) confirmed across the full route table

---

## What's Next

Phase 3 — Development is complete. Your API is built, tested, and fails gracefully.

**Security** (Phase 4) — a final, focused pass on attack surfaces before you deploy publicly.
