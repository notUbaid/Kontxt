---
title: Error States
slug: error-states
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 15–25 min
---

# Error States

Error states are what your app shows when something went wrong. They are unavoidable — networks fail, servers crash, sessions expire, users lose connectivity mid-action.

The question is never whether errors will happen. It is whether your app communicates them clearly, helps the user recover, and avoids making a bad moment worse.

---

## The Cost of Bad Error States

| Bad Error Handling | User Interpretation |
|---|---|
| Blank screen with no message | App is broken |
| Raw error: `TypeError: Cannot read property 'id'` | App is dangerously broken |
| Generic "Something went wrong" with no action | No idea what to do next |
| Silent failure (nothing happens on tap) | My tap didn't register — keep tapping |
| Error disappears before user reads it | Did something fail? |
| App crashes to home screen | Uninstall candidate |

Every one of these is a design failure, not just a technical one.

---

## Error State Taxonomy

```
┌────────────────────────────────────────────────────────────────┐
│                        ERROR TYPES                             │
├─────────────────┬──────────────────┬───────────────────────────┤
│   NETWORK       │   SERVER         │   CLIENT                  │
│                 │                  │                           │
│ No internet     │ 5xx response     │ 4xx response              │
│ Timeout         │ Service down     │ Validation failed         │
│ Slow connection │ Partial failure  │ Session expired (401)     │
│                 │                  │ Not found (404)           │
│ → Retry         │ → Retry later    │ → Guide to fix            │
│   + Offline     │   + Status page  │   or redirect             │
│   fallback      │   link           │                           │
└─────────────────┴──────────────────┴───────────────────────────┘
```

Each type has different recovery options. Design them separately.

---

## Part 1: Full-Screen Error States

Used when an entire screen fails to load — the error replaces the content area.

```tsx
// components/ui/ErrorState.tsx
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LoadingButton } from './LoadingButton';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retrying?: boolean;
  action?: {
    label: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We had trouble loading this page. Try again or come back later.',
  onRetry,
  retrying = false,
  action,
  style,
}: ErrorStateProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}></Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      {onRetry && (
        <LoadingButton
          label="Try again"
          loadingLabel="Retrying..."
          onPress={onRetry}
          loading={retrying}
          style={styles.retryButton}
        />
      )}

      {action && (
        <Text style={styles.secondaryAction} onPress={action.onPress}>
          {action.label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  icon: {
    fontSize: 48,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  retryButton: {
    width: '100%',
    maxWidth: 280,
  },
  secondaryAction: {
    marginTop: 16,
    fontSize: 15,
    color: '#007AFF',
    textAlign: 'center',
  },
});
```

### Variant: Network Error

```tsx
// components/error-states/NetworkError.tsx
import { ErrorState } from '../ui/ErrorState';

interface NetworkErrorProps {
  onRetry: () => void;
  retrying?: boolean;
}

export function NetworkError({ onRetry, retrying }: NetworkErrorProps) {
  return (
    <ErrorState
      title="No internet connection"
      description="Check your connection and try again. Any unsaved changes will be kept."
      onRetry={onRetry}
      retrying={retrying}
    />
  );
}
```

### Variant: Server Error

```tsx
// components/error-states/ServerError.tsx
export function ServerError({ onRetry, retrying }: { onRetry: () => void; retrying?: boolean }) {
  return (
    <ErrorState
      title="We're having trouble"
      description="Our servers are experiencing issues. We're working on it."
      onRetry={onRetry}
      retrying={retrying}
      action={{
        label: 'Check service status',
        onPress: () => Linking.openURL('https://status.yourapp.com'),
      }}
    />
  );
}
```

### Variant: Session Expired

```tsx
// components/error-states/SessionExpired.tsx
export function SessionExpired({ onLogin }: { onLogin: () => void }) {
  return (
    <ErrorState
      title="Session expired"
      description="You've been signed out for security. Sign in again to continue."
      action={{
        label: 'Sign in',
        onPress: onLogin,
      }}
    />
  );
}
```

---

## Part 2: Inline Error States

For errors inside a list, card, or partial screen area — not a full-screen replacement.

```tsx
// components/ui/InlineError.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface InlineErrorProps {
  message: string;
  onRetry?: () => void;
}

export function InlineError({ message, onRetry }: InlineErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable onPress={onRetry} style={styles.retry}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF3F3',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: '#CC0000',
    lineHeight: 20,
  },
  retry: {
    marginLeft: 12,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CC0000',
  },
});
```

---

## Part 3: Toast / Snackbar Errors

For mutation failures — form submissions, button actions, background operations.

```tsx
// lib/toast.ts
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message'; // or your toast library

export const toast = {
  error: (message: string) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: Platform.OS === 'ios' ? 'top' : 'bottom',
      visibilityTime: 4000,
      autoHide: true,
    });
  },

  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: Platform.OS === 'ios' ? 'top' : 'bottom',
      visibilityTime: 3000,
    });
  },

  info: (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      visibilityTime: 3000,
    });
  },
};
```

```tsx
// Usage after a failed mutation
async function handleSubmit() {
  try {
    await api.post('/orders', orderData);
    toast.success('Order placed successfully');
    navigation.navigate('OrderConfirmation');
  } catch (err) {
    if (err instanceof ApiError) {
      toast.error(err.message);   // Use server's message if it's user-safe
    } else {
      toast.error('Failed to place order. Please try again.');
    }
  }
}
```

> **Toast errors are for transient, recoverable failures.** If the error requires explanation or action (e.g. payment declined with steps), use a modal or inline error — not a toast that auto-dismisses in 4 seconds.

---

## Part 4: Form Validation Errors

Inline, field-level errors. Never toast these — users need to see which field failed while editing.

```tsx
// components/ui/FormField.tsx
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function FormField({ label, error, ...inputProps }: FormFieldProps) {
  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        style={[
          styles.input,
          hasError && styles.inputError,
        ]}
        accessibilityLabel={label}
        accessibilityHint={error}
      />
      {hasError && (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111111',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#CC0000',
    backgroundColor: '#FFF8F8',
  },
  error: {
    fontSize: 13,
    color: '#CC0000',
    marginTop: 4,
  },
});
```

---

## Part 5: Error Boundary (Crash Recovery)

React Native apps can crash at the component level. An error boundary prevents a white screen of death.

```tsx
// components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LoadingButton } from './ui/LoadingButton';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
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

  componentDidCatch(error: Error) {
    // Report to Sentry / Crashlytics
    console.error('ErrorBoundary caught:', error);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <View style={styles.container}>
          <Text style={styles.icon}></Text>
          <Text style={styles.title}>Something broke</Text>
          <Text style={styles.description}>
            This section ran into an unexpected error. Try reloading.
          </Text>
          <LoadingButton
            label="Reload"
            onPress={this.handleReset}
            loading={false}
            style={styles.button}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  icon: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '600', color: '#111111', marginBottom: 8 },
  description: { fontSize: 15, color: '#666666', textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  button: { width: '100%', maxWidth: 280 },
});
```

```tsx
// Wrap screen-level and section-level separately
// App.tsx
<ErrorBoundary>
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
</ErrorBoundary>

// Inside a complex screen with independent sections
<ErrorBoundary fallback={<InlineError message="Failed to load comments" />}>
  <CommentSection postId={postId} />
</ErrorBoundary>
```

---

## Part 6: Error State Decision Guide

```
Request fails — what to show?

Is the entire screen blank?
  → Full-screen ErrorState with retry

Is it a section inside a populated screen?
  → InlineError component, local to that section

Was it a form submission or button tap?
  → Toast error (unless it needs explanation or action)

Is it a validation error on a form field?
  → Inline field error under the specific input

Did the app component crash?
  → ErrorBoundary fallback

Is the user's session expired?
  → SessionExpired state, redirect to login

Is there no network?
  → NetworkError state — check before retrying
```

---

## Part 7: Error Copy Guidelines

```
 "Couldn't load posts. Check your connection and try again."
 "Error 503: Service Unavailable"

 "Payment failed. Your card was declined."
 "An error occurred while processing your request."

 "Session expired. Sign in again to continue."
 "Authentication error: JWT expired at 1704067200"

 "Couldn't send message. Try again."
 "Network request failed"
```

Rules:
- **Plain language** — no error codes, no technical terms
- **State what happened** — not just that something went wrong
- **Give a next step** — even if it's just "try again"
- **No blame** — never say "you did something wrong" for server errors
- **No panic** — calm, matter-of-fact tone

---

## Implementation Checklist

- [ ] `ErrorState` base component built with title, description, and retry action
- [ ] Network, server, and session-expired variants created
- [ ] `InlineError` component for partial screen failures
- [ ] Toast library configured for mutation error feedback
- [ ] `FormField` component handles inline validation errors
- [ ] `ErrorBoundary` wraps the root navigator and major screen sections
- [ ] Error boundary reports to crash reporting (Sentry / Crashlytics)
- [ ] 401 errors globally redirect to login — not shown as a generic error
- [ ] Error copy reviewed: plain language, no codes, clear next step
- [ ] Accessibility: error messages use `accessibilityRole="alert"`

---

## AI Prompt: Error State Audit

```
You are a senior mobile UX engineer auditing error state design for a React Native app.

Here are the screens and async operations in my app:
[list your screens and the async operations each performs]

For each screen / operation, identify:
1. What error states are currently unhandled (silent failures)
2. Which errors should show full-screen vs inline vs toast
3. Whether the copy is user-safe (no codes, no stack traces, no jargon)
4. Missing retry logic
5. Missing 401 / session expiry handling

Return a prioritized list of gaps, most critical first.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Generic "Something went wrong" with no action | User has nowhere to go | Always add retry or redirect |
| Showing raw API error messages | Leaks internals, confuses users | Map to user-safe copy |
| Toast for validation errors | Disappears before user can act | Inline field errors only |
| No error boundary | One component crash = white screen | Wrap root + major sections |
| Treating 401 as a generic error | Login loop or dead end | Intercept globally, redirect to login |
| Full-screen error for partial failures | Hides content that did load | Use inline error for sections |
| No retry on transient network errors | User must restart the app | Always add retry for network/5xx |
| Silent failure on mutation | User thinks action succeeded | Always surface failure, even briefly |

---

## Next: Sitemap →

With all UI states designed — loading, empty, and error — the final Phase 1 topic maps your app's complete information architecture.
