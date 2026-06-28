---
title: Platform Guidelines
slug: platform-guidelines
phase: Phase 1
mode: personal
projectType: mobile-app
estimatedTime: 15–25 min
---

# Platform Guidelines

iOS and Android have different design conventions — different navigation patterns, different component behaviors, different visual language. Before you design a single screen, decide how much you're going to respect those differences. For a personal project, the right answer is almost always "less than you'd think" — and this module exists to stop you from over-investing here before you've even validated the idea.

---

## Decision 1: How Much Platform-Adaptive Design Do You Actually Need?

> **Decision Card**
> Building a fully platform-adaptive UI — distinct navigation, distinct components, distinct interactions per OS — is real, ongoing work. For a personal project built solo, that's often a poor use of limited time before you know if anyone wants the app at all.

| Approach | Effort | Best for |
|---|---|---|
| Fully custom, identical UI on both platforms | Lowest design effort, but feels slightly "off" to platform-native users | Personal projects, strong brand identity, fastest to ship |
| Framework defaults (adaptive components out of the box) | Low effort, native feel for free | Default recommendation for most personal mobile apps |
| Fully platform-specific, hand-tuned per OS | Highest effort, most polished native feel | Only worth it once you have real users and know the app is worth the investment |

>  **Best Practice**
> If you're using a cross-platform framework (React Native, Flutter, Expo), **lean on its built-in adaptive components** rather than either extreme. Most cross-platform UI libraries already render slightly differently per platform (e.g., switches, action sheets) without you doing any extra work — you get a reasonable native feel for free.

---

## Decision 2: Know the Big Differences (Even If You Don't Fully Implement Them)

You don't need to memorize the full guidelines, but knowing these will save you from confusing decisions later:

| Element | iOS (Human Interface Guidelines) | Android (Material Design) |
|---|---|---|
| Primary navigation | Tab bar at bottom, swipe-back gesture from screen edge | Bottom navigation or drawer, hardware/gesture back button always expected to work |
| Action menus | Action Sheet (slides up from bottom) | Bottom Sheet / Menu (similar concept, different visual style) |
| Visual feedback on tap | Subtle opacity change | Ripple effect (a Material Design signature) |
| Typography | SF Pro (system font) | Roboto (system font) |

> [!WARNING]
> The one platform convention worth respecting even in a simple personal project: **Android's back button/gesture must always work as users expect** — it should navigate back through your app's history, not do nothing or behave unpredictably. This is one of the most noticeable "this app feels broken" signals for Android users specifically.

---

## Decision 3: Don't Pixel-Hunt Platform Differences Solo

> [!WARNING]
> Trying to hand-tune every component to look pixel-perfect on both iOS and Android is a deep time sink with limited payoff for a personal project. Most users won't consciously notice that your switch component doesn't perfectly match their OS's native styling — they will notice if your app is slow, confusing, or the back button doesn't work.

Spend your limited time on: consistent navigation logic, the back-gesture/button behavior above, and basic readability — not on matching every native shadow and corner radius exactly.

---

## Decision 4: Test on Both Platforms at Least Once

Even for a personal project, run the app on a real device (or at minimum a simulator/emulator) for both iOS and Android before considering a feature "done." Cross-platform frameworks occasionally render something correctly on one platform and oddly on the other — this is cheap to catch early and annoying to discover after you've built five more features on top of it.

---

## Common AI Mistakes to Watch For

- **Assumes iOS-only patterns apply universally** (e.g., describing only swipe-back navigation) without flagging the Android equivalent — ask explicitly for both platforms' behavior when it matters.
- **Over-engineers a fully bespoke design system per platform** by default — for a personal project, explicitly ask for the simpler, framework-default approach unless you have a specific reason not to.
- **Glosses over the Android back-button requirement** — this is worth confirming explicitly since it's the most common real complaint from Android users about cross-platform apps.

---

## AI Prompt: Get Platform-Appropriate Guidance

```
I'm building a personal mobile app solo using [React Native / Flutter / Expo — your framework].

For these screens/features: [list 2-3 core screens or features]

Recommend the framework's default adaptive components rather than custom-built ones, and tell me explicitly:
1. Where iOS and Android will render this differently using built-in defaults (if at all)
2. Anything I must handle explicitly for Android's back button/gesture behavior to work correctly
3. Any place a fully custom (non-adaptive) UI would be simpler to build and maintain solo, with the tradeoff of feeling slightly less "native" on one platform

Keep this practical for a solo personal project — don't suggest a fully platform-specific design system unless there's a strong reason to.
```

---

## Validate Before You Move On

- [ ] You've decided, deliberately, how adaptive your UI needs to be — not defaulted into either extreme without thinking about it
- [ ] Android's back button/gesture behaves correctly wherever you've tested so far
- [ ] You're not spending disproportionate time pixel-matching native components
- [ ] You've run the app on both a real device/simulator for iOS and Android at least once

> [!TIP]
> Revisit this decision after you have real users. If platform-native feel becomes a recurring piece of feedback, that's the signal to invest further — not a guess you need to make perfectly upfront.

---

**Next:** Design System — define the actual visual components this app will use.
