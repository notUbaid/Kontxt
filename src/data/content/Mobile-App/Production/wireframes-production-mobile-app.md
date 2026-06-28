---
title: Wireframes
slug: wireframes
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 35–50 min
---

# Wireframes

Wireframes are not drawings. They are decisions.

Every box you place answers a question: what does this screen do, what does the user need here, and what happens next? Done right, wireframes catch expensive mistakes before a single line of code is written. Done wrong, they become decoration that developers ignore.

This module teaches you how to wireframe like a product engineer — fast, purposeful, and with enough detail to build from.

---

## What Wireframes Are (and Aren't)

```
Wireframes ARE:                    Wireframes ARE NOT:
 Layout decisions                 Visual design
 Content hierarchy                Final colors or typography
 Interaction flows                Pixel-perfect specs
 Navigation structure             Developer handoff documents
 State coverage (empty, error)    Marketing assets
```

Wireframes answer: **what is on this screen and why?**

Design answers: **what does it look like?**

Keep them separate. Mixing them slows both down.

---

## Before You Wire: The Screen Inventory

Never start wireframing without knowing every screen you need to build.

Pull your User Flows from the previous module. Every distinct step in every flow becomes a screen. List them.

```
Authentication
├── Onboarding (3 slides)
├── Sign Up
├── Log In
├── Forgot Password
└── Email Verification

Core App
├── Home / Feed
├── Search
├── Search Results
├── Detail View
├── [Your core action screen]
└── [Your secondary action screen]

User
├── Profile
├── Edit Profile
├── Settings
├── Notifications
└── [Feature-specific screens]

Utility
├── Empty States (per major screen)
├── Error States
└── Loading States
```

Count your screens. For an MVP, 15–25 screens is typical. More than 40 means your MVP isn't minimal.

---

## Mobile Wireframe Fundamentals

### The Grid

Every mobile screen operates on a predictable spatial grid.

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│         Navigation Bar          │
│         (44–56pt)               │
├─────────────────────────────────┤
│                                 │
│                                 │
│         Content Area            │
│         (fills remaining)       │
│                                 │
│                                 │
├─────────────────────────────────┤
│         Tab Bar / Bottom Nav    │
│         (49–83pt)               │
└─────────────────────────────────┘

Horizontal margins:  16–20pt
Content width:       Screen width − 32–40pt
Touch target min:    44×44pt (Apple HIG), 48×48dp (Material)
```

These aren't suggestions. Violate them and your app feels wrong before anyone can say why.

### Thumb Zone

The bottom 60% of the screen is where thumbs reach comfortably. Primary actions live here. Navigation lives here. Destructive actions that require confirmation can sit higher — the friction is intentional.

```
┌─────────────────┐
│   Hard reach  │ ← Secondary info, back buttons, settings
│                 │
│   Natural     │ ← Content display, labels
│                 │
│   Easy reach  │ ← Primary CTA, Tab Bar, key interactions
└─────────────────┘
```

---

## The Six Screens Every App Must Wire First

Regardless of what your app does, wireframe these before anything else. They define the skeleton everything else attaches to.

### 1. Splash / Launch Screen

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│          [App Logo]             │
│         App Name                │
│                                 │
│                                 │
│          [Tagline]              │
│                                 │
│                                 │
└─────────────────────────────────┘
```

Simple. Logo centered. No interaction. Disappears in 1–2 seconds.

---

### 2. Onboarding (3 slides max)

```
┌─────────────────────────────────┐
│                                 │
│      [Illustration / Icon]      │
│                                 │
│      Benefit Headline           │
│      One supporting sentence    │
│      explaining the value.      │
│                                 │
│          ● ○ ○                  │  ← Progress dots
│                                 │
│      [    Continue    ]         │
│      Skip                       │
└─────────────────────────────────┘
```

Three slides maximum. Each sells one benefit. Always provide a skip option — forcing onboarding increases drop-off.

---

### 3. Authentication Screen

```
┌─────────────────────────────────┐
│ ← Back          [App Logo]      │
│                                 │
│  Welcome back                   │
│                                 │
│  [    Continue with Google   ]  │
│  [    Continue with Apple    ]  │
│                                 │
│  ─────────── or ────────────   │
│                                 │
│  Email                          │
│  [________________________]     │
│                                 │
│  Password                       │
│  [________________________]   │
│                                 │
│  [        Sign In        ]      │
│                                 │
│  Forgot password?               │
│  Don't have an account? Sign up │
└─────────────────────────────────┘
```

Social auth first — it converts better. Email/password below the fold conceptually.

---

### 4. Home Screen

This is the most important screen. It must answer three questions in under 3 seconds: where am I, what can I do here, and what's new?

```
┌─────────────────────────────────┐
│  Good morning, [Name]       │
├─────────────────────────────────┤
│    Search                     │
├─────────────────────────────────┤
│                                 │
│  [Section Header]        See all│
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │      │ │      │ │      │   │
│  │      │ │      │ │      │   │
│  └──────┘ └──────┘ └──────┘   │
│  Label    Label    Label        │
│                                 │
│  [Section Header]        See all│
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │    List / Card Item      │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │    List / Card Item      │  │
│  └──────────────────────────┘  │
│                                 │
├─────────────────────────────────┤
│                        │  ← Tab Bar
└─────────────────────────────────┘
```

---

### 5. Detail Screen

The screen where users take your app's primary action.

```
┌─────────────────────────────────┐
│ ←              [Title]    ⋯    │
├─────────────────────────────────┤
│                                 │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │      Hero Image          │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                 │
│  Item Name                      │
│  Subtitle / Category            │
│                                 │
│    4.2  (120 reviews)    │
│                                 │
│  ─────────────────────────────  │
│                                 │
│  Description                    │
│  Body text content sits here    │
│  and continues below the fold.  │
│                                 │
│  [Key Detail]    [Key Detail]   │
│                                 │
│                                 │
├─────────────────────────────────┤
│  [       Primary Action      ]  │
└─────────────────────────────────┘
```

Primary CTA pinned to bottom. Always visible. Never buried.

---

### 6. Profile / Settings Screen

```
┌─────────────────────────────────┐
│              Profile            │
├─────────────────────────────────┤
│                                 │
│         [Avatar Image]          │
│           User Name             │
│           @username             │
│      [   Edit Profile   ]       │
│                                 │
├─────────────────────────────────┤
│  Account                        │
│  ──────────────────────────     │
│  Notifications              ›   │
│  Privacy                    ›   │
│  Payment Methods            ›   │
│                                 │
│  Support                        │
│  ──────────────────────────     │
│  Help Center                ›   │
│  Rate the App               ›   │
│  Report a Problem           ›   │
│                                 │
│  ──────────────────────────     │
│  Sign Out                       │
│                                 │
└─────────────────────────────────┘
```

---

## State Wireframes

For every major screen, wireframe three states. Skipping this causes scope creep during development when engineers ask "what does this look like when empty?"

### Empty State

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│       [Empty Illustration]      │
│                                 │
│       Nothing here yet          │
│   One sentence explaining why   │
│    and how to change that.      │
│                                 │
│   [     Primary Action     ]    │
│                                 │
└─────────────────────────────────┘
```

Empty states must explain why and offer a next step. A blank screen with no guidance is a dead end.

### Error State

```
┌─────────────────────────────────┐
│                                 │
│       [Error Illustration]      │
│                                 │
│       Something went wrong      │
│   We couldn't load your data.   │
│                                 │
│   [       Try Again       ]     │
│                                 │
└─────────────────────────────────┘
```

### Loading State

```
┌─────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓░░░░░              │  ← Skeleton line
│                                 │
│  ┌────────────────────────┐    │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░  │    │  ← Skeleton card
│  │ ▓▓▓▓▓░░░░░░░░░░░░░░░  │    │
│  └────────────────────────┘    │
│  ┌────────────────────────┐    │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░  │    │
│  │ ▓▓▓▓▓░░░░░░░░░░░░░░░  │    │
│  └────────────────────────┘    │
└─────────────────────────────────┘
```

Skeleton screens — not spinners. Skeletons match the shape of incoming content and reduce perceived wait time.

---

## Wireframing Tools

| Tool | Best For | Cost |
|---|---|---|
| **Figma** | Team collaboration, handoff, components | Free tier available |
| **Excalidraw** | Fast lo-fi sketching, async async collaboration | Free |
| **Balsamiq** | Classic lo-fi wireframes, client presentations | Paid |
| **Whimsical** | Flow + wireframe in one tool | Free tier available |
| **Paper** | Fastest ideation, no setup | Free |

**Recommended for production:** Figma. It handles wireframes, design, prototyping, and developer handoff in one tool. The wireframe-to-design transition is frictionless.

**For speed:** Start with Excalidraw or paper. Commit structure before spending time in Figma.

---

## AI Prompt: Screen Wireframe Generation

Use this to get a detailed wireframe for any specific screen.

```
You are a senior mobile UX designer wireframing screens for a production [iOS / Android / cross-platform] app.

App type: [describe your app in one sentence]
Target users: [who uses this]
Platform: [iOS / Android / both]

Screen to wireframe: [screen name]

Context:
- What the user was doing before arriving at this screen: [describe]
- What the user's goal on this screen is: [describe]
- What happens after they complete the action: [describe]

Generate:
1. A detailed ASCII wireframe showing all UI elements, their positions, and labels
2. Content hierarchy explanation — what the user's eye should hit first, second, third
3. Every interactive element and what it triggers
4. The empty state for this screen
5. The error state for this screen
6. Any platform-specific considerations (iOS vs Android behavior differences)
7. Accessibility notes (touch targets, labels, contrast requirements)

Follow iOS Human Interface Guidelines and Material Design principles where applicable.
```

---

## Wireframe Review Checklist

Before moving to visual design, verify every wireframe passes these checks:

**Structure**
- [ ] Every screen has a clear primary action
- [ ] Navigation is consistent across all screens (same tab bar, same back behavior)
- [ ] No more than one primary CTA per screen
- [ ] Touch targets are at least 44×44pt / 48×48dp

**Content**
- [ ] Every list screen has an empty state wireframe
- [ ] Every data-dependent screen has an error state wireframe
- [ ] Every loading screen uses skeleton, not spinner
- [ ] Form screens show inline error placement (below field, not toasts)

**Flow**
- [ ] Every wireframe is reachable from another screen in the flow
- [ ] Every wireframe has a defined exit / back destination
- [ ] Modal / bottom sheet usage is intentional and consistent

**Coverage**
- [ ] All screens from the User Flows module are represented
- [ ] Authentication flow is complete (sign up, log in, forgot password, verify)
- [ ] Onboarding flow is complete (max 3 slides + skip)
- [ ] Core feature flow is complete end-to-end

---

## Navigation Pattern Decisions

Your navigation pattern affects every screen. Decide now.

| Pattern | Use When | Avoid When |
|---|---|---|
| **Tab Bar** (bottom) | 3–5 equal-weight sections | More than 5 sections |
| **Drawer** (hamburger) | Many sections, secondary nav | Primary actions are frequent |
| **Stack** (push/pop) | Deep hierarchies, detail views | Flat same-level navigation |
| **Modal / Sheet** | Focused tasks, confirmations | Primary content |

**iOS default:** Tab Bar + Stack navigation. Match platform conventions unless you have a strong reason not to.

**Android default:** Bottom Navigation + Stack. Drawer is fading — Material 3 prefers bottom nav.

Mark navigation type on each wireframe. "Push", "Modal", "Tab switch", "Bottom sheet" — engineers need this to implement correctly.

---

## Common Wireframe Mistakes

**Wiring the happy path only.**
You wireframe sign up, home, and detail. You skip empty states, errors, and edge cases. Developers build what they see — and ask questions about everything you didn't wire. Cover all states.

**Too much detail too early.**
Spending time on exact spacing, icon choice, or copy at the wireframe stage. Wireframes use placeholder text ("User Name", "Description goes here") and boxes for images. Save visual decisions for the design phase.

**No hierarchy.**
Every element on the screen is the same size. There's no visual indication of what matters most. Every wireframe should have a clear primary element — the most important thing on the screen — and everything else should support it.

**Inconsistent navigation.**
Tab bar items change between screens. Back button behavior is undefined. Header title format is different on every screen. Navigation must be consistent from the first wireframe.

**Skipping the keyboard state.**
Whenever a text input is focused, the keyboard takes 40–50% of the screen. Input fields that appear to be visible in the default state get covered. Wireframe the keyboard-up state for any screen with text inputs.

---

## Quick Reference

```
Screen min touch target?       → 44×44pt (iOS) / 48×48dp (Android)
Onboarding slides max?         → 3
Primary CTAs per screen?       → 1
Tab bar items max?             → 5
Loading indicator type?        → Skeleton (not spinner)
Horizontal margins?            → 16–20pt
Status bar height?             → 44pt (iPhone) / varies Android
Bottom nav height?             → 49pt (iOS) / 56dp (Android)
```

---

## What's Next

**Branding** — your wireframes define structure. Branding defines personality. The next module covers how to establish a visual identity — color, typography, iconography, and tone — that makes your app instantly recognizable and consistent across every screen.
