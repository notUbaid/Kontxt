---
title: Feedback
slug: feedback
phase: Phase 5
mode: personal
projectType: mobile app
estimatedTime: 15-20 min
---

# Feedback

You're past launch. A few real people are using your app — maybe friends, maybe strangers who found it organically. This module is about how to actually listen to them in a way that improves your app, without either ignoring feedback entirely or chasing every suggestion that comes your way.

For a personal project, feedback serves a specific purpose: it tells you whether the thing you built for yourself or your own use case is also genuinely useful to someone else, and where it falls short.

---

## The Core Idea: You're the Only User Who Doesn't Count As Feedback

If you built this app to solve your own problem, your own opinion about whether it works is the least useful data point you have — you already know how to use it, you already understand its quirks, and you're motivated to think it's good. Real feedback comes from someone seeing it for the first time, with no context, hitting friction you've stopped noticing.

> [!TIP]
> The most valuable feedback moment is usually watching someone use your app for the first time without explaining anything to them. Wherever they pause, look confused, or tap the wrong thing — that's real signal. Their *verbal* feedback afterward is useful too, but watching in silence catches problems people won't think to mention out loud.

---

## Step 1: Decide What You're Actually Trying to Learn

Personal-project feedback doesn't need a formal research process, but it does benefit from a clear question, because "what do you think?" produces vague, hard-to-act-on answers.

**Decision Card — Better Questions to Ask**

| Vague Question | Better Alternative | Why It's Better |
|---|---|---|
| "What do you think of the app?" | "What's the first thing that confused you?" | Targets a specific, actionable friction point |
| "Do you like it?" | "Would you use this again next week without me asking?" | Tests genuine ongoing value, not politeness |
| "Any feedback?" | "Walk me through what you just did, step by step" | Surfaces the actual mental model they had, which may differ from what you intended |

> [!WARNING]
> Friends and family tend to be politely positive regardless of what they actually think, especially about something you clearly put real effort into. Treat enthusiastic praise from people close to you as a weak signal, and watch their actual behavior (did they open it again the next day, unprompted?) as a much stronger one.

---

## Step 2: Collect Feedback With Minimum Friction

For a personal project, you don't need a dedicated feedback platform. You need a low-effort way for people to tell you things, and a habit of actually writing down what they say before you forget it.

**Best Practice Card — Lightweight Feedback Collection**

```
Good enough options for a personal project:
- A simple in-app "Send Feedback" button that opens an email draft
  or a basic form — doesn't need to be fancy
- Directly asking people you know who use it, in person or over a
  message, with the specific-question approach from Step 1
- A shared note or simple doc where you log anything anyone says,
  the moment they say it — memory is unreliable, write it down
  immediately rather than trying to recall it later

Skip for a personal project: in-app NPS surveys, dedicated feedback
SaaS tools, formal user interview scripts — these add overhead a
small personal app doesn't need yet.
```

---

## Step 3: Separate "They Mentioned It" From "It Matters"

Not all feedback deserves equal weight. A passing comment from one person isn't the same signal as the same complaint from three separate people who don't know each other.

> [!NOTE]
> If only one person ever mentions an issue, it might be specific to them — their device, their use case, a one-off misunderstanding. If multiple, unconnected people independently hit the same friction, that's a real pattern worth fixing, regardless of how minor any single report sounded on its own.

---

## Using AI to Make Sense of Scattered Feedback

Once you've collected a handful of comments over time, AI is useful for finding the actual pattern across messy, informally-collected notes — exactly the kind of unstructured synthesis that's tedious to do by hand but quick for a model to organize.

**Prompt: Find the Real Signal in Scattered Feedback**

```
Here's everything I've collected from people using my app over the
past [timeframe] — informal notes, messages, comments, in no
particular order:

[paste your collected notes/messages]

1. Group these into recurring themes, not individual comments.
2. For each theme, note whether it came from one person or multiple
   independent people — flag single-source items as lower confidence.
3. Distinguish feature requests (a specific solution someone proposed)
   from problems (something that's actually frustrating or confusing)
   — for any feature request, suggest the underlying problem it
   might be solving.
4. Don't tell me what to build. Just organize and surface the patterns.
```

> ** Why this prompt works**
> Asking the model to flag single-source versus multi-source feedback directly applies Step 3's confidence distinction at scale, across notes you've gathered informally over weeks and might not remember clearly enough to weigh yourself. Keeping the model in an organizing role, rather than letting it recommend what to build, preserves the judgment call as yours — appropriate for a personal project where only you know what you actually want this app to become.

**Token efficiency note:** Do this kind of synthesis periodically — say, monthly — rather than after every single piece of feedback. A handful of scattered comments analyzed individually won't reveal a pattern; the value comes from accumulating enough notes that real themes can emerge.

---

## Validating What You've Learned

- [ ] You've distinguished feedback from people who'd be polite regardless from feedback grounded in actual behavior (did they keep using it?)
- [ ] Multi-person patterns are weighted more heavily than single, isolated comments
- [ ] Feature requests have been translated into the underlying problem they're trying to solve, not logged as literal build requests
- [ ] You've actually watched someone use the app at least once, rather than relying entirely on verbal feedback after the fact

---

## What's Next

Move to **Roadmap** — turning the patterns you've surfaced here into an honest, personally-sustainable plan for what you actually want to build next on this project.
