---
title: Repository Structure
slug: repository-structure
phase: Phase 2
mode: production
projectType: web-app
estimatedTime: 15–20 min
---

# Repository Structure

Your repository structure is the first thing every engineer on your team encounters. It communicates how the codebase is organized, where things live, and how features are expected to be built.

A well-structured repo makes onboarding fast, refactoring safe, and AI assistance dramatically more effective. A poorly structured repo makes every task harder than it needs to be.

---

## The Core Principle: Organize by Feature, Not by Type

The instinct of most beginners is to organize by file type:

```
src/
├── components/
├── hooks/
├── utils/
├── types/
└── services/
```

This feels logical until your app has 30 features. Then `/components` has 150 files, nothing is co-located, and finding what belongs to a feature requires searching across five folders.

The production standard is **feature-based co-location**:

> Code that changes together should live together.

Everything related to a feature — its components, hooks, types, and utilities — lives in one place. Shared code lives in a shared directory.

---

## Recommended Structure (Next.js App Router)

```
my-app/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── public/                 # Static assets (images, fonts, icons)
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # Route group: auth pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (app)/          # Route group: authenticated app
│   │   │   ├── layout.tsx  # App shell (sidebar, nav)
│   │   │   ├── dashboard/
│   │   │   └── settings/
│   │   ├── api/            # Route handlers
│   │   │   └── [feature]/
│   │   │       └── route.ts
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   │
│   ├── features/           # Feature modules (the heart of the codebase)
│   │   └── [feature-name]/
│   │       ├── components/ # Feature-specific components
│   │       ├── hooks/      # Feature-specific hooks
│   │       ├── actions.ts  # Server actions for this feature
│   │       ├── queries.ts  # Data fetching functions
│   │       ├── types.ts    # Feature-specific types
│   │       └── utils.ts    # Feature-specific utilities
│   │
│   ├── components/         # Shared, reusable UI components
│   │   ├── ui/             # shadcn/ui primitives (Button, Input, Modal)
│   │   └── layout/         # Structural components (Sidebar, Header, PageShell)
│   │
│   ├── lib/                # Shared utilities and configurations
│   │   ├── db.ts           # Database client (Prisma)
│   │   ├── auth.ts         # Auth configuration
│   │   ├── supabase.ts     # Supabase client
│   │   └── utils.ts        # General utilities (cn(), formatDate(), etc.)
│   │
│   ├── hooks/              # Shared hooks used across multiple features
│   ├── types/              # Global TypeScript types and interfaces
│   └── middleware.ts       # Next.js middleware (auth guards, redirects)
│
├── .env.example            # Environment variable template (committed)
├── .env.local              # Actual secrets (never committed)
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## The `features/` Directory

This is where most of your application code lives. Each feature is self-contained.

```
features/
├── projects/
│   ├── components/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectList.tsx
│   │   └── CreateProjectModal.tsx
│   ├── hooks/
│   │   └── useProjects.ts
│   ├── actions.ts          # createProject(), deleteProject()
│   ├── queries.ts          # getProjects(), getProjectById()
│   └── types.ts            # Project, ProjectStatus, CreateProjectInput
│
├── billing/
│   ├── components/
│   │   ├── PricingTable.tsx
│   │   └── BillingPortal.tsx
│   ├── actions.ts          # createCheckoutSession(), cancelSubscription()
│   └── types.ts
│
└── auth/
    ├── components/
    │   ├── LoginForm.tsx
    │   └── SignupForm.tsx
    └── hooks/
        └── useSession.ts
```

**The rule:** If a component, hook, or utility is only used by one feature, it lives in that feature's directory. If it's used by two or more features, it moves to `/components` or `/hooks`.

---

## Route Groups (Next.js App Router)

Route groups (folders wrapped in parentheses) let you share layouts without affecting the URL:

```
app/
├── (auth)/             # Shares auth layout — no /auth in URL
│   ├── login/          → /login
│   └── signup/         → /signup
│
└── (app)/              # Shares app shell layout — no /app in URL
    ├── dashboard/      → /dashboard
    └── settings/       → /settings
```

Use route groups to apply different layouts to different sections of your app without polluting the URL structure.

---

## Critical Files at Root Level

**`.env.example`** — Always commit this. It documents every environment variable the app needs, with placeholder values. New developers clone the repo, copy this to `.env.local`, and fill in real values.

```bash
# .env.example
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_...
```

**`.env.local`** — Never commit this. Add it to `.gitignore` on day one. One accidental commit of real secrets requires rotating every key.

**`prisma/schema.prisma`** — Your database schema lives here, committed to the repo. This is the source of truth for your data model.

---

## Naming Conventions

Consistency matters more than the specific convention you choose. Pick one and enforce it everywhere.

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProjectCard.tsx` |
| Hooks | camelCase, `use` prefix | `useProjects.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `Project`, `CreateProjectInput` |
| Route files | lowercase (Next.js convention) | `page.tsx`, `layout.tsx`, `route.ts` |
| Feature folders | kebab-case | `features/project-management/` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_UPLOAD_SIZE_MB` |

---

## What Belongs in `lib/` vs `utils/`

A common source of confusion:

**`lib/`** — Configured clients and singletons. Things that need initialization.
```ts
// lib/db.ts — Prisma client singleton
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()
export { db }
```

**`utils/`** — Pure functions with no side effects. Things that just transform data.
```ts
// lib/utils.ts — General helpers
export function formatCurrency(amount: number, currency = 'USD') { ... }
export function cn(...classes: string[]) { ... } // Tailwind class merging
```

---

## Implementation Checklist

- [ ] Feature-based directory structure created, not type-based
- [ ] Route groups configured for auth layout vs. app layout
- [ ] `.env.example` committed with all required variable names
- [ ] `.env.local` in `.gitignore` — verify before first push
- [ ] `prisma/` directory initialized with schema
- [ ] Naming conventions documented (even one line in README is enough)
- [ ] `src/components/ui/` seeded with shadcn/ui primitives you'll need
- [ ] `src/lib/db.ts` exports a single Prisma client instance
- [ ] `src/middleware.ts` created (even if empty — you'll need it for auth guards)

---

## AI Prompt — Structure Generation

Give this to an AI coding tool at the start of a new project:

```
You are helping me scaffold a Next.js 14 App Router project with TypeScript and Tailwind CSS.

My app: [describe in 2–3 sentences]
Core features: [list 4–6 features]

Generate the complete initial directory structure for this project following these rules:
1. Use feature-based co-location under src/features/[feature-name]/
2. Use Next.js route groups for auth layout and app layout separation
3. Place shared components in src/components/ui/ (shadcn primitives) and src/components/layout/
4. Place configured clients (Prisma, Supabase) in src/lib/
5. Include an .env.example with placeholder values for all environment variables this app will need
6. Include a src/middleware.ts stub for auth route protection

Output the directory tree, then list every environment variable in .env.example format with a one-line comment explaining each.
```

---

## Structure Is a Living Decision

This structure works for most production web apps. You will adapt it.

When a feature grows complex enough to deserve sub-features, nest them. When a shared utility is only used in one place, move it back into the feature. When you add a mobile app, extract shared logic into a `/packages` directory.

The structure should reflect the actual shape of your product — not a template you're forcing your product into.

What matters: **anyone joining your team can find anything in under 30 seconds.**
