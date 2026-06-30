---
title: Database
slug: database
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Database

Phase 2 was decisions. Phase 3 is construction. This module turns every schema you designed into a real, running database — migrated, indexed, and seeded — ready for the rest of development to build on.

A poorly set up database creates problems that compound for the entire project. Get this right once.

---

## Before You Write a Single Migration

Collect every schema decision from Phase 2 into one place. You designed tables across six modules. They need to fit together.

**Full schema inventory from Phase 2:**

```
From Product Architecture:
  Product, ProductVariant, ProductImage, Category, Tag

From Inventory Architecture:
  InventoryItem, InventoryMovement

From Cart Architecture:
  Cart, CartItem

From Checkout / Order:
  Order, OrderItem, Address

From Payment Architecture:
  WebhookEvent

From Customer Accounts:
  User, Address (shared)

From Shipping Architecture:
  ShippingZone, ShippingRate

From Search Architecture:
  search_vector column on Product
  SearchEvent

From Analytics Architecture:
  AnalyticsEvent (if using custom event log)
```

If any table is missing, design it now before running migrations. Schema changes mid-development are painful. Schema changes after seeding are worse.

---

## Database Choice

For a personal e-commerce project: **PostgreSQL**.

It handles full-text search, JSON fields, transactions, and every relational pattern you'll need. It is the default for Supabase, Railway, Neon, and most modern hosting platforms.

Do not use MySQL for a new project. Do not use SQLite in production.

**Hosted PostgreSQL options:**

| Provider | Free Tier | Best For |
|---|---|---|
| **Supabase** | 500MB, 2 projects | If you also want auth + storage |
| **Neon** | 512MB, branching | Great DX, schema branching |
| **Railway** | $5 credit/month | Simple, predictable pricing |
| **Render** | 90-day free trial | Full-stack deploy in one place |

Pick one and stay with it. Database migrations between providers mid-project are painful.

---

## ORM Choice

Use an ORM. Writing raw SQL for every query in a personal project is unnecessary friction.

**Prisma** is the standard for TypeScript/Node.js projects. Schema-first, type-safe, excellent migration tooling.

**Drizzle** is the modern alternative — lighter, closer to SQL, better for performance-sensitive queries. Steeper initial learning curve.

**Recommendation:** Prisma if this is your first project. Drizzle if you're comfortable with SQL and want more control.

This module uses Prisma conventions. Drizzle equivalents are structurally identical.

---

## Prisma Schema

Below is a production-ready starting schema covering every table from Phase 2. Adapt field names to match your earlier decisions.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Users & Auth ───────────────────────────────────────

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  emailVerified Boolean   @default(false)
  name          String?
  role          Role      @default(CUSTOMER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  addresses     Address[]
  orders        Order[]
  cart          Cart?
  wishlistItems WishlistItem[]
}

enum Role {
  CUSTOMER
  ADMIN
}

// ─── Addresses ──────────────────────────────────────────

model Address {
  id         String   @id @default(uuid())
  userId     String?
  user       User?    @relation(fields: [userId], references: [id])
  fullName   String
  phone      String
  line1      String
  line2      String?
  city       String
  state      String
  postalCode String
  country    String   @default("IN")
  isDefault  Boolean  @default(false)
  createdAt  DateTime @default(now())

  orders     Order[]
}

// ─── Products ───────────────────────────────────────────

model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  imageUrl    String?
  parentId    String?
  parent      Category? @relation("CategoryTree", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryTree")
  products    Product[]
  createdAt   DateTime  @default(now())
}

model Product {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])
  basePrice   Int       // paise
  isActive    Boolean   @default(true)
  isFeatured  Boolean   @default(false)
  weight      Int?      // grams
  salesCount  Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  variants      ProductVariant[]
  images        ProductImage[]
  tags          ProductTag[]
  cartItems     CartItem[]
  orderItems    OrderItem[]
  inventoryItem InventoryItem?
  wishlistItems WishlistItem[]

  @@index([isActive, isFeatured])
  @@index([categoryId])
  @@index([salesCount])
}

model ProductVariant {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  name      String   // e.g. "Red / Large"
  sku       String   @unique
  price     Int?     // paise — null inherits from product
  stock     Int      @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  cartItems  CartItem[]
  orderItems OrderItem[]

  @@index([productId])
}

model ProductImage {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  altText   String?
  position  Int      @default(0)
  createdAt DateTime @default(now())

  @@index([productId])
}

model Tag {
  id       String       @id @default(uuid())
  name     String       @unique
  slug     String       @unique
  products ProductTag[]
}

model ProductTag {
  productId String
  tagId     String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  tag       Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([productId, tagId])
}

// ─── Inventory ──────────────────────────────────────────

model InventoryItem {
  id        String   @id @default(uuid())
  productId String   @unique
  product   Product  @relation(fields: [productId], references: [id])
  stock     Int      @default(0)
  reserved  Int      @default(0)
  lowStock  Int      @default(5)
  updatedAt DateTime @updatedAt

  movements InventoryMovement[]
}

model InventoryMovement {
  id              String        @id @default(uuid())
  inventoryItemId String
  inventoryItem   InventoryItem @relation(fields: [inventoryItemId], references: [id])
  delta           Int           // positive = stock in, negative = stock out
  reason          String        // "sale", "restock", "adjustment", "return"
  orderId         String?
  createdAt       DateTime      @default(now())

  @@index([inventoryItemId])
}

// ─── Cart ────────────────────────────────────────────────

model Cart {
  id        String     @id @default(uuid())
  userId    String?    @unique
  user      User?      @relation(fields: [userId], references: [id])
  sessionId String?    @unique
  status    CartStatus @default(ACTIVE)
  currency  String     @default("INR")
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  items     CartItem[]

  @@index([sessionId])
  @@index([status])
}

enum CartStatus {
  ACTIVE
  MERGED
  ABANDONED
  CONVERTED
}

model CartItem {
  id         String          @id @default(uuid())
  cartId     String
  cart       Cart            @relation(fields: [cartId], references: [id], onDelete: Cascade)
  productId  String
  product    Product         @relation(fields: [productId], references: [id])
  variantId  String?
  variant    ProductVariant? @relation(fields: [variantId], references: [id])
  quantity   Int
  priceAtAdd Int             // paise — snapshot at time of add
  createdAt  DateTime        @default(now())
  updatedAt  DateTime        @updatedAt

  @@unique([cartId, productId, variantId])
  @@index([cartId])
}

// ─── Orders ──────────────────────────────────────────────

model Order {
  id              String      @id @default(uuid())
  orderNumber     String      @unique
  userId          String?
  user            User?       @relation(fields: [userId], references: [id])
  guestEmail      String?
  addressId       String
  address         Address     @relation(fields: [addressId], references: [id])
  shippingRateId  String?
  status          OrderStatus @default(PENDING)
  paymentIntentId String      @unique
  currency        String      @default("INR")
  subtotal        Int         // paise
  shippingCost    Int         // paise
  taxAmount       Int         @default(0)
  totalAmount     Int         // paise
  refundedAmount  Int         @default(0)
  trackingNumber  String?
  trackingUrl     String?
  utmSource       String?
  utmMedium       String?
  utmCampaign     String?
  shippedAt       DateTime?
  deliveredAt     DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  items         OrderItem[]
  webhookEvents WebhookEvent[]

  @@index([userId])
  @@index([guestEmail])
  @@index([status])
  @@index([createdAt])
}

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
  PARTIAL_REFUND
}

model OrderItem {
  id          String          @id @default(uuid())
  orderId     String
  order       Order           @relation(fields: [orderId], references: [id])
  productId   String
  product     Product         @relation(fields: [productId], references: [id])
  variantId   String?
  variant     ProductVariant? @relation(fields: [variantId], references: [id])
  productName String          // snapshot
  variantName String?         // snapshot
  quantity    Int
  unitPrice   Int             // paise — snapshot
  totalPrice  Int             // paise

  @@index([orderId])
}

// ─── Shipping ────────────────────────────────────────────

model ShippingZone {
  id        String         @id @default(uuid())
  name      String
  countries String[]
  states    String[]
  isActive  Boolean        @default(true)

  rates     ShippingRate[]
}

model ShippingRate {
  id              String       @id @default(uuid())
  zoneId          String
  zone            ShippingZone @relation(fields: [zoneId], references: [id])
  name            String
  carrier         String?
  minWeight       Int?
  maxWeight       Int?
  minOrderValue   Int?
  maxOrderValue   Int?
  price           Int          // paise
  estimatedDaysMin Int?
  estimatedDaysMax Int?
  isActive        Boolean      @default(true)

  @@index([zoneId])
}

// ─── Webhooks ────────────────────────────────────────────

model WebhookEvent {
  id          String    @id  // Stripe event ID
  type        String
  orderId     String?
  order       Order?    @relation(fields: [orderId], references: [id])
  payload     Json
  processedAt DateTime?
  error       String?
  createdAt   DateTime  @default(now())

  @@index([type])
}

// ─── Wishlist ────────────────────────────────────────────

model WishlistItem {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, productId])
}

// ─── Search Analytics ────────────────────────────────────

model SearchEvent {
  id          String   @id @default(uuid())
  query       String
  resultCount Int
  userId      String?
  sessionId   String?
  createdAt   DateTime @default(now())

  @@index([query])
  @@index([createdAt])
}
```

---

## Migrations

```bash
# Initialise Prisma (first time only)
npx prisma init

# After writing schema.prisma
npx prisma migrate dev --name init

# Subsequent schema changes
npx prisma migrate dev --name add_wishlist

# Apply migrations in production
npx prisma migrate deploy

# Regenerate Prisma Client after schema changes
npx prisma generate
```

**Never edit migration files after they've been committed.** If you need to change a migration, create a new one. Migration files are an audit trail of your schema history.

---

## Indexes: What You Need and Why

Indexes not defined in the schema above that you should verify exist:

```sql
-- Full-text search (run after first migration)
ALTER TABLE "Product" ADD COLUMN search_vector tsvector;
CREATE INDEX idx_product_search ON "Product" USING GIN(search_vector);

-- Trigram fuzzy search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_product_name_trgm ON "Product" USING GIN(name gin_trgm_ops);
```

Add these via a Prisma migration using `prisma migrate dev` with raw SQL in the migration file, or run them directly on your database after initial migration.

---

## Seeding

A seeded database lets you develop without manually creating data through the UI every session.

```ts
// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  // Categories
  const apparel = await db.category.upsert({
    where: { slug: 'apparel' },
    update: {},
    create: { name: 'Apparel', slug: 'apparel' }
  })

  // Products
  await db.product.upsert({
    where: { slug: 'classic-white-tee' },
    update: {},
    create: {
      name: 'Classic White Tee',
      slug: 'classic-white-tee',
      description: 'A clean, minimal white t-shirt.',
      categoryId: apparel.id,
      basePrice: 149900, // ₹1,499
      isActive: true,
      isFeatured: true,
      weight: 250,
      images: {
        create: [{ url: 'https://placehold.co/600x800', altText: 'White Tee', position: 0 }]
      },
      variants: {
        create: [
          { name: 'S', sku: 'CWT-S', stock: 20 },
          { name: 'M', sku: 'CWT-M', stock: 35 },
          { name: 'L', sku: 'CWT-L', stock: 25 },
        ]
      }
    }
  })

  // Admin user
  await db.user.upsert({
    where: { email: 'admin@yourstore.com' },
    update: {},
    create: {
      email: 'admin@yourstore.com',
      name: 'Admin',
      emailVerified: true,
      role: 'ADMIN'
    }
  })

  // Shipping zones
  await db.shippingZone.upsert({
    where: { id: 'zone-india' },
    update: {},
    create: {
      id: 'zone-india',
      name: 'India — Standard',
      countries: ['IN'],
      rates: {
        create: [
          { name: 'Standard Delivery', price: 9900, estimatedDaysMin: 3, estimatedDaysMax: 7 },
          { name: 'Free Shipping', price: 0, minOrderValue: 99900, estimatedDaysMin: 3, estimatedDaysMax: 7 }
        ]
      }
    }
  })

  console.log('Seed complete')
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
```

```json
// package.json — add this
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

```bash
npx prisma db seed
```

Use `upsert` in seeds, not `create`. Seeds must be re-runnable without failing on duplicate data.

---

## AI Prompt: Schema Review

```
You are a senior backend engineer reviewing a Prisma schema for a personal e-commerce project built with PostgreSQL.

Here is my full schema:

[paste your prisma/schema.prisma]

Review for:
1. Missing indexes on foreign keys and frequently queried fields
2. Wrong field types (e.g. using Float for money instead of Int)
3. Missing cascade rules on related tables
4. Enum values that don't cover real business states
5. Relations that will cause N+1 query problems
6. Fields I've defined but will realistically never use
7. Missing fields that will be painful to add later

Be specific. Flag critical issues first. Note if anything is over-engineered for a personal project.
```

---

## Validation Checklist

- [ ] All Phase 2 schemas consolidated into a single Prisma schema file
- [ ] No Float types used for money — all prices stored as Int (paise/cents)
- [ ] All foreign key relations defined with appropriate cascade rules
- [ ] Indexes on all foreign keys and high-frequency query fields
- [ ] `orderNumber` is human-readable and unique
- [ ] `paymentIntentId` is unique on Order (idempotency)
- [ ] Price snapshot fields exist on CartItem (`priceAtAdd`) and OrderItem (`unitPrice`, `productName`)
- [ ] `search_vector` column and GIN index added via raw SQL migration
- [ ] pg_trgm extension enabled and index created
- [ ] Seed file uses `upsert` — re-runnable without error
- [ ] Seed includes: categories, products with variants, admin user, shipping zones
- [ ] `npx prisma migrate dev` completes without errors
- [ ] `npx prisma db seed` completes without errors
- [ ] Prisma Studio (`npx prisma studio`) shows seeded data correctly

---

## What to Build Next

**Backend** — with the database migrated and seeded, you're ready to build the API layer. The backend module covers route structure, middleware, request validation, and the patterns that keep your API maintainable as it grows.

---

> **Filename:** `database-personal-e-commerce.md`
