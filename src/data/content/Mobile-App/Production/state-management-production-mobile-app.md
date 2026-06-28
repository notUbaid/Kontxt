---
title: State Management
slug: state-management
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 30–40 min
---

# State Management

State management is where most mobile apps become unmaintainable.

Not because the problem is hard — but because teams do not make explicit decisions about it. State accumulates in components, props drill five levels deep, the same data is fetched in six different places, and two months after launch nobody can confidently say what the source of truth is for any given piece of data.

The fix is not a specific library. It is a clear mental model applied consistently.

---

## The State Taxonomy

Before choosing any tool, classify your state. Different categories of state have different solutions.

```
┌─────────────────────────────────────────────────────────┐
│                      App State                          │
│                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌────────────┐  │
│  │  Server State │  │  Client State │  │  URL/Nav   │  │
│  │               │  │               │  │  State     │  │
│  │ Data from API │  │ UI-only state │  │            │  │
│  │ Cached data   │  │ Form inputs   │  │ Route      │  │
│  │ Realtime data │  │ Modal open?   │  │ params     │  │
│  │ User profile  │  │ Selected tab  │  │ Deep links │  │
│  └───────────────┘  └───────────────┘  └────────────┘  │
│                                                         │
│  ┌───────────────┐  ┌───────────────────────────────┐  │
│  │  Auth State   │  │      Local Persistent State    │  │
│  │               │  │                                │  │
│  │  Current user │  │  User preferences              │  │
│  │  Tokens       │  │  Onboarding completed?         │  │
│  │  Permissions  │  │  Last viewed content           │  │
│  └───────────────┘  └───────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**The most important insight:** Server state and client state are fundamentally different problems. Conflating them — putting API data in the same Redux store as UI state — is the root cause of most state management complexity.

---

## Server State — TanStack Query

Server state has unique properties: it is async, it can go stale, it needs caching, deduplication, and background refresh. A general-purpose state manager handles these poorly. TanStack Query (React Query) handles them excellently.

```bash
npm install @tanstack/react-query
```

```ts
// app/_layout.tsx — wrap the app
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // Data stays fresh for 5 minutes
      gcTime: 1000 * 60 * 10,        // Garbage collect after 10 minutes unused
      retry: 2,                       // Retry failed requests twice
      refetchOnWindowFocus: false,    // Disable for mobile — no window focus concept
      refetchOnReconnect: true,       // Refetch when network reconnects
    },
  },
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* rest of app */}
    </QueryClientProvider>
  )
}
```

### Query keys — the critical design decision

Query keys are how TanStack Query identifies, caches, and invalidates data. Inconsistent keys cause stale data bugs that are notoriously hard to trace.

Define all keys in one place:

```ts
// lib/query-keys.ts
export const queryKeys = {
  // User
  user: {
    me: () => ['user', 'me'] as const,
    profile: (userId: string) => ['user', 'profile', userId] as const,
  },

  // Posts
  posts: {
    all: () => ['posts'] as const,
    list: (filters?: PostFilters) => ['posts', 'list', filters] as const,
    detail: (postId: string) => ['posts', 'detail', postId] as const,
    byUser: (userId: string) => ['posts', 'user', userId] as const,
  },

  // Notifications
  notifications: {
    all: () => ['notifications'] as const,
    unreadCount: () => ['notifications', 'unread-count'] as const,
  },
} as const
```

```ts
// Usage — consistent everywhere
const { data: post } = useQuery({
  queryKey: queryKeys.posts.detail(postId),
  queryFn: () => postsApi.get(postId),
})

// Invalidate after mutation — precise targeting
queryClient.invalidateQueries({ queryKey: queryKeys.posts.all() })
```

### Mutations with optimistic updates

For actions where the user expects immediate feedback:

```ts
function useLikePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => postsApi.like(postId),

    onMutate: async (postId) => {
      // Cancel in-flight queries for this post
      await queryClient.cancelQueries({ queryKey: queryKeys.posts.detail(postId) })

      // Snapshot current value
      const previous = queryClient.getQueryData(queryKeys.posts.detail(postId))

      // Optimistically update
      queryClient.setQueryData(queryKeys.posts.detail(postId), (old: Post) => ({
        ...old,
        likeCount: old.likeCount + 1,
        isLikedByMe: true,
      }))

      return { previous }
    },

    onError: (err, postId, context) => {
      // Roll back on failure
      queryClient.setQueryData(queryKeys.posts.detail(postId), context?.previous)
    },

    onSettled: (data, error, postId) => {
      // Always sync with server after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(postId) })
    },
  })
}
```

---

## Client State — Zustand

For UI state that is shared across components but not server-derived, Zustand is the right tool. Simpler than Redux, less opinionated, no boilerplate.

```bash
npm install zustand
```

```ts
// store/ui.store.ts
import { create } from 'zustand'

interface UIState {
  // Modal state
  activeModal: string | null
  openModal: (modalId: string) => void
  closeModal: () => void

  // Bottom sheet
  bottomSheetContent: React.ReactNode | null
  showBottomSheet: (content: React.ReactNode) => void
  hideBottomSheet: () => void

  // Toast notifications
  toast: { message: string; type: 'success' | 'error' | 'info' } | null
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
  hideToast: () => void
}

export const useUIStore = create<UIState>(set => ({
  activeModal: null,
  openModal: modalId => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),

  bottomSheetContent: null,
  showBottomSheet: content => set({ bottomSheetContent: content }),
  hideBottomSheet: () => set({ bottomSheetContent: null }),

  toast: null,
  showToast: (message, type = 'info') => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
}))
```

```ts
// store/auth.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      setUser: user => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist non-sensitive fields — tokens go in SecureStore
      partialize: state => ({ user: state.user }),
    }
  )
)
```

---

## Auth State — Dedicated Context

Auth state deserves its own pattern. It is queried by almost every component, changes infrequently, and has specific security requirements (tokens in SecureStore, not in general state).

```ts
// context/auth.context.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useAuthStore } from '@/store/auth.store'
import { authApi } from '@/lib/api/auth'

interface AuthContextValue {
  isLoading: boolean
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const { user, setUser, logout: clearUser } = useAuthStore()

  useEffect(() => {
    // Restore session on app launch
    async function restoreSession() {
      try {
        const token = await SecureStore.getItemAsync('access_token')
        if (token) {
          const { data } = await authApi.me()
          setUser(data.user)
        }
      } catch {
        await SecureStore.deleteItemAsync('access_token')
        await SecureStore.deleteItemAsync('refresh_token')
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])

  const login = async (email: string, password: string) => {
    const { data } = await authApi.login(email, password)
    await SecureStore.setItemAsync('access_token', data.accessToken)
    await SecureStore.setItemAsync('refresh_token', data.refreshToken)
    setUser(data.user)
  }

  const logout = async () => {
    await authApi.logout().catch(() => {})
    await SecureStore.deleteItemAsync('access_token')
    await SecureStore.deleteItemAsync('refresh_token')
    clearUser()
  }

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
```

---

## Local Persistent State — MMKV

For non-sensitive persistent state (user preferences, onboarding flags, last-read position), use MMKV — significantly faster than AsyncStorage.

```bash
npm install react-native-mmkv
```

```ts
// lib/storage.ts
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

// Typed helpers
export const LocalStorage = {
  getBoolean: (key: string) => storage.getBoolean(key),
  setBoolean: (key: string, value: boolean) => storage.set(key, value),
  getString: (key: string) => storage.getString(key),
  setString: (key: string, value: string) => storage.set(key, value),
  delete: (key: string) => storage.delete(key),
}

// Usage
LocalStorage.setBoolean('onboarding_complete', true)
const hasCompletedOnboarding = LocalStorage.getBoolean('onboarding_complete')
```

Plug MMKV into Zustand's persist middleware for faster persisted stores:

```ts
import { StateStorage } from 'zustand/middleware'

const mmkvStorage: StateStorage = {
  getItem: key => storage.getString(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => storage.delete(key),
}
```

---

## Flutter State Management

For Flutter, the equivalent stack:

| Role | Tool |
|---|---|
| Server state | `flutter_query` or `riverpod` + `dio` |
| Client / UI state | `Riverpod` (recommended) or `Bloc` |
| Local persistence | `shared_preferences` (simple) or `Hive` (fast) |
| Auth state | Riverpod `StateNotifierProvider` or dedicated `ChangeNotifier` |

```dart
// Riverpod — server state with caching
final postsProvider = FutureProvider.family<List<Post>, String?>((ref, cursor) async {
  final api = ref.read(apiClientProvider);
  return api.getPosts(cursor: cursor);
});

// Riverpod — UI state
final modalProvider = StateProvider<String?>((ref) => null);

// Usage
final posts = ref.watch(postsProvider(null));
ref.read(modalProvider.notifier).state = 'create-post';
```

---

## The Decision Tree

Use this to decide where any piece of state lives:

```
Is this data from an API or server?
├── Yes → TanStack Query (React Native) / Riverpod async (Flutter)
└── No → Is this state needed by more than one screen?
          ├── Yes → Zustand store (React Native) / Riverpod (Flutter)
          └── No → useState in the component
                    Is it sensitive? (tokens, credentials)
                    ├── Yes → SecureStore
                    └── No, but needs to persist?
                              → MMKV / LocalStorage
```

---

## AI Prompt — State Architecture Review

```
You are a senior mobile engineer reviewing the state management architecture
for a production React Native app.

My app: [one-sentence description]
Stack: [React Native + Expo / Flutter]
State library choices: [e.g. TanStack Query + Zustand + MMKV]

My main data entities and how they are used:
[List each piece of state and describe where it is needed]
Example:
- Current user: needed on every screen, persisted across app restarts
- Posts feed: paginated list, needs offline cache, updated on pull-to-refresh
- Selected filters: UI-only, resets when leaving the screen
- Draft post: persists locally until submitted or discarded

For each entity:
1. Classify it: server state / client state / auth state / local persistent
2. Recommend the right storage and access pattern
3. Flag any N+1 fetch risks or prop-drilling traps
4. Identify where optimistic updates would significantly improve UX

Then identify:
5. What is the most likely state management bug I will encounter at scale?
6. What should I set up now that will prevent a refactor in 6 months?
```

---

## Validation Checklist

**Architecture**
- [ ] Server state and client state are handled by separate tools
- [ ] Every piece of state is classified: server / client / auth / local persistent
- [ ] No API responses stored in component-local `useState` that is shared across screens

**TanStack Query (React Native)**
- [ ] `QueryClient` configured with appropriate `staleTime` and `gcTime`
- [ ] All query keys defined in a central `queryKeys` file
- [ ] `refetchOnWindowFocus` set to `false` (not meaningful on mobile)
- [ ] `refetchOnReconnect` set to `true`
- [ ] Mutations invalidate relevant queries after success
- [ ] Optimistic updates implemented for high-frequency user actions (likes, follows, etc.)

**Zustand**
- [ ] One store per domain (auth, UI, etc.) — not one giant store
- [ ] Persisted stores use MMKV, not AsyncStorage
- [ ] Sensitive data (tokens) never stored in Zustand — uses SecureStore instead
- [ ] `partialize` configured on persisted stores to exclude non-serialisable state

**Auth state**
- [ ] Session restored on app launch
- [ ] Tokens stored in SecureStore only — not AsyncStorage or Zustand
- [ ] Logout clears all state: SecureStore, Zustand, and QueryClient cache

**Local persistence**
- [ ] MMKV used for non-sensitive persistent state
- [ ] Non-sensitive preference keys are documented
- [ ] Old keys cleaned up on major version upgrades (stale MMKV keys accumulate)
