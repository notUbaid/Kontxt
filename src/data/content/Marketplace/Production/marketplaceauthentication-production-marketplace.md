---
title: Authentication
slug: authentication
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Authentication (Identity & Security)

## Why Marketplace Auth Is High Stakes

In a standard SaaS app, a compromised user account means someone loses access to a software tool. In a production marketplace, a compromised account (Account Takeover / ATO) means someone’s bank account gets drained or a fraudulent listing steals money from dozens of buyers. 

Authentication in a marketplace is not just about logging in; it is the foundational layer of Trust & Safety. If your auth architecture is weak, your entire platform is legally and financially compromised.

---

## The Core Production Auth Requirements

You must explicitly design your authentication architecture to handle the complex realities of multi-party financial transactions.

| Requirement | The Production Reality |
|---|---|
| **Multi-Factor Authentication (MFA)** | Sellers managing payouts *must* have MFA enabled. You cannot protect funds with a simple password. |
| **Session Invalidation** | If a user reports their account compromised, your backend must be able to instantly invalidate all active JWTs across all devices. |
| **Bot Protection (reCAPTCHA)** | Card testing bots will hammer your checkout and signup endpoints. You must implement invisible CAPTCHA on all auth flows. |
| **OAuth / SSO Integration** | B2B buyers expect SAML/SSO. B2C buyers expect Apple/Google login. Friction here kills your conversion rate. |

---

## The Enterprise User Model: B2B vs. B2C

The biggest architectural mistake in marketplace design is hardcoding a `role: "buyer" | "seller"` column on a standard `User` table. 

At production scale, sellers are rarely individuals; they are *Organizations* (multi-tenant B2B). Buyers are usually individuals (B2C). Your database schema must decouple the *Identity* from the *Entity*.

**The Production Schema Pattern:**
1. **User Table:** Contains Identity (Email, Password Hash, MFA secret).
2. **Organization Table:** Contains the Business Entity (Tax ID, Stripe Account ID).
3. **Membership Table (The Join):** Links a `User` to an `Organization` with specific roles (Admin, Manager, Support).

This allows one user (e.g., an agency manager) to manage listings for three different seller organizations using a single login.

---

## Do's and Don'ts of Production Auth

> [!CAUTION]
> Never store JWTs (JSON Web Tokens) in `localStorage`. They are immediately vulnerable to XSS (Cross-Site Scripting) attacks. If a malicious listing description runs a script, it will steal the tokens of every buyer who views it.

- **DO use HttpOnly Cookies.** Your auth provider must issue secure, HttpOnly cookies for session management so client-side JavaScript cannot access the token.
- **DON'T build custom Auth.** Never write your own password hashing or token rotation logic. Use an enterprise-grade provider like Auth0, Supabase Auth, or Clerk. They have entire teams dedicated to patching zero-day vulnerabilities.
- **DO require Email Verification.** A user must verify their email or phone number before they can send a message or create a listing. Unverified accounts are the primary source of marketplace spam.
- **DON'T rely solely on Passwords.** Implement Magic Links or Passkeys (WebAuthn) to drastically reduce support tickets for forgotten passwords and improve conversion rates.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Multi-Tenant Schema Design:**

````prompt
I am building a B2B2C marketplace using [Your Database/ORM]. Act as a Senior Database Architect. Design a multi-tenant authentication schema where a single User (Identity) can belong to multiple Organizations (Sellers) with different Roles (RBAC). Provide the strict SQL or Prisma schema required to model this relationship securely.
````

> [!TIP]
> **Prompt 2 — Secure JWT Implementation:**

````prompt
I am using Next.js App Router and [Auth Provider, e.g., Supabase]. Provide the exact implementation code required to set up HttpOnly cookie-based session management. Explicitly show how to securely read the session in a Server Component, and how to protect a sensitive API route (e.g., `/api/payouts`) from unauthorized access.
````

---

## Validating What AI Generates

- **Check for `localStorage`:** If the AI generates React code that calls `localStorage.setItem('token', token)`, reject it immediately. Demand an `HttpOnly` cookie implementation.
- **Verify role logic:** If the AI puts a simple `is_admin` boolean on the User table, flag it. Force it to use a proper Join table (Memberships) to handle multi-tenant permissions.

---

## Implementation Checklist

- [ ] Selected a managed Enterprise Auth provider (Auth0, Supabase, Clerk).
- [ ] Architected a multi-tenant database schema (Users, Organizations, Memberships).
- [ ] Enforced `HttpOnly` cookies for all session management (No `localStorage` JWTs).
- [ ] Implemented mandatory email/phone verification for all transacting users.
- [ ] Designed the Multi-Factor Authentication (MFA) flow for high-risk actions (e.g., Sellers initiating payouts).

---

## What's Next

Next: **Cost Estimation** — Enterprise architecture is expensive. Before we commit to this infrastructure, we must model the unit economics and monthly burn rate to ensure the marketplace remains profitable at scale.
