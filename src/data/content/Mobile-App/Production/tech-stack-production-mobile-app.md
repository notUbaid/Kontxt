---
title: Tech Stack
slug: tech-stack
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
---

# Tech Stack

Your tech stack is the set of tools, libraries, and services your app is built on. Every choice is a commitment — to a maintenance burden, a learning curve, a community, and a set of tradeoffs.

The goal is not to use the most modern stack. It is to use the smallest, most well-supported stack that covers your requirements without unnecessary complexity.

---

## Stack Selection Principles

```
1. Prefer boring technology
   Boring = battle-tested, well-documented, large community, rare breaking changes.
   Exciting = unknown failure modes, sparse docs, bus-factor risk.

2. Prefer fewer dependencies
   Every dependency is a maintenance burden, a security surface, and a
   potential source of breaking changes. Add one only when the alternative
   is writing significant code yourself.

3. Match the library to the problem size
   Don't use Redux for a 5-screen app.
   Don't use AsyncStorage for structured relational data.
   Right tool, right scale.

4. Optimize for hiring and handoff
   Unusual choices create hiring problems and onboarding friction.
   Popular choices have Stack Overflow answers, tutorials, and known solutions.
```

---

## The Production Mobile Stack

This is the recommended stack for a production React Native + Expo app. Every choice is justified below.

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION MOBILE STACK                  │
├──────────────────────┬──────────────────────────────────────┤
│  LAYER               │  CHOICE                              │
├──────────────────────┼──────────────────────────────────────┤
│  Framework           │  React Native + Expo SDK             │
│  Language            │  TypeScript (strict)                 │
│  Navigation          │  React Navigation v6                 │
│  State — server      │  TanStack Query (React Query)        │
│  State — client      │  Zustand                             │
│  Forms               │  React Hook Form + Zod               │
│  Styling             │  StyleSheet + design tokens          │
│  Animations          │  Reanimated 2 + Gesture Handler      │
│  Storage — fast KV   │  MMKV                                │
│  Storage — secure    │  Expo SecureStore                    │
│  Storage — SQL       │  Expo SQLite (via Drizzle ORM)       │
│  Networking          │  Axios or native fetch               │
│  Push notifications  │  Expo Notifications                  │
│  Analytics           │  PostHog                             │
│  Crash reporting     │  Sentry                              │
│  Testing             │  Jest + React Native Testing Library │
│  CI/CD               │  Expo EAS Build + EAS Submit         │
│  OTA Updates         │  Expo Updates                        │
└──────────────────────┴──────────────────────────────────────┘
```

---

## Part 1: Core Framework

```json
// package.json — core dependencies
{
  "dependencies": {
    "expo": "~51.0.0",
    "react": "18.2.0",
    "react-native": "0.74.0",
    "typescript": "^5.3.0"
  }
}
```

```json
// app.json — Expo config
{
  "expo": {
    "name": "YourApp",
    "slug": "your-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "platforms": ["ios", "android"],
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp",
      "deploymentTarget": "16.0",
      "supportsTablet": false
    },
    "android": {
      "package": "com.yourcompany.yourapp",
      "minSdkVersion": 24,
      "compileSdkVersion": 34,
      "targetSdkVersion": 34
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      [
        "expo-notifications",
        { "icon": "./assets/notification-icon.png" }
      ]
    ]
  }
}
```

---

## Part 2: Navigation

React Navigation is the standard. Expo Router (file-based routing built on React Navigation) is the modern choice for new projects.

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens
```

**Expo Router vs React Navigation directly:**

| | Expo Router | React Navigation (direct) |
|---|---|---|
| Routing model | File-based (like Next.js) | Code-based |
| Deep links | Automatic | Manual config |
| TypeScript | Typed routes built in | Manual typing |
| Learning curve | Lower for web developers | More explicit control |
| Maturity | Newer (Expo SDK 50+) | Battle-tested |

> **Use Expo Router for new projects.** File-based routing, automatic deep linking, and typed routes eliminate entire categories of bugs. If your team is uncomfortable with it, React Navigation v6 is equally valid.

```tsx
// Expo Router file structure mirrors your sitemap
app/
  _layout.tsx          // Root layout (providers, error boundary)
  (auth)/
    _layout.tsx        // Auth stack layout
    login.tsx          // /login
    register.tsx       // /register
  (tabs)/
    _layout.tsx        // Tab bar layout
    index.tsx          // / (home tab)
    search.tsx         // /search
    notifications.tsx  // /notifications
    profile.tsx        // /profile
  post/
    [id].tsx           // /post/:id (deep linkable)
  user/
    [id].tsx           // /user/:id
```

---

## Part 3: Data Fetching & Server State

TanStack Query (React Query) handles all server state — caching, background refetching, optimistic updates, pagination, and error states.

```bash
npx expo install @tanstack/react-query
```

```tsx
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,          // Data fresh for 1 minute
      gcTime: 1000 * 60 * 10,        // Keep in cache for 10 minutes
      retry: (failureCount, error) => {
        // Don't retry auth errors
        if (error instanceof ApiError && error.status < 500) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,   // Mobile: use AppState instead
      refetchOnReconnect: true,      // Refetch when network returns
    },
    mutations: {
      onError: (error) => {
        if (error instanceof ApiError) {
          toast.error(error.message);
        }
      },
    },
  },
});
```

```tsx
// hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => api.get<Post[]>('/posts'),
  });
}

export function usePost(postId: string) {
  return useQuery({
    queryKey: ['posts', postId],
    queryFn: () => api.get<Post>(`/posts/${postId}`),
    enabled: Boolean(postId),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostInput) => api.post<Post>('/posts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

---

## Part 4: Client State

Zustand for global client state — auth session, UI preferences, feature flags. Not for server data (that's React Query).

```bash
npm install zustand
```

```tsx
// stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKVLoader } from 'react-native-mmkv';

const storage = new MMKVLoader().initialize();

interface AuthState {
  userId: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (userId: string, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (userId, accessToken) =>
        set({ userId, accessToken, isAuthenticated: true }),
      clearAuth: () =>
        set({ userId: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (key) => storage.getString(key) ?? null,
        setItem: (key, value) => storage.set(key, value),
        removeItem: (key) => storage.delete(key),
      })),
      // Only persist non-sensitive fields — token goes to SecureStore
      partialize: (state) => ({ userId: state.userId }),
    }
  )
);
```

> **Token storage rule:** Never persist access tokens in Zustand, MMKV, or AsyncStorage. These are unencrypted. Store tokens in `expo-secure-store` and load them on app start.

---

## Part 5: Forms

React Hook Form + Zod. Performance (uncontrolled inputs), validation (schema-based), TypeScript (inferred types).

```bash
npm install react-hook-form zod @hookform/resolvers
```

```tsx
// schemas/auth.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email').toLowerCase().trim(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

```tsx
// screens/LoginScreen.tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '../schemas/auth';

export function LoginScreen() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginInput) => {
    await authService.login(data);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormField
            label="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormField
            label="Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
            secureTextEntry
          />
        )}
      />

      <LoadingButton
        label="Sign in"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
      />
    </KeyboardAvoidingView>
  );
}
```

---

## Part 6: Animations & Gestures

```bash
npx expo install react-native-reanimated react-native-gesture-handler
```

```tsx
// babel.config.js — required for Reanimated
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'], // Must be last
};
```

Use Reanimated for:
- Any animation that must be smooth under load
- Gesture-driven animations (swipe, drag, pinch)
- Shared element transitions

Use `Animated` (built-in) only for:
- Simple, one-shot animations on non-interactive elements
- When Reanimated is unavailable (rare)

---

## Part 7: Networking

```tsx
// lib/api.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token to every request
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth.token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired — attempt refresh or redirect to login
      await authService.handleTokenExpiry();
    }
    return Promise.reject(
      new ApiError(
        error.response?.data?.error?.code ?? 'NETWORK_ERROR',
        error.response?.data?.error?.message ?? 'Network error',
        error.response?.status ?? 0
      )
    );
  }
);
```

---

## Part 8: Environment Configuration

```bash
# .env.local (development)
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_POSTHOG_KEY=phc_dev_...

# .env.production
EXPO_PUBLIC_API_URL=https://api.yourapp.com
EXPO_PUBLIC_POSTHOG_KEY=phc_prod_...
```

```tsx
// lib/env.ts — validate at startup
const required = [
  'EXPO_PUBLIC_API_URL',
  'EXPO_PUBLIC_POSTHOG_KEY',
] as const;

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL!,
  posthogKey: process.env.EXPO_PUBLIC_POSTHOG_KEY!,
} as const;
```

> **`EXPO_PUBLIC_` prefix** is required for Expo to expose env vars to client code. Variables without this prefix are stripped from the bundle. Never put secrets in `EXPO_PUBLIC_` vars — they are visible in the app bundle.

---

## Complete Stack Installation

```bash
# Bootstrap
npx create-expo-app@latest MyApp --template blank-typescript
cd MyApp

# Navigation
npx expo install expo-router react-native-safe-area-context react-native-screens

# Data & state
npm install @tanstack/react-query zustand
npm install react-hook-form zod @hookform/resolvers

# Animations & gestures
npx expo install react-native-reanimated react-native-gesture-handler

# Storage
npx expo install expo-secure-store expo-sqlite
npm install react-native-mmkv

# Networking
npm install axios

# Notifications
npx expo install expo-notifications expo-device

# Observability
npm install @sentry/react-native posthog-react-native

# Network status
npx expo install @react-native-community/netinfo

# Dev
npm install -D @testing-library/react-native jest
```

---

## Implementation Checklist

- [ ] `app.json` configured with correct bundle IDs, SDK version, and min OS versions
- [ ] TypeScript strict mode enabled
- [ ] Expo Router installed and file structure mirrors sitemap
- [ ] TanStack Query configured with retry and staleTime defaults
- [ ] Zustand store created for auth state
- [ ] Token storage uses `expo-secure-store`, not MMKV or AsyncStorage
- [ ] Axios interceptor attaches auth token and handles 401 globally
- [ ] React Hook Form + Zod used on all forms
- [ ] Reanimated 2 Babel plugin added (last in plugins array)
- [ ] `EXPO_PUBLIC_` prefix used for all client-accessible env vars
- [ ] Env vars validated at startup
- [ ] Sentry and PostHog initialized before first render

---

## AI Prompt: Stack Validation

```
You are a senior React Native architect reviewing a tech stack for a production mobile app.

App description: [describe your app]
Chosen stack: [paste your package.json dependencies]
Core features: [list your 5–7 main features]

Review for:
1. Missing libraries for stated features (e.g. maps feature with no maps library)
2. Redundant libraries solving the same problem
3. Libraries that conflict or have known compatibility issues with current Expo SDK
4. Security risks (sensitive data in wrong storage layer, no token refresh logic)
5. Libraries with poor maintenance or known breaking changes in the pipeline

Return specific findings. Suggest replacements where needed.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Redux for a simple app | Boilerplate, complexity for no gain | Zustand + TanStack Query |
| AsyncStorage for tokens | Unencrypted, security vulnerability | `expo-secure-store` only |
| `fetch` with no interceptor | 401s not handled globally | Axios with response interceptor |
| Reanimated plugin not last in babel | Cryptic runtime crashes | Always last in babel plugins |
| `EXPO_PUBLIC_` for secrets | Secret exposed in app bundle | Secrets only on server, never in client env vars |
| No env validation at startup | Cryptic errors deep in user flows | Validate required vars on boot |
| Mixing React Query and local state for same data | Two sources of truth, stale UI | Server state → React Query only |

---

## Next: System Architecture →

With the stack defined, the next topic designs the high-level architecture — how your mobile app, backend, database, and external services connect and communicate.
