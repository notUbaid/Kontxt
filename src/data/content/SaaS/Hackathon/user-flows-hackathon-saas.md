# User Flows

Most teams skip this step. They read the PRD, open their code editor, and start building the first screen they can think of. Three hours later they hit a state they never planned for — the empty dashboard, the redirect after form submission, the screen you need when something fails — and they stop to figure it out from scratch, mid-build, under pressure.

User flows are not wireframes. You are not designing anything yet.

A user flow is a map of every step a user takes to accomplish something. It exists to surface the screens, states, and decisions you need before you start building them — not halfway through.

When you write a flow down, things you thought were simple become specific. "The user creates a schedule" becomes eight discrete steps, three decision points, two error conditions, and an empty state you forgot existed. Knowing that now costs you 20 minutes. Discovering it during a build costs you hours.

---

## The Golden Path

Before mapping anything, understand this: your demo walks one specific sequence of steps, from a specific starting point, to a specific outcome. That sequence is the Golden Path.

Everything on the Golden Path must work flawlessly. Every screen must load. Every action must succeed. Every transition must feel intentional.

Everything off the Golden Path must not crash. It does not need to be complete, polished, or functional — it just cannot throw an error when a judge accidentally clicks somewhere they were not supposed to.

Everything far from the Golden Path can be missing. A 404 is fine. A blank page with a back button is fine.

Your job in this topic is to map the Golden Path in detail, map adjacent paths at a high level, and consciously decide what everything else looks like.

---

## The Three Flows to Map

A hackathon SaaS needs three flows documented before building starts. Everything beyond these is secondary.

**Flow 1 — Onboarding**
The path from first landing to completing the first meaningful action. This includes any sign-up, any setup steps, and the moment the user reaches the product for the first time.

**Flow 2 — Core Loop**
The primary action the product exists to do. For a scheduling tool, it is building a schedule. For an invoice tool, it is creating and sending an invoice. This is almost certainly your Golden Path. Map it in full detail.

**Flow 3 — The Demo Flow**
The specific sequence a judge will see during your 90-second demo. This is likely a compressed version of Onboarding + Core Loop + one key outcome. Map it explicitly — not all demos follow the natural user path.

If your product has a secondary role (a staff view, a client-facing view, a read-only share link), map that flow at a high level only. Do not spend time on paths that do not appear in the demo.

---

## How to Write a Flow

Use this notation. It is simple, readable, and fast to write.

Each step has three parts:
- The **screen** the user is on
- The **action** they take
- The **result** — the next screen, or a branch

```
[Screen]
  └─ [action user takes]
      ├─ [condition] → [Screen]
      └─ [condition] → [Screen]
```

Branches appear where a decision happens — a form that can succeed or fail, a button that goes to different places depending on state, a redirect that depends on whether the user is logged in.

---

## Worked Example — Shiftlog

**Flow 1: Onboarding**

```
Landing Page
  └─ clicks "Get Started"
      └─ Sign Up
           ├─ success → Dashboard [empty state]
           └─ error → Sign Up [with inline error]

Dashboard [empty state]
  └─ clicks "Create your first schedule"
      └─ Schedule Builder [blank]
```

**Flow 2: Core Loop (building and publishing a schedule)**

```
Dashboard [loaded state]
  └─ clicks "New Schedule"
      └─ Schedule Builder [blank grid]
           └─ drags staff member to shift slot
               └─ Schedule Builder [slot filled]
                    └─ repeats for remaining slots
                        └─ clicks "Publish"
                            ├─ success → Schedule View [published state]
                            │               └─ staff receive shift notifications
                            └─ error → Schedule Builder [with error toast]

Schedule View [published state]
  └─ clicks "Edit"
      └─ Schedule Builder [pre-filled]
```

**Flow 3: Demo Flow (what judges see)**

```
[Pre-loaded manager account — skip live sign-up]

Dashboard [loaded, one past schedule visible]
  └─ clicks "New Schedule" — week of [demo date]
      └─ Schedule Builder [blank]
           └─ drags 3 staff across 5 days [live demo]
               └─ clicks "Publish"
                   └─ Schedule View [published]
                        └─ [switch to staff account tab]
                            └─ Staff Dashboard
                                 └─ shows correct shifts for that staff member
                                     └─ clicks "Request swap" on one shift
                                         └─ [switch back to manager tab]
                                             └─ Manager Dashboard
                                                  └─ swap request notification visible
                                                       └─ clicks "Approve"
                                                           └─ swap confirmed [end demo]
```

Notice the Demo Flow uses a pre-loaded account. You skip the sign-up live. You seed realistic data. You rehearse this exact sequence so it takes exactly 90 seconds. Map it before you build, because building it correctly requires knowing every screen it touches.

---

## States Every Screen Must Handle

This is where teams get blindsided. Every screen in your product exists in multiple states. If you build only the loaded/happy state, you will hit the others during the demo at the worst possible moment.

For each screen in your flows, identify which states it needs.

<!-- UI: render as a grid of state cards, each with a description and a "required for demo?" label -->

| State | What it is | Hackathon rule |
|---|---|---|
| **Empty** | The screen before any data exists | Must build. Judges will see this on first load. |
| **Loaded** | Normal state with real data | Must build. This is the main demo state. |
| **Loading** | Waiting for an async operation | Must handle. A spinner is the minimum. |
| **Error** | Something went wrong | Basic handling only. A toast is sufficient. |
| **Success** | An action completed | Must build if it's on the demo path. |

The empty state catches most teams. You demo the loaded state because you seeded data. But a judge who signs up live, or a fresh demo account, hits empty state first. If empty state is a blank white page with no guidance, the product feels broken — not minimal.

Empty state does not need to be beautiful. It needs to exist. A message, a prompt to take the first action, something that acknowledges the user is in the right place.

---

## Extract the Screen Inventory

Once your flows are mapped, extract every unique screen that appears. This becomes the build checklist for your frontend.

Go through every node in your flow diagrams. Every named screen is an item on the inventory. Screens that appear in multiple states count once per state if the state changes the layout significantly.

**Shiftlog screen inventory:**

<!-- UI: render as a checklist the team can check off as screens are built -->

- [ ] Landing Page
- [ ] Sign Up / Login
- [ ] Dashboard — empty state
- [ ] Dashboard — loaded state (schedules listed)
- [ ] Schedule Builder — blank
- [ ] Schedule Builder — partially filled
- [ ] Schedule View — published
- [ ] Staff Dashboard — their shifts
- [ ] Swap Request — submission
- [ ] Manager notification — swap pending
- [ ] Swap confirmation — approved state

That is eleven screens for a reasonably complete demo. Some of these share a component (Builder blank vs. filled is the same screen in different data states). But knowing there are eleven means you know what done looks like. Without the flow map, teams typically discover screen 8, 9, and 10 during the build and scramble.

---

## AI Prompts

<!-- UI: copy-to-clipboard button on each prompt block -->

**Generate flows from your PRD and demo moment**

```
I am building a SaaS for a hackathon. Here is my context:

PRD: [paste full PRD]
Demo Moment: [paste your demo path paragraph]

Generate three user flows in this format:

Flow 1: Onboarding (first landing → first meaningful action)
Flow 2: Core Loop (the primary value action, full detail)
Flow 3: Demo Flow (the exact sequence a judge will see, 90 seconds, using a pre-loaded demo account — skip live sign-up)

Use this notation for each flow:
[Screen]
  └─ [action]
      ├─ [condition] → [Screen]
      └─ [condition] → [Screen]

After the three flows, generate a Screen Inventory — a flat list of every unique screen and state that appears across all three flows.

Do not add screens that are not implied by the PRD. Do not add features that are in Non-Goals.
```

---

**Stress-test flows for missing states and gaps**

```
Here are my user flows:

[paste your three flows]

Review them for:

1. MISSING STATES: For each screen, are there states I have not mapped? Specifically check for: empty state, error state, loading state. Flag any screen that likely appears in a state I have not addressed.

2. BROKEN PATHS: Are there any actions in the flow that do not have a defined destination? Anywhere a user could end up on a screen that leads nowhere?

3. DEMO RISK: Looking specifically at the Demo Flow — is there any step that is likely to fail in a live demo environment? What could go wrong and how should I handle it?

4. MISSING SCREENS: Does the Screen Inventory look complete based on the flows? Are there screens implied by the product description that do not appear?

Do not suggest adding features from Non-Goals.
```

---

**Generate a seeding plan for demo data**

The demo flow requires realistic data to look believable. This prompt produces a seeding plan.

```
I am building [product name]. Here is my Demo Flow:

[paste Demo Flow]

Here is my Screen Inventory:

[paste Screen Inventory]

Produce a demo data seeding plan:
1. What accounts need to exist before the demo starts (names, roles, passwords)
2. What data needs to be pre-loaded in each account so no screen appears empty during the demo
3. What the demo data should look like to appear realistic and professional (not "Test User 1", "Item A", etc.)
4. The exact state of the app at the moment the demo begins

Make the data feel like a real business. Use realistic names, realistic amounts, realistic dates.
```

---

## Reviewing AI Output

**Flows that are too detailed.** If AI mapped every possible error condition and edge case, cut them. You need the happy path in full detail, basic error handling, and nothing else. Over-specified flows create over-scoped builds.

**Screens from Non-Goals.** Check the Screen Inventory against your PRD's Non-Goals section. If a screen appears in the inventory that corresponds to a feature you cut, remove it from the inventory and add a note about how you will handle attempts to reach it (redirect, placeholder, 404).

**A Demo Flow that includes live sign-up.** This is a risk. Live sign-up during a demo is a dependency on email delivery, form validation, redirect logic, and welcome state — all in sequence, live, in front of judges. Seed a demo account instead. If AI's demo flow starts with sign-up, revise it.

**Missing empty states.** AI typically maps the loaded state only. Go through the Screen Inventory and manually confirm every screen that a new user would hit has an empty state defined.

---

## Screen Inventory Checklist

Once you have your Screen Inventory, turn it into a build checklist. Add state columns.

<!-- UI: render as an interactive table — rows are screens, columns are states, cells are checkboxes. Team members can check off screens as they build them. This becomes the real-time build tracker. -->

| Screen | Empty State | Loaded State | Loading | Error | On Golden Path |
|---|---|---|---|---|---|
| [Screen name] | - | - | - | - | Yes / No |

Fill this in for your product. Any row with "Yes" in the Golden Path column gets built first, polished before submission, and rehearsed in the Demo Flow before the deadline.

Any row with "No" in the Golden Path column gets built last, can be rough, and needs only to not crash when encountered.

---

## Your Deliverable

Three flow diagrams and a Screen Inventory with states mapped.

The flows live in the same shared document as your PRD. Add them as a new section. When you paste context into a coding session, include the relevant flow — not all three — alongside the PRD. If you are building the Schedule Builder screen, paste the Core Loop flow. If you are building Onboarding, paste the Onboarding flow. Targeted context produces better AI output than dumping everything.

The Screen Inventory becomes your frontend build tracker. Whoever is building the UI works from it directly. Each screen gets built, both states get verified, Golden Path screens get polished first.

The next topic is Design System — the visual language that makes every screen feel like it belongs to the same product, built in a fraction of the time it would normally take.
