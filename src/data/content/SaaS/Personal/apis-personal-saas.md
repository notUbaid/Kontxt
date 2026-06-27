---
title: APIs
slug: apis
phase: Phase 2
mode: personal
projectType: saas
estimatedTime: 25–35 min
---

# APIs

You don't design APIs after you build your app.

You design them **before** you write a single line of backend code — because your API is the contract between your frontend, your backend, and any future integrations. Get it wrong here and you refactor everything later.

This module helps you make that contract intentionally.

---

## What You're Actually Deciding

Your SaaS needs at least two layers of API thinking:

| Layer | What it is | What you decide |
|---|---|---|
| **Your own API** | Routes your frontend calls | Structure, auth, versioning |
| **Third-party APIs** | Services you consume | Which ones, how to call them safely |

Both matter. Most beginners only think about the second.

---

## Your Own API

### REST vs tRPC vs GraphQL

For a personal SaaS project, keep it simple.

| Option | Best for | Avoid if |
|---|---|---|
| **REST** | Standard, predictable, works with any frontend | You hate writing boilerplate |
| **tRPC** | Full-stack TypeScript (Next.js / T3) | Your frontend and backend are separate repos |
| **GraphQL** | Complex data relationships, multiple clients | You have a single frontend |

> **Recommendation for personal SaaS:** Use **REST** if your stack is separated. Use **tRPC** if you're building with Next.js and want end-to-end type safety with minimal setup.

GraphQL is almost never the right choice for a personal project. It's powerful and expensive to maintain alone.

---

### Route Structure

Think in **resources**, not actions.

```
✅ Good
GET    /api/workspaces
POST   /api/workspaces
GET    /api/workspaces/:id
PATCH  /api/workspaces/:id
DELETE /api/workspaces/:id

GET    /api/workspaces/:id/members
POST   /api/workspaces/:id/members

❌ Bad
GET    /api/getWorkspaces
POST   /api/createNewWorkspace
GET    /api/getWorkspaceMembersForId
```

Resources are nouns. HTTP methods are verbs. Never put verbs in your route names.

---

### Versioning

You probably don't need versioning on day one. But you need to know when you will.

**Version when:**
- You're building a public API that external developers will use
- You're planning a mobile app that can't update instantly

**Don't version when:**
- You control 100% of the clients (your own frontend)
- You're in early development

If you do version: `/api/v1/` prefix. Simple. Don't overthink it.

---

### Authentication on Routes

Every route needs to answer: **who is allowed to call this?**

Three categories:

- **Public** — anyone, no token required (e.g. `GET /api/plans`)
- **Authenticated** — valid session required (e.g. `GET /api/me`)
- **Authorized** — valid session + permission check (e.g. `DELETE /api/workspaces/:id` — only the owner)

> ⚠️ Most security bugs come from missing the third category. Authentication confirms identity. Authorization confirms permission. They are not the same check.

---

## Route Planning Checklist

Work through your core features and map each one to a route.

- [ ] Identify every resource your app manages (users, workspaces, posts, subscriptions, etc.)
- [ ] Map CRUD operations to HTTP methods
- [ ] Flag which routes are public, authenticated, or authorized
- [ ] Check: does any route need to act on behalf of another user? (admin actions)
- [ ] Check: does any route return data that belongs to a different user? (data isolation)

---

## Third-Party APIs

### The Integration Inventory

Before you build, list every external service your SaaS will call.

Common ones:

| Category | Examples |
|---|---|
| Auth | Clerk, Auth.js, Supabase Auth |
| Payments | Stripe |
| Email | Resend, Postmark, SendGrid |
| Storage | Cloudflare R2, AWS S3, Supabase Storage |
| AI | Anthropic, OpenAI |
| Analytics | PostHog, Plausible |

For each one, ask:
1. Does this call happen **server-side only** or can it happen client-side?
2. Does the SDK need a secret key? → **Server-side only, always**
3. What happens if this service goes down?

---

### Never Call Third-Party APIs From the Frontend

If an API requires a secret key, it must only be called from your backend.

```
❌ Frontend → Stripe API (exposes secret key in browser)
✅ Frontend → Your API → Stripe API
```

This isn't optional. If your secret key leaks, you pay for every request someone else makes.

> **Rule:** Any environment variable prefixed `SECRET_`, `PRIVATE_`, or containing `_SECRET_KEY` never leaves your server.

---

### Webhook Handling

Many services (Stripe especially) push events to your app via webhooks rather than waiting for you to poll.

A webhook is just a `POST` request from the service to a URL you define.

**What you need:**
- A dedicated route: `POST /api/webhooks/stripe`
- Signature verification (Stripe signs every request — verify it)
- Idempotency (the same event may arrive more than once)

```
Stripe Event → POST /api/webhooks/stripe
                    ↓
          Verify signature header
                    ↓
          Check: have I processed this event_id before?
                    ↓
          Handle event type
                    ↓
          Return 200 immediately
```

> ⚠️ If your webhook handler takes too long, Stripe will retry. Always return `200` fast. Move slow work to a background job or queue.

---

## API Design Prompt

Use this when you're ready to generate your route structure with AI.

```prompt
You are a senior backend engineer helping me design a clean REST API for my SaaS.
My SaaS: [describe what your app does in 2–3 sentences]
Core features:
[list your main features from your PRD]
Tech stack:
- Backend: [e.g. Next.js API routes / Express / FastAPI]
- Database: [e.g. PostgreSQL with Prisma]
- Auth: [e.g. Clerk]
Please generate:
1. A complete list of REST routes grouped by resource
2. HTTP method, path, and one-line description for each
3. Flag each route as: Public / Authenticated / Authorized
4. Flag any routes that need special handling (webhooks, file upload, rate limiting)
5. Call out any security concerns I should be aware of
Do not generate any code. Output structured Markdown only.
```

---

## Validating the AI Output

When your AI generates a route list, review it against these:

- [ ] Every route that modifies data is POST, PUT, PATCH, or DELETE — never GET
- [ ] Every route that returns another user's data has an authorization check
- [ ] No sensitive operations are flagged as "Public"
- [ ] Webhook routes exist for every third-party service that sends events
- [ ] No route does more than one logical thing (if it does, split it)
- [ ] Routes follow consistent naming (plural nouns, no verbs)

Common AI mistakes to watch for:
- Generating `GET /api/deleteUser` — wrong method
- Missing authorization on admin routes
- Forgetting webhook routes entirely
- Over-engineering with nested routes 4 levels deep

---

## Error Responses

Pick a response shape and stick to it everywhere. Inconsistent errors are a debugging nightmare.

```json
{
  "error": {
    "code": "WORKSPACE_NOT_FOUND",
    "message": "The requested workspace does not exist.",
    "status": 404
  }
}
```

Standard HTTP status codes your API must use correctly:

| Code | When to use |
|---|---|
| `200` | Success |
| `201` | Resource created |
| `400` | Client sent bad data |
| `401` | Not logged in |
| `403` | Logged in but not allowed |
| `404` | Resource not found |
| `422` | Validation error |
| `500` | Something broke on your side |

> The most common mistake: returning `200` with `{ "error": "..." }` in the body. Don't do this. Use real HTTP status codes. Clients and monitoring tools depend on them.

---

## Rate Limiting

You don't need a complex rate limiting setup on day one, but you need a plan.

**Minimum viable approach:** limit by IP on public routes and by user ID on authenticated routes.

If you're using:
- **Vercel** → Use `@upstash/ratelimit` with Redis
- **Express** → Use `express-rate-limit`
- **Next.js API routes** → Middleware with Upstash

Which routes need it most:
1. Auth routes (login, signup, password reset)
2. Any AI-powered route (cost control)
3. Any route that sends email

---

## What to Build Next

After this module, you have:
- A complete route map for your SaaS
- A clear auth model per route
- An integration inventory for third-party services
- A consistent error response shape

Next up: **Storage** — where and how to handle file uploads, user avatars, and any documents your SaaS manages.
