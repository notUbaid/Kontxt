---
title: Roadmap
slug: roadmap
phase: Phase 6
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Roadmap

You now have real signal â€” retention data, referral results, actual user behavior â€” that didn't exist when you scoped the MVP back in Phase 0. A roadmap built on that signal is fundamentally different from a feature wishlist, and the difference matters most for a solo builder with limited time.

## The Decision You're Actually Making

Not "what features should we build next." It's: **of everything we could build, what's actually supported by evidence from real usage, versus what's just an interesting idea we haven't validated needs to exist?**

A roadmap for a personal project has a scarcer resource than a funded startup's: your own time. Every item on it should have to earn its place against that constraint.

## Build the Roadmap From What You Already Measured

You've already generated the inputs across this phase â€” don't start from a blank page.

| Source | What it tells you |
|---|---|
| Retention module findings | Which side (buyer/seller) has the bigger leak, and whether it's liquidity or friction |
| Referral program results | Whether word-of-mouth growth is working, and for which side |
| Support requests / direct user feedback | Specific, concrete pain points real users hit |
| Reviews & ratings data | Recurring complaints or praise patterns across multiple listings/sellers |

> **âœ… Best Practice:** Before adding anything new to the roadmap, revisit your retention diagnosis from earlier in this phase. If you identified a specific leak and haven't fully addressed it yet, that fix outranks any new feature â€” a marketplace that doesn't retain users won't benefit from more features, only from fixing why people leave.

## A Simple Prioritization Framework for a Solo Builder

Elaborate scoring systems (RICE, weighted matrices) are often overkill for one person's roadmap. A simpler filter works better:

```
For each roadmap item, ask:
1. Is there evidence (data or repeated user feedback) this matters, 
   or is it a guess?
2. Does this address a known liquidity or retention leak, or is it 
   a "nice to have" feature?
3. Can I build this in days, not weeks, given I'm working alone?
```

| Evidence-backed + addresses a known leak + buildable solo | Build now |
|---|---|
| Evidence-backed but large effort | Break into a smaller version, or defer |
| No evidence, just an interesting idea | Park it â€” revisit only if evidence appears later |

> **âš ï¸ Warning:** The most common roadmap mistake for solo builders is prioritizing the feature that's most fun to build over the one that's most supported by evidence. Building what's interesting to you, rather than what your retention and referral data actually points to, is how personal projects accumulate unused features while the real leak stays unfixed.

## Decision: Depth vs Breadth at This Stage

| Approach | When it's right |
|---|---|
| Go deeper on what's working (double down on the side that's growing) | If one side has clear traction and the other is the bottleneck |
| Broaden into new categories/features | Only once core liquidity is genuinely healthy on both sides |
| Polish existing core flows | If retention data shows friction, not a missing-feature problem |

> **ðŸ’¡ Tip:** For most marketplaces still building initial liquidity, "polish and fix the core loop" beats "add new features" almost every time. New features add more surface area to maintain without addressing why the existing surface area isn't retaining people yet.

## Keep the Roadmap Honest About Time

A roadmap that lists fifteen things you'll "get to eventually" isn't a plan â€” it's an aspiration. For a personal project, smaller and real beats large and theoretical.

- Limit the active roadmap to 3-5 items at a time, not a long backlog
- Each item has a rough time estimate based on your actual available hours, not best-case assumptions
- Completed items are removed, not just marked done and left cluttering the list
- Revisit the roadmap after each shipped item â€” does new data change what should come next?

> **âœ… Best Practice:** Treat the roadmap as a living document you revise after every ship, not a fixed plan set once and followed rigidly. The whole value of building in public, with real users, is that you get new evidence constantly â€” a roadmap that ignores that evidence wastes the most useful thing a personal project has going for it: tight, fast feedback loops.

## Use AI to Stress-Test Your Priorities

**Prompt â€” Roadmap Reality Check**
```
Here's my current roadmap idea list, along with my retention and 
referral findings from this phase:
[paste roadmap ideas + your actual retention/referral data summary]

For each roadmap item, tell me:
1. Is this backed by the evidence I provided, or is it speculative?
2. Does it address my known bottleneck (specify: buyer/seller side), 
   or is it unrelated?
3. Given I'm working solo, which 2-3 items should genuinely come 
   first, and which should I explicitly defer?

Be direct about which items look like they're based on what's fun to 
build rather than what the data supports.
```

> **ðŸ’¡ Token Efficiency:** Include your actual retention/referral numbers from earlier modules in this prompt rather than re-explaining your marketplace from scratch â€” this lets AI ground its prioritization in real evidence instead of generic roadmap advice that could apply to any marketplace.

## Validate Before Committing to the Roadmap

- Every active roadmap item is tied to either evidence or a known leak, not just an idea you liked
- The list is short (3-5 items), not an aspirational backlog
- You've explicitly deprioritized at least one idea you find personally exciting but lacks evidence
- Time estimates reflect your real available hours as a solo builder, not best-case scenarios

## Common Mistakes

- Building the most interesting feature instead of the most evidence-backed one
- A roadmap so long it functions as a wishlist rather than an actual plan
- Adding new features while a known retention leak from earlier in this phase remains unaddressed
- Never revisiting the roadmap as new data comes in, treating it as fixed once written
- No real time estimates, leading to chronic underestimation of what's actually achievable solo

## Quick Reference

| Prioritize | Defer until evidence appears | Avoid building speculatively |
|---|---|---|
| Fixes to known retention/liquidity leaks | Features with no current usage signal | Elaborate features "because competitors have them" |
| Small, fast, evidence-backed improvements | Large new feature categories | Anything requiring weeks of solo time with no validation |
| Polish to the core transaction loop | Expansion into new listing categories | Features chosen for being fun to build, not needed |
| Anything directly raised by repeated user feedback | One-off feature requests from a single user | Premature scaling features (see Phase 4) |

## What's Next

With a focused, evidence-based roadmap set, the next module shifts toward Scaling Strategy â€” translating sustained growth on a solid roadmap into a deliberate plan for handling a larger, more demanding marketplace.

