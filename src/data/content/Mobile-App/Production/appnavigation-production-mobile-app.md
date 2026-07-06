---
title: App Navigation
slug: app-navigation
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
---

# App Navigation

Navigation is the skeleton of your app. It determines how users move between features, how they understand the product's structure, and how quickly they find what they came for.

Bad navigation produces users who "don't know where they are" — the single most common complaint in 2-star reviews of otherwise good apps. Good navigation disappears entirely. Users just move through the app without thinking about it.

---

## Choose the Right Navigation Pattern

Every app maps to one primary navigation pattern. Choosing the wrong one forces every screen into an awkward fit.

### Tab Bar Navigation
**Best for:** Apps with 3–5 distinct, peer-level destinations that users switch between frequently.

```
┌─────────────────────────────────┐
│                                 │
│           Content Area          │
│                                 │
│                                 │
├─────────────────────────────────┤
│                        │
│ Home   Stats   Add     Profile  │
└─────────────────────────────────┘
```

**iOS:** Bottom tab bar — standard UITabBarController pattern. Users expect it.
**Android:** Bottom navigation bar — Material Design standard.

**When to use:** Your features are roughly equal in importance and users move between them frequently. Instagram, Twitter, Spotify, Duolingo.

**When not to use:** You have more than 5 destinations (becomes crowded), or your app is primarily sequential (one path through content).

---

### Stack Navigation
**Best for:** Apps with a clear hierarchy — list → detail → action.

```
[Home List] ──tap──► [Item Detail] ──tap──► [Edit Item]
     ◄ back                ◄ back
```

Users drill down and back up. The back gesture is the primary navigation mechanism.

**When to use:** Content-heavy apps, e-commerce, document editors, settings pages. Often combined with tab bar — each tab has its own stack.

**When not to use:** As the only navigation in an app with many peer-level features.

---

### Drawer Navigation
**Best for:** Apps with many destinations that don't need equal-weight access.

```
┌──────────────────────────────────┐
│ ≡  MyApp                        │
├──────────────────────────────────┤
│                                  │
│          Content Area            │
│                                  │
└──────────────────────────────────┘

Drawer open:
┌────────────┬─────────────────────┐
│ Dashboard  │                     │
│ Projects   │    (dimmed)         │
│ Reports    │                     │
│ Settings   │                     │
│ ────────── │                     │
│ Logout     │                     │
└────────────┴─────────────────────┘
```

**When to use:** Productivity or B2B apps with many sections (Slack, Gmail, Notion). Not recommended for consumer apps where discoverability is critical — drawer items are hidden by default.

**Platform note:** Drawer is more common and expected on Android. On iOS, it's non-standard and often feels out of place.

---

### Modal / Sheet Navigation
**Best for:** Temporary actions that don't belong in the main flow — create, edit, confirm, filter.

```
Main Screen
    │
    ▼ (tap "New Item")
┌───────────────┐
│  Bottom Sheet │  ← slides up over main screen
│               │
│  [Form]       │
│               │
│  [Save]       │
└───────────────┘
```

Modals are not a navigation pattern — they're a presentation pattern for temporary UI. Don't use modals as primary navigation destinations.

**iOS convention:** Swipe down to dismiss. Always implement this.
**Android convention:** Back button or X button to dismiss.

---

## Hybrid Navigation (Most Production Apps)

Most apps combine patterns. The most common architecture:

```
Tab Bar (top level)
├── Tab 1 ──► Stack Navigation (list → detail → action)
├── Tab 2 ──► Stack Navigation
├── Tab 3 ──► Modal (create action)
└── Tab 4 ──► Stack Navigation (settings hierarchy)
```

Each tab owns its own navigation stack. Switching tabs preserves the scroll position and navigation state of each tab independently.

---

## Navigation State Design

Define how navigation state behaves in each scenario. This prevents bugs and undefined behavior.

### Tab Switching
What happens when a user switches tabs?

```
Option A: Preserve stack state
User is 3 levels deep in Tab 1 → switches to Tab 2 → switches back to Tab 1
→ Still 3 levels deep  (correct for most apps)

Option B: Reset to root on switch
→ Back at Tab 1 root  (correct for some use cases — feed apps)

Option C: Tap active tab to scroll to top / go to root
→ iOS standard behavior for active tab tap  (always implement this)
```

### Deep Link Entry
When a push notification or external link opens the app to a specific screen:

```
App not running → Launch → Navigate to target screen
App in background → Foreground → Navigate to target screen
App in foreground (different screen) → Navigate to target screen (replace or push?)
```

Define the behavior for each case. An undefined deep link that drops users at the wrong screen is a broken push notification.

### Back Navigation
On Android, the system back button must be handled correctly throughout the app.

```
Stack navigation → go back in stack (default)
Modal → dismiss modal (default)
First screen in stack → [decide]: exit app / go to previous tab / no-op
Onboarding → [decide]: step back or exit app?
```

The Android predictive back gesture (Android 13+) requires explicit opt-in and correct implementation.

---

## Navigation Information Architecture

Map your navigation before designing screens. The IA defines where every screen lives in the hierarchy.

```
ROOT
├── ONBOARDING (modal, full-screen)
│   ├── Welcome
│   ├── Auth (sign up / log in)
│   ├── Personalization
│   └── First action
│
└── MAIN APP (tab bar)
    ├── Tab 1: [Primary Feature]
    │   ├── [Feature] List  ← tab root
    │   ├── [Feature] Detail
    │   └── [Feature] Edit  ← modal or push
    │
    ├── Tab 2: [Secondary Feature]
    │   └── ...
    │
    ├── Tab 3: [Create / Action]  ← often a modal trigger, not a real tab
    │
    └── Tab 4: Profile / Settings
        ├── Profile
        ├── Notifications
        ├── Subscription / Billing
        ├── Privacy
        └── Account (delete, sign out)
```

Every screen in your screen inventory maps to exactly one location in this IA. If a screen doesn't have a clear location, your IA has a gap.

---

## Platform-Specific Navigation Rules

### iOS
- Tab bar at the bottom — never at the top
- Back button in top-left with the previous screen's title (or "Back")
- Large titles on list screens, inline titles on detail screens
- Swipe from left edge to go back — never disable this gesture
- Swipe down to dismiss modals
- Active tab tapped → scroll to top (if scrolled) → tap again → go to root
- Use `UINavigationController` conventions even in React Native / Flutter

### Android
- Bottom navigation bar for primary destinations (3–5 items)
- Top app bar with back arrow for stack navigation
- System back gesture / button must work correctly everywhere
- Predictive back gesture — implement the new API (Android 13+)
- FAB (Floating Action Button) for primary create action
- Material You dynamic color should be respected

---

## Navigation Anti-Patterns

**More than 5 tabs**
Crowded tab bars fail on small screens and indicate too many peer-level destinations. Consolidate or restructure.

**Inconsistent back behavior**
Users who can't predict what "back" will do stop trusting the navigation entirely.

**Hiding features in deep stacks**
If a feature is core to daily use but requires 3 taps to reach, it belongs in the tab bar or on a more accessible surface.

**Modals that navigate deeply**
A modal should be one or two screens. If a modal has its own navigation stack with 4 levels, it's been misused. Convert it to a proper pushed navigation flow.

**No state preservation on tab switch**
Users switching between tabs expect to return where they left off. Resetting stacks on every tab switch creates disorientation.

**Drawer as the only navigation on iOS**
Hidden navigation fails discoverability on iOS. Drawers are acceptable on Android; they're non-standard on iOS.

---

## Implementation Checklist

- [ ] Primary navigation pattern chosen and documented (tab bar / stack / drawer / hybrid)
- [ ] Navigation IA mapped — every screen has a location in the hierarchy
- [ ] Tab bar items: 3–5, icons + labels, correct active/inactive states
- [ ] Each tab owns an independent navigation stack
- [ ] Active tab tap behavior defined (scroll to top → go to root)
- [ ] Deep link navigation behavior defined for all notification types
- [ ] Android back button behavior defined for every screen
- [ ] Modal dismissal (swipe down on iOS, back on Android) implemented
- [ ] Session expiry mid-navigation handled (no lost state where possible)
- [ ] Onboarding flow is separate from main navigation (doesn't live in a tab)

---

## AI Prompt — Navigation Architecture

```
You are a senior mobile UX engineer designing the navigation architecture for a production mobile app.

My app: [describe in 2–3 sentences]
Core features (what users do most frequently): [list 4–6]
Platforms: [iOS / Android / both]
Framework: [React Native / Flutter / Swift / Kotlin]

Design my navigation architecture:

1. Recommend the primary navigation pattern with reasoning specific to my app
2. Define the tab bar structure (if applicable) — what goes in each tab, tab order, and icons
3. Map the complete navigation IA — every screen in a hierarchy showing where it lives
4. Define the navigation behavior for:
   - Tab switching (preserve state or reset?)
   - Deep links from push notifications
   - Back navigation on Android (each major screen)
   - Modal presentation and dismissal
5. Identify any navigation anti-patterns in my proposed feature set
6. For React Native: recommend the navigation library (React Navigation or Expo Router) with reasoning

Generate the navigation config code stub for my chosen framework showing the root navigator structure.
```
