---
title: User Flows
slug: user-flows
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 40–55 min
---

# User Flows

A user flow is the complete map of every path a user can take through your product — including the paths where things go wrong.

Most developers design the happy path and discover the edge cases in production. User flows prevent that. They force you to answer "what happens when X fails" before you write a single line of code, when the answer is cheap.

---

## What User Flows Are Not

**Not wireframes.** Wireframes show what the UI looks like. Flows show how users move through it. You need flows before wireframes — not the other way around.

**Not feature descriptions.** Your PRD describes what exists. Flows describe how a user navigates through what exists, step by step, decision by decision.

**Not just the happy path.** A flow that only covers success is half a flow. Error states, empty states, edge cases, and recovery paths are part of the flow.

---

## The Anatomy of a User Flow

Every flow has five components:

| Component | Description |
|---|---|
| **Entry point** | What triggers this flow (landing on a page, clicking a button, receiving an email) |
| **Steps** | Each discrete action the user takes or decision they make |
| **System responses** | What the system does after each user action |
| **Branch points** | Where the flow diverges based on user input or system state |
| **Terminal states** | Where the flow ends (success, error, abandonment) |

---

## The Flows Every Production App Needs

Before mapping your core feature flows, ensure these foundational flows are documented.

### Authentication Flows

```
## Flow: Sign Up

Entry: User clicks "Get Started" / "Sign Up"

Steps:
1. User arrives at sign-up page
2. User enters email + password (or chooses OAuth provider)
3. System validates: email format, password strength, email uniqueness
   → Invalid: inline error, form preserved
   → Duplicate email: "Account exists — sign in instead" with link
4. System creates user account
5. System sends verification email
6. User sees "Check your email" confirmation screen
7. User clicks verification link in email
8. System verifies token (valid, not expired, not already used)
   → Expired: prompt to resend
   → Already used: redirect to sign-in
9. System marks email as verified, creates session
10. User redirected to onboarding or dashboard

Empty state: Dashboard shows onboarding prompt, no data yet
```

```
## Flow: Sign In

Entry: User navigates to /login or is redirected after auth-gated action

Steps:
1. User enters credentials
2. System validates
   → Invalid credentials: generic error ("Email or password incorrect")
     Note: Never confirm which field is wrong — enumeration attack risk
   → Account not verified: prompt to resend verification email
   → Account locked (after N failed attempts): show lockout message + unlock path
3. System creates session
4. User redirected to originally requested URL or default dashboard

Rate limiting: After 5 failed attempts in 15 minutes → temporary lockout
```

```
## Flow: Password Reset

Entry: User clicks "Forgot password"

Steps:
1. User enters email address
2. System responds: "If an account exists, you'll receive an email"
   Note: Same message whether or not account exists — prevents enumeration
3. System sends reset email (if account exists) — token valid for 1 hour
4. User clicks link in email
5. System validates token (valid, not expired, not already used)
   → Invalid/expired: prompt to request new reset
6. User enters new password (with confirmation)
7. System validates password strength
8. System updates password, invalidates all existing sessions
9. User redirected to sign-in with success message
```

---

### Onboarding Flow

The first-use experience is the highest-leverage flow in your product. Users who don't reach the core value in session one rarely return.

```
## Flow: Onboarding

Entry: First sign-in after account creation / email verification

Goal: Get the user to [core value moment] before they leave

Steps:
1. User arrives at onboarding (skippable? yes/no — decide explicitly)
2. [Step that collects minimum necessary setup info]
3. [Step that creates their first [core entity] — or offers a template/example]
4. User reaches the core value moment: [describe specifically]
5. System prompts: "You just [did the thing] — here's what's next"
6. User enters normal product flow

Drop-off handling:
- User who skips onboarding → what do they see in empty dashboard?
- User who abandons mid-onboarding → what happens on next sign-in?
- User who completes onboarding but doesn't return in 48h → email trigger?
```

> [!WARNING]
> Every step you add to onboarding reduces completion rate. Request only the information you need to deliver value in session one. Everything else can be collected later, progressively.

---

## Mapping Core Feature Flows

For each Core feature in your PRD, map the complete flow.

**Flow template:**

```
## Flow: [Feature Name]

Entry point: [what triggers this flow]
Preconditions: [what must be true for this flow to be available]

### Happy Path

1. User [action]
   System: [response — what changes, what appears, what is saved]

2. User [action]  
   System: [response]

3. [Continue until terminal state]

Terminal state: [what success looks like — what the user sees]

### Branch Points

IF [condition]:
  → [alternative path]

IF [condition]:
  → [alternative path]

### Error States

| Error Condition | User Sees | Recovery Path |
|---|---|---|
| [What went wrong] | [Specific message — not "Something went wrong"] | [What they can do] |
| [What went wrong] | [Specific message] | [What they can do] |

### Empty State
[What the user sees the first time they encounter this feature with no data]

### Loading State
[What the user sees while the system is processing]

### Edge Cases
- [What happens if user submits twice]
- [What happens if user navigates away mid-flow]
- [What happens at the limit — max file size, max items, etc.]
```

---

## Flow Notation

For complex flows with many branches, use a structured notation alongside prose.

```
[Entry] 
  ↓
[User Action]
  ↓
[System Validates]
  ├─ Valid → [Next Step]
  └─ Invalid → [Error State] → [Recovery] → [Return to Step]
        ↓
[System Processes]
  ├─ Success → [Success State]
  └─ Failure → [Error State] → [Recovery Path]
```

This is sufficient for most flows. You don't need diagramming software until flows become complex enough that prose is genuinely ambiguous.

---

## The Flows That Get Skipped and Cause Problems

These are the flows developers commonly skip. Every one of them has caused production incidents.

**Account deletion:**
```
What happens to the user's data?
Are subscriptions cancelled automatically?
Is there a grace period / "undo" window?
What happens to content they created that others depend on?
```

**Plan downgrade:**
```
User on Pro downgrades to Free — what happens to features beyond the Free limit?
Are they warned before downgrade completes?
What happens to data that exceeds the Free tier limit?
```

**Concurrent session handling:**
```
User signs in on two devices — what happens?
User changes password on device A — does device B get signed out?
```

**Token / session expiry:**
```
User is mid-flow when their session expires — what happens?
Does the form data survive a session expiry and re-login?
```

**Third-party dependency failure:**
```
Stripe is down during checkout — what does the user see?
Email provider is down during sign-up — what does the user see?
File storage is slow during upload — is there a timeout? What's the recovery?
```

Document all of these before building.

---

## Prompt: Generate User Flows

```
Copy Prompt
```

```
I'm building a production web app. Generate complete user flows for the 
following Core features from my PRD.

Product: [1–2 sentence description]
Primary user: [description]

Feature to map: [feature name]
User story: [from PRD]
Functional requirements: [FR-001, FR-002, etc. from PRD]

Generate the complete flow including:

1. Happy path — every step with system responses
2. All branch points — every decision the user or system makes
3. Error states — specific error messages (not generic ones) and recovery paths
4. Empty state — what the user sees with no data
5. Loading state — what the user sees while waiting
6. Edge cases — at least 3 specific edge cases for this feature

Also flag:
- Any step where the UX decision is non-obvious and worth calling out
- Any step that has a security implication
- Any step where a real-time vs. async approach needs to be decided

Format as structured prose with branch notation where helpful.
```

---

## Validating Your Flows

Before moving to wireframes, walk through every flow manually.

**The "first time user" test:** Go through the sign-up → onboarding → core action flow as if you have never seen the product. Does every step make sense without prior context?

**The "what if" test:** For every step, ask "what if the user does something unexpected?" What if they submit an empty form? What if they paste 10,000 characters into a text field? What if they click back mid-flow?

**The "error recovery" test:** Trigger every documented error state. Does the user know what happened and what to do next? "Something went wrong" with no recovery path is a dead end.

**The "empty state" test:** Go through every screen with zero data. Does the product communicate what to do next, or does it show a confusing blank state?

---

## User Flows Checklist

- [ ] Authentication flows documented: sign up, sign in, sign out, password reset, email verification
- [ ] Onboarding flow documented with explicit goal (reach core value moment)
- [ ] Every Core feature has a complete happy path flow
- [ ] Every Core feature has documented error states with specific messages
- [ ] Every Core feature has documented empty and loading states
- [ ] Branch points are explicit — every "if/else" in user behaviour is documented
- [ ] Account deletion flow documented with data handling decision
- [ ] Plan change (upgrade and downgrade) flow documented if monetised
- [ ] Session expiry handling documented
- [ ] Third-party failure states documented for critical dependencies
- [ ] All flows reviewed with "first time user" and "what if" tests

---

## What Comes Next

**Information Architecture** — organising the product's content, navigation, and structure so that users can always find what they need without thinking about where it lives.

Flows tell you how users move through the product. Information architecture tells you how the product is organised so those movements are intuitive.
