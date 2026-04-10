# Ippo — Multi-Agent Build Strategy

## Current State

**What exists:** Vite + React 19 + TypeScript scaffold, Untitled UI component library, Tailwind CSS v4 theme system, React Router v7 (minimal), Framer Motion.

**What's missing:** Everything Ippo-specific — database, auth, state management, all pages, all content, all API endpoints.

**Key architectural decision:** The current setup is a **client-side SPA** (Vite + React Router). There is no server/API layer. You need one for:
- Better Auth (needs server endpoints)
- Progress save/load (DB queries)
- OTP email sending (Resend API key must be server-side)

**Recommended approach:** Add **Hono** as a lightweight API server running via Vite dev server (plugin) and deployed as Vercel Serverless Functions. This keeps the SPA architecture while adding API routes without migrating to a full-stack framework.

Alternative: Migrate to **TanStack Start** (the PRD mentions it). This is a bigger change but gives you SSR + API routes out of the box. Choose based on your preference.

---

## Build Phases & Agent Assignment

### Phase 0: Foundation (Sequential — must complete before parallel work)

These tasks have zero parallelism because everything depends on them.

#### Task 0A: Install Dependencies & Project Config
**Agent:** Single agent (you or Claude Code)
**Duration:** ~15 min

```bash
# State management + data fetching
npm install zustand @tanstack/react-query

# Database
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit

# Auth
npm install better-auth

# API server (if using Hono approach)
npm install hono
npm install -D @hono/vite-dev-server

# Validation
npm install zod

# Email
npm install resend
```

Create `.env.example`:
```
DATABASE_URL=postgresql://...@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:5173
RESEND_API_KEY=re_xxx
```

#### Task 0B: Database Schema + Drizzle Setup
**Agent:** Backend agent
**Sprint doc:** `01-foundation-database.md`
**Deliverables:**
- `src/db/schema.ts` — all 4 tables (users, progress, quiz_results, achievements)
- `src/db/index.ts` — Neon connection + Drizzle client
- `drizzle.config.ts` — migration config
- `src/db/validators.ts` — Zod schemas
- Run `npx drizzle-kit generate` + `npx drizzle-kit migrate`

#### Task 0C: API Layer Setup
**Agent:** Backend agent (same as 0B)
**Deliverables:**
- `src/server/index.ts` — Hono app with CORS, auth middleware
- `vite.config.ts` update — add Hono dev server plugin
- `api/[[...route]].ts` — Vercel serverless function entry (for deployment)
- Verify: `GET /api/health` returns 200

#### Task 0D: Better Auth Setup
**Agent:** Backend agent (same as 0B, 0C)
**Sprint doc:** `02-auth-flow.md` (server portion only)
**Deliverables:**
- `src/lib/auth.ts` — Better Auth server config (email OTP provider, Drizzle adapter)
- `src/lib/auth-client.ts` — Better Auth client
- `src/server/routes/auth.ts` — Mount Better Auth handler on Hono
- Resend email template for OTP
- Verify: OTP send + verify works via curl/Postman

---

### Phase 1: Parallel Development (3 Agents)

Once Phase 0 is complete, three agents can work **simultaneously** on independent tracks.

```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│  AGENT A: Frontend   │  │  AGENT B: Backend    │  │  AGENT C: Content    │
│  (Pages & UI)        │  │  (API Routes)        │  │  (Data & Types)      │
│                      │  │                      │  │                      │
│  Auth pages          │  │  Progress API        │  │  Assessment Qs       │
│  Assessment UI       │  │  Assessment API      │  │  Kana content        │
│  Learning path UI    │  │  Quiz API            │  │  N5-N1 content       │
│  Step detail UI      │  │  Achievement logic   │  │  Quiz questions      │
│  Layout/navigation   │  │  Migration API       │  │  Type definitions    │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

---

#### Agent A: Frontend (Pages & UI)
**Sprint docs:** `02-auth-flow.md` (UI), `03-onboarding-assessment.md` (UI), `04-learning-path.md` (UI)

**Task A1: App Shell & Router Setup**
- Replace demo `HomeScreen` with Ippo landing page
- Set up React Router routes:
  ```
  /                      → Landing page
  /assessment            → Assessment flow
  /assessment/result     → Assessment result
  /learning/:level       → Level learning path
  /learning/:level/:step → Step detail
  /auth/register         → Registration (email input)
  /auth/login            → Login (email input)
  /auth/verify-otp       → OTP verification
  /profile               → User profile (P1)
  ```
- Create layout wrapper with navigation
- Add TanStack Query provider + Zustand stores
- Add auth context provider (reads session from Better Auth client)

**Task A2: Auth Pages**
- `/auth/register` — email input + name + language selector + "Kirim Kode OTP" button
- `/auth/login` — email input + "Kirim Kode OTP" button
- `/auth/verify-otp` — 6-digit OTP input boxes + timer + resend link
- Confetti animation on success
- All Untitled UI components, all semantic tokens, all microcopy from sprint doc

**Task A3: Assessment UI**
- `/assessment` — intro screen + question flow
- Zustand `useAssessmentStore` (currentQuestion, answers, setAnswer, advance, submit, reset)
- Question card with RadioGroup options
- ProgressBar ("2 dari 5")
- Framer Motion animations (question entry, option selection, result reveal)
- `/assessment/result` — level result + recommended path CTA
- localStorage persistence (assessment_result, draft for mid-exit resume)

**Task A4: Learning Path UI**
- `/learning/:level` — level page with step list
- "Kamu di sini" card (conditional on assessment taken)
- Step items with "Berikutnya" badge for recommended step
- Tabs for level navigation (Kana, N5, N4, N3, N2, N1)
- `/learning/:level/:step` — step detail page
- Resource links (open in new tab)
- "Tandai Selesai" checkbox
- Back/Next navigation buttons
- Progress bar per level

**Task A5: Progress & Toast System**
- Guest: localStorage completion (step_[slug] keys)
- Authenticated: call POST /api/progress/complete (via TanStack mutation)
- Optimistic updates (mark complete immediately, rollback on error)
- Toast notifications (guest CTA, authenticated XP, error)
- Streak indicator display

---

#### Agent B: Backend (API Routes)
**Sprint docs:** `01-foundation-database.md`, `02-auth-flow.md` (server), `05-progress-tracking.md`, `07-account-migration.md`

**Task B1: Progress API**
```
POST /api/progress/complete
  → Zod validate → auth check → UPSERT progress → award XP → check achievements → return
GET  /api/learning/:level/progress
  → auth check → query progress table → aggregate → return steps with completion status
```

**Task B2: Assessment API (optional, for authenticated users)**
```
POST /api/assessment/submit
  → Zod validate → auth check → INSERT quiz_results (quiz_slug='onboarding_assessment') → UPDATE user assessed_level
```

**Task B3: Achievement & Streak Logic**
- `src/server/achievements.ts` — `checkAchievements(userId, level, stepSlug)`
- `src/server/streak.ts` — `updateStreak(userId)`
- Fire-and-forget after progress complete (don't block response)
- Idempotent: UNIQUE index prevents duplicate achievements

**Task B4: Migration API**
```
POST /api/migration/transfer
  → auth check → batch INSERT progress rows → UPDATE user assessed_level → return count
```
Called from auth success handler after OTP verification.

**Task B5: Quiz API (P1)**
```
POST /api/quiz/submit
  → Zod validate → auth check → INSERT quiz_results → return score + feedback
GET  /api/quiz/:slug/history
  → auth check → query quiz_results → return attempts
```

---

#### Agent C: Content & Data Layer
**Sprint docs:** `03-onboarding-assessment.md` (content), `04-learning-path.md` (content), `08-practice-quizzes.md` (content)

**Task C1: Type Definitions**
- `src/types/assessment.ts` — AssessmentQuestion, AssessmentResponse, AssessmentResult
- `src/types/learning.ts` — Step, Level, StepProgress, Resource
- `src/types/quiz.ts` — QuizQuestion, QuizResult
- `src/types/achievement.ts` — Achievement definitions

**Task C2: Assessment Content**
- `src/content/onboarding-assessment.ts` — 5-7 questions (Hiragana, Katakana, N5 vocab, N4 grammar, N3 kanji, N2+ optional)
- `calculateLevel()` function with full scoring algorithm

**Task C3: Learning Path Content (ALL levels)**
- `src/content/kana/index.ts` — Hiragana Gojuuon, Dakuten/Youon, Katakana steps (~5-8 steps)
- `src/content/n5/index.ts` — N5 vocab, grammar, kanji steps
- `src/content/n4/index.ts` — N4 steps
- `src/content/n3/index.ts` — N3 steps
- `src/content/n2/index.ts` — N2 steps
- `src/content/n1/index.ts` — N1 steps
- Each step: title (ID+EN), description (ID+EN), estimatedMinutes, 2-3 curated resource links (NHK World, Tae Kim, YouTube, JLPT Official)

**Task C4: Quiz Content (P1)**
- `src/content/quizzes/n5-vocab.ts` — 10 questions
- `src/content/quizzes/n5-grammar.ts` — 10 questions
- etc. for each level × category

**Task C5: Utility Functions**
- `src/utils/infer-level-from-slug.ts` — maps step slugs to JLPT levels
- `src/utils/calculate-level.ts` — assessment scoring (moved from content)
- `src/utils/local-storage.ts` — typed helpers for getting/setting progress keys

---

### Phase 2: Integration (Sequential)

After Phase 1 agents complete, wire everything together:

**Task I1: Connect Frontend ↔ Backend**
- Auth pages call Better Auth client methods
- Assessment result optionally POSTs to API (if authenticated)
- Learning path fetches progress from API (if authenticated)
- Step completion calls POST /api/progress/complete
- Add TanStack Query hooks in the right pages

**Task I2: localStorage Migration Flow**
- Wire migration into OTP success handler
- Collect localStorage keys → POST /api/migration/transfer → clear keys → toast

**Task I3: End-to-End Testing**
- Happy path: landing → assessment → learning path → step complete
- Auth flow: register → OTP → session → progress persisted
- Guest flow: browse → complete steps → register → data migrated

---

## API Endpoint Summary (What Backend Agent Must Deliver)

| Method | Path | Auth Required | Sprint |
|--------|------|--------------|--------|
| `GET` | `/api/health` | No | 0C |
| `POST` | `/api/auth/send-otp` | No | 0D |
| `POST` | `/api/auth/verify-otp` | No | 0D |
| `POST` | `/api/auth/logout` | Yes | 0D |
| `GET` | `/api/auth/session` | No | 0D |
| `POST` | `/api/assessment/submit` | Yes | B2 |
| `GET` | `/api/learning/:level/progress` | Yes | B1 |
| `POST` | `/api/progress/complete` | Yes | B1 |
| `POST` | `/api/migration/transfer` | Yes | B4 |
| `POST` | `/api/quiz/submit` | Yes | B5 |
| `GET` | `/api/quiz/:slug/history` | Yes | B5 |

---

## Zustand Stores (What Frontend Agent Must Create)

| Store | File | Key State |
|-------|------|-----------|
| Assessment | `src/stores/assessment.ts` | currentQuestion, answers, assessedLevel, setAnswer, advance, submit, reset |
| Auth | `src/stores/auth.ts` | user, session, isLoading (or use Better Auth client directly) |
| Quiz | `src/stores/quiz.ts` | currentQuestion, answers, showFeedback, lastAnswerCorrect |

---

## Recommended Build Order for Claude Code Agents

```
STEP 1 (Single agent, ~30 min):
  Install deps → DB schema → API layer → Better Auth setup
  
STEP 2 (3 agents in parallel, ~2-3 hours):
  Agent A: Auth pages → Assessment UI → Learning path UI → Progress UI
  Agent B: Progress API → Assessment API → Achievement logic → Migration API
  Agent C: Types → Assessment content → All level content → Utilities
  
STEP 3 (Single agent, ~1 hour):
  Wire frontend ↔ backend → Test flows → Fix integration issues
  
STEP 4 (Single agent, ~30 min):
  Polish: responsive testing, accessibility audit, performance check
```

---

## Pre-Flight Checklist (Before Starting)

- [ ] Neon Postgres project created (get DATABASE_URL)
- [ ] Resend account created (get RESEND_API_KEY)  
- [ ] Domain verified in Resend (for noreply@ippo.jp)
- [ ] `.env` file created with all secrets
- [ ] Vercel project linked (for deployment)
- [ ] Decide: Hono API layer vs TanStack Start migration

---

## Key Conventions to Enforce Across All Agents

1. **Kebab-case filenames** — `date-picker.tsx`, not `DatePicker.tsx`
2. **Untitled UI components only** — no custom visual components
3. **Semantic color tokens only** — never `text-gray-900`, always `text-primary`
4. **AriaPrefix** — `import { Button as AriaButton } from "react-aria-components"`
5. **48px touch targets** — all interactive elements on mobile
6. **Indonesian-first microcopy** — all user-facing strings in Indonesian
7. **Zod validation** — all API inputs validated server-side
