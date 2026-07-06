---
title: App Permissions Strategy
slug: app-permissions-strategy
phase: Phase 3
mode: hackathon
projectType: mobile-app
estimatedTime: 15–20 min
---

# App Permissions Strategy

Permissions are not a technical detail.

They are a trust conversation between your app and the user.

Ask for the wrong permission at the wrong moment and judges decline. Once declined, the feature you built that depended on it is dead for the rest of the demo — and re-prompting requires going into device Settings.

One bad permission moment can break a demo flow you spent hours building.

---

## The Core Rule

> Request permissions at the moment they are needed, not before.

An app that asks for camera, location, and microphone access on the first launch looks surveillance-ware. An app that asks for camera access when the user taps the camera button feels natural.

Timing is everything.

---

## The Three Permission Moments

| Moment | What It Means | Example |
|---|---|---|
| **Just-in-time** | Ask when the feature is first used | Camera permission when user taps "Take Photo" |
| **Context-first** | Explain before asking | Show a screen explaining why location improves the experience, then ask |
| **Proactive** | Ask early when delay would be disruptive | Notifications — better to ask during onboarding than mid-session |

Use just-in-time for most features. Use context-first for sensitive permissions (location always-on, contacts, microphone). Use proactive only for notifications.

---

## Permission Tiers by Sensitivity

Not all permissions carry equal weight. Know which ones users distrust.

**Low friction — users accept readily:**
- Camera (when the use is obvious)
- Photos / media library
- Haptics (no permission needed)

**Medium friction — needs brief context:**
- Microphone
- Notifications
- Location (while using app)

**High friction — needs strong justification:**
- Location (always-on / background)
- Contacts
- Bluetooth
- Health data

> For a hackathon: never request high-friction permissions unless your app's core mechanic genuinely requires them. The permission dialog alone can kill a demo.

---

## The Context-First Pattern

For any medium or high-friction permission, show a pre-permission screen before the system dialog.

```
┌─────────────────────────────┐
│                             │
│        [Feature Icon]       │
│                             │
│   Allow Location Access     │
│                             │
│  We use your location to    │
│  show nearby [things]       │
│  within walking distance.   │
│                             │
│  ┌─────────────────────┐   │
│  │    Enable Location   │   │
│  └─────────────────────┘   │
│                             │
│      Not right now          │
│                             │
└─────────────────────────────┘
```

This screen is yours. You control it. If the user taps "Not right now," you don't burn the system prompt — you can ask again later.

The system dialog only appears when they tap "Enable." At that point they are primed to accept.

```
Copy Prompt ↓
```

> Generate a React Native / Flutter PermissionPrompt component that:
- Accepts: icon (string), title, description, primaryLabel, onPrimary, onDismiss
- Renders a centered card with icon, title, description, a primary CTA button, and a dismiss text link
- Is used before triggering any native permission request
- Matches this design system: [paste your theme constants]
>
> Keep it under 50 lines. No third-party libraries.

---

## Handling Denied Permissions

When a user denies a permission, the system will not show the dialog again.

Your app must handle this gracefully — every time.

**The denied state pattern:**

```
┌─────────────────────────────┐
│                             │
│        [Lock Icon]          │
│                             │
│   Camera Access Needed      │
│                             │
│  To use this feature,       │
│  enable Camera in your      │
│  device Settings.           │
│                             │
│  ┌─────────────────────┐   │
│  │    Open Settings     │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

The "Open Settings" button deep-links directly to your app's settings page:

**React Native:**
```js
import { Linking } from 'react-native';
Linking.openSettings();
```

**Flutter:**
```dart
import 'package:permission_handler/permission_handler.dart';
openAppSettings();
```

> Never show a blank screen when a permission is denied. It looks like a crash.

---

## Permission Configuration by Platform

### iOS — app.json (Expo)

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "Used to capture photos for your profile and posts.",
        "NSLocationWhenInUseUsageDescription": "Used to show nearby content in your area.",
        "NSMicrophoneUsageDescription": "Used for voice input and recording.",
        "NSPhotoLibraryUsageDescription": "Used to select photos from your library."
      }
    }
  }
}
```

>  Every permission your app requests must have a corresponding usage string in iOS. Missing strings cause App Store rejection — and silent crashes during TestFlight or ad-hoc distribution. Add all of them now, even if you're not submitting.

### Android — AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
```

With Expo, many of these are added automatically by plugins. Verify in the generated `android/` folder after running `expo prebuild`.

---

## Reusable Permission Hook

Centralise all permission logic in one place. Never scatter permission checks across screens.

```
Copy Prompt ↓
```

> Create a usePermission hook for React Native using expo-permissions that:
- Accepts a permission type: 'camera' | 'location' | 'microphone' | 'notifications' | 'mediaLibrary'
- Returns: { status, request, openSettings }
- status: 'undetermined' | 'granted' | 'denied'
- request(): triggers the system permission dialog
- openSettings(): opens the app's system settings page
- Checks current status on mount without triggering the dialog
>
> Keep it under 40 lines.

---

## Permissions and the Demo Flow

Map every permission your app needs against your demo flow:

| Feature Used in Demo | Permission Required | Platform | Pre-granted? |
|---|---|---|---|
| e.g. Camera | Camera | iOS + Android | Must trigger in flow |
| e.g. Location | Location When In Use | iOS + Android | Consider pre-granting |
| e.g. Notifications | Notifications | iOS only (Android 13+) | Grant during onboarding |

>  For the live demo: walk through your app on the demo device the night before and grant every permission manually. Arrive with permissions already accepted. The system dialogs should never appear during the actual pitch.

---

## Implementation Checklist

- [ ] Every permission requested just-in-time, not on launch
- [ ] Context-first screen built for location and microphone
- [ ] Denied state implemented for every permission-gated feature
- [ ] "Open Settings" CTA works on both iOS and Android
- [ ] iOS usage description strings added to app.json / Info.plist
- [ ] Android permission declarations in AndroidManifest.xml
- [ ] Reusable permission hook / service centralises all permission logic
- [ ] All permissions pre-granted on demo device before presentation
- [ ] Tested permission denied flow on physical device

---

## What Breaks Demos

| Mistake | Consequence |
|---|---|
| System permission dialog appears during pitch | Interrupts flow; judges may decline |
| No denied state | App shows blank or crashes when permission refused |
| Missing iOS usage strings | Silent crash on physical device |
| Requesting permissions on launch | Users decline before understanding why |
| No "Open Settings" button | Once denied, feature is permanently broken for the demo |

---

## Next Step

Permissions strategy is done when every feature has a graceful request flow, a graceful denied state, and all permissions are pre-granted on your demo device.

Move to **Demo Data** next.
