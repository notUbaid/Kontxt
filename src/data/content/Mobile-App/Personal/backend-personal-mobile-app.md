---
title: Backend
slug: backend
phase: Phase 3
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Backend

Most of your app's data access happens directly between the mobile client and your BaaS, protected by the Row-Level Security policies from the Database module. But some things genuinely need to run on a server, not on the device — and knowing which is which matters more for mobile than you might expect.

---

## Decision 1: When Do You Need a Server Function, Not Just Direct Client Access?

> **Decision Card**
> Direct client-to-BaaS access (protected by RLS) is fine for most simple CRUD. You need a server function (Supabase Edge Function / Firebase Cloud Function) when an action involves:
- A **secret API key** for a third-party service (payment processor, AI provider, any paid API)
- **Business logic too complex for a row-level policy** to express cleanly (multi-step validation, calculations involving multiple records)
- An action that **must not be tamperable** by a modified or reverse-engineered client

---

## Decision 2: Mobile Apps Are Not a Safe Place for Secrets

> [!WARNING]
> **A compiled mobile app is not a secure place to store an API key or secret**, even if it's not visible in your source code on screen. App binaries can be decompiled and inspected — a secret embedded in your app's code (even "hidden" via obfuscation) should be treated as eventually discoverable. Any call requiring a secret key must go through a server function where the secret lives in a server-side environment variable, never bundled into the app itself.

This is the single most important security takeaway in this module: if you find yourself putting a third-party API key directly in your React Native/Flutter code, stop — that call needs to be proxied through a server function instead.

---

## Decision 3: Edge/Cloud Functions

| Option | Best for |
|---|---|
| Supabase Edge Functions | If you're already using Supabase — functions run close to your database, straightforward to deploy |
| Firebase Cloud Functions | If you're already using Firebase — mature, well-documented, integrates with the rest of the Firebase ecosystem |

Use whichever matches your BaaS choice from Tech Stack — don't introduce a third platform just for functions if your existing BaaS already supports them.

---

## Decision 4: RLS Protects Access, Not Business Logic

> [!WARNING]
> Row-Level Security (or Firestore security rules) is good at expressing "can this user access this row" — it is not a good place to express complex, multi-step business logic. If you find yourself writing an increasingly elaborate RLS policy to handle a business rule (rather than a straightforward ownership check), that's a sign the logic belongs in a server function instead, where it's actually readable, testable, and maintainable.

---

## Decision 5: What Typically Needs a Function in a Personal App

- [ ] Any call to a paid/secret-keyed third-party API (AI features, payment processing, external data sources)
- [ ] Sending push notifications triggered by a server-side event (covered further in Push Notifications)
- [ ] Any calculation or validation involving more than a simple per-row ownership check

Everything else — basic reads/writes to your own data — can go directly from the client through your BaaS with RLS protecting it, with no function needed.

---

## Common Mistakes (Including AI's)

- **Embeds a third-party API secret directly in mobile app code** — always flag this and require a server function proxy instead.
- **Tries to encode complex business logic into an increasingly elaborate RLS policy** — push back and ask for a server function instead once the logic goes beyond a simple ownership check.
- **Adds a server function for something RLS already handles fine** — don't over-engineer simple CRUD that a direct, RLS-protected client call already covers.

---

## AI Prompt: Decide and Implement Server-Side Logic

```
I'm building a personal mobile app using [Supabase / Firebase].

For this feature: [describe the feature, e.g., "generate an AI summary of a journal entry using [AI provider]"]

1. Confirm whether this needs a server function (because it involves a secret key or complex logic) or can be handled via direct client access protected by RLS.
2. If it needs a function, implement it as a [Supabase Edge Function / Firebase Cloud Function], with the API key stored as a server-side environment variable — never in the mobile app code.
3. Show me exactly what the mobile app calls (the function endpoint) versus what the function itself does server-side.

Flag explicitly if any part of this implementation would require embedding a secret in the mobile app.
```

---

## Validate Before You Move On

- [ ] No third-party API secret exists anywhere in your mobile app's code or bundled assets
- [ ] Any action requiring a secret key goes through a server function, not a direct client call
- [ ] RLS/security rules handle access control; complex business logic lives in functions, not elaborate policies
- [ ] You haven't added server functions for simple CRUD that direct, RLS-protected client access already handles fine

> [!TIP]
> If you're ever unsure whether something needs a server function, ask: "could a user with a decompiled or modified version of my app abuse this if it ran entirely client-side?" If yes, it needs a function.

---

**Next:** App Permissions Strategy — decide which device permissions your app actually needs, and how to ask for them well.
