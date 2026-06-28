---
title: Authorization
slug: authorization
phase: Phase 2
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Authorization

Authentication answers: *who are you?*

Authorization answers: *what are you allowed to do?*

They are separate problems. Most early-stage apps implement authentication carefully and authorization carelessly — and this is where data leaks happen.

A logged-in user is not automatically allowed to do everything. A correctly authenticated request can still be unauthorized.

---

## The Core Mistake

```ts
//  This is authentication, not authorization
const session = await requireSession()

// The user is logged in — but are they allowed to edit THIS project?
const project = await db.project.findUnique({
  where: { id: params.projectId }
})
```

The above code confirms the user is logged in. It does not confirm the user owns or has access to that specific project. This is how data from one tenant leaks to another.

```ts
//  This is authentication + authorization
const session = await requireSession()

const project = await db.project.findUnique({
  where: {
    id: params.projectId,
    organizationId: session.user.organizationId // ← scope to tenant
  }
})

if (!project) throw new Error('Not found') // covers both missing and unauthorized
```

**Never return "Unauthorized" vs "Not Found" differently.** Returning 403 for a resource the user doesn't own confirms the resource exists. Always return 404 for resources the user can't access.

---

## Authorization Models

Choose one primary model. Don't mix them without clear boundaries.

### 1. Role-Based Access Control (RBAC)
Users are assigned roles. Roles have permissions.

```
Owner  → all permissions
Admin  → most permissions (cannot delete org, cannot change billing)
Member → create and edit own content, read all content
Viewer → read-only
```

**Best for:** Multi-user products with clear team hierarchies. Most B2B SaaS.

### 2. Resource-Based (Ownership)
Permissions are tied to ownership of a specific resource.

```
User can edit a document if: document.createdById === user.id
```

**Best for:** Personal tools, user-generated content without team features.

### 3. Attribute-Based Access Control (ABAC)
Permissions are computed from attributes of the user, the resource, and the context.

```
User can approve a request if:
  user.role === 'manager' AND
  request.department === user.department AND
  request.amount < user.approvalLimit
```

**Best for:** Complex enterprise workflows. Avoid unless you have a specific need — the complexity is significant.

**For most production web apps: RBAC + ownership checks.**

---

## Implementing RBAC

### Define Permissions Explicitly

Don't scatter permission checks across your codebase. Define them in one place.

```ts
// lib/permissions.ts
export const PERMISSIONS = {
  project: {
    create:  ['owner', 'admin', 'member'],
    read:    ['owner', 'admin', 'member', 'viewer'],
    update:  ['owner', 'admin', 'member'],
    delete:  ['owner', 'admin'],
    archive: ['owner', 'admin'],
  },
  organization: {
    update:        ['owner', 'admin'],
    delete:        ['owner'],
    manageBilling: ['owner'],
    inviteMembers: ['owner', 'admin'],
  },
  member: {
    remove:      ['owner', 'admin'],
    changeRole:  ['owner'],
  },
} as const

type Resource = keyof typeof PERMISSIONS
type Action<R extends Resource> = keyof typeof PERMISSIONS[R]
type Role = 'owner' | 'admin' | 'member' | 'viewer'

export function can(role: Role, resource: Resource, action: Action<typeof resource>): boolean {
  const allowed = PERMISSIONS[resource][action] as readonly string[]
  return allowed.includes(role)
}
```

### Fetch the Role Once Per Request

```ts
// lib/auth.ts
export async function getMemberRole(userId: string, organizationId: string) {
  const member = await db.organizationMember.findUnique({
    where: { userId_organizationId: { userId, organizationId } },
    select: { role: true }
  })
  return member?.role ?? null
}
```

### Enforce in Server Actions

```ts
// features/projects/actions.ts
'use server'

export async function deleteProject(projectId: string) {
  const session = await requireSession()

  // 1. Get the project and verify it belongs to the user's org
  const project = await db.project.findUnique({
    where: { id: projectId, organizationId: session.user.organizationId }
  })
  if (!project) throw new Error('Not found')

  // 2. Check role permission
  const role = await getMemberRole(session.user.id, session.user.organizationId)
  if (!role || !can(role, 'project', 'delete')) {
    throw new Error('Insufficient permissions')
  }

  // 3. Proceed
  await db.project.delete({ where: { id: projectId } })
}
```

This pattern — get resource, verify ownership, check role, act — should be consistent across every mutation in your app.

---

## Authorization Layers

Defense in depth. Authorization should exist at multiple layers.

```
UI Layer
  └── Hide or disable actions the user can't perform
      (not a security control — purely UX)

Middleware Layer
  └── Block access to entire route groups by role
      (e.g. /admin/* requires role === 'owner')

Server Action / Route Handler Layer
  └── Verify session + ownership + role on every mutation
      (the real security boundary)

Database Layer (RLS)
  └── Policies enforce tenant isolation at the query level
      (last line of defense)
```

**The UI layer is not a security control.** A user who knows your API can call a Server Action directly, bypassing any UI you've built. Security lives at the server and database layers.

---

## Row Level Security as Authorization (Supabase)

If using Supabase, RLS policies enforce authorization at the database level — even if your application code has a bug.

```sql
-- Members can only read projects in their organization
CREATE POLICY "members_read_own_org_projects"
ON projects FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  )
);

-- Only owners and admins can delete projects
CREATE POLICY "admins_delete_projects"
ON projects FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE user_id = auth.uid()
    AND organization_id = projects.organization_id
    AND role IN ('owner', 'admin')
  )
);
```

RLS adds latency to every query (a subquery per policy). For most apps this is negligible. At very high scale, consider enforcing authorization at the application layer and using RLS as a safety net only.

---

## Invitation and Onboarding Authorization

A common edge case: a user accepts an invitation to an organization they don't yet have an account for.

```
Invite flow:
1. Admin sends invite → creates pending_invitations record (email, org, role, token)
2. Invite email sent with link: /accept-invite?token=xxx
3. User clicks link:
   ├── Already has account → verify token → create membership → redirect /dashboard
   └── No account → redirect /signup?invite=xxx → signup → verify token → create membership
4. Pending invitation deleted after acceptance
5. Token expires after 7 days
```

**Security requirements for invitations:**
- Tokens must be cryptographically random (not sequential IDs)
- Tokens expire
- Tokens are single-use (delete on acceptance)
- Verify the email that accepted matches the email the invite was sent to

---

## Authorization Checklist

- [ ] RBAC model defined with explicit role-permission mapping
- [ ] Permissions defined in a single `permissions.ts` file, not scattered across components
- [ ] Every Server Action verifies: session exists → resource belongs to user's org → role has permission
- [ ] No authorization decisions made on the client side only
- [ ] 404 returned for both "not found" and "unauthorized" on resource endpoints
- [ ] Admin routes protected at both middleware and action level
- [ ] RLS policies written for SELECT, INSERT, UPDATE, DELETE on all tables (if Supabase)
- [ ] Invitation flow uses expiring, single-use tokens
- [ ] UI hides unauthorized actions (UX only — not relied on for security)
- [ ] Role changes take effect within one session cycle (or sooner with token revocation)

---

## AI Prompt — Authorization Design

```
You are a Staff Engineer designing an authorization system for a production multi-tenant SaaS web application.

My app: [describe in 2–3 sentences]
Roles: [e.g. owner, admin, member, viewer]
Core resources: [list 4–6 — e.g. Organization, Project, Task, Comment, Billing, Member]

For each resource, define:
1. Which roles can perform each CRUD operation
2. Any ownership-based exceptions (e.g. members can edit their own comments)
3. Any cross-resource dependencies (e.g. deleting a project requires no active subscriptions)

Then generate:
- A TypeScript PERMISSIONS object covering all resources and actions
- A reusable `can(role, resource, action)` helper function
- A `requirePermission(session, resource, action, resourceOwnerId?)` server utility
- Supabase RLS policies for SELECT and DELETE on the two most sensitive tables

Flag any authorization edge cases I should design for before implementation.
```

---

## Common Authorization Mistakes

**Checking auth but not ownership**
Confirming a user is logged in is not the same as confirming they own the resource. Always scope queries to the user's organization or user ID.

**Authorization only in UI**
Hiding a delete button is not authorization. A direct API call bypasses the UI entirely.

**Different errors for authorized vs unauthorized**
Returning 403 for "exists but forbidden" and 404 for "doesn't exist" leaks information. Always return 404 for both.

**Roles stored only on the client**
Never trust a role sent from the client. Always fetch the role server-side from the database for permission checks.

**Hardcoding role checks inline**
```ts
//  Scattered, inconsistent, hard to audit
if (user.role === 'admin' || user.role === 'owner') { ... }

//  Centralized, auditable
if (can(user.role, 'project', 'delete')) { ... }
```

A centralized permissions table means you can audit your entire authorization model in one file — and change it in one place.
