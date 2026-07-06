---
title: Roadmap
slug: roadmap
phase: Phase 6
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Roadmap

A public roadmap does three things for a solo-built API product: it stops the same feature being requested five times by people who didn't know it was already planned, it gives a prospective user real information when they're deciding whether to build something serious on top of your API, and it signals the project is actively moving rather than abandoned. Done carelessly, though, it becomes a list of broken promises with dates attached — which damages trust faster than never publishing one at all.

This module turns the prioritized backlog from the previous module into something public, honest, and low-risk to maintain.

---

## The Decision: Format

| | GitHub Projects Board | Simple `ROADMAP.md` | Notion/Public Doc |
|---|---|---|---|
| Fits your GitHub-based feature request tracker | Directly, can link issues | Loosely | No |
| Setup effort | Low | Very low | Low |
| Feels alive/interactive | Yes | Only as good as your update cadence | Yes |

> ** Best Practice:** Use whichever format is closest to where you already track feature requests. If you adopted GitHub issues in the previous module, a GitHub Projects board linked to those issues costs almost nothing extra and keeps your whole feedback-to-roadmap pipeline in one place.

---

## Now / Next / Later, Not Dates

Hard dates are the single riskiest thing you can put on a solo-maintained roadmap. A missed date is a broken promise; a vague timeframe that slips is just normal software development.

| Column | Meaning |
|---|---|
| **Now** | Actively being built |
| **Next** | Prioritized, will start once "Now" items ship |
| **Later** | A validated direction, no committed timeline |

This framework communicates real information (what's coming, roughly in what order) without the specific-date commitment a solo maintainer can't reliably keep.

> **️ Warning:** Putting a hard date on a roadmap item as a solo developer is a bet against your own unpredictable schedule — day jobs, other priorities, and scope surprises are normal, but a missed public date reads as unreliability regardless of the reason.

---

## What Not to Put on the Roadmap

- **Unvalidated speculation.** If it hasn't been checked against usage data or real feedback yet, it's an idea, not a roadmap item. Putting it on the roadmap implies a commitment you haven't actually made.
- **Internal engineering work.** Refactors, infrastructure migrations, and test coverage improvements matter to you, not to the developer deciding whether to integrate your API. Keep the roadmap user-facing.
- **Anything you're not reasonably confident about.** A roadmap with three items you're confident in is more trustworthy than one with fifteen items, half of which quietly disappear later.

---

## Keeping It Credible

A stale roadmap is worse than no roadmap — it signals the project stopped moving. Keep it alive with a light, sustainable process:

1. When a "Now" item ships, move it off the roadmap and into the changelog — the roadmap shows what's coming, the changelog shows what happened.
2. Review the board monthly. Re-order "Next" based on the current prioritized backlog, not what felt urgent last time you looked.
3. If something in "Later" gets deprioritized entirely, remove it rather than letting it sit indefinitely — silence about a dropped item is more honest than false hope.

---

## AI Prompts

**Prompt: Draft a Now/Next/Later roadmap from your backlog**

```text
Here is my prioritized feature request backlog with priority scores: [paste from the previous module].

Organize the top 8-10 items into Now / Next / Later:
- Now: 1-2 items only, things that could realistically start immediately
- Next: 2-4 items, clearly prioritized but not yet started
- Later: remaining validated ideas with no committed order

Exclude anything that's purely internal engineering work with no user-facing outcome. Write one line per item, user-facing language only, no internal jargon.
```

**Prompt: Audit the roadmap for overcommitment**

```text
Here's my current public roadmap: [paste].

Review it as a skeptical developer deciding whether to build on this API. Flag:
- Any item that implies a specific date or timeframe
- Any item that sounds unvalidated or speculative rather than planned
- Any item that reads as internal engineering work rather than something a user would care about

List issues only, don't rewrite the roadmap.
```

---

## Validation Checklist

- [ ] Roadmap uses Now/Next/Later (or equivalent), not hard dates
- [ ] Every item is user-facing, not an internal engineering task
- [ ] Every item reflects real prioritization from the backlog, not unvalidated speculation
- [ ] Shipped items are moved to the changelog and off the roadmap promptly
- [ ] Roadmap has a defined review cadence (e.g., monthly) so it doesn't go stale

---

## Common Mistakes

> **️ Warning:** Committing to hard dates as a solo maintainer. This is the fastest way to turn a trust-building tool into a trust-eroding one — vague but honest timing beats specific but unreliable timing every time.

> **️ Warning:** Letting the roadmap go stale. An unchanged roadmap after several months reads as an abandoned project, even if you're still actively shipping — if you're not updating it, developers evaluating your API can't tell the difference between "quiet" and "dead."

> **️ Warning:** Listing every backlog item regardless of confidence. A long aspirational roadmap sets expectations you'll likely disappoint — a short, honest one you can actually deliver on builds more trust than a long one you can't.

---

## Trust Note

The same discipline from Pricing Evolution and the changelog applies here: say only what you're confident about, be transparent when priorities shift, and never let a roadmap item quietly vanish without at least implicit acknowledgment (removing it, or moving it back to backlog rather than pretending it was never listed).

---

## Implementation Checklist

- [ ] Roadmap format chosen, linked to the same system as feature request tracking
- [ ] Backlog organized into Now / Next / Later
- [ ] Internal-only engineering items excluded from the public view
- [ ] Monthly (or similar) review cadence scheduled
- [ ] Process defined for moving shipped items from roadmap to changelog

---

## What's Next

Next in Phase 6: **Presentation Prep** — preparing to show this project publicly, whether for a demo, launch post, or portfolio piece.
