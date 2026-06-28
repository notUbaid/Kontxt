---
title: Backend
slug: backend
phase: Phase 3
mode: personal
projectType: ai-tool
estimatedTime: 25–40 min
---

# Backend

The backend of an AI tool has one core job: take user input, call the model API securely, and stream the response back efficiently. Everything else — auth, rate limiting, cost control, conversation persistence — wraps around that core.

The key principle: **your API key never touches the client.** Everything that involves calling the model runs server-side. This is non-negotiable.

---

## Architecture Overview

```
Client (Browser)
    │
    │  POST /api/chat  { messages: [...] }
    ▼
Your Backend
    ├── Validate request
    ├── Apply rate limiting
    ├── Build system prompt
    ├── Call Anthropic API (streaming)
    └── Pipe stream back to client
         │
         ▼
    Client renders chunks as they arrive
```

Your backend is a thin, secure proxy with business logic layered on top. It's not complex — but every layer needs to be present.

---

## The Core Chat Endpoint

```typescript
// app/api/chat/route.ts (Next.js App Router)
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!, // server-side only — never expose to client
});

const MODEL = process.env.AI_MODEL ?? 'kontxt-sonnet-4-6';

const SYSTEM_PROMPT = `
You are a document assistant. Help users understand and analyse their documents.
Answer questions using only information from the provided context.
If the answer isn't in the context, say so clearly.
`.trim();

export async function POST(req: NextRequest) {
  // 1. Parse and validate the request
  let body: { messages: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('Messages array required', { status: 400 });
  }

  // 2. Validate message structure
  const isValid = messages.every(m =>
    ['user', 'assistant'].includes(m.role) && typeof m.content === 'string'
  );
  if (!isValid) {
    return new Response('Invalid message format', { status: 400 });
  }

  // 3. Enforce message limit — prevent token abuse
  const MAX_MESSAGES = 20;
  const trimmedMessages = messages.slice(-MAX_MESSAGES);

  // 4. Stream from Anthropic
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = anthropic.messages.stream({
          model: MODEL,
          system: SYSTEM_PROMPT,
          messages: trimmedMessages as Anthropic.MessageParam[],
          max_tokens: 1024,
        });

        for await (const event of anthropicStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            // Send each text chunk as an SSE line
            const data = `data: ${event.delta.text}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        }

        // Signal completion
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();

      } catch (error) {
        const errorMessage = error instanceof Anthropic.APIError
          ? `API error: ${error.status}`
          : 'Internal error';
        controller.enqueue(encoder.encode(`data: [ERROR] ${errorMessage}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // disable Nginx buffering for SSE
    },
  });
}
```

---

## Rate Limiting

Without rate limiting, a single user can generate thousands of API calls and drain your budget in minutes. This is not theoretical — it happens.

```typescript
// lib/rate-limit.ts
// Simple in-memory rate limiter — fine for personal projects
// Use Redis for multi-instance deployments

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    // New window
    const newEntry = { count: 1, resetAt: now + windowMs };
    rateLimitStore.set(key, newEntry);
    return { allowed: true, remaining: limit - 1, resetAt: newEntry.resetAt };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
```

```typescript
// In your API route — apply before calling the model
export async function POST(req: NextRequest) {
  // Rate limit by IP for unauthenticated tools
  const ip = req.headers.get('x-forwarded-for') ?? req.ip ?? 'unknown';

  const { allowed, remaining, resetAt } = checkRateLimit(
    `chat:${ip}`,
    20,          // 20 requests
    60 * 1000,   // per minute
  );

  if (!allowed) {
    return new Response('Rate limit exceeded', {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
        'X-RateLimit-Remaining': '0',
      },
    });
  }

  // ... rest of handler
}
```

**Rate limit tiers for personal AI tools:**

| Limit | Window | Purpose |
|---|---|---|
| 20 requests | 1 minute | Burst protection |
| 100 requests | 1 hour | Sustained usage cap |
| 500 requests | 1 day | Daily budget protection |

Stack these three limits. The first stops abuse bursts. The second prevents runaway sessions. The third protects your monthly bill.

---

## Input Sanitisation

Never pass raw user input directly to the model without validation. Two concerns: size limits and injection.

```typescript
// lib/sanitise.ts

const MAX_USER_MESSAGE_LENGTH = 10_000;  // ~7,500 tokens — generous but bounded
const MAX_MESSAGES_IN_HISTORY = 20;

export function sanitiseMessages(
  messages: unknown[]
): Anthropic.MessageParam[] {
  if (!Array.isArray(messages)) throw new Error('Invalid messages');

  return messages
    .slice(-MAX_MESSAGES_IN_HISTORY)
    .filter((m): m is { role: string; content: string } =>
      typeof m === 'object' && m !== null &&
      'role' in m && 'content' in m &&
      typeof (m as any).content === 'string'
    )
    .map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user', // whitelist roles
      content: m.content.slice(0, MAX_USER_MESSAGE_LENGTH).trim(),
    }));
}
```

**What to validate:**
- Message array is actually an array
- Each message has `role` and `content`
- Roles are whitelisted to `user` and `assistant` only
- Content length is bounded
- History depth is bounded

---

## Conversation Persistence

For tools where conversation history should survive page refresh:

```typescript
// Simple file-based storage for personal projects (single user)
// Use a database for multi-user or production tools

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const STORAGE_PATH = join(process.cwd(), '.chat-history.json');

export function loadConversation(sessionId: string): Message[] {
  if (!existsSync(STORAGE_PATH)) return [];
  try {
    const data = JSON.parse(readFileSync(STORAGE_PATH, 'utf-8'));
    return data[sessionId] ?? [];
  } catch {
    return [];
  }
}

export function saveConversation(sessionId: string, messages: Message[]): void {
  let data: Record<string, Message[]> = {};
  if (existsSync(STORAGE_PATH)) {
    try { data = JSON.parse(readFileSync(STORAGE_PATH, 'utf-8')); } catch {}
  }
  data[sessionId] = messages.slice(-50); // cap stored history
  writeFileSync(STORAGE_PATH, JSON.stringify(data, null, 2));
}
```

For personal tools used by one or few people, file-based storage is perfectly adequate. For anything beyond that, use Postgres or SQLite via Prisma.

---

## Handling Different Request Types

AI tools often need more than one endpoint. Structure your API surface clearly.

```
/api/chat          → streaming conversation
/api/summarise     → single-shot input → output (non-streaming acceptable)
/api/extract       → structured output via tool use
/api/upload        → document ingestion, chunking, embedding
/api/health        → uptime check
```

```typescript
// Non-streaming for structured extraction
// app/api/extract/route.ts
export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const response = await anthropic.messages.create({
    model: 'kontxt-haiku-4-5',   // cheaper model for extraction tasks
    system: 'Extract structured information from the provided text.',
    messages: [{ role: 'user', content: text }],
    tools: [/* your extraction tool definition */],
    tool_choice: { type: 'tool', name: 'extract_info' },
    max_tokens: 500,
  });

  const toolUse = response.content.find(b => b.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    return Response.json({ error: 'Extraction failed' }, { status: 500 });
  }

  return Response.json({ data: toolUse.input });
}
```

Use streaming for chat-pattern interactions. Use regular async calls for structured extraction and background processing. Don't stream what doesn't benefit from streaming.

---

## Environment Variables

```bash
# .env.local (never committed to git)
ANTHROPIC_API_KEY=sk-ant-...
AI_MODEL=kontxt-sonnet-4-6

# Optional
MAX_TOKENS=1024
RATE_LIMIT_PER_MINUTE=20
```

```typescript
// lib/env.ts — validate at startup, fail loudly
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

export const env = {
  anthropicApiKey: requireEnv('ANTHROPIC_API_KEY'),
  aiModel: process.env.AI_MODEL ?? 'kontxt-sonnet-4-6',
  maxTokens: parseInt(process.env.MAX_TOKENS ?? '1024', 10),
};
```

Validate environment variables at startup — not at request time. A missing API key caught at startup is a clear error message. A missing API key caught on the first user request is a confusing runtime failure.

---

## Error Handling Patterns

```typescript
// Classify errors to return appropriate responses to the client
function handleApiError(error: unknown): Response {
  if (error instanceof Anthropic.APIError) {
    switch (error.status) {
      case 401:
        // API key is wrong — this is a config problem, not a user problem
        console.error('Invalid Anthropic API key');
        return new Response('Service configuration error', { status: 503 });

      case 429:
        // Rate limited by Anthropic — back off and retry
        return new Response('Service is busy, please try again shortly', {
          status: 503,
          headers: { 'Retry-After': '10' },
        });

      case 529:
        // Anthropic overloaded
        return new Response('AI service temporarily unavailable', { status: 503 });

      default:
        return new Response('AI service error', { status: 502 });
    }
  }

  if (error instanceof Error && error.message.includes('timeout')) {
    return new Response('Request timed out', { status: 504 });
  }

  console.error('Unexpected error:', error);
  return new Response('Internal server error', { status: 500 });
}
```

Map Anthropic error codes to user-appropriate HTTP responses. Never expose raw Anthropic error messages to clients — they contain API internals.

---

## Request Timeout

Long-running model calls can hang. Set a timeout to fail gracefully.

```typescript
// Wrap the streaming call with an abort timeout
export async function POST(req: NextRequest) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30_000); // 30 second timeout

  try {
    const anthropicStream = anthropic.messages.stream(
      { model: MODEL, system: SYSTEM_PROMPT, messages, max_tokens: 1024 },
      { signal: controller.signal }
    );

    // ... stream handling
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return new Response('Request timed out', { status: 504 });
    }
    return handleApiError(error);
  } finally {
    clearTimeout(timeoutId);
  }
}
```

---

## Implementation Checklist

### Core API

- [ ] API key stored in server environment variable — never sent to client
- [ ] Chat endpoint streams via SSE (Server-Sent Events)
- [ ] Request body validated before calling the model
- [ ] Message roles whitelisted to `user` and `assistant`
- [ ] Message history depth bounded (e.g. last 20 messages)
- [ ] User message length bounded (e.g. 10,000 chars)

### Rate Limiting

- [ ] Rate limiting applied before any model call
- [ ] Rate limit key uses IP (or user ID if authenticated)
- [ ] 429 response includes `Retry-After` header
- [ ] At least two limit tiers: per-minute and per-hour or per-day

### Error Handling

- [ ] Anthropic API errors caught and mapped to appropriate HTTP status codes
- [ ] Request timeout implemented (30 seconds is a reasonable default)
- [ ] Raw API error messages never returned to the client
- [ ] Errors logged server-side with enough context to debug

### Streaming

- [ ] SSE `Content-Type: text/event-stream` header set
- [ ] `Cache-Control: no-cache` set (prevents caching of stream)
- [ ] `X-Accel-Buffering: no` set (prevents Nginx from buffering)
- [ ] `[DONE]` signal sent at end of stream
- [ ] Error signal (`[ERROR]`) sent if stream fails mid-generation

---

## Common Mistakes

> ** Calling the model API from the client**
> Your API key in the frontend means any user can open DevTools, steal it, and use it freely. The model API is always called from your backend. No exceptions.

> ** No rate limiting**
> A tool without rate limiting is an open bill. One curious user or a bot can run thousands of calls before you notice. Add rate limiting before the first real user touches your tool.

> ** Not validating message history from the client**
> If you trust the client to send conversation history, a malicious user can inject arbitrary `assistant` messages to manipulate model behaviour. Validate structure and whitelist roles server-side.

> ** Returning Anthropic error details to the client**
> Error messages from Anthropic can include your account tier, model names, and internal details. Map them to generic client-safe messages and log the full error server-side.

> ** No timeout on model calls**
> Model calls occasionally hang — network issues, model overload, edge cases in streaming. Without a timeout, these requests hold open connections indefinitely. Always abort after a sensible threshold.

---

## What's Next

Your backend securely proxies model requests, applies rate limiting, and streams responses to the client. Before moving on:

- Verify the API key is not present in any client-side bundle (check with DevTools → Network)
- Trigger the rate limit intentionally and confirm the 429 response is correct
- Test the error handler by temporarily setting an invalid API key
- Measure the time to first token under normal conditions — target under 1.5 seconds

Next up: **AI Integration**
