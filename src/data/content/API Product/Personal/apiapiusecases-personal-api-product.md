---
title: API Use Cases
slug: api-use-cases
phase: Phase 0
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# API Use Cases

Your purpose statement says what your API is for, in the abstract. Use cases say what someone actually *calls*, in order, to accomplish something real. This is the step where your API stops being an idea and starts having a shape — because you can't design a resource, an endpoint, or a response format without knowing the concrete sequence of calls someone will make.

Skip this and you'll design endpoints that look reasonable in isolation but don't compose into anything a real caller can actually use.

## A Use Case Is a Story, Not a Feature

A feature list says "supports filtering, supports pagination, supports webhooks." A use case says:

> A developer wants to notify their app when a forecast changes for a city their user is tracking. They register a webhook for that city, receive a payload when conditions shift past a threshold, and fetch the full forecast only when they need to show it — because polling would burn their rate limit.

That single story already tells you: you need a webhook registration endpoint, a payload schema, a threshold parameter, and a separate lightweight endpoint for on-demand fetches. None of that comes from a feature list. All of it comes from the story.

## Writing Your Use Cases

Write 3–5 use cases, no more. More than that this early usually means you're listing features again, not stories. Each one follows this shape:

```
[Caller] wants to [accomplish something].
They call [endpoint / sequence of calls] with [key inputs].
They get back [what they need] and use it to [what happens next].
```

Order them by how essential they are. The first one is your MVP's reason to exist — if nothing else works, this use case must.

## Turning Use Cases Into a Resource List

Once you have your use cases written, pull out the nouns. Nouns become resources; the verbs around them become your endpoints. This is the fastest honest way to arrive at API surface area — faster and more grounded than brainstorming endpoints directly.

| From the use case | Becomes |
|---|---|
| "a city their user is tracking" | A `Subscription` resource (city + threshold) |
| "receive a payload when conditions shift" | A `Webhook` resource, triggered by your system |
| "fetch the full forecast" | A `Forecast` resource, read endpoint |

You'll formalize this fully in **Endpoint Planning** next phase — this module just needs to produce the raw material.

> **Tip:** If a use case doesn't produce any new nouns, it's probably a variation of one you already have, not a distinct one. Merge it in rather than listing it separately.

## Personal Mode: Resist Designing for Imagined Scale

It's tempting to write a use case like "an enterprise customer processes 10,000 requests a minute across their fleet of microservices." Unless that's genuinely your situation, don't — you'll end up designing rate limiting, sharding, and auth complexity for a caller who doesn't exist yet, at the cost of the caller who does: you, or someone like you, trying to get something working today.

Write use cases at the scale this project will actually see in its first month.

## AI Prompt: Find the Gaps

Use this after drafting your use cases, not before — AI generating use cases from scratch tends to produce generic ones that don't reflect your actual problem statement.

```
Here's my API's purpose: "[paste purpose statement]"
Here are my draft use cases:

1. [use case 1]
2. [use case 2]
3. [use case 3]

Review them:
1. Is there an obvious use case I'm missing that a real caller would need on day one (not a nice-to-have)?
2. Do any of these use cases secretly require a resource or endpoint I haven't mentioned?
3. Which one of these, if it didn't work, would make the whole API useless? Confirm that's my top priority.
```

## Before You Continue

- [ ] I have 3–5 use cases, each describing a caller's actual goal, not a feature
- [ ] I've pulled out the nouns and have a rough resource list forming
- [ ] I know which single use case is my non-negotiable MVP

When all three are checked, move to **Competitor Analysis**.
