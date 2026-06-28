---
title: Error Handling
slug: error-handling
phase: Phase 4
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Error Handling

Most applications don't fail because of missing features. They fail because errors were ignored, swallowed silently, or exposed raw to users and logs.

Error handling is how your application communicates failure — to users, to your team, and to your future self at 2am during an incident.

---

## Why This Matters More Than You Think

Bad error handling creates four real problems:

| Problem | What It Looks Like |
|---|---|
| Silent failures | Request fails, nothing happens, user confused |
| Leaked internals | Stack traces, DB errors, or secrets in API responses |
| Unrecoverable states | App crashes with no fallback UI |
| Debugging nightmares | Errors with no context, no IDs, no trace |

Production-grade error handling solves all four simultaneously.

---

## The Mental Model

Think of errors in three layers:

```
[Client] → [API] → [Database / External Services]
    ↑           ↑               ↑
  UI Errors  API Errors    Operational Errors
```

Each layer must:
1. **Catch** errors at the boundary
2. **Transform** them into safe, structured responses
3. **Log** with enough context to debug
4. **Never leak** internal details to the layer above

---

## Part 1: Backend Error Architecture

### The Error Class Foundation

Don't throw raw strings or generic `Error` objects. Build a hierarchy.

```typescript
// lib/errors.ts

export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, 400, context);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super('AUTHENTICATION_ERROR', message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Access denied') {
    super('AUTHORIZATION_ERROR', message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super('RATE_LIMIT_EXCEEDED', 'Too many requests', 429, { retryAfter });
    this.name = 'RateLimitError';
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, originalError?: unknown) {
    super('EXTERNAL_SERVICE_ERROR', `${service} is temporarily unavailable`, 502, {
      service,
      originalMessage: originalError instanceof Error ? originalError.message : undefined
    });
    this.name = 'ExternalServiceError';
  }
}
```

> **Why a hierarchy?** It lets your global error handler switch on type instead of inspecting strings. It makes `instanceof` checks reliable. It separates operational errors (expected: user not found) from programmer errors (unexpected: null reference crash).

---

### The Global Error Handler

One place handles all errors. Everything else throws.

```typescript
// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../lib/errors';
import { logger } from '../lib/logger';
import { generateRequestId } from '../lib/utils';

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    requestId: string;
    details?: unknown;
  };
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const requestId = (req.headers['x-request-id'] as string) ?? generateRequestId();

  // Known operational errors
  if (err instanceof AppError) {
    logger.warn({
      requestId,
      code: err.code,
      message: err.message,
      statusCode: err.statusCode,
      path: req.path,
      method: req.method,
      context: err.context,
      userId: req.user?.id,
    });

    const response: ErrorResponse = {
      error: {
        code: err.code,
        message: err.message,
        requestId,
        ...(err.context && process.env.NODE_ENV !== 'production'
          ? { details: err.context }
          : {}),
      },
    };

    res.status(err.statusCode).json(response);
    return;
  }

  // Unknown / programmer errors
  logger.error({
    requestId,
    message: err instanceof Error ? err.message : 'Unknown error',
    stack: err instanceof Error ? err.stack : undefined,
    path: req.path,
    method: req.method,
    userId: req.user?.id,
  });

  // Never expose internals in production
  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      requestId,
    },
  });
}
```

> ⚠️ **Critical**: Unknown errors should never return their raw message to the client. A crash caused by a SQL query might expose your schema. A crash in auth logic might expose session internals. Always return a generic 500 message for unexpected errors.

---

### Async Route Wrapper

Express doesn't catch async errors by default. One missed `try/catch` silently hangs the request.

```typescript
// lib/asyncHandler.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
```

```typescript
// Usage in routes
router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) throw new NotFoundError('User');
  res.json(user);
}));
```

---

### Database Error Normalization

Prisma, TypeORM, and raw pg all throw their own error shapes. Normalize them at the service layer before they reach your routes.

```typescript
// lib/dbErrorHandler.ts
import { Prisma } from '@prisma/client';
import { ConflictError, AppError } from './errors';

export function normalizeDatabaseError(err: unknown): never {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        // Unique constraint violation
        const field = (err.meta?.target as string[])?.join(', ') ?? 'field';
        throw new ConflictError(`A record with this ${field} already exists`);
      case 'P2025':
        // Record not found (e.g., update on non-existent record)
        throw new AppError('NOT_FOUND', 'Record not found', 404);
      case 'P2003':
        // Foreign key constraint
        throw new AppError('CONSTRAINT_VIOLATION', 'Related record does not exist', 400);
      default:
        throw new AppError('DATABASE_ERROR', 'A database error occurred', 500);
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    throw new AppError('DATABASE_VALIDATION', 'Invalid data provided', 400);
  }

  throw err;
}
```

```typescript
// Usage
async function createUser(data: CreateUserInput) {
  try {
    return await prisma.user.create({ data });
  } catch (err) {
    normalizeDatabaseError(err);
  }
}
```

---

## Part 2: Request ID Tracing

Every error response should include a `requestId`. This is the single most important debugging tool in production — it connects a user complaint to a specific log entry.

```typescript
// middleware/requestId.ts
import { v4 as uuidv4 } from 'uuid';

export function requestIdMiddleware(req, res, next) {
  const id = (req.headers['x-request-id'] as string) ?? uuidv4();
  req.headers['x-request-id'] = id;
  res.setHeader('x-request-id', id);
  next();
}
```

Apply it before all other middleware:

```typescript
app.use(requestIdMiddleware);
app.use(express.json());
// ... routes ...
app.use(errorHandler);
```

When a user says "something went wrong," ask them for the `requestId` from the response headers or UI. Paste it into your log search. Instant root cause.

---

## Part 3: Structured Logging

Logs are only useful if you can search them. Structured JSON logs beat `console.log` strings.

```typescript
// lib/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  ...(process.env.NODE_ENV === 'development'
    ? { transport: { target: 'pino-pretty' } }
    : {}),
  base: {
    env: process.env.NODE_ENV,
    service: 'api',
  },
  redact: {
    paths: ['body.password', 'body.token', 'headers.authorization', 'headers.cookie'],
    censor: '[REDACTED]',
  },
});
```

> **Why Pino?** It's the fastest Node.js logger. It outputs newline-delimited JSON that Datadog, Logtail, Grafana Loki, and every modern log aggregator can ingest directly.

> ⚠️ **Redact sensitive fields.** Passwords, tokens, and cookies have no business in your logs. Pino's `redact` option handles this automatically.

---

## Part 4: Frontend Error Architecture

### Error Boundary (React)

A component crash without an error boundary takes down the entire page.

```tsx
// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error({ error: error.message, stack: error.stack, componentStack: info.componentStack });
    this.props.onError?.(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

function DefaultErrorFallback({ error }: { error: Error | null }) {
  return (
    <div role="alert" className="error-fallback">
      <h2>Something went wrong</h2>
      <p>Refresh the page or contact support if this persists.</p>
      {process.env.NODE_ENV === 'development' && (
        <pre>{error?.message}</pre>
      )}
    </div>
  );
}
```

Use boundaries at multiple levels — not just the root:

```tsx
// Wrap independent sections separately
<ErrorBoundary fallback={<DashboardError />}>
  <Dashboard />
</ErrorBoundary>

<ErrorBoundary fallback={<SidebarError />}>
  <Sidebar />
</ErrorBoundary>
```

---

### API Error Handling Pattern

Standardize how every API call fails.

```typescript
// lib/apiClient.ts

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number,
    public readonly requestId?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json() as Promise<T>;
  }

  let errorBody: { error?: { code?: string; message?: string; requestId?: string } } = {};

  try {
    errorBody = await response.json();
  } catch {
    // Non-JSON error response (e.g., network proxy error)
  }

  throw new ApiError(
    errorBody.error?.code ?? 'UNKNOWN_ERROR',
    errorBody.error?.message ?? 'An unexpected error occurred',
    response.status,
    errorBody.error?.requestId
  );
}

export const api = {
  get: <T>(url: string, options?: RequestInit) =>
    fetch(url, { ...options, method: 'GET' }).then(handleResponse<T>),

  post: <T>(url: string, body: unknown, options?: RequestInit) =>
    fetch(url, {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(body),
    }).then(handleResponse<T>),

  // patch, delete, put follow same pattern
};
```

---

### React Query Error Handling

If you're using TanStack Query, configure global error handling once:

```typescript
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';
import { ApiError } from './apiClient';
import { toast } from '../components/ui/toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry client errors (4xx)
        if (error instanceof ApiError && error.statusCode < 500) return false;
        return failureCount < 2;
      },
      staleTime: 1000 * 60, // 1 minute
    },
    mutations: {
      onError: (error) => {
        if (error instanceof ApiError) {
          if (error.statusCode === 401) {
            // Redirect to login — handle in auth provider
            return;
          }
          toast.error(error.message);
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      },
    },
  },
});
```

---

## Part 5: What to Log vs What Not to Log

> Getting this wrong is either a security breach or a debugging nightmare.

### ✅ Log These

- Request ID, method, path, status code
- User ID (not email or PII)
- Error code, message, stack trace
- External service name and response code
- Duration of slow operations (> 1s)
- Retry attempts and outcomes

### ❌ Never Log These

- Passwords, tokens, API keys
- Full credit card numbers
- Session cookies or auth headers
- Personal data: email, phone, address, DOB
- Request bodies without redaction rules
- Third-party webhook payloads (may contain keys)

---

## Part 6: Unhandled Rejections & Exceptions

Catch what slips through:

```typescript
// server.ts

process.on('unhandledRejection', (reason, promise) => {
  logger.error({
    type: 'unhandledRejection',
    reason: reason instanceof Error ? reason.message : String(reason),
    stack: reason instanceof Error ? reason.stack : undefined,
  });

  // Graceful shutdown — let the process manager restart
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error({
    type: 'uncaughtException',
    message: error.message,
    stack: error.stack,
  });

  // Must exit — state is now undefined
  process.exit(1);
});
```

> **Why exit on `uncaughtException`?** Node's process state is undefined after an uncaught exception. Continuing risks data corruption, memory leaks, and silent wrong behavior. Let your process manager (PM2, Docker, Kubernetes) restart it cleanly.

---

## Implementation Checklist

- [ ] Custom `AppError` class hierarchy created
- [ ] Global error handler registered as last middleware
- [ ] All async routes wrapped with `asyncHandler`
- [ ] Database errors normalized at service layer
- [ ] Request ID middleware applied before all routes
- [ ] Structured logger set up with sensitive field redaction
- [ ] API client standardizes error parsing on frontend
- [ ] Error boundaries wrap independent UI sections
- [ ] React Query configured with retry logic and global mutation errors
- [ ] `unhandledRejection` and `uncaughtException` handlers in place
- [ ] Log levels configured per environment (debug dev, warn/error prod)
- [ ] No stack traces or internal messages returned to clients in production

---

## AI Prompt: Error Handling Review

Use this after implementing your error handler to catch gaps.

```
You are a senior backend engineer reviewing error handling in a production Node.js/Express API.

Here is my error handling code:

[paste: AppError class]
[paste: global errorHandler middleware]
[paste: asyncHandler wrapper]
[paste: one example service and route]

Review for:
1. Any errors that could leak internal details to clients
2. Missing error types for this application's domain
3. Cases where errors might be silently swallowed
4. Missing context in log entries that would hurt debugging
5. Security implications of the current error response structure

Return specific, actionable findings only. No general advice.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| `catch (err) { console.log(err) }` | Swallowed error, no recovery | Always re-throw or respond |
| Returning `err.message` from unknown errors | Leaks DB schema, internal paths | Generic 500 message only |
| No `requestId` in responses | User complaints are undebuggable | Add request ID middleware |
| `console.log` for production logging | Unsearchable, no structure | Use Pino or Winston |
| Retrying on 400s | Hammers backend unnecessarily | Only retry 5xx and network errors |
| One error boundary at root | Section crash kills entire app | Wrap independent sections |
| Logging full request bodies | PII in logs, compliance violation | Redact before logging |

---

## Next: Caching →

Good error handling makes caching safer — you know exactly what to do when a cache miss hits a failing service.