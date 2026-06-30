---
title: Roadmap
slug: roadmap
phase: Phase 6
mode: production
projectType: mobile-app
estimatedTime: 20–25 min
filename: roadmap-production-mobile-app.md
---

You now have retention curves, funnel data, user feedback, and referral metrics — the inputs every earlier module in this phase built toward. A roadmap is where that evidence turns into a deliberate sequence of what gets built next, instead of whoever's loudest or most recent idea winning by default.

## Why a Roadmap Is Different From a Backlog

A backlog is everything you might build. A roadmap is a deliberate, prioritized sequence with reasoning attached — it answers not just "what" but "why this, why now, and what are we deliberately not doing yet."

> **Best Practice:** A roadmap without stated reasoning is just a wish list with dates attached. Every item should trace back to evidence — a retention gap, a funnel drop-off, a recurring feedback theme, a clear business goal — not just "this seems like a good idea."

## Sourcing Roadmap Input From What You've Already Built

Every prior module in this phase is a direct input here, not a separate workstream:

| Source | What It Tells You |
|---|---|
| Retention curves (Retention module) | Whether the core product or onboarding needs the most attention |
| Funnel drop-off (Analytics module) | Exactly which step is losing the most users |
| User Feedback themes | Specific, qualitative pain points and feature requests |
| Reviews & Ratings patterns | Public sentiment, often correlated with specific app versions |
| Referral program metrics | Whether growth investment or product investment is the higher-leverage move right now |

> **Tip:** Cross-reference these sources before prioritizing. A feature request that shows up in user feedback AND correlates with a funnel drop-off AND gets mentioned in negative reviews is a much stronger signal than any one source alone.

## A Practical Prioritization Framework

You don't need an elaborate scoring system — a simple, consistently-applied framework beats a complex one nobody actually uses.

**Impact vs. Effort**, scored relatively against your current roadmap candidates (not absolute numbers):

```
High Impact, Low Effort  → Do now
High Impact, High Effort → Plan deliberately, break into phases
Low Impact, Low Effort   → Fine as filler between bigger pushes
Low Impact, High Effort  → Cut, regardless of who's asking
```

Add one more dimension specific to mobile: **release cost**. Because shipping requires app review and gradual user adoption (Phase 5's lessons apply ongoing, not just at launch), bundle smaller related changes into fewer releases rather than shipping every minor item separately — this reduces both review overhead and user-facing version fragmentation.

## Categories Worth Tracking Separately

Mixing all roadmap items into one undifferentiated list makes tradeoffs harder to reason about. Separate into:

- **Retention/activation fixes** — addressing the funnel drop-offs and churn drivers you've already measured
- **New feature development** — net-new capability, usually higher risk and effort
- **Technical debt / platform work** — invisible to users directly but affects velocity and stability (this connects back to everything in Phase 4)
- **Growth experiments** — referral, notification, ASO changes that are cheap to test and reversible

> **Warning:** Teams that only roadmap new features while ignoring technical debt and retention fixes tend to see velocity slow and churn creep up simultaneously, often without realizing the two are connected — accumulating debt makes every future feature slower to ship, and ignored retention gaps compound quietly until they show up in a quarter's growth numbers.

## Mobile-Specific Roadmap Considerations

- **Release cadence tradeoffs** — frequent small releases reduce risk per release but add store-review overhead each time; less frequent larger releases reduce review overhead but increase risk and the blast radius of any one release. Pick a cadence deliberately rather than defaulting to either extreme.
- **OS version support decisions** — periodically reassess your minimum supported OS version; supporting very old versions limits what new platform APIs you can use and adds testing surface, while dropping support too early excludes real users still on older devices
- **Platform parity decisions** — if you're on both iOS and Android, decide deliberately whether new features ship simultaneously or platform-by-platform, and communicate that reasoning rather than letting it happen inconsistently

## Communicating the Roadmap

- For internal teams: be explicit about reasoning (the evidence behind each item), not just the sequence — this helps the team push back intelligently and builds shared understanding of priorities
- For external users (if you publish any public roadmap): be conservative about firm dates, since mobile release timing has more external dependency (store review) than most software — communicate themes and rough sequencing rather than precise ship dates you might miss
- Revisit the roadmap on a regular cadence (monthly or quarterly, depending on team size and pace) rather than treating it as fixed once written — new evidence from retention/feedback/analytics should be able to reshuffle priorities

## Using AI Here

```
Help me prioritize a product roadmap for this app.

App core function: [one sentence]
Current retention data: [summarize key findings]
Top funnel drop-off points: [from Analytics]
Recurring user feedback themes: [list top 3-5]
Known technical debt items: [list]
Candidate new features under consideration: [list]

Score each candidate roughly on impact vs. effort, cross-referencing the evidence sources above.
Flag any items that appear in multiple evidence sources (feedback + funnel + reviews) as
likely higher-confidence priorities. Suggest what to explicitly NOT build right now and why.
```

> **Validation:** Treat AI's relative impact/effort scoring as a starting point for discussion, not a final ranking — it doesn't have full context on your team's actual capacity, technical constraints, or strategic priorities outside what you've described. Use it to structure the conversation, not replace it.

## Common Mistakes

- Building a roadmap from opinion and recency bias instead of the evidence already collected through Analytics, Retention, and Feedback
- Treating all roadmap items as equally weighted regardless of impact/effort or supporting evidence
- Ignoring technical debt until it visibly slows the team down, rather than budgeting for it proactively
- Shipping every minor change as a separate release, accumulating unnecessary store-review overhead
- Publishing firm external dates that don't account for store review timelines and risk being missed
- Never revisiting the roadmap as new data arrives, treating it as fixed rather than a living document

## Before You Move On

- [ ] Roadmap items are each traceable to specific evidence (retention data, funnel drop-off, feedback themes, or clear business goals)
- [ ] Items are categorized across retention/activation, new features, technical debt, and growth experiments — not just a single undifferentiated list
- [ ] Prioritization uses a consistent framework (even a simple one), not ad hoc judgment per item
- [ ] Release cadence and bundling strategy is deliberate, accounting for store review overhead
- [ ] A regular cadence exists to revisit and reprioritize as new data comes in

Next: **Scaling Strategy** — preparing the product and team for what happens as growth from this phase actually compounds.
