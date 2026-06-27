---
title: Market Research
slug: market-research
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 30–45 min
---

# Market Research

Market research is not a homework assignment you do once and file away.

It's how you find out if your value proposition is aimed at a real market or a market you imagined. It's also how you figure out whether to build something differentiated or walk away before spending months on the wrong thing.

Most beginners skip this or do a shallow version — a quick Google search, a look at one or two competitors, a note that "the market is big." That's not research. That's confirmation bias with extra steps.

Good market research answers three questions that will reshape your product:

1. Is the market large enough to build a business on?
2. Is the market already saturated, or is there a real opening?
3. Who are you actually competing with, and where do they fall short?

---

## Before You Start: What You Already Know

You completed your Value Proposition. That gives you three inputs that make research faster and more focused:

- **Your target user** — narrows who you're researching
- **The outcome you're delivering** — narrows the market category
- **The alternative they're using today** — gives you your first competitor to research

Don't start from scratch. Start from those.

---

## What Market Research Is Not

> [!WARNING]
> **"The market is worth $50B"**
>
> TAM numbers pulled from analyst reports mean almost nothing for early-stage SaaS. A $50B market where the top three players control 95% of revenue is not an opportunity — it's a wall.
>
> What matters is the **serviceable, reachable segment** you can actually sell to in the next 18 months.

---

> [!WARNING]
> **Reading about the market instead of talking to it**
>
> Articles and reports tell you what the market looked like when they were written. Users tell you what's true right now. No amount of desk research replaces five 20-minute user conversations.

---

> [!WARNING]
> **Researching to validate instead of to learn**
>
> You will find evidence that your idea is good if you look for it. You will also find evidence it's bad if you look for that. The goal is not to confirm — it's to discover what you don't know yet.

---

## The Three Layers of Market Research

Think of this as three concentric rings. You start wide and get sharper.

```
┌──────────────────────────────────────────┐
│            Market Landscape              │  ← Is there a real market here?
│   ┌──────────────────────────────────┐   │
│   │       Competitor Mapping         │   │  ← Who's already winning and why?
│   │  ┌──────────────────────────┐   │   │
│   │  │     Gap Analysis          │   │   │  ← Where is the opening?
│   │  └──────────────────────────┘   │   │
│   └──────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

Each layer informs the next. Do them in order.

---

## Layer 1 — Market Landscape

You're answering: **Is there a real, funded, growing market here, or am I early (or wrong)?**

### Signals of a real market

- Venture-backed competitors exist (money followed demand)
- Job postings reference this problem category
- Subreddits, Slack communities, or Discord servers exist around this pain point
- Users are paying for imperfect solutions (manual workflows, stitched-together tools)
- The category appears in analyst reports from G2, Gartner, Forrester, or CB Insights

### Signals you should be cautious

- No competitors exist at all (markets without competition are usually markets without demand)
- The only discussions you find are from 5+ years ago
- The "market" is a subset of an enterprise tool no one can actually buy
- Users describe the problem as annoying but not painful enough to pay to fix

### Where to actually look

| Source | What You're Finding |
|---|---|
| **G2 / Capterra / Product Hunt** | Existing products, categories, user reviews |
| **Crunchbase / Dealroom** | Funding activity — who's betting money on this space |
| **Reddit / Hacker News** | Organic user pain, tool recommendations, complaints |
| **LinkedIn job postings** | What skills/tools companies are paying for |
| **App stores** | Demand signals in adjacent mobile categories |
| **"Alternatives to X" searches** | Who users are comparing and switching between |

---

## Layer 2 — Competitor Mapping

You're answering: **Who's already solving this, what do they do well, and where do they fail?**

This is not about finding weaknesses to exploit. It's about understanding the competitive landscape accurately enough to position yourself honestly.

### Build your competitor map

For each competitor, capture:

- **What they actually do** (not their marketing — what the product actually does)
- **Who they're for** (enterprise, SMB, indie, specific vertical)
- **What their users love** (read G2 / Trustpilot / Reddit reviews)
- **What their users hate** (this is where openings live)
- **How they price** (freemium, per-seat, usage-based, flat)
- **When they were founded and what they've raised** (maturity signal)

### Competitor tiers

Not all competitors are equal. Know which tier you're in:

<details>
<summary><strong>Tier 1 — Direct Competitors</strong></summary>

Same problem, same user, similar approach. These are the products users will compare you to on day one.

You need to beat them on at least one dimension that your target user cares about more than anything else. Not every dimension — one.

</details>

<details>
<summary><strong>Tier 2 — Indirect Competitors</strong></summary>

Same problem, different user or meaningfully different approach. These are products users might consider instead of you, even if they're not a perfect substitute.

Worth monitoring. Not worth obsessing over at this stage.

</details>

<details>
<summary><strong>Tier 3 — Workflow Competitors</strong></summary>

The manual process, the spreadsheet, the duct-taped integration, the "we just don't do this." These are often your most common actual competition.

If users are paying nothing for their current solution, your pricing conversation is harder than you think.

</details>

---

## Layer 3 — Gap Analysis

You're answering: **Where is the opening, and is it large enough to matter?**

Gaps are not just missing features. The most durable competitive gaps are:

| Gap Type | What It Looks Like |
|---|---|
| **Segment gap** | Competitors serve enterprise; SMBs are underserved |
| **Workflow gap** | Competitors solve step 3; nobody solves steps 1–2 |
| **UX gap** | The market leader is powerful but notoriously hard to use |
| **Price gap** | The best solution costs $500/mo; a $49/mo option doesn't exist |
| **Integration gap** | Nobody connects to the tools your target users actually use |
| **Geographic/language gap** | Product is English-only; your target market isn't |
| **Speed gap** | Existing tools require weeks of setup; nobody has built fast onboarding |

Your gap needs to be:

1. **Real** — users actually experience this friction today
2. **Significant** — painful enough to change tools over
3. **Defensible** — not something a competitor can close in a sprint

A gap only you perceive is not a gap. It's a hypothesis. Validate it with users before committing.

---

## Use AI for Research Acceleration

AI is useful here for synthesizing, not substituting. Use it to process what you find, not to replace finding it.

```prompt
I'm building a SaaS product in the following space:

Value Proposition: [paste yours]
Target User: [describe specifically]
Problem Being Solved: [1–2 sentences]

Help me map the competitive landscape by:

1. Naming the most likely direct competitors (products that exist today solving this)
2. Identifying the main competitor categories or tiers in this space
3. Surfacing the most common user complaints about existing solutions
   (based on your training data — flag anything you're uncertain about)
4. Identifying potential market gaps or underserved segments
5. Flagging any market dynamics I should be aware of
   (consolidation, new entrants, pricing shifts, regulation)

Be specific. If you don't know something, say so rather than speculating.
I will verify everything you produce before relying on it.
```

⚠️ **AI has a training cutoff.** It will not know about products launched recently, recent funding rounds, or live pricing pages. Use AI output as a starting map, then verify every specific claim against live sources.
```

---

```prompt
I'm researching [competitor name] as a direct competitor to my SaaS product.

My product: [value proposition]
My target user: [describe]

Based on what you know about [competitor name]:

1. Who is their primary target customer?
2. What do their users most commonly praise?
3. What do their users most commonly criticize or complain about?
4. How do they typically price?
5. What does their product not do well, or explicitly not support?
6. What segment of users tends to churn away from them, and why?

Flag anything you're uncertain about.
I will cross-reference against G2 reviews and their own documentation.
```

Run this once per Tier 1 competitor. Cross-reference against real G2 reviews — AI summaries of competitor weaknesses are often slightly off in ways that matter.

---

## The User Research Layer

No desk research replaces this. Five conversations will surface things that hours of reading won't.

You're not doing sales calls. You're not pitching. You're learning.

### Who to talk to

Your ICP as defined in your value proposition. If you haven't defined your ICP yet, use this step as preparation for that module.

### What to ask

```
1. Walk me through how you currently handle [problem area].
   (Listen. Don't interrupt.)

2. What's the most frustrating part of that process?

3. Have you tried any tools to help with this? What happened?

4. What would need to be true for you to switch to something new?

5. If you could wave a magic wand and fix one thing, what would it be?
```

Don't ask: "Would you pay for a product that did X?" People say yes to hypotheticals. It tells you nothing.

Do listen for: **frequency, intensity, and money already being spent.** If they describe a problem that happens daily, visibly frustrates them, and they've already paid something to partially solve it — that's signal.

### How many conversations

- **5 conversations** gives you patterns
- **10 conversations** gives you confidence
- **0 conversations** gives you a product nobody asked for

At Phase 0, aim for at least 5 before you move to feature decisions.

---

## What to Do With What You Find

After completing your research, you should be able to answer:

- [ ] I can name my top 3 direct competitors and one specific weakness each has
- [ ] I know the primary reason users leave those competitors (or wish they could)
- [ ] I've identified the gap my product occupies in the landscape
- [ ] I've spoken to at least 3 real potential users and heard the problem described in their words
- [ ] I know whether my target segment is growing, stable, or declining
- [ ] I've confirmed my value proposition still makes sense after research (or updated it)

If your research has changed your value proposition, that's a success — not a failure. Update it before continuing.

---

## A Common Pattern Worth Knowing

The most durable SaaS companies often follow one of these research-derived positioning moves:

**"The focused alternative"** — Take a bloated tool your users are forced to use and solve the 20% they actually need, at a fraction of the price and complexity. (Basecamp vs. enterprise PM tools. Linear vs. Jira.)

**"The vertical specialist"** — Take a horizontal tool and rebuild it for one industry with the specific workflows, integrations, and language that industry needs. (Toast vs. Square for restaurants.)

**"The next-tier unlock"** — Take a capability only enterprises can afford and make it accessible to SMBs or solopreneurs. (Klaviyo vs. Salesforce Marketing Cloud.)

None of these are guaranteed to work. But they're all discoverable through honest market research — and they're all harder to defend if you skip it.

---

## Quick Reference

```
Market Research Checklist
────────────────────────────────────────────────
□ Identified 3+ direct competitors
□ Mapped competitor strengths and weaknesses
□ Identified the gap your product occupies
□ Confirmed the market is funded / active / growing
□ Completed 5+ user conversations
□ Heard the problem described in users' own words
□ Validated (or updated) your value proposition
□ Identified which competitor tier you're entering
```
Gap Types to Look For
────────────────────────────────────────────────
Segment   →  Underserved user group
Workflow  →  Unsupported part of the process
UX        →  Powerful but painful to use
Price     →  No accessible mid-market option
Integration → Missing connections to key tools
Speed     →  Slow onboarding or time-to-value
```
