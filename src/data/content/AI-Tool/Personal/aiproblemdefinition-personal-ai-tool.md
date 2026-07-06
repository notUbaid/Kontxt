---
title: Problem Definition
slug: problem-definition
phase: Phase 1
mode: personal
projectType: ai tool
estimatedTime: 10-15 min
---

# Problem Definition

Before any model selection, prompt writing, or code — get specific about what problem you're actually solving. For a personal project, this step has a particular value: it's the difference between a project you'll actually finish and use, and one that quietly stalls because the goal was never concrete enough to know when you were done, or even what "working" meant.

---

## The Core Idea: "I Want to Build Something With AI" Is Not a Problem Statement

It's a starting impulse, and a fine one — but it's not yet a project. The strongest personal AI tools usually start from a real, specific annoyance: something you do manually and wish you didn't, something you forget and wish you were reminded of, something messy you wish were organized automatically. Find that specific annoyance before reaching for a model.

> ** Tip**
> A good test: can you describe a real, recent moment where this problem actually bothered you? "I wanted to build a chatbot" doesn't pass this test. "Last week I spent twenty minutes manually copying receipt totals into a spreadsheet and wished I could just photograph them" does. If you can't recall a real recent moment, the problem might not be concrete enough yet.

---

## Step 1: Apply the "Why AI, Specifically" Test

Same discipline that applies in any AI-tool context: ask explicitly what part of your problem actually requires a model's reasoning or language capability, versus what's just regular logic. This matters for a personal project too — not because you're being judged, but because building unnecessary AI complexity into something you could solve more simply costs you real time and ongoing API expense for no real benefit.

**Decision Card — Good Fit vs. Poor Fit for AI, in a Personal Context**

| Task | AI Fit | Why |
|---|---|---|
| Summarizing your own messy notes into a clean format | Strong fit | Genuinely requires language understanding of varied, unstructured input |
| Answering questions about your own documents/knowledge base | Strong fit | This is a natural RAG use case, covered later in this curriculum |
| Tracking a fixed list of recurring tasks | Poor fit | A simple to-do app does this better — don't reach for AI just because it's available |
| Doing arithmetic or fixed calculations | Poor fit | Use plain code; a model doing math you could compute directly adds latency and cost for no benefit |

---

## Step 2: Write the One-Sentence Version

Same exercise as any project's idea definition, scaled to a personal tool's actual ambition level — this doesn't need to sound impressive, it needs to be true and specific.

**Best Practice Card — The One-Sentence Test**

```
Format: I want [tool] to help me [do what], so I stop having to
        [the current manual/annoying process]

 "I want a tool that reads my grocery receipts and tracks my
   monthly spending by category, so I stop manually entering totals
   into a spreadsheet."

 "An AI assistant for managing my life."
   (No specific input, no specific output, no specific annoyance —
   still a vibe, not a project.)
```

---

## Step 3: Decide How Big This Actually Needs to Be

A personal project benefits from staying small enough to actually finish, especially as a side project competing with the rest of your life for time. Resist scoping in every adjacent feature you can imagine — start with the one core thing that addresses your actual annoyance.

> ** Warning**
> The most common personal-project failure isn't a bad idea — it's scope creep from a reasonable starting idea into something that needs months of work before it's usable at all, at which point motivation often runs out before anything ships. Define the smallest version that would already solve your real, specific annoyance from Step 1, and build that first.

---

## Using AI to Sharpen Your Own Problem Definition

A genuinely useful early step: talk through your rough idea with an AI assistant to find the actual specific problem underneath a vague impulse, before you commit any build time.

**Prompt: Find the Real Problem**

```
I have a rough idea for a personal AI tool: [describe your vague
impulse or general area of interest]

Help me get specific:
1. Ask me 2-3 questions that would help narrow this from a general
   idea into a concrete, recent, real annoyance I've actually
   experienced.
2. Once I answer, help me write a one-sentence problem statement in
   the format: "I want [tool] to help me [what], so I stop having
   to [current annoyance]."
3. Honestly assess whether this specific problem actually needs AI,
   or whether a simpler approach (a regular app, a spreadsheet, a
   script) would solve it just as well — don't assume AI is
   necessary just because that's how I framed the idea.
```

> ** Why this prompt works**
> Asking the model to question you first, rather than immediately proposing a solution, mirrors how a good mentor would actually help you think through a vague idea — narrowing through dialogue rather than guessing at specifics you haven't provided. The explicit instruction to be honest about whether AI is even necessary counters the natural pull toward justifying whatever framing you started with, which matters even more in a personal project where there's no external pressure forcing that honesty otherwise.

**Token efficiency note:** This is a short, exploratory conversation — a few exchanges should get you to a concrete problem statement. Don't over-invest tokens here; the goal is clarity to start building, not an exhaustive analysis of every possible angle on your idea.

---

## Validating Your Problem Before Moving On

- [ ] You can describe a real, recent moment where this problem actually affected you
- [ ] You've identified specifically what part of the solution needs AI, versus what's just regular logic
- [ ] You have a one-sentence problem statement you could say out loud to someone and have them understand it immediately
- [ ] The scope feels small enough that you can imagine actually finishing a first version, not just starting one

---

## What's Next

Move to **AI Suitability** — going one level deeper on confirming AI is genuinely the right approach for your specific problem, before committing to any architecture around it.
