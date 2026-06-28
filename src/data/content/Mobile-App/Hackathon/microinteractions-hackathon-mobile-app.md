---
title: Microinteractions
slug: microinteractions
phase: Phase 1
mode: hackathon
projectType: mobile-app
estimatedTime: 20–25 min
---

# Microinteractions

Microinteractions are the moments between the moments.

A button press. A toggle flip. A card swipe. A like tap.

They last under 300 milliseconds. Judges won't consciously notice them. But they will feel the difference between an app that feels alive and one that feels assembled.

Microinteractions are what separates a polished product from a prototype.

---

## What Counts as a Microinteraction

Not everything. Be precise about what to spend time on.

| Element | Microinteraction |
|---|---|
| Button press | Scale down on tap, spring back |
| Toggle / switch | Smooth thumb slide + color transition |
| Like / favorite | Icon pop + color fill |
| Tab bar icons | Scale or bounce on selection |
| Cards | Lift shadow on press, spring on release |
| Pull to refresh | Custom indicator with brand feel |
| Swipe to delete | Reveal action with haptic |
| Bottom sheet | Spring open, damped close |

Target the elements judges will touch during the demo. Prioritize ruthlessly.

---

## The Physics of Feel

Good microinteractions use spring physics, not linear easing.

**Linear easing** looks mechanical. It moves at constant speed. Nothing in the real world works this way.

**Spring physics** mimics reality. It overshoots slightly, bounces back, settles. It feels responsive.

> Rule: For interactive elements (taps, drags, toggles), always use spring. For transitions (page changes, modals), use ease-out curves.

### React Native — Reanimated 2

```
Copy Prompt ↓
```

> I'm building a React Native app with react-native-reanimated. Generate a pressable card component that scales down to 0.96 on press using withSpring, and returns to 1.0 on release. Add a subtle shadow lift on press. Keep it under 50 lines using useAnimatedStyle and useSharedValue.

### Flutter

```
Copy Prompt ↓
```

> I'm building a Flutter app. Create a reusable TapScaleWidget that wraps any child and scales it to 0.95 on tap down and springs back to 1.0 on tap up using AnimationController with a spring simulation. Keep it under 60 lines and accept a child widget and onTap callback.

---

## The Must-Have Five

You do not need 20 microinteractions. You need five good ones in the right places.

### 1. Tap Scale on Buttons and Cards

Every primary button. Every tappable card.

Scale to `0.95–0.97` on press. Spring back on release.

This alone makes your UI feel responsive. It is the highest ROI microinteraction you can implement.

---

### 2. Like / Favorite Animation

If your app has any social mechanic or save feature, this is mandatory.

The pattern:
1. Icon scales up to `1.3` on tap
2. Color fills in (e.g. grey → red)
3. Springs back to `1.0`
4. Optional: particle burst

```
Copy Prompt ↓
```

> Generate a React Native / Flutter heart/favorite button component. On tap: scale to 1.3 with spring, fill with color, return to 1.0. If already favorited, reverse animation. Use react-native-reanimated / Flutter AnimationController. No third-party animation libraries. Under 60 lines.

---

### 3. Tab Bar Selection

Default tab bars look untouched.

Add one of:
- Icon scales up `1.0 → 1.15` on selection
- Icon bounces with spring
- Label fades in on selection

This takes under 30 minutes and is visible on every single screen.

---

### 4. Success Confirmation

When a key action completes (post submitted, payment sent, profile saved):

- Checkmark animates in with a draw stroke or scale pop
- Background flashes success color briefly
- Returns to normal in under 600ms

This closes the feedback loop. Users know it worked. Judges know it's finished.

---

### 5. Haptics

Haptics are free microinteractions.

| Action | Haptic Type |
|---|---|
| Button press | Light impact |
| Destructive action (delete) | Heavy impact |
| Success | Notification success |
| Error | Notification error |
| Toggle flip | Selection |

**React Native:**
```js
import * as Haptics from 'expo-haptics';
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
```

**Flutter:**
```dart
HapticFeedback.lightImpact();
```

One line each. Add them everywhere you add a tap scale.

>  Haptics only work on physical devices. Test on hardware before your demo.

---

## Timing Reference

Get these values right. Wrong timing kills the effect.

| Animation | Duration | Easing |
|---|---|---|
| Tap scale down | 80–100ms | ease-out |
| Tap scale return | 200–250ms | spring |
| Like pop | 150ms up / 200ms back | spring |
| Success checkmark | 300–400ms | ease-out |
| Tab icon bounce | 200ms | spring (overshoot: 0.3) |
| Modal open | 280–320ms | ease-out |
| Modal close | 200–240ms | ease-in |

> 300ms is the perceptual threshold. Under 300ms feels instant. Over 300ms feels deliberate. Know which you want.

---

## What Not to Do

| Mistake | Why It Hurts |
|---|---|
| Animating everything | Visual noise kills focus |
| Using linear easing on taps | Feels mechanical, not physical |
| Long animations (600ms+) | Slows the demo, frustrates judges |
| Missing haptics on destructive actions | Delete without feedback feels broken |
| Same animation on all elements | Looks templated |
| Animating during data fetch | Jank during load compounds badly |

---

## Generating a Full Microinteraction Pass

Once your core screens are built, use this prompt for a comprehensive review:

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app. Here are my main interactive elements: [list your buttons, cards, toggles, icons]. For each one, suggest the most impactful microinteraction: what triggers it, what animation to use, duration, easing type, and whether to add haptic feedback. Prioritize the 5 highest-impact items for a 2-hour hackathon implementation window.

---

## Implementation Checklist

- [ ] Primary buttons have tap scale (0.95–0.97 + spring return)
- [ ] Tappable cards have press feedback
- [ ] Tab bar icons animate on selection
- [ ] Core action (like / save / submit) has dedicated animation
- [ ] Success state has visual confirmation
- [ ] Haptics added to primary taps and destructive actions
- [ ] No animation exceeds 400ms
- [ ] Tested on physical device (haptics + frame rate)

---

## The Real Goal

Microinteractions are not decoration.

They are the physical vocabulary of your app.

Every tap that responds correctly tells the user: this was built by someone who cared. That impression compounds across every interaction in a demo.

You are not adding animations. You are adding evidence of craft.

---

## Next Step

Microinteractions complete when your checklist is done and the app has been tested on a physical device.

Move to **Tech Stack** (Phase 2) when your UI layer is fully polished.
