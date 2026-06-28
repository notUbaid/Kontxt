---
title: PRD
slug: prd
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 30–45 min
---

# PRD

A Product Requirements Document is the single source of truth for what you're building and why. It is not a feature list. It is not a spec sheet. It is a document that answers — for every person involved in building the product — the questions that would otherwise derail a sprint, cause a misaligned build, or produce the right feature for the wrong user.

A good PRD is read before the first line of code. A bad one is written after.

---

## Who the PRD Is For

The PRD is written for everyone who will make decisions during the build:

- **Engineers** — what to build, what constraints exist, what's out of scope
- **Designers** — what the user needs, what success looks like, what edge cases matter
- **AI coding tools** — the more context in a PRD, the better the output from Cursor, Claude Code, or Copilot
- **Future you** — the document you'll reference when you've forgotten why you made a decision

A PRD that only exists in your head is a liability. The moment a second person joins the build, or a month passes, or you use an AI tool to generate code — the PRD becomes the difference between coherent output and guesswork.

---

## PRD Structure

### 1. Problem Statement

One paragraph. What problem exists in the world, for which user, and why current solutions fail them.

This is not about your app. It is about the user's reality before your app exists.

```
[Target user] currently struggles with [specific problem] because [root cause].
Existing solutions fail because [specific failure mode].
This results in [real cost — time, money, frustration, missed opportunity].
```

### 2. Product Vision

One or two sentences. What the world looks like after your product succeeds.

Not features. Not screens. The outcome.

```
[App name] makes it [possible / easy / automatic] for [target user] to [core outcome]
so that [meaningful result in their life].
```

### 3. Target User

Be specific. A PRD that says "anyone who wants to be productive" is useless.

Include:
- Demographic context (not for marketing — for design decisions)
- Technical comfort level (determines onboarding complexity)
- Current behavior (what they do today instead of using your app)
- Primary motivation (why they would download this)
- Primary fear (what would make them uninstall)

If you completed a Personas module, reference it here. If not, write it inline.

### 4. Success Metrics

From your Product Metrics module, define what success looks like at specific time horizons.

```
30 days post-launch:
- Day-7 retention > 25%
- Activation rate > 60%
- Crash-free rate > 99%

90 days post-launch:
- Free → paid conversion > 3%
- Day-30 retention > 12%
- MRR > [target]

Product-market fit signal:
- [Your specific definition from the metrics module]
```

### 5. Scope

**In scope for v1:**
The complete, unambiguous list of features being built. If it's not on this list, it's not being built.

**Out of scope for v1:**
Explicit list of features that are not in this version. Writing these down prevents scope creep. When someone asks "why doesn't it do X?", point to this list.

**Future consideration:**
Features from your future roadmap that influenced architectural decisions.

### 6. User Flows

For each core user flow, describe the path step by step. This is not wireframes — it's the logical sequence.

```
Flow: New User Onboarding
1. User downloads and opens app → Welcome screen
2. User taps "Get Started" → Permission request (notifications)
3. User grants / denies permission → Personalization quiz (3 questions)
4. Quiz complete → Account creation (email or Apple/Google)
5. Account created → First core action prompted
6. First core action complete → Dashboard
```

Describe every major flow: onboarding, core loop, paywall, settings, account recovery.

### 7. Feature Specifications

For each feature in scope, write a specification:

```
Feature: [Name]
User story: As a [user type], I want to [action] so that [outcome].
Acceptance criteria:
  - [ ] [Specific, testable behavior]
  - [ ] [Specific, testable behavior]
  - [ ] [Edge case handled]
Out of scope: [related things this feature does NOT do]
```

Acceptance criteria must be testable. "Works well" is not testable. "Saves data within 500ms and confirms with a toast notification" is testable.

### 8. Technical Constraints

Decisions and constraints the engineering approach must respect:

- Platform requirements (minimum iOS/Android version)
- Offline requirements
- Performance requirements (specific load time targets)
- Data privacy requirements (what data is collected, stored, and for how long)
- Third-party service dependencies and their limitations
- App Store / Play Store policy constraints

### 9. Design Constraints

- Brand guidelines (if established)
- Platform conventions that must be followed (iOS HIG, Material Design)
- Accessibility requirements (minimum AA compliance, VoiceOver support)
- Device support matrix (which screen sizes must be tested)

### 10. Open Questions

Every PRD has unresolved decisions. Write them down explicitly with an owner and deadline.

```
| Question | Why it matters | Owner | Decision by |
|---|---|---|---|
| Do we require account creation at launch? | Affects onboarding conversion | [name] | [date] |
| What's the free tier limit? | Core to monetization design | [name] | [date] |
```

Unwritten open questions become assumptions that create bugs and misalignments.

---

## PRD Quality Checklist

A PRD is ready when:

- [ ] A new engineer could read it and understand what they're building without asking questions
- [ ] Every feature has acceptance criteria that a QA tester could verify
- [ ] Out-of-scope items are explicitly listed
- [ ] Success metrics are specific and measurable
- [ ] Open questions have owners and deadlines — there are no open questions without an owner
- [ ] The problem statement does not mention the app — it describes the user's reality
- [ ] Platform-specific requirements are called out (not assumed)

---

## Using the PRD with AI Tools

A well-written PRD is your most powerful context document for AI coding tools. Paste the PRD (or the relevant sections) at the start of any AI coding session.

This prevents:
- Features built outside the defined scope
- Inconsistent naming between spec and implementation
- Missing acceptance criteria in generated code
- Architectural decisions that contradict defined constraints

```
Context: Here is the PRD for the feature I'm building.

[paste relevant PRD sections]

Task: Implement the [feature name] according to the acceptance criteria above.
Use [stack/language]. Follow the technical constraints defined.
Ask me before making any architectural decision not covered in the PRD.
```

The PRD becomes the briefing document. The AI becomes the engineer executing against it.

---

## AI Prompt — PRD Generation

```
You are a senior product manager writing a PRD for a production mobile app.

App concept: [describe in 3–5 sentences]
Target user: [describe specifically — who they are, what they do today, why they'd use this]
Core hypothesis: [from your MVP module]
MVP features (in scope): [paste your prioritized Must Have features]
Out of scope for v1: [paste your explicitly deferred features]
Monetization model: [from your monetization module]
Success metrics: [from your product metrics module]
Platforms: [iOS / Android / both]
Target launch: [timeframe]

Write a complete PRD including:
1. Problem statement (user reality, not product description)
2. Product vision (one sentence)
3. Target user profile
4. Success metrics with 30-day and 90-day targets
5. Scope (in scope + out of scope + future)
6. User flows for: onboarding, core loop, and paywall
7. Feature specifications with acceptance criteria for each MVP feature
8. Technical constraints
9. Open questions that need resolution before development starts

Use specific, testable language throughout.
Flag any scope items that are ambiguous or likely to cause implementation disagreement.
```

---

## The PRD Is a Living Document

Write it once. Update it when decisions change.

Every time a scope item is added, removed, or changed — update the PRD. Every time an open question is resolved — close it in the PRD. Every time a success metric is revised — record the reasoning.

The PRD isn't valuable because it was written. It's valuable because it reflects the current shared understanding of what's being built.

A PRD that's six weeks out of date is worse than no PRD — it creates false confidence. Maintain it or archive it.
