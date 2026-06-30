---
title: Backups & Recovery
slug: backups
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Backups & Recovery

If a rogue script updates all product prices to $0.00 at 2 AM, how long will it take you to fix it?

In production e-commerce, backups are not just a daily snapshot that you save to an S3 bucket just in case the server explodes. Backups must provide highly granular **Point-in-Time Recovery (PITR)**. 

Every minute of downtime or data corruption costs the business revenue. Your backup strategy must be designed around how fast you can restore the system to a safe state, not just whether the data exists somewhere.

---

## 1. Point-in-Time Recovery (PITR)

A daily backup at midnight is useless if a data corruption event happens at 4 PM. You would lose 16 hours of customer orders.

**The Implementation:**
You must configure your database (e.g., PostgreSQL on AWS RDS or Supabase) for **Point-in-Time Recovery (PITR)**.
- PITR continuously backs up the Write-Ahead Log (WAL) of the database.
- If a catastrophic mistake happens at `14:32:45`, you can press a button to restore the database to the exact state it was in at `14:32:44`.
- **Constraint:** PITR is expensive in terms of storage. Typically, production databases maintain a 7-day or 14-day PITR window, falling back to standard daily snapshots for older backups.

---

## 2. Infrastructure as Code (IaC)

A database backup only saves the data. It does not save the infrastructure required to run it.

If your primary AWS region (e.g., `us-east-1`) suffers a catastrophic outage, you cannot just manually click around the AWS console to spin up new servers in `us-west-2`. It will take days.

**The Implementation:**
All infrastructure must be defined in code using tools like **Terraform** or **Pulumi**.
- Your Redis clusters, database instances, and serverless edge functions are defined in text files.
- In a disaster scenario, you run `terraform apply -var="region=us-west-2"`, and your entire e-commerce infrastructure is automatically recreated in a new data center within minutes.

---

## 3. The "Soft Delete" Safety Net

The fastest way to recover from a data loss event is to ensure the data was never actually lost.

**The Anti-Pattern:** A merchandising manager clicks "Delete" on a discontinued product. The API runs `DELETE FROM products WHERE id = 1`. The product is gone.

**The Production Standard:** Implement Soft Deletes.
- Add a `deleted_at` timestamp column to every critical table (Products, Users, Orders).
- When a user clicks "Delete," the API runs `UPDATE products SET deleted_at = NOW() WHERE id = 1`.
- The storefront is programmed to automatically append `WHERE deleted_at IS NULL` to all queries, so the product disappears from the UI immediately.
- If it was a mistake, an engineer simply sets `deleted_at = NULL` in the database, restoring it instantly without needing to touch the PITR backups.

---

## 4. Testing the Restore Process

A backup is completely worthless if you have never successfully restored it. 

Engineering teams frequently assume automated backups are working, only to discover during a real crisis that the backup files were corrupted, the encryption keys were lost, or the restore process takes 14 hours.

**The Implementation:**
Run a "Game Day" or "Fire Drill" every quarter.
1. Take a snapshot of the production database.
2. Spin up an isolated Staging environment.
3. Time exactly how long it takes an engineer to restore the snapshot into the Staging environment and get the application running.
4. Document the exact terminal commands used in a Disaster Recovery Runbook.

---

## AI Prompt — Architect Your Disaster Recovery

```prompt
I am defining the Disaster Recovery (DR) and Backup strategy for a production e-commerce store.

Tech Stack:
- Database: [e.g., PostgreSQL on AWS RDS / Supabase]
- Infrastructure: [e.g., Vercel + AWS]
- Data Requirements: [e.g., Zero tolerance for lost orders]

Act as a Principal Site Reliability Engineer:
1. Explain exactly how to configure Point-in-Time Recovery (PITR) for my specific database provider, and define the required retention window based on e-commerce best practices.
2. Write a strict policy for implementing Soft Deletes (`deleted_at`) across my database schema to prevent accidental data destruction by the merchandising team.
3. Outline a step-by-step "Disaster Recovery Runbook" for a scenario where our primary database region goes completely offline.
4. Detail how to automate a quarterly "Fire Drill" to verify that our database snapshots can actually be restored successfully within a 1-hour RTO (Recovery Time Objective).
```

---

## Backups Checklist

- [ ] Point-in-Time Recovery (PITR) enabled on the primary transactional database (minimum 7-day window)
- [ ] Daily automated snapshots configured for long-term retention
- [ ] Soft Delete architecture (`deleted_at`) implemented across all critical database tables
- [ ] Infrastructure as Code (Terraform/Pulumi) utilized to allow rapid redeployment to secondary regions
- [ ] Disaster Recovery Runbook documented with exact terminal commands for restoration
- [ ] Quarterly "Fire Drills" scheduled to prove that backups can be restored under strict time limits
