---
title: Hosting & Deployment
slug: hosting-deployment
phase: Phase 3
mode: personal
projectType: web-app
estimatedTime: 20-25 min
---

# Hosting & Deployment

Deployment is where a personal project stops being "code on my laptop" and starts being a real thing you can send to a friend. For a personal project, the right deployment setup is the one that costs you nothing, takes minutes to set up, and never needs you to think about servers again.

This module gets your app live, on a real URL, with automatic deploys on every push — so shipping an update is as easy as `git push`.

---

## The Decision: Where to Host

> **Decision Framework**

| Option | Cost | Setup time | Verdict for a personal project |
|---|---|---|---|
| **Vercel** | Free tier is generous for personal projects | ~5 min, connect GitHub repo |  Use this if you're on Next.js |
| **Netlify** | Free tier, similar to Vercel | ~5 min |  Fine alternative, near-identical tradeoffs |
| **Self-managed VPS (DigitalOcean, etc.)** | $5-10/month minimum | Hours — server setup, SSL, process management |  You're learning ops, not shipping your project |
| **Raw cloud (AWS EC2/ECS)** | Variable, easy to accidentally overspend | Hours to days |  Massive overkill for a personal project |

**For a personal Next.js project: Vercel.** It's built by the same team as the framework, deploys are automatic on every push, and the free tier covers real personal-project traffic without you touching a server or a Dockerfile.

> **️ Common Mistake**
> Reaching for a VPS or raw AWS because "that's what real production apps use." Production apps at companies use that because they have dedicated infra teams and specific scaling needs. Learning server management is a valid goal — but it's a different project from shipping the thing you actually set out to build. Don't let infrastructure become the project.

---

## Getting Live: The Actual Steps

1. **Push your code to GitHub.** Vercel deploys from a Git repo — if your code isn't there yet, this is step zero.
2. **Import the repo in Vercel.** Connect your GitHub account, select the repo, and Vercel auto-detects Next.js and sets sensible defaults.
3. **Add environment variables.** Anything in your local `.env.local` (Supabase URL/keys, API keys) needs to be added in Vercel's project settings — it does not read your local `.env` file.
4. **Deploy.** First deploy takes a couple minutes. You get a live URL immediately (`your-project.vercel.app`).

> **️ Warning**
> A blank page or a 500 error on your first deploy is almost always a missing environment variable, not a code bug. Check the deployment logs in Vercel before you start debugging your code.

---

## Automatic Deploys (Set This Up Once, Forget It Forever)

Once connected, Vercel redeploys automatically on every push to your main branch. This is the entire point of using a platform like this over manual hosting — you get continuous deployment for free, with zero configuration beyond the initial connection.

**Recommended branch setup for a personal project:**

| Branch | Deploys to | Purpose |
|---|---|---|
| `main` | Production URL | What you actually share with people |
| Any other branch / PR | A unique preview URL | Test a change before merging, without touching production |

> [!TIP]
> Preview deployments are the most underused feature by beginners. Push a feature branch, get a real live URL to test on before merging to `main` — this catches "works on my machine" bugs before they hit your actual live site.

---

## Custom Domains

A `.vercel.app` URL is fine to start, but a custom domain makes a personal project feel like a real product — worth the ~$10-15/year if you're planning to actually share it.

1. Buy a domain (Namecheap, Cloudflare, or similar registrar — Vercel itself can also sell you one, usually at a premium).
2. Add it in your Vercel project's Domains settings.
3. Update your DNS records as instructed (Vercel shows you exactly what to add).
4. SSL is automatic — Vercel provisions and renews HTTPS certificates for you. You will never manually touch a certificate.

---

## Environment Variables: Getting This Right

This is the most common source of "it works locally but not deployed" bugs.

| Variable type | Where it goes |
|---|---|
| Public values safe to expose (e.g. `NEXT_PUBLIC_SUPABASE_URL`) | Prefixed `NEXT_PUBLIC_`, safe in client-side code |
| Secret values (API keys, service role keys) | No `NEXT_PUBLIC_` prefix — server-side only, never sent to the browser |

> **️ Common Mistake**
> Prefixing a secret key with `NEXT_PUBLIC_` because "it needs to work in the deployed app." Anything with that prefix gets bundled into client-side JavaScript and is visible to anyone who opens dev tools. If a key should be secret, it stays server-side, unprefixed, used only in API routes or server components.

---

## Database & Backend Considerations

If you're on Supabase, there's nothing to deploy on the backend side — it's already hosted. Your deployment checklist is really just:

- [ ] Supabase project URL and anon key added to Vercel environment variables
- [ ] Row Level Security policies are on (don't rely on "it's just a personal project" as a reason to skip this — see the Database module)
- [ ] Any Supabase Edge Functions are deployed separately via the Supabase CLI, not through Vercel

---

## AI Prompt

Use this if your first deploy fails and the error isn't obvious from the logs:

```
My Next.js app deploys successfully locally but fails on Vercel
with this error:

[paste the exact error from Vercel's deployment logs]

My environment variables set in Vercel: [list the variable names,
not the values]

Help me identify whether this is a missing environment variable,
a build configuration issue, or a code issue that only surfaces in
production mode. Ask me for specific config files only if you
genuinely need them to diagnose this — don't guess.
```

> [!TIP]
> Always paste the actual deployment log error, not a paraphrase of it. "It doesn't work" produces generic troubleshooting; the real error message usually points directly at the cause.

---

## Validation Checklist

- [ ] App is live on a real URL and loads without errors
- [ ] Pushing to `main` triggers an automatic redeploy
- [ ] All required environment variables are set in Vercel, not just locally
- [ ] No secret keys are prefixed `NEXT_PUBLIC_`
- [ ] HTTPS is active (automatic, but confirm the URL shows the lock icon)
- [ ] You've tested the live URL yourself, not just trusted that "it deployed" means it works

---

## What's Next

With your app live and auto-deploying, the next module covers **Monitoring & Analytics** — knowing whether anyone is actually using what you shipped.
