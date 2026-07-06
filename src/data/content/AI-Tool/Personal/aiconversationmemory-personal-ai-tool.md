---
title: Conversation Memory
slug: conversation-memory
phase: Phase 2
mode: personal
projectType: ai-tool
estimatedTime: 20–35 min
---

# Conversation Memory

AI models are stateless. Every API call starts with a blank slate. The model has no memory of what was said before unless you explicitly send it.

Conversation memory is how you bridge that gap — how you make your AI tool feel like it remembers, understands context, and builds on what came before instead of starting over every turn.

Getting this right has real consequences: cost, coherence, and the quality of multi-turn interactions all depend on how you handle memory.

---

## Why Memory Is an Engineering Problem

When a user asks "can you make that shorter?" — the model needs to know what "that" refers to. When a user says "like you suggested earlier" — the model needs access to what it suggested.

Without explicit memory management, every message is an orphan. With naive memory management (send everything always), you burn through context windows and money.

The design challenge: **send the right context, not all context.**

---

## The Four Memory Patterns

### Pattern 1 — Full Conversation History

Send every message from the current session on every API call.

```typescript
// Store conversation in state or database
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

let conversationHistory: Message[] = [];

async function chat(userMessage: string): Promise<string> {
  conversationHistory.push({ role: 'user', content: userMessage });

  const response = await anthropic.messages.create({
    model: MODEL,
    system: systemPrompt,
    messages: conversationHistory,   // send everything
    max_tokens: 1024,
  });

  const assistantMessage = response.content[0].text;
  conversationHistory.push({ role: 'assistant', content: assistantMessage });

  return assistantMessage;
}
```

**When to use:** Short sessions (< 10 messages), single-session tools, when full context is genuinely needed.

**The problem:** Each message adds tokens to every subsequent call. A 20-turn conversation where each turn averages 300 tokens means your 20th call sends 6,000 tokens of history before the user even types their question.

---

### Pattern 2 — Sliding Window

Keep only the last N messages. Older context is dropped.

```typescript
const MAX_HISTORY_MESSAGES = 10; // keep last 5 exchanges

async function chat(userMessage: string): Promise<string> {
  conversationHistory.push({ role: 'user', content: userMessage });

  // Trim to window — always keep an even number (user/assistant pairs)
  const windowedHistory = conversationHistory.slice(-MAX_HISTORY_MESSAGES);

  const response = await anthropic.messages.create({
    model: MODEL,
    system: systemPrompt,
    messages: windowedHistory,
    max_tokens: 1024,
  });

  const assistantMessage = response.content[0].text;
  conversationHistory.push({ role: 'assistant', content: assistantMessage });

  return assistantMessage;
}
```

**When to use:** Most personal AI tools. Keeps cost predictable. Works well when recent context matters more than distant context (chat assistants, writing tools, Q&A).

**The tradeoff:** The model loses access to things said early in the conversation. For most tools, this is acceptable — users expect AI to forget things from an hour ago.

---

### Pattern 3 — Summarised Memory

Periodically compress old conversation history into a summary, then carry the summary forward.

```typescript
async function summariseHistory(messages: Message[]): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'kontxt-haiku-4-5',   // cheap model for summarisation
    system: 'Summarise the key facts, decisions, and context from this conversation in under 200 words. Be factual and concise.',
    messages: [{ role: 'user', content: JSON.stringify(messages) }],
    max_tokens: 300,
  });
  return response.content[0].text;
}

// Trigger summarisation when history gets long
async function chat(userMessage: string): Promise<string> {
  conversationHistory.push({ role: 'user', content: userMessage });

  // If history exceeds threshold, compress older messages
  if (conversationHistory.length > 20) {
    const oldMessages = conversationHistory.slice(0, -6); // all but last 3 exchanges
    const recentMessages = conversationHistory.slice(-6);

    const summary = await summariseHistory(oldMessages);

    // Replace old history with summary injected into system prompt
    systemContext = `${baseSystemPrompt}\n\nConversation so far:\n${summary}`;
    conversationHistory = recentMessages;
  }

  const response = await anthropic.messages.create({
    model: MODEL,
    system: systemContext,
    messages: conversationHistory,
    max_tokens: 1024,
  });

  const assistantMessage = response.content[0].text;
  conversationHistory.push({ role: 'assistant', content: assistantMessage });

  return assistantMessage;
}
```

**When to use:** Long-running sessions where early context genuinely matters (research assistants, project-aware tools, coaching tools).

**The tradeoff:** Two API calls when summarisation triggers. Summaries lose nuance. Worth it for tools where long-term context is a feature.

---

### Pattern 4 — Persistent Cross-Session Memory

Store facts about the user across sessions in a database. Inject relevant facts into the system prompt at the start of each new session.

```typescript
interface UserMemory {
  userId: string;
  facts: string[];           // "Prefers bullet points over prose"
  preferences: Record<string, string>;  // { tone: "formal", language: "en" }
  lastContext: string;       // summary of last session
}

async function buildSystemPromptWithMemory(userId: string): Promise<string> {
  const memory = await db.userMemory.findUnique({ where: { userId } });

  if (!memory) return baseSystemPrompt;

  return `
${baseSystemPrompt}

User context from previous sessions:
${memory.facts.map(f => `- ${f}`).join('\n')}

Last session summary:
${memory.lastContext}
  `.trim();
}

// At end of session — extract and store memorable facts
async function extractAndStoreMemory(userId: string, conversation: Message[]) {
  const response = await anthropic.messages.create({
    model: 'kontxt-haiku-4-5',
    system: `Extract any facts about this user worth remembering for future sessions.
Focus on: preferences, goals, constraints, important context.
Return a JSON array of short fact strings. Maximum 5 facts.
If nothing is worth remembering, return an empty array.
Return only the JSON array.`,
    messages: [{ role: 'user', content: JSON.stringify(conversation) }],
    max_tokens: 200,
  });

  const facts = JSON.parse(response.content[0].text);
  await db.userMemory.upsert({
    where: { userId },
    create: { userId, facts, lastContext: await summariseHistory(conversation) },
    update: { facts: { push: facts }, lastContext: await summariseHistory(conversation) },
  });
}
```

**When to use:** Tools where personalisation across sessions is a core value proposition (personal assistants, habit tracking, coaching, ongoing project work).

**The tradeoff:** Requires a database. Privacy implications — you're storing user data. Must give users a way to view and delete their memory.

---

## Choosing the Right Pattern

```
Does your tool need memory across multiple separate sessions?
  Yes → Pattern 4 (Persistent Memory)
  No  → Continue

Will conversations typically exceed 15–20 messages?
  Yes → Pattern 3 (Summarised Memory)
  No  → Continue

Does the full conversation history ever become a cost concern?
  Yes → Pattern 2 (Sliding Window)
  No  → Pattern 1 (Full History) is fine
```

**For most personal AI tools: Pattern 2 (sliding window of 8–12 messages) is the right default.** It's simple, predictable, and covers the vast majority of real usage.

---

## Context Window Budgeting

Before choosing a window size, understand your token budget.

```
Kontxt Sonnet context window: 200,000 tokens
Your system prompt:           ~500 tokens
Each conversation turn:       ~300 tokens average (both sides)

Available for history: 200,000 - 500 = 199,500 tokens
Max turns before limit: 199,500 / 300 ≈ 665 turns

Cost of 20-turn history per call:
  20 turns × 300 tokens = 6,000 tokens of history
  At $3/1M tokens = $0.018 per call just for history
  At 100 calls/day = $1.80/day in history tokens alone
```

Token costs from conversation history compound fast at scale. Size your window to what your UX actually needs, not the maximum the model supports.

---

## Storing Conversation History

For single-session tools (the user refreshes, history resets), client-side state is fine:

```typescript
// React — in-memory, resets on page refresh
const [messages, setMessages] = useState<Message[]>([]);
```

For tools where history must persist across page refreshes or sessions:

```typescript
// Option 1: localStorage (simple, single device)
const loadHistory = () => JSON.parse(localStorage.getItem('chat_history') ?? '[]');
const saveHistory = (messages: Message[]) =>
  localStorage.setItem('chat_history', JSON.stringify(messages));

// Option 2: Database (multi-device, shareable, required for user accounts)
await db.conversation.create({
  data: {
    userId,
    messages: conversationHistory,
    startedAt: new Date(),
  },
});
```

**Choose based on your tool's needs:**
- Ephemeral scratchpad tool → in-memory or localStorage
- Tool with user accounts → database
- Tool with sharing features → database, definitely

---

## Message Format Gotchas

The Anthropic API requires messages to alternate strictly between `user` and `assistant`. A sequence like `user → user` will error.

```typescript
//  Will throw an API error
messages: [
  { role: 'user', content: 'Hello' },
  { role: 'user', content: 'Are you there?' },
]

//  Must alternate
messages: [
  { role: 'user', content: 'Hello' },
  { role: 'assistant', content: 'Hi! How can I help?' },
  { role: 'user', content: 'Are you there?' },
]
```

If a user sends multiple messages before the assistant responds (rapid-fire input), merge them:

```typescript
function mergeConsecutiveUserMessages(messages: Message[]): Message[] {
  return messages.reduce((acc, msg) => {
    const last = acc[acc.length - 1];
    if (last && last.role === 'user' && msg.role === 'user') {
      last.content += '\n\n' + msg.content; // merge
    } else {
      acc.push({ ...msg });
    }
    return acc;
  }, [] as Message[]);
}
```

---

## AI Prompt — Memory Architecture Review

```prompt
You are a senior AI engineer reviewing the conversation memory architecture for a personal AI tool.

My tool:
[Describe what your AI tool does]

Expected conversation length:
[Average number of turns per session]

Session behaviour:
[Does the user start a fresh session each time, or continue across days/weeks?]

My chosen memory pattern:
[Full history / sliding window / summarised / persistent — and your window size or approach]

Please:
1. Tell me whether my chosen pattern fits my use case or if a different one would serve users better
2. Estimate my token cost for history at 50 conversations/day with my pattern
3. Identify one edge case in my memory approach that could cause confusing AI behaviour
4. Tell me if I need a database for my memory approach or if client state is sufficient
5. Suggest what the model should do when the user references something outside the memory window

Be specific and practical.
```

---

## Implementation Checklist

### History Management

- [ ] Memory pattern chosen based on session length and cross-session needs
- [ ] Message history stored in the right place (memory / localStorage / database)
- [ ] Messages always alternate `user` / `assistant` — consecutive same-role messages handled
- [ ] Window size or summarisation threshold defined and tested

### Token Management

- [ ] System prompt token count estimated
- [ ] History token cost calculated at expected daily volume
- [ ] `max_tokens` for completions set appropriately
- [ ] Total tokens per call stays within model context limit with buffer

### Persistence (if needed)

- [ ] Conversation stored in database with userId and timestamp
- [ ] History loads correctly on page refresh or new session
- [ ] Old conversations retrievable (if that's a feature)
- [ ] User can clear or reset their conversation history

### Cross-Session Memory (if applicable)

- [ ] User facts extracted and stored at end of session
- [ ] Memory injected into system prompt at session start
- [ ] User can view what's been remembered
- [ ] User can delete their stored memory

---

## Common Mistakes

> ** Sending the full history forever without a limit**
> Token costs compound. A 50-turn conversation means turn 50 sends 49 turns of history. At 100 calls/day, this gets expensive fast. Set a window.

> ** Storing messages with the same role consecutively**
> The API will throw a validation error. Guard against this in your message-building logic, especially if users can send multiple messages before an assistant responds.

> ** Conflating conversation history with persistent memory**
> History is what was said this session. Memory is what's worth knowing next session. They're different data structures with different lifetimes. Don't store this session's full transcript as "memory."

> ** No way for users to reset their history**
> Users will say something they regret, run into a confused AI, or just want a fresh start. Always provide a "Clear conversation" option. For persistent memory, provide a "Forget everything" option.

> ** Summarising too aggressively**
> Summaries lose nuance. If you summarise a technical conversation into "user asked about API design," the model loses the specific decisions and constraints discussed. Test your summarisation quality on real conversations before relying on it.

---

## What's Next

Memory architecture is decided and implemented. Before moving on:

- Run a 15+ turn test conversation and verify context is maintained correctly
- Check that your token costs at the window size you've chosen are acceptable
- Verify the alternating message role constraint is enforced

Next up: **Structured Outputs**
