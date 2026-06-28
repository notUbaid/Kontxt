---
title: Data Fetching
slug: data-fetching
phase: Phase 3
mode: personal
projectType: web-app
estimatedTime: 35–50 min
---

# Data Fetching

How your frontend gets data from your backend is one of the highest-leverage decisions in your app. Get it right and features are fast to build and easy to debug. Get it wrong and you'll fight loading states, stale data, and race conditions for the entire life of the project.

This module covers the patterns that actually work for a solo developer building a personal web app.

---

## The Core Problem

Your UI needs data. That data lives in a database. Getting it there cleanly involves:

- **When** to fetch (on load, on demand, in the background)
- **Where** to fetch (server or client)
- **What** to do while waiting (loading states)
- **What** to do when it fails (error states)
- **When** to refetch (after mutations, on interval, on focus)

Every data fetching decision touches all five. Most bugs live in the gaps between them.

---

## Server vs Client Fetching

This is the first decision for every piece of data in your app.

| | Server Fetching | Client Fetching |
|---|---|---|
| **When to use** | Initial page data, SEO-critical content | User-triggered actions, real-time updates, personalised content after load |
| **Performance** | Faster first paint, no loading spinner | Requires loading state |
| **Auth** | Session available server-side | Must send auth token with request |
| **Caching** | Framework-level, powerful | In-memory, per component |
| **Best for** | Layouts, pages, static sections | Dashboards, forms, interactive features |

**Rule of thumb:** Fetch on the server unless you have a specific reason not to.

---

## Server Fetching (Next.js App Router)

In the App Router, every component is a server component by default. You can fetch directly inside it.

```typescript
// app/dashboard/page.tsx — runs on the server, no useEffect needed
import { getCurrentUser } from '@/lib/auth'
import { getUserPosts } from '@/services/posts.service'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  const posts = await getUserPosts(user.id)

  return (
    <div>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  )
}
```

No `useEffect`. No loading spinner. No API call. The page arrives with data already in it.

> [!TIP]
> Call your service functions directly from server components. Don't make an HTTP request to your own API from your own server. It's an unnecessary round trip.

---

## Client Fetching with TanStack Query

For data that needs to update after the page loads — user interactions, real-time content, polling — use TanStack Query (formerly React Query). It's the industry standard for a reason.

```bash
npm install @tanstack/react-query
```

```typescript
// app/providers.tsx
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,  // data is fresh for 1 minute
        retry: 1,
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

```typescript
// hooks/use-posts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(r => r.json()),
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostInput) =>
      fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      }).then(r => r.json()),

    onSuccess: () => {
      // invalidate the posts list so it refetches
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}
```

```typescript
// components/post-list.tsx
'use client'
export function PostList() {
  const { data: posts, isLoading, error } = usePosts()

  if (isLoading) return <PostListSkeleton />
  if (error) return <ErrorMessage message="Failed to load posts" />

  return posts.map(post => <PostCard key={post.id} post={post} />)
}
```

TanStack Query handles caching, deduplication, background refetching, and stale data — all the things you'd otherwise build and debug yourself.

---

## Query Keys

Query keys are how TanStack Query identifies and invalidates cached data. They matter more than they look.

```typescript
// Consistent, predictable key structure
const keys = {
  posts: {
    all: ['posts'] as const,
    list: (filters: PostFilters) => ['posts', 'list', filters] as const,
    detail: (id: string) => ['posts', 'detail', id] as const,
  },
  user: {
    profile: (id: string) => ['user', id, 'profile'] as const,
  }
}

// Usage
useQuery({ queryKey: keys.posts.list({ published: true }), queryFn: ... })

// Invalidate all post queries after a mutation
queryClient.invalidateQueries({ queryKey: keys.posts.all })

// Invalidate only a specific post
queryClient.invalidateQueries({ queryKey: keys.posts.detail(postId) })
```

> [!WARNING]
> AI-generated code commonly uses inconsistent or flat query keys like `['posts']` everywhere. This causes stale data bugs where a mutation doesn't trigger a refetch. Define your keys as a typed object and import it everywhere.

---

## Handling Loading and Error States

Every data fetch has three states. Design all three before building the happy path.

```typescript
'use client'
export function PostList() {
  const { data, isLoading, isError, error } = usePosts()

  // Loading state — use a skeleton, not a spinner
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  // Error state — tell the user what happened and what to do
  if (isError) {
    return (
      <div className="rounded-lg border border-destructive p-4">
        <p className="text-sm text-destructive">
          Failed to load posts. {error.message}
        </p>
        <button onClick={() => refetch()} className="mt-2 text-sm underline">
          Try again
        </button>
      </div>
    )
  }

  // Empty state — don't show nothing
  if (data.length === 0) {
    return <EmptyState message="No posts yet. Create your first one." />
  }

  return data.map(post => <PostCard key={post.id} post={post} />)
}
```

Skeletons beat spinners. They communicate shape, not just duration.

---

## Optimistic Updates

For mutations that are very likely to succeed (liking a post, checking a box), update the UI immediately and roll back on failure. It feels instant.

```typescript
export function useToggleLike(postId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => fetch(`/api/posts/${postId}/like`, { method: 'POST' }).then(r => r.json()),

    onMutate: async () => {
      // Cancel in-flight refetches
      await queryClient.cancelQueries({ queryKey: keys.posts.detail(postId) })

      // Snapshot current value
      const previous = queryClient.getQueryData(keys.posts.detail(postId))

      // Optimistically update
      queryClient.setQueryData(keys.posts.detail(postId), (old: Post) => ({
        ...old,
        liked: !old.liked,
        likeCount: old.liked ? old.likeCount - 1 : old.likeCount + 1,
      }))

      return { previous }
    },

    onError: (err, _, context) => {
      // Roll back on failure
      queryClient.setQueryData(keys.posts.detail(postId), context?.previous)
    },
  })
}
```

Only use optimistic updates for simple, idempotent operations. Don't optimistically update a payment.

---

## Avoiding Common Patterns That Cause Problems

### Don't fetch in useEffect

```typescript
// BAD — manual fetching with useEffect
useEffect(() => {
  setLoading(true)
  fetch('/api/posts')
    .then(r => r.json())
    .then(data => {
      setPosts(data)
      setLoading(false)
    })
    .catch(() => setLoading(false))
}, [])
```

This pattern requires you to manually handle: loading state, error state, cleanup, race conditions, stale closures, and refetching. TanStack Query handles all of this. Use it.

---

### Don't over-fetch

```typescript
// BAD — fetching entire objects when you only need a few fields
const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: () => fetch('/api/user').then(r => r.json()) // returns everything
})

// GOOD — fetch only what the component renders
const { data: user } = useQuery({
  queryKey: ['user', 'header'],
  queryFn: () => fetch('/api/user?fields=name,avatarUrl').then(r => r.json())
})
```

Shape your API responses to match what components actually render.

---

### Don't fetch the same data twice

```typescript
// BAD — two components both fetching posts independently
function PostList() { usePosts() }
function PostCount() { usePosts() }

// GOOD — TanStack Query deduplicates automatically
// Both components use the same query key → one request, shared cache
```

TanStack Query deduplicates concurrent requests with the same key. You don't need to coordinate this manually.

---

## Prompt: Generate a Data Fetching Hook

```
Copy Prompt
```

```
I'm building a [description of your app] with:
- Next.js App Router
- TanStack Query for client-side fetching
- API routes at /api/[resource]
- TypeScript

My query key structure:
[paste your keys object]

My API response shape for [resource]:
[paste an example API response]

Generate a complete data fetching module for [resource] that includes:
1. A typed query hook (useResource)
2. A typed mutation hook for create (useCreateResource)
3. A typed mutation hook for update (useUpdateResource)
4. A typed mutation hook for delete (useDeleteResource)

Requirements:
- All hooks must use the query key structure above
- Mutations must invalidate relevant queries on success
- No useEffect or manual fetch calls
- Full TypeScript types for inputs and responses
- onError handlers that log the error (console.error is fine)

Output only the hook file. No component code. No test files.
```

---

## Validation Checklist

Review every data fetching implementation for these:

- [ ] Loading state renders a skeleton or meaningful placeholder
- [ ] Error state gives the user a way to recover (retry button)
- [ ] Empty state is handled — never renders nothing
- [ ] Mutations invalidate the correct query keys after success
- [ ] Query keys are consistent and use the shared key object
- [ ] No `useEffect` is used for fetching (use TanStack Query instead)
- [ ] API responses use `select` — no sensitive fields returned
- [ ] Server components fetch directly from services, not via HTTP

---

## What Comes Next

With data flowing cleanly between your backend and frontend:

- **Browser APIs** — client-side capabilities like local storage, notifications, and file handling
- **Performance** — identifying slow queries and slow renders before they reach users
- **Deployment** — getting this running somewhere people can actually use it

Data fetching is infrastructure. When it works, nobody notices. When it doesn't, everything breaks. The patterns in this module scale from a personal project to a production app without needing to be replaced.
