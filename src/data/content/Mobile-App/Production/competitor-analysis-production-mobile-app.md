---
title: Competitor Analysis
slug: competitor-analysis
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 30–45 min
---

# Competitor Analysis

Most founders skip this or do it wrong — a quick Google search, a list of app names, and a vague sense that "we're different." That's not analysis. That's confirmation bias.

Real competitor analysis tells you three things: what the market already expects, where existing solutions are failing users, and what your actual differentiation window is. Do this badly and you build something the market already solved. Do it well and you know exactly which gap to aim at.

---

## Why This Shapes Your Product

Your competitors have already run experiments you haven't. Their reviews are a free dataset of user frustration. Their store rankings tell you what acquisition channels work. Their pricing tells you what users will pay.

Ignoring this means:

- Building features users already get elsewhere
- Missing the one thing that would make users switch
- Pricing wrong from day one
- Targeting a positioning that's already crowded

You're not looking for permission to build. You're building a map of the terrain before you move through it.

---

## Who to Analyze

Competitors are not just the obvious direct alternatives. Map all three tiers.

### Direct Competitors
Apps that do exactly what yours does, targeting the same users.

These are your primary threat and your richest source of learning.

### Indirect Competitors
Apps that solve the same underlying problem differently — a different format, different platform, different audience.

Users comparing you to these. Understand why they choose them.

### Status Quo
What users do today if neither you nor your direct competitors exist.

Spreadsheets. Paper. WhatsApp groups. Calendar reminders. Nothing at all.

If your app doesn't beat the status quo convincingly, the best competitor analysis in the world won't save you.

---

## Where to Find Competitors

Don't trust your memory. Search for them.

**App Store / Play Store:**
- Search your core problem statement (not your solution name)
- Check "Customers Also Bought" and "Similar Apps" sections
- Search category → Top Charts
- Search keywords your users would type

**Web:**
- "[problem] app"
- "[problem] mobile app [year]"
- "best apps for [problem]"
- ProductHunt: search your category, filter by mobile

**Reddit:**
- r/[your niche] — what apps do members recommend?
- Search: "app for [problem]" within relevant subreddits

**App Intelligence Tools (optional):**
- Sensor Tower, AppFollow, AppMagic — for download estimates and keyword data
- data.ai (App Annie) — market share, category rankings

Aim for 3–6 direct competitors to analyze deeply. More than 8 and you're doing research, not analysis.

---

## The Analysis Framework

For each competitor, extract these signals. Be specific — "good UI" is useless. "Onboarding completes in 3 screens with no account required" is useful.

### Store Presence
- Overall rating and total review count
- Rating trend (improving, declining, or flat)
- Last update date — active or abandoned?
- Downloads estimate (if available)
- Screenshots: what do they lead with? What problem do they advertise?

### First Run Experience
Download and use it as a new user. Document:
- Time to value: how many screens before the core feature is usable?
- What does the onboarding teach vs. assume?
- Is account creation required immediately, or deferred?
- What does the empty state look like?

### Core Feature Set
List what it does — not what it claims. Use it for a week if possible.

### Pricing & Monetization
- Free / freemium / paid upfront?
- What's behind the paywall?
- Price point and trial length
- Aggressive paywall or soft gate?

### Reviews: The Gold Mine
Filter to 3-star reviews. This is where users say "I like it but..." — the highest-signal category.

Then look at recent 1-star reviews. Recurring complaints reveal structural problems.

Look for: recurring words, repeated complaints, specific feature requests, and comparisons to alternatives.

---

## Competitor Matrix

Build this once, refer to it throughout development.

| | **[Competitor A]** | **[Competitor B]** | **[Competitor C]** | **Your App** |
|---|---|---|---|---|
| Rating | | | | |
| Downloads (est.) | | | | |
| Platforms | | | | |
| Monetization | | | | |
| Onboarding depth | | | | |
| Offline support | | | | |
| [Core feature 1] | | | | |
| [Core feature 2] | | | | |
| [Core feature 3] | | | | |
| Biggest praise | | | | |
| Biggest complaint | | | | |
| Last update | | | | |

Fill in your own column with your intended approach — not as a boast, but to make the gaps explicit.

---

## What You're Actually Looking For

### Consistent complaints across multiple apps
If 3 competitors all have 3-star reviews about the same problem — that's a market gap you can own.

### Features that exist everywhere
Table stakes. Users will expect these from you too. Don't treat them as differentiators.

### Things nobody does
Either because it's hard, nobody thought of it, or the market doesn't want it. Distinguish between these carefully.

### Abandoned or poorly maintained competitors
An app with 50k downloads, 3.2 stars, and no update in 18 months is a ready-made user base waiting to switch — if you build something clearly better.

### Pricing anchors
The range of prices in your category sets user expectations. If every competitor is free, paid acquisition is much harder. If the category supports $10–15/month subscriptions, you have pricing room.

---

## Review Mining: The Fastest User Research

You don't have users yet. Your competitors' reviewers are a free proxy.

**Process:**
1. Open the app's reviews sorted by "Most Recent" and "3 stars"
2. Screenshot or copy 20–30 reviews
3. Use AI to categorize them

```
Analyze these app store reviews for [Competitor Name], a [category] app.

Identify:
1. The top 5 recurring complaints (with frequency estimate)
2. The top 5 recurring praises (what do users love most?)
3. Features users specifically request in reviews
4. Comparisons to other apps users mention
5. The single most common reason users give 3 stars instead of 5

Reviews:
[paste reviews here]

Be specific. Quote directly from reviews where possible. Don't generalize.
```

Run this for each major competitor. The output becomes part of your product decisions.

---

## Differentiation: What Actually Matters

After completing the analysis, answer these questions with specificity.

**What will users experience in the first 60 seconds that no competitor offers?**
Not features. Experience. Speed, simplicity, something that surprises them.

**What complaint from a competitor's reviews does your product directly address?**
This is your most credible marketing claim. Users who left a competitor for this reason are your first target segment.

**What will you deliberately not do?**
Scope discipline is strategy. Every feature a competitor built that you skip is complexity you avoid — and potentially a cleaner product.

**Who is the specific type of user you serve better than anyone?**
"Everyone who needs [category]" is not an answer. Narrow it until it's uncomfortable.

---

## Positioning Statement (Draft)

After the analysis, write one sentence:

> **For** [specific user] **who** [specific frustration with alternatives], **[Your App]** **is the** [category] **that** [specific differentiation] **unlike** [competitor or status quo] **which** [specific failure].

This is internal. It sharpens every product decision that follows.

---

## AI Prompt — Deep Competitor Review

```
You are a product strategist performing a competitor analysis for a new mobile app.

My app idea: [describe in 2–3 sentences — what it does and who it's for]

Competitors to analyze:
1. [App name] — [one line description]
2. [App name] — [one line description]
3. [App name] — [one line description]

For each competitor:
1. Based on publicly known information, what is their core value proposition?
2. What is the most common criticism users have (based on known patterns for this type of app)?
3. What demographic do they appear to optimize for?
4. What monetization model do they use and what are its limitations?
5. What would a user who loves this app say is the one thing they can't live without?
6. What would a user who churned say was the dealbreaker?

Then:
7. Identify the single biggest gap across all three competitors that my app could credibly fill
8. Identify one table-stakes feature all three have that I must include at launch
9. Suggest the specific user segment most likely to switch to my app immediately

Be direct. If you don't have reliable information about a specific app, say so rather than fabricating details.
```

---

## What to Carry Forward

From this module, your outputs are:

- A completed competitor matrix
- A shortlist of 3–5 market gaps ranked by opportunity size
- A list of table-stakes features your MVP must include
- A list of recurring complaints you will solve
- A first draft positioning statement

These feed directly into Feature Prioritization and MVP scope. If you skip this work, MVP decisions are guesses. If you do it well, every feature decision has a market rationale.
