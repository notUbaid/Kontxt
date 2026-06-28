---
title: Feature Brainstorm
slug: feature-brainstorm
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# Feature Brainstorm

Feature brainstorming is not a wishlist session. It's a structured exercise to surface every possible thing your app could do — before you decide what it should do.

The goal here is divergence. Judgment comes in Feature Prioritization. Right now, the only mistake is being too conservative.

---

## Why Brainstorm Before Prioritizing

Most teams jump straight to a feature list that's really just a prioritized list wearing a brainstorm disguise. They anchor on the obvious features, add a few nice-to-haves, and call it done.

Real brainstorming surfaces:
- Features competitors missed that users actually want
- Features that seem obvious only after you say them out loud
- Features that are individually weak but powerful in combination
- Features that reveal whether your core concept holds up

You can't prioritize well without a wide enough pool to choose from.

---

## Brainstorm Dimensions

Work through each dimension separately. Each one unlocks different ideas.

### 1. Core Value Delivery
What are every possible way your app could deliver its core value?

Start with the obvious implementation. Then ask: what if we delivered this value differently? Faster? Passively? Socially? Visually?

> A habit tracker's core value is behavior change. It could deliver this via: daily checklists, streaks, calendar heatmaps, accountability partners, AI coaching, physical reminders, widget pressure, social sharing, journaling, or gamified points.

### 2. Onboarding and First Value
How could the user experience their first "this is useful" moment?

- Immediate utility without setup
- Guided setup that delivers value during onboarding
- Importing existing data to show value instantly
- A demo or preview mode before account creation
- Personalization quiz that creates a tailored experience

### 3. Retention and Re-engagement
What brings users back after day 1, week 1, month 1?

- Streaks and consecutive use rewards
- Progress milestones and celebrations
- Digest notifications ("here's your week in review")
- Social accountability (shared goals, friend challenges)
- Evolving content (new challenges, updated recommendations)
- Widgets that create ambient presence on the home screen
- Scheduled reminders with smart timing

### 4. Social and Sharing
What could users share, compare, or do together?

- Share achievements to social media
- Invite friends to join or compete
- Public profiles or leaderboards
- Collaborative features (shared lists, group goals)
- Referral mechanics
- Community feeds or forums

### 5. Personalization and Intelligence
How could the app adapt to the specific user?

- Onboarding quiz that customizes the experience
- Learning from user behavior over time
- Smart suggestions based on patterns
- AI-powered recommendations or coaching
- Adaptive difficulty or content
- Custom themes, widgets, and layouts

### 6. Data and Insights
What could users learn about themselves or their situation?

- Historical trends and charts
- Weekly or monthly reports
- Comparisons to their own past performance
- Benchmarks against other users (anonymized)
- Predictive insights ("at this rate, you'll achieve X in Y weeks")
- Export capabilities (CSV, PDF, integrations)

### 7. Integrations and Ecosystem
What else in the user's life could your app connect to?

- Health platforms (Apple Health, Google Fit)
- Calendar integration (auto-scheduling, time blocking)
- Wearable devices (Apple Watch, Fitbit, Garmin)
- Third-party apps in adjacent categories
- Smart home / IoT triggers
- Siri Shortcuts / Google Assistant

### 8. Platform-Native Features
What mobile-specific capabilities could enhance the core experience?

- Widgets (home screen, lock screen)
- Live Activities (dynamic island, lock screen updates)
- Complications (Apple Watch)
- Push notifications with rich actions
- Camera or AR features
- Location awareness
- NFC triggers
- Shortcuts and automation

### 9. Accessibility and Inclusion
How could the app serve users who are underserved by competitors?

- Offline-first functionality
- One-handed operation mode
- Screen reader optimization
- Larger text and high contrast modes
- Multilingual support
- Low-bandwidth optimization

### 10. Monetization Features
What features are specifically designed around the business model?

- Premium content or feature tiers
- Team or family plans
- Lifetime purchase option
- Consumable credits
- Marketplace for user-created content
- White-label or B2B version

---

## Structured Brainstorm Format

For each feature idea, capture:

```
Feature name:
One-line description:
User benefit (what problem does it solve?):
Source (competitor gap / user request / original idea):
Rough complexity (S / M / L / XL):
```

Don't filter during capture. Write down everything, including ideas that seem unlikely or too hard.

---

## AI Prompt — Feature Generation

Use this to expand your initial thinking before the structured exercise:

```
I am building a mobile app: [describe your app in 2–3 sentences]

Target user: [describe specifically]
Core problem solved: [one sentence]
Platform: [iOS / Android / both]

Generate an exhaustive feature brainstorm organized by category:
1. Core features (primary value delivery)
2. Onboarding features (path to first value)
3. Retention features (bring users back)
4. Social features (sharing and community)
5. Personalization features (adaptive to the user)
6. Data and insights features
7. Platform-native features (widgets, notifications, watch, shortcuts)
8. Integration features (third-party connections)
9. Monetization features (premium tier, upgrades)
10. Accessibility and edge case features

For each feature:
- Name it clearly
- Describe the user benefit in one sentence
- Flag if a competitor already does this well (table stakes) or if it's a potential differentiator
- Estimate complexity: Low (days), Medium (weeks), High (months)

Push beyond the obvious. Include at least 3 features per category that competitors haven't implemented well.
```

---

## Anti-Patterns to Avoid

**The feature arms race**
Listing every feature a competitor has and adding more. This produces a bloated roadmap, not a focused product.

**Complexity disguised as ambition**
"AI-powered personalized coaching with real-time feedback" sounds visionary. In a brainstorm, it belongs. In planning, it costs 3 months. Flag complexity honestly.

**Only listing features, not mechanics**
A "social leaderboard" is a feature. The mechanic — weekly reset to create urgency, opt-in privacy by default, only show friends not strangers — is what makes it work. In the brainstorm, capture both.

**Ignoring platform constraints**
Some features are significantly harder on one platform. Background processing, Bluetooth, live activities, and widgets all behave differently on iOS vs Android. Note platform constraints during brainstorm so they're visible in prioritization.

---

## Organizing Your Output

After the brainstorm session, group features into buckets:

**Must-explore in MVP**
Features so central to the core value that the app doesn't make sense without them.

**Strong candidates**
Features that clearly improve the product and seem buildable in a reasonable timeframe.

**Interesting but complex**
Features worth revisiting after launch, when you have real user data.

**Intentionally cut**
Features competitors have that you're deliberately not building — document why.

**Future vision**
Features that would be exciting in v2 or v3 but would derail v1.

This organization feeds directly into Feature Prioritization. The brainstorm produces the pool. Prioritization drains it.

---

## The Question That Cuts Through Everything

After the brainstorm, ask this about every feature on your list:

> **Would a user who already loves this app miss this feature if it disappeared tomorrow?**

Features that survive that question belong in the product. Features that don't belong in the backlog.

The goal isn't the longest feature list. It's the sharpest set of features that, together, create something users can't imagine going without.
