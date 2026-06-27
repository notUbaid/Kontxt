---
title: Authorization & Roles
slug: authorization-roles
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Authorization & Roles

Authentication answers "who is this user?" Authorization answers "what are they allowed to do?" These are different systems, and conflating them is how SaaS products end up with regular users who can accidentally access admin functionality the UI just happened not to show them.

---

## Decision 1: Permission Model

| Model | Description | Use when |
|---|---|---|
| Role-Based Access Control (RBAC) | Fixed roles (owner, admin, member, viewer) each with a predefined set of permissions | Default choice for most SaaS — predictable, easy to reason about |
| Attribute-Based / fine-grained permissions | Permissions composed dynamically from user attributes, resource attributes, and context | Only needed when customers require custom permission sets per workspace (common in enterprise tiers) |

>  **Best Practice**
> Start with **RBAC**. A small, fixed set of roles covers the vast majority of SaaS needs and is far easier to audit and reason about than a fully dynamic permission system. Move to fine-grained permissions only when a real customer requirement (usually enterprise) demands custom roles — don't build that flexibility speculatively.

---

## Decision 2: Define Your Roles

> **Decision Card — Typical SaaS Role Set**
- **Owner** — full control, including billing and the ability to delete the workspace. Usually exactly one per workspace, or a small set.
- **Admin** — manage members, settings, integrations — but not necessarily billing (recall the Branding/IA decision to keep billing access tightly scoped).
- **Member** — full use of core product features, no workspace management.
- **Viewer/Guest** (if needed) — read-only access, common for stakeholders who need visibility without edit rights.

Don't invent more roles than your actual feature set needs. Every additional role is another set of permission checks to maintain and another source of "wait, can a Manager do this or not?" ambiguity.

---

## Decision 3: Where Authorization Is Enforced

> ️ **Warning**
> **Authorization must be enforced on the server, every time, for every request.** Hiding a button in the UI for users without permission is a UX nicety, not a security control. Any user can call your API directly, bypassing your frontend entirely. If the server doesn't independently verify permission, your "permission system" is decorative.

This connects directly to Backend Architecture's middleware design:

- [ ] Role/permission checks happen in middleware or at the top of the service layer — not scattered as inline `if` statements across routes
- [ ] Checks are **resource-aware**, not just role-aware — "is this user an admin" is different from "is this user an admin *of this specific workspace*" or "does this user own *this specific resource*"
- [ ] A centralized permission-checking function/module is the single source of truth — never duplicate the logic per route

---

## Decision 4: Resource Ownership vs. Role

Role alone often isn't enough. Many actions need an ownership check on top of a role check:

| Check type | Example |
|---|---|
| Role check | "Is this user an admin of this workspace?" |
| Ownership check | "Did this user create this specific comment/document?" (a Member might be allowed to edit their own comment but not someone else's) |
| Combined | "Is this user an admin (can edit anything) OR the owner of this specific resource?" |

> ️ **Warning**
> Forgetting the ownership check is a common, subtle bug: a Member role might correctly be blocked from admin actions, but still be able to edit *another member's* resource if the check only verifies role and not ownership. Always ask explicitly: does this action need a role check, an ownership check, or both?

---

## Decision 5: Audit Logging for Sensitive Actions

For production SaaS, log who did what for actions with real consequences:

- [ ] Role/permission changes (someone was promoted to admin, someone was removed)
- [ ] Billing changes
- [ ] Data deletion (workspace deletion, bulk deletes)
- [ ] Permission-denied attempts on sensitive resources (useful for detecting probing/attack attempts)

This doesn't need to be elaborate — a simple `audit_logs` table (actor, action, target, timestamp) covers most needs and is invaluable when investigating "how did this happen" after the fact.

---

## Common AI Mistakes to Watch For

- **Checks role only in the frontend** ("hide the button if not admin") with no corresponding server-side check — always verify both exist.
- **Checks role but not ownership** — ask explicitly whether an action needs an ownership check too.
- **Scatters permission logic per-route** instead of centralizing it — push back and ask for one reusable permission-checking function.
- **Invents extra roles** not in your defined set — keep AI output constrained to your actual role list.
- **Skips audit logging entirely** unless explicitly requested for sensitive actions.

---

## AI Prompt: Implement Authorization Checks

```
I'm implementing authorization for a production SaaS using RBAC.

Roles: owner, admin, member, viewer (use exactly these — do not invent additional roles)
Permission rules: [list a few key rules, e.g., "only owner can access billing", "admin can manage members", "member can edit their own resources only"]

For the following actions, implement a server-side authorization check (not just UI hiding), and state explicitly whether each needs a role check, an ownership check, or both:
[list specific actions, e.g., "delete a workspace", "edit an invoice", "remove a team member"]

Centralize the permission logic in one reusable function/module rather than duplicating checks inline per route. For any action involving billing changes, role changes, or deletion, also log the action to an audit_logs table (actor, action, target, timestamp).
```

---

## Validate Before You Move On

- [ ] Every sensitive action has a server-side authorization check — UI-only hiding is never the only control
- [ ] Permission logic is centralized in one place, not duplicated per route
- [ ] Actions that need an ownership check (not just a role check) have one
- [ ] Role set matches your actual product needs — no speculative extra roles
- [ ] Sensitive actions (role changes, billing, deletions) are audit-logged
- [ ] You can answer, for any action in the product: "who exactly is allowed to do this, and where is that enforced?"

> [!TIP]
> Keep your role-and-permission matrix as a simple reference table. It becomes the shared source of truth for Backend implementation, Admin Panel, and any future fine-grained permission work — instead of re-deriving "who can do what" from scratch each time.

---

**Next:** File Storage — apply these same authorization principles to user-uploaded files.
