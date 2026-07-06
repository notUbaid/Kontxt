---
title: Testing
slug: testing
phase: Phase 3
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Testing

This isn't about test coverage percentages — that's a Production mode concern. This is about making sure the thing you're about to put in front of judges actually works, including the parts that only break when someone other than you touches it.

---

## What Actually Needs Testing Here

> **Decision Card — Test scenarios, not coverage**
> You need confidence in four things: the happy path works, auth rejects bad requests correctly, validation catches bad input, and (if relevant) your async/processing flow completes. You don't need a comprehensive test suite — you need to have personally verified these four things work, today, against your real deployed environment.

---

## Build a Test Matrix

A simple table, run manually or via a quick script, covers almost everything you need:

| Scenario | Expected result | Tested? |
|---|---|---|
| Valid request, core loop | `201`/`200`, correct response shape |  |
| Missing required field | `422`, matches your error shape |  |
| No API key | `401` |  |
| Invalid API key | `401` |  |
| Nonexistent resource ID | `404` |  |
| Async endpoint, check status before complete | `processing` status shown |  |
| Rate limit boundary (if time permits) | `429` past your set limit |  |

> **Warning — Skipping the error-case rows is the single most common testing gap.**
> Teams reliably test the happy path because that's what they've been building and re-running. The first time anyone tests a missing field or bad auth is often when a judge does it live — and an unhandled error there reads far worse than a clean `422` would have.

---

## Build a Pre-Demo Smoke Test

> **Tip — A script you can run 5 minutes before presenting is worth more than manual testing done once, hours earlier.**
> Last-minute changes — a deployment, a small fix, an environment variable you forgot to set on the hosting platform — break things in ways local testing doesn't catch. A short script that hits your core endpoints and confirms expected status codes, run right before you present, is cheap insurance against presenting a silently broken API.

This doesn't need to be sophisticated — a script that fires 4-5 requests and checks status codes is enough to catch "the deployed environment is missing an env var" before a judge does.

---

## Test the Deployed Environment, Not Just Local

> **Warning — "It works on my machine" is not the same as "it works on the URL I'm submitting."**
> Missing environment variables, different database connection behavior, or CORS misconfigurations are common gaps between local and deployed environments. Once you deploy (Phase 4), re-run your test matrix against the live URL — don't assume local success transfers automatically.

---

## Generate Your Test Script With AI

> **Copy Prompt — Smoke Test Script**
> ```
> My locked route table: [paste core loop routes]
> My locked request/response schemas: [paste]
> My locked error shape: [paste]
> API base URL: [local or deployed]
>
> Write a short script that tests:
- the full core loop happy path
- a request with a missing required field (expect 422 matching my error shape)
- a request with no API key (expect 401)
- a request for a nonexistent resource ID (expect 404)
>
> Print clear pass/fail output for each check so I can run this in
> under 10 seconds before a demo.
> ```

> **Tip — Ask for clear pass/fail output, not just raw responses.**
> Under demo-prep time pressure, you want to glance at a script's output and immediately know if something's broken — not parse raw JSON dumps to figure it out yourself.

---

## Validate the Output

- Run the script yourself and confirm each check actually fails when it should — a test that always passes regardless of what's broken is worse than no test, because it gives false confidence.
- Confirm the error-case checks validate against your exact locked error shape, not just "got an error of some kind."
- Re-run the full script against your deployed URL once Phase 4 is done, not just locally.

---

## Lock Your Testing Pass

- [ ] Full test matrix run at least once, including error cases — not just the happy path
- [ ] Pre-demo smoke test script working and fast (under 10 seconds)
- [ ] Test matrix re-run against the deployed URL, not just local
- [ ] Any failure found here fixed before moving forward, not noted and deferred

---

## What's Next

**CRUD Endpoints** — finish implementing any remaining locked endpoints beyond your core loop, using the same patterns you've already validated.
