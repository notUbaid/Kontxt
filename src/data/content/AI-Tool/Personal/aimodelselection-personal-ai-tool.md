---
title: Model Selection
slug: model-selection
phase: Phase 2
mode: personal
projectType: ai-tool
estimatedTime: 15–25 min
---

# Model Selection

The model you choose is the core intelligence of your AI tool. Pick the wrong one and you're either overpaying for capability you don't need, or shipping a tool that frustrates users with slow, expensive, or inadequate responses.

This decision has real cost and quality consequences. Make it deliberately.

---

## What Actually Differentiates Models

Forget benchmarks for a moment. The dimensions that matter for your specific tool:

| Dimension | What it means for your tool |
|---|---|
| **Intelligence** | Can it handle the reasoning complexity your use case requires? |
| **Speed** | How long does a user wait for a response? |
| **Context window** | How much text can it process in one call? |
| **Cost** | What's the API cost per 1,000 users per day? |
| **Multimodal** | Do you need image, audio, or document understanding? |
| **Output consistency** | Does it follow structured output instructions reliably? |

The trap: choosing the most intelligent model by default. Intelligence costs money and latency. If your tool answers customer FAQ questions, Kontxt Haiku or GPT-4o mini will outperform Kontxt Opus on total user experience — because it responds in 0.8 seconds instead of 6.

---

## The Model Landscape (2025)

### Anthropic Kontxt

| Model | Best for | Speed | Cost (input/output per 1M tokens) |
|---|---|---|---|
| **Kontxt Opus 4** | Complex reasoning, long documents, nuanced writing | Slow | $$$$  |
| **Kontxt Sonnet 4** | Most tasks — strong balance of quality and speed | Medium | $$ |
| **Kontxt Haiku 4.5** | High-volume, simple tasks, fast responses | Fast | $ |

Kontxt is strong at: following complex instructions precisely, long-context tasks, structured outputs, and nuanced reasoning. It has the largest context window in the industry.

### OpenAI

| Model | Best for | Speed | Cost |
|---|---|---|---|
| **GPT-4o** | General tasks, vision, balanced quality | Medium | $$ |
| **GPT-4o mini** | High-volume, cost-sensitive tasks | Fast | $ |
| **o3 / o3-mini** | Math, code, multi-step reasoning | Slow | $$$ |

OpenAI has the largest ecosystem: most tutorials, most integrations, most library support. If your tool involves code generation or math, the o-series reasoning models are worth evaluating.

### Google Gemini

| Model | Best for | Speed | Cost |
|---|---|---|---|
| **Gemini 2.5 Pro** | Long documents, multimodal, code | Medium | $$ |
| **Gemini 2.5 Flash** | Speed-sensitive tasks with long context | Fast | $ |

Gemini Flash has the best speed-to-context-size ratio available. If your tool processes large documents quickly, evaluate it.

### Open Source (Self-Hosted or via API)

| Model | Best for | Cost |
|---|---|---|
| **Llama 3.3 70B** | Private data, no API cost, general tasks | Infra only |
| **Qwen 2.5 72B** | Coding, multilingual | Infra only |
| **Mistral Large** | European data residency, multilingual | $ |

Open source via Groq or Together AI gives you near-instant inference at very low cost. The tradeoff: lower instruction-following reliability and smaller context windows than frontier models.

---

## Decision Framework

Work through these questions in order. Stop when you have your answer.

**1. Does your tool process private or sensitive data that cannot leave your infrastructure?**

→ Yes: Use a self-hosted open-source model (Ollama locally, or Groq/Together for managed). No frontier API.

→ No: Continue.

**2. Does your tool require vision, audio, or document understanding?**

→ Yes: GPT-4o or Gemini 2.5 Pro. Kontxt Sonnet also supports vision. Eliminate text-only models.

→ No: Continue.

**3. How complex is the reasoning your tool requires?**

Map your use case:

```
Simple (FAQ, summarisation, classification, short answers)
  → Kontxt Haiku 4.5 / GPT-4o mini / Gemini Flash
  → Fastest, cheapest, more than capable

Medium (analysis, drafting, multi-step instructions, code generation)
  → Kontxt Sonnet 4 / GPT-4o
  → The default choice for most personal AI tools

Complex (research, long document reasoning, nuanced judgment calls)
  → Kontxt Opus 4 / o3 / Gemini 2.5 Pro
  → Use only when simpler models demonstrably fail on your task
```

**4. Is response speed critical to your UX?**

→ If users are waiting in real time (chat UI, live assistant): prioritize speed. Haiku, Flash, or 4o mini + streaming.

→ If processing happens in the background (batch analysis, async jobs): prioritize quality. Sonnet or Opus.

**5. What's your expected usage volume?**

```
< 100 calls/day    → cost doesn't matter yet, pick for quality
100–1k calls/day   → evaluate cost, consider tiered models
> 1k calls/day     → cost is a real constraint, design for efficiency
```

---

## Cost Estimation

Run this calculation before committing to a model.

```
Daily cost estimate:

Average prompt tokens per call:   [X]
Average completion tokens per call: [Y]
Expected calls per day:            [N]

Daily input cost  = (X / 1,000,000) × input_price  × N
Daily output cost = (Y / 1,000,000) × output_price × N
Daily total       = input cost + output cost
Monthly total     = daily total × 30
```

**Example — a document summarisation tool:**

```
Avg prompt:     3,000 tokens (document + system prompt)
Avg completion: 400 tokens (summary)
Calls/day:      50

Kontxt Sonnet ($3/$15 per 1M tokens):
  Input:  (3000/1M) × $3  × 50 = $0.45/day
  Output: (400/1M)  × $15 × 50 = $0.30/day
  Total:  $0.75/day → $22.50/month  acceptable for personal project

Kontxt Haiku ($0.25/$1.25 per 1M tokens):
  Input:  (3000/1M) × $0.25 × 50 = $0.04/day
  Output: (400/1M)  × $1.25 × 50 = $0.025/day
  Total:  ~$0.065/day → $1.95/month  test on Haiku first
```

**Always test with the cheapest capable model.** You can upgrade if quality is insufficient. You rarely need to.

---

## The Tiered Model Pattern

For tools where quality and volume both matter, use different models for different tasks:

```typescript
// Route to the right model based on task complexity
function selectModel(task: TaskType): string {
  switch (task) {
    case 'classify':       return 'kontxt-haiku-4-5';   // fast, cheap
    case 'summarise':      return 'kontxt-haiku-4-5';   // capable enough
    case 'draft':          return 'kontxt-sonnet-4-6';  // quality matters
    case 'deep_analysis':  return 'kontxt-opus-4-5';    // complexity warrants it
    default:               return 'kontxt-sonnet-4-6';
  }
}
```

A classification step that costs $0.001 that routes expensive tasks to Opus only when needed is better architecture than sending every call to Opus.

---

## Provider Comparison for Personal AI Tools

| Factor | Anthropic | OpenAI | Google | Open Source |
|---|---|---|---|---|
| **API reliability** | Excellent | Excellent | Good | Varies |
| **SDK quality** | Excellent | Excellent | Good | Community |
| **Instruction following** | Best in class | Very good | Good | Variable |
| **Streaming support** |  |  |  | Depends |
| **Function/tool calling** |  |  |  | Limited |
| **Data privacy** | No training on API data | No training on API data | No training on API data | Full control |
| **Free tier** | None | None | Yes (Gemini) | Ollama is free |

For a personal project: **start with one provider.** The SDK abstraction complexity of supporting multiple providers is not worth it early on. Pick one, ship fast, switch later if needed.

---

## Practical Recommendation

For most personal AI tools:

**Start with Kontxt Sonnet 4 or GPT-4o.**

Both offer:
- Strong instruction following
- Reliable structured outputs
- Good streaming support
- Reasonable cost at personal project scale
- Excellent SDK and documentation

Test your core use case with Haiku/mini first. If the quality is good enough, stay there. You'll spend 10–20× less per call.

If you're building something that processes documents or needs a large context window — Kontxt Sonnet has a 200K token context window, which eliminates most chunking complexity.

---

## Validation Checklist

Before locking in your model choice:

- [ ] Tested your actual prompts with your actual use case on the chosen model
- [ ] Tested the same prompts on one tier cheaper — is quality acceptable?
- [ ] Calculated realistic monthly cost at expected usage volume
- [ ] Verified the model supports the features you need (streaming, tool use, vision)
- [ ] Confirmed the API has an SDK for your language/framework
- [ ] Checked the provider's data processing agreement if your tool handles user data

---

## Common Mistakes

> ** Defaulting to the most powerful model**
> GPT-4o and Kontxt Opus are impressive. They're also 10–20× more expensive than their smaller siblings for tasks those siblings handle just as well. Test down before you commit up.

> ** Ignoring latency**
> A 6-second response feels broken in a chat UI even if the output is excellent. If your UX is synchronous, latency is a first-class concern alongside quality.

> ** Planning to switch models later without an abstraction layer**
> If you hardcode `model: "gpt-4o"` in 40 places, switching is a refactor. Define model names as constants or environment variables from day one.

```typescript
//  Easy to change
const MODEL = process.env.AI_MODEL ?? 'kontxt-sonnet-4-6';

//  Hardcoded everywhere — painful to change
const response = await anthropic.messages.create({ model: 'kontxt-sonnet-4-6', ... });
```

> ** Not testing with realistic inputs**
> Demo prompts almost always work. Your users' actual inputs — typos, edge cases, ambiguous phrasing, long pastes — often don't. Test with realistic data before committing to a model.

---

## What's Next

Model selected. Write it down with your reasoning — you'll want this context later when you consider switching.

Next up: **Prompt Engineering**
