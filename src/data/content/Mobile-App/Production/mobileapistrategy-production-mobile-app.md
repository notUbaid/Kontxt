---
title: API Strategy
slug: api-strategy
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 35–45 min
---

# API Strategy

Your API is the contract between your mobile app and your backend.

Unlike a web app where you control both ends and can change them simultaneously, a mobile app ships a binary to millions of devices. Once that binary is live, the API it expects must keep working — even after you release version 2.0, even when users refuse to update, even when you have rebuilt your entire backend.

API strategy for mobile is about designing that contract to be stable, efficient, and evolvable without breaking the clients you cannot force to update.

---

## The Mobile API Contract Problem

Web apps are stateless from a versioning perspective: you deploy a new frontend, every user immediately gets it. Mobile apps are not.

At any point in time, your backend must serve:
- Users on the current version
- Users one version behind (refused to update)
- Users two or three versions behind (common in enterprise and low-engagement users)

This means:
- You cannot remove an API field without a deprecation window
- You cannot change the shape of a response without a migration strategy
- You cannot rename an endpoint without keeping the old one alive

Plan for this from day one. It is much harder to retrofit API versioning into a system that was not designed for it.

---

## API Style — REST vs GraphQL vs tRPC

| Style | When to Use |
|---|---|
| **REST** | Default. Well-understood, easy to cache, works with any mobile stack. |
| **GraphQL** | Complex data graphs, multiple client types with different data needs, teams with GraphQL experience. |
| **tRPC** | TypeScript monorepo where frontend and backend are co-developed. Type safety without code generation. |

**For most production mobile apps: REST.**

GraphQL adds real benefits at scale but front-loads significant infrastructure complexity. tRPC requires TypeScript on both ends and is awkward across separate repositories. REST is universally understood, easy to cache, and has the best tooling for mobile clients.

---

## API Versioning

Version your API from the start. Adding versioning later requires coordination across all deployed clients — painful at best, breaking at worst.

### URL versioning (recommended)

```
https://api.yourdomain.com/v1/users
https://api.yourdomain.com/v1/posts
https://api.yourdomain.com/v2/users  ← breaking change introduced here
```

```ts
// Express — versioned router
import { Router } from 'express'
import v1Routes from './v1/routes'
import v2Routes from './v2/routes'

app.use('/v1', v1Routes)
app.use('/v2', v2Routes)
```

### Versioning rules

**Non-breaking changes** — safe to make without a version bump:
- Adding new optional fields to a response
- Adding new optional query parameters
- Adding new endpoints
- Relaxing validation rules

**Breaking changes** — require a new version:
- Removing fields from a response
- Renaming fields
- Changing a field's data type
- Making optional parameters required
- Changing authentication requirements

**Deprecation process:**
1. Ship new version with improved endpoint
2. Mark old endpoint as deprecated in documentation and response headers
3. Monitor usage of old endpoint (track via analytics or logs)
4. Remove old endpoint only when usage drops to near zero — or after a defined sunset period (minimum 3–6 months)

```ts
// Signal deprecation in response headers
res.set('Deprecation', 'true')
res.set('Sunset', 'Sat, 01 Jan 2026 00:00:00 GMT')
res.set('Link', '<https://api.yourdomain.com/v2/users>; rel="successor-version"')
```

---

## Endpoint Design

### Resource naming

```
GET    /v1/users              — list users
POST   /v1/users              — create user
GET    /v1/users/:id          — get specific user
PATCH  /v1/users/:id          — partial update
DELETE /v1/users/:id          — delete user

GET    /v1/users/:id/posts    — posts belonging to a user
POST   /v1/posts/:id/like     — actions as sub-resources
```

Rules:
- Nouns, not verbs (`/users`, not `/getUsers`)
- Plural resource names (`/posts`, not `/post`)
- `PATCH` for partial updates, `PUT` only for full replacement
- Actions that do not map to CRUD become sub-resources (`/posts/:id/publish`)

### Response shape

Consistent across every endpoint — your mobile client deserves one response handler:

```ts
// Success
{
  "data": { ... },           // Single resource
  "meta": { ... }            // Optional: pagination, totals
}

// Success — list
{
  "data": [ ... ],
  "meta": {
    "total": 142,
    "nextCursor": "eyJpZCI6MTIzfQ==",
    "hasMore": true
  }
}

// Error
{
  "data": null,
  "error": {
    "code": "RESOURCE_NOT_FOUND",     // Machine-readable
    "message": "Post not found",      // Human-readable
    "field": null                     // For validation errors: which field
  }
}
```

### Error codes

Define a set of error codes your mobile client handles explicitly:

```ts
export const API_ERROR_CODES = {
  // Auth
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',

  // Resources
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',

  // Permissions
  FORBIDDEN: 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',

  // Rate limiting
  RATE_LIMITED: 'RATE_LIMITED',

  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const
```

Machine-readable codes let your mobile app respond specifically — show a "Try again in 30 seconds" message for `RATE_LIMITED`, not a generic error toast.

---

## Mobile-Optimised API Patterns

### Sparse fieldsets

Mobile screens rarely need every field on a resource. Let clients request only what they need:

```
GET /v1/posts?fields=id,title,author.name,thumbnail_url
```

```ts
app.get('/v1/posts', async (req, res) => {
  const requestedFields = req.query.fields?.toString().split(',')
  const posts = await db.posts.findMany({
    select: buildSelect(requestedFields),
  })
  res.json({ data: posts })
})
```

### Compound documents

Mobile apps frequently need related data. Avoid requiring a separate request per relationship:

```
GET /v1/posts/:id?include=author,comments,reactions
```

```ts
// Server — include related resources in one response
const post = await db.posts.findUnique({
  where: { id: req.params.id },
  include: {
    author: req.query.include?.includes('author'),
    comments: req.query.include?.includes('comments'),
  },
})
```

This reduces round trips — critical on mobile networks where each request adds 100–500ms of latency.

### Client-driven pagination

Always paginate. Cursor-based for feeds and timelines, offset for admin/search:

```ts
// Cursor pagination — stable under concurrent writes
GET /v1/posts?cursor=eyJpZCI6MTIzfQ&limit=20

// Offset pagination — acceptable for search results
GET /v1/search?q=hello&page=2&limit=20
```

### App version header

Send the app version with every request. This lets your backend serve version-specific responses and track which versions are still active:

```ts
// Mobile — add to every request
api.interceptors.request.use(config => {
  config.headers['X-App-Version'] = Constants.expoConfig?.version ?? '1.0.0'
  config.headers['X-Platform'] = Platform.OS
  return config
})
```

```ts
// Server — use for analytics and minimum version enforcement
app.use((req, res, next) => {
  const appVersion = req.headers['x-app-version']
  const platform = req.headers['x-platform']

  if (appVersion && isBelowMinimumVersion(appVersion, platform)) {
    return res.status(410).json({
      data: null,
      error: {
        code: 'APP_VERSION_UNSUPPORTED',
        message: 'Please update the app to continue.',
        updateUrl: getStoreUrl(platform),
      }
    })
  }

  next()
})
```

---

## API Client Architecture (Mobile)

A well-structured API client on the mobile side prevents the same concerns from being scattered across every screen.

```ts
// lib/api/client.ts — base client
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

export const apiClient = axios.create({
  baseURL: `${process.env.API_URL}/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Version': Constants.expoConfig?.version ?? '1.0.0',
    'X-Platform': Platform.OS,
  },
})

// Auth injection
apiClient.interceptors.request.use(async config => {
  const token = await SecureStore.getItemAsync('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

```ts
// lib/api/posts.ts — resource-specific module
import { apiClient } from './client'
import type { Post, PaginatedResponse } from '@/types'

export const postsApi = {
  list: (cursor?: string) =>
    apiClient.get<PaginatedResponse<Post>>('/posts', {
      params: { cursor, limit: 20 },
    }),

  get: (id: string) =>
    apiClient.get<{ data: Post }>(`/posts/${id}`, {
      params: { include: 'author,reactions' },
    }),

  create: (body: CreatePostInput) =>
    apiClient.post<{ data: Post }>('/posts', body),

  delete: (id: string) =>
    apiClient.delete(`/posts/${id}`),
}
```

This pattern means every screen imports `postsApi.list()` — not raw `axios.get('/v1/posts?cursor=...')`. One place to update when the API changes.

---

## Request Resilience

Mobile networks are unreliable. Your API client must handle failure gracefully.

### Timeouts

```ts
// Set per-request timeouts — never let a request hang indefinitely
const apiClient = axios.create({
  timeout: 10000,  // 10 seconds default
})

// Override for slow operations (file uploads, AI generation)
apiClient.get('/ai/generate', { timeout: 60000 })
```

### Retry with exponential backoff

```ts
import axiosRetry from 'axios-retry'

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,   // 1s, 2s, 4s
  retryCondition: error =>
    axiosRetry.isNetworkError(error) ||      // Network failure
    axiosRetry.isIdempotentRequestError(error), // 5xx on GET/HEAD/OPTIONS
})
```

Only retry idempotent requests automatically. Never automatically retry POST, PATCH, or DELETE — you risk duplicate mutations.

### Offline detection

```ts
import NetInfo from '@react-native-community/netinfo'

export async function withConnectivityCheck<T>(request: () => Promise<T>): Promise<T> {
  const state = await NetInfo.fetch()

  if (!state.isConnected) {
    throw new ApiError('OFFLINE', 'No internet connection. Please try again.')
  }

  return request()
}
```

---

## AI Prompt — API Design Review

```
You are a senior API engineer reviewing the API strategy for a production mobile app.

My app: [one-sentence description]
Backend: [stack — e.g. Node.js/Express, FastAPI, Supabase]
Mobile clients: [React Native / Flutter / both]
Expected API endpoints: [list your main resource endpoints]

Core mobile requirements:
- [e.g. offline support, realtime updates, large media uploads, AI generation]

Review my API strategy and identify:

1. Versioning — am I set up to evolve the API without breaking existing app versions?
2. Response shape — is my envelope consistent and mobile-appropriate?
3. Pagination — am I using the right strategy for each endpoint type?
4. N+1 risks — which endpoints will cause excessive requests on mobile?
   Recommend compound document or batch solutions.
5. Resilience gaps — what failure modes am I not handling?
6. The 3 API design decisions most likely to cause pain in 12 months

For each finding, provide a specific, actionable recommendation.
Be direct. Skip generic REST best practices I already know.
```

---

## Validation Checklist

**Versioning**
- [ ] API is versioned from the first endpoint (`/v1/`)
- [ ] Versioning strategy documented — what constitutes a breaking change
- [ ] App sends `X-App-Version` and `X-Platform` headers with every request
- [ ] Minimum version enforcement implemented on the server

**Endpoint design**
- [ ] All endpoints use consistent response envelope (`data`, `meta`, `error`)
- [ ] Machine-readable error codes defined and documented
- [ ] All list endpoints paginated — no unbounded responses
- [ ] `PATCH` used for partial updates, not `PUT`

**Mobile optimisation**
- [ ] Related data fetchable via `?include=` to reduce round trips
- [ ] Field selection available on expensive list endpoints
- [ ] Cursor-based pagination on feeds and timelines

**API client (mobile)**
- [ ] One base client module — auth, headers, timeout configured centrally
- [ ] Resource-specific modules wrap each API domain
- [ ] Timeout set on all requests (default ≤ 10 seconds)
- [ ] Retry logic implemented for network errors on idempotent requests only
- [ ] Offline detection surfaces a clear error to the user

**Contract stability**
- [ ] Non-breaking changes policy defined
- [ ] Breaking changes require version bump — documented
- [ ] Deprecation headers sent on endpoints scheduled for removal
- [ ] Old endpoint versions monitored before removal
