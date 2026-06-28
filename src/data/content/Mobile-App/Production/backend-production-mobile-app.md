---
title: Backend
slug: backend
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 35–50 min
---

# Backend

Your mobile app's backend is not a web server with a mobile client bolted on.

It is an API designed around mobile constraints: unreliable networks, battery limitations, offline scenarios, and clients you cannot hot-patch after release. A decision you make in your backend architecture today will shape what is possible — and what is painful — for the entire lifetime of your app.

This module covers how to design a backend that serves mobile clients well.

---

## The Core Architectural Decision

Before writing a line of backend code, answer this:

**Are you building your own backend or using a Backend as a Service (BaaS)?**

| Approach | When to Choose It | Trade-off |
|---|---|---|
| **BaaS** (Supabase, Firebase) | Standard CRUD, auth, storage, realtime | Fast to build, harder to customise deeply |
| **Custom API** (Node.js, FastAPI, Go) | Complex business logic, AI processing, fine-grained control | Full control, full responsibility |
| **Hybrid** | BaaS for auth/storage + custom API for complex logic | Best of both — most production apps end up here |

Most production mobile apps use a hybrid approach. Supabase or Firebase handles auth and basic data access. A custom service handles anything requiring real computation, AI, payments, or complex orchestration.

---

## BaaS Option — Supabase

Supabase is a PostgreSQL-backed platform with auto-generated REST and GraphQL APIs, realtime subscriptions, auth, and storage.

**What it gives you immediately:**
- Auth (email, OAuth, magic links, phone)
- Row Level Security — database-level access control
- Auto-generated REST API from your database schema
- Realtime subscriptions via WebSocket
- Storage for files and media
- Edge Functions for custom server logic

**Mobile client setup:**
```bash
npm install @supabase/supabase-js
```

```ts
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Database } from '@/types/supabase'

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,        // Persist session on device
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,    // Required for React Native
    },
  }
)
```

**Row Level Security — always enable it:**
```sql
-- Users can only read their own data
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only update their own data
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = user_id);
```

Without RLS, every authenticated user can read every row. Enable RLS on every table before you go live.

---

## BaaS Option — Firebase

Firebase uses Firestore (NoSQL document database), Firebase Auth, Cloud Storage, and Cloud Functions.

**When to prefer Firebase over Supabase:**
- Your data is naturally hierarchical or document-shaped
- You need deep Android/iOS SDK integration (FCM push notifications, Analytics)
- Your team has existing Firebase experience

**Firestore security rules — always set these:**
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Public read, authenticated write
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

>  **Warning:** The default Firestore rules allow anyone to read and write anything. New Firebase projects start with `allow read, write: if false` since 2023 — but verify this in your console. Never deploy with open rules.

---

## Custom API Design for Mobile

If you are building a custom backend, design your API with mobile constraints in mind.

### Response shape

Mobile apps have limited bandwidth and parsing is expensive. Keep responses lean.

```ts
// Standard response envelope — consistent across all endpoints
{
  "data": { ... },      // The actual payload
  "meta": {             // Optional pagination, counts
    "total": 142,
    "page": 1,
    "limit": 20
  },
  "error": null         // null on success, error object on failure
}

// Error response
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "field": "email"    // For form validation
  }
}
```

Consistent envelope means your mobile client can have one response handler instead of one per endpoint.

### Field selection

Do not return 40 fields when the mobile client needs 6. Add field selection for expensive or list endpoints.

```ts
// Query params: GET /api/users?fields=id,name,avatar_url
app.get('/api/users', async (req, res) => {
  const fields = req.query.fields?.split(',') ?? ['*']
  const users = await db.users.findMany({ select: fields })
  res.json({ data: users })
})
```

### Pagination

Never return unbounded lists to a mobile client. Cursor-based pagination is preferred over offset for mobile feeds.

```ts
// Cursor-based pagination — stable under concurrent inserts
// GET /api/posts?cursor=eyJpZCI6MTIzfQ&limit=20

app.get('/api/posts', async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100)
  const cursor = req.query.cursor
    ? decodeCursor(req.query.cursor as string)
    : undefined

  const posts = await db.posts.findMany({
    take: limit + 1,
    cursor: cursor ? { id: cursor.id } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: { created_at: 'desc' },
  })

  const hasMore = posts.length > limit
  const items = hasMore ? posts.slice(0, limit) : posts
  const nextCursor = hasMore ? encodeCursor({ id: items[items.length - 1].id }) : null

  res.json({ data: items, meta: { nextCursor, hasMore } })
})
```

### Batch endpoints

Mobile apps often need to fetch several resources at once. Rather than making 5 sequential requests (each adding network latency), expose batch endpoints.

```ts
// Single request fetches multiple resource types
// POST /api/batch
// Body: { "requests": [{ "path": "/users/me" }, { "path": "/notifications" }] }

app.post('/api/batch', async (req, res) => {
  const results = await Promise.all(
    req.body.requests.map(({ path }) => internalFetch(path, req.user))
  )
  res.json({ data: results })
})
```

---

## Authentication Flow for Mobile

Mobile auth has patterns that differ from web:

**Token storage:** Never store auth tokens in plain text. Use the platform's secure storage.

```ts
// React Native — use expo-secure-store, not AsyncStorage, for tokens
import * as SecureStore from 'expo-secure-store'

await SecureStore.setItemAsync('auth_token', token)
const token = await SecureStore.getItemAsync('auth_token')
```

**Token refresh:** Mobile apps run for days without restarting. Implement automatic token refresh.

```ts
// Axios interceptor for automatic token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`
        return api.request(error.config)
      }
      // Refresh failed — redirect to login
      await logout()
    }
    return Promise.reject(error)
  }
)
```

**Biometric auth:** Support device-level biometrics as a secondary auth layer for sensitive actions — not as a replacement for your auth system.

```ts
import * as LocalAuthentication from 'expo-local-authentication'

async function authenticateWithBiometrics() {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Confirm your identity',
    fallbackLabel: 'Use passcode',
  })
  return result.success
}
```

---

## File and Media Handling

Mobile apps frequently deal with user-generated media: profile photos, document uploads, audio recordings.

**Never upload files through your API server.** Upload directly to storage (S3, Supabase Storage, Firebase Storage) using presigned URLs. Your server only handles metadata.

```
Mobile App → GET /api/upload-url → Your Server generates presigned URL
Mobile App → PUT presigned URL → S3 / Supabase Storage (direct)
Mobile App → POST /api/media → Your Server saves metadata (URL, size, type)
```

```ts
// Server — generate presigned upload URL
app.get('/api/upload-url', authenticate, async (req, res) => {
  const { filename, contentType } = req.query
  const key = `uploads/${req.user.id}/${Date.now()}-${filename}`

  const url = await s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
    Expires: 300, // 5 minutes
  })

  res.json({ data: { uploadUrl: url, key } })
})
```

```ts
// Mobile — upload directly to S3
const { uploadUrl, key } = await api.getUploadUrl(filename, contentType)

await fetch(uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': contentType },
  body: fileBlob,
})

await api.saveMediaMetadata({ key, filename, size })
```

---

## Push Notification Backend

Push notifications require a server component to send. The mobile app only receives.

**Architecture:**

```
Your Backend → FCM (Android) → Device
Your Backend → APNs (iOS)    → Device
```

Use a service that abstracts both:
- **Expo Push Notifications** — simplest for Expo apps
- **Firebase Cloud Messaging** — direct, works for both platforms
- **OneSignal** — third-party, feature-rich, free tier available

**Storing push tokens:**

```ts
// Mobile — register device token on login
import * as Notifications from 'expo-notifications'

async function registerPushToken(userId: string) {
  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') return

  const token = (await Notifications.getExpoPushTokenAsync()).data

  await api.post('/api/push-tokens', { token, platform: Platform.OS })
}
```

```ts
// Server — store token, send notifications
app.post('/api/push-tokens', authenticate, async (req, res) => {
  await db.pushTokens.upsert({
    where: { token: req.body.token },
    update: { userId: req.user.id, updatedAt: new Date() },
    create: { token: req.body.token, userId: req.user.id, platform: req.body.platform },
  })
  res.json({ data: { success: true } })
})
```

---

## AI Prompt — Backend Architecture Review

```
You are a senior backend engineer reviewing the architecture for a production mobile app.

My app: [one-sentence description]
Mobile stack: [React Native / Flutter / other]
Backend approach: [BaaS / custom API / hybrid — describe what you have chosen]
Core features requiring backend: [list the 5–8 main things your backend needs to do]
Expected scale: [rough DAU estimate at launch and 6-month target]

Review my backend plan and identify:

1. What am I missing for a production mobile backend?
   Focus on: auth token handling, file uploads, push notifications, pagination,
   offline sync considerations, and response shape.

2. What are the top 3 security risks in my current plan?

3. For each of my core features, identify the most common implementation mistake
   teams make when building it for mobile specifically.

4. What should I build custom vs. use a managed service for, given my scale?

Be specific to mobile constraints: unreliable networks, long session durations,
app versions in the wild that cannot be force-updated.
```

---

## Validation Checklist

**Architecture**
- [ ] BaaS vs custom vs hybrid decision made and documented
- [ ] All third-party API calls (Stripe, OpenAI, etc.) route through backend — never directly from mobile client
- [ ] File uploads go directly to storage via presigned URLs — not through your API server

**API design**
- [ ] Consistent response envelope across all endpoints
- [ ] All list endpoints are paginated with a maximum page size
- [ ] Error responses include machine-readable error codes, not just messages

**Auth**
- [ ] Auth tokens stored in secure storage (not AsyncStorage or SharedPreferences)
- [ ] Automatic token refresh implemented
- [ ] Sessions expire at a reasonable interval and are invalidated on logout

**Security**
- [ ] Row Level Security or Firestore rules enabled on all collections/tables
- [ ] All endpoints that modify data require authentication
- [ ] Input validation on all API endpoints (never trust mobile client input)

**Push notifications**
- [ ] Push token registration flow implemented
- [ ] Push tokens are stored per user per device (one user, multiple devices)
- [ ] Token cleanup implemented for expired or invalid tokens

**Files and media**
- [ ] Presigned URL pattern used for all file uploads
- [ ] File type and size validation implemented before generating presigned URL
- [ ] Uploaded files are not publicly accessible unless explicitly intended
