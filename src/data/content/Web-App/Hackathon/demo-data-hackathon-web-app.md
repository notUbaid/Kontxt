---
title: Demo Data
slug: demo-data
phase: Phase 3
mode: hackathon
projectType: web app
estimatedTime: 15–25 min
---

# Demo Data

Your app works. Now it needs to look like it works at scale.

Empty states kill demos. A judge clicking through a blank table or an empty feed cannot imagine what your product does. Demo data is the difference between showing a product and showing a product that people use.

This module gets you to a demo-ready data state in the shortest time possible.

---

## The Rule: Seed Before You Demo

> **⚠️ Warning**
> Never demo against a database you've been casually testing in. Real test data is garbage. It has `test`, `asdf`, and `user@user.com` everywhere. Judges are pattern-matching on professionalism. Garbage data breaks that pattern immediately.

Your demo data should tell a convincing story. Users named John Smith with email `john@test.com` are a red flag. A project management app with tasks called "task1", "task2" is a red flag. A social app with one follower is a red flag.

---

## What Makes Good Demo Data

**Best Practice: The Three Rules of Demo Data**

**1. It looks real**
Names, emails, dates, amounts — all plausible. No placeholder text. No sequential IDs as names.

**2. It tells your story**
The data should demonstrate your app's best features without you having to explain them. If your app tracks spending, the demo data should show a spending pattern worth noticing. If your app tracks fitness, it should show a convincing progression.

**3. It survives interaction**
A judge will click things. They will filter, search, sort. Your demo data should return meaningful results for obvious queries — not empty screens.

---

## Three Approaches: Pick One

| Approach | Best For | Time Cost | Control |
|---|---|---|---|
| **Hardcoded seed script** | Most apps — fastest to set up | 15–30 min | Full |
| **AI-generated JSON** | Data-heavy apps needing variety | 10–15 min (prompt + paste) | High |
| **Faker library** | Apps needing 100+ records | 20–30 min (setup + review) | Medium |

For most hackathon apps: **hardcoded seed script**. You know exactly what data exists. You control the narrative. Nothing random surprises you mid-demo.

---

## Approach 1: Seed Script (Recommended)

Write a script that wipes the database and inserts exactly what you need.

For a Supabase/PostgreSQL app with a Vite + React frontend, this goes in a file like `scripts/seed.ts` and runs once.

> **💡 Tip**
> Always make the seed script idempotent. It should delete existing data before inserting. This means you can re-run it before every demo run-through and always start from a known, clean state.

**Copy Prompt**

```
I'm building a [describe your app in one sentence].

Here are my database tables with their column names:
[paste your schema here]

Generate a TypeScript seed script that:
- Deletes all existing data (in the correct order to respect foreign keys)
- Inserts [N] realistic [entity names] with plausible, varied data
- Inserts relationships between them that demonstrate the app's core use case
- Uses supabase-js / prisma / [your ORM] — specify which one I'm using

The data should tell this story: [describe the scenario the demo should show, e.g., "a small marketing agency with 3 team members actively using the project tracker — two projects in progress, one completed, tasks at different stages"]

Return only the seed script. No explanations.
```

---

### Validating the AI Output

Before you run it:

- [ ] Check the foreign key order — inserts should go parent → child. Deletes should go child → parent. AI gets this wrong sometimes.
- [ ] Check every required field is present — AI hallucinates optional columns
- [ ] Check that date values are in the past (historical data) or sensible future (upcoming events) — not `2020-01-01` defaults
- [ ] Check for obviously AI-generated names like "Emily Johnson" appearing three times

---

## Approach 2: AI-Generated JSON (Fast Alternative)

If your app loads data from a static file or you need quick variety:

**Copy Prompt**

```
Generate a JSON array of [N] realistic [entity type] objects.

Each object needs these fields: [list fields and types]

Requirements:
- Names should be varied and culturally diverse
- Dates should span the last [X weeks/months], not all clustered together
- Numeric values should follow a realistic distribution, not be uniform
- Include some edge cases that show the app handles real-world messiness: [e.g., a task with a very long title, a user with no avatar, a transaction with a $0.01 amount]

Return only the raw JSON array. No markdown. No explanation.
```

---

## Approach 3: Faker (When You Need Volume)

Use if your demo needs to show a data-heavy feature — a feed with hundreds of posts, a table with 500 rows, a chart with months of history.

```bash
npm install --save-dev @faker-js/faker
```

```ts
import { faker } from '@faker-js/faker'

// Seed faker for reproducibility — same data every run
faker.seed(42)

const users = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  createdAt: faker.date.past({ years: 1 }),
}))
```

> **⚠️ Warning**
> Always pass a seed value (`faker.seed(42)`). Without it, every run produces different data. You will rehearse with one dataset and demo with a different one. Don't.

---

## Designing the Demo Narrative

This is the part most teams skip and the part that wins demos.

Your data needs to tell a specific story. Figure out what that story is before you write a single insert.

**Decision Exercise: What Should a Judge See in 3 Minutes?**

Answer these three questions. The answers define your seed data:

1. **What is the single most impressive thing your app can do?**
   → Your seed data should make this immediately visible on the first screen a judge sees.

2. **What user journey are you showing in the demo?**
   → Your seed data should set up the starting state for that journey perfectly.

3. **What numbers or stats does your app surface?**
   → Pre-calculate what those numbers will be with your seed data. If your app shows "12 tasks completed this week," make sure exactly 12 tasks exist with completion dates in the current week.

---

## Common Demo Data Mistakes

> **⚠️ Warning: Sequential Naming**
> `User 1`, `User 2`, `User 3` — never. This is the fastest way to make a judge think your app was built in an afternoon. Pick real, diverse, plausible names.

> **⚠️ Warning: All-Same Timestamps**
> Data inserted all at `2024-01-01T00:00:00Z` looks seeded. Spread timestamps across days and times. Vary the hours. Humans don't create things in batches.

> **⚠️ Warning: Empty Relationships**
> Seeding users but not their associated content. If your app shows "posts by this user," make sure those posts exist. Judges will click a user profile.

> **⚠️ Warning: Perfect Data**
> Every task completed, every goal hit, every number round. Real data is messy. One incomplete item, one declined transaction, one unread message makes your app look like it handles real usage.

---

## The Pre-Demo Reset Checklist

Create this as a literal script or checklist you run 5 minutes before presenting.

```bash
# pre-demo.sh
echo "Resetting demo data..."
npx ts-node scripts/seed.ts
echo "Clearing browser storage..."
echo "Open app and verify: [your specific checklist items]"
```

- [ ] Seed script ran without errors
- [ ] First screen shows expected data (not empty, not error state)
- [ ] Core demo flow works start to finish
- [ ] Any charts or graphs are rendering with data
- [ ] Stats/counters show expected numbers
- [ ] Search returns results for the query you plan to demo
- [ ] Filter returns results for the filter you plan to demo
- [ ] No `console.error` in browser dev tools during the flow

---

## What's Next

Move to **UI Polish** — your data is now in place. The next step is making sure the experience of viewing and interacting with that data looks professional enough to leave an impression.
