---
title: Sitemap
slug: sitemap
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 15–20 min
---

# Sitemap

A sitemap is the complete map of every screen in your app and how they connect. It is the last step of product design and the first input to architecture.

Before you write navigation code, define the structure. Every screen must have a clear place, a clear owner (which tab or flow it belongs to), and a clear entry and exit path. Ambiguity here becomes bugs, confusing navigation, and deep links that don't work.

---

## Why Mobile Sitemaps Differ from Web

Mobile apps have structural constraints that web doesn't:

| Constraint | Impact |
|---|---|
| Tab bars are permanent anchors | Every screen lives under a tab — or outside the tab structure entirely |
| Stack navigation is hierarchical | Going back must always make sense |
| Modals are interruptions | Overuse breaks flow and back-button behavior |
| Deep links require exact paths | Every screen needs a deterministic URL-like address |
| Push notifications land on specific screens | Every notification target must be a real, reachable screen |

Your sitemap must resolve all of these before architecture begins.

---

## The Four Navigation Zones

Every screen in a mobile app belongs to one of four zones:

```
┌─────────────────────────────────────────────────────────────┐
│                    MOBILE APP ZONES                         │
├────────────────────┬────────────────────────────────────────┤
│  AUTH ZONE         │  MAIN APP ZONE                         │
│                    │                                        │
│  Unauthenticated   │  Authenticated                         │
│  users only        │  users only                            │
│                    │                                        │
│  - Onboarding      │  Tab 1 Stack                           │
│  - Login           │  Tab 2 Stack                           │
│  - Register        │  Tab 3 Stack                           │
│  - Forgot Password │  Tab 4 Stack                           │
│                    │  Tab 5 Stack                           │
├────────────────────┼────────────────────────────────────────┤
│  MODAL ZONE        │  OVERLAY ZONE                          │
│                    │                                        │
│  Flows that        │  Appear above everything               │
│  interrupt tabs    │                                        │
│                    │  - Bottom sheets                       │
│  - Create flow     │  - Action sheets                       │
│  - Onboarding step │  - Permission prompts                  │
│  - Paywall         │  - Rating prompts                      │
│  - Settings        │  - Toast / snackbar                    │
└────────────────────┴────────────────────────────────────────┘
```

---

## Part 1: Sitemap Structure Format

Document your sitemap in a hierarchical format that maps directly to your navigation code.

```
APP
│
├── AUTH (unauthenticated)
│   ├── Onboarding
│   │   ├── Welcome
│   │   ├── Feature Highlight 1
│   │   ├── Feature Highlight 2
│   │   └── Get Started
│   ├── Login
│   ├── Register
│   │   ├── Email & Password
│   │   ├── Profile Setup
│   │   └── Avatar Upload
│   └── Forgot Password
│       ├── Enter Email
│       └── Check Email (confirmation)
│
├── MAIN (authenticated, tab bar visible)
│   │
│   ├── [Tab 1] Home
│   │   ├── Feed (root)
│   │   ├── Post Detail
│   │   │   └── Comments
│   │   └── User Profile (from feed)
│   │
│   ├── [Tab 2] Search / Discover
│   │   ├── Search (root)
│   │   ├── Search Results
│   │   ├── Category Browse
│   │   └── Item Detail
│   │
│   ├── [Tab 3] Create (modal trigger — no stack)
│   │
│   ├── [Tab 4] Notifications
│   │   ├── Notifications List (root)
│   │   └── → navigates to content in other tabs
│   │
│   └── [Tab 5] Profile
│       ├── My Profile (root)
│       ├── Edit Profile
│       ├── My Posts
│       └── Saved Items
│
├── MODALS (overlay entire app, own stack)
│   ├── Create Flow
│   │   ├── Select Type
│   │   ├── Add Content
│   │   ├── Add Details
│   │   └── Preview & Publish
│   ├── Settings
│   │   ├── Settings Home
│   │   ├── Account Settings
│   │   ├── Notification Settings
│   │   ├── Privacy Settings
│   │   └── Delete Account
│   └── Paywall / Upgrade
│
└── DEEP LINK TARGETS (every screen reachable by URL)
    ├── /post/:id           → Post Detail
    ├── /user/:id           → User Profile
    ├── /search?q=:query    → Search Results
    └── /notifications      → Notifications tab
```

---

## Part 2: Screen Inventory

Every screen in the sitemap needs a spec card before development starts.

```
Screen: Post Detail
─────────────────────────────────────────────
Route:          /post/:postId
Tab owner:      Home (tab 1)
Entry points:   - Feed card tap
                - Notification tap (deep link)
                - Search result tap
                - Direct deep link
Exit points:    - Back → previous screen
                - User avatar tap → User Profile
                - Comment tap → Comment thread
                - Share → system share sheet (overlay)
Data required:  postId (from route params)
Loading state:  PostDetailSkeleton
Empty state:    N/A
Error state:    Post not found (404) / Network error
Auth required:  Yes (reading) / Yes (commenting)
Deep linkable:  Yes
Push target:    Yes (comment notifications)
─────────────────────────────────────────────
```

Complete this for every screen. It takes 10 minutes per screen and prevents weeks of rework.

---

## Part 3: Navigation Decision Guide

```
Should this be a tab?
  → Is this a top-level destination users return to frequently?
  → Yes → Tab. No → it belongs in a stack under a tab.

Should this be a modal?
  → Does it interrupt the current context?
  → Does it have its own back stack (multi-step flow)?
  → Does it need to appear above the tab bar?
  → If yes to any → Modal stack.

Should this be a bottom sheet?
  → Is it a quick action or selection (< 3 steps)?
  → Does the user need to see content behind it?
  → Yes → Bottom sheet overlay. Not a screen.

Should this be a separate screen or a tab of an existing screen?
  → < 3 related views on same data → Tab bar inside screen (top tabs)
  → Independent content → Separate screen in stack
```

---

## Part 4: Tab Bar Design Rules

The tab bar is the permanent anchor of your app. Get it wrong and everything feels off.

```
Rules:
  3–5 tabs only. Never 2, never 6.
  The most-used feature goes in the center or leftmost position.
  Notifications always get their own tab if your app has social features.
  Profile / Account always lives in the rightmost tab.
  Create actions go in the center tab (Instagram model) or as a FAB.

Tab label rules:
  One word per tab. Two words maximum.
  Nouns, not verbs: "Home" not "Go Home", "Search" not "Find Things"
  Exception: "Create" is acceptable as a center action tab.

Tab icons:
  Each tab needs a filled and unfilled icon variant.
  Filled = active. Unfilled = inactive.
  Never use color alone to indicate active state — use fill + color.
```

---

## Part 5: Deep Link Architecture

Every screen in your sitemap that can receive a push notification or be shared must have a deep link path. Define them now — retrofitting is expensive.

```
Scheme:   yourapp://
Web:      https://yourapp.com (universal links / app links)

Auth zone (no auth required):
  /login
  /register
  /reset-password?token=:token

Content (auth required — redirect to login if unauthenticated):
  /home
  /post/:postId
  /user/:userId
  /search?q=:query
  /notifications
  /settings

Actions (auth required — deep link into flows):
  /create
  /upgrade
```

```tsx
// Document your deep link map before writing navigation code
// This becomes your linking config in React Navigation

export const linkingConfig = {
  prefixes: ['yourapp://', 'https://yourapp.com'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
          ResetPassword: 'reset-password',
        },
      },
      Main: {
        screens: {
          HomeTab: {
            screens: {
              Feed: 'home',
              PostDetail: 'post/:postId',
              UserProfile: 'user/:userId',
            },
          },
          SearchTab: {
            screens: {
              Search: 'search',
            },
          },
          NotificationsTab: {
            screens: {
              Notifications: 'notifications',
            },
          },
        },
      },
      CreateModal: 'create',
      SettingsModal: 'settings',
    },
  },
};
```

---

## Part 6: Sitemap Validation Checklist

Run this against your sitemap before moving to architecture.

**Structure**
- [ ] Every screen belongs to exactly one zone (auth / main / modal / overlay)
- [ ] Every tab has a named root screen
- [ ] No screen is reachable from zero entry points
- [ ] No screen is a dead end (zero exit points except back)
- [ ] Modal stacks have a clear dismiss action on every screen

**Navigation logic**
- [ ] Unauthenticated users cannot reach main app screens
- [ ] Authenticated users are redirected away from auth screens
- [ ] Back navigation always goes to the logically previous screen
- [ ] Tab switches do not reset deep stacks unexpectedly

**Deep links**
- [ ] Every push notification target has a deep link path
- [ ] Every shareable piece of content has a deep link path
- [ ] Auth-required deep links redirect to login, then return to target
- [ ] Deep link paths are documented in a central config

**Edge cases**
- [ ] What happens when a deep link target has been deleted?
- [ ] What happens when a notification tapped while app is closed?
- [ ] What happens when a notification tapped while app is backgrounded?
- [ ] What screen shows after logout?
- [ ] What screen shows on cold start with no session?

---

## AI Prompt: Sitemap Generation

```
You are a senior mobile product architect generating a sitemap for a React Native app.

App description: [describe your app in 3–5 sentences]
Core user actions: [list the 3–5 things users primarily come to do]
Auth required: [yes/no, and which features require it]
Social features: [yes/no — comments, follows, notifications]
Monetization: [free / freemium / subscription / one-time purchase]

Generate:
1. A complete hierarchical sitemap using the zone model (Auth / Main / Modal / Overlay)
2. Tab bar design: how many tabs, what each contains, recommended order
3. Which screens are deep-linkable with proposed URL paths
4. Which screens are push notification targets
5. Three navigation edge cases I should design for before writing code

Format the sitemap as an indented tree. One screen per line.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| More than 5 tabs | Tab bar too crowded, thumb reach issues | Consolidate — max 5 tabs |
| Settings as a tab | Wastes tab bar real estate | Settings as modal from profile tab |
| No deep link strategy | Push notifications can't target screens | Define paths for all notification targets |
| Screens with no exit | Users get trapped | Every screen needs back or dismiss |
| Modal for simple selections | Over-engineered — breaks back gesture | Use bottom sheet for < 3 step choices |
| Auth check in each screen | Inconsistent, easy to miss | Handle at navigator level |
| Notification tap opens home, not target | Frustrating UX | Every notification needs a deep link target |
| Sitemap built after navigation code | Expensive to restructure | Always sitemap first |

---

## Phase 1 Complete → Phase 2: Architecture

Product design is done. You now have: PRD, user flows, information architecture, wireframes, branding, design system, responsive layouts, platform guidelines, accessibility, loading states, empty states, error states, and a complete sitemap.

Phase 2 begins with Platform Strategy — choosing the technical foundation that will carry everything you just designed into production.
