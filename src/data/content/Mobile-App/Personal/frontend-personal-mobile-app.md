---
title: Frontend
slug: frontend
phase: Phase 3
mode: personal
projectType: mobile-app
estimatedTime: 25–35 min
---

# Frontend

This is where your navigation structure, design system, and state management decisions become actual screens. A few mobile-specific performance habits matter more here than they would on web — phones have less memory and weaker processors than the laptop you're developing on, and it shows quickly in scrolling and list rendering if you're not careful.

---

## Decision 1: Build One Flow Completely Before Moving On

Same principle as any vertical-slice approach: build one core flow (e.g., create an entry → view list → view detail) all the way through — including loading, empty, and error states — before starting the next feature. It's tempting to build five screens' happy paths first; resist that, since the gaps tend to get skipped permanently once you've moved on.

---

## Decision 2: Implement All the States You Planned

Even for a personal app, every data-driven screen should handle:

- [ ] **Loading** — skeleton or spinner, not a blank screen
- [ ] **Empty** — first use, zero data (what does a brand-new user actually see?)
- [ ] **Populated** — the normal case
- [ ] **Error** — failed request, shown clearly, not a silent failure or endless spinner

---

## Decision 3: Use Virtualized Lists for Anything Unbounded

> [!WARNING]
> **Never render a potentially-growing list with `.map()` over a plain `<View>` or `<ScrollView>`.** This renders every single item at once, regardless of whether it's visible on screen — fine for 10 items, a real performance and memory problem for hundreds, especially on older or lower-end devices. Use your framework's virtualized list component (`FlatList`/`SectionList` in React Native, `ListView.builder` in Flutter), which only renders what's actually visible plus a small buffer.

---

## Decision 4: Image Handling

- [ ] Images are sized appropriately for their display size, not full-resolution originals scaled down via styling — this bloats both app size and load time
- [ ] Use your framework's optimized image component (e.g., Expo Image) which handles caching and format optimization, rather than the most basic image component

---

## Decision 5: Common Mobile Gestures

If your app's UX benefits from them, implement these consistently rather than only on some screens:

- **Pull-to-refresh** on list screens with server-backed data
- **Swipe actions** (delete/archive) on list items, if that fits your app's interaction model — but only where users would actually expect it; don't add gestures just because they're available

---

## Decision 6: Test on Both Platforms as You Build

> [!WARNING]
> Don't build five screens on one platform's simulator and check the other platform only at the end. Small differences (a shadow that renders fine on iOS but looks wrong on Android, a gesture that conflicts with Android's back gesture) are far easier to catch and fix one screen at a time than to debug in bulk later.

---

## Common Mistakes (Including AI's)

- **Renders lists with `.map()` instead of a virtualized list component** — flag this any time a list could realistically grow beyond a handful of items.
- **Skips loading/empty/error states**, building only the populated view — explicitly require all four when asking for a screen.
- **Uses unoptimized, full-size images** — ask explicitly for appropriately sized, cached image handling.
- **Builds and tests only on one platform** during development — check both, even briefly, per screen.
- **Adds gestures inconsistently** (swipe-to-delete on one list but not a visually similar one elsewhere) — keep interaction patterns consistent across the app.

---

## AI Prompt: Build a Screen

```
Build the [screen name] screen for a personal mobile app using [React Native/Expo + your stack].

Requirements:
- Use FlatList (not .map() over a View) for any list of [your data], since it could grow over time
- Implement all four states: loading (skeleton), empty (first-time/no data), populated, and error (failed fetch)
- Use existing Design System components and tokens: [list relevant ones]
- Use an optimized image component for any images, sized appropriately for their display size
- [If relevant]: add pull-to-refresh for this list

Reference my navigation setup: [briefly describe where this screen sits in your nav structure]. Confirm this renders correctly conceptually on both iOS and Android — flag anything platform-specific I should watch for.
```

---

## Validate Before You Move On

- [ ] Any list that could grow uses a virtualized list component, not `.map()`
- [ ] All four states (loading/empty/populated/error) are implemented, not just the happy path
- [ ] Images are appropriately sized and use an optimized image component
- [ ] You've tested this screen on both iOS and Android, not just one
- [ ] Design system components/tokens are used consistently rather than one-off styling

> [!TIP]
> If scrolling feels janky on a real device (not just the simulator), check for non-virtualized lists or oversized images first — those two are responsible for the large majority of mobile performance complaints in apps this size.

---

**Next:** App Lifecycle — handle what happens when your app is backgrounded, killed, or relaunched.
