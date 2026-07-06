---
title: Loading States
slug: loading-states
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
---

# Loading States

Loading states are the gap between what a user asked for and what your app has delivered. How you fill that gap determines whether your app feels fast, slow, broken, or polished.

Most apps treat loading as an afterthought. The best apps design loading as a first-class experience — because users spend real time in these states every session.

---

## Why Mobile Loading States Are Different

Mobile introduces constraints that don't exist on web:

| Constraint | Impact on Loading Design |
|---|---|
| Variable network quality | Loads can take 50ms or 15 seconds on the same device |
| Background/foreground transitions | App can return to a state mid-load |
| Offline scenarios | Load may never complete |
| Smaller screens | Skeleton layouts must be carefully proportioned |
| Touch interaction during load | Users tap things that aren't ready yet |
| Low battery / low data mode | Users expect your app to be aware |

Design loading states for the worst realistic condition, not average conditions.

---

## The Loading State Taxonomy

Every async operation in your app falls into one of these categories. Each needs a different treatment.

```
┌─────────────────────────────────────────────────────────┐
│                   LOADING STATES                        │
├──────────────┬──────────────┬──────────────┬────────────┤
│   SKELETON   │   SPINNER    │  PROGRESSIVE │  OPTIMISTIC│
│              │              │              │            │
│ First load   │ User-        │ Content      │ Write      │
│ of a screen  │ triggered    │ loads in     │ actions    │
│ with known   │ action       │ stages       │ (assume    │
│ layout       │ (submit,     │ (image       │ success)   │
│              │ refresh)     │ after text)  │            │
└──────────────┴──────────────┴──────────────┴────────────┘
```

Choosing the wrong type for a context is a UX mistake, not just a visual one.

---

## Part 1: Skeleton Screens

Skeleton screens are the correct default for first-load of content screens. They communicate layout before content — reducing perceived wait time and preventing layout shift.

### When to Use Skeletons

 First load of a feed, list, or detail screen
 Pull-to-refresh
 Tab switches with remote data
 Search results loading

 Do not use for: button actions, mutations, or operations under ~300ms

### Skeleton Design Rules

```
1. Mirror the real layout exactly
   Skeleton card height = actual card height
   Skeleton line widths ≈ actual text lengths (vary them — not all 100%)

2. Animate with shimmer, not pulse
   Shimmer (left-to-right gradient sweep) reads as "loading"
   Pulse (fade in/out) reads as "broken"

3. Show 2–4 skeleton items
   Enough to fill the screen — not so many the list looks impossibly long

4. Match real content density
   If your cards have an avatar, title, subtitle, and timestamp —
   your skeleton card needs all four elements

5. Never show skeletons for < 300ms
   Flash of skeleton followed by instant content is jarring
   Use a 300ms delay before showing skeletons
```

### React Native Implementation

```tsx
// components/ui/Skeleton.tsx
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width, height, borderRadius = 4, style }: SkeletonProps) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmer]);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View
      style={[
        styles.container,
        { width: width as number, height, borderRadius },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.shimmer,
          { transform: [{ translateX }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
  },
  shimmer: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 100,
  },
});
```

```tsx
// components/skeletons/PostCardSkeleton.tsx
import { View, StyleSheet } from 'react-native';
import { Skeleton } from '../ui/Skeleton';

export function PostCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Skeleton width={40} height={40} borderRadius={20} />  {/* Avatar */}
        <View style={styles.headerText}>
          <Skeleton width={120} height={14} />                  {/* Name */}
          <Skeleton width={80} height={12} style={{ marginTop: 4 }} /> {/* Timestamp */}
        </View>
      </View>
      <Skeleton width="100%" height={180} style={{ marginTop: 12 }} /> {/* Image */}
      <Skeleton width="90%" height={14} style={{ marginTop: 12 }} />   {/* Title */}
      <Skeleton width="65%" height={14} style={{ marginTop: 6 }} />    {/* Title line 2 */}
    </View>
  );
}

export function PostFeedSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </>
  );
}
```

---

## Part 2: Inline Spinners

Use spinners for user-triggered actions where the layout is already visible and stable.

### When to Use Spinners

 Form submission (login, signup, checkout)
 Button-triggered actions (follow, like, delete)
 Pull-to-refresh (native `RefreshControl`)
 Pagination / load more

 Do not use for: full-screen initial loads (use skeleton instead)

```tsx
// components/ui/LoadingButton.tsx
import { ActivityIndicator, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

interface LoadingButtonProps {
  onPress: () => void;
  loading: boolean;
  disabled?: boolean;
  label: string;
  loadingLabel?: string;
  style?: ViewStyle;
}

export function LoadingButton({
  onPress,
  loading,
  disabled,
  label,
  loadingLabel,
  style,
}: LoadingButtonProps) {
  const isDisabled = loading || disabled;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.button, isDisabled && styles.disabled, style]}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color="#FFFFFF" />
          {loadingLabel && (
            <Text style={[styles.label, { marginLeft: 8 }]}>{loadingLabel}</Text>
          )}
        </>
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

> **Always disable the button during loading.** A user tapping a loading button multiple times submits the same form multiple times. This causes duplicate orders, charges, or accounts. Disable + visual feedback is non-negotiable.

---

## Part 3: Optimistic Updates

Optimistic updates assume the server will succeed and update the UI immediately. If the server fails, roll back.

This is the right pattern for low-risk, high-frequency interactions: likes, follows, saves, reorders.

```tsx
// hooks/useLike.ts
import { useState } from 'react';
import { api } from '../lib/api';

export function useLike(postId: string, initialLiked: boolean, initialCount: number) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  async function toggleLike() {
    // 1. Optimistic update — instant UI response
    const newLiked = !liked;
    setLiked(newLiked);
    setCount((c) => (newLiked ? c + 1 : c - 1));

    try {
      // 2. Send to server in background
      await api.post(`/posts/${postId}/like`, { liked: newLiked });
    } catch {
      // 3. Rollback on failure
      setLiked(liked);
      setCount(count);
      // Show toast: 'Failed to update — please try again'
    }
  }

  return { liked, count, toggleLike };
}
```

### When to Use Optimistic Updates

 Like / unlike
 Follow / unfollow
 Save / bookmark
 Mark as read
 Drag-to-reorder

 Do not use for: payments, account changes, irreversible deletes, anything requiring server confirmation before proceeding

---

## Part 4: Progressive Loading

Load text and structure first, media second. Users can start reading before images arrive.

```tsx
// components/ui/ProgressiveImage.tsx
import { useState } from 'react';
import { Image, View, StyleSheet, ImageStyle } from 'react-native';
import { Skeleton } from './Skeleton';

interface ProgressiveImageProps {
  uri: string;
  width: number;
  height: number;
  style?: ImageStyle;
}

export function ProgressiveImage({ uri, width, height, style }: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <View style={[styles.error, { width, height }]}>
        {/* Error state — broken image icon */}
      </View>
    );
  }

  return (
    <View style={{ width, height }}>
      {!loaded && <Skeleton width={width} height={height} style={StyleSheet.absoluteFillObject} />}
      <Image
        source={{ uri }}
        style={[{ width, height, opacity: loaded ? 1 : 0 }, style]}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

---

## Part 5: Loading State Management

Centralize loading state logic to prevent inconsistency across screens.

```tsx
// hooks/useAsync.ts
import { useState, useCallback } from 'react';

type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });

  const execute = useCallback(async (promise: Promise<T>) => {
    setState({ status: 'loading' });
    try {
      const data = await promise;
      setState({ status: 'success', data });
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setState({ status: 'error', error });
      throw error;
    }
  }, []);

  const reset = useCallback(() => setState({ status: 'idle' }), []);

  return { state, execute, reset };
}
```

```tsx
// Usage in a screen
function ProfileScreen() {
  const { state, execute } = useAsync<User>();

  useEffect(() => {
    execute(api.get('/user/profile'));
  }, []);

  if (state.status === 'loading') return <ProfileSkeleton />;
  if (state.status === 'error') return <ErrorState onRetry={() => execute(api.get('/user/profile'))} />;
  if (state.status === 'idle') return null;

  return <ProfileContent user={state.data} />;
}
```

---

## Part 6: The 300ms Rule

Never flash a loading indicator for fast operations. It creates more anxiety than it relieves.

```tsx
// hooks/useDelayedLoading.ts
import { useState, useEffect } from 'react';

export function useDelayedLoading(isLoading: boolean, delay = 300): boolean {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowLoading(false);
      return;
    }

    const timer = setTimeout(() => setShowLoading(true), delay);
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoading;
}
```

```tsx
// Usage
function FeedScreen() {
  const { data, isLoading } = useFeed();
  const showSkeleton = useDelayedLoading(isLoading);

  if (showSkeleton) return <FeedSkeleton />;
  return <Feed data={data} />;
}
```

---

## Part 7: Platform-Specific Considerations

### iOS
- Use `UIActivityIndicatorView` style spinners (matches system)
- Respect `reduceMotion` accessibility setting — disable shimmer animation
- Pull-to-refresh uses native `RefreshControl` — never build a custom one

### Android
- Use `CircularProgressIndicator` style (Material Design)
- Loading states should respect the app's theme (light/dark)
- Avoid heavy animations on low-end Android devices

```tsx
// Respect reduce motion preference
import { AccessibilityInfo, useEffect, useState } from 'react';

export function useReduceMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion
    );

    return () => subscription.remove();
  }, []);

  return reduceMotion;
}
```

```tsx
// In your Skeleton component
const reduceMotion = useReduceMotion();

// Only animate if motion is not reduced
useEffect(() => {
  if (reduceMotion) return; // Skip shimmer animation
  Animated.loop(...).start();
}, [reduceMotion]);
```

---

## Loading State Decision Guide

```
User opens a screen for the first time
  → Skeleton screen

User triggers a form submit / button action
  → Inline spinner on the button, button disabled

User pulls to refresh
  → Native RefreshControl

Data loads in under 300ms
  → Show nothing (use 300ms delay before skeleton)

User taps Like / Follow / Save
  → Optimistic update (instant), rollback on failure

Images in a content card
  → Skeleton placeholder → fade in on load

App returns from background with stale data
  → Show stale content immediately, refresh silently in background
```

---

## Implementation Checklist

- [ ] Skeleton components built for every major screen layout
- [ ] Skeleton shimmer animation respects `reduceMotion` setting
- [ ] Skeletons only appear after 300ms delay
- [ ] All buttons show spinner and disable during async operations
- [ ] Optimistic updates implemented for like / follow / save interactions
- [ ] `ProgressiveImage` component shows skeleton until image loads
- [ ] Error state handled for every async operation (with retry)
- [ ] `useAsync` hook or equivalent centralizes loading state logic
- [ ] Pull-to-refresh uses native `RefreshControl`
- [ ] No loading state flashes on operations completing under 300ms
- [ ] Loading states tested on slow network (Network Link Conditioner / Android emulator throttle)

---

## AI Prompt: Skeleton Layout Design

```
You are a senior React Native engineer designing skeleton loading screens for a mobile app.

Here is the content layout for my [screen name] screen:
[describe or paste your real component structure]

Generate:
1. A complete React Native skeleton component that mirrors this layout exactly
2. Correct proportions for each skeleton element based on the real content
3. The shimmer animation using Animated API (not third-party libraries)
4. A wrapper that delays showing the skeleton by 300ms
5. Notes on any layout decisions — where you approximated text widths and why

Use StyleSheet.create for all styles. No inline styles.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Skeleton doesn't match real layout | Layout shift when content loads | Mirror the real component exactly |
| Spinner on full-screen first load | Feels slow, no layout preview | Use skeleton instead |
| No button disable during loading | Duplicate submissions | Always disable + show spinner |
| Shimmer without `useNativeDriver: true` | Janky animation on JS thread | Always use native driver for transforms |
| Flash of skeleton on fast loads | More anxiety than no skeleton | 300ms delay before showing |
| No rollback on optimistic update failure | UI lies to the user | Always handle the error case |
| No `reduceMotion` check | Accessibility violation | Check `AccessibilityInfo.isReduceMotionEnabled` |

---

## Next: Empty States →

Empty states are loading states that completed successfully — but found nothing. They need their own design treatment.
