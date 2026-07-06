---
title: Postman Collection
slug: postman-collection
phase: Phase 5
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Postman Collection

A judge who can't make a successful request in under 60 seconds stops trying. Your API's first impression isn't the code — it's whether someone unfamiliar with it can call it immediately, without asking you anything.

## The Decision You're Actually Making

You're not writing documentation. You're building a **try-it-now artifact** — something a judge clicks once and gets a real response from. The question isn't "what should our docs cover," it's "what's the fastest path from zero to a working response."

A Postman (or Bruno/Insomnia, same idea) collection beats a markdown doc here because it's executable. No copy-pasting curl commands, no guessing at headers — click, send, see JSON come back.

## What Goes In the Collection vs What Doesn't

| Include | Skip |
|---|---|
| Every public-facing endpoint | Internal/debug-only routes |
| One example request per endpoint | Every possible parameter combination |
| Pre-filled example values that actually work | Empty placeholder fields |
| Auth already configured at the collection level | Per-request auth setup |
| A `/health` check as the first request | Edge-case/error-trigger requests |

> ** Best Practice:** Set auth once at the collection level (e.g. an API key in a collection variable), not on every individual request. One judge clicking "Send" on request #1 should not have to configure anything to make request #5 work.

## Structure That Makes Sense at a Glance

Organize requests in the order someone would naturally use your API, not alphabetically:

1. **Health Check** — proves the API is alive
2. **Auth / Get API Key** — if applicable
3. **Core resource — Create**
4. **Core resource — Read / List**
5. **Core resource — Update**
6. **Core resource — Delete**
7. Secondary resources, same pattern

> ** Tip:** Name requests as actions, not routes — `"Create a Task"` reads faster under time pressure than `"POST /api/v1/tasks"`. Judges scan, they don't read carefully.

## Use Collection Variables, Not Hardcoded Values

- [ ] Base URL stored as `{{baseUrl}}` — one place to switch between local and deployed
- [ ] API key stored as `{{apiKey}}` — never pasted directly into request headers
- [ ] IDs returned from a "Create" request saved as variables for use in later requests

> **️ Warning:** A collection that only works against `localhost` is useless to a judge testing after your laptop is closed. Point `{{baseUrl}}` at your deployed URL before sharing — and double-check it after every redeploy, since this is the single most common reason a "working" collection fails in front of someone else.

## Generate the Collection with AI

Don't hand-build 15 requests one at a time. Give AI your route definitions and let it produce the full collection in one pass.

**Prompt — Generate Postman Collection JSON**
```
Generate a Postman Collection v2.1 JSON file for this API.
Requirements:
- One request per endpoint listed below, grouped in logical folders
- Collection-level variable for {{baseUrl}} and {{apiKey}}
- Auth header applied at the collection level, not per-request
- Realistic example request bodies that match the schema (not empty placeholders)
- Order requests as: health check, auth, then CRUD operations grouped by resource

Endpoints:
[paste your route list or OpenAPI spec here]
```

> ** Token Efficiency:** Paste a route list or OpenAPI spec, not your full source code. AI needs the contract (method, path, body shape), not the implementation — sending implementation code here burns tokens without improving the output.

## Validate Before You Share It

- [ ] Import the collection fresh (as if you're a stranger) and run every request top to bottom
- [ ] Confirm the "Create" request's response ID actually flows into the "Update"/"Delete" requests
- [ ] Test against the deployed URL, not localhost
- [ ] Remove any request that hits a route you've since deleted or renamed

> **️ Warning:** AI-generated example values are a common source of silent failure — a fake email format, a string where you need a number. Run every request yourself once before sharing; don't assume the generated body is valid just because it looks plausible.

## Common Mistakes

- Sharing a collection still pointed at `localhost:3000`
- Auth token hardcoded into a request instead of a variable — breaks the moment the key rotates
- No example values, so a judge has to guess what a valid request body looks like
- Collection untested after the last deploy — routes changed, collection didn't

## Quick Reference

| Must-have | Nice-to-have | Skip entirely |
|---|---|---|
| Health check request | Folder descriptions | Every error-case request |
| Working example bodies | Pre-request scripts | Multiple environments |
| Collection-level auth | Auto-chained IDs between requests | Test assertions/scripts |
| Deployed `{{baseUrl}}` | Response examples saved in Postman | Mock server setup |

## What's Next

With a collection a stranger can run end-to-end, the next module covers writing the example requests and responses that go directly into your documentation and pitch materials.
