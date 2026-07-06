---
title: Auth Implementation
slug: auth-implementation
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 25–30 min
---

# Auth Implementation

## From Decision to Working Code

Authentication (Phase 2) decided your role model, your managed auth provider, and your user schema. This module is where that becomes running code your other Phase 3 features depend on. Everything you build next — Database, Backend, Frontend — assumes a working, tested auth layer exists. Get this solid before moving on; a half-working auth system will surface as confusing bugs in every feature built on top of it.

---

## Build Order: Why Auth Comes First in Phase 3

Your Architecture Fundamentals dependency chain was User → Listing → Transaction → Review. Auth Implementation is the literal first step in that chain — nothing else can be meaningfully tested without a real, working way to identify who's making a request.

>  **Best practice:** Resist the urge to start with something more visually satisfying, like the listing form. Without working auth, you'll be faking user identity to test everything else, which hides exactly the authorization bugs you'll need to catch later. Build this first, for real.

---

## The Implementation Checklist

This is the concrete version of the auth flow specified in Phase 2's Authentication module.

- [ ] Integrate your chosen managed auth provider (signup, login, session/token handling)
- [ ] Implement email verification, required before listing or messaging — per your Phase 2 decision
- [ ] Add the one social login provider you chose, if any
- [ ] Create the User record (with account status, join date, verification status) on successful signup
- [ ] Wire account status (active/suspended/banned) into your auth middleware — every authenticated request should carry this
- [ ] Implement the SellerProfile creation trigger — created on first listing attempt, not at signup

> ️ **Common mistake:** Treating signup as "done" once a user record exists, without verifying account status flows through to every subsequent request. If a banned user's session token still authenticates successfully because your middleware only checks "is this token valid" and not "is this account active," you've built authentication without authorization — the exact gap flagged in the Authorization module.

---

## Test the Failure Paths, Not Just Successful Login

| Scenario | Expected Behavior |
|---|---|
| Unverified email tries to create a listing | Blocked, with a clear message to verify first |
| Suspended account logs in | Login succeeds (they can browse), but listing/messaging actions are blocked |
| Banned account attempts login | Login itself is blocked |
| Expired/invalid session token used | Request rejected, user prompted to re-authenticate |

>  **Tip:** This table is your literal test plan. Each row maps directly to a decision made in Phase 2 — if a row fails, trace it back to whether the Authentication or Authorization module's rule was actually implemented, not just designed.

---

## Session Handling: Defaults Are Usually Right

Don't hand-roll session/token logic even at the implementation level — your managed auth provider almost certainly has this solved with sensible defaults (token expiry, refresh handling, secure cookie settings). Spend your implementation time wiring your application logic to these defaults, not reinventing them.

> ️ If you find yourself writing custom JWT validation logic, token refresh logic, or password comparison code, stop — this is very likely the hand-rolled auth anti-pattern flagged in Phase 2. Your provider's SDK should be handling this.

---

## AI Prompt: Implementing the Auth Flow

```
I'm implementing auth for a personal-scale marketplace using
[your managed auth provider] on [your stack].

My User schema includes: [paste from User Architecture] —
identity, account status (active/suspended/banned), verification
status, join date.

Implement:
1. Signup, login, and email verification flow using [provider]'s SDK
   — not custom token/session logic
2. User record creation on successful signup, with default account
   status "active" and verification status "unverified"
3. Middleware that checks account status on every authenticated
   request, blocking suspended/banned accounts from listing or
   messaging actions specifically (not from browsing)
4. The SellerProfile creation trigger on first listing attempt

Write tests for the failure paths specifically: unverified email
attempting to list, suspended account attempting to message, banned
account attempting login.
```

---

## Common Mistake: Skipping Email Verification "For Now"

> ️ It's tempting to defer email verification to "make signup faster" during early development. Don't ship past this module without it — your Trust & Safety module identified it as baseline fraud prevention, and retrofitting a verification requirement after real accounts exist (some verified, some not) is messier than building it correctly from the start.

---

## What You Should Walk Away With

1. Working signup, login, and email verification using your managed provider
2. Account status correctly gating listing/messaging actions, verified against the failure-path table above
3. SellerProfile creation wired to first-listing-attempt, not signup
4. Confidence that no custom session/token logic was hand-rolled

This is now the dependency every remaining Phase 3 module builds on. Database, next, defines the full schema this auth layer writes into — confirm your User and SellerProfile tables match what you've actually implemented here before proceeding.
