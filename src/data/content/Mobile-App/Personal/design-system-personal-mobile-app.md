---
title: Design System
slug: design-system
phase: Phase 1
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Design System

A mobile design system is smaller in scope than a full web design system — but a few mobile-specific basics (touch target sizing, dark mode, safe areas) matter more here than they would on the web, because getting them wrong makes an app feel broken rather than just slightly unpolished.

For a personal project, the goal is a minimal, consistent set of tokens and components — not a comprehensive component library you'll spend more time building than using.

---

## Decision 1: Component Foundation

| Option | Best for |
|---|---|
| Framework defaults + custom styling (e.g., React Native core components + StyleSheet/NativeWind) | Most personal projects — full control, no extra dependency to learn |
| Component library (React Native Paper, Tamagui, NativeBase) | If you want a head start with pre-built, accessible components and don't mind the extra dependency and learning curve |

> [!TIP]
> For a solo personal project, starting with your framework's defaults plus a utility styling approach (like NativeWind if you're using React Native) is usually the fastest path. Reach for a full component library only if you're building something with a lot of complex components (data tables, multi-step forms) where reinventing them yourself would cost more time than learning the library.

---

## Decision 2: Tokens (Same Idea as Web, Mobile-Specific Units)

- [ ] **Colors** — primary, neutral scale, semantic (success/warning/error) — same as web
- [ ] **Spacing scale** — fixed steps (e.g., 4/8/12/16/24/32), used consistently
- [ ] **Typography scale** — fewer sizes than a web app typically needs; mobile screens have less room, so 4–5 sizes is usually enough
- [ ] **Units** — use platform-appropriate units (`dp` on Android, points on iOS); most cross-platform frameworks abstract this for you, but be aware raw pixel values don't translate directly across device densities

---

## Decision 3: Touch Target Sizing

> [!WARNING]
> **Minimum touch target size is not a style preference — it's a usability requirement.** Apple's Human Interface Guidelines specify a minimum of 44×44pt; Android's Material Design specifies 48×48dp. Buttons, icons, and tappable list items smaller than this are frustrating to tap accurately, especially for users with larger fingers or any motor impairment. Bake this into your component definitions from the start — it's much easier than going back and resizing every small icon button later.

---

## Decision 4: Dark Mode

>  **Best Practice**
> Plan for dark mode now, even if you ship light mode only at first. Define your color tokens with both a light and dark value from the start (most styling approaches support this with minimal extra effort), rather than hardcoding light-mode colors everywhere and facing a larger retrofit later. Mobile users expect dark mode support far more than web users do, and many will have their OS set to dark mode by default.

---

## Decision 5: Icons

Pick one icon set and use it consistently — most cross-platform frameworks integrate easily with a standard set (e.g., Expo's vector icons, Lucide). Mixing icon styles from multiple sets is a small but noticeable inconsistency.

---

## Decision 6: Safe Areas & Device Variability

- [ ] UI respects safe area insets (notches, home indicators, status bars) — most frameworks provide a safe-area utility; use it on every screen, not just the ones where you happened to notice an overlap
- [ ] Layouts are tested on at least one smaller and one larger screen size, not just whatever device/simulator you personally use daily

---

## Common Mistakes (Including AI's)

- **Touch targets smaller than the platform minimum** — explicitly check icon-only buttons and small list actions against this.
- **Hardcodes light-mode-only colors** with no plan for dark mode — costly to retrofit later even if you don't ship dark mode immediately.
- **Builds an elaborate, comprehensive component library** before validating whether the app idea itself is worth pursuing — for a personal project, this is time better spent shipping a first version.
- **Ignores safe area insets**, leading to content clipped behind notches or home indicators on real devices (often invisible in some simulators).
- **Mixes icon sets/styles** inconsistently across screens.

---

## AI Prompt: Generate Your Mobile Design Tokens

```
I'm building a personal mobile app using [React Native / Flutter / Expo].

Generate a minimal design system:
1. A color token set with both light and dark mode values for: primary, a 5-step neutral scale, and 3 semantic colors (success/warning/error)
2. A spacing scale: 4/8/12/16/24/32
3. A typography scale: 4-5 sizes appropriate for mobile screens, with the platform's default system font
4. Confirm all interactive components (buttons, icon buttons, list items) meet minimum touch target size: 44x44pt (iOS) / 48x48dp (Android)

Keep this minimal and fast to implement — I'm validating an idea solo, not building a comprehensive design system yet.
```

---

## Validate Before You Move On

- [ ] Every tappable element meets the minimum touch target size for its platform
- [ ] Color tokens include both light and dark mode values
- [ ] Typography and spacing scales are fixed and limited (not ad-hoc per screen)
- [ ] One icon set is used consistently
- [ ] Safe area insets are respected on every screen
- [ ] You've tested layouts on more than one screen size

> [!TIP]
> Keep this token list short. You can always add to it as real screens demand new values — starting comprehensive and unused is wasted effort for a personal project moving fast.

---

**Next:** Responsive Layouts — make sure these screens hold up across different device sizes.
