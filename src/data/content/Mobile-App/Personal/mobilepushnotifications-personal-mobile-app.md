---
title: Push Notifications
slug: push-notifications
phase: Phase 3
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Push Notifications

Push notifications always involve a server — there's no client-only way to send one, which means this module connects directly to the "needs a server function" decision from Backend. The other big piece is permission handling, which has gotten stricter on both platforms in recent years.

---

## Decision 1: Service Choice

| Option | Best for |
|---|---|
| Expo Push Notifications | Simplest option if you're already using Expo — handles iOS/Android differences for you |
| Firebase Cloud Messaging (FCM) directly | More control, useful if you're already using Firebase for other things |
| OneSignal | Third-party service with a friendly dashboard, good if you want notification analytics/segmentation without building it yourself |

> [!TIP]
> For a personal project already using Expo, **Expo's push notification service** is the simplest starting point — it abstracts away most of the iOS/Android-specific setup that direct FCM integration requires.

---

## Decision 2: Requesting Permission

This follows directly from App Permissions Strategy: explain why before asking, request at a relevant moment (not at app launch), and handle denial gracefully.

> [!WARNING]
> **Android 13 (API level 33) and above requires an explicit runtime permission request for notifications**, the same as iOS — this is a relatively recent change from older Android versions, which granted notification permission automatically. Don't assume Android notifications "just work" without a permission request; verify your implementation actually requests it on modern Android versions.

---

## Decision 3: Push Token Management

- [ ] On permission grant, register the device's push token with your push service (Expo/FCM) and store it associated with the user in your database
- [ ] Handle token refresh — tokens can change (app reinstall, OS-level resets), and a stale token means notifications silently stop arriving with no obvious error on your end
- [ ] Remove or mark invalid any token that the push service reports as no longer valid (e.g., after repeated failed delivery attempts), so you're not accumulating dead tokens indefinitely

---

## Decision 4: Sending Notifications — Always Server-Side

> [!WARNING]
> Sending a push notification requires your push service's server-side credentials — there's no legitimate client-side path for this, and there shouldn't be (it would let any client send arbitrary notifications to any device). Trigger sends from a server function (the same Edge Function/Cloud Function pattern from Backend), in response to a server-side event — never anything initiated directly by the client app pretending to "send itself" a notification.

---

## Decision 5: Notification Content & Deep Linking

- [ ] Include structured data in the notification payload (not just display text) so tapping it can navigate to the right screen — reuse the deep linking setup from App Navigation
- [ ] Test both cold-start (app not running, opened via notification tap) and warm-start (app backgrounded, opened via tap) paths, same consideration as App Lifecycle's deep linking section

---

## Decision 6: Respect Preferences, Avoid Fatigue

- [ ] Let users control notification categories in-app (e.g., "reminders" on, "social activity" off) rather than an all-or-nothing OS toggle being their only option
- [ ] Be deliberate about which events actually trigger a push — same principle as the SaaS Notifications module: over-notifying trains users to ignore (or disable) notifications entirely

---

## Decision 7: Testing Reality

> [!TIP]
> Push notifications generally require a **real physical device** to test reliably — simulators have historically had limited or no support for remote push notifications, particularly on iOS. Don't be surprised if your simulator testing doesn't reflect real notification delivery; budget time to test on an actual device before considering this feature done.

---

## Common Mistakes (Including AI's)

- **Attempts to send a notification from client-side code** — this isn't a security shortcut, it's not actually possible to do safely or correctly; always route through a server function.
- **Doesn't handle Android 13+'s explicit permission requirement** — verify this is actually requested, not assumed to be automatically granted.
- **No token refresh handling** — notifications silently stop working for a user with no error surfaced anywhere.
- **Over-notifies by default** — ask explicitly which events genuinely warrant a push versus an in-app-only notification.
- **Tests only on a simulator** and assumes it reflects real device behavior — flag this gap explicitly.

---

## AI Prompt: Implement Push Notifications

```
Implement push notifications for a personal mobile app using [Expo Push Notifications / FCM / OneSignal] with [your BaaS] as the backend.

Requirements:
- Request notification permission at a relevant point in the app (not at launch), following the priming pattern from App Permissions Strategy — and confirm this requests the explicit runtime permission on Android 13+, not just iOS
- On permission grant, register and store the device push token associated with the user, and handle token refresh
- Implement sending via a server function (never client-side) triggered by [describe the server-side event, e.g., "a reminder time is reached" or "another user comments"]
- Include structured data in the payload so tapping the notification deep links to [target screen] — handle both cold-start and warm-start cases
- Add an in-app settings screen letting users toggle notification categories: [list your categories]

Flag anywhere this implementation assumes the client can send a notification directly, or assumes Android grants notification permission automatically.
```

---

## Validate Before You Move On

- [ ] Notification permission is requested just-in-time, with a priming explanation, and explicitly handles Android 13+'s runtime permission
- [ ] Push tokens are stored per-user and refreshed/invalidated correctly over time
- [ ] All sends are triggered server-side, never from client code
- [ ] Tapping a notification deep links correctly on both cold start and warm start
- [ ] Users can control notification categories, not just an all-or-nothing toggle
- [ ] You've tested actual delivery on a real physical device, not just a simulator

> [!TIP]
> Send yourself a real test notification from a server function (not just a local/test notification) before considering this feature complete — it's the only way to verify the full server-to-device path actually works end to end.

---

**Next:** Testing — verify this app actually works the way you've designed it to.
