---
title: Push Notifications
slug: push-notifications
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 25-35 min
---

# Push Notifications

This module is about **architecture**, not code. You'll write the actual sending logic in Phase 3 (*Push Notifications Impl*). Right now you're deciding the shape of the system: who delivers the message, how tokens are tracked, what's inside the payload, and how this scales without becoming a security or reliability liability.

Get these five decisions wrong and Phase 3 turns into a rewrite. Get them right and implementation is mechanical.

---

## The Real Question

"How do I send a push notification" is a 10-minute problem — every provider has a quickstart.

The question that actually matters at architecture time is:

> How do I build a system that targets the right device, survives token rotation, doesn't block my API, and doesn't leak data if something goes wrong?

That's five sub-decisions. Let's go through them.

---

## Decision 1 — Delivery Layer

| Option | Best For | Setup Complexity | Vendor Lock-in | Cost at Scale |
|---|---|---|---|---|
| **Firebase Cloud Messaging (direct)** | Any RN/Flutter/native app, full control | Medium | Low (open protocol underneath) | Free |
| **Expo Push Service** | Expo-managed RN apps | Low | Medium (tied to Expo's relay) | Free |
| **OneSignal / Courier / Knock** | Teams that also want marketing segmentation, A/B testing, in-app + email + push in one place | Low | High | Free tier, then per-subscriber pricing |
| **AWS SNS** | Already deep in AWS infra | Medium-High | Medium | Pay-per-publish, cheap at scale |
| **Raw APNs + FCM, self-managed** | Rarely justified | High | Low | Free, high engineering cost |

> **Recommendation:** For a production mobile app, default to **FCM** as your transport. It's free, it's the de facto standard (Google maintains the bridge to APNs for iOS too, so you get one integration for both platforms), and it doesn't lock you into a third party's pricing curve as your user base grows. Reach for OneSignal/Courier only if marketing/lifecycle messaging (segmented campaigns, multi-channel) is a core product requirement — not just "nice to have."

If you're on Expo managed workflow, use Expo's push service now; it wraps FCM/APNs and you can eject to direct FCM later without changing your backend's mental model — only the SDK call changes.

---

## Decision 2 — Token Lifecycle

This is where most teams get it wrong on the first try.

> ️ **Common mistake:** storing the push token as a single column on the `users` table (`users.push_token`). This breaks the moment a user has two devices, and it silently overwrites valid tokens with stale ones on logout/login across devices.

**Correct shape:** a separate `device_tokens` table.

```
device_tokens
- id
- user_id        (FK)
- token          (string, indexed)
- platform       (ios | android)
- device_id      (stable client-generated UUID)
- app_version
- last_seen_at
- created_at
```

Design decisions this forces you to make now:

- **Multi-device is the default, not an edge case.** One user → many rows. Sending to a user means querying all their active tokens, not one field.
- **Tokens rotate.** FCM/APNs can issue a new token at any time (reinstall, OS update, app restore on new device). Your client must listen for refresh events and re-upsert — keyed on `device_id`, not `token`, so a refresh replaces the row instead of creating a duplicate.
- **Tokens go stale.** When a send fails with an "unregistered/invalid token" response from FCM, delete that row immediately. Don't keep retrying — you'll burn quota and pollute your data with dead devices.

---

## Decision 3 — Payload Strategy

Two payload types exist, and conflating them causes the most confusing bugs in push (notifications that "sometimes don't show up").

| Payload Type | App in Foreground | App in Background | App Killed |
|---|---|---|---|
| **Notification payload** | You handle display manually (OS won't auto-show) | OS displays automatically | OS displays automatically |
| **Data-only payload** | Delivered to your JS/code immediately | Delivered, but iOS treats it as low-priority and may throttle/delay | Often **not delivered** on iOS until next app open |

**Production default: send both (hybrid).** The `notification` block guarantees the OS shows something even if your app is dead. The `data` block carries the routing info (`type`, `entityId`) your app needs once the user taps it.

>  **Rule:** keep payloads to IDs and types only — never the full message content. Push payloads are capped at ~4KB, get cached in OS notification history, and go stale if the underlying content changes before the user taps. Fetch fresh content from your API on tap.

```json
{
  "notification": { "title": "Order shipped", "body": "Tap to track it" },
  "data": { "type": "order_update", "orderId": "ord_8841" }
}
```

---

## Decision 4 — Targeting Architecture

Three models, not interchangeable:

- **Direct (per-token):** send to specific `device_tokens` rows. Use for transactional pushes (order updates, DMs, mentions).
- **Topic-based (FCM topics):** client subscribes to a topic string (e.g. `news-tech`), server publishes once. Cheap, but no filtering — every subscriber gets it.
- **Segment-based:** a computed cohort from a query over your own database ("users inactive 7+ days who completed onboarding"). FCM topics can't express this — you need a backend job that queries, then fans out direct sends.

>  If your roadmap includes any kind of re-engagement or lifecycle campaign, build the segment-query path now, even if Phase 3 only implements transactional sends first. Retrofitting segmentation onto a topics-only architecture means redesigning your subscription model later.

---

## Decision 5 — Delivery Infrastructure

> ️ **Never send pushes synchronously inside a request handler.** `POST /orders/:id/ship` should not block on an FCM call. If FCM is slow, your API is now slow. If FCM errors, your unrelated business logic fails too.

**Correct shape:**

```
Event occurs → write to outbox/queue → background worker → FCM SDK call → handle response
```

- Use your existing DB as an outbox table, or a managed queue if you already have one from your Backend module.
- **Batch sends.** FCM's multicast endpoint accepts up to 500 tokens per call — loop over users, not over individual `send()` calls, when notifying many devices at once.
- Build retry/backoff into the worker, and route "invalid token" responses straight to the token-deletion path from Decision 2.

---

## Decision 6 — Security

- Provider credentials (FCM service account JSON, APNs key) live **server-side only** — in your secrets manager, never bundled into the mobile app binary.
- Treat the `device_tokens` table with the same access controls as other PII-adjacent data. A token isn't a secret on its own, but token + user mapping is enough to spam or deanonymize someone.
- Don't trust client-supplied user/device associations on sensitive sends — re-verify server-side that the authenticated session owns the token before sending anything containing private data.

---

## Decision 7 — Cost Shape

| Layer | Pricing Model | Gets Expensive When |
|---|---|---|
| FCM/APNs | Free | Never — not the cost driver |
| Worker/queue compute | Pay-per-invocation | High send volume with inefficient (non-batched) calls |
| OneSignal/Courier (if chosen) | Per-subscriber tiers | User base grows past free tier (~10k subscribers typical cutoff) |

The real cost of push is almost never the notification itself — it's engineering time spent on token hygiene and queue infrastructure. Budget for that, not for FCM fees.

---

## AI Prompts

### Prompt 1 — Delivery Layer Decision

```
I'm architecting push notifications for a production mobile app.

Stack: [your frontend framework, e.g. React Native bare workflow / Expo / Flutter]
Backend: [your backend framework/language]
Expected scale: [rough DAU / notification volume]
Do we need marketing segmentation/campaigns, or only transactional pushes?

Recommend FCM-direct vs Expo Push vs a third-party provider (OneSignal/Courier).
Justify the tradeoff in terms of: vendor lock-in, cost curve as we scale,
and engineering effort. Don't default to the "easiest" option — flag what
we'd have to rebuild later if we choose wrong now.
```

### Prompt 2 — Token Schema Review

```
Review this device token table design for a production app with multi-device users:

[paste your schema]

Check specifically for:
- single-token-per-user anti-pattern
- whether token refresh is handled as an upsert keyed on device_id
- whether stale/invalid token cleanup is accounted for
- indexes needed for "all active tokens for user X" queries at scale
```

---

## Validating AI Output

Before accepting an AI-generated push architecture, confirm:

- [ ] Tokens are modeled in a separate device table, not a single column on `users`
- [ ] Token refresh is handled as an upsert keyed on a stable `device_id`, not the token itself
- [ ] Invalid-token responses from the provider trigger deletion, not infinite retry
- [ ] Sends happen through a queue/worker, never inline in a request handler
- [ ] Payload contains IDs/types only — no sensitive content embedded
- [ ] Provider credentials are referenced as server-side secrets, never in client code
- [ ] Multicast/batch sending is used for any fan-out to more than a handful of devices

> ️ If AI-generated code calls `send()` in a loop, one token at a time, inside an API route — that's two red flags at once (no batching, no queue). Push it back and ask for the queued, batched version.

---

## What's Next

This architecture sets up two things that get built later:

- **Deep Linking** (next in this phase) defines what happens when a user taps a notification — the `data.type`/`data.entityId` fields you designed here are what deep linking routes on.
- **Push Notifications Impl** (Phase 3) turns these decisions into actual SDK calls, worker code, and the client-side listener for token refresh.
- **Analytics Strategy** will track notification opens/conversions — make sure your payload's `type` field is consistent enough to group by later.
