---
title: Local Storage
slug: local-storage
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# Local Storage

Mobile apps live on devices. Unlike web apps that die when the browser tab closes, a mobile app's local storage persists across sessions, app restarts, and even OS updates.

This persistence is a feature — users expect their preferences, drafts, and cached content to survive an app restart. It is also a liability — stale data, storage bloat, and sensitive data in the wrong place are common production issues that are difficult to debug remotely.

This module covers what to store locally, where to store it, and how to manage it correctly over the lifetime of your app.

---

## The Local Storage Taxonomy

Not all local data is the same. Use the right tool for each category.

| Category | Examples | Tool |
|---|---|---|
| **Sensitive credentials** | Auth tokens, session keys | SecureStore / flutter_secure_storage |
| **Fast persistent state** | Preferences, flags, drafts | MMKV (RN) / Hive (Flutter) |
| **Structured relational data** | Offline content, sync cache | SQLite / WatermelonDB |
| **Large binary data** | Images, documents, audio | Filesystem (expo-file-system) |
| **Simple key-value** | Basic settings (small apps) | AsyncStorage / shared_preferences |

The most common mistake: using AsyncStorage for everything. It is the path of least resistance but the wrong tool for most use cases above trivial settings.

---

## Sensitive Credentials — SecureStore

Covered in the Authentication module. The rule is absolute: tokens and credentials go in the platform keychain/keystore only.

```ts
import * as SecureStore from 'expo-secure-store'

// Store — hardware-backed encryption where available
await SecureStore.setItemAsync('access_token', token, {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
})

// Never store in AsyncStorage, MMKV, or any other non-secure storage
```

---

## Fast Persistent State — MMKV

MMKV is a key-value store built by WeChat, open-sourced, and significantly faster than AsyncStorage. It uses memory-mapped files — reads are near-instant because the data is mapped directly into memory.

**Performance comparison on real devices:**

| Operation | AsyncStorage | MMKV |
|---|---|---|
| Read (small value) | ~15ms | < 1ms |
| Write (small value) | ~20ms | < 1ms |
| Read (large value) | ~100ms | ~5ms |

For anything that affects UI rendering — preferences, flags, cached settings — this difference is visible.

```bash
npm install react-native-mmkv
npx expo install react-native-mmkv  # Expo with dev client
```

```ts
// lib/storage/mmkv.ts
import { MMKV } from 'react-native-mmkv'

// Default instance
export const storage = new MMKV()

// Separate encrypted instance for semi-sensitive data
export const secureStorage = new MMKV({
  id: 'secure-storage',
  encryptionKey: 'your-encryption-key',  // Store this key in SecureStore
})
```

### Typed storage layer

Never use raw string keys throughout your codebase. One typo silently reads `undefined`.

```ts
// lib/storage/keys.ts
export const STORAGE_KEYS = {
  // Onboarding
  ONBOARDING_COMPLETE: 'onboarding_complete',
  ONBOARDING_STEP: 'onboarding_step',

  // User preferences
  THEME: 'theme',                          // 'light' | 'dark' | 'system'
  LANGUAGE: 'language',                    // 'en' | 'hi' | 'gu'
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  HAPTICS_ENABLED: 'haptics_enabled',

  // App state
  LAST_ACTIVE_TAB: 'last_active_tab',
  LAST_SYNC_AT: 'last_sync_at',
  APP_LAUNCH_COUNT: 'app_launch_count',

  // Content
  DRAFT_POST: 'draft_post',
  RECENTLY_VIEWED: 'recently_viewed',      // JSON array
  SEARCH_HISTORY: 'search_history',        // JSON array
} as const

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]
```

```ts
// lib/storage/index.ts
import { storage } from './mmkv'
import { STORAGE_KEYS } from './keys'

export const LocalStorage = {
  // Booleans
  getBoolean: (key: string, defaultValue = false): boolean =>
    storage.getBoolean(key) ?? defaultValue,
  setBoolean: (key: string, value: boolean) =>
    storage.set(key, value),

  // Strings
  getString: (key: string, defaultValue = ''): string =>
    storage.getString(key) ?? defaultValue,
  setString: (key: string, value: string) =>
    storage.set(key, value),

  // Numbers
  getNumber: (key: string, defaultValue = 0): number =>
    storage.getNumber(key) ?? defaultValue,
  setNumber: (key: string, value: number) =>
    storage.set(key, value),

  // JSON objects
  getObject: <T>(key: string, defaultValue: T): T => {
    const raw = storage.getString(key)
    if (!raw) return defaultValue
    try {
      return JSON.parse(raw) as T
    } catch {
      return defaultValue
    }
  },
  setObject: <T>(key: string, value: T) =>
    storage.set(key, JSON.stringify(value)),

  // Delete
  delete: (key: string) => storage.delete(key),
  clearAll: () => storage.clearAll(),

  // Check existence
  contains: (key: string) => storage.contains(key),
}
```

### Common patterns

```ts
// Onboarding flag
LocalStorage.setBoolean(STORAGE_KEYS.ONBOARDING_COMPLETE, true)
const hasOnboarded = LocalStorage.getBoolean(STORAGE_KEYS.ONBOARDING_COMPLETE)

// Draft post — survives app restarts
LocalStorage.setObject(STORAGE_KEYS.DRAFT_POST, { title: '...', body: '...' })
const draft = LocalStorage.getObject<DraftPost | null>(STORAGE_KEYS.DRAFT_POST, null)

// Bounded search history (keep last 10)
const history = LocalStorage.getObject<string[]>(STORAGE_KEYS.SEARCH_HISTORY, [])
const updated = [query, ...history.filter(h => h !== query)].slice(0, 10)
LocalStorage.setObject(STORAGE_KEYS.SEARCH_HISTORY, updated)

// App launch count — for review prompts, feature announcements
const count = LocalStorage.getNumber(STORAGE_KEYS.APP_LAUNCH_COUNT, 0)
LocalStorage.setNumber(STORAGE_KEYS.APP_LAUNCH_COUNT, count + 1)
```

---

## Structured Offline Data — SQLite / WatermelonDB

For apps that cache significant structured content locally — chat messages, feed items, documents, contacts — a key-value store is insufficient. You need a queryable local database.

### WatermelonDB (React Native)

Built for performance with React Native. Designed for large datasets (10,000+ records) with lazy loading.

```bash
npm install @nozbe/watermelondb
npm install @nozbe/with-observables
```

```ts
// model/Post.ts
import { Model } from '@nozbe/watermelondb'
import { field, date, readonly } from '@nozbe/watermelondb/decorators'

export class Post extends Model {
  static table = 'posts'

  @field('server_id') serverId!: string
  @field('title') title!: string
  @field('body') body!: string
  @field('author_id') authorId!: string
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
  @field('is_synced') isSynced!: boolean
}
```

```ts
// Querying locally — instant, no network
const posts = await database
  .get<Post>('posts')
  .query(Q.where('author_id', currentUserId))
  .fetch()

// Observe changes reactively
const postsObservable = database
  .get<Post>('posts')
  .query(Q.where('is_synced', false))
  .observe()
```

### expo-sqlite (simpler alternative)

For simpler offline needs without the full WatermelonDB setup:

```ts
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('app.db')

// Create table
db.execSync(`
  CREATE TABLE IF NOT EXISTS cached_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    synced_at INTEGER
  );
`)

// Query
const posts = db.getAllSync<CachedPost>(
  'SELECT * FROM cached_posts ORDER BY created_at DESC LIMIT ?',
  [20]
)
```

---

## File Storage — expo-file-system

For binary data — images, PDFs, audio, video — use the filesystem, not a database.

```bash
npx expo install expo-file-system
```

```ts
import * as FileSystem from 'expo-file-system'

// App's persistent document directory
const DOCUMENTS_DIR = FileSystem.documentDirectory

// Cache directory (OS may clear this under storage pressure)
const CACHE_DIR = FileSystem.cacheDirectory

// Download and cache a remote image
async function cacheImage(url: string, filename: string): Promise<string> {
  const localPath = `${CACHE_DIR}${filename}`

  const info = await FileSystem.getInfoAsync(localPath)
  if (info.exists) return localPath  // Already cached

  const { uri } = await FileSystem.downloadAsync(url, localPath)
  return uri
}

// Save a user document to persistent storage
async function saveDocument(content: string, filename: string): Promise<string> {
  const path = `${DOCUMENTS_DIR}${filename}`
  await FileSystem.writeAsStringAsync(path, content, {
    encoding: FileSystem.EncodingType.UTF8,
  })
  return path
}

// Check available storage before large downloads
async function hasStorageSpace(requiredBytes: number): Promise<boolean> {
  const { freeDiskStorage } = await FileSystem.getFreeDiskStorageAsync()
  return freeDiskStorage > requiredBytes * 1.2  // 20% buffer
}
```

### Cache vs Documents directory

| Directory | Persists | Backed up | Use for |
|---|---|---|---|
| `documentDirectory` | Yes | Yes (iCloud) | User-generated files, important downloads |
| `cacheDirectory` | Until OS clears | No | Temporary files, image cache, prefetched content |

Never store anything the user cannot recreate in `documentDirectory`. The OS will not clear it, but you are responsible for managing its size.

---

## Storage Migration Strategy

Your storage schema will change between app versions. Keys get renamed, data structures evolve, old data needs to be cleaned up.

Without a migration strategy, old app versions leave garbage in storage, and data structure changes silently break features for users who do not reinstall.

```ts
// lib/storage/migrations.ts
const STORAGE_VERSION_KEY = 'storage_version'
const CURRENT_VERSION = 3

type Migration = {
  version: number
  up: () => void | Promise<void>
}

const migrations: Migration[] = [
  {
    version: 1,
    up: () => {
      // Rename old key to new key
      const old = storage.getString('user_theme')
      if (old) {
        storage.set(STORAGE_KEYS.THEME, old)
        storage.delete('user_theme')
      }
    },
  },
  {
    version: 2,
    up: () => {
      // Clear old search history format (was a comma-separated string)
      const old = storage.getString('search_history')
      if (old && !old.startsWith('[')) {
        storage.delete('search_history')
      }
    },
  },
  {
    version: 3,
    up: () => {
      // Clear old onboarding keys from v1
      storage.delete('intro_shown')
      storage.delete('setup_complete')
    },
  },
]

export async function runStorageMigrations() {
  const currentVersion = storage.getNumber(STORAGE_VERSION_KEY) ?? 0

  const pending = migrations.filter(m => m.version > currentVersion)

  for (const migration of pending) {
    await migration.up()
    storage.set(STORAGE_VERSION_KEY, migration.version)
  }
}
```

```ts
// Run on every app launch, before anything reads storage
// app/_layout.tsx
useEffect(() => {
  runStorageMigrations()
}, [])
```

---

## Storage Size Management

Local storage is finite. Production apps accumulate data silently until users complain about storage usage.

```ts
// lib/storage/cleanup.ts

// Clear image cache older than 7 days
async function cleanImageCache() {
  const cacheDir = FileSystem.cacheDirectory + 'images/'
  const info = await FileSystem.getInfoAsync(cacheDir)
  if (!info.exists) return

  const files = await FileSystem.readDirectoryAsync(cacheDir)
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000  // 7 days

  for (const file of files) {
    const filePath = cacheDir + file
    const fileInfo = await FileSystem.getInfoAsync(filePath, { md5: false })
    if (fileInfo.exists && fileInfo.modificationTime * 1000 < cutoff) {
      await FileSystem.deleteAsync(filePath, { idempotent: true })
    }
  }
}

// Trim search history to bounded size
function trimSearchHistory() {
  const history = LocalStorage.getObject<string[]>(STORAGE_KEYS.SEARCH_HISTORY, [])
  if (history.length > 10) {
    LocalStorage.setObject(STORAGE_KEYS.SEARCH_HISTORY, history.slice(0, 10))
  }
}

// Run on app background
AppState.addEventListener('change', state => {
  if (state === 'background') {
    cleanImageCache()
    trimSearchHistory()
  }
})
```

---

## Flutter Local Storage

| Need | Library |
|---|---|
| Simple key-value | `shared_preferences` |
| Fast key-value | `hive` or `isar` |
| Structured offline data | `drift` (SQLite ORM) or `isar` |
| Files | `path_provider` + `dart:io` |
| Secure storage | `flutter_secure_storage` |

```dart
// Hive — fast key-value for Flutter
import 'package:hive_flutter/hive_flutter.dart';

await Hive.initFlutter();
final box = await Hive.openBox('preferences');

// Write
await box.put('theme', 'dark');
await box.put('onboarding_complete', true);

// Read
final theme = box.get('theme', defaultValue: 'system');
final onboarded = box.get('onboarding_complete', defaultValue: false);

// Typed boxes
@HiveType(typeId: 0)
class UserPreferences extends HiveObject {
  @HiveField(0) late String theme;
  @HiveField(1) late bool notificationsEnabled;
}
```

---

## AI Prompt — Storage Architecture Review

```
You are a senior mobile engineer reviewing the local storage architecture
for a production mobile app.

My app: [one-sentence description]
Stack: [React Native + Expo / Flutter]
Storage tools I plan to use: [list them]

Data I need to store locally:
[List each piece, e.g.:]
- Auth tokens
- User preferences (theme, language, notification settings)
- Draft content
- Cached feed items (up to ~200 posts)
- Downloaded images for offline viewing
- Search history
- Onboarding state

For each piece of data:
1. Confirm the right storage tool
2. Flag any security concerns
3. Identify storage size risks
4. Recommend a migration strategy if the data structure is likely to evolve

Then:
5. What storage-related bugs are most common in production mobile apps?
6. What should I implement now to avoid a storage refactor in 6 months?
7. What data am I likely storing locally that I should not be?
```

---

## Validation Checklist

**Tool selection**
- [ ] Auth tokens in SecureStore only — not AsyncStorage or MMKV
- [ ] MMKV used for non-sensitive persistent state (not AsyncStorage)
- [ ] SQLite or WatermelonDB used for structured offline data (not AsyncStorage)
- [ ] Binary files stored in filesystem — not encoded in key-value store

**Key management**
- [ ] All storage keys defined in a central constants file
- [ ] Typed storage helpers used — raw `storage.get/set` not scattered through the codebase
- [ ] No hardcoded string keys outside the constants file

**Migration**
- [ ] Storage version tracked in MMKV
- [ ] Migration runner executes on every app launch
- [ ] At least one migration written to validate the pattern works
- [ ] Old / renamed keys cleaned up in migrations

**Size management**
- [ ] Cache directory used for temporary files (not documentDirectory)
- [ ] Search history, recently viewed, and similar lists are bounded (e.g. max 10–20 items)
- [ ] Image cache cleaned up periodically (on background or app launch)
- [ ] Storage size checked before large downloads

**Security**
- [ ] No PII (email, name, phone) stored in MMKV without encryption
- [ ] No payment information stored locally under any circumstances
- [ ] MMKV encrypted instance used for semi-sensitive non-credential data
