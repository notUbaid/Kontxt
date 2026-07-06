---
title: Documentation
slug: documentation
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Documentation (Knowledge Management)

## Code Is Read 10x More Than It Is Written

In a personal project, you can hold the entire architecture in your head. In a production marketplace, you will hire other engineers. If your onboarding process consists of "just read the code," your new hires will take weeks to become productive, and they will inevitably break your undocumented state machines.

Production documentation is not about writing comments on every function. It is about creating systemic, automated, and immutable records of your architecture and operations.

---

## Architecture Decision Records (ADRs)

Engineers don't need to know *what* the code does (the code tells them that). They need to know *why* you wrote it that way.

Why did you choose Postgres over MongoDB? Why are you using Stripe Connect Custom instead of Express?

**The Production Standard:** Implement Architecture Decision Records (ADRs).
Store them in a `/docs/architecture` folder in your repository. Every major decision gets a markdown file:
1. **Context:** The problem you were facing.
2. **Options Considered:** What you evaluated (and why you rejected alternatives).
3. **Decision:** What you chose.
4. **Consequences:** The trade-offs you accepted.

---

## API Documentation (OpenAPI / Swagger)

If you have a frontend team and a backend team, or if you plan to ever expose a public API to your top sellers, your API must be documented mathematically.

Do not write API docs in a Confluence page or a Notion document. They will be out of date the day after you write them.

**The Production Standard:**
Use **OpenAPI (Swagger)** for REST APIs, or rely on **GraphQL Introspection** if using GraphQL.
If you are using tRPC, your TypeScript types *are* your documentation, but you must still document your data models.
Tools like Swagger UI or Redoc can automatically generate a beautiful, interactive documentation site directly from your code annotations.

---

## Incident Runbooks

When your server crashes at 3:00 AM on a Saturday, the engineer on call (which might be you) will not have the cognitive capacity to debug from scratch.

You must write Runbooks for critical failure modes:
1. **"Stripe Webhooks are Failing" Runbook:** How to replay missed events from the Stripe Dashboard, how to manually reconcile a transaction in the database.
2. **"Algolia Sync is Broken" Runbook:** How to trigger a full re-index of the Postgres database into the search engine without taking the site offline.
3. **"High API Latency" Runbook:** How to check connection pooling limits and scale the database instances.

---

## System State Machines

Your Listing and Transaction state machines dictate the entire flow of money and visibility in your marketplace. If a developer misunderstands them, they will introduce catastrophic bugs.

Do not document state machines in prose. Use visual diagrams (e.g., Mermaid.js) directly in your repository README so they render automatically on GitHub.

````mermaid
graph TD;
    Initiated-->Payment_Held;
    Payment_Held-->Completed;
    Payment_Held-->Disputed;
    Disputed-->Refunded;
    Disputed-->Released;
````

---

## Do's and Don'ts of Production Documentation

- **DO document your database schema.** Use tools like Prisma Studio or dbdocs.io to generate interactive ER (Entity-Relationship) diagrams. 
- **DON'T write useless code comments.** `// increments the counter by 1` above `counter++` is noise. Write comments that explain business logic anomalies: `// We delay release by 48h to comply with regional escrow laws.`
- **DO automate your documentation.** If your OpenAPI spec requires manual updating every time you add a route, you will forget. Generate it from your Zod schemas automatically.
- **DON'T treat documentation as an afterthought.** A Pull Request that introduces a new core feature (like Subscriptions) should not be merged if the accompanying ADR and Runbook are missing.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Generating an ADR:**

````prompt
Act as a Principal Staff Engineer. I need to write an Architecture Decision Record (ADR) for our decision to use Stripe Connect Custom over Stripe Connect Express. Write the markdown document. It must include the Context (we need full control over the UI), the Options Considered (Express vs Custom), the Decision, and the specific Consequences (we now bear the engineering cost of building the entire onboarding UI and handling 1099 tax reporting logic).
````

> [!TIP]
> **Prompt 2 — Runbook Generation:**

````prompt
Write a Tier 1 Support Runbook for "Failed Stripe Webhooks". It must provide step-by-step instructions for an on-call engineer to: 1. Identify the failed event ID in Stripe. 2. Verify if the database state is out of sync. 3. Manually trigger the idempotency retry script in our backend. 4. Escalate to Tier 2 if the retry fails.
````

---

## Validating What AI Generates

- **Check for maintainability:** If the AI generates a massive, static Markdown file for your API documentation, reject it. Demand an automated solution (like Zod-to-OpenAPI) so the docs stay perfectly in sync with the codebase.
- **Verify diagram syntax:** If the AI generates a Mermaid diagram, paste it into a Mermaid Live Editor to ensure the syntax is valid and the state transitions match your actual business rules.

---

## Implementation Checklist

- [ ] Created a `/docs/architecture` folder and wrote ADRs for all major Phase 2 decisions.
- [ ] Automated API documentation generation (OpenAPI/Swagger or tRPC types).
- [ ] Wrote actionable Incident Runbooks for Webhook failures and Search sync failures.
- [ ] Documented the core Listing and Transaction state machines using Mermaid.js diagrams.
- [ ] Ensured the `README.md` contains clear local setup instructions for new hires.

---

## What's Next

Next: Phase 3 is now complete. You have architected, developed, and tested the core engine of your marketplace. We now move to **Phase 4: Production Readiness**, where we will harden the infrastructure, implement rate limiting, configure CI/CD deployments, and secure the application for public launch.
