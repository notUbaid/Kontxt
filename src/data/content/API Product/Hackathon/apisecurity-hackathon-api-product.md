---
title: Security
slug: security
phase: Phase 4
mode: hackathon
projectType: api-product
estimatedTime: 12-18 min
---

# Security

You've already made several security decisions along the way — API key auth, parameterized queries, hashed secrets, no leaked stack traces, rate limiting. This module is the consolidated pass: confirming those hold up, and closing the few gaps that haven't come up yet, sized correctly for a hackathon timeline rather than a production audit.

---

## What's Already Covered

Quick confirmation, not new work:

- [ ] Auth middleware rejects missing/invalid keys (Authentication Implementation)
- [ ] All database queries are parameterized, no string concatenation (Database Setup)
- [ ] Errors never leak stack traces to callers (Error Handling)
- [ ] Rate limiting protects against abuse and runaway external API costs (Rate Limiting)

If any of these aren't actually confirmed, stop here and fix them before continuing — everything below assumes this foundation is solid.

---

## Validate Input Beyond "Is It Present"

Required-field checks (Request Design) confirm a field exists. They don't confirm it's *reasonable*. A few cheap additions matter:

> **Quick Reference — Input checks worth adding**
- **Length limits** on text fields — an unbounded text field accepting megabytes of input is both a performance risk and an easy way to break your demo accidentally
- **Type checks** — confirm a field that should be a number isn't silently accepted as a string that breaks downstream logic
- **If any API output gets rendered as HTML anywhere** (your demo app, for instance) — escape it properly; raw user input rendered directly into HTML is how XSS happens

> **Tip — This matters more if your core logic passes user input to an external API.**
> If your input goes straight into a prompt for an LLM API or another third-party service, a malicious or malformed input could cause unexpected behavior downstream. A basic length limit and type check is cheap insurance.

---

## Check for Broken Object-Level Authorization

This is a step beyond "does auth work" — it's "does auth actually protect the *right* thing."

> **Warning — If your API has any per-resource ownership concept, confirm a caller can't access another caller's data by guessing an ID.**
> Example: `GET /transcripts/:id` — if your key only proves *a* caller is valid, not *which* caller's data they should see, anyone with a valid key could potentially fetch anyone else's transcript by ID. For a single-key hackathon demo this often doesn't apply (there's only one caller), but if your demo shows multiple distinct users or callers, this is worth a direct check.

---

## Secrets Hygiene: One Last Check

> **Warning — Check your git history, not just your current files.**
> A secret committed in an early commit and later removed from the file is still sitting in your git history, visible to anyone who clones the repo. Search your commit history for anything that looks like a key or connection string before making your repository public for judging.

Quick check: confirm your `.env` is in `.gitignore`, and confirm `git log -p` (or a quick search) doesn't surface any secret in a past commit.

---

## CORS: Tighten If You Can, Without Breaking the Demo

If you configured CORS in Routing, revisit it briefly:

> **Decision Card — CORS scope**
- **Wildcard (`*`)** — acceptable for a hackathon demo if your audience needs to test from arbitrary origins
- **Scoped to your specific demo app's origin** — slightly more correct, worth doing if it's a 2-minute change and won't risk breaking your demo right before presenting

Don't risk a working demo to tighten this further than your remaining time safely allows.

---

## Dependency Sanity Check

> **Tip — Stick to popular, actively maintained packages, which you likely already did by choosing a mainstream stack.**
> Obscure packages with few downloads or no recent updates are a real (if usually small) supply-chain risk, and at hackathon speed you also won't have time to verify their behavior carefully. If your stack selection followed the "pick what's well-supported" guidance from earlier, this is mostly already handled — just don't add anything exotic this late.

---

## What's Explicitly Out of Scope Right Now

These are real production concerns — and real over-engineering for a hackathon deadline:

- Penetration testing or formal security audits
- Web Application Firewalls (WAFs)
- Compliance frameworks (SOC2, GDPR data handling processes)
- Key rotation policies

Naming these explicitly isn't avoidance — it's the same scope discipline from MVP Scope, applied to security. Spending hours here instead of on your demo doesn't make your hackathon submission more secure in any way a judge will notice or care about.

---

## Run a Focused Security Review With AI

> **Copy Prompt — Security Audit**
> ```
> Here is my API implementation: [paste routes, middleware, and logic layer]
> Auth model: [single API key / key table]
> Does my API have per-resource ownership where one caller's data should
> be inaccessible to another? [yes/no, describe if yes]
>
> Review for:
- input validation gaps (missing length/type checks) beyond required-field checks
- any place user input reaches an external API or gets rendered without escaping
- broken object-level authorization, if relevant to my ownership model
- anything that looks like a hardcoded secret
>
> Don't flag production-scale concerns (WAFs, compliance, key rotation) —
> focus only on what's realistic to fix in a hackathon timeline.
> ```

> **Tip — Tell it what to ignore, not just what to check.**
> Without that constraint, a security review will naturally surface production-grade recommendations that aren't appropriate here — explicitly scoping it out keeps the output actionable instead of overwhelming.

---

## Validate the Output

- Confirm every flagged issue is real and specific to your code — not generic security advice that doesn't apply to your actual implementation.
- Prioritize fixes by realistic risk: a leaked secret or missing auth check matters far more than a theoretical edge case in input validation.
- If something's flagged but genuinely doesn't apply to your scope (e.g. BOLA with only one possible caller), it's fine to consciously skip it — just make that a deliberate decision, not an oversight.

---

## Lock Your Security Pass

- [ ] All four foundational protections (auth, parameterized queries, error privacy, rate limiting) reconfirmed
- [ ] Basic input validation (length, type) added beyond required-field checks
- [ ] Git history checked for accidentally committed secrets
- [ ] Per-resource authorization checked, if your API has multiple distinct callers
- [ ] Out-of-scope items consciously deferred, not silently skipped

---

## What's Next

**Performance Optimization** — make sure your API stays responsive under the load a live demo and judge testing will actually create.
