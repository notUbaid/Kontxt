---
title: Backups
slug: backups
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Backups

Every other module in this phase makes your marketplace faster, safer, or more observable. This one is different: it's the module that determines whether a single mistake — a bad migration, an accidental `DELETE` without a `WHERE` clause, a corrupted deploy — is a five-minute fix or a permanent loss of every listing, message, and review your users ever created.

Backups are boring until the one day they're the only thing that matters. Set them up before that day, not after.

---

## What's Actually at Stake

A marketplace's database isn't just your data — it's every user's transaction history, every conversation, every review. Losing it isn't an inconvenience to you; it's a trust-destroying event for anyone who used the product.

> ** Core rule:** if you can't say exactly how you'd restore your database to a working state right now, your backup strategy doesn't exist yet — regardless of whether backups are technically being taken.

---

## Decision: Backup Strategy

> ** Decision Card — Backup Approach**
>
> **Option A: Rely on your hosting provider's automatic backups**
> Zero setup if your database host (Railway, Render, Supabase, Neon, PlanetScale, RDS) offers it — most do, often even on free tiers with shorter retention.
>
> **Option B: Scheduled manual exports** (e.g. a cron job running `pg_dump` to cloud storage)
> More control over retention and storage location, more setup, easy to forget to maintain.
>
> **Option C: No backups, restore from scratch if needed**
> Not actually viable for a marketplace — "restore from scratch" means permanently losing every user's data. Not a real option once you have real users, even in a personal project.
>
> **For Personal Mode: use Option A first.** Check what your hosting provider already offers before building anything custom — it's very likely you already have basic backups running and don't know it. Add Option B only if your provider's retention or backup frequency is insufficient for your comfort.

---

## The Three Numbers That Define Your Backup Strategy

Don't evaluate a backup setup vaguely — pin down these three numbers, because they determine what you actually lose in a real incident:

| Term | Question it answers | Reasonable personal-project target |
|---|---|---|
| **RPO** (Recovery Point Objective) | How much data could you lose? | Under 24 hours — daily backups minimum |
| **RTO** (Recovery Time Objective) | How long until you're back up? | A few hours is acceptable for a personal project |
| **Retention** | How far back can you restore from? | 7-30 days is reasonable; longer if storage cost is trivial |

> ** Validation Checklist**
- [ ] Do you know your actual RPO — i.e., the maximum data loss window — for your current setup? (Check your provider's docs, don't assume)
- [ ] Have you confirmed backup *frequency* matches your tolerance for data loss? (Weekly backups means losing up to a week of orders/messages/reviews in the worst case)
- [ ] Is retention long enough to catch a problem that wasn't noticed immediately? (A corrupted migration discovered three days later needs more than a 24-hour retention window)

---

## The Step Everyone Skips: Testing the Restore

> **️ Warning:** A backup you've never restored from is a backup you don't actually have — you have an unverified file. The single most common backup failure isn't "no backups were taken," it's discovering during a real incident that the backup is corrupted, incomplete, or that you don't actually know the restore procedure.

> ** Validation Checklist**
- [ ] Have you actually run a test restore — not just confirmed a backup file exists?
- [ ] Does the restored database have the data you expect, at the row level, not just "the restore command didn't error"?
- [ ] Is the restore procedure written down somewhere you'd find it during a stressful incident, not just remembered?

Do this once now, while there's no pressure. It's the cheapest insurance available to you in this entire phase.

```bash
# Example: manual backup + restore test with Postgres
pg_dump $DATABASE_URL > backup_test.sql

# Restore to a separate test database, never directly over production
createdb marketplace_restore_test
psql marketplace_restore_test < backup_test.sql

# Verify row counts match expectations
psql marketplace_restore_test -c "SELECT count(*) FROM listings;"
```

---

## Point-in-Time Recovery vs. Snapshot Backups

> ** Core distinction:** a daily snapshot only protects you to yesterday's state. Point-in-time recovery (PITR), offered by most managed Postgres providers, lets you restore to *any specific moment* — critical when the mistake isn't discovered until hours after it happened.

For a marketplace specifically: if a bad migration silently corrupts order records at 2pm and isn't noticed until 6pm, a daily snapshot from midnight loses an entire day of legitimate transactions. PITR lets you restore to 1:59pm instead. Check whether your database provider offers this — many do, even on affordable tiers — and prefer it over snapshot-only backups if available at reasonable cost.

---

## Before Risky Operations: Manual Safety Nets

Automated backups protect against ongoing disaster. They don't replace a manual snapshot before you do something deliberately risky.

> ** Validation Checklist — Take a manual backup before:**
- [ ] Running a schema migration in production
- [ ] A bulk data operation (mass status update, data cleanup script)
- [ ] Any operation involving a raw `DELETE` or `UPDATE` without first testing it as a `SELECT`

This single habit — snapshot before anything destructive — prevents the most common cause of real data loss in solo projects: not infrastructure failure, but a developer's own migration or script.

---

## AI Prompt: Set Up and Verify Backups

> ** Copy Prompt**
>
> ```
> Help me set up and verify backups for my marketplace project.
> Database: [YOUR DATABASE — e.g. PostgreSQL on Railway/Supabase/Neon].
>
> Requirements:
> 1. Confirm what automatic backups my hosting provider already offers (frequency,
>    retention, point-in-time recovery availability) — give me the docs/settings to check
> 2. If automatic backups are insufficient, write a backup script (cron job or scheduled
>    task) that exports to [cloud storage — e.g. S3] with a retention policy
> 3. Write a step-by-step restore procedure I can follow during an actual incident,
>    including how to restore to a separate test database first to verify before
>    touching production
> 4. Suggest a simple verification check (row counts, key table existence) to confirm
>    a restore actually worked
> ```
>
> **Why this prompt works:** it asks AI to check what's already available before suggesting new infrastructure, preventing the common mistake of building custom backup scripts when your hosting provider already solved this problem. It also explicitly requires the restore procedure, not just the backup setup — the part most guides skip.

---

## Validating AI Output Here

> ** Common Hallucination:** AI will sometimes generate a backup script confidently without verifying whether your specific hosting provider already handles this automatically — leading to redundant, unmaintained custom infrastructure for a problem that was already solved. Always check your provider's actual dashboard/docs yourself before implementing a custom solution AI suggests.

---

## Token Efficiency Tip

This is a low-frequency module — once your backup and restore procedure is verified and documented, you don't need to revisit it with AI unless your database provider or schema changes significantly. Save the restore procedure as a real document in your project, not just in chat history you'll have to dig up during an actual incident.

---

## What You've Decided

By the end of this module you should have:

- A confirmed understanding of what your hosting provider backs up automatically, and how often
- Known RPO, RTO, and retention numbers for your setup — not assumptions
- At least one verified test restore, confirmed at the data level
- A written restore procedure you could follow under pressure
- A habit of manual snapshots before risky schema or data operations

**Next:** CI/CD — automating testing and deployment so shipping changes doesn't depend on remembering every manual step.
