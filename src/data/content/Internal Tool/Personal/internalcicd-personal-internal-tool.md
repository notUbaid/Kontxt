---
title: CI/CD
slug: ci-cd
phase: Phase 4
mode: personal
projectType: internal-tool
estimatedTime: 15-25 min
---

# CI/CD

This closes Phase 4. You've secured, monitored, optimized, and protected the data in your tool. CI/CD is about making sure the process of shipping changes doesn't undo any of that — without building deployment infrastructure sized for a team you don't have.

---

## What CI/CD Actually Needs to Mean Here

For a solo internal tool, "CI/CD" isn't a hint to build an elaborate pipeline. It's two much smaller commitments:

- **Continuous Integration:** something checks your code before it ships (tests run, the build succeeds)
- **Continuous Deployment:** shipping a change is a `git push`, not a manual multi-step process you have to remember correctly every time

Most modern hosting platforms (Vercel, Render, Railway) give you the deployment half automatically the moment you connect a git repo. The part worth deliberately setting up is the integration half — the checks that run *before* that deploy happens.

---

## The Minimum Useful Pipeline

```
Push to main
   ↓
Run tests (from the Testing module)
   ↓
Run build
   ↓
If both pass → deploy automatically
If either fails → deploy blocked, you're notified
```

That's a complete, sufficient CI/CD setup for a personal-mode internal tool. You don't need staging environments, canary deploys, or manual approval gates unless this tool has grown real stakes that justify them.

---

## GitHub Actions: The Common, Free Default

For a solo builder already using GitHub, GitHub Actions covers the CI half with no separate service to set up or pay for.

**Minimum workflow:**
- Trigger on push to your main branch (and optionally on pull requests, if you use branches)
- Install dependencies
- Run your test suite (from the Testing module)
- Run your build command
- Fail the workflow if either step fails — this is what actually blocks a bad deploy

---

## AI Prompt: Set Up the Pipeline

```
Set up a GitHub Actions CI workflow for my project.

Stack: [your framework/language]
Test command: [your test command]
Build command: [your build command]

Requirements:
- Trigger on push to main
- Install dependencies, run tests, then run the build
- Fail the workflow clearly if either step fails, with the actual error visible in the log
- Keep this to a single, simple workflow file — I don't need multiple environments or matrix testing for this project
- [If your host doesn't auto-deploy on push] Add the deployment step for [your hosting provider]
```

The instruction against matrix testing/multiple environments matters — those are real, common CI features that solve problems (testing across OS/language versions, staging environments) a solo internal tool doesn't have.

---

## Deciding: Does This Deployment Need a Gate?

Most personal-mode internal tools should deploy automatically on every push to main — that's the whole point of keeping this simple. Consider a manual approval step only if:

- The tool now handles genuinely consequential data or actions (revisit your Security module's threat-modeling answers)
- You've been burned by an automatic deploy that shipped something broken and want a deliberate checkpoint

If neither is true, a manual gate is just friction on a process that was working fine without one.

>  **Tip:** Your test suite from the Testing module is the actual quality gate here — it's what should catch problems before deploy, not a manual approval step that just adds delay without adding real verification.

---

## Validating the Pipeline

-  **Deliberately break something** (a failing test, a build error) and push it — confirm the pipeline actually catches it and blocks/flags the deploy, rather than deploying anyway
-  **Confirm you're notified on failure** — a failed pipeline you don't see is no better than no pipeline
-  **Check the pipeline runs in a reasonable time** — if it's slow enough that you start ignoring it or pushing around it, that defeats the purpose
-  **Confirm secrets used in CI (API keys, database URLs for tests) are stored as encrypted secrets** in your CI provider, never hardcoded in the workflow file itself

> ️ **Warning:** CI workflow files are committed to your repo and often public if your repo is public. Never put actual secret values directly in the workflow YAML — use your CI provider's secrets manager and reference them by name.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Deploying manually and inconsistently instead of via a defined pipeline | Easy to forget a step (running tests, checking the build) under time pressure |
| No CI checks before deploy, relying only on the host's auto-deploy | A broken build or failing tests still ships |
| Building a pipeline with staging environments and approval gates for a solo tool | Adds process overhead disproportionate to the actual risk/team size |
| Hardcoding secrets in the CI workflow file | Exposes credentials, especially in a public repo |
| Ignoring a failing pipeline because "it's probably fine" | Defeats the entire purpose of having the check |

---

## Before You Move On — Checklist

- [ ] Tests and build run automatically on every push, before deploy
- [ ] A deliberately broken push was tested and confirmed to block/flag the deploy
- [ ] I'm actually notified when the pipeline fails, not just able to check manually
- [ ] No secrets are hardcoded in the workflow file — all use the CI provider's secrets manager
- [ ] The pipeline stays simple — no staging environments or approval gates unless the tool's stakes genuinely justify them

---

## What's Next

Phase 4 is complete — your tool is secure, observable, performant, backed up, and ships safely. Phase 5 moves to actually getting it in front of real use, starting with hosting.
