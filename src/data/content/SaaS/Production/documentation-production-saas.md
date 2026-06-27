---
title: Documentation
slug: documentation
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Documentation

Documentation is a product decision, not a writing task. The question is never "should we have docs?" — it's "what kind of docs do we need right now, and who are they for?"

Bad documentation is worse than no documentation. It creates false confidence, sends users down dead ends, and costs you support tickets you can't afford.

This module covers the three types of documentation a SaaS product needs, when to write each one, and how to write them well.

---

## The Three Types of Documentation

| Type | Audience | Purpose | When to write |
|---|---|---|---|
| **User docs** | Your customers | Help them use the product | Before launch |
| **API docs** | Developers integrating with you | Show them how to call your API | When you have an API |
| **Internal docs** | Your team | Capture decisions, runbooks, architecture | Continuously |

Most early-stage SaaS teams either skip documentation entirely (costing them support hours) or write the wrong kind (spending days on internal ADRs when customers can't figure out how to connect their Slack).

Start with user docs. They have the highest ROI at launch.

---

## User Documentation

### What to Document First

Not every feature needs a doc page. Write documentation for:

- The onboarding flow (first 10 minutes of the product)
- Your most common support questions
- Features with non-obvious behaviour
- Anything involving configuration or setup
- Billing and plan management

Skip documentation for:

- Self-evident UI (a "Save" button doesn't need a page)
- Features nobody has asked about yet
- Internal implementation details users don't care about

### Where to Host It

| Tool | Best for | Cost |
|---|---|---|
| **Mintlify** | Clean, modern docs with MDX and API reference generation | Free tier, $150+/mo for teams |
| **Docusaurus** | Full control, self-hosted, open source | Free |
| **GitBook** | Fast to set up, WYSIWYG editor | Free for public docs |
| **Notion** | Internal teams already using Notion | Free |
| **Plain markdown in `/docs`** | Developer-facing, lives with the codebase | Free |

For most SaaS products: **Mintlify** for public user/API docs, **Notion** for internal docs. Both are operational in an hour.

### Writing Good User Documentation

The rule: **write from the user's goal, not the product's features.**

Users don't think "I need to use the Document Settings panel." They think "I need to change who can see this document."

```
❌ Feature-centric (bad)
Title: Document Settings Panel
Content: The Document Settings panel can be accessed by clicking the gear icon.
It contains the following options: Visibility, Collaborators, Version History...

✓ Goal-centric (good)
Title: Control who can see a document
Content: By default, documents are only visible to your team. To share with
someone outside your organization, open the document, click Share, and choose
"Anyone with the link."
```

**Structure every doc page as:**
1. What this page helps you accomplish (one sentence)
2. Steps to do it (numbered, concrete, specific)
3. What to do if something goes wrong (one or two common issues)

### The Support Ticket Test

Every time a user submits a support ticket, ask: "Should this have been answered by our docs?"

If yes — write the doc page before closing the ticket. This is the highest-signal way to build documentation that actually gets read.

---

## API Documentation

If you expose a public or partner-facing API, the documentation *is* the product. A poorly documented API doesn't get adopted regardless of how well it's built.

### What Every API Doc Needs

For each endpoint:

```
Endpoint: POST /api/documents
Description: Creates a new document in the authenticated user's organization.

Authentication: Bearer token (Authorization: Bearer <token>)

Request body:
  title       string   required   Document title (max 255 chars)
  body        string   optional   Document content (markdown supported)
  status      string   optional   "draft" | "published" (default: "draft")

Response: 201 Created
  id          string   UUID of the created document
  title       string
  status      string
  created_at  string   ISO 8601 timestamp
  url         string   Link to the document in the app

Errors:
  400   Invalid request body (see error.details for field-level errors)
  401   Missing or invalid authentication token
  403   Insufficient permissions

Example request:
  curl -X POST https://api.yourapp.com/v1/documents \
    -H "Authorization: Bearer sk_live_..." \
    -H "Content-Type: application/json" \
    -d '{"title": "Q4 Strategy", "status": "draft"}'

Example response:
  { "id": "doc_abc123", "title": "Q4 Strategy", "status": "draft", ... }
```

### Generate Docs from Code

Don't maintain API docs by hand — they drift from reality within weeks.

**If you're using TypeScript + Zod:**

```typescript
// Your route schema becomes your documentation
const createDocumentSchema = z.object({
  title: z.string().max(255).describe('Document title'),
  body: z.string().optional().describe('Document content, markdown supported'),
  status: z.enum(['draft', 'published']).default('draft'),
});

// Tools like Zod-to-OpenAPI generate an OpenAPI spec from this
// Mintlify and other doc platforms render OpenAPI specs automatically
```

**If you're using FastAPI (Python):** Docs are generated automatically at `/docs`. Nothing extra needed.

**If you're using Express/Node:** Use `zod-to-openapi` or `tsoa` to generate an OpenAPI 3.0 spec, then feed it to Mintlify or Swagger UI.

The investment: ~2–4 hours to wire up schema-to-OpenAPI generation. The payoff: API docs that are always in sync with your actual API.

---

## Internal Documentation

Internal docs serve your team, not your users. They don't need to be pretty. They need to be findable and accurate.

### What's Worth Writing Down

**Architecture Decision Records (ADRs)**

When you make a significant technical decision, write a short record of it. Future you — or a new engineer — will need to know not just *what* you chose, but *why*.

```markdown
# ADR-001: Use Postgres Full-Text Search instead of Algolia

Date: 2024-03-15
Status: Accepted

## Context
We need search across documents. We considered Algolia and Typesense.

## Decision
Use Postgres full-text search via tsvector/tsquery.

## Reasoning
- Current scale: ~50k documents. Postgres handles this comfortably.
- Eliminates a sync layer and a third-party dependency.
- We can migrate to Typesense if query latency degrades above 200ms.

## Consequences
- No typo tolerance
- No real-time faceted search
- Re-evaluate at 500k documents or if search latency becomes a user complaint
```

ADRs take 10 minutes to write. They save hours of context-rebuilding six months later.

**Runbooks**

A runbook is a step-by-step guide for performing a specific operational task. Write one every time you do something manually that you'll need to do again.

```markdown
# Runbook: Manually migrate a customer to a new plan

When: Sales requests an off-cycle plan change not handled by Stripe's UI.

Steps:
1. Verify the request in Slack from an account manager or founder
2. Log into Stripe dashboard → Customers → [Customer Name]
3. Update subscription: Products → Change Plan → [New Plan]
4. Update the plan field in our DB:
   UPDATE organizations SET plan = 'enterprise' WHERE stripe_customer_id = 'cus_xxx';
5. Verify the change in the admin panel (/admin/organizations/[id])
6. Notify the account manager in the original Slack thread
7. Log the change in #ops-log: "Manually migrated [org name] to Enterprise — requested by [name]"

Rollback: Reverse the Stripe subscription change and DB update.
```

**Environment Setup**

The `README.md` in your repository should let a new engineer run the project locally in under 30 minutes. If it takes longer, fix the README.

```markdown
# Getting Started

## Prerequisites
- Node.js 20+
- Docker (for local Postgres)
- A Stripe test account

## Setup

1. Clone the repo and install dependencies
   git clone ... && cd project && npm install

2. Copy environment variables
   cp .env.example .env
   # Fill in values — see Notion > Engineering > Environment Variables for the secrets

3. Start the local database
   docker compose up -d

4. Run migrations
   npx prisma migrate dev

5. Seed test data
   npm run db:seed

6. Start the dev server
   npm run dev → http://localhost:3000

## Running tests
npm test              # unit + integration
npm run test:e2e      # end-to-end (requires dev server running)
```

---

## AI Prompt — Documentation Audit

Use this once you have a first draft of any doc type.

```
You are a senior technical writer reviewing documentation for a SaaS product.

Product context:
[Describe your product — what it does and who uses it]

Documentation type:
[User docs / API docs / Internal runbook / README]

The documentation I've written:
[Paste the doc content]

Please review it and:
1. Identify anything a first-time user would find confusing or ambiguous
2. Flag any steps that assume knowledge the reader probably doesn't have
3. Point out anything that's missing that would generate a support ticket
4. Tell me if the structure makes sense for someone skimming (not reading word for word)
5. Suggest one thing I should cut — where I'm over-explaining

Be specific. Quote the parts that need improvement.
```

---

## Implementation Checklist

### User Documentation

- [ ] Docs platform set up (Mintlify / Docusaurus / GitBook)
- [ ] Getting started guide covers the first 10 minutes of the product
- [ ] Every onboarding step has a corresponding doc page
- [ ] Top 5 support questions are answered in docs
- [ ] Docs are linked from the app (help icon, error messages, onboarding)
- [ ] Search works within your docs

### API Documentation

- [ ] Every public endpoint documented with request/response examples
- [ ] Authentication documented with a working example
- [ ] Error codes documented with resolution steps
- [ ] OpenAPI spec generated from code (not hand-written)
- [ ] SDK or code samples in at least one language

### Internal Documentation

- [ ] README lets a new engineer run the project in under 30 minutes
- [ ] `.env.example` has every variable with a comment explaining it
- [ ] At least one ADR written for your most significant architecture decision
- [ ] Runbooks exist for manual operational tasks (plan changes, data migrations)
- [ ] On-call or incident response process documented

---

## Common Mistakes

> **⚠️ Writing docs nobody reads**
> Docs written before you know your users' actual questions are guesswork. Use support tickets and user interviews to find out what's confusing, then write those pages first.

> **⚠️ Hand-maintaining API docs**
> An API doc that's out of sync with the actual API is worse than no docs. Generate from code or use a tool that enforces sync. Manual maintenance always drifts.

> **⚠️ Internal docs in too many places**
> Notion for some things, Confluence for others, Google Docs for others, random Markdown files in repos. Nobody knows where to look. Pick one tool for internal docs and enforce it.

> **⚠️ Burying the getting started guide**
> If a new user can't find "how do I get started?" within 10 seconds of landing on your docs, you have a navigation problem. The getting started guide is always one click from the homepage.

> **⚠️ Documenting every feature instead of every workflow**
> Users want to accomplish goals, not learn features. Document workflows ("how do I invite my team") not UI panels ("the Settings page").

---

## What's Next

Documentation is in place. Before closing Phase 3, confirm:

- A new user can complete onboarding using only your docs (no support needed)
- Every public API endpoint has at least one working curl example
- Your README lets a new engineer run the project locally without asking for help
- At least one ADR is written for a decision you'll be glad you recorded

**Phase 3 — Development is complete.**

Next up: **Phase 4 — Production Readiness**  
Starting with: **Security**
