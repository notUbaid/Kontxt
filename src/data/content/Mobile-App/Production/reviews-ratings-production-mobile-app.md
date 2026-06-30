---
title: Reviews & Ratings
slug: reviews-ratings
phase: Phase 6
mode: production
projectType: mobile-app
estimatedTime: 15–20 min
filename: reviews-ratings-production-mobile-app.md
---

Star ratings and reviews are one of the few growth levers you don't pay for directly — and one of the strongest conversion signals on your store listing, since prospective users see them before reading anything else you've written. A deliberate ratings strategy compounds; an accidental one (random prompts, no review monitoring) leaves real growth on the table.

## Why This Connects Directly to ASO

This builds on the App Store Optimization module: ratings and review velocity are both direct ranking signals and the conversion factor most likely to override everything else on your listing. A 4.8-star app with 50 reviews can lose to a 4.2-star app with 5,000 reviews in a user's actual decision — volume and recency matter alongside the raw average.

> **Best Practice:** Don't treat ratings as something that just happens passively. A deliberate prompt strategy, timed well, meaningfully increases both volume and average score — because you're asking satisfied users at the right moment, not catching everyone randomly.

## When to Ask

Timing is the single highest-leverage decision in your ratings strategy.

- [ ] Prompt after a clear moment of demonstrated value — right after a user completes a core action successfully, not on first open or at a random interval
- [ ] Avoid prompting right after a negative experience (an error, a failed action, a crash) — obvious in principle, but easy to miss if the prompt is on a simple fixed timer rather than triggered by actual context
- [ ] Space repeat prompts appropriately — both platforms enforce native rate limits on how often you can show the system prompt regardless of how often you call it, so don't rely on hammering the API; design for a few well-placed prompts over the user's lifecycle

> **Tip:** A good pattern: track a lightweight internal "happiness signal" (e.g., user just hit a streak, completed a milestone, used the app N times successfully) and trigger the prompt off that signal rather than a fixed day count.

## Always Use Native APIs

- **iOS**: `SKStoreReviewController` (or its SwiftUI equivalent) — shows Apple's native in-app rating prompt without leaving the app
- **Android**: Play In-App Review API — same principle, native Google Play prompt

> **Warning:** Building a custom "Rate Us" dialog that links out to the store listing is worse on every dimension — more friction (leaves the app), no native rate-limiting protection so you can over-prompt, and lower conversion than the native in-app flow. Always use the platform-native API.

## Filtering Before You Prompt (Carefully)

A common pattern is a pre-screen: ask "Are you enjoying the app?" before triggering the native prompt, routing happy users to the store prompt and unhappy users to a private feedback form instead.

- This can improve average rating, but both platforms have guidelines around manipulating the review flow — review current guidelines before implementing, since policy in this area has tightened over time
- If you do this, the private feedback path needs to genuinely route to your team and get acted on — a feedback form that goes nowhere just suppresses signal without fixing anything

## Responding to Reviews

This is visible to every future user browsing your listing — it's public-facing customer support, not a private channel.

- [ ] Respond to negative reviews, especially ones describing a real bug or issue — acknowledge specifically, and follow up once it's fixed if you have a way to reach that user
- [ ] Respond to positive reviews occasionally too, especially detailed ones — it signals an actively maintained, attentive team to anyone reading the thread
- [ ] Never respond defensively or argumentatively — a defensive public response to a critical review reads worse to prospective users than the original review did
- [ ] Use review responses as a genuine bug-detection channel — patterns across multiple reviews mentioning the same issue are a real signal worth prioritizing

## What's Against the Rules

- Never incentivize ratings (offering in-app rewards, discounts, or unlocked content for leaving a review) — both platforms explicitly prohibit this and can remove your app for violations
- Never use fake or purchased reviews — both platforms actively detect and penalize this, with consequences ranging from listing removal to account termination
- Never gate core functionality behind a rating prompt — this creates resentment and risks policy violation as a dark pattern

## Monitoring as a Product Signal

Reviews aren't just a marketing metric — they're a free, ongoing source of qualitative product feedback that complements your quantitative Analytics data.

- [ ] Periodically review recent ratings/reviews for recurring themes, not just the aggregate star average
- [ ] Cross-reference review complaints against crash/error data (from Observability) — a spike in negative reviews mentioning crashes often correlates with a specific release version
- [ ] Track rating trend over time by app version, since a regression in a specific release should show up here alongside your crash-free rate metric

## Using AI Here

```
Help me design a ratings prompt strategy for this app.

App core function: [one sentence]
Candidate "happiness signal" moments: [list 2-4 points in the user journey that indicate satisfaction]
Current rating/review volume: [if available]

Suggest:
- The best trigger moment(s) to fire the native rating prompt
- A reasonable minimum interval between prompts per user
- Whether a pre-screen ("are you enjoying this?") makes sense for this app type, and current
  platform guideline considerations if so
```

> **Validation:** Verify any AI suggestion involving a pre-screen review-routing pattern against the current, actual App Store Review Guidelines and Play Console policies before implementing — these guidelines have changed over time and AI's knowledge of the current rules may be outdated.

## Common Mistakes

- Prompting for ratings immediately on first open or on a fixed timer regardless of context
- Building a custom rating dialog instead of using native platform APIs
- Incentivizing or gating features behind ratings, risking policy violation
- Never responding to reviews, missing both a trust signal and a feedback channel
- Treating ratings purely as a vanity metric instead of cross-referencing with crash/error data by version
- Over-prompting, ignoring that both platforms already rate-limit the native dialog for good reason

## Before You Move On

- [ ] Native rating APIs (SKStoreReviewController / Play In-App Review) are wired to a genuine happiness-signal trigger, not a fixed timer
- [ ] No incentives or feature-gating are tied to leaving a rating
- [ ] A process exists to review and respond to new reviews, especially negative ones describing real issues
- [ ] Rating trends are monitored by app version, cross-referenced against crash/error data
- [ ] Any pre-screen review-routing pattern has been checked against current platform guidelines

Next: **User Feedback** — building a structured channel for input beyond what store reviews alone provide.
