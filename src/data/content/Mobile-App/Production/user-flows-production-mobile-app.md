---
title: User Flows
slug: user-flows
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# User Flows

A user flow is a map of every decision and transition a user makes to complete a goal. Before any screen is designed, every flow must be fully resolved on paper.

Designing screens before flows is the most common and most expensive UX mistake in mobile development. You end up with beautiful screens that don't connect logically, missing states that appear only during QA, and navigation patterns that make sense individually but confuse users in sequence.

Flow first. Screens second.

---

## What a User Flow Defines

For each user goal, a flow defines:

- **Entry point** — where does this flow start?
- **Decision nodes** — what choices does the user make?
- **System responses** — what does the app do at each step?
- **Error paths** — what happens when something goes wrong?
- **Exit points** — where does the flow end, successfully or otherwise?

A flow that only covers the happy path is half a flow. The error paths, permission denials, network failures, and empty states are where most usability problems live.

---

## The Core Flows Every App Needs

Map these before anything else. Every mobile app has them, regardless of category.

### 1. First Launch & Onboarding
The most critical flow. Gets the user from cold open to first value.

```
App opens (first time)
       │
       ▼
Splash / loading
       │
       ▼
Welcome screen
       │
       ├─ "Sign Up" ──────────────────────────────┐
       │                                          │
       └─ "Log In" ──────────────────────────────┐│
                                                 ││
                    ┌────────────────────────────┘│
                    ▼                             │
            Choose auth method                   │
            Email / Google / Apple               │
                    │                            │
                    ▼                            │
            Enter credentials                   │
                    │                            │
              ┌─────┴──────┐                    │
              ▼            ▼                    │
           Success       Error                  │
              │         (wrong password,        │
              │          network fail)          │
              ▼            │                    │
        Personalization    │                    │
        quiz (if any)      └──► Retry / Reset   │
              │                                  │
              ▼                                  │
        Permission requests                     │
        (notifications, etc.)                   │
              │                                  │
              ▼                                  │
        First core action                       │
        (activation moment)                     │
              │                                  │
              ▼                                  │
         Home / Dashboard ◄────────────────────┘
```

**Key decisions to resolve in this flow:**
- Is account creation required before the core action, or deferred?
- What permissions are requested, and when?
- Is there a personalization quiz? How many questions?
- What triggers the paywall — during onboarding or after?

---

### 2. Returning User Session
The flow for every session after the first.

```
App opens (returning user)
       │
       ▼
Check session validity
       │
       ├─ Valid session ──► Home / Dashboard
       │
       └─ Expired session ──► Silent refresh
                                    │
                              ┌─────┴──────┐
                              ▼            ▼
                          Refreshed     Failed
                              │            │
                              ▼            ▼
                           Home       Login screen
                                     (with context:
                                     "Session expired")
```

This flow is invisible when it works. When it doesn't — when users are unexpectedly logged out or lose unsaved work — it produces 1-star reviews.

---

### 3. Core Action Loop
The repeating cycle that delivers your core value. Map every repetition.

```
[Trigger — notification / habit / schedule / intent]
       │
       ▼
User opens app / arrives at core screen
       │
       ▼
[Core action — log entry, complete task, record data]
       │
       ├─ Success ──► Confirmation / reward
       │                    │
       │                    ▼
       │              Data saved locally
       │              + sync to server
       │                    │
       │              ┌─────┴──────┐
       │              ▼            ▼
       │          Synced OK    Sync failed
       │                      (show retry,
       │                       keep local copy)
       │
       └─ Error ──► [specific error state for this action]
```

---

### 4. Paywall & Subscription
The flow from free to paid. Every touchpoint matters.

```
User hits premium feature / limit
       │
       ▼
Paywall screen shown
(which plan triggered, what's behind it)
       │
       ├─ User dismisses ──► Returns to previous screen
       │
       └─ User taps plan ──► Confirm purchase (OS native sheet)
                                    │
                              ┌─────┴──────┐
                              ▼            ▼
                          Purchase      Purchase
                          success       failed / cancelled
                              │              │
                              ▼              ▼
                        Unlock feature    Return to paywall
                        + confirmation    (with error message)
                        toast
                              │
                              ▼
                        Feature available
```

---

### 5. Account Management
Password reset, email change, account deletion. These must exist and must work.

```
Forgot password:
Login screen → "Forgot password?" → Enter email
→ [Email sent confirmation] → Email received
→ Reset link opens app (deep link) → New password screen
→ Password saved → Login with new password

Account deletion (required for App Store):
Settings → Account → Delete Account
→ Confirmation screen (consequences explained)
→ [Confirm deletion button — destructive, red]
→ Data deletion initiated → Signed out → Welcome screen
```

Account deletion is an App Store requirement. If it's not in your flow, your app will be rejected.

---

### 6. Error & Recovery Flows

Map each distinct error state:

```
Network unavailable:
Action attempted → Network check fails
→ Show inline error ("No internet connection")
→ Queue action locally (if offline-capable)
→ Retry when connection restored

Auth token expired mid-session:
API call returns 401 → Attempt silent refresh
→ [Success: retry original call transparently]
→ [Failure: redirect to login, preserve navigation state]

Core action fails (server error):
Action submitted → Server returns 500
→ Show toast ("Something went wrong — try again")
→ Preserve user's input (don't clear the form)
→ [Retry button] or [auto-retry with backoff]
```

---

## Flow Notation

You don't need a tool. A consistent notation is enough.

```
[Screen / State]     → described in square brackets
Decision             → branch with ─ and labels
Path                 → arrows with │ ├ └ ▼ ►
Error path           → labeled with (error condition)
System action        → described in parentheses
Exit / end state     → ► [final screen]
```

Consistency matters more than tool choice. Figma, Miro, FigJam, Whimsical, or plain text all work. What matters is that every path is drawn, including error paths.

---

## Flows → Screen Inventory

Once every flow is mapped, extract the complete screen list. Every box in your flow diagrams is a screen that must be designed.

From the flows above:

```
ONBOARDING SCREENS
□ Splash / loading
□ Welcome
□ Choose auth method
□ Sign up — email
□ Sign up — verify email
□ Log in — email
□ Forgot password
□ Reset password
□ Personalization quiz (per question + completion)
□ Permission request — notifications
□ First core action prompt

CORE APP SCREENS
□ Home / Dashboard
□ [Core feature] — list view
□ [Core feature] — detail view
□ [Core feature] — create / edit
□ [Core feature] — empty state

PAYWALL SCREENS
□ Paywall — triggered by [feature]
□ Subscription confirmation

SETTINGS SCREENS
□ Settings root
□ Account settings
□ Notification preferences
□ Delete account — confirmation

SYSTEM SCREENS
□ Network error state
□ Generic error state
□ App update required
```

This list is your design backlog. Not a single screen should be designed that isn't on this list — and not a screen on this list should be skipped.

---

## Implementation Checklist

- [ ] All core flows mapped end-to-end, including error paths
- [ ] Happy path and error path exist for every flow
- [ ] Paywall flow mapped with all exit points
- [ ] Account deletion flow included (App Store requirement)
- [ ] Returning user session expiry handled
- [ ] Offline behavior defined for each core action
- [ ] Complete screen inventory derived from flows
- [ ] Each screen in the inventory has an owner and status (not started / in design / complete)
- [ ] Deep link entry points identified and mapped (password reset, notifications, etc.)

---

## AI Prompt — User Flow Generation

```
You are a senior UX designer mapping user flows for a production mobile app.

My app: [describe in 2–3 sentences]
Core action (the thing users do every session): [describe]
Monetization model: [freemium / subscription / one-time]
Auth methods: [email + password / Google / Apple / magic link]
Platform: [iOS / Android / both]
Offline capability: [yes / no / partial]

Map the following user flows in full detail, including all decision branches and error paths:

1. First launch and onboarding (cold open → first core action complete)
2. Returning user session (including expired session handling)
3. Core action loop (one full cycle with success and failure paths)
4. Paywall and subscription (trigger → purchase → unlock or failure)
5. Forgot password / account recovery
6. Account deletion (with confirmation)

For each flow:
- Show every decision node and its branches
- Include at least one error path per flow
- Identify where offline behavior must be handled
- Flag any step that requires a permission request and when to request it

After all flows, generate the complete screen inventory derived from the flows.
Mark which screens are required for App Store compliance.
```
