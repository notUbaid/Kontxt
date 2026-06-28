---
title: User Flows
slug: user-flows
phase: Phase 1
mode: personal
projectType: web app
estimatedTime: 25–35 min
---

# User Flows

Before you design screens or write components, you need to know what a user actually does in your app — step by step, decision by decision.

User flows are that map. They're not UI design. They're not wireframes. They're the sequence of actions a user takes to accomplish a goal, and the branches that happen when something goes differently than expected.

Getting this right before you build saves you from discovering mid-development that your navigation makes no sense, or that a critical action has no clear entry point.

---

## What a User Flow Actually Is

A user flow answers one question: **"What does a user do, in what order, to accomplish X?"**

It has three elements:

- **Steps** — actions the user takes (click, type, submit, navigate)
- **Decisions** — branch points where different things happen (logged in or not, success or error)
- **Outcomes** — what the user sees or gets at the end of each path

It is not a description of your UI. It's a description of user behavior that your UI needs to support.

---

## Start With Your Core Flows

For your MVP, you have a small number of things a user can do. Each one is a flow.

Every personal web app has at least these two:

**1. Onboarding flow** — How a new user gets from "never heard of this" to "successfully using the core feature for the first time."

**2. Core action flow** — The primary thing a returning user comes back to do. The reason the app exists.

Map these two before anything else. Additional flows (settings, account management, edge cases) come after.

---

## How to Map a Flow

Use the simplest format that works. For a personal project, that means plain text or a simple diagram — not a Figma plugin or a specialized tool.

**Plain text format:**

```
Flow: [Name]
Trigger: [What causes the user to start this flow]

1. User lands on [screen]
2. User [action]
   → If [condition A]: go to step 3
   → If [condition B]: show [error/state], go to step 2
3. System [does something]
4. User sees [result]
5. Flow ends at [screen/state]
```

**Example — Core action flow for a habit tracker:**

```
Flow: Log a habit completion
Trigger: User opens app and wants to mark a habit done for today

1. User lands on Dashboard (habit list for today)
2. User taps the checkmark next to a habit
   → If habit not yet logged today: mark complete, show streak count update
   → If habit already logged today: show "Already logged" state, no action
3. System saves completion with current timestamp
4. User sees habit visually marked complete, streak incremented
5. Flow ends at Dashboard
```

Notice what this is not: it says nothing about colors, layout, fonts, or components. It's pure behavior.

---

## The Onboarding Flow

This flow deserves extra attention because it's where most users decide whether to keep using your app or leave.

Map it with brutal honesty about every step of friction:

```
Flow: New user onboarding
Trigger: User visits app for the first time

1. User lands on homepage/landing
2. User clicks [primary CTA]
3. User reaches signup screen
   → Email/password: fill form → submit
   → If email already exists: show error, offer login link
   → If validation fails: show inline errors, stay on form
4. System creates account, sends verification email (if required)
5. User lands on [first logged-in screen]
   → If app is empty: show empty state with clear first action
   → If app has demo/sample data: user sees populated state
6. User completes first core action
7. Onboarding complete
```

Every step in this flow is a potential drop-off point. The fewer steps, the better.

> ** Warning**
> Email verification before first use kills onboarding for personal projects. Unless you have a strong security reason, let users in immediately after signup and verify email in the background or on next login. Every extra step before the first "aha moment" loses users.

---

## Mapping Decision Points

The most important part of a user flow is the branches — what happens when something goes wrong or differently than expected.

For every step where something can go differently, map it:

| Step | Happy Path | Error / Edge Case |
|---|---|---|
| Submit login form | Redirect to dashboard | Wrong password → inline error; Account not found → suggest signup |
| Create new item | Item appears in list | Empty title → validation error; Network failure → retry toast |
| Delete an item | Item removed from list | Confirm dialog first; Undo option for 5 seconds |
| Load dashboard | Shows user's data | No data yet → empty state with CTA; Load error → error message with retry |

You don't need to design the error states yet. You just need to know they exist so you don't accidentally forget to build them.

---

## Using AI to Generate Flow Drafts

**Copy Prompt**

```
Here is my PRD: [paste PRD]

Based on this, map out the user flows for my MVP.

For each core feature, write:
1. The trigger (what causes a user to start this flow)
2. The happy path (step by step, user actions and system responses)
3. The key error and edge cases at each decision point
4. The final state (what screen/state the user ends on)

Use plain numbered steps with → branches for decisions.

Focus only on MVP features. Do not invent flows for features that aren't in the PRD.
```

---

## Validating Your Flows

Read each flow and ask:

- [ ] Is there a clear entry point? Does the user know how to start?
- [ ] Does every decision branch lead somewhere — no dead ends?
- [ ] Is the happy path the shortest realistic path? Any unnecessary steps?
- [ ] Are errors handled — not designed yet, but acknowledged?
- [ ] Does the flow end somewhere that makes sense?
- [ ] Would a new user, with no instructions, be able to follow this path?

If any flow has a step where the answer is "they'd figure it out" — that's not a flow, that's a guess. Tighten it.

---

## What to Do With Your Flows

Save your flows in a file called `USER_FLOWS.md` in your project repo, alongside your PRD.

These two documents together become your standard context paste for AI tools throughout development. When you ask AI to build a screen, a component, or an API endpoint — attach the relevant flow. The output will be dramatically more aligned with what you actually need.

> ** Tip**
> When a flow feels complicated to write, that's a signal the feature itself is complicated. Simplify the flow first. The simpler the flow, the simpler the code that implements it.

---

## User Flows Checklist

- [ ] Onboarding flow is mapped end to end
- [ ] Core action flow(s) are mapped for every MVP feature
- [ ] Every decision point has at least a happy path and one error branch
- [ ] No flow has a dead end
- [ ] Flows are saved as `USER_FLOWS.md` in the project repo
- [ ] You've read each flow as if you were a new user seeing the app for the first time

---

## What's Next

Move to **Design System** — establishing the visual foundation (colors, typography, spacing, components) before you build any UI, so your app looks intentional instead of assembled.
