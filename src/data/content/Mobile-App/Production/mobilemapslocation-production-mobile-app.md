---
title: Maps & Location
slug: maps-location
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 20-25 min
---

# Maps & Location

Location is one of the most privacy-sensitive permissions a mobile app can request, and it's also one of the most expensive APIs to misuse at scale. This module covers the architecture decisions that matter: which level of location access you actually need, how to avoid runaway API/battery costs, and how to request permission in a way that doesn't get reflexively denied.

---

## Decision 1 — How Much Location Access Do You Actually Need

Don't default to the most permissive option. Match the request to the actual feature.

| Access Level | Use For | Avoid Unless |
|---|---|---|
| **One-time / "while using"** | Showing nearby results, tagging a post with location, address autocomplete | This covers most use cases |
| **Background location** | Continuous tracking needed even when the app isn't open (delivery tracking, fitness tracking during a workout) | The feature is fundamentally impossible without it — this is a high-friction permission with extra App Store/Play Store review scrutiny |
| **Precise vs. approximate** (iOS 14+, Android 12+) | Precise: navigation, exact delivery location. Approximate: weather, regional content, nearby-city search | Default to requesting only what the feature needs — approximate is sufficient far more often than apps assume |

> ️ **Background location requires additional App Store review justification** and is one of the more common rejection/scrutiny points — Apple and Google both expect a clear, user-visible reason background tracking is happening (e.g. an active visible indicator), not silent background collection. Don't request it as a default "just in case" — it adds review friction, battery cost, and user trust cost for a capability most apps don't actually need.

---

## Decision 2 — Permission Request Timing

Same principle as push notification permissions: don't ask on launch.

>  Request location permission at the exact moment the user takes an action that requires it (tapping "find nearby," starting a delivery order) — not during onboarding, before they understand why you want it. A contextual request tied to a clear action has a meaningfully higher acceptance rate, and on iOS a denial is hard to recover from without sending the user to Settings manually.

```typescript
async function requestLocationForNearbySearch() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    // fall back to manual city/zip entry — don't block the feature entirely
    return null;
  }
  return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
}
```

>  **Always have a fallback for denied permission.** A "find nearby" feature that becomes entirely unusable without location access is a worse experience than one that falls back to manual location entry. Treat permission denial as an expected, designed-for path, not an error state.

---

## Decision 3 — Map Provider

| Option | Cost Shape | Notes |
|---|---|---|
| **Apple Maps (iOS) + Google Maps (Android)** via `react-native-maps` | Free on iOS; Google Maps SDK has its own pricing tier on Android, generous free tier | Native-feeling per platform, no API key needed for the iOS half |
| **Mapbox** | Usage-based, free tier then per-load pricing | Better for heavily customized map styling, consistent cross-platform look |
| **Google Maps on both platforms** | Single API key, single styling system, usage-based pricing on both | Simpler to maintain one map style/config, but loses the native Apple Maps feel on iOS |

> **Recommendation:** `react-native-maps` with platform-native providers (Apple Maps on iOS, Google Maps on Android) is the default for most apps — it's free or near-free at reasonable scale and gives each platform its native map look. Reach for Mapbox specifically when your product needs heavy custom styling or a guaranteed-identical look across platforms.

---

## Decision 4 — Geocoding & Places API Cost Control

This is the line item that surprises teams: address autocomplete and reverse geocoding are billed per-request, and a naive implementation can burn through free tier in days.

> ️ **Never call a geocoding/places API on every keystroke of an address search field without debouncing.** A user typing a 20-character address can trigger 20 billed API calls instead of 1-3. Debounce input (300-500ms after the user stops typing) before firing the request, and consider client-side caching of recent results within a session.

```typescript
const debouncedSearch = useMemo(
  () => debounce((query: string) => placesApi.autocomplete(query), 400),
  []
);
```

- **Reverse geocoding** (coordinates → address) should be cached against the same coordinates within a reasonable radius/time window, rather than re-requested every time a screen using the same location renders.
- **Set usage alerts/budget caps** on your provider's billing console from day one — this is the cheapest possible protection against a bug (e.g. an accidental loop) turning into an unexpectedly large bill.

---

## Decision 5 — Battery & Performance

- **Use the lowest accuracy level that satisfies the feature.** `Balanced` accuracy is sufficient for "show nearby results"; reserve `High`/`BestForNavigation` for features that genuinely need it (turn-by-turn navigation) — higher accuracy modes consume meaningfully more battery.
- **Stop location updates when the screen using them unmounts** — a location watcher left running after the user navigates away is a common, easy-to-miss battery drain.
- **For continuous tracking features**, throttle update frequency to what the feature actually needs (e.g. every 10-30 seconds for delivery tracking, not a continuous stream) rather than the platform's maximum update rate.

---

## Privacy & Data Handling

- **Don't store raw location history longer than the feature requires it.** If a feature only needs current location for a single search, don't silently log/persist coordinate history server-side without a stated purpose and corresponding privacy policy disclosure (Phase 5).
- **Location data shared with third parties (the map/geocoding provider) should be disclosed** in your app's privacy policy and, on iOS, in your App Store privacy nutrition label — this is checked during App Store review.

---

## AI Prompts

### Prompt 1 — Location Feature Implementation

```
Implement a location-based feature for a production [React Native] app:
[describe the feature, e.g. "find stores within 10 miles"]

Use [react-native-maps with native providers / Mapbox].
Permission level needed: [one-time/while-using vs background — justify which]
Accuracy needed: [precise vs approximate]

Implement: contextual permission request (not on launch) with a manual-entry
fallback for denied permission, debounced address/places search if applicable,
and a location watcher that's explicitly cleaned up on screen unmount.
```

### Prompt 2 — Cost & Battery Review

```
Review this location/maps implementation for cost and battery issues:

[paste your location code]

Check for: geocoding/places API calls fired without debouncing, location
accuracy set higher than the feature requires, location watchers not
cleaned up on unmount, and background location requested without a clear
feature justification for it.
```

---

## Validating AI Output

- [ ] Permission level requested (foreground/background, precise/approximate) matches what the specific feature actually needs — not the most permissive default
- [ ] Permission is requested contextually, with a working fallback if denied, not assumed mandatory
- [ ] Address/places autocomplete is debounced before firing API calls
- [ ] Reverse geocoding results are cached rather than re-requested for the same coordinates
- [ ] Location accuracy level matches the feature's actual precision need
- [ ] Location watchers are stopped when the consuming screen unmounts
- [ ] Background location (if used) has a clear, user-visible justification, not silent collection

---

## What's Next

- **Media Uploads** (next in this phase) is unrelated technically but shares the same permission-request-contextually discipline established here.
- **App Permissions Strategy** consolidates this and other permission flows (camera, notifications, biometrics) into one consistent in-app pattern.
- **Privacy Policy** (Phase 5) must accurately disclose this location data collection and any third-party sharing with your map/geocoding provider.
