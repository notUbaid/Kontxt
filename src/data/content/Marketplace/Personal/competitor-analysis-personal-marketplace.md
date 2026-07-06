---
title: Competitor Analysis
slug: competitor-analysis
phase: Phase 0
mode: personal
projectType: marketplace
estimatedTime: 30-40 min
filename: competitor-analysis-personal-marketplace.md
---

# Competitor Analysis

Before you design anything, look at who's already solving this problem — or who's tried and failed. This isn't a formality. It's the cheapest hour you'll spend on this entire project, because every decision later in Phase 0 gets easier and more defensible once you know what already exists.

Skip this and you risk building a worse version of something that already exists, or rebuilding something that was already tried and quietly died for reasons you'll only discover the hard way.

---

## What You're Actually Looking For

Not just "who else does this." Four specific things:

1. **Direct competitors** — marketplaces solving the same problem for the same people
2. **Indirect competitors** — the actual current solution people use, even if it's not a marketplace (a Facebook group, a spreadsheet, word of mouth, Craigslist)
3. **Failed attempts** — marketplaces that tried this and shut down, and why
4. **Adjacent marketplaces** — different niche, similar mechanics, worth studying for structure even if not direct competition

> **Decision:** Indirect competitors matter more than people expect. If your "competition" is currently a messy Facebook group, that's not a weak market — that's a market with no good solution yet, which is a stronger starting position than competing against three polished apps.

---

## Where to Actually Look

| Source | What it tells you |
|---|---|
| App Store / Play Store search | Who's live, their ratings, what users complain about in reviews |
| Google: "[your niche] marketplace" | Established players, recent entrants |
| Reddit / niche forums | How people currently solve this without a dedicated tool |
| Product Hunt | Recently launched attempts, often early-stage and instructive |
| Crunchbase / TechCrunch search | Funded competitors, and shut-down post-mortems if they failed publicly |
| "[Competitor name] alternative" searches | What users feel is missing from existing options |

> **Tip:** Reviews of existing apps — especially 2-3 star reviews, not 1-star or 5-star — are the highest-signal source you'll find. People leaving a middling review usually explain exactly what's almost good enough and why it isn't.

---

## What to Record for Each Competitor

Don't just browse — capture this for every competitor you find, even rough notes:

```
Name:
What they do:
Supply side (who sells):
Demand side (who buys):
How they make money:
What they do well:
What users complain about (from reviews/forums):
Why someone would choose them / not choose them:
```

Five minutes per competitor, five to eight competitors, is enough. This isn't a research paper — it's enough signal to make Phase 0 decisions with evidence instead of guesses.

---

## Reading Failed Marketplaces Correctly

A shut-down competitor is more useful to you than a thriving one. Thriving competitors show you what works; failures show you what's expensive to find out yourself.

When you find one, ask specifically:

- Did they fail to solve the chicken-and-egg problem (no supply, so no demand, so no supply)?
- Did they pick a niche too narrow to sustain a business, or too broad to build trust in?
- Did they compete against a free/informal alternative that was good enough?
- Was the trust/safety problem unsolved, leading to a bad reputation?

> **Warning:** Don't dismiss a failed competitor with "they just executed badly." Sometimes that's true. Often the failure reveals a structural problem with the niche itself — a problem your version of the idea will hit too, unless you've specifically planned around it.

---

## Finding Your Actual Angle

After gathering competitors, the goal is one honest answer to: **why would someone use yours instead of what already exists?**

Weak answers: "better design," "easier to use," "more modern." Every competitor's pitch deck claims these.

Stronger answers are specific and structural:

- A niche too small for existing players to bother serving well
- A trust mechanism existing players don't have (verification, local-only, community-vouched)
- A different revenue model that changes incentives (no commission vs. commission-based)
- A workflow existing players force into a generic shape that doesn't fit your niche

> **Decision:** If you can't find a structural angle — only a vague "we'll execute better" — that's worth sitting with before moving forward. It doesn't mean stop the project, but it does mean Phase 0's later modules (especially Marketplace Type and Revenue Model) deserve extra honesty.

---

## AI Prompts You Can Use

**Prompt 1 — Generate a competitor list to start from:**

```
I'm building a marketplace for [your niche/idea, one paragraph]. List
5-8 existing products that are direct competitors, indirect/informal
solutions people currently use, or marketplaces that tried this and
shut down. For each, give me what you know about their model and, if
it's a shutdown, why it's reported to have failed. Flag anything you're
unsure about rather than guessing.
```

**Prompt 2 — Pressure-test your angle:**

```
Here's my marketplace idea and my competitor research: [paste your
notes]. Be skeptical: is my stated differentiation ("[your angle]")
actually structural, or is it a generic claim most competitors could
also make? What would make a user genuinely switch from an existing
option to mine?
```

---

## Validating What AI Generates

- **Verify every competitor AI names actually exists and does what's claimed** — AI sometimes invents plausible-sounding competitor names or misattributes features; spot-check 2-3 directly
- **Treat "why competitors failed" claims as a starting hypothesis, not fact** — search for the actual reported reason before repeating it as research
- **Don't accept a flattering read of your own angle** — if AI's pressure-test comes back too easily validating your idea, ask it again more bluntly, or get a second opinion from a real person

---

## Implementation Checklist

- [ ] At least 5 competitors documented (direct, indirect, or failed)
- [ ] At least one informal/indirect "competitor" identified — what people currently do without a dedicated tool
- [ ] Reviews or forum complaints read for at least 2 competitors, specific pain points noted
- [ ] One honest, structural answer written for "why would someone use mine instead"
- [ ] If a direct competitor failed, the likely reason is noted and considered against your own plan

---

## What's Next

Next: **Success Metrics** — defining what "working" actually means for your marketplace before you build toward it.
