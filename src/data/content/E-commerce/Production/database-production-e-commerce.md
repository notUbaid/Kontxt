---
title: Database
slug: database
phase: Phase 3 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Enterprise Database Engineering

**Estimated Time:** 60 Minutes

Welcome to Phase 3. Here, we transition from architectural theory into hard, unyielding code. 

If you are using a Headless Commerce Engine (like Shopify or Swell), that engine acts as your primary database for products and orders. However, a production Next.js frontend always requires a secondary **Application Database** to store user-specific state that the Commerce Engine does not handle:
- User Profiles & Preferences
- Product Reviews & UGC (User Generated Content)
- Wishlists & Saved Items
- Analytics & Telemetry Data

In this module, we will engineer a highly resilient, globally distributed Application Database using **PostgreSQL** and **Prisma ORM**, specifically optimized for Serverless Next.js edge functions.

---

## 1. The Connection Pooling Crisis

A beginner connects Next.js to PostgreSQL using a standard connection string (`postgres://user:pass@host:5432/db`). 

When a Next.js Serverless Function scales up to handle Black Friday traffic, it might spin up 1,000 parallel Vercel Edge nodes. If each node opens a direct connection to your PostgreSQL database, the database will instantly hit its connection limit (`max_connections = 100`) and crash, resulting in a `500 Internal Server Error` for 90% of your customers.

**The Production Solution:**
You must implement a **Connection Pooler** (like PgBouncer or Supabase Supavisor). 

```mermaid
sequenceDiagram
    participant Edge as Next.js Serverless Function
    participant Pooler as Connection Pooler (PgBouncer)
    participant DB as PostgreSQL Database

    Edge->>Pooler: Request Connection (1,000 concurrent)
    Note over Pooler: Pooler holds 1,000 Edge connections...
    Pooler->>DB: Multiplex onto 50 physical DB connections
    DB-->>Pooler: Return Query Results
    Pooler-->>Edge: Distribute Results to Serverless Nodes
```

By placing a Pooler in front of your database, you allow the serverless functions to scale infinitely without overwhelming the physical database hardware.

---

## 2. Prisma ORM Architecture

You will use Prisma as your Object-Relational Mapper (ORM). It provides mathematical type safety. If your database schema changes, Prisma will throw a TypeScript error in your Next.js code before you can deploy a broken build to production.

### The Schema Topography

Below is the required Prisma schema to support the Application Database layer, bridging the gap between your local users and your Shopify backend.

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Used for migrations, bypassing the pooler
}

model User {
  id               String     @id @default(uuid())
  email            String     @unique
  shopifyId        String?    @unique // The Identity Bridge to the Commerce Engine
  name             String?
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt
  
  // Relations
  reviews          Review[]
  wishlistItems    Wishlist[]
  
  @@index([shopifyId])
}

model Review {
  id               String   @id @default(uuid())
  rating           Int      @db.SmallInt // 1-5 constraint enforced in API
  headline         String   @db.VarChar(100)
  content          String   @db.Text
  isVerifiedBuyer  Boolean  @default(false)
  
  // Relations
  productId        String   // The Shopify Product ID (External Reference)
  userId           String
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt        DateTime @default(now())

  // Compound index for fast querying by product
  @@index([productId, rating])
}

model Wishlist {
  id               String   @id @default(uuid())
  
  // Relations
  productId        String   // The Shopify Product ID (External Reference)
  userId           String
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  addedAt          DateTime @default(now())

  // Ensure a user cannot add the same product twice
  @@unique([userId, productId])
}
```

### Edge Case Analysis: The Orphaned Product
What happens if you delete a product in Shopify, but it still exists in your Application Database's `Wishlist` table?
Because `productId` is just a string (an external reference), Prisma cannot enforce a foreign key constraint.
**Solution:** Your Next.js frontend must gracefully handle missing products. When fetching the Wishlist, if Shopify returns a `404` for a `productId`, your Next.js code must silently delete the orphaned row from your Prisma database and hide the error from the user.

---

## 3. The Singleton Client (Preventing Memory Leaks)

In development mode (`npm run dev`), Next.js clears the Node.js cache on every file change (Hot Module Replacement). If you instantiate a new `PrismaClient` on every hot reload, you will create a massive memory leak and exhaust your database connections instantly.

You must mandate the **Singleton Pattern** for your Prisma Client.

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## ✅ Database Engineering Checklist

- [ ] Connect via a Transaction Pooler (PgBouncer) to prevent serverless connection exhaustion.
- [ ] Implement the Singleton pattern for your Prisma client to prevent memory leaks in development.
- [ ] Use `@@index` in your Prisma schema for foreign keys (like `productId`) to guarantee fast reads.
- [ ] Use the AI prompt below to generate your specific schema extensions.

---

## AI Prompt — Engineer the Production Database

Copy this prompt into your AI to have it write the highly optimized database layer for your application.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Database Engineer. We are establishing our PostgreSQL Application Database using Prisma.

Our primary transactional data lives in Shopify. This PostgreSQL database is strictly for User Profiles, Wishlists, and Reviews.

I need you to generate the following engineering implementations:

**1. The Resilient Prisma Client:**
Write the `lib/prisma.ts` file implementing the global Singleton pattern to prevent hot-reload connection exhaustion in development. Explain the difference between the pooled `DATABASE_URL` and the non-pooled `DIRECT_URL` for migrations.

**2. The Extended Prisma Schema:**
Write the `schema.prisma` file. It must include the `User`, `Review`, and `Wishlist` models. 
- You MUST enforce a `@@unique([userId, productId])` constraint on the Wishlist to prevent duplicate saves.
- You MUST include a `@@index` on `productId` in the Reviews table to ensure our `WHERE productId = X` queries execute in < 10ms.

**3. The Orphaned Reference Handler:**
Write a Next.js Server Action (`getUserWishlist.ts`). Show how it queries Prisma for the user's saved `productIds`, and then executes a parallel `Promise.all` fetch to the Shopify Storefront API. Demonstrate the exact `catch` block logic required to silently delete an orphaned `Wishlist` row if Shopify returns a 404 (indicating the product was deleted in the backend).
````

**Next: Backend Engineering →**
