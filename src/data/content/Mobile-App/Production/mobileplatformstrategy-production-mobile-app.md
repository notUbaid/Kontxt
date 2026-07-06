---
title: Platform Strategy
slug: platform-strategy
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
---

# Platform Strategy

Platform strategy is the first architecture decision you make — and it constrains every decision that follows. Choosing wrong costs months.

The question is not "iOS or Android." Both. The question is: how do you build for both efficiently, without sacrificing the quality that makes users keep your app?

---

## The Decision Framework

```
                    ┌─────────────────────────────────┐
                    │   What matters most to you?     │
                    └─────────────────────────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
    Maximum platform          Ship fast,            Maximum code
    fidelity + performance    one codebase          reuse with
    for one platform          both platforms        native access
              │                     │                     │
         Native Swift/         React Native /        Flutter
         Kotlin                Expo                       
```

There is no universally correct answer. There is only the correct answer for your constraints.

---

## The Options

### React Native + Expo (Recommended for most production apps)

**What it is:** JavaScript/TypeScript targeting iOS and Android from one codebase. Expo adds managed infrastructure, OTA updates, and build tooling.

**Best for:**
- Teams with web/JS experience
- Apps needing fast iteration
- Products where business logic > platform UI
- Apps that need OTA (over-the-air) updates post-launch

**Real production apps built this way:** Shopify, Discord, Coinbase, Walmart

| Strength | Limitation |
|---|---|
| One codebase, two platforms | Performance ceiling below native for graphics-heavy apps |
| OTA updates via Expo | Complex native modules require ejecting or custom config plugins |
| Massive JS ecosystem | Some platform APIs lag behind native releases |
| TypeScript-native | Bridge overhead for some native operations |
| Expo managed workflow reduces DevOps | Managed workflow has some API restrictions |

---

### Flutter

**What it is:** Dart language, compiles to native ARM code. Renders its own UI — does not use platform UI components.

**Best for:**
- Teams comfortable with Dart
- Apps with custom, highly branded UI
- Games or animation-heavy apps
- Teams that want pixel-perfect cross-platform consistency

| Strength | Limitation |
|---|---|
| Excellent rendering performance | Dart is a learning curve for JS developers |
| Custom UI without platform constraints | Does not use native UI — can feel slightly off on each platform |
| Strong Google tooling and Material support | Smaller ecosystem than React Native |
| Hot reload is fast | Less JS interop |

---

### Native (Swift / Kotlin)

**What it is:** Platform-specific codebases. Swift for iOS, Kotlin for Android.

**Best for:**
- Apps requiring deep platform integration (ARKit, HealthKit, advanced camera)
- Apps where performance is the core product (games, video processing)
- Teams with existing native expertise
- When you are building iOS-first and Android can wait

| Strength | Limitation |
|---|---|
| Maximum performance and platform access | Two codebases = 2x development cost |
| First-class access to every platform API | 2x maintenance burden |
| Best platform UI fidelity | 2x release process |
| No abstraction layer overhead | Separate teams or sequential builds |

---

## The Production Recommendation

For a production web app adding a mobile presence, or a new product with a JS-native team:

**React Native + Expo** is the correct default.

Here is why:

```
1. Shared business logic with your web backend (same API, same validation schemas)
2. TypeScript across the entire stack
3. Expo EAS handles iOS and Android builds in CI without Mac hardware
4. OTA updates let you ship bug fixes without app store review
5. The JS ecosystem covers 95% of what production apps need
6. Hiring is easier — React Native developers outnumber Flutter/Dart developers
```

The remaining 5% (AR, advanced camera, Bluetooth-heavy apps) belong on native.

---

## Part 1: Expo Workflow Decision

Expo has two modes. Choose before you start.

### Managed Workflow
Expo controls the native layer. You write JS/TS only.

```
 Use when:
  - Your app doesn't need custom native modules
  - You want Expo's full managed infrastructure
  - You want the simplest possible build process

 Avoid when:
  - You need a native SDK Expo doesn't support
  - You need custom native code (Objective-C / Swift / Kotlin / Java)
```

### Bare Workflow (with Expo modules)
You own the native projects (`ios/` and `android/` directories). Expo modules still available.

```
 Use when:
  - You need custom native modules
  - You need third-party SDKs that require native setup
  - You need full control over native configuration

 Avoid when:
  - You don't have iOS/Android expertise on the team
  - You want Expo Go for rapid development
```

> **Recommendation:** Start with managed workflow. Migrate to bare only when you hit a wall. Most production apps never need to.

---

## Part 2: iOS vs Android Priority

You cannot launch on both platforms simultaneously without a larger team. Choose a primary platform.

### Choose iOS First If:
- Your target market is US, UK, Australia, Japan, or Scandinavia
- Your product is premium or subscription-based (iOS users spend more)
- Your team has Macs (required for iOS builds without Expo EAS)
- You are targeting enterprise users

### Choose Android First If:
- Your target market is India, Southeast Asia, Latin America, or Africa
- Your product is free or ad-supported
- Your market research shows Android dominance in your segment

### The Realistic Approach:
Build cross-platform from day one. Test primarily on one platform. Use Expo EAS to build both. Launch iOS first — App Store review is more stringent; clearing it means Android passes too.

---

## Part 3: OTA Updates Strategy

OTA (Over-The-Air) updates are one of React Native's biggest production advantages. They let you push JS bundle changes without an app store submission.

```tsx
// With Expo Updates
import * as Updates from 'expo-updates';

export async function checkForUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();

      // For critical fixes: force reload
      await Updates.reloadAsync();

      // For non-critical: notify user on next app open
    }
  } catch (err) {
    // OTA failure is non-fatal — app continues with current bundle
    console.warn('OTA check failed:', err);
  }
}
```

**OTA update rules:**
- OTA can only update JS code — not native modules, not app config
- Adding a new native dependency requires a full store submission
- Keep OTA updates for bug fixes and copy changes
- Major features should go through full store releases for review compliance
- Apple's guidelines require OTA updates not to significantly change app purpose

---

## Part 4: Minimum OS Version

Set this before writing any code. It determines which APIs you can use.

```json
// app.json
{
  "expo": {
    "ios": {
      "deploymentTarget": "16.0"   // ~90%+ of iOS devices as of 2025
    },
    "android": {
      "minSdkVersion": 24          // Android 7.0 — ~97%+ of active devices
    }
  }
}
```

**What dropping older versions gives you:**
- iOS 16+: SwiftUI-equivalent components, Lock Screen widgets, passkeys
- Android 7+ (API 24): All modern Jetpack APIs, background job scheduling

Check your target market's device distribution before setting these. Markets with older devices (emerging economies) may require lower minimums.

---

## Part 5: Platform-Specific Code

Cross-platform doesn't mean identical on both platforms. Some behaviors must differ.

```tsx
// Platform detection
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.select({
      ios: 44,       // iOS status bar + safe area
      android: 24,   // Android status bar
    }),
    shadowColor: Platform.select({
      ios: '#000',   // iOS uses shadow props
      android: undefined, // Android uses elevation
    }),
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
    elevation: Platform.OS === 'android' ? 4 : undefined,
  },
});
```

```tsx
// Platform-specific file variants — React Native resolves these automatically
// Button.ios.tsx    → used on iOS
// Button.android.tsx → used on Android
// Button.tsx        → fallback for both

// Use for significant behavioral differences, not minor styling
```

```tsx
// Haptic feedback — platform-specific
import * as Haptics from 'expo-haptics';

async function handleSuccess() {
  if (Platform.OS === 'ios') {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } else {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
}
```

---

## Part 6: App Store & Play Store Requirements

Know these before you build — they affect architecture decisions.

### Apple App Store (iOS)
- Requires a Mac or Expo EAS for builds
- Review takes 1–3 days (first submission), 1–24 hours (updates)
- Mandatory: privacy manifest for data collection APIs
- Mandatory: App Tracking Transparency prompt if using advertising IDs
- In-app purchases must use Apple's payment system (30% fee)
- Subscriptions: Apple takes 30% year 1, 15% year 2+

### Google Play Store (Android)
- Builds via any OS with Expo EAS
- Review takes 1–3 days (first submission), faster after history
- Target API level must be within 1 year of latest Android release
- In-app purchases: Google takes 15% on first $1M revenue, 30% after
- Mandatory: Data safety section must match your privacy policy

---

## Platform Strategy Decision Checklist

- [ ] Framework chosen: React Native + Expo / Flutter / Native
- [ ] Expo workflow chosen: Managed / Bare
- [ ] Primary launch platform chosen: iOS / Android
- [ ] Minimum OS versions set in `app.json`
- [ ] OTA update strategy defined
- [ ] App Store and Play Store accounts created
- [ ] Apple Developer account ($99/year) registered — takes 24–48h for approval
- [ ] Google Play account ($25 one-time) registered
- [ ] Revenue share implications understood for your monetization model

---

## AI Prompt: Platform Strategy Validation

```
You are a senior mobile architect reviewing platform strategy for a new production mobile app.

App type: [describe your app]
Team background: [web JS / mobile native / mixed]
Target markets: [US / EU / emerging markets / global]
Core features: [list 5–7 core features]
Monetization: [free / subscription / in-app purchases / ads]
Timeline: [weeks to first launch]

Evaluate:
1. Is React Native + Expo the right choice, or are there specific features that require Flutter or native?
2. Should we use managed or bare Expo workflow given these features?
3. Which platform should we launch on first and why?
4. Are there any features in this list that will require native modules, custom config plugins, or full bare workflow?
5. What OTA update restrictions apply to this app given Apple's guidelines?

Return specific recommendations with reasoning. Flag any features that could cause App Store rejection.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Native for a standard app | 2x cost, 2x time, same result | React Native + Expo for most apps |
| Bare workflow from day one | Unnecessary native complexity | Start managed, eject only when needed |
| No minimum OS version set | Unexpected API unavailability | Set in `app.json` before first build |
| OTA updates for native changes | Update silently fails or crashes | OTA for JS only — native needs store release |
| No Apple Developer account yet | 48h delay blocks first TestFlight | Register before you need it |
| Building for both platforms simultaneously | Neither platform gets enough attention | Primary platform first, secondary second |
| Ignoring App Store guidelines until submission | Rejection after weeks of work | Read guidelines before building payments, tracking, and content features |

---

## Next: Mobile Fundamentals →

With platform chosen, the next topic establishes the foundational mobile concepts every React Native engineer must understand before writing production code.
