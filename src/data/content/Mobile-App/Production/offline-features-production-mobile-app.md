---
title: Offline Features
slug: offline-features
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 25-30 min
---

# Offline Features

You decided your offline strategy's scope in Phase 2 — which features need to work without connectivity, and to what degree. This module implements it: the local cache layer, the mutation queue, and the conflict resolution that decides what happens when offline edits meet the server's current state.

This is the module most likely to be underbuilt in apps assembled quickly with AI tools, because "works offline" is easy to fake in a demo (just don't lose the in-memory state) and genuinely hard to get right across real interruption patterns.

---

## First — Confirm What You Actually Committed To

Re-check your Phase 2 Offline Strategy decision before implementing anything here. There's a real difference between these three commitments, and building more than you decided is wasted effort; building less is a broken promise to users:

| Level | What It Means |
|---|---|
| **Read-only offline** | Previously-fetched data remains viewable; no new actions possible offline |
| **Optimistic local writes, synced later** | User can take actions offline (e.g. draft a post, mark something read); changes queue and sync when connectivity returns |
| **Full offline-first** | App is fully functional offline as the primary mode, with sync as a background concern, not a blocking one |

> 💡 Most production mobile apps land on the middle tier — read-only offline for browsing, queued writes for a deliberately scoped set of actions (not everything). Full offline-first is significant engineering investment, usually only justified for apps where connectivity is unreliable by the nature of their use case (field work apps, apps for areas with poor coverage).

---

## Decision 1 — Local Cache Layer

Your React Query setup from the State Management module already caches server responses in memory. For offline read access, that cache needs to **persist across app restarts**, not just survive within a session.

```typescript
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

persistQueryClient({
  queryClient,
  persister: createAsyncStoragePersister({ storage: AsyncStorage }),
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});
```

> ⚠️ Don't persist everything indiscriminately — large or rapidly-changing queries (a real-time feed) shouldn't be cached for offline access indefinitely; stale offline data presented as current can be more misleading than an honest "you're offline, here's what we last had" state. Scope persistence to specifically the queries that benefit from offline availability, not the entire query cache by default.

---

## Decision 2 — Mutation Queue

This is the core offline-writes mechanism: actions taken offline get queued locally and replayed once connectivity returns.

```typescript
interface QueuedMutation {
  id: string;
  type: string;          // e.g. 'create_comment'
  payload: unknown;
  createdAt: number;
  retryCount: number;
}
```

**The flow:**

```
User takes action while offline
  → mutation written to local queue (persisted storage, not just memory)
  → UI updates optimistically, as if the action succeeded
  → connectivity returns
  → queue processes in order, calling the real API for each
  → on success: remove from queue
  → on failure: retry with backoff, or surface to user if unrecoverable
```

> 💡 **Process the queue in order, not in parallel** — if a user offline-edits the same record twice, replaying those mutations out of order can produce a different final state than what the user actually did. Sequential processing preserves intent.

---

## Decision 3 — Conflict Resolution

The genuinely hard part: what happens when a queued offline mutation conflicts with a change that happened on the server (from another device, or another user) while the first device was offline?

| Strategy | How It Works | Use When |
|---|---|---|
| **Last-write-wins** | Whichever update reaches the server last simply overwrites | Acceptable for low-collision data (a single user's own settings) |
| **Server-wins** | Server state always takes precedence; queued local mutation is discarded or surfaced as a conflict to the user | Acceptable when server data is authoritative and offline edits are rare/low-stakes |
| **Field-level merge** | Only the specific fields that were actually changed offline get applied, rather than overwriting the whole record | Better UX, meaningfully more implementation complexity |
| **Explicit conflict prompt** | User is shown both versions and picks, or merges manually | Necessary for genuinely high-stakes collisions (e.g. collaborative editing) |

> ⚠️ **Don't pick this by default — decide it per data type.** A user's own draft post overwriting itself with last-write-wins is fine. An inventory count conflicting across two offline devices needs something more careful, or you'll silently lose data integrity. Match the strategy to the actual collision risk and stakes of each entity, not one global policy for everything.

---

## Decision 4 — Sync Triggering

Decide when the queue attempts to flush, not just that it eventually does:

- **On connectivity restored** (the obvious case) — listen for the network status change.
- **On app foreground** — connectivity may have returned while backgrounded; check on resume, not just via the listener.
- **Periodically while online**, if mutations can be queued even while nominally connected (e.g. a request failed mid-flight) — don't assume "queued" only happens during full offline periods.

> 💡 Surface sync state to the user when it's relevant — a small "syncing 3 changes..." indicator is often enough to prevent confusion ("did my edit actually save?") without needing a heavyweight UI. Silence here reads as data loss to an anxious user, even when the queue is working correctly in the background.

---

## Decision 5 — What Should Never Be Queued Offline

Some actions shouldn't be optimistically queued at all — decide this explicitly rather than queuing everything uniformly:

- **Payments/financial transactions** — never queue-and-replay blindly; these need explicit online confirmation, with clear UI that the action requires connectivity.
- **Actions with real-world side effects that are hard to undo** (sending an irreversible message, deleting an account) — at minimum, warn the user the action is queued and hasn't actually happened yet.

---

## AI Prompts

### Prompt 1 — Offline Sync Layer Implementation

```
Implement offline support for a production [React Native] app.

Actions that need to work offline: [list them, e.g. draft posts, mark-as-read]
Actions that must NEVER be queued offline: [list them, e.g. payments]
Conflict-prone data (multi-device/multi-user edits possible): [list it]

Build: a persisted mutation queue processed sequentially on reconnect,
optimistic UI updates for queued actions, a sync status indicator, and
[last-write-wins/server-wins/field-merge] conflict resolution specifically
for the conflict-prone data identified above.
```

### Prompt 2 — Offline Implementation Review

```
Review this offline implementation for correctness:

[paste your queue/sync code]

Check for: mutations processed out of order or in parallel instead of
sequentially, missing handling for sync-on-app-foreground (not just
sync-on-connectivity-change), payments or irreversible actions being
queued without explicit online confirmation, and whether conflict
resolution is appropriately matched per data type rather than uniform.
```

---

## Validating AI Output

- [ ] Mutation queue persists across app restarts, not just in-memory
- [ ] Queued mutations replay sequentially, not in parallel
- [ ] Sync is triggered on both connectivity-restored and app-foreground events
- [ ] Conflict resolution strategy is chosen per data type based on actual collision risk, not applied uniformly
- [ ] Payments and irreversible actions are explicitly excluded from offline queuing
- [ ] Sync state is surfaced to the user in some form, not silent

---

## What's Next

- **Push Notifications Impl** (next in this phase) needs to account for notifications that arrive while the device was offline and is now catching up.
- **Error Handling** will define how unrecoverable queue failures (an offline mutation that fails repeatedly after reconnect) get surfaced to the user.
- **Testing** should explicitly include offline/reconnect simulation — this entire module is exactly the kind of code that looks correct until tested against real interruption timing.
