---
title: MVP
slug: mvp
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# MVP

MVP is the most misused term in product development.

It does not mean "the app with all the features but buggier." It does not mean "a prototype." It does not mean "whatever we can build in two weeks."

A Minimum Viable Product is the smallest version of your product that delivers enough value to a specific user that they would use it again — and that teaches you whether your core hypothesis is correct.

The emphasis is on *viable*, not *minimum*. Minimum means no unnecessary features. Viable means it actually works for real users.

---

## The MVP Hypothesis

Every MVP is built to test a hypothesis. If you don't know what you're testing, you're not building an MVP — you're just building.

Write your hypothesis explicitly:

> **We believe that** [target user] **experiences** [specific problem] **when they try to** [job to be done].
>
> **We think that** [your core feature] **will solve this because** [your reasoning].
>
> **We'll know we're right if** [specific, measurable success signal] **within** [timeframe].

The success signal is the hardest part. "Users like it" is not measurable. "40% of users who complete onboarding return within 7 days" is measurable. "Users pay for the premium tier within 30 days of signup" is measurable.

If you can't define a measurable success signal, your hypothesis isn't clear enough yet.

---

## The MVP Scope Decision

Your MVP scope should answer one question: **what is the minimum experience that proves or disproves your core hypothesis?**

Everything else is a distraction until that question is answered.

### The Concentric Circles Model

```
          ┌─────────────────────────────────┐
          │         Future Vision            │
          │   ┌─────────────────────────┐   │
          │   │      v2 / v3 Features    │   │
          │   │   ┌─────────────────┐   │   │
          │   │   │   Launch MVP     │   │   │
          │   │   │  ┌───────────┐  │   │   │
          │   │   │  │  Core     │  │   │   │
          │   │   │  │  Loop     │  │   │   │
          │   │   │  └───────────┘  │   │   │
          │   │   └─────────────────┘   │   │
          │   └─────────────────────────┘   │
          └─────────────────────────────────┘
```

**Core Loop** — the single action that delivers your core value. A user does this and immediately understands why the app exists. This cannot be incomplete or broken.

**Launch MVP** — the minimum surrounding experience that makes the core loop usable for a real user. Onboarding, account management, basic settings, error states.

**v2/v3 Features** — everything that would be nice but isn't load-bearing for the hypothesis test.

**Future Vision** — where the product could go, used to guide architectural decisions now.

---

## Defining the Core Loop

Your MVP centers on a single core loop. Map it explicitly.

The core loop is the repeating cycle of actions that delivers value:

```
Trigger → Action → Reward → Investment → (repeat)
```

| App type | Trigger | Action | Reward | Investment |
|---|---|---|---|---|
| Habit tracker | Daily reminder | Mark habit complete | Streak maintained | Adds more habits |
| Budgeting | Expense occurs | Log transaction | See remaining budget | Categorizes spending |
| Language learning | Daily session | Complete lesson | XP + streak | Unlocks next level |
| Fitness | Scheduled workout | Log exercise | Progress toward goal | Sets next workout |

Define your core loop. If a feature doesn't serve this loop, it's not in the MVP.

---

## The MVP Feature Checklist

Work through these questions for every feature in your proposed MVP:

**Does it serve the core loop?**
If it doesn't support the trigger, action, reward, or investment — remove it.

**Would a beta user complain if it was missing?**
Not "would they prefer it" — would they actually stop using the app or not return?

**Can the MVP succeed without it?**
If yes, defer. If no, include it.

**Does it exist to test your hypothesis or to impress investors/stakeholders?**
Impressive features that don't test the hypothesis are scope creep in disguise.

---

## MVP Scope by App Category

Different app categories have different baseline expectations. Your MVP must clear the minimum bar for your category.

### Productivity / Utility
**Must have:** Core action works flawlessly, data persists reliably, basic settings
**Can defer:** Integrations, widgets, collaboration, advanced filters, export

### Health & Fitness
**Must have:** Core tracking mechanic, progress visualization, streak/history
**Can defer:** Social features, wearable integration, advanced analytics, AI coaching

### Social / Community
**Must have:** Create content, see others' content, basic interaction (like/comment)
**Can defer:** Advanced discovery, notifications tuning, DMs, group features

### Marketplace / Commerce
**Must have:** Browse inventory, complete a transaction end-to-end, order history
**Can defer:** Reviews, wishlist, recommendations, seller analytics

### Content / Media
**Must have:** Discover content, consume content, save for later
**Can defer:** Social features, recommendations, offline sync, advanced filters

---

## What "Viable" Actually Means

Viable does not mean polished. It means fit for purpose.

A viable MVP:
- Works on the devices your users have
- Handles errors gracefully (doesn't crash, shows useful error messages)
- Loads fast enough that users don't abandon during load
- Stores data reliably (user data must not be lost)
- Has an onboarding path that gets users to the core loop

A non-viable MVP:
- Crashes on common actions
- Loses user data
- Takes 10+ seconds to load core screens
- Has no path from download to core value
- Requires support to set up

The difference between "rough but viable" and "not viable" is reliability and the existence of a path to value — not visual polish or feature completeness.

---

## MVP Timeline Reality Check

Common scope mistakes that blow timelines:

**Underestimating onboarding**
A good onboarding flow is 2–4 weeks of work. Most teams budget 3 days.

**Underestimating edge cases**
The happy path is 30% of the code. Error handling, offline states, and permission flows are the other 70%.

**Underestimating platform differences**
A feature that takes 2 weeks on iOS often takes 3–4 weeks to bring to parity on Android, or vice versa.

**Adding "just one more thing" in the final week**
The feature that gets added in week 7 of an 8-week build delays launch by 2 weeks. Name the features you're not adding.

**Rule of thumb:** Take your estimated timeline. Double it. That's your actual timeline if you don't cut scope.

Cut scope instead of extending timeline.

---

## Soft Launch vs. Public Launch

Your MVP doesn't have to be launched publicly to everyone. Consider a phased approach:

| Phase | Who has access | What you learn |
|---|---|---|
| Internal testing | Team only | Does it work at all? |
| Closed beta | 20–50 invited users | Is the core loop clear? Does it retain? |
| Open beta | TestFlight / Play Beta | What breaks at scale? What confuses real users? |
| Public launch | App Store / Play Store | Can you acquire users? What does the market say? |

Skipping closed beta means your first real user feedback comes as 2-star reviews.

---

## AI Prompt — MVP Scope Validation

```
I am building a [describe your app in one sentence].

My core hypothesis:
We believe [target user] experiences [specific problem] when they try to [job to be done].
We think [core feature] will solve this.
We'll know we're right if [measurable success signal] within [timeframe].

My proposed MVP feature list:
[paste your prioritized Must Have features]

My target launch: [timeframe]
Team size: [solo / 2 / small team]
Platform: [iOS / Android / both]

Evaluate my MVP scope:
1. Does my feature list actually test my hypothesis, or does it over-build?
2. What is the single riskiest assumption in my hypothesis that the MVP must test?
3. Is there a smaller version of my MVP that would still validate the core hypothesis?
4. What am I missing that would make this non-viable (not just less polished)?
5. What is the most likely scope addition that will appear mid-build and must be pre-rejected?
6. Given my timeline and team size, what should I cut first if I'm behind schedule?

Be direct. Challenge every feature that doesn't directly serve the hypothesis test.
```

---

## The MVP Definition Document

Before writing a line of code, write this document. One page maximum.

```
App Name:
Core Hypothesis:
Target User (specific):
Core Loop (trigger → action → reward → investment):
Success Signal (measurable, with timeframe):

MVP Features (the complete list — nothing added after this):
1.
2.
3.
...

Explicitly Not in MVP:
1.
2.
3.
...

Target Launch Date:
Soft Launch Plan (who gets it first, how):
```

Share this with everyone involved. When someone asks "why doesn't it do X?", the answer is in this document.

The MVP definition is a commitment. Changes require a deliberate decision, not a casual addition.
