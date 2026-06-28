---
title: UI Polish
slug: ui-polish
phase: Phase 1
mode: hackathon
projectType: mobile-app
estimatedTime: 20–30 min
---

# UI Polish

Functional is not enough to win.

Judges see dozens of demos. Apps that work are the baseline. What separates winners from participants is how the app *feels* — the visual tightness, the intentional details, the sense that someone genuinely cared about every screen.

Polish is not decoration. It is signal. It tells judges your team has the discipline to finish things properly, not just make them work.

This module teaches you where polish actually comes from, and how to apply it fast.

---

## Where Polish Comes From

Amateur UIs have one thing in common: every decision was made locally, screen by screen, without a system.

Polish comes from **consistency applied systematically**:

- The same spacing values everywhere
- The same type hierarchy on every screen
- The same interaction patterns for equivalent actions
- The same visual weight for equivalent elements

You already have a Design System. UI Polish is about enforcing it ruthlessly across every screen.

---

## The Five Highest-Impact Polish Areas

Work through these in order. Each one has an outsized visible impact relative to the time it takes.

---

### 1. Spacing Consistency

Nothing makes a UI look amateurish faster than inconsistent spacing.

**The rule:** Every margin, padding, and gap must come from your spacing scale. No arbitrary values.

**Audit method:** Look at each screen and ask — does every space between elements feel rhythmically consistent? Or do some elements feel too close, too far, or randomly placed?

```
Before: padding: 13px, margin-bottom: 22px, gap: 7px
After:  padding: 12px, margin-bottom: 24px, gap: 8px
```

The difference is invisible in isolation. Across 10 screens, it reads as craftsmanship.

**Common spacing mistakes on mobile:**

- Content touching the screen edge (always use horizontal padding of at least 16px)
- Inconsistent spacing between list items
- Header title too close to status bar (use safe area insets)
- Bottom content hidden behind the home indicator (use bottom safe area)

---

### 2. Typography Hierarchy

Every screen should answer a visual question immediately: *what is the most important thing here?*

A clear hierarchy means: one thing is largest and boldest, one thing is body, one thing is secondary/muted. No two text elements compete for the same visual weight.

**Check each screen for:**

- Does the primary information read immediately?
- Is secondary information visibly smaller and lighter?
- Are labels and metadata clearly subordinate to content?
- Is anything the same size and weight when it should not be?

```
 Everything is 16px regular — no hierarchy
 Title: 22px semibold, Body: 15px regular, Meta: 12px muted
```

**Color to reinforce hierarchy:**

```
Primary text:    #111111  (full opacity)
Secondary text:  #666666  (muted)
Disabled / meta: #999999  (light)
```

Never use pure black (`#000000`) for text on white. It is harsher than necessary.

---

### 3. Empty States

Empty states are the most commonly forgotten screens in hackathon apps. They are also the first thing a judge sees when they create a fresh account.

Every screen that can render with no data needs a considered empty state. Not a blank screen. Not a raw "No items found" in gray text.

An empty state has three components:

```
1. An illustration or icon  — makes it feel intentional, not broken
2. A headline               — names what is missing
3. A call to action         — tells the user exactly what to do next
```

**Example — empty task list:**
```
[Icon: clipboard with a small sparkle]

Nothing here yet

Create your first task and get started.

[+ Create Task]  ← primary button
```

This takes 20 minutes to build per screen and eliminates the "the app looks broken" impression during demos.

---

### 4. Loading States

Every async operation needs a visible loading state. An app that freezes silently while waiting for an API response looks broken to judges.

Three patterns, in order of appropriateness:

**Skeleton screens** — Best for content-heavy screens. Placeholder shapes that mirror the real layout.
```
┌─────────────────────────┐
│ ░░░░░░░░░░░░  ░░░░░░░   │  ← shimmer animation
│ ░░░░░░░░░░░░░░░░░░░░    │
│ ░░░░░░░                 │
└─────────────────────────┘
```

**Spinner + message** — Best for actions (submitting a form, generating AI output).
```
  ◌  Generating your plan...
```

**Button loading state** — Replace button text with a spinner when the user taps it. Prevents double-taps and confirms the action was received.
```
Before: [  Generate Plan  ]
After:  [  ◌ Generating…  ]  ← disabled, spinner visible
```

>  **Warning:** An AI feature with no loading state is a demo killer. If your wow moment involves an AI generating something, the loading state *is part of the wow moment*. Make it beautiful, not invisible.

---

### 5. Touch Targets and Feedback

Mobile UI has a physical dimension that web UI does not. Fingers are imprecise.

**Minimum touch target size: 44×44px**

Anything tappable — buttons, list items, icons, tabs — must meet this minimum. Items that are visually small can still meet the target with invisible padding.

**Tap feedback:**

Every tappable element must respond visibly to touch. On React Native:

```tsx
// Use Pressable with opacity feedback — not TouchableOpacity (deprecated pattern)
<Pressable
  onPress={handlePress}
  style={({ pressed }) => ({
    opacity: pressed ? 0.7 : 1,
    backgroundColor: pressed ? colors.primaryDark : colors.primary,
  })}
>
  <Text>Generate Plan</Text>
</Pressable>
```

On Flutter:
```dart
InkWell(
  onTap: handlePress,
  borderRadius: BorderRadius.circular(8),
  child: ...,
)
```

An app with no tap feedback feels like a broken prototype. This is a 5-minute fix with significant perceived quality impact.

---

## AI Prompt — UI Polish Review

Use this after your screens are built but before your final demo rehearsal.

```prompt
You are a senior mobile UI designer doing a polish review.

My app: [one-sentence description]
Tech stack: [e.g. Expo + NativeWind, Flutter]
Design system: [briefly describe your colors, fonts, spacing base]

I will describe my screens one by one. For each screen, identify:
1. Spacing inconsistencies (anything that does not follow a 4px grid)
2. Typography hierarchy problems (competing weights, sizes, or colors)
3. Missing states (empty, loading, error)
4. Touch target issues
5. The single highest-impact polish fix for this screen

Screen 1 — [Screen name]:
[Describe what is on the screen: elements, layout, colors used]

Screen 2 — [Screen name]:
[Describe it]

[Continue for each screen]

Prioritise findings by demo visibility. I have limited time — tell me what to fix first.
```

---

## The Polish Checklist

Run this on every screen in your demo flow before calling it done.

**Spacing**
- [ ] All horizontal content has at least 16px padding from screen edge
- [ ] Safe area insets respected top and bottom (status bar, home indicator)
- [ ] Spacing between elements follows your spacing scale (no arbitrary values)
- [ ] List items have consistent vertical spacing

**Typography**
- [ ] Clear visual hierarchy: one dominant element per screen
- [ ] Secondary text is visibly lighter (color or weight, not both)
- [ ] No two unrelated elements share the same font size and weight
- [ ] Pure black (`#000000`) not used for body text

**States**
- [ ] Every screen that can be empty has a designed empty state
- [ ] Every async action has a visible loading state
- [ ] Every button has a disabled/loading state while its action is processing
- [ ] AI generation has a loading state that feels intentional

**Touch**
- [ ] All tappable elements are at least 44×44px
- [ ] All tappable elements respond visibly to touch (opacity, color, ripple)
- [ ] No tappable elements are too close together to tap accurately

**Visual Consistency**
- [ ] Colors match your design system — no one-off values
- [ ] Border radii are consistent across all cards, buttons, and inputs
- [ ] Icons come from one library and are consistent in size and weight
- [ ] Shadows and elevations are consistent (if used)

---

## What Comes Next

Screens are polished and consistent. Now you add the details that make an app feel alive.

Next module: **Animations** — the motion language that elevates a polished UI into a memorable experience.
