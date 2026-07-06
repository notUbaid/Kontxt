---
title: Animations
slug: animations
phase: Phase 1
mode: hackathon
projectType: mobile-app
estimatedTime: 20–30 min
---

# Animations

Animation is the difference between an app that looks good and an app that feels alive.

In a hackathon demo, motion is one of the fastest ways to signal quality. A well-placed transition, a satisfying state change, a loading sequence with personality — these are what judges remember when they close your app and go vote.

The trap is doing too much. Overanimated apps feel like student projects. The goal is purposeful motion: every animation earns its place by communicating something or improving an interaction.

---

## The Animation Hierarchy

Not all animations are equal. In a hackathon, spend your motion budget in this order:

```
1. Transitions       — How screens appear and disappear
2. State changes     — How UI responds to user actions
3. The wow moment    — One signature animation tied to your demo anchor
4. Ambient motion    — Subtle background life (only if time remains)
```

Build top to bottom. Stop wherever time runs out. Transitions alone are worth more than ambient motion with broken transitions.

---

## 1. Screen Transitions

The default screen transitions on most platforms are fine. But fine is forgettable.

A custom transition that matches your app's personality costs 30–60 minutes and elevates every screen change in the demo.

**React Native / Expo (with Expo Router):**

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',     // iOS-like push
        // animation: 'fade',              // Clean, modern
        // animation: 'slide_from_bottom', // Modal feel
        headerShown: false,
      }}
    />
  )
}
```

**React Native Reanimated — custom fade + slide transition:**

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import { useEffect } from 'react'

export function FadeSlideIn({ children }: { children: React.ReactNode }) {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(16)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 })
    translateY.value = withTiming(0, { duration: 300 })
  }, [])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  return <Animated.View style={style}>{children}</Animated.View>
}
```

Wrap any screen's root view with `<FadeSlideIn>` for instant perceived quality improvement.

**Flutter:**

```dart
// Custom page route with fade + slide
class FadeSlideRoute extends PageRouteBuilder {
  final Widget page;

  FadeSlideRoute({required this.page})
      : super(
          pageBuilder: (context, animation, secondaryAnimation) => page,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            final tween = Tween(begin: const Offset(0, 0.05), end: Offset.zero)
                .chain(CurveTween(curve: Curves.easeOut));
            return FadeTransition(
              opacity: animation,
              child: SlideTransition(
                position: animation.drive(tween),
                child: child,
              ),
            );
          },
          transitionDuration: const Duration(milliseconds: 280),
        );
}
```

---

## 2. State Change Animations

These are the micro-responses to user actions. They confirm that the app received input and something is happening.

### Button press → loading state

```tsx
// React Native — animated button with loading state
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'

function AnimatedButton({ onPress, loading, label }) {
  const scale = useSharedValue(1)

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 })
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : <Text>{label}</Text>}
      </Pressable>
    </Animated.View>
  )
}
```

### List item appearance

Staggered list entry animation — each item fades in slightly after the previous one. One of the highest-impact, lowest-effort animations in mobile UI.

```tsx
function AnimatedListItem({ index, children }) {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(12)

  useEffect(() => {
    const delay = index * 60  // 60ms stagger between items

    opacity.value = withDelay(delay, withTiming(1, { duration: 250 }))
    translateY.value = withDelay(delay, withTiming(0, { duration: 250 }))
  }, [])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  return <Animated.View style={style}>{children}</Animated.View>
}
```

Apply this to any feed, results list, or card grid. It makes generated content feel like it was crafted, not dumped onto the screen.

---

## 3. The Wow Moment Animation

Your demo anchor is the one moment judges remember. It deserves your best motion work.

Define the animation for your wow moment explicitly before building it. Ask:

- What is the visual state before?
- What triggers the animation?
- What is the visual state after?
- What should the motion feel like? (fast and snappy / slow and dramatic / bouncy / smooth)

**Common wow moment patterns:**

### AI result reveal

A result that builds or types itself in feels more alive than content that appears instantly.

```tsx
// Typewriter effect for AI-generated text
function TypewriterText({ text, speed = 18 }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text])

  return <Text>{displayed}</Text>
}
```

### Number counter

A stat or score that counts up to its final value on reveal.

```tsx
function CountUp({ target, duration = 1200 }) {
  const value = useSharedValue(0)

  useEffect(() => {
    value.value = withTiming(target, { duration })
  }, [target])

  const text = useDerivedValue(() =>
    Math.round(value.value).toString()
  )

  return <AnimatedText text={text} />
}
```

### Card flip / reveal

```tsx
const rotateY = useSharedValue(0)

const frontStyle = useAnimatedStyle(() => ({
  transform: [{ rotateY: `${rotateY.value}deg` }],
  backfaceVisibility: 'hidden',
}))

const backStyle = useAnimatedStyle(() => ({
  transform: [{ rotateY: `${rotateY.value + 180}deg` }],
  backfaceVisibility: 'hidden',
  position: 'absolute',
}))

const flip = () => {
  rotateY.value = withSpring(rotateY.value === 0 ? 180 : 0, {
    damping: 14,
    stiffness: 120,
  })
}
```

---

## Animation Principles That Prevent Over-Engineering

**Duration:**
- UI feedback (button press, tap response): 100–150ms
- Screen transitions: 250–350ms
- Wow moment / reveal: 400–800ms
- Nothing in a mobile app should take longer than 800ms

**Easing:**
- Entering elements: ease-out (fast start, slow finish — feels natural)
- Exiting elements: ease-in (slow start, fast finish — gets out of the way)
- Elastic / bouncy: use sparingly — only where playfulness is intentional

**Spring vs Timing:**
- `withSpring` — Feels physical and alive. Use for UI elements responding to touch.
- `withTiming` — Precise and controlled. Use for reveals, fades, and state changes.

**The subtraction rule:** After building your animations, remove one. The remaining set will feel more intentional.

---

## Flutter Animation Quick Reference

```dart
// Implicit animation — simplest option
AnimatedOpacity(
  opacity: _visible ? 1.0 : 0.0,
  duration: const Duration(milliseconds: 300),
  child: myWidget,
)

AnimatedContainer(
  duration: const Duration(milliseconds: 250),
  curve: Curves.easeOut,
  height: _expanded ? 200 : 60,
  child: myWidget,
)

// Explicit animation — full control
late AnimationController _controller;
late Animation<double> _animation;

@override
void initState() {
  super.initState();
  _controller = AnimationController(
    duration: const Duration(milliseconds: 400),
    vsync: this,
  );
  _animation = CurvedAnimation(
    parent: _controller,
    curve: Curves.easeOutCubic,
  );
  _controller.forward();
}
```

---

## AI Prompt — Animation Planning

Use this before writing animation code to get a targeted implementation plan.

```
I am building a mobile app for a hackathon.

App: [one-sentence description]
Stack: [React Native + Reanimated / Flutter / other]
Demo anchor (wow moment): [describe it]

My demo flow: [Screen 1 → Screen 2 → Screen 3 → ...]

Help me plan a focused animation strategy:

1. Screen transitions — what transition style fits the personality of my app?
   Recommend one transition type and provide implementation code for my stack.

2. State change animations — for each of the following interactions,
   recommend whether to animate and how:
   - Primary button press and loading state
   - List or card items appearing
   - [Any specific interaction in my app]

3. Wow moment animation — for my demo anchor ([describe it]),
   design the animation:
   - Before state
   - Trigger
   - Animation sequence
   - After state
   Provide working implementation code for my stack.

4. What NOT to animate — given my time constraints, what should I skip?

Keep suggestions to what I can implement in 2–3 hours.
Output working code for my stack, not pseudocode.
```

---

## Animation Checklist

- [ ] Screen transitions: one consistent transition applied to all demo flow screens
- [ ] Primary button: press feedback (scale) + loading state transition
- [ ] Content lists or cards: staggered entry animation
- [ ] Wow moment: has a dedicated, designed animation sequence
- [ ] All animation durations are under 800ms
- [ ] No animation plays on repeat unless it is a loading state
- [ ] Reduced motion: animations degrade gracefully (not required for hackathon, but respect the platform)
- [ ] Animations do not block user interaction (loading states disable their button; nothing else freezes the UI)

---

## What Comes Next

Motion is defined. Now you design the specific states that appear while users wait.

Next module: **Loading** — how to make every async moment feel intentional, not broken.
