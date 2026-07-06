---
title: Build vs Buy
slug: build-vs-buy
phase: Phase 0
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Build vs Buy

You have a trimmed list of requirements that genuinely seem to need a custom interface. Before you commit to building, ask one more question: does something already exist that solves this well enough?

This isn't about talking you out of building — it's about making sure that when you do build, it's the right call, not just the default one.

---

## Why This Question Is Different in Personal Mode

In a company, "build vs. buy" is usually about cost and vendor risk. Here, it's simpler: your only real cost is your time, and your only real constraint is that this needs to stay maintainable by one person — you.

> **Rule of thumb**
> If an existing tool solves 90% of your requirement and costs nothing or very little, buying (or just using it) is usually the right call — unless building this specific piece is something you want to learn.

---

## The Honest Version of This Decision

There's a version of this question companies ask, and a slightly different version you should ask yourself:

> **Company version**
> "Will building this in-house save money and provide strategic advantage over the long run?"

> **Your version**
> "Am I building this to solve my problem, or to practice engineering — and is that the actual reason, or a story I'm telling myself to avoid admitting a spreadsheet would work?"

Neither answer is wrong. But be honest about which one you're giving.

---

## Check for Existing Solutions First

Before assuming you need to build, spend ten minutes actually looking. For most common personal workflows — invoice tracking, task management, simple CRMs, approval flows — mature free or cheap tools already exist.

- Search for "[your problem] template" or "[your problem] tool free"
- Check if a tool you already use (Notion, Airtable, Google Sheets) can be configured to meet your must-have requirements
- If a paid tool fits perfectly and costs under what an hour of your time is worth, seriously consider it

> **Example**
> "Track overdue invoices" is a solved problem — most existing invoicing tools do this out of the box. If your actual requirement is just this, and nothing more specialized, building custom software here is likely a learning exercise, not a necessity. That's fine — just know that's what it is.

---

## When Building Wins, Even If Something Exists

Existing tools often fail one of these tests for a *personal* internal tool, even when they're otherwise good:

| Reason to build anyway | Why it matters |
|---|---|
| Existing tools solve 90%, but the missing 10% is your actual pain point | A near-fit that misses the one thing you care about isn't a fit |
| Existing tools require account creation, subscriptions, or data you don't want stored elsewhere | Privacy or cost concerns are legitimate for personal data |
| Your explicit goal is learning to build, not just solving the problem | A valid goal — see the note above |
| The workflow is specific enough to you that no general tool fits without heavy workarounds | General tools optimize for the common case, not your case |

> **Decision card**
> If none of these reasons apply and a free or cheap existing tool covers your must-haves, use it — and consider this phase complete without writing code. Coming back to build a custom version later, once you understand the problem even better, is not a failure. It's a legitimate outcome of doing discovery properly.

---

## A Middle Path: Compose, Don't Build From Scratch

Between "buy a finished product" and "build from zero" sits a third option worth considering: wiring together existing building blocks (a form tool, a spreadsheet as a database, a no-code automation) instead of writing custom software. This can satisfy your requirements with far less effort than a full custom app — while still teaching you real architectural thinking about how pieces connect.

---

## Using AI to Research the Landscape

> **Copy this prompt**
> ```
> I'm deciding whether to build custom software or use an existing
> tool for this problem:
>
> [paste your problem definition and must-have requirements]
>
> Help me think this through:
> 1. What categories of existing tools typically solve this kind of
>    problem? (I'll research specific options myself.)
> 2. What's the 10% that existing general-purpose tools in this
>    category commonly miss?
> 3. Is there a "compose from existing pieces" approach that could
>    work here, instead of a fully custom build?
>
> Don't recommend specific paid products — help me think about the
> decision, not shop for me.
> ```

> **Watch out for sunk-cost thinking**
> If you've already decided you want to build this and are only reading this module to confirm that decision, notice that. It's fine to build for the learning value alone — just make sure that's the actual reason, not a rationalization after the fact.

---

## What You Should Have Now

- A quick check of whether an existing tool already solves your must-haves
- A clear, honest reason for building custom — problem fit, privacy, or deliberate learning
- Consideration of whether a "compose from existing pieces" approach fits better than building from scratch
- A final go/no-go: build custom, or close this project here and use something that exists

If you're proceeding to build, the next module — MVP Scope — turns your remaining requirements into the actual boundary of what version 1 will include.
