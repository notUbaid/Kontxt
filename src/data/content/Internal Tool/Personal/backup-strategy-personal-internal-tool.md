---
title: Backup Strategy
slug: backup-strategy
phase: Phase 4
mode: personal
projectType: internal-tool
estimatedTime: 15-20 min
---

# Backup Strategy

Everything so far assumes your data stays intact. This module is about what happens when it doesn't — a bad bulk operation, an accidental hard delete, a corrupted migration. For a personal internal tool, this is one of the highest-consequence, lowest-effort modules in the entire build.

---

## The Question That Matters

Not "do I have backups" — most managed database providers give you *something* by default. The real question:

**"If I lost today's data right now, how much would I actually lose, and how long would recovery take?"**

If you don't know the answer, you don't have a backup strategy — you have an assumption.

---

## What Your Provider Likely Already Gives You

Most managed Postgres providers (Supabase, Neon, Railway) include automatic backups on their free/starter tiers, but the specifics vary meaningfully:

- **Backup frequency** — daily is common, but confirm it for your specific provider/tier
- **Retention window** — how far back you can restore from (often just a few days on free tiers)
- **Restore process** — some providers offer one-click restore, others require more manual steps or a support request

> ️ **Warning:** Never assume backup coverage — verify it directly on your provider's actual dashboard/docs for your specific plan. "Has backups" and "has backups on the free tier at the retention window you need" are frequently different things.

---

## The One Practice That Matters Most: Test the Restore

A backup you've never restored from is a theory, not a safety net. This is the single highest-value action in this entire module.

**Do this once, deliberately:**
1. Note your provider's restore process (dashboard button, CLI command, support ticket)
2. If your provider supports restoring to a *new* database (not overwriting your live one), do a real test restore
3. Confirm the restored data is actually complete and usable
4. Note how long the process took — that's your real recovery time, not an assumed one

>  **Tip:** Do this test restore now, while nothing is actually broken and there's no pressure. The worst time to learn your restore process doesn't work the way you assumed is during an actual data loss.

---

## Beyond the Provider Default: When to Add More

For most personal-mode internal tools, provider-default backups are sufficient. Consider adding more only if a specific answer to these is "yes":

| Question | If yes... |
|---|---|
| Would losing more than a day of data be genuinely costly? | Consider more frequent backups than the default, if your provider allows configuring this |
| Does your provider's retention window (e.g., 7 days) not cover how quickly you'd notice a problem? | A backup rotated out before you'd realize you need it isn't useful — check retention against your realistic detection time |
| Are you storing anything critical outside the database (files in object storage)? | Confirm your storage provider's own backup/versioning, separately from your database backups |

---

## Before Risky Operations: Manual Safety Nets

Automatic backups protect against infrastructure failure. They don't protect you from noticing a bad bulk delete five days later, past your retention window. For specifically risky moments, add your own safety net:

- Before a bulk operation on many records (Bulk Operations module), or a schema migration that alters/drops data, take a manual export or on-demand backup if your provider supports it
- This costs a few minutes and directly covers the highest-risk actions you perform, rather than relying on the retention window catching it in time

> ️ **Warning:** The scenarios most likely to actually cost you data in a personal internal tool aren't infrastructure failures — they're self-inflicted (a bulk delete with the wrong filter, a migration that drops a column with data still in it). A quick manual backup before these specific actions is cheap insurance that automatic backups alone don't fully cover.

---

## AI Prompt: Document Your Backup and Restore Process

```
Help me write a short backup/restore runbook for my internal tool, based on:

Database provider: [your provider]
Backup frequency/retention on my current plan: [what you found on their docs/dashboard]
File storage provider (if applicable): [your provider]

Write a short, practical doc covering:
- How backups currently happen (automatic, frequency, retention)
- The exact steps to restore from a backup, in order
- What to do before a risky operation (bulk delete, migration) as an extra safety net
- What is NOT currently backed up, if anything, so I'm not assuming coverage I don't have
```

This isn't a task for AI to guess at — feed it your actual, verified provider details rather than asking it to describe generic backup practices. The value here is a runbook specific to your real setup.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Assuming backups exist and are sufficient without checking | "Has backups" and "has backups you can actually use" are different claims |
| Never testing a restore | An unverified restore process might not work when you actually need it |
| No extra safety net before risky manual operations | Automatic backup retention windows don't always align with when you'd notice a problem |
| Assuming file storage is backed up the same way as the database | Object storage and database backups are usually separate systems with separate guarantees |
| Treating this as a one-time setup instead of an occasional re-check | Provider plans and retention policies can change |

---

## Before You Move On — Checklist

- [ ] I confirmed my actual backup frequency and retention window directly from my provider's docs/dashboard
- [ ] I performed at least one real test restore and confirmed the data was complete
- [ ] I know my real recovery time, not an assumed one
- [ ] I have a manual backup habit before risky operations (bulk changes, migrations)
- [ ] I've confirmed whether file storage has its own separate backup coverage

---

## What's Next

With data recovery covered, Phase 4 closes with making sure changes to your tool ship safely and consistently — CI/CD.
