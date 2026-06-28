---
title: Idea Definition
slug: idea-definition
phase: Phase 0
mode: personal
projectType: web app
estimatedTime: 20–30 min
---

# Idea Definition

The most expensive mistake in a personal project happens before you write a single line of code: building the wrong thing, or building the right thing too broadly.

This module helps you define your idea with enough precision that every future decision — tech stack, features, architecture — has something real to anchor to.

---

## Why This Step Gets Skipped

Most developers jump straight to code because it feels like progress. Defining an idea feels like admin. It isn't.

A vague idea produces a vague product. A vague product is impossible to scope, impossible to design, and impossible to know when it's done.

> **⚠️ Warning**
> "I want to build something like X but better" is not an idea. It's a direction. You need a destination.

---

## The Four Questions

Answer these four questions before moving forward. Everything in the curriculum from here depends on having real answers.

---

### Question 1: What does it do?

Describe your app in one sentence. No jargon. No buzzwords. Subject, verb, object.

**Formula:** `[App name] lets [type of user] [do specific thing].`

| Weak | Strong |
|---|---|
| "A platform that connects people through shared experiences." | "Trailmate lets solo hikers find and join group hikes near them." |
| "An AI-powered productivity solution." | "Stackr lets developers track which tools they're paying for and what each one actually costs." |
| "A social app for the modern age." | "Shelf lets readers log books they've finished and see what their friends are reading." |

Write your one sentence now. If you can't, your idea isn't defined yet.

---

### Question 2: Who is it for?

Name one specific type of person. Not "everyone." Not "developers." One person with a specific context.

The more specific you are, the better your product decisions will be.

**Examples:**
- "Freelance designers who invoice in multiple currencies"
- "CS students building their first portfolio projects"
- "People who meal prep on Sundays and forget what's in their fridge by Thursday"

This person is your mental model for every feature decision. When you're unsure whether to build something, ask: does this specific person need this?

---

### Question 3: What problem does it solve?

Describe the pain this person has *right now* — before your app exists.

A real problem has a real workaround. What do people currently do instead?

```
Problem: [person] struggles with [specific pain].
Current workaround: They use [existing solution], but it [specific limitation].
```

**Example:**
```
Problem: Freelance designers lose track of outstanding invoices across multiple clients.
Current workaround: They use a spreadsheet, but it doesn't send reminders or track when a PDF was opened.
```

If there's no current workaround, there might not be a real problem. People with real problems find ways to deal with them, however imperfectly.

---

### Question 4: Why will you finish this?

Personal projects die when motivation runs out. Motivation lasts longer when it's connected to something real.

Pick the honest reason:

- [ ] I have this problem myself and it genuinely frustrates me
- [ ] I want to learn a specific technology and this is a real use case for it
- [ ] I'm building this for someone specific who has asked for it
- [ ] I want a portfolio piece that demonstrates a specific skill
- [ ] I want to ship something and see if people use it

There's no wrong answer. But know your answer — because when the project gets hard (it will), this is what you come back to.

---

## Sharpening With AI

Once you have rough answers to the four questions, use this prompt to pressure-test them:

**Copy Prompt**

```
I'm defining a personal web app project. Here's what I have so far:

What it does: [your one sentence]
Who it's for: [your specific user]
Problem it solves: [your problem statement]

Play the role of a skeptical product manager. Ask me the 5 questions that would expose the weakest assumptions in this idea.

Don't validate me. Challenge the parts that are vague, assumed, or likely wrong.
```

Read the questions. Answer them honestly — even if only to yourself. If a question exposes something you can't answer, that's the thing to resolve before moving forward.

---

## Idea Anti-Patterns

These are the idea shapes that tend to produce unfinishable personal projects:

> **⚠️ Anti-Pattern: The Clone**
> "Like Twitter but for X" or "Like Airbnb but for Y." Clones are hard to scope and hard to motivate. You're building someone else's vision. The only exception: if you're building a clone explicitly to learn a technology, and you know that going in.

> **⚠️ Anti-Pattern: The Everything App**
> An app that does task management *and* habit tracking *and* journaling *and* goal setting. Pick one. You can add the others after you've shipped the first.

> **⚠️ Anti-Pattern: The Solution Looking for a Problem**
> "I want to use [technology] so I'll build something with it." This produces demos, not products. Start from the problem, not the tech.

> **⚠️ Anti-Pattern: The Already-Solved Problem**
> Your idea exists, works well, and is free. Unless your version does something meaningfully different for a specific underserved user, you're building a learning exercise — which is fine, but call it that.

---

## Your Idea Definition Document

Fill this in. Keep it somewhere visible. It will anchor every decision that follows.

```
App Name: 
One-sentence description: 
Primary user: 
Problem they have: 
Current workaround: 
Why I'll finish this: 
```

**Copy Prompt — Refine Your Idea**

```
Here is my project idea:

App name: [name]
Description: [one sentence]
User: [specific person]
Problem: [pain point]
Workaround: [what they do today]

Rewrite each field to be more specific and concrete. If any field is vague, tighten it. If any field reveals a hidden assumption, name it.

Return the same fields, rewritten. No explanations.
```

---

## How to Know You're Ready to Move On

You're ready for MVP Features when:

- [ ] You can describe the app in one sentence without using abstract nouns
- [ ] You can name one specific type of person it's for
- [ ] You can describe what that person does today without your app
- [ ] You have a personal, honest reason you'll see this through

If any of these aren't true yet, stay here. Ten minutes of clarity now saves weeks of wasted building later.

---

## What's Next

Move to **MVP Features** — taking your defined idea and deciding the absolute minimum set of features that makes it worth building and shipping.
