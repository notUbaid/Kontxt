---
title: Frontend Architecture
slug: frontend-architecture
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Frontend Architecture

This is where you decide *how* your frontend is structured before you write features into it — rendering strategy, folder structure, and data flow patterns. Get this wrong and every new feature fights the structure instead of fitting into it. This phase produces decisions, not code; actual implementation happens in Phase 3.

---

## Decision 1: Rendering Strategy Per Route Type

Not every page in your SaaS should render the same way. Decide this per route category, not as one global rule.

| Route type | Recommended strategy | Why |
|---|---|---|
| Marketing pages (landing, pricing) | Static (SSG) | Fast, cacheable, good for SEO |
| Authenticated dashboard pages | Server-rendered with client-side interactivity | Data is per-user, can't be statically cached; still want fast first paint |
| Highly interactive views (live data, drag-and-drop) | Client-rendered after initial shell | Server rendering adds no value once it's all client-side state anyway |

> ⚠️ **Warning**
> Don't make everything a client component by default just because it's the path of least resistance in a component-based framework. Over-using client components increases bundle size and pushes data-fetching waterfalls to the browser, slowing down the exact dashboard pages where users expect speed.

---

## Decision 2: Folder Structure

> **Decision Card — Organize by Feature, Not by File Type**
> Avoid `components/`, `hooks/`, `utils/` as your top-level organization once the app grows past a handful of features — you'll end up scrolling through 40 unrelated files to find what touches one feature. Instead:

```
/app
  /dashboard
    /invoices
      page.tsx
      invoice-list.tsx
      invoice-detail.tsx
      use-invoices.ts
  /settings
    /billing
      page.tsx
      billing-form.tsx
/lib            # shared utilities, API client, shared types
/components/ui  # shared design-system components only
```

Shared, generic UI primitives live in one place (your Design System output). Feature-specific components live next to the feature that uses them.

---

## Decision 3: Data Fetching Pattern

| Pattern | Use when |
|---|---|
| Server-side fetch on initial load (Server Components / loaders) | Default for dashboard pages — data needed before first paint |
| Client-side fetching with a cache library (TanStack Query, SWR) | Data that updates frequently, needs refetching, optimistic updates, or pagination |
| Direct fetch in `useEffect` | Almost never — this pattern causes waterfalls, race conditions, and missing loading/error handling that a proper library already solves |

> ✅ **Best Practice**
> Pick **one** client-side data fetching library (TanStack Query is the current standard) and use it everywhere you need client-side fetching. Mixing raw `fetch` calls, `useEffect`, and a cache library across different features is a common source of stale-data bugs.

---

## Decision 4: State Management Boundaries

Decide what kind of state goes where *before* you build, so it's not a per-feature debate:

- **Server state** (data from your API) → your data-fetching library's cache, not duplicated into local state
- **URL state** (filters, selected tab, pagination page) → the URL itself, so it's shareable and survives refresh
- **Local UI state** (modal open/closed, form input before submit) → component state, nothing fancier needed
- **Global client state** (current user, current workspace, theme) → a lightweight global store, only for things genuinely needed app-wide

> ⚠️ **Warning**
> Don't reach for a global state library to solve a problem that's actually server state. The most common frontend architecture mistake in SaaS apps is duplicating server data into global state and then fighting to keep both in sync. Let your data-fetching library own server state entirely.

---

## Decision 5: Error & Loading Boundaries

Production frontends need explicit boundaries, not ad-hoc per-component handling:

- [ ] A top-level error boundary that catches unexpected render errors and shows a recovery UI, not a blank screen
- [ ] Route-level loading states (skeleton screens) consistent with what you defined in Wireframes
- [ ] A clear pattern for "this API call failed" vs. "this component crashed" — these need different handling

---

## Common AI Mistakes to Watch For

- **Defaults everything to client components** — ask explicitly which components need to be client vs. server, don't accept the default.
- **Mixes data fetching libraries** — uses raw `fetch` in one feature and TanStack Query in another within the same generated output.
- **Duplicates server data into local/global state** "for convenience" — flag and correct this pattern.
- **Organizes by file type** (`components/`, `hooks/`, `utils/`) instead of by feature — push back and ask for feature-based structure once the app has more than a few features.
- **Skips error boundaries entirely** — happy-path-only code is the default unless you ask for failure handling explicitly.

---

## AI Prompt: Define Your Frontend Architecture

```
I'm defining the frontend architecture for a production SaaS app before writing feature code.

Context:
- Framework: [from Tech Stack Selection]
- Route types: marketing pages, authenticated dashboard, [any other category]
- Data fetching library of choice: [e.g., TanStack Query]

Generate:
1. A rendering strategy recommendation per route type above (server/static/client), with a one-line reason for each.
2. A feature-based folder structure for these initial features: [list 2-3 MVP features].
3. A state management boundary table: what counts as server state, URL state, local state, and global state for this app specifically.
4. A description of where the top-level error boundary and route-level loading states should live.

Do not default everything to client components — justify each rendering choice. Flag anywhere a global state library is being used for something that should be server state instead.
```

---

## Validate Before You Move On

- [ ] Rendering strategy is decided per route type, not applied as one blanket rule
- [ ] Folder structure is feature-based, with shared UI primitives separated out
- [ ] One data-fetching pattern/library is chosen and used consistently
- [ ] Server state, URL state, local state, and global state each have a clear, distinct home
- [ ] A top-level error boundary and consistent loading states exist
- [ ] You can name, for any given feature, exactly where its code should live

> 💡 **Tip**
> This architecture doc becomes the context you paste at the start of every Phase 3 Frontend coding session — it keeps AI-generated code consistent with decisions made here instead of reinventing structure per feature.

---

**Next:** State Management — go deeper on the global and cross-feature state patterns introduced here.
