---
title: Competitor Analysis
slug: competitor-analysis
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Competitor Analysis

Competitor analysis is not about copying what others do. It is about understanding the landscape well enough to know where you fit — and where you do not.

Builders who skip this step routinely discover their "unique" idea already exists at scale, that they are pricing against a competitor they did not know existed, that their entire value proposition is already commoditised, or that their primary acquisition channel is dominated by a well-funded incumbent. In a production context, these discoveries cost real money if made after launch.

Spend 30 minutes here. It is far cheaper than discovering these things after six months of development.

---

## The Three Competitor Tiers

Not all competitors are equal. Map them across three tiers.

### Tier 1: Direct Competitors
Stores selling the same product category to the same customer.

These are the most important to understand. If your target customer is not buying from you, they are probably buying from one of these. At production scale, you need to understand their SEO strategy, their paid acquisition spend, their product roadmap, and their retention mechanics.

### Tier 2: Indirect Competitors
Stores solving the same customer problem with a different product, or selling the same product to a different customer.

These define the edges of your market. Understand them, but do not over-index on them.

### Tier 3: Substitute Alternatives
The DIY option, the marketplace (Amazon, Etsy), the "just do without it" option.

These are often the most powerful competitors — not because they are better, but because they require the least effort from the customer. For a production store, understanding why customers choose these alternatives (even temporarily) informs your retention and re-engagement strategy.

---

## What to Analyse

For each Tier 1 competitor, document these eight dimensions:

| Dimension | What to look for |
|---|---|
| **Product range** | How many products? How deep? What is missing? |
| **Price points** | What is the low, mid, and high end? |
| **Target customer** | Who are they actually speaking to? Who do they exclude? |
| **Value proposition** | What claim does their homepage make in the first 5 seconds? |
| **UX quality** | Is the store easy to use? Where does it frustrate? |
| **Brand identity** | What feeling does the store create? Trustworthy? Premium? Generic? |
| **Marketing strategy** | Where are they acquiring customers? (SEO, paid social, influencer, email) |
| **Weaknesses** | Where are the gaps? What do customers complain about in reviews? |

> [!TIP]
> The weakness column is gold. Read 1-star and 2-star reviews of your direct competitors on marketplaces. Customers will tell you exactly what the market is not delivering. That is your opening — and your product roadmap input.

---

## Competitor Research Template

Fill this out for your top 2–3 direct competitors.

```
Competitor: [Name / URL]
Tier: [1 / 2 / 3]

Product range:
Price range: $ — $
Target customer (inferred):
Homepage value proposition (copy their exact headline):
UX quality (1–5):
Brand feeling:
Strongest differentiator:
Most obvious weakness:
Acquisition channels (inferred):
Customer complaints (from reviews):
Gap this reveals:
```

---

## The Positioning Map

After analysing your competitors, plot them on a two-axis map. Choose the two axes most relevant to your market.

**Common axis pairs for e-commerce:**

| Axis 1 | Axis 2 |
|---|---|
| Price (budget → premium) | Quality (mass-produced → handmade) |
| Breadth (niche → general) | Audience (specialist → mainstream) |
| Brand (anonymous → strong identity) | Experience (transactional → curated) |

Draw this simply — even a rough sketch works. The goal is to see where white space exists. That white space is where your store lives — and where your initial marketing positioning should focus.

```
         Premium
            │
            │         [Competitor B]
            │
 Niche ─────┼──────────────────── General
            │
 [Your Store?]
            │
         Budget
```

> [!WARNING]
> If your store plots in the same quadrant as a well-funded, established competitor, that is a significant risk — not a dealbreaker, but a reason to sharpen your differentiation significantly before investing in production-scale infrastructure.

---

## Finding the Gap

After mapping the landscape, complete these three statements:

**1. The underserved customer:**
> "Every existing option ignores [specific type of customer] who wants [specific thing]."

**2. The missing experience:**
> "Every existing store in this category treats [X] as an afterthought. We will make it central."

**3. The exploitable weakness:**
> "Customers consistently complain that existing options [specific complaint]. We will solve that directly."

These statements become the backbone of your positioning — and directly inform your homepage copy, your paid acquisition messaging, and your product roadmap priorities.

---

## Competitive Intelligence at Production Scale

Beyond the initial analysis, production stores need ongoing competitive intelligence:

- **SEO monitoring** — Which keywords are competitors ranking for? Where are you uncontested? (Ahrefs, Semrush)
- **Pricing monitoring** — How frequently do competitors change prices? Do they run predictable sale cycles?
- **New product tracking** — What gaps are they filling over time? What categories are they exiting?
- **Review monitoring** — Ongoing tracking of competitor reviews reveals evolving customer complaints

Set up a basic monitoring system before launch so you are not starting blind.

---

## Use AI to Accelerate Competitor Research

```prompt
I am building a production e-commerce store in the following category:

[Your product category and target customer]

Help me research the competitive landscape:
1. Name 5–8 direct competitors I should analyse (mix of large and small, DTC and marketplace)
2. For each, describe: their apparent target customer, their price positioning, and their primary value claim
3. Identify the most common customer complaints in this category (synthesise from what you know about reviews and forums)
4. Identify 2–3 underserved customer segments or unmet needs in this market
5. Identify the primary acquisition channels that appear to be working in this category
6. Suggest the two most useful positioning axes for a map of this market

I will do my own primary research after this — I just want a starting framework to work from.
```

> [!IMPORTANT]
> AI will give you a starting framework, not ground truth. After getting the output:
> - Visit every competitor URL it names — verify the claims
> - Check actual review sites (Trustpilot, Google Reviews, Reddit threads) for real complaints
> - Ignore any competitor AI names that you cannot find or that do not seem relevant
> - Add competitors AI missed that you already know about
> - Use Ahrefs or Semrush free tier to verify SEO claims

---

## What You Are Looking For

After completing your analysis, you should be able to answer:

**Can I name the gap my store fills?**
If yes: proceed. You have a defensible position.
If no: your value proposition may need to be revised before you continue.

**Is the gap real or assumed?**
Real gaps show up in: customer complaints, missing product categories, underserved audiences, poor UX that customers tolerate because no alternative exists.
Assumed gaps feel obvious in your head but lack evidence in the market.

**Is the gap sustainable at production scale?**
A gap that requires you to be cheaper than everyone else to fill it is not sustainable. A gap that requires you to know something, curate something, serve someone better, or build brand equity — that is sustainable.

---

## Validate Before You Move On

- [ ] At least 2 Tier 1 competitors fully analysed using the template
- [ ] Positioning map drawn (even rough)
- [ ] Three gap statements written
- [ ] Real customer complaints found from review sites or community posts
- [ ] Your store's position on the map does not overlap with a dominant competitor
- [ ] You can explain your competitive position in two sentences
- [ ] Primary acquisition channels used by competitors identified

---

> **Next module:** Success Metrics →
>
> Before you build anything, you will define what success actually looks like for this store — in numbers you can measure and track against at scale.
