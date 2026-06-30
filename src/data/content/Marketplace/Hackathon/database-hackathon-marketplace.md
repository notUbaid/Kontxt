---
title: Database
slug: database
phase: Phase 3
mode: hackathon
projectType: marketplace
estimatedTime: 25-35 min
filename: database-hackathon-marketplace.md
---

# Database

Your auth is wired up. Now you need somewhere to put real data — listings, transactions, messages, users. This module turns the "Demo Marketplace Data" you sketched in Phase 2 into an actual schema judges can click through live.

Marketplaces fail demos for one reason more than any other: the database can't represent the thing the pitch is claiming. If your schema can't show a seller listing an item, a buyer purchasing it, and the status changing in real time, the demo collapses no matter how good the UI looks.

This module gets you a production-shaped schema in under an hour, without the parts that don't matter for a 48-hour build.

---

## The Core Entities

Every marketplace, regardless of niche, needs the same five tables. Resist the urge to add more before the demo works.

| Entity | Why it exists | Skip for hackathon? |
|---|---|---|
| `User` | Buyers and sellers (same table, role flag) | Never |
| `Listing` | The thing being sold | Never |
| `Transaction` | A purchase event | Never |
| `Message` | Buyer↔seller communication | Can be minimal |
| `Category` | Organizes listings, powers search/filter | Can be a hardcoded enum |

> **Decision:** Don't create separate `Buyer` and `Seller` tables. One `User` table with a `role` enum (or a `isSeller` boolean if users can be both) is faster to build and matches how every real marketplace works — most users do both eventually.

---

## Entity Relationship Overview

```
User ──< Listing ──< Transaction >── User
 │                         │
 └──────< Message >────────┘
```

- A `User` can own many `Listing`s (seller side)
- A `Listing` can have many `Transaction`s (one if sold once, more if multi-stock)
- A `Transaction` connects a buyer `User` and a seller `User` through a `Listing`
- A `Message` connects two `User`s, optionally scoped to a `Listing`

Keep this shape in your head before you open the AI tool. If you can't draw this on paper, the AI-generated schema will be harder to debug, not easier.

---

## Recommended Schema (Prisma)

Postgres + Prisma is the fastest reliable path for a hackathon — typed client, instant migrations, and Prisma Studio gives you a free admin UI with zero extra build time. If your Tech Stack module already locked in something else (Supabase client, Drizzle, Mongo), adapt the field-level decisions below; the entity shapes don't change.

```prisma
// schema.prisma

enum Role {
  BUYER
  SELLER
  BOTH
}

enum ListingStatus {
  ACTIVE
  SOLD
  ARCHIVED
}

enum TransactionStatus {
  PENDING
  COMPLETED
  CANCELLED
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String
  role          Role      @default(BUTH)
  avatarUrl     String?
  createdAt     DateTime  @default(now())

  listings      Listing[]      @relation("SellerListings")
  purchases     Transaction[]  @relation("BuyerTransactions")
  sales         Transaction[]  @relation("SellerTransactions")
  sentMessages  Message[]      @relation("SentMessages")
  inboxMessages Message[]      @relation("ReceivedMessages")
}

model Listing {
  id          String        @id @default(uuid())
  title       String
  description String
  priceCents  Int
  imageUrl    String?
  category    String
  status      ListingStatus @default(ACTIVE)
  sellerId    String
  seller      User          @relation("SellerListings", fields: [sellerId], references: [id])
  createdAt   DateTime      @default(now())

  transactions Transaction[]
  messages     Message[]

  @@index([category, status])
  @@index([sellerId])
}

model Transaction {
  id         String             @id @default(uuid())
  listingId  String
  listing    Listing            @relation(fields: [listingId], references: [id])
  buyerId    String
  buyer      User               @relation("BuyerTransactions", fields: [buyerId], references: [id])
  sellerId   String
  seller     User               @relation("SellerTransactions", fields: [sellerId], references: [id])
  amountCents Int
  status     TransactionStatus  @default(PENDING)
  createdAt  DateTime           @default(now())
}

model Message {
  id         String   @id @default(uuid())
  senderId   String
  sender     User     @relation("SentMessages", fields: [senderId], references: [id])
  receiverId String
  receiver   User     @relation("ReceivedMessages", fields: [receiverId], references: [id])
  listingId  String?
  listing    Listing? @relation(fields: [listingId], references: [id])
  content    String
  createdAt  DateTime @default(now())
}
```

> **Fix the typo before you paste this**: `@default(BUTH)` should be `@default(BOTH)`. Left in deliberately — see the validation section below for why you should never paste AI-generated schema without reading every line.

---

## Key Schema Decisions, Explained

### Money is always an integer

`priceCents Int`, not `price Float`. Floats lose precision on currency math — a `$19.99` item can silently become `$19.989999`. Store cents (or the smallest currency unit) as an integer, divide by 100 only when displaying. This is a five-second decision now and a production incident later if you skip it.

### Status fields are enums, not strings

`status: "active"` as a free string lets anyone write `"Active"`, `"ACTIVE "`, or `"actve"` and your filters silently break. An enum makes invalid states impossible to insert. This single decision prevents the most common "why isn't my listing showing up" bug during live demos.

### Soft-delete listings, don't hard-delete

A judge clicking "remove listing" mid-demo shouldn't be able to break a transaction history that references it. Use `status: ARCHIVED` instead of `DELETE FROM listings`. Hard deletes are a Phase 6+ concern, not a hackathon one — but the wrong default here causes foreign-key crashes that are hard to debug under time pressure.

### Index what you'll filter and search on

`@@index([category, status])` exists because every marketplace demo includes "browse listings by category." Without it, search feels fine with 20 seed rows and silently degrades — not a hackathon-breaking issue at your data volume, but free to add now and worth knowing why it matters as you build more.

---

## Seed Data: Make the Demo Look Real

Empty tables are the single biggest "this still looks like a tutorial" tell in marketplace demos. Seed convincingly before you touch the frontend.

```ts
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const seller = await prisma.user.create({
    data: { email: 'maria@example.com', name: 'Maria Chen', role: 'SELLER' },
  })
  const buyer = await prisma.user.create({
    data: { email: 'devon@example.com', name: 'Devon Park', role: 'BUYER' },
  })

  const listing = await prisma.listing.create({
    data: {
      title: 'Vintage Leather Jacket',
      description: 'Worn twice. Genuine leather, size M.',
      priceCents: 8500,
      category: 'Clothing',
      sellerId: seller.id,
    },
  })

  await prisma.message.create({
    data: {
      senderId: buyer.id,
      receiverId: seller.id,
      listingId: listing.id,
      content: 'Is this still available?',
    },
  })
}

main().finally(() => prisma.$disconnect())
```

Run it with `npx prisma db seed`. Aim for 8-12 listings across at least 3 categories, 2-3 sellers, and a couple of messages — enough variety that a judge scrolling the feed doesn't immediately see it's fake.

---

## AI Prompts You Can Use

Use these in order, in the **same conversation** — each one needs the prior output as context. Don't start a fresh chat between them; that forces you to re-paste the schema and wastes tokens.

**Prompt 1 — Generate the schema from your specific listing type:**

```
I'm building a [your marketplace niche, e.g. "handmade furniture"] marketplace
for a hackathon. Using Prisma + Postgres, extend this base schema to add
fields specific to my niche (e.g. dimensions, materials, condition).

Keep money as integer cents. Keep status fields as enums. Don't add tables
beyond User, Listing, Transaction, Message, unless my niche genuinely
requires one — explain why if you add one.

[paste the schema above]
```

**Prompt 2 — Generate realistic seed data:**

```
Generate a Prisma seed script with 10 listings, 4 sellers, 2 buyers, and
5 messages for my [niche] marketplace. Use realistic titles, descriptions,
and prices for this niche — not placeholder text. Vary listing status
(mostly ACTIVE, one SOLD, one ARCHIVED) so the UI has something to filter.
```

**Prompt 3 — Review before you trust it:**

```
Review this Prisma schema for a hackathon marketplace. Flag: missing
indexes on filtered/searched fields, float fields storing money, missing
cascade/delete behavior on foreign keys, and any enum that's missing an
obviously-needed value. Don't suggest production hardening I don't need
in 48 hours — flag only things that will visibly break a demo.
```

---

## Validating What AI Generates

AI-generated schemas look correct and frequently aren't. Check these before running a migration:

- [ ] **Money fields are `Int`, never `Float` or `Decimal` without a reason** — floats are the single most common AI schema mistake
- [ ] **Every status field is an enum**, not a free-text string
- [ ] **Foreign keys point the right direction** — `sellerId` on `Listing`, not a `listingId` array on `User`
- [ ] **No table you can't explain in one sentence** — AI tends to add `Review`, `Wishlist`, `Notification` tables unprompted. Delete anything you didn't ask for and won't demo.
- [ ] **Relations have explicit names** when a model relates to the same other model twice (like `buyer`/`seller` both pointing to `User`) — Prisma errors without this, and AI sometimes forgets it

> **Common hallucination:** AI models frequently generate a `@@unique([buyerId, listingId])` constraint "to prevent duplicate purchases," which breaks any marketplace where the same buyer can legitimately buy the same listing type twice (e.g. multiple units, repeat services). Only add uniqueness constraints you can justify from your actual product.

---

## What to Skip This Weekend

| Tempting | Why skip it | Do instead |
|---|---|---|
| Full-text search engine (Elasticsearch, Algolia) | Setup time not worth it under 50 rows | Postgres `ILIKE` filter, looks identical in a demo |
| Database migrations history / rollback strategy | No one's rolling back in 48 hours | `prisma db push` straight to schema |
| Admin dashboard for moderating listings | Built feature no judge asks for | Prisma Studio (`npx prisma studio`) — free, instant |
| Multi-currency support | Out of scope for any pitch this size | Hardcode USD, mention it as a roadmap item |

---

## Security Basics (Still Apply at a Hackathon)

- Never construct raw SQL with string concatenation — Prisma's query builder parameterizes automatically, so use it instead of `$queryRawUnsafe`
- Keep your database connection string in `.env`, never hardcoded — check this before your first git push, not after
- Don't return the full `User` object (including `email`) in your listings API response — select only the fields the frontend needs

---

## Implementation Checklist

- [ ] Schema file written and reviewed line-by-line (not just pasted from AI)
- [ ] `prisma db push` run successfully against a real Postgres instance
- [ ] Seed script run, data visible in Prisma Studio
- [ ] At least 3 categories, 3 sellers, 2 buyers in seed data
- [ ] One listing in each status (`ACTIVE`, `SOLD`, `ARCHIVED`) to prove filters work
- [ ] Connection string confirmed in `.env`, confirmed `.env` is in `.gitignore`

---

## What's Next

Your data exists and looks real. Next: **Search** — turning that `category` index into a filter bar users can actually interact with during the demo.
