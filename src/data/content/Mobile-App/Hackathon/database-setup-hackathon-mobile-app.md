---
title: Database
slug: database
phase: Phase 2
mode: hackathon
projectType: mobile-app
estimatedTime: 20–30 min
---

# Database

The wrong database choice does not slow you down at the end of a hackathon.

It stops you in the middle.

You are not picking a database for scale. You are picking a database for demo-readiness in 24–48 hours. That changes everything.

---

## The Only Question That Matters Right Now

> Can I get data on screen within the next two hours?

That is your selection criteria. Not throughput. Not cost at scale. Not vendor lock-in.

Speed to working demo. That is the game.

---

## Your Realistic Options

| Database | Best For | Setup Time | Realtime | Offline | Verdict |
|---|---|---|---|---|---|
| **Firebase Firestore** | Social, feeds, collaborative | ~20 min |  Built-in |  Built-in | Best default |
| **Supabase** | Relational data, auth + DB together | ~30 min |  Built-in |  | Strong alternative |
| **SQLite (local)** | Fully offline apps, no backend | ~15 min |  |  | If no server needed |
| **PocketBase** | Self-hosted, single binary | ~25 min |  |  | Good if you want SQL |
| **MongoDB Atlas** | Flexible schema, existing familiarity | ~30 min |  (extra setup) |  | Only if team knows it |

>  Do not set up a custom backend with a separate database in a hackathon unless your app's core mechanic requires it. You will spend 8 hours on DevOps instead of features.

---

## The Default Choice: Firebase Firestore

For most hackathon mobile apps, Firestore is the right answer.

**Why:**
- Zero backend to deploy
- Auth + database in one SDK
- Realtime listeners built in — no polling, no websockets to configure
- Offline persistence by default
- Free tier covers any hackathon demo

**When to pick something else:**
- Your data is inherently relational (foreign keys, joins, complex queries) → Supabase
- Your app works fully offline with no server → SQLite
- You need a REST API automatically generated from your schema → Supabase or PocketBase

---

## Firestore Data Modeling for Mobile Apps

Firestore is a document database. It does not have tables. It has collections and documents.

```
/users/{userId}
  name: string
  avatarUrl: string
  createdAt: timestamp

/posts/{postId}
  authorId: string
  content: string
  likeCount: number
  createdAt: timestamp

/posts/{postId}/likes/{userId}
  likedAt: timestamp
```

**Three rules that prevent 90% of Firestore mistakes:**

1. **Store what you display.** If a post card shows the author's name, store `authorName` on the post document — don't fetch it separately. Denormalization is correct in Firestore.

2. **Never nest more than two levels deep.** `/posts/{id}/comments/{id}` is fine. `/posts/{id}/comments/{id}/replies/{id}` will cause pain.

3. **Use subcollections for lists that grow.** Likes, comments, and messages belong in subcollections — not arrays inside a document. Arrays that grow unboundedly cause read/write contention.

---

## Generate Your Schema

Before touching any code, define your data model. This is 20 minutes that saves 4 hours.

```
Copy Prompt ↓
```

> I'm building a [describe your app in 2 sentences] as a hackathon mobile app using Firebase Firestore. My core features are: [list 3–5 features]. Generate a Firestore data model with:
- Collection and document structure
- All fields with types and example values
- Which fields to index
- Any denormalized fields needed for efficient reads
- Security rules skeleton
>
> Optimize for read speed and demo simplicity. Flag any design decisions I should reconsider.

---

## Validate the Output

AI gets Firestore schemas wrong in predictable ways. Check for these:

| Red Flag | Why It's a Problem |
|---|---|
| Arrays used for growing lists (likes, messages) | Document size limit is 1MB; arrays cause contention |
| No `createdAt` timestamp on any collection | You can't sort or paginate without it |
| Deeply nested subcollections (3+ levels) | Queries become painful and security rules get complex |
| All data in one giant document | Single document reads become slow; also the 1MB limit |
| Missing denormalization for display data | Every card requires extra fetches; UI slows down |
| No security rules at all | Fine for demo, but flag it consciously |

---

## Supabase Alternative

If your data is relational, Supabase gives you PostgreSQL with a generated REST API and realtime built in.

**When Supabase wins:**
- You have many-to-many relationships (users ↔ events, products ↔ categories)
- Your team knows SQL
- You want auto-generated TypeScript types from your schema

```
Copy Prompt ↓
```

> I'm building a [describe your app] hackathon mobile app using Supabase. My core features are: [list features]. Generate:
- SQL schema with all tables, columns, types, and foreign keys
- Row Level Security policies for authenticated users
- Which indexes to add
- Any junction tables needed
>
> Keep it minimal. Only include what's needed for the demo.

---

## SQLite for Offline-First Apps

If your app works without a server — a journaling app, a habit tracker, a local tool — skip the backend entirely.

**React Native:** Use `expo-sqlite` or `@op-engineering/op-sqlite`
**Flutter:** Use `sqflite` or `drift`

Both store data locally on device. No credentials. No network. No auth required for the database layer.

>  SQLite + local state is unbeatable for demo reliability. No network errors. No cold starts. No "our backend went down during the demo" disasters.

---

## Seed Your Demo Data

An empty app is a dead app during a demo.

Before the demo:
- Pre-populate at least 8–12 realistic records
- Use real-looking names, photos (Unsplash URLs), and content
- Cover edge cases: long text, missing optional fields, varied timestamps

```
Copy Prompt ↓
```

> Generate seed data for my [database type] database. I need 10 realistic records for [collection/table name]. Each record should have: [list your fields]. Make the data feel real — varied names, realistic content, timestamps spread across the last 7 days. Output as a JavaScript array I can paste into a seed script.

---

## Security Rules (Firestore)

For a hackathon demo, minimum viable rules:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
  }
}
```

>  Do not leave Firestore in test mode (allow read, write: if true) for your demo build. Judges who look at your code will notice. It takes 10 minutes to add basic rules.

---

## Decision Checklist

- [ ] Database choice made and justified for your app type
- [ ] Data model generated and reviewed
- [ ] Denormalization decisions made (what gets duplicated for read speed)
- [ ] `createdAt` timestamp on every collection
- [ ] Seed data script ready
- [ ] Security rules configured (not open test mode)
- [ ] SDK installed and a test read/write confirmed working

---

## What Breaks Demos

| Mistake | Consequence |
|---|---|
| Setting up database 2 hours before demo | No time to fix schema mistakes |
| No seed data | App looks empty during presentation |
| Fetching nested data on every render | UI stutters during demo |
| Forgetting to handle loading and error states for DB calls | Blank screens when network is slow |
| Using test mode security rules | Visible to anyone who checks your config |

---

## Next Step

Database is done when you have confirmed a working read and write from your app and your seed data is loaded.

Move to **Authentication** next.
