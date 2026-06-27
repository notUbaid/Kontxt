# Backups

**Estimated Time:** 15–20 min

---

You will not think about backups until you need them.

By then it is too late.

A backup you have never tested is not a backup — it is a false sense of security. This module takes 20 minutes and could save your entire product.

---

## What Needs Backing Up

| Asset | Risk without backup | Provider handles it? |
|---|---|---|
| **Database** | All user data gone | Depends on tier |
| **File storage** | Uploaded files gone | Rarely automatic |
| **Environment variables** | Can't redeploy | No — your responsibility |
| **Code** | All logic gone | Git (you already have this) |

Code lives in Git. That's covered. Everything else needs a plan.

---

## Database Backups

### What Your Provider Actually Gives You

Check your tier before assuming anything.

| Provider | Free tier | Paid tier |
|---|---|---|
| **Supabase** | 7-day backups, daily snapshots | Point-in-time recovery (PITR) |
| **Neon** | No automatic backups | PITR on paid plans |
| **PlanetScale** | Daily backups, 2-day retention | Longer retention |
| **Railway** | No automatic backups | Manual only |

> ️ Neon free tier has **no automatic backups**. If you're on Neon free and your database is corrupted or accidentally deleted, it is gone. Set up manual exports.

---

### Manual Database Export

For any provider without automatic backups, run a scheduled export.

```bash
# Export your PostgreSQL database
pg_dump "$DATABASE_URL" \
  --format=custom \
  --no-acl \
  --no-owner \
  --file="backup-$(date +%Y-%m-%d).dump"
```

Upload the dump to your object storage (Cloudflare R2 or S3):

```bash
# Using AWS CLI (works with R2 via --endpoint-url)
aws s3 cp "backup-$(date +%Y-%m-%d).dump" \
  s3://your-backup-bucket/db/ \
  --endpoint-url https://<account>.r2.cloudflarestorage.com
```

Automate this with a cron job or a GitHub Action on a schedule:

```yaml
# .github/workflows/backup.yml
name: Database Backup

on:
  schedule:
    - cron: "0 2 * * *"   # 2am UTC daily

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Install pg_dump
        run: sudo apt-get install -y postgresql-client

      - name: Export database
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          pg_dump "$DATABASE_URL" \
            --format=custom \
            --no-acl \
            --no-owner \
            --file="backup-$(date +%Y-%m-%d).dump"

      - name: Upload to R2
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.R2_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.R2_SECRET_ACCESS_KEY }}
          R2_ENDPOINT: ${{ secrets.R2_ENDPOINT }}
        run: |
          aws s3 cp "backup-$(date +%Y-%m-%d).dump" \
            s3://your-backup-bucket/db/ \
            --endpoint-url "$R2_ENDPOINT"
```

Store secrets in GitHub → Settings → Secrets and variables → Actions.

---

### Restore From a Dump

Knowing how to restore is as important as the backup itself.

```bash
# Restore to a database (destructive — drops existing data)
pg_restore \
  --clean \
  --no-acl \
  --no-owner \
  --dbname="$DATABASE_URL" \
  backup-2024-01-15.dump
```

> **Test this now, in a staging environment, before you need it in production.** A backup you've never restored is unverified. Run a restore drill once before launch.

---

## File Storage Backups

Files in Cloudflare R2, S3, or Supabase Storage are not automatically replicated to a second location.

If your storage bucket is accidentally deleted or corrupted, the files are gone.

### Versioning

Enable versioning on your storage bucket. This keeps previous versions of overwritten or deleted files.

**Cloudflare R2:** Object versioning available in bucket settings.

**AWS S3:** Enable via bucket properties → Versioning.

Versioning is not a full backup — it protects against accidental overwrites, not against bucket deletion.

### Cross-Region Replication

For files you absolutely cannot lose (user-generated documents, exports, receipts):

- Enable replication to a second bucket in a different region/provider
- S3 has built-in replication rules
- For R2: sync to an S3 bucket as a secondary using a scheduled script

For a personal SaaS on a budget: **versioning + periodic export of critical files** is enough to start.

---

## Environment Variables

Your `.env` file is not in Git. If you lose it, you can't redeploy.

**Minimum viable approach:** store a copy in a password manager (1Password, Bitwarden) with a note per environment (development, staging, production).

**Better approach:** use a secrets manager.

| Tool | Free tier | Notes |
|---|---|---|
| **Doppler** | Free for solo devs | Syncs env vars across environments, team-friendly |
| **Infisical** | Open source, free cloud tier | Self-hostable |
| **Vercel Environment Variables** | Built in | Stored in Vercel dashboard, exportable |

If you're on Vercel, your production env vars are stored in the dashboard. Export them periodically.

> Losing your `STRIPE_SECRET_KEY` doesn't mean you lost Stripe — you can generate a new key. But losing `STRIPE_WEBHOOK_SECRET` means your webhooks silently fail until you reconfigure them. Document which keys need reconfiguration vs regeneration.

---

## The Backup Verification Drill

A backup plan with no verification is not a plan.

Before launch, run through this once:

```
1. Take a manual database snapshot
2. Spin up a local or staging database
3. Restore the snapshot to it
4. Verify your app boots against the restored DB
5. Spot-check 3–5 records to confirm data integrity
6. Document the restore time (how long did it take?)
```

Write down the restore time. That number is your RTO — Recovery Time Objective. It tells you how long your app is down if the worst happens.

---

## Retention Policy

Keeping every backup forever costs money and creates liability (old user data you're obligated to delete under GDPR).

Simple retention policy for personal SaaS:

| Backup age | Keep? |
|---|---|
| Last 7 days | Keep all daily backups |
| Last 4 weeks | Keep weekly backups |
| Older | Delete |

Implement cleanup in your GitHub Action:

```bash
# Delete backups older than 30 days from R2/S3
aws s3 ls s3://your-backup-bucket/db/ \
  --endpoint-url "$R2_ENDPOINT" | \
  awk '{print $4}' | \
  while read file; do
    date=$(echo "$file" | grep -oP '\d{4}-\d{2}-\d{2}')
    if [[ $(date -d "$date" +%s) -lt $(date -d "30 days ago" +%s) ]]; then
      aws s3 rm "s3://your-backup-bucket/db/$file" \
        --endpoint-url "$R2_ENDPOINT"
    fi
  done
```

---

## Incident Response: What to Do When Data Is Lost

Write this down before you need it. Panic is not a strategy.

```
1. Stop the bleeding
   → Take the affected service offline if data is actively being lost
   → Revoke compromised credentials immediately

2. Assess the damage
   → What data is affected? Since when?
   → Is this a deletion, corruption, or breach?

3. Restore
   → Identify the most recent clean backup
   → Restore to a clean environment first — verify before pointing production at it

4. Communicate
   → If user data is affected, you have legal obligations to notify (GDPR: 72 hours)
   → Be transparent. Users respect honesty more than silence.

5. Post-mortem
   → What failed? Why?
   → What would have prevented this?
   → Update your backup plan.
```

---

## Backup Checklist

Before moving to deployment:

- [ ] Confirmed what your database provider actually backs up on your tier
- [ ] Manual export script written and tested (if on Neon free or Railway)
- [ ] GitHub Action scheduled for daily exports (if provider lacks PITR)
- [ ] Backup stored in separate location from production (different bucket, different account)
- [ ] Object storage versioning enabled
- [ ] Environment variables stored in password manager or secrets tool
- [ ] Restore drill completed at least once
- [ ] Restore time documented
- [ ] Retention policy defined (delete old backups)
- [ ] Incident response steps written down

---

## What to Build Next

Backups verified and automated. You now know exactly what happens and how long recovery takes if something goes wrong.

Next: **Deployment** — getting your SaaS live on a real domain with the right infrastructure to support real users.
