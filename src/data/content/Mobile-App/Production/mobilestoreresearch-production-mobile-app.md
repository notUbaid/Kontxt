---
title: Store Research
slug: store-research
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
---

# Store Research

The App Store and Play Store are the most honest market research tools you have access to. They show you exactly what users search for, what they download, what they pay for, and what makes them angry enough to leave a public review.

Most founders treat store research as a pre-launch checklist item. Treat it as a pre-build intelligence operation instead. What you learn here changes what you build, not just how you submit it.

---

## What Store Research Reveals

| Signal | What it tells you |
|---|---|
| Search rankings | What words users use to describe their problem |
| Top charts | What's working in your category right now |
| Review sentiment | Where existing solutions are failing |
| Rating distribution | How polarizing vs. universally loved apps are |
| Update frequency | Which competitors are actively investing vs. coasting |
| Screenshots and descriptions | What value propositions the market responds to |
| In-app purchase listings | What users will actually pay for |

---

## Phase 1: Category Mapping

Start by mapping your category from the store's perspective — not your own.

**On the App Store:**
1. Go to the App Store → Browse → Categories
2. Find your primary category (e.g. Productivity, Health & Fitness, Finance)
3. Open Top Free, Top Paid, and Top Grossing charts
4. Screenshot the top 20 in each chart

**On the Play Store:**
1. Go to Google Play → Apps → [Your Category]
2. Check Top Free, Top Grossing, and Trending
3. Note apps that appear in multiple lists — these are the strongest signals

**What to record:**
- Which apps appear in both Free and Grossing (they convert well)
- Which apps are new entrants in the top charts (recent launches that broke through)
- Whether the category is dominated by one or two incumbents or is fragmented

A fragmented category (many apps, no dominant player) is easier to enter. A consolidated category (one app with 10x the downloads of the next) requires either a clearly differentiated niche or an acquisition of the #2 player's disgruntled users.

---

## Phase 2: Keyword Intelligence

Users find apps through search. The words they search are the words they use to describe their problem. These matter more than your internal product vocabulary.

**Manual keyword research:**

Type your core problem into the App Store search bar. Don't press enter yet. Screenshot the autocomplete suggestions — these are real search queries sorted by volume.

```
Example: building a budgeting app
Type: "budget" → autocomplete shows:
  budget tracker
  budget planner
  budgeting app
  budget manager
  budget calculator
  ...
```

Each suggestion is a keyword with real search volume. The order is roughly by popularity.

**What to extract:**
- The exact phrasing users prefer ("tracker" vs "manager" vs "planner")
- Modifier words that reveal intent ("simple budget", "family budget", "business budget")
- Problem-focused vs. solution-focused queries ("save money" vs "expense tracker")
- Branded searches (competitors showing up as search suggestions)

**Cross-reference with Play Store:**
Search terms often differ between platforms. iOS users and Android users can have different vocabulary for the same problem. Research both.

---

## Phase 3: Competitor Store Page Analysis

For each direct competitor identified in your Competitor Analysis, study their store page as a product.

A store page is the highest-stakes copywriting in your competitor's product. They've A/B tested it, optimized it, and it reflects what messaging drives downloads.

### Screenshots
Store screenshots are a competitor's sales pitch in visual form.

- What does the first screenshot show? (This is their #1 value claim)
- What features do they highlight vs. ignore?
- Do they lead with UI or with outcome/benefit?
- What language appears in screenshot headlines?

### Description
- What problem do they lead with?
- What's their top feature list?
- What social proof do they use (awards, press mentions, user counts)?
- What keywords appear naturally in the text? (This reveals their ASO strategy)

### Ratings and Review Patterns
- Overall rating
- Total review count (indicates maturity of the product)
- Rating breakdown (what % are 1-star vs 5-star)
- Most recent reviews vs. historical reviews (is satisfaction improving or declining?)
- Developer response pattern (do they engage with reviews? what tone?)

---

## Phase 4: Review Mining for Market Intelligence

Store reviews are unfiltered user research from your competitors' customers. Mine them systematically.

**Filter strategy:**

| Filter | What you learn |
|---|---|
| 3-star, recent | "Almost good enough" — the highest-signal dissatisfaction |
| 1-star, recent | Dealbreakers and bugs that drive churn |
| 5-star, recent | What users love most — your table stakes |
| All stars, oldest | What the app used to do well that may have regressed |

**Patterns to identify:**
- Recurring feature requests (appear in 5+ reviews = real demand)
- Recurring complaints (appear in 5+ reviews = market gap)
- Specific use cases mentioned (reveals actual user jobs-to-be-done)
- Comparisons to other apps ("better than X", "not as good as Y")
- Churned users explaining why they're leaving ("used to be great until...")

**Volume thresholds:**
An app with 500 reviews has more signal than an app with 50. An app with 50,000 reviews has noise mixed with signal — focus on recency and the 3-star band.

---

## Phase 5: Monetization Intelligence

The In-App Purchase section of any store listing is a competitor's pricing strategy made public.

**What to record:**
- Free vs. freemium vs. paid upfront
- Subscription price points (weekly, monthly, annual)
- One-time unlock prices
- What's specifically behind the paywall (if disclosed)
- Trial length and structure

**Category pricing norms:**
Understanding the pricing range in your category tells you what users are conditioned to pay. Charging 3x the category norm requires either a dramatically better product or a different target customer.

| Category | Typical monetization |
|---|---|
| Productivity | $2.99–$9.99/month subscription or one-time $5–$20 |
| Health & Fitness | $9.99–$19.99/month or $49.99–$99.99/year |
| Finance | Free with premium at $4.99–$12.99/month |
| Games | Free with IAP or $0.99–$4.99 upfront |
| Utilities | One-time $1.99–$9.99 or subscription $0.99–$2.99/month |

---

## Platform Differences to Note

The App Store and Play Store are different markets with different user behavior.

| Dimension | App Store (iOS) | Play Store (Android) |
|---|---|---|
| Willingness to pay | Higher | Lower |
| Review culture | Less frequent, higher stakes | More frequent, lower average |
| Update approval | Review required (1–2 days typical) | Faster rollout, staged releases |
| Search behavior | More discovery-oriented | More intent-driven |
| Refund policy | Manual review by Apple | 2-hour self-serve refund |
| Sideloading | Not available (standard) | Available — impacts piracy |

If your monetization depends on subscription revenue, iOS users typically convert at higher rates. If your growth depends on volume and distribution, Android's larger global market share matters.

---

## What to Document

At the end of store research, you should have:

**Category snapshot**
Top 10 apps in your category with ratings, download estimates, and monetization model.

**Keyword map**
20–40 search terms users use, grouped by intent and volume estimate.

**Review intelligence brief**
Top 5 complaints and top 5 praises across your 3 main competitors, drawn from actual reviews.

**Pricing map**
The full range of price points in your category, what each tier unlocks, and where the market clusters.

**Store page swipe file**
Screenshots of competitor store pages — especially first screenshots and main descriptions.

---

## AI Prompt — Store Research Synthesis

Use after you've collected raw store data manually:

```
I am building a [describe your app in one sentence] for [target audience].

I've researched the following apps in my category:
[List app names, their ratings, review counts, and price points]

Key reviews I found across these apps:
[Paste 15–20 representative reviews — mix of 1, 3, and 5 stars]

Keywords I found in App Store autocomplete for my category:
[List your keyword findings]

Synthesize this store research into:
1. A ranked list of the top 5 market gaps (complaints that appear across multiple apps)
2. The 3 most important user jobs-to-be-done based on review language
3. The search terms I should prioritize for my app's title and subtitle
4. The pricing approach that is most likely to work given category norms
5. The single strongest claim I could make in my first App Store screenshot, based on what users actually say they want
6. What my store page should NOT emphasize (things users don't respond to in this category)

Ground every recommendation in the specific reviews and data I provided.
```

---

## Carrying This Forward

Store research feeds three modules directly:

**Feature Prioritization** — review mining reveals which features users care about enough to mention in public reviews. Features nobody mentions in reviews are rarely table-stakes.

**Monetization Strategy** — pricing norms and what users pay for in similar apps sets your monetization foundation.

**App Store Optimization (Phase 5)** — the keywords and screenshot patterns you document now are the foundation of your ASO strategy at launch.

Don't discard this research after Phase 0. The competitor store pages and review data are reference material for decisions made throughout the entire build.
