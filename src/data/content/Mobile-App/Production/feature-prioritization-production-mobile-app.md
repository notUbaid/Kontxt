---
title: Feature Prioritization
slug: feature-prioritization
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# Feature Prioritization

You now have a pool of features. Most of them will not be in v1. Prioritization is the discipline of deciding what to build, in what order, with what resources — and being honest about the tradeoffs.

Unprioritized teams build everything slowly. Prioritized teams build the right things fast and learn whether they're right.

---

## The Core Tension

Every feature you add to v1 has a cost that isn't just development time:

- **Design cost** — every screen needs states, edge cases, and visual design
- **QA cost** — every feature has failure modes to test
- **Maintenance cost** — every feature you ship you must maintain forever
- **Focus cost** — every additional feature dilutes what your app is actually about

The question is never "should we build this eventually?" Almost everything is worth building eventually. The question is "does this need to exist before users can validate the core value?"

---

## Prioritization Frameworks

Use one primary framework. Don't mix them — it produces indecision, not clarity.

### RICE Score (Recommended)

Score each feature on four dimensions, multiply to get a comparable number.

```
RICE = (Reach × Impact × Confidence) / Effort
```

| Dimension | What it measures | Scale |
|---|---|---|
| **Reach** | How many users benefit per time period | Users/month |
| **Impact** | How much does it improve the user's experience | 0.25 / 0.5 / 1 / 2 / 3 |
| **Confidence** | How sure are you about Reach and Impact | 50% / 80% / 100% |
| **Effort** | Engineering time to build | Person-months |

Higher RICE = higher priority.

RICE is most useful when you have multiple competing features and need an objective tiebreaker.

### MoSCoW (Simpler, Faster)

Categorize each feature without scoring:

| Category | Meaning |
|---|---|
| **Must Have** | Without this, the app doesn't work or doesn't make sense |
| **Should Have** | Significant value, expected by users, but not launch-blocking |
| **Could Have** | Nice to have — improves experience but not essential |
| **Won't Have (now)** | Explicitly deferred — not in scope for v1 |

MoSCoW is faster and better for early-stage decisions when you don't have enough data to score confidently.

### Kano Model (For Delight vs. Basics)

Categorizes features by how they affect user satisfaction:

| Type | Description | Example |
|---|---|---|
| **Basic** | Expected — absence causes dissatisfaction, presence is neutral | App doesn't crash |
| **Performance** | More = better satisfaction | Faster load time |
| **Delighter** | Unexpected — presence creates delight, absence is fine | Haptic feedback on completion |

Use Kano to distinguish between features users will complain about if missing (Basic) vs. features that will make them love you (Delighter). Both matter — but they have different priority logic.

---

## The Three-Question Filter

Before any framework, run every feature through three questions:

**1. Does this help the user achieve the core value faster or more reliably?**
If no — it belongs after launch.

**2. Would the absence of this feature cause a user to leave or not download?**
If yes — it's a Must Have.
If no — it's negotiable.

**3. Is this a table-stakes feature in the category (every competitor has it)?**
If yes — it belongs in v1. Shipping without it invites direct comparison failures.
If no — you have freedom to defer or differentiate.

---

## Building Your Priority Matrix

Map features across two axes:

```
High Impact
     │
     │   ◆ Quick wins           Major bets
     │   (high impact,          (high impact,
     │    low effort)            high effort)
─────┼──────────────────────────────────────── High Effort
     │
     │   ▲ Fill-ins             Deprioritize
     │   (low impact,           (low impact,
     │    low effort)            high effort)
     │
Low Impact
```

**Quick wins (◆):** Build these first. High return, low cost.

**Major bets ():** These define your product. Build selectively — only the ones that are truly load-bearing for the core value.

**Fill-ins (▲):** Build when you have capacity after the essentials are solid.

**Deprioritize ():** Remove from v1 scope entirely. If they resurface after launch based on user feedback, revisit.

---

## Mobile-Specific Prioritization Considerations

Mobile apps have constraints that change how features should be prioritized.

### App Store Review Risk
Features that require special App Store review (adult content flags, certain data collection, external payment links) add submission risk. If a feature could delay launch by 2–4 weeks due to review issues, that cost belongs in your effort estimate.

### Platform Feature Parity
If you're shipping on both iOS and Android, every feature must work well on both. Features with significantly different implementation complexity across platforms (widgets, Live Activities, background sync) cost more than they appear. Either prioritize for one platform at launch or budget the cross-platform cost honestly.

### Permission Friction
Features requiring permissions (location, camera, contacts, notifications, health data) add friction. Users deny permission requests they don't understand. Features that depend on a permission the user hasn't granted have unpredictable reach. Factor permission acceptance rates into your Reach estimates.

### Performance Impact
Some features disproportionately affect app performance — background sync, real-time feeds, map rendering, AR. On mobile, performance is a feature. A feature that makes the rest of the app slower is a net negative until the core experience is solid.

---

## What Must Be in v1

Regardless of your app's specific domain, these categories of features must be solid before launch:

**Core value loop**
The primary action users come to do. If this is slow, broken, or confusing, nothing else matters.

**Onboarding path to first value**
Users who don't reach value in the first session don't return. Onboarding isn't a nice-to-have.

**Basic account management**
Login, logout, password reset. Users expect these. A missing password reset causes 1-star reviews.

**Crash-free fundamentals**
Offline graceful degradation, error states, loading states. An app that crashes or shows blank screens on poor network connection reviews as broken.

**Permission request flows**
If your core feature requires a permission, the request must be timed correctly and explained clearly. A denied permission that breaks the core feature at launch is a launch failure.

---

## What to Explicitly Defer

These categories are almost always safe to defer to post-launch:

- Social features (sharing, leaderboards, friend systems)
- Advanced analytics and insights
- Integrations with third-party services
- Widgets and watch apps
- Advanced personalization
- Marketplace or user-generated content features
- Team/family plan features
- Advanced notification customization

Ship without these. Add them based on what users actually request.

---

## AI Prompt — Prioritization Decision

```
I am building a [describe your app in one sentence] for [target user].

Here is my feature brainstorm list:
[paste your feature list with rough complexity estimates]

My constraints:
- Team size: [solo / 2 / small team]
- Target launch: [timeframe]
- Platform: [iOS / Android / both]
- Core value proposition: [one sentence]

Apply MoSCoW prioritization to every feature on my list.

For Must Haves: explain specifically why the app fails without this feature.
For Won't Haves: explain why deferring this is safe for v1.

Then:
1. Flag any features I've marked as Must Have that you'd argue are actually Should Have
2. Flag any features I haven't listed that are table-stakes for this category
3. Identify the single highest-risk feature on my Must Have list (most likely to take longer than expected)
4. Suggest the smallest possible v1 that still delivers the core value convincingly

Be direct. Challenge my assumptions. Don't validate a bloated v1.
```

---

## The Prioritization Output

Your output from this module is a definitive, version-controlled feature list with four clear sections:

**v1 — Must Ship**
Features without which the app cannot launch. Small list. Every item defensible.

**v1 — Should Ship (if time)**
Features that meaningfully improve the launch experience but aren't blocking. Cut these before cutting quality on Must Haves.

**v2 — Post-Launch Based on Feedback**
Features deferred deliberately. Not abandoned — revisited once real users provide signal.

**Never — Explicit No**
Features that don't fit the product direction. Write these down. Every time someone suggests them again (and they will), you have a recorded rationale for the decision.

---

## The Real Purpose of Prioritization

Prioritization is not a planning exercise. It's a team alignment tool.

A written, prioritized feature list means:
- No "while I'm in here" scope creep mid-build
- No arguments about what's in scope before a deadline
- No last-minute features that delay launch
- A clear answer when someone asks "why doesn't it do X?"

The list is a contract with yourself and your team. Changing it is allowed — but it should require a deliberate decision, not a casual addition.

Ship less. Ship it well. Learn fast.
