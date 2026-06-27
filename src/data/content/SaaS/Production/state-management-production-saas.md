---
title: State Management
slug: state-management
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# State Management

Frontend Architecture defined four categories of state: server, URL, local, and global. This module decides the actual tools and patterns for each — specifically the two categories that cause the most production bugs: server state caching and global client state.

---

## Decision 1: Server State — Caching Strategy

You already chose a data-fetching library (likely TanStack Query) in Frontend Architecture. Now decide the patterns that prevent stale-data bugs:

> **Decision Card — Query Key Strategy**
> Structure query keys hierarchically and consistently: `['invoices', workspaceId]`, `['invoices', workspaceId, invoiceId]`. This isn't cosmetic — it's how you invalidate the right cache entries after a mutation without over-invalidating (refetching everything) or under-invalidating (showing stale data).

| Decision | Recommendation |
|---|---|
| Stale time | Set explicitly per query type — frequently-changing data (e.g., notifications) should have a short or zero stale time; rarely-changing data (e.g., workspace settings) can stay fresh longer |
| Cache invalidation after mutation | Invalidate the specific query keys affected, not the entire cache — broad invalidation causes unnecessary refetches and UI flicker |
| Optimistic updates | Use for actions where instant feedback matters (toggling a checkbox, sending a message) — but always have a rollback path if the mutation fails |

> ️ **Warning**
> Optimistic updates without a rollback path are worse than no optimistic update at all — the UI shows success, then silently reverts or stays wrong when the request actually fails. Only add optimism once you've handled the failure case.

---

## Decision 2: Global Client State — Library Choice

| Option | Best for | Tradeoff |
|---|---|---|
| React Context | Small amounts of rarely-changing state (current theme, current user) | Re-renders every consumer on any change — don't use for frequently-updating state |
| Zustand | Most production SaaS global state — current workspace, UI preferences | Minimal boilerplate, good performance, widely adopted |
| Redux Toolkit | Large teams with complex, highly-interdependent state and a need for strict patterns/devtools | More ceremony than most SaaS apps actually need |
| Jotai | Fine-grained atomic state, good for complex interdependent UI state | Smaller ecosystem than Zustand |

>  **Best Practice**
> For most production SaaS apps, **Zustand** hits the right balance: minimal boilerplate, good performance characteristics, and it doesn't tempt you to put server data into it the way Redux's "single source of truth" framing sometimes does.

> ️ **Warning**
> Whatever you choose, this store should hold genuinely global UI/session state only — current workspace ID, sidebar collapsed/expanded, theme. It should never hold a copy of data your server-state library already caches. If you find yourself manually syncing the two, that's the signal something's in the wrong place.

---

## Decision 3: Form State

Forms deserve their own pattern, separate from general component state — production forms need validation, error display, and submission state handled consistently.

> **Decision Card**
> Pair a form library with a schema validation library:
- **React Hook Form** for form state, field registration, and submission handling
- **Zod** for schema validation — define the schema once, use it for both client-side validation and (ideally) server-side validation of the same payload

This pairing means your validation rules are defined once, not duplicated between frontend and backend with the risk of drift.

---

## Decision 4: URL State

For filters, pagination, selected tabs, and search queries — keep this in the URL, not in component state. A lightweight library (e.g., `nuqs` for Next.js) gives you typed search params without manually parsing query strings.

> [!TIP]
> If a piece of state should survive a page refresh or be shareable via a link (a filtered table view, a specific tab), it almost certainly belongs in the URL, not in React state.

---

## Decision 5: Real-Time State (Only If Needed)

Only address this if your MVP genuinely requires live updates (collaborative editing, live notifications, presence indicators).

| Need | Approach |
|---|---|
| Occasional live updates (notifications, status changes) | Server-Sent Events (SSE) — simpler than WebSockets, one-directional is usually enough |
| Bidirectional, low-latency (collaborative editing, chat) | WebSockets, or a managed real-time provider |
| No real-time requirement | Skip this entirely — polling or refetch-on-focus via your data-fetching library is sufficient and far simpler |

> ️ **Warning**
> Don't add WebSocket infrastructure because real-time "feels production-grade." It adds meaningful operational complexity (connection management, scaling, reconnection logic). Add it only when a specific MVP feature genuinely requires it.

---

## Common AI Mistakes to Watch For

- **Duplicates server data into Zustand/Redux** "to make it easier to access" — this creates two sources of truth. Push back and keep server state in the query cache.
- **Adds optimistic updates with no rollback handling** — always ask explicitly for the failure path.
- **Recommends Redux Toolkit by default** — for most SaaS MVPs this is more ceremony than needed; ask for justification against your actual team size and state complexity.
- **Stores filter/pagination state in component state instead of the URL** — flag this, it breaks shareable links and refresh behavior.
- **Suggests WebSockets for features that don't need real-time** — confirm there's an actual live-update requirement first.

---

## AI Prompt: Define State Management Patterns

```
I'm defining state management patterns for a production SaaS app.

Context:
- Data fetching library: [e.g., TanStack Query]
- Global state library: [e.g., Zustand]
- Form library: [e.g., React Hook Form + Zod]
- Features needing state: [list 2-3 MVP features with their state needs]

For each feature listed, classify its state into: server state, URL state, local state, or global state, and justify the classification in one line.

Then generate:
1. A query key structure for the server state involved.
2. The global store shape (only genuinely global state — flag anything that looks like it should be server state instead).
3. The Zod schema for any form involved, reusable for both client validation and server-side validation.

Do not put server data into the global store. Do not suggest real-time/WebSocket infrastructure unless I've stated a live-update requirement.
```

---

## Validate Before You Move On

- [ ] Server state lives only in your data-fetching library's cache — no duplication into global state
- [ ] Query keys are structured hierarchically and invalidation targets specific keys, not the whole cache
- [ ] Any optimistic update has a defined rollback path
- [ ] Global store contains only genuinely app-wide state (workspace, UI prefs) — nothing server-derived
- [ ] Form validation schema is shared (or at least mirrored) between client and server
- [ ] Filter/pagination/tab state lives in the URL, not component state
- [ ] Real-time infrastructure exists only if a specific feature requires it

> [!TIP]
> Keep your query key list and global store shape documented — you'll reference both directly during Phase 3 Frontend implementation instead of re-deriving them per feature.

---

**Next:** Backend Architecture — define the server side these state decisions are talking to.
