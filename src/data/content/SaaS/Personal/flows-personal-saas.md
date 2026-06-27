# Flows

 **Estimated Time:** 20 Minutes

---

A flow is the path a user takes through your product to accomplish something.

Not a sitemap. Not a wireframe. A sequence of decisions and actions — from the moment a user arrives to the moment they've done what they came to do.

Flows matter because broken flows are invisible until you watch a real person use your product. By then, you've already built the wrong thing. Mapping flows before you build is the cheapest way to find the breaks.

---

## The Three Flows Every SaaS Product Has

You don't need to map every possible path. You need to map these three.

**1. The Onboarding Flow**
From landing on your product for the first time to experiencing value for the first time.

**2. The Core Flow**
The thing your product exists to do. The action your persona performs repeatedly.

**3. The Return Flow**
What a user does when they come back on day 7. Not discovery — habitual use.

If all three flows are clear, smooth, and free of dead ends — you have a usable product.

---

## How to Map a Flow

Use plain text first. Diagrams are useful but optional.

Format:

```
[Trigger] → [Action] → [Decision or Result] → [Next action]
```

Every step should answer: what does the user see, what can they do, and what happens next?

---

## The Onboarding Flow

This is the flow most solo builders underinvest in — and the one most responsible for early churn.

A user who signs up and doesn't experience value in the first session is almost certainly gone.

**Map it like this:**

```
User lands on marketing page
  → Clicks sign up
    → Fills in email + password (or OAuth)
      → Email verification? (yes/no — decide now)
        → Lands on dashboard
          → [Empty state — what do they see?]
            → First action prompted
              → Core value experienced
                → User understands what to do next
```

The critical question at every step: **could a user get stuck here?**

Look for:
- Steps with no clear next action
- Empty states with no guidance
- Required setup before any value is visible
- Too many fields or decisions before the user has seen anything useful

> [!WARNING]
>
> The most common onboarding mistake is requiring users to configure everything before they see value.
>
> Show value first. Ask for configuration later.
>
> If your product requires 10 minutes of setup before the user sees anything useful — they will leave. Default to something. Let them customize it later.

---

## The Core Flow

This is the action your persona performs most often. It should be the fastest, most frictionless path in your product.

Map it in full. Then count the steps.

**Example:**

```
User arrives on dashboard
  → Sees active projects list
    → Clicks project
      → Views milestone list
        → Marks milestone complete
          → System prompts: "Send invoice?"
            → User confirms
              → Invoice generated and sent
                → Invoice appears in invoice history
                  → User returns to project view
```

Now ask:

- How many clicks does this take?
- Which steps could be eliminated or combined?
- Where could something go wrong?
- What does the user see if something fails?

Every unnecessary click in the core flow is friction that compounds across every session.

---

## The Return Flow

Most flow documentation stops at onboarding and core. The return flow is where habits form — or don't.

A returning user doesn't need to be onboarded again. They need to:
1. Immediately understand where they are
2. See what's changed since they last visited
3. Get to the core action in as few steps as possible

Map it:

```
User opens app (day 7)
  → Dashboard loads
    → What do they see that's new or needs attention?
      → Can they immediately take the most relevant action?
        → Is there anything pulling their attention away from what matters?
```

If the answer to "what needs their attention?" is "they have to figure it out themselves" — your dashboard has a design problem.

The best dashboards answer one question the moment they load: *"What do you need to do right now?"*

---

## Finding Breaks Before You Build

Read through each flow and look for these five failure patterns:

**Dead ends** — a step where the user has nowhere to go. Common in empty states, error states, and post-action screens.

**Assumed knowledge** — a step where the user has to know something the product hasn't told them. Common in first-use flows where you understand the product and they don't.

**Forced detours** — the user wants to do X but your flow makes them do Y first. Common in products that require setup before use.

**Invisible progress** — the user has completed a step but doesn't know it. Common in multi-step forms and background processes.

**Ambiguous actions** — two buttons that could both be right. Common when "Save" and "Publish" or "Cancel" and "Delete" appear together without clear consequence labels.

Mark every one of these in your flow map before you start building. Fixing a broken flow in a map takes five minutes. Fixing it in code takes a day.

---

## AI Prompt — Map and Stress-Test Your Flows

```prompt
I'm building a personal SaaS product. Help me map and stress-test my user flows.

**Product:** [one sentence]
**Persona:** [paste persona summary]
**Core features:** [paste Core feature list]
**Main surfaces:** [list your screens from the Design module]

Do the following for each of the three flows (Onboarding, Core, Return):

1. Write a step-by-step flow map using this format:
   [User action] → [System response] → [Next decision point]

2. Identify any dead ends — steps where the user has nowhere obvious to go

3. Identify any assumed knowledge — steps where the user needs to understand something the product hasn't communicated

4. Identify any forced detours — where the user has to do something before reaching value

5. Suggest the minimum viable version of each flow — the fewest steps that still deliver a complete experience

Flag every issue you find. I'd rather fix flows on paper than in code.
```


---

## Empty States Are Part of the Flow

Every surface in your product has an empty state — the version a user sees before any data exists.

Most builders treat empty states as an afterthought. They render a blank page or a generic "No items found."

That's a dead end in the onboarding flow.

A good empty state does three things:

1. Tells the user what this surface is for
2. Tells the user what to do to make it not empty
3. Makes the first action easy to take

> **Example**
>
> Bad: *"No projects yet."*
>
> Good: *"You haven't created any projects yet. Projects help you track deliverables and invoices for each client. [Create your first project →]"*

Map your empty states as part of your flow. Every surface needs one.

---

## Flows and AI Implementation

Well-mapped flows make AI implementation dramatically faster.

When you hand a flow to AI with a clear step-by-step map, it can generate the routing logic, state management, and component structure that matches your intended UX. Without the flow, it guesses — and its guesses default to generic patterns that may not match your product.

Paste your flow maps into implementation prompts. The AI will use them.

---

## Flows Checklist

- [ ] Onboarding flow mapped end-to-end — from first landing to first value
- [ ] Core flow mapped — persona's most repeated action, step by step
- [ ] Return flow mapped — what a day-7 user sees and does
- [ ] Dead ends identified and resolved
- [ ] Assumed knowledge identified and resolved
- [ ] Forced detours identified and resolved
- [ ] Empty states defined for every surface
- [ ] Step count reviewed — any unnecessary steps removed
- [ ] AI stress-test run and all flagged issues addressed
- [ ] Flow maps saved somewhere accessible during development

---

## Next

**Tech Stack →** Your product is fully defined. Now make the technical decisions that will shape everything you build.
