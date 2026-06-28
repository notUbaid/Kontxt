---
title: Idea Definition
slug: idea-definition
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 30–45 min
---

# Idea Definition

A mobile app idea is not a product. It is a hypothesis. Your job in this module is to convert that hypothesis into a precise, testable statement that every subsequent decision can be anchored to.

Vague ideas produce vague apps. Vague apps fail App Store review, confuse users, and get deleted after two sessions.

---

## The Mobile-Specific Idea Test

Before defining anything, answer this question honestly:

**Why does this need to be a mobile app?**

```
[ ] Requires device hardware (camera, GPS, accelerometer, NFC, Bluetooth)
[ ] Requires push notifications for core value delivery
[ ] Requires offline access to function
[ ] Requires home screen presence — users need instant access
[ ] Benefits from native gestures and performance
[ ] App store distribution is a meaningful acquisition channel
[ ] Competitors are mobile-first and users expect a native experience
```

If none of these apply, a web app or PWA is probably the right answer. If two or more apply, you're building a mobile app for the right reasons.

---

## The Idea Definition Framework

Complete each section in full before moving on.

---

### 1. The Core Problem

One to three sentences. Specific, observable, painful.

```
Template:

[Specific type of person] struggle with [specific problem]
when [specific situation or trigger].
Currently they [describe what they do instead],
which causes [concrete negative outcome].
```

**Mobile-specific pressure test:**

Does this problem occur in a context where a phone is the natural device?
- On the go, away from a desk → strong mobile fit
- At a desk with full attention → weak mobile fit, consider web first

---

### 2. The Mobile Moment

Every great mobile app has a specific moment where being on a phone is essential or superior to any other device.

```
Instagram: The moment you see something worth capturing — your phone is already in your hand.
Uber: The moment you need a ride — you're standing on a street, not at a desk.
Duolingo: The moment you have 3 idle minutes — your phone is the device you reach for.
```

What is your mobile moment?

```
Users reach for [app name] specifically when:
[describe the precise context — location, activity, emotional state, trigger]

At that moment, a phone is the right device because:
[reason — they're moving, they need camera, they have 2 minutes, etc.]
```

If you can't describe this moment, your app may not have a strong mobile case.

---

### 3. The Solution

One sentence. What you're building and the core mechanism.

```
Template:

[App name] is a [category] app that helps [target user]
[achieve specific outcome] by [core mechanism],
unlike [primary alternative] which [specific limitation].
```

---

### 4. The Core Value Moment

The single moment in your app when a first-time user feels "this is useful."

```
A new user experiences the core value of [app name] when they
[specific action — takes X taps] and [specific result].

This happens within [X minutes] of first opening the app.
```

If this moment takes more than 5 minutes or more than 7 taps to reach, your onboarding is too long. Users will uninstall before they get there.

---

### 5. Platform Decision

Make this decision explicitly now. It affects your entire architecture.

```
Primary platform: [ ] iOS first  [ ] Android first  [ ] Both simultaneously

Framework approach:
[ ] React Native — JavaScript, large ecosystem, good for most apps
[ ] Flutter — Dart, excellent performance and UI consistency
[ ] Native iOS (Swift) + Native Android (Kotlin) — maximum performance, two codebases
[ ] Expo (managed React Native) — fastest start, some native limitations

Rationale: [why this choice for this app and this team]
```

**Decision guide:**

| If... | Consider... |
|---|---|
| Solo developer, cross-platform needed | Expo / React Native |
| UI-intensive, animation-heavy | Flutter |
| Deep hardware integration needed | Native |
| Fastest possible start, standard features | Expo managed workflow |
| Need full native module access | React Native bare / Flutter |

---

### 6. What You Are Not Building

Explicit exclusions. At least five.

```
V1 does NOT include:
- [Feature]: deferred because [reason]
- [Feature]: deferred because [reason]
- [Platform]: not targeting until [condition]
- [Integration]: [reason]
- [User type]: not the primary user in v1
```

---

### 7. App Store Category and Positioning

Where will your app live in the store? This is a discovery and expectation-setting decision.

```
Primary category: [e.g. Productivity / Health & Fitness / Social / Finance]
Secondary category (optional): [e.g. Utilities]

How users will find it (primary discovery):
[ ] Search — users know the problem and search for solutions
[ ] Browse — users discover through featured/category lists
[ ] Word of mouth — organic sharing
[ ] Paid acquisition — ads
[ ] Cross-promotion — other apps or platforms

App name considerations:
- Is the name searchable? Does it contain a relevant keyword?
- Is the name available on both stores?
- Is the .com / social handle available?
```

---

### 8. Success at 6 Months

Specific and measurable. Not aspirational.

```
At 6 months post-launch, this app is successful if:

Downloads:     [X] total installs
Active users:  [X] DAU or [X]% Day-30 retention
Core action:   [X]% of users complete [core action] in first session
Revenue:       [if monetised] $[X] MRR or [X] paying users
Store rating:  ≥ [X] stars with ≥ [X] reviews
Crashes:       < [X]% crash rate (industry benchmark: < 0.5%)
```

---

## Prompt: Stress-Test Your Mobile Idea

```
Copy Prompt
```

```
I'm defining a production mobile app. Review my idea definition critically.

Problem: [your problem statement]
Mobile moment: [your described moment]
Solution: [your one-sentence solution]
Core value moment: [your described moment + time/taps to reach it]
Platform decision: [iOS / Android / both, framework choice]
V1 exclusions: [your list]
Success at 6 months: [your metrics]

Act as a skeptical senior mobile product manager who has shipped 10+ apps.

Challenge this definition:
1. Is the mobile case genuinely strong, or would a web app or PWA serve this better?
2. Is the core value moment reachable fast enough — will users wait that long?
3. What is the most likely App Store rejection reason for this app?
4. What is the riskiest assumption in the solution hypothesis?
5. Are the 6-month metrics realistic given the problem space and category?

For each issue, suggest a more precise or defensible alternative.
Do not validate. Challenge.
```

---

## Idea Definition Checklist

- [ ] Mobile case is justified — at least two mobile-specific reasons documented
- [ ] Mobile moment is described specifically — context, trigger, why phone is right
- [ ] Problem statement names a specific person in a specific situation
- [ ] Solution statement is falsifiable — could be tested with an experiment
- [ ] Core value moment reachable within 5 minutes and 7 taps of first launch
- [ ] Platform and framework decision made with explicit rationale
- [ ] At least 5 explicit V1 exclusions documented
- [ ] App Store category identified
- [ ] App name checked for availability on both stores
- [ ] 6-month success metrics are specific and measurable

---

## What Comes Next

**Problem Statement** — going deeper than the idea definition into the precise articulation of the problem, the evidence that it's real, and the user research that validates it before any design or engineering begins.

The idea definition is the hypothesis. The problem statement is the evidence.
