---
title: Backups
slug: backups
phase: Phase 4
mode: personal
projectType: ecommerce
estimatedTime: 10-15 min
---

# Backups

Everything you've built so far — products, orders, customer accounts, addresses — lives in one database. This module is about making sure a bad migration, an accidental `DELETE`, or a provider outage doesn't erase it.

This is a short module. Backups aren't complicated; they're just easy to skip, and the cost of skipping them only shows up once, at the worst possible time.

---

## Where This Fits

You're not changing any application code here. You're configuring the safety net underneath everything you've already built — database, and any uploaded product images.

---

## Why This Matters for a Store Specifically

A blog losing a week of posts is annoying. A store losing a week of data means:

- Lost order history — you can't fulfil orders you can no longer see
- Lost customer accounts and addresses — real people's data, gone
- Lost product catalog — hours of work re-entering products and descriptions
- Potential compliance exposure — order records are often expected to be retained for tax/accounting purposes, not just convenience

> **⚠️ Warning:** Even a personal, low-traffic store can have real orders and real customer data the moment it goes live. "It's just a personal project" doesn't reduce the cost of losing someone's order or address — treat backups as required, not optional, once real data exists.

---

## What You're Building Today

- Automated, scheduled database backups
- A documented (even if informal) restore process you've actually tested
- Backup coverage for uploaded product images, not just the database
- A clear answer to: "If the database disappeared right now, what would I lose?"

You're **not** building a multi-region, point-in-time-recovery, enterprise disaster-recovery system. That's real infrastructure for real scale. For a personal store, "automated daily backups, retained for a few weeks, that you've verified actually restore" is the right bar.

---

## Choosing Your Approach

| Database Host | Backup Approach | Cost |
|---|---|---|
| **Supabase** | Daily automated backups included; point-in-time recovery on paid tiers | Free tier covers daily backups |
| Railway / Render Postgres | Automated backups on most plans | Often included or low-cost add-on |
| Self-hosted Postgres | `pg_dump` via scheduled job | Free, but you own the reliability |
| Image storage (Supabase Storage, S3, Cloudinary) | Versioning or separate periodic export | Usually free at low volume |

> **💡 Tip:** If your database provider already includes automated backups (most managed Postgres providers do), your job is mostly *verification*, not setup — confirm backups are actually enabled and check when the last one ran. Don't assume "managed" means "already protected."

---

## Implementation

**Copy Prompt:**

```
I'm using [your database provider, e.g. Supabase] for a personal
e-commerce store. Walk me through:

1. Confirming automated backups are enabled and how often they run
2. How to manually trigger a backup and download it
3. The exact steps to restore from a backup into a fresh database,
   so I can actually test this once instead of assuming it works
4. Whether uploaded product images (stored in [your storage provider])
   are covered by this backup, or need a separate export step

I want a real, tested process — not just "backups are on by default."
```

> **✅ Best Practice:** A backup you've never restored from is a guess, not a backup. Once, deliberately, spin up a throwaway database, restore your latest backup into it, and confirm your product and order data actually comes back correctly. This takes 20 minutes and removes all doubt.

---

## What to Actually Back Up

- [ ] Database (products, orders, customers, addresses, all tables)
- [ ] Uploaded product images, if not auto-replicated by your storage provider
- [ ] Environment variables / secrets (store these somewhere safe and separate — not in backups of the database itself)
- [ ] Any code-level configuration not tracked in git (rare, but worth checking once)

You do **not** need to back up your codebase separately — that's already version-controlled in git, which is its own backup.

---

## Common Mistakes

- Assuming a managed database provider backs things up automatically without ever checking the dashboard to confirm
- Backing up the database but forgetting uploaded product images live in separate storage
- Never testing a restore, so the first real attempt happens during an actual emergency
- Treating git as a database backup — your code is versioned, your data is not, and they're backed up completely differently
- Keeping backups only in the same provider/account as the live data — if that account is compromised or suspended, backups go with it

---

## Validation Checklist

- [ ] Automated backups are confirmed enabled, with a known schedule (check the dashboard, don't assume)
- [ ] At least one backup has been manually downloaded or exported successfully
- [ ] A full restore has been tested into a separate, throwaway database — and the data came back correctly
- [ ] Uploaded product images are confirmed to be backed up or replicated separately from the database
- [ ] You know, in one sentence, how much data you could lose in the worst case (e.g., "up to 24 hours, since backups run daily")

---

## AI Review Prompt

```
Review my backup setup for a personal e-commerce store using
[your provider]. Based on what I describe, check:

1. Is the backup frequency reasonable for a store with real customer
   orders (daily, at minimum)?
2. Is there any single point of failure — e.g., backups stored in the
   same account/region as the live data with no separate copy?
3. Am I missing anything commonly forgotten (uploaded images, secrets,
   configuration)?
4. Based on what I've tested, is my restore process actually proven,
   or just assumed to work?
```

---

## What Comes Next

Your data is protected against loss. Next: **CI/CD** — making sure the process of shipping changes to that data and code is reliable and repeatable, not a manual, error-prone deploy each time.
