---
title: Workflow Automation
slug: workflow-automation
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 25-35 min
---

# Workflow Automation

This is the module where your tool stops being "a database with forms" and starts being an actual internal tool — something that does part of the work for you, not just stores it.

You already designed the workflow engine and approval workflow conceptually in Phase 2. This module implements the automation itself: what happens automatically when something changes.

---

## Start With One Trigger, Not a Framework

The biggest overengineering risk in this module is building a generic "workflow engine" for a personal internal tool that needs 2-3 specific automations. You don't need a rules engine, a DAG executor, or a plugin system.

**You need this pattern, applied directly:**

```
Event happens (a record is created/updated) 
  → Check a condition 
  → Run an action
```

That's it. If you find yourself designing an abstraction to handle automations you haven't actually needed yet, stop — build the automation you need today, generalize later if a second, genuinely different case shows up.

> ️ **Warning:** "Workflow engine" is a term that invites overbuilding. For a personal-mode internal tool, a well-placed `if` statement after a database write is usually the entire solution. Reach for a real job queue or rules engine only once you have automations that need to run on a schedule, retry on failure, or chain across multiple steps.

---

## Where Automation Actually Belongs

| Trigger type | Where it lives | Example |
|---|---|---|
| Something happens on write (create/update) | Directly in your CRUD function, right after the write succeeds | When an Order's status changes to "shipped," send a notification |
| Something happens on a schedule | A cron job / scheduled function | Every morning, flag Orders untouched for 3+ days |
| Something happens based on time passing | A scheduled check, not a live timer | Auto-expire a Draft after 7 days |

For a solo tool, avoid building real-time triggers (webhooks, event buses) unless an external service genuinely requires them. Direct calls after a write are simpler, easier to debug, and sufficient at this scale.

---

## Designing the Automation: Decide Before You Build

For each automation you're implementing, answer these explicitly — this is the part that's easy to skip and expensive to get wrong later:

1. **What exactly triggers it?** ("Status changes to X," not "when something happens with orders")
2. **What's the condition, precisely?** Avoid vague conditions like "if it seems important" — define the actual field/value check
3. **What's the action, and is it reversible?** Sending a notification is low-risk. Auto-deleting a record is not — those need more caution and probably a confirmation step, not silent automation
4. **What happens if the action fails?** Does the triggering write still succeed? Should it?

>  **Tip:** Write these four answers as plain sentences before prompting AI to build anything. "When Order.status changes to shipped, and Order.notify_customer is true, send an email via [service]. If the email fails, log it but don't block the status update" is a spec. "Add notifications for orders" is not.

---

## AI Prompt: Implement an Automation

```
Implement this automation for my internal tool:

Trigger: [exact event — e.g., "Order.status changes to 'shipped'"]
Condition: [exact condition, if any — e.g., "only if Order.notify_customer is true"]
Action: [exact action — e.g., "send an email via Resend using this template"]
Failure behavior: [what happens if the action fails — e.g., "log the failure, don't block the status update that triggered it"]

This should live in: [your CRUD update function / a scheduled job — specify which]

Requirements:
- Keep the triggering write and the automation action decoupled enough that a failure in the action never corrupts or blocks the original write, unless I've explicitly said it should
- Log when the automation runs and its outcome, so I can debug it later without guessing
- Don't build a generic rules engine — implement exactly this automation
```

The last requirement is there deliberately — without it, AI tooling will often propose an abstraction layer you don't need yet.

---

## Validating the Generated Automation

-  **Confirm the failure path was actually implemented**, not just the happy path — kill the notification service in a test and confirm the original write still succeeds (or fails, if that's what you specified)
-  **Check for silent failures** — an automation that fails with no log entry is a bug you won't discover until someone asks "why didn't I get notified"
-  **Confirm the condition is exact**, not approximate — test the boundary case (does it trigger at exactly the threshold, or only after?)
-  **For anything destructive or hard to reverse**, confirm there's a deliberate step (confirmation, delay, log) — not silent, immediate execution
-  **Check it isn't reinventing a queue/engine** — if the generated code introduces new abstractions (a "workflow registry," a "rule definitions" table) for a single automation, that's a sign to simplify

> ️ **Warning:** Automations that silently fail are worse than no automation — they create false confidence that something is happening when it isn't. Logging the outcome, even just to a table or console, is not optional.

---

## Scheduled Automations: A Lighter Pattern

For time-based automations (daily checks, expirations), you don't need a dedicated job queue for personal-mode scale. A single scheduled function, run once a day, that checks conditions and takes action is sufficient:

```
Scheduled job runs → Query records matching the condition → For each, run the action → Log results
```

Keep this as one function per automation, not a generic scheduler that dispatches to different handlers — you can add that abstraction later if you actually accumulate several scheduled automations that share real structure.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Building a generic workflow engine for 1-2 automations | Real complexity added for a problem you don't have yet |
| Vague conditions ("if it looks urgent") | Produces inconsistent, undebuggable behavior |
| No logging of automation outcomes | Failures go unnoticed until someone asks why something didn't happen |
| Letting a failed side-action block the original write | A failed notification shouldn't mean the status update didn't save |
| Automating destructive actions with no safeguard | An automation that deletes or overwrites data needs more care than one that sends a notification |

---

## Before You Move On — Checklist

- [ ] Each automation's trigger, condition, and action are written as an exact spec, not a vague description
- [ ] Automation failures are logged, not silent
- [ ] A failed side-action doesn't corrupt or block the original write, unless deliberately designed to
- [ ] Destructive automations have a safeguard (confirmation, delay, or explicit review)
- [ ] I didn't build a generic engine/framework for automations I don't actually have yet

---

## What's Next

With your tool now taking action on its own, the next step is making sure the right people actually find out when it does — notifications.
