---
title: Notifications
slug: notifications
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Notifications

Notifications exist to tell users something happened without making them go look for it. Done well, they drive engagement and keep teams in sync. Done poorly — too frequent, no clear unread state, no way to opt out — users learn to ignore them entirely, and you've built a feature nobody uses.

---

## Decision 1: Choose the Right Channel Per Event

| Event urgency | Channel |
|---|---|
| Needs immediate attention, user is likely active in-app | In-app toast (transient) |
| Important but not urgent, user may not be in-app | Persistent in-app notification (notification center/bell icon) + email |
| Critical regardless of presence | Email always, in-app as well |
| Low-priority, informational | Batch into a digest rather than individual notifications |

> ️ **Warning**
> Don't default every event to "send a notification." Notification fatigue is real — if everything is notified, users stop reading notifications altogether, including the important ones. Be deliberate about which events actually warrant interrupting the user.

---

## Decision 2: Data Model

A minimal, production-ready notifications table:

```
notifications
  id (UUID)
  workspace_id
  user_id
  type        -- e.g., "invoice.paid", "member.invited"
  payload     -- structured data needed to render the notification
  read_at     -- nullable timestamp
  created_at
```

>  **Best Practice**
> Store a `type` and structured `payload` rather than a pre-rendered message string. This lets you change the displayed wording later without a data migration, and lets the frontend render different notification types with different UI treatments from the same table.

---

## Decision 3: Decouple Notification Creation from the Triggering Action

> ️ **Warning**
> Don't create a notification inline as a side effect buried inside an unrelated service function (e.g., the invoice payment handler directly writing a notification row). This couples unrelated concerns and makes it easy to forget notifications when the triggering logic changes. Instead, emit an event or enqueue a background job, and have a dedicated notification handler create the actual notification — consistent with the async patterns from Backend Architecture.

This also makes it easy to add new notification types later without modifying the original triggering code.

---

## Decision 4: Delivery to the Client

| Approach | Use when |
|---|---|
| Poll on an interval (e.g., every 30–60s) or refetch-on-focus | Default choice — simple, no infrastructure overhead, sufficient for most notification urgency levels |
| Server-Sent Events / WebSockets | Only if you need true real-time badge updates (e.g., a live collaboration product where seconds matter) |

> [!TIP]
> Revisit your State Management decision here — if you already decided you don't need real-time infrastructure, polling/refetch-on-focus for the notification count is almost always sufficient. Don't add WebSocket complexity for a notification bell.

---

## Decision 5: Read/Unread State

- [ ] Unread count is derived from `read_at IS NULL`, not a separately maintained counter that can drift out of sync with the actual rows
- [ ] Marking as read happens on a clear user action (opening the notification panel, clicking a specific notification) — not ambiguously
- [ ] Old, read notifications are either paginated or periodically archived — an unbounded, ever-growing list with no pagination becomes both a UX problem and a query performance problem

---

## Decision 6: Idempotency

Apply the same idempotency principle as background jobs and webhooks: if the event that triggers a notification fires more than once (a retried webhook, a retried job), don't create duplicate notification rows for the same logical event. A dedupe key tied to the source event is usually enough.

---

## Decision 7: Preferences

Let users control non-critical notification types per channel (in-app vs email) — consistent with the preference management principle from Emails. Critical notifications (security, billing) shouldn't be fully suppressible.

---

## Common AI Mistakes to Watch For

- **Creates a notification for every possible event** by default — push back and ask which events genuinely warrant one.
- **Embeds notification creation inline** in unrelated business logic instead of decoupling via an event/job — flag this coupling.
- **Maintains a separately tracked unread counter** instead of deriving it from `read_at IS NULL` — counters drift; derived values don't.
- **No pagination on the notification list** — ask explicitly for this once you anticipate any meaningful volume.
- **Suggests WebSocket infrastructure** for a notification bell with no real urgency requirement — confirm there's an actual need first.

---

## AI Prompt: Implement the Notification System

```
Implement an in-app notification system for a production SaaS.

Data model: notifications table with id, workspace_id, user_id, type, payload (JSON), read_at, created_at.

Requirements:
- Notification creation is decoupled from triggering business logic — emit an event/enqueue a job, with a separate handler creating the notification row, not inline creation inside unrelated services
- Creation is idempotent against duplicate events (retried webhook/job)
- Unread count is derived from read_at IS NULL, not a separately maintained counter
- Notification list is paginated
- Client polls or refetches on focus for updates — no WebSocket/real-time infrastructure unless I explicitly ask for it
- Notification types: [list your actual events, e.g., "invite received", "payment failed", "comment added"]
- Mark-as-read happens on [opening the panel / clicking the notification — state your choice]

Flag any event from my list that you think shouldn't generate an individual notification and should instead be batched into a digest.
```

---

## Validate Before You Move On

- [ ] Notification creation is decoupled from the triggering action via an event/job, not inline
- [ ] Notifications are deduplicated against retried events
- [ ] Unread count is derived from the data, not a separately maintained counter
- [ ] The notification list is paginated
- [ ] No real-time infrastructure was added unless a genuine urgency requirement exists
- [ ] Users can opt out of non-critical notification types per channel
- [ ] You've deliberately chosen which events generate a notification — not "all of them by default"

> [!TIP]
> Review your notification types list after a few weeks of real usage. It's common to over-notify at launch and need to dial back — treat this as expected iteration, not a design failure.

---

**Next:** Search — help users find what they need across a growing dataset.
