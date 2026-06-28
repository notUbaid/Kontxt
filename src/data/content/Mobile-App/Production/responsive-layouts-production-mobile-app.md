---
title: Responsive Layouts
slug: responsive-layouts
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# Responsive Layouts

Mobile responsive design is not "make it work on all screen sizes."

It is "make it work on 4-inch budget phones, 6.7-inch flagships, tablets, foldables, landscape orientation, accessibility text sizes up to 310%, split-screen multitasking, and every combination of those simultaneously."

The apps that survive this without breaking are built on a layout system — not case-by-case pixel adjustments.

---

## The Mobile Screen Landscape

You are not designing for one screen. You are designing for a distribution.

```
iOS Devices (logical points):
  iPhone SE (3rd gen):   375 × 667pt    ← smallest current iPhone
  iPhone 15:             390 × 844pt    ← mainstream
  iPhone 15 Plus:        430 × 932pt    ← large
  iPhone 15 Pro Max:     430 × 932pt
  iPad Mini:             744 × 1133pt
  iPad Pro 12.9":        1024 × 1366pt

Android Devices (dp):
  Small budget phones:   360 × 640dp    ← must support
  Mainstream:            390 × 844dp
  Large:                 412 × 915dp
  Tablet (small):        600 × 960dp
  Tablet (large):        800 × 1280dp+
  Foldables (unfolded):  600–840dp wide
```

**Design at 390pt/dp width.** Test at 360dp (smallest) and 430pt (largest phone). Anything that breaks at these extremes is a layout bug.

---

## The Four Layout Rules

These four rules cover 90% of responsive layout problems on mobile.

### Rule 1: Never Hardcode Width

```
 width: 350        → Overflows on 360dp screens
 width: '90%'      → Unpredictable on tablets
 flex: 1           → Fills available space
 width: '100%'     → Full width of parent
 maxWidth: 480     → Caps on large screens, fills on small
```

Every full-width element uses `flex: 1` or `width: '100%'`. Content that should cap on large screens gets a `maxWidth`.

### Rule 2: Use Flex, Not Absolute Positioning

```
 position: 'absolute', top: 200, left: 20
   → Breaks on every screen size that isn't the one you designed on

 flexDirection: 'column', gap: spacing[4]
   → Stacks correctly regardless of screen height

Absolute positioning is legitimate for:
  → Floating action buttons (FAB)
  → Overlays and tooltips
  → Fixed-position elements (tab bar is handled by navigator)
  → Nothing else
```

### Rule 3: Respect Safe Areas

Safe areas are the regions where your content won't be obscured by system UI — notch, Dynamic Island, home indicator, status bar.

```
iOS safe area insets (approximate):
  Top:    44–59pt (status bar + notch/Dynamic Island)
  Bottom: 34pt    (home indicator on notch devices)
  Left:   0pt     (portrait) / 44pt (landscape)
  Right:  0pt     (portrait) / 44pt (landscape)

Android insets vary by manufacturer and Android version.
```

```typescript
// React Native — useSafeAreaInsets
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function Screen({ children }) {
  const insets = useSafeAreaInsets()

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      {children}
    </View>
  )
}

// Or use SafeAreaView wrapper
import { SafeAreaView } from 'react-native-safe-area-context'

function Screen({ children }) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      {children}
    </SafeAreaView>
  )
}
```

>  **Warning:** Content that ignores safe areas gets hidden behind the Dynamic Island, notch, or home indicator. On iPhones with Face ID, bottom content regularly disappears. Always wrap screens in safe area handling.

### Rule 4: Design for Keyboard

When a keyboard appears, it covers 40–50% of the screen. Inputs that appear visible in wireframes get buried.

```typescript
// KeyboardAvoidingView — shifts content above keyboard
import { KeyboardAvoidingView, Platform } from 'react-native'

function FormScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView>
        {/* form content */}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
```

Always test every form screen with the keyboard open. What you design is not what users see.

---

## Layout Primitives

Build your layouts from a small set of composable layout components. Never write raw flexbox for every screen.

```typescript
// components/layout/Stack.tsx — vertical stack with consistent spacing
interface StackProps {
  children: React.ReactNode
  gap?: keyof typeof spacing
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  padding?: keyof typeof spacing
}

export function Stack({ children, gap = 4, align = 'stretch', padding }: StackProps) {
  return (
    <View style={{
      flexDirection: 'column',
      gap: spacing[gap],
      alignItems: align,
      ...(padding && { padding: spacing[padding] }),
    }}>
      {children}
    </View>
  )
}

// components/layout/Row.tsx — horizontal row
interface RowProps {
  children: React.ReactNode
  gap?: keyof typeof spacing
  align?: 'flex-start' | 'center' | 'flex-end' | 'space-between'
  wrap?: boolean
}

export function Row({ children, gap = 2, align = 'center', wrap = false }: RowProps) {
  return (
    <View style={{
      flexDirection: 'row',
      gap: spacing[gap],
      alignItems: align,
      flexWrap: wrap ? 'wrap' : 'nowrap',
    }}>
      {children}
    </View>
  )
}

// components/layout/Screen.tsx — base screen wrapper
export function Screen({ children, scrollable = false }: ScreenProps) {
  const insets = useSafeAreaInsets()
  const Container = scrollable ? ScrollView : View

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Container
        style={{ flex: 1 }}
        contentContainerStyle={scrollable ? { paddingBottom: spacing[6] } : undefined}
      >
        {children}
      </Container>
    </SafeAreaView>
  )
}
```

---

## Breakpoint Strategy

Mobile-first means designing for the smallest screen, then scaling up.

```typescript
// hooks/useBreakpoint.ts
import { Dimensions } from 'react-native'

const BREAKPOINTS = {
  sm: 0,     // phone portrait (default)
  md: 768,   // tablet portrait / large phone landscape
  lg: 1024,  // tablet landscape
} as const

export function useBreakpoint() {
  const { width } = Dimensions.get('window')

  return {
    isSm: width < 768,
    isMd: width >= 768 && width < 1024,
    isLg: width >= 1024,
    isTablet: width >= 768,
    width,
  }
}

// Usage
function ProductGrid() {
  const { isTablet } = useBreakpoint()
  const columns = isTablet ? 3 : 2

  return (
    <FlatList
      data={products}
      numColumns={columns}
      key={columns} // forces re-render when columns change
      renderItem={({ item }) => (
        <View style={{ flex: 1 / columns, padding: spacing[2] }}>
          <ProductCard product={item} />
        </View>
      )}
    />
  )
}
```

---

## Common Layout Patterns

### Full-Screen with Sticky Footer

```typescript
function CheckoutScreen() {
  return (
    <Screen>
      {/* Scrollable content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing[4], paddingBottom: spacing[6] }}
      >
        <OrderSummary />
        <DeliveryDetails />
        <PaymentMethod />
      </ScrollView>

      {/* Sticky CTA — always visible */}
      <View style={{
        padding: spacing[4],
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
      }}>
        <Button variant="primary" size="lg" fullWidth>
          Place Order
        </Button>
      </View>
    </Screen>
  )
}
```

### Two-Column Grid

```typescript
function CategoryGrid({ items }: { items: Category[] }) {
  const { isTablet } = useBreakpoint()
  const numColumns = isTablet ? 3 : 2
  const itemWidth = (Dimensions.get('window').width - spacing[4] * 2 - spacing[3] * (numColumns - 1)) / numColumns

  return (
    <FlatList
      data={items}
      numColumns={numColumns}
      key={numColumns}
      contentContainerStyle={{ padding: spacing[4] }}
      columnWrapperStyle={{ gap: spacing[3] }}
      ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
      renderItem={({ item }) => (
        <View style={{ width: itemWidth }}>
          <CategoryCard category={item} />
        </View>
      )}
    />
  )
}
```

### Horizontal Scroll Row

```typescript
function FeaturedSection({ items }: { items: Item[] }) {
  return (
    <View>
      <Row style={{ paddingHorizontal: spacing[4] }} align="space-between">
        <Text style={textStyles.sectionTitle}>Featured</Text>
        <TouchableOpacity>
          <Text style={textStyles.link}>See all</Text>
        </TouchableOpacity>
      </Row>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing[4],
          gap: spacing[3],
          paddingVertical: spacing[2],
        }}
      >
        {items.map(item => (
          <View key={item.id} style={{ width: 160 }}>
            <ItemCard item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
```

### Modal / Bottom Sheet Layout

```typescript
function ActionSheet({ onClose }: { onClose: () => void }) {
  const insets = useSafeAreaInsets()

  return (
    <View style={{
      backgroundColor: colors.surface,
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
      paddingBottom: insets.bottom + spacing[4], // safe area + extra
    }}>
      {/* Drag handle */}
      <View style={{
        width: 36, height: 4,
        backgroundColor: colors.border,
        borderRadius: radius.full,
        alignSelf: 'center',
        marginTop: spacing[2],
        marginBottom: spacing[4],
      }} />

      {/* Content */}
      <Stack padding={4} gap={2}>
        <ActionItem icon="edit" label="Edit" onPress={() => {}} />
        <ActionItem icon="share" label="Share" onPress={() => {}} />
        <ActionItem icon="trash" label="Delete" destructive onPress={() => {}} />
      </Stack>
    </View>
  )
}
```

---

## Dynamic Type / Font Scaling

Users set their preferred text size in system settings. Production apps must respect this.

```typescript
// React Native handles this automatically when you use
// the default Text component without fixed heights

//  Breaks with large text — cuts off scaled text
<View style={{ height: 44 }}>
  <Text>Username</Text>
</View>

//  Grows with text size
<View style={{ minHeight: 44, paddingVertical: spacing[2] }}>
  <Text>Username</Text>
</View>

//  Fixed-height rows in lists break with large text
<View style={{ height: 60, flexDirection: 'row', alignItems: 'center' }}>

//  Min height with centered content
<View style={{ minHeight: 60, flexDirection: 'row', alignItems: 'center' }}>
```

**Never use `height` where `minHeight` would work.** Text that scales beyond a fixed container gets clipped. This is one of the most common accessibility failures in production apps.

---

## Orientation Support

Decide upfront: portrait-only, landscape-optional, or both.

```
Portrait-only (most apps):
  → Lock in app config
  → Simpler layouts
  → Correct for most consumer apps

Landscape-optional (media apps):
  → Video players should support landscape
  → Lock to portrait, unlock for specific screens
  → Test all primary screens in landscape anyway

Both orientations (tablet-first):
  → Different layout per orientation
  → More complex, more valuable on iPad
  → Grid layouts adapt automatically
```

```typescript
// Lock to portrait — React Native
// app.json (Expo)
{
  "expo": {
    "orientation": "portrait"
  }
}

// Unlock for specific screen (video player)
import * as ScreenOrientation from 'expo-screen-orientation'

useEffect(() => {
  ScreenOrientation.unlockAsync()
  return () => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
}, [])
```

---

## Layout Testing Checklist

Test every primary screen against this matrix before moving to development.

| Screen | 360dp | 390pt | 430pt | Tablet | Keyboard open | Large text (200%) |
|---|---|---|---|---|---|---|
| Sign In |  |  |  |  |  |  |
| Home |  |  |  |  | — |  |
| Detail |  |  |  |  | — |  |
| Profile |  |  |  |  | — |  |
| Settings |  |  |  |  | — |  |

Any cell that reveals a layout problem is a design bug, not a development bug. Fix it before writing code.

---

## AI Prompt: Layout Problem Solver

```
You are a senior React Native engineer solving a responsive layout problem.

Framework: React Native / Expo
Target platforms: iOS and Android
Minimum screen width: 360dp

Here is the screen I'm building:
[describe the screen — what elements it contains, their relationship]

Here is my current layout code:
[paste current implementation or describe the layout structure]

Problem:
[describe what breaks — overflow, clipping, keyboard hiding content, etc.]

Diagnose and fix:
1. Identify the root cause of the layout issue
2. Provide corrected layout code using flex (not absolute positioning)
3. Ensure safe area insets are handled correctly
4. Ensure keyboard-avoidance is implemented if inputs are present
5. Verify the layout works at 360dp, 390pt, and 768dp (tablet)
6. Note any dynamic text size considerations
```

---

## Implementation Checklist

- [ ] No hardcoded widths on full-width elements — `flex: 1` or `width: '100%'`
- [ ] All screens wrapped in `SafeAreaView` or using `useSafeAreaInsets`
- [ ] All form screens use `KeyboardAvoidingView`
- [ ] Layout primitives created: `Screen`, `Stack`, `Row`
- [ ] Token-based spacing everywhere — no magic numbers
- [ ] `minHeight` used instead of `height` on text containers
- [ ] Breakpoint hook created for phone vs tablet layouts
- [ ] Grid layouts use dynamic column count based on screen width
- [ ] Horizontal scroll sections have correct `paddingHorizontal`
- [ ] Bottom sheet / modal respects bottom safe area inset
- [ ] Orientation lock configured in app config
- [ ] All primary screens tested at 360dp minimum width
- [ ] All primary screens tested with keyboard open (if inputs present)
- [ ] All primary screens tested at 200% text size

---

## Common Mistakes

**Hardcoding pixel dimensions.**
`width: 340` looks perfect on the device you tested on. It overflows on a 360dp screen and wastes space on a 430pt screen. Dimensions must be relative or capped with `maxWidth`.

**Forgetting the home indicator.**
The bottom 34pt of every notch-era iPhone is the home indicator. Content placed without bottom safe area padding gets hidden or overlapped. Every screen needs `paddingBottom: insets.bottom`.

**Testing only on the default simulator.**
The iPhone 15 Pro simulator at 390pt is not representative. Always test on the smallest current device (iPhone SE at 375pt) and a large device (iPhone 15 Plus at 430pt). Android: test at 360dp.

**Fixed heights on list rows.**
List rows with `height: 72` work until a user sets large accessibility text. The text scales, the container doesn't, and the text gets clipped. Use `minHeight` and let content dictate actual height.

**Ignoring landscape on "portrait-only" apps.**
Even portrait-locked apps can briefly enter landscape if the user rotates before the lock engages, or on iPad if multitasking is enabled. Layouts that catastrophically break in landscape are a sign of fragile flexbox — fix the flex structure, don't rely on the lock.

---

## Quick Reference

```
Design at?                  → 390pt / 390dp
Test minimum?               → 360dp (Android budget)
Test maximum phone?         → 430pt (iPhone Plus)
Full-width elements?        → flex: 1 or width: '100%'
Safe area?                  → useSafeAreaInsets or SafeAreaView
Keyboard forms?             → KeyboardAvoidingView
Text containers?            → minHeight (never height)
Absolute positioning?       → FABs and overlays only
Tablet breakpoint?          → 768dp / 768pt
Column count on tablet?     → +1 vs phone (2→3, 3→4)
```

---

## What's Next

**Platform Guidelines** — your layouts adapt to screen size. The next module covers how to adapt to platform conventions — the specific iOS Human Interface Guidelines and Android Material Design rules that determine whether your app feels native or foreign to each platform's users.
