---
title: AI Architecture (Optional)
slug: ai-architecture
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# AI Architecture (Optional)

This module only applies if AI capability is a feature **inside your product** — not the AI tools you're using to build it. If your SaaS doesn't call an LLM or AI API as part of its own functionality, skip this module entirely; nothing here is required reading otherwise.

If your product does include an AI feature (summarization, generation, chat, classification), these are the architectural decisions that separate a feature that works reliably from one that produces a surprise bill or an embarrassing hallucination in front of a customer.

---

## Decision 1: Where AI Calls Happen

> ⚠️ **Warning**
> **Never call an LLM provider's API directly from the client with your API key embedded.** This is the AI-era equivalent of committing a secret to your repo — anyone can extract the key from client-side code and run up usage on your account. All AI provider calls must go through your backend, where the key stays server-side.

---

## Decision 2: Provider Abstraction

> ✅ **Best Practice**
> Apply the same pattern from Third Party Integrations: wrap your AI provider behind your own interface (`aiService.summarize(text)`), not scattered direct SDK calls. Model capabilities and pricing change frequently — an abstraction layer means swapping models or providers is a contained change, not a rewrite.

---

## Decision 3: Prompt Management

Treat prompts as part of your codebase, not inline magic strings:

- [ ] Prompts live in versioned files, not hardcoded inline in business logic
- [ ] Prompts are parameterized explicitly (clear template variables), not built via ad-hoc string concatenation
- [ ] Changes to a prompt are reviewable, the same as a code change — a prompt edit can change behavior as significantly as a logic change

---

## Decision 4: Cost Control

> **Decision Card — AI Features Need Their Own Rate Limits**
> AI API costs scale with usage in a way most other infrastructure doesn't. Decide, before launch:
> - A per-user or per-workspace usage limit (e.g., N AI requests per day on a given plan tier)
> - Monitoring/alerting on unexpected cost spikes
> - Caching for repeated/identical requests where the output doesn't need to be fresh every time

> ⚠️ **Warning**
> Shipping an AI feature with no usage limit is one of the most common production cost incidents in AI-powered SaaS — a bug causing repeated calls, or simply heavier-than-expected usage, can turn into a large bill before anyone notices. Set a limit before launch, not after the first invoice surprises you.

---

## Decision 5: Validating AI Output

> ⚠️ **Warning**
> Never let AI output directly trigger a sensitive action (a database write, a payment, a permission change) without passing through your normal validation and authorization layers. AI output should be treated like any other untrusted input — validated, never blindly executed.

- [ ] If you expect structured output (JSON), validate it against a schema before using it — don't assume the model always returns well-formed output
- [ ] Have a defined fallback for malformed or unexpected output (retry, fall back to a default, or surface an error) rather than letting it crash or silently corrupt data
- [ ] If user-provided content is included in a prompt that has any ability to take action (not just generate text), be aware of prompt injection — treat embedded instructions in user content as untrusted, the same way you'd treat unsanitized input in a SQL query

---

## Decision 6: Streaming & UX

For any AI feature with response times over a second or two, stream the response rather than waiting for the full output — this is now the expected UX pattern for AI features, and it dramatically improves perceived performance for longer generations.

---

## Decision 7: Provider Downtime

Classify your AI feature the same way you classified other integrations: is it critical-path (blocks a core flow) or best-effort (degrades gracefully)? Most AI features in a SaaS product should be **best-effort** — if the provider is down, the rest of your product should keep working.

---

## Common AI Mistakes to Watch For

- **Suggests calling the AI provider directly from the frontend** — always require the server-side proxy pattern.
- **Hardcodes prompts inline** in business logic instead of as versioned, parameterized templates.
- **No usage limit or cost control** suggested by default — ask explicitly for rate limiting per user/workspace.
- **Trusts structured output without validation** — always require schema validation on parsed AI output before it's used.
- **Treats AI output as inherently safe to act on** — push back if a generated plan has the AI feature directly writing to your database or triggering payments without going through your normal authorization checks.

---

## AI Prompt: Design Your AI Feature Architecture

```
I'm adding an AI feature to a production SaaS: [describe the feature, e.g., "summarize uploaded documents"].

Design the architecture with these constraints:
- AI provider calls happen only server-side, wrapped behind an aiService interface — never exposed to the client
- Prompts are stored as versioned template files, parameterized, not inline strings
- Define a per-user/workspace usage limit appropriate for [your plan tiers, if any]
- If output is structured (JSON), specify the schema and how malformed output is handled
- Classify this feature as critical-path or best-effort, and describe what happens to the user if the AI provider is down
- If user content is included in the prompt, flag any prompt injection risk given what this feature can actually do (read-only generation vs. taking an action)

Show the wrapper interface and where it fits in the domain-based folder structure from Backend Architecture.
```

---

## Validate Before You Move On

- [ ] No AI provider API key is ever exposed to the client
- [ ] AI calls go through one wrapped interface, not scattered SDK calls
- [ ] Prompts are versioned, parameterized files — not inline strings
- [ ] A usage limit exists per user/workspace, with monitoring for cost spikes
- [ ] Structured AI output is validated against a schema before use
- [ ] AI output never directly triggers a sensitive action without passing through normal authorization
- [ ] The feature is classified as critical-path or best-effort, with defined fallback behavior

> 💡 **Tip**
> If this module doesn't apply to your product, skip straight to Cost Estimation — don't force an AI feature into your architecture just because the option exists.

---

**Next:** Cost Estimation — project what this entire architecture will actually cost to run.
