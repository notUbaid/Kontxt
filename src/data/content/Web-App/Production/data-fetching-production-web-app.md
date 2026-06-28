---
title: Data Fetching
slug: data-fetching
phase: Phase 3
mode: production
projectType: web-app
estimatedTime: 30–40 min
---

# Data Fetching

Data fetching is where most frontend applications break under real-world conditions.

Not because fetching data is hard. Because production data fetching requires handling pagination, race conditions, optimistic updates, cache invalidation, error recovery, and offline states — simultaneously, correctly, every time.

This module covers how experienced engineers approach data fetching at scale.

---

## The Fetching Stack

In a Next.js 14 App Router application, data fetching happens in two distinct environments:

```
┌──────────────────────────────────────────────┐
│              SERVER COMPONENTS               │
│  Direct DB calls, fetch() with Next.js cache │
│  Runs at build time, request time, or edge   │
│  No loading states — data is ready at render │
├──────────────────────────────────────────────┤
│              CLIENT COMPONENTS               │
│  TanStack Query — cache, sync, refetch       │
│  Handles loading, error, stale, background   │
│  SWR is an alternative but Query is richer   │
└──────────────────────────────────────────────┘
```

**Rule:** Fetch as high up the tree as possible, as close to the data source as possible. Server components fetching directly from a database are faster than client components fetching through an API endpoint that fetches from a database.

---

## Server Component Data Fetching

Prefer this. No loading states. No waterfalls from the client's perspective. Data arrives with the HTML.

```typescript
// app/dashboard/page.tsx — direct DB access in server component
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await getSession()
  
  // These run in parallel — don't await sequentially
  const [user, stats, recentActivity] = await Promise.all([
    db.user.findUnique({ where: { id: session.userId } }),
    db.analytics.getStats({ userId: session.userId }),
    db.activity.findMany({ where: { userId: session.userId }, take: 10 }),
  ])

  return <Dashboard user={user} stats={stats} activity={recentActivity} />
}
```

> ⚠️ **Warning:** Never await sequentially when requests are independent. Sequential awaits create waterfalls — each request waits for the previous to complete. `Promise.all` runs them in parallel.

```typescript
// ❌ Sequential — 300ms + 200ms + 150ms = 650ms total
const user = await getUser(id)
const posts = await getUserPosts(id)
const followers = await getUserFollowers(id)

// ✅ Parallel — max(300ms, 200ms, 150ms) = 300ms total
const [user, posts, followers] = await Promise.all([
  getUser(id),
  getUserPosts(id),
  getUserFollowers(id),
])
```

---

## Next.js Fetch Cache

Next.js extends the native `fetch` API with caching semantics. This is how you control staleness at the data level without touching your rendering strategy.

```typescript
// Default — cached indefinitely (like SSG)
const data = await fetch('https://api.example.com/data')

// Revalidate every 60 seconds (like ISR)
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
})

// Never cache — fresh on every request (like SSR)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})

// Tag-based revalidation — revalidate from anywhere
const data = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] }
})

// Later, in a Server Action or API route:
import { revalidateTag } from 'next/cache'
revalidateTag('posts') // purges all fetches tagged 'posts'
```

**Tag-based revalidation is powerful.** When a user creates a post, call `revalidateTag('posts')` and every cached fetch tagged `posts` refreshes on next request — across the entire app.

---

## TanStack Query: Production Patterns

### Pagination

```typescript
// Offset-based pagination
export function usePaginatedPosts(page: number) {
  return useQuery({
    queryKey: ['posts', { page }],
    queryFn: () => fetchPosts({ page, limit: 20 }),
    placeholderData: keepPreviousData, // keeps old data visible while new page loads
  })
}

function PostsList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isPlaceholderData } = usePaginatedPosts(page)

  return (
    <div>
      {data?.posts.map(post => <PostCard key={post.id} post={post} />)}
      <div className="flex gap-2">
        <Button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage(p => p + 1)}
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

### Infinite Scroll

```typescript
export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam }) => fetchPosts({ cursor: pageParam, limit: 20 }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}

function InfiniteFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePosts()
  const observerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer triggers fetchNextPage when bottom is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting && hasNextPage) fetchNextPage() },
      { threshold: 0.1 }
    )
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage])

  return (
    <div>
      {data?.pages.flatMap(page => page.posts).map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      <div ref={observerRef}>
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  )
}
```

---

## Optimistic Updates

Update the UI immediately. Roll back if the server rejects it. This is what makes apps feel fast.

```typescript
export function useLikePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) =>
      fetch(`/api/posts/${postId}/like`, { method: 'POST' }).then(r => r.json()),

    onMutate: async (postId) => {
      // Cancel in-flight queries for this post
      await queryClient.cancelQueries({ queryKey: ['posts', postId] })

      // Snapshot current value
      const previousPost = queryClient.getQueryData(['posts', postId])

      // Optimistically update
      queryClient.setQueryData(['posts', postId], (old: Post) => ({
        ...old,
        likeCount: old.likeCount + 1,
        isLikedByUser: true,
      }))

      // Return snapshot for rollback
      return { previousPost }
    },

    onError: (err, postId, context) => {
      // Rollback on failure
      queryClient.setQueryData(['posts', postId], context?.previousPost)
    },

    onSettled: (data, error, postId) => {
      // Always refetch after mutation settles (success or failure)
      queryClient.invalidateQueries({ queryKey: ['posts', postId] })
    },
  })
}
```

---

## Error Handling

Data fetching errors need to be caught at multiple levels.

### Query-level errors

```typescript
function PostCard({ postId }: { postId: string }) {
  const { data, error, isError, refetch } = usePost(postId)

  if (isError) {
    return (
      <div className="rounded border border-destructive p-4">
        <p className="text-sm text-destructive">Failed to load post.</p>
        <Button variant="ghost" size="sm" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return <Post data={data} />
}
```

### Error Boundaries for unexpected failures

```typescript
// error.tsx in Next.js App Router — catches rendering errors
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error monitoring service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

### API response error handling

```typescript
// lib/api.ts — centralized fetch wrapper
export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new ApiError(error.message, response.status)
  }

  return response.json()
}

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'ApiError'
  }
}
```

---

## Prefetching

Load data before the user navigates to it. Makes navigation feel instant.

```typescript
// Prefetch on hover — data is ready when they click
function NavLink({ href, queryKey, queryFn, children }) {
  const queryClient = useQueryClient()

  return (
    <Link
      href={href}
      onMouseEnter={() => {
        queryClient.prefetchQuery({ queryKey, queryFn, staleTime: 60_000 })
      }}
    >
      {children}
    </Link>
  )
}

// Prefetch in server component and hydrate on client
// app/dashboard/page.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/query-client'

export default async function DashboardPage() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardStats /> {/* client component — data already in cache */}
    </HydrationBoundary>
  )
}
```

---

## Real-Time Data

For live updates: choose the right primitive for the update frequency.

```
Update frequency → Tool
Every few minutes → TanStack Query refetchInterval
Every few seconds → Server-Sent Events (SSE)
Sub-second, bidirectional → WebSockets
```

```typescript
// Polling — simplest, use when updates are infrequent
const { data } = useQuery({
  queryKey: ['notifications'],
  queryFn: fetchNotifications,
  refetchInterval: 30_000, // every 30 seconds
  refetchIntervalInBackground: false, // pause when tab is hidden
})

// Server-Sent Events — server pushes updates, client receives
useEffect(() => {
  const eventSource = new EventSource('/api/events')

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    queryClient.setQueryData(['notifications'], data)
  }

  return () => eventSource.close()
}, [])
```

---

## Suspense Integration

Combine TanStack Query with React Suspense for cleaner loading state management.

```typescript
// useSuspenseQuery — throws a promise, caught by Suspense boundary
function PostList() {
  const { data } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  // No isLoading check needed — if we're here, data exists
  return data.map(post => <PostCard key={post.id} post={post} />)
}

// Parent handles loading declaratively
function Feed() {
  return (
    <ErrorBoundary fallback={<FeedError />}>
      <Suspense fallback={<FeedSkeleton />}>
        <PostList />
      </Suspense>
    </ErrorBoundary>
  )
}
```

---

## Cache Invalidation Strategy

The hardest part. Make a plan before you need it.

```typescript
// After creating a post — invalidate the posts list
const createPost = useMutation({
  mutationFn: postData => apiFetch('/api/posts', { method: 'POST', body: JSON.stringify(postData) }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
    // Also invalidate user's post count
    queryClient.invalidateQueries({ queryKey: ['users', userId, 'stats'] })
  },
})

// After updating a post — update cache directly, avoid refetch
const updatePost = useMutation({
  mutationFn: ({ id, ...data }) => apiFetch(`/api/posts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  onSuccess: (updatedPost) => {
    // Update specific post in cache
    queryClient.setQueryData(['posts', updatedPost.id], updatedPost)
    // Update the post in the list cache if it exists
    queryClient.setQueriesData({ queryKey: ['posts'] }, (old: PostList) =>
      old ? { ...old, posts: old.posts.map(p => p.id === updatedPost.id ? updatedPost : p) } : old
    )
  },
})
```

**Decision rule:**
- **Invalidate** when you can't predict exactly what changed (e.g., sort order might shift)
- **Update directly** when you know exactly what changed (saves a network request)

---

## AI Prompt: Data Fetching Architecture Review

```
You are a senior frontend engineer reviewing data fetching architecture for a production Next.js 14 app using TanStack Query and the App Router.

My app: [describe your app briefly]

Here are my current data fetching patterns:
[paste representative examples of how you're fetching data]

Key data relationships:
[describe which data depends on other data, e.g., "posts belong to users, comments belong to posts"]

Review and:
1. Identify any client-side fetching that should move to server components
2. Find any sequential awaits that should be parallelized with Promise.all
3. Audit my query key structure for invalidation correctness
4. Identify mutations missing cache updates or invalidations
5. Flag any missing error handling or loading states
6. Recommend where prefetching would meaningfully improve UX

Output specific code corrections, not general advice.
```

---

## Implementation Checklist

- [ ] `QueryClientProvider` wraps the app with sensible `defaultOptions`
- [ ] Server components fetch data directly — no client fetch for static/SSR data
- [ ] Independent server-side fetches use `Promise.all` — no sequential awaits
- [ ] TanStack Query used for all client-side data fetching (no raw `useEffect`)
- [ ] Query keys are hierarchical and consistent
- [ ] All mutations handle `onSuccess` cache updates or invalidations
- [ ] Optimistic updates implemented for frequent user actions (likes, toggles)
- [ ] Paginated lists use `keepPreviousData` to avoid layout shift
- [ ] Infinite scroll uses `useInfiniteQuery` with Intersection Observer
- [ ] API fetch wrapper throws typed errors — not raw `response.ok` checks scattered everywhere
- [ ] Error boundaries catch rendering failures at page and section level
- [ ] `useSuspenseQuery` used with `<Suspense>` for declarative loading states

---

## Common Mistakes

**Fetching in `useEffect` with `useState`.**
Race conditions, stale closures, memory leaks on unmount, no deduplication. Every problem TanStack Query solves. There is no production justification for this pattern.

**Query keys that aren't specific enough.**
`['posts']` and `['user-posts']` are unrelated keys. When you invalidate `['posts']` after creating a post, the user's post list (under `['user-posts']`) doesn't update. Use hierarchical keys: `['posts']`, `['posts', userId]`, `['posts', userId, 'drafts']`.

**Not parallelizing independent server-side fetches.**
Sequential `await` in a server component adds latency directly to TTFB. Always `Promise.all` independent requests.

**Invalidating too broadly.**
`queryClient.invalidateQueries()` with no key argument invalidates everything. One mutation triggers refetches across your entire app. Be specific.

**Missing rollback in optimistic updates.**
If you update the UI optimistically and the server returns an error, the UI and server are now out of sync. Always implement `onError` rollback when using `onMutate`.

---

## Quick Reference

```
Static server data?              → fetch() with next: { revalidate }
Dynamic server data?             → fetch() with cache: 'no-store'
Client-side data?                → TanStack Query useQuery
Mutations?                       → useMutation + onSuccess invalidation
Pagination?                      → useQuery + keepPreviousData
Infinite scroll?                 → useInfiniteQuery
Instant UI feedback?             → Optimistic updates with onMutate
Live updates (infrequent)?       → refetchInterval
Live updates (frequent)?         → SSE or WebSocket
```

---

## What's Next

**Form Handling** — data fetching and form submission are two sides of the same coin. The next module covers how to build forms that validate, submit, handle errors, and integrate cleanly with your TanStack Query mutation layer.
