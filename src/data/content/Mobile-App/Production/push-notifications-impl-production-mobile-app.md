---
title: Push Notifications Impl
slug: push-notifications-impl
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 25-30 min
---

# Push Notifications Implementation

The Push Notifications module (Phase 2) decided your delivery layer, token schema, payload strategy, and send infrastructure. This module turns those decisions into working code: client-side registration, the backend worker that actually sends, and the handler that connects a notification tap to your navigation system.

If you haven't read the Phase 2 module, stop and do that first — this module assumes those decisions are already made and won't re-litigate them.

---

## Client-Side: Registration Flow

```typescript
async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    // respect the decision — see App Permissions Strategy module
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data; // or FCM directly
  await api.registerDeviceToken({ token, deviceId, platform: Platform.OS });
  return token;
}
```

> ⚠️ **Don't request notification permission on app launch.** This is one of the most common avoidable causes of permanently-denied notification access — a permission prompt before the user understands why they'd want it gets reflexively denied, and on iOS, a denial requires the user to manually re-enable it in Settings (you can't re-prompt). Request permission at the moment its value is obvious — after the user completes the action it relates to (e.g. right after they place an order, ask for shipping-update notifications), not during onboarding.

**Token refresh listener** — required, not optional, given the token rotation behavior decided in Phase 2:

```typescript
Notifications.addPushTokenListener(async (token) => {
  await api.registerDeviceToken({ token: token.data, deviceId, platform: Platform.OS });
});
```

This upserts (keyed on `deviceId`, per the Phase 2 schema decision) rather than creating a duplicate row on every refresh.

---

## Client-Side: Foreground Notification Handling

Decide what happens when a notification arrives while the app is already open — the OS won't auto-display it the way it does in background/killed states.

```typescript
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // or false, show your own in-app banner instead
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});
```

> 💡 Per the App Lifecycle module's decision: foreground notifications generally shouldn't force-navigate the user away from what they're doing. Use this handler to show an in-app toast/banner instead of (or in addition to) the system alert, and let the user choose to act on it.

---

## Client-Side: Tap Handling → Deep Link

This is the integration point with your Deep Linking and Navigation modules — the payload shape decided back in Phase 2 gets consumed here.

```typescript
Notifications.addNotificationResponseReceivedListener((response) => {
  const data = response.notification.request.content.data;
  const { route, params } = resolveDeepLink(data); // from your Deep Linking module
  navigationRef.navigate(route, params);            // respects cold/warm-start handling
});
```

> ⚠️ Test this specifically in the killed-app state, not just while developing with the app already running. The cold-start pending-link holding pattern from the Deep Linking module is exactly what this path depends on — it's the scenario most likely to be skipped in casual testing and most likely to be how real users actually encounter your notifications.

---

## Backend: Send Worker

Implements the queue-based architecture decided in Phase 2 — never inline in a request handler.

```typescript
// worker, triggered by a queue message
async function sendPushNotification(job: PushJob) {
  const tokens = await db.deviceToken.findMany({ where: { userId: job.userId } });
  if (tokens.length === 0) return;

  const messages = tokens.map(t => ({
    to: t.token,
    title: job.title,
    body: job.body,
    data: job.data,
  }));

  const response = await sendBatch(messages); // batched, per Phase 2 Decision 5

  for (const result of response) {
    if (result.error === 'DeviceNotRegistered') {
      await db.deviceToken.delete({ where: { token: result.token } });
    }
  }
}
```

> 💡 The `DeviceNotRegistered`-style error handling here is the practical implementation of the token cleanup decision from Phase 2 — react to it immediately rather than letting dead tokens accumulate. A token table that's never pruned slowly inflates your send costs and skews delivery-rate metrics.

---

## Backend: Idempotency

> ⚠️ Queue-based systems can occasionally deliver a job more than once (depends on your queue's guarantees). Make the send operation idempotent — include a unique job/notification ID and check it hasn't already been processed before sending, or you risk double-notifying users on retry, which reads as a bug even when the underlying cause is infrastructure-level, not application-level.

---

## Badge Count Management

Often skipped, frequently noticed when wrong:

- Decide what the badge count represents (unread notifications? unread messages? something else) and keep exactly one source of truth for it.
- Update it both when notifications arrive **and** when the user reads/dismisses the underlying content in-app — a badge count that only increments and never decrements via in-app actions is a common, visible bug.
- Reset it explicitly on logout.

```typescript
await Notifications.setBadgeCountAsync(unreadCount);
```

---

## AI Prompts

### Prompt 1 — Full Implementation

```
Implement push notifications end-to-end for a production [React Native] app
using [Expo Notifications / FCM direct].

Reference the architecture decided in Phase 2: [paste your token schema,
payload strategy, and targeting decisions from that module]

Implement: client registration with permission requested contextually (not
on launch), the token refresh listener (upsert keyed on deviceId), foreground
notification handling that shows an in-app banner instead of force-navigating,
the tap handler wired to resolveDeepLink and navigation, the backend send
worker with batching and DeviceNotRegistered cleanup, and idempotent job
processing.
```

### Prompt 2 — Implementation Review

```
Review this push notification implementation:

[paste your client + worker code]

Check for: permission requested on app launch instead of contextually,
missing token refresh listener, foreground notifications force-navigating
instead of showing an in-app prompt, missing DeviceNotRegistered/invalid
token cleanup, non-batched sends in a loop, and missing idempotency
protection on the send worker.
```

---

## Validating AI Output

- [ ] Permission is requested contextually, tied to a specific action, not on app launch
- [ ] Token refresh listener is implemented and upserts by `deviceId`, not appending duplicates
- [ ] Foreground notifications show an in-app banner rather than force-navigating away from the current screen
- [ ] Tap handling is tested against the killed-app cold-start path, not just the already-running case
- [ ] Backend sends are batched, not looped one-token-at-a-time
- [ ] Invalid/unregistered tokens are deleted on send failure, not silently retried forever
- [ ] Send jobs are idempotent against duplicate queue delivery
- [ ] Badge count has one source of truth and resets on logout

---

## What's Next

- **Payments** (next in this phase) is unrelated to push directly, but shares the idempotency discipline established in this module — worth carrying that pattern forward.
- **App Settings** should expose a way for users to manage notification preferences in-app, not just through OS settings.
- **Notification Strategy** (Phase 6) builds on this implementation for lifecycle/re-engagement campaigns, once the foundational send infrastructure here is proven reliable.
