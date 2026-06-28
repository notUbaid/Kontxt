---
title: Routing
slug: routing
phase: Phase 3
mode: production
projectType: web-app
estimatedTime: 20–25 min
---

# Routing

Routing in Next.js App Router is file-system based. The folder structure inside `app/` defines your URL structure. Understanding the conventions deeply means your router does exactly what you intend — and you stop fighting it.

This module covers the patterns you'll use on every production project, and the traps that waste hours when you don't know they exist.

---

## File Conventions

Every file in the App Router has a specific role. Using the wrong file for the wrong purpose causes subtle bugs.

| File | Purpose |
|---|---|
| `page.tsx` | The UI for a route — makes the segment publicly accessible |
| `layout.tsx` | Shared shell that wraps `page.tsx` and persists across navigations |
| `loading.tsx` | Automatic Suspense boundary — shown while the page streams in |
| `error.tsx` | Error boundary for the segment — shown when the page throws |
| `not-found.tsx` | Shown when `notFound()` is called in a Server Component |
| `route.ts` | HTTP Route Handler — creates an API endpoint, no UI |
| `template.tsx` | Like layout but remounts on every navigation (rare — use layout by default) |
| `middleware.ts` | Runs at the edge before every request (lives in `src/`, not inside `app/`) |

---

## Route Segments

```
app/
├── page.tsx                    → /
├── dashboard/
│   └── page.tsx                → /dashboard
├── projects/
│   ├── page.tsx                → /projects
│   └── [id]/
│       ├── page.tsx            → /projects/abc123
│       └── edit/
│           └── page.tsx        → /projects/abc123/edit
└── settings/
    ├── page.tsx                → /settings
    ├── profile/
    │   └── page.tsx            → /settings/profile
    └── billing/
        └── page.tsx            → /settings/billing
```

### Dynamic Segments

```
[id]          → /projects/abc123            (single segment)
[...slug]     → /docs/a/b/c                (catch-all — matches one or more)
[[...slug]]   → /docs or /docs/a/b/c       (optional catch-all — matches zero or more)
```

Use dynamic segments for resources identified by ID or slug. Don't use catch-all segments unless you specifically need them — they make route matching harder to reason about.

---

## Route Groups

Folders wrapped in parentheses create organizational groups without affecting the URL.

```
app/
├── (public)/               → no /public in URL
│   ├── layout.tsx          → public layout (nav + footer)
│   ├── page.tsx            → /
│   ├── pricing/
│   │   └── page.tsx        → /pricing
│   └── login/
│       └── page.tsx        → /login
│
└── (app)/                  → no /app in URL
    ├── layout.tsx           → authenticated app layout
    ├── dashboard/
    │   └── page.tsx         → /dashboard
    └── settings/
        └── page.tsx         → /settings
```

Route groups let you apply different layouts to different sections of your app with clean URL paths.

---

## Parallel Routes

Parallel routes render multiple pages simultaneously in the same layout. Use them for:
- Modals that show alongside a page (without losing scroll position)
- Split-panel views
- Tabs with independent loading states

```
app/(app)/
├── layout.tsx
├── @modal/                 ← parallel slot named "modal"
│   └── (.)projects/[id]/   ← intercepted route
│       └── page.tsx
└── projects/
    ├── page.tsx
    └── [id]/
        └── page.tsx
```

**Parallel routes are advanced.** Don't reach for them on day one. Implement modals as client-side state (`useState`) first, then migrate to parallel routes if you need deep-linkable modals.

---

## Intercepting Routes

Intercepting routes let you show a route in a different context — like showing `/projects/abc123` as a modal when navigated from the list, but as a full page when navigated directly.

```
(.)   intercepts same-level routes
(..)  intercepts one level up
(...) intercepts from the root
```

This is how Vercel's dashboard shows deployment details in a modal when you click from the list, but a full page when you open the link directly.

Again: implement this after the basics work. It's powerful but adds meaningful complexity.

---

## Navigation

### Link Component

```tsx
import Link from 'next/link'

// Basic
<Link href="/dashboard">Dashboard</Link>

// With dynamic segment
<Link href={`/projects/${project.id}`}>View Project</Link>

// Prefetch disabled (for rarely visited pages)
<Link href="/admin" prefetch={false}>Admin</Link>
```

`Link` prefetches the linked route in the background when it enters the viewport. For lists of many links (tables, feeds), prefetch is automatic and appropriate. For admin links or rarely used navigation, `prefetch={false}` reduces unnecessary network requests.

### Programmatic Navigation

```tsx
'use client'
import { useRouter } from 'next/navigation'

export function CreateProjectButton() {
  const router = useRouter()

  async function handleCreate() {
    const project = await createProject(formData)
    router.push(`/projects/${project.id}`)
    router.refresh() // revalidate Server Components in the current route
  }
}
```

**`router.refresh()` vs `revalidatePath()`:**

| Method | Where it runs | What it does |
|---|---|---|
| `router.refresh()` | Client component | Re-fetches Server Components for the current URL without a full page reload |
| `revalidatePath('/path')` | Server Action | Purges the Next.js cache for a path — next visit gets fresh data |

After a mutation in a Server Action, call `revalidatePath()`. After a client-side event that should update the current page, call `router.refresh()`.

---

## Loading States with `loading.tsx`

Place a `loading.tsx` file next to any `page.tsx` to get an automatic Suspense boundary:

```tsx
// app/(app)/projects/loading.tsx
import { ProjectListSkeleton } from '@/features/projects/components/ProjectListSkeleton'

export default function Loading() {
  return <ProjectListSkeleton />
}
```

When the user navigates to `/projects`, Next.js immediately shows `Loading` while the page's async Server Component resolves. No manual Suspense wrapping required.

**Granular loading with Suspense:**

For sections within a page that load independently:

```tsx
// app/(app)/dashboard/page.tsx
import { Suspense } from 'react'
import { RecentActivitySkeleton } from '@/features/activity/components/RecentActivitySkeleton'

export default function DashboardPage() {
  return (
    <PageShell title="Dashboard">
      <MetricsRow />          {/* fast — loads immediately */}
      <Suspense fallback={<RecentActivitySkeleton />}>
        <RecentActivity />    {/* slow — loads independently */}
      </Suspense>
    </PageShell>
  )
}
```

This renders the fast content immediately and streams in the slow content without blocking the whole page.

---

## Error Handling with `error.tsx`

```tsx
// app/(app)/projects/error.tsx
'use client' // error boundaries must be client components

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProjectsError({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <p className="text-muted-foreground">Failed to load projects</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

`error.tsx` automatically wraps the `page.tsx` in its segment with a React error boundary. `reset()` retries rendering the page.

Place `error.tsx` at the layout level to catch errors from any page within that layout, or at the page level for more granular control.

---

## `notFound()` and `not-found.tsx`

```tsx
// In a Server Component or Server Action
import { notFound } from 'next/navigation'

const project = await db.project.findUnique({ where: { id } })
if (!project) notFound() // renders the nearest not-found.tsx
```

```tsx
// app/(app)/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <h2 className="text-xl font-semibold">Page not found</h2>
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  )
}
```

Use `notFound()` for both "doesn't exist" and "unauthorized" — never expose which case it is.

---

## Redirect Patterns

```tsx
// Server Component — redirect before rendering
import { redirect } from 'next/navigation'
import { requireSession } from '@/lib/auth'

export default async function ProtectedPage() {
  const session = await requireSession().catch(() => null)
  if (!session) redirect('/login?redirect=/protected-page')

  return <PageContent />
}

// Server Action — redirect after mutation
import { redirect } from 'next/navigation'
'use server'

export async function deleteProject(id: string) {
  await db.project.delete({ where: { id } })
  redirect('/projects') // redirects after the action completes
}
```

`redirect()` in a Server Action throws internally — don't wrap it in try/catch.

---

## Routing Checklist

- [ ] Route groups configured: `(public)` and `(app)` with separate layouts
- [ ] `loading.tsx` added for every page with significant async data fetching
- [ ] `error.tsx` added at the app layout level and any high-risk page level
- [ ] `not-found.tsx` defined for both root and app segments
- [ ] Dynamic routes use cuid/uuid segments, not auto-increment integers
- [ ] `revalidatePath()` called in Server Actions after mutations
- [ ] `notFound()` used for both missing and unauthorized resources (same response, no info leak)
- [ ] Programmatic navigation uses `useRouter` from `next/navigation` (not `next/router`)
- [ ] No `useEffect` + `fetch` for initial data — Server Components used instead

---

## AI Prompt — Route Structure Generation

```prompt
You are a Staff Engineer generating the complete route structure for a Next.js 14 App Router application.

My app: [describe in 2–3 sentences]
Sitemap (from earlier planning):
[paste your sitemap here]

Generate:
1. The complete app/ directory tree with all route files (page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx, route.ts)
2. Route group structure (public vs authenticated vs admin)
3. Which pages need loading.tsx (async data) and which don't
4. Which pages need error.tsx beyond the root-level error boundary
5. Dynamic segment names for resource routes (/projects/[id], etc.)
6. Any Route Handlers needed (webhooks, public API endpoints)

Format as a directory tree. Add a one-line comment next to each file explaining its purpose.
Flag any routing decisions that depend on product choices I need to make first.
```
