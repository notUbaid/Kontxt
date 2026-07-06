---
title: Backups
slug: backups
phase: Phase 4 Production Readiness
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# Disaster Recovery & Point-In-Time Restoration

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 45 Minutes

A beginner assumes that because their PostgreSQL database is hosted on a managed cloud provider like Supabase or AWS RDS, their data is invincible.

Then, they accidentally run an `UPDATE` SQL query without a `WHERE` clause, instantly overwriting the shipping address of all 50,000 customers to the exact same string. The database didn't fail. The database did exactly what it was told. 

If you do not have a **Point-In-Time Recovery (PITR)** architecture and a cold-storage backup pipeline, your business is dead within minutes.

In Phase 4, you must engineer a mathematical Disaster Recovery strategy.

---

## 1. Point-In-Time Recovery (PITR)

Traditional backups run once a day at 2:00 AM (a "Snapshot"). If you accidentally destroy your database at 1:59 PM, you lose 12 hours of customer orders. You have to email 500 people and ask them to place their orders again.

**The Production Solution:**
You must mathematically guarantee zero data loss by enabling **PITR (Point-In-Time Recovery)**.

PITR works by taking a daily snapshot, but also recording the **WAL (Write-Ahead Log)**. Every single SQL transaction (every `INSERT`, `UPDATE`, `DELETE`) is recorded in the WAL in real-time.

```mermaid
graph LR
    A[Daily Snapshot (2:00 AM)] --> B(Write-Ahead Log)
    B -->|Order 1| C(WAL)
    B -->|Order 2| C(WAL)
    B -->|Fatal UPDATE (1:59 PM)| C(WAL)
    
    D[Disaster Recovery Console] -->|Restore to 1:58 PM| E[New Database Clone]
    Note over E: Replays Snapshot + WAL exactly up to 1:58 PM
```

If you destroy the database at 1:59 PM, you simply go to your Supabase/AWS dashboard and click "Restore to 1:58 PM". The system creates a brand new database, applies the 2:00 AM snapshot, and fast-forwards the WAL transactions exactly up to the minute before your mistake. You lose zero orders.

## 2. Cold Storage Replication (The 3-2-1 Rule)

If AWS goes down, or if a rogue employee deletes your entire AWS account, your PITR backups are deleted along with it.

You must follow the **3-2-1 Backup Rule**:
- **3** Copies of your data.
- **2** Different storage media.
- **1** Copy stored offsite (Air-gapped).

**The Production Solution:**
You must write a background cron job (via Inngest or GitHub Actions) that dumps your PostgreSQL database to a `.sql` file, encrypts it, and uploads it to an entirely different cloud provider (e.g., an Amazon S3 bucket if you use Supabase, or a Google Cloud Storage bucket if you use AWS).

```bash
# The automated pg_dump pipeline (Executed via cron)
export PGPASSWORD="your_secure_password"

# 1. Dump the entire database schema and data
pg_dump -h db.yourhost.com -U admin -d my_ecommerce > backup.sql

# 2. Mathematically encrypt the backup using AES-256 so it cannot be read if the bucket is hacked
gpg --symmetric --cipher-algo AES256 --batch --passphrase "$ENCRYPTION_KEY" backup.sql

# 3. Upload to an Air-Gapped S3 Bucket
aws s3 cp backup.sql.gpg s3://my-cold-storage-vault/backups/$(date +%F).sql.gpg
```

This S3 bucket must have **Object Lock** enabled. Object Lock mathematically prevents anyone (even you, or a hacker with your root credentials) from deleting the backup file for 30 days.

## 3. High Availability (Read Replicas)

If your primary database is in New York, and the New York data center catches fire, your store goes offline.

**The Production Solution:**
You must configure a **Read Replica** in a different region (e.g., San Francisco). The primary database continuously replicates data to the replica. 

If New York fails, your connection pooler (PgBouncer) automatically reroutes all traffic to San Francisco. Your users experience 2 seconds of latency, but the checkout button never breaks.

---

##  Disaster Recovery Engineering Checklist

- [ ] Upgrade your database hosting plan to explicitly enable Point-In-Time Recovery (PITR) with WAL logging.
- [ ] Implement an automated `pg_dump` cron job that pushes encrypted backups to a secondary, air-gapped cloud provider.
- [ ] Enable Object Lock (WORM - Write Once, Read Many) on your backup storage bucket to defeat ransomware.
- [ ] Use the AI prompt below to generate the automated backup scripts.

---

## AI Prompt — Engineer Disaster Recovery

Copy this prompt into your AI to have it generate the mathematical backup pipelines.

````prompt
I am building a headless e-commerce store with Next.js (App Router) and a PostgreSQL database. I need you to act as my Principal Infrastructure Engineer. We are engineering our Disaster Recovery and Cold Storage pipeline.

I need you to generate the following strict architectural implementations:

**1. The Automated pg_dump Cron Job:**
Write a strict `.github/workflows/database-backup.yml` GitHub Action.
- It must trigger on a `schedule` (cron: every day at midnight).
- It must install PostgreSQL client tools.
- Show the exact `pg_dump` command required to dump a database using connection strings stored in GitHub Secrets.
- Show the exact `gpg` command required to encrypt the `.sql` output symmetrically using AES-256.

**2. The Air-Gapped Upload Pipeline:**
Inside that same GitHub Action, write the AWS CLI step required to upload the encrypted `.sql.gpg` file to an S3 bucket. Ensure you pass the flag `--storage-class GLACIER` to save money on cold storage.

**3. The PITR Strategy Document:**
Write a brief Markdown standard operating procedure (SOP) explaining exactly how to utilize Point-In-Time Recovery in Supabase (or AWS RDS) to recover a database that was accidentally corrupted by a bad SQL `UPDATE` statement. Explain why PITR guarantees zero order data loss compared to a standard 24-hour snapshot.
````

**Next: CI/CD Pipeline & Deployment →**
