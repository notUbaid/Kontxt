# Auth

🕒 **Estimated Time:** 15 Minutes

---

Auth is the one layer of your product where a mistake isn't just a bug.

It's a breach. A data leak. A user who loses trust in you and never comes back.

This is not a reason to be paralyzed. It's a reason to use a tool built by people who have spent years getting it right — and to understand what that tool is actually doing, so you can configure it correctly and catch problems before they reach users.

---

## What Auth Actually Is

Authentication answers: **who are you?**

Authorization answers: **what are you allowed to do?**

Most personal SaaS products need both — but they're different problems solved in different places.

```
Authentication → handled by your auth provider (Clerk, Auth.js, Supabase Auth)
Authorization  → handled by your application code (row-level policies, middleware, query filters)
```

Your auth provider handles sign up, sign in, session management, password resets, OAuth connections, and token issuance. Your application code uses the identity it provides to decide what data each user can see and modify.

Do not conflate them. An auth provider that handles authentication perfectly can still expose the wrong user's data if your authorization logic is wrong.

---

## The Auth Decision (Revisited)

You made this choice in Tech Stack. Here's what each option requires from you:

| Provider | What it handles | What you still own |
|----------|----------------|-------------------|
| **Clerk** | Everything — UI, sessions, tokens, OAuth, MFA | Protecting routes, filtering data by user |
| **Auth.js** | Sessions, OAuth, token flow | Database adapter setup, protecting routes, filtering data |
| **Supabase Auth** | Users, sessions, OAuth, email | Row Level Security policies, protecting routes |
| **Lucia** | Sessions, tokens, adapters | Sign-up/sign-in UI, protecting routes, filtering data |

Every option still requires you to protect your routes and filter your data by user. Auth solves identity. You solve access.

---

## The User Data Model

Before writing any auth code, understand what your database needs.

Every user-owned resource in your product needs a user identifier attached to it.

```sql
-- Every table that belongs to a user needs this column
user_id  TEXT  NOT NULL  -- or UUID, depending on your provider
```

When you query data, you always filter by the authenticated user's ID:

```sql
-- Never this
SELECT * FROM projects;

-- Always this
SELECT * FROM projects WHERE user_id = $current_user_id;
```

If you miss this filter on one query, any authenticated user can read another user's data. This is called an IDOR vulnerability — Insecure Direct Object Reference. It is the most common authorization bug in solo-built SaaS products.

The fix is simple: **every query that touches user-owned data must filter by user ID.** No exceptions.

---

## Route Protection

Your frontend and backend both need to protect routes.

**Frontend route protection** — prevents unauthenticated users from seeing pages they shouldn't. If a user isn't signed in and tries to access `/dashboard`, they get redirected to `/login`.

**Backend route protection** — prevents unauthenticated requests from reaching your API. If a request arrives at `/api/projects` without a valid session, it returns 401.

Both are required. Frontend-only protection is cosmetic — anyone can hit your API directly.

---

## Implementation: Clerk

If you chose Clerk, setup looks like this:

**1. Install and configure**
```bash
npm install @clerk/nextjs
```

Add to `middleware.ts`:
```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
};
```

**2. Get the current user in API routes**
```ts
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = auth();
  if (!userId) return new Response('Unauthorized', { status: 401 });

  const projects = await db.project.findMany({
    where: { userId }, // always filter by userId
  });

  return Response.json(projects);
}
```

**3. Get the current user in server components**
```ts
import { currentUser } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  // ...
}
```

---

## Implementation: Auth.js (NextAuth v5)

If you chose Auth.js:

**1. Install and configure**
```bash
npm install next-auth@beta
```

`auth.ts`:
```ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.sub!;
      return session;
    },
  },
});
```

**2. Protect routes via middleware**
```ts
// middleware.ts
export { auth as middleware } from './auth';

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

**3. Get the current user**
```ts
// In server components or API routes
const session = await auth();
if (!session?.user) redirect('/sign-in');

const userId = session.user.id;
```

---

## Implementation: Supabase Auth

If you chose Supabase:

**1. Auth is built in — enable providers in the dashboard**

**2. Get the current user in server components**
```ts
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) redirect('/sign-in');
```

**3. Use Row Level Security for authorization**

Instead of filtering in application code, Supabase lets you define policies at the database level:

```sql
-- Enable RLS on the table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users can only see their own projects
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own projects
CREATE POLICY "Users can insert own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

With RLS enabled, even if your application code forgets to filter by user ID — the database enforces it. This is an extra safety layer, not a replacement for correct application code.

---

## What to Test After Implementing Auth

Don't assume auth works. Verify it.

- [ ] Unauthenticated user visiting `/dashboard` is redirected to sign-in
- [ ] Unauthenticated request to `/api/projects` returns 401
- [ ] Signed-in user can see their own data
- [ ] Signed-in user **cannot** see another user's data (test with two accounts)
- [ ] Sign out clears the session — no cached data visible
- [ ] Password reset flow works end-to-end
- [ ] OAuth flow completes and creates a user record

The two-account test is the one most builders skip. Create two test accounts. Log in as user A. Copy the resource URL of something user A owns. Log in as user B. Paste the URL. If user B can see it — you have a data isolation bug.

---

## Common Mistakes

**Protecting frontend routes but not API routes**
The page redirects, but the API still responds. Anyone who knows the endpoint can call it directly.

**Filtering by user ID in most queries — but not all**
One missed `WHERE user_id = $id` is enough. Audit every query that touches user data.

**Storing sensitive data in JWTs**
JWTs are signed, not encrypted. Anyone can decode them. Don't put PII, permissions, or anything sensitive in a JWT payload.

**Using the same session across environments**
A session cookie from production should never work in development. Keep environment secrets separate.

**Not handling session expiry**
Sessions expire. Your frontend needs to handle 401 responses gracefully — redirect to sign-in, not a broken UI.

---

## AI Prompt — Implement Auth for Your Stack

```
I'm implementing authentication in my personal SaaS product.

**Stack:** [your stack from the Tech Stack module]
**Auth provider:** [Clerk / Auth.js / Supabase Auth / Lucia]
**Framework:** [Next.js App Router / other]
**Database + ORM:** [e.g., PostgreSQL + Prisma]

Generate the following:
1. Full auth setup for my chosen provider (install, config, environment variables needed)
2. Middleware that protects all routes except: [list your public routes]
3. A utility function to get the current authenticated user's ID in:
   - Server components
   - API route handlers
4. An example API route that fetches a resource, filtered by the current user's ID
5. The database schema change needed to add user_id to my core tables
6. A checklist of what to manually test after setup

Follow security best practices. Flag anything I need to handle that you haven't generated.
```

> **Copy Prompt**

---

## Auth Checklist

- [ ] Auth provider installed and configured
- [ ] Environment variables set (and not committed to git)
- [ ] Public routes defined — everything else protected
- [ ] Middleware protecting all non-public routes
- [ ] API routes return 401 for unauthenticated requests
- [ ] Current user ID available in both server components and API routes
- [ ] Every user-owned table has a `user_id` column
- [ ] Every query filtering user data uses `WHERE user_id = $current_user_id`
- [ ] Two-account isolation test passed
- [ ] Sign-out clears session completely
- [ ] 401 responses handled gracefully in the frontend
- [ ] `.env` file is in `.gitignore` — secrets are not in the repo

---

## Next

**Database →** Auth is implemented and your users have IDs. Now design the schema that stores everything they create.
