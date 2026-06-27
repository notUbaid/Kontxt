---
title: Future Features
slug: future-features
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Future Features

Your MVP scope is locked. This module handles everything that didn't make it in — and turns that pile of deferred ideas into a structured, useful artifact instead of a graveyard.

Future features serve three purposes:

1. **They keep your MVP honest.** Writing deferred features down removes the temptation to sneak them into v1. The backlog exists. The idea isn't lost. You can let go of it for now.

2. **They inform architecture decisions.** Phase 2 system design needs to account for where the product is going — not just where it starts. A feature you plan to build in six months can invalidate an architecture decision you make today if you don't account for it.

3. **They become your roadmap signal.** After launch, real user behavior will reprioritize this list completely. But having a structured backlog means you're starting from an informed hypothesis, not a blank page.

---

## This Is Not a Commitment

The most important thing to understand about your future features list: most of it will be wrong.

Not because your ideas are bad. Because you don't have real users yet. After your first 90 days with paying customers, their actual behavior will surface things you never predicted — and bury things you thought were critical.

Treat this list as a structured hypothesis. High enough fidelity to inform architecture. Loose enough that you can throw it away when data contradicts it.

---

## Structure Your Backlog in Tiers

Not all future features are equally certain. Organize them by confidence level, not just by category.

### Tier 1 — High Confidence

Features you're nearly certain you'll build. Either users have explicitly asked for them, they're logical extensions of the core workflow, or competitors offer them and users will expect parity over time.

These should inform your architecture decisions in Phase 2. If you know you'll need real-time collaboration eventually, your data model and API design should not make that impossible to add later.

### Tier 2 — Medium Confidence

Features you expect to build based on your current understanding, but which depend on user behavior you haven't observed yet. You'll build these if early users validate the assumption they're based on.

These don't need to influence architecture significantly — but you shouldn't actively design them out.

### Tier 3 — Low Confidence / Exploratory

Ideas you want to preserve without committing to. Things that sound compelling but have no user validation behind them yet. Competitive features you're not sure your users actually want.

These go on the list purely so you don't lose the idea. They carry no architectural weight.

---

## Capture Format

Use the same discipline as your feature specs, but lighter:

```
Feature: [Name]
Tier: [1 / 2 / 3]
What it does: [One sentence]
Why it's deferred: [Reason it didn't make v1]
Trigger to build: [What signal would move this up the list]
Architecture note: [Any constraint this places on current decisions]
```

The **Trigger to build** field is the most useful one. It forces you to define in advance what evidence would justify building this. Without it, every feature feels urgent the moment a single user mentions it.

Examples of good triggers:

- "3+ paying users request this in the same month"
- "Churn interviews cite this as a reason for leaving"
- "Conversion rate from trial to paid drops below X%"
- "A direct competitor ships this and we start losing deals to it"
- "We hit 100 active users and the manual workaround breaks down"

Triggers turn your backlog from a wish list into a decision framework.

---

## Categories to Cover

Work through each of these to make sure your backlog is comprehensive.

**Workflow expansion** — The next steps in the user journey after your MVP covers the core. What do users do after they've gotten the initial value? Where does the workflow go next?

**Collaboration and multi-user** — If your MVP is single-player, multi-player features almost always come next. Think: sharing, permissions, comments, real-time presence, team management, admin controls.

**Integrations** — The tools your users already live in. Which connections would make your product significantly stickier? Which would remove the biggest remaining friction?

**Automation** — Manual steps in the current workflow that could be scheduled, triggered, or automated. These compound in value as users accumulate more data and more usage history.

**Analytics and reporting** — Users eventually want to measure what they're doing. What metrics matter most to your target user? What would they want to export, share, or act on?

**Platform and API** — If your product succeeds, developers will want to build on top of it. When does it make sense to open an API or build a developer platform?

**Monetization features** — Usage limits, plan enforcement, upgrade prompts, billing management. These aren't exciting but they're structurally required before you scale.

**Scale features** — What breaks at 10x your initial user count? Bulk operations, performance optimizations, data archiving, audit logs, SSO, and enterprise controls all belong here.

---

## The Architecture Handoff

This is the practical reason future features exist in Phase 0 rather than Phase 2.

Before you hand off to architecture design, extract every Tier 1 feature that could constrain your technical decisions and flag it explicitly.

Common examples:

| Future Feature | Architecture Implication |
|---|---|
| Real-time collaboration | WebSocket infrastructure needed; optimistic UI patterns |
| Multi-tenancy / teams | Data model needs tenant isolation from day one |
| Public API | API design must be versioned and stable from v1 |
| Mobile app | Backend must be API-first; no server-rendered assumptions |
| Webhook support | Event system must be built into the backend architecture |
| SSO / SAML | Auth layer must support multiple identity providers |
| White-labeling | Domain routing and theming system needed early |
| Data exports at scale | Async job infrastructure needed before data volumes grow |

Hand this list to your Phase 2 architecture decisions as a constraint document. The goal is not to build these features now — it's to not build a system that makes them impossible later.

---

## Use AI to Stress-Test Your Backlog

```prompt
I'm building a SaaS product with the following context:

Value Proposition: [paste yours]
Target User: [describe]
MVP Scope (brief summary): [describe what v1 includes]

Here is my current future features backlog:
[paste your tiered list]

Review this and tell me:

1. Are there any obviously missing features that users in this
   category almost always request after experiencing the core product?
2. Are any of my Tier 1 features actually likely to stay unused —
   features that sound important but rarely get traction in practice?
3. Which of these features, if not architected for today, would
   require the most painful refactor to add later?
4. Are there any features I've classified as Tier 3 that are
   actually competitive necessities within 12 months?
5. What does the typical 6-month and 12-month product evolution
   look like for SaaS products in this category?

Be specific to my product category and target user.
```

---

## What to Do With This List After Launch

The future features list has a shelf life. Once you have real users:

- **After 30 days:** Note which features users are asking for unprompted. These jump to Tier 1 regardless of where you originally placed them.
- **After 90 days:** Run a full reprioritization. Discard anything nobody has mentioned. Elevate anything that appeared in churn or support conversations.
- **After 6 months:** Treat the original list as historical context only. Your roadmap should now be driven entirely by user data, not pre-launch hypotheses.

The future features list is a snapshot of your best thinking before you had real signal. Its job is to inform architecture and prevent idea loss — not to bind your roadmap.

---

## Validation Checklist

- [ ] Every deferred feature from my MVP scope appears in the backlog
- [ ] Features are tiered by confidence, not just listed
- [ ] Every feature has a trigger condition that defines when to build it
- [ ] I've identified all Tier 1 features with architecture implications
- [ ] I've extracted architecture constraints and flagged them for Phase 2
- [ ] I've used the AI prompt to surface missing features and misclassified tiers
- [ ] I understand this list will be significantly revised after launch

---

## Quick Reference

```
Backlog Tiers
────────────────────────────────────────────────
Tier 1  →  High confidence. Inform architecture now.
Tier 2  →  Medium confidence. Don't design them out.
Tier 3  →  Low confidence. Preserve the idea. No weight.

Feature Capture Format
────────────────────────────────────────────────
Feature:           Name
Tier:              1 / 2 / 3
What it does:      One sentence
Why deferred:      Reason it didn't make v1
Trigger to build:  Evidence that justifies building it
Architecture note: Any constraint on current decisions

Architecture Implication Triggers
────────────────────────────────────────────────
Real-time features    →  WebSocket / event infrastructure
Multi-tenancy         →  Tenant isolation in data model
Public API            →  Versioned, stable API from v1
Mobile app            →  API-first backend, no SSR assumptions
SSO / SAML            →  Pluggable auth layer
Large-scale exports   →  Async job infrastructure early

Backlog Lifecycle
────────────────────────────────────────────────
Pre-launch   →  Informed hypothesis. Constrains architecture.
30 days      →  Update Tier 1 based on user requests.
90 days      →  Full reprioritization against real data.
6 months     →  Original list is historical context only.
```
