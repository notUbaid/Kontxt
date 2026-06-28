---
title: Hosting
slug: hosting
phase: Phase 3
mode: hackathon
projectType: web app
estimatedTime: 10-15 min
---

# Hosting

Your app exists locally. Now it needs to exist somewhere a judge can reach — or, more commonly in a live demo setting, somewhere stable enough that you're not gambling your presentation on your own laptop's wifi and battery. This module is short because hosting, done right for a hackathon, should be one of the fastest steps in your whole build.

---

## The Core Idea: Deploy Early, Deploy Often, Never for the First Time the Night Before

The single biggest hosting-related risk in a hackathon isn't picking the wrong platform — it's deploying for the first time right before your demo slot and discovering something that worked locally doesn't work in production. Get a deployed URL live as early as possible, even with an incomplete app, and redeploy continuously as you build.

> **⚠️ Warning**
> "It works on my machine" is not the same claim as "it works on the deployed URL." Environment variables, OAuth redirect URIs (see the Authentication module), and build-time configuration are common sources of local-vs-deployed mismatches. The only way to catch these with enough time to fix them is deploying continuously throughout the build, not once at the end.

---

## Decision Card: Pick the Zero-Config Option

| Platform Type | Recommendation | Reasoning |
|---|---|---|
| Frontend framework (Next.js, Vite, etc.) | Vercel or Netlify | Deploys directly from a git push, zero server config, generous free tier, matches the Tech Stack module's default recommendation |
| Full-stack with integrated backend (Supabase/Firebase) | Same — Vercel/Netlify for frontend, backend platform handles its own hosting automatically | No separate backend server to deploy or manage |
| A standalone custom backend server | Railway, Render, or Fly.io | Still close to zero-config for a simple server; avoid manually configuring your own VM or container orchestration |

If you followed the Tech Stack module's consolidation advice, hosting setup should genuinely take minutes — connect your git repo, set environment variables, deploy. Anything that requires manual server configuration is the wrong choice for the time you have.

---

## Step 1: Deploy as Soon as You Have Anything Running

Don't wait for a complete app. Deploy a barely-functional version the moment your project exists, confirm the deployment pipeline itself works, then keep pushing updates as you build. This catches configuration problems (missing environment variables, wrong build settings) while they're cheap one-line fixes, not late-stage emergencies.

> **💡 Tip**
> Set up auto-deploy on every push to your main branch from the very first commit. This means every team member's merged work is automatically live on the real URL within minutes, and you get continuous confirmation that nothing has silently broken in production.

---

## Step 2: Move Secrets Into Environment Variables Immediately

Any API key, especially for an AI provider, needs to live in your hosting platform's environment variable settings — never hardcoded into code that gets pushed to a shared repo. This isn't optional security theater; an exposed key in a public hackathon repo can get used by someone else, hit a rate limit, or get revoked before your demo.

**Best Practice Card — Environment Variable Hygiene**

```
✅ process.env.OPENAI_API_KEY (or equivalent), set in your hosting
   platform's dashboard, never committed to git

❌ const apiKey = "sk-abc123..." hardcoded directly in a file that
   gets pushed to your repository — especially risky if your repo
   is public, which many hackathon submissions require
```

---

## Step 3: Have a Local Fallback Ready, Just in Case

Despite deploying early and often, venue wifi at hackathons is a real, recurring point of failure — both for your deployed app's connectivity and for your ability to reach it live. Know how to run your app locally as a fallback, and confirm beforehand whether your venue allows presenting from a local instance if the network fails.

> **⚠️ Warning**
> Don't assume venue wifi will support your live demo, especially if your app makes real-time calls to an external AI API during the demo itself. Test your actual demo flow on the venue's network if you can, before your slot — and know your fallback plan (local instance, pre-recorded backup, or cached/seeded results) if the live network lets you down.

---

## Using AI to Resolve Deployment Errors Fast

Deployment errors are usually specific, well-documented, and exactly the kind of error message AI tools handle quickly — much faster than searching forums yourself under time pressure.

**Prompt: Fast Deployment Error Resolution**

```
Deploying [framework] to [platform]. Getting this error during
build/deploy:

[paste the exact error message/log output]

My environment variables are: [list names only, not values]
My build command is: [paste from your config]

What's the most likely cause, and what's the fastest fix? If this
looks like a missing/misconfigured environment variable, tell me
specifically which one and how to verify it's set correctly on
[platform]'s dashboard.
```

> **🔍 Why this prompt works**
> Pasting the exact error message rather than describing it in your own words gives the model the specific detail needed for an accurate diagnosis — vague descriptions of build errors produce vague, unhelpful suggestions. Asking it to bias toward the environment variable explanation first reflects that this is the most common real-world cause of "works locally, fails on deploy," so it's worth checking before exploring more exotic explanations.

**Token efficiency note:** Paste the full, exact error text in one prompt rather than describing the symptom and going back and forth. Most deployment errors resolve in one exchange once the model has the actual error message — there's rarely a need for an extended debugging conversation here.

---

## Validating Your Deployment Before Demo Day

- [ ] The full demo flow has been tested end-to-end on the actual deployed URL, not just locally
- [ ] All secrets are in environment variables, none hardcoded in committed code
- [ ] Auto-deploy on push is working, confirmed by an actual recent successful deploy
- [ ] You have a tested fallback plan if venue wifi fails during your live slot
- [ ] OAuth redirect URIs (if applicable) are configured for the production URL, not just localhost

---

## What's Next

Move to **Demo Data** — making sure your deployed, working app has realistic, compelling content to show the moment a judge looks at it, instead of an empty state.
