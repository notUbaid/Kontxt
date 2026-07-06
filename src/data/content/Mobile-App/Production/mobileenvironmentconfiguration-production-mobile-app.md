---
title: Environment Configuration
slug: environment-configuration
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 30–40 min
---

# Environment Configuration

Mobile apps have a configuration problem that web apps do not.

A web app's environment variables live on a server you control. A mobile app's binary ships to millions of devices. Whatever you embed in that binary is publicly accessible — to anyone willing to decompile your APK or IPA.

This module covers how to structure your environments, what belongs in each one, and the specific patterns that keep secrets secret in a mobile context.

---

## The Three Environments

Every production mobile app needs three environments, each isolated from the others.

| Environment | Purpose | Connects To |
|---|---|---|
| **Development** | Local development, rapid iteration | Local or dev database, dev APIs |
| **Staging** | Pre-release testing, QA, TestFlight/internal track | Staging database, staging APIs |
| **Production** | Live app, real users, real data | Production database, production APIs |

The goal: a bug in development never touches production data. A staging test never charges a real user. A production deploy is never accidentally pointed at a dev database.

If you only have one environment, you are one misconfiguration away from a production incident caused by a developer testing a feature.

---

## What Goes in Each Environment

### Development
```
API_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost/myapp_dev
STRIPE_KEY=sk_test_...
AI_API_KEY=sk-ant-...   ← use a separate key with low rate limits
SENTRY_DSN=             ← disabled in development
LOG_LEVEL=debug
```

### Staging
```
API_URL=https://api-staging.yourdomain.com
DATABASE_URL=postgresql://staging-host/myapp_staging
STRIPE_KEY=sk_test_...  ← still test mode in staging
AI_API_KEY=sk-ant-...   ← separate key from dev and prod
SENTRY_DSN=https://...  ← enabled, separate Sentry project
LOG_LEVEL=info
```

### Production
```
API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://prod-host/myapp_prod
STRIPE_KEY=sk_live_...  ← live mode only in production
AI_API_KEY=sk-ant-...   ← separate key, highest rate limits
SENTRY_DSN=https://...  ← enabled, separate Sentry project
LOG_LEVEL=warn
```

>  **Hard rule:** Stripe live keys, production database URLs, and production AI API keys must never appear in development or staging config. Use separate accounts or restricted keys at every tier.

---

## The Mobile Security Problem

Environment variables in mobile apps are not environment variables in the traditional sense.

On a server, `process.env.SECRET_KEY` is read at runtime from the server's environment — never exposed to clients. On a mobile app:

- React Native bundles your JS and ships it in the APK/IPA
- Flutter compiles Dart to native but strings can still be extracted
- Any value hardcoded or bundled into the app binary can be recovered

**What this means in practice:**

```
 Never put in the mobile binary:
- API secret keys (Stripe secret key, database passwords)
- Admin credentials
- Internal service URLs you want to stay private
- AI API keys (these can be used to run up your bill)

 Safe to put in the mobile binary:
- Your own API base URL
- Public/publishable keys (Stripe publishable key)
- App identifiers (bundle ID, app version)
- Feature flags (non-sensitive)
- Analytics write keys (designed to be public)
```

**The rule:** Anything secret belongs on your backend, not in your app.

```
Mobile App → Your Backend (holds secrets) → Third-Party API
```

Your mobile app calls your backend. Your backend calls Stripe, OpenAI, Twilio, etc. The mobile app never holds the keys.

---

## React Native / Expo Configuration

### `react-native-config` (bare workflow)

```bash
npm install react-native-config
```

Create environment files:
```bash
.env              # fallback
.env.development
.env.staging
.env.production
```

```bash
# .env.development
API_URL=http://localhost:3000
STRIPE_PUBLISHABLE_KEY=pk_test_...
APP_ENV=development
```

Usage in code:
```ts
import Config from 'react-native-config'

const apiUrl = Config.API_URL
const stripeKey = Config.STRIPE_PUBLISHABLE_KEY
```

Build with environment:
```bash
APP_ENV=staging react-native run-android
APP_ENV=production react-native run-ios --configuration Release
```

---

### Expo (managed workflow) — `app.config.ts`

Expo does not support `.env` files directly in the same way. Use `expo-constants` and `app.config.ts`:

```ts
// app.config.ts
import { ExpoConfig, ConfigContext } from 'expo/config'

const ENV = process.env.APP_ENV ?? 'development'

const envConfig = {
  development: {
    apiUrl: 'http://localhost:3000',
    stripeKey: 'pk_test_...',
    appName: 'MyApp (Dev)',
    bundleId: 'com.myapp.dev',
  },
  staging: {
    apiUrl: 'https://api-staging.myapp.com',
    stripeKey: 'pk_test_...',
    appName: 'MyApp (Staging)',
    bundleId: 'com.myapp.staging',
  },
  production: {
    apiUrl: 'https://api.myapp.com',
    stripeKey: 'pk_live_...',
    appName: 'MyApp',
    bundleId: 'com.myapp',
  },
}[ENV]

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: envConfig.appName,
  ios: { bundleIdentifier: envConfig.bundleId },
  android: { package: envConfig.bundleId },
  extra: {
    apiUrl: envConfig.apiUrl,
    stripeKey: envConfig.stripeKey,
    appEnv: ENV,
  },
})
```

Access in app:
```ts
import Constants from 'expo-constants'

const { apiUrl, stripeKey, appEnv } = Constants.expoConfig?.extra ?? {}
```

Build per environment with EAS:
```bash
# eas.json
{
  "build": {
    "development": {
      "env": { "APP_ENV": "development" }
    },
    "staging": {
      "env": { "APP_ENV": "staging" }
    },
    "production": {
      "env": { "APP_ENV": "production" }
    }
  }
}
```

```bash
eas build --profile staging --platform android
```

---

### EAS Secrets (for build-time secrets)

Secrets that should not be committed to your repo but are needed at build time:

```bash
# Set a secret in EAS — stored encrypted, injected at build time
eas secret:create --scope project --name SENTRY_AUTH_TOKEN --value your_token
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value ./google-services.json
```

These are never in your codebase and never in the binary — only used during the EAS build process.

---

## Flutter Configuration

### `flutter_dotenv`

```bash
flutter pub add flutter_dotenv
```

```bash
# .env
API_URL=https://api.myapp.com
STRIPE_PUBLISHABLE_KEY=pk_live_...
APP_ENV=production
```

```yaml
# pubspec.yaml
flutter:
  assets:
    - .env
```

>  **Warning:** `.env` files added as Flutter assets are bundled into the binary and readable. Only include non-secret values here. Keep this for public config only.

```dart
import 'package:flutter_dotenv/flutter_dotenv.dart';

await dotenv.load(fileName: '.env');
final apiUrl = dotenv.env['API_URL'];
```

### Dart defines for build-time configuration

The safer approach — values are compiled in at build time with `--dart-define`:

```bash
# Development
flutter run --dart-define=API_URL=http://localhost:3000 --dart-define=APP_ENV=development

# Production
flutter build apk \
  --dart-define=API_URL=https://api.myapp.com \
  --dart-define=APP_ENV=production \
  --dart-define=STRIPE_KEY=pk_live_...
```

Access in code:
```dart
class AppConfig {
  static const apiUrl = String.fromEnvironment('API_URL', defaultValue: 'http://localhost:3000');
  static const appEnv = String.fromEnvironment('APP_ENV', defaultValue: 'development');
  static const stripeKey = String.fromEnvironment('STRIPE_KEY', defaultValue: '');

  static bool get isProduction => appEnv == 'production';
  static bool get isDevelopment => appEnv == 'development';
}
```

Store defines in a Makefile or shell script so they are not retyped every build:

```makefile
build-prod:
	flutter build apk \
		--dart-define=API_URL=https://api.myapp.com \
		--dart-define=APP_ENV=production \
		--dart-define=STRIPE_KEY=pk_live_...
```

---

## Backend Environment Configuration

Your backend holds the actual secrets. Configure it via your hosting provider's environment variable system — never via committed files.

```bash
# Vercel
vercel env add DATABASE_URL production

# Railway
railway variables set DATABASE_URL=postgresql://...

# Fly.io
fly secrets set DATABASE_URL=postgresql://...
```

Your backend `.env` file should be:
1. In `.gitignore` — never committed
2. Documented in `.env.example` with placeholder values — committed

```bash
# .env.example — safe to commit, documents required variables
DATABASE_URL=postgresql://localhost/myapp_dev
STRIPE_SECRET_KEY=sk_test_your_key_here
OPENAI_API_KEY=sk-your_key_here
JWT_SECRET=generate_a_random_string
SENTRY_DSN=https://your_dsn_here
```

---

## Environment Detection Pattern

One utility, used everywhere:

```ts
// lib/env.ts (React Native)
import Config from 'react-native-config'

export const ENV = {
  apiUrl: Config.API_URL,
  stripeKey: Config.STRIPE_PUBLISHABLE_KEY,
  isProduction: Config.APP_ENV === 'production',
  isStaging: Config.APP_ENV === 'staging',
  isDevelopment: Config.APP_ENV === 'development',
} as const

// Usage
import { ENV } from '@/lib/env'

if (!ENV.isProduction) {
  console.log('Debug info only in non-prod')
}

fetch(`${ENV.apiUrl}/api/users`)
```

Never reference `Config.API_URL` or `dotenv.env['API_URL']` directly in feature code. Always go through a typed config module. This gives you one place to change, one place to validate, and type safety everywhere.

---

## `.gitignore` Requirements

```gitignore
# Environment files — never commit
.env
.env.local
.env.development
.env.staging
.env.production

# Firebase / Google Services (contain API keys)
google-services.json
GoogleService-Info.plist

# EAS local config
.easignore

# Keystore files
*.keystore
*.jks
```

---

## Validation Checklist

**Environment separation**
- [ ] Three environments exist: development, staging, production
- [ ] Each environment has its own database — no shared databases between envs
- [ ] Each environment has its own API keys — especially Stripe (test vs live)
- [ ] Staging uses test payment keys, not live ones

**Mobile security**
- [ ] No secret keys in the mobile binary (only public/publishable values)
- [ ] AI API calls routed through backend — not called directly from the app
- [ ] Stripe secret key is on the backend only — publishable key is in the app
- [ ] `.env` files are in `.gitignore`

**Configuration structure**
- [ ] One typed config module in the codebase — all env values accessed through it
- [ ] `.env.example` is committed with placeholder values for every required variable
- [ ] Build scripts or `eas.json` define which env is used for which build profile
- [ ] Backend secrets are set in the hosting provider's environment — not in committed files

**Verification**
- [ ] Development build connects to dev API — confirmed by checking network requests
- [ ] Staging build connects to staging API — confirmed
- [ ] Production build connects to production API — confirmed
- [ ] A production build has been inspected to verify no secret keys are present (strings extraction on APK or bundle analysis)
