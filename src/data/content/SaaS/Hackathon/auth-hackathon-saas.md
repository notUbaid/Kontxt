# Phase 2 · Authentication

🕒 **Estimated Time:** 15 Minutes

---

> **Mode: Hackathon** — Auth is infrastructure, not a feature. Get it working in 15 minutes and never think about it again.

The goal is a working login flow before you write a single feature. Every hour you spend on auth is an hour not spent on what judges actually evaluate.

---

## The Hackathon Auth Principle

> Never build auth from scratch in a hackathon. The risk is not theoretical — rolling your own session management, password hashing, or token validation under time pressure is how demos get hacked during judging, or worse, how they break entirely.

Use a provider. Configure it. Move on.

---

## Step 1 · Pick your auth provider

Two good options for a SaaS hackathon. Everything else is slower.

---

### Option A — Clerk (recommended if you want zero UI work)

**Setup time:** ~15 minutes  
**Best for:** Next.js, any frontend that needs a polished sign-in UI out of the box  
**Free tier:** Unlimited MAUs during development, 10,000 MAUs on free plan  

Clerk gives you pre-built `<SignIn />`, `<SignUp />`, and `<UserButton />` components. Drop them in, done. Social login (Google, GitHub) is a toggle in their dashboard, not code.

```bash
npm install @clerk/nextjs
```

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

```tsx
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html><body>{children}</body></html>
    </ClerkProvider>
  )
}
```

```tsx
// middleware.ts — protect all routes except public ones
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublic = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, req) => {
  if (!isPublic(req)) auth().protect()
})

export const config = { matcher: ['/((?!_next|.*\\..*).*)'] }
```

```tsx
// Get user in a server component
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Dashboard() {
  const { userId } = auth()
  const user = await currentUser()
  return <div>Hello {user?.firstName}</div>
}
```

---

### Option B — Supabase Auth (recommended if already using Supabase)

**Setup time:** ~20 minutes  
**Best for:** Projects already on Supabase — auth integrates directly with Row Level Security  
**Free tier:** 50,000 MAUs

Supabase Auth stores users in your own database and works natively with RLS policies. No separate auth service to manage.

```bash
npm install @supabase/supabase-js @supabase/ssr
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # server-side only, never expose to client
```

```ts
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(),
                 setAll: (c) => c.forEach(({ name, value, options }) =>
                   cookieStore.set(name, value, options)) } }
  )
}
```

```ts
// Get user server-side
const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

```tsx
// Sign in with magic link (simplest for demo)
await supabase.auth.signInWithOtp({ email: 'user@example.com' })

// Sign in with Google
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: `${origin}/auth/callback` }
})
```

---

## Step 2 · What to configure immediately

Do this before writing any feature code. These are the things that break demos.

---

### Redirect URLs

Every auth provider needs to know which URLs are allowed post-login. In development and production these are different.

**Clerk:** Settings → Redirects → add your Vercel preview URL pattern (`https://*.vercel.app/**`)

**Supabase:** Authentication → URL Configuration:
- Site URL: `https://your-app.vercel.app`
- Redirect URLs: add `https://your-app.vercel.app/**` and `http://localhost:3000/**`

> If you skip this, auth works locally and breaks the moment you deploy. This is the most common demo-day failure.

---

### Social login (optional but impressive)

Google login takes 10 minutes and judges notice it. It signals production-quality thinking.

**For Clerk:** Dashboard → User & Authentication → Social Connections → enable Google. Done.

**For Supabase:**
1. Google Cloud Console → Create OAuth credentials
2. Supabase Dashboard → Authentication → Providers → Google → paste client ID and secret
3. Add the Supabase callback URL to your Google OAuth app

---

### Environment variables in production

Set every auth env var in your deployment platform before demo day. A missing env var in production is silent and catastrophic.

**Vercel:** Project Settings → Environment Variables  
**Railway/Render:** Environment tab in your service settings

Variables you must set in production (Clerk):
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

---

## Step 3 · Auth patterns by SaaS type

### AI tool / single-user SaaS

Protect everything behind `/dashboard`. Public landing page is unauthenticated. Simple.

```
/ (public)        — landing page, sign up CTA
/sign-in          — Clerk or Supabase sign-in page
/sign-up          — Clerk or Supabase sign-up page
/dashboard        — protected, requires auth
/dashboard/*      — all sub-routes protected
```

### Multi-tenant SaaS (teams)

Users sign up → you create an organization → they invite teammates. The auth provider handles user identity; you handle org membership in your own database.

```ts
// After sign-up webhook (Clerk) or auth trigger (Supabase):
// 1. Create a record in your `users` table
// 2. Create an `organizations` record
// 3. Create a `memberships` record linking user → org with role 'owner'
```

**Clerk webhook setup:**
```ts
// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'

export async function POST(req: Request) {
  const payload = await req.json()
  // verify signature with CLERK_WEBHOOK_SECRET
  if (payload.type === 'user.created') {
    // create user + org + membership in your DB
  }
}
```

### Marketplace (two roles)

Store role in your own `users` table, not in the auth provider. Auth providers are for identity; roles are your business logic.

```ts
// After auth, fetch role from your DB
const { userId } = auth() // Clerk
const { data: profile } = await db
  .from('profiles')
  .select('role')
  .eq('user_id', userId)
  .single()

// Redirect based on role
if (profile.role === 'seller') redirect('/seller/dashboard')
else redirect('/browse')
```

---

## Step 4 · Syncing auth users to your database

Auth providers store identity (email, name, avatar). Your database stores everything else (preferences, content, billing). You need to sync them.

### Approach A — Sync on first request (simplest)

```ts
// middleware or layout — create DB user if they don't exist
async function ensureUser(authUserId: string, email: string) {
  const existing = await db
    .from('users')
    .select('id')
    .eq('id', authUserId)
    .single()

  if (!existing.data) {
    await db.from('users').insert({
      id: authUserId,   // use auth provider's ID as your PK
      email,
      created_at: new Date().toISOString()
    })
  }
}
```

### Approach B — Webhook on sign-up (cleaner)

Set up a webhook from your auth provider → your `/api/webhooks/auth` endpoint. Create the DB record the moment a user signs up.

Better for production. Slightly more setup. Worth it if you have time.

---

## Step 5 · Supabase Row Level Security (if using Supabase Auth)

RLS is Supabase's superpower. Users can only read and write their own data — enforced at the database level, not in your API.

Enable RLS on every table, then add policies.

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own posts
CREATE POLICY "users see own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own posts
CREATE POLICY "users insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own posts
CREATE POLICY "users update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only delete their own posts
CREATE POLICY "users delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);
```

For multi-tenant (org-level access):
```sql
-- Org members can see all resources in their org
CREATE POLICY "org members see org posts"
  ON posts FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM memberships
      WHERE user_id = auth.uid()
    )
  );
```

---

## Step 6 · AI prompts for auth

### Auth scaffold prompt

```prompt
Generate the auth integration for a Next.js 14 App Router project using [Clerk / Supabase Auth].

My schema has these tables:
[paste relevant tables]

I need:
1. Middleware that protects all routes under /dashboard
2. A server utility to get the current user's ID in any server component or API route
3. A sign-in page at /sign-in
4. A sign-up page at /sign-up
5. A sign-out button component

Do not include: testing, email templates, or anything beyond a working login/logout flow.
Output each file separately with its full path.
```

---

### Webhook handler prompt (for user sync)

```prompt
Generate a [Clerk / Supabase] webhook handler for Next.js App Router that:
1. Verifies the webhook signature
2. On user.created event: inserts a row into my `users` table with id, email, created_at
3. Returns 200 on success, 400 on signature failure

My users table:
  id         uuid PRIMARY KEY
  email      text UNIQUE NOT NULL
  created_at timestamptz DEFAULT now()

Use the official SDK. Include the env variable name for the webhook secret.
```

---

### RLS policy prompt

```prompt
Generate Supabase Row Level Security policies for these tables:

[paste schema]

Rules:
- Users can only read/write their own data (auth.uid() = user_id)
- [any org-level rules if multi-tenant]

Output: SQL only. ALTER TABLE + CREATE POLICY statements.
One policy per operation (SELECT, INSERT, UPDATE, DELETE).
```

---

## Step 7 · Common auth mistakes

These are the things that kill demos.

| Mistake | What happens | Fix |
|---|---|---|
| Not setting redirect URLs in provider dashboard | Auth fails silently in production | Add prod URL to provider settings before deploying |
| Using `SUPABASE_SERVICE_ROLE_KEY` in client code | Full database access exposed to browser | Service role key is server-only, always |
| Storing JWT secret or auth secret in `.env` and committing | Credentials leak in git history | Use `.env.local`, add to `.gitignore` immediately |
| Not protecting API routes | Anyone can call your API without logging in | Check auth in every API route handler |
| Forgetting `NEXT_PUBLIC_` prefix on client-side env vars | Variable is undefined in browser | Client vars must start with `NEXT_PUBLIC_` |
| Building auth before schema is done | Auth user IDs don't match DB foreign keys | Schema first, always |
| Adding role logic inside the auth provider | Roles become impossible to query | Roles live in your DB, identity in auth provider |

---

## Step 8 · Auth validation checklist

Complete this before moving to backend routes.

- [ ] Sign up creates a new user successfully
- [ ] Sign in works with email/password or social login
- [ ] Sign out clears the session and redirects to `/`
- [ ] Visiting `/dashboard` while logged out redirects to `/sign-in`
- [ ] Visiting `/dashboard` while logged in works
- [ ] Auth user ID is available in server components and API routes
- [ ] User record is created in your own database on sign-up
- [ ] Production redirect URLs are configured in provider dashboard
- [ ] All auth env vars are set in production deployment
- [ ] No auth secrets are in client-side code or committed to git

---

## Quick reference — auth at a glance

| Task | Clerk | Supabase Auth |
|---|---|---|
| Get user (server) | `auth()` from `@clerk/nextjs/server` | `supabase.auth.getUser()` |
| Get user (client) | `useUser()` hook | `supabase.auth.getUser()` |
| Protect route | `clerkMiddleware` | `supabase.auth.getUser()` + redirect |
| Sign in UI | `<SignIn />` component | Custom form + `signInWithOtp()` |
| Sign out | `<SignOutButton />` | `supabase.auth.signOut()` |
| Social login | Toggle in dashboard | `signInWithOAuth({ provider })` |
| Webhook on sign-up | `user.created` event | `auth` database trigger |
| User ID | `userId` from `auth()` | `user.id` from `getUser()` |

---

## What comes next

**Phase 3 · Backend** — now that auth is working, every API route can verify identity. Build your data layer next: queries, mutations, and the API routes that power your frontend.
