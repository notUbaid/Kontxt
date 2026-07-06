---
title: AI Failure States
slug: ai-failure-states
phase: Phase 3
mode: personal
projectType: ai-tool
estimatedTime: 20–30 min
---

# AI Failure States

Every AI tool has a gap between what users expect and what the model actually delivers. Users expect reliable, accurate, always-available responses. Models hallucinate, refuse, time out, go off-topic, and occasionally return gibberish.

How you handle that gap is what separates a polished AI tool from a frustrating prototype.

Failure states are not edge cases. They are regular occurrences that your UI must be designed for from the start — not patched in after users complain.

---

## The Failure Taxonomy

AI failures are not all the same. They need different responses.

| Failure Type | What Happens | Who's Responsible |
|---|---|---|
| **Refusal** | Model declines to answer | Model policy |
| **Hallucination** | Model confidently gives wrong answer | Model limitation |
| **Timeout** | Response takes too long, connection drops | Infrastructure |
| **Context overflow** | Conversation too long for context window | Architecture |
| **Rate limit** | Too many requests in a time window | Your infrastructure |
| **Off-topic drift** | Model ignores system prompt, goes off-rails | Prompt engineering |
| **Malformed output** | Structured output doesn't match expected format | Prompt + model |
| **Empty response** | Model returns nothing or whitespace | Model + infrastructure |
| **Content filter** | Provider-level block before model sees input | Provider policy |

Each needs a distinct handling strategy. A single generic error message covers none of them well.

---

## Refusals

The model will refuse requests it considers harmful, out of scope, or ambiguous. This is expected behaviour, not a bug. Your UI must handle it gracefully.

### Detecting Refusals

Refusals don't come through as HTTP errors — the API returns `200` with a response that happens to be a refusal. You have to detect them by content or by stop reason.

```typescript
// Anthropic returns stop_reason: "end_turn" for normal responses
// Content-based detection for refusals
function isRefusal(content: string): boolean {
  const refusalPhrases = [
    "i can't help with that",
    "i'm not able to",
    "i cannot assist",
    "i don't feel comfortable",
    "that's outside what i can help with"
  ]
  const lower = content.toLowerCase()
  return refusalPhrases.some(phrase => lower.includes(phrase))
}
```

### Handling Refusals in UI

```tsx
function AssistantMessage({ content, isRefusal }: {
  content: string
  isRefusal: boolean
}) {
  if (isRefusal) {
    return (
      <div className="message refusal">
        <RefusalIcon />
        <p>{content}</p>
        <p className="hint">
          Try rephrasing your question, or{" "}
          <button onClick={startNewChat}>start a new conversation</button>.
        </p>
      </div>
    )
  }
  return <div className="message">{content}</div>
}
```

Do not fight refusals with prompt injection or jailbreaks. If your tool genuinely needs the model to engage with content it's refusing, adjust your system prompt to provide context that makes the intent clear — not to bypass safety measures.

---

## Hallucinations

This is the most dangerous failure mode because it's invisible. The model responds confidently with incorrect information. There is no error. There is no indication. The user may not notice.

### You Cannot Fully Prevent Hallucinations

Hallucinations are a fundamental property of current language models. Accept this. Design around it.

### Design Strategies

**1. Surface uncertainty signals**

Prompt the model to express uncertainty when it's uncertain.

```typescript
const systemPrompt = `
You are a helpful assistant.

When you are uncertain about a fact, explicitly say so.
Use phrases like "I'm not certain, but...", "You may want to verify this, but...",
or "I believe... though I'd recommend confirming."

Never present uncertain information with the same confidence as known facts.
`
```

**2. Scope the model's knowledge domain**

Hallucinations increase when the model is asked about things outside its training or your provided context. Constrain what it's allowed to answer.

```typescript
const systemPrompt = `
You only answer questions about [YOUR DOMAIN].

If a user asks about something outside this domain, say:
"I'm only able to help with [DOMAIN] questions. For other topics,
I'd recommend [ALTERNATIVE RESOURCE]."

Do not speculate or make up information you're not confident about.
`
```

**3. UI-level trust signals**

```tsx
// Show a verification prompt for factual claims
function FactualMessage({ content }: { content: string }) {
  return (
    <div className="message">
      <p>{content}</p>
      <p className="disclaimer">
         AI can make mistakes. Verify important information from authoritative sources.
      </p>
    </div>
  )
}
```

Place this disclaimer where it's visible but not so prominent it undermines every response. A small footer under factual responses is the right balance.

---

## Timeouts

AI responses can take 10–30 seconds for long outputs. Connections time out. Users close tabs. Networks drop.

### Set Explicit Timeouts

```typescript
// Backend — abort the AI request after a time limit
export async function POST(req: Request) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25000) // 25s limit

  try {
    const response = await anthropic.messages.stream(
      { model: "claude-sonnet-4-6", max_tokens: 1024, messages },
      { signal: controller.signal }
    )

    // ... stream to client

  } catch (err) {
    if (err.name === "AbortError") {
      return Response.json(
        { error: "timeout", message: "Response took too long. Please try again." },
        { status: 504 }
      )
    }
    throw err
  } finally {
    clearTimeout(timeout)
  }
}
```

### Handle Timeouts on the Client

```typescript
// Frontend — detect timeout and offer retry
async function streamResponse(messages: Message[]) {
  const clientTimeout = setTimeout(() => {
    abortController.current?.abort()
    setError({
      type: "timeout",
      message: "This is taking longer than usual.",
      action: "retry"
    })
  }, 30000)

  try {
    await stream(messages)
  } finally {
    clearTimeout(clientTimeout)
  }
}
```

```tsx
{error?.type === "timeout" && (
  <ErrorBanner>
    <p>This is taking longer than usual.</p>
    <button onClick={() => retryLastMessage()}>Try again</button>
    <button onClick={() => shortenContext()}>Try with a shorter conversation</button>
  </ErrorBanner>
)}
```

---

## Context Window Overflow

Every model has a maximum context length. Conversations that exceed it fail. This happens to real users over the course of a long session.

### Detect It Before It Happens

```typescript
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic()

// Rough token estimation (more accurate than character counting)
function estimateTokens(messages: Message[]): number {
  const text = messages.map(m =>
    typeof m.content === "string" ? m.content : JSON.stringify(m.content)
  ).join(" ")
  return Math.ceil(text.length / 4)  // ~4 chars per token
}

const MODEL_CONTEXT_LIMITS = {
  "claude-sonnet-4-6": 200000,
  "claude-haiku-4-5-20251001": 200000,
  "gpt-4o": 128000,
} as const

function isNearContextLimit(
  messages: Message[],
  model: string,
  bufferPercent = 0.85
): boolean {
  const limit = MODEL_CONTEXT_LIMITS[model] ?? 100000
  return estimateTokens(messages) > limit * bufferPercent
}
```

### Handle It Gracefully

```tsx
{isNearContextLimit(messages, model) && (
  <ContextWarning>
    <p>This conversation is getting long. Responses may become less accurate.</p>
    <button onClick={summariseAndContinue}>Summarise and continue</button>
    <button onClick={startNewChat}>Start a new chat</button>
  </ContextWarning>
)}
```

### Summarise and Continue

Rather than forcing users to start over, summarise the conversation and use the summary as context.

```typescript
async function summariseConversation(messages: Message[]): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",  // Use a cheaper model for summarisation
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `Summarise this conversation in 3–5 bullet points, preserving the key context and decisions made:\n\n${formatMessages(messages)}`
      }
    ]
  })
  return response.content[0].type === "text" ? response.content[0].text : ""
}

async function continueWithSummary(messages: Message[]) {
  const summary = await summariseConversation(messages)

  // Replace conversation history with summary
  setMessages([
    {
      role: "user",
      content: `[Previous conversation summary:\n${summary}]\n\nLet's continue from here.`
    }
  ])
}
```

---

## Rate Limits

When you hit your API provider's rate limits, requests fail with a `429` status. Under normal usage this is rare, but bugs, loops, or viral traffic can trigger it.

```typescript
// Implement exponential backoff on rate limit errors
async function callWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const isRateLimit = err?.status === 429

      if (isRateLimit && attempt < maxRetries - 1) {
        // Exponential backoff: 2s, 4s, 8s
        const delay = Math.pow(2, attempt + 1) * 1000
        await new Promise(r => setTimeout(r, delay))
        continue
      }

      throw err
    }
  }
  throw new Error("Max retries exceeded")
}
```

```tsx
// User-facing rate limit message
{error?.type === "rate_limit" && (
  <ErrorBanner variant="warning">
    <p>Too many requests. Please wait a moment before trying again.</p>
    <RetryCountdown seconds={retryAfter} onComplete={retryLastMessage} />
  </ErrorBanner>
)}
```

---

## Malformed Structured Output

When you ask the model to return JSON or a specific format, it sometimes wraps the output in prose, adds markdown code fences, or returns a slightly different schema.

```typescript
// Robust JSON extraction from model output
function extractJSON<T>(raw: string): T | null {
  // Remove markdown code fences
  const stripped = raw
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim()

  // Try direct parse
  try {
    return JSON.parse(stripped) as T
  } catch {
    // Try to find JSON object or array in the response
    const match = stripped.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)?.[0]
    if (match) {
      try {
        return JSON.parse(match) as T
      } catch {
        return null
      }
    }
    return null
  }
}

// Use with fallback
const parsed = extractJSON<ExpectedSchema>(rawResponse)

if (!parsed) {
  logger.warn("structured_output.parse_failed", { raw: rawResponse })
  // Either retry with a stronger prompt, or fall back to plain text display
  return handleUnstructuredFallback(rawResponse)
}
```

If structured output failures are common, switch to using the model's native tool use / function calling feature — it enforces schema compliance more reliably than prompting alone.

---

## Empty or Degraded Responses

Sometimes the model returns an empty string, whitespace, or a single word when a full response was expected.

```typescript
function isValidResponse(content: string): boolean {
  const trimmed = content.trim()

  if (trimmed.length === 0) return false
  if (trimmed.length < 10) return false  // Suspiciously short
  if (trimmed === "undefined" || trimmed === "null") return false

  return true
}

// In your response handler
if (!isValidResponse(responseContent)) {
  logger.warn("response.empty_or_degraded", {
    userId,
    contentLength: responseContent.length
  })

  setError({
    type: "empty_response",
    message: "I wasn't able to generate a response. Please try rephrasing your question."
  })
  return
}
```

---

## The Error UI System

All of these failure modes need UI. Build a consistent error component rather than one-off handling per failure type.

```tsx
type AIError = {
  type: "timeout" | "rate_limit" | "refusal" | "context_overflow" |
        "empty_response" | "network" | "unknown"
  message: string
  retryable: boolean
  action?: "retry" | "new_chat" | "shorten"
}

const ERROR_CONFIG: Record<AIError["type"], {
  icon: string
  defaultMessage: string
  retryable: boolean
}> = {
  timeout:          { icon: "", defaultMessage: "Response timed out.", retryable: true },
  rate_limit:       { icon: "", defaultMessage: "Too many requests. Wait a moment.", retryable: true },
  refusal:          { icon: "", defaultMessage: "I can't help with that.", retryable: false },
  context_overflow: { icon: "", defaultMessage: "Conversation too long.", retryable: false },
  empty_response:   { icon: "", defaultMessage: "No response generated.", retryable: true },
  network:          { icon: "", defaultMessage: "Connection lost.", retryable: true },
  unknown:          { icon: "", defaultMessage: "Something went wrong.", retryable: true }
}

function AIErrorMessage({ error, onRetry, onNewChat }: {
  error: AIError
  onRetry: () => void
  onNewChat: () => void
}) {
  const config = ERROR_CONFIG[error.type]

  return (
    <div className="ai-error" role="alert">
      <span>{config.icon}</span>
      <p>{error.message || config.defaultMessage}</p>
      <div className="error-actions">
        {config.retryable && (
          <button onClick={onRetry}>Try again</button>
        )}
        {error.type === "context_overflow" && (
          <button onClick={onNewChat}>Start new chat</button>
        )}
      </div>
    </div>
  )
}
```

---

## Logging Failures for Improvement

Every AI failure is a signal. Log them to understand which failure modes are most common and where your system prompt or architecture needs work.

```typescript
function logAIFailure(type: AIError["type"], context: {
  userId: string
  messagesCount: number
  lastUserMessage: string  // Log the prompt, not PII
  rawError?: string
}) {
  logger.warn(`ai.failure.${type}`, {
    ...context,
    // Never log full conversation history — too much data, potential PII
    messagesCount: context.messagesCount
  })
}
```

After a week of production use, review your failure logs:
- High refusal rate → your system prompt context may be insufficient
- High timeout rate → responses are too long, reduce `max_tokens`
- High malformed output rate → switch to tool use for structured outputs
- High context overflow rate → implement summarisation earlier

---

## AI Failure States Checklist

- [ ] Each failure type has a distinct, user-friendly error message
- [ ] Refusals detected by content and shown with a helpful suggestion
- [ ] Timeouts handled with explicit abort after a defined limit (25–30s)
- [ ] Retry with exponential backoff implemented for rate limits (429)
- [ ] Context window usage estimated before each request
- [ ] Warning shown to user when approaching context limit
- [ ] Summarise-and-continue option offered before context limit is hit
- [ ] JSON extraction handles markdown-wrapped and slightly malformed output
- [ ] Empty or single-word responses detected and handled
- [ ] Single error UI component used consistently across all failure types
- [ ] All AI failure events logged with type, user context, and message count
- [ ] Raw API error messages never shown directly to users
- [ ] Retry button available for retryable errors
- [ ] New chat / start over option available for non-retryable errors
- [ ] Failure states tested manually for each type before shipping

---

## Common Mistakes

> **Mistake: One generic "Something went wrong" message for all failures**
> A timeout, a refusal, and a context overflow need completely different user responses. Generic errors leave users with no path forward.

> **Mistake: Hiding failures silently**
> The response stops mid-stream, the UI resets, nothing is shown. The user has no idea what happened. Always surface failures visibly, even if the message is simple.

> **Mistake: Not logging AI failures**
> You cannot improve what you don't measure. After launch, your failure logs will tell you exactly where to focus — better prompts, lower token limits, earlier summarisation.

> **Mistake: Letting the conversation continue after context overflow**
> The model silently drops the oldest messages once the context is full. The user keeps talking, unaware the model has lost context. Warn early and offer recovery options.

> **Mistake: Retrying immediately without backoff on rate limits**
> Immediate retry on a 429 generates another 429. Exponential backoff is the correct pattern — wait, then retry.

> **Mistake: Treating hallucination as an implementation bug to fix**
> You cannot eliminate hallucination with better code. Design your UI, prompts, and disclaimers to set accurate expectations and encourage verification of important facts.

---

## Next

With both the happy path and failure states handled, Phase 3 development is complete. The next phase is **Phase 4 — Deployment**, starting with **Security** — protecting your AI tool and your users before it goes live.
