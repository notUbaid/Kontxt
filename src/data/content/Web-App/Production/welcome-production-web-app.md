---
title: Welcome
slug: welcome
phase: Phase 0
mode: production
projectType: web-app
estimatedTime: 10–15 min
---

# Welcome to Production Mode

You're not here to learn how to build apps. You're here to build software that ships, scales, and survives contact with real users.

Production mode is different from personal or hackathon mode in one fundamental way: **every decision you make now compounds**. A careless architecture choice at Phase 0 becomes a painful migration at Phase 4. A skipped security review becomes a breach at Phase 6. A missing observability layer becomes a 3am incident you can't diagnose.

This curriculum treats you like a professional engineer. It expects you to think before you build.

---

## What This Curriculum Is

A structured path from idea to production-grade software.

Not a tutorial. Not a set of copy-paste templates. A framework for making the decisions that experienced engineers make — deliberately, in the right order, with the right tools.

You'll move through six phases:

| Phase | Focus | What You're Building |
|---|---|---|
| **0 — Discovery & Planning** | Clarity before code | A defensible product definition |
| **1 — UX & Product Design** | User experience first | A complete design system and spec |
| **2 — Core Infrastructure** | Architecture that lasts | Tech stack, system design, CI/CD |
| **3 — Frontend Engineering** | Scalable UI | Components, state, rendering, forms |
| **4 — Backend Engineering** | Reliable APIs | Design, validation, jobs, caching, security |
| **5 — Quality Assurance** | Confidence at scale | Testing, observability, code quality |
| **6 — Launch & Growth** | Ship and sustain | Analytics, SEO, performance, monitoring |

---

## What Production Actually Means

"Production-ready" is not a checklist item. It's a standard.

Production software is:

**Reliable** — it does what it promises, consistently, for users you've never met on devices you don't own.

**Observable** — when something breaks, you know before your users do. You can diagnose the cause without guessing.

**Secure** — it protects user data by default, not as an afterthought. It assumes attackers will probe every surface.

**Maintainable** — a developer who didn't write the code can read it, understand it, and change it safely.

**Scalable** — it degrades gracefully under load rather than catastrophically. It can grow without being rebuilt.

None of this requires a team of fifty engineers. It requires discipline and the right decisions at the right time.

---

## How to Use This Curriculum

**Work in order.** The phases are sequenced deliberately. Skipping design to start coding, or skipping architecture to start on features, are the two most common reasons production projects fail.

**Use AI as a collaborator, not an author.** Every module includes prompts designed to get the best out of AI tools. But AI generates code that fits the context you give it. Your job is to provide that context, review the output, and make the engineering decisions. AI doesn't know your constraints. You do.

**Make decisions explicitly.** Production engineering is 80% decisions and 20% implementation. This curriculum will constantly ask you to choose — and to know why you chose it. Document your decisions. You'll thank yourself in three months.

**Validate before moving on.** Each phase ends with a checklist. Don't treat it as optional. It exists because the most expensive mistakes are the ones you carry forward.

---

## The AI Collaboration Model

Production-mode AI usage is different from vibe-coding a personal project.

| Personal / Hackathon | Production |
|---|---|
| "Build me a login page" | "Here's my auth architecture, session strategy, and security requirements. Generate the implementation." |
| Accept first output | Review output against requirements |
| Fix bugs as they appear | Write tests that catch regressions |
| One conversation | Structured context, reusable prompts |
| Move fast, clean up later | Move deliberately, technical debt is a liability |

AI is exceptionally good at implementation when given precise context. It's unreliable at architecture, security, and edge cases without guidance. This curriculum teaches you to give AI what it needs to produce professional output — and to catch what it gets wrong.

---

## Before You Write a Single Line of Code

Three questions every production project must answer before Phase 1:

**1. What problem does this solve, and for whom specifically?**

Vague answers produce vague products. "People who want to manage their tasks better" is not an answer. "Freelance designers who invoice 5–15 clients per month and lose track of revision requests" is an answer.

**2. What does success look like in 6 months?**

Define it now. Not aspirationally — specifically. User count, revenue, retention rate, uptime target. If you can't define it, you can't build toward it.

**3. What are you not building?**

Scope creep kills production projects. Decide now what is explicitly out of scope for v1. Write it down. Refer to it every time someone (including yourself) suggests a new feature before launch.

---

## What Comes Next

**Idea Definition** — turning a rough concept into a precise product statement that every subsequent decision can be tested against.

The decisions you make in Phase 0 are the foundation everything else is built on. Take them seriously.
