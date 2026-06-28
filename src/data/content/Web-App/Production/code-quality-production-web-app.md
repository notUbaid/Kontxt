---
title: Code Quality
slug: code-quality
phase: Phase 5
mode: production
projectType: web-app
estimatedTime: 20–30 min
---

# Code Quality

Code quality is not about aesthetics. It is about the speed at which your team can move, the confidence with which you can deploy, and the cost of every future change.

A codebase with no linting, inconsistent formatting, and unchecked types will slow you down exponentially as it grows. The investment here is small. The payoff compounds daily.

---

## What Code Quality Actually Means

| Signal | Poor Quality | Good Quality |
|---|---|---|
| Onboarding | New dev lost in 2 hours | New dev productive in 2 hours |
| Bug introduction rate | Every PR risks breakage | Bugs caught before PR merges |
| Refactoring confidence | Afraid to touch anything | Change with confidence |
| AI-generated code | Hard to verify correctness | Linter + types catch hallucinations |
| Deployment confidence | Manual checks before every deploy | Automated gates enforce quality |

> **For AI-assisted development specifically:** TypeScript and ESLint are your best tools for catching AI hallucinations. AI generates plausible-looking code. The type system catches what your eyes miss.

---

## The Toolchain

| Tool | Purpose |
|---|---|
| **TypeScript** | Type safety — catches wrong types, missing properties, API mismatches |
| **ESLint** | Catches bugs, enforces patterns, prevents anti-patterns |
| **Prettier** | Consistent formatting — eliminates style debates |
| **Husky + lint-staged** | Enforces quality gates before every commit |
| **tsc --noEmit** | Full type check in CI — catches what ESLint misses |

These four tools take 30 minutes to configure once. They save hours every week indefinitely.

---

## Part 1: TypeScript Configuration

A loose TypeScript config gives you the syntax without the safety. Tighten it.

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",

    // Strict mode — enable all at once
    "strict": true,

    // Additional safety beyond strict
    "noUncheckedIndexedAccess": true,    // arr[0] is T | undefined, not T
    "noImplicitReturns": true,           // All code paths must return
    "noFallthroughCasesInSwitch": true,  // Switch cases must break/return
    "exactOptionalPropertyTypes": true,  // undefined !== missing property
    "noPropertyAccessFromIndexSignature": true,

    // Interop
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,

    // Performance
    "incremental": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

> **`noUncheckedIndexedAccess` is the most impactful single flag.** It forces you to handle the case where `array[0]` might be `undefined` — one of the most common runtime crashes in TypeScript codebases.

---

## Part 2: ESLint Configuration

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-plugin-unicorn
```

```javascript
// eslint.config.js (flat config — ESLint 9+)
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    rules: {
      // TypeScript — use type-aware rules
      ...tseslint.configs['recommended-type-checked'].rules,

      // Prevent any from spreading silently
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',

      // Require explicit return types on exported functions
      '@typescript-eslint/explicit-module-boundary-types': 'warn',

      // Prefer type imports
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // Floating promises — unhandled async bugs
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Exhaustive switch — catch missing enum cases
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // Imports
      'import/order': ['warn', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
      }],
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',  // Catches circular dependency bugs

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    // Relax rules for test files
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
];
```

> **`no-floating-promises` prevents a whole class of silent async bugs.** Without it, `someAsyncFunction()` without `await` is valid TypeScript — but the error it throws will be unhandled. This rule makes it a lint error.

---

## Part 3: Prettier

Prettier ends formatting debates. Configure it once, forget it forever.

```bash
npm install -D prettier eslint-config-prettier
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

```
// .prettierignore
dist/
node_modules/
*.md
*.json
```

Add `eslint-config-prettier` to ESLint to disable formatting rules that conflict:

```javascript
// eslint.config.js
import prettier from 'eslint-config-prettier';

export default [
  // ... your rules ...
  prettier, // Must be last — disables conflicting ESLint formatting rules
];
```

---

## Part 4: Git Hooks with Husky + lint-staged

Quality gates that only run in CI are too slow. Catch issues before the commit lands.

```bash
npm install -D husky lint-staged
npx husky init
```

```json
// package.json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.ts": [
      "eslint --fix --max-warnings=0",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
#!/bin/sh
npx lint-staged
```

```bash
# .husky/pre-push
#!/bin/sh
npx tsc --noEmit
```

> **Why `--max-warnings=0`?** Warnings become noise that gets ignored. Treat every lint warning as an error — it forces the team to fix issues immediately rather than accumulating technical debt.

> **Why type check on pre-push, not pre-commit?** `tsc --noEmit` on large codebases takes 10–30 seconds. Running it on every commit is too slow. Pre-push is the right tradeoff — you catch type errors before they reach CI.

---

## Part 5: Package.json Scripts

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/server.ts",
    "start": "node dist/server.js",
    "workers": "node dist/workers/index.js",
    "lint": "eslint src --max-warnings=0",
    "lint:fix": "eslint src --fix",
    "format": "prettier --write src",
    "typecheck": "tsc --noEmit",
    "validate": "npm run typecheck && npm run lint",
    "prepare": "husky"
  }
}
```

`npm run validate` is the single command your CI pipeline runs to enforce quality.

---

## Part 6: VS Code Configuration

Share editor configuration with the team so everyone works with the same tooling.

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "eslint.validate": ["typescript"],
  "files.trimTrailingWhitespace": true
}
```

```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma"
  ]
}
```

Commit `.vscode/settings.json` and `.vscode/extensions.json`. This ensures every contributor has a consistent experience from day one.

---

## Part 7: CI Quality Gate

Local hooks can be bypassed with `--no-verify`. CI is the authoritative gate.

```yaml
# .github/workflows/quality.yml
name: Quality

on:
  pull_request:
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Format check
        run: npx prettier --check src

      - name: Security audit
        run: npm audit --audit-level=high
```

> **`npm ci` instead of `npm install`.** In CI, `ci` installs exactly what's in `package-lock.json` — reproducible, faster, and it fails if the lockfile is out of sync. Never use `npm install` in CI.

---

## Part 8: Enforcing Patterns with ESLint Rules

ESLint is not just for bugs — it can enforce architectural decisions.

```javascript
// Prevent importing from barrel files in performance-critical paths
'no-restricted-imports': ['error', {
  patterns: [
    {
      group: ['../../../*'],
      message: 'Avoid deep relative imports. Use path aliases instead.',
    },
  ],
}],
```

```json
// tsconfig.json — path aliases
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@lib/*": ["./src/lib/*"],
      "@services/*": ["./src/services/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

```typescript
// ❌ Deep relative import — fragile, breaks on refactor
import { cache } from '../../../lib/cache';

// ✅ Path alias — stable, readable
import { cache } from '@lib/cache';
```

---

## Implementation Checklist

- [ ] `tsconfig.json` uses `strict: true` and `noUncheckedIndexedAccess: true`
- [ ] ESLint configured with TypeScript type-aware rules
- [ ] `no-floating-promises` and `no-misused-promises` enabled
- [ ] Prettier configured and integrated with ESLint
- [ ] Husky pre-commit hook runs `lint-staged`
- [ ] Husky pre-push hook runs `tsc --noEmit`
- [ ] `--max-warnings=0` enforced in lint scripts
- [ ] CI workflow runs typecheck, lint, format check, and audit on every PR
- [ ] `.vscode/settings.json` and `.vscode/extensions.json` committed
- [ ] Path aliases configured in `tsconfig.json`
- [ ] `npm ci` used in all CI scripts (not `npm install`)

---

## AI Prompt: Codebase Quality Audit

```
You are a senior TypeScript engineer reviewing code quality configuration for a production Node.js application.

Here is my current setup:

tsconfig.json: [paste]
eslint.config.js: [paste]
.prettierrc: [paste]
package.json scripts: [paste]

Review for:
1. TypeScript strictness gaps that allow unsafe patterns
2. Missing ESLint rules that would catch common async or type bugs
3. Rules that conflict with Prettier formatting
4. CI pipeline steps that are missing or in the wrong order
5. Any configuration that would cause false positives and lead developers to disable rules

Return specific findings only. Reference rule names and config options.
```

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| `strict: false` in tsconfig | Loses most TypeScript safety | Enable `strict: true` |
| Warnings instead of errors | Warnings accumulate and get ignored | `--max-warnings=0` in CI |
| No pre-commit hooks | Broken code reaches CI | Add Husky + lint-staged |
| Prettier conflicts with ESLint | Formatting fights on every save | Add `eslint-config-prettier` last |
| `npm install` in CI | Non-reproducible builds | Use `npm ci` |
| No path aliases | Deep relative imports break on refactor | Configure `paths` in tsconfig |
| Disabling rules for convenience | Defeats the purpose of linting | Fix the code, not the rule |
| Not committing `.vscode/` | Every developer sets up differently | Commit editor config |

---

## Next: Testing →

Code quality tooling prevents a class of bugs statically. Testing catches the rest — by proving your code actually does what you think it does.
