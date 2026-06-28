---
title: Prompt Analytics
slug: prompt-analytics
phase: Phase 5
mode: personal
projectType: ai-tool
estimatedTime: 30–40 min
---

# Prompt Analytics

Regular analytics tell you who uses your app and how often. Prompt analytics tell you whether your AI is actually working — which prompts succeed, which fail, where users give up, and what your system prompt is getting wrong.

Without this, you're flying blind. You'll spend hours tweaking prompts based on intuition when the data already knows the answer.

---

## What Prompt Analytics Measures

| Signal | What It Tells You |
|---|---|
| **Completion rate** | Did the AI produce a usable response, or did it fail/refuse? |
| **User satisfaction** | Did the user accept the response, regenerate, or abandon? |
| **Latency by prompt type** | Which prompt patterns are slow? |
| **Token usage per interaction** | Where are costs concentrating? |
| **Failure modes** | What categories of input cause bad outputs? |
| **Retry rate** | How often do users hit regenerate? |
| **Conversation depth** | How many turns before users get what they need? |

You don't need all of these at once. Start with the three that answer your most pressing question.

---

## What to Log

Every AI interaction should produce a structured log event. Design this schema before instrumenting anything.

```typescript
// types/ai-analytics.ts
interface AIInteractionEvent {
  // Identity
  interactionId: string       // unique per request
  sessionId: string           // groups a conversation
  userId?: string             // null for anonymous

  // Timing
  timestamp: string           // ISO 8601
  latencyMs: number           // time to first token (streaming) or full response

  // Input
  promptLength: number        // characters or tokens
  conversationTurns: number   // how deep into the conversation
  inputCategory?: string      // if you classify prompt types

  // Model
  model: string               // e.g. "claude-sonnet-4-6"
  promptVersion: string       // your system prompt version — critical

  // Output
  responseLength: number
  finishReason: string        // 'stop' | 'max_tokens' | 'error' | 'content_filter'
  tokensInput: number
  tokensOutput: number
  estimatedCostUsd: number

  // Quality signals (added after response)
  userAction?: 'accepted' | 'regenerated' | 'edited' | 'abandoned'
  thumbsUp?: boolean
  thumbsDown?: boolean
  feedbackText?: string
}
```

> [!TIP]
> Always log `promptVersion`. When you change your system prompt, you need to compare metrics before and after. Without a version field, you can't tell which version of your prompt produced which outcomes.

---

## Logging Implementation

### Server-Side Logging (recommended)

Log at the API layer, not the client. Client logs can be blocked, manipulated, or lost.

```typescript
// lib/ai-logger.ts
import { db } from '@/lib/db'

export async function logAIInteraction(event: AIInteractionEvent) {
  // Fire and forget — don't block the response for logging
  db.aiInteraction.create({ data: event }).catch(err => {
    console.error('[AI Logger] Failed to log interaction:', err)
  })
}
```

```typescript
// app/api/chat/route.ts
import { logAIInteraction } from '@/lib/ai-logger'

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  const { messages, sessionId } = await req.json()

  let finishReason = 'error'
  let tokensInput = 0
  let tokensOutput = 0

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    })

    finishReason = response.stop_reason ?? 'stop'
    tokensInput = response.usage.input_tokens
    tokensOutput = response.usage.output_tokens

    // Log asynchronously
    logAIInteraction({
      interactionId: crypto.randomUUID(),
      sessionId,
      timestamp: new Date().toISOString(),
      latencyMs: Date.now() - startTime,
      promptLength: messages.at(-1)?.content?.length ?? 0,
      conversationTurns: messages.length,
      model: 'claude-sonnet-4-6',
      promptVersion: process.env.PROMPT_VERSION ?? 'unknown',
      responseLength: response.content[0]?.text?.length ?? 0,
      finishReason,
      tokensInput,
      tokensOutput,
      estimatedCostUsd: calculateCost('claude-sonnet-4-6', tokensInput, tokensOutput),
    })

    return NextResponse.json({ content: response.content[0].text })
  } catch (error) {
    logAIInteraction({ /* error event */ finishReason: 'error', ... })
    throw error
  }
}

function calculateCost(model: string, inputTokens: number, outputTokens: number): number {
  // Update these when model pricing changes
  const pricing: Record<string, { input: number; output: number }> = {
    'claude-sonnet-4-6': { input: 0.000003, output: 0.000015 },  // per token
    'claude-haiku-4-5-20251001':  { input: 0.00000025, output: 0.00000125 },
  }
  const p = pricing[model] ?? { input: 0, output: 0 }
  return (inputTokens * p.input) + (outputTokens * p.output)
}
```

---

## Capturing User Quality Signals

Latency and token counts are objective. Quality is subjective — you need explicit user signals.

### Thumbs Up / Down

```typescript
// The simplest quality signal — add after every response
function AIResponse({ interactionId, content }: Props) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)

  const submitFeedback = async (value: 'up' | 'down') => {
    setFeedback(value)
    await fetch('/api/ai/feedback', {
      method: 'POST',
      body: JSON.stringify({ interactionId, thumbs: value }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return (
    <div>
      <div className="prose">{content}</div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => submitFeedback('up')}
          aria-label="This response was helpful"
          className={feedback === 'up' ? 'text-green-600' : 'text-neutral-400'}
        >
          
        </button>
        <button
          onClick={() => submitFeedback('down')}
          aria-label="This response was not helpful"
          className={feedback === 'down' ? 'text-red-600' : 'text-neutral-400'}
        >
          
        </button>
      </div>
    </div>
  )
}
```

### Regeneration Tracking

A user hitting "Regenerate" is a negative signal. Track it.

```typescript
// Track regeneration as a quality signal
const handleRegenerate = async () => {
  // Log the regeneration against the previous interactionId
  await fetch('/api/ai/feedback', {
    method: 'POST',
    body: JSON.stringify({
      interactionId: currentInteractionId,
      userAction: 'regenerated'
    })
  })

  // Then trigger the new request
  await sendMessage(lastUserMessage)
}
```

---

## Prompt Version Management

This is the most important discipline in prompt analytics. Without it, you can't learn.

```typescript
// lib/prompts.ts

export const PROMPT_VERSION = 'v1.4.0'

export const SYSTEM_PROMPT = `
You are a [description of your AI tool].

[Your system prompt content]
`

// Maintain a changelog
export const PROMPT_CHANGELOG = {
  'v1.4.0': 'Added instruction to cite sources. Removed verbose preamble.',
  'v1.3.0': 'Restricted response length to 3 paragraphs max.',
  'v1.2.0': 'Added persona and tone instructions.',
  'v1.1.0': 'Initial structured prompt.',
  'v1.0.0': 'First prompt.',
}
```

When you update the system prompt:
1. Bump the version
2. Add a changelog entry
3. Deploy
4. Compare metrics before and after in your logs — same queries, different versions

---

## The Database Schema

```prisma
// schema.prisma

model AIInteraction {
  id                String   @id @default(cuid())
  sessionId         String
  userId            String?
  timestamp         DateTime @default(now())
  latencyMs         Int
  promptLength      Int
  conversationTurns Int
  model             String
  promptVersion     String
  responseLength    Int
  finishReason      String
  tokensInput       Int
  tokensOutput      Int
  estimatedCostUsd  Float

  // Quality signals (nullable — set after response)
  userAction        String?  // accepted | regenerated | edited | abandoned
  thumbsUp          Boolean?
  thumbsDown        Boolean?
  feedbackText      String?

  @@index([sessionId])
  @@index([promptVersion])
  @@index([timestamp])
  @@index([finishReason])
}
```

---

## Querying Your Data

With logs in place, these are the queries that surface real insight.

### Satisfaction Rate by Prompt Version

```sql
SELECT
  prompt_version,
  COUNT(*) as total,
  SUM(CASE WHEN thumbs_up = true THEN 1 ELSE 0 END) as positive,
  SUM(CASE WHEN thumbs_down = true THEN 1 ELSE 0 END) as negative,
  SUM(CASE WHEN user_action = 'regenerated' THEN 1 ELSE 0 END) as regenerations,
  AVG(latency_ms) as avg_latency_ms,
  SUM(estimated_cost_usd) as total_cost
FROM ai_interaction
GROUP BY prompt_version
ORDER BY MIN(timestamp) DESC;
```

### Failure Rate by Category

```sql
SELECT
  finish_reason,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as pct
FROM ai_interaction
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY finish_reason
ORDER BY count DESC;
```

### High-Cost Sessions

```sql
SELECT
  session_id,
  COUNT(*) as turns,
  SUM(tokens_input + tokens_output) as total_tokens,
  SUM(estimated_cost_usd) as session_cost
FROM ai_interaction
GROUP BY session_id
ORDER BY session_cost DESC
LIMIT 20;
```

---

## What to Do With the Data

Data without action is noise. For each metric, define the threshold that triggers a change.

| Metric | Healthy | Investigate | Act |
|---|---|---|---|
| Thumbs-down rate | < 10% | 10–20% | > 20% |
| Regeneration rate | < 15% | 15–25% | > 25% |
| `max_tokens` finish reason | < 5% | 5–10% | > 10% |
| `content_filter` finish reason | < 1% | 1–3% | > 3% |
| p95 latency | < 5s | 5–10s | > 10s |
| Cost per session | Know your budget | — | Set alert |

**When thumbs-down rate is high:** Read the flagged responses. Find the pattern — wrong tone, wrong length, hallucinated facts, misunderstood intent. Fix the system prompt.

**When regeneration rate is high:** Read what users typed before regenerating. Are they rephrasing the same question? The prompt isn't understanding their intent. Add clarifying instructions or examples.

**When `max_tokens` finish reason is > 5%:** Your responses are being cut off. Either increase `max_tokens` or add an instruction to be more concise.

**When latency is high:** Profile which prompt patterns take longest. Consider caching responses for common queries, or switching to a faster model for that use case.

---

## Lightweight Dashboard

If you want to see your data without writing SQL every time, build a minimal internal dashboard.

```typescript
// app/admin/ai-analytics/page.tsx
// Protect this route — admin only

import { db } from '@/lib/db'

export default async function AIAnalyticsPage() {
  const [summary, versionComparison, recentFailures] = await Promise.all([
    db.aIInteraction.aggregate({
      where: { timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      _count: { id: true },
      _avg: { latencyMs: true, tokensInput: true, tokensOutput: true },
      _sum: { estimatedCostUsd: true },
    }),
    db.aIInteraction.groupBy({
      by: ['promptVersion'],
      _count: { id: true },
      _avg: { latencyMs: true },
      _sum: { estimatedCostUsd: true },
      orderBy: { _count: { id: 'desc' } },
    }),
    db.aIInteraction.findMany({
      where: { finishReason: { in: ['error', 'content_filter'] } },
      orderBy: { timestamp: 'desc' },
      take: 20,
    }),
  ])

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">AI Analytics (Last 7 days)</h1>
      {/* Render summary cards, version table, failure list */}
    </div>
  )
}
```

---

## Prompt Analytics Checklist

- [ ] `AIInteraction` model added to Prisma schema with version and quality fields
- [ ] Every API response logs an interaction event asynchronously
- [ ] `promptVersion` is set from an env variable or constants file
- [ ] Thumbs up / down UI added to response components
- [ ] Regeneration events are logged against the original interaction
- [ ] Cost calculation function is implemented and accurate
- [ ] At least 3 analytical queries written and tested
- [ ] Thresholds defined for each metric — you know when to act
- [ ] Admin-only analytics route created (protected)

---

## What Comes Next

**Model Upgrades** — using the data you've collected to make informed decisions about when to upgrade models, switch providers, or run A/B tests between model versions.

Prompt analytics is the evidence base. Model upgrades are the decision you make with it.
