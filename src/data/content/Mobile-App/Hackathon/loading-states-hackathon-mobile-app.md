---
title: Loading
slug: loading
phase: Phase 1
mode: hackathon
projectType: mobile-app
estimatedTime: 15–20 min
---

# Loading

Loading states are not a polish detail.

They are a trust signal.

A blank screen during a fetch makes judges assume your app is broken. A smooth skeleton or spinner tells them: this is intentional. This is designed.

You have one shot to make that impression. Make loading feel like part of the product.

---

## Why Loading Matters in a Hackathon

Judges tap through your app at speed. They do not wait.

If your app freezes without feedback:
- They assume it crashed
- They assume you didn't finish
- They move on

A loading state — even a fake one — signals that you thought about the full user experience. That is rare in hackathon submissions. Use it to your advantage.

---

## The Three Loading Moments

Not all loading is equal. Know which one you're solving.

| Moment | When | Solution |
|---|---|---|
| **Initial Load** | App first opens | Splash screen → skeleton |
| **Content Fetch** | Data loads after navigation | Skeleton screens |
| **Action Feedback** | Button tap → waiting | Inline spinner or button state |

You probably need all three. They take less than two hours combined.

---

## Skeleton Screens vs Spinners

> **Rule:** Use skeletons where content has a predictable shape. Use spinners only for actions.

**Skeleton screens** feel faster than they are. The brain starts parsing layout before content arrives. Use them for:
- Feed items
- Profile cards
- List views
- Home screens

**Spinners** are for moments where no layout exists yet:
- Login / auth waiting
- Submitting a form
- Processing a file
- Deleting an item

A spinner on a feed looks unfinished. A skeleton on a form submission looks weird. Match the pattern to the context.

---

## Skeleton Implementation

### React Native

The fastest approach: use `react-native-skeleton-placeholder` or build with `Animated` API directly.

**Copy this prompt to generate skeletons for your UI:**

```
Copy Prompt ↓
```

> You are building a React Native hackathon app. Generate a SkeletonCard component that mimics a [describe your card: e.g. "news feed item with an image on the left, a title, and two lines of text on the right"]. Use Animated and LinearGradient to create a shimmer effect. Keep it under 60 lines. Use StyleSheet.create. Do not use any third-party libraries.

---

### Flutter

Use `shimmer` package (pub.dev). It's one import, works immediately.

```
Copy Prompt ↓
```

> I'm building a Flutter hackathon app. Create a shimmer skeleton widget that matches this layout: [describe your card layout]. Use the shimmer package. Keep it self-contained and under 50 lines.

---

## The Splash Screen

Your splash screen is the first impression before the first impression.

It should be:
- Your logo / wordmark
- Your brand background color
- Gone in 1.5–2 seconds

Nothing else.

>  Do not show a spinner on your splash screen. Splash screens are not loading indicators. They are brand moments.

For React Native, use `expo-splash-screen` (Expo) or `react-native-splash-screen` (bare workflow).

For Flutter, configure `flutter_native_splash`.

Both take under 30 minutes.

---

## Button Loading States

Every primary action button should have three states:

```
Default → Loading → Result
```

| State | Appearance |
|---|---|
| Default | Label text, full opacity |
| Loading | Spinner replaces label, button disabled |
| Success | Checkmark or success color flash |
| Error | Shake animation or error color flash |

> Disabling the button during loading is not optional. Double-submits crash demos.

**Copy this prompt:**

```
Copy Prompt ↓
```

> Generate a React Native / Flutter LoadingButton component with four states: idle, loading, success, and error. The button should disable during loading, show a spinner, then briefly show a checkmark icon on success before returning to idle. Keep it reusable via props. No third-party libraries.

---

## Simulating Loading for Demo Polish

Your demo data might load instantly from local state.

That looks broken to judges who expect network latency.

Add a deliberate artificial delay:

**React Native:**
```js
await new Promise(resolve => setTimeout(resolve, 800));
```

**Flutter:**
```dart
await Future.delayed(const Duration(milliseconds: 800));
```

Place this before setting your data in state. 800ms is the sweet spot — long enough to see the skeleton, short enough not to annoy.

>  Wrap this in a flag: `const SIMULATE_LOADING = true` — you can toggle it off instantly if needed.

---

## Quick Checklist

Work through these before your demo:

- [ ] Splash screen configured with brand colors and logo
- [ ] Home / feed screen has skeleton loading state
- [ ] Primary action buttons have loading + disabled state
- [ ] No blank white screens appear during any navigation
- [ ] Artificial delay added where real loading would be invisible
- [ ] Loading states match your design system colors (not default grey)

---

## What Good Looks Like

> **The judges should never see a blank screen.**

Every transition should have something: a skeleton, a spinner, a shimmer. If you have time, add a subtle fade-in on content after it loads. That single touch makes AI-generated UIs feel handcrafted.

The bar in hackathons is low. Most apps ship with no loading states. You are not competing against production apps — you are competing against other hackathon submissions. This detail alone puts you in the top 20%.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Spinner on every screen | Use skeletons for content, spinners for actions |
| Skeleton doesn't match real layout | Build skeleton to match your actual card dimensions |
| Button stays enabled during loading | Always disable on submit |
| Splash screen stays too long | Cap at 2 seconds max |
| Grey shimmer in a dark-themed app | Match skeleton colors to your design system |
| Forgetting loading state on auth | Auth waits are where apps feel slowest — always show feedback |

---

## Next Step

Loading states are done when every screen transition and every action has visible feedback.

Move to **Microinteractions** when your checklist above is complete.
