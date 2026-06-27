---
title: Backups
slug: backups
phase: Phase 4
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Backups

Data loss is not a hypothetical. Databases get corrupted. Migrations go wrong. Accidental deletes happen. Disgruntled employees exist. Cloud providers have outages. The question is never whether you'll need a backup — it's whether you'll have one when you do.

A backup strategy that has never been tested is not a backup strategy. It's a false sense of security.

---

## The Three Scenarios You're Protecting Against

| Scenario | What You Need |
|---|---|
| **Accidental data deletion** | Point-in-time restore to minutes before the event |
| **Corrupt migration / bad deploy** | Snapshot from before the deploy |
| **Full infrastructure failure** | Complete backup in a separate region |
| **Ransomware / security breach** | Immutable, air-gapped backup |
| **Regulatory requirement** | Long-retention, auditable backup history |

Your backup strategy must handle all of these. Each has different requirements for frequency, retention, and restore speed.

---

## Core Concepts

### RPO — Recovery Point Objective
How much data can you afford to lose? If your RPO is 1 hour, your backups must run at least every hour. Losing 1 hour of user data after an incident is acceptable under this policy. Losing 24 hours is not.

### RTO — Recovery Time Objective
How quickly must you be back online? If your RTO is 4 hours, your restore process must complete in under 4 hours. An RTO of 4 hours requires a very different process than an RTO of 15 minutes.

**Define these numbers before designing your backup system.** They drive every decision.

```
Most early-stage SaaS:
  RPO: 1 hour (lose up to 1 hour of data)
  RTO: 4 hours (restored within 4 hours)

Higher-stakes SaaS (payments, healthcare, legal):
  RPO: 5–15 minutes
  RTO: 30–60 minutes
```

---

## Database Backups

Your database is your most critical asset. Everything else is replaceable.

### Managed Database — What You Get Automatically

If you're using a managed database (Supabase, PlanetScale, Neon, Railway, RDS, etc.), you likely have automatic backups already — but the defaults may not be sufficient.

| Provider | Default Backup | Point-in-Time | Retention |
|---|---|---|---|
| **Supabase** | Daily (Pro+) | Yes (Pro+) | 7 days |
| **Neon** | Continuous | Yes | 7–30 days (plan-dependent) |
| **PlanetScale** | Daily | No | 7 days |
| **AWS RDS** | Daily automated | Yes | Up to 35 days |
| **Railway** | No automatic backup | No | — |

> **Check your provider's actual backup policy today.** Do not assume. Several popular providers offer no automatic backups on free or developer tiers.

### What "Point-in-Time Recovery" Actually Means

Point-in-time recovery (PITR) lets you restore your database to any specific moment within the retention window — not just the last daily snapshot.

Without PITR: "We can restore to yesterday at midnight."
With PITR: "We can restore to 14:32:17 on Tuesday — two minutes before the bad migration ran."

For any SaaS with active users, PITR is the difference between losing hours of data and losing almost none. Enable it.

### Supplement With Your Own Backups

Managed provider backups are a good baseline, not a complete strategy. Add your own:

```bash
#!/bin/bash
# backup.sh — run via cron or scheduled job

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_NAME="your_db"
BACKUP_FILE="${DB_NAME}_${TIMESTAMP}.sql.gz"
S3_BUCKET="your-backups-bucket"

# Dump and compress
pg_dump $DATABASE_URL | gzip > /tmp/$BACKUP_FILE

# Upload to S3 (different region from primary)
aws s3 cp /tmp/$BACKUP_FILE s3://$S3_BUCKET/db/$BACKUP_FILE \
  --storage-class STANDARD_IA

# Clean up local file
rm /tmp/$BACKUP_FILE

echo "Backup complete: $BACKUP_FILE"
```

Schedule this via:
- A cron job on your server
- GitHub Actions scheduled workflow
- A dedicated service like [Pitr.io](https://pitr.io) or [SimpleBackups](https://simplebackups.com)

---

## The 3-2-1 Rule

The industry standard for backup strategy. Simple and sufficient for most SaaS.

```
3 copies of your data
2 different storage media / providers
1 copy offsite (different region or provider)
```

In practice:

```
Copy 1: Your live database
Copy 2: Managed provider's automated backup (same region)
Copy 3: Your own backup export in a separate cloud region (or provider)
```

If your database provider and your backup bucket are in the same AWS region and that region has an outage, copies 1 and 2 are both unavailable. Copy 3 in a different region saves you.

---

## What Else Needs Backing Up

Most engineers think "backups" and think "database." But there are other critical data stores.

### User-Uploaded Files

If you store files in S3 (or equivalent), enable versioning and cross-region replication.

```
S3 Bucket Configuration:
├── Versioning: ENABLED
│   └── Recover deleted or overwritten files
├── Cross-region replication: ENABLED
│   └── Replicate to a bucket in a different AWS region
└── Object Lock (for compliance): OPTIONAL
    └── Makes objects immutable for a set period
```

```bash
# Enable versioning via CLI
aws s3api put-bucket-versioning \
  --bucket your-uploads-bucket \
  --versioning-configuration Status=Enabled
```

### Environment Variables and Secrets

Your secrets are not in your database, but losing them is catastrophic. You can't run your application without them.

```
Store secrets in:
- AWS Secrets Manager (automatic versioning + rotation)
- 1Password Secrets Automation
- Doppler
- HashiCorp Vault

Never store the only copy of a secret in:
- A .env file on a single server
- A Slack message
- Your personal notes
```

Document your secret recovery process. If every server burns down tonight, can a team member recreate the environment?

### Application Code

Your code is in Git. Git is your backup. But only if:
- You're pushing to a remote (GitHub, GitLab)
- That remote is not self-hosted on the same infrastructure that failed

GitHub and GitLab both have their own redundancy. This is the one area you probably don't need to add to.

---

## Backup Storage

Where you store backups matters as much as how often you create them.

### Storage Class Selection (AWS S3)

```
STANDARD          → Frequent access (active data). Too expensive for backups.
STANDARD_IA       → Infrequent access. Good for 30-day backups.
GLACIER           → Archive. Very cheap. 3–5 hour retrieval. Good for long-term.
GLACIER_DEEP      → Cheapest. 12 hour retrieval. Compliance archives only.
```

```bash
# Use lifecycle rules to automatically tier old backups
aws s3api put-bucket-lifecycle-configuration \
  --bucket your-backups-bucket \
  --lifecycle-configuration '{
    "Rules": [{
      "ID": "backup-lifecycle",
      "Status": "Enabled",
      "Transitions": [
        {"Days": 30, "StorageClass": "STANDARD_IA"},
        {"Days": 90, "StorageClass": "GLACIER"}
      ],
      "Expiration": {"Days": 365}
    }]
  }'
```

### Bucket Security

```
Backup bucket must be:
 Private (no public access)
 Encrypted at rest (AES-256 or KMS)
 In a different AWS account OR different region from primary
 Access limited to a dedicated backup IAM role
 Never accessible from your application's primary IAM role
```

If your production environment is compromised and the attacker has your application's credentials, they should not be able to reach your backups. Separate accounts or separate credentials are essential.

---

## Retention Policy

Keep backups long enough to detect problems that aren't immediately obvious.

```
Hourly backups    → Keep 24 hours
Daily backups     → Keep 30 days
Weekly backups    → Keep 12 weeks
Monthly backups   → Keep 12 months
```

Regulated industries (healthcare, finance, legal) often require 7-year retention. Know your regulatory requirements before setting expiry.

---

## The Part Everyone Skips — Testing Restores

A backup you have never restored from is an assumption, not a guarantee.

```
Monthly restore test (minimum):
  1. Pick a backup from 7 days ago
  2. Restore to a staging environment
  3. Verify data integrity (row counts, spot checks, key records)
  4. Measure how long the restore took
  5. Document what worked and what didn't

Quarterly full drill:
  1. Simulate a complete data loss scenario
  2. Restore from backup to a fresh environment
  3. Verify the application works end-to-end
  4. Measure total recovery time against your RTO
  5. Update your runbook with what you learned
```

Put this in your calendar. It will not happen otherwise.

---

## The Restore Runbook

When an incident happens, you will be stressed and making decisions quickly. Write your restore process now, while calm.

```markdown
# Database Restore Runbook

## Step 1 — Assess
- What data is affected?
- What is the earliest known-good timestamp?
- Who needs to be notified?

## Step 2 — Stop the bleeding
- Put the application in maintenance mode
- Prevent further writes to the affected database

## Step 3 — Restore
Option A — Managed provider PITR:
  1. Go to [PROVIDER DASHBOARD URL]
  2. Navigate to Database → Backups → Point-in-Time Restore
  3. Select timestamp: [TIMESTAMP BEFORE INCIDENT]
  4. Restore to: [STAGING FIRST, then swap]
  5. Expected duration: ~20 minutes

Option B — Manual backup restore:
  1. Find the correct backup: aws s3 ls s3://your-backups-bucket/db/
  2. Download: aws s3 cp s3://your-backups-bucket/db/[FILE] /tmp/
  3. Restore: gunzip -c /tmp/[FILE] | psql $DATABASE_URL
  4. Expected duration: [YOUR MEASURED TIME]

## Step 4 — Verify
- Row counts match expected
- Most recent legitimate records exist
- Application smoke test passes

## Step 5 — Communicate
- Update status page
- Email affected users if data loss occurred
- Internal post-mortem
```

---

## AI Prompt — Backup Strategy Review

<copy-prompt>
You are a Staff Engineer reviewing the backup and disaster recovery strategy for a production SaaS application.

My setup:
- Database: [DATABASE + PROVIDER]
- File storage: [S3 / GCS / OTHER]
- Hosting: [PROVIDER + REGION]
- Current backups: [WHAT I HAVE TODAY]
- RPO target: [HOW MUCH DATA LOSS IS ACCEPTABLE]
- RTO target: [HOW FAST I NEED TO RECOVER]
- Regulatory requirements: [ANY COMPLIANCE REQUIREMENTS]
- Team size: [SOLO / SMALL TEAM / LARGER]

Review my strategy and tell me:
1. What gaps exist in my current backup coverage
2. Whether my RPO/RTO targets are achievable with this setup
3. What I'm not backing up that I should be
4. How to make my backups secure (separate from production credentials)
5. A realistic restore testing schedule for my team size
6. What my restore runbook should cover
7. Cost estimate for my backup storage approach

Be specific and practical. Prioritise the highest-risk gaps first.
</copy-prompt>

---

## Backups Checklist

- [ ] Database provider's backup policy confirmed (not assumed)
- [ ] Point-in-time recovery enabled on your database
- [ ] Automated backup job running on a schedule (hourly or daily)
- [ ] Backups stored in a separate region from primary database
- [ ] Backup bucket is private, encrypted, and access-restricted
- [ ] Backup credentials are separate from application credentials
- [ ] S3 versioning enabled on user-uploaded files bucket
- [ ] Cross-region replication configured for file storage
- [ ] Secrets and environment variables documented and stored securely
- [ ] Retention policy defined (daily / weekly / monthly expiry)
- [ ] S3 lifecycle rules configured to tier old backups to cheaper storage
- [ ] RPO and RTO targets defined and written down
- [ ] Restore runbook written and stored somewhere accessible during an incident
- [ ] At least one restore test completed successfully
- [ ] Restore test duration measured and compared against RTO
- [ ] Restore test scheduled on a recurring calendar event
- [ ] Team members know where the runbook is and how to execute it

---

## Common Mistakes

> **Mistake: Assuming your managed database provider handles everything**
> Many providers only back up on free tiers once a day — or not at all. The backup window, retention, and restore capability vary wildly. Read the documentation and verify.

> **Mistake: Never testing restores**
> Discovering your backup is corrupt or your restore process takes 6 hours when you have a 1-hour RTO is the worst possible time to find out. Test restores regularly.

> **Mistake: Storing backups with the same credentials as production**
> If your production environment is breached, the attacker can access and delete your backups. Separate credentials and separate accounts prevent this.

> **Mistake: Backing up only the database**
> User-uploaded files, secrets, configuration, and third-party service data also need protection. A database restore is meaningless if you can't reconstruct the environment around it.

> **Mistake: No restore runbook**
> An incident at 3am with a panicked engineer and no documented process is how you make a bad situation catastrophic. Write the runbook before you need it.

---

## Next

With backups ensuring you can recover from data loss, the next topic is **CI/CD** — automating how code moves from your laptop to production, safely and repeatably.
