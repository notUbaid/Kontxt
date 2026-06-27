---
title: Auth
slug: auth
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Auth

Authentication (Phase 2) decided your approach. This module wires it into your actual application — middleware, route protection, and the sync between your auth provider and your own database. The most common implementation mistake here isn't a missing feature, it's trusting the wrong source of truth for "who is this user."

---

## Decision 1: Source of Truth for Identity

> ⚠️ **Warning**
> **Never trust a client-sent user ID.** A request claiming to be "user_123" in a header or body field proves nothing — anyone can send any value. The only trustworthy source of identity is the verified session or token your auth provider's SDK validates server-side. Every protected route must derive the user from that verification, never from a value the client simply states.

---

## Decision 2: Syncing Auth Provider Data to Your Database

Your auth provider manages credentials and sessions. Your own database needs its own `users` table — to attach `workspace_id` relationships, roles, and anything else specific to your product that the auth provider doesn't know about.

> **Decision Card — Webhook-Driven Sync**
> Listen for your auth provider's `user.created` / `user.updated` / `user.deleted` webhooks (covered in Third Party Integrations) and use them to create/update/remove the corresponding row in your own `users` table. Don't rely on syncing this only at login time — a webhook-driven sync keeps your local record accurate even for changes made outside a login flow (e.g., profile updates via the provider's hosted UI).

Apply the same webhook handling rules from Third Party Integrations here: verify the signature, process idempotently.

---

## Decision 3: Middleware — Attaching User & Workspace Context

This is where Authentication and Authorization & Roles connect in actual code. Your middleware (from Backend Architecture's fixed order) should:

1. Verify the session/token via your auth provider's SDK
2. Look up the corresponding local user record
3. Resolve the current workspace context (from a URL param, subdomain, or active-workspace setting — consistent with your Information Architecture tenancy decision)
4. Attach both to the request before it reaches any route handler

> ✅ **Best Practice**
> Every downstream route handler and service should be able to assume `request.user` and `request.workspace` are already verified and present — never re-implement this resolution per route.

---

## Decision 4: Protecting Routes — Pages, Not Just APIs

> ⚠️ **Warning**
> **Protecting only your API routes and leaving server-rendered pages unguarded is a common gap.** If your dashboard page itself doesn't check authentication before rendering, an unauthenticated request might still receive a page shell that reveals more than it should, or your API protection alone isn't covering navigation-level redirects. Apply the same auth check at the page/route level as you do at the API level.

- [ ] Every authenticated page redirects unauthenticated users to login
- [ ] Every authenticated API route rejects unauthenticated requests with a 401
- [ ] The redirect preserves the originally intended destination, so the user lands where they meant to go after logging in — not always back at a generic dashboard

---

## Decision 5: Session Expiry Handling

- [ ] Expired sessions trigger a clean redirect to login, not a confusing error state or a silently broken page
- [ ] Any in-progress client-side work (a partially filled form) should ideally not be silently lost — at minimum, don't make expiry handling worse by causing unsaved data loss without warning

---

## Decision 6: Environment Separation

> ⚠️ **Warning**
> Use **separate auth provider instances/configurations for development, staging, and production.** Test logins, throwaway accounts, and debugging activity should never touch your production user base or production auth provider dashboard. Most managed providers support multiple environments/projects for exactly this reason — set this up before you have real users, not after.

---

## Decision 7: Testing Auth Flows

- [ ] Automated tests use a mocked or test-mode auth flow, not real calls to your auth provider's production API
- [ ] At least one test account exists per role (owner, admin, member, viewer) for manual testing of permission boundaries

---

## Common AI Mistakes to Watch For

- **Reads user identity from a client-supplied field** instead of verifying the session server-side — always check this explicitly.
- **Protects API routes but not server-rendered pages** — verify both layers are guarded.
- **No webhook sync implemented** — local user records can silently drift out of date with the auth provider; ask explicitly for this.
- **Re-implements session/workspace resolution per route** instead of relying on shared middleware — push back and centralize it.
- **Suggests using the same auth provider project/instance across dev and prod** — explicitly require separate environments.

---

## AI Prompt: Implement Auth Integration

```
Implement the auth integration layer for a production SaaS using [your provider from Authentication].

Implement:
1. Middleware that verifies the session server-side, looks up the local user record, resolves the current workspace from [your tenancy signal — URL param/subdomain/active workspace], and attaches both to the request.
2. A webhook handler for user.created/user.updated/user.deleted events that syncs the provider's data into our local `users` table, with signature verification and idempotent processing.
3. Route protection for both server-rendered pages and API routes — show both, don't assume one covers the other. Unauthenticated requests to pages redirect to login preserving the intended destination; API requests return 401.
4. Confirm explicitly: nowhere in this implementation should a client-supplied user ID be trusted without server-side session verification.

Use separate auth configuration values for dev/staging/prod via environment variables, never a shared instance.
```

---

## Validate Before You Move On

- [ ] User identity is always derived from a server-verified session, never a client-supplied value
- [ ] Local `users` table stays in sync with the auth provider via webhooks, not just at login
- [ ] Middleware resolves user and workspace context once, consistently, for every request
- [ ] Both pages and API routes are protected — not just one layer
- [ ] Session expiry redirects cleanly and preserves intended destination
- [ ] Dev/staging/prod use separate auth provider configurations
- [ ] Test accounts exist for every role to manually verify permission boundaries

> 💡 **Tip**
> Once this middleware exists, every future feature module can assume `user` and `workspace` are already available and verified — you're building the foundation the rest of Phase 3 depends on.

---

**Next:** Backend — implement the API endpoints and business logic this auth layer protects.
