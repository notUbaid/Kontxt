---
title: Authentication
slug: authentication
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Authentication

Authentication is the one area of a production SaaS where "build it yourself to learn it" is usually the wrong call. Auth bugs are security incidents, not UX bugs — and the failure modes (session fixation, token replay, weak password storage) are well-known, well-exploited, and easy to get subtly wrong even when the code looks correct.

---

## Decision 1: Build vs. Buy

> **Decision Card**
> For a production SaaS, default to a **managed auth provider** (Clerk, Auth0, Supabase Auth, WorkOS) rather than building authentication from scratch. They've already solved session security, password hashing, OAuth flows, and increasingly SSO/SAML — problems that are genuinely hard to get right and genuinely uninteresting to differentiate on. Your product's value isn't "we built our own login system."

| Approach | Use when |
|---|---|
| Managed provider (Clerk, Auth0, Supabase Auth, WorkOS) | Default choice — fastest to production, security-reviewed, handles edge cases you haven't thought of yet |
| Self-hosted auth library (NextAuth/Auth.js, Lucia) | You need full control over the data model or have specific constraints a managed provider can't meet |
| Fully custom auth | Only with genuine security expertise on the team — the cost of getting this wrong (a breach) far outweighs any benefit of building it yourself |

> [!WARNING]
> If you do build your own: **never hand-roll password hashing.** Use a vetted library implementing bcrypt or argon2. Never store plaintext passwords, ever, even temporarily, even in logs.

---

## Decision 2: Session Strategy

| Approach | Tradeoff |
|---|---|
| Server-side sessions (session ID in a cookie, session data in DB/Redis) | Easy to revoke instantly (delete the session record); requires a session store |
| JWT (stateless) | No session store needed, scales easily across servers; **revocation is hard** — a JWT is valid until it expires, you can't simply "delete" it |

>  **Best Practice**
> For most production SaaS, prefer **server-side sessions** (or short-lived JWTs with a refresh-token rotation pattern and a server-side revocation list) over long-lived stateless JWTs. The ability to instantly revoke access — when a user logs out, when an account is compromised, when an admin removes a team member — matters more in a multi-tenant SaaS than the marginal scaling benefit of pure statelessness.

---

## Decision 3: Required Auth Flows

- [ ] **Email verification** before granting full access (prevents fake/throwaway accounts and confirms you can actually reach the user)
- [ ] **Password reset** with a single-use, time-limited token (15–30 minutes), invalidated after use
- [ ] **Login rate limiting** — lock out or delay after repeated failed attempts from the same account/IP, to prevent brute-force attacks
- [ ] **Logout that actually revokes** the session, not just clears the client-side cookie

> [!WARNING]
> A password reset token that doesn't expire, or can be reused after the password is already reset, is a real, exploitable vulnerability — not a theoretical one. Verify both properties explicitly on any auth flow, whether you built it or a managed provider handles it.

---

## Decision 4: Multi-Factor Authentication (MFA)

For a production SaaS handling business data, plan for MFA even if you don't require it for every user at launch:

- [ ] Support TOTP-based MFA (authenticator apps) as an optional account setting
- [ ] Plan to make MFA **required** for admin/owner roles as the product matures — these accounts have the most damage potential if compromised

> [!TIP]
> Most managed auth providers support MFA as a built-in toggle. This is one of the clearest cases where "buy" beats "build" — implementing TOTP correctly yourself is solvable but unnecessary work when it's a checkbox in a managed provider's dashboard.

---

## Decision 5: Social Login & SSO

| Need | Approach |
|---|---|
| Consumer convenience (Google/GitHub login) | Standard OAuth via your auth provider — low effort, high adoption benefit |
| Enterprise customer requirement (SAML/SSO) | Plan for this once you have enterprise customers asking — most managed providers offer it as a paid tier, building it yourself is a substantial undertaking |

---

## Common AI Mistakes to Watch For

- **Generates custom password hashing code** instead of using a vetted library or managed provider — always question hand-rolled crypto.
- **Issues long-lived JWTs with no revocation strategy** — ask explicitly how a compromised token or logged-out user is actually invalidated.
- **Skips rate limiting on login/password-reset endpoints** — these are exactly the endpoints brute-force and credential-stuffing attacks target.
- **Reset tokens with no expiry or no single-use enforcement** — verify both explicitly.
- **Stores session/auth data inconsistently** with your multi-tenant model — confirm the session includes (or can resolve) the user's current workspace context, consistent with your Database Schema and tenancy decisions.

---

## AI Prompt: Implement Auth Flows

```
I'm implementing authentication for a production SaaS using [Clerk / Auth0 / Supabase Auth / NextAuth — state your choice].

Context:
- Session strategy: [server-side sessions / short-lived JWT with refresh rotation]
- Multi-tenancy model: [from Database Schema — e.g., workspace_id on every tenant-scoped table]

Implement:
1. Sign-up with email verification before full access is granted.
2. Login with rate limiting on repeated failed attempts.
3. Password reset with a single-use token expiring in 30 minutes.
4. Logout that revokes the session server-side, not just client-side.

Explain explicitly how a compromised session or token gets revoked under this approach. Do not hand-roll password hashing — use [the provider's built-in handling / a vetted library, name it].
```

---

## Validate Before You Move On

- [ ] Auth is handled by a managed provider, or by a vetted library if self-hosted — no hand-rolled password hashing
- [ ] You can explain exactly how a session/token gets revoked (logout, compromise, admin removal)
- [ ] Email verification is required before full account access
- [ ] Password reset tokens are single-use and time-limited
- [ ] Login attempts are rate-limited
- [ ] MFA is at least available as an option, with a plan to require it for admin/owner roles
- [ ] Session data resolves correctly to your multi-tenant model (workspace context)

> [!TIP]
> Once auth is decided, this becomes the foundation for the next module — Authorization & Roles builds directly on top of "who is this user," deciding "what can they actually do."

---

**Next:** Authorization & Roles — define what authenticated users are actually permitted to do.
