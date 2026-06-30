---
title: Navigation
slug: navigation
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 20-30 min
---

# Navigation

You sketched app navigation conceptually in Phase 1 (*App Navigation*) and decided your URL structure in Phase 2 (*Deep Linking*). This module turns that into a real navigation tree — the thing that decides what's on screen, how the back button behaves, and how a deep link or push notification actually lands on the right screen.

Navigation bugs are some of the most visible production bugs (back button does the wrong thing, tab state resets unexpectedly, deep link opens a blank screen) — worth getting the structure right before screens pile up on top of it.

---

## Decision 1 — Navigator Composition

Production mobile apps almost always combine three navigator types, nested correctly:

| Navigator Type | Purpose |
|---|---|
| **Stack** | Push/pop screens within a flow (product list → product detail → checkout) |
| **Tab** | Persistent bottom/top navigation between top-level sections |
| **Modal/Sheet** | Temporary overlays that don't belong in the main stack (filters, confirmation dialogs, share sheets) |

**The composition that works for most apps:**

```
RootNavigator (Stack)
  ├── AuthStack (Stack)         ← shown when logged out
  │     ├── Login
  │     └── SignUp
  └── AppStack (Stack)          ← shown when logged in
        ├── MainTabs (Tab)
        │     ├── HomeStack (Stack)
        │     ├── SearchStack (Stack)
        │     ├── ProfileStack (Stack)
        └── ModalScreens (presented over MainTabs)
              ├── ProductDetail
              └── Checkout
```

> 💡 **Why each tab gets its own nested stack:** if `HomeStack` and `ProfileStack` shared one flat navigator, navigating from Home into a detail screen would visually replace the tab bar, and switching tabs would lose your place in whatever flow you were in. Nesting a stack inside each tab keeps each tab's navigation history independent — switching tabs and back returns you exactly where you left off.

---

## Decision 2 — Auth-Gated Navigation Switching

> ⚠️ **Common mistake:** checking auth state inside individual screens and redirecting manually (`if (!user) navigation.navigate('Login')`). This scatters auth logic across every protected screen and creates race conditions where a screen briefly renders before the redirect fires.

**Correct pattern:** the root navigator itself switches between `AuthStack` and `AppStack` based on a single auth state source, decided once, at the top.

```typescript
function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;

  return isAuthenticated ? <AppStack /> : <AuthStack />;
}
```

This means no individual screen needs to know or check auth state for navigation purposes — if it's rendering, the user is already in the right stack.

---

## Decision 3 — Deep Link Integration

In Phase 2 you designed `resolveDeepLink(url) → { route, params }`. This is where it plugs in.

- Most navigation libraries (React Navigation, Expo Router) support a **linking config** that maps URL paths to screens declaratively — prefer this over manually parsing URLs and calling `navigate()` yourself, since the library then handles both explicit links and the back-stack correctly.
- **Respect the cold-start/warm-start distinction from the Deep Linking module here.** The linking config needs to handle a link arriving before the navigator has mounted (cold start) — most libraries handle this if configured correctly, but it's worth an explicit test, not an assumption.

```typescript
const linking = {
  prefixes: ['https://yourapp.com', 'myapp://'],
  config: {
    screens: {
      ProductDetail: 'product/:productId',
      Profile: 'profile/:userId',
    },
  },
};
```

> 💡 Map deep link paths to **screens inside the authenticated stack structure**, and let your auth-gating from Decision 2 handle redirecting through login first if needed — don't build a separate, parallel deep-link-specific navigation path. One navigation tree, multiple ways to enter it.

---

## Decision 4 — Type Safety on Navigation Params

> ⚠️ Untyped navigation (`navigation.navigate('ProductDetail', { id: product.id })` with no type checking) is a common source of runtime crashes — a typo in a screen name or a missing param doesn't surface until that exact navigation path is triggered in testing or production.

Type your entire navigation tree:

```typescript
type RootStackParamList = {
  ProductDetail: { productId: string };
  Profile: { userId: string };
  Checkout: undefined;
};
```

This is one of the highest-value type definitions in a mobile codebase — it turns navigation typos into compile-time errors instead of runtime crashes discovered by a user, and it gives AI tools the exact contract they need to generate correct `navigate()` calls elsewhere in the app without guessing param names.

---

## Decision 5 — Back Button & Gesture Behavior

Decide these explicitly rather than accepting platform defaults everywhere:

- **Android hardware back button**: by default it pops the stack, which is usually correct — but for flows like checkout or onboarding, decide whether back should be disabled or redirected (e.g. confirm-before-exit) rather than letting users accidentally abandon a multi-step flow.
- **iOS swipe-back gesture**: same consideration — disable it explicitly on screens where leaving mid-flow loses meaningful user progress (e.g. mid-payment).
- **Double-tap-to-exit on the root screen** (Android convention): implement this rather than letting a single back press exit the app unexpectedly from the home tab.

---

## Navigation State & Analytics

Your Analytics Strategy module decided you need screen view tracking. Wire it once, at the navigator level, not per-screen:

```typescript
<NavigationContainer onStateChange={(state) => {
  const currentScreen = getCurrentRouteName(state);
  analytics.track('screen_viewed', { screen: currentScreen });
}}>
```

This guarantees every screen gets tracked automatically as navigation evolves, instead of relying on every new screen remembering to add its own tracking call.

---

## AI Prompts

### Prompt 1 — Navigator Structure Scaffold

```
Set up the navigation structure for a production [React Native / Expo] app
using [React Navigation / Expo Router].

Top-level sections: [list your tabs/main sections]
Auth-gated: [list which sections require login]
Deep link routes needed: [paste your URL structure from the Deep Linking module]

Generate: the full typed navigator tree (RootStackParamList and all nested
param lists), the auth-state-based root switching logic, and the linking
config mapping deep link paths to screens.
```

### Prompt 2 — Navigation Review

```
Review this navigation setup for correctness:

[paste your navigator code]

Check for: untyped navigate() calls, auth checks done inside individual
screens instead of at the root navigator level, missing back-button/gesture
handling on flows where mid-flow exit should be confirmed, and whether the
deep linking config correctly handles cold-start (app not yet running).
```

---

## Validating AI Output

- [ ] Auth gating happens once at the root navigator, not scattered across individual screens
- [ ] Every navigator's param list is explicitly typed — no untyped `navigate()` calls
- [ ] Each tab has its own nested stack, not a flat shared navigator across tabs
- [ ] Deep link paths are wired through the navigation library's linking config, not manual URL parsing
- [ ] Screens where mid-flow exit loses progress (checkout, onboarding) have explicit back/gesture handling
- [ ] Screen view tracking is wired once at the navigator level, not per-screen

---

## What's Next

- **App Lifecycle** (next in this phase) covers what happens to navigation state when the app backgrounds, is killed, or is restored — directly building on the navigator structure set up here.
- **State Management Impl** will connect to this navigation tree for things like preserving form state across a confirm-before-exit prompt.
- **Auth Implementation** is what actually populates the `isAuthenticated` state this module's root switching logic depends on.
