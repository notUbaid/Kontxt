---
title: Empty States
slug: empty-states
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 15–25 min
---

# Empty States

Empty states are the screens users see when there is nothing to show yet. They are not edge cases — they are the first experience every new user has with every feature in your app.

A blank screen with no guidance communicates failure. A well-designed empty state communicates possibility. The difference between the two is often the difference between a user who churns and one who activates.

---

## The Three Types of Empty States

Not all empty states are the same. Each requires a different response.

```
┌─────────────────┬──────────────────┬──────────────────────┐
│   FIRST USE     │    USER ACTION   │      NO RESULTS      │
│                 │                  │                      │
│ User has never  │ User cleared,    │ Search or filter     │
│ added content   │ deleted, or      │ returned nothing     │
│ to this feature │ completed all    │                      │
│                 │ items            │                      │
│ → Educate and   │ → Celebrate and  │ → Acknowledge and    │
│   inspire       │   guide next     │   help them adjust   │
│   action        │   step           │   the query          │
└─────────────────┴──────────────────┴──────────────────────┘
```

Designing the same empty state for all three contexts is a mistake. A "completed all tasks" state should feel celebratory. A "no search results" state should feel helpful. A "first use" state should feel inviting.

---

## Anatomy of an Effective Empty State

```
        ┌──────────────────────────────┐
        │                              │
        │         [Illustration]       │  ← Visual — not a generic icon
        │                              │
        │       No projects yet        │  ← Clear headline
        │                              │
        │   Create your first project  │
        │   to start collaborating     │  ← One sentence. No padding.
        │   with your team.            │
        │                              │
        │    [ + Create Project ]      │  ← Single primary CTA
        │                              │
        └──────────────────────────────┘
```

Every element earns its place:

| Element | Rule |
|---|---|
| Illustration | Specific to the feature — never a generic empty box icon |
| Headline | States the situation plainly — not a pun, not marketing copy |
| Body | One to two sentences. Explains what this feature does or what the next step is. |
| CTA | One action only. Primary button. Leads directly to resolution. |

---

## Part 1: Core Empty State Component

```tsx
// components/ui/EmptyState.tsx
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LoadingButton } from './LoadingButton';

interface EmptyStateProps {
  illustration?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onPress: () => void;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

export function EmptyState({
  illustration,
  title,
  description,
  action,
  secondaryAction,
  style,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      {illustration && (
        <View style={styles.illustration}>{illustration}</View>
      )}

      <Text style={styles.title}>{title}</Text>

      {description && (
        <Text style={styles.description}>{description}</Text>
      )}

      {action && (
        <LoadingButton
          label={action.label}
          onPress={action.onPress}
          loading={action.loading ?? false}
          style={styles.primaryAction}
        />
      )}

      {secondaryAction && (
        <Text
          style={styles.secondaryAction}
          onPress={secondaryAction.onPress}
        >
          {secondaryAction.label}
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
  illustration: {
    marginBottom: 28,
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
  primaryAction: {
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

---

## Part 2: Feature-Specific Empty States

Generic empty states waste an activation opportunity. Each major feature deserves its own.

```tsx
// components/empty-states/EmptyFeed.tsx
import { EmptyState } from '../ui/EmptyState';
import { FeedIllustration } from '../illustrations/FeedIllustration';

interface EmptyFeedProps {
  onFollowSuggestions: () => void;
}

export function EmptyFeed({ onFollowSuggestions }: EmptyFeedProps) {
  return (
    <EmptyState
      illustration={<FeedIllustration />}
      title="Your feed is empty"
      description="Follow people and projects to see their updates here."
      action={{
        label: 'Find people to follow',
        onPress: onFollowSuggestions,
      }}
    />
  );
}
```

```tsx
// components/empty-states/EmptySearch.tsx
interface EmptySearchProps {
  query: string;
  onClear: () => void;
}

export function EmptySearch({ query, onClear }: EmptySearchProps) {
  return (
    <EmptyState
      title={`No results for "${query}"`}
      description="Check the spelling or try a different search term."
      action={{
        label: 'Clear search',
        onPress: onClear,
      }}
    />
  );
}
```

```tsx
// components/empty-states/EmptyNotifications.tsx
export function EmptyNotifications() {
  return (
    <EmptyState
      illustration={<NotificationsIllustration />}
      title="You're all caught up"
      description="New activity from people you follow will appear here."
    />
    // No CTA — nothing for them to do
  );
}
```

```tsx
// components/empty-states/EmptyTaskList.tsx
// Completion empty state — different tone entirely
export function AllTasksComplete() {
  return (
    <EmptyState
      illustration={<CompletionIllustration />}
      title="All done!"
      description="You've completed everything for today."
      secondaryAction={{
        label: 'Add a new task',
        onPress: () => {},
      }}
    />
  );
}
```

---

## Part 3: Illustration Strategy

Illustrations are the highest-impact part of an empty state. A generic icon kills the moment.

### Option A: Custom SVG Illustrations (Recommended)

```tsx
// components/illustrations/FeedIllustration.tsx
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export function FeedIllustration() {
  return (
    <Svg width={160} height={140} viewBox="0 0 160 140" fill="none">
      {/* Build a simple, app-specific illustration */}
      {/* Keep to 2–3 brand colors + a neutral */}
      <Rect x="20" y="20" width="120" height="80" rx="8" fill="#F0F4FF" />
      <Circle cx="44" cy="44" r="16" fill="#C7D7FD" />
      <Rect x="68" y="34" width="56" height="8" rx="4" fill="#C7D7FD" />
      <Rect x="68" y="48" width="40" height="8" rx="4" fill="#E2EAFF" />
    </Svg>
  );
}
```

### Option B: Lottie Animations (Use Sparingly)

```tsx
import LottieView from 'lottie-react-native';
import { useReduceMotion } from '../../hooks/useReduceMotion';
import emptyAnimation from '../../assets/animations/empty-feed.json';

export function AnimatedEmptyFeed() {
  const reduceMotion = useReduceMotion();

  if (reduceMotion) {
    // Fall back to static illustration when motion is reduced
    return <FeedIllustration />;
  }

  return (
    <LottieView
      source={emptyAnimation}
      autoPlay
      loop={false}   // Play once — looping animations are distracting
      style={{ width: 160, height: 140 }}
    />
  );
}
```

> **Use Lottie only once per screen and only for high-value moments** — first use of a core feature, completion celebrations. A looping animation on every empty state is exhausting.

### Option C: Emoji (Acceptable for Low-Priority States)

```tsx
// For secondary screens where illustration effort isn't warranted
<Text style={{ fontSize: 48 }}></Text>
```

---

## Part 4: Empty States in Lists

Flat lists need inline empty state handling — not separate screens.

```tsx
// Usage with FlatList
<FlatList
  data={items}
  renderItem={renderItem}
  ListEmptyComponent={
    isLoading ? (
      <FeedSkeleton />
    ) : (
      <EmptyFeed onFollowSuggestions={navigateToSuggestions} />
    )
  }
  contentContainerStyle={
    items.length === 0 ? styles.emptyContainer : undefined
  }
/>

const styles = StyleSheet.create({
  emptyContainer: {
    flexGrow: 1,         // Makes the empty state center vertically
    justifyContent: 'center',
  },
});
```

> **`flexGrow: 1` on `contentContainerStyle`** is the key to vertically centering empty states inside a FlatList. Without it, the empty component renders at the top of the scroll area instead of the center of the screen.

---

## Part 5: Error vs Empty — Know the Difference

Empty states and error states are not the same. Never use one when you mean the other.

| Situation | Correct State |
|---|---|
| API returned 200, zero results | Empty state |
| API returned 200, user has no data yet | Empty state (first use) |
| API returned 404 | Error state |
| API returned 500 | Error state with retry |
| Network offline | Offline state (separate treatment) |
| API returned data but filter hides all | Empty state (filtered) |

```tsx
// Don't collapse these into one component
function FeedScreen() {
  const { data, isLoading, error } = useFeed();

  if (isLoading) return <FeedSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;          // ← Error
  if (data.length === 0) return <EmptyFeed onFollow={...} />;  // ← Empty
  return <Feed data={data} />;
}
```

---

## Part 6: Copy Guidelines

Empty state copy is UI copy — not marketing copy.

```
 "No projects yet"
 "Looks like you haven't created any projects!"

 "No results for 'figma plugin'"
 "Hmm, we couldn't find anything matching your search."

 "Your inbox is empty"
 "Woohoo! You've cleared your inbox "
  (save celebrations for completion states, not routine empty inboxes)

 "You're all done for today"
 "Nothing to see here!"
```

Rules:
- **Plain language** — describe the state factually
- **No exclamation points** on neutral empty states
- **Celebrate** actual accomplishments (completed all tasks), not neutral states (empty inbox)
- **One sentence** in the body — two maximum
- **CTA copy is a verb phrase** — "Create project", "Find people", "Add a task"

---

## Implementation Checklist

- [ ] `EmptyState` base component built and reusable
- [ ] First-use empty state designed for every major feature
- [ ] Completion empty states differentiated from first-use states
- [ ] Search/filter empty states handle the query string in the title
- [ ] Illustrations are feature-specific, not generic icons
- [ ] Lottie animations fall back to static illustration when `reduceMotion` is enabled
- [ ] FlatList uses `contentContainerStyle` with `flexGrow: 1` for vertical centering
- [ ] Empty state and error state are separate components — never conflated
- [ ] Empty state CTA leads directly to the action that resolves the empty state
- [ ] Copy reviewed: plain language, no filler phrases, verb-phrase CTAs

---

## AI Prompt: Empty State Copy & Design

```
You are a senior mobile product designer reviewing empty state design for a mobile app.

App type: [describe your app]

Here are the screens that need empty states:
[list each screen / feature]

For each screen, generate:
1. The empty state type (first-use / completion / no-results / filtered)
2. A headline (5 words or fewer)
3. A body sentence (one sentence, plain language)
4. CTA label (verb phrase)
5. Whether a secondary action is needed and what it is
6. Whether this warrants an illustration, a Lottie animation, or an emoji

Apply these rules: no exclamation points on neutral states, no filler phrases, celebrate only genuine accomplishments.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Generic "Nothing here yet" copy | Tells the user nothing — where do they go? | Feature-specific copy with a direct CTA |
| Same empty state for first-use and completion | Wrong emotional tone | Differentiate: inviting vs celebratory |
| No CTA on first-use state | User has no path forward | Always add a primary action |
| Error state shown for empty results | Confuses the user — is something broken? | 200 + no data = empty state, not error |
| Empty state at top of FlatList, not centered | Looks unfinished | Add `flexGrow: 1` to `contentContainerStyle` |
| Looping Lottie animation | Distracting, battery drain | Loop only intentionally; default to `loop={false}` |
| Illustration that doesn't match the feature | Feels copy-pasted | One illustration per major feature |

---

## Next: Error States →

Empty states handle the absence of data. Error states handle the failure to get it.
