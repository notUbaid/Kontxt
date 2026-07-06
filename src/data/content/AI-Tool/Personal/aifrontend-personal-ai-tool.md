---
title: Frontend
slug: frontend
phase: Phase 3
mode: personal
projectType: ai-tool
estimatedTime: 25–40 min
---

# Frontend

The frontend of an AI tool is not just a UI — it's the interface between human intent and machine response. It sets expectations, manages uncertainty, and shapes whether the experience feels like magic or machinery.

AI tools have unique frontend challenges that standard web apps don't: streaming responses, loading states that span seconds, error recovery, and the fundamental UX problem of helping users know *what to ask* when the interface is a blank input.

---

## AI Tool UI Patterns

Before writing components, understand the three dominant interaction patterns for AI tools. Your tool fits one of them.

### Pattern 1 — Chat Interface

Turn-based conversation. The user types, the AI responds. History accumulates.

```
Best for: assistants, Q&A tools, tutors, writing collaborators
Examples: ChatGPT, Kontxt.ai, customer support bots
Key challenges: streaming, history management, empty state
```

### Pattern 2 — Input → Output (Transformer)

Single-shot transformation. User provides input, AI processes it, result appears.

```
Best for: summarisers, translators, classifiers, formatters, extractors
Examples: document summariser, code explainer, tone rewriter
Key challenges: loading state, result comparison, re-run / iterate
```

### Pattern 3 — Ambient / Augmented

AI enhances an existing workflow without dominating the UI. Suggestions appear inline, actions are triggered contextually.

```
Best for: writing tools, code editors, research aids
Examples: Grammarly-style suggestions, inline completions, sidebar assistants
Key challenges: non-intrusive UI, contextual triggering, avoiding interruption
```

Identify your pattern before building. It determines your component structure, state management approach, and the UX challenges you'll face.

---

## The Core Components

### Message List

The central display of any chat-pattern AI tool.

```tsx
// components/MessageList.tsx
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  timestamp: Date;
}

export function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 && <EmptyState />}
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`message message--${message.role}`}>
      <div className="message__avatar">
        {message.role === 'user' ? <UserAvatar /> : <AIAvatar />}
      </div>
      <div className="message__content">
        {/* Render markdown if the model returns it */}
        <MarkdownRenderer content={message.content} />
        {message.isStreaming && <StreamingCursor />}
      </div>
    </div>
  );
}
```

### Streaming Cursor

The blinking cursor during streaming is a subtle but critical UX signal. It tells users the model is actively generating — not frozen.

```tsx
// components/StreamingCursor.tsx
export function StreamingCursor() {
  return <span className="streaming-cursor" aria-hidden="true">▋</span>;
}
```

```css
/* Blink animation */
.streaming-cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
  color: var(--color-accent);
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
```

### Input Area

```tsx
// components/ChatInput.tsx
interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ onSubmit, isLoading, placeholder }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`; // max 200px
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue('');
    // Reset height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    // Shift+Enter inserts a newline — expected behaviour
  };

  return (
    <div className="chat-input">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? 'Ask anything…'}
        disabled={isLoading}
        rows={1}
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
        aria-label="Send message"
      >
        {isLoading ? <LoadingSpinner size="sm" /> : <SendIcon />}
      </button>
    </div>
  );
}
```

**UX rules for the input:**
- `Enter` submits. `Shift+Enter` inserts a newline. This is the universal convention.
- Disable the send button and input when the model is generating. Prevent double-sends.
- Auto-resize the textarea — don't cap it at one line, but don't let it grow unbounded either.
- Focus the input automatically on page load and after each response.

---

## Streaming Responses

Streaming is what makes AI tools feel fast. The first token appears in under a second. Without streaming, users stare at a spinner for 5–10 seconds and assume something is broken.

```typescript
// hooks/useChat.ts
import { useState, useCallback } from 'react';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Placeholder for the streaming assistant message
    const assistantId = crypto.randomUUID();
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      isStreaming: true,
      timestamp: new Date(),
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Request failed');
      if (!response.body) throw new Error('No response body');

      // Read the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Parse SSE chunks — each line is "data: <text>"
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
        for (const line of lines) {
          const text = line.replace('data: ', '');
          if (text === '[DONE]') break;

          // Append to the streaming message
          setMessages(prev => prev.map(msg =>
            msg.id === assistantId
              ? { ...msg, content: msg.content + text }
              : msg
          ));
        }
      }

      // Mark streaming complete
      setMessages(prev => prev.map(msg =>
        msg.id === assistantId ? { ...msg, isStreaming: false } : msg
      ));

    } catch (err) {
      setError('Something went wrong. Please try again.');
      // Remove the empty assistant message on failure
      setMessages(prev => prev.filter(msg => msg.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, sendMessage, isLoading, error };
}
```

---

## The Empty State

The empty state is the first thing a new user sees. It's your onboarding moment. Don't waste it on a blank input field.

```tsx
// components/EmptyState.tsx
const SUGGESTED_PROMPTS = [
  'Summarise the key points from my document',
  'What are the most important deadlines mentioned?',
  'Explain the auto-renewal clause in plain English',
  'Flag anything I should review before signing',
];

export function EmptyState() {
  const { sendMessage } = useChat();

  return (
    <div className="empty-state">
      <AIIcon size={48} />
      <h2>Ask anything about your document</h2>
      <p>I'll answer questions, summarise sections, and flag important clauses.</p>

      <div className="suggested-prompts">
        {SUGGESTED_PROMPTS.map(prompt => (
          <button
            key={prompt}
            className="suggested-prompt"
            onClick={() => sendMessage(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
```

Suggested prompts do three things: demonstrate capability, lower the barrier to first interaction, and show users how to phrase effective queries. Always include them.

---

## Loading and Error States

### Loading States

Different loading states signal different things to the user.

```tsx
// While waiting for first token — model is thinking
function ThinkingIndicator() {
  return (
    <div className="thinking-indicator" aria-label="AI is thinking">
      <span className="dot" style={{ animationDelay: '0ms' }} />
      <span className="dot" style={{ animationDelay: '150ms' }} />
      <span className="dot" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

// Show the thinking indicator from submission until first token arrives
// Switch to streaming cursor once content starts appearing
```

```tsx
// For input→output tools — progress indication
function ProcessingState({ stage }: { stage: 'analysing' | 'generating' | 'formatting' }) {
  const labels = {
    analysing: 'Analysing your document…',
    generating: 'Generating response…',
    formatting: 'Formatting output…',
  };

  return (
    <div className="processing-state">
      <LoadingSpinner />
      <p>{labels[stage]}</p>
    </div>
  );
}
```

### Error States

```tsx
function ErrorMessage({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="error-message" role="alert">
      <ErrorIcon />
      <p>{error}</p>
      <button onClick={onRetry}>Try again</button>
    </div>
  );
}
```

**Error messages for AI tools:**

| Error | User-facing message |
|---|---|
| API timeout | "This is taking longer than expected. Try again." |
| Rate limit | "You've sent a lot of messages. Wait a moment and try again." |
| Model error | "Something went wrong on our end. Please try again." |
| Network error | "Check your connection and try again." |
| Context too long | "Your input is too long. Try a shorter message or upload a smaller document." |

Never show raw API error messages. They're meaningless to users and may expose internal details.

---

## Markdown Rendering

Models return markdown. Your UI needs to render it.

```tsx
// Install: npm install react-markdown remark-gfm
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}   // tables, strikethrough, task lists
      components={{
        // Style code blocks
        code({ node, inline, className, children, ...props }) {
          return inline
            ? <code className="inline-code" {...props}>{children}</code>
            : <pre className="code-block"><code {...props}>{children}</code></pre>;
        },
        // Open links in new tab
        a({ href, children }) {
          return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

---

## Copy and Action Buttons

Users want to do something with AI output. Make it easy.

```tsx
function AssistantMessage({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="assistant-message">
      <MarkdownRenderer content={content} />
      <div className="message-actions">
        <button onClick={copy} className="action-btn" title="Copy response">
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        {/* Add tool-specific actions: Regenerate, Insert, Export */}
      </div>
    </div>
  );
}
```

Standard actions to include based on tool type:

| Tool type | Actions |
|---|---|
| Chat assistant | Copy, Regenerate |
| Document summariser | Copy, Export as PDF, Insert |
| Code tool | Copy code, Run, Explain |
| Writing assistant | Insert, Replace selection, Discard |

---

## Implementation Checklist

### Core Components

- [ ] Message list with auto-scroll to bottom
- [ ] User and assistant message bubbles visually distinct
- [ ] Streaming cursor visible during generation
- [ ] Input auto-resizes, Enter submits, Shift+Enter newlines
- [ ] Input disabled while model is generating

### Streaming

- [ ] First token appears within 1–2 seconds of submission
- [ ] Text appends smoothly — no layout jump on each chunk
- [ ] Streaming cursor disappears when generation completes
- [ ] Thinking indicator shown before first token arrives

### Empty and Error States

- [ ] Empty state shows suggested prompts (not a blank input)
- [ ] Loading state appropriate to tool type (streaming cursor vs progress indicator)
- [ ] Error messages are user-friendly — no raw API errors shown
- [ ] Retry button available on error
- [ ] Rate limit errors handled gracefully with appropriate messaging

### Output

- [ ] Markdown rendered (not displayed as raw text)
- [ ] Code blocks styled and copyable
- [ ] Copy button on assistant messages
- [ ] Links open in a new tab

---

## Common Mistakes

> ** No streaming — waiting for full response before rendering**
> A 5-second blank screen followed by a wall of text feels broken. Streaming makes the same generation feel responsive. Always stream.

> ** Allowing message submission during generation**
> If the user can send another message while the model is still responding, your conversation history gets corrupted. Disable the input until generation completes.

> ** Blank empty state**
> An empty input with placeholder text "Ask me anything" gives users nothing to work with. Suggested prompts are the single highest-ROI UX improvement for AI tools.

> ** Rendering markdown as plain text**
> The model will return `**bold**`, `## headers`, and ` ```code``` `. If you render this as plain text, your UI looks broken. Always use a markdown renderer.

> ** Generic error messages**
> "An error occurred" is useless. Match the error to a helpful message and always offer a path forward (retry, adjust input, contact support).

---

## What's Next

Your frontend renders messages, handles streaming, and presents a polished empty state. Before moving on:

- Streaming tested with a real API call — first token visible within 2 seconds
- Error states tested by intentionally breaking the API endpoint
- Suggested prompts tested — clicking one populates and submits the input
- Mobile layout verified — input doesn't get obscured by the keyboard

Next up: **Backend**
