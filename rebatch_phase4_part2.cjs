const { updateTopic } = require('./update_topic.cjs');

const topics = {
  'caching': `# Caching

**Estimated Time:** 2-4 hours

---

## Why this matters
Caching is the ultimate performance cheat code. By storing frequently accessed, computationally expensive data in a fast, in-memory store (like Redis) or at the edge (CDN), you drastically reduce database load, decrease response times, and lower infrastructure costs.

## Strategic Guidance

### Hackathon Mode
Do not implement caching. Period. 

Caching introduces state synchronization problems (cache invalidation) that are notoriously difficult to debug. For a hackathon, your database can handle the 10 requests your app will receive during the demo. Query the database directly every single time. Keep it simple.

### Personal Project
For a personal project, implementing a basic cache is a great way to show you understand system design. 

If you have a dashboard that aggregates data or an endpoint that fetches a long list of static items, add a simple Redis cache. Cache the response for 5 minutes. This demonstrates that you know how to reduce database strain, which is a highly valued skill for junior/mid-level engineering roles. Do not over-engineer cache invalidation; simple Time-To-Live (TTL) expiration is sufficient.

### Production SaaS
In production, a robust caching strategy is mandatory for scalability and cost control. 

Implement caching at multiple layers. Use a CDN (Content Delivery Network) to cache static assets and even static HTML pages (Edge Caching) globally. Use an in-memory datastore like Redis or Memcached for database query caching and session management. 

The hardest part of caching is invalidation. You must have a clear strategy for evicting stale data when the underlying database is updated. Use pattern-matching eviction or write-through caching mechanisms. Monitor your cache hit rates; a low hit rate means your cache is useless and just adding latency.

## Caching Strategy Prompt
\`\`\`prompt
Act as a Senior Backend Engineer. I am building a SaaS app with [Insert Tech Stack]. Provide a strategy for implementing a Redis caching layer for my most expensive database queries. Explain how to handle cache invalidation when the underlying data is updated, and provide code examples for a write-through cache approach.
\`\`\`

## Validation Checklist
- [ ] Static assets are cached at the edge via a CDN.
- [ ] Expensive or frequently accessed database queries are cached in-memory (e.g., Redis).
- [ ] A clear cache invalidation strategy is implemented (TTL or event-driven).
- [ ] Cache hit/miss rates are monitored.
`,

  'backups': `# Backups

**Estimated Time:** 1-2 hours

---

## Why this matters
Hardware fails. Humans make mistakes. Malicious actors delete data. Without reliable backups, a single `DROP TABLE` command or a corrupted database volume can instantly destroy your entire business and everything your users have built. 

## Strategic Guidance

### Hackathon Mode
You do not need backups. If your database crashes during the 48-hour hackathon, you just re-seed it with your fake data script. 

Do not spend time configuring automated snapshots or point-in-time recovery. If you are extremely paranoid, just export your database to a SQL file manually before you go to sleep.

### Personal Project
For a personal project, basic automated backups are highly recommended, especially if you have real users or data you care about.

Most managed database providers (Supabase, Firebase, Heroku Postgres, PlanetScale) offer automated daily backups by default. Verify that this feature is turned on. You do not need complex multi-region replication, but you should know how to restore your database from a snapshot if you accidentally delete something while tinkering.

### Production SaaS
In production, backups are a critical component of your Disaster Recovery plan. You are legally and ethically obligated to protect your users' data.

Enable Point-in-Time Recovery (PITR) so you can restore your database to any specific second in the past (e.g., right before a developer accidentally dropped a critical table). Ensure you have daily automated snapshots. 

Crucially, you must securely store your backups off-site (in a different physical region or cloud provider) to protect against region-wide outages. Most importantly, you must regularly test your restoration process. A backup that you cannot successfully restore is worthless.

## Backup Strategy Prompt
\`\`\`prompt
Act as a Database Administrator. I am using [Insert Database Provider, e.g., Supabase, AWS RDS, MongoDB Atlas]. Outline the exact steps required to enable Point-in-Time Recovery (PITR) and automated daily snapshots. Furthermore, provide a standard operating procedure (SOP) for testing a database restoration in a staging environment.
\`\`\`

## Validation Checklist
- [ ] Automated daily database backups are enabled.
- [ ] Point-in-Time Recovery (PITR) is active for production databases.
- [ ] Backups are securely stored in a geographically separate location.
- [ ] The database restoration process has been successfully tested.
`,

  'cicd': `# CI/CD (Continuous Integration & Deployment)

**Estimated Time:** 2-4 hours

---

## Why this matters
Manual deployments are error-prone, slow, and stressful. CI/CD (Continuous Integration / Continuous Deployment) automates the process of testing, building, and deploying your code. It ensures that every change is verified before it reaches users, allowing you to ship features faster and with confidence.

## Strategic Guidance

### Hackathon Mode
Skip formal CI/CD pipelines. You do not have time to configure GitHub Actions or debug failing build scripts.

Use platforms like Vercel, Netlify, or Render that offer push-to-deploy out of the box. Connect your GitHub repository, push to the `main` branch, and let the platform handle the rest. If it fails, check the logs on the platform, fix the code, and push again. Speed is all that matters.

### Personal Project
Setting up a basic CI/CD pipeline is an excellent resume booster. It shows you understand modern engineering workflows.

Configure a simple GitHub Action to run your linter and unit tests on every pull request. Require these checks to pass before merging into the main branch. Use Vercel, Railway, or Heroku for automated deployments upon merging. This prevents you from accidentally deploying broken code and breaking your portfolio project.

### Production SaaS
A robust CI/CD pipeline is the backbone of a high-performing engineering team. You must automate everything to prevent human error and ensure reliable releases.

Your CI pipeline must run linting, type checking, unit tests, and integration tests on every commit. Enforce strict branch protection rules: no one can merge code without passing tests and peer review. 

Your CD pipeline should automate deployments to multiple environments (Staging, Production). Implement zero-downtime deployments (e.g., blue-green deployments or rolling updates). Run end-to-end (E2E) tests against your staging environment before promoting code to production. If a deployment fails, the system should automatically rollback to the previous stable version.

## CI/CD Pipeline Prompt
\`\`\`prompt
Act as a DevOps Engineer. I have a repository hosted on GitHub with a [Insert Frontend Tech] frontend and a [Insert Backend Tech] backend. Generate a GitHub Actions YAML file that runs npm install, linting, and unit tests on every pull request to the 'main' branch.
\`\`\`

## Validation Checklist
- [ ] Automated tests (unit, integration) run on every Pull Request.
- [ ] Code cannot be merged into the main branch if tests fail.
- [ ] Merging to the main branch automatically triggers a deployment to production.
- [ ] Deployments occur with zero downtime to the end user.
`,

  'infrastructure': `# Infrastructure

**Estimated Time:** 3-6 hours

---

## Why this matters
Infrastructure is the foundation your application runs on. Choosing the right infrastructure dictates your deployment speed, maintenance overhead, and scaling limits. Over-engineering your infrastructure early on will slow you down, while under-engineering it later will cause outages.

## Strategic Guidance

### Hackathon Mode
Serverless and Platform-as-a-Service (PaaS) are your best friends. Do not touch AWS, Docker, or Kubernetes. 

Host your frontend on Vercel or Netlify. Host your backend on Render, Railway, or use Supabase/Firebase Serverless Functions. The goal is to deploy your code in under 5 minutes without writing a single configuration file. You want infrastructure that manages itself so you can focus on writing application code.

### Personal Project
For a personal project, you want low-maintenance, zero-cost infrastructure. 

Stick to the free tiers of PaaS providers like Vercel (Frontend), Render/Railway (Backend), and Supabase/Neon (Database). This setup is robust enough to handle moderate traffic, requires zero server maintenance, and is completely free. Do not waste time managing Linux servers on DigitalOcean or EC2 unless learning DevOps is the explicit goal of the project.

### Production SaaS
In a production SaaS, you need infrastructure that is highly available, scalable, and secure. This is where Infrastructure as Code (IaC) becomes necessary.

Move away from manual click-ops in web dashboards. Define your infrastructure using Terraform or AWS CDK. This ensures your staging and production environments are identical and reproducible. 

Depending on your team's expertise, choose between a managed PaaS (easier maintenance, higher cost) or containerized orchestration like Kubernetes/ECS (complex, but highly scalable and customizable). Ensure your infrastructure spans multiple availability zones to tolerate hardware failures. Use a Virtual Private Cloud (VPC) to isolate your databases and internal services from the public internet.

## Infrastructure as Code Prompt
\`\`\`prompt
Act as a Cloud Architect. I am planning the production infrastructure for a SaaS application using [Insert Tech Stack]. We expect moderate but steady traffic. Compare the pros, cons, and maintenance overhead of using a PaaS (like Heroku/Render) versus containerized orchestration (like AWS ECS or Kubernetes). Which do you recommend for a small team?
\`\`\`

## Validation Checklist
- [ ] Production infrastructure is isolated from staging and development environments.
- [ ] Databases and internal services are not exposed directly to the public internet (e.g., inside a VPC).
- [ ] Infrastructure components span multiple availability zones for fault tolerance.
- [ ] Infrastructure changes are managed through code (IaC) and version control, not manual dashboard clicks.
`,

  'disasterrecovery': `# Disaster Recovery

**Estimated Time:** 2-4 hours

---

## Why this matters
Disasters happen. Cloud providers have regional outages, disgruntled employees delete databases, and ransomware attacks occur. Disaster Recovery (DR) is the process of getting your business back online when the worst-case scenario becomes a reality. 

## Strategic Guidance

### Hackathon Mode
Ignore this completely. If the cloud provider goes down during the hackathon, everyone else using that provider is also down. The judges will understand. Do not spend a single minute worrying about disaster recovery.

### Personal Project
For a personal project, disaster recovery just means having a backup of your code and a backup of your database. 

Your code should be hosted on GitHub, which acts as your DR plan for your source code. If your database provider deletes your account, you should theoretically be able to restore from a recent SQL dump. That is all the DR planning you need.

### Production SaaS
A production SaaS requires a formal, tested Disaster Recovery plan. You need to define your Recovery Time Objective (RTO - how fast you need to be back online) and Recovery Point Objective (RPO - how much data you can afford to lose).

Your infrastructure should be defined as code (Terraform/CDK) so you can spin up a replica of your entire environment in a different cloud region within minutes. Your database backups must be continuously replicated to this secondary region.

You must document the exact, step-by-step Standard Operating Procedure (SOP) for declaring a disaster and executing the failover. Most critically, you must run "fire drills" to test this process. A DR plan that has never been tested is just a theoretical document that will fail when you actually need it.

## Disaster Recovery Plan Prompt
\`\`\`prompt
Act as a Site Reliability Engineer (SRE). I am operating a SaaS application on [Insert Cloud Provider, e.g., AWS, GCP]. Draft a standard operating procedure (SOP) for a Disaster Recovery scenario where our primary region goes completely offline. Include steps for DNS failover, infrastructure recreation via Terraform, and database restoration from a cross-region backup.
\`\`\`

## Validation Checklist
- [ ] Recovery Time Objective (RTO) and Recovery Point Objective (RPO) are defined.
- [ ] Database backups are securely stored in a secondary geographic region.
- [ ] Infrastructure can be rapidly recreated using Infrastructure as Code (IaC).
- [ ] The Disaster Recovery failover process is documented and tested regularly.
`,

  'scalabilityplanning': `# Scalability Planning

**Estimated Time:** 2-4 hours

---

## Why this matters
Scalability is the ability of your system to handle increased load gracefully without catastrophic failure or astronomical costs. Designing for scale too early is a waste of time (premature optimization), but ignoring it entirely will result in your application collapsing just when it starts to get popular.

## Strategic Guidance

### Hackathon Mode
Do not plan for scale. Your goal is to support exactly one user: you, during the demo. 

Write the most inefficient code possible if it saves you time. Run expensive computations on the main thread. Query the database inside a loop. None of it matters if you only have 3 rows in your database. 

### Personal Project
For a personal project, scalability planning is mostly an academic exercise. 

You should understand the *concepts* of scalability—like the difference between vertical scaling (getting a bigger server) and horizontal scaling (adding more servers). Ensure your backend is stateless so that, theoretically, you could run multiple instances of it. However, do not actually configure load balancers or read replicas. 

### Production SaaS
In a production SaaS, scalability must be planned and tested. You need to know your system's breaking points *before* a marketing spike hits them.

Design a stateless backend architecture so you can scale horizontally behind a load balancer. Offload heavy, long-running tasks (like image processing or report generation) to background worker queues (e.g., BullMQ, Celery) to keep your API responsive. 

Plan for database scaling. Start by vertically scaling your primary database, but know when and how you will introduce read replicas to offload read-heavy queries. Implement connection pooling (e.g., PgBouncer) to prevent your application servers from exhausting database connections. Conduct load testing (using tools like k6 or Artillery) to simulate high traffic and identify bottlenecks before they impact real users.

## Scalability Architecture Prompt
\`\`\`prompt
Act as a Software Architect. I am building a backend using [Insert Tech Stack, e.g., Node.js and PostgreSQL]. I expect a sudden surge in traffic due to a major marketing launch. Outline a plan to horizontally scale the backend application servers and implement connection pooling for the database to ensure it doesn't crash under load.
\`\`\`

## Validation Checklist
- [ ] The backend API is stateless, allowing for horizontal scaling.
- [ ] Long-running or resource-intensive tasks are offloaded to background worker queues.
- [ ] Database connection pooling is configured.
- [ ] Load testing has been conducted to identify the system's maximum capacity.
`
};

for (const [key, markdown] of Object.entries(topics)) {
  updateTopic(key, markdown);
}
console.log('Batch 1 (Part 2) of Phase 4 complete.');
