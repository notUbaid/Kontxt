---
title: App Permissions Strategy
slug: app-permissions-strategy
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 15-25 min
---

# App Permissions Strategy

You've now implemented several individual permission-gated features — push notifications, location, camera/media access. This module is where those become one consistent system instead of five different ad hoc permission-handling patterns scattered across your codebase.

---

## Why This Needs to Be Centralized, Not Per-Feature

> ️ Each previous module told you to request permission contextually, with a fallback for denial. If that logic is reimplemented separately for notifications, location, and camera, you get three slightly different patterns, three different denied-state UX treatments, and three places to fix the same bug. Centralize the pattern once; let individual features call into it.

---

## Decision 1 — One Permission Handling Hook/Module

```typescript
type PermissionType = 'camera' | 'mediaLibrary' | 'location' | 'notifications';

async function requestPermission(type: PermissionType): Promise<PermissionResult> {
  const status = await checkCurrentStatus(type);

  if (status === 'granted') return { granted: true };
  if (status === 'denied-permanently') return { granted: false, canAskAgain: false };

  const result = await promptForPermission(type);
  trackPermissionEvent(type, result); // feeds your Analytics Strategy

  return result;
}
```

Every feature module (Push Notifications, Maps & Location, Media Uploads) should call through this single function rather than each implementing its own platform permission API calls directly.

---

## Decision 2 — The Three States You Must Design For

| State | What It Means | What To Show |
|---|---|---|
| **Not yet asked** | First time the feature is used | Contextual prompt, tied to the action that needs it |
| **Denied, can ask again** | User said no, but the OS will still show a prompt if asked | A clear explanation of value before re-prompting — don't just re-prompt blindly with no added context |
| **Denied permanently** (iOS especially) | OS will no longer show the system prompt | Direct the user to Settings explicitly — re-calling the request API silently does nothing |

> ️ **The most common permissions bug:** treating "denied" as one state and calling the same request function regardless. On iOS, once a user denies, calling the permission request API again does nothing — no prompt appears, and your code will silently behave as if denied with no path forward unless you explicitly detect this state and route to Settings.

```typescript
if (!result.granted && !result.canAskAgain) {
  showSettingsPrompt({
    title: 'Camera access needed',
    message: 'Enable camera access in Settings to add photos.',
    action: () => Linking.openSettings(),
  });
}
```

---

## Decision 3 — Pre-Permission Context Screens

For permissions with real friction (location, notifications, especially background variants), consider a brief in-app explanation **before** the OS system prompt appears — not instead of contextual timing, but as a layer in front of it.

>  This "soft ask" pattern — your own UI explaining the value, with a button that then triggers the real OS prompt — gives you a chance to recover from a "no" without burning the OS-level prompt (which, on iOS, you may not get to show again). If the user dismisses your soft-ask screen, you haven't touched the real permission state at all and can re-explain later without penalty.

Don't overuse this — for low-friction permissions (camera access right when tapping "take photo"), a soft-ask screen is unnecessary ceremony. Reserve it for the higher-friction asks (background location, notifications) where the value isn't self-evident from the action alone.

---

## Decision 4 — Graceful Degradation Is Mandatory, Not Optional

For every permission-gated feature, the previous modules each specified a fallback. Confirm none of them were skipped:

| Feature | Fallback If Denied |
|---|---|
| Push notifications | App fully functional without them; in-app notification center as alternative if relevant |
| Location | Manual location entry |
| Camera/media | Manual file selection from library only, or vice versa |
| Biometrics | Fall back to password/PIN auth |

> ️ A feature that becomes completely unusable on permission denial, with no fallback, is a common source of one-star reviews citing "app is broken" — when the actual cause is a missing fallback path, not a real bug. Treat every permission denial as a designed-for product state, not an edge case to handle later.

---

## Decision 5 — Permission Timing Audit

Before moving on, audit every permission request in your app against this rule: **is this request triggered by a specific user action that makes the value obvious, or is it triggered by a screen/app loading?**

>  Run this as an explicit checklist pass across your codebase before Phase 4 — it's cheap to fix now, while you can search for every `request*Permission` call site, and expensive to fix later once permission-denial rates are already baked into your install base's behavior.

---

## AI Prompts

### Prompt 1 — Centralized Permission System

```
Build a centralized permission handling module for a production
[React Native] app covering: camera, media library, location,
and push notifications.

Implement: a single requestPermission(type) function used by all
features, explicit handling of the three permission states (not asked /
denied-can-ask-again / denied-permanently with Settings redirect), and
an optional pre-permission "soft ask" screen component reusable across
the higher-friction permissions (location, notifications).
```

### Prompt 2 — Permission Timing Audit

```
Audit this codebase for permission request timing:

[paste relevant screen/init code, or describe where permissions are
currently requested]

Identify every permission request triggered by app/screen load rather
than a specific user action, and every feature that has no fallback
behavior if its permission is denied.
```

---

## Validating AI Output

- [ ] All permission requests route through one centralized function, not separate per-feature implementations
- [ ] Permanently-denied state is explicitly detected and routes to Settings, not silently re-calling the request API
- [ ] No permission is requested on app launch or screen load without a tied user action
- [ ] Every permission-gated feature has a working fallback if denied
- [ ] Permission outcomes are tracked via analytics for visibility into denial rates

---

## What's Next

- **App Settings** (next in this phase) is where users manage these permissions explicitly from within your app, complementing OS-level settings.
- **Privacy Policy** (Phase 5) must accurately disclose every permission requested and why.
- **Content Rating** (Phase 5) and store review both check permission usage against stated purpose — consistent, well-justified permission requests reduce review friction.
