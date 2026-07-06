---
title: Backup Strategy
slug: backup-strategy
phase: Phase 4
mode: personal
projectType: api-product
estimatedTime: 15-25 min
---

# Backup Strategy

Everything else in Production Readiness protects against your API breaking. This module protects against something worse: **losing data permanently.** A bad migration, an accidental `DELETE` without a `WHERE` clause, or a compromised credential can destroy in seconds what took months to accumulate. Backups are the only defense that works after everything else has already failed.

---

## The Rule That Makes Backups Real

> **An untested backup is not a backup. It's an unverified assumption.**

The single most common backup failure isn't "we didn't back up" — it's "we backed up, but the backup was corrupted, incomplete, or we didn't actually know how to restore from it when it mattered." This module treats restore testing as mandatory, not optional.

---

## What Needs Backing Up

| Data | Backup approach |
|---|---|
| **Database** | Automated, frequent, provider-managed (see below) |
| **Environment variables / secrets** | Documented securely (password manager, not a plaintext file), not just "in production somewhere" |
| **Uploaded files / object storage** | Depends on provider — most (S3, Cloudflare R2) have built-in versioning/replication options |
| **Redis** | Usually not backed up — treat as ephemeral cache/queue state, not source of truth (see warning below) |

> **Warning — never store data in Redis that you can't afford to lose**
> If you've been using Redis for rate limiting and job queues, that's appropriate — this data is fine to lose and rebuild. If you find yourself storing anything in Redis that would be a real loss (not just an inconvenience) if it vanished, that data belongs in your primary database instead, which actually gets backed up.

---

## Database Backups: Use Your Provider's Built-In System

> **Decision card — Recommended for Personal mode**
> Don't build custom backup scripts. Every serious managed database provider (Supabase, Railway, Render, Neon, RDS) offers automated backups as a built-in feature — enable it and configure retention. Hand-rolled `pg_dump` cron jobs are more infrastructure to maintain and more places for silent failure than using the feature your provider already built and tests.

| Setting | Recommendation for personal scale |
|---|---|
| **Frequency** | Daily, minimum. Point-in-time recovery (continuous) if your provider offers it — check whether it's included in your plan |
| **Retention** | 7–30 days is reasonable for a personal project; longer if you have compliance-relevant data |
| **Storage location** | Provider-managed is fine; some providers support exporting to your own S3/R2 bucket for extra redundancy |

```bash
# Example: verify Supabase automated backups are enabled
# Dashboard → Project Settings → Database → Backups
# Confirm: frequency, retention window, and whether PITR is available on your plan
```

---

## Point-in-Time Recovery (PITR)

Daily backups mean losing up to a day of data if something goes wrong right before the next backup runs. PITR uses a continuous write-ahead log to restore to *any specific moment*, not just the last snapshot — critical for "someone ran a bad query 20 minutes ago" scenarios.

> **Tip — check if PITR is available on your current plan**
> Many providers gate PITR behind a paid tier. If your API is handling anything you'd genuinely regret losing even a few hours of, this is one of the more justifiable upgrade costs at personal-project scale — the alternative is losing everything since the last daily snapshot.

---

## Testing the Restore Process

This is the step almost everyone skips, and the one that actually matters. Do this now, deliberately, before you're relying on it during an actual incident.

```
1. Spin up a separate database instance (most providers let you
   restore a backup into a NEW instance rather than overwriting
   the original — do this, don't practice on production)
2. Restore your most recent backup into it
3. Connect your app to the restored instance locally
4. Verify: can you query real data? Does the schema match? Are
   recent records present, or does the backup lag more than expected?
5. Tear down the test instance
```

> **Warning — the first time you test a restore should not be during an actual incident**
> Restore processes have surprising failure modes: wrong credentials, schema version mismatches, restores that silently omit certain tables, or retention windows that turn out shorter than configured. Discovering any of these during a real data-loss event turns a bad day into a catastrophic one. Do this test once now, and put a recurring reminder to repeat it every few months.

---

## Backing Up Secrets and Configuration

Your database can be perfectly backed up and you can still be unable to recover if you've lost track of the environment variables needed to run the application at all.

> **Decision card**
> Store production secrets in a password manager (1Password, Bitwarden) or your hosting platform's secret management — not only in the platform's dashboard with no other copy. If your only copy of `DATABASE_URL`, `WEBHOOK_SIGNING_SECRET`, and API keys for third-party services lives solely in one platform's UI, losing access to that account means losing the ability to reconstruct your own production environment.

This connects directly to the `.env.example` file from the Documentation module — that file tells you *which* variables you need; a password manager entry should hold the actual values redundantly.

---

## Disaster Recovery: The One-Page Plan

You don't need an elaborate DR document at personal scale, but write down the basics now, while you're calm — not while you're mid-incident.

```markdown
## Disaster Recovery Notes

- Database backups: [provider], automated daily, PITR: [yes/no]
- Restore process: [provider dashboard → Backups → Restore to new instance]
- Last restore test: [date] — confirmed working
- Secrets backup location: [password manager vault name]
- If production database is lost: restore latest backup to new
  instance, update DATABASE_URL, redeploy
- If API keys/secrets are compromised: rotate immediately via
  [provider dashboards], see Security module for API key revocation
```

Five minutes to write, and it turns a panicked incident into a checklist.

---

## AI Prompt: Backup Verification Checklist

```
I'm using [database provider] for a [framework] API in production.

Help me verify my backup configuration is actually sufficient:
1. What backup features does [provider] offer at my current plan
   tier — frequency, retention window, and PITR availability?
2. What's the exact process to restore a backup into a NEW instance
   (not overwriting the original) for testing purposes?
3. What are common gotchas with [provider]'s restore process I
   should check for during a test restore (schema mismatches,
   partial restores, credential changes)?

Don't guess at provider-specific details — if you're not certain,
tell me what to verify directly in their documentation.
```

> **Tip — this is a case for checking real documentation, not trusting a generic answer**
> Backup and restore mechanics are provider-specific and change over time. Ask the AI to point you to what to verify directly in your provider's current docs rather than describing generic Postgres backup behavior that may not match your actual platform.

---

## Validating AI Output

- **Confirm any provider-specific claims against the provider's actual current documentation** — this is exactly the kind of detail that goes stale in a model's training data and needs verification, not blind trust.
- **Never let AI talk you into a hand-rolled backup script as the primary strategy** if a managed provider backup feature is available — added custom infrastructure here is added risk, not added safety.

---

## Common Mistakes

- Assuming backups are enabled by default without checking the actual provider settings.
- Never testing a restore, discovering a problem only during a real incident.
- Storing secrets only in one platform's dashboard with no independent backup.
- Treating Redis as durable storage for anything that isn't safely reproducible.
- No written disaster recovery notes, forcing you to reconstruct the recovery process from memory under pressure.

---

## Validation Checklist

- [ ] Automated database backups are confirmed enabled (not assumed) with a known frequency and retention window
- [ ] PITR is enabled if available on your plan and justified by your data's sensitivity
- [ ] You have performed at least one full restore test into a separate instance and confirmed it worked
- [ ] A recurring reminder exists to repeat the restore test periodically
- [ ] Production secrets are backed up independently in a password manager, not solely in one platform's dashboard
- [ ] A one-page disaster recovery plan exists and is up to date
- [ ] Redis/cache data is treated as disposable, not relied upon as a source of truth

---

## Phase 4 Complete

Your API is now secured, performant, cached, observable, load-tested, deployed through a gated CI/CD pipeline, and protected against data loss. The next phase — **Developer Experience** — turns everything you've built into documentation, SDKs, and tooling that makes developers actually want to integrate with your API.
