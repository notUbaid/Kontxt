---
title: Frontend
slug: frontend
phase: Phase 3
mode: hackathon
projectType: mobile-app
estimatedTime: 25–35 min
---

# Frontend

Your frontend is the only thing judges see.

The backend can be elegant. The database can be perfectly modeled. The architecture can be textbook clean. None of that matters if the screens feel unfinished.

In a hackathon, frontend quality is the product.

---

## What "Good Frontend" Means Here

Not: pixel-perfect implementation of a Figma file.

Not: every edge case handled.

Not: performance-optimized for 100k users.

**This:**
- Every screen the judge will see looks intentional
- Navigation feels natural and never breaks
- Data loads with visible feedback
- Errors don't produce blank screens or red text
- The visual hierarchy is immediately clear on every screen

That is the bar. Build to it deliberately.

---

## Screen Priority

You do not have time to build every screen well. Rank them.

**Tier 1 — Demo critical (must be perfect):**
- Onboarding / first screen after login
- Your core feature screen (the thing your app actually does)
- Any screen you will navigate to during the pitch

**Tier 2 — Visible but secondary:**
- Profile screen
- Settings
- Secondary features

**Tier 3 — Skip or placeholder:**
- Everything else

> Build Tier 1 to 100%. Build Tier 2 to 70%. Leave Tier 3 as a clearly intentional placeholder — "Coming Soon" beats a broken screen.

---

## Navigation Architecture

Get this right before building screens. Wrong navigation structure costs hours to fix later.

### React Native (Expo)

Use React Navigation. No alternatives worth considering for a hackathon.

```
RootNavigator
├── AuthStack (unauthenticated)
│   └── LoginScreen
└── AppStack (authenticated)
    ├── BottomTabNavigator
    │   ├── HomeScreen
    │   ├── ExploreScreen
    │   └── ProfileScreen
    └── ModalStack
        ├── DetailScreen
        └── CreateScreen
```

### Flutter

Use `go_router` for anything with more than 3 screens. Use `Navigator.push` for simple linear flows.

```
GoRouter
├── /login
├── /home (ShellRoute with bottom nav)
│   ├── /home/feed
│   ├── /home/explore
│   └── /home/profile
└── /detail/:id
└── /create
```

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app. Set up navigation with:
- Auth-gated root: show LoginScreen when signed out, AppNavigator when signed in
- Bottom tab navigation with [list your 3–4 tabs with icon names]
- Stack navigator inside each tab for drill-down screens
- A modal stack for [CreateScreen / DetailScreen / any overlay]
>
> Use React Navigation v6 / go_router. Keep it clean and minimal. Include tab bar icons using @expo/vector-icons / Material Icons.

---

## Component Architecture

For a hackathon, three layers. No more.

```
screens/          # Full screens, composed from components
components/       # Reusable UI pieces (cards, buttons, inputs)
  common/         # Used across multiple screens
  [feature]/      # Specific to one feature
```

**Rules:**
- Screens own data fetching and state
- Components receive props, emit callbacks
- No business logic inside components
- No API calls inside components

This is not over-engineering. This is the minimum structure that prevents spaghetti at 3am.

---

## State Management

For most hackathon apps: React Context + useState or Flutter's setState + Provider.

Do not reach for Redux, Zustand, Riverpod, or Bloc unless your team already uses them fluently. Learning a state management library mid-hackathon is a trap.

**The pattern that works:**

```
AuthContext     → current user, sign in/out
DataContext     → your core data (posts, items, etc.)
UIContext        → modals, toasts, loading states (optional)
```

Each context: one file, one provider, one hook. That's it.

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app. Create a DataContext / Provider that:
- Fetches [your core data collection] from Firebase Firestore / Supabase on mount
- Exposes: items, loading, error, refresh(), create(data), delete(id)
- Uses a realtime listener (onSnapshot / Supabase realtime) so UI updates automatically
- Handles errors gracefully without crashing
>
> Keep it under 80 lines. No unnecessary abstraction.

---

## Building Screens Fast with AI

The most effective way to build screens in a hackathon: describe the screen in detail, generate the full component, then edit rather than write from scratch.

```
Copy Prompt ↓
```

> Build a React Native / Flutter screen for [ScreenName]. Here is what it should contain:
>
> Layout: [describe the layout — header, scrollable list, FAB, etc.]
> Data: [describe what data it displays and where it comes from]
> Interactions: [list all taps, swipes, and inputs]
> Empty state: [what shows when there's no data]
> Loading state: [skeleton / spinner]
> Error state: [what shows if fetch fails]
>
> Design system: background [color], primary [color], text [color], font [name], border radius [value].
>
> Use StyleSheet.create / Flutter widgets. No third-party UI libraries. Keep it clean and production-looking.

---

## The Screens AI Gets Wrong

Validate every generated screen against these:

| Issue | What to Check |
|---|---|
| Hardcoded data | All content should come from props or context, not inline strings |
| Missing KeyboardAvoidingView | Input forms will be covered by the keyboard on iOS |
| FlatList without keyExtractor | Causes React Native warnings and potential render bugs |
| No SafeAreaView | Content bleeds under status bar or home indicator |
| ScrollView wrapping FlatList | Causes performance issues and layout bugs |
| Images without defined dimensions | Layout shifts or invisible images |
| Missing empty state | Screen looks broken when data is empty |
| No pull-to-refresh on lists | Judges expect it; missing it feels incomplete |

---

## Typography and Spacing Consistency

The fastest way to make AI-generated screens look inconsistent: let each component define its own font sizes and spacing.

Create a single constants file and import from it everywhere:

```js
// constants/theme.js
export const COLORS = {
  primary: '#6C63FF',
  background: '#0F0F13',
  surface: '#1A1A24',
  text: '#FFFFFF',
  textSecondary: '#8B8B9E',
  border: '#2A2A3A',
};

export const FONTS = {
  h1: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  caption: { fontSize: 12, fontWeight: '400' },
};

export const SPACING = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
};

export const RADIUS = {
  sm: 8, md: 12, lg: 20, full: 999,
};
```

>  Share this file with AI in every screen generation prompt. It will stay consistent automatically.

---

## Error and Empty States

These are the screens most hackathon apps skip. They are also the screens judges will hit.

Every list screen needs three states:

**Loading:** Skeleton or spinner (you built this in Phase 1)

**Empty:**
```
[Icon]
No [things] yet
[Optional CTA button]
```

**Error:**
```
[Icon]
Something went wrong
[Retry button]
```

These take 15 minutes per screen. They make your app look finished.

```
Copy Prompt ↓
```

> Generate three reusable React Native / Flutter components:
> 1. EmptyState — accepts icon (string), title, subtitle, and optional onAction + actionLabel props
> 2. ErrorState — accepts message and onRetry props
> 3. LoadingState — skeleton shimmer matching a [card / list item / profile] layout
>
> Match this design system: [paste your theme constants]. Keep each under 40 lines.

---

## Pre-Demo Frontend Checklist

Walk every Tier 1 screen before your presentation:

- [ ] No visible placeholder text ("Lorem ipsum", "TODO", "Sample data")
- [ ] No hardcoded names or emails visible on screen
- [ ] All navigation paths from the demo flow work without errors
- [ ] Keyboard doesn't cover input fields on iOS
- [ ] Safe area respected on iPhone notch and Android cutout
- [ ] Every list has a visible empty state
- [ ] No red error borders or console errors visible on screen
- [ ] Dark mode / light mode consistent (pick one, don't mix)
- [ ] All images load (test on real device, not simulator)
- [ ] Pull-to-refresh works on primary lists
- [ ] Bottom tab active states are visually clear

---

## What Breaks Demos

| Mistake | Consequence |
|---|---|
| Building 8 screens at 60% instead of 4 screens at 100% | Everything looks unfinished |
| No empty states | App looks broken with no data |
| Simulator-only testing | Keyboard, safe area, and performance issues missed |
| Inconsistent spacing and font sizes | App looks AI-assembled, not designed |
| Navigation dead ends | Judge gets stuck; impression tanks |
| Missing loading states on data screens | Blank flash between screens |

---

## Next Step

Frontend is done when every screen in your demo flow looks intentional, loads correctly, and handles empty and error states.

Move to **Native Device Features** next.
