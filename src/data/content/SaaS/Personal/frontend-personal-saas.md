# Frontend

**Estimated Time:** 35–45 min

---

Your frontend is the only part of your product users ever experience directly.

The backend can be elegant. The database can be perfectly normalized. None of that matters if the interface is slow, confusing, or breaks when something goes wrong.

This module covers how to build a frontend that works correctly, feels fast, and doesn't embarrass your backend.

---

## What the Frontend Is Responsible For

Be deliberate about what belongs here vs. the backend:

| Frontend owns | Backend owns |
|---|---|
| Rendering UI | Business logic |
| Managing UI state | Data validation |
| Calling your API | Authorization |
| Handling loading/error/empty states | Secrets |
| Optimistic updates | Data integrity |

The most common mistake: putting business logic in the frontend because it's easier to access there. Business logic in the frontend can be bypassed. Always treat frontend code as untrusted.

---

## Project Structure

Consistency matters more than perfection. Every new page should know exactly where it belongs.

```
app/
  (auth)/
    login/
      page.tsx
    signup/
      page.tsx
  (dashboard)/
    layout.tsx          ← shared dashboard shell (sidebar, nav)
    dashboard/
      page.tsx
    workspaces/
      page.tsx
      [id]/
        page.tsx
  layout.tsx            ← root layout (fonts, providers)
  page.tsx              ← marketing/landing page

components/
  ui/                   ← primitives (Button, Input, Modal, Badge)
  workspaces/           ← feature-specific components
    WorkspaceCard.tsx
    WorkspaceForm.tsx
  shared/               ← used across features
    EmptyState.tsx
    ErrorBoundary.tsx
    PageHeader.tsx

lib/
  api/                  ← typed API client functions
    workspaces.ts
    users.ts
  hooks/                ← custom React hooks
    useWorkspace.ts
    useCurrentUser.ts
  utils.ts

types/
  index.ts              ← shared TypeScript types
```

> Route groups `(auth)` and `(dashboard)` organize pages without affecting the URL. Use them to apply different layouts to different sections.

---

## Component Philosophy

Three categories. Every component belongs to one.

**UI Primitives** — no business logic, no API calls, fully reusable

```tsx
// components/ui/Button.tsx
// Knows nothing about workspaces, users, or your app
<Button variant="primary" loading={isSubmitting}>Save changes</Button>
```

**Feature Components** — knows about one feature, may receive data as props

```tsx
// components/workspaces/WorkspaceCard.tsx
// Knows about workspaces, renders one card
<WorkspaceCard workspace={workspace} onDelete={handleDelete} />
```

**Page Components** — fetches data, composes feature components, handles page-level state

```tsx
// app/(dashboard)/workspaces/page.tsx
// Fetches all workspaces, renders the list, handles empty/error states
```

Keep these categories clean. A UI primitive that makes API calls is already a feature component.

---

## Data Fetching

How you fetch data determines how your app feels.

### Server Components (Next.js App Router)

Fetch directly in the component. No useEffect, no loading state, no client-side waterfall.

```tsx
// app/(dashboard)/workspaces/page.tsx
import { getWorkspaces } from "@/lib/api/workspaces"

export default async function WorkspacesPage() {
  const workspaces = await getWorkspaces()  // runs on server

  if (workspaces.length === 0) {
    return <EmptyState title="No workspaces yet" action="Create workspace" href="/workspaces/new" />
  }

  return (
    <div>
      {workspaces.map(w => <WorkspaceCard key={w.id} workspace={w} />)}
    </div>
  )
}
```

Use for: pages, layouts, anything that doesn't need interactivity.

### Client Components + React Query

For interactive data — things the user can mutate, refetch, or that need real-time updates.

```tsx
"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export function WorkspaceSettings({ workspaceId }: { workspaceId: string }) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => fetchWorkspace(workspaceId),
  })

  const updateMutation = useMutation({
    mutationFn: (data) => updateWorkspace(workspaceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace", workspaceId] })
    },
  })

  if (isLoading) return <Skeleton />
  if (error) return <ErrorState message="Couldn't load workspace settings." />

  return <WorkspaceForm defaultValues={data} onSubmit={updateMutation.mutate} />
}
```

> **React Query** is the standard for client-side data fetching. It handles caching, refetching, deduplication, and background updates. Don't roll your own with `useState` + `useEffect`.

---

## The Four States You Must Handle

Every piece of data has four states. Design for all of them before writing happy-path code.

| State | What the user sees |
|---|---|
| **Loading** | Skeleton, spinner, or shimmer — never a blank screen |
| **Error** | What went wrong + what they can do about it |
| **Empty** | Explanation + a clear call to action |
| **Success** | The actual content |

```tsx
// Every data-fetching component follows this pattern
if (isLoading) return <WorkspaceSkeleton />
if (error) return <ErrorState message="Couldn't load workspaces." onRetry={refetch} />
if (!workspaces.length) return <EmptyState title="No workspaces" action="Create your first workspace" />

return <WorkspaceList workspaces={workspaces} />
```

> Empty states are not edge cases. They are the first thing every new user sees. Design them intentionally. An empty screen with no direction kills activation.

---

## Forms

Forms are the primary way users write data. Get them right.

**React Hook Form + Zod** is the standard pairing.

```tsx
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, hyphens only"),
})

type FormValues = z.infer<typeof schema>

export function CreateWorkspaceForm() {
  const form = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    try {
      await createWorkspace(values)
      toast.success("Workspace created.")
      router.push(`/workspaces/${values.slug}`)
    } catch (error) {
      toast.error("Couldn't create workspace. Try again.")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Field label="Name" error={form.formState.errors.name?.message}>
        <Input {...form.register("name")} placeholder="My Workspace" />
      </Field>
      <Field label="Slug" error={form.formState.errors.slug?.message}>
        <Input {...form.register("slug")} placeholder="my-workspace" />
      </Field>
      <Button type="submit" loading={form.formState.isSubmitting}>
        Create workspace
      </Button>
    </form>
  )
}
```

Reuse the same Zod schema from your backend validation. One schema, validated in both places.

---

## API Client Layer

Never call `fetch` directly inside components. Create a typed API client.

```typescript
// lib/api/workspaces.ts
import { Workspace } from "@/types"

export async function getWorkspaces(): Promise<Workspace[]> {
  const res = await fetch("/api/workspaces")
  if (!res.ok) throw new Error("Failed to fetch workspaces")
  return res.json()
}

export async function createWorkspace(data: CreateWorkspaceInput): Promise<Workspace> {
  const res = await fetch("/api/workspaces", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error?.message ?? "Failed to create workspace")
  }
  return res.json()
}
```

Benefits:
- One place to update if your API changes
- Typed inputs and outputs
- Error handling in one place
- Easy to mock in tests

---

## Optimistic Updates

Make mutations feel instant. Update the UI before the server responds, roll back if it fails.

```tsx
const deleteMutation = useMutation({
  mutationFn: (id: string) => deleteWorkspace(id),
  onMutate: async (id) => {
    // Cancel any outgoing refetches
    await queryClient.cancelQueries({ queryKey: ["workspaces"] })

    // Snapshot current data
    const previous = queryClient.getQueryData(["workspaces"])

    // Optimistically update
    queryClient.setQueryData(["workspaces"], (old: Workspace[]) =>
      old.filter(w => w.id !== id)
    )

    return { previous }
  },
  onError: (err, id, context) => {
    // Roll back on failure
    queryClient.setQueryData(["workspaces"], context?.previous)
    toast.error("Couldn't delete workspace.")
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["workspaces"] })
  },
})
```

Use for: delete, reorder, toggle — anything that should feel immediate.

---

## UI Component Library

Don't build primitives from scratch. Pick one library and use it consistently.

| Library | Philosophy | Best for |
|---|---|---|
| **shadcn/ui** | Copy-paste components, full ownership | Most SaaS projects — customize everything |
| **Radix UI** | Headless, accessible primitives | If you want full design control |
| **Mantine** | Full-featured, batteries included | Fast build, opinionated style |
| **Chakra UI** | Accessible, composable | Clean default aesthetics |

> **Recommendation:** shadcn/ui. Components live in your codebase — no version lock-in, full customization, excellent accessibility baked in. Pairs perfectly with Tailwind.

---

## Design Consistency

Pick a design system early and don't deviate.

**Spacing** — use a scale, never magic numbers

```tsx
//  Tailwind scale
<div className="p-4 mt-6 gap-3">

//  Arbitrary values
<div style={{ padding: "17px", marginTop: "23px" }}>
```

**Typography** — define once, use everywhere

```tsx
//  Semantic classes
<h1 className="text-2xl font-semibold tracking-tight">
<p className="text-sm text-muted-foreground">

//  Inconsistent inline styles
<h1 style={{ fontSize: "26px", fontWeight: 600 }}>
```

**Color** — use CSS variables, not hardcoded hex

```css
/* Defined once in globals.css */
--primary: 221 83% 53%;
--muted-foreground: 215 16% 47%;
```

Consistent design is not about aesthetics. It's about reducing the decisions users have to make while navigating your product.

---

## Performance Basics

These cost nothing to implement correctly from the start.

**Images** — always use `next/image`

```tsx
import Image from "next/image"
// Automatic lazy loading, WebP conversion, correct sizing
<Image src={user.avatar} alt={user.name} width={40} height={40} />
```

**Fonts** — use `next/font`, never a `<link>` tag to Google Fonts

```tsx
// Eliminates layout shift, self-hosted automatically
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })
```

**Code splitting** — lazy load heavy components

```tsx
import dynamic from "next/dynamic"
const HeavyEditor = dynamic(() => import("@/components/Editor"), {
  loading: () => <Skeleton className="h-64" />,
})
```

**Suspense boundaries** — never block an entire page for one slow component

```tsx
<Suspense fallback={<ActivityFeedSkeleton />}>
  <ActivityFeed workspaceId={id} />
</Suspense>
```

---

## Frontend AI Prompt

```prompt
You are a senior frontend engineer helping me build a React/Next.js component for my SaaS.
My SaaS: [what your app does]
Framework: [Next.js App Router / Vite + React]
UI library: [shadcn/ui / Mantine / other]
Styling: [Tailwind CSS / CSS Modules / other]
Data fetching: [React Query / SWR / server components]
Component I need: [describe the component]
It must handle:
- Loading state
- Error state
- Empty state (if it fetches a list)
- Success state
API routes it calls:
[list the routes from your API design]
Types:
[paste relevant TypeScript types]
Please generate:
1. The full component with all four states handled
2. Any sub-components it needs
3. The typed API client function(s) it calls
4. Accessibility considerations (aria labels, keyboard navigation)
5. Flag any UX improvements I should consider
```

---

## Validating AI-Generated Frontend Code

Before using AI-generated components:

- [ ] All four data states handled (loading, error, empty, success)
- [ ] Forms have validation with user-friendly error messages
- [ ] Buttons disable during submission (no double-submit)
- [ ] API errors surfaced to the user — not silently swallowed
- [ ] No business logic — only UI logic
- [ ] No direct database calls or secret usage
- [ ] Interactive elements are keyboard accessible
- [ ] Images have meaningful `alt` text
- [ ] No hardcoded user IDs, API keys, or environment-specific values

Common AI frontend mistakes:
- Happy-path only — no loading or error handling
- `useEffect` for data fetching instead of React Query
- Business logic inside components
- Inaccessible click handlers on `<div>` instead of `<button>`
- Forms that don't disable on submit (double-submit bugs)
- Hardcoded strings that should be dynamic

---

## Copy and Microcopy

Words in your UI are design decisions.

| Context | Principle | Example |
|---|---|---|
| **Buttons** | State what happens | "Save changes" not "Submit" |
| **Errors** | Say what failed + what to do | "Couldn't save. Check your connection and try again." |
| **Empty states** | Direct, with a call to action | "No members yet. Invite your team to get started." |
| **Destructive actions** | Be specific about what's lost | "Delete workspace? This removes all projects and cannot be undone." |
| **Loading** | Only show if > 300ms | Skeleton preferred over spinner |

Never write "Something went wrong." Tell the user what went wrong and what they can do about it.

---

## Implementation Checklist

Before moving to the next phase:

- [ ] Project structure created and consistent
- [ ] UI library installed and configured
- [ ] Design tokens defined (colors, spacing, typography)
- [ ] Typed API client functions created per resource
- [ ] React Query (or equivalent) configured
- [ ] All four data states handled in every data-fetching component
- [ ] Forms use React Hook Form + Zod
- [ ] Global error boundary in place
- [ ] `next/image` used for all images
- [ ] `next/font` used for typography
- [ ] Route groups set up for auth vs dashboard layouts
- [ ] Empty states designed — not just `null`
- [ ] Destructive actions have confirmation dialogs

---

## What to Build Next

Frontend built. Data flows end-to-end from your database to your UI.

Next: **Emails** — transactional emails your SaaS sends automatically: welcome emails, invitations, password resets, billing receipts.
