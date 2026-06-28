---
title: Competitor Analysis
slug: competitor-analysis
phase: Phase 0
mode: production
projectType: web-app
estimatedTime: 35–50 min
---

# Competitor Analysis

Every product exists in a competitive landscape. Your job is not to pretend competitors don't exist — it's to understand them well enough to make decisions they can't easily copy.

Competitor analysis at this stage is not a market research report. It's a decision-making tool. You're trying to answer one question: **where is the gap that's worth building into?**

---

## The Four Types of Competition

Most founders only look at direct competitors. That's half the picture.

| Type | Description | Example |
|---|---|---|
| **Direct** | Same solution, same user | You build an invoicing tool → FreshBooks, Wave |
| **Indirect** | Different solution, same problem | You build an invoicing tool → Excel spreadsheets |
| **Substitute** | Different problem framing, same user time/budget | You build an invoicing tool → hiring a bookkeeper |
| **Future** | Not competing today but could easily enter | You build an invoicing tool → Stripe adds invoicing |

> [!WARNING]
> Indirect competitors and substitutes are often more important than direct ones. If your user is solving the problem with a spreadsheet today, that spreadsheet is your real competition — not the other SaaS tool they've never tried.

---

## Building Your Competitor Map

Identify 3–8 competitors across all four types. For each one, gather:

```
Competitor: _______________
Type: Direct / Indirect / Substitute / Future
URL: _______________

Target user: Who do they say they're for?
Core value prop: What do they promise in one sentence?
Pricing: Free tier? Starting price? Model (per seat / flat / usage)?
Estimated scale: Users, customers, or funding (public info only)

Strengths (what they do genuinely well):
-
-

Weaknesses (where users complain or churn):
-
-

What your target user says about them:
(from reviews, Reddit, interviews)
```

Do this for each competitor before continuing.

---

## Where to Research Competitors

**Product reviews:**
- G2, Capterra, Trustpilot — read the 3-star reviews, not the 5-star ones. 3-star reviews contain the most actionable signal: "I like it but..."
- App Store / Chrome Web Store reviews if relevant

**Community:**
- Reddit: search `r/[your industry]` + competitor name
- Hacker News: `site:news.ycombinator.com [competitor name]`
- Twitter/X: search competitor name + "alternative" or "switched from"

**Job postings:**
- A competitor's engineering job posts reveal their tech stack and what they're building next
- Product/design job posts reveal their roadmap priorities

**Changelog and release notes:**
- What are they shipping? What problems are they fixing?
- A long list of bug fixes suggests technical debt. A pattern of new features in one area signals strategic direction.

**Pricing pages:**
- What's the free tier limit designed to hit?
- What triggers an upgrade? This tells you what they've learned users actually value.

---

## The Competitive Analysis Matrix

Once you've researched each competitor, map them.

Choose two axes that are meaningful for your specific market. Common pairs:

- **Price** (low → high) vs **Feature depth** (simple → powerful)
- **Ease of use** (technical → non-technical) vs **Customisation** (rigid → flexible)
- **Self-serve** (no touch → high touch) vs **Scale** (individual → enterprise)

Place every competitor on the matrix. Then place where you intend to sit.

```
Example axes: Ease of Use (x) vs Power (y)

High Power
    |
    |  [Competitor B]          [You]
    |
    |        [Competitor C]
    |
    |  [Competitor A]
    |____________________________
    Simple                  Complex
                     Ease of Use
```

> [!TIP]
> If you find yourself crowded into a corner with multiple established competitors, that's a signal — not necessarily to abandon the idea, but to reconsider your differentiation axis. A gap in the matrix is an opportunity. A crowded corner is a fight.

---

## Extracting the Real Insights

Raw competitor data is not useful until you synthesise it into decisions.

**For each insight, ask: what does this mean for what I build?**

**Common patterns and what they mean:**

| Pattern | Implication |
|---|---|
| Every competitor has poor mobile experience | Mobile-first is a real differentiator |
| Users consistently complain about pricing complexity | Simple, transparent pricing is a feature |
| All competitors require setup / onboarding calls | Aggressive self-serve onboarding is a wedge |
| The market leader is slow and enterprise-focused | There's a SMB or prosumer opportunity |
| No competitor has a good API | Developers are underserved |
| Reviews mention slow customer support as top complaint | Responsiveness is a differentiator |

---

## Prompt: Competitor Research Synthesis

```
Copy Prompt
```

```
I'm building a production web app in the [market/category] space.

Here is my target user: [paste your user profile from the previous module]

Here are the competitors I've researched:

[For each competitor, paste:]
Name: 
Type: Direct / Indirect / Substitute / Future
Core value prop:
Pricing:
Strengths:
Weaknesses:
What users say:

Synthesise this competitive landscape for me:

1. Where is the clearest gap in this market — what are users consistently underserved on?

2. What are the top 3 things every competitor does that I must also do to be taken seriously?
   (table stakes — not differentiators)

3. What is the single most defensible position I could take that no current competitor owns?

4. What do the strongest competitors do that I should not try to compete on directly?

5. What is the most dangerous competitive risk — who could enter this space and make my position irrelevant?

Be direct and specific. Do not hedge with "it depends."
```

---

## Competitive Positioning Statement

The output of this module is a single positioning statement that distinguishes you from the competitive landscape.

```
Template:

For [target user] who [problem / frustration with status quo],
[product name] is a [category] that [core differentiator].

Unlike [primary alternative], [product name] [specific advantage].
```

Example:
```
For freelance designers who lose billable hours tracking 
revision requests across email threads and Slack,
Loopmark is a client feedback tool that captures and 
threads revisions directly on design files.

Unlike Notion or spreadsheets, Loopmark keeps feedback 
attached to the exact version it refers to — 
so nothing gets lost and nothing gets misapplied.
```

Write your positioning statement before moving on. It becomes the north star for every product and engineering decision that follows.

---

## Competitor Analysis Checklist

- [ ] At least 3 direct competitors identified and researched
- [ ] At least 2 indirect competitors or substitutes identified
- [ ] 3-star reviews read for top 2–3 competitors (most valuable signal)
- [ ] Competitive matrix drawn with meaningful axes
- [ ] Gap in the market identified and documented
- [ ] Table stakes features listed (what you must have to be credible)
- [ ] Differentiators identified (what you'll do that they don't)
- [ ] Positioning statement written and tested against the matrix
- [ ] Biggest future competitive threat named

---

## What Comes Next

**Unique Selling Proposition** — sharpening your positioning statement into a precise, testable claim about why users should choose you, and how you'll defend that position as you grow.

The work you did here feeds directly into that. Keep your competitor matrix accessible — you'll revisit it when designing your pricing, onboarding flow, and feature roadmap.
