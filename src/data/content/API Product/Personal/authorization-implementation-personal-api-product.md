---
title: Authorization Implementation
slug: authorization-implementation
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 25-35 min
---

# Authorization Implementation

Authentication answered "who is this?" Authorization answers "what are they allowed to do?"

These are different problems with different failure modes. A broken authentication system locks people out. A broken authorization system leaks other people's data — silently, and often for months before anyone notices. For an API product, this is the single most common way solo-built APIs get breached.

> **Why this matters more for APIs than web apps**
> A web app hides broken authorization behind a UI that only shows buttons for actions you're allowed to take. An API has no UI. Every endpoint is directly reachable by anyone who can construct a request. If the authorization check isn't in the code, it doesn't exist.

---

## The Core Question

For every endpoint, you need a confident answer to:

> "Given this authenticated user, are they allowed to perform this action on this specific resource?"

Notice the two parts: **the action** (read, write, delete) and **the specific resource** (this record, not just "records in general"). Most authorization bugs happen because engineers check the first part and forget the second.

---

## Choose Your Authorization Model

| Model | What it checks | Complexity | Best for |
|---|---|---|---|
| **Ownership-based** | "Does this user own this resource?" | Low | Solo APIs, single-tenant resources (default for personal projects) |
| **Role-based (RBAC)** | "Does this user's role permit this action?" | Medium | Multiple user types (admin/member/viewer) |
| **Scope-based** | "Does this API key/token have this permission?" | Medium | Public APIs, third-party integrations |
| **Attribute-based (ABAC)** | "Do these dynamic attributes satisfy a policy?" | High | Complex multi-tenant B2B systems |

> **Decision card — Recommended for Personal mode**
> Start with **ownership-based authorization**. It solves 90% of real authorization needs for a solo-built API: "a user can only read/edit/delete records they created." Add role-based checks only if you genuinely have distinct user types (e.g., admin endpoints). Don't build ABAC — it's solving a problem you don't have yet, and it will cost you hours of complexity for zero user-facing value at this stage.

If your API will eventually issue public API keys to third-party developers, note that down now — scope-based authorization becomes relevant in the upcoming **API Keys Management** module. You don't need to build it yet.

---

## Pattern 1: Authorization Middleware

Keep authorization logic out of your route handlers. A middleware (or equivalent guard/decorator in your framework) that runs after authentication keeps the check consistent and impossible to forget.

```typescript
// middleware/authorize.ts
import { Request, Response, NextFunction } from "express";

// Runs AFTER your authentication middleware has set req.user
export function requireOwnership(
  loadResource: (id: string) => Promise<{ userId: string } | null>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const resource = await loadResource(req.params.id);

    if (!resource) {
      // Return 404, not 403 — don't confirm the resource exists
      return res.status(404).json({ error: "Not found" });
    }

    if (resource.userId !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.resource = resource; // avoid a second DB fetch in the handler
    next();
  };
}
```

```typescript
// routes/projects.ts
router.delete(
  "/projects/:id",
  authenticate,
  requireOwnership((id) => db.project.findUnique({ where: { id } })),
  deleteProjectHandler
);
```

> **Tip — 404 vs 403**
> When a resource exists but isn't the user's, return `404` instead of `403` in most cases. Returning `403` confirms the resource exists, which leaks information to an attacker probing IDs. Use `403` only when the resource's existence is not itself sensitive (e.g., admin-only endpoints on a shared listing).

---

## Pattern 2: The Vulnerability You Must Design Against — BOLA

**Broken Object Level Authorization (BOLA)**, also called IDOR (Insecure Direct Object Reference), is the **#1 issue in the OWASP API Security Top 10**. It's the most common real-world API vulnerability, and it's almost entirely a beginner mistake — which makes it exactly the kind of thing AI-generated code gets wrong by default.

**The bug looks like this:**

```typescript
// VULNERABLE — checks authentication, forgets ownership
router.get("/invoices/:id", authenticate, async (req, res) => {
  const invoice = await db.invoice.findUnique({ where: { id: req.params.id } });
  res.json(invoice); // any authenticated user can read ANY invoice
});
```

The endpoint correctly verifies the request comes from a logged-in user. It never verifies the invoice belongs to *that* user. Change the ID in the URL, get someone else's data.

**The fix is always the same shape:** scope every query by the authenticated user's ID, not just by the resource ID.

```typescript
// SAFE — ownership is part of the query itself
router.get("/invoices/:id", authenticate, async (req, res) => {
  const invoice = await db.invoice.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (!invoice) return res.status(404).json({ error: "Not found" });
  res.json(invoice);
});
```

> **Why this version is safer than "fetch then check"**
> Scoping ownership into the database query (rather than fetching the record and checking `.userId` afterward in application code) means there's no code path where the check can be accidentally skipped, commented out, or bypassed by a refactor. Prefer this pattern whenever your ORM supports it.

---

## Nested and Related Resources

BOLA gets worse with nested resources, because it's easy to authorize the parent and forget the child.

```
GET /projects/:projectId/tasks/:taskId
```

Checking that `projectId` belongs to the user is not enough. You also need to verify `taskId` belongs to `projectId`. Otherwise a user can access any task in the system as long as they own *any* project, by mixing IDs from two different projects.

```typescript
// Verify the FULL chain of ownership, not just the top level
const task = await db.task.findFirst({
  where: {
    id: req.params.taskId,
    project: { id: req.params.projectId, userId: req.user.id },
  },
});
```

---

## AI Prompt: Generate Authorization Middleware

Use this once your resource model is finalized. Give it your actual schema so the check is scoped correctly on the first try.

```
I'm building authorization middleware for a [framework] API.

Here is my data model:
[paste relevant Prisma/SQL schema for the resource]

Requirements:
- Ownership-based authorization: users can only access resources where
  [resource].userId matches the authenticated user's ID
- Return 404 (not 403) when a resource exists but isn't owned by the user
- Handle nested resources: verify the full ownership chain, not just
  the top-level parent
- Scope the ownership check into the database query itself, not as a
  separate check after fetching

Generate the middleware and one example route using it. Do not add
role-based logic — this is ownership-only for now.
```

> **Token efficiency**
> Paste only the schema for the resource you're authorizing, not your entire database schema. A focused prompt produces a focused, correct answer — and costs a fraction of the tokens.

---

## AI Prompt: Authorization Security Review

Run this against AI-generated route handlers before you trust them, including your own from the prompt above.

```
Review this API route for authorization vulnerabilities:

[paste route handler code]

Specifically check for:
1. Broken Object Level Authorization (BOLA) — does every query that
   returns or modifies a specific resource scope by the authenticated
   user's ID?
2. Nested resource bypass — if this route touches related/child
   resources, is the full ownership chain verified?
3. Mass assignment — can the request body overwrite fields like
   userId, role, or isAdmin that shouldn't be user-controlled?
4. Information leakage — does a 403 vs 404 response reveal whether a
   resource exists to users who shouldn't know?

List each finding with severity and the specific line it applies to.
```

---

## Validating AI-Generated Authorization Code

AI models frequently generate code that checks authentication and silently omits the ownership check — the code compiles, the happy path works in testing, and the vulnerability only surfaces when someone tries a different user's ID.

**Red flags to look for in any AI output:**

- A query that fetches by resource ID alone (`findUnique({ where: { id } })`) with no `userId` in the `where` clause
- An ownership check written as a separate `if` statement *after* the fetch, rather than built into the query — easy to accidentally delete during a later edit
- Nested routes where only the outermost resource's ownership is verified
- Request bodies passed directly into an update/create call without stripping fields like `userId` or `role`

---

## Validation Checklist

- [ ] Every endpoint that returns a specific resource scopes the query by the authenticated user's ID
- [ ] Every endpoint that modifies or deletes a resource re-verifies ownership (never trust a prior GET)
- [ ] Nested resources verify the full ownership chain, not just the top-level parent
- [ ] Authorization checks live in middleware/guards, not duplicated across route handlers
- [ ] Responses use 404 for "not yours" unless resource existence is genuinely non-sensitive
- [ ] Request bodies are never spread directly into database writes — allow-list the fields you accept
- [ ] You've tested at least one request using a different user's resource ID and confirmed it fails

---

## What's Next

With ownership-based authorization in place, the next module — **API Keys Management** — builds on this foundation to let users authenticate with API keys instead of session tokens, which is where scope-based permissions (read-only keys, write keys) become relevant.
