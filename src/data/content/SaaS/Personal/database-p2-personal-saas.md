# Database

Your database schema is the most consequential technical decision you'll make.

Not because changing it is impossible — it isn't. But because every change after you have real data requires a migration, and migrations in production are the most stressful moments in solo product development.

A schema designed well upfront survives contact with real users with minor adjustments. A schema designed poorly requires structural changes at the worst possible time.

Spend more time here than feels necessary. It pays back in hours.

---

## Schema Design Is Product Thinking

Before touching Prisma or SQL, translate your features into entities.

An entity is a thing your product tracks. It has attributes (columns) and relationships to other entities (foreign keys).

Start by listing your entities from your Core features:

```
Feature: "As a freelance designer, I need to track client projects"
Entity:  Project

Feature: "As a freelance designer, I need to mark milestones complete"
Entity:  Milestone

Feature: "As a freelance designer, I need to send invoices automatically"
Entity:  Invoice
```

Then ask: how do these relate to each other?

```
User        has many  Projects
Project     has many  Milestones
Project     has many  Invoices
Milestone   triggers  Invoice (optional relationship)
```

Draw this on paper before writing a single schema file. The drawing takes ten minutes. Changing a relationship in a production schema takes hours.

---

## The Rules of a Good Schema

### 1. Every table has an ID

Use a generated, non-guessable ID. Not an auto-incrementing integer.

```prisma
id  String  @id @default(cuid())
// or
id  String  @id @default(uuid())
```

Auto-incrementing integers expose your record count (`/projects/1`, `/projects/2`...) and make IDs guessable. cuid and uuid prevent both.

---

### 2. Every user-owned table has a userId

You covered this in Auth. It belongs here too because it's a schema decision.

```prisma
model Project {
  id        String   @id @default(cuid())
  userId    String   // foreign key to your user
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

If a table stores data that belongs to a user — it has a `userId`. No exceptions.

---

### 3. Every table has createdAt and updatedAt

```prisma
createdAt  DateTime  @default(now())
updatedAt  DateTime  @updatedAt
```

You will need these. Even if you can't imagine why right now.

Sorting by recency, showing "last updated," debugging what happened and when, building usage analytics — all of these require timestamps. Add them to every table from the start. Retrofitting timestamps onto tables with existing data is painful.

---

### 4. Use enums for fixed value sets

If a column has a small, fixed set of possible values — make it an enum, not a string.

```prisma
enum ProjectStatus {
  ACTIVE
  COMPLETED
  ARCHIVED
}

model Project {
  status  ProjectStatus  @default(ACTIVE)
}
```

This prevents invalid data, makes intent clear, and gives you type safety in your application code. A `status` column that can hold any string is a bug waiting to happen.

---

### 5. Nullable columns are intentional decisions

Every nullable column is a question: is it acceptable for this data to be missing?

Don't make columns nullable by default. Ask whether the data is genuinely optional.

```prisma
// Is a project description required?
description  String?  // nullable — optional

// Is a project name required?
name  String  // not nullable — required
```

Nullable columns that turn out to be required cause application errors. Required columns that turn out to be nullable require migrations. Think it through upfront.

---

### 6. Index what you query by

Indexes make queries fast. Without them, every query scans the entire table.

You need an index on every column you filter or sort by frequently.

```prisma
model Project {
  id        String   @id @default(cuid())
  userId    String
  status    ProjectStatus
  createdAt DateTime @default(now())

  @@index([userId])           // you filter by userId on every query
  @@index([userId, status])   // you filter by userId AND status together
}
```

At small scale, missing indexes won't matter. At moderate scale — hundreds of rows per user — they will. Add them now. They cost nothing.

---

## The Prisma Schema

A complete example for a freelance project management SaaS:

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ProjectStatus {
  ACTIVE
  COMPLETED
  ARCHIVED
}

enum MilestoneStatus {
  PENDING
  COMPLETE
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  OVERDUE
}

model Project {
  id          String        @id @default(cuid())
  userId      String
  name        String
  clientName  String
  clientEmail String
  status      ProjectStatus @default(ACTIVE)
  description String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  milestones  Milestone[]
  invoices    Invoice[]

  @@index([userId])
  @@index([userId, status])
}

model Milestone {
  id          String          @id @default(cuid())
  projectId   String
  name        String
  amount      Decimal         @db.Decimal(10, 2)
  status      MilestoneStatus @default(PENDING)
  completedAt DateTime?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  project     Project         @relation(fields: [projectId], references: [id], onDelete: Cascade)
  invoice     Invoice?

  @@index([projectId])
}

model Invoice {
  id          String        @id @default(cuid())
  userId      String
  projectId   String
  milestoneId String?       @unique
  amount      Decimal       @db.Decimal(10, 2)
  status      InvoiceStatus @default(DRAFT)
  sentAt      DateTime?
  paidAt      DateTime?
  dueDate     DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  project     Project       @relation(fields: [projectId], references: [id])
  milestone   Milestone?    @relation(fields: [milestoneId], references: [id])

  @@index([userId])
  @@index([projectId])
  @@index([userId, status])
}
```

This schema handles the core features, enforces data integrity at the database level, and gives you type-safe access from application code through Prisma Client.

---

## Money Columns

Never store monetary values as a float.

```prisma
// Never this
amount  Float

// Always this
amount  Decimal  @db.Decimal(10, 2)
```

Floating point arithmetic introduces rounding errors. `$10.10 + $20.20` can produce `$30.299999999999997` in a float. In a financial context this is not just wrong — it's a trust problem.

`Decimal` stores exact values. Use it for anything that represents money.

---

## Cascade Deletes

When a user deletes a project, what happens to the milestones and invoices that belong to it?

Without a cascade rule — they become orphaned records with a broken foreign key.

```prisma
// Milestones are deleted when their project is deleted
project  Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
```

Think through every relationship and decide:
- `Cascade` — delete children when parent is deleted
- `Restrict` — prevent parent deletion if children exist
- `SetNull` — set foreign key to null when parent is deleted

The right choice depends on your product logic. Pick deliberately, not by default.

---

## Migrations

Every change to your schema after the first deployment needs a migration.

```bash
# After editing schema.prisma
npx prisma migrate dev --name describe_what_changed

# Check what SQL Prisma will run before applying
npx prisma migrate dev --create-only
```

Rules for migrations:

**Never edit a migration file that's already been applied.** Create a new one.

**Name migrations descriptively.** `add_invoice_due_date` is useful. `update1` is not.

**Test destructive migrations on a copy of production data** before running them on the real thing. Dropping a column with data in it is permanent.

---

## AI Prompt — Generate Your Schema

```prompt
I'm designing the database schema for a personal SaaS product using Prisma and PostgreSQL.

**Product:** [one sentence]
**Persona:** [paste persona summary]
**Core features:** [paste Core feature list with user stories]
**Entities I've identified:** [list your entities and their relationships]

Generate a complete Prisma schema that:
1. Defines all entities as models with appropriate fields and types
2. Uses cuid() for all IDs
3. Adds userId to every user-owned table
4. Adds createdAt and updatedAt to every table
5. Uses enums for all fixed-value status fields
6. Defines all relationships with explicit onDelete behavior
7. Adds @@index for every column filtered or sorted frequently
8. Uses Decimal for any monetary amounts
9. Makes columns nullable only where the data is genuinely optional

After the schema, list:
- Any design decisions you made that I should review
- Any open questions about relationships or nullability
- Any columns I might have missed based on the features
```


---

## Validating Your Schema

Before running your first migration, check every model against this:

- [ ] ID is cuid() or uuid() — not auto-increment integer
- [ ] userId present on every user-owned table
- [ ] createdAt and updatedAt on every table
- [ ] Status fields are enums — not freeform strings
- [ ] Nullable columns are genuinely optional — not just default
- [ ] Money columns use Decimal — not Float
- [ ] Every frequently-queried column has an index
- [ ] All relationships have explicit onDelete behavior
- [ ] Cascade deletes are intentional — not accidental
- [ ] Schema reviewed against all Core features — nothing missing

---

## Next

**APIs →** Your schema is designed. Now define how your frontend talks to your backend — what endpoints exist, what they accept, and what they return.
