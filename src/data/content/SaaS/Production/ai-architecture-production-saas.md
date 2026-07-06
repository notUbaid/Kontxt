---
title: AI Architecture
slug: ai-architecture
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 30-40 min
---

# AI Architecture

Adding "AI" to a SaaS product is easy. Adding it in a way that's reliable, cost-predictable, and actually valuable to your ICP is an architecture problem, not a prompt problem.

This module is not about prompt engineering. It's about the decisions that determine whether your AI feature is a stable part of your product or a source of unbounded cost, unpredictable output, and support tickets: which model to use where, how to handle failure, how to control cost at scale, and how to keep a model upgrade from silently breaking your product.

> This module assumes you've already defined your ICP and know what job the AI feature is actually doing for that customer. If you haven't, AI architecture decisions have nothing to anchor to — go back one module first.

---

## Start With the Job, Not the Model

> **️ Common Mistake**
> Choosing a model first ("we'll use Claude/GPT-4") and then figuring out what to build with it. This inverts the actual decision. Different jobs have completely different architecture requirements — decide the job first.

| Job type | Example | Architecture implication |
|---|---|---|
| **Generation** | Draft an email, summarize a document | Can tolerate latency, needs strong output review/editing UX |
| **Extraction** | Pull structured data from unstructured input | Needs strict schema validation, low tolerance for hallucinated fields |
| **Classification/routing** | Tag a support ticket, route a lead | Needs consistency and speed more than creativity — often a smaller/cheaper model is correct |
| **Conversational** | In-app assistant, chat support | Needs conversation state management, context window budgeting |
| **Agentic (multi-step)** | AI that takes actions across your product | Needs tool-calling architecture, guardrails, and human-in-the-loop checkpoints |

**Write down which job type each AI feature is before choosing a model.** A classification job routed to your most expensive model is burning money for no quality gain; an extraction job routed to a small model that hallucinates fields will quietly corrupt your data.

---

## Decision 1: Where AI Logic Lives

| Approach | When it fits | Risk |
|---|---|---|
| **Client calls the AI provider directly** | Never, for production SaaS | Exposes your API key, no cost control, no ability to change providers |
| **Your backend calls the AI provider** | Standard, correct default | You own latency and cost, but you control everything |
| **Your backend calls a queue/worker for AI jobs** | Long-running or agentic tasks | Adds infra complexity — only take this on when synchronous calls actually block your UX |

**Default architecture for a production SaaS:** client → your API → AI provider, with your API layer owning the prompt, the API key, and response validation. Never let the client hold a provider API key or construct the prompt directly — you lose cost control and any ability to fix a bad output pattern without shipping a client update.

```
┌────────┐   ┌─────────────┐   ┌──────────────┐
│ Client │──│  Your API   │──│ AI Provider  │
│        │──│ (validates, │──│ (Claude/GPT) │
└────────┘   │  logs, caps  │   └──────────────┘
       │   cost)   │
       └──────┬───────┘
          ▼
       ┌──────────┐
       │ Database │  ← log every request: prompt version,
       └──────────┘   tokens used, latency, output
```

---

## Decision 2: Model Selection Strategy

Don't pick one model for the whole product. Match model tier to job tier.

| Tier | Use for | Why |
|---|---|---|
| **Fast/cheap model** | Classification, routing, simple extraction, high-volume background jobs | 10-50x cheaper per call; quality difference is negligible for narrow, well-specified jobs |
| **Mid-tier model** | Most generation and conversational features | Best cost/quality balance for user-facing text generation |
| **Frontier model** | Complex reasoning, agentic multi-step tasks, anything customer-facing where quality directly drives retention | Cost is justified when output quality is the product |

> [!TIP]
> Route by job, not by feature name. A "summarize" feature might need a frontier model for a 50-page legal document but a cheap model for a 3-sentence Slack message. Build your architecture so the model choice is a parameter of the call, not hardcoded per feature.

---

## Handling Non-Determinism

Traditional software is deterministic: same input, same output, every time. AI output varies — and your architecture has to account for that at every layer, not just accept it as "part of AI."

**Required patterns for production reliability:**

- **Schema validation on every structured output.** If you ask for JSON, validate it against a schema before it touches your database. Never trust that "the model usually returns valid JSON."
- **Retry with fallback, not infinite retry.** One retry on failure, then fall back to a safe default (queue for human review, return a clear error) rather than looping.
- **Version your prompts.** Store a prompt version ID alongside every AI-generated record. When you improve a prompt, you need to know which records were generated by which version — especially when debugging a quality complaint from three weeks ago.
- **Timeout and cap every call.** AI calls that hang or run unexpectedly long block your request handlers and inflate cost. Set explicit timeouts and max token limits on every call.

> **️ Common Mistake**
> Parsing model output with string matching or regex instead of requesting structured output (JSON mode / tool calling) and validating against a schema. String-matched output breaks the moment the model phrases something slightly differently — which happens more often than beginners expect, especially across model version upgrades.

---

## Cost Architecture

Uncontrolled AI cost is the most common reason a working AI feature gets ripped out of a SaaS product post-launch. Design cost controls before launch, not after the first surprising invoice.

| Control | Implementation |
|---|---|
| **Per-user/per-org rate limits** | Cap AI calls per billing period, tied to their plan tier |
| **Token budgeting** | Set a max token limit per call type; log actual usage per call |
| **Caching** | Cache identical or near-identical requests (e.g., same document summarized twice) instead of re-calling the model |
| **Cost attribution** | Log cost per user/org, not just in aggregate — you need to know if 2% of users are driving 80% of your AI spend |

> ** Best Practice**
> Build a cost dashboard (even a simple internal one) before launch: cost per user, cost per feature, cost trend over time. You cannot price your product correctly, or notice abuse, if AI cost is invisible until the monthly bill arrives.

---

## Provider Lock-In and Model Upgrades

> **️ Common Mistake**
> Hardcoding prompts and parsing logic tightly around one specific model's quirks. When that provider silently upgrades the model version (which happens without your consent, on their schedule), your carefully-tuned output can shift — and you find out from a user complaint, not a test.

**Architectural mitigations:**
- Abstract the AI call behind a single internal interface (`generateSummary(input)`, not scattered raw provider SDK calls throughout your codebase). Swapping providers or model versions later means changing one place, not hunting through the codebase.
- Pin model versions explicitly where the provider allows it, rather than always pointing at "latest."
- Keep a small suite of real-world test inputs with expected output shapes, and run them whenever you change a prompt or model version — this catches silent regressions before users do.

---

## Human-in-the-Loop, By Design

Not every AI output should go straight to production data or straight to the user. Decide, per feature, where a human checkpoint belongs.

| Confidence in output | Pattern |
|---|---|
| High-stakes, low-frequency (e.g., AI drafts a contract clause) | Always show to user for review before it's used anywhere |
| Medium-stakes, high-frequency (e.g., AI tags/categorizes items) | Auto-apply, but make it easily correctable, and log corrections to improve the prompt over time |
| Low-stakes (e.g., AI suggests a search query) | Auto-apply silently |

Logging user corrections is not optional polish — it's your feedback loop for improving prompts, and it's the clearest signal you'll have that a prompt version has degraded after a model upgrade.

---

## AI Prompts

**1. Architecture review prompt** — use once you've drafted your own AI feature architecture:

```
Review this AI feature architecture for a production SaaS product.

Feature: [describe the AI feature and the job type: generation /
extraction / classification / conversational / agentic]
Current design: [paste your call flow, model choice, and validation
approach]

Check specifically for:
- Where non-deterministic output could silently corrupt data if
  validation is missing
- Whether the model tier matches the actual complexity of the job,
  or is over/under-provisioned
- Cost control gaps: is there a cap, a rate limit, or attribution
  per user?
- What happens on failure — is there a defined fallback, or does
  it just error out?

Be specific about which part of the architecture each issue applies
to. Flag anything that would silently break on a model version
upgrade.
```

**2. Prompt versioning setup prompt** — use when implementing the logging layer:

```
I need a database schema and logging approach for tracking AI-
generated content in a [Postgres/Supabase] backend.

Requirements:
- Every AI-generated record links to: prompt version ID, model
  used, token count, latency, and the raw output
- I need to be able to query "show me all outputs generated by
  prompt version X" for debugging a quality regression
- Keep this lightweight — this is a logging table, not a core
  product table

Propose the schema and the minimal logging code for our API layer
to write to it on every AI call.
```

> [!TIP]
> When asking AI to help design your AI architecture, give it the job type and constraints explicitly (as above), not just "help me add AI to my app." A vague prompt produces a generic chatbot wrapper; a specific one produces an architecture matched to your actual feature.

---

## Validation Checklist

- [ ] Every AI feature has an identified job type (generation / extraction / classification / conversational / agentic)
- [ ] AI provider calls happen only from your backend, never directly from the client
- [ ] Model tier is matched per job — not one model used for everything by default
- [ ] Structured outputs are schema-validated before touching your database
- [ ] Every AI call has an explicit timeout and token cap
- [ ] Prompts are versioned, and generated records are tagged with the version used
- [ ] Per-user/per-org cost is logged and rate-limited, not just tracked in aggregate
- [ ] Provider/model calls are abstracted behind one internal interface, not scattered through the codebase
- [ ] Each feature has a deliberate human-in-the-loop decision (auto-apply vs review-required), not a default

---

## What's Next

With AI architecture decided, the next module moves into **Database Schema Design** — encoding your ICP's data model (multi-tenancy, roles) and your AI logging layer into actual tables.
