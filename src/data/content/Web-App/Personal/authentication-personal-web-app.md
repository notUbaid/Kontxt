---
title: Authentication
slug: authentication
phase: Phase 2
mode: personal
projectType: web app
estimatedTime: 25–40 min
---

# Authentication

Authentication is the part of every web app that feels straightforward until it isn't. Sessions, tokens, refresh flows, password resets, OAuth callbacks — the surface area is larger than it appears.

For a personal project, the right move is almost always to use a managed auth provider and not build any of it yourself. This module helps you make that decision confidently and implement it correctly.

---

## Don't Build Auth From Scratch

Rolling your own authentication means owning: password hashing, token generation, session management, refresh token rotation, email verification, password reset flows, brute force protection, and account enumeration prevention.

Each of these is a solved problem. Each has well-known failure modes. None of them are what your personal project is actually about.

> **⚠️ Warning**
> The most common auth mistake in personal projects is not a vulnerability — it's time. Building auth from scratch takes days. Using a provider takes hours. Those days are better spent on the features that make your product worth using.

---

## Choosing an Auth Provider

For a personal project, the choice is almost always between two:

| Provider | Best For | Free Tier |
|---|---|---|
| **Supabase Auth** | Apps already using Supabase as the database | 50,000 MAU free |
| **Clerk** | Apps that need a polished UI out of the box, social logins, org support | 10,000 MAU free |

**If you're using Supabase for your database: use Supabase Auth.** It integrates directly with Row Level Security, and `auth.uid()` is available in your RLS policies without any extra setup.

**If you're using a different database or want pre-built UI components:** Clerk is excellent. Its `<SignIn />` and `<SignUp />` components look professional without any styling work.

For everything in this module, Supabase Auth is used as the reference — but the concepts apply equally to Clerk.

---

## What Auth Providers Give You

Out of the box, without writing any auth logic yourself:

- Email/password signup and login
- Email verification
- Password reset via email
- OAuth social login (Google, GitHub, etc.)
- JWT-based session management
- Refresh token rotation
- Session persistence across page reloads

This is months of engineering work, available in an afternoon.

---

## The Auth Decision: What Do You Actually Need?

Before implementing, decide the minimum auth surface your MVP requires.

**Decision Card**

| Feature | Include in MVP? | Reasoning |
|---|---|---|
| Email/password signup + login | Yes — almost always | Core requirement |
| Email verification | Optional — skip for MVP | Adds friction before first "aha moment" |
| Google / GitHub OAuth | Yes — if your users expect it | Reduces signup friction significantly |
| Password reset | Yes | Users will forget passwords |
| "Remember me" / persistent sessions | Yes — default on | Users expect to stay logged in |
| Two-factor authentication | No — skip for MVP | Operational overhead, rarely needed at personal project scale |
| Magic link (passwordless) login | Optional | Good UX, easy to add with Supabase |

> **💡 Tip**
> For most personal projects: email/password + one social provider (Google) + password reset is the right MVP auth surface. Everything else can be added after you have real users.

---

## Supabase Auth: How It Works

Supabase Auth issues JWTs that are stored in the browser's localStorage. The client SDK manages:
- Storing and refreshing tokens automatically
- Providing the current session via `supabase.auth.getSession()`
- Exposing `auth.uid()` inside your RLS policies

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

```ts
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword',
})

// Sign out
await supabase.auth.signOut()

// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  // 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED'
})
```

---

## Protecting Routes in React

Every authenticated page needs a guard that redirects unauthenticated users to login.

```tsx
// src/components/ProtectedRoute.tsx
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => subscription.unsubscribe()
  }, [])

  // Still loading — don't flash the login page
  if (session === undefined) return null

  // Not authenticated — redirect
  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}
```

```tsx
// src/App.tsx
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
</Routes>
```

---

## The Users Table

Supabase Auth manages its own `auth.users` table — you don't control it. For app-level user data (display name, avatar, preferences), create a separate `public.users` table and keep it in sync with a database trigger.

```sql
-- Your app's user profile table
CREATE TABLE public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  name        TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create a profile when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

This pattern means every `auth.users` entry automatically has a corresponding `public.users` row you can JOIN against and store app data in.

---

## Environment Variables

Never hardcode Supabase credentials. Store them in `.env.local`:

```bash
# .env.local — never commit this file
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Confirm `.env.local` is in your `.gitignore` before your first commit.

The anon key is safe to expose in the browser — it's designed for client-side use. Your RLS policies are what protect data, not the anon key being secret.

> **⚠️ Warning**
> Never use your `service_role` key in client-side code. It bypasses RLS entirely. It belongs only in server-side code that runs in a trusted environment.

---

## Using AI to Implement Auth

**Copy Prompt**

```
I'm building a personal web app using React + Vite + TypeScript + Supabase Auth.

Here is my PRD: [paste PRD]

I need to implement:
- Email/password signup and login
- Protected route component that redirects to /login if not authenticated
- Auth context/hook that exposes current user and session across the app
- A public.users table that syncs with auth.users via a database trigger
- RLS policies for the users table

Generate:
1. The Supabase client setup file
2. An AuthContext with useAuth hook
3. The ProtectedRoute component
4. The SQL for the users table, trigger, and RLS policies
5. A basic LoginPage and SignupPage component (functional, not styled)

Use TypeScript throughout. Keep it clean and minimal.
```

---

## Auth Checklist

**Implementation**
- [ ] Auth provider chosen and project created
- [ ] Supabase client initialized with environment variables
- [ ] `.env.local` is in `.gitignore`
- [ ] Signup, login, and logout flows work end to end
- [ ] Password reset flow works (test it — it's easy to misconfigure)
- [ ] Auth state persists across page reloads

**Data**
- [ ] `public.users` table exists and syncs via trigger
- [ ] RLS is enabled on `public.users`
- [ ] RLS policies exist for SELECT, INSERT, UPDATE on `public.users`

**Routing**
- [ ] ProtectedRoute component redirects unauthenticated users
- [ ] All authenticated pages are wrapped in ProtectedRoute
- [ ] Login and signup pages redirect authenticated users away (don't show login to someone already logged in)

**Security**
- [ ] `service_role` key is not in any client-side code
- [ ] Environment variables are not committed to the repo

---

## What's Next

Move to **Hosting & Deployment** — getting your app running on a real URL so you can test it in production conditions and share it with real users.
