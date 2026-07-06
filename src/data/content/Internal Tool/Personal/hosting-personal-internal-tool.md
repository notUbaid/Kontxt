---
title: Hosting
slug: hosting
phase: Phase 5
mode: personal
projectType: internal-tool
estimatedTime: 15-25 min
---

# Hosting

Everything so far has probably been running on a free-tier host already, almost incidentally. This module makes that choice deliberate — confirming it actually fits how this tool will really be used, not just how it was convenient to develop.

---

## The Decision You're Actually Making

Not "which host is best" — for personal-mode internal tools, several are functionally equivalent. The real decision is: **does my current setup match how this tool will actually be accessed once it's "done"?**

Answer these before touching any configuration:

1. **Who accesses this — just you, or a small team?** Determines whether you need multi-user auth considerations beyond what you already built.
2. **From where — your home network, anywhere, a specific office?** Determines whether IP restriction is worth adding.
3. **How often — daily, occasionally, in bursts?** Determines whether a platform that spins down on inactivity (common on free tiers) is a real problem or a non-issue.

---

## Free-Tier Hosting: Where the Real Tradeoffs Are

| Platform type | Good fit when | Watch out for |
|---|---|---|
| Vercel / Netlify (frontend + serverless functions) | Next.js/React-based tools, request-driven workloads | Serverless function timeouts on longer operations (bulk imports, reports) |
| Render / Railway (full backend + DB) | Tools needing a persistent backend process, background jobs | Free tiers often spin down after inactivity — first request after idle can be slow |
| Supabase (DB + auth + storage, paired with any frontend host) | You're already using it for the Database/Auth modules | Free tier project pausing after extended inactivity — check current policy |

> ️ **Warning:** "Spins down after inactivity" is the detail most likely to surprise you after deployment. If this tool is used sporadically (once a week, say), the first request after a dormant period might take several seconds to tens of seconds while the service cold-starts. That's usually acceptable for an internal tool — but confirm it's acceptable *for yours* rather than discovering it live.

---

## Matching Hosting to How You'll Actually Use This

Revisit your Cost Estimation module numbers here — hosting choice and cost estimate are the same decision viewed from two angles.

- **Solo, occasional use:** free tier of nearly any platform is fine; cold starts are a minor inconvenience, not a real cost
- **Small team, daily use:** still likely free-tier-viable, but check if your platform's free tier has hard usage caps (build minutes, function invocations) that daily multi-user use could hit
- **Anything time-sensitive** (an automation that must run on schedule, not just on-demand): confirm your platform's free tier actually supports scheduled/cron functions — some restrict this to paid tiers

---

## Custom Domain: Usually Optional, Sometimes Not

A platform-provided URL (`yourapp.vercel.app`) is fine for a genuinely personal, solo tool. Consider a custom domain/subdomain only if:

- Multiple people need to remember and type the URL regularly
- It needs to look intentional/professional for anyone outside just you (e.g., a small team, a contractor)

If you already own a domain (personal or your business, referenced in earlier context around The Choco Munch, for instance, if relevant to a project), a subdomain costs nothing extra beyond DNS configuration — otherwise, skip this until there's a real reason for it.

---

## AI Prompt: Deployment Configuration Review

```
Review my deployment configuration for [your hosting platform].

Here's my current setup: [describe or paste your config — vercel.json, render.yaml, etc., if you have one]

Check:
- Are environment variables/secrets configured in the platform's dashboard, not committed to the repo?
- If I have scheduled/cron functions (from the Workflow Automation module), does my current tier actually support them?
- If I have longer-running operations (bulk imports, report generation), are they within my platform's function timeout limits?
- Is there anything in my current config that assumes paid-tier features I'm not actually paying for?
```

---

## Validating the Deployment

-  **Do a full cold-start test** — leave the tool untouched for the inactivity window your platform uses, then access it and time the actual delay. Confirm it's acceptable for real use, not just theoretically fine.
-  **Test any scheduled automations post-deployment specifically** — confirm they're actually running on the live deployment, not just locally; scheduled functions are a common thing that "works in dev" but needs separate platform configuration to run in production
-  **Confirm environment variables are set correctly in the platform dashboard** — a deployment that works locally but breaks live, due to a missing production env var, is one of the most common first-deploy issues
-  **Test the longest-running operation you have** (a large import, a heavy report) against your platform's actual timeout limit, not an assumed one

> ️ **Warning:** Scheduled/cron jobs are the single most common thing to work perfectly in local development and silently not run at all once deployed, because they require explicit platform configuration (a cron trigger, a scheduled function definition) that local development doesn't need. Verify this specifically, don't assume it carried over.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Never testing the cold-start experience before relying on the tool | First real use during actual work reveals an unexpected delay |
| Assuming scheduled automations work in production because they worked locally | Cron/scheduled functions usually need explicit platform-level setup |
| Missing environment variables in the production dashboard | The classic "works on my machine" deploy failure |
| Choosing hosting based on what's popular rather than your actual usage pattern | A platform optimized for high-traffic apps may be the wrong shape for sporadic internal-tool use, or vice versa |
| Adding a custom domain before there's a real need for one | Small, unnecessary setup and maintenance overhead |

---

## Before You Move On — Checklist

- [ ] Hosting choice matches how this tool is actually used (frequency, who, from where)
- [ ] I tested the real cold-start delay and confirmed it's acceptable
- [ ] Scheduled automations were specifically verified to run in the live deployment, not just locally
- [ ] All required environment variables are set in the platform's production dashboard
- [ ] Longest-running operations were tested against actual platform timeout limits

---

## What's Next

With the tool properly hosted, the next step is getting your existing data — if you're migrating off a spreadsheet or another system — into it: data migration.
