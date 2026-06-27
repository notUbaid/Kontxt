---
title: Disaster Recovery
slug: disaster-recovery
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Disaster Recovery

Disaster recovery is what you do when everything has already gone wrong. Not a slow degradation — a hard failure. Database gone. Region down. Security breach. Accidental mass deletion. The scenarios that feel impossible until they happen.

Most teams discover their disaster recovery plan during a disaster. That's the worst possible time to find out it doesn't work.

This module is about building a recovery capability before you need it, testing it, and knowing exactly what to do when the worst happens.

---

## What Counts as a Disaster

Disaster recovery covers failures that cannot be resolved by restarting a server or rolling back a deploy.

| Scenario | Category |
|---|---|
| Cloud provider region outage | Infrastructure failure |
| Database corruption or accidental deletion | Data loss |
| Ransomware or security breach | Security incident |
| Accidental `DROP TABLE` in production | Human error |
| Third-party dependency permanently down | Dependency failure |
| Critical team member suddenly unavailable | Bus factor |
| Billing failure causing account suspension | Operational failure |

Each requires a different response. The commonality is that normal operational procedures don't resolve them.

---

## DR vs Backups vs High Availability

These are related but distinct concepts.

```
Backups              → Can you recover your data?
High Availability    → Can you stay running through a failure?
Disaster Recovery    → Can you resume operations after a catastrophic failure?
```

Backups are an input to disaster recovery. High availability reduces the likelihood of needing disaster recovery. Disaster recovery is the plan that covers what happens when both of those are insufficient.

You need all three. This module focuses on the third.

---

## Defining Your Recovery Targets

Before designing a DR plan, define what you're actually recovering to.

### RPO — Recovery Point Objective
The maximum amount of data loss you can accept. If your RPO is 1 hour, you must be able to restore to a state no older than 1 hour before the incident.

### RTO — Recovery Time Objective
The maximum time to restore service. If your RTO is 4 hours, users must be able to use the product within 4 hours of the incident being declared.

### These are business decisions, not technical ones.

```
Questions to ask:
  → How much revenue do we lose per hour of downtime?
  → What SLA have we committed to in our contracts?
  → What data loss would cause legal liability?
  → What would trigger customer churn?

Typical targets by stage:

Early-stage (pre-revenue):
  RPO: 24 hours    RTO: 24 hours
  Justification: Low user count, high tolerance for recovery time

Growth-stage (paying customers):
  RPO: 1 hour      RTO: 4 hours
  Justification: Revenue loss and churn risk justify tighter targets

Scale (enterprise contracts):
  RPO: 15 minutes  RTO: 1 hour
  Justification: SLA commitments and enterprise churn costs
```prompt
Write these down. Share them with co-founders. They drive every other DR decision.

---

## Failure Scenarios and Recovery Paths

Design a specific recovery path for each plausible disaster. Vague plans fail under pressure.

### Scenario 1 — Database Data Loss

```
Trigger: Accidental DELETE/DROP, corrupt migration, ransomware

Immediate actions:
  1. Put application in maintenance mode (prevent further writes)
  2. Identify exact timestamp of last known-good state
  3. Notify affected stakeholders internally

Recovery path:
  Option A (PITR available):
    → Use managed provider point-in-time restore
    → Restore to timestamp before incident
    → Validate data integrity on staging first
    → Promote to production
    → Estimated time: 30–90 minutes

  Option B (manual backup):
    → Identify most recent clean backup from S3
    → Restore to a fresh database instance
    → Validate row counts and spot-check key records
    → Update DATABASE_URL across all services
    → Estimated time: 2–4 hours

Post-recovery:
  → Determine data loss window
  → Notify affected users if their data was lost
  → Post-mortem within 48 hours
```

### Scenario 2 — Cloud Region Outage

```
Trigger: AWS / GCP / Vercel region-wide failure

Immediate actions:
  1. Confirm it's a provider issue (check provider status page)
  2. Post to status page: "Investigating service disruption"
  3. Assess whether failover is within RTO

Recovery path (if you have a standby region):
  → Promote read replica in secondary region to primary
  → Update DNS to point to secondary region
  → Verify application functionality
  → Estimated time: 15–60 minutes

Recovery path (if no standby region):
  → Wait for provider recovery (most outages resolve in 1–4 hours)
  → Keep status page updated every 30 minutes
  → Spin up in new region from backups if outage exceeds RTO
  → Estimated time: 2–8 hours

Decision point:
  → If outage exceeds 2 hours and no ETA from provider:
     Begin full rebuild in alternate region
```

### Scenario 3 — Security Breach

```
Trigger: Unauthorised access, credential compromise, data exfiltration

Immediate actions (first 30 minutes):
  1. ISOLATE — revoke all active sessions, rotate all credentials
  2. PRESERVE — take snapshots before making changes (forensics)
  3. ASSESS — determine scope: what was accessed, what was exfiltrated?
  4. CONTAIN — revoke compromised credentials, block attack vectors
  5. NOTIFY — internal stakeholders, then legal counsel

Do NOT:
  → Patch and continue without understanding the breach
  → Delete logs or evidence
  → Communicate externally before assessing scope

Recovery path:
  → Rebuild from known-clean backups (before breach timestamp)
  → Rotate ALL secrets (database, API keys, OAuth, payment keys)
  → Audit all IAM roles and access grants
  → Notify affected users per breach notification requirements
  → GDPR: notify supervisory authority within 72 hours if EU data affected
  → Estimated time: 4–48 hours depending on scope
```

### Scenario 4 — Accidental Mass Deletion (Human Error)

```
Trigger: Wrong WHERE clause, bulk delete script run against production

Immediate actions:
  1. Immediately stop further writes (maintenance mode)
  2. Do NOT run any more queries on the affected tables
  3. Identify exact time of incident from logs

Recovery path:
  → PITR restore to 1 minute before incident
  → Validate affected records are restored
  → Verify no legitimate concurrent writes were lost
  → Resume service
  → Estimated time: 30–90 minutes

Prevention for future:
  → Require dry-run flag on all bulk operations
  → Soft deletes for user-facing data (deleted_at timestamp)
  → Require two-person review for production database mutations
```

---

## Soft Deletes — Your Safety Net for Human Error

Hard deletes are permanent and unrecoverable without a backup restore. Soft deletes give you a recovery window.

```typescript
// Instead of deleting records, mark them as deleted
model User {
  id          String    @id
  email       String
  deletedAt   DateTime? // null = active, timestamp = deleted
  deletedBy   String?   // who deleted it
}

// Query active records only
const activeUsers = await db.user.findMany({
  where: { deletedAt: null }
})

// Soft delete
async function deleteUser(userId: string, deletedBy: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      deletedAt: new Date(),
      deletedBy
    }
  })
}

// Recovery — no backup restore needed
async function restoreUser(userId: string) {
  await db.user.update({
    where: { id: userId },
    data: { deletedAt: null, deletedBy: null }
  })
}
```

Use soft deletes for: users, organisations, subscriptions, documents — anything a user might accidentally delete and then immediately regret.

Run a cleanup job to permanently purge soft-deleted records after your recovery window (e.g. 30 days).

---

## The Runbook — Your Recovery Bible

A runbook is step-by-step documentation for restoring service. It is written in advance, when you're calm. It is used during an incident, when you're not.

```markdown
# Disaster Recovery Runbook
Last tested: [DATE]
Owner: [NAME]
Escalation contact: [NAME + PHONE]

---

## 1. Incident Declaration
- Who can declare a disaster: [NAMES/ROLES]
- Declaration triggers: [CRITERIA]
- First communication: post to #incidents Slack channel

---

## 2. Status Page
URL: [YOUR STATUS PAGE URL]
Login: stored in [1PASSWORD / DOPPLER / etc.]
Update frequency during incident: every 30 minutes minimum

Template messages:
  Investigating: "We are investigating reports of [issue]. Updates to follow."
  Identified: "We have identified [issue] and are working on a resolution."
  Resolved: "The incident has been resolved. Normal service has resumed."

---

## 3. Database Recovery

### PITR via Supabase (primary method)
1. Go to: app.supabase.com → [PROJECT] → Settings → Backups
2. Select "Point in Time Recovery"
3. Enter target timestamp: [TIMESTAMP BEFORE INCIDENT]
4. Choose destination: new project (do NOT overwrite production)
5. Wait for restore to complete (~20 min for typical size)
6. Validate: run verification queries (see Section 7)
7. Update DATABASE_URL in [VERCEL / RAILWAY / etc.] to new instance
8. Redeploy application
9. Monitor error rates for 15 minutes

### Manual S3 backup restore (fallback)
1. List available backups:
   aws s3 ls s3://[BUCKET]/db/ --profile backup-role
2. Download most recent clean backup:
   aws s3 cp s3://[BUCKET]/db/[FILE] /tmp/ --profile backup-role
3. Restore:
   gunzip -c /tmp/[FILE] | psql [NEW_DATABASE_URL]
4. Continue from step 6 above

---

## 4. Credential Rotation (Security Incident)

Rotate in this order:
1. Database passwords (most critical)
   → [PROVIDER DASHBOARD URL]
2. Stripe API keys
   → dashboard.stripe.com → Developers → API keys → Roll key
3. OpenAI / AI provider keys
   → [PROVIDER DASHBOARD]
4. Auth provider secrets (Clerk / Auth0 / NextAuth)
   → [PROVIDER DASHBOARD]
5. Internal service tokens
   → Rotate in [DOPPLER / PLATFORM SECRETS]
6. Update all environment variables across all services
7. Redeploy all services

---

## 5. DNS Failover (Region Outage)

Current DNS: Cloudflare
Current primary: [REGION / IP]
Standby target: [ALTERNATE REGION / IP]

1. Log into Cloudflare: [URL]
   Credentials: [WHERE STORED]
2. Navigate to DNS → Records
3. Update A / CNAME record for [DOMAIN] to point to standby
4. Set TTL to 60 seconds during incident (allows faster re-pointing)
5. Verify propagation: dig [DOMAIN] @1.1.1.1
6. Test application on standby URL

---

## 6. Maintenance Mode

Enable:
  [COMMAND OR STEPS TO ENABLE MAINTENANCE MODE]

Disable:
  [COMMAND OR STEPS TO DISABLE]

---

## 7. Validation Queries

Run these after any restore to verify data integrity:

```sql
-- Total user count (compare to last known good)
SELECT COUNT(*) FROM users WHERE deleted_at IS NULL;

-- Most recent user created (verify recency)
SELECT created_at FROM users ORDER BY created_at DESC LIMIT 1;

-- Active subscriptions
SELECT COUNT(*), status FROM subscriptions GROUP BY status;

-- Recent transactions (verify payment data intact)
SELECT COUNT(*) FROM transactions
WHERE created_at > NOW() - INTERVAL '7 days';
```

Expected values: [FILL IN YOUR BASELINE NUMBERS]

---

## 8. Communication Templates

### Internal (Slack #incidents)
" INCIDENT DECLARED — [DESCRIPTION]
Impact: [WHAT IS DOWN]
Started: [TIME]
IC: [INCIDENT COMMANDER NAME]
Next update: [TIME]"

### External (Status Page / Email)
"We are currently experiencing [issue description].
Our team is actively working to resolve this.
We will provide an update by [TIME].
We apologize for the disruption."

### Post-resolution email to affected users
Subject: Service disruption on [DATE] — resolved
"On [DATE] between [TIME] and [TIME], [PRODUCT] experienced [brief description].
[What was affected / any data impact]
[What we've done to prevent recurrence]
We apologize for the disruption."
```

---

## Status Page

Users need somewhere to check during an incident. A status page reduces support volume and builds trust.

```
Options:
  Instatus       → Simple, affordable, fast to set up
  Statuspage.io  → Atlassian, more features, higher cost
  Openstatus     → Open source alternative
  Betteruptime   → Combined uptime monitoring + status page
```

Automate status updates where possible — connect your uptime monitor to your status page so incidents are detected and posted automatically, not manually when someone notices.

---

## DR Testing Schedule

An untested DR plan is a hypothesis. Test it.

```
Monthly:
   Restore a database backup to staging
   Verify restored data is intact
   Record restore duration (compare against RTO)

Quarterly:
   Full DR drill — simulate a specific disaster scenario
   Follow the runbook exactly as written
   Identify gaps between runbook and reality
   Update runbook with what you learned
   Rotate test participants (everyone should know how to recover)

Annually:
   Review and update all RTO/RPO targets
   Audit all credentials and access documented in runbook
   Verify backup storage is accessible and not expired
   Full region failover test (if applicable)
```

Put these in a shared calendar with a named owner. They will not happen otherwise.

---

## AI Prompt — DR Plan Review

<copy-prompt>
You are a Staff Engineer reviewing a disaster recovery plan for a production SaaS application.

My setup:
- Stack: [YOUR STACK]
- Database: [DATABASE + PROVIDER]
- Hosting: [PROVIDER + REGION]
- Backup strategy: [WHAT BACKUPS EXIST]
- RPO target: [MAX DATA LOSS]
- RTO target: [MAX DOWNTIME]
- Team size: [NUMBER]
- Paying customers: [APPROXIMATE COUNT]
- Any compliance requirements: [GDPR / SOC2 / HIPAA / NONE]

Review my disaster recovery readiness and tell me:
1. What disaster scenarios am I not prepared for?
2. Is my RPO/RTO achievable with my current setup?
3. What's the single highest-risk gap in my current plan?
4. What should my runbook cover that I might be missing?
5. What DR improvements should I prioritise in the next 30 days?
6. What would a SOC2 auditor look for in my DR documentation?

Be direct. Prioritise the highest-impact gaps.
</copy-prompt>

---

## Disaster Recovery Checklist

- [ ] RPO and RTO targets defined and written down
- [ ] Recovery paths documented for each plausible disaster scenario
- [ ] Database PITR enabled and tested
- [ ] Manual backup restore procedure documented and tested
- [ ] Restore duration measured and verified against RTO
- [ ] Backup credentials are separate from production credentials
- [ ] Soft deletes implemented for critical user-facing entities
- [ ] Full DR runbook written and stored accessibly (not only on the broken system)
- [ ] Runbook includes credential rotation steps
- [ ] Runbook includes DNS failover steps (if applicable)
- [ ] Runbook includes maintenance mode enable/disable steps
- [ ] Validation queries documented for post-restore verification
- [ ] Status page configured and connected to uptime monitoring
- [ ] Communication templates prepared for user-facing incidents
- [ ] Monthly restore test scheduled on recurring calendar
- [ ] Quarterly DR drill scheduled on recurring calendar
- [ ] At least two team members know how to execute the runbook
- [ ] Runbook location communicated to all relevant team members
- [ ] Breach notification process documented (GDPR 72-hour requirement if applicable)
- [ ] Post-mortem process defined

---

## Common Mistakes

> **Mistake: Storing the runbook only on the infrastructure that failed**
> Your runbook is in Notion. Notion is hosted on AWS. AWS is down. You cannot access your runbook. Store DR documentation in at least two places — including somewhere that doesn't depend on your own infrastructure.

> **Mistake: No bus factor plan**
> The only person who knows how to restore the database is on a flight with no internet. DR plans must be executable by any sufficiently technical team member, not just the person who built the system.

> **Mistake: Confusing high availability with disaster recovery**
> "We have multiple instances" is not a DR plan. Multiple instances in the same region all go down together in a region outage. HA and DR solve different problems.

> **Mistake: Testing restores only in theory**
> "The backup exists therefore we can restore" is not the same as "we have restored from this backup and it took 45 minutes." Test the actual restore process.

> **Mistake: Not having a status page**
> During an outage, every affected user emails support simultaneously. A status page reduces this to near zero and communicates professionalism and transparency. It takes 30 minutes to set up.

> **Mistake: Skipping the post-mortem**
> Disasters without post-mortems repeat. A blameless post-mortem answers: what happened, why, what we did, what we're changing. Done within 48 hours while memory is fresh.

---

## Completing Phase 4

Disaster Recovery is the final topic in Phase 4 — Production Readiness.

You have now covered:

```
 Security
 Performance Optimization
 Monitoring
 Logging
 Error Tracking
 Rate Limiting
 Caching
 Backups
 CI/CD
 Infrastructure
 Disaster Recovery
 Scalability Planning
```

A SaaS with all of these in place is genuinely production-ready — not just deployed, but resilient, observable, and recoverable. Most products that fail in production do so because they skipped most of this list.

**Phase 5 — Launch** is next.
