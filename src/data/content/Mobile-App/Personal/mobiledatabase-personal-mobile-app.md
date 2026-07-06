---
title: Database
slug: database
phase: Phase 2
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Database

If you chose a BaaS like Supabase or Firebase in Tech Stack, your mobile app likely talks **directly** to the database from the client — there's no custom backend sitting in between deciding what's allowed. That changes where your security boundary lives, and it's the single most important thing to get right in this module.

---

## Decision 1: Schema Shape for a Personal App

Most personal mobile apps don't need multi-tenant complexity — typically it's just "each user owns their own data":

```
users (often managed by your BaaS auth automatically)
  id, email, created_at

[your core resource, e.g., entries/tasks/items]
  id (UUID)
  user_id (foreign key to users)
  ...your fields
  created_at
```

> [!TIP]
> Don't add a workspace/team layer unless your app actually has shared/collaborative data. A simple `user_id` ownership column on each table is usually all a personal app needs — keep it that simple until a real feature requires more.

---

## Decision 2: Row-Level Security (If Using Supabase)

> [!WARNING]
> **This is the single most important thing in this module.** Supabase tables are **not** protected by default just because your app has authentication — if you don't explicitly enable Row-Level Security (RLS) and write policies, any authenticated (or even anonymous) client can potentially read or write any row in your table, not just their own. This is a genuinely common real-world mistake in indie Supabase projects, and it's a real data leak, not a theoretical one.

> **Decision Card — Minimum RLS Setup**
> For every table containing user data:
> 1. Enable RLS on the table
> 2. Write a policy restricting `SELECT`/`INSERT`/`UPDATE`/`DELETE` to rows where `user_id = auth.uid()`
> 3. Test by attempting to query another user's data as a different logged-in user — confirm it's actually blocked, don't just assume the policy works because you wrote it

---

## Decision 3: Security Rules (If Using Firebase)

Firestore has an equivalent concept — security rules. The same principle applies: rules must explicitly restrict reads/writes to a document's owner; without explicit rules, Firestore's default behavior can leave data more open than you intend depending on your initial setup mode (test mode is permissive and not meant for production).

---

## Decision 4: IDs

Use UUIDs for any record ID, consistent with the same reasoning as a web app: predictable sequential IDs make it easier to guess and probe for other users' records, especially relevant here since clients may query the database somewhat directly.

---

## Decision 5: Offline / Local-First Considerations

If you anticipate needing the app to work well with poor or no connectivity, that's a more involved decision covered fully in the Offline Strategy module — for now, just be aware: a pure "always hits the BaaS directly" model works fine for a personal app used with normal connectivity, but isn't sufficient if true offline-first behavior matters for your use case.

---

## Common Mistakes (Including AI's)

- **Forgets to enable RLS entirely** — this is the most damaging and most common mistake in BaaS-backed personal apps; explicitly verify RLS is on and tested for every table.
- **Writes an RLS policy but never tests that it actually blocks cross-user access** — a policy that looks right and a policy that works are not the same thing without verification.
- **Builds a multi-tenant/workspace schema** for an app that's really just single-user-owns-their-data — unnecessary complexity for most personal apps.
- **Uses Firestore's permissive test-mode rules in what's actually a shipped app** — confirm rules are production-appropriate, not left in test mode.
- **Uses sequential/guessable IDs** for records a client might query somewhat directly.

---

## AI Prompt: Design Schema and Security Rules

```
Design the database schema and security rules for a personal mobile app using [Supabase / Firebase].

Entities: [list your core entities, e.g., tasks, journal_entries, habits]

Requirements:
- Each table/collection has a user_id field linking to the authenticated user
- IDs are UUIDs, not sequential
- [If Supabase]: write Row-Level Security policies for every table restricting SELECT/INSERT/UPDATE/DELETE to rows where user_id = auth.uid(). Show me the exact SQL to enable RLS and create each policy.
- [If Firebase]: write Firestore security rules restricting read/write to the document owner only.

After generating, give me a specific test I can run (as a second test user) to verify I genuinely cannot access another user's data — I want to confirm this works, not just trust that the policy is correct.
```

---

## Validate Before You Move On

- [ ] Every table/collection containing user data has explicit access restrictions enabled — not left at an open or test-mode default
- [ ] You've personally tested, as a second user, that you cannot read or write another user's data
- [ ] Every record uses a UUID, not a sequential ID
- [ ] Schema reflects simple per-user ownership unless your app genuinely has shared/collaborative data
- [ ] You know exactly where your authorization boundary lives (RLS/security rules) since there's no custom backend enforcing it instead

> [!TIP]
> Treat the "test as a second user" check as mandatory, not optional — it's the only way to actually confirm your data is protected, rather than assuming a policy you wrote does what you think it does.

---

**Next:** Authentication — implement the login flow this schema depends on.
