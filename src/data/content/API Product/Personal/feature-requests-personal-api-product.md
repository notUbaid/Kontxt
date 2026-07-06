---
title: Feature Requests
slug: feature-requests
phase: Phase 6
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Feature Requests

Customer Feedback (previous module) triages everything that comes in. This module is specifically about the "Feature Request" pile once it's separated out — turning a scattered set of asks into a backlog you can actually prioritize with a straight face, instead of building whatever was asked most recently or most loudly.

---

## The Decision: Where to Track Requests

| | Private Spreadsheet | GitHub Issues | Dedicated Tool (Canny, Featurebase) |
|---|---|---|---|
| Setup cost | None | None — you likely already use GitHub | Low, but another account/tool |
| Public visibility | No | Yes | Yes |
| Built-in voting signal | No |  reactions | Yes, purpose-built |
| Fits a dev-tool audience | Neutral | Strong — your users are already comfortable here | Neutral |

> ** Best Practice:** For a solo-built API product with a technical audience, GitHub issues with a `feature-request` label is usually the right call. Zero new tooling,  reactions give you a free vote count, and it's transparent — other developers can see what's already been requested instead of submitting duplicates blind.

---

## Deduplicate Before Anything Else

A vote count only means something if requests aren't fragmented across five near-identical issues. Before filing a new request:

1. Search existing open issues for similar asks
2. If found, close the new one as a duplicate and point people to react on the original instead
3. If the new request is a variation worth distinguishing, link it explicitly rather than treating it as unrelated

> ** Tip:** Fragmented duplicates are the most common reason a genuinely popular request looks under-prioritized. Fifteen votes split across three issues looks like nothing; consolidated, it's a clear signal.

---

## A Prioritization Framework That Fits Solo Scale

Score each request on three factors, kept deliberately simple:

| Factor | Question |
|---|---|
| Reach | How many active users would this actually affect? Check against your Analytics/Usage Monitoring data, not just vote count |
| Impact | Does this meaningfully improve integrations, or is it a marginal convenience? |
| Cost | How much of your limited solo engineering time does this take? |

A request with high reach, high impact, and low cost is an easy yes. A request with high vote count but low reach in your actual usage data (a handful of loud users, not your broader base) deserves scrutiny before it jumps the queue.

> **️ Warning:** Vote count alone is a popularity contest, not a prioritization framework. Cross-reference it against real usage data before treating it as the deciding factor — the previous module's activation and retention segments tell you who's actually using the API day to day, which matters more than who's most vocal about a specific ask.

---

## Saying No, Transparently

Not every reasonable-sounding request fits. Close what doesn't, with an honest one-line reason, rather than leaving it open indefinitely in a state of implied "maybe someday":

- "Closing as out of scope — this API is focused on X, and this request pulls toward Y, which isn't a direction I'm taking it."
- "Closing for now — low usage signal relative to the engineering cost, happy to revisit if that changes."

This extends the loop-closing principle from Customer Feedback: a clear no is more respectful of someone's time than silence, and it keeps your backlog honest instead of accumulating stale hope.

---

## AI Prompts

**Prompt: Score a batch of open requests**

```text
Here are open feature requests with their vote counts: [paste list — title, vote count, brief description].

Here's a summary of my current active usage patterns: [paste from Analytics/Usage Monitoring — top endpoints, active user segments].

For each request, score Reach (1-3), Impact (1-3), and Cost (1-3, where 3 = high engineering cost) and give a total priority score (Reach × Impact ÷ Cost). Flag any request where vote count is high but reach against actual usage data looks low.

Output as a sorted table, highest priority first.
```

**Prompt: Draft honest decline messages**

```text
I'm closing these feature requests as not planned: [paste list with brief reason for each].

Write a short, honest closing comment for each — state the real reason plainly, thank them for the suggestion without sounding scripted, and leave the door open only if it's genuinely possible you'd revisit it.
```

---

## Validation Checklist

- [ ] Feature requests tracked in one visible, searchable place
- [ ] Duplicate requests consolidated before being scored or counted
- [ ] Prioritization considers reach and cost, not just raw vote count
- [ ] Declined requests are closed with an honest reason, not left open indefinitely
- [ ] High-vote requests are checked against real usage data before being fast-tracked

---

## Common Mistakes

> **️ Warning:** Tracking requests in a private spreadsheet only you can see. This loses the deduplication benefit, the free voting signal, and the transparency that stops people from re-requesting things that are already tracked.

> **️ Warning:** Letting stale requests sit open forever with no decision. An honest close is more useful to everyone than an issue that's been open for eight months with no signal on whether it's ever happening.

> **️ Warning:** Saying yes to every reasonable-sounding request. Each one adds surface area you now maintain forever — scope creep in an API product isn't just extra code, it's extra things that can break and extra things you owe backward compatibility on.

---

## Trust Note

If a feature request originated from a private support conversation or a specific customer's use case, get their comfort level (or anonymize) before making the details public in a GitHub issue. Public trackers are great for transparency, but not at the cost of exposing a specific customer's business details without their knowledge.

---

## Implementation Checklist

- [ ] Feature request tracker set up (GitHub issues with a dedicated label, or equivalent)
- [ ] Existing scattered requests consolidated into it, duplicates merged
- [ ] Prioritization framework (reach × impact ÷ cost) applied to the current backlog
- [ ] A batch of stale/out-of-scope requests reviewed and closed with honest reasons
- [ ] Process defined for cross-checking new high-vote requests against usage data

---

## What's Next

Next in Phase 6: **Roadmap** — turning this prioritized backlog into a public-facing plan for where the API is headed.
