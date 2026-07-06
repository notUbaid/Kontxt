---
title: Demo Data
slug: demo-data
phase: Phase 3
mode: hackathon
projectType: mobile-app
estimatedTime: 15–20 min
---

# Demo Data

An empty app is an unconvincing app.

Judges cannot evaluate what your product does if there is nothing in it. They cannot feel the value of a feed with zero posts, a marketplace with zero listings, or a social app with one user.

Demo data is not fake. It is the difference between a prototype and a product.

---

## What Demo Data Actually Does

It answers the question judges are silently asking:

> "What would this look like if real people used it?"

Good demo data makes that question unnecessary. The app already looks like real people use it.

Bad demo data — or no data — forces judges to imagine the potential. Most won't. They'll move on.

---

## The Three Types of Demo Data

| Type | What It Is | When to Use |
|---|---|---|
| **Seed data** | Pre-loaded records in your database | Always — every collection needs it |
| **Fixture accounts** | Real user accounts with history | For social/multi-user apps |
| **Live demo account** | The account you demo from, pre-populated | Always — this is what judges see |

Build all three. The live demo account is the most important.

---

## What Good Demo Data Looks Like

**Volume:** Enough to show a real-looking list. For most apps: 8–15 records per main collection.

**Variety:** Different content lengths, images, timestamps, and states. A feed where every post looks identical reads as fake.

**Recency:** Timestamps that feel current. Records from "2 hours ago" and "yesterday" feel alive. Records from "January 1, 2024" feel like test data.

**Quality:** Real-sounding names, realistic content, genuine-looking photos. Not "User 1", "Test Post", or placeholder images.

**Coverage:** Every screen in your demo flow should have data in it. No empty states during the pitch.

---

## Generating Seed Data

```
Copy Prompt ↓
```

> Generate realistic seed data for a [describe your app] mobile app. I need:
>
> **Users (8 records):**
> Fields: id, name, username, avatarUrl (use real Unsplash photo URLs), bio, followerCount, createdAt
> Make names diverse and realistic. Bios should feel genuine, 1–2 sentences.
>
> **[Main Collection] (12 records):**
> Fields: [list all your fields]
> Vary: content length, timestamps (spread across last 7 days), any status/category fields
>
> Output as a JavaScript array for each collection that I can paste directly into a seed script.
> Use realistic timestamps as ISO strings relative to today's date.

---

## Writing the Seed Script

A seed script runs once and populates your database. Write it, run it, delete it.

**Firebase Firestore (Node.js):**

```js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { users, posts } from './seed-data.js';

const app = initializeApp({ /* your config */ });
const db = getFirestore(app);

async function seed() {
  console.log('Seeding users...');
  for (const user of users) {
    await setDoc(doc(db, 'users', user.id), user);
  }

  console.log('Seeding posts...');
  for (const post of posts) {
    await setDoc(doc(db, 'posts', post.id), post);
  }

  console.log('Done.');
  process.exit(0);
}

seed().catch(console.error);
```

**Supabase (Node.js):**

```js
import { createClient } from '@supabase/supabase-js';
import { users, posts } from './seed-data.js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function seed() {
  const { error: userError } = await supabase.from('users').upsert(users);
  if (userError) console.error('Users:', userError);

  const { error: postError } = await supabase.from('posts').upsert(posts);
  if (postError) console.error('Posts:', postError);

  console.log('Done.');
}

seed();
```

>  Use `setDoc` / `upsert` instead of `addDoc` / `insert` so you can re-run the script without duplicating records.

---

## The Live Demo Account

This is the account judges watch you use during the pitch. It needs special care.

**Requirements:**
- Signed in and ready before you walk up
- Populated with 10–15 pieces of personal activity (posts, saves, history — whatever your app tracks)
- A realistic profile: real-looking name, a photo, a bio
- Any social connections pre-established (followers, friends, connections)
- The exact state you want judges to see — not mid-flow, not at a settings screen

**Create a dedicated demo account. Never demo from your personal dev account.**

Your dev account has test data, broken records, and incomplete flows. The demo account is curated, clean, and controlled.

```
Copy Prompt ↓
```

> I'm building a [describe your app]. Generate a realistic demo user profile and 10 pieces of activity for my live demo account. The activity should tell a story — show the app being used naturally over the past week, not just random records.
>
> User profile: [describe the persona — e.g. "a 28-year-old designer in London who uses the app daily"]
> Activity type: [posts / saves / searches / purchases / etc.]
>
> Make it feel like a real person's history. Output as structured data I can import.

---

## Photo and Media Strategy

Images make or break how real your demo data feels.

**Free sources for realistic photos:**

| Source | Best For | URL Format |
|---|---|---|
| Unsplash | People, places, food, products | `https://images.unsplash.com/photo-{id}?w=400` |
| UI Faces / Pravatar | Avatar photos | `https://i.pravatar.cc/150?u={email}` |
| Picsum | Generic placeholder photos | `https://picsum.photos/seed/{id}/400/300` |

Use consistent avatar URLs tied to user IDs so the same user always has the same photo across records.

```js
// Deterministic avatar from user ID
const avatarUrl = `https://i.pravatar.cc/150?u=${user.id}`;
```

---

## Demo Data Checklist

- [ ] Every main collection has 8–15 realistic records
- [ ] Timestamps spread across the last 7 days (not all the same time)
- [ ] Names, content, and images feel genuine — not placeholder
- [ ] Seed script written and successfully run
- [ ] All screens in the demo flow have visible data
- [ ] No empty states visible during the planned pitch path
- [ ] Live demo account created and separated from dev account
- [ ] Demo account has realistic personal history
- [ ] Demo account is signed in and ready on demo device
- [ ] Profile photo and bio set on demo account

---

## What Breaks Demos

| Mistake | Consequence |
|---|---|
| Empty lists during pitch | Judges can't evaluate the product |
| "Test", "Lorem ipsum", or "User 1" visible | Instantly signals unfinished |
| All timestamps identical | Data looks auto-generated |
| Demoing from dev account | Broken records and test data visible |
| No profile photo on demo account | First screen already looks unpolished |
| Images that fail to load | Broken image icons everywhere |

---

## One Final Check

Walk your entire demo flow on the demo device, as the demo account, with the screen mirrored.

Watch it the way a judge would watch it.

If anything looks empty, placeholder, or fake — fix it now. You have time.

---

## Next Step

Demo data is done when every screen in your pitch path is populated, realistic, and ready.

Move to **Play Store Mockups** next.
