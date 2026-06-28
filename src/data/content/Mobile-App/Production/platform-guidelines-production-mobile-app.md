---
title: Platform Guidelines
slug: platform-guidelines
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# Platform Guidelines

iOS users and Android users are different people with different expectations.

An iOS user who encounters Android navigation patterns thinks the app feels broken. An Android user who encounters iOS-only gestures can't figure out how to go back. Neither user will articulate why — they'll just uninstall.

Platform guidelines exist because mobile operating systems have trained billions of users to expect specific behaviors. Fighting those expectations costs you retention. Following them costs you nothing.

---

## The Core Decision: One Codebase or Two

Before platform-specific design decisions, make this call explicitly.

```
Approach A — Single design, both platforms (common)
  One set of wireframes and designs
  Platform differences handled in code only
  Faster to design and ship
  Slight feel-of-foreign on each platform
  Correct for most apps

Approach B — Platform-adapted design (thorough)
  Separate component behavior per platform
  Native patterns on each OS
  More design work, more code branching
  Correct for apps where native feel is core to the value proposition
  (e.g., a camera app, a system utility, a premium productivity tool)

Approach C — Fully native per platform (rare)
  Separate codebases, separate designs
  Maximum native feel
  2× engineering cost
  Only justified for apps where platform integration is the product
```

**Default recommendation:** Approach A with targeted platform adaptations for the highest-impact differences. You get 80% of the native feel at 20% of the cost.

---

## Navigation: The Biggest Difference

Navigation behavior is where iOS and Android diverge most visibly. Get this wrong and both platforms feel broken.

### iOS Navigation

```
Back navigation:
  → Swipe right from left edge of screen (system gesture)
  → Back button (top-left of navigation bar)
  → Never a dedicated hardware/software back button

Tab bar:
  → Persistent at bottom
  → Tapping active tab scrolls to top or returns to root
  → Never hide on scroll (breaks expected behavior)

Navigation bar:
  → Title centered
  → Large title on root screens (collapses on scroll)
  → Back button shows previous screen title (truncate if long)

Modal dismissal:
  → Swipe down to dismiss (system gesture)
  → Cancel / Done buttons in nav bar
  → Pull-to-dismiss works for full-screen modals

Gestures:
  → Back swipe from left edge
  → Pull-to-refresh (top of scrollable content)
  → Long press for context menus / haptic preview
```

### Android Navigation

```
Back navigation:
  → Swipe from left OR right edge (gesture nav, Android 10+)
  → System back gesture (replaces old back button)
  → Your app must handle back press correctly — pressing back
     on the home screen should exit the app

Bottom navigation:
  → Persistent at bottom (Material 3)
  → Drawer (hamburger) is being deprecated for primary nav
  → Back stack within tabs is handled differently than iOS

Navigation bar:
  → Title left-aligned (Material default)
  → Hamburger menu icon on far left if drawer exists
  → Action icons on right

Modal dismissal:
  → Back gesture dismisses modal
  → Scrim tap dismisses bottom sheets
  → Explicit close button always provided

Gestures:
  → Back swipe (both edges)
  → Pull-to-refresh
  → Long press for context menus
  → Drag-to-reorder in lists
```

### Implementation

```typescript
// React Native — Platform-specific navigation behavior
import { Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        // iOS: large title on root screens
        headerLargeTitle: Platform.OS === 'ios',

        // Title alignment differs by platform
        headerTitleAlign: Platform.OS === 'ios' ? 'center' : 'left',

        // iOS native feel
        animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',

        // Back button label (iOS only — shows previous screen name)
        headerBackTitleVisible: Platform.OS === 'ios',
      }}
    />
  )
}
```

---

## Typography Conventions

```
iOS:
  System font: SF Pro (automatic with .systemFont)
  Dynamic Type: users set text size in Settings → Accessibility
  Your app must scale with Dynamic Type
  Minimum body text: 17pt (SF Pro body style)

Android:
  System font: Roboto (automatic with Material theme)
  Font Scale: users set in Settings → Accessibility → Font size
  Your app must scale with Font Scale
  Minimum body text: 16sp

Cross-platform:
  Never lock font sizes — always use scalable units (sp on Android, pt on iOS)
  Test at 135% and 200% text scale before shipping
```

---

## Interaction Patterns

### Buttons and Touch Feedback

```
iOS:
  → Subtle opacity reduction on press (default system behavior)
  → Haptic feedback for important actions (UIImpactFeedbackGenerator)
  → Context menus on long press (UIContextMenuInteraction)
  → No ripple effect

Android:
  → Ripple effect on press (Material default)
  → No haptic on standard button press (reserved for important feedback)
  → Long press for contextual actions
  → Ripple color matches brand primary

Implementation:
```

```typescript
import { Platform, Pressable } from 'react-native'
import * as Haptics from 'expo-haptics'

function Button({ onPress, children, haptic = false }) {
  async function handlePress() {
    if (haptic && Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
    onPress?.()
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => ({
        opacity: Platform.OS === 'ios' && pressed ? 0.7 : 1,
      })}
      android_ripple={{
        color: 'rgba(255,255,255,0.2)',
        borderless: false,
      }}
    >
      {children}
    </Pressable>
  )
}
```

### Lists and Swipe Actions

```
iOS:
  → Swipe left on list item: destructive action (red, right-aligned)
  → Swipe right on list item: non-destructive action (e.g., bookmark)
  → Separators: full-width hairline (0.5pt) or inset
  → Grouped list style for settings-style screens

Android:
  → Swipe to dismiss (single direction, usually left)
  → Long press + drag to reorder
  → No native swipe-to-reveal actions in Material — use contextual menus
  → Dividers optional (Material 3 prefers no dividers)
```

### Forms and Inputs

```
iOS:
  → Keyboard types specific to input (emailAddress, numberPad, phonePad)
  → Return key label matches action (Search, Done, Next, Go)
  → Toolbar above keyboard with Next / Done for multi-input forms
  → Password fields show reveal icon (right side)
  → No floating labels — label above input (fixed position)

Android:
  → Material text fields with floating label animation
  → Input Method Editor (IME) action button matches context
  → Password visibility toggle (right side)
  → Outlined or filled text field variants
```

---

## Platform-Specific Components

Some UI elements should look and behave differently per platform. Use the system component when it exists.

| Element | iOS | Android |
|---|---|---|
| Date picker | Spinner wheel or calendar | Calendar (Material DatePicker) |
| Time picker | Spinner wheel | Clock face |
| Toggle / Switch | UISwitch (green, rounded) | Material Switch (colored thumb) |
| Segmented control | UISegmentedControl | Material Tabs or ChipGroup |
| Action sheet | UIActionSheet (bottom) | Dialog or Bottom Sheet |
| Alert | UIAlertController | AlertDialog |
| Progress | UIProgressView (thin bar) | LinearProgressIndicator |
| Loading | UIActivityIndicatorView (spinner) | CircularProgressIndicator |

```typescript
// Using platform-native components
import { Switch, Platform, DatePickerIOS } from 'react-native'

// Switch automatically renders platform-native on both
<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  trackColor={{ false: colors.border, true: colors.primary }}
  thumbColor={Platform.OS === 'android' ? colors.primary : undefined}
/>
```

---

## Status Bar

```
iOS:
  → Light content (white icons) on dark backgrounds
  → Dark content (black icons) on light backgrounds
  → Status bar height: 44–59pt (varies by device)
  → Transparent by default — your background shows through

Android:
  → Translucent or colored status bar
  → Can be completely transparent (edge-to-edge)
  → Height varies by manufacturer (~24–28dp)
  → Android 11+: enforces gesture navigation; bottom insets matter

Implementation:
```

```typescript
import { StatusBar } from 'expo-status-bar'

// Light mode screen
<StatusBar style="dark" />

// Dark mode screen or dark header
<StatusBar style="light" />

// Auto — matches system theme
<StatusBar style="auto" />
```

---

## App Store vs Play Store Design Requirements

Your design decisions affect store approval. Know the rules before building.

```
iOS App Store — Design rejections:
  → UI that mimics iOS system UI deceptively
  → Placeholder UI shipped as final (grey boxes, "lorem ipsum")
  → Buttons that don't work in review build
  → Custom in-app purchase UI (must use StoreKit)
  → Login walls before showing app value (guideline 4.0)

Play Store — Design rejections:
  → Misleading UI (fake interactive elements)
  → Deceptive subscription flows
  → UI that impersonates Google system apps
  → VPN apps without proper disclosure UI
```

---

## Haptics

Haptics are invisible branding. Used correctly, they make interactions feel premium. Used incorrectly, they're annoying.

```
iOS Haptic Types:
  Impact   → Physical impact sensation (button press, snap, pop)
    Light  → Subtle tap (selection, minor interaction)
    Medium → Standard button press (default for primary actions)
    Heavy  → Strong impact (destructive confirmation, error)

  Notification → Outcome feedback
    Success  → Task completed
    Warning  → Caution required
    Error    → Action failed

  Selection → Picker / scrubber value change

Android Haptics:
  → Use sparingly — Android haptic API is less refined
  → VIRTUAL_KEY for button presses
  → LONG_PRESS for long press actions
  → Avoid custom vibration patterns — feels off-brand

Rules:
  → Never haptic on scroll
  → Never haptic on passive view (not triggered by user)
  → Always match haptic strength to action importance
  → Success = notification success, not impact
  → Error = notification error, not just any impact
```

---

## Accessibility Platform Requirements

```
iOS:
  → VoiceOver support (screen reader)
  → accessibilityLabel on all interactive elements
  → accessibilityHint for non-obvious actions
  → accessibilityRole for semantic meaning
  → Dynamic Type support (text scales with user setting)
  → Reduce Motion (respect AnimatedPreference)
  → Reduce Transparency (remove blur effects)

Android:
  → TalkBack support (screen reader)
  → contentDescription on all interactive elements
  → importantForAccessibility for decorative elements
  → Font Scale support
  → Reduce Animations (AnimationScale system setting)

Minimum requirements for App Store submission:
  → VoiceOver must not crash or produce meaningless output
  → All interactive elements must be focusable and labeled
  → This is checked during Apple review
```

```typescript
// Accessible touchable element
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Delete post"
  accessibilityHint="Permanently removes this post from your profile"
  accessibilityRole="button"
  onPress={handleDelete}
>
  <TrashIcon />
</TouchableOpacity>
```

---

## Platform Adaptation Checklist

**Navigation**
- [ ] Back navigation works via swipe on iOS (left edge)
- [ ] Back navigation works via system gesture on Android (both edges)
- [ ] Android back press on root screen exits app (handled in navigator)
- [ ] Tab bar tapping active tab scrolls to top on iOS
- [ ] Navigation title centered on iOS, left-aligned on Android

**Interaction**
- [ ] Haptic feedback on primary actions (iOS)
- [ ] Ripple effect on tappable elements (Android)
- [ ] Swipe actions on lists follow platform conventions
- [ ] Alerts and action sheets use platform-native dialogs

**Typography and Layout**
- [ ] Dynamic Type respected (no fixed font sizes)
- [ ] Tested at 135% and 200% text scale
- [ ] Status bar style set correctly per screen
- [ ] Safe area insets applied on all screens

**Accessibility**
- [ ] All interactive elements have `accessibilityLabel`
- [ ] All images have `accessibilityLabel` or `accessibilityIgnoresInvertColors`
- [ ] VoiceOver / TalkBack navigation tested on primary flows
- [ ] Reduce Motion respected for animations

---

## Common Mistakes

**Centered navigation titles on Android.**
Material Design specifies left-aligned titles in the app bar. Centered titles look like a ported iOS app. Use `headerTitleAlign: 'left'` on Android.

**No back handling on Android.**
Pressing the system back button on a screen with no defined behavior causes the app to close unexpectedly, or does nothing. Every screen needs defined back behavior — even if it just goes to the previous screen.

**Haptics on Android everywhere.**
iOS haptics are refined and feel premium. Android haptics are variable across manufacturers and often feel cheap or jarring. Use them sparingly on Android — stick to long-press and critical feedback only.

**Using `opacity` for press feedback on Android.**
Android users expect ripple. Opacity reduction looks like a bug, not a response. Use `android_ripple` prop on Pressable for Android press states.

**Ignoring Dynamic Type / Font Scale.**
Accessibility text sizes affect ~20% of users. Fixed-height containers clip text. Layouts built assuming 16pt body text break at 200% scale. Test at large text sizes before every release.

---

## Quick Reference

```
iOS title alignment?          → Center
Android title alignment?      → Left
iOS back gesture?             → Left edge swipe
Android back gesture?         → Left or right edge swipe
iOS press feedback?           → Opacity reduction
Android press feedback?       → Ripple effect
iOS haptics?                  → Yes, on primary actions
Android haptics?              → Sparingly (long press, errors)
iOS action sheet?             → Bottom sheet (UIActionSheet)
Android action sheet?         → Dialog or Bottom Sheet
iOS modal dismiss?            → Swipe down
Android modal dismiss?        → Back gesture + scrim tap
iOS list separators?          → Hairline inset
Android list separators?      → Optional (prefer none, Material 3)
```

---

## What's Next

**Accessibility** — platform guidelines cover conventions. The next module covers accessibility as a first-class engineering practice: how to make your app usable by the 26% of people who rely on assistive technology, and why building accessible apps makes the product better for everyone.
