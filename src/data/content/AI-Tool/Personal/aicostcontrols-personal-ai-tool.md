---
title: Cost Controls
slug: cost-controls
phase: Phase 4
mode: personal
projectType: ai-tool
estimatedTime: 15–25 min
---

# Cost Controls

AI API costs are unlike most other infrastructure costs. They scale with usage in ways that are hard to predict, easy to forget about, and capable of generating significant charges before you notice. A bug that loops requests, a viral mention, or a single user with an unusually long conversation can produce a surprising bill.

For a personal project, the goal is simple: spend intentionally, see what you're spending, and never be caught off guard.

---

## How You're Actually Charged

Understanding the billing model is the prerequisite for controlling it.

Every AI API charges by tokens — the model's unit of text. Roughly 1 token ≈ 4 characters, or about ¾ of a word.

```
Cost = (input tokens × input price) + (output tokens × output price)

Input tokens include:
  → System prompt (sent on every request)
  → Full conversation history (grows with each turn)
  → Any documents or context you inject

Output tokens:
  → The model's response
  → Generally 2–5x more expensive per token than input
```

### Approximate Pricing (verify current rates at your provider)

```
Claude claude-sonnet-4-6:
  Input:  $3.00 per million tokens
  Output: $15.00 per million tokens

Claude Haiku 4.5:
  Input:  $0.80 per million tokens
  Output: $4.00 per million tokens

GPT-4o:
  Input:  $2.50 per million tokens
  Output: $10.00 per million tokens
```

A typical chat message exchange (500 input tokens + 300 output tokens) costs approximately $0.006 on Sonnet. That's cheap per message — but 10,000 messages/month is $60. And that's without long system prompts or document context.

---

## The Hidden Cost Multiplier: Conversation History

This is the most common source of unexpected bills in chat applications.

Every message you send to the API includes the full conversation history. The model has no memory between calls — you reconstruct the context each time.

```
Turn 1: Send 200 tokens of history
Turn 2: Send 400 tokens of history  (Turn 1 + Turn 2)
Turn 3: Send 600 tokens of history  (Turn 1 + Turn 2 + Turn 3)
...
Turn 20: Send 4,000 tokens of history

Total input tokens across 20 turns: 200 + 400 + 600 + ... + 4,000 = 42,000 tokens

Without history growth consideration:
  Estimate: 20 × 200 = 4,000 tokens
  Reality: 42,000 tokens — 10x more expensive
```

Design for this from the start.

---

## Strategy 1 — Model Selection

The fastest cost reduction is using a cheaper model for tasks that don't require the most capable one.

```typescript
function selectModel(taskType: string): string {
  switch (taskType) {
    case "complex_reasoning":
    case "code_generation":
    case "nuanced_analysis":
      return "claude-sonnet-4-6"        // Full capability needed

    case "summarisation":
    case "classification":
    case "simple_qa":
    case "formatting":
      return "claude-haiku-4-5-20251001" // 5x cheaper, fast, capable enough

    default:
      return "claude-haiku-4-5-20251001" // Default to cheaper
  }
}
```

Most personal AI tools default to the most powerful model for everything. For many tasks — summarising, classifying, reformatting, answering simple questions — a smaller model performs identically at a fraction of the cost.

---

## Strategy 2 — Limit Conversation History

Don't send the entire conversation on every turn. Send only what the model needs.

```typescript
// Option A: Hard limit — last N messages only
function trimConversationHistory(
  messages: Message[],
  maxMessages = 10
): Message[] {
  if (messages.length <= maxMessages) return messages

  // Always keep the first message (often sets important context)
  const first = messages[0]
  const recent = messages.slice(-maxMessages + 1)
  return [first, ...recent]
}

// Option B: Token budget — estimate and trim to fit
function trimToTokenBudget(
  messages: Message[],
  maxInputTokens = 4000
): Message[] {
  const estimateTokens = (m: Message) =>
    Math.ceil(
      (typeof m.content === "string" ? m.content : JSON.stringify(m.content)).length / 4
    )

  let total = 0
  const kept: Message[] = []

  // Iterate from most recent, keep until budget exceeded
  for (let i = messages.length - 1; i >= 0; i--) {
    const tokens = estimateTokens(messages[i])
    if (total + tokens > maxInputTokens) break
    kept.unshift(messages[i])
    total += tokens
  }

  return kept
}
```

Test your trimming strategy carefully. Cutting too aggressively causes the model to lose context and give worse responses. The right balance depends on your use case.

---

## Strategy 3 — System Prompt Efficiency

Your system prompt is sent with every single request. Every unnecessary word costs money, compounded by every message ever sent.

```typescript
// Measure your system prompt
const systemPrompt = `Your current system prompt here...`
const tokenEstimate = Math.ceil(systemPrompt.length / 4)
const costPerMessage = (tokenEstimate / 1_000_000) * 3.00  // Sonnet input price
const costPer1000Messages = costPerMessage * 1000

console.log(`System prompt: ~${tokenEstimate} tokens`)
console.log(`Cost per 1,000 messages: $${costPer1000Messages.toFixed(4)}`)
```

### Trim Without Losing Quality

```
Before (verbose):
  "You are an incredibly helpful and knowledgeable AI assistant who specialises
   in helping users understand complex topics. Please always be polite, thorough,
   and make sure to cover all aspects of the question..."

After (efficient):
  "You are a helpful assistant specialising in [DOMAIN].
   Be concise and accurate."

Token reduction: ~60 tokens → ~15 tokens
Cost reduction at 10,000 messages: ~$1.35 saved
```

Small savings per message compound significantly at volume.

---

## Strategy 4 — Output Token Limits

`max_tokens` caps the model's response length. Setting it appropriately prevents runaway long responses on simple questions.

```typescript
function getMaxTokens(taskType: string): number {
  const limits = {
    simple_answer:    256,   // Short factual responses
    chat_response:    512,   // Conversational replies
    explanation:     1024,   // Detailed explanations
    code_generation: 2048,   // Code with comments
    long_analysis:   4096,   // Comprehensive analysis
  }
  return limits[taskType] ?? 1024
}

await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: getMaxTokens("chat_response"),
  messages
})
```

A `max_tokens` of 4096 on a simple yes/no question wastes nothing if the model answers concisely — but it allows the model to ramble. Appropriate limits encourage focus.

---

## Strategy 5 — Caching

Anthropic supports prompt caching — responses to identical inputs can be cached, with cached tokens billed at a significantly reduced rate.

```typescript
// Prompt caching — mark stable content as cacheable
await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: [
    {
      type: "text",
      text: yourLongSystemPrompt,
      cache_control: { type: "ephemeral" }  // Cache this content
    }
  ],
  messages
})
```

Caching is most valuable when:
- Your system prompt is long (>1,000 tokens)
- You inject large documents or knowledge bases
- The same content is sent repeatedly across many requests

Cached input tokens cost approximately 90% less than uncached. For tools with large system prompts or document context, this is a significant saving.

---

## Spend Visibility — Know What You're Spending

### Provider Dashboards

Set spending limits and alerts at the provider level — this is your last line of defence.

```
Anthropic Console:
  → console.anthropic.com → Settings → Billing
  → Set a monthly spend limit
  → Enable email alerts at 80% of budget

OpenAI:
  → platform.openai.com → Settings → Billing
  → Set usage limits
  → Enable notifications
```

**Set these before your first user signs up.** A bug discovered after $500 of unexpected spend is a painful lesson.

### Track Cost Per User in Your Application

```typescript
// Log token usage after each AI call
const response = await anthropic.messages.create({ ... })

const inputTokens = response.usage.input_tokens
const outputTokens = response.usage.output_tokens

// Approximate cost in USD
const cost =
  (inputTokens / 1_000_000) * 3.00 +   // Sonnet input
  (outputTokens / 1_000_000) * 15.00   // Sonnet output

// Store for visibility
await db.aiUsage.create({
  data: {
    userId: session.user.id,
    conversationId,
    inputTokens,
    outputTokens,
    costUsd: cost,
    model: "claude-sonnet-4-6",
    timestamp: new Date()
  }
})

logger.info("ai.usage", {
  userId: session.user.id,
  inputTokens,
  outputTokens,
  costUsd: cost
})
```

With this data you can answer: who are my highest-cost users? Which conversations are unusually expensive? Is cost growing linearly with users or faster?

### Simple Cost Dashboard

```typescript
// Weekly cost summary — run as a cron job or ad-hoc query
const weeklyStats = await db.aiUsage.aggregate({
  where: {
    timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  },
  _sum: {
    inputTokens: true,
    outputTokens: true,
    costUsd: true
  },
  _count: { id: true }
})

console.log({
  messagesThisWeek: weeklyStats._count.id,
  totalCostUsd: weeklyStats._sum.costUsd?.toFixed(4),
  avgCostPerMessage: (
    (weeklyStats._sum.costUsd ?? 0) / (weeklyStats._count.id || 1)
  ).toFixed(6)
})
```

---

## Per-User Limits

For a personal project shared with others, protect yourself from one user consuming disproportionate resources.

```typescript
const DAILY_LIMITS = {
  messages: 50,      // Max messages per user per day
  tokens: 100_000,   // Max tokens per user per day (~$0.30 on Sonnet)
}

async function checkUserBudget(userId: string): Promise<{
  allowed: boolean
  reason?: string
}> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const usage = await db.aiUsage.aggregate({
    where: { userId, timestamp: { gte: today } },
    _count: { id: true },
    _sum: { inputTokens: true, outputTokens: true }
  })

  const messageCount = usage._count.id
  const totalTokens = (usage._sum.inputTokens ?? 0) + (usage._sum.outputTokens ?? 0)

  if (messageCount >= DAILY_LIMITS.messages) {
    return { allowed: false, reason: "Daily message limit reached. Resets at midnight." }
  }

  if (totalTokens >= DAILY_LIMITS.tokens) {
    return { allowed: false, reason: "Daily usage limit reached. Resets at midnight." }
  }

  return { allowed: true }
}
```

---

## The Cost Estimation Worksheet

Before building features, estimate their cost impact.

```
Feature: Document Q&A (user uploads a 10-page PDF)

System prompt:          ~200 tokens
Document content:     ~5,000 tokens  ← injected on every message
Conversation history:   ~500 tokens  (average)
User question:           ~50 tokens

Total input per message: ~5,750 tokens
Output per message:      ~400 tokens

Cost per message (Sonnet):
  Input:  5,750 / 1,000,000 × $3.00 = $0.017
  Output:   400 / 1,000,000 × $15.00 = $0.006
  Total:    $0.023 per message

At 1,000 messages/month: $23
At 10,000 messages/month: $230

Decision: Use prompt caching on the document.
Cached cost: ~$0.003 per message (90% reduction on document tokens)
At 10,000 messages/month with caching: ~$30
```

Do this calculation for every context-heavy feature before you build it.

---

## Cost Controls Checklist

- [ ] Monthly spend limit set in Anthropic / OpenAI console
- [ ] Email alerts configured at 80% of monthly budget
- [ ] Model selection uses cheaper models for simple tasks
- [ ] Conversation history trimmed to a reasonable window (not unlimited)
- [ ] System prompt reviewed for unnecessary verbosity
- [ ] `max_tokens` set appropriately per task type (not always 4096)
- [ ] Token usage logged per request with cost estimate
- [ ] Per-user daily limits enforced in API route
- [ ] Rate limiting in place (see Security module)
- [ ] Prompt caching enabled for large system prompts or document context
- [ ] Cost per user queryable from your database
- [ ] Weekly cost reviewed (manual or automated)
- [ ] Cost estimate calculated for any context-heavy features before building

---

## Common Mistakes

> **Mistake: Sending unlimited conversation history**
> The most common source of unexpected bills. A 50-turn conversation sends 50× the tokens of turn 1 for the last message alone. Always cap history.

> **Mistake: Using the most powerful model for everything**
> Classifying a user's intent, summarising a paragraph, or reformatting text does not require Claude Sonnet. Use Haiku for lightweight tasks. Reserve Sonnet for where it matters.

> **Mistake: No spend limit at the provider**
> Bugs happen. Setting a hard spend limit at the API provider level is the only guarantee that a runaway loop doesn't produce a $1,000 bill before you notice.

> **Mistake: Not logging token usage per request**
> "I wonder why my bill is high this month" is an unanswerable question without per-request usage data. Log it from day one.

> **Mistake: Long system prompts with no measurement**
> A 2,000-token system prompt costs $0.006 per message on Sonnet. At 10,000 messages/month that's $60/month — just for the system prompt. Measure it. Trim it.

---

## Next

With costs understood and controlled, the next topic is **Hosting** — getting your AI tool running on a real URL, reliably, for the people who will use it.
