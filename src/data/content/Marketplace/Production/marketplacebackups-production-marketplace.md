---
title: Backups
slug: backups
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Backups (Disaster Recovery & PITR)

## The Cost of Data Loss in a Marketplace

In a personal project, losing a week of data is an inconvenience. In a production marketplace, losing a day of data means you have thousands of successful Stripe charges but no corresponding database Orders to fulfill them. It destroys trust, triggers massive chargeback fees, and can result in legal liability.

"Running `pg_dump` on a cron job" is not a production backup strategy. You need **Point-in-Time Recovery (PITR)** and a verified **Disaster Recovery (DR)** protocol.

---

## Point-in-Time Recovery (PITR)

If a developer accidentally deploys a migration that runs `UPDATE listings SET price = 0;` without a `WHERE` clause at 2:15 PM, and you don't notice until 2:45 PM, a nightly backup from 12:00 AM is useless. If you restore it, you lose all legitimate transactions from the last 14 hours.

**The Production Standard:**
You must use a managed database (e.g., AWS RDS, Supabase, Neon) configured with **Point-in-Time Recovery (PITR)**.
PITR continuously archives Postgres Write-Ahead Logs (WAL) every few minutes. This allows you to say: *"Restore the database to exactly 2:14:59 PM,"* saving 14 hours of transactions and undoing only the fatal mistake.

---

## High Availability (Multi-AZ) and Failover

Backups are for data corruption; High Availability (HA) is for hardware failure.
If the AWS data center hosting your database loses power, your marketplace goes down.

**The Production Defense:**
Enable **Multi-AZ (Availability Zone) Failover**.
Your database provider maintains a synchronous standby replica in a completely different physical data center. If the primary instance crashes, the DNS routes automatically to the standby in less than 60 seconds with zero data loss.

---

## Logical vs Physical Backups

You need both.
* **Physical Backups (Volume Snapshots / WAL):** Used for full disaster recovery (PITR). Managed entirely by your database host (RDS/Supabase).
* **Logical Backups (`pg_dump`):** You must also export the database structure and data as raw SQL to an isolated, immutable S3 bucket in a different cloud provider. This protects you if your primary hosting provider terminates your account or suffers a catastrophic platform-wide failure.

---

## Zero-Downtime Migrations

Most "outages" are actually just database locks caused by bad schema migrations.
If you run `ALTER TABLE orders ADD COLUMN new_col VARCHAR DEFAULT 'x';` on a 10-million row table, Postgres will lock the entire table for 5 minutes. No one will be able to checkout.

**The Production Rule:**
Never lock production tables. Use tools like `pg-online-schema-change` or Prisma's expanded migration rules to add columns concurrently and backfill data in chunks.

---

## Do's and Don'ts of Production Backups

- **DO test your restore procedure quarterly.** A backup you have never restored is just a file you hope works. Schedule "Game Days" where your engineering team restores production data to a staging environment from a snapshot.
- **DON'T store Logical Backups in the same cloud account.** If an attacker gains access to your AWS root account, they will delete the database *and* the S3 backup bucket. Use cross-account roles to push backups to an isolated "vault" AWS account.
- **DO scrub PII when restoring to staging.** When testing restores, you must run a script that overwrites user emails and passwords before connecting the staging API to the restored database, otherwise you risk sending test emails to real users.
- **DON'T rely on a single developer.** Ensure at least two engineers (or founders) have the permissions and knowledge required to trigger a PITR restore.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Zero-Downtime Postgres Migration:**

````prompt
Act as a Senior Database Administrator. I need to add a non-nullable `tax_rate` column to a Postgres `Orders` table that currently has 5 million rows, without locking the table and causing downtime. Write the exact multi-step raw SQL migration required to do this safely (hint: add nullable, set default for new rows, backfill in batches, then alter to set not null).
````

> [!TIP]
> **Prompt 2 — Logical Backup S3 Script:**

````prompt
Write a bash script suitable for a Kubernetes CronJob. It must use `pg_dump` to create a logical backup of a Postgres database, compress it into a `.tar.gz` file, and upload it to an AWS S3 bucket. Include the AWS CLI command to ensure the uploaded file uses a `STANDARD_IA` storage class and sets an explicit KMS encryption key.
````

---

## Validating What AI Generates

- **Check for locking operations:** If AI generates a single `ALTER TABLE` statement for a massive data modification without batching or `CONCURRENTLY` modifiers (for indexes), reject it. It will cause downtime.
- **Verify Encryption in Transit/Rest:** If AI writes an automated backup script that uploads an unencrypted `.sql` file over standard HTTP, correct it immediately. Backups contain all PII and must be encrypted with AES-256 before leaving the server.

---

## Implementation Checklist

- [ ] Verified that the production database has Point-in-Time Recovery (PITR) enabled with at least 7 days of WAL retention.
- [ ] Configured Multi-AZ (High Availability) failover for the primary database to survive data center outages.
- [ ] Automated daily logical backups (`pg_dump`) to an isolated, cross-region storage bucket.
- [ ] Established a strict Zero-Downtime Migration policy for all future database schema changes.
- [ ] Documented and tested the exact step-by-step Runbook required to restore the database during a critical incident.

---

## What's Next

Next: **CI/CD** — Manual deployments are the enemy of stability. We will architect Continuous Integration and Continuous Deployment pipelines (GitHub Actions) to automate testing, security scanning, and zero-downtime rolling deployments.
