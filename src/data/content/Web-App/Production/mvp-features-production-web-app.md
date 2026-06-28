---
title: MVP Features
slug: mvp-features
phase: Phase 0
mode: production
projectType: web-app
estimatedTime: 35–50 min
---

# MVP Features

MVP does not mean low quality. It means minimum scope at full quality.

The goal of an MVP is to put the smallest possible version of your USP into the hands of real users and learn whether your core assumption is correct. Every feature that isn't necessary to test that assumption is scope creep — regardless of how good it sounds.

Most production projects fail not because they built the wrong thing, but because they built too much of the right thing before learning whether it worked.

---

## The MVP Definition Test

Before listing a single feature, answer this:

```
What is the single core assumption my product is built on?

If I could only prove one thing with v1, it would be:
[The USP claim] is true — users will [specific behaviour] 
because [specific reason].

The minimum set of features required to test this assumption is:
[List — this is your MVP]
```

Everything outside that minimum is v2.

---

## The Feature Categorisation Framework

Start by listing every feature you can imagine for the product. Everything. Don't filter yet.

Then sort each feature into one of four buckets:

| Bucket | Definition | Action |
|---|---|---|
| **Core** | Without this, the product doesn't deliver the USP | Ship in v1 |
| **Important** | Significantly improves the experience but USP survives without it | Ship in v1.1 |
| **Nice-to-have** | Users would appreciate it but won't churn without it | Backlog |
| **Distraction** | Sounds good but doesn't serve the primary user or USP | Cut entirely |

> [!WARNING]
> Every feature you build in v1 is a feature you must maintain, test, document, support, and migrate. The cost of a feature is not just the time to build it — it's every hour it will ever demand. Be ruthless.

---

## Sorting Your Features

For each feature on your list, run it through this filter in order:

**1. Does it serve the primary user?**
Not a secondary user, not an edge case, not a future user segment. The specific person you defined in Target Audience. If no — cut or defer.

**2. Does it strengthen the USP?**
Does building this make your unique position more credible or more differentiated? If it's table stakes (every competitor has it), it may be necessary but it's not a priority. If it actively weakens your focus — cut it.

**3. What happens if it's missing at launch?**
- Users can't complete the core action → Core
- Users are frustrated but can still get value → Important
- Users notice but don't mind → Nice-to-have
- Users don't notice → Cut

**4. Can it be faked or deferred?**
Some features feel essential but can be handled manually, with an existing tool, or with a simpler implementation in v1. A CSV export can be "email us and we'll send it." An admin dashboard can be direct database access. Notifications can be a weekly email.

---

## The MVP Feature Table

Once sorted, document your v1 features with enough detail for engineering decisions.

```
| Feature | User Story | Priority | Notes |
|---|---|---|---|
| [Name] | As a [user], I want to [action] so that [outcome] | Core | [constraints, edge cases] |
```

**Core features must be:**
- Complete (the happy path fully works)
- Correct (produces the right output)
- Fast enough (p95 response time acceptable to the user)
- Secure (no exposure of user data)

They do not need to be:
- Polished beyond usability
- Handling every edge case
- Optimised for scale you don't have yet

---

## What a Production MVP Is Not

**It is not a prototype.** An MVP ships to real users. It runs on production infrastructure. It has authentication, error handling, and data persistence. It is not throwaway code.

**It is not feature-minimal at the cost of quality.** The features you include must work reliably. A buggy core feature is worse than a missing non-core feature.

**It is not defined by time.** "We'll ship in 6 weeks whatever we have" produces random software. The MVP is defined by the minimum feature set, not the maximum time budget.

**It is not the same as a beta.** A beta is an MVP with known rough edges shared with tolerant early adopters. An MVP is the product — just smaller in scope.

---

## Scope Boundary Document

Write this explicitly. It becomes the source of truth when features get debated.

```
## V1 Scope

### In Scope
[List every Core feature by name]

### Out of Scope for V1
[List every deferred feature with a one-line reason]
- [Feature]: deferred because [reason — not enough user signal / 
  secondary user only / technically complex with low return / etc.]

### Explicitly Not Building
[List features you're cutting permanently from consideration]
- [Feature]: cut because [reason]

### V1 Success Criteria
This MVP is successful when:
- [X]% of users complete the core action on first session
- [X] users return within 7 days of sign-up
- [Specific qualitative signal from user feedback]
```

Share this document with anyone contributing to the project. It prevents the most common cause of scope creep: well-intentioned suggestions from people who haven't seen the full picture.

---

## Estimating Build Complexity

Before committing to your MVP scope, reality-check the build effort.

For each Core feature, estimate:

| Feature | Complexity | Rough Effort | Blocking Dependencies |
|---|---|---|---|
| [Feature] | Low / Medium / High | [X days] | [auth / database / third-party API] |

Common complexity underestimates in production projects:

- **Authentication** — always takes longer than expected, especially with session management, OAuth, and security
- **File uploads** — storage, size limits, type validation, processing pipelines
- **Email** — deliverability, templates, unsubscribe handling, testing across clients
- **Real-time features** — WebSockets, state sync, connection management
- **Payments** — Stripe is easier than alternatives but still complex; webhooks, failed payments, refunds
- **Multi-tenancy** — data isolation, team permissions, billing per org

> [!TIP]
> If your total Core feature effort exceeds what one developer can ship in 8–10 weeks of focused work, your MVP is too large. Cut until it fits. Real users in 8 weeks teach you more than a perfect product in 6 months.

---

## Prompt: Validate Your MVP Scope

```
Copy Prompt
```

```
I'm defining the MVP for a production web app.

My USP: [paste from USP module]
My primary user: [paste from Target Audience module]
My core assumption: [the one thing v1 must prove]

Here is my current feature list sorted into buckets:

Core (must ship in v1):
[list]

Important (v1.1):
[list]

Nice-to-have (backlog):
[list]

Review my MVP scope and tell me:

1. Are there any Core features that don't directly test my core assumption? 
   Should they be deferred?

2. Are there any Important or Nice-to-have features that are actually Core 
   because without them users can't complete the primary action?

3. What is the single highest-risk feature in my Core list — 
   the one most likely to take longer than expected or require rework?

4. What am I most likely to add to scope under pressure that I should 
   commit to excluding now?

5. Is there a simpler version of any Core feature that would still 
   test the assumption?

Be direct. Identify real scope risks, not hypothetical ones.
```

---

## MVP Features Checklist

- [ ] Core assumption is written as a single testable statement
- [ ] Every feature is sorted into Core / Important / Nice-to-have / Cut
- [ ] Every Core feature has a user story and clear success condition
- [ ] Scope boundary document is written and accessible to all contributors
- [ ] Build complexity estimated for each Core feature
- [ ] Total Core effort fits within a realistic solo or small-team window
- [ ] At least 5 features are explicitly deferred with documented reasons
- [ ] MVP success criteria are specific and measurable
- [ ] No Core feature is included "just in case" — each has a clear user need

---

## What Comes Next

**Monetization** — deciding how your product generates revenue, and how that decision shapes your architecture, onboarding, and feature priorities from day one.

Monetization is not a Phase 6 concern. How you charge users affects your database schema, your auth model, your onboarding flow, and your feature gates. Decide it now.
