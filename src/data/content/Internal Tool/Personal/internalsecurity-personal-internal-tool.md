---
title: Security
slug: security
phase: Phase 4
mode: personal
projectType: internal-tool
estimatedTime: 25-35 min
---

# Security

"It's just an internal tool" is the most common reason internal tools end up with real security problems. Nobody threat-models a tool "only I use" — until it holds real data, gets a second user, or gets exposed to the internet by accident. This module closes the gaps that personal-mode building tends to leave open.

---

## The Personal-Mode Security Trap

You've been optimizing for speed and simplicity across Phase 3 — correctly, for this mode. But several of those shortcuts have a security cost that's easy to forget once the feature "works":

- Auth checks tested for the happy path, not for someone deliberately trying to bypass them
- Admin routes protected by hiding a UI link, not a server-side check (flagged in the Admin Panel module — worth re-verifying here)
- Storage buckets left at default permissions (flagged in File Uploads — same)
- Environment variables and API keys committed to git during fast iteration

This module is a deliberate pass back through what you've built, closing exactly these gaps.

---

## The Checklist: Re-Audit What You Already Built

Go through this in order — each item maps back to a specific earlier module.

### Authentication & Authorization
- [ ] Every route/function that should require login actually checks for it server-side, not just in the frontend
- [ ] Admin-only actions (Admin Panel module) are blocked server-side for non-admin users — test by calling the action directly, not just checking the UI hides the button
- [ ] Role/permission checks happen on every write, not just page load

### Data Access
- [ ] Users can only see/modify data they're supposed to — if this tool has any per-user or per-team scoping, verify one user genuinely cannot fetch another's data by guessing an ID
- [ ] Database queries use parameterized queries everywhere (Search module flagged this specifically) — no string-concatenated SQL anywhere in the codebase

### Secrets
- [ ] No API keys, database credentials, or tokens are committed to git — check your actual git history, not just the current state of files
- [ ] Environment variables are used for all secrets, and `.env` files are in `.gitignore`
- [ ] If a secret was ever committed, even briefly, it's been rotated — removing it from the latest commit doesn't remove it from history

### File Storage
- [ ] Storage buckets (File Uploads module) require authentication to access, not public by default
- [ ] Uploaded file types and sizes are validated server-side, not just in the frontend

### Input Handling
- [ ] Every form and import path validates input server-side (Data Validation module) — frontend validation alone is not security, it's UX
- [ ] User-supplied text rendered back in the UI is properly escaped, not inserted raw (prevents stored XSS if this tool ever has multiple users viewing each other's data)

> ️ **Warning:** The most dangerous item on this list is the git history check for secrets. A key committed once, then "removed" in a later commit, is still recoverable by anyone with repo access unless it's rotated. If you're unsure, rotate it — it's cheap insurance.

---

## Threat Modeling for "Just an Internal Tool"

Even a single-user tool has a realistic threat model — it's just smaller than a public product's. Ask three questions:

1. **What's the worst thing that happens if someone else gets my login?** (Not "if the tool gets attacked" — start with the mundane case of a stolen password or an unlocked laptop.)
2. **What's the worst thing that happens if this tool's URL becomes publicly discoverable?** (Internal tools deployed on platforms like Vercel/Render often get a public URL by default, even if you never share it.)
3. **What's the worst thing that happens if my database credentials leak?** (This determines how much you should care about the secrets checklist above.)

>  **Tip:** If the answer to question 2 is "not much" (the data isn't sensitive, actions aren't destructive), you can reasonably deprioritize some of this. If the answer involves real data — financial, personal, business-sensitive — treat this module with the same seriousness you would for a production tool, regardless of "mode."

---

## AI Prompt: Security Audit Pass

```
Do a security review of this internal tool codebase, focused on:

1. Any route or server function that performs a write or reads sensitive data — confirm it checks authentication/authorization server-side, not just in frontend code
2. Any raw SQL or string-concatenated queries instead of parameterized queries
3. Any hardcoded secrets, API keys, or credentials in the code (not just .env references)
4. Any user-supplied input rendered back in the UI without escaping
5. Any storage/file access that doesn't verify the requesting user is authorized

For each issue found, tell me:
- The specific file and location
- Why it's a risk
- The minimal fix — don't propose a large refactor unless genuinely necessary
```

Run this as a dedicated pass, separate from feature work — mixing "add a feature" and "audit security" in one prompt tends to produce shallower results on both.

---

## Validating the Findings

-  **Don't blindly apply every suggested fix** — some flagged issues may be false positives (e.g., a query that looks unparameterized but is actually using safe ORM methods). Verify before changing working code.
-  **Prioritize by the threat model answers above** — fix what maps to a real, meaningful risk for your tool first, not everything with equal urgency
-  **Re-test the specific bypass** after each fix — for an auth fix, actually attempt the unauthorized action again and confirm it's now blocked, don't just trust the diff looks right
-  **Check nothing broke** — an auth fix that's too strict can lock out legitimate use just as easily as one that's too loose can leak data

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Assuming "internal" means "not a real target" | Deployed tools often get a public URL by default, and stolen credentials don't care about your intended audience |
| Frontend-only validation treated as sufficient security | Anyone can bypass frontend checks by calling the backend directly |
| Leaving committed secrets in git history after removing them from current files | The secret is still recoverable from history unless rotated |
| Default-public storage buckets | Silently exposes files nobody meant to make public |
| Treating security as a one-time pass instead of revisiting as features get added | Every new feature since this audit is a new potential gap |

---

## Before You Move On — Checklist

- [ ] Every admin/protected action was tested by attempting it directly as an unauthorized user, and confirmed blocked
- [ ] Git history was checked for committed secrets; anything found was rotated
- [ ] Storage buckets were explicitly verified as private, not left at default
- [ ] All database queries use parameterization, no raw string-concatenated SQL
- [ ] I answered the three threat-modeling questions honestly for this specific tool
- [ ] Findings from the AI audit were reviewed and verified, not blindly applied

---

## What's Next

With the security gaps closed, the next step is making sure you'd actually know if something went wrong in the first place — observability.
