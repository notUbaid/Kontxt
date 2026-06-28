---
title: App Permissions Strategy
slug: app-permissions-strategy
phase: Phase 3
mode: personal
projectType: mobile-app
estimatedTime: 15–25 min
---

# App Permissions Strategy

How and when you ask for device permissions (camera, location, notifications) affects both whether users grant them and whether your app passes App Store/Play Store review. Get this wrong and you'll see lower grant rates, confused users, or an outright rejection.

---

## Decision 1: Request Only What You Actually Use

> [!WARNING]
> **Both Apple and Google can reject an app for requesting a permission it doesn't clearly use**, or for vague justification of why it's needed. List every permission your app actually requires for a real feature — if you can't name the specific feature that needs it, remove the permission request.

---

## Decision 2: Ask Just-in-Time, Not All at Launch

> **Decision Card**
> Request each permission **at the moment the relevant feature is used**, not all upfront when the app first opens. A user is far more likely to grant camera access when they've just tapped "take a photo" than when it's one of five permission prompts fired at them before they've seen anything the app does.

> [!WARNING]
> Requesting every permission at launch is a well-documented way to inflate denial rates — users deny prompts they don't yet understand the context for, and a denial is often "sticky" (the user has to go find your app in OS settings to change their mind later, which most won't bother doing).

---

## Decision 3: Explain Before You Ask (Priming)

>  **Best Practice**
> Show a brief, app-controlled explanation **before** triggering the OS-level permission prompt — e.g., "We use your camera to scan receipts" with a "Continue" button that then triggers the actual system dialog. This context meaningfully increases grant rates compared to triggering the system prompt with no explanation, since the system prompt's wording is generic and the user doesn't yet know why your specific app wants it.

---

## Decision 4: Handle Denial Gracefully

- [ ] If a non-critical permission is denied, the rest of the app should keep working — disable or hide only the specific feature that needed it
- [ ] If a feature genuinely can't work without a permission, show a clear explanation and a way to open the device's Settings app to grant it later, rather than a dead-end error
- [ ] Never repeatedly nag the user with the same prompt — respect a denial, and offer a deliberate, less intrusive way to reconsider later (e.g., a settings screen toggle that re-explains and re-requests, rather than popping the prompt unprompted)

---

## Decision 5: Platform-Specific Requirements

| Platform | Requirement |
|---|---|
| iOS | Every permission needs a usage description string in your app config (`Info.plist` equivalent in Expo's `app.json`/`app.config.js`) — a specific, clear sentence explaining why your app needs it. Vague descriptions ("This app needs your location") are a common review rejection reason; be specific ("Used to show nearby [thing] in search results"). |
| Android | Runtime permissions are requested at the point of use by default — Android's model already nudges toward just-in-time requests, but you still control the priming screen before triggering the system dialog |

---

## Decision 6: Common Permission Types and Their Justification Bar

| Permission | What you need to justify |
|---|---|
| Camera/Photo Library | A specific, visible feature using it (photo upload, scanning) |
| Location | What it's used for, and whether you need it only while using the app (most common) vs. always (a much higher bar, both for users and review) |
| Notifications | Covered in depth in Push Notifications — but the same just-in-time, explained-first principle applies |
| Contacts | A genuinely necessary feature (e.g., "invite a friend") — this is a sensitive permission with a high user hesitation rate; only request if essential |

---

## Common Mistakes (Including AI's)

- **Requests permissions at app launch** instead of at the point of use — always implement just-in-time requesting.
- **Generates vague usage description strings** ("This app uses your location") — push for a specific, feature-tied sentence instead.
- **Doesn't handle denial gracefully** — the app breaks or shows a confusing error instead of disabling just the affected feature.
- **Requests "Always" location access when "While Using the App" would suffice** — this is a meaningfully higher bar for both user trust and store review; only request the broader permission if the feature genuinely requires it (e.g., geofencing while the app is closed).
- **Includes a permission in the app config that no feature actually uses** — a leftover from a removed feature or copy-pasted boilerplate; review the full list before submission.

---

## AI Prompt: Implement a Permission Request Flow

```
Implement a permission request flow for [permission type, e.g., camera] in a personal mobile app using [React Native/Expo].

Requirements:
- Trigger the request only when the user taps the specific feature that needs it (e.g., "Scan Receipt"), not at app launch
- Show a brief priming screen explaining why the app needs this permission, with a "Continue" button, before triggering the OS system prompt
- If denied: keep the rest of the app fully functional, and show a clear message for just this feature with a way to open device Settings to grant it later — don't show a generic error or repeatedly re-prompt
- Write a specific iOS usage description string for app.json describing exactly what this permission is used for in my app: [describe the actual feature]

List every permission my app currently requests so I can confirm each one maps to an actual feature still in the app.
```

---

## Validate Before You Move On

- [ ] Every requested permission maps to a specific, real feature in the app — no leftover or unused permission requests
- [ ] Permissions are requested at the point of use, not all at launch
- [ ] A priming explanation appears before the OS system prompt for any non-obvious permission
- [ ] Denial is handled gracefully — only the relevant feature is affected, with a path to reconsider via Settings
- [ ] iOS usage description strings are specific and feature-tied, not generic boilerplate
- [ ] You've tested the denial path, not just the "grant" path

> [!TIP]
> Before submitting to either app store, review your full permissions list in your app config against your actual feature list one more time — an unused permission is one of the easiest, most avoidable causes of a review rejection.

---

**Next:** Push Notifications — implement notifications using the permission pattern from this module.
