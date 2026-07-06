---
title: Native Device Features
slug: native-device-features
phase: Phase 3
mode: hackathon
projectType: mobile-app
estimatedTime: 20–30 min
---

# Native Device Features

This is your differentiator.

Web apps cannot do this. PWAs fake it. Native device features are the reason you built a mobile app instead of a website — and judges know it.

One well-integrated native feature, used purposefully, signals that your team understands mobile development. It also makes your demo significantly more memorable.

---

## The Principle: One Feature, Done Well

Do not try to integrate five native features in 48 hours.

Pick one that is core to your app's value. Integrate it deeply. Make it feel native — not bolted on.

A camera integration where photos actually appear in the flow beats four half-working sensor integrations every time.

---

## The Native Feature Menu

| Feature | Use Case | React Native | Flutter | Wow Factor |
|---|---|---|---|---|
| **Camera** | Photos, QR scan, AR | `expo-camera` | `camera_awesome` | High |
| **Location** | Maps, proximity, check-in | `expo-location` | `geolocator` | High |
| **Push Notifications** | Alerts, reminders | `expo-notifications` | `firebase_messaging` | Medium |
| **Biometrics** | FaceID / fingerprint login | `expo-local-authentication` | `local_auth` | High |
| **Accelerometer / Gyro** | Motion, shake, tilt | `expo-sensors` | `sensors_plus` | Medium |
| **Haptics** | Touch feedback | `expo-haptics` | `HapticFeedback` | Medium |
| **File System** | Save, share, export | `expo-file-system` | `path_provider` | Low |
| **Share Sheet** | Export, social sharing | `expo-sharing` | `share_plus` | Medium |
| **Barcode / QR** | Scan codes | `expo-barcode-scanner` | `mobile_scanner` | High |
| **Speech** | Voice input, TTS | `expo-speech` | `speech_to_text` | High |

> **Highest ROI for demos:** Camera, Location, Biometrics, Speech. These are immediately visible and feel unmistakably native.

---

## Choosing the Right Feature

Ask these questions:

**1. Is it core to the app's value?**
A food app using the camera to photograph meals: core. A todo app using the gyroscope: gimmick. Core features justify the complexity. Gimmicks waste your time.

**2. Can you demo it reliably?**
Location requires GPS signal. Camera requires good lighting. Push notifications require a real device. Factor this into your demo environment.

**3. Does it work on the demo device?**
Test on the actual phone you will present from. Simulator behaviour differs from real devices for camera, location, haptics, and biometrics.

---

## Camera

The most impressive native feature for most app types.

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app. Add a camera screen that:
- Opens the device camera with a full-screen preview
- Has a capture button with a circle tap animation
- On capture: shows a preview of the photo with Retake / Use Photo options
- On Use Photo: [describe what happens — uploads to Firebase Storage / passes to AI / saves locally]
- Handles camera permissions with a graceful denied state
- Works on both iOS and Android
>
> Use expo-camera / camera_awesome. Keep it clean and under 100 lines.

**Permission handling matters.** A camera screen that crashes on permission denial looks unfinished. Always show a clear "Enable Camera Access" state with a button that opens Settings.

---

## Location

Powerful for apps involving places, proximity, or maps.

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app. Add location functionality that:
- Requests foreground location permission on first use
- Gets the user's current coordinates
- Reverse geocodes to a human-readable city/neighbourhood name
- Shows a graceful denied state if permission is refused
- [Optional: displays a map with the user's location and nearby [items]]
>
> Use expo-location + react-native-maps / geolocator + google_maps_flutter. Keep location fetching in a custom hook / service class.

>  Location on iOS requires a usage description string in `Info.plist`. Expo handles this via `app.json`. Flutter requires it in `Info.plist` manually. Missing this causes a silent crash on iOS.

---

## Biometrics

The single highest-impact, lowest-effort native feature.

FaceID or fingerprint authentication on a lock screen, a secure note, or a payment confirmation makes your app feel like a real product.

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app. Add biometric authentication that:
- Checks if biometrics are available on the device
- Prompts FaceID / fingerprint when the user accesses [a protected screen / a secure action]
- Falls back gracefully if biometrics are unavailable or declined
- Shows the result (authenticated / failed) in the UI
>
> Use expo-local-authentication / local_auth. Keep it under 40 lines as a reusable hook / service.

---

## Push Notifications

Best for apps with time-sensitive content: reminders, social activity, alerts.

For a hackathon demo, send yourself a test notification live during the presentation. Seeing a notification arrive on the demo device mid-pitch is a reliable wow moment.

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app using Firebase. Set up push notifications with:
- expo-notifications / firebase_messaging SDK configured
- Permission request on app start with graceful denied handling
- FCM token retrieved and saved to Firestore /users/{uid}.fcmToken
- Foreground notification handler that shows an in-app banner
- Background notification handler that navigates to the right screen on tap
>
> Keep it modular. Include a test function that sends a notification to the current device via the Firebase REST API.

---

## Speech / Voice Input

Underused and highly impressive for AI-powered apps.

If your app involves any text input — notes, search, prompts — replacing the keyboard with a voice button immediately elevates the experience.

```
Copy Prompt ↓
```

> I'm building a React Native / Flutter hackathon app. Add a voice input button that:
- Starts speech recognition on tap (hold or toggle)
- Shows a live waveform or pulsing animation while listening
- Stops on second tap or silence detection
- Populates a text field with the transcribed text
- Handles microphone permission denial gracefully
>
> Use expo-speech + @react-native-voice/voice / speech_to_text. Keep the component under 60 lines.

---

## Permission Strategy

Every native feature requires a permission. Handle them all the same way.

**The pattern:**

1. Request permission at the moment it's needed (not on app launch)
2. Explain why before requesting — a one-line context message increases acceptance
3. If denied: show a clear UI state with an "Open Settings" button
4. Never request permissions the app doesn't use

```
Copy Prompt ↓
```

> Generate a reusable permission handler for React Native / Flutter that:
- Accepts a permission type (camera / location / microphone / notifications)
- Checks current status before requesting
- If denied: shows an in-app modal explaining why the permission is needed with an "Open Settings" CTA
- Returns a boolean: granted or not
>
> Use expo-permissions / permission_handler. Keep it under 50 lines.

---

## Validate Before Demo Day

Native features are the most likely things to break on a different device or environment.

| Check | Why |
|---|---|
| Test on physical device, not simulator | Camera, haptics, biometrics, and location behave differently |
| Test permission denied flow | Judges may decline permissions |
| Test with poor/no network | Location and push notifications degrade |
| Test on the specific phone you'll demo from | Per-device quirks exist |
| Check iOS permission strings in app.json / Info.plist | Missing strings cause silent crashes on iOS |
| Verify Android permissions in AndroidManifest.xml | Missing declarations cause crashes on Android |

---

## Implementation Checklist

- [ ] One core native feature chosen and justified
- [ ] Feature integrated and working on physical device
- [ ] Permission request flow works correctly (request → granted → denied states)
- [ ] Denied state shows helpful UI, not a blank screen
- [ ] Feature is part of the demo flow, not a hidden extra
- [ ] iOS permission usage strings configured
- [ ] Android manifest permissions declared
- [ ] Tested on the actual demo device

---

## What Breaks Demos

| Mistake | Consequence |
|---|---|
| Testing only on simulator | Feature works in dev, crashes on demo device |
| No permission denied state | App freezes or shows blank screen |
| Feature not connected to app flow | Feels like a demo within a demo |
| Requesting permissions on app launch | iOS users reject them before understanding why |
| Multiple half-working features | Looks scattered; one polished feature wins |

---

## Next Step

Native device features are done when your chosen feature works end-to-end on a physical device and is woven into your demo flow.

Move to **App Permissions Strategy** next.
