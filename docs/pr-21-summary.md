# PR #21 — Duolingo-style Learning Path, Unit Pages & Assessment Card

## What Was Built

### 1. Learning Path UI (`src/components/application/learning-path/`)

A Duolingo-style vertical learning path for the Kana level. Components added:

| File | Purpose |
|---|---|
| `learning-path.tsx` | Root component — iterates sections, renders SectionHeader + PathNodes + SectionQuizCard |
| `section-header.tsx` | Sticky colored header per section showing section number, unit title, PANDUAN button |
| `path-node.tsx` | Individual unit node — status-aware (locked/available/completed), pulse animation on active |
| `path-connector.tsx` | SVG curved line connecting nodes |
| `path-mascot.tsx` | Mascot illustration between sections |
| `section-divider.tsx` | Visual divider between sections |
| `section-quiz-card.tsx` | Quiz card at the end of each section |
| `you-are-here-card.tsx` | "You are here" indicator card |
| `level-complete-card.tsx` | Shown when all steps in a level are done; links to next level |
| `step-resource-link.tsx` | Clickable resource row (icon + wrapping title + external link) |

**Key behaviors:**
- Each section has a distinct color theme via `SECTION_THEME` map
- `PathNode` status is derived from step completion: `completed` → green check, `available` → pulse animation + MULAI badge, `locked` → gray + lock icon
- Navigates to `/learning/$level/unit/$sectionSlug/$unitSlug` on tap

---

### 2. New Pages

#### Unit Learning Page (`src/pages/unit-learning-page.tsx`)
Route: `/learning/$level/unit/$sectionSlug/$unitSlug`

- Shows `CharacterGrid` (from existing Letters feature) for the unit's characters
- Pronunciation cards, mnemonics, practice prompts, YouTube embeds
- Completion checkbox — calls `useCompleteStep` mutation for auth users, `markStepComplete` (localStorage) for guests
- Completion state sourced from `useLevelProgress` hook (fixes stale-cache bug)
- Next unit navigation after completion

#### Guidebook Page (`src/pages/guidebook-page.tsx`)
Route: `/learning/$level/guidebook/$sectionSlug/$unitSlug`

- Shows section-level PANDUAN: objectives, strategies, common mistakes
- Common mistakes rendered with Untitled UI `AlertFloating` (warning style)

---

### 3. Content Architecture (`src/content/kana/`)

Two content layers were separated:

| File | Type | Purpose |
|---|---|---|
| `sections.ts` | `SectionGuide[]` | Per-section: objectives, strategies, commonMistakes |
| `unit-content.ts` | `Record<string, CharacterSection[]>` | Per-unit: maps unit slug → character data for CharacterGrid |
| `quizzes/kana-mastery.ts` | `Quiz` | Section-end quiz for Kana Mastery section |

---

### 4. New Types (`src/types/learning.ts`)

```ts
SectionGuide       // objectives[], strategies[], commonMistakes[]
UnitContent        // pronunciationCards[], mnemonics[], practicePrompts[]
LevelPathConfig    // maps level → sections → units → stepSlugs
```

---

### 5. Dashboard Integration

- `AssessmentResultCard` — reads `assessment_result` from localStorage, shows level + score + JLPT journey indicator in dashboard sidebar
- `LevelStepsBlock` — updated to include the learning path view

---

### 6. Bug Fixes Applied (from code review)

| Issue | Fix |
|---|---|
| `SectionHeader` crash on empty `section.units` | Guard: `{activeUnit && <SectionHeader ... />}` in `learning-path.tsx` |
| Auth users always see `isCompleted = false` on direct nav | Replace `getQueryData` with `useLevelProgress` hook |
| `LEVEL_LABELS` duplicated locally | Import from `@/content/levels`, cast to `JLPTLevelId` |
| `text-fg-white/70` opacity modifier on semantic token | Split to `text-fg-white opacity-70` |

---

## Patterns to Replicate for N5–N1

### Content files needed per level (e.g. `src/content/n5/`)

```
src/content/n5/
├── index.ts          # Level definition (already exists — has steps/units)
├── sections.ts       # NEW: SectionGuide[] for each section
└── unit-content.ts   # NEW: Record<unitSlug, CharacterSection[]> or vocabulary data
src/content/quizzes/
└── n5-*.ts           # NEW: Quiz per section
```

### Data contract

Each level needs a `LevelPathConfig` entry in whatever config feeds `learning-path.tsx` — check `src/content/sections.ts` for the current shape.

### Key differences vs Kana

- N5–N1 units are vocabulary/grammar, not kana characters — `unit-learning-page.tsx` may need a new content renderer branch (vocabulary cards instead of `CharacterGrid`)
- Section themes reuse `SECTION_THEME` (cycles through colors by `sectionNumber`)
- Quiz structure is identical — reuse `kana-mastery.ts` as template

---

## Routes Added

```
/learning/$level/unit/$sectionSlug/$unitSlug     → unit-learning-page.tsx
/learning/$level/guidebook/$sectionSlug/$unitSlug → guidebook-page.tsx
```

Both routes are already registered generically via `$level` — **no new routes needed** for N5–N1.
