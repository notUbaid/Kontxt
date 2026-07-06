---
title: Authentication
slug: authentication
phase: Phase 2
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: authentication-hackathon-marketplace.md
---

# Authentication

Auth is the feature every hackathon team over-invests in by default, because it feels foundational. In a marketplace specifically, it's worth deciding deliberately — you need just enough to distinguish buyers from sellers in your demo, and not one feature more.

---

## The Core Question

> **Reframe:** Auth in a hackathon isn't a security feature. It's a way to answer one question for your demo: "which screens does this person see, and as which role?" Everything beyond that — password reset, email verification, session expiry handling — is solving a problem judges will never encounter.

For a marketplace specifically, auth has one job your other project types don't: distinguishing **buyer view vs. seller view**, since the same person often needs to demo both.

---

## Decision 1: How Much Real Auth Do You Actually Need

| Approach | What it provides | When it's the right call |
|---|---|---|
| No auth at all | Anyone can act as buyer or seller via a role switcher | Fastest, often the right choice if your core loop doesn't depend on persistent identity |
| Fake/mock auth | A login screen that exists visually but doesn't gate real security | Looks complete in a demo, costs almost nothing to build |
| Real auth (provider-based) | Actual account creation, real sessions | Only if your concept's core differentiator genuinely needs persistent, verified identity |
| Real auth (custom-built) | Full password hashing, session management, etc. | Almost never the right choice in a hackathon timeframe |

> **Best Practice:** Default to a role switcher with no real auth, or a mock login that creates a fake session, unless your concept specifically depends on real identity (e.g. a trust/reputation system that needs to persist across demo sessions). Real custom auth is one of the highest-effort, lowest-demo-payoff features a marketplace team can choose to build.

---

## The Role Switcher Pattern

This is the fastest path to a working two-sided demo, and it's a legitimate engineering choice, not a hack you should be embarrassed by.

```
[Top of screen: "Viewing as: Buyer ▾"]
   - Switch to: Seller
   - Switch to: Buyer
```

This single UI element lets you demo both journeys fluidly, live, without ever showing a login screen — which also means zero risk of an auth bug derailing your demo at the worst possible moment.

> **Tip:** If you do use a role switcher, seed each role with a consistent, named identity ("Viewing as: Alex (Buyer)") rather than generic labels. It reads as a deliberate demo device rather than an obviously fake placeholder.

---

## If You Do Need Real Login

Some concepts genuinely benefit from showing a real signup/login moment — for instance, if your differentiator involves a trust/reputation system you want to demonstrate persisting. If that's your situation:

| Use | Don't use |
|---|---|
| A managed auth provider (e.g. Clerk, Supabase Auth, Auth0, Firebase Auth) | Hand-rolled password hashing and session management |
| Social login (Google) if your provider supports it in minutes | Email verification flows |
| A single, simple session check | Multi-factor auth, password reset, account recovery |

> **Warning:** Building your own auth system from scratch — password hashing, session tokens, refresh logic — is one of the most common ways hackathon teams burn 4-6 hours on a feature that earns zero demo points. A managed provider gets you a working login in under an hour and lets you spend the saved time on your actual core loop.

---

## Marketplace-Specific Consideration: Role Assignment

Whichever approach you choose, decide explicitly how a user becomes "a buyer" vs. "a seller" — don't leave this ambiguous.

| Model | How it works | Complexity |
|---|---|---|
| Single role per account | User picks buyer or seller at signup, fixed | Simplest |
| Dual role per account | Same account can act as both, switches via UI | Matches real marketplaces (most users are both at different times) but needs the role-switcher UI either way |
| Separate account types | Buyer accounts and seller accounts are structurally different | Adds complexity rarely justified in a hackathon |

> **Best Practice:** Dual role per account, paired with the role-switcher UI pattern above, is usually the right model — it mirrors how real marketplaces work (most users are occasionally sellers too) without adding real structural complexity to your auth.

---

## Using AI Effectively Here

Use AI to scaffold whichever approach you've chosen quickly, and to sanity-check that you're not over-building.

** Copy this prompt:**

```
I'm building auth for a hackathon marketplace.

My decision: [role switcher with no real auth / mock login / real auth via (provider name)]
My stack: [your actual stack]
My time remaining: [hours left]

Help me implement this as fast as possible:
1. If role switcher: scaffold a simple UI toggle that sets a buyer/seller role in app state, with seeded demo identities for each
2. If mock login: scaffold a login screen that creates a fake session without real password handling
3. If real auth: give me the fastest path using [provider] specifically, skipping anything not needed for a demo (no password reset, no email verification, no MFA)

Flag if anything I'm asking for is more complex than my time budget justifies, and suggest the simpler alternative directly.
```

---

## Validating the Output

- Can a judge distinguish buyer view from seller view within seconds, without confusion?
- If you built real auth, did you skip password reset, email verification, and MFA — none of which a demo needs?
- Is there zero risk of an auth bug (expired session, failed login) interrupting your live demo?
- Did you spend less time on this than on your core loop? If not, that's a signal to simplify.

> **Common Mistake:** Discovering a session-expiry bug or a login failure mid-demo because real auth was tested once and never again under demo conditions. If you went with real auth, re-test the exact login flow you'll use on stage, right before presenting — not just once during development.

---

## Before You Continue

- Auth approach explicitly decided (role switcher, mock login, or real provider-based auth) — not left ambiguous
- Role assignment model chosen (dual role + switcher is the default recommendation)
- If real auth was used, password reset/email verification/MFA explicitly excluded as out of scope
- Time spent here is proportionate — less than your core loop, not more

**Next up:** Architecture Fundamentals — the broader technical decisions for the rest of your stack.
