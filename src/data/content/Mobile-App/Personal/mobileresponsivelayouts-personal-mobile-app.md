---
title: Responsive Layouts
slug: responsive-layouts
phase: Phase 1
mode: personal
projectType: mobile-app
estimatedTime: 15–25 min
---

# Responsive Layouts

"Responsive" on mobile means something different than on web — you're not designing for arbitrary browser widths, but you do need to handle different phone sizes, optional tablet support, orientation, and a setting most apps quietly get wrong: the user's OS-level text size preference.

---

## Decision 1: Phone-Only, or Phone + Tablet?

> **Decision Card**
> Decide this explicitly, don't let it default by accident. For most personal projects, **supporting phones only** is the right scope — tablet layouts are a meaningfully different design problem (more space to use well, not just a scaled-up phone screen), and building both well, solo, before you've validated the idea, is a real time cost.

| Scope | When it fits |
|---|---|
| Phone only | Default for personal projects — fastest to ship, validates the idea first |
| Phone + basic tablet support (same layout, just centered/constrained width) | Low additional effort if your layouts are already flexible — acceptable middle ground |
| Fully tablet-optimized layouts | Only once you know tablet usage is meaningful for your actual users |

---

## Decision 2: Use Flexible Layouts, Not Fixed Pixel Values

> [!WARNING]
> Hardcoding fixed pixel widths for containers and text — instead of using flexible layout (flexbox in React Native, or your framework's equivalent) — breaks the moment your app runs on a screen size different from whatever device you happened to design on. Phones range from compact to large; design with flexible, proportional layouts from the start, not fixed dimensions tuned to one device.

- [ ] Layouts use flex-based sizing (`flex: 1`, percentage-based widths) rather than fixed pixel widths for primary containers
- [ ] Text containers can grow — don't fix a height that assumes a specific line count

---

## Decision 3: Orientation

Decide explicitly whether your app needs to support landscape orientation, or whether locking to portrait is acceptable:

> [!TIP]
> For most personal utility/productivity apps, **locking to portrait** is a perfectly reasonable simplification — it removes an entire category of layout edge cases (different aspect ratios, re-flowing content) you'd otherwise need to test and handle. Only support landscape if your app's core use case genuinely benefits from it (e.g., video, games, drawing).

---

## Decision 4: Respect OS-Level Text Size Settings

> [!WARNING]
> Both iOS (Dynamic Type) and Android (font scale) let users increase system text size for accessibility — and a meaningful number of users have this enabled. If your layout uses fixed-height containers around text, a larger font size setting causes text to truncate or overflow awkwardly. Test your screens with the OS text size setting turned up, not just at the default.

- [ ] Text containers grow with content rather than clipping when font scale increases
- [ ] You've tested at least your core screens with the device's largest accessibility text size setting enabled

---

## Decision 5: Safe Areas in Layout (Not Just Tokens)

Beyond the safe-area tokens from Design System, verify this in actual layout behavior:

- [ ] Scrollable content doesn't get hidden behind a bottom tab bar or home indicator
- [ ] Fixed headers/footers account for the status bar and notch area on every screen, not just the ones you happened to check

---

## Common Mistakes (Including AI's)

- **Generates layouts with fixed pixel dimensions** instead of flex-based sizing — push back and request proportional/flexible layout explicitly.
- **Assumes portrait-only without confirming** — fine as a default, but make sure it's a decision, not an oversight, especially if any screen (camera, media) might expect landscape.
- **Ignores OS text-scaling settings entirely** — explicitly test or ask for layouts that accommodate larger font scale settings.
- **Designs only for one specific screen size** (whatever simulator/device was used) without considering smaller or larger phones.
- **Forgets tablet is even a question** — make the phone-only decision deliberate, document it, move on.

---

## AI Prompt: Build Flexible, Accessible Layouts

```
I'm building screens for a personal mobile app using [React Native / Flutter / Expo], targeting phones only (no tablet support needed), portrait orientation.

For this screen: [describe the screen/feature]

Build the layout using flex-based sizing, not fixed pixel dimensions, so it adapts across different phone screen sizes. Ensure text containers grow rather than clip if the device's font scale/Dynamic Type setting is increased. Respect safe area insets for any content near the top or bottom of the screen.
```

---

## Validate Before You Move On

- [ ] Layout scope (phone-only vs. phone+tablet) and orientation support are explicit decisions, not defaults you didn't examine
- [ ] Layouts use flexible/proportional sizing, not fixed pixel dimensions
- [ ] You've tested at least your core screens at the device's largest accessibility text size
- [ ] No content is hidden behind tab bars, notches, or home indicators
- [ ] You've checked layouts on more than one simulated device size

> [!TIP]
> If you only have time to test one accessibility setting before shipping, make it the larger text size setting — it's the one most likely to visibly break a layout that otherwise looks fine.

---

**Next:** App Navigation — define how users move between these screens.
