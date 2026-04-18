# Sprint: Content Pipeline + Mini-Games

## Overview

Migrating quiz content from static TypeScript files to a DB-backed system with contributor workflows, and adding level-specific mini-games.

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
- [x] Add Zod schema for `quiz_bank` insert (`QuizBankInsertSchema`)
- [x] Add Zod schema for `quiz_submissions` create (`QuizSubmissionCreateSchema`)
- [x] Add Zod schema for `game_results` insert (`GameResultSubmitSchema`)
- [x] Add `QuizOptionSchema` (shared)

#### Auth Guard (`src/server/auth-guard.ts`)
- [x] Extract session-check + user-lookup pattern from existing routes
- [x] `requireAuth(request)` returns `AuthGuardSuccess | Response`
- [x] `isAuthError(result)` type guard

#### Migration
- [x] `npx drizzle-kit generate` — `drizzle/0004_wealthy_talos.sql` generated
- [x] `npx drizzle-kit push` — applied via Neon MCP

#### Seed Script (`src/scripts/seed-quiz-bank.ts`)
- [x] Imports all 17 static quiz files
- [x] Inserts all questions into `quiz_bank` with correct slug, sort_order, category, level
- [x] Idempotent via `onConflictDoNothing()` on `question_id`
- [x] Seeded: 127 questions across all 17 quizzes (verified in Neon)

#### API Routes
- [x] `GET /api/quiz-bank/$slug` — returns quiz with questions, `isCompleted` for auth users
- [x] `GET /api/quiz-bank` — returns list of published quiz metadata + `completedSlugs[]` for auth users

#### Hook Update (`src/hooks/use-quiz.ts`)
- [x] Replace `QUIZ_LOADERS` dynamic imports with `fetch('/api/quiz-bank/${slug}')`
- [x] Preserve existing `isLoading`, `error`, `isOnline`, `questions` return shape
- [x] `quiz-store.ts` unchanged

#### Build Config
- [x] `tsconfig.app.json` excludes `src/scripts/` (CLI-only, not part of app bundle)

#### Quiz Completion UI
- [ ] Completion indicator shown on quiz cards (Phase 2 scope — deferred)

### Verification
- [x] `npm run build` passes with no TypeScript errors
- [x] All 17 quizzes seeded in DB (127 questions verified via Neon MCP)
- [ ] Existing quiz flow (play → submit → score) works end-to-end (manual browser test)

---

## Phase 2: Admin + Contributor Pages
**Branch:** `feat/phase2-admin-contributor`
**Status:** ⏳ Pending Phase 1

### Checklist

#### Admin Routes + Pages
- [ ] `/admin` layout route with role guard (redirect non-admins to `/`)
- [ ] `/admin/submissions` — list with status filter tabs (draft/pending/published/rejected)
- [ ] `/admin/submissions/$id` — detail + approve/reject actions
- [ ] `/admin/quiz-bank` — browse all published quizzes
- [ ] `/admin/quiz-bank/$slug` — view published quiz detail

#### Contributor Routes + Pages
- [ ] `/contributor` layout route with role guard (redirect non-contributors to `/`)
- [ ] `/contributor/submissions` — my submissions list
- [ ] `/contributor/submissions/new` — create new quiz submission (form UI)
- [ ] `/contributor/submissions/$id/edit` — edit draft submission

#### Question Form (`src/pages/contributor/components/question-form.tsx`)
- [ ] Fields: questionText, 4 options (text + isCorrect radio), explanation, category, level
- [ ] Zod validation on submit

#### Bulk Upload (`src/pages/contributor/components/bulk-upload.tsx`)
- [ ] Accept `.json` (QuizContent format) or `.csv`
- [ ] Client-side parse + Zod validation before submission
- [ ] Inline error display per question

#### API Routes
- [ ] `GET /api/quiz-bank` — list published quizzes
- [ ] `GET /api/admin/submissions` — list all with status filter
- [ ] `GET /api/admin/submissions/$id` — detail
- [ ] `POST /api/admin/submissions/$id/approve` — copy questions→quiz_bank
- [ ] `POST /api/admin/submissions/$id/reject` — set rejected + review_note
- [ ] `POST /api/contributor/submissions` — create draft/pending
- [ ] `PUT /api/contributor/submissions/$id` — update draft
- [ ] `GET /api/contributor/submissions` — list own
- [ ] `POST /api/contributor/submissions/$id/submit` — draft→pending_review

#### Navigation
- [ ] Add `/admin`, `/contributor`, `/games` to `TOPBAR_PREFIXES` in `__root.tsx`
- [ ] Conditionally show admin/contributor nav items based on `users.role`
- [ ] Update `dashboard-nav-items.ts`

### Verification
- [ ] `npm run build` passes
- [ ] Admin can list, approve, and reject submissions
- [ ] Contributor can create, edit, and submit quizzes for review
- [ ] Bulk JSON upload validates and creates submission
- [ ] Approved submission questions appear in `quiz_bank`

---

## Phase 3: Remove Static Quiz Files
**Branch:** `feat/phase3-remove-static-quizzes`
**Status:** ⏳ Pending Phase 2

### Checklist
- [ ] All 17 quizzes verified loading from DB
- [ ] Remove `QUIZ_LOADERS` map from `use-quiz.ts`
- [ ] Delete `src/content/quizzes/` directory (all 17 `.ts` files)
- [ ] Remove any remaining static quiz import references
- [ ] `npm run build` passes

### Verification
- [ ] No references to `src/content/quizzes/` remain in codebase
- [ ] All existing quiz routes still work end-to-end

---

## Phase 4: Mini-Games
**Branch:** `feat/phase4-mini-games`
**Status:** ⏳ Pending Phase 3

### Checklist

#### Game Store (`src/stores/game-store.ts`)
- [ ] Mirrors `quiz-store.ts` pattern: init → play → submit → reset
- [ ] Tracks: gameType, level, items, score, maxScore, startTime, isComplete, isSubmitting

#### Routes
- [ ] `/games/$level` — game selection hub
- [ ] `/games/$level/flashcard-match` — flashcard matching game
- [ ] `/games/$level/word-sort` — drag-and-drop word sorting

#### Flashcard Match (`src/pages/games/flashcard-match-page.tsx`)
- [ ] Grid of face-down cards (JP↔ID pairs)
- [ ] Framer Motion `rotateY` flip animation
- [ ] 6-8 pairs per round (3-column grid for 375px)
- [ ] Score = matched pairs, time tracked
- [ ] Results screen with XP award

#### Word Sort (`src/pages/games/word-sort-page.tsx`)
- [ ] Scrambled words dragged into category drop zones
- [ ] Framer Motion `drag` + `Reorder` (no new deps)
- [ ] Score = correctly sorted words, time tracked
- [ ] Results screen with XP award

#### Components
- [ ] `game-timer.tsx` — shared countdown/elapsed timer
- [ ] `game-score-display.tsx` — shared results/score screen
- [ ] `flashcard.tsx` — single flippable card
- [ ] `sortable-word.tsx` — draggable word chip
- [ ] `drop-zone.tsx` — drop target zone

#### API Routes
- [ ] `POST /api/games/submit` — save game result + award XP
- [ ] `GET /api/games/$level/history` — user's game history for a level

### Verification
- [ ] Navigate to `/games/n5` → see game selection
- [ ] Complete flashcard match → score saved → XP awarded
- [ ] Complete word sort → score saved → XP awarded
- [ ] Game history visible
- [ ] `npm run build` passes

---

## Notes
- All UI uses Untitled UI components only (no custom visual components)
- Kebab-case filenames throughout
- Semantic color tokens only (`text-primary`, `bg-brand-solid`, etc.)
- Mobile-first, 375px primary viewport
- Indonesian language primary
