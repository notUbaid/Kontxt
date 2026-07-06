---
title: Streaming UX
slug: streaming-ux
phase: Phase 3
mode: personal
projectType: ai-tool
estimatedTime: 20–30 min
---

# Streaming UX

When an AI response takes 5 seconds to generate, there are two very different user experiences possible.

The first: a blank screen, a spinner, then a wall of text appearing all at once. The user has no idea if anything is happening. They wonder if it's broken. They wait.

The second: text begins appearing within 200 milliseconds. Word by word. The response builds in front of them. They start reading while it's still generating. It feels alive.

The underlying model response time is identical. The perceived experience is completely different. Streaming is how you build the second one.

---

## How Streaming Works

Most AI APIs support streaming via Server-Sent Events (SSE) — a standard HTTP mechanism where the server sends chunks of data as they become available, and the client reads them incrementally.

```
Without streaming:
  Client → Request → [5 second wait] → Full response arrives → Display

With streaming:
  Client → Request → Chunk 1 (50ms) → Chunk 2 (120ms) → Chunk 3 (200ms) → ...
                      ↓ display       ↓ display         ↓ display
```

The model generates tokens one at a time. Streaming sends each token (or small group of tokens) to the client immediately rather than buffering the full response.

---

## The Architecture

A streaming AI response flows through three layers.

```
1. AI Provider (Anthropic / OpenAI)
   Generates tokens and streams them via SSE

2. Your Backend (API route / server)
   Receives the stream, may transform it, forwards to client
   This is where you add auth, logging, rate limiting

3. Your Frontend
   Reads the stream, appends tokens to UI state as they arrive
```

You need to handle the stream at each layer. The most common mistake is correctly streaming from the AI provider but blocking on the backend before it reaches the client.

---

## Backend — Streaming API Route

### Next.js App Router (Recommended)

```typescript
// app/api/chat/route.ts
import Anthropic from "@anthropic-ai/sdk"
import { getSession } from "@/lib/auth"

const anthropic = new Anthropic()

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  const { messages, systemPrompt } = await req.json()

  // Create a streaming response using the Web Streams API
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()

      try {
        const response = await anthropic.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: systemPrompt,
          messages
        })

        for await (const chunk of response) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            // Send each text chunk to the client
            controller.enqueue(encoder.encode(chunk.delta.text))
          }
        }
      } catch (err) {
        // Send error signal to client
        controller.enqueue(encoder.encode("\n\n[ERROR]"))
      } finally {
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      // Prevent buffering at intermediary proxies
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    }
  })
}
```

### Using the Vercel AI SDK (Simpler)

If you're on Next.js and want less boilerplate, the Vercel AI SDK handles the streaming infrastructure for you.

```typescript
// app/api/chat/route.ts
import { streamText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    messages,
    system: "You are a helpful assistant."
  })

  return result.toDataStreamResponse()
}
```

```tsx
// Frontend — useChat hook handles everything
import { useChat } from "ai/react"

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <span>{m.role}: </span>
          <span>{m.content}</span>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  )
}
```

> **Use the Vercel AI SDK for personal projects.** It handles stream parsing, error recovery, message history, and loading state. Build the raw implementation only if you need full control over the protocol.

---

## Frontend — Reading the Stream Manually

If you're not using the AI SDK, here's how to read a streaming response on the client.

```typescript
// hooks/useStream.ts
import { useState, useCallback } from "react"

export function useStream() {
  const [response, setResponse] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stream = useCallback(async (messages: Message[]) => {
    setResponse("")
    setError(null)
    setIsStreaming(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages })
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      if (!res.body) throw new Error("No response body")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })

        // Check for error signal
        if (chunk.includes("[ERROR]")) {
          setError("Something went wrong. Please try again.")
          break
        }

        setResponse(prev => prev + chunk)
      }
    } catch (err) {
      setError("Connection failed. Please try again.")
    } finally {
      setIsStreaming(false)
    }
  }, [])

  return { response, isStreaming, error, stream }
}
```

---

## The UX Details That Matter

Streaming text arrival is the baseline. The details that separate good from great:

### 1. Cursor Blinking While Streaming

A blinking cursor at the end of the streaming text confirms the model is still generating — not frozen.

```tsx
function StreamingMessage({ content, isStreaming }: {
  content: string
  isStreaming: boolean
}) {
  return (
    <div className="message">
      <span>{content}</span>
      {isStreaming && (
        <span className="cursor" aria-hidden="true">▋</span>
      )}
    </div>
  )
}
```

```css
.cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
  margin-left: 1px;
  opacity: 1;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

### 2. Auto-Scroll During Streaming

Users should not need to scroll manually while a response is generating. But if they scroll up to re-read something, stop auto-scrolling immediately.

```tsx
import { useEffect, useRef, useState } from "react"

function MessageList({ messages, isStreaming }) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [userScrolled, setUserScrolled] = useState(false)

  // Detect if user scrolled up
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50
      setUserScrolled(!isAtBottom)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-scroll only if user hasn't scrolled up
  useEffect(() => {
    if (isStreaming && !userScrolled) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isStreaming, userScrolled])

  // Reset when new message starts
  useEffect(() => {
    if (isStreaming) setUserScrolled(false)
  }, [messages.length])

  return (
    <div ref={containerRef} className="message-list">
      {messages.map(m => <Message key={m.id} message={m} />)}
      <div ref={bottomRef} />
    </div>
  )
}
```

### 3. Markdown Rendering While Streaming

If your AI response includes markdown, rendering it mid-stream creates visual chaos — headers appearing and disappearing as asterisks arrive before text.

**Two options:**

```tsx
// Option A: Render markdown only after streaming completes
function Message({ content, isStreaming }) {
  if (isStreaming) {
    return <pre className="streaming-text">{content}</pre>
  }
  return <MarkdownRenderer content={content} />
}

// Option B: Incremental markdown — render what's clearly complete
// Use react-markdown with remark-gfm
// Incomplete markdown syntax renders as plain text until complete
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function Message({ content }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  )
}
```

Option A is simpler and avoids jitter. Option B gives a richer streaming experience but requires testing to ensure incomplete markdown doesn't cause visual glitches.

### 4. Disable Input While Streaming

Don't let users send another message while the current one is generating — unless you explicitly support multi-turn streaming.

```tsx
<form onSubmit={handleSubmit}>
  <textarea
    value={input}
    onChange={e => setInput(e.target.value)}
    disabled={isStreaming}
    placeholder={isStreaming ? "Generating response..." : "Ask something..."}
    onKeyDown={e => {
      if (e.key === "Enter" && !e.shiftKey && !isStreaming) {
        e.preventDefault()
        handleSubmit()
      }
    }}
  />
  <button type="submit" disabled={isStreaming || !input.trim()}>
    {isStreaming ? <StopIcon /> : <SendIcon />}
  </button>
</form>
```

### 5. Stop Generation

For longer responses, users should be able to stop generation mid-stream.

```tsx
function Chat() {
  const abortControllerRef = useRef<AbortController | null>(null)

  async function startStream(messages) {
    abortControllerRef.current = new AbortController()

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
      signal: abortControllerRef.current.signal  // Pass abort signal
    })
    // ... read stream
  }

  function stopGeneration() {
    abortControllerRef.current?.abort()
    setIsStreaming(false)
  }

  return (
    <>
      {/* ... messages */}
      {isStreaming && (
        <button onClick={stopGeneration}>
          Stop generating
        </button>
      )}
    </>
  )
}
```

---

## Loading States — First Token Latency

There is a gap between sending the request and the first token arriving. This is the model's time-to-first-token (TTFT) — typically 300ms–2s depending on model and load.

During this window, the user sees nothing unless you handle it explicitly.

```tsx
type StreamState = "idle" | "waiting" | "streaming" | "done" | "error"

function ChatInterface() {
  const [streamState, setStreamState] = useState<StreamState>("idle")

  return (
    <div>
      {streamState === "waiting" && (
        <div className="thinking-indicator">
          <ThinkingDots />  {/* Animated dots or pulse */}
          <span>Thinking...</span>
        </div>
      )}
      {(streamState === "streaming" || streamState === "done") && (
        <StreamingMessage content={response} isStreaming={streamState === "streaming"} />
      )}
      {streamState === "error" && (
        <ErrorMessage onRetry={handleRetry} />
      )}
    </div>
  )
}
```

```css
/* Thinking dots animation */
.thinking-indicator span::after {
  content: "";
  animation: dots 1.5s steps(4, end) infinite;
}

@keyframes dots {
  0%, 20%  { content: ""; }
  40%      { content: "."; }
  60%      { content: ".."; }
  80%, 100%{ content: "..."; }
}
```

The "Thinking..." state acknowledges the request was received and something is happening. Without it, users will click Send again — triggering a duplicate request.

---

## Error Handling in Streams

Streams can fail mid-generation. The connection can drop. The model can hit a content filter. The API can time out.

```typescript
// Backend — send a structured error event before closing
for await (const chunk of response) {
  // ... handle chunks
}

// Catch mid-stream errors
response.on("error", (err) => {
  controller.enqueue(encoder.encode(
    `\n\n__STREAM_ERROR__:${err.message}`
  ))
  controller.close()
})
```

```typescript
// Frontend — detect and handle mid-stream errors
const chunk = decoder.decode(value, { stream: true })

if (chunk.includes("__STREAM_ERROR__:")) {
  const errorMsg = chunk.split("__STREAM_ERROR__:")[1]
  setError(getUserFriendlyError(errorMsg))
  return
}

function getUserFriendlyError(raw: string): string {
  if (raw.includes("context_length_exceeded")) {
    return "The conversation is too long. Please start a new chat."
  }
  if (raw.includes("rate_limit")) {
    return "Too many requests. Please wait a moment and try again."
  }
  return "Something went wrong. Please try again."
}
```

Never show raw API error messages to users. Translate them to plain language and provide a clear action.

---

## Performance Considerations

### Don't Re-render the Entire Message List on Every Token

Streaming triggers a state update on every chunk. If you re-render the entire conversation on each update, performance degrades quickly.

```tsx
// Bad — entire list re-renders on every token
function Chat() {
  const [messages, setMessages] = useState<Message[]>([])

  // Updating messages array on every chunk re-renders everything
  const onChunk = (chunk: string) => {
    setMessages(prev => {
      const last = prev[prev.length - 1]
      return [...prev.slice(0, -1), { ...last, content: last.content + chunk }]
    })
  }
}

// Better — isolate streaming content in separate state
function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [streamingContent, setStreamingContent] = useState("")

  // Only streamingContent updates during generation
  const onChunk = (chunk: string) => {
    setStreamingContent(prev => prev + chunk)
  }

  // On complete — move to messages, clear streaming state
  const onComplete = () => {
    setMessages(prev => [...prev, { role: "assistant", content: streamingContent }])
    setStreamingContent("")
  }
}
```

### Throttle Scroll Events

The auto-scroll listener fires on every pixel of scroll. Throttle it.

```typescript
import { throttle } from "lodash"

const handleScroll = throttle(() => {
  const { scrollTop, scrollHeight, clientHeight } = container
  setUserScrolled(scrollHeight - scrollTop - clientHeight > 50)
}, 100)
```

---

## Streaming UX Checklist

- [ ] Backend correctly streams tokens without buffering the full response
- [ ] `Cache-Control: no-cache` and `Connection: keep-alive` headers set
- [ ] Frontend reads stream incrementally using `ReadableStream` or AI SDK
- [ ] "Waiting" / "Thinking" state shown before first token arrives
- [ ] Blinking cursor shown during active streaming
- [ ] Auto-scroll follows new content unless user has scrolled up
- [ ] Input and Send button disabled while streaming
- [ ] Stop generation button available and functional
- [ ] Mid-stream errors handled and shown as user-friendly messages
- [ ] Raw API error messages never shown directly to user
- [ ] Streaming content isolated from message history to prevent full re-renders
- [ ] Markdown rendering tested mid-stream (no visual jitter)
- [ ] Scroll listener throttled to avoid performance issues
- [ ] Tested on slow connections (Chrome DevTools → Network throttling)
- [ ] Tested on mobile — touch scroll behaviour works correctly

---

## Common Mistakes

> **Mistake: Buffering the full response before sending**
> Using `await response.text()` or collecting all chunks before returning defeats the entire point of streaming. The client waits for completion just like a non-streaming response.

> **Mistake: No waiting state before the first token**
> The gap between request and first token can be 1–2 seconds. Without a loading indicator during this window, users think nothing is happening and click Send again.

> **Mistake: Re-rendering the full message list on every chunk**
> At 10 tokens per second with 20 messages in the conversation, this causes visible lag. Isolate the streaming content in its own state variable.

> **Mistake: Auto-scrolling even when the user has scrolled up**
> User scrolls up to re-read something. Auto-scroll yanks them back to the bottom. This is one of the most frustrating UX patterns in chat interfaces. Detect user intent and respect it.

> **Mistake: Showing raw API errors**
> "Error code: 529, upstream_overloaded" means nothing to a user. "We're busy right now. Please try again in a moment." is actionable. Always translate.

---

## Next

With streaming delivering responses that feel instant and alive, the next topic is **AI Failure States** — designing for what happens when the model refuses, hallucinates, times out, or returns something unexpected.
