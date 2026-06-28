---
title: Offline Strategy
slug: offline-strategy
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 35–50 min
---

# Offline Strategy

Mobile users lose connectivity constantly — in elevators, on subways, in rural areas, in airplane mode. They do not stop expecting your app to work.

An offline strategy is not about building a fully offline-capable app. It is about making deliberate decisions: which features work without a connection, what happens when they do not, and how the app recovers gracefully when connectivity returns.

The worst outcome is not "the app does not work offline." The worst outcome is the app silently appears to work offline, then loses or corrupts data when it reconnects.

---

## The Offline Spectrum

Most apps fall somewhere on this spectrum. Know where yours sits before writing code.

```
Online only          Offline tolerant          Offline first
     │                      │                       │
     │  App shows           │  Core content         │  App works
     │  clear error         │  cached and           │  fully without
     │  when offline        │  readable offline.    │  connection.
     │                      │  Writes queue         │  Sync happens
     │                      │  and sync later.      │  in background.
     │                      │
     └── Social media       └── Email, notes,       └── Notion, Linear,
         live feeds             document readers        collaborative tools
```

**Choosing your position:**

- **Online only** — acceptable for real-time apps (live trading, video calls, live sports). Be explicit: show a clear "no connection" state, do not silently fail.
- **Offline tolerant** — right for most consumer apps. Read cached content, queue writes.
- **Offline first** — high engineering investment. Only worth it if offline capability is a core value proposition.

You do not need to build offline first to have a good offline experience. Offline tolerant, done well, satisfies the vast majority of users.

---

## Network State Detection

Before anything else, your app needs to know when it is online and offline — and react to changes.

```bash
npm install @react-native-community/netinfo
```

```ts
// hooks/useNetworkStatus.ts
import NetInfo, { NetInfoState } from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'

interface NetworkStatus {
  isConnected: boolean
  isInternetReachable: boolean | null
  connectionType: string | null
}

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: null,
    connectionType: null,
  })

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        connectionType: state.type,
      })
    })

    return unsubscribe
  }, [])

  return status
}
```

>  **Warning:** `isConnected: true` does not mean the internet is reachable. A device can be connected to a WiFi router with no upstream internet (captive portals, hotel networks). Always check `isInternetReachable` for anything that makes API calls.

### Offline banner

Show users their connectivity state — do not let them discover it by a failed action.

```ts
// components/OfflineBanner.tsx
import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated'

export function OfflineBanner() {
  const { isConnected, isInternetReachable } = useNetworkStatus()
  const isOffline = !isConnected || isInternetReachable === false

  if (!isOffline) return null

  return (
    <Animated.View entering={SlideInUp} exiting={SlideOutUp} style={styles.banner}>
      <Text style={styles.text}>No internet connection</Text>
    </Animated.View>
  )
}
```

---

## Read Caching with TanStack Query

The simplest form of offline tolerance: cache server data locally so users can read it when offline.

TanStack Query handles this by default — data stays in memory until `gcTime` expires. For persistence across app restarts, add a persisted query client.

```bash
npm install @tanstack/query-async-storage-persister
npm install @tanstack/react-query-persist-client
```

```ts
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,        // 5 minutes — fresh, no refetch
      gcTime: 1000 * 60 * 60 * 24,     // 24 hours — keep in persisted cache
      retry: (failureCount, error) => {
        // Do not retry offline errors — they will fail again
        if (isOfflineError(error)) return false
        return failureCount < 2
      },
    },
  },
})

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 1000,
})

// Wrap app in PersistQueryClientProvider instead of QueryClientProvider
export function PersistentQueryProvider({ children }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24,   // Persist for 24 hours
        buster: APP_VERSION,             // Bust cache on app version change
      }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}

function isOfflineError(error: unknown): boolean {
  return error instanceof Error &&
    (error.message.includes('Network request failed') ||
     error.message.includes('timeout'))
}
```

With this in place, a user who viewed the feed yesterday can open the app offline today and see yesterday's content — without any additional work.

---

## Write Queuing

Reads without writes is incomplete. Users need to take actions when offline — send a message, create a note, like a post — and have those actions execute when connectivity returns.

```ts
// lib/offline-queue.ts
import { LocalStorage } from '@/lib/storage'
import { STORAGE_KEYS } from '@/lib/storage/keys'

interface QueuedAction {
  id: string
  type: string
  payload: unknown
  createdAt: number
  attempts: number
}

export const OfflineQueue = {
  enqueue: (type: string, payload: unknown): string => {
    const queue = OfflineQueue.getAll()
    const action: QueuedAction = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type,
      payload,
      createdAt: Date.now(),
      attempts: 0,
    }
    LocalStorage.setObject(STORAGE_KEYS.OFFLINE_QUEUE, [...queue, action])
    return action.id
  },

  getAll: (): QueuedAction[] =>
    LocalStorage.getObject<QueuedAction[]>(STORAGE_KEYS.OFFLINE_QUEUE, []),

  remove: (id: string) => {
    const queue = OfflineQueue.getAll().filter(a => a.id !== id)
    LocalStorage.setObject(STORAGE_KEYS.OFFLINE_QUEUE, queue)
  },

  incrementAttempts: (id: string) => {
    const queue = OfflineQueue.getAll().map(a =>
      a.id === id ? { ...a, attempts: a.attempts + 1 } : a
    )
    LocalStorage.setObject(STORAGE_KEYS.OFFLINE_QUEUE, queue)
  },
}
```

```ts
// lib/queue-processor.ts
import NetInfo from '@react-native-community/netinfo'
import { OfflineQueue } from './offline-queue'
import { queryClient } from './query-client'

const ACTION_HANDLERS: Record<string, (payload: unknown) => Promise<void>> = {
  LIKE_POST: async (payload: { postId: string }) => {
    await postsApi.like(payload.postId)
    queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(payload.postId) })
  },
  CREATE_COMMENT: async (payload: { postId: string; body: string }) => {
    await commentsApi.create(payload.postId, payload.body)
    queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(payload.postId) })
  },
}

export async function processOfflineQueue() {
  const state = await NetInfo.fetch()
  if (!state.isConnected || !state.isInternetReachable) return

  const queue = OfflineQueue.getAll()
  if (queue.length === 0) return

  for (const action of queue) {
    if (action.attempts >= 3) {
      // Give up after 3 attempts — notify user
      OfflineQueue.remove(action.id)
      notifyFailedAction(action)
      continue
    }

    try {
      const handler = ACTION_HANDLERS[action.type]
      if (!handler) {
        OfflineQueue.remove(action.id)
        continue
      }

      await handler(action.payload)
      OfflineQueue.remove(action.id)
    } catch (error) {
      OfflineQueue.incrementAttempts(action.id)
    }
  }
}

// Process queue when connectivity returns
NetInfo.addEventListener(state => {
  if (state.isConnected && state.isInternetReachable) {
    processOfflineQueue()
  }
})
```

---

## Optimistic Updates for Perceived Offline Tolerance

For frequent write actions (likes, reactions, checkboxes), optimistic updates give the experience of instant offline response even when connectivity is required.

The UI updates immediately. The server request runs in the background. If it fails, the UI rolls back.

```ts
// This pattern was covered in State Management — applying it here for offline context
function useToggleLike(postId: string) {
  return useMutation({
    mutationFn: () => postsApi.toggleLike(postId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.posts.detail(postId) })
      const previous = queryClient.getQueryData(queryKeys.posts.detail(postId))

      // Update UI immediately — user sees instant response
      queryClient.setQueryData(queryKeys.posts.detail(postId), (old: Post) => ({
        ...old,
        isLikedByMe: !old.isLikedByMe,
        likeCount: old.isLikedByMe ? old.likeCount - 1 : old.likeCount + 1,
      }))

      return { previous }
    },

    onError: (err, _, context) => {
      // Roll back on failure — includes network failure when offline
      queryClient.setQueryData(queryKeys.posts.detail(postId), context?.previous)
      showToast('Could not save. Please try again.')
    },
  })
}
```

---

## Sync Strategy for Offline-First Features

If your app has features that must work fully offline (note-taking, task management, forms), you need a sync strategy.

### Timestamp-based sync

```ts
// On reconnect — fetch only what changed since last sync
async function syncWithServer() {
  const lastSyncAt = LocalStorage.getString(STORAGE_KEYS.LAST_SYNC_AT)

  const { data: changes } = await api.get('/sync', {
    params: { since: lastSyncAt }
  })

  // Apply remote changes to local database
  await database.write(async () => {
    for (const change of changes.posts) {
      if (change.deleted) {
        const post = await database.get('posts').find(change.id)
        await post?.markAsDeleted()
      } else {
        await database.get('posts').create(record => {
          Object.assign(record, change)
          record.isSynced = true
        })
      }
    }
  })

  LocalStorage.setString(STORAGE_KEYS.LAST_SYNC_AT, new Date().toISOString())
}
```

### Conflict resolution

When the same data is modified locally and on the server while offline, you have a conflict.

Define your conflict resolution strategy before building sync:

| Strategy | When to Use |
|---|---|
| **Last write wins** | Simple, acceptable for most apps. The most recent timestamp wins. |
| **Server wins** | For data where server is authoritative (financial records, bookings). |
| **Client wins** | Rare. Risky. Only for truly local-first data. |
| **Manual merge** | For collaborative documents. Complex to implement. |

Most apps should use **last write wins** with the server timestamp as the authority.

---

## Offline UX Patterns

The engineering is half the problem. The other half is communicating offline state clearly.

### What to show offline

| Scenario | UI Behaviour |
|---|---|
| Viewing cached content | Show content normally. Add subtle "Last updated X ago" indicator. |
| Attempting a write action | Allow the action. Show "Saved locally, will sync when online." |
| Attempting a real-time action (send message) | Queue it. Show pending state on the message. |
| Viewing content not in cache | Show empty state: "Connect to the internet to load this." |
| Queue processing fails | Notify user: "Some actions could not be saved. Tap to retry." |

### Pending state indicators

```ts
// Visual indicator for queued actions
function PostCard({ post, isPending }: { post: Post; isPending?: boolean }) {
  return (
    <View style={[styles.card, isPending && styles.pendingCard]}>
      <Text style={styles.title}>{post.title}</Text>
      {isPending && (
        <View style={styles.pendingBadge}>
          <ActivityIndicator size="small" />
          <Text style={styles.pendingText}>Syncing...</Text>
        </View>
      )}
    </View>
  )
}
```

---

## Flutter Offline Patterns

```dart
// connectivity_plus for network detection
import 'package:connectivity_plus/connectivity_plus.dart';

final connectivity = Connectivity();
final stream = connectivity.onConnectivityChanged;

stream.listen((result) {
  if (result != ConnectivityResult.none) {
    // Back online — process queue
    OfflineQueue.process();
  }
});

// Riverpod — network-aware query
final postsProvider = FutureProvider<List<Post>>((ref) async {
  final connectivity = await Connectivity().checkConnectivity();

  if (connectivity == ConnectivityResult.none) {
    // Return cached data
    return LocalPostCache.getAll();
  }

  final posts = await api.getPosts();
  await LocalPostCache.saveAll(posts);  // Update cache
  return posts;
});
```

---

## AI Prompt — Offline Strategy Design

```
You are a senior mobile engineer designing an offline strategy for a
production mobile app.

My app: [one-sentence description]
Core features: [list 5–8 main features]
Stack: [React Native + Expo / Flutter]

For each feature, classify it:
1. Must work fully offline (read + write)
2. Should show cached content offline (read only)
3. Should queue actions for later (write only)
4. Can show an offline error (real-time or trivial)

Then design:
- What data should be cached locally and for how long?
- Which write actions should be queued vs blocked when offline?
- What conflict resolution strategy fits my app?
- How should the app communicate offline state for each feature?
- What is the sync strategy when connectivity returns?

Flag any features where offline support would be high complexity for
low user value — I should know before investing the engineering time.
```

---

## Validation Checklist

**Network detection**
- [ ] `@react-native-community/netinfo` installed and configured
- [ ] App listens for connectivity changes — does not assume static state
- [ ] Both `isConnected` and `isInternetReachable` checked before API calls
- [ ] Offline banner shown when connectivity is lost

**Read caching**
- [ ] TanStack Query persisted cache configured with appropriate `gcTime`
- [ ] Cache buster set to app version (prevents stale cache after updates)
- [ ] Users can view previously loaded content when offline

**Write queuing**
- [ ] Offline queue implemented for write actions that should not be lost
- [ ] Queue is processed when connectivity returns
- [ ] Failed actions retry with backoff and give up after max attempts
- [ ] Users are notified of pending actions and sync failures

**UX**
- [ ] Offline state is communicated clearly — no silent failures
- [ ] Cached content shows a "last updated" timestamp or offline indicator
- [ ] Queued actions show a pending/syncing state
- [ ] Real-time-only features show a clear "requires connection" message

**Conflict resolution**
- [ ] Conflict resolution strategy defined and documented
- [ ] Server timestamp used as authority for last-write-wins conflicts
- [ ] Sync strategy handles deleted records (soft delete + sync)

**Testing**
- [ ] Airplane mode tested for all core user flows
- [ ] Reconnection tested — queue processes correctly
- [ ] Cache expiry tested — stale content is refreshed on reconnect
