---
title: Future Features
slug: future-features
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 15–20 min
---

# Future Features

Future features are not a wishlist. They are architectural decisions made in advance.

The features you plan to build in v2 and v3 determine what you must not paint yourself into a corner on in v1. A database schema chosen for a single-user app is a migration nightmare when you add teams six months later. An API designed without versioning breaks third-party integrations when you change it. A UI built without a design system becomes inconsistent as features accumulate.

Document your future features now — not to build them, but to make sure v1 doesn't make them impossible.

---

## The Purpose of This Exercise

Future features serve three functions:

**1. Architectural foresight**
Knowing you'll add team collaboration in v2 means your v1 data model includes `organization_id` even if it's unused. Knowing you'll add offline sync means you don't couple your UI directly to API calls. Knowing you'll add a web app means your backend is an API, not server-rendered HTML.

**2. Stakeholder and investor communication**
A roadmap beyond v1 demonstrates that you've thought past the immediate build. It shows the market you're going after and the scope of the opportunity.

**3. Scope protection for v1**
A well-documented future features list makes it easy to say "that's a great idea — it's on the v2 roadmap" without losing the idea or reopening scope discussions.

---

## Horizon Mapping

Organize future features across three time horizons. The labels matter less than the thinking.

### Horizon 1 — Next (3–6 months post-launch)
Features you build once you have real user data confirming the core hypothesis. These are high-confidence additions — you're almost certain you'll build them, and v1 should be architected with them in mind.

**Characteristics:**
- Extend the core loop rather than replace it
- Depend on user data you'll collect in v1
- Required for specific user segments you're targeting next
- Address the most common requests from early users

### Horizon 2 — Soon (6–18 months post-launch)
Features that expand the product surface significantly. These depend on v1 success and usually require dedicated engineering investment.

**Characteristics:**
- New user segments or use cases
- Platform expansions (web app, watch app, tablet)
- Monetization expansions (team plans, enterprise)
- Ecosystem integrations
- Social or community features

### Horizon 3 — Later (18+ months)
The vision features — what the product becomes if everything goes right. These inform the brand and narrative but shouldn't constrain v1 technical decisions in significant ways.

**Characteristics:**
- Platform-level plays (becoming a platform, marketplace)
- AI-native features requiring significant ML infrastructure
- Partnerships and ecosystem positions
- International expansion
- Category-defining features that don't exist in the market yet

---

## Architecture Review Against Future Features

For each significant Horizon 1 feature, ask: **does v1 make this harder or easier to build?**

| Planned future feature | v1 architectural requirement |
|---|---|
| Team / organization accounts | Include `user_id` and stub `organization_id` in all data models |
| Offline sync | Don't couple UI to network calls; build a local data layer from day one |
| Web app | Backend must be an API, not tightly coupled to mobile; shared auth |
| Wearable companion | Abstract health/activity data access behind a service layer |
| Third-party integrations | Design API with versioning; don't expose internal IDs directly |
| Push notification campaigns | Include event tracking from v1; don't retrofit analytics |
| AI features | Store raw user data in a format that enables model training later |
| User-generated content | Plan storage and moderation architecture early |
| Marketplace | Multi-party data model; payment infrastructure that handles splits |

Run this analysis for your top 5 Horizon 1 features before finalizing your v1 architecture.

---

## The "Don't Break" List

Some future features require v1 to preserve certain properties. Name them explicitly.

**Don't break user data portability**
If you plan to let users export their data or migrate between platforms, your data model must be exportable from v1. Retrofitting export is painful.

**Don't break URL / deep link structure**
If you plan to add web or share deep links, establish your URL scheme in v1. Changing it breaks existing links.

**Don't break the auth model**
If you plan to add SSO, OAuth providers, or team-based auth, don't build a custom auth system that can't be extended. Use a provider that supports these patterns.

**Don't break the API contract**
If you plan to ship a public API or a web app alongside the mobile app, design your endpoints with versioning in mind from v1. `v1` in the URL path costs nothing and saves breaking changes later.

---

## Feature Roadmap Format

Document future features in a format that's shareable and revisable.

```
HORIZON 1 — Next Release (target: [month/quarter])
────────────────────────────────────────────────────
Feature: [name]
Why: [user signal or hypothesis this addresses]
Depends on: [v1 data or behavior this requires]
Architectural note: [anything v1 must preserve for this to be buildable]

Feature: [name]
...

HORIZON 2 — Expansion (target: [timeframe])
────────────────────────────────────────────
Feature: [name]
Why: [market opportunity or user segment]
Rough size: [S / M / L]

...

HORIZON 3 — Vision
────────────────────
[2–3 sentences describing the long-term product direction]
Key bets: [list the 2–3 features that define the vision]
```

---

## What Future Features Are Not

**Not commitments**
A future features list is not a promise to users, investors, or your team. It's a planning tool. Every item on it should be validated against real user data before it's built.

**Not a backlog**
A backlog is a managed, prioritized queue of work with effort estimates and owners. A future features list is directional. Convert items to backlog only when they're approaching active development.

**Not static**
Revisit this list after every significant user research session, after every major retention analysis, and every time a competitor ships something significant. The list should evolve based on evidence.

---

## AI Prompt — Future Feature Roadmap

```
I am building a [describe your app in one sentence].

My v1 MVP includes:
[list your MVP features]

My core user: [describe specifically]
My business model: [freemium / subscription / one-time purchase / etc.]
My target market size: [niche / mid-market / broad consumer]

Generate a future features roadmap across three horizons:

Horizon 1 (3–6 months post-launch):
- Features most likely to be requested by early users of my MVP
- Features required to serve the next user segment beyond my initial target
- Features that extend rather than replace my core loop

Horizon 2 (6–18 months):
- Platform expansions that make sense for my category
- Monetization expansions
- Social or community features, if relevant
- Integrations with adjacent tools

Horizon 3 (18+ months):
- Vision features that define what the product becomes at scale

For each feature, note:
1. What user signal would confirm this is worth building
2. Whether v1 needs to preserve any architectural property for this to be feasible
3. How this feature changes my monetization or retention model

Flag any Horizon 1 feature that requires a v1 architectural decision I should make now.
```

---

## Connecting Future Features to v1 Decisions

Before closing this module, take your Horizon 1 list and annotate your v1 architecture, schema, and API design with notes:

```
// users table
// NOTE: organization_id included as nullable — required for team features in v2
id UUID PRIMARY KEY
email TEXT UNIQUE
organization_id UUID NULLABLE  ← future: team accounts
created_at TIMESTAMP
```

```
// API versioning — future-proofed from day one
/api/v1/habits
/api/v1/completions
```

These annotations cost nothing in v1. Missing them costs weeks in v2.

The best architectures for v1 are those that make v2 feel like a natural extension — not a rewrite.
