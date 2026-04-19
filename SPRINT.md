# Sprint: Content Pipeline + JLPT Quiz Catalog

## Overview

DB-backed quiz system with contributor workflows, JLPT-format quiz catalog, and level-specific mini-games.

---

## Phase 1: Database Schema + Quiz Bank Migration
**Branch:** `feat/phase1-quiz-bank-migration`
**Status:** ✅ Complete

### Checklist

#### Schema (`src/db/schema.ts`)
- [x] Add `role` column to `users` table (`'user' | 'contributor' | 'admin'`, default `'user'`)
- [x] New table: `quiz_bank` (id, slug, title, question_id UNIQUE, question_text, options JSONB, explanation, category, level, sort_order, created_at, updated_at)
- [x] New table: `quiz_submissions` (id, submitted_by FK, slug, title, level, category, questions JSONB, status, reviewer_id FK, review_note, submitted_at, reviewed_at, created_at, updated_at)
- [x] New table: `game_results` (id, user_id FK, game_type, level, score, max_score, time_seconds, completed_at, created_at)
- [x] Export inferred types: `QuizBankEntry`, `QuizSubmission`, `GameResult` (+ New* variants)

#### Validators (`src/db/validators.ts`)
- [x] Add Zod schemas: `QuizBankInsertSchema`, `QuizSubmissionCreateSchema`, `GameResultSubmitSchema`, `QuizOptionSchema`

#### Auth Guard (`src/server/auth-guard.ts`)
- [x] `requireAuth(request)`, `isAuthError(result)`, role guards

#### Migration + Seed
- [x] Migration applied via Neon MCP
- [x] 127 questions across 17 quizzes seeded into `quiz_bank`

#### API Routes + Hook
- [x] `GET /api/quiz-bank/$slug` and `GET /api/quiz-bank` endpoints
- [x] `use-quiz.ts` fetches from DB API instead of static imports

---

## Phase 2: Admin + Contributor CMS
**Branch:** `feat/phase2-admin-contributor`
**Status:** ✅ Complete

### Checklist

#### Admin
- [x] `/admin` layout route with role guard
- [x] `/admin/submissions` — list with status tabs, submitter name, question count
- [x] `/admin/submissions/$id` — detail with metadata card (submitter, dates, reviewer) + approve/reject
- [x] Approve uses `txDb.transaction()` (neon-serverless WebSocket driver) for atomic quiz_bank insert + status update

#### Contributor
- [x] `/contributor` layout route with role guard
- [x] `/contributor/submissions` — list (all rows clickable, draft→edit, others→detail)
- [x] `/contributor/submissions/new` — form with question editor + bulk JSON upload
- [x] `/contributor/submissions/$id/edit` — edit draft
- [x] `/contributor/submissions/$id` — read-only detail with review feedback
- [x] Toast on successful submission for review

#### API Routes
- [x] Admin: list (with JOIN), detail (double JOIN), approve (transaction), reject
- [x] Contributor: CRUD, submit for review
- [x] Privacy: `reviewer_id` excluded from contributor responses

#### Code Quality (via /simplify)
- [x] Shared `SubmissionQuestionsList` component (no duplicate JSX)
- [x] `jsonb_array_length()` in SQL (no full JSONB transfer for lists)
- [x] Cache invalidation on save via `useQueryClient`
- [x] Hybrid DB driver: `db` (neon-http) for queries, `txDb` (neon-serverless Pool) for transactions

---

## Phase 2A: Quiz Sets Table + Backfill
**Branch:** `feat/phase2-admin-contributor` (continue)
**Status:** ⏳ Next

### JLPT Written Exam Target (per level)

| Level | Vocab+Kanji | Grammar | Reading | Total |
|-------|-------------|---------|---------|-------|
| N5    | 25          | 15      | 5       | 45    |
| N4    | 30          | 15      | 7       | 52    |
| N3    | 30          | 15      | 12      | 57    |
| N2    | 30          | 15      | 20      | 65    |
| N1    | 30          | 15      | 25      | 70    |

### Checklist

#### Schema (`src/db/schema.ts`)
- [ ] New table: `quiz_sets` (id, slug UNIQUE, title, description, level, set_type `'category'|'exam'`, categories JSONB, author_id FK, submission_id FK, is_published, created_at, updated_at)
- [ ] Add `quiz_set_id UUID FK` to `quiz_bank` (nullable for backfill)
- [ ] Export types: `QuizSet`, `NewQuizSet`

#### Config (`src/config/jlpt-exam-config.ts`)
- [ ] `JLPT_EXAM_CONFIG` — question count targets per level per category

#### Validators (`src/db/validators.ts`)
- [ ] Add `QuizSetCreateSchema`
- [ ] Raise `QuizSubmitSchema` limits: score max 20→100, total_questions max 20→100

#### Migration + Backfill
- [ ] `drizzle-kit generate` + apply via Neon MCP
- [ ] Backfill script: create `quiz_sets` rows from existing distinct `quiz_bank.slug` values, set `quiz_set_id`

### Verification
- [ ] All 17 existing quizzes have `quiz_sets` rows
- [ ] `quiz_bank.quiz_set_id` populated for all rows
- [ ] `npm run build` passes

---

## Phase 2B: Quiz Sets API Layer
**Status:** ⏳ After 2A

### Checklist
- [ ] `GET /api/quiz-sets` — catalog listing with level/type filters, `isNew` flag (14 days), completedSlugs
- [ ] `GET /api/quiz-sets/$slug` — set detail with all questions + metadata
- [ ] `GET /api/quiz-sets/generate?level=n5` — on-the-fly exam assembly from pool matching JLPT distribution
- [ ] Update approve endpoint: auto-create `quiz_sets` row on approval, link `quiz_bank` entries
- [ ] Update `use-quiz.ts` to fetch from `/api/quiz-sets/$slug`

### Verification
- [ ] `GET /api/quiz-sets` returns all published sets with metadata
- [ ] `GET /api/quiz-sets/generate?level=n5` returns random exam matching distribution
- [ ] Approved submission auto-creates quiz set, appears in catalog API
- [ ] Existing `/quizzes/$slug` route still works

---

## Phase 2C: Quiz Catalog Page
**Status:** ⏳ After 2B

### Checklist
- [ ] `/quizzes` index route — catalog page
- [ ] Level tabs (Kana | N5 | N4 | N3 | N2 | N1), default to assessed level
- [ ] "Simulasi Ujian JLPT" section — exam-type set cards (prominent)
- [ ] "Latihan per Kategori" section — category practice set cards (grid)
- [ ] Quiz set card: title, question count, category badges, `BadgeWithDot` "Baru", completion status, best score
- [ ] "Buat Simulasi Ujian" button → generate random exam → navigate to quiz
- [ ] Show "Segera Hadir" for levels with insufficient question pool
- [ ] Add "Kuis" nav item to `dashboard-nav-items.ts`
- [ ] Add "Kembali ke Katalog" button on quiz score results page

### Verification
- [ ] `/quizzes` shows level tabs with quiz set cards
- [ ] "Baru" badge shows for sets created within 14 days
- [ ] Can take a quiz from catalog and return to catalog after
- [ ] `npm run build` passes

---

## Phase 2D: Contributor Form + Learning Path Polish
**Status:** ⏳ After 2C

### Checklist
- [ ] Add JLPT question count guidance text on submission form (informational)
- [ ] Remove hardcoded `LEVEL_QUIZ_SLUGS` from `step-detail-page.tsx`
- [ ] Add "Lihat Katalog Kuis" CTA on section quiz card and step detail

### Verification
- [ ] Contributor sees recommended question counts when creating submission
- [ ] Learning path still shows quiz cards
- [ ] Quiz catalog link accessible from learning path

---

## Phase 3: Remove Static Quiz Files
**Branch:** `feat/phase3-remove-static-quizzes`
**Status:** ⏳ After Phase 2D

### Checklist
- [ ] All 17 quizzes verified loading from DB
- [ ] Delete `src/content/quizzes/` directory (all 17 `.ts` files)
- [ ] Remove any remaining static quiz import references
- [ ] `npm run build` passes

---

## Phase 4: Mini-Games
**Branch:** `feat/phase4-mini-games`
**Status:** ⏳ After Phase 3

### Checklist

#### Game Store + Routes
- [ ] `src/stores/game-store.ts` — mirrors quiz-store pattern
- [ ] `/games/$level` — game selection hub
- [ ] `/games/$level/flashcard-match` — card matching game
- [ ] `/games/$level/word-sort` — drag-and-drop sorting

#### Components
- [ ] `game-timer.tsx`, `game-score-display.tsx`, `flashcard.tsx`, `sortable-word.tsx`, `drop-zone.tsx`

#### API
- [ ] `POST /api/games/submit` — save result + XP
- [ ] `GET /api/games/$level/history` — game history

### Verification
- [ ] Both games playable with score saving and XP awards
- [ ] `npm run build` passes

---

## Notes
- All UI uses Untitled UI components only (no custom visual components)
- Kebab-case filenames throughout
- Semantic color tokens only
- Mobile-first, 375px primary viewport
- Indonesian language primary
- Hybrid DB: `db` (neon-http) for queries, `txDb` (neon-serverless) for transactions
