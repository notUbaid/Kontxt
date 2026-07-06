---
title: Feature Prioritization
slug: feature-prioritization
phase: Phase 0
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# Feature Prioritization

By now you have a problem, a purpose, use cases, and a rough resource list pulled from those use cases. That list is already longer than what you should build first. This module's job is to cut it down — deliberately, not by running out of motivation halfway through.

An API with three endpoints that work perfectly beats an API with ten endpoints where three are half-finished. Callers notice reliability before they notice feature count.

## Sort by One Question

For every resource or endpoint on your list, ask: **does my #1 use case break without this?**

- **Yes** → It's core. Build it first.
- **No, but it's needed for use case #2 or #3** → It's next. Not now.
- **No, and it's not needed for any use case yet** → It's a want, not a need. Park it.

This is deliberately stricter than typical "must-have / nice-to-have" prioritization, because "nice-to-have" quietly expands. Tying every feature to a specific use case from the previous module keeps the list honest.

## The Three Buckets

| Bucket | Definition | What goes here |
|---|---|---|
| **Core** | Your API doesn't function as promised without it | The minimum endpoints to fulfill use case #1 end to end |
| **Next** | Makes the API meaningfully better, not fundamentally different | Endpoints for use cases #2–3, quality-of-life additions |
| **Later** | Would be nice, isn't needed to prove the concept | SDKs, extra filters, webhooks for edge conditions, admin tooling |

Write your resource list into these three buckets now. Be ruthless — if you're unsure whether something is Core or Next, it's Next.

> **Warning:** Authentication and error handling are not features you prioritize away. They belong in Core regardless of what bucket the rest of the related endpoint falls into. An endpoint without real auth isn't an MVP — it's a liability.

## Personal Mode: Core Should Be Small

For a solo, personal-mode build, Core should realistically be 2–5 endpoints. If your Core bucket has more than that, you likely haven't been strict enough with the "does use case #1 break without this" test — go back through it again.

A small, complete Core also gives you something you can actually finish, which matters more for a personal project's success than any individual feature does. Unfinished ambitious APIs teach you less than finished small ones.

## What to Do With "Later"

Don't delete it — write it down somewhere you'll see it again (your project's roadmap, revisited in Phase 6). Half the value of prioritizing now is giving yourself permission to stop thinking about those features until Core actually ships.

## AI Prompt: Sanity-Check Your Core Bucket

```
My API's primary use case: "[paste use case #1]"

Here's what I've put in my Core bucket:
[list your Core endpoints/resources]

Check this:
1. Could someone complete the full use case above using only what's in Core? Walk through it step by step and flag any gap.
2. Is anything in here that's actually Next or Later, not truly required for this use case?
3. Is authentication and error handling accounted for, even if I didn't list them explicitly?
```

## Before You Continue

- [ ] Every item in my Core bucket is tied to a specific use case, not "seemed important"
- [ ] Core has 5 or fewer endpoints
- [ ] I've written down my Next and Later items somewhere I'll actually revisit

When all three are checked, move to **Monetization Strategy**.
