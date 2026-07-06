---
title: User Flows
slug: user-flows
phase: Phase 1
mode: production
projectType: saas
estimatedTime: 30–45 min
---

# User Flows

Your PRD describes what each feature does. User flows describe how features connect into a coherent experience. They're the bridge between requirements and design — the moment where a list of specifications becomes a product someone can actually navigate.

A user flow answers one question: **what does a user do, step by step, to accomplish a specific goal?**

Every ambiguity in a user flow becomes a design question during wireframing, an implementation question during development, or a user confusion during onboarding. Resolve them here, before they become expensive.

---

## Flows vs. Wireframes

These are related but not the same, and confusing them is common.

| | User Flows | Wireframes |
|---|---|---|
| **What it shows** | The sequence of steps and decisions | The layout of a specific screen |
| **Level of detail** | Actions, decisions, system responses | UI components, hierarchy, content |
| **Primary question** | What happens next? | What does this screen look like? |
| **Created when** | Before wireframes | After flows are locked |

You cannot wireframe a screen you haven't flowed. You cannot flow a feature you haven't specified. The sequence is PRD → Flows → Wireframes. Skipping flows produces wireframes that look complete but hide missing states and unresolved decision points.

---

## Anatomy of a User Flow

Every flow has the same components:

**Entry point** — where does the user start? A URL, a button click, an email link, a notification.

**Steps** — the actions the user takes and the system responses that follow. Each step is atomic — one action, one response.

**Decision points** — places where the path branches based on user input or system state. Every branch must be followed to its conclusion.

**Terminal states** — where does the flow end? Success, error, and abandonment are all terminal states. All three must be defined.

**Edge cases** — what happens when something unexpected occurs at any step? Empty data, invalid input, network failure, session expiry.

---

## The Flows Every SaaS MVP Needs

These are the critical paths your product must have fully specified before wireframing begins. Missing any of them means designing incomplete screens.

### 1. Signup and Onboarding Flow

The highest-leverage flow in your product. Users who don't successfully onboard don't convert, don't retain, and don't pay. Every step of friction here is lost revenue.

Map from first touch to first value:

```
Landing page
    ↓
Signup form (email + password, or OAuth)
    ↓
Email verification (if required)
    ↓
Onboarding step 1 → step 2 → step N
    ↓
First meaningful action (the aha moment)
    ↓
Dashboard / home state (with real data)
```

**Decision points to map:**
- What if the email is already registered?
- What if email verification is not completed?
- What if the user drops off mid-onboarding and returns later?
- What if onboarding requires data the user doesn't have yet?
- Can onboarding be skipped? What is the consequence?

---

### 2. Core Value Delivery Flow

The workflow your product exists to enable. This is the flow your users will repeat most often. It should be frictionless, fast, and complete.

Map every step from intent to outcome:

```
User arrives with intention
    ↓
[Step 1 of core workflow]
    ↓
[Step 2 of core workflow]
    ↓
[Step N of core workflow]
    ↓
Outcome achieved / output produced
    ↓
What happens next? (next action, share, export, return)
```

**Decision points to map:**
- What if required data is missing at any step?
- What if the user saves and returns mid-workflow?
- What if the workflow produces an error mid-way?
- What does success look like — and how does the system communicate it?

---

### 3. Authentication Flows

More branching than it looks. Most teams underspecify this and pay for it with support requests.

**Flows to map:**
- Login (email/password)
- Login failure (wrong password, unverified email, deactivated account)
- Forgot password → reset flow
- OAuth login (if applicable) — new user vs. returning user
- Session expiry → reauthentication
- Logout

---

### 4. Billing and Upgrade Flow

This flow directly generates revenue. Every broken step here is lost money.

```
Trial user hits limit or trial ends
    ↓
Upgrade prompt shown (where? what triggers it?)
    ↓
User sees pricing / plan selection
    ↓
User enters payment details
    ↓
Payment succeeds → account upgraded → confirmation
Payment fails → error shown → retry or support path
```

**Decision points to map:**
- Where are upgrade prompts shown? (Feature gates, trial expiry banners, limit warnings)
- What happens immediately after successful payment?
- What happens if payment fails on initial purchase?
- What happens when a subscription renewal fails?
- Can users downgrade? What happens to data that exceeds the lower plan's limits?
- What does cancellation look like? Is there a confirmation step? A win-back prompt?

---

### 5. Empty States and First-Use Flows

Every data-dependent view in your product has an empty state — what the user sees before they've created anything. Empty states are not edge cases. They are the first experience every new user has.

For each major view, define:
- What the user sees when there's no data yet
- What action they're prompted to take
- Where that action takes them

An empty state with no call to action is a dead end. Every empty state must have an exit.

---

### 6. Error and Recovery Flows

These are the flows nobody wants to think about and everyone needs.

**Cover at minimum:**
- Form validation errors (inline, immediate)
- Server errors (something went wrong — what does the user see and do?)
- Network failure (offline state, timeout)
- 404 / not found (user navigates to a deleted or non-existent resource)
- Permission errors (user tries to access something they can't)
- Session expiry mid-action (user submits a form after their session expired)

For each: what does the user see? What can they do? Does their work get preserved?

---

## How to Document Flows

For each flow, write it in two formats: a step-by-step narrative and a visual flow diagram.

### Step-by-Step Narrative

Clear, precise, no ambiguity. Each step is one user action or one system response.

```
Flow: Password Reset

Entry: User clicks "Forgot password" on login screen

1. System shows password reset form with email field
2. User enters email address and submits
3. [Branch A] Email exists in system:
   - System sends password reset email
   - System shows confirmation: "Check your email"
   - Email contains reset link valid for 1 hour
4. [Branch B] Email does not exist in system:
   - System shows same confirmation (security: don't reveal if email exists)
5. User clicks reset link in email
6. [Branch A] Link is valid and unexpired:
   - System shows new password form
   - User enters and confirms new password
   - System validates (min length, complexity requirements)
   - System updates password, invalidates all existing sessions
   - System redirects to login with success message
7. [Branch B] Link is expired or already used:
   - System shows error with option to request a new link
   - Flow returns to step 1

Terminal states:
- Success: User has new password, redirected to login
- Abandoned: User did not click email link (no action needed)
- Error: Link expired → user can restart
```

### Visual Flow Diagram

Use simple notation. Rectangles for steps, diamonds for decisions, arrows for flow direction. You don't need specialized software — a text-based diagram communicates just as well for most flows.

```
[Login Screen]
      |
[Forgot password clicked]
      |
[Show email form]
      |
[User submits email]
      |
      ├── Email exists ──→ [Send reset email] ──→ [Show confirmation]
      │                                                    |
      └── No email ────→ [Show same confirmation]    [User clicks link]
                                                          |
                                              ┌── Valid ──┴── Expired ──┐
                                              ↓                          ↓
                                    [New password form]        [Show error + restart]
                                              |
                                    [Password updated]
                                              |
                                    [Redirect to login]
```

---

## Use AI to Generate Flow Drafts

Give AI your feature specifications and let it draft the flows. Then review every branch critically — AI consistently underspecifies error states and edge cases.

```prompt
I'm building a SaaS product. Generate detailed user flows for the
following features based on the specifications provided.

Product context:
Value Proposition: [paste yours]
Target User: [describe]

Feature specifications:
[paste the relevant feature specs from your PRD]

For each feature, generate:
1. A step-by-step narrative flow covering the happy path
2. All decision points and their branches
3. Error states and how the user recovers from each
4. Empty states where relevant
5. Terminal states (success, error, abandonment)

Format each step as: Actor (User/System) → Action/Response
Flag any assumptions you're making.
Do not skip error states. Do not skip empty states.
```

After generation, check every flow against this list before accepting it:

- [ ] Every decision point has all branches mapped
- [ ] Every branch reaches a terminal state
- [ ] Every error state has a recovery path
- [ ] Every empty state has a call to action
- [ ] The happy path connects entry to outcome without gaps
- [ ] Session expiry is handled for any multi-step flow

---

## Common Flow Mistakes

> [!WARNING]
> **Only mapping the happy path**
>
> The happy path is 20% of what users will experience. Edge cases, errors, and recovery flows are the other 80%. A flow that only shows success is a flow that's 80% incomplete.

---

> [!WARNING]
> **Flows that end in ambiguity**
>
> "User completes action → [end]" is not a terminal state. What does the user see? What can they do next? Where does the system take them? Every terminal state must be explicit.

---

> [!WARNING]
> **Skipping the billing flow**
>
> Billing flows are consistently the most underspecified flows in early-stage SaaS PRDs. Every branch in the billing flow touches revenue. Specify it completely before wireframing.

---

> [!WARNING]
> **Treating onboarding as a single step**
>
> "User signs up → sees dashboard" skips the most critical experience in your product. Map onboarding step by step, including what happens when users drop off at each step and return later.

---

## Flow Handoff to Wireframes

Your flows are complete when every screen implied by the flows has been identified. Before moving to wireframing, extract a complete screen inventory from your flows:

```
Screen inventory (example):
- Landing page
- Signup form
- Email verification pending
- Onboarding step 1
- Onboarding step 2
- Dashboard (empty state)
- Dashboard (populated state)
- [Core feature] view
- Settings / account
- Billing / upgrade
- Plan selection
- Payment form
- Subscription confirmation
- Password reset request
- Password reset form
- 404 page
- Generic error page
```

Every screen on this list gets a wireframe. Every screen not on this list is a gap. Your wireframe phase is only as complete as your screen inventory.

---

## Validation Checklist

- [ ] Signup and onboarding flow is fully mapped including drop-off and return states
- [ ] Core value delivery flow is mapped end to end with all decision points
- [ ] All authentication flows are mapped including failure and recovery states
- [ ] Billing and upgrade flow is fully mapped including payment failure and cancellation
- [ ] Every major view has an empty state with a defined call to action
- [ ] Error and recovery flows exist for all critical failure modes
- [ ] Every flow has been checked: all branches reach terminal states
- [ ] A complete screen inventory has been extracted from the flows
- [ ] AI-generated flows have been reviewed and all missing edge cases added

---

## Quick Reference

```
Required Flows for SaaS MVP
────────────────────────────────────────────────
1. Signup + onboarding    →  Entry to first value
2. Core value delivery    →  Primary repeated workflow
3. Authentication         →  Login, reset, OAuth, expiry
4. Billing + upgrade      →  Trial end to active subscription
5. Empty states           →  Every data-dependent view
6. Error + recovery       →  Failures at every critical step

Flow Completeness Test
────────────────────────────────────────────────
□ All decision points have all branches mapped
□ All branches reach a terminal state
□ All error states have recovery paths
□ All empty states have calls to action
□ Happy path connects entry to outcome without gaps
□ Session expiry handled in multi-step flows

Flow → Wireframe Handoff
────────────────────────────────────────────────
Extract every screen implied by every flow.
That list is your wireframe scope.
Missing screens = missing wireframes = missing features.
```
