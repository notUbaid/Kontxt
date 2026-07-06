---
title: Database Architecture
slug: database-architecture
phase: Phase 2
mode: hackathon
projectType: web app
estimatedTime: 10-15 min
---

# Database Architecture

You sketched a rough data model in your PRD. This module turns that sketch into actual tables — the minimum schema that supports your demo flow, built fast enough that you're not still designing it when you should be writing feature code.

---

## The Core Idea: Design for Your Demo's Data, Not for Generality

A production database anticipates future features, scale, and data you don't have yet. A hackathon database needs to hold exactly the data your demo flow touches — nothing more. Every extra table, every "just in case we need this" column, is time spent on a feature that doesn't exist instead of time spent making your actual demo path solid.

> [!WARNING]
> Don't design for hypothetical future features ("what if we add teams later" or "what if users need roles"). If it's not in your Must-Have feature list, it doesn't get a table or a column. You can always add it in five minutes later if you somehow have spare time — which, in a hackathon, you almost never do.

---

## Step 1: Derive Tables Directly From Your User Flow

Walk through your screen-by-screen flow from the User Flows module. Every piece of data a screen displays or collects becomes a candidate field. This keeps your schema grounded in what's actually needed instead of an abstract modeling exercise.

**Best Practice Card — Flow-to-Schema Mapping**

```
Screen 2 (Main input): user provides [input type]
  → needs a table to store that input, tied to the user

Screen 4 (Result, the wow moment): shows generated [output]
  → needs a field/table for the generated result, tied back to
    the input that produced it

If a screen doesn't need to persist anything (e.g., a static
loading screen), it needs no corresponding table at all.
```

This derivation usually produces 2-4 tables for a typical hackathon project. If you're deriving more than that, double-check whether some of what you're designing actually belongs to a Nice-to-Have or Cut feature instead.

---

## Step 2: Skip Normalization Debates Entirely

In production, normalization prevents data inconsistency at scale. At hackathon scale — a handful of users, a short-lived demo — a slightly denormalized schema that's fast to build and easy to query is strictly better than a "correct" one that costs you an extra hour of joins and migrations.

**Decision Card — Normalize or Not?**

| Situation | Hackathon Approach |
|---|---|
| Data that's genuinely one-to-many and queried separately (e.g., users → their projects) | Use a real foreign key relationship — this is cheap and prevents real bugs |
| Data that would normally get its own lookup table (e.g., a fixed status enum) | Just use a string/enum column directly — skip the separate table |
| Data you're tempted to model relationally "for correctness" but only ever query one way | Denormalize freely — store it duplicated or nested if that's faster to build against |

> [!TIP]
> If you're using a tool like Supabase or Firebase, lean into whatever its fastest default pattern is — a flexible JSON column for loosely structured data, a simple flat table for everything else. Optimize for "what can I query and display fastest," not for textbook schema design.

---

## Step 3: Plan for Seeded Demo Data From the Start

Decide now whether you'll need to pre-populate the database with realistic-looking demo data before presenting (see the upcoming Demo Data module for the full strategy). If yes, make sure your schema can be populated with a simple seed script — avoid any field that requires complex, hard-to-fake setup just to get demo-ready data in.

---

## Using AI to Generate the Schema Fast

AI is well-suited to converting your flow-derived field list into actual schema code (SQL, or your platform's schema definition format) quickly — the mechanical translation step is exactly where it saves the most time relative to risk.

**Prompt: Minimum Viable Schema**

```
Here's my user flow and what each screen needs to store:
[paste flow-to-data mapping from Step 1]

Platform: [e.g., Supabase/Postgres, Firebase Firestore]

Generate the minimum schema (tables/collections, fields, types,
foreign key relationships only where genuinely needed) to support
exactly this flow. Do not add fields, tables, or indexes for
hypothetical future features. Do not over-normalize — prefer simple,
fast-to-query structures over textbook-correct relational design.

Include a brief seed script or sample insert statements I can use to
populate realistic-looking demo data.
```

> ** Why this prompt works**
> Explicitly forbidding hypothetical-feature fields and over-normalization counters AI's tendency to generate "complete," production-style schemas by default — without that constraint, you'd likely get extra tables and constraints that cost build time without serving your actual demo. Requesting the seed script in the same prompt saves a second round-trip, since you already know from Step 3 that demo data is a near-certain need.

**Token efficiency note:** Generate this once, directly from your finalized flow-to-data mapping, rather than iterating on schema design across several prompts. If your flow changes meaningfully, regenerate — but don't fine-tune a hackathon schema field-by-field across multiple conversations.

---

## Validating the Schema Before Building Against It

- [ ] Every table/field traces back to something a specific screen in your user flow actually needs
- [ ] No table exists solely for a Nice-to-Have or Cut feature
- [ ] Foreign key relationships exist only where you'll actually query across them
- [ ] A seed script or sample data exists, so you're not manually clicking through your own app to populate test data before every test run
- [ ] Both frontend and backend builders have seen and agreed on the final shape before writing code against it

---

## What's Next

Move to **Authentication** — wiring up the simplest auth approach that still lets your demo flow work convincingly, without burning hours on a feature judges will barely notice beyond "does login work."
