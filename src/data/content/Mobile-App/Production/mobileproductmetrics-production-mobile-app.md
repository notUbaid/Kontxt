---
title: Product Metrics
slug: product-metrics
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 20–25 min
---

# Product Metrics

Metrics are not a post-launch concern. The metrics you decide to track now determine the instrumentation you build, the analytics events you fire, and whether you'll have the data to make good decisions after launch.

Defining metrics before you build also forces clarity about what success actually means. "Users love it" is not a metric. "Day-7 retention is above 30%" is a metric.

---

## The Metric Hierarchy

Not all metrics are equal. Structure them in layers so you always know what matters most.

```
North Star Metric
      │
      ├── Primary Metrics (3–5)
      │     └── These move the North Star
      │
      └── Supporting Metrics (diagnostic)
            └── These explain why Primary Metrics moved
```

### North Star Metric

Your North Star is the single number that best captures whether your product is delivering value at scale.

It must be:
- Directly tied to user value (not revenue, not downloads)
- Measurable with your current stack
- Moveable by your team's actions
- A leading indicator of long-term health

| App type | North Star candidate |
|---|---|
| Habit tracker | Weekly active streaks (users with 3+ completions this week) |
| Budgeting | Monthly active trackers (users who logged ≥1 transaction this month) |
| Language learning | Weekly lessons completed per active user |
| Fitness | Workouts logged per user per week |
| Marketplace | Successful transactions per month |
| Social | Posts created per DAU |

**Choose one. Commit to it.** Teams that track 15 "north star" metrics track none of them seriously.

---

## The Metric Categories

### Acquisition Metrics
How users find and download your app.

| Metric | Definition |
|---|---|
| Downloads | Total installs per period |
| Organic download rate | Downloads from search / browse (no paid) |
| Paid CAC | Cost to acquire one installing user |
| Install source breakdown | % from Search / Browse / Referral / Paid |
| Store page conversion | Impressions → downloads |

Acquisition metrics tell you whether your distribution is working. They don't tell you whether your product is working.

### Activation Metrics
Whether new users reach their first moment of value.

| Metric | Definition |
|---|---|
| Onboarding completion rate | % who finish onboarding flow |
| Time to first core action | Minutes from install to first meaningful action |
| Day-1 retention | % who return the day after install |
| Activation rate | % who complete your defined activation event |

**Define your activation event explicitly.** This is the specific action that signals a user has understood and experienced your core value. For a habit tracker: "completed first habit." For a budgeting app: "logged first transaction." For a language app: "completed first lesson."

Users who activate have dramatically higher retention than those who don't. Your onboarding exists to drive activation.

### Retention Metrics
Whether users keep coming back.

Retention is the most important signal of product-market fit in a mobile app.

| Metric | Definition | Benchmark (consumer apps) |
|---|---|---|
| Day-1 retention | % return day after install | > 40% good, > 25% minimum |
| Day-7 retention | % return 7 days after install | > 20% good, > 10% minimum |
| Day-30 retention | % return 30 days after install | > 10% good |
| Weekly active users (WAU) | Unique users active in a 7-day window | — |
| Monthly active users (MAU) | Unique users active in a 30-day window | — |
| DAU/MAU ratio (stickiness) | Daily actives as % of monthly actives | > 20% good, > 50% exceptional |

**Retention benchmarks vary significantly by category.** A meditation app used daily is held to a higher standard than a travel app used quarterly. Know your category's typical retention before judging your numbers.

### Engagement Metrics
What users do when they're in the app.

| Metric | Definition |
|---|---|
| Session length | Average time per session |
| Sessions per user per day/week | Frequency of use |
| Core action completion rate | % of sessions including the core action |
| Feature adoption rate | % of users who use a specific feature |
| Crash-free session rate | % of sessions without a crash |

Session length alone is a poor metric — it can be high because users love the app or because they're confused. Pair it with core action completion rate.

### Revenue Metrics
Whether your monetization is working.

| Metric | Definition |
|---|---|
| Free → paid conversion rate | % of free users who subscribe |
| Trial → paid conversion rate | % of trial users who convert |
| Monthly recurring revenue (MRR) | Subscription revenue per month |
| Average revenue per user (ARPU) | MRR ÷ total active users |
| LTV (lifetime value) | Avg revenue per paying user over their lifetime |
| Monthly churn rate | % of paying users who cancel each month |
| Annual plan mix | % of subscribers on annual vs monthly |

### Health Metrics
Whether the app is stable and trustworthy.

| Metric | Definition | Target |
|---|---|---|
| Crash-free rate | % of sessions without crash | > 99.5% |
| ANR rate (Android) | App not responding errors | < 0.47% (Play Store threshold) |
| App store rating | Current average rating | > 4.5 |
| p95 load time | 95th percentile screen load time | < 3s |
| API error rate | % of API calls returning errors | < 1% |

Health metrics are the floor. Everything else assumes a stable, functional app.

---

## The Metrics Dashboard

Before launch, decide which metrics you will review and at what cadence.

| Cadence | Metrics | Purpose |
|---|---|---|
| Daily | Crashes, ANR rate, store rating, downloads | Catch problems immediately |
| Weekly | Retention (D1, D7), activation rate, MRR, churn | Track product health |
| Monthly | D-30 retention, LTV, ARPU, feature adoption | Strategic assessment |
| Quarterly | North Star trend, cohort analysis, market position | Direction review |

Weekly is the most important cadence. Daily is for incident response. Monthly is for perspective.

---

## Defining Your Analytics Events

Every metric requires specific events to be fired in your code. Define these before building so they're instrumented from day one — not retrofitted.

**Core events every mobile app must track:**

```
app_opened              { source: 'notification' | 'organic' | 'deep_link' }
onboarding_step         { step: number, step_name: string }
onboarding_completed    { duration_seconds: number }
account_created         { method: 'email' | 'google' | 'apple' }
[core_action]_completed { ...relevant properties }
paywall_viewed          { trigger: string, plan_shown: string }
subscription_started    { plan: string, trial: boolean }
subscription_cancelled  { reason?: string, days_active: number }
notification_received   { type: string }
notification_opened     { type: string }
crash                   { handled by SDK — Sentry / Firebase Crashlytics }
```

**Naming conventions:**
- `object_action` format: `habit_completed`, `budget_added`, `lesson_started`
- Past tense for completed events: `_completed`, `_created`, `_viewed`
- Consistent property names across events: always `user_id`, never mix with `userId`

---

## Cohort Analysis: The Retention Tool

Aggregate retention numbers hide the most important signal. Cohort analysis shows you how different groups of users retain over time.

A cohort is a group of users who first used your app in the same time period (same week or month).

```
            Week 0  Week 1  Week 2  Week 3  Week 4
Jan cohort:  100%    42%     28%     22%     19%
Feb cohort:  100%    38%     25%     20%     17%
Mar cohort:  100%    51%     35%     29%     26%  ← product improvement visible
```

When you make a product change, cohort analysis shows whether new users retain better than old ones. It's the clearest signal of whether a change worked.

Set up cohort analysis in your analytics tool (PostHog, Mixpanel, or Amplitude) before launch, even if you don't have data yet.

---

## The Metric Trap: Vanity vs. Signal

| Vanity metric | Why it's misleading | Signal instead |
|---|---|---|
| Total downloads | Doesn't indicate retention or value | D-7 retention of download cohort |
| Total registered users | Includes users who never returned | Monthly active users |
| App store impressions | Doesn't indicate interest | Store page conversion rate |
| Average session length | High can mean confused, not engaged | Core action completion rate |
| 5-star reviews | Biased toward power users | Overall rating trend + review volume |

Every metric can be gamed. Pair each metric with a complement that makes gaming it obvious.

---

## AI Prompt — Metrics Framework Design

```
I am building a [describe your app in one sentence].

Core loop: [trigger → action → reward → investment]
Monetization model: [freemium / subscription / one-time]
Target platforms: [iOS / Android / both]
Analytics tools I plan to use: [e.g. PostHog, Mixpanel, Firebase, Amplitude]

Design my metrics framework:

1. Recommend my North Star metric with reasoning tied to my specific core loop
2. Define my activation event — the specific action that signals a user has experienced core value
3. List 5 primary metrics I should track weekly, with benchmarks for my category
4. List the 10 most important analytics events I need to instrument, with their properties
5. Define what "product-market fit signal" looks like for my app — the specific metric pattern that would confirm I've found it
6. Identify the single metric most likely to mislead me (high but not meaningful) and what to track instead

Keep recommendations specific to my app type and monetization model.
Don't list generic metrics — every metric should have a direct connection to a decision I'd make based on it.
```

---

## The Pre-Launch Metrics Checklist

- [ ] North Star metric defined and understood by everyone building the app
- [ ] Activation event defined (the specific action that signals value experienced)
- [ ] Analytics SDK integrated (PostHog / Mixpanel / Amplitude / Firebase)
- [ ] Core analytics events list finalized and instrumented
- [ ] Crash reporting integrated (Sentry / Firebase Crashlytics)
- [ ] Retention tracking confirmed working (test with a fake user cohort)
- [ ] Revenue tracking connected (RevenueCat → analytics integration)
- [ ] Weekly metrics review cadence and owner established
- [ ] Baseline benchmarks documented (what good looks like for your category)
- [ ] Cohort analysis configured in your analytics tool

Metrics you don't instrument before launch, you don't have after launch. Data gaps are permanent — you can't reconstruct historical behavior you didn't capture.
