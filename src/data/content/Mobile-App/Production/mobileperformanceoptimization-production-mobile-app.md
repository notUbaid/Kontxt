---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
filename: performance-optimization-production-mobile-app.md
---

A slow web page loses patience after a few seconds. A slow mobile app loses the user entirely — a janky scroll, a multi-second cold start, or a battery-draining background process is one of the fastest paths to an uninstall and a one-star review. Performance on mobile isn't a "nice to have" polish pass; it directly determines retention.

## Where Mobile Performance Actually Breaks

Four areas account for most real-world mobile performance complaints:

| Area | Symptom | Root Cause Usually |
|---|---|---|
| Startup time | Long blank/splash screen | Heavy synchronous work on launch |
| Rendering | Janky scroll, dropped frames | Unnecessary re-renders, unoptimized lists |
| Memory | Crashes on low-end devices, app killed in background | Leaks, oversized images/caches |
| Network | Spinners, stale data, battery drain | No caching, over-fetching, polling instead of push |

Profile before you optimize. Guessing where the bottleneck is wastes more time than it saves — use your platform's profiler (Flipper, Xcode Instruments, Android Studio Profiler) to find the actual hot path before changing code.

## Startup Time

Users judge your app in the first second. Cold start time has a direct, measurable relationship to abandonment rate.

- Defer non-critical work (analytics init, non-essential SDK setup) until after the first frame renders
- Lazy-load screens and modules not needed for the initial view, rather than initializing your entire navigation tree upfront
- Avoid heavy synchronous operations (large JSON parsing, blocking I/O) on the main thread during launch
- Use a lightweight native splash screen rather than a JS-rendered one — the JS bundle isn't even loaded yet when the splash should already be visible

> **Best Practice:** Treat cold start as a budget, not a vibe. Set a target (e.g., under 2 seconds on a mid-tier device) early, measure it on every release, and treat regressions as bugs — not something to "look at later."

## Rendering Performance

Janky scrolling and dropped frames are usually the most visible performance problem to users, even if they're not the most severe technically.

**For long lists:**
- Always use virtualized list rendering (`FlatList`/`SectionList` in RN, `ListView.builder` in Flutter, `LazyColumn` in Compose) — never render an entire list of unknown length at once
- Provide stable, unique keys so the framework can correctly diff and recycle list items
- Avoid expensive computation (formatting, filtering) inside render/build methods — memoize or precompute instead

**For general re-renders:**
- Memoize expensive components (`React.memo`, `useMemo`, `const` widgets in Flutter) to avoid re-rendering subtrees that haven't actually changed
- Avoid creating new function/object references inline in render — these break memoization silently
- Batch state updates where possible rather than triggering multiple re-renders for related changes

> **Warning:** Premature memoization everywhere adds complexity without benefit. Profile first — wrap the components that are actually re-rendering unnecessarily and showing up as expensive in the profiler, not every component reflexively.

## Image and Asset Optimization

Images are usually the single largest contributor to both bundle size and runtime memory issues on mobile.

| Practice | Why |
|---|---|
| Serve responsively sized images (not full-resolution everywhere) | Cuts both download size and memory footprint |
| Use modern formats (WebP/AVIF) where supported | Significantly smaller than JPEG/PNG at equivalent quality |
| Lazy-load off-screen images | Avoids loading everything in a long list/feed upfront |
| Cache decoded images, not just downloaded bytes | Avoids re-decoding the same image repeatedly, a common hidden CPU cost |
| Use a CDN with on-the-fly resizing (Cloudinary, imgix, or your storage provider's image transforms) | Lets you serve the right size without maintaining multiple asset variants |

## Memory Management

Memory issues on mobile show up as crashes on low-end devices or the OS silently killing your app in the background — both are easy to miss in your own testing on a high-end dev device.

- Watch for retained listeners, timers, or subscriptions that outlive the component/screen that created them — the most common source of memory leaks in both RN and native code
- Release large resources (images, video buffers, large lists) when a screen unmounts, don't assume garbage collection handles it promptly
- Test on a genuinely low-end/older device, not just a simulator or your own flagship phone — many memory issues only surface under real device constraints

## Network Efficiency

- Cache aggressively for data that doesn't change often; don't refetch on every screen visit
- Batch related requests instead of firing many small sequential calls
- Use pagination/infinite scroll for large datasets instead of fetching everything upfront
- Prefer push (websockets, push notifications) over polling for real-time-ish data — polling drains battery and burns data even when nothing changed
- Compress request/response payloads (gzip is usually automatic, but verify it's actually enabled on your backend)

## Battery Impact

Performance and battery life are the same problem from two angles — most CPU/network waste that hurts performance also drains battery.

- [ ] No polling loops running when the app is backgrounded
- [ ] Location services request the minimum accuracy/frequency the feature actually needs, not "always-high-accuracy" by default
- [ ] Background tasks are scoped tightly and released promptly, not left running indefinitely

## Using AI Here

AI is good at spotting common anti-patterns once you point it at real profiling data — it's much less useful guessing blind.

```
Review this [component / screen / list] for mobile performance issues.

Stack: [React Native / Flutter / native]
Symptom: [what's actually slow — e.g., "scroll jank on the feed screen", "3s+ cold start"]
Profiler findings: [paste relevant profiler output if you have it]

Check for:
- Unnecessary re-renders or rebuilds
- Unvirtualized list rendering
- Expensive work happening on the main/UI thread
- Memory leaks from listeners/subscriptions not being cleaned up

[paste code]
```

> **Validation:** Re-measure after every optimization. It's easy to "fix" something that wasn't actually the bottleneck and walk away thinking you solved it — the profiler, not intuition, tells you whether it worked.

## Common Mistakes

- Optimizing based on guesses instead of profiler data
- Rendering unbounded lists without virtualization
- Loading full-resolution images everywhere regardless of display size
- Polling for data that could be pushed, draining battery for no benefit
- Only testing performance on a high-end personal device, missing real-world low-end behavior
- Memoizing reflexively instead of where the profiler shows actual cost

## Before You Move On

- [ ] Cold start time is measured and within a defined budget
- [ ] Long lists use virtualized rendering
- [ ] Images are responsively sized, lazy-loaded, and served in modern formats
- [ ] No listeners, timers, or subscriptions leak past their owning screen's lifecycle
- [ ] Performance has been tested on a real low-end/older device, not just a simulator

Next: **CI/CD** — automating the build, test, and release pipeline so performance and quality checks run on every change, not just when you remember to check.
