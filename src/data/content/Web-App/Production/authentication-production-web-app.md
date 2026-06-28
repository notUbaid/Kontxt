---
title: Authentication
slug: authentication
phase: Phase 2
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Authentication

Authentication is the front door of your application. It determines who gets in, what they can do, and how safely you can trust that they are who they claim to be.

Building auth yourself is one of the most common and most costly mistakes in early-stage development. The attack surface is large, the edge cases are well-documented, and the consequences of getting it wrong are security incidents — not bugs.

Use a provider. Design the integration carefully.

---

## What Authentication Actually Covers

Authentication is broader than a login form. A complete auth system handles:

| Concern | What it means |
|---|---|
| **Identity verification** | Confirming who the user is (password, OAuth, magic link) |
| **Session management** | Keeping the user logged in securely across requests |
| **Token lifecycle** | Issuing, refreshing, and revoking access tokens |
| **Multi-factor auth** | Second factor verification (TOTP, SMS) |
| **Account recovery** | Forgot password, email change flows |
| **OAuth / SSO** | Delegated identity via Google, GitHub, etc. |
| **Email verification** | Confirming the user controls the email address |

A provider like Supabase Auth handles all of these. Rolling your own means handling all of these — and every edge case within them.

---

## Choosing Your Auth Provider

| Provider | Best for | Notes |
|---|---|---|
| **Supabase Auth** | Apps already using Supabase | Tight DB integration, RLS works natively, free tier generous |
| **Auth.js (NextAuth v5)** | Full control, self-hosted, complex provider needs | More configuration, no hosted dashboard |
| **Clerk** | Fastest DX, rich prebuilt UI | Paid at scale, opinionated component system |
| **Auth0** | Enterprise, compliance requirements | Expensive, powerful, overkill for most early-stage apps |

**For most production web apps on Supabase: use Supabase Auth.**

The auth provider's user ID becomes the source of truth. Your `users` table references it.

---

## Auth Methods: What to Offer

Don't offer every auth method. Each one is a surface to maintain and a UX path to design.

**Recommended defaults for a production web app:**

| Method | Include? | Reason |
|---|---|---|
| Email + Password | ✅ | Universal baseline |
| Google OAuth | ✅ | Highest conversion rate for most apps |
| Magic Link (passwordless email) | Optional | Great for B2B, reduces password friction |
| GitHub OAuth | If dev-focused product | High trust signal for technical users |
| SSO / SAML | Defer | Required for enterprise, complex to implement |
| Phone / SMS | Avoid unless required | Costly, carrier delivery unreliable |

Two auth methods at launch is enough. Add more when users ask for them.

---

## Session Architecture

Understanding how sessions work prevents an entire class of bugs.

### JWT vs. Server Sessions

| JWT (stateless) | Server Sessions (stateful) |
|---|---|
| Token contains user info | Token is a reference to server-stored session |
| No DB lookup per request | DB lookup required per request |
| Can't be revoked until expiry | Can be revoked instantly |
| Scales horizontally without shared state | Requires shared session store at scale |

Supabase Auth uses JWTs with a short expiry (1 hour) and a refresh token stored in an HttpOnly cookie. This is the right default for most apps.

**Key implication:** A user's JWT contains their role and claims. If you change a user's role, the change doesn't take effect until their JWT expires and is refreshed. Design around this.

### Token Storage

| Location | XSS Risk | CSRF Risk | Recommended |
|---|---|---|---|
| `localStorage` | High (JS-accessible) | Low | ❌ Never for sensitive tokens |
| Memory (React state) | Low | Low | ✅ For access tokens |
| HttpOnly Cookie | None | Medium (mitigated by SameSite) | ✅ For refresh tokens |

Supabase handles this correctly by default. Don't override it.

---

## Next.js Auth Integration (Supabase)

### Middleware — The Auth Guard

```ts
// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  const { data: { session } } = await supabase.auth.getSession()

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') ||
                      request.nextUrl.pathname.startsWith('/signup')

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') ||
                           request.nextUrl.pathname.startsWith('/settings')

  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)'],
}
```

**Why middleware, not page-level guards?**

Middleware runs at the edge before the page renders. A user who isn't authenticated never gets a flash of the protected page — they're redirected before any component renders. Page-level guards (`if (!user) redirect()`) run after the server component starts, which can cause brief flashes and inconsistencies.

---

### Server-Side Session Access

```ts
// In a Server Component or Route Handler
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getSession() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function requireSession() {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')
  return session
}
```

Call `requireSession()` at the top of any Server Action or Route Handler that requires authentication. Don't rely on middleware alone — defense in depth.

---

## The Auth Flow Map

```
/signup
  │
  ├── Submit email + password
  ├── Supabase creates auth.users record
  ├── Sends verification email
  ├── Redirect → /onboarding (or dashboard if email not required)
  └── On verify → session established

/login
  │
  ├── Submit credentials
  ├── Supabase validates, issues JWT + refresh token
  ├── Redirect → ?redirect param or /dashboard
  └── Session stored in HttpOnly cookie

/forgot-password
  │
  ├── Submit email
  ├── Supabase sends reset link (token in URL)
  └── /reset-password → validates token → update password → redirect /login

OAuth (Google)
  │
  ├── Redirect to Google consent screen
  ├── Google redirects back with code
  ├── Supabase exchanges code for session
  └── New user → /onboarding, existing user → /dashboard
```

Every step in this map is a page and a user experience. Design the error states for each path.

---

## Post-Auth: Syncing to Your Users Table

Supabase Auth creates a record in `auth.users`. Your application's `users` table is separate.

Use a database trigger or a webhook to sync:

```sql
-- Supabase: trigger on new auth user to create profile row
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at)
  VALUES (NEW.id, NEW.email, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

This ensures your `users` table stays in sync without requiring your application code to manually create the profile after every signup.

---

## Security Requirements

- [ ] Passwords never stored in your database — auth provider manages credentials
- [ ] Access tokens not stored in `localStorage`
- [ ] Refresh tokens in HttpOnly, SameSite cookies only
- [ ] Auth middleware applied to all protected routes
- [ ] `requireSession()` called inside every Server Action and Route Handler that touches user data
- [ ] Email verification required before accessing the app (or explicitly deferred with a reason)
- [ ] Password reset links are single-use and expire (Supabase handles this by default)
- [ ] OAuth redirect URIs are allowlisted in your provider dashboard
- [ ] RLS policies reference `auth.uid()` correctly (if using Supabase)

---

## Common Auth Mistakes

**Relying on middleware alone for auth**
Middleware is the UX layer. A Server Action called directly bypasses the page and therefore bypasses middleware. Always validate the session server-side inside actions and route handlers.

**Trusting the client-side session for authorization decisions**
`supabase.auth.getUser()` on the client can be spoofed. Always re-validate the session on the server for sensitive operations.

**Not handling the OAuth callback error state**
OAuth can fail: user denies consent, network error, expired state parameter. Design the `/auth/callback` route to handle errors, not just the happy path.

**Storing user roles in the JWT without a refresh strategy**
If you embed `role: 'admin'` in the JWT, demoting a user has no effect until their token expires. Either keep roles out of the JWT (fetch from DB on each request) or implement token revocation.

---

## AI Prompt — Auth Implementation Plan

```
You are a Staff Engineer helping implement authentication for a Next.js 14 App Router application using Supabase Auth.

My app: [describe in 2–3 sentences]
Auth methods needed: [e.g. email/password + Google OAuth]
Multi-tenancy: [yes/no — single user or organization-based]
User roles needed: [e.g. owner, admin, member, viewer]

Generate a complete implementation plan covering:
1. Supabase Auth configuration (which providers to enable, email templates to customize)
2. Middleware implementation for route protection
3. Server-side session helper functions
4. Database trigger to sync auth.users → public.users
5. The complete auth flow for each method (signup, login, OAuth, password reset)
6. How roles will be stored and validated
7. Any RLS policies needed for the users table

Flag any decisions I need to make before implementation starts.
Flag any security considerations specific to my setup.
```
