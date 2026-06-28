---
title: Admin Panel
slug: admin-panel
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Admin Panel

Your admin panel is an internal tool. It's not a feature users pay for. It's the control surface your team uses to operate the product.

The mistake most SaaS teams make is either building it too early (over-engineering a full custom UI before you have customers) or too late (manually running SQL queries in production to handle support tickets). The right time is when manual operations start costing you more than the build would.

---

## What an Admin Panel Actually Needs to Do

Before picking a tool or writing code, map the operations your team will actually perform.

**Common admin operations in SaaS:**

| Operation | Who needs it | Frequency |
|---|---|---|
| View / impersonate a user | Support | Daily |
| Manually change a user's plan | Success | Weekly |
| Suspend or delete an account | Trust & Safety | As needed |
| View an organization's usage | Support, Sales | Daily |
| Manually trigger an email or notification | Support | Weekly |
| Override feature flags for a customer | Engineering | As needed |
| View audit logs | Security, Compliance | As needed |
| Inspect a failed job or webhook | Engineering | Weekly |

If your list looks like this — and it usually does — you do not need a custom-built admin panel. You need the right combination of existing tools.

---

## The Three Admin Panel Patterns

### Pattern A — No-Code: Retool / Appsmith / Internal

**When to use:** You have support staff who are not engineers. Operations need a UI. You want to ship in a day.

Retool connects directly to your Postgres database and REST APIs. You drag and drop tables, forms, and buttons. A functional user management UI takes 2–4 hours.

```
Retool → connects to → PostgreSQL + your REST API
                     ↓
         Support team performs operations via UI
         without ever touching the database directly
```

**Pros:** Fast, low-code, non-engineers can use it, audit log built in.  
**Cons:** $10–20/user/month at scale, you're dependent on a vendor.

---

### Pattern B — Metabase + Manual API Calls

**When to use:** Your team is technical. Most admin operations are read-heavy (viewing data, investigating issues). Writes happen rarely and can go through your existing API.

Point Metabase at your database for read operations. For writes, your engineering team uses the admin API endpoints directly (curl, Postman, or a thin internal form).

This is the right answer for small teams where engineers handle support.

---

### Pattern C — Custom Admin Routes in Your Existing App

**When to use:** You need deep integration with your product's business logic. Operations are complex. You'll have dedicated support staff long-term.

Build a protected `/admin` section inside your existing application. This is real engineering work — plan for 1–2 weeks to build something genuinely useful.

This is the right long-term answer for most SaaS products. The question is when, not whether.

---

## Building Custom Admin Routes

If you're going with Pattern C, here's how to structure it correctly.

### Access Control

Admin access is a separate concern from your regular authorization model. Do not use the same role system.

```typescript
// middleware/admin.ts
export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = req.user; // from auth middleware

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Admin access is an explicit flag — not a role that can be assigned through normal flows
  if (!user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Log every admin action — who did what, when
  await db.adminAuditLog.create({
    data: {
      adminUserId: user.id,
      action: `${req.method} ${req.path}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      requestBody: sanitizeForLog(req.body),
    },
  });

  next();
}
```

**Never derive admin access from a role users can assign to themselves.** It must be set directly in the database by another admin or via a protected seed/migration.

### Core Admin Endpoints

```typescript
// routes/admin.ts — mounted at /api/admin with adminMiddleware

// List users with search and filtering
GET /api/admin/users?search=john&plan=pro&page=1

// View a specific user and their organization context
GET /api/admin/users/:userId

// Impersonate a user (see the product as them)
POST /api/admin/users/:userId/impersonate

// Manually change a user's plan
PATCH /api/admin/users/:userId/plan
Body: { plan: "pro", reason: "support_request_#1234" }

// Suspend an account
POST /api/admin/organizations/:orgId/suspend
Body: { reason: "payment_fraud", notifyUser: true }

// View organization usage
GET /api/admin/organizations/:orgId/usage

// View audit log for a user
GET /api/admin/users/:userId/audit-log
```

### Impersonation

Impersonation is the highest-leverage admin capability. It lets support staff see exactly what a user sees without asking them to share a screen.

```typescript
// POST /api/admin/users/:userId/impersonate
async function impersonateUser(req: Request, res: Response) {
  const { userId } = req.params;
  const adminUser = req.user;

  const targetUser = await db.user.findUnique({ where: { id: userId } });
  if (!targetUser) return res.status(404).json({ error: 'User not found' });

  // Log the impersonation explicitly — this is a high-sensitivity action
  await db.adminAuditLog.create({
    data: {
      adminUserId: adminUser.id,
      action: 'impersonate_user',
      targetUserId: userId,
      ipAddress: req.ip,
    },
  });

  // Issue a short-lived session token that carries the impersonation context
  const impersonationToken = await createSession({
    userId: targetUser.id,
    impersonatedBy: adminUser.id,  // preserve who initiated this
    expiresIn: '1h',               // short expiry
  });

  res.json({ token: impersonationToken });
}
```

**Show a persistent banner** when a session is impersonated. Every action taken under impersonation should be clearly visible to both the admin and in logs.

```typescript
// In your session middleware — set a flag from the token
if (session.impersonatedBy) {
  req.isImpersonating = true;
  req.impersonatingAdminId = session.impersonatedBy;
}
```

```tsx
// ImpersonationBanner.tsx
{isImpersonating && (
  <div className="impersonation-banner">
     You are viewing this account as an admin. Actions taken here affect a real user.
    <button onClick={exitImpersonation}>Exit</button>
  </div>
)}
```

---

## The Audit Log

Every admin operation must be logged. Not for compliance theatre — because when something goes wrong, you need to know who changed what and when.

```sql
CREATE TABLE admin_audit_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL REFERENCES users(id),
  target_user_id UUID REFERENCES users(id),
  target_org_id  UUID REFERENCES organizations(id),
  action        TEXT NOT NULL,
  metadata      JSONB,
  ip_address    INET,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_admin_user ON admin_audit_log(admin_user_id);
CREATE INDEX idx_audit_target_user ON admin_audit_log(target_user_id);
CREATE INDEX idx_audit_created ON admin_audit_log(created_at DESC);
```

Audit logs are append-only. Never update or delete them. If you ever have a compliance audit, a security incident, or a rogue employee situation, this table is what you reach for.

---

## AI Prompt — Admin Panel Scoping

Use this before you build anything.

```prompt
You are a senior product engineer helping scope an admin panel for a SaaS product.

Product context:
[Describe your product — what it does, who uses it]

Current team size and roles:
[e.g. 2 engineers, 1 founder handling support]

Operations I currently handle manually:
[List the things you do manually in the database or via API calls today]

Tools I'm already using:
[e.g. Postgres, Stripe, PostHog, Retool, etc.]

Please help me:
1. Identify which operations genuinely need a UI vs which can stay as API calls
2. Recommend whether to use a no-code tool or build custom routes, given my team size
3. List the 5 admin capabilities that would save my team the most time
4. Flag any security risks in the operations I've listed
5. Suggest what I should NOT build yet

Be specific to my context. Don't give generic admin panel advice.
```

---

## Implementation Checklist

### Access Control

- [ ] Admin flag is separate from the regular role system
- [ ] Admin flag cannot be self-assigned through any user-facing flow
- [ ] Admin routes require a dedicated middleware check
- [ ] Admin sessions are separate from or clearly distinct from user sessions

### Audit Logging

- [ ] Every admin action writes to an audit log
- [ ] Audit log captures: who, what, when, IP, target entity
- [ ] Audit log is append-only (no UPDATE or DELETE)
- [ ] Audit log is queryable by admin user, target user, and date range

### Core Capabilities

- [ ] User search with filtering (plan, status, signup date)
- [ ] Organization overview (members, usage, plan, billing status)
- [ ] Plan override with required reason field
- [ ] Account suspension with optional user notification
- [ ] Impersonation with banner and short-lived token

### Security

- [ ] Admin panel not accessible to regular users under any role escalation path
- [ ] Impersonation requires explicit log entry
- [ ] Admin panel behind IP allowlist or VPN if team is remote (optional but recommended)
- [ ] Rate limiting on admin endpoints
- [ ] Admin actions do not bypass application-level validation

---

## Common Mistakes

> ** Building the admin panel before you have support volume**
> If you're a solo founder with 20 users, run SQL queries. The admin panel is a tool for when manual operations become a bottleneck, not a day-one requirement.

> ** Giving admin access via a regular role**
> If `role = "admin"` is stored in a column that your own API can modify, a privilege escalation bug gives users admin access. Admin must be a separate flag set out-of-band.

> ** No audit log**
> Without logs, you cannot answer "who changed this user's plan?" or "did anyone access this account?" in a security incident. Add the audit log before the first admin user exists.

> ** Impersonation without a banner**
> An admin impersonating a user and forgetting they're impersonating them has caused real data incidents. The banner is not optional UX — it's a safety mechanism.

> ** Admin panel on the same subdomain with no additional auth**
> `/admin` protected only by a role check is one IDOR bug away from exposure. Consider a separate subdomain (`admin.yourapp.com`) with enforced 2FA, or at minimum an IP restriction.

---

## What's Next

Your admin panel gives your team operational control of the product without touching the database directly. Before moving on, confirm:

- At least one admin user exists and can log in
- You've tested the audit log by performing a real admin action
- Impersonation shows the banner correctly and expires within 1 hour

Next up: **File Uploads**
