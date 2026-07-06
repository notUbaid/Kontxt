---
title: Auth Implementation
slug: auth-implementation
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 25-30 min
---

# Auth Implementation (Identity & Sessions)

## Moving from Theory to Cryptography

In Phase 2, you architected the Multi-Tenant User schema (Identity vs. Entity) and decided on HttpOnly cookies. This module is where you implement the actual cryptographic session management that your entire backend will rely on.

If your Auth Implementation is flawed, your Authorization rules, Payment routing, and Dispute resolution are entirely compromised. A production auth system must not only verify who someone is, but mathematically prove it on every request without requiring a database lookup every time.

---

## The Production Session Architecture

You must implement a Dual-Token architecture using `HttpOnly` cookies. Never store tokens in `localStorage`.

| Token Type | Lifespan | Where It Lives | Purpose |
|---|---|---|---|
| **Access Token (JWT)** | Short (15 mins) | Memory / `HttpOnly` Cookie | Cryptographically proves identity and roles to your API. |
| **Refresh Token (Opaque)** | Long (30 days) | `HttpOnly` Strict Cookie | Used only against the `/auth/refresh` endpoint to get a new Access Token. |

**The Workflow:**
1. User logs in. Server sets two `HttpOnly` cookies: `accessToken` and `refreshToken`.
2. Frontend makes an API request. The browser automatically attaches the cookies.
3. Backend middleware verifies the `accessToken` signature. If valid, the request proceeds.
4. If `accessToken` is expired, the backend rejects it.
5. Frontend catches the 401 error, calls `/auth/refresh` (sending the `refreshToken`), gets a new `accessToken` cookie, and retries the original request seamlessly.

---

## JWT Custom Claims for Multi-Tenancy

Because you are building a multi-tenant B2B2C marketplace, your Access Token must contain more than just a `user_id`. Querying the database on every request to figure out which Organization a user belongs to will destroy your API performance.

You must inject **Custom Claims** into your JWT during the login flow:

```json
{
  "sub": "user_4521",
  "email": "admin@supplier.com",
  "app_metadata": {
    "org_id": "org_992",
    "org_role": "admin",
    "account_status": "active"
  },
  "exp": 1718293841
}
```

Now, your Edge Middleware can parse the JWT and instantly know the user's role and organization without ever touching Postgres.

---

## Session Revocation (The Banned User Problem)

If you ban a malicious seller, they must be disconnected immediately. 

Because JWTs are stateless, if a banned seller holds a valid 15-minute Access Token, they can continue doing damage until it expires.

**The Production Solution:**
1. When an Admin bans a user, revoke their Refresh Token in the database.
2. For immediate Access Token invalidation, you must either keep Access Token lifespans incredibly short (e.g., 5 minutes) OR implement a Redis Token Blacklist.
3. If using Redis, every API request checks: `redis.exists(jwt_jti)`. If true, the token is blacklisted and the request is rejected.

---

## B2B Enterprise SSO (SAML)

If your marketplace has B2B buyers or sellers (e.g., Corporate Procurement departments), they will refuse to create new passwords. They will demand SSO (Single Sign-On) via Okta, Entra ID (Azure), or Google Workspace.

> [!IMPORTANT]
> If you are building a B2B marketplace, do not attempt to hand-roll SAML or OIDC. You must use a provider like Auth0, Clerk, or WorkOS that abstracts enterprise SSO into a single unified API.

---

## Do's and Don'ts of Production Auth

- **DO enforce strict Cookie Attributes.** Your cookies must have `Secure=true`, `HttpOnly=true`, and `SameSite=Lax` (or `Strict`). If you omit these, you are vulnerable to CSRF and XSS attacks.
- **DON'T rely solely on Social Login.** Apple and Google login are great for retail buyers, but B2B sellers need professional email logins. Always offer robust Email/Password authentication with forced MFA (Multi-Factor Authentication) for Seller accounts.
- **DO verify emails before granting Write access.** A user can browse listings immediately after signing up, but they must verify their email (and potentially phone number via Twilio) before creating a listing or sending a message.
- **DON'T trust the token payload without verifying the signature.** Always use a robust JWT library (like `jose` or `jsonwebtoken`) to cryptographically verify the token against your provider's JWKS (JSON Web Key Set) endpoint.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — HttpOnly Refresh Flow:**

````prompt
Act as a Senior Security Engineer. I am using Node.js/Next.js and [Supabase/Auth0]. Write the exact API route logic to implement a secure Refresh Token rotation flow. The route must read the `HttpOnly` refresh token, validate it against the provider, issue a new Access Token, set the new tokens as `HttpOnly` `Secure` `SameSite=Lax` cookies, and return a success response to the client. Include error handling for revoked tokens.
````

> [!TIP]
> **Prompt 2 — Edge Middleware JWT Validation:**

````prompt
I am using Next.js Middleware. Write the edge-compatible code (using the `jose` library) to intercept incoming requests to `/api/protected/*`. It must extract the JWT from the `HttpOnly` cookie, verify the cryptographic signature using a remote JWKS URL, check if `app_metadata.account_status === 'active'`, and either rewrite the request headers with the `org_id` or return a 401 Unauthorized.
````

---

## Validating What AI Generates

- **Check for LocalStorage:** If the AI writes React code that saves the JWT to `localStorage.setItem('token', token)`, reject it entirely. Demand the `HttpOnly` cookie implementation.
- **Verify Edge Compatibility:** If using Next.js Middleware, ensure the AI uses the `jose` library, not `jsonwebtoken`, as standard Node.js crypto libraries do not run on the Edge Runtime.

---

## Implementation Checklist

- [ ] Integrated the chosen Auth Provider (Auth0, Clerk, Supabase).
- [ ] Configured the Dual-Token (Access + Refresh) architecture exclusively via `HttpOnly` cookies.
- [ ] Injected Custom Claims (`org_id`, `role`, `account_status`) into the Access Token payload.
- [ ] Built the Edge Middleware to cryptographically verify JWTs on every protected route.
- [ ] Implemented a session revocation strategy (Redis Blacklist or Short-Lived Tokens) for immediate ban enforcement.

---

## What's Next

Next: **Database** — With secure, stateless identity established, we will move to the data layer. We will implement the complex relational schemas, indexes, and migrations required to safely store our marketplace data.
