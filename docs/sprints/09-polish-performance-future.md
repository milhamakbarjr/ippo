# Sprint 09 — Polish, Performance & Future Features

**Phase:** P2+ (Month 4+, Target: July 2026 and rolling)
**Effort:** 4+ weeks rolling; no fixed end date — this sprint is a living document
**Depends On:** None hard — enhances all previous sprints
**Status:** Not started

---

## 1. Overview

This sprint is the definitive reference for three overlapping concerns that span the entire Ippo codebase:

1. **Performance optimization** — Ensuring the app meets its quantified load and interaction targets across slow networks and budget Android devices.
2. **Comprehensive testing** — Unit, integration, and E2E coverage targets with concrete test cases for every critical user path.
3. **Analytics & instrumentation** — Event schema, conversion funnels, cohort definitions, and KPI dashboard targets for data-driven iteration.

It also serves as the roadmap for features deferred from P0/P1:

4. **Dark mode** (P2) — Theme switching with Tailwind `dark:` variants and system preference detection.
5. **Swipe navigation** (P2) — Mobile gesture navigation between learning steps.
6. **Spaced repetition** (P2) — SM-2 algorithm layered on the existing `quiz_results` table.
7. **Resource validation job** (P2) — Weekly automated check for dead external resource URLs.
8. **Community discussion** (P3) — Per-step Q&A threads with upvoting.
9. **Error logging** (P2, Sentry) and **analytics** (P2, Umami).
10. **Deployment checklist** and **browser support matrix** — The definitive pre-launch reference.

A developer should be able to implement any section of this sprint independently, in any order, without reading the original PRD.

---

## 2. Performance Targets

### 2.1 Core Web Vitals & Loading

| Metric | Target | Measurement Tool |
|---|---|---|
| Initial Load | <2.0s | Lighthouse CI, RUM |
| First Contentful Paint (FCP) | <1.5s | Web Vitals |
| Largest Contentful Paint (LCP) | <2.5s | Web Vitals |
| Cumulative Layout Shift (CLS) | <0.1 | Web Vitals |
| Time to Interactive (TTI) | <3.0s | Lighthouse |
| Assessment question load | <200ms | React Profiler |
| Step completion POST API | <300ms | Network tab |
| Progress DB query | <500ms | Neon EXPLAIN ANALYZE |
| Lighthouse score | ≥85 | Lighthouse CI |

**Budget Android device target (2GB RAM, slow 3G):** 3–4s initial load is acceptable per PRD Section 16. The targets above are for the primary mobile-first baseline (iPhone 12, good WiFi).

### 2.2 Measurement Setup

```bash
# Lighthouse CI config (lighthouse.config.js)
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173/', 'http://localhost:5173/assessment'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

---

## 3. Performance Implementation Strategies

### 3.1 Code Splitting (TanStack Router)

```typescript
// src/router.ts — lazy-load all major routes
import { createFileRoute, lazy } from '@tanstack/react-router';

export const assessmentRoute = createFileRoute('/assessment')({
  component: lazy(() => import('@/pages/assessment')),
});

export const learningRoute = createFileRoute('/learning/$level')({
  component: lazy(() => import('@/pages/learning')),
});

export const stepRoute = createFileRoute('/learning/$level/$stepSlug')({
  component: lazy(() => import('@/pages/step-detail')),
});

export const quizRoute = createFileRoute('/quizzes/$quizSlug')({
  component: lazy(() => import('@/pages/quiz')),
});
```

**What to NOT lazy-load:**
- Landing page (`/`) — first paint, must be eager
- Auth pages — small; eager is fine

### 3.2 Data Pre-loading

```typescript
// Assessment questions pre-loaded at app boot (small static file, eager load)
import { assessmentQuestions } from '@/content/onboarding-assessment';
// No dynamic import — bundled in main chunk

// Learning path content: lazy per level
const loadLevelContent = (level: string) =>
  import(`@/content/levels/${level}.ts`);

// Quiz content: lazy per slug
const loadQuizContent = (slug: string) =>
  import(`@/content/quizzes/${slug}.ts`);
```

### 3.3 TanStack Query Caching Hierarchy

```typescript
// Cache strategy per resource type
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes default
      gcTime: 10 * 60 * 1000,      // 10 minutes garbage collection
    },
  },
});

// Per-query overrides:
// Progress data — stale after 1 minute (user may complete steps on another device)
useQuery({ queryKey: ['progress', level], staleTime: 60 * 1000 });

// Learning path content — static, never stale
useQuery({ queryKey: ['content', level], staleTime: Infinity });

// Quiz history — stale after 30 seconds (user may retry quiz)
useQuery({ queryKey: ['quiz-history', slug], staleTime: 30 * 1000 });

// Achievements — stale after 5 minutes
useQuery({ queryKey: ['achievements'], staleTime: 5 * 60 * 1000 });
```

### 3.4 Bundle Analysis

```bash
# Run after build to identify large chunks
npm run build
npx vite-bundle-visualizer
```

**Known large dependencies to watch:**
- `framer-motion` — tree-shake to only import used features
- Untitled UI component library — import only used components (never `import * from '@untitledui/react'`)
- `@tanstack/react-query` — acceptable size, no alternative

**Tree-shaking Framer Motion:**
```typescript
// Bad — imports full library
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// Good — only import what's used in this file
import { motion } from 'framer-motion';
```

### 3.5 Image Optimization

No images in P0/P1 — all UI is icon-based (Untitled UI icons). If images are introduced in P2+:
- Format: WebP with PNG fallback
- Sizes: `srcset` for responsive sizes
- Lazy loading: `loading="lazy"` on all below-fold images
- No images over 100KB on mobile

---

## 4. Testing Strategy

### 4.1 Testing Stack

| Layer | Tool | Config |
|---|---|---|
| Unit | Vitest | `vite.config.ts` (`test` block) |
| Integration | Vitest + Neon branch DB | Separate test database branch |
| E2E | Playwright | `playwright.config.ts` |
| CI | GitHub Actions | `.github/workflows/test.yml` |
| Coverage | `@vitest/coverage-v8` | Target 70% for core modules |

```bash
# Run all tests
npx vitest run

# Run with coverage report
npx vitest run --coverage

# Run E2E tests
npx playwright test

# Run E2E with UI
npx playwright test --ui
```

### 4.2 Unit Tests — Target: 70% Coverage for Core Functions

All pure functions must have unit tests. These have no external dependencies — test in isolation.

#### `calculateLevel()` — Assessment scoring

```typescript
// src/utils/calculate-level.test.ts
describe('calculateLevel', () => {
  it('0 correct → Kana', () => expect(calculateLevel(0, 5)).toBe('kana'));
  it('1 correct → Kana', () => expect(calculateLevel(1, 5)).toBe('kana'));
  it('2 correct → Kana', () => expect(calculateLevel(2, 5)).toBe('kana'));
  it('3 correct → N5', () => expect(calculateLevel(3, 5)).toBe('n5'));
  it('4 correct → N5', () => expect(calculateLevel(4, 5)).toBe('n5'));
  it('5 correct → N4', () => expect(calculateLevel(5, 5)).toBe('n4'));
  // Cover all 8 score brackets from PRD
});
```

#### `inferLevelFromSlug()` — Slug parsing

```typescript
describe('inferLevelFromSlug', () => {
  it('n5-vocab → n5', () => expect(inferLevelFromSlug('n5-vocab')).toBe('n5'));
  it('n3-grammar → n3', () => expect(inferLevelFromSlug('n3-grammar')).toBe('n3'));
  it('kana-hiragana → kana', () => expect(inferLevelFromSlug('kana-hiragana')).toBe('kana'));
  it('invalid slug → null', () => expect(inferLevelFromSlug('invalid')).toBeNull());
});
```

#### `updateStreak()` — Streak logic

```typescript
describe('updateStreak', () => {
  it('same day activity → streak unchanged', () => { ... });
  it('consecutive day → streak incremented', () => { ... });
  it('gap of 2 days → streak reset to 1', () => { ... });
  it('gap of exactly 1 day → streak continues', () => { ... });
  it('first activity ever → streak = 1', () => { ... });
});
```

#### `checkAchievements()` — Achievement conditions

```typescript
describe('checkAchievements', () => {
  it('first step complete → unlocks "Mulai Petualangan" badge', () => { ... });
  it('5 steps complete → unlocks relevant milestone badge', () => { ... });
  it('complete all kana steps → unlocks "Kana Master" badge', () => { ... });
  it('7-day streak → unlocks streak badge', () => { ... });
  it('no new condition met → returns empty array', () => { ... });
});
```

#### `calculateQuizScore()` — Quiz scoring

```typescript
describe('calculateQuizScore', () => {
  it('all correct → 100%', () => { ... });
  it('0 correct → 0%', () => { ... });
  it('8/10 correct → 80%', () => { ... });
  it('rounds percentage to integer', () => { ... });
});
```

#### `migrateLocalStorageToAccount()` — Guest → registered migration

```typescript
describe('migrateLocalStorageToAccount', () => {
  it('migrates step completions', () => { ... });
  it('migrates assessment result', () => { ... });
  it('handles empty localStorage gracefully', () => { ... });
  it('handles partial localStorage (some keys missing)', () => { ... });
  it('handles network failure during migration', async () => { ... });
  it('does not duplicate already-synced steps', () => { ... });
});
```

#### Progress aggregation math

```typescript
describe('progressAggregation', () => {
  it('completedSteps / totalSteps calculates percentage', () => { ... });
  it('0 / 10 → 0%', () => { ... });
  it('10 / 10 → 100%', () => { ... });
  it('handles undefined totalSteps gracefully', () => { ... });
});
```

### 4.3 Integration Tests

Run against a Neon branch database (not production). Each test should clean up after itself.

```typescript
// Setup: use test DB branch connection
// src/test/setup.ts
import { db } from '@/db';
beforeEach(async () => {
  await db.delete(progress).where(eq(progress.userId, TEST_USER_ID));
  await db.delete(quizResults).where(eq(quizResults.userId, TEST_USER_ID));
});
```

**Required integration test cases:**

| Test | What to verify |
|---|---|
| Auth flow (email OTP) | POST email → OTP generated → POST OTP → session created |
| Progress save + retrieve | POST /api/progress/complete → GET /api/progress → matches |
| localStorage → account migration | Seed localStorage → trigger migration → DB has same steps |
| Achievement unlock after level completion | Complete all steps in a level → achievement row inserted |
| Quiz submit + history | POST /api/quiz/submit → GET /api/quiz/[slug]/history → attempt appears |
| Duplicate submit prevention | Two identical POSTs → only one row in quiz_results |
| Streak update on step complete | Step complete today + yesterday → streak = 2 |

### 4.4 E2E Tests (Playwright)

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
  },
  projects: [
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

#### E2E Test: Happy Path — Assessment → Learning Path → Step Complete

```typescript
// e2e/happy-path.spec.ts
import { test, expect } from '@playwright/test';

test('happy path: assessment → learning path → step complete', async ({ page }) => {
  await page.goto('/');

  // Landing page
  await page.click('text=Mulai Belajar');
  await expect(page).toHaveURL('/assessment');

  // Answer 5 assessment questions
  for (let i = 0; i < 5; i++) {
    await page.click('[data-testid="option-a"]');
    await page.click('text=Lanjut');
  }

  // Result page
  await page.click('text=Lihat Hasil');
  await expect(page.locator('[data-testid="result-level"]')).toBeVisible();
  await page.click('text=Lihat Jalur Belajarmu');

  // Learning path
  await expect(page.locator('[data-testid="step-list"]')).toBeVisible();
  await page.click('text=Mulai Step Ini');

  // Step detail
  await page.click('text=Tandai Selesai');

  // Verify localStorage progress saved (guest mode)
  const progress = await page.evaluate(() =>
    localStorage.getItem('step_hiragana-gojuuon')
  );
  expect(JSON.parse(progress!).completed).toBe(true);
});
```

#### E2E Test: Auth Flow

```typescript
test('auth: email OTP registration', async ({ page }) => {
  await page.goto('/auth');
  await page.fill('[data-testid="email-input"]', 'test@example.com');
  await page.click('text=Kirim OTP');
  // Note: In test env, OTP is deterministic (from test email provider)
  await page.fill('[data-testid="otp-input"]', TEST_OTP);
  await page.click('text=Verifikasi');
  await expect(page.locator('[data-testid="user-avatar"]')).toBeVisible();
});
```

#### E2E Test: Offline Mode

```typescript
test('offline: quiz answers cached, synced on reconnect', async ({ page, context }) => {
  await page.goto('/quizzes/n5-vocab');

  // Go offline
  await context.setOffline(true);
  await expect(page.locator('[role="status"]')).toContainText('Offline Mode');

  // Select answers (buttons disabled, but selections still registered)
  await page.click('[data-testid="option-b"]');

  // Come back online
  await context.setOffline(false);
  await expect(page.locator('[data-testid="sync-toast"]')).toContainText('Menyinkronkan');
  await expect(page.locator('[data-testid="sync-toast"]')).toContainText('selesai');
});
```

#### E2E Test: Network Failure Mid-Quiz

```typescript
test('network failure: retry succeeds', async ({ page, context }) => {
  await page.goto('/quizzes/n5-vocab');
  await page.click('[data-testid="option-a"]');

  // Simulate network drop after answer
  await context.route('/api/quiz/submit', (route) => route.abort('failed'));
  // trigger submit...
  await expect(page.locator('[data-testid="error-toast"]')).toContainText('Koneksi terputus');

  // Remove route intercept — allow retry to succeed
  await context.unroute('/api/quiz/submit');
  await page.click('text=Coba Lagi');
  await expect(page.locator('[data-testid="error-toast"]')).not.toBeVisible();
});
```

### 4.5 CI Configuration

```yaml
# .github/workflows/test.yml
name: Test

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  unit-integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx vitest run --coverage
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npx playwright test
        env:
          BASE_URL: http://localhost:5173
```

---

## 5. Analytics & Instrumentation

### 5.1 Event Naming Convention

Format: `[feature]:[action]` or `[feature]:[action]_[detail]`

```typescript
// Thin wrapper around Umami (or any analytics provider)
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(event, properties);
  }
  // Also log in development for verification
  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, properties);
  }
}
```

### 5.2 Full Event Schema

```typescript
// Assessment
trackEvent('assessment:start');
trackEvent('assessment:answer_q1', { answer_id: 'opt-a' });
trackEvent('assessment:answer_q2', { answer_id: 'opt-c' });
// ... q3, q4, q5
trackEvent('assessment:complete', {
  score: 3,
  level: 'n5',
  time_spent: 420, // seconds
});

// Learning path
trackEvent('path:view', { level: 'n5' });

// Step interactions
trackEvent('step:open', { level: 'n5', step_slug: 'hiragana-gojuuon' });
trackEvent('step:resource_click', {
  level: 'n5',
  step_slug: 'hiragana-gojuuon',
  resource_index: 0,
  resource_type: 'video', // 'video' | 'article' | 'flashcard' | 'other'
});
trackEvent('step:complete', {
  level: 'n5',
  step_slug: 'hiragana-gojuuon',
  time_spent: 900, // seconds from step:open
});

// Auth
trackEvent('auth:email_submitted', {
  email_domain: 'gmail.com', // domain only — never full email
});
trackEvent('auth:otp_verified');
trackEvent('auth:user_created');
trackEvent('auth:login');

// Quizzes
trackEvent('quiz:start', { quiz_slug: 'n5-vocab', level: 'n5' });
trackEvent('quiz:complete', {
  quiz_slug: 'n5-vocab',
  level: 'n5',
  score: 8,
  total: 10,
});

// Gamification
trackEvent('achievement:unlocked', { achievement_slug: 'hiragana-master' });

// localStorage migration
trackEvent('migration:started');
trackEvent('migration:completed', {
  steps_migrated: 5,
  assessment_migrated: true,
});
trackEvent('migration:failed', { error_type: 'network_timeout' });
```

### 5.3 Where to Place Tracking Calls

| Event | File | Placement |
|---|---|---|
| `assessment:start` | `src/pages/assessment.tsx` | On component mount |
| `assessment:answer_q{n}` | `src/stores/assessment-store.ts` | In `setAnswer()` action |
| `assessment:complete` | `src/pages/assessment.tsx` | On result navigation |
| `path:view` | `src/pages/learning.tsx` | On component mount |
| `step:open` | `src/pages/step-detail.tsx` | On component mount |
| `step:resource_click` | `src/pages/step-detail.tsx` | On resource link click handler |
| `step:complete` | `src/pages/step-detail.tsx` | On successful POST /api/progress/complete |
| `auth:*` | `src/pages/auth.tsx` | In auth action handlers |
| `quiz:start` | `src/pages/quiz.tsx` | On component mount |
| `quiz:complete` | `src/stores/quiz-store.ts` | After successful submit |
| `achievement:unlocked` | `src/hooks/use-achievements.ts` | On achievement detection |
| `migration:*` | `src/hooks/use-migration.ts` | In migration hook |

### 5.4 Primary Conversion Funnel

```
Landing Page View
  ↓ Target: 20% CTA click rate
Assessment Start
  ↓ Target: 80% completion rate
Assessment Complete → Result Page
  ↓ Target: 70% path view rate
Learning Path View
  ↓ Target: 50% step open rate within 7 days
Step Opened
  ↓ Target: 30% completion rate
Step Completed
```

Track funnel in Umami by querying sequential event occurrences per user session.

### 5.5 Cohort Analysis

| Cohort | Hypothesis |
|---|---|
| By Assessed Level: Kana, N5, N4, N3, N2+ | Kana-level users have highest absolute engagement; N3+ users have highest step completion rate per session |
| By Registration Status: Guest vs Registered | Registered users have 2–3× higher day-7 retention |
| By Activity: DAU, WAU | WAU/DAU ratio target: 0.5+ (healthy app usage) |

### 5.6 KPI Dashboard Targets

| KPI | Target | Measurement |
|---|---|---|
| Day-1 retention | 50% | Unique users returning next day |
| Day-7 retention | 30% | Unique users returning 7 days later |
| Day-30 retention | 15% | Unique users returning 30 days later |
| Steps completed per user (month 1) | ≥5 | Sum(step:complete) / unique users |
| Avg session duration | >10 min | Time between first and last event per session |
| Resource clicks per step | ≥1.5 | Sum(step:resource_click) / Sum(step:open) |
| Level completion rate | 10% reach N2 from Kana | Cohort: started at Kana, reached N2 steps |
| Assessment completion | 40%+ | assessment:complete / assessment:start |
| Assessment → path view | 60%+ | path:view / assessment:complete |

---

## 6. Dark Mode (P2)

### 6.1 Implementation Plan

Dark mode works via Tailwind's `dark:` variant classes. Untitled UI components handle semantic color tokens automatically in dark mode — do not add custom dark: overrides to Untitled UI components unless there is a specific bug.

```typescript
// src/stores/theme-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
};

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (value) => set({ isDarkMode: value }),
    }),
    {
      name: 'theme', // localStorage key: 'theme'
    }
  )
);
```

```typescript
// src/providers/theme.tsx — apply dark class to <html>
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't explicitly set preference
      const stored = localStorage.getItem('theme');
      if (!stored) useThemeStore.getState().setDarkMode(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return <>{children}</>;
}
```

### 6.2 Dark Mode Toggle UI

Place in user settings page or persistent navigation:

```typescript
// Use Untitled UI Switch component
import { Switch } from '@untitledui/react';
import { Moon01, Sun } from '@untitledui/icons';

<Switch
  isSelected={isDarkMode}
  onChange={toggleDarkMode}
  aria-label="Toggle dark mode"
>
  {isDarkMode ? <Moon01 className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
  {isDarkMode ? 'Mode Gelap' : 'Mode Terang'}
</Switch>
```

### 6.3 localStorage Key

`localStorage['theme']` — stores `'dark'` or `'light'`. Set by Zustand `persist` middleware.

---

## 7. Swipe Navigation (P2)

Mobile gesture navigation between learning steps. Swipe left → next step; swipe right → previous step.

### 7.1 Implementation

```typescript
// src/pages/step-detail.tsx
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';

function StepDetailPage({ currentStep, prevStepSlug, nextStepSlug, level }) {
  const navigate = useNavigate();

  return (
    <motion.div
      drag="x"
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 100 && prevStepSlug) {
          // Swipe right → previous step
          navigate({ to: `/learning/${level}/${prevStepSlug}` });
          navigator.vibrate?.(10); // Haptic feedback if supported
        } else if (info.offset.x < -100 && nextStepSlug) {
          // Swipe left → next step
          navigate({ to: `/learning/${level}/${nextStepSlug}` });
          navigator.vibrate?.(10);
        }
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }} // ~400ms snap
    >
      {stepContent}
    </motion.div>
  );
}
```

### 7.2 Rules

- **Always keep navigation buttons visible** — swipe is enhancement only; non-gesture users must not be blocked
- **Haptic feedback:** `navigator.vibrate(10)` on successful snap (10ms = subtle tap; only if `navigator.vibrate` supported)
- **Disabled on desktop:** `@media (pointer: coarse)` — drag only applies on touch devices; on desktop the drag constraint effectively disables it
- **Do not apply drag** to RadioGroup/input areas within step content — use `dragListener: false` on interactive child elements if needed

---

## 8. Spaced Repetition (P2)

Layer SM-2 spaced repetition algorithm on top of the existing `quiz_results` table from Sprint 01.

### 8.1 SM-2 Algorithm

```typescript
// src/utils/spaced-repetition.ts

type ReviewRecord = {
  repetition: number;    // number of successful reviews in a row
  easiness: number;      // easiness factor (starts at 2.5)
  interval: number;      // days until next review
};

export function calculateNextReview(
  current: ReviewRecord,
  quality: number       // 0-5: 0-2 = fail, 3-5 = pass
): ReviewRecord & { nextReviewDate: Date } {
  let { repetition, easiness, interval } = current;

  if (quality < 3) {
    // Failed — reset repetition count
    repetition = 0;
    interval = 1;
  } else {
    // Passed
    if (repetition === 0) interval = 1;
    else if (repetition === 1) interval = 3;
    else interval = Math.round(interval * easiness);

    repetition++;
    easiness = Math.max(1.3, easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return { repetition, easiness, interval, nextReviewDate };
}
```

### 8.2 Quality → JLPT Score Mapping

| Quiz Score | SM-2 Quality |
|---|---|
| ≥90% | 5 (perfect) |
| 70–89% | 4 (correct with hesitation) |
| 50–69% | 3 (correct with difficulty) |
| <50% | 1 (incorrect) |

### 8.3 Database Schema Update

```sql
-- Add to quiz_results table (or create separate review_schedule table)
ALTER TABLE quiz_results
ADD COLUMN sm2_repetition INTEGER DEFAULT 0,
ADD COLUMN sm2_easiness DECIMAL(4,2) DEFAULT 2.5,
ADD COLUMN sm2_interval INTEGER DEFAULT 1,
ADD COLUMN next_review_date TIMESTAMP;

-- Or: separate table for cleaner separation
CREATE TABLE review_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  quiz_slug VARCHAR(255) NOT NULL,
  repetition INTEGER DEFAULT 0,
  easiness DECIMAL(4,2) DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  next_review_date TIMESTAMP NOT NULL,
  last_reviewed_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, quiz_slug)
);
```

### 8.4 UI Integration

- **"Review recommended" indicator** on step cards in the learning path:
  ```
  [Step Card]
    BadgeWithDot color="warning": "Waktunya review!"
    (Only shown if next_review_date ≤ today and user has past quiz attempt)
  ```
- **Dedicated review queue page** (P3): `/review` — lists all due quizzes sorted by urgency

---

## 9. Resource Validation Job (P2)

External resource links can go dead over time. A weekly background job validates all URLs.

### 9.1 Job Logic

```
Weekly background job (cron: 0 2 * * 1 — Mondays at 2am UTC):

FOR EACH step in all levels:
  FOR EACH resource link in step:
    HTTP HEAD {resource.url} (timeout: 10s)
    
    IF response status = 404:
      UPDATE resources SET status = 'offline' WHERE url = resource.url
      ALERT admin (email or Slack webhook)
    
    ELSE IF response_time > 5000ms:
      UPDATE resources SET status = 'slow' WHERE url = resource.url
    
    ELSE:
      UPDATE resources SET status = 'ok', last_checked_at = now()
```

### 9.2 Implementation Options

**Option A: Vercel Cron Function**
```typescript
// api/cron/validate-resources.ts
// Vercel cron: schedule "0 2 * * 1" in vercel.json
export async function GET() {
  const steps = await getAllStepsWithResources();
  const results = await Promise.allSettled(
    steps.flatMap((step) =>
      step.resources.map((resource) => validateResourceUrl(resource))
    )
  );
  // Update DB, send alerts
  return Response.json({ validated: results.length });
}
```

**Option B: GitHub Actions Scheduled Workflow**
```yaml
# .github/workflows/validate-resources.yml
on:
  schedule:
    - cron: '0 2 * * 1'
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - run: npx tsx scripts/validate-resources.ts
```

### 9.3 User-Facing UI

When a resource has `status = 'offline'`:
```
[Resource Link Row]
  Icon: AlertTriangle (fg-warning-primary)
  Text: "⚠️ Link ini sedang offline. Coba link lain."
  Button: disabled (with strikethrough URL)
```

When all resources in a step are offline:
```
[Step Detail — top banner]
  "Beberapa link di step ini sedang offline. Tim sedang memperbaiki."
```

### 9.4 Admin Controls

- Admin can mark resources as `hidden` to remove from UI until replaced
- Admin panel (P3): `/admin/resources` — list all resources with status, last checked date

---

## 10. Community Discussion (P3)

Per-step Q&A discussion threads with upvoting. Moderated community layer on top of the learning content.

### 10.1 Database Schema

```sql
CREATE TABLE discussion_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_slug VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE discussion_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES discussion_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_accepted_answer BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE discussion_votes (
  user_id UUID NOT NULL REFERENCES users(id),
  post_id UUID NOT NULL REFERENCES discussion_posts(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, post_id)
);

CREATE TABLE discussion_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES users(id),
  post_id UUID REFERENCES discussion_posts(id),
  thread_id UUID REFERENCES discussion_threads(id),
  reason VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Indexes
CREATE INDEX idx_threads_step_slug ON discussion_threads(step_slug);
CREATE INDEX idx_posts_thread_id ON discussion_posts(thread_id);
```

### 10.2 API Endpoints

```
POST /api/discussions/threads              — create thread (auth required)
GET  /api/discussions/threads/[step-slug]  — list threads for step
POST /api/discussions/posts                — reply to thread (auth required)
POST /api/discussions/posts/[id]/upvote    — upvote post (auth required)
POST /api/discussions/posts/[id]/report    — report post (auth required)
```

### 10.3 UI Integration

In step detail page (below resources, above completion checkbox):
```
[Section: "Diskusi (n pertanyaan)"]
  [Thread preview cards — top 3]
  Button (link): "Lihat semua diskusi ({n})"
  Button (secondary): "Tanya Pertanyaan Baru"
```

---

## 11. Error Logging — Sentry (P2)

### 11.1 Setup

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx — initialize before React renders
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE, // 'development' | 'production'
  tracesSampleRate: 0.1,             // 10% of transactions traced
  beforeSend(event) {
    // Strip PII — mask email and user_id
    if (event.user) {
      event.user = {
        id: event.user.id ? '[MASKED]' : undefined,
        // Never include email in error reports
      };
    }
    return event;
  },
});
```

```typescript
// Wrap app root for error boundary
const app = Sentry.withErrorBoundary(App, {
  fallback: <ErrorFallbackPage />, // Untitled UI-based fallback
});
```

### 11.2 Manual Error Capture

```typescript
// In API error handlers
try {
  await postProgressComplete(payload);
} catch (err) {
  Sentry.captureException(err, {
    tags: { feature: 'progress', action: 'complete' },
    extra: { step_slug: payload.step_slug, level: payload.level },
  });
  throw err; // re-throw to be handled by UI error state
}
```

### 11.3 Alerts

Configure in Sentry dashboard:
- Alert: Error rate >5% in 5-minute window → Slack webhook `#ippo-errors`
- Alert: Any new error type → Slack `#ippo-errors`
- Alert: Performance degradation: API p95 latency >1s → Slack `#ippo-perf`

### 11.4 Environment Variables

```
VITE_SENTRY_DSN=https://...@o123.ingest.sentry.io/456
```

Add to Vercel environment variables for `production` and `preview` environments.

---

## 12. Analytics — Umami (P2)

Privacy-friendly, GDPR-compliant analytics. No cookies required. Self-host or use Umami Cloud.

### 12.1 Setup

```html
<!-- index.html — Umami script tag -->
<script
  defer
  src="https://analytics.your-domain.com/script.js"
  data-website-id="YOUR_WEBSITE_ID"
></script>
```

Or with npm:
```bash
npm install @umami/node
```

### 12.2 Custom Event Tracking

```typescript
// Umami exposes window.umami.track() globally after script loads
// Use the trackEvent wrapper from Section 5.1 — it handles the null check

// Example usage in component:
const handleStepComplete = async () => {
  await postProgressComplete(payload);
  trackEvent('step:complete', {
    level: step.level,
    step_slug: step.slug,
    time_spent: elapsedSeconds,
  });
};
```

### 12.3 Dashboard Setup

In Umami dashboard, create:
1. **Funnel view:** Landing → assessment:start → assessment:complete → path:view → step:open → step:complete
2. **Cohort view:** Group by `level` property on `assessment:complete` event
3. **Retention report:** Users returning within 1, 7, 30 days
4. **Top events:** ranked by frequency — identify most-used features

---

## 13. Bilingual Support Implementation

### 13.1 Language Storage

```typescript
// Stored in localStorage key: 'language'
// Value: 'id' (Indonesian) | 'en' (English)
// Default: navigator.language detection → 'id' fallback

export function getDefaultLanguage(): 'id' | 'en' {
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('id') ? 'id' : 'en';
}
```

### 13.2 Persistence

```typescript
// src/stores/language-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLanguageStore = create(
  persist(
    (set) => ({
      language: getDefaultLanguage(),
      setLanguage: (lang: 'id' | 'en') => set({ language: lang }),
    }),
    { name: 'language' } // localStorage key
  )
);
```

Also store in `users.preferred_language` column (VARCHAR(5)) — sync on login.

### 13.3 Language Switch UI

```typescript
// Untitled UI RadioGroup in user settings
import { RadioGroup, Radio } from '@untitledui/react';

<RadioGroup
  value={language}
  onChange={setLanguage}
  aria-label="Pilih bahasa / Choose language"
>
  <Radio value="id">Bahasa Indonesia</Radio>
  <Radio value="en">English</Radio>
</RadioGroup>
```

### 13.4 Content Rules

- All UI copy: Indonesian primary (shown to user)
- All code comments: English
- External resources: linked as-is — no translation of linked content
- Error messages: Indonesian first, English in parentheses for dev-facing messages

---

## 14. Deployment

### 14.1 Environments

| Environment | Frontend | Database | Use |
|---|---|---|---|
| Development | `localhost:5173` + Vercel preview | Neon branch DB | Local development + PR previews |
| Staging | `staging.ippo.app` (Vercel staging domain) | Neon staging DB | Pre-launch QA; data refresh 1×/week |
| Production | `ippo.app` (Vercel production) | Neon production DB | Live traffic |

**Neon branch strategy:**
- `main` branch → production DB
- `staging` branch → staging DB
- `dev/{feature}` branches → per-PR preview DBs (auto-created/deleted)

### 14.2 Required Environment Variables

| Variable | Environment | Description |
|---|---|---|
| `DATABASE_URL` | All | Neon Postgres connection string |
| `RESEND_API_KEY` | All | Resend email API for OTP delivery |
| `AUTH_SECRET` | All | Better Auth secret (min 32 chars, random) |
| `BETTER_AUTH_SECRET` | All | Same as AUTH_SECRET (Better Auth alias) |
| `VITE_SENTRY_DSN` | Production, Staging | Sentry DSN for error reporting |
| `VITE_UMAMI_WEBSITE_ID` | Production, Staging | Umami analytics website ID |

Set all via Vercel dashboard or `vercel env add`.

### 14.3 Pre-Production Deployment Checklist

Run this checklist before every production deploy:

**Database**
- [ ] Drizzle migrations run: `npx drizzle-kit migrate` against production DB
- [ ] Verify schema: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
- [ ] Test migrations on staging DB first — never run untested migrations on production

**Environment Variables**
- [ ] `RESEND_API_KEY` set in Vercel production environment
- [ ] `AUTH_SECRET` and `BETTER_AUTH_SECRET` set (same value, 32+ random chars)
- [ ] `DATABASE_URL` pointing to Neon production branch
- [ ] `VITE_SENTRY_DSN` set (P2+ only)
- [ ] `VITE_UMAMI_WEBSITE_ID` set (P2+ only)

**Content**
- [ ] All JLPT levels (Kana, N5, N4, N3, N2, N1) have ≥5 steps each
- [ ] All steps have ≥2 working resource links (spot-check 5 random steps)
- [ ] Quiz content files present for all active quiz slugs

**Functionality**
- [ ] OTP email delivery tested in staging (real email, not test mode)
- [ ] POST /api/progress/complete returns 200 in staging
- [ ] POST /api/quiz/submit returns 200 in staging
- [ ] localStorage → account migration tested: guest → register → data appears in DB
- [ ] Analytics events fire in staging (check Umami dashboard or browser console)

**Quality**
- [ ] Lighthouse score ≥85 (mobile) on landing page and /assessment
- [ ] axe DevTools: zero critical violations on all primary flows
- [ ] Mobile testing: iOS Safari 14+ (physical device or BrowserStack)
- [ ] Mobile testing: Android Chrome 90+ (physical device or BrowserStack)
- [ ] Samsung Internet 14+ basic smoke test

**Error Monitoring**
- [ ] Sentry DSN configured and receiving test events
- [ ] Slack webhook alerts configured for error rate threshold

### 14.4 Rollout Plan

**Week 1 — Soft Launch**
1. Deploy to Vercel production
2. Invite 50 beta users via direct email (use Resend list)
3. Monitor for 48 hours: error logs, session duration, step completion rate
4. Fix all critical bugs (those occurring ≥5 times in 48 hours)
5. Review qualitative feedback from beta users

**Week 2 — Public Launch**
1. Publish launch blog post on project site
2. Post to: Reddit r/LearnJapanese, r/JLPT, Indonesian tech communities (Dicoding, Discord), LinkedIn
3. Monitor KPIs daily for first 2 weeks (see Section 5.6 targets)

**Weeks 3–4 — Iteration**
- Analyze funnel drop-off points (where do users leave the assessment? Which steps have lowest completion?)
- Fix UX issues surfaced by data
- Begin P2 development based on priority signals from usage data

---

## 15. Browser & Device Support Matrix

### Browsers

| Browser | Minimum Version | Support Level |
|---|---|---|
| iOS Safari | 14+ | Full |
| Chrome | 90+ | Full |
| Firefox | 88+ | Full |
| Samsung Internet | 14+ | Full |
| Edge | 90+ | Full |
| Internet Explorer | Any version | Not supported |

**Not supported = no testing, no polyfills.** If a user on IE reports issues, they should be redirected to download Chrome.

### Devices

| Device | Status | Notes |
|---|---|---|
| iPhone 12/13/14/15 | Full | Primary test device |
| iPhone SE (3rd gen) | Full | 375px width — primary viewport |
| Android 10+ (modern, 4GB+ RAM) | Full | |
| iPad 5th gen+ | Full | Tablet layout (`md:` breakpoint) |
| Older Android (2GB RAM, slow 3G) | Acceptable | 3–4s load acceptable per PRD |
| Android 8/9 | Best effort | Test when possible |

### Feature Compatibility Notes

- `navigator.vibrate()` — not supported on iOS; use optional chaining (`navigator.vibrate?.(10)`)
- `CSS env()` safe areas — supported in iOS Safari 11.2+, Chrome 69+; all target browsers ✓
- `AbortController` — supported in all target browsers ✓
- Framer Motion — requires React 18+; all target browsers ✓
- CSS Grid / Flexbox — all target browsers ✓

---

## 16. Testing Infrastructure Reference

```
tests/
├── unit/
│   ├── calculate-level.test.ts
│   ├── calculate-quiz-score.test.ts
│   ├── update-streak.test.ts
│   ├── check-achievements.test.ts
│   ├── migrate-local-storage.test.ts
│   └── progress-aggregation.test.ts
├── integration/
│   ├── auth-flow.test.ts
│   ├── progress-save-retrieve.test.ts
│   ├── migration.test.ts
│   ├── achievement-unlock.test.ts
│   └── quiz-submit-history.test.ts
└── e2e/
    ├── happy-path.spec.ts
    ├── auth-flow.spec.ts
    ├── offline-mode.spec.ts
    ├── network-failure.spec.ts
    └── mobile-viewport.spec.ts
```

```bash
# Coverage report (target: 70% for src/utils/* and src/stores/*)
npx vitest run --coverage --reporter=html
# View: open coverage/index.html
```
