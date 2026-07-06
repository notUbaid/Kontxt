---
title: App Store Optimization
slug: app-store-optimization
phase: Phase 5
mode: production
projectType: mobile-app
estimatedTime: 25–30 min
filename: app-store-optimization-production-mobile-app.md
---

App Store Optimization (ASO) is SEO for app stores — and it determines whether real users ever discover your app at all, regardless of how good the product is. A great app with no ASO strategy is invisible next to a mediocre competitor that ranks for the searches your future users are actually typing.

## How Store Search Actually Ranks Apps

Both stores weigh similar core signals, though the exact mechanisms differ:

| Signal | iOS | Google Play |
|---|---|---|
| Keyword relevance | App name, subtitle, keyword field | App name, short/full description |
| Conversion rate | Strong factor | Strong factor |
| Ratings & reviews | Factor | Factor |
| Download velocity | Factor | Factor |
| Retention/engagement | Indirect factor | Indirect factor |

> **Best Practice:** ASO isn't a one-time setup — it's an ongoing loop of keyword research, listing updates, and measuring what actually moves rankings and conversion. Treat your first submission as a starting point, not a finished asset.

## Keyword Research

Don't guess at keywords — research what your actual target users search for.

- Start with terms describing your core function (what the app *does*), not abstract brand language
- Check what keywords competitors rank for — store listing analysis tools (App Radar, Sensor Tower, AppFollow) show this directly
- Prioritize keywords with real search volume but where you can realistically rank — competing directly for the highest-volume generic term in your category against established apps rarely works for a new listing
- Long-tail, specific phrases often convert better and are easier to rank for than broad single-word terms

> **Tip:** Search your candidate keywords yourself in each store and look at who currently ranks. If it's all major, established apps, that keyword is a long-term target, not a launch-week win — prioritize where you can realistically break in now.

## Where Keywords Actually Go

| Field | Platform | Weight |
|---|---|---|
| App name | Both | Highest |
| Subtitle (iOS) | iOS | High |
| Keyword field (100 chars, hidden) | iOS | High |
| Short description | Android | High |
| Full description | Both | Moderate, especially first few lines |

On iOS, the hidden 100-character keyword field is pure ASO real estate — no commas needed (the field is comma-separated already), don't repeat words already in your app name/subtitle (wasted characters), and don't include competitor brand names (against guidelines and ineffective).

On Android, since there's no hidden keyword field, your short and full descriptions carry more of the keyword weight directly — write them for both humans and search relevance simultaneously.

## Conversion Rate Optimization

Ranking gets you seen; conversion rate determines whether being seen turns into downloads. The store listing assets from earlier modules in this phase are your primary CRO levers:

- [ ] First screenshot communicates value in under 2 seconds (Screenshots module)
- [ ] Icon is distinctive and reads clearly at small size (App Icons module)
- [ ] Short description / subtitle states the core value proposition immediately, not buried after generic boilerplate
- [ ] Ratings and reviews are actively managed (see below) — social proof directly affects conversion

## Ratings and Reviews Strategy

- Prompt for ratings at a moment of demonstrated value (after a successful core action), never immediately on first open
- Use the platform's native review prompt API (`SKStoreReviewController` on iOS, Play In-App Review API on Android) — these respect platform-level rate limits and feel less intrusive than a custom dialog
- Respond to reviews, especially negative ones — this is visible to future users browsing the listing and signals an actively maintained app
- Never incentivize reviews (offering rewards for ratings) — this violates both platforms' guidelines and risks listing removal

## Localization as an ASO Lever

If you have or expect users in non-English-speaking markets, localizing your store listing (not just keywords — full description, screenshots, feature graphic) is one of the highest-leverage ASO investments available, since you're often competing against far fewer optimized listings in that locale.

## Measuring and Iterating

ASO isn't "set once at launch." Both stores provide conversion funnel data (impressions → product page views → installs) — use it:

- Track conversion rate at each funnel stage, not just total downloads
- A/B test icon, screenshots, and descriptions where the platform supports it (Google Play has native listing experiments; iOS requires Product Page Optimization in App Store Connect)
- Re-evaluate keyword targets periodically — competitor rankings and search volume shift over time, this isn't a "set at launch" task

## Using AI Here

```
Help me with ASO keyword research for this app.

App function: [one sentence — what it actually does]
Target users: [who searches for this kind of app, and what they'd likely type]
Category: [App Store / Play Store category]
Known direct competitors: [list 2-3]

Generate:
- 15-20 candidate keywords/phrases ranging from broad to long-tail
- A prioritized shortlist of 5-8 realistic to target at launch (not the highest-competition broad terms)
- Suggested app name/subtitle/short description incorporating top keywords naturally, not stuffed
```

> **Validation:** AI-suggested keywords are a research starting point, not a verified ranking strategy — confirm actual search volume and current competitor rankings for suggested terms using a real ASO tool or direct in-store search before committing your limited keyword field characters to them.

## Common Mistakes

- Treating ASO as a one-time launch task instead of an ongoing process
- Keyword-stuffing descriptions in a way that reads poorly to actual humans, hurting conversion even if it helps discovery
- Targeting only high-competition broad keywords with no realistic path to ranking
- Prompting for ratings at the wrong moment (immediately on open) instead of after demonstrated value
- Ignoring Android's short/full description as keyword real estate since there's no separate hidden field like iOS
- Never revisiting keyword strategy after initial launch

## Before You Move On

- [ ] Keyword research is based on actual search behavior and competitor analysis, not guesses
- [ ] App name, subtitle/short description, and keyword fields are optimized without being unreadable to humans
- [ ] Native in-app review prompts are wired to trigger after demonstrated value, not on first open
- [ ] A plan exists to monitor conversion funnel data and iterate post-launch
- [ ] Localization has been considered if targeting non-English markets

Next: **Privacy Policy** — the legal document both stores require before your listing can go live.
