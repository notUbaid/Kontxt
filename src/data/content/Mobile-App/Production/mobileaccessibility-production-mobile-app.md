---
title: Accessibility
slug: accessibility
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# Accessibility

One in four adults has a disability that affects how they use technology.

That's not a niche edge case. That's a quarter of your users — people with visual impairments using screen readers, people with motor disabilities using switch access, people with cognitive disabilities who need clear language and predictable navigation, people with temporary impairments (broken arm, bright sunlight, holding a baby).

Accessible apps are better apps. The constraints that make an app usable for someone with a disability — clear hierarchy, consistent navigation, adequate contrast, legible text — improve the experience for everyone.

---

## Accessibility is Also a Business Requirement

```
Legal:
  → ADA (Americans with Disabilities Act) applies to apps in the US
  → WCAG 2.1 AA is the globally accepted standard
  → EU Accessibility Act mandates compliance for EU market apps (2025)
  → Lawsuits over inaccessible apps are common and costly

Platform:
  → Apple App Store review checks for basic VoiceOver support
  → Severe VoiceOver failures can cause rejection
  → Apps that crash or produce meaningless output with VoiceOver enabled get rejected

Market:
  → 1.3 billion people worldwide have a significant disability
  → Accessible apps rank better in App Store search
  → Enterprise app procurement increasingly requires WCAG compliance
```

---

## The Four Principles (WCAG POUR)

Everything in accessibility maps to one of these four principles.

```
Perceivable    → Users can perceive all content
                 (contrast, text size, alternatives for images)

Operable       → Users can operate all interactive elements
                 (touch targets, keyboard/switch access, no time limits)

Understandable → Users can understand content and UI
                 (clear language, consistent navigation, error guidance)

Robust         → Content works with assistive technologies
                 (screen readers, switch access, correct semantics)
```

---

## Visual Accessibility

### Color Contrast

```
Minimum ratios (WCAG AA):
  Normal text (< 18pt / 14pt bold):   4.5:1
  Large text (≥ 18pt / 14pt bold):    3.0:1
  UI components and icons:            3.0:1
  Decorative elements:                no requirement

Enhanced ratios (WCAG AAA — recommended for body text):
  Normal text:   7.0:1
  Large text:    4.5:1

Common failures:
  Light gray on white:  #999999 on #FFFFFF = 2.85:1  
  Medium gray on white: #767676 on #FFFFFF = 4.54:1   (barely)
  Dark gray on white:   #595959 on #FFFFFF = 7.0:1   

Check every text color combination:
  → Figma: Contrast plugin (Stark, Able)
  → Web: webaim.org/resources/contrastchecker
  → iOS: Xcode Accessibility Inspector
```

### Never Use Color Alone

Color-blind users affect 8% of men, 0.5% of women. Never use color as the only way to communicate information.

```
 Red text = error, green text = success (color only)
 Error icon + red text + error message below field

 Active tab shown only by color change
 Active tab: color change + icon fill + font weight change

 Required fields marked only with red asterisk
 Required fields: asterisk + "Required" label or form note

 Progress shown only by color fill
 Progress: color fill + percentage text + accessible label
```

### Text Size and Scaling

```
Minimum sizes:
  Body text:      16pt / 16sp minimum
  Caption text:   12pt minimum (14pt preferred)
  Button labels:  14pt minimum

Dynamic Type / Font Scale:
  → Users can set text size up to 310% in accessibility settings
  → Your layouts must not clip or overflow at these sizes
  → Test at: Default, Large, Accessibility Large (200%+)

Implementation:
```

```typescript
//  Scalable text — respects user settings
<Text style={{ fontSize: 16 }}>Body text</Text>
// React Native automatically scales with system font size

//  Locked text size — ignores accessibility settings
<Text style={{ fontSize: 16, allowFontScaling: false }}>
  Never do this for content text
</Text>

// allowFontScaling: false is acceptable ONLY for:
// → Icons rendered as text (symbol fonts)
// → Fixed-dimension UI elements where scaling would break layout
// → Always provide alternative accessible text in those cases
```

---

## Screen Reader Support

Screen readers (VoiceOver on iOS, TalkBack on Android) read the screen aloud and allow navigation by swipe. Every interactive element must be correctly labeled.

### Labeling Interactive Elements

```typescript
//  Icon-only button — screen reader says "button" or nothing
<TouchableOpacity onPress={handleDelete}>
  <TrashIcon />
</TouchableOpacity>

//  Labeled icon button
<TouchableOpacity
  onPress={handleDelete}
  accessible={true}
  accessibilityLabel="Delete post"
  accessibilityHint="Permanently removes this post. Cannot be undone."
  accessibilityRole="button"
>
  <TrashIcon />
</TouchableOpacity>

//  Image with meaningful content
<Image
  source={{ uri: user.avatar }}
  accessibilityLabel={`${user.name}'s profile photo`}
/>

//  Decorative image (screen reader skips it)
<Image
  source={decorativeBackground}
  accessible={false}
  accessibilityElementsHidden={true}
/>
```

### Accessibility Roles

```typescript
// Roles tell screen readers what the element is
accessibilityRole="button"       // tappable action
accessibilityRole="link"         // navigates to new location
accessibilityRole="header"       // section heading (VoiceOver navigates by header)
accessibilityRole="image"        // non-interactive image
accessibilityRole="checkbox"     // toggleable with two states
accessibilityRole="switch"       // on/off toggle
accessibilityRole="tab"          // tab in a tab bar
accessibilityRole="text"         // plain text (default)
accessibilityRole="search"       // search field
accessibilityRole="menu"         // menu container
accessibilityRole="menuitem"     // item in a menu
```

### Accessibility State

```typescript
// Communicate current state to screen readers
<TouchableOpacity
  accessibilityRole="checkbox"
  accessibilityState={{
    checked: isSelected,
    disabled: isDisabled,
    expanded: isExpanded,  // for accordions
    selected: isActive,    // for tabs, list items
  }}
  onPress={toggle}
>
  <CheckboxIcon checked={isSelected} />
  <Text>Subscribe to newsletter</Text>
</TouchableOpacity>
```

### Grouping Related Elements

```typescript
//  Screen reader focuses each element separately
<View>
  <Image source={product.image} />
  <Text>{product.name}</Text>
  <Text>{product.price}</Text>
  <Text></Text>
</View>

//  Grouped — screen reader reads as one element
<View
  accessible={true}
  accessibilityLabel={`${product.name}, ${product.price}, 4 out of 5 stars`}
>
  <Image source={product.image} accessible={false} />
  <Text>{product.name}</Text>
  <Text>{product.price}</Text>
  <Text></Text>
</View>
```

### Focus Management

```typescript
import { AccessibilityInfo, findNodeHandle } from 'react-native'

// Move focus to a specific element (e.g., after modal opens)
const ref = useRef(null)

useEffect(() => {
  if (isModalOpen) {
    const node = findNodeHandle(ref.current)
    if (node) AccessibilityInfo.setAccessibilityFocus(node)
  }
}, [isModalOpen])

// Announce dynamic content changes
AccessibilityInfo.announceForAccessibility('3 new notifications')

// Check if screen reader is active
const [isScreenReaderOn, setIsScreenReaderOn] = useState(false)
useEffect(() => {
  AccessibilityInfo.isScreenReaderEnabled().then(setIsScreenReaderOn)
  const sub = AccessibilityInfo.addEventListener('screenReaderChanged', setIsScreenReaderOn)
  return () => sub.remove()
}, [])
```

---

## Touch Target Size

```
Minimum touch targets:
  Apple HIG:    44 × 44pt
  Material:     48 × 48dp
  WCAG 2.5.5:   44 × 44px (Level AAA)

Never size a touch target below 44×44pt, even if the visual is smaller.
Expand the hit area with padding, not the visual size.
```

```typescript
//  Small icon with large touch target
<TouchableOpacity
  style={{
    padding: 12,           // extends touch area to 48×48dp (24dp icon + 12dp padding each side)
    alignItems: 'center',
    justifyContent: 'center',
  }}
  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}  // additional hit area expansion
  accessibilityLabel="Close"
>
  <CloseIcon size={24} />
</TouchableOpacity>
```

---

## Motion and Animation

Some users experience nausea, dizziness, or seizures from motion. Always respect the "Reduce Motion" system setting.

```typescript
import { AccessibilityInfo } from 'react-native'
import Animated from 'react-native-reanimated'

// Check reduce motion preference
const [reduceMotion, setReduceMotion] = useState(false)

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion)
  const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion)
  return () => sub.remove()
}, [])

// Provide non-motion alternative
function AnimatedCard({ children }) {
  const scale = useSharedValue(1)

  function onPressIn() {
    if (!reduceMotion) {
      scale.value = withSpring(0.97)
    }
  }

  return (
    <Animated.View style={useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }))}>
      {children}
    </Animated.View>
  )
}

// Reanimated 3 — built-in reduce motion support
import { ReduceMotion } from 'react-native-reanimated'

withSpring(targetValue, { reduceMotion: ReduceMotion.System })
```

**Rules:**
- Parallax effects: disable when reduce motion is on
- Animated transitions: simplify to cross-fade when reduce motion is on
- Auto-playing video/animation: pause when reduce motion is on
- Essential animations (loading spinner): always allowed — they communicate state

---

## Forms and Error Handling

Accessible forms prevent users from getting stuck.

```typescript
//  Accessible form field
function FormField({ label, value, onChange, error, required }) {
  const inputRef = useRef(null)

  return (
    <View accessible={false}>
      <Text
        style={styles.label}
        accessibilityElementsHidden={true} // label is read via accessibilityLabel on input
      >
        {label}{required && ' *'}
      </Text>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChange}
        accessibilityLabel={`${label}${required ? ', required' : ''}`}
        accessibilityHint={error ? `Error: ${error}` : undefined}
        accessibilityInvalidated={!!error}  // marks field as invalid for screen readers
        style={[styles.input, error && styles.inputError]}
      />

      {error && (
        <Text
          style={styles.errorText}
          accessibilityLiveRegion="polite"  // announces to screen reader when it appears
          role="alert"
        >
          {error}
        </Text>
      )}
    </View>
  )
}
```

---

## Cognitive Accessibility

Often overlooked. Critical for broad usability.

```
Clear language:
  → Reading level: aim for Grade 8 or below for general audiences
  → Avoid jargon, acronyms without explanation
  → Error messages say what happened and what to do next
  → Button labels are verbs that describe the action ("Save changes", not "OK")

Consistent navigation:
  → Same actions in same locations across screens
  → Don't move UI elements between sessions
  → Breadcrumbs or clear back paths for multi-step flows

Forgiving interactions:
  → Confirm before destructive actions
  → Undo where possible
  → Clear error recovery (don't clear form on error)
  → No time limits on forms (or warn clearly and allow extension)

Focus and attention:
  → One primary action per screen
  → No auto-advancing carousels (or provide pause control)
  → No flashing content (seizure risk, also distracting)
  → Clear visual hierarchy — most important content first
```

---

## Testing Accessibility

Design reviews catch obvious failures. Testing catches real ones.

```
Manual testing — do this before every release:

iOS VoiceOver:
  1. Settings → Accessibility → VoiceOver → On
  2. Triple-click home / side button to toggle (set in Accessibility Shortcut)
  3. Navigate your core flows by swipe only
  4. Verify every interactive element has a meaningful label
  5. Verify reading order makes logical sense
  6. Verify focus moves correctly after navigation and modal open/close

Android TalkBack:
  1. Settings → Accessibility → TalkBack → On
  2. Navigate your core flows
  3. Same checks as VoiceOver

Contrast checking:
  → iOS Accessibility Inspector (Xcode) → Audit
  → Figma: Stark plugin during design phase
  → Test in bright sunlight if possible

Text scaling:
  → iOS: Settings → Accessibility → Display & Text Size → Larger Text
  → Set to maximum accessibility size
  → Navigate core screens — nothing should clip or overflow

Automated testing:
  → Detox / Maestro can test accessibilityLabel presence
  → React Native Testing Library checks accessibility props
  → Integrate contrast ratio checks in CI with axe-core (web) or custom scripts
```

---

## AI Prompt: Accessibility Audit

```
You are a senior accessibility engineer auditing a React Native mobile app.

Platform: iOS and Android
Framework: React Native / Expo

Here is a component that handles [describe what it does]:
[paste component code]

Audit for:
1. Missing or incorrect accessibilityLabel on interactive elements
2. Missing accessibilityRole definitions
3. Missing accessibilityState for dynamic elements
4. Touch targets below 44×44pt (iOS) / 48×48dp (Android)
5. Color contrast issues (describe any text/background combinations)
6. Focus management problems (modals, navigation transitions)
7. Motion that doesn't respect reduceMotion
8. Form fields missing error announcements
9. Images missing meaningful labels
10. Grouped elements that should be combined for screen reader UX

Output: corrected component code with accessibility issues fixed and comments explaining each change.
```

---

## Implementation Checklist

**Visual**
- [ ] All text/background color combinations pass 4.5:1 contrast (body) or 3:1 (large text)
- [ ] Information never communicated by color alone (icon + color + text)
- [ ] Minimum 16pt body text, 12pt captions
- [ ] Dynamic Type / Font Scale respected — no `allowFontScaling: false` on content

**Screen Reader**
- [ ] All interactive elements have `accessibilityLabel`
- [ ] All interactive elements have `accessibilityRole`
- [ ] Dynamic state reflected in `accessibilityState`
- [ ] Related elements grouped with `accessible={true}` on container
- [ ] Decorative images marked `accessible={false}`
- [ ] Focus moves to modal/sheet content on open
- [ ] Dynamic content changes announced with `announceForAccessibility`

**Touch**
- [ ] All touch targets minimum 44×44pt (iOS) / 48×48dp (Android)
- [ ] `hitSlop` used to extend small visual targets

**Motion**
- [ ] `AccessibilityInfo.isReduceMotionEnabled` checked
- [ ] Animations simplified or disabled when reduce motion is on
- [ ] No auto-playing looping animations

**Forms**
- [ ] Error messages use `accessibilityLiveRegion="polite"`
- [ ] Invalid fields marked with `accessibilityInvalidated`
- [ ] No form data cleared on error

**Testing**
- [ ] VoiceOver core flows tested before release
- [ ] TalkBack core flows tested before release
- [ ] Tested at 200% text scale
- [ ] Contrast ratios verified with tool (not eyeball)

---

## Common Mistakes

**Labels that repeat the role.**
`accessibilityLabel="button delete"` on a `role="button"` element causes VoiceOver to read "button delete button." The role is announced automatically. The label should describe what the button does: `accessibilityLabel="Delete post"`.

**Placeholder text as the only label.**
Placeholder disappears when the user starts typing. If it was the only label, the user can't remember what the field is for. Always use a visible, persistent label above the input.

**Grouping too many elements.**
Grouping a whole card as one accessible element can hide important actions inside. Group static display content. Keep interactive elements (buttons within a card) separately accessible.

**No focus management after navigation.**
A modal opens but VoiceOver focus stays on the button that opened it, not the modal. Users have to explore the screen to find the new content. Move focus explicitly on open, restore it on close.

**Testing only on simulator.**
VoiceOver behavior on a simulator differs from a physical device. Run your accessibility audit on real hardware before every major release.

---

## Quick Reference

```
Body text contrast min?          → 4.5:1
Large text contrast min?         → 3.0:1
UI component contrast min?       → 3.0:1
Touch target min (iOS)?          → 44 × 44pt
Touch target min (Android)?      → 48 × 48dp
Screen reader label prop?        → accessibilityLabel
Screen reader role prop?         → accessibilityRole
Dynamic state prop?              → accessibilityState
Live region announcements?       → accessibilityLiveRegion="polite"
Reduce motion check?             → AccessibilityInfo.isReduceMotionEnabled
Decorative image?                → accessible={false}
```

---

## What's Next

**Loading States** — accessible, well-designed loading states are part of both UX and accessibility. The next module covers skeleton screens, progressive loading, optimistic UI, and how to communicate loading state to both sighted users and screen readers.
