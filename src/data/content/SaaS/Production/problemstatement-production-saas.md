---
title: Problem Statement
slug: problem-statement
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 30–45 min
---

# Problem Statement

A problem statement is not a description of your product.

It is a precise, evidence-backed claim that a specific group of people experience a specific problem with specific consequences — and that the problem is worth solving.

Everything downstream references this document. Your PRD, your positioning, your pricing, your architecture decisions — all of them assume the problem is real and understood. If this document is weak, those assumptions crack under pressure.

---

## What a Strong Problem Statement Does

It answers four questions without ambiguity:

```
1   Who has the problem?
2   What exactly is the problem?
3   What are the consequences of the problem going unsolved?
4   Why is the current solution inadequate?
```

A statement that cannot answer all four is incomplete.

---

## The Anatomy of a Problem Statement

**Weak:**
> Freelancers struggle to manage their time and invoicing.

**Strong:**
> Independent designers who bill clients hourly consistently undercharge for their work — not because they set low rates, but because they reconstruct hours from memory at invoice time rather than tracking time during the work. The consequence is a systematic revenue loss of 15–30% per project, compounded by the administrative stress of justifying bills to clients who request breakdowns. Current tools require behaviour change (opening a timer app before starting work) that most designers do not sustain. The problem is structural, not motivational.

The strong version names the who, the exact mechanism of the problem, the quantified consequence, the reason the current approach fails, and it closes with an insight — the last sentence is the kind of thing that only someone who genuinely understands the problem writes.

That last sentence is what separates a problem statement from a problem description.

---

## Writing Your Problem Statement

Work through these four layers in order. Do not skip to the final statement until each layer is solid.

### Layer 1 — The Population

Who has this problem? Be as specific as your current knowledge allows.

Define them by:
- Role or job title
- Context or industry
- Behaviour that puts them in contact with this problem
- What they are trying to accomplish when the problem occurs

Avoid defining your population by what they lack ("people who don't have a good tool"). Define them by who they are and what they do.

### Layer 2 — The Mechanism

What exactly goes wrong, and how?

Not the symptom. The mechanism.

**Symptom:** "Freelancers undercharge."  
**Mechanism:** "Freelancers reconstruct hours from memory at invoice time because no tracking behaviour is sustained during the work."

The mechanism is the causal chain. Describe it step by step if needed:

```
Trigger → Behaviour → Failure point → Consequence
```

Understanding the mechanism is what lets you design a solution that interrupts the failure point — rather than adding a feature that users ignore because it sits outside the actual behaviour pattern.

### Layer 3 — The Consequences

What happens when this problem is not solved?

Consequences fall into categories. Name at least two.

| Category | Examples |
|---|---|
| **Financial** | Lost revenue, overpaying for workarounds, underpriced contracts |
| **Time** | Hours spent on manual work that should be automatic |
| **Emotional** | Stress, frustration, loss of confidence, client relationship damage |
| **Reputational** | Poor deliverable quality, missed deadlines, unprofessional output |
| **Strategic** | Inability to scale, poor data for decisions, compliance risk |

Quantify wherever you can. "15–30% revenue loss" is more credible than "significant revenue loss." If you do not have data yet, mark it as an estimate and prioritise validating it.

### Layer 4 — Why Current Solutions Fail

What do users do today instead? Why does it not work?

This is not about your competitors being bad. It is about the structural reason the existing approach fails this specific user.

Common failure modes:

- **Behaviour change required:** The solution only works if the user changes their existing habits
- **Wrong context:** The solution exists but is not available at the moment the problem occurs
- **Wrong granularity:** The solution is too broad (built for enterprises) or too narrow (solves one edge case)
- **Trust gap:** The solution requires trusting a platform with sensitive data the user will not share
- **Cost mismatch:** The solution is priced for a company, not an individual
- **Complexity overhead:** The tool requires more setup than the problem is worth solving

Name the specific failure mode for your user. Generic criticisms of competitors ("they're too complicated") do not count.

---

## AI Prompt: Problem Statement Draft

Use this once you have worked through all four layers.

```
I am writing a production-quality problem statement for a SaaS product.

Here is my current understanding:

Target user: [your Layer 1]
Mechanism of the problem: [your Layer 2]
Consequences: [your Layer 3]
Why current solutions fail: [your Layer 4]

Write a problem statement that:
1. Opens with a precise description of the user and their context
2. Describes the exact mechanism of the problem — not just the symptom
3. Names the consequences with specificity (quantified where possible)
4. Explains why existing solutions structurally fail this user
5. Closes with a single insight sentence that only someone who deeply understands this problem would write

The tone should be direct and clinical — this is an internal engineering and product document, not marketing copy. No hyperbole, no appeals to emotion, no solution language.

Length: 150–250 words.
```

---

## Validating Your Problem Statement

A problem statement written entirely from assumptions is a hypothesis, not a foundation.

Before treating it as a foundation, pressure-test it.

### Minimum Validation for Production Mode

| Method | What It Validates | Minimum |
|---|---|---|
| User interviews | Is the mechanism accurate? | 5 conversations |
| Observation / session review | Does the behaviour actually occur? | Watch 2–3 users in context |
| Existing community research | Is this discussed publicly? | Reddit, Slack groups, forums |
| Competitor reviews | What do users complain about in alternatives? | G2, Capterra, App Store reviews |
| Your own experience | Do you have lived experience with this problem? | Be honest about this |

You do not need all five. You need enough that the core mechanism is confirmed by someone other than you.

> **The signal you are looking for:** Someone describes your problem mechanism back to you, in their own words, without prompting. That is validation. Someone agreeing that a problem sounds real when you describe it is not.

### What AI Cannot Validate

AI can help you articulate and stress-test a problem statement. It cannot validate it.

Do not use AI-generated personas, AI-simulated interviews, or AI agreement as evidence that the problem is real. These produce confident-sounding output that reflects your assumptions back at you.

Real validation requires real people.

---

## AI Prompt: Problem Statement Review

Use this after you have a draft and some validation signals.

```
Review the following problem statement for a production SaaS product.

[paste your problem statement]

Evaluate it against these criteria:
1. Is the target user defined specifically enough to make product decisions?
2. Does it describe a mechanism, or just a symptom?
3. Are the consequences specific and credible, or vague and assumed?
4. Does the explanation of why current solutions fail name a structural reason, or just say competitors are bad?
5. Is there an insight in this statement that shows genuine understanding of the problem?

Flag any sentence that sounds like marketing copy or solution language.
Flag any claim that appears to be an assumption rather than validated fact.

Rewrite the weakest paragraph.
```

---

## The Problem Statement as a Reference Document

Once validated, this document gets referenced — not rewritten — throughout the rest of your build.

**In your PRD:** "This feature addresses the failure point identified in the problem statement: users do not sustain timer behaviour during work."

**In architecture decisions:** "Because the problem occurs during the work, not after it, the solution must operate passively. This rules out approaches that require explicit user action."

**In positioning:** "Unlike tools that require a behaviour change, we solve the problem without one."

**In investor conversations:** "The mechanism we identified — retrospective reconstruction rather than real-time tracking — is why every existing solution has failed this user segment."

Every time you find yourself relitigating why you are building something, the problem statement should end the conversation.

---

## Checklist: Problem Statement Complete

**Content**
- [ ] Target user is defined by who they are and what they do — not by what they lack
- [ ] The mechanism of the problem is described step by step
- [ ] At least two categories of consequence are named
- [ ] At least one consequence is quantified or estimated with a source
- [ ] The failure mode of current solutions is structural, not just "they're bad"
- [ ] The statement closes with a genuine insight

**Validation**
- [ ] At least one real person has confirmed the mechanism in their own words
- [ ] No validation comes entirely from AI-generated output
- [ ] Assumptions are marked as assumptions, not stated as facts

**Usability**
- [ ] The statement is 150–250 words
- [ ] It contains no solution language or product feature references
- [ ] It could be handed to a new team member and immediately orient them

---

## What Comes Next

The User Pain Points module goes deeper into the emotional and behavioural layer of the problem — the texture that turns a correct problem statement into a product that users feel was built for them.
