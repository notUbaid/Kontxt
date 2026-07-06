---
title: Tech Stack Selection
slug: tech-stack-selection
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Tech Stack Selection (Enterprise Readiness)

## Why This Decision Is Permanent

You can redesign a UI in a sprint. You cannot change your database or core backend framework after processing millions of dollars in transactions without a catastrophic, multi-month migration. 

In a production environment, you are not choosing a stack based on what is trendy or easy to learn. You are choosing a stack based on its ability to support high-availability, team collaboration, strict type safety, and eventual SOC2 compliance. This decision sets the ceiling for your scale.

---

## What a Production Marketplace Actually Demands

Marketplaces are financially liable for their data. Before picking technologies, you must define the engineering requirements for a system that handles other people's money.

| Requirement | The Production Reality |
|---|---|
| **ACID Transactions** | A payment success and a database ledger update must succeed or fail together. Eventual consistency is too risky for core transactions. |
| **Strict Type Safety** | Runtime errors during a checkout flow cost money. The stack must be statically typed end-to-end. |
| **Event-Driven Webhooks** | Stripe, background checks, and email providers will fire asynchronous events. Your backend must handle high-volume webhook ingestion. |
| **Infrastructure as Code (IaC)** | Your staging and production environments must be identical, provisioned via code (e.g., Terraform), not manual clicks in a dashboard. |
| **Observability** | When a server crashes at 2 AM, you need distributed tracing to know exactly which microservice or query failed. |

If a framework or database cannot comfortably support these five requirements, it is disqualified for a production marketplace.

---

## Recommended Default Production Stack

This is the default enterprise-grade stack. Deviating from it should require a formal architecture review, not just a developer's personal preference.

| Layer | Recommendation | Why It Scales |
|---|---|---|
| **Frontend** | React (Next.js App Router) + TypeScript | Massive ecosystem, SSR for SEO, strict type safety, and Component-Driven Architecture. |
| **Backend API** | Node.js (NestJS) or Go | Strongly typed, scalable, and excellent support for concurrent webhook processing. |
| **Database** | PostgreSQL (AWS RDS / Supabase) | Unmatched relational integrity. Essential for complex financial joins and PostGIS spatial queries. |
| **Authentication** | Auth0 / Supabase Auth | Enterprise SSO, Multi-Factor Authentication (MFA), and compliance (SOC2/HIPAA) out of the box. |
| **Payments** | Stripe Connect | The only viable choice for compliant, multi-party marketplace money routing. |
| **Search** | Algolia / ElasticSearch | Fast, typo-tolerant search is the core UX of a marketplace. Postgres full-text search is insufficient at scale. |
| **Hosting** | AWS (ECS/EKS) or Vercel + AWS | Scalable container orchestration. Vercel handles frontend edge-caching; AWS handles secure backend processing. |

---

## Do's and Don'ts of Production Stacks

> [!IMPORTANT]
> The biggest mistake engineering teams make is adopting "FAANG-scale" architecture before they have FAANG-scale problems.

- **DO choose a Modular Monolith first.** Microservices introduce network latency, complex distributed rollbacks, and massive DevOps overhead. Start with a strictly modular monolith and only extract services when specific bottlenecks arise.
- **DON'T use NoSQL (MongoDB) for the core ledger.** Marketplaces are relational. A user has many listings, a listing has many bookings, a booking has a payment. Relational databases (Postgres) were built precisely for this.
- **DO enforce End-to-End Type Safety.** Use tools like Prisma, Drizzle, or GraphQL to generate types directly from your database schema to your frontend components.
- **DON'T self-host critical infrastructure.** Do not run your own Kafka cluster, Postgres instance, or Auth server. Pay for managed services (RDS, Auth0) so your engineers can focus on product, not DevOps.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Validating Your Architecture:**

````prompt
I am building an enterprise-grade marketplace for [Your Niche]. My proposed stack is:
- Frontend: [Your choice]
- Backend: [Your choice]
- Database: [Your choice]
- Hosting: [Your choice]

Act as a Principal Solutions Architect. Critique this stack for a production marketplace expecting high transaction volume. Specifically flag:
1. Potential bottlenecks in relational data integrity or transaction handling.
2. Any choices that violate standard compliance or security practices.
3. The DevOps overhead required to maintain this stack across Dev, Staging, and Prod environments.
````

> [!TIP]
> **Prompt 2 — CI/CD Pipeline Design:**

````prompt
Based on a Next.js and Node/Postgres stack, design the ideal CI/CD pipeline using GitHub Actions. Outline the specific jobs required for Linting, Type Checking, Unit Testing, Database Migration dry-runs, and deploying to AWS ECS. Provide the YAML structure for the workflow.
````

---

## Validating What AI Generates

- **Check for overly complex architectures:** If the AI recommends a Kubernetes cluster running 12 different microservices for your MVP, reject it. Force it to design a modular monolith.
- **Ensure Data Integrity:** If AI suggests using a document store (NoSQL) for financial ledgers to "improve speed," reject it. ACID compliance in Postgres is non-negotiable for money movement.

---

## Implementation Checklist

- [ ] Finalized the core stack (Frontend, Backend, Database, Auth, Payments).
- [ ] Confirmed the stack supports strict End-to-End Type Safety (TypeScript/GraphQL/Prisma).
- [ ] Decided on a managed database provider (e.g., AWS RDS) to ensure automated backups and high availability.
- [ ] Documented the stack choice and constraints in your Architecture Decision Records (ADR).
- [ ] Defined the infrastructure as code (IaC) strategy (e.g., Terraform or AWS CDK) to ensure environment parity.

---

## What's Next

Next: **Authentication** — With the stack locked in, we must immediately secure it. We will define the authentication architecture, handling Multi-Factor Authentication (MFA), JWTs, and secure session management.
