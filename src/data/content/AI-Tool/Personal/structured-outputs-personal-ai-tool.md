---
title: Structured Outputs
slug: structured-outputs
phase: Phase 2
mode: personal
projectType: ai-tool
estimatedTime: 20–30 min
---

# Structured Outputs

When your AI tool needs to do something with the model's response — render a specific UI component, store data in a database, pass output to another function — you need structured outputs.

Plain text responses are fine for chat. The moment your code needs to parse, transform, or act on what the model returns, you need a contract. Structured outputs are that contract.

---

## The Problem With Unstructured Responses

```typescript
// You ask the model to extract data
const response = "The contract expires on March 15, 2025, and includes an auto-renewal clause.";

// Now what?
// You're forced to parse natural language — fragile, unpredictable, breaks on variations
const date = response.match(/\w+ \d+, \d{4}/)?.[0]; // maybe works, maybe doesn't
```

When the model returns structured data in a guaranteed shape, your code becomes simple and reliable:

```typescript
// Structured output
const result = { expiryDate: "2025-03-15", hasAutoRenewal: true };

// Clean, typed, predictable
if (result.hasAutoRenewal) showRenewalWarning(result.expiryDate);
```

---

## Three Methods, Increasing Reliability

### Method 1 — Prompt-Only JSON

Ask the model to return JSON. Simplest, least reliable.

```typescript
const systemPrompt = `
Extract information from the text and return a JSON object with this exact structure:
{
  "expiry_date": "YYYY-MM-DD or null",
  "has_auto_renewal": true | false,
  "notice_period_days": number | null
}

Return only the JSON. No markdown fences. No explanation.
`;

const response = await anthropic.messages.create({
  model: MODEL,
  system: systemPrompt,
  messages: [{ role: 'user', content: contractClause }],
  max_tokens: 200,
});

// Still need to handle parse failures
try {
  const data = JSON.parse(response.content[0].text);
} catch {
  // Model returned something that isn't valid JSON — handle this
}
```

**When to use:** Low-stakes extraction where occasional parse failures are acceptable. Simple schemas with minimal nesting.

**Failure modes:** Model wraps JSON in markdown fences. Model adds explanation before or after. Model returns slightly different key names. Model hallucinates fields.

---

### Method 2 — Tool Use (Recommended)

Force the model to call a tool with a defined schema. The API guarantees the output matches the schema — no parsing errors.

```typescript
const response = await anthropic.messages.create({
  model: MODEL,
  system: 'Extract contract information from the provided clause.',
  messages: [{ role: 'user', content: contractClause }],
  tools: [{
    name: 'extract_contract_info',
    description: 'Extract structured information from a contract clause',
    input_schema: {
      type: 'object' as const,
      properties: {
        expiry_date: {
          type: 'string',
          description: 'Contract expiry date in YYYY-MM-DD format, or null if not specified',
        },
        has_auto_renewal: {
          type: 'boolean',
          description: 'Whether the clause contains an auto-renewal provision',
        },
        notice_period_days: {
          type: 'number',
          description: 'Notice period in days required to cancel, or null if not specified',
        },
      },
      required: ['has_auto_renewal'],
    },
  }],
  tool_choice: { type: 'tool', name: 'extract_contract_info' },
  max_tokens: 500,
});

// Extract the tool call result — guaranteed to match the schema
const toolUse = response.content.find(block => block.type === 'tool_use');
if (toolUse && toolUse.type === 'tool_use') {
  const data = toolUse.input; // typed, validated, no JSON.parse needed
  console.log(data.has_auto_renewal); // boolean, guaranteed
}
```

**When to use:** Any time your code depends on the structure of the output. Production tools. Data extraction. Anything that feeds a database or UI component.

**Why it's more reliable:** The model is constrained at the API level. It cannot return free text when tool_choice is forced. The schema is validated before the response reaches your code.

---

### Method 3 — Zod + Validation Layer

Add runtime schema validation on top of either method above. Catches edge cases the model gets subtly wrong.

```typescript
import { z } from 'zod';

const ContractInfoSchema = z.object({
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  has_auto_renewal: z.boolean(),
  notice_period_days: z.number().positive().nullable(),
});

type ContractInfo = z.infer<typeof ContractInfoSchema>;

async function extractContractInfo(clause: string): Promise<ContractInfo> {
  const response = await anthropic.messages.create({ /* tool use call */ });

  const toolUse = response.content.find(b => b.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('Model did not return a tool call');
  }

  // Validate against schema — throws with a clear error if shape is wrong
  const result = ContractInfoSchema.parse(toolUse.input);
  return result;
}
```

Zod validation gives you TypeScript types from the schema automatically (`z.infer<typeof ContractInfoSchema>`), runtime validation with clear error messages, and a single source of truth for the shape of your data.

---

## Common Structured Output Patterns

### Classification

```typescript
const ClassificationSchema = z.object({
  category: z.enum(['billing', 'technical', 'feature_request', 'account', 'other']),
  confidence: z.number().min(0).max(1),
  reasoning: z.string().optional(),
});

// Tool definition
{
  name: 'classify_message',
  input_schema: {
    type: 'object',
    properties: {
      category: {
        type: 'string',
        enum: ['billing', 'technical', 'feature_request', 'account', 'other'],
      },
      confidence: { type: 'number', description: '0.0 to 1.0' },
      reasoning: { type: 'string' },
    },
    required: ['category', 'confidence'],
  },
}
```

### List Extraction

```typescript
const ActionItemsSchema = z.object({
  action_items: z.array(z.object({
    task: z.string(),
    owner: z.string().nullable(),
    due_date: z.string().nullable(),
    priority: z.enum(['high', 'medium', 'low']),
  })),
  summary: z.string(),
});
```

### Sentiment + Entity Extraction

```typescript
const AnalysisSchema = z.object({
  sentiment: z.enum(['positive', 'neutral', 'negative']),
  sentiment_score: z.number().min(-1).max(1),
  entities: z.array(z.object({
    text: z.string(),
    type: z.enum(['person', 'organisation', 'date', 'location', 'product']),
  })),
  key_topics: z.array(z.string()).max(5),
});
```

---

## Handling Nulls and Optional Fields

The model doesn't always have the information to fill every field. Design schemas that accept absence gracefully.

```typescript
//  Fragile — model will hallucinate when information is missing
{
  expiry_date: z.string(), // what does the model return when there's no date?
}

//  Explicit about absence
{
  expiry_date: z.string().nullable(), // null when not found
  has_expiry_date: z.boolean(),       // explicit signal rather than null inference
}
```

In your schema description, always tell the model what to return when a value isn't present:

```typescript
properties: {
  expiry_date: {
    type: ['string', 'null'],
    description: 'Expiry date in YYYY-MM-DD format. Return null if no expiry date is mentioned.',
  },
}
```

---

## Multi-Step Structured Pipelines

Some tasks need multiple model calls, each producing structured output that feeds the next.

```typescript
// Step 1: Classify the document type
const { document_type } = await classifyDocument(text);

// Step 2: Extract type-specific fields based on classification
const extraction = document_type === 'invoice'
  ? await extractInvoiceFields(text)
  : await extractContractFields(text);

// Step 3: Validate completeness
const { is_complete, missing_fields } = await validateExtraction(extraction);

if (!is_complete) {
  // Handle incomplete extraction
}
```

Each step is a focused, single-purpose model call with a small, precise schema. This is more reliable than one large call trying to do everything at once.

**Rule:** If your schema has more than 8–10 fields, consider splitting into multiple calls. Complex schemas increase hallucination risk and reduce reliability.

---

## Error Handling

Even with tool use, things go wrong. The model can refuse, time out, or return unexpected content types.

```typescript
async function safeExtract<T>(
  clause: string,
  schema: z.ZodType<T>,
  toolDefinition: object,
  toolName: string,
): Promise<T | null> {
  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      system: 'Extract the requested information.',
      messages: [{ role: 'user', content: clause }],
      tools: [toolDefinition],
      tool_choice: { type: 'tool', name: toolName },
      max_tokens: 500,
    });

    const toolUse = response.content.find(b => b.type === 'tool_use');
    if (!toolUse || toolUse.type !== 'tool_use') return null;

    return schema.parse(toolUse.input);

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Schema validation failed:', error.flatten());
      return null;
    }
    // API error, network error, etc.
    console.error('Extraction failed:', error);
    return null;
  }
}
```

Always decide what your tool does when extraction returns `null`. Show an error? Fall back to free text? Ask the user to rephrase? Define the failure path before it happens in production.

---

## AI Prompt — Schema Design Review

```prompt
You are a senior AI engineer reviewing a structured output schema for an AI tool.

My tool:
[Describe what your AI tool does and what it needs to extract or generate]

My current schema:
[Paste your Zod schema or JSON Schema definition]

Sample inputs my tool will process:
[Give 3 realistic examples]

Please:
1. Identify any fields where the model is likely to hallucinate or return inconsistent values
2. Flag any required fields that should be nullable given realistic inputs
3. Suggest a better type or enum for any fields that are currently too open-ended
4. Tell me if my schema is too complex for a single call — and if so, how to split it
5. Write one edge case input that would likely break my current schema

Be specific — reference the actual fields I've defined.
```

---

## Implementation Checklist

### Schema Design

- [ ] Schema defined with Zod (or equivalent) for runtime validation
- [ ] All fields that might be absent are nullable or optional
- [ ] Enum values defined for categorical fields — no open-ended strings where avoidable
- [ ] Schema description explains what to return when information is missing
- [ ] Schema has fewer than 10 fields — or split into multiple calls if larger

### API Integration

- [ ] Tool use (`tool_choice: { type: 'tool', name: '...' }`) used for any output that code depends on
- [ ] Tool `description` field explains what the tool does
- [ ] Each field's `description` in the schema explains format and null behaviour
- [ ] `max_tokens` set high enough for the schema to be fully populated

### Validation and Error Handling

- [ ] Zod (or equivalent) validates the model's output before use
- [ ] `null` return handled gracefully — failure path defined in UI and logic
- [ ] API errors caught and handled separately from validation errors
- [ ] Logging captures schema validation failures for debugging

---

## Common Mistakes

> ** Using prompt-only JSON for anything your code parses**
> The model will occasionally wrap JSON in markdown fences, add a preamble, or return slightly wrong key names. For anything your code depends on, use tool use. It's not optional.

> ** Making every field required**
> Real-world inputs are incomplete. A contract clause might not mention an expiry date. A support ticket might not reference an account number. Required fields the model can't fill get hallucinated. Make fields nullable and explicit about absence.

> ** One massive schema for everything**
> A 20-field schema that covers every possible case is a hallucination farm. Split complex extractions into focused sequential calls. Each call should have one clear purpose.

> ** Not handling null returns in the UI**
> When extraction fails, something must happen. "undefined is not a property" in production is a bad user experience. Define the failure state before you ship.

> ** Schema and prompt out of sync**
> Your tool description says "extract invoice line items" but your schema has no `line_items` field. The model will either confuse itself or ignore the mismatch. Keep schema and prompt descriptions tightly aligned.

---

## What's Next

Structured outputs are implemented with tool use and Zod validation. Before moving on:

- Test your schema against 5+ realistic inputs including edge cases (missing data, ambiguous text)
- Verify your null handling — what does the user see when extraction returns nothing?
- Confirm schema validation errors are being logged somewhere you can inspect them

Next up: **Retrieval Pipeline**
