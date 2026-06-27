---
title: Infrastructure
slug: infrastructure
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 30–40 min
---

# Infrastructure

Infrastructure is the foundation everything else runs on. Most early-stage founders underinvest in understanding it — they deploy to a platform, it works, and they don't think about it again until something breaks at scale or a $4,000 cloud bill arrives unexpectedly.

You don't need to be a DevOps engineer. You do need to understand what you're running on, what its failure modes are, and how to make deliberate choices as your product grows.

---

## The Modern Infrastructure Spectrum

Infrastructure has changed dramatically. The choice is no longer "buy servers vs rent servers." It's a spectrum from fully managed to fully controlled.

```
Fully Managed                                    Fully Controlled
      │                                                  │
  Vercel                                            Raw EC2
  Railway              Fly.io       ECS/Fargate     Kubernetes
  Render            App Platform   Cloud Run        Self-hosted
      │                                                  │
   Low ops                                          High ops
   Low control                                   High control
   Fast to start                            Expensive to maintain
```

Most SaaS products should start toward the left and move right only when a specific need justifies the operational overhead.

---

## Choosing Your Hosting Strategy

The right answer depends on your stack, team size, and traffic profile.

### Serverless / Edge (Vercel, Netlify, Cloudflare Pages)

Best for: Next.js, static sites, API routes, edge functions

```
Pros:
   Zero infrastructure management
   Automatic scaling to zero and to millions
   Global edge network included
   Preview deployments per PR
   Tightly integrated with modern frameworks

Cons:
   Cold starts on infrequently called functions
   Execution time limits (Vercel: 60s on Pro, 300s on Enterprise)
   Vendor lock-in on routing and middleware
   Costs can spike unpredictably at scale
   No persistent connections (problematic for some databases)
```

### Platform-as-a-Service (Railway, Render, Fly.io)

Best for: Long-running servers, background workers, WebSockets, cron jobs

```
Pros:
   Runs any Docker container
   Persistent connections to databases
   WebSocket support
   Background workers and cron jobs
   Simpler than raw cloud providers
   Predictable pricing

Cons:
   You manage container health and resource sizing
   Less global edge presence than Vercel
   More setup than pure serverless
```

### Cloud Provider (AWS, GCP, Azure)

Best for: Complex infrastructure, compliance requirements, cost optimisation at scale, specific services (ML, data pipelines)

```
Pros:
   Maximum control and flexibility
   Every service imaginable
   Best pricing at high scale
   Compliance certifications available

Cons:
   Steep learning curve
   Significant ops overhead
   Easy to misconfigure security
   Cost management is a full-time job without guardrails
```

> **Recommended starting point for most SaaS:** Vercel (frontend + API routes) + Railway or Render (background workers, cron jobs) + managed database (Supabase, Neon, or PlanetScale). This gives you near-zero ops overhead, real scaling capability, and reasonable pricing through the first $50K MRR.

---

## The Core Infrastructure Components

Regardless of provider, every production SaaS needs these components.

### Compute

Where your application code runs.

```
Web server        → Handles HTTP requests from users
API server        → May be same as web server or separate
Background worker → Processes jobs from a queue (emails, AI tasks, exports)
Cron scheduler    → Triggers periodic jobs (billing, cleanup, reports)
```

Serverless platforms handle web and API servers automatically. Background workers and cron jobs often need a separate process — either a PaaS service or a managed queue.

### Database

Where your data lives. Covered in the Database Schema module. The infrastructure consideration:

```
Single region (most SaaS):
  Primary database in one region
  Managed provider handles replication internally

Multi-region (high availability requirement):
  Primary + read replicas in multiple regions
  Significant complexity — only add when needed
```

### Queue

Background work should never block HTTP responses.

```
Job types:
  Email sending           → Never block on SMTP
  AI generation           → Can take 30+ seconds
  File processing         → Unpredictable duration
  Webhook delivery        → Retry logic needed
  Report generation       → Heavy compute
  Billing operations      → Must not fail silently
```

Queue options:

| Tool | Best For |
|---|---|
| **BullMQ** (Redis-backed) | Node.js, already have Redis, moderate scale |
| **Inngest** | Serverless-friendly, event-driven, excellent DX |
| **Trigger.dev** | Background jobs with great observability |
| **AWS SQS** | Already on AWS, infinite scale |
| **Upstash QStash** | Serverless, HTTP-based, no persistent connection needed |

### CDN

Content Delivery Network — serves static assets from edge locations close to users.

```
Static assets (JS, CSS, images):  Always serve from CDN
API responses:                     Cache public responses at CDN
HTML:                              Cache static pages, bypass for authenticated

Vercel / Cloudflare: CDN included automatically
AWS: CloudFront sits in front of your origin
```

### DNS

Your domain lives in DNS. This is often overlooked until it matters.

```
Recommended: Cloudflare DNS
   Free
   Fastest DNS resolution globally
   DDoS protection included
   Analytics
   Easy proxy and redirect rules
   SSL certificates managed automatically
```

Transfer your domain's nameservers to Cloudflare even if you host elsewhere. The DNS management and protection benefits are free.

---

## Regions — Where to Run

Pick one region to start. Choose based on where most of your users are.

```
US-East (us-east-1 / iad1)   → Largest AWS region, best service availability
US-West (us-west-2)           → Better latency for West Coast and Asia-Pacific
EU-West (eu-west-1 / cdg1)   → Required for GDPR data residency in some cases
```

**Multi-region is complex.** Distributed databases, replication lag, and cross-region latency are engineering challenges that consume significant time. Don't add multi-region until your users are genuinely global and latency is a measurable problem.

---

## Environment Configuration

Your application needs configuration that varies per environment. Never hardcode it.

### The Twelve-Factor Approach

```
Store config in environment variables.
Never in code.
Never in committed files.
```

```bash
# .env.local — never committed (add to .gitignore)
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
OPENAI_API_KEY=sk-...

# .env.example — committed, no real values
DATABASE_URL=postgresql://user:password@host:5432/db
STRIPE_SECRET_KEY=sk_live_your_key_here
OPENAI_API_KEY=sk-your_key_here
```

### Secrets in Production

Don't copy-paste secrets into platform dashboards and hope they don't change. Use a secrets manager.

```
Option 1: Platform environment variables
  → Vercel, Railway, Render all have this
  → Fine for most SaaS
  → Manually update when secrets rotate

Option 2: Doppler
  → Central secret management
  → Syncs to all environments and platforms
  → Audit trail for who changed what
  → Secret rotation without redeploying

Option 3: AWS Secrets Manager
  → Best if already on AWS
  → Automatic rotation for supported services
  → Fine-grained IAM access control
```

---

## Infrastructure as Code

Manual infrastructure configuration is undocumented, unrepeatable, and hard to review. Infrastructure as Code (IaC) treats your cloud configuration like source code.

For early-stage SaaS, IaC is optional — managed platforms handle it for you. As you grow into AWS or multi-service setups, it becomes essential.

```typescript
// Pulumi example — define infrastructure in TypeScript
import * as aws from "@pulumi/aws"

const bucket = new aws.s3.Bucket("uploads", {
  versioning: { enabled: true },
  serverSideEncryptionConfiguration: {
    rule: {
      applyServerSideEncryptionByDefault: {
        sseAlgorithm: "AES256"
      }
    }
  }
})

const db = new aws.rds.Instance("primary", {
  engine: "postgres",
  engineVersion: "16.1",
  instanceClass: "db.t4g.small",
  allocatedStorage: 20,
  multiAz: true,
  deletionProtection: true,
  backupRetentionPeriod: 7
})
```

**IaC options:**

| Tool | Language | Best For |
|---|---|---|
| **Pulumi** | TypeScript, Python, Go | Developers who prefer code over config |
| **Terraform** | HCL | Most widely adopted, largest ecosystem |
| **AWS CDK** | TypeScript, Python | Already on AWS |
| **SST** | TypeScript | Next.js + AWS, excellent DX |

---

## Cost Management

Cloud bills surprise people. Understand what drives cost before you're staring at a $4,000 invoice.

### The Common Cost Drivers

```
Compute:      $/hour for running instances or $/request for serverless
Database:     $/instance-hour + $/GB storage + $/read-write unit
Storage:      $/GB stored + $/GB transferred (egress is expensive)
Bandwidth:    Egress (outbound) traffic is charged. Ingress is usually free.
AI API calls: Tokens in + tokens out. Scales with usage.
Email:        $/1000 emails sent.
```

### Cost Guardrails

Set these up before you need them.

```
AWS:
  → Billing alerts at $50, $200, $500
  → AWS Budgets with email notification
  → Cost Explorer enabled

Vercel:
  → Spending limit set under Settings → Billing
  → Alert on function invocation spikes

OpenAI / Anthropic:
  → Hard usage limit set in dashboard
  → Alert at 80% of limit
```

A usage spike from a bug, a bot, or a viral moment should trigger an alert — not a surprise invoice.

### Right-Sizing

The most common infrastructure waste is over-provisioned instances.

```
Start small. Measure. Scale up only when metrics show it's needed.

Database: Start with the smallest instance.
          Monitor CPU, memory, connection count.
          Upgrade when sustained load exceeds 70%.

Workers:  Start with 1 instance.
          Monitor queue depth and job duration.
          Add instances when queue consistently backs up.
```

---

## Observability Stack

You need to know when your infrastructure is struggling before users tell you.

```
Uptime monitoring:   Is the application responding?
                     → Better Stack, Checkly, or UptimeRobot
                     → Alert within 1 minute of downtime

Infrastructure metrics: CPU, memory, disk, network
                         → Railway / Render / Fly dashboards (built-in)
                         → Datadog or Grafana for deeper metrics

Application performance: Response time, error rate, throughput
                          → Vercel Analytics, Sentry Performance, Datadog APM

Logs:                What happened?
                     → Covered in Logging module
```

Your on-call response starts with the uptime monitor. Everything else is diagnosis.

---

## Security Baseline

Infrastructure security is a deep topic — the Security module covers it fully. The baseline for infrastructure:

```
 No services exposed to the internet that don't need to be
 Database not publicly accessible (only accessible from app servers)
 All traffic over HTTPS (SSL termination at load balancer or CDN)
 SSH access via key pair only — no password authentication
 Principle of least privilege on all IAM roles and service accounts
 Security groups / firewalls restrict inbound traffic to known ports
 DDoS protection at CDN layer (Cloudflare free tier covers basics)
```

---

## AI Prompt — Infrastructure Design

<copy-prompt>
You are a Staff Engineer helping design the infrastructure for a production SaaS application.

My application:
- Stack: [YOUR STACK]
- Expected users at launch: [NUMBER]
- Expected users in 12 months: [NUMBER]
- Data sensitivity: [STANDARD / PII / FINANCIAL / HEALTH]
- Team: [SOLO / SMALL TEAM]
- Budget for infrastructure: [MONTHLY ESTIMATE]
- Geographic focus: [US / EU / GLOBAL]
- Special requirements: [WEBSOCKETS / BACKGROUND JOBS / FILE STORAGE / etc.]

Help me design infrastructure including:
1. Hosting recommendation with reasoning (Vercel vs Railway vs AWS etc.)
2. Database hosting recommendation
3. Background job / queue strategy
4. CDN and DNS setup
5. Region selection and rationale
6. Environment strategy (local / staging / production)
7. Estimated monthly cost at launch and at 12-month scale
8. What to add first as I grow (scaling roadmap)
9. Cost guardrails I should set up immediately

Be specific. Give me actual provider recommendations and approximate pricing.
</copy-prompt>

---

## Infrastructure Checklist

- [ ] Hosting provider chosen with reasoning documented
- [ ] Staging environment mirrors production (same provider, same config)
- [ ] Staging uses separate credentials from production (no shared secrets)
- [ ] Database not publicly accessible — only reachable from app servers
- [ ] All traffic served over HTTPS
- [ ] SSL certificate auto-renewing (Let's Encrypt or managed)
- [ ] DNS on Cloudflare with proxy enabled for DDoS protection
- [ ] Background job queue configured for async work
- [ ] Cron job scheduler configured for periodic tasks
- [ ] CDN serving static assets with long cache TTLs
- [ ] Region selected based on user geography
- [ ] Environment variables managed — not hardcoded
- [ ] Secrets stored in platform secret manager or Doppler
- [ ] .env files in .gitignore — never committed
- [ ] .env.example committed with placeholder values
- [ ] Billing alerts configured on all cloud providers
- [ ] Spending limits set where available
- [ ] Uptime monitoring configured (alerts within 1 minute)
- [ ] Infrastructure sizing documented and right-sized for current load
- [ ] Scaling plan documented for 10x current traffic

---

## Common Mistakes

> **Mistake: Over-engineering infrastructure before product-market fit**
> Kubernetes, multi-region, service meshes — none of this matters if nobody uses your product. Start simple. Add complexity when scale forces it.

> **Mistake: Database accessible from the public internet**
> Your database should only be reachable from your application servers. A publicly accessible database with a weak password is one credential leak away from complete data loss.

> **Mistake: No billing alerts**
> A runaway background job, a scraper hitting your AI endpoint, or a misconfigured S3 bucket serving data — all of these can generate thousands of dollars in cloud costs before you notice. Set alerts.

> **Mistake: Production and staging sharing the same database**
> A staging deploy that runs a migration on the production database is a career-limiting incident. Keep environments completely separate.

> **Mistake: Manual infrastructure with no documentation**
> When you need to recreate your infrastructure (new region, disaster recovery, new team member), undocumented manual setup is impossible to reproduce. Document every non-obvious configuration decision.

> **Mistake: Ignoring egress costs**
> Ingress is free. Egress (data leaving your cloud) is charged. A feature that serves large files or streams video can generate unexpected bandwidth bills. Check egress pricing before building data-heavy features.

---

## Next

With infrastructure in place, the final topic in Phase 4 is **Disaster Recovery** — planning for the scenarios where infrastructure fails completely and you need a path back.
