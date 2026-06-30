---
title: Deployment Checklist
slug: deployment-checklist
phase: Phase 4
mode: hackathon
projectType: api-product
estimatedTime: 15-20 min
---

# Deployment Checklist

Judges score what they can touch. An API that isn't live, isn't documented, and breaks on the first request a judge sends is an API that doesn't exist — no matter how good the code behind it is.

## The Decision You're Actually Making

You're not deciding "is this production-ready." It isn't, and it doesn't need to be. The real decision is: **what's the smallest set of things that, if broken, would visibly fail in front of a judge?** Everything outside that set is time you don't have.

Three failure modes kill almost every hackathon API demo:

1. The API is down when a judge opens the link.
2. The API works, but no one can figure out how to call it.
3. The API works, but the first real request returns garbage — cold start, missing env var, or CORS block.

This checklist exists to eliminate exactly those three.

## Pick a Host in Under 5 Minutes

| Platform | Deploy time | Free tier | Cold starts | Best for |
|---|---|---|---|---|
| Railway | ~2 min | Yes (usage-capped) | Rare | Express/FastAPI, long-running servers |
| Render | ~3-5 min | Yes (spins down when idle) | Yes, on free tier | Same as above, slightly slower wake |
| Fly.io | ~5 min | Yes | Rare if always-on | Apps needing a specific region |
| Vercel | ~1 min | Yes | Yes, per function | Already-serverless route handlers |

> **✅ Best Practice:** If your API is a traditional server (Express, FastAPI, Flask), use Railway or Render. Don't refactor into serverless functions just to use Vercel — that's wasted hours for zero judge-visible benefit.

## Pre-Deploy Checklist

- [ ] All secrets in environment variables — none hardcoded
- [ ] `.env` listed in `.gitignore`
- [ ] CORS configured for your actual frontend origin
- [ ] One `/health` endpoint returning `200 OK`
- [ ] Consistent error response shape across every route (e.g. `{ error: { message, code } }`)
- [ ] No `console.log` of tokens, keys, or full request bodies
- [ ] Basic rate limiting on any expensive route (AI calls, DB writes)
- [ ] API versioned in the URL path (`/v1/...`)

> **💡 Tip:** Versioning costs you one line of router config now. It signals engineering maturity to any judge who actually opens your routes — and it's the kind of detail teams from companies like Stripe or GitHub never skip, even in a prototype.

## Decision: Do You Need Real Auth for the Demo?

| Approach | Setup time | Good enough for demo? |
|---|---|---|
| Full OAuth / JWT sessions | Hours | Overkill — don't build this in a hackathon |
| Single shared API key via header | Minutes | Yes — sufficient for judging |
| No auth at all | 0 min | Only if there's nothing sensitive to protect |

> **⚠️ Warning:** "No auth" is a real tradeoff, not a shortcut you get to hide. State it out loud in your README: *"Auth is intentionally simplified for the hackathon timeline."* Judges respect an explicit tradeoff far more than a silent gap they discover themselves.

## Use AI to Catch What You'd Miss Under Time Pressure

**Prompt — Pre-Deployment Review**
```
Review this router/middleware file for a hackathon API deployment.
Flag only:
1. Hardcoded secrets or credentials
2. Missing input validation that would cause a 500 on bad input
3. Unbounded loops, recursion, or unthrottled external API calls
4. Inconsistent error response shapes across routes
Do not suggest production-grade refactors (auth systems, test suites, 
architecture changes) — this is a time-boxed hackathon deploy.
```

**Prompt — Instant API Reference**
```
Generate a markdown table of every endpoint in this file: method, path, 
required params, and example response. This will serve as the API 
reference for judges — keep it factual, no marketing language.
```

> **💡 Token Efficiency:** Paste only the route and middleware files into these prompts, not the whole repo. A focused 200-line file gets a sharper review than a 3,000-line dump — and costs a fraction of the tokens.

## Validate Before You Walk Away

- [ ] Hit every endpoint from a different network than your laptop (phone hotspot), not just `localhost`
- [ ] Test one request with an empty or malformed payload — confirm it returns a clean error, not a crash
- [ ] If on a free tier with cold starts, time the first request after 5 minutes of inactivity
- [ ] Check the platform's logs, not just your terminal output

> **⚠️ Warning:** "Works on my machine" is not a deployment. The single most common silent demo-killer is CORS configured against `localhost` instead of the real deployed frontend origin.

## Common Hackathon Deployment Mistakes

- Demo depends on an `ngrok` tunnel that expires mid-presentation
- API key committed to a public GitHub repo — judges do check
- No fallback when an external API (OpenAI, Stripe, etc.) rate-limits during the live demo
- One server instance, no restart policy if it crashes mid-pitch

## Demo-Day Safety Net

- [ ] Record a 30-second video of the API working, as a fallback if live network fails
- [ ] Prepare a ready-to-run Postman collection or curl script — don't improvise requests live
- [ ] Know exactly which deployment is your last known-good version, in case you need to roll back fast

## Quick Reference

| Must-have | Nice-to-have | Skip entirely |
|---|---|---|
| Health check endpoint | API versioning beyond v1 | Full OAuth |
| Env vars for secrets | Rate limiting middleware | Test suite |
| Consistent error shape | API key auth | Multi-region deploy |
| CORS for real frontend | Logging dashboard | Load testing |

## What's Next

Your API is live and verified. The next module covers turning that into a pitch judges remember — what to demo first, what to never show live, and how to frame the engineering decisions you made under time pressure.
