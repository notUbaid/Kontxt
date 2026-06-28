---
title: State Management
slug: state-management
phase: Phase 3
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# State Management

The most over-engineered part of frontend development.

Most applications don't need Redux. Most applications don't need Zustand. Most applications don't even need Context for the majority of their state. What they need is clarity about what kind of state they have — and where it belongs.

Get this right early. Refactoring state architecture mid-project is one of the most painful things you can do to yourself.

---

## The Four Kinds of State

Every piece of state in your application belongs to one of these categories. The category determines where it lives.

| Type | Description | Lives In |
|---|---|---|
| **Local UI State** | Component-specific, no one else cares | `useState` / `useReducer` |
| **Shared UI State** | Multiple components need it | Context or state library |
| **Server State** | Data that lives in your database | TanStack Query / SWR |
| **URL State** | Current view, filters, pagination | URL search params |

> **The most common mistake:** Putting server state into client state. You end up with two sources of truth and spend half your time syncing them.

---

## Decision Tree

```
Is this data from the server (API / database)?
└── YES → Use TanStack Query or SWR. Not useState.

Is this state needed by only one component?
└── YES → useState. Full stop.

Is this state needed by a few nearby components?
└── YES → Lift state up to nearest common parent.

Is this state needed across many unrelated components?
└── YES → Context (if simple) or Zustand (if complex)

Does this state affect what the user is looking at?
└── YES → Consider URL state (search params, route params)
```

Go through this for every piece of state you're about to add. Most "I need a state manager" moments resolve at step one or two.

---

## Local State: `useState` and `useReducer`

The default choice. Always start here.

```typescript
// useState — simple values
const [isOpen, setIsOpen] = useState(false)
const [count, setCount] = useState(0)

// useReducer — when state has multiple sub-values or complex transitions
type State = { count: number; step: number; history: number[] }
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; payload: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step, history: [...state.history, state.count] }
    case 'decrement':
      return { ...state, count: state.count - state.step }
    case 'reset':
      return { count: 0, step: state.step, history: [] }
    case 'setStep':
      return { ...state, step: action.payload }
  }
}
```

**Use `useReducer` when:**
- 3+ related state values that change together
- Next state depends on previous state in non-trivial ways
- State transitions need to be explicit and traceable

---

## Server State: TanStack Query

This is not optional for production apps. Manual `useEffect` + `useState` data fetching creates:
- Race conditions
- Stale data
- No deduplication
- Manual loading/error state management
- No cache

TanStack Query solves all of this.

```typescript
// Install
// npm install @tanstack/react-query

// Setup — app/providers.tsx
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // data considered fresh for 1 minute
        retry: 1,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

```typescript
// Fetching data
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
    enabled: !!userId,
  })
}

// Using it
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId)

  if (isLoading) return <Skeleton />
  if (error) return <Error />
  return <ProfileCard user={user} />
}
```

```typescript
// Mutating data
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserInput) =>
      fetch(`/api/users/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }).then(r => r.json()),

    onSuccess: (updatedUser) => {
      // Update the cache immediately — no refetch needed
      queryClient.setQueryData(['user', updatedUser.id], updatedUser)
      // Or invalidate to refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### Query Key Design

Query keys are how TanStack Query identifies and invalidates cache entries. Design them deliberately.

```typescript
// ❌ Loose — hard to invalidate related queries
useQuery({ queryKey: ['users'] })
useQuery({ queryKey: ['user-profile'] })
useQuery({ queryKey: ['userData'] })

// ✅ Hierarchical — easy to invalidate all user-related data at once
useQuery({ queryKey: ['users'] })                           // all users
useQuery({ queryKey: ['users', userId] })                   // specific user
useQuery({ queryKey: ['users', userId, 'posts'] })          // user's posts
useQuery({ queryKey: ['users', userId, 'posts', postId] })  // specific post

// Invalidate all user queries at once:
queryClient.invalidateQueries({ queryKey: ['users'] })
```

---

## URL State

The most underused form of state. URL state is:
- Shareable
- Bookmarkable
- Survives page refresh
- Works with browser back/forward

```typescript
// When to use URL state:
// - Search queries
// - Active filters
// - Sort order
// - Pagination
// - Active tab
// - Modal open (sometimes)

// Next.js App Router — reading URL state
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

function ProductFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const category = searchParams.get('category') ?? 'all'
  const sort = searchParams.get('sort') ?? 'newest'

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams)
    params.set(key, value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <Select value={category} onValueChange={(v) => setFilter('category', v)}>
        ...
      </Select>
    </div>
  )
}
```

> **Rule of thumb:** If a user could reasonably want to share or bookmark the current view, the state driving that view belongs in the URL.

---

## Shared Client State: Zustand

When you genuinely need global client state — user preferences, UI state across many components, shopping cart, notification system — use Zustand.

It's simpler than Redux. No boilerplate. No providers (mostly). No action creators.

```typescript
// npm install zustand

// store/ui-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStore {
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  toggleSidebar: () => void
  setTheme: (theme: UIStore['theme']) => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'system',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-preferences', // localStorage key
      partialize: (state) => ({ theme: state.theme }), // only persist theme, not sidebar
    }
  )
)

// Usage — anywhere in the tree, no provider needed
function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore()
  return (
    <aside className={sidebarOpen ? 'w-64' : 'w-0'}>
      <button onClick={toggleSidebar}>Toggle</button>
    </aside>
  )
}
```

### When Zustand vs Context

| | Context | Zustand |
|---|---|---|
| Setup | Zero | Minimal |
| Re-render control | Poor — whole tree re-renders | Fine-grained subscription |
| DevTools | No | Yes |
| Persistence | Manual | Built-in middleware |
| Use for | Theme, auth session, locale | Complex UI state, cart, preferences |

**Context is fine for slow-changing values** (auth user, theme, locale) consumed by many components. **Use Zustand when** state changes frequently or you need selective subscriptions to avoid re-renders.

---

## React Context: When and How

Don't use Context as a global store. Use it for dependency injection of stable values.

```typescript
// ✅ Good use of Context — auth session (changes rarely)
interface AuthContext {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize session
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
```

> ⚠️ **Warning:** Every Context update re-renders all consumers. If your Context value includes frequently-changing data, split it into multiple contexts or switch to Zustand.

---

## State Colocation Rule

State should live as close to where it's used as possible.

```
Component needs state → useState in that component
Two siblings need state → Lift to parent
Distant components need state → Context or Zustand
Data from server → TanStack Query
```

**Resist the urge to globalize state preemptively.** Start local. Lift when you must. Globalize when lifting becomes painful.

---

## Performance: Avoiding Unnecessary Re-renders

```typescript
// ❌ Creates new object reference on every render — child always re-renders
function Parent() {
  const [count, setCount] = useState(0)
  const config = { theme: 'dark', locale: 'en' } // new object every render

  return <Child config={config} />
}

// ✅ Stable reference — child only re-renders when config actually changes
function Parent() {
  const [count, setCount] = useState(0)
  const config = useMemo(() => ({ theme: 'dark', locale: 'en' }), [])

  return <Child config={config} />
}

// ✅ Stable callback — required when passing callbacks as props to memoized children
const handleSubmit = useCallback((data: FormData) => {
  // ...
}, [dependency])
```

**Don't `useMemo` everything.** Memoization has a cost. Profile first, optimize second.

```typescript
// Use React DevTools Profiler to find actual re-render bottlenecks
// Only memoize when:
// 1. You've measured a performance problem
// 2. The component is genuinely expensive to re-render
// 3. Props are referentially stable (otherwise memoization never hits)
```

---

## AI Prompt: State Architecture Review

Use when planning state for a new feature or reviewing existing state structure.

```
You are a senior React engineer reviewing state architecture for a production Next.js 14 application.

Tech stack: Next.js 14 App Router, TypeScript, TanStack Query, Zustand

Feature I'm building: [describe the feature]

Here is how I'm currently thinking about state:
[describe or paste your current state approach]

Review and:
1. Identify any server state I'm managing manually that should be in TanStack Query
2. Flag any global state that should stay local
3. Point out re-render risks (Context with frequent updates, unstable references)
4. Identify state that belongs in the URL
5. Suggest a clean final state architecture with clear reasoning for each piece

Be opinionated. Tell me what's wrong, not just what could be improved.
```

---

## Implementation Checklist

- [ ] TanStack Query installed and `QueryClientProvider` wrapping the app
- [ ] No `useEffect` + `useState` combinations for data fetching
- [ ] Query keys follow a hierarchical naming convention
- [ ] Mutations use `onSuccess` to update or invalidate relevant cache entries
- [ ] Shareable view state (filters, search, pagination) stored in URL params
- [ ] Global UI state (theme, sidebar) in Zustand with `persist` middleware
- [ ] Auth session in Context (changes rarely, acceptable re-render surface)
- [ ] No Context used for frequently-updating values
- [ ] `useMemo` / `useCallback` only where profiling shows benefit
- [ ] State lives as close to its usage as possible — no premature globalization

---

## Common Mistakes

**Using `useEffect` + `useState` to fetch data.**
You get race conditions, stale closures, no caching, manual loading state, and no deduplication. Use TanStack Query. There is no good reason not to in a production app.

**Putting everything in a global store on day one.**
State that starts global never becomes local. You'll end up with a massive store full of state that's only used by one component. Start local. Lift when necessary.

**Using Context for a shopping cart or notification system.**
Context re-renders all consumers on every update. A cart with frequent updates will cause your entire app to re-render constantly. Use Zustand.

**Not using URL state for filters and search.**
Users press back and lose their filters. They try to share a link and it shows the wrong results. URL state is free persistence and shareability. Use it.

---

## Quick Reference

```
Data from API/DB?              → TanStack Query
One component uses it?         → useState
Siblings share it?             → Lift to parent
Many components, changes rarely? → Context
Many components, changes often?  → Zustand
User should be able to share it? → URL state
```

---

## What's Next

**Data Fetching** — TanStack Query is the foundation, but production data fetching involves pagination, infinite scroll, optimistic updates, error boundaries, and cache invalidation patterns. The next module covers these in depth.
