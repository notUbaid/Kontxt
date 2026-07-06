---
title: Quick Start Guide
slug: quick-start-guide
phase: Phase 5
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Quick Start Guide

This is the single page that decides whether someone keeps evaluating your API or closes the tab. Everything you built in this phase — the collection, the request examples, the response examples — gets compressed into one page that takes a stranger from zero to a working response in under five minutes.

## The Decision You're Actually Making

Not "what should our docs contain." It's: **what is the absolute shortest path from "I found this API" to "I just got real data back"?**

Every extra step between those two points loses readers. A Quick Start is not a reference manual — it's a single, linear, no-detours path.

## The Five Things a Quick Start Must Answer, in Order

1. What does this API do? (one sentence)
2. How do I get access? (auth/API key)
3. What's the simplest possible request I can make?
4. What does success look like?
5. Where do I go for more?

If a reader can't answer all five in under a minute of reading, the guide has too much in it.

> **️ Warning:** Don't open with installation instructions, architecture, or your tech stack. Nobody cares what you built your API with until after they've confirmed it does what they need.

## Structure That Works

```
# [API Name]

One sentence describing what this API does.

## Get Your API Key
[Exact steps — even if it's just "use this demo key for judging: xxx"]

## Make Your First Request
[One copy-pasteable curl command, nothing else]

## What You Get Back
[The exact JSON response, annotated if needed]

## Next Steps
[Links to full endpoint docs / Postman collection]
```

> ** Best Practice:** For a hackathon demo, provide a working shared API key directly in the Quick Start. Don't make a judge sign up for an account to evaluate your project — that's friction that costs you the demo, not security you actually need at this stage.

## One Command, One Response, Zero Ambiguity

The core of the page is this exact pattern — nothing else competes for attention:

```bash
curl -X GET https://your-api.com/v1/tasks \
  -H "Authorization: Bearer demo_key_for_judges"
```

```json
{
  "data": [
    { "id": "tsk_8f3a2b", "title": "Review pull request #42", "completed": false }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 1, "hasMore": false }
}
```

> ** Tip:** Pick your simplest GET endpoint for this first example — not your most impressive feature. The goal here is proving the API works at all, not showcasing complexity. Save the impressive endpoint for the pitch demo.

## Decision: README vs Hosted Docs Page

| Approach | Setup time | Good enough for a hackathon? |
|---|---|---|
| Quick Start section in `README.md` | Minutes | Yes — judges read READMEs directly on GitHub |
| Hosted docs site (Docusaurus, Mintlify) | Hours | Overkill unless your product *is* developer docs |
| Notion/Google Doc link | Minutes | Acceptable, but a README is more discoverable |

> **️ Warning:** Don't spend hackathon hours standing up a documentation site. A clean, well-formatted `README.md` does the job a judge actually needs and costs a fraction of the time.

## Generate It with AI

**Prompt — Compress Existing Docs into a Quick Start**
```
Using the endpoint list, example requests, and example responses below, 
write a Quick Start guide following this exact structure:
1. One-sentence description of the API
2. How to get an API key (use the demo key provided)
3. One single curl example using the simplest GET endpoint
4. The exact JSON response for that example
5. A "Next Steps" section linking to the full docs and Postman collection

Keep total length under 40 lines. Do not add a features list, 
architecture explanation, or tech stack section.

[paste your existing endpoint docs and example responses here]
```

> ** Token Efficiency:** Reuse the examples you already generated and verified in earlier modules — paste them in directly rather than asking AI to regenerate from scratch. You already paid the verification cost once; don't pay it again.

## Validate Before You Share It

- [ ] Have someone unfamiliar with your project follow it start to finish, literally
- [ ] Time how long it takes them to get a successful response
- [ ] Confirm the API key in the guide is the same one that's actually live and working
- [ ] Check that the single curl example still matches your current deployed API

> **️ Warning:** This is the page most likely to go stale in the final hours before submission, when routes change but docs don't. Re-verify it after your last deploy, not before.

## Common Mistakes

- Quick Start buried below a long feature list or architecture diagram
- Requires account creation before a judge can test anything
- Example uses an API key that's since been rotated or revoked
- Multiple competing "getting started" sections across README and docs site

## Quick Reference

| Must-have | Nice-to-have | Skip entirely |
|---|---|---|
| One-sentence API description | Badges/shields in README | Full architecture diagram |
| Working demo API key | Link to live status page | Account signup flow |
| Single copy-pasteable request | Multiple language examples (curl + JS) | Tech stack justification |
| Exact matching response | Link to Postman collection | Contribution guidelines |

## What's Next

Developer experience is complete — anyone can go from zero to a working call in minutes. The next phase shifts from building the API to presenting it: crafting the pitch, the demo script, and the story that makes judges remember your project.
