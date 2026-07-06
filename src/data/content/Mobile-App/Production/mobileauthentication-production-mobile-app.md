---
title: Authentication
slug: authentication
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 35–50 min
---

# Authentication

Authentication on mobile is more complex than on web — and the mistakes are more consequential.

Tokens live on devices that get lost, stolen, or compromised. Sessions run for weeks without a browser to enforce cookie policies. Users switch between phones. Biometrics add a second factor that never leaves the device. App versions in the wild cannot be force-updated to fix auth bugs.

Get this right in architecture. It is expensive to retrofit.

---

## The Mobile Auth Stack

Every production mobile app needs these four layers working together:

```
1. Identity Provider   — who verifies the user's credentials
2. Token Management    — how tokens are issued, stored, refreshed, and revoked
3. Secure Storage      — where tokens live on the device
4. Session Strategy    — how long sessions last and how they end
```

Decisions at each layer affect security, UX, and development complexity. Work through them in order.

---

## Layer 1 — Identity Provider

### Option A — Managed Auth (Recommended for most apps)

Use an auth provider that handles credential storage, token issuance, OAuth flows, and security patches.

| Provider | Best For |
|---|---|
| **Supabase Auth** | Apps already on Supabase. Email, OAuth, magic links, phone OTP. |
| **Firebase Auth** | Apps on Firebase. Broad OAuth support, phone auth, anonymous auth. |
| **Clerk** | Best developer experience. Built-in UI components. |
| **Auth0** | Enterprise features, fine-grained access control, high compliance requirements. |

Managed auth is the right default. The time cost of building auth correctly from scratch — token rotation, brute-force protection, password reset flows, OAuth state management — far exceeds the time cost of integrating a provider.

### Option B — Custom Auth

Build only if you have requirements a managed provider cannot meet: extreme data residency constraints, deeply custom token claims, or specific compliance needs.

If you build custom:
- Use a battle-tested library (Passport.js, NextAuth, FastAPI-Users) — never roll your own crypto
- Implement refresh token rotation (see Layer 2)
- Store hashed passwords with bcrypt or Argon2 — never SHA or MD5
- Rate limit all auth endpoints

---

## Layer 2 — Token Management

Mobile apps use JWT or opaque tokens for authentication. The critical decisions:

### Access token + refresh token pattern

```
Access token:   Short-lived (15 min – 1 hour). Sent with every API request.
Refresh token:  Long-lived (7–30 days). Used only to get new access tokens.
```

Short-lived access tokens limit the damage of a compromised token. If an attacker intercepts one, it expires quickly. The refresh token — which is longer-lived — is stored more carefully and used less frequently.

```
Client                          Server
  |                               |
  |-- POST /auth/refresh -------> |
  |   { refreshToken }            |
  |                               |-- Validate refresh token
  |                               |-- Issue new access token
  |                               |-- Rotate refresh token (optional)
  |<-- { accessToken, refreshToken } --
  |                               |
  |-- GET /api/data ------------> |
  |   Authorization: Bearer {at}  |
```

### Refresh token rotation

When a refresh token is used, immediately invalidate it and issue a new one. This detects token theft: if an attacker uses a stolen refresh token, the legitimate user's next refresh attempt will fail with an invalid token error — alerting you to the breach.

```ts
// Server — refresh token endpoint
app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body

  const stored = await db.refreshTokens.findUnique({
    where: { token: hashToken(refreshToken) }
  })

  if (!stored || stored.expiresAt < new Date()) {
    // Token invalid or expired
    // If this token was already used, it may indicate theft
    if (stored?.usedAt) {
      await revokeAllUserTokens(stored.userId)  // Nuclear option — force re-login
    }
    return res.status(401).json({ error: { code: 'INVALID_REFRESH_TOKEN' } })
  }

  // Mark as used and issue new tokens
  await db.refreshTokens.update({
    where: { id: stored.id },
    data: { usedAt: new Date() }
  })

  const newRefreshToken = await createRefreshToken(stored.userId)
  const newAccessToken = createAccessToken(stored.userId)

  res.json({ data: { accessToken: newAccessToken, refreshToken: newRefreshToken } })
})
```

### Token claims

Keep JWTs lean. Include only what you need on every request:

```ts
// Access token payload
{
  sub: "user-uuid",           // Subject — the user ID
  role: "user",               // For RBAC
  iat: 1716239022,            // Issued at
  exp: 1716242622,            // Expires at (1 hour)
}
```

Do not put sensitive data (email, name, payment info) in JWT claims — the payload is base64-encoded, not encrypted. Anyone who holds the token can decode it.

---

## Layer 3 — Secure Storage

This is the most commonly misconfigured part of mobile auth.

### What NOT to use

```ts
//  AsyncStorage — plain text, not encrypted, accessible to other processes
await AsyncStorage.setItem('auth_token', token)

//  SecureStore in the Keychain without access controls
// (accessible even when device is locked)

//  Hardcoded tokens for testing left in committed code
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### React Native — Expo SecureStore

```bash
npx expo install expo-secure-store
```

```ts
import * as SecureStore from 'expo-secure-store'

// Store — encrypted using device keychain / keystore
await SecureStore.setItemAsync('access_token', accessToken, {
  keychainAccessible: SecureStore.WHEN_UNLOCKED,  // Only accessible when device is unlocked
})

await SecureStore.setItemAsync('refresh_token', refreshToken, {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,  // Not backed up to iCloud
})

// Retrieve
const token = await SecureStore.getItemAsync('access_token')

// Delete on logout
await SecureStore.deleteItemAsync('access_token')
await SecureStore.deleteItemAsync('refresh_token')
```

### Flutter — flutter_secure_storage

```bash
flutter pub add flutter_secure_storage
```

```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = const FlutterSecureStorage(
  aOptions: AndroidOptions(encryptedSharedPreferences: true),
  iOptions: IOSOptions(accessibility: KeychainAccessibility.WHEN_UNLOCKED),
);

// Store
await storage.write(key: 'access_token', value: accessToken);
await storage.write(key: 'refresh_token', value: refreshToken);

// Retrieve
final token = await storage.read(key: 'access_token');

// Delete on logout
await storage.deleteAll();
```

---

## Layer 4 — Session Strategy

### Session lifetime

```
Access token expiry:   15 minutes – 1 hour (prefer shorter for sensitive apps)
Refresh token expiry:  7 days (consumer apps) / 24 hours (sensitive/financial apps)
Absolute session limit: 30–90 days (force re-login regardless of activity)
```

### Auto-refresh implementation

The mobile app must silently refresh the access token before it expires. Users should never be logged out unexpectedly due to token expiry during normal use.

```ts
// lib/api.ts — Axios interceptor for silent token refresh
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

const api = axios.create({ baseURL: process.env.API_URL })

// Attach access token to every request
api.interceptors.request.use(async config => {
  const token = await SecureStore.getItemAsync('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 — silently refresh and retry
api.interceptors.response.use(
  response => response,
  async error => {
    const original = error.config

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      // Queue requests while refresh is in progress
      return new Promise(resolve => {
        refreshQueue.push(token => {
          original.headers.Authorization = `Bearer ${token}`
          resolve(api(original))
        })
      })
    }

    original._retry = true
    isRefreshing = true

    try {
      const refreshToken = await SecureStore.getItemAsync('refresh_token')
      const { data } = await axios.post(`${process.env.API_URL}/auth/refresh`, { refreshToken })

      await SecureStore.setItemAsync('access_token', data.data.accessToken)
      await SecureStore.setItemAsync('refresh_token', data.data.refreshToken)

      refreshQueue.forEach(cb => cb(data.data.accessToken))
      refreshQueue = []

      original.headers.Authorization = `Bearer ${data.data.accessToken}`
      return api(original)
    } catch {
      // Refresh failed — clear tokens and redirect to login
      await SecureStore.deleteItemAsync('access_token')
      await SecureStore.deleteItemAsync('refresh_token')
      // Emit logout event — your auth context should listen for this
      authEvents.emit('logout')
      return Promise.reject(error)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
```

### Logout

Logout must clear tokens on both the client and the server.

```ts
async function logout() {
  const refreshToken = await SecureStore.getItemAsync('refresh_token')

  // Revoke on server (invalidate the refresh token)
  try {
    await api.post('/auth/logout', { refreshToken })
  } catch {
    // Proceed with local logout even if server call fails
  }

  // Clear local storage
  await SecureStore.deleteItemAsync('access_token')
  await SecureStore.deleteItemAsync('refresh_token')

  // Clear in-memory state
  queryClient.clear()

  // Redirect to login
  router.replace('/login')
}
```

---

## Auth Methods

### Email + Password

The default. Ensure:
- Password minimum 8 characters, no arbitrary maximum
- Breach detection (Have I Been Pwned integration) on signup and password change
- Secure password reset via time-limited, single-use tokens — never via email with the password itself
- Account lockout after N failed attempts (or progressive delays)

### OAuth (Sign in with Google / Apple)

```ts
// Expo — Google OAuth
import * as Google from 'expo-auth-session/providers/google'

const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  clientId: process.env.GOOGLE_CLIENT_ID,
})

useEffect(() => {
  if (response?.type === 'success') {
    const { id_token } = response.params
    // Send id_token to your backend for verification
    api.post('/auth/oauth/google', { idToken: id_token })
  }
}, [response])
```

>  **Apple Sign In is mandatory on iOS** if your app offers any social login. App Store Review will reject apps with third-party login but no Sign in with Apple option.

### Biometric Authentication

Biometrics are a convenience layer — not an auth replacement. Use them to unlock a locally stored session, not as a credential your server verifies.

```ts
import * as LocalAuthentication from 'expo-local-authentication'

async function unlockWithBiometrics(): Promise<boolean> {
  const compatible = await LocalAuthentication.hasHardwareAsync()
  const enrolled = await LocalAuthentication.isEnrolledAsync()

  if (!compatible || !enrolled) return false

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to continue',
    disableDeviceFallback: false,  // Allow PIN fallback
    cancelLabel: 'Cancel',
  })

  return result.success
}

// Pattern: store encrypted session key in secure storage,
// unlock it with biometrics, use it to access the auth token
```

### Magic Links / OTP

Preferred for apps targeting non-technical users. No password to forget, no OAuth flow friction.

```ts
// Supabase magic link
const { error } = await supabase.auth.signInWithOtp({
  email: userEmail,
  options: {
    emailRedirectTo: 'myapp://auth/callback',  // Deep link back to app
  },
})
```

Configure deep linking to handle the callback URL — this is the most common implementation mistake with magic links on mobile.

---

## AI Prompt — Auth Architecture Review

```
You are a senior security engineer reviewing authentication architecture for a
production mobile app.

My app: [one-sentence description]
Platform: [iOS / Android / both]
Mobile stack: [React Native + Expo / Flutter / other]
Backend: [Supabase / Firebase / custom Node.js / other]

Auth methods I plan to support:
- [e.g. email + password, Google OAuth, Apple Sign In, biometric unlock]

My planned token strategy:
- Access token lifetime: [value]
- Refresh token lifetime: [value]
- Storage: [what library / approach]

Review my auth architecture and identify:

1. Security gaps in my token strategy (lifetime, rotation, storage)
2. Mobile-specific risks I have not accounted for
   (e.g. app backgrounding, device transfer, jailbreak/root detection)
3. The most likely auth-related App Store rejection reasons for my setup
4. Required vs optional auth features for my app type
5. Any compliance considerations (GDPR right to erasure, COPPA if targeting minors)

Be specific. I want findings I can act on before writing auth code.
```

---

## Validation Checklist

**Token management**
- [ ] Access tokens are short-lived (≤ 1 hour)
- [ ] Refresh tokens are long-lived and stored separately from access tokens
- [ ] Refresh token rotation is implemented
- [ ] Compromised refresh token detection triggers full session revocation

**Secure storage**
- [ ] Tokens stored in encrypted secure storage (SecureStore / flutter_secure_storage)
- [ ] `WHEN_UNLOCKED` access control set — tokens not accessible on locked device
- [ ] Refresh token uses `THIS_DEVICE_ONLY` — not synced to iCloud backup

**Session management**
- [ ] Silent token refresh implemented — users are not logged out unexpectedly
- [ ] Concurrent refresh requests are queued, not duplicated
- [ ] Logout revokes refresh token on the server
- [ ] Logout clears all locally stored tokens and in-memory state

**Auth methods**
- [ ] Password reset flow uses time-limited, single-use tokens
- [ ] OAuth deep link callback is configured and tested
- [ ] Apple Sign In implemented if any other social login is offered (iOS)
- [ ] Biometric auth unlocks a session — does not bypass server-side auth

**Security**
- [ ] Auth endpoints are rate limited
- [ ] Failed login attempts trigger progressive delays or lockout
- [ ] Password minimum length enforced (≥ 8 characters)
- [ ] JWT secret is long, random, and stored in environment variables — not hardcoded
- [ ] JWT payload contains no sensitive user data
