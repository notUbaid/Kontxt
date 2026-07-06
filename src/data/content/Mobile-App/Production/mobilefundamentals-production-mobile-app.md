---
title: Mobile Fundamentals
slug: mobile-fundamentals
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# Mobile Fundamentals

Mobile is not a smaller version of the web. It has its own execution model, memory constraints, lifecycle, thread architecture, and user interaction patterns. Engineers who treat React Native like a mobile-flavored React web app write code that is slow, crashes, and drains batteries.

This module covers the foundational concepts that separate production-quality mobile code from code that barely works in development.

---

## The JavaScript Thread Architecture

React Native runs on two threads. Understanding this is the most important mental model in the framework.

```
┌─────────────────────────────────────────────────────────┐
│                   REACT NATIVE THREADS                  │
├──────────────────────────┬──────────────────────────────┤
│     JS THREAD            │     NATIVE / UI THREAD       │
│                          │                              │
│  Your JavaScript code    │  Native rendering            │
│  React reconciliation    │  Gesture recognition         │
│  Business logic          │  Animations (when native)    │
│  API calls               │  Platform UI updates         │
│  State updates           │                              │
│                          │                              │
│  ← Single threaded →     │  ← Runs independently →      │
│                          │                              │
│  Blocking this = jank    │  Must never be blocked       │
└──────────────────────────┴──────────────────────────────┘
                    Bridge / JSI
              (communication layer)
```

**The critical rule:** Any work on the JS thread that takes longer than 16ms causes a dropped frame (jank). Heavy computation, large JSON parsing, and synchronous storage reads all block the JS thread.

```tsx
//  Blocks JS thread — parses large JSON synchronously
const data = JSON.parse(hugeJsonString); // Blocks for 50ms
setState(data); // Frame dropped

//  Move heavy work off the main render cycle
useEffect(() => {
  // Still JS thread, but outside the render path
  const parsed = JSON.parse(hugeJsonString);
  setState(parsed);
}, []);

//  For truly heavy computation — use a worker (Expo TaskManager or worklets)
```

---

## Part 1: The App Lifecycle

Mobile apps are not always in the foreground. They transition between states, and your code must handle each one correctly.

```
                    ┌──────────────┐
                    │   INACTIVE   │  ← iOS only: phone call, notification center
                    └──────┬───────┘
                           │
         App opened ──► ┌──▼───────────┐
                         │   ACTIVE     │  ← Foreground, user interacting
                         └──────┬───────┘
                                │
         Home button ──────► ┌──▼───────────┐
         Another app ──────► │  BACKGROUND  │  ← Running, not visible
                              └──────┬───────┘
                                     │
         OS memory pressure ──────► │
                                  ┌──▼───────────┐
                                  │   KILLED     │  ← Process terminated
                                  └──────────────┘
```

```tsx
// hooks/useAppState.ts
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState(handlers: {
  onForeground?: () => void;
  onBackground?: () => void;
}) {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        const prev = appState.current;
        appState.current = nextState;

        if (prev.match(/inactive|background/) && nextState === 'active') {
          handlers.onForeground?.();
        }

        if (prev === 'active' && nextState.match(/inactive|background/)) {
          handlers.onBackground?.();
        }
      }
    );

    return () => subscription.remove();
  }, []);
}
```

```tsx
// Practical usage — refresh data when app returns to foreground
function HomeScreen() {
  const { refetch } = useFeed();

  useAppState({
    onForeground: () => {
      // App was backgrounded — data may be stale
      refetch();
    },
    onBackground: () => {
      // Pause timers, cancel non-critical network requests
    },
  });
}
```

---

## Part 2: Memory Management

Mobile devices have limited RAM. The OS kills backgrounded apps when memory is needed. Your app must handle this gracefully.

### What Gets Cleared on Kill
- All in-memory state
- Any data not persisted to disk
- Network requests in flight
- Timers and subscriptions

### What Survives
- AsyncStorage / SQLite / MMKV (persistent storage)
- Files written to the filesystem
- Server-side state

```tsx
// Always persist state that must survive a kill
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

//  Only in React state — lost on kill
const [userPreferences, setUserPreferences] = useState(defaultPrefs);

//  Persisted — survives kill and relaunch
function usePersistedPreferences() {
  const [prefs, setPrefsState] = useState(() => {
    const stored = storage.getString('user.preferences');
    return stored ? JSON.parse(stored) : defaultPrefs;
  });

  const setPrefs = (newPrefs: typeof defaultPrefs) => {
    setPrefsState(newPrefs);
    storage.set('user.preferences', JSON.stringify(newPrefs));
  };

  return [prefs, setPrefs] as const;
}
```

### Memory Leak Prevention

```tsx
//  Memory leak — subscription never cleaned up
useEffect(() => {
  const sub = eventEmitter.addListener('event', handler);
  // Missing return cleanup
});

//  Always return cleanup from useEffect
useEffect(() => {
  const sub = eventEmitter.addListener('event', handler);
  return () => sub.remove();
}, []);

//  Timer leak
useEffect(() => {
  setInterval(() => fetchData(), 5000);
});

//  Timer with cleanup
useEffect(() => {
  const timer = setInterval(() => fetchData(), 5000);
  return () => clearInterval(timer);
}, []);
```

---

## Part 3: Rendering Performance

### The FlatList Contract

`FlatList` is the only correct way to render long lists in React Native. `ScrollView` renders all children at once — use it only for short, fixed-length content.

```tsx
//  ScrollView with dynamic list — renders all 1000 items
<ScrollView>
  {posts.map(post => <PostCard key={post.id} post={post} />)}
</ScrollView>

//  FlatList — renders only visible items (windowed)
<FlatList
  data={posts}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <PostCard post={item} />}

  // Performance tuning
  initialNumToRender={10}          // Render 10 items on first paint
  maxToRenderPerBatch={5}          // Render 5 items per batch during scroll
  windowSize={10}                  // Keep 5 screens above/below in memory
  removeClippedSubviews={true}     // Unmount off-screen views (Android)

  // Optimization: stable item heights
  getItemLayout={(_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

### Memoization

```tsx
//  PostCard re-renders on every parent state change
function PostCard({ post }: { post: Post }) {
  return <View>...</View>;
}

//  Only re-renders when post changes
const PostCard = React.memo(function PostCard({ post }: { post: Post }) {
  return <View>...</View>;
});

//  New function reference on every render — defeats memo
<FlatList renderItem={({ item }) => <PostCard post={item} />} />

//  Stable callback reference
const renderPost = useCallback(
  ({ item }: { item: Post }) => <PostCard post={item} />,
  [] // No deps — PostCard handles its own data
);

<FlatList renderItem={renderPost} />
```

---

## Part 4: Animations — Native Driver vs JS Driver

Animations are the most visible performance signal in your app. Running them on the JS thread causes jank. Running them on the native thread does not.

```tsx
//  JS-driven animation — can drop frames under load
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: false,  // Runs on JS thread
}).start();

//  Native-driven animation — runs on UI thread, never drops frames
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,   // Runs on native thread
}).start();
```

**`useNativeDriver: true` supports:**
- `transform` (translateX, translateY, scale, rotate)
- `opacity`

**`useNativeDriver: true` does NOT support:**
- `width`, `height`, `top`, `left`, `right`, `bottom`
- `backgroundColor`
- `flex`

For layout animations or color transitions — use `Reanimated 2` which compiles worklets to run natively.

```tsx
// Reanimated 2 — worklets run on UI thread
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function BouncyButton() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => { scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
    >
      <Animated.View style={animatedStyle}>
        <Text>Press me</Text>
      </Animated.View>
    </Pressable>
  );
}
```

---

## Part 5: Safe Area & Notch Handling

Every modern device has notches, Dynamic Islands, home indicators, or camera cutouts. Your layout must account for all of them.

```bash
npm install react-native-safe-area-context
```

```tsx
// app/_layout.tsx (or App.tsx)
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* rest of app */}
    </SafeAreaProvider>
  );
}
```

```tsx
// In screens — use useSafeAreaInsets for precise control
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* Content never sits behind notch or home indicator */}
    </View>
  );
}
```

```tsx
// Or use SafeAreaView for simpler cases
import { SafeAreaView } from 'react-native-safe-area-context';

function SimpleScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Automatically insets all edges */}
    </SafeAreaView>
  );
}
```

---

## Part 6: Keyboard Handling

The keyboard covers your UI on mobile. If you do not handle this, forms become unusable.

```tsx
// KeyboardAvoidingView — moves content above keyboard
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

function LoginScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Form fields */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
```

```tsx
// Dismiss keyboard on tap outside
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={{ flex: 1 }}>
    {/* screen content */}
  </View>
</TouchableWithoutFeedback>
```

> **`keyboardShouldPersistTaps="handled"`** on ScrollView is required when your form has buttons inside the scroll area. Without it, tapping a button while the keyboard is open first dismisses the keyboard, requiring a second tap to trigger the button.

---

## Part 7: Network Awareness

Mobile users go offline constantly. Your app must know and respond.

```tsx
// hooks/useNetworkStatus.ts
import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  return { isConnected, isInternetReachable };
}
```

```tsx
// Global network banner
function NetworkBanner() {
  const { isConnected } = useNetworkStatus();

  if (isConnected !== false) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>No internet connection</Text>
    </View>
  );
}
```

---

## Part 8: Storage Hierarchy

Know which storage layer to use for which data.

| Layer | Tool | Use For | Survives Kill? |
|---|---|---|---|
| React State | `useState` | Ephemeral UI state | No |
| Context | `useContext` | Shared in-session state | No |
| MMKV | `react-native-mmkv` | Fast key-value: prefs, tokens, flags | Yes |
| SQLite | `expo-sqlite` | Structured relational data, offline cache | Yes |
| File system | `expo-file-system` | Images, documents, large blobs | Yes |
| Keychain | `expo-secure-store` | Sensitive: tokens, passwords, keys | Yes (encrypted) |

```tsx
// Never store sensitive data in AsyncStorage or MMKV — both are unencrypted
// 
MMKV.set('auth.token', accessToken);

//  Use SecureStore for anything sensitive
import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('auth.token', accessToken);
```

---

## Fundamentals Implementation Checklist

- [ ] All `useEffect` subscriptions have cleanup functions
- [ ] `AppState` listener handles foreground/background transitions
- [ ] Long lists use `FlatList`, never `ScrollView` with mapped arrays
- [ ] `React.memo` and `useCallback` applied to list item components
- [ ] All `Animated` calls use `useNativeDriver: true` or Reanimated 2
- [ ] `SafeAreaProvider` wraps the root component
- [ ] `useSafeAreaInsets` used on all screens near screen edges
- [ ] `KeyboardAvoidingView` wraps all forms
- [ ] `keyboardShouldPersistTaps="handled"` set on form `ScrollView`s
- [ ] Network status monitored with NetInfo
- [ ] Sensitive data stored in `expo-secure-store`, not MMKV or AsyncStorage
- [ ] Heavy computation moved off the render path

---

## AI Prompt: Performance Audit

```
You are a senior React Native engineer auditing a mobile app for performance and correctness issues.

Here are components from my app:
[paste your FlatList implementation]
[paste your most complex screen component]
[paste your animation code]

Audit for:
1. JS thread blocking operations (synchronous storage reads, large JSON parsing in render)
2. Missing memo / useCallback causing unnecessary re-renders in lists
3. Animations not using useNativeDriver or Reanimated 2
4. Memory leaks from missing useEffect cleanup
5. AppState transitions not handled (stale data on foreground return)
6. Sensitive data stored in unencrypted storage

Return specific findings with file and line references. No general advice.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| `ScrollView` for long lists | Renders all items, crashes on large data | Use `FlatList` |
| `useNativeDriver: false` | Animation jank under any load | Always `useNativeDriver: true` or Reanimated |
| No `useEffect` cleanup | Memory leaks, ghost subscriptions | Return cleanup from every subscription |
| Sensitive data in AsyncStorage | Token theft from unencrypted storage | Use `expo-secure-store` |
| No `SafeAreaProvider` | Content behind notch, Dynamic Island | Wrap root with `SafeAreaProvider` |
| No keyboard handling on forms | Input fields hidden behind keyboard | `KeyboardAvoidingView` on all form screens |
| Ignoring AppState transitions | Stale data after background/foreground | Handle `change` event, refetch on foreground |
| Heavy computation in render | Dropped frames, slow screen transitions | Move to `useEffect` or a worker |

---

## Next: Tech Stack →

With platform fundamentals understood, the next topic formalizes the complete technology choices — every library, every service, every tool — that your app will be built on.
