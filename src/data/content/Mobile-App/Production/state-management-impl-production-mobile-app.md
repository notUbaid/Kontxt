---
title: State Management Impl
slug: state-management-impl
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 25-30 min
---

# State Management Implementation

Phase 2 chose your state management approach. This module is where that choice becomes real: the actual stores/providers, how they're organized, and the rule that prevents the most common state management failure mode — putting everything in one global blob and losing track of what depends on what.

---

## First, Separate These Three Kinds of State

This is the decision that matters more than which library you picked. Conflating these three is the root cause of most "why did this re-render" and "why is this stale" bugs.

| Kind | What It Is | Where It Belongs |
|---|---|---|
| **Server state** | Data that originates from your backend (user profile, product list, orders) | A data-fetching library (React Query / TanStack Query, SWR) — not your global store |
| **Client/UI state** | State that only exists on-device and has no server source of truth (modal open/closed, selected tab, form input before submit) | Your state management library (Zustand, Redux, Jotai, etc.) |
| **Persisted local state** | Client state that should survive app restarts (theme preference, onboarding-completed flag, draft form data) | Same store, with a persistence middleware layer |

> ⚠️ **The single most common state management mistake in apps built with AI assistance:** fetching server data with `useEffect` + manual loading/error state, then dumping the result into a global store. This throws away caching, automatic refetch-on-reconnect, and request deduplication — and then requires you to manually keep that cached copy in sync with the server, which is the bug factory itself. Server state needs a tool built for server state.

---

## Decision 1 — Server State Layer

Use **React Query (TanStack Query)** or equivalent for anything that comes from your API. This is not optional for a production app — building this caching/sync layer by hand is a well-known time sink that a mature library already solves correctly.

```typescript
function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProduct(productId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

What this gives you for free, that hand-rolled `useEffect` fetching doesn't:

- Automatic caching keyed by query parameters — navigating away and back doesn't refetch unnecessarily
- Automatic refetch on reconnect (relevant on mobile, where connectivity drops are routine)
- Request deduplication — two components requesting the same data in the same render cycle trigger one network call, not two
- Built-in loading/error states, feeding directly into the `AsyncBoundary` pattern from the Frontend module

> 💡 **Mutations** (creating/updating/deleting server data) belong here too, not as manual API calls scattered through components. Use the library's mutation hooks with optimistic updates where the UX benefits (e.g. a "like" button should feel instant, then reconcile with the server response).

---

## Decision 2 — Client/UI State Layer

For state that has no server source of truth, use a lightweight store — **Zustand** is the production default for most React Native apps: minimal boilerplate, no provider wrapping required, good TypeScript inference.

```typescript
interface UIStore {
  activeFilterSheet: boolean;
  setActiveFilterSheet: (open: boolean) => void;
  selectedTab: 'home' | 'search' | 'profile';
  setSelectedTab: (tab: UIStore['selectedTab']) => void;
}

const useUIStore = create<UIStore>((set) => ({
  activeFilterSheet: false,
  setActiveFilterSheet: (open) => set({ activeFilterSheet: open }),
  selectedTab: 'home',
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));
```

> ⚠️ **Don't put everything in one global store.** A single `useAppStore` with 40 unrelated fields becomes impossible to reason about and causes unnecessary re-renders across unrelated components. Split stores by domain — `useUIStore`, `useOnboardingStore`, `useCartStore` — the same boundary discipline as your feature-based folder structure from the Frontend module.

---

## Decision 3 — Persisted State

Only state that genuinely needs to survive an app restart belongs here — tie this directly to the cold-start restoration decisions from the App Lifecycle module.

```typescript
const useSettingsStore = create(
  persist<SettingsStore>(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'settings-store', storage: createJSONStorage(() => AsyncStorage) }
  )
);
```

> ⚠️ Never persist server state through this mechanism — that's what your React Query cache (with its own optional persistence) is for, and it already handles staleness correctly. Manually persisting a snapshot of server data into your client store creates exactly the stale-data-drift problem the server state layer exists to prevent.

---

## Decision 4 — Where State Lives Relative to Components

- **Local component state (`useState`) is still correct for state that's genuinely local** — a single input's focus state, an animation value. Not everything needs to go in a global store. Reaching for global state by default, for things only one component cares about, adds indirection without benefit.
- **Lift state only as high as the components that actually need it** — if two sibling components in the same screen need to share state, that often belongs in their shared parent or a feature-scoped store, not your global app-wide store.

> 💡 **Decision test:** "does more than one feature need this state, or does it need to survive a screen unmount?" If no to both, `useState` is the right answer, not a global store entry.

---

## Decision 5 — Derived State

> ⚠️ Don't store computed values in state and try to keep them in sync manually. If `cartTotal` can be calculated from `cartItems`, derive it at read time (in a selector or a `useMemo`), don't store it as its own state field that you remember to update on every cart mutation. Storing derived state is a recurring source of subtle desync bugs — the derived value drifts from its source whenever an update path forgets to recompute it.

```typescript
// Avoid: storing cartTotal as separate state
// Prefer:
const cartTotal = useCartStore((state) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
```

---

## AI Prompts

### Prompt 1 — State Architecture Scaffold

```
Set up the state management layer for a production [React Native] app.

Server-derived data: [list your main API resources, e.g. products, orders, profile]
Client-only UI state needed: [list it, e.g. filter sheet open, selected tab]
State that must persist across app restarts: [list it, e.g. theme, onboarding status]

Use React Query for all server state (with appropriate staleTime per resource
based on how often it changes) and Zustand for client state, split into
domain-scoped stores rather than one global store. Show the persistence
middleware setup for the items that need to survive restart, using AsyncStorage.
```

### Prompt 2 — State Code Review

```
Review this state management code for our project conventions:

[paste your store/query code]

Check for: server data being stored in a global client store instead of
React Query, one monolithic store handling unrelated domains, derived
values stored as their own state instead of computed at read time, and
local-only state unnecessarily lifted into a global store.
```

---

## Validating AI Output

- [ ] All server-derived data flows through React Query (or equivalent), never manually fetched into a global store
- [ ] Client UI stores are split by domain, not one monolithic store
- [ ] Persisted state is limited to what genuinely needs to survive a restart — no server data persisted this way
- [ ] Derived/computed values are calculated at read time, not stored and manually synced
- [ ] Local-only component state still uses `useState` where appropriate, not globalized by default
- [ ] Mutations use the data-fetching library's mutation handling, not ad hoc API calls scattered in components

---

## What's Next

- **Backend Integration** (next in this phase) is where the API client this module's server state layer calls into gets built out.
- **Offline Features** will extend this state layer with queued mutations and conflict resolution for actions taken without connectivity.
- **Auth Implementation** will define the auth state that feeds your navigation's auth-gating logic from the Navigation module.
