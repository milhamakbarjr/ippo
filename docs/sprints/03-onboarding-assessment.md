# Sprint 03 — Onboarding Level Assessment

**Phase:** P0 — Launch
**Depends on:** None for core feature. Sprint 01 (users table) needed only for the optional authenticated submit path.
**Estimated effort:** 4-6 days
**Routes introduced:** `/assessment`, `/assessment/result`
**API endpoints introduced:** `POST /api/assessment/submit` (authenticated only, optional)
**Content file:** `/src/content/onboarding-assessment.ts`
**Store:** `/src/stores/assessment-store.ts`

---

## 1. Overview

This sprint delivers the 5-7 question placement assessment that determines a new user's starting JLPT level. No signup is required at any point — the entire flow runs client-side, with results stored in `localStorage`. The assessment takes approximately 5 minutes to complete.

On completion, the user sees their assessed level ("Kamu level Kana! 🎉"), a recommended learning path card, and a CTA to navigate directly to that level's learning path. The result persists in `localStorage` so returning guests retain their placement.

If the user is authenticated at the time of submission, results are also written to Neon Postgres via `POST /api/assessment/submit`.

**Key outcomes of this sprint:**
- Any user can discover their JLPT level in < 5 minutes, no account required
- Assessment result drives the "Kamu di sini" indicator in the learning path (Sprint 04)
- Mid-assessment exit is recoverable — draft saved to localStorage, resume offered on return
- Budi gets a clear N2 timeline; Siti gets encouragement at any level; Yuki lands at N3 in 4 minutes

---

## 2. Dependencies

| Dependency | Why Required | Status |
|---|---|---|
| `/src/content/onboarding-assessment.ts` | Source of truth for all 5-7 questions | Must be created in this sprint |
| Zustand | Assessment state management | Already in stack |
| Framer Motion | Question transition + result animations | Already in stack |
| Sprint 01 — DB schema | Only needed for authenticated submit path | Optional for core feature |

**No environment variables required** for the core (unauthenticated) path. The authenticated submit path uses the same `DATABASE_URL` from Sprint 01.

---

## 3. Relevant Personas

### Budi — The Motivated Visa Applicant
- Wants the assessment done in < 10 minutes with a clear, actionable result
- Expects a concrete time estimate to N2 (e.g., "6-8 bulan") — not vague encouragement
- Will be frustrated if forced to create an account before seeing results
- **Key requirement:** Result page must show estimated time to N2 and a direct CTA to the learning path

### Siti — The Cautious Self-Learner
- Afraid of choosing "wrong" answers — needs reassurance that there is no wrong outcome
- Expects Indonesian copy throughout; no English-only states
- The encouragement message on low scores ("Jangan khawatir! Kamu pasti bisa!") is load-bearing for retention
- **Key requirement:** Score 0/5 result must be warm, encouraging, and immediately actionable

### Yuki — The Returning N3 Learner
- Will likely ace Q1-Q4 (Kana, N5, N4) and only stumble at N2 questions
- Wants to be placed at N3 or N2 quickly — should not have to wade through beginner prompts
- **Key requirement:** `calculateLevel()` must correctly map 5 correct answers → N3, not force a lower placement

---

## 4. User Flows

### 4a. Happy Path (First-Time Assessment)

```
[Trigger] User clicks "Mulai Belajar" on landing page
  ↓
Navigate to /assessment

[Assessment Intro — /assessment]
  Display:
    - Heading: "Penilaian Level Kamu"
    - Subtitle: "Cepat, gratis, tanpa perlu daftar (5 menit)"
    - Instruction: "Pilih jawaban yang paling tepat"
    - CTA: "Mulai Penilaian" button
    - Skip: "Jelajahi semua level" → /learning

  User clicks "Mulai Penilaian"
    ↓
  Zustand: reset store, set startTime = Date.now()
  localStorage.setItem('assessment_started', Date.now())
  Show Question 1

[Per-Question Loop — Questions 1 through 5 (or 7)]
  Display:
    - Progress bar: fills to (currentQuestion / totalQuestions)
    - Progress text: "2 dari 5" below bar
    - Question card: question text + 4 radio options
    - Next button: "Lanjut" (disabled until option selected)
    - On final question: button changes to "Lihat Hasil"

  User selects an option
    ↓
  Zustand: setAnswer(questionId, selectedOptionId)
  sessionStorage['assessment_answers'] = JSON.stringify(store.answers)
  Option shows selected state (radio filled, text bold, scale 1.02)
  "Lanjut" button becomes enabled

  User clicks "Lanjut" (or "Lihat Hasil" on last question)
    ↓
  If not last question:
    Zustand: advance() — currentQuestion + 1
    Animate: fade out current card (opacity 0, y -20), fade in next (opacity 0 → 1, y 20 → 0)
    Duration: 300ms

  If last question:
    calculateLevel(answers, questions) → AssessmentResult
    localStorage['assessment_result'] = JSON.stringify(result)
    localStorage['assessment_level'] = result.assessedLevel
    If authenticated: POST /api/assessment/submit (fire and forget, don't block navigation)
    Navigate to /assessment/result

[Result Page — /assessment/result]
  Display:
    - Large heading: "Kamu level {LEVEL}! 🎉"
    - Score: "3 dari 5 pertanyaan benar"
    - Recommended path card:
        - "Estimasi waktu ke N2: 6-8 bulan"
        - "Step berikutnya: Hiragana Gojuuon"
        - CTA button: "Lihat Jalur Belajarmu"
    - Skip link: "Jelajahi semua level"
    - Retry link: "Coba lagi penilaian?" (secondary link)

  Animate: result card entry (opacity 0, scale 0.95 → opacity 1, scale 1, 400ms easeOut)

  User clicks "Lihat Jalur Belajarmu"
    ↓
  sessionStorage['user_level'] = result.assessedLevel
  Navigate to /learning/[assessedLevel]
```

### 4b. Mid-Assessment Exit + Resume

```
[Scenario] User is on question 3 of 5 and closes the browser tab or navigates away

On beforeunload event:
  ↓
Client:
  localStorage['assessment_answers_draft'] = JSON.stringify({
    answers: store.answers,
    currentQuestion: store.currentQuestion,
    startedAt: store.startTime,
    savedAt: Date.now(),
  })

---

[On next visit to /assessment]
  ↓
Check: localStorage['assessment_answers_draft'] exists?
  ├─ NO  → Show intro screen normally
  └─ YES →
      Show resume modal/banner:
        - Heading: "Lanjutkan penilaian?"
        - Sub: "Kamu sudah menjawab {n} dari 5 pertanyaan."
        - CTA 1: "Lanjutkan" (primary)
        - CTA 2: "Mulai Baru" (secondary, link-color)

  User clicks "Lanjutkan":
    ↓
    Restore Zustand store from draft
    sessionStorage['assessment_answers'] = draft.answers
    Show next unanswered question (currentQuestion from draft)
    Clear draft: localStorage.removeItem('assessment_answers_draft')

  User clicks "Mulai Baru":
    ↓
    localStorage.removeItem('assessment_answers_draft')
    sessionStorage.removeItem('assessment_answers')
    Zustand: reset()
    Show question 1
```

### 4c. Skip Assessment

```
[Trigger] User clicks "Jelajahi semua level" (from intro or result page)
  ↓
Navigate to /learning
  ↓
All levels shown without "Kamu di sini" indicator
(indicator only appears if sessionStorage['user_level'] is set)
Banner shown on /learning: "💡 Belum ambil Assessment? Ambil sekarang" → /assessment
```

---

## 5. Functional Requirements

### Type Definitions

```typescript
// /src/types/assessment.ts

type AssessmentQuestion = {
  id: string;
  level: 'kana' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  questionText: string;
  questionTextEn?: string;
  category: 'kana' | 'vocab' | 'grammar' | 'kanji';
  options: Array<{
    id: string;
    text: string;
    textEn?: string;
    isCorrect: boolean;
  }>;
  explanation?: string;
  explanationEn?: string;
};

type AssessmentResponse = {
  questionId: string;
  selectedOptionId: string;
  answeredAt: number; // Date.now()
};

type AssessmentResult = {
  assessedLevel: 'kana' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  score: number;
  totalQuestions: number;
  categoryBreakdown: {
    kana: number;
    vocab: number;
    grammar: number;
    kanji: number;
  };
  completedAt: number; // Date.now()
};

// Used for authenticated submit only
type AssessmentResultPayload = {
  user_id: string;
  assessed_level: string;
  score: number;
  total_questions: number;
  category_breakdown: Record<string, number>;
  completed_at: Date;
  transferred_from_local: boolean;
};
```

### Question Selection Logic

The content file `/src/content/onboarding-assessment.ts` must export a `questions` array of `AssessmentQuestion[]` ordered as follows:

| # | Category | Level | What it tests |
|---|---|---|---|
| Q1 | `kana` | `kana` | Hiragana recognition (e.g., "Which is ひ?") |
| Q2 | `kana` | `kana` | Katakana recognition (e.g., "Which is カ?") |
| Q3 | `vocab` | `n5` | N5 vocabulary (e.g., common word meaning) |
| Q4 | `grammar` | `n4` | N4 grammar pattern |
| Q5 | `kanji` | `n3` | N3 kanji reading or meaning |
| Q6 | `grammar` | `n2` | N2 grammar (optional, shown to all) |
| Q7 | `kanji` | `n2` | N2+ kanji (optional) |

P0 ships with 5 questions (Q1-Q5). Q6-Q7 are optional and can be appended later without changing the scoring algorithm (the level map handles up to 7 correct answers).

### Scoring Algorithm

```typescript
// /src/utils/calculate-level.ts

function calculateLevel(
  responses: AssessmentResponse[],
  questions: AssessmentQuestion[]
): AssessmentResult {
  let correctCount = 0;
  const categoryScores: AssessmentResult['categoryBreakdown'] = {
    kana: 0,
    vocab: 0,
    grammar: 0,
    kanji: 0,
  };

  responses.forEach((response) => {
    const question = questions.find((q) => q.id === response.questionId);
    if (!question) return; // Skip missing questions silently

    const selectedOption = question.options.find(
      (o) => o.id === response.selectedOptionId
    );
    if (!selectedOption) return; // Skip invalid option silently

    if (selectedOption.isCorrect) {
      correctCount++;
      categoryScores[question.category]++;
    }
  });

  const levelMap: Record<number, AssessmentResult['assessedLevel']> = {
    0: 'kana',
    1: 'kana',
    2: 'kana',
    3: 'n5',
    4: 'n4',
    5: 'n3',
    6: 'n2',
    7: 'n1',
  };

  return {
    assessedLevel: levelMap[Math.min(correctCount, 7)],
    score: correctCount,
    totalQuestions: responses.length,
    categoryBreakdown: categoryScores,
    completedAt: Date.now(),
  };
}
```

### Storage Strategy

| Data | Key | Storage | Lifecycle |
|---|---|---|---|
| Assessment started timestamp | `assessment_started` | localStorage | Persists across sessions |
| Current session answers | `assessment_answers` | sessionStorage | Lost on tab close |
| Mid-assessment exit draft | `assessment_answers_draft` | localStorage | Cleared on resume or start-over |
| Final result | `assessment_result` | localStorage | Persists; migrated to DB on registration |
| Assessed level (quick read) | `assessment_level` | localStorage | Persists; redundant with result |

### Processing Flow

```
App boot
  ↓
Preload: import('/src/content/onboarding-assessment.ts') — no await, fire and forget
  ↓
User navigates to /assessment
  ↓
React.lazy loads assessment page component (separate chunk)
  ↓
Check localStorage['assessment_answers_draft']
  ├─ Found → Show resume prompt
  └─ Not found → Show intro screen
  ↓
User starts assessment
  ↓
Per-answer: sessionStorage['assessment_answers'] updated
  ↓
On final answer: calculateLevel() runs client-side (no network)
  ↓
localStorage['assessment_result'] + ['assessment_level'] written
  ↓
If authenticated: POST /api/assessment/submit (non-blocking)
  ↓
Navigate to /assessment/result
```

---

## 6. API Contracts

This endpoint is optional in P0 — only called when the user is authenticated at the time of submission. The core assessment flow must work without it.

### POST /api/assessment/submit

**Request:**
```typescript
{
  user_id: string;
  assessed_level: 'kana' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  score: number;
  total_questions: number;
  category_breakdown: {
    kana: number;
    vocab: number;
    grammar: number;
    kanji: number;
  };
  completed_at: string; // ISO 8601
  transferred_from_local: boolean; // always false here; true only during auth migration
}
```

**Response (200 OK):**
```typescript
{
  success: true;
  assessedLevel: string;
}
```

**Error responses:**

| HTTP Status | Condition |
|---|---|
| 401 | Request made without valid session |
| 400 | Missing required fields or invalid level value |
| 500 | DB insert failed |

**Behavior on failure:** Log the error to console; do not surface to user. The result is already saved in localStorage — this endpoint is supplementary.

---

## 7. State Management

### Zustand Assessment Store

Location: `/src/stores/assessment-store.ts`

```typescript
import { create } from 'zustand';
import type { AssessmentResponse, AssessmentResult } from '../types/assessment';

type AssessmentStore = {
  currentQuestion: number;
  answers: Record<string, string>; // questionId → selectedOptionId
  startTime: number | null;
  assessedLevel: AssessmentResult['assessedLevel'] | null;

  setAnswer: (questionId: string, optionId: string) => void;
  advance: () => void;
  submit: (questions: AssessmentQuestion[]) => Promise<AssessmentResult>;
  reset: () => void;
};

const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  startTime: null,
  assessedLevel: null,

  setAnswer: (questionId, optionId) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId },
    })),

  advance: () =>
    set((state) => ({ currentQuestion: state.currentQuestion + 1 })),

  submit: async (questions) => {
    const { answers } = get();

    const responses: AssessmentResponse[] = Object.entries(answers).map(
      ([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
        answeredAt: Date.now(),
      })
    );

    const result = calculateLevel(responses, questions);

    // Persist result
    localStorage.setItem('assessment_result', JSON.stringify(result));
    localStorage.setItem('assessment_level', result.assessedLevel);

    set({ assessedLevel: result.assessedLevel });

    return result;
  },

  reset: () =>
    set({ currentQuestion: 0, answers: {}, assessedLevel: null, startTime: null }),
}));
```

### localStorage Keys Reference

| Key | Type | Written | Read |
|---|---|---|---|
| `assessment_result` | `AssessmentResult` (JSON) | On submit | Sprint 04 (learning path "Kamu di sini") |
| `assessment_level` | string | On submit | Sprint 04, Sprint 02 (migration) |
| `assessment_started` | number (timestamp) | On first question | Analytics only |
| `assessment_answers_draft` | object (JSON) | On `beforeunload` | On return to /assessment |

### sessionStorage Keys Reference

| Key | Type | Written | Read |
|---|---|---|---|
| `assessment_answers` | object (JSON) | Per-answer during session | Resume flow |
| `user_level` | string | On CTA click from result page | Sprint 04 learning path |

---

## 8. UI/UX Specifications

### Component Mapping

| UI Element | Untitled UI Component | Notes |
|---|---|---|
| Question card container | `Card` + `CardHeader` + `CardContent` | bg-primary, border-secondary, 24px padding |
| Answer options | `RadioGroup` + `Radio` items | 56px min height touch target |
| Progress bar | `ProgressBar` | fg-brand-primary fill, 4px height |
| "Lanjut" / "Lihat Hasil" button | `Button` size="lg" color="primary" | Full-width on mobile, disabled until selection |
| Result level heading | Typography — h1 | text-primary + text-brand-primary accent |
| Level result card | `FeaturedIcon` + card layout | color="success" theme="light" |
| Path CTA | `Button` size="lg" color="primary" | "Lihat Jalur Belajarmu", full-width mobile |
| Skip link | `Button` color="link-color" | "Jelajahi semua level" |
| Retry link | `Button` color="link-color" | "Coba lagi penilaian?" |
| Resume modal | `Card` or inline banner | Shows on /assessment when draft exists |
| Resume CTA | `Button` color="primary" + `Button` color="link-color" | "Lanjutkan" + "Mulai Baru" |

### Visual Hierarchy — Question Card

```
┌─ Question Card ──────────────────────────────┐
│                                              │
│  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░  ← ProgressBar (4px) │
│  2 dari 5                  ← 12px/500/text-tertiary
│                                              │
│  Pertanyaan 2                                │ ← 18px/600/text-primary
│  "Manakah karakter Katakana                  │   line-height: 1.5
│   untuk 'ka'?"                               │   margin-bottom: 24px
│                                              │
│  ┌─ Option ───────────────────────────────┐  │ ← 56px height
│  │  ○  か                                 │  │   16px/400/text-primary
│  └────────────────────────────────────────┘  │   unselected: fg-quaternary radio
│  ┌─ Option (selected) ───────────────────┐   │   12px gap between options
│  │  ●  カ                                 │  │ ← radio: text-brand-secondary
│  └────────────────────────────────────────┘  │   text: bold, scale 1.02
│  ┌─ Option ───────────────────────────────┐  │
│  │  ○  ガ                                 │  │
│  └────────────────────────────────────────┘  │
│  ┌─ Option ───────────────────────────────┐  │
│  │  ○  ケ                                 │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌─ Button ───────────────────────────────┐  │
│  │           Lanjut →                    │  │ ← primary, full-width, 48px
│  └────────────────────────────────────────┘  │   disabled until selection
│                                              │
└──────────────────────────────────────────────┘
```

**Card spec:**
- Background: `bg-primary`
- Border: 1px solid `border-secondary`
- Border radius: inherit from Untitled UI Card
- Padding: 24px
- Shadow: `0 2px 4px rgba(0, 0, 0, 0.05)`

**Option spec:**
- Height: 56px minimum
- Hover: `bg-primary_hover`
- Focus: 2px solid `border-brand` outline, 2px offset
- Selected: radio `fg-brand-primary`, text `font-weight: 700`

**Progress bar spec:**
- Height: 4px
- Fill color: `fg-brand-primary`
- Label below: "2 dari 5" — 12px, weight 500, `text-tertiary`

### Assessment Intro Screen

```
┌─ Page ─────────────────────────────────────┐
│                                            │
│  Penilaian Level Kamu                      │ ← h1, text-primary, 28px/700
│                                            │
│  Cepat, gratis, tanpa perlu daftar         │ ← text-tertiary, 16px
│  (5 menit)                                 │
│                                            │
│  Pilih jawaban yang paling tepat           │ ← text-secondary, 14px
│                                            │
│  ┌─ Button ─────────────────────────────┐  │
│  │  Mulai Penilaian                    │  │ ← primary, full-width, 48px
│  └──────────────────────────────────────┘  │
│                                            │
│  Jelajahi semua level                      │ ← link-color button
│                                            │
└────────────────────────────────────────────┘
```

### Result Page

```
┌─ Page ─────────────────────────────────────┐
│                                            │
│  Kamu level Kana! 🎉                       │ ← h1, text-primary, 28px/700
│  3 dari 5 pertanyaan benar                 │ ← text-tertiary, 16px
│                                            │
│ ┌─ Path Card ──────────────────────────┐   │
│ │  ✨  Jalur Belajarmu                 │   │ ← FeaturedIcon color="success"
│ │                                     │   │
│ │  Estimasi waktu ke N2: 6-8 bulan    │   │ ← text-secondary, 14px
│ │  Step berikutnya: Hiragana Gojuuon  │   │ ← text-primary, 16px/600
│ │                                     │   │
│ │  ┌─ Button ──────────────────────┐  │   │
│ │  │  Lihat Jalur Belajarmu       │  │   │ ← primary, full-width
│ │  └──────────────────────────────┘  │   │
│ └─────────────────────────────────────┘   │
│                                            │
│  Jelajahi semua level                      │ ← link-color
│  Coba lagi penilaian?                      │ ← link-color, smaller
│                                            │
└────────────────────────────────────────────┘
```

---

## 9. All Microcopy

All primary copy is Indonesian. English equivalents are for developer reference only.

### Intro Screen

| Key | Indonesian (rendered) | English (reference) |
|---|---|---|
| page_heading | Penilaian Level Kamu | Your Level Assessment |
| page_subtitle | Cepat, gratis, tanpa perlu daftar (5 menit) | Fast, free, no signup needed (5 min) |
| instruction | Pilih jawaban yang paling tepat | Choose the most correct answer |
| start_button | Mulai Penilaian | Start Assessment |
| skip_link | Jelajahi semua level | Explore all levels |

### During Assessment

| Key | Indonesian (rendered) | English (reference) |
|---|---|---|
| progress_label | {n} dari {total} | {n} of {total} |
| next_button | Lanjut | Next |
| submit_button | Lihat Hasil | View Results |

### Result Page

| Key | Indonesian (rendered) | English (reference) |
|---|---|---|
| result_heading | Kamu level {LEVEL}! 🎉 | You're {LEVEL} level! 🎉 |
| score_label | {n} dari {total} pertanyaan benar | {n} of {total} correct |
| estimate_label | Estimasi waktu ke N2: {time} | Estimated time to N2: {time} |
| next_step_label | Step berikutnya: {step} | Next step: {step} |
| path_cta | Lihat Jalur Belajarmu | View Your Learning Path |
| skip_link | Jelajahi semua level | Explore all levels |
| retry_link | Coba lagi penilaian? | Try assessment again? |

### Score-Specific Messages (shown below score on result page)

| Score | Indonesian message |
|---|---|
| 0/5 — all wrong | Jangan khawatir! Mulai dari Kana step-by-step. Kamu pasti bisa! |
| 5/5 — all correct | Selamat! Kamu sudah siap N3. Lanjut ke N2? |
| All others | *(no special message; standard result card)* |

### Resume Flow

| Key | Indonesian (rendered) | English (reference) |
|---|---|---|
| resume_heading | Lanjutkan penilaian? | Resume assessment? |
| resume_sub | Kamu sudah menjawab {n} dari 5 pertanyaan. | You've answered {n} of 5 questions. |
| resume_cta | Lanjutkan | Continue |
| start_over_cta | Mulai Baru | Start Over |

### Error States

| Scenario | Indonesian message |
|---|---|
| localStorage full (QuotaExceededError) | Penyimpanan lokal penuh. Hapus browser cache atau gunakan private mode. |
| localStorage full — CTA | Daftar sekarang untuk sinkronisasi cloud |
| content file missing | Konten assessment sedang dimuat. Coba beberapa saat lagi. |
| content file missing — CTA | Coba Lagi |

---

## 10. Animations

All animations use Framer Motion. Exact values below are required — do not approximate.

### Question Entry (every question transition)

```typescript
<motion.div
  key={currentQuestion} // key change triggers re-animation
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Question card content */}
</motion.div>
```

### Option Selection Feedback

```typescript
<motion.div
  animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
  transition={{ duration: 0.2 }}
>
  {/* Radio option */}
</motion.div>
```

### Tap Ripple on Options (mobile touch)

```typescript
// Framer Motion tap animation on each option wrapper
whileTap={{ scale: 0.98 }}
transition={{ duration: 0.2 }}
```

### Result Page Entry

```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  {/* Result card */}
</motion.div>
```

---

## 11. Responsive & Mobile Behavior

| Property | Mobile (< 640px) | Desktop (≥ 640px) |
|---|---|---|
| Card width | Full-width, 16px horizontal padding | max-w-lg, centered |
| Option height | 56px minimum | 56px minimum |
| Button height | 48px minimum | 48px minimum |
| Buttons | Full-width | Full-width within card |
| Layout | Single column | Single column (assessment is always narrow) |
| Hover states | Disabled via `@media (hover: none)` | Enabled |
| Progress bar label | Shown below bar | Shown below bar |

**Portrait-first:** The question card is designed for portrait orientation. In landscape on small phones (e.g., iPhone SE landscape = 568px wide), the card remains single-column. No layout shift is expected.

**Touch targets:** 56px minimum for all answer options; 48px for navigation buttons. This matches WCAG 2.5.5 (AAA target size).

---

## 12. Keyboard Accessibility

- Each question is wrapped in `<fieldset>` with `<legend>` containing the question text
- `RadioGroup` from Untitled UI handles keyboard navigation within options (arrow keys move between options)
- `Space` or `Enter` selects a focused option
- `Tab` moves from the `RadioGroup` to the "Lanjut" button
- `Enter` on the "Lanjut" button advances to the next question
- `Escape` on the assessment page exits to `/` (home) — or closes a resume modal if open
- Focus indicator: 2px solid `border-brand` outline, 2px offset — applied via Untitled UI's default focus ring
- On question transition, focus must move to the first option of the new question (use `autoFocus` on first Radio or imperatively call `.focus()` after animation completes)
- The result page CTA button receives focus on page mount (`autoFocus`)

---

## 13. Edge Cases & Error Handling

### Scenario 1: User Closes Assessment Midway

- **Trigger:** `beforeunload` event fires while `currentQuestion > 0` and assessment not submitted
- **System:** Write to `localStorage['assessment_answers_draft']`; do not interrupt the unload
- **On return to /assessment:** Show resume prompt (see Flow 4b)
- **Note:** `beforeunload` is not 100% reliable on iOS Safari — also write draft on every `setAnswer()` call to be safe

### Scenario 2: Resume — CTA Logic

| State | "Lanjutkan" behavior | "Mulai Baru" behavior |
|---|---|---|
| Draft found | Restore store, show question `draft.currentQuestion` | `localStorage.removeItem('assessment_answers_draft')`, `store.reset()`, show Q1 |

### Scenario 3: All Correct (5/5 or 7/7)

- `calculateLevel` returns `'n3'` (5 correct) or `'n1'` (7 correct)
- Result page heading: "Kamu level N3! 🎉"
- Score message: "Selamat! Kamu sudah siap N3. Lanjut ke N2?"
- Path card CTA navigates to `/learning/n3` with option to view N2 preview

### Scenario 4: All Wrong (0/5)

- `calculateLevel` returns `'kana'`
- Result page heading: "Kamu level Kana! 🎉"
- Score message: "Jangan khawatir! Mulai dari Kana step-by-step. Kamu pasti bisa!"
- Path card CTA navigates to `/learning/kana`
- Show retry link: "Coba lagi penilaian?" (link-color button below path card)

### Scenario 5: localStorage Full (QuotaExceededError)

```typescript
try {
  localStorage.setItem('assessment_result', JSON.stringify(result));
} catch (e) {
  if (e instanceof DOMException && e.name === 'QuotaExceededError') {
    // Fallback: sessionStorage only (lost on tab close)
    sessionStorage.setItem('assessment_result', JSON.stringify(result));

    // Show inline error on result page
    showStorageFullError(); // renders error state below result card
  }
}
```

Error UI on result page:
- `Badge` color="warning": "Penyimpanan lokal penuh. Hapus browser cache atau gunakan private mode."
- `Button` color="secondary": "Daftar sekarang untuk sinkronisasi cloud" → `/auth/register`

### Scenario 6: content file missing or question data invalid

```typescript
// In the assessment page component
import { questions } from '../content/onboarding-assessment';

// Guard: if questions is empty or undefined
if (!questions || questions.length === 0) {
  // Render error state instead of assessment
  return <AssessmentLoadError />;
}

// Per-question guard in calculateLevel (already in algorithm)
// Invalid/missing questions are skipped silently with a console.error()
```

Error state for missing content:
- Heading: "Konten assessment sedang dimuat. Coba beberapa saat lagi."
- Button: "Coba Lagi" — calls `window.location.reload()`

---

## 14. Performance

| Target | Requirement | Implementation |
|---|---|---|
| Landing → first question visible | < 1.5 seconds | `React.lazy` for assessment page; preload `onboarding-assessment.ts` at app boot |
| Tap → next question visible | < 200ms | Zustand update is synchronous; animation is 300ms (perceived, not blocking) |
| Submit → result page | < 100ms | `calculateLevel` is synchronous CPU work; no network required |
| Authenticated submit | Non-blocking | Fire-and-forget fetch; does not delay navigation |
| Code chunk size | Separate `assessment.{hash}.js` | Configured via Vite dynamic import on the `/assessment` route |

### Preloading Strategy

```typescript
// In app entry point (e.g., main.tsx or router-provider.tsx)
// Preload the content file so it's available before user clicks "Mulai Belajar"
import('./content/onboarding-assessment'); // no await — fire and forget
```

### React.lazy + Suspense for Assessment Pages

```typescript
// In router configuration
const AssessmentPage = React.lazy(() => import('./pages/assessment'));
const AssessmentResultPage = React.lazy(() => import('./pages/assessment-result'));

// Wrap with Suspense — fallback is a skeleton or spinner
<Suspense fallback={<AssessmentSkeleton />}>
  <AssessmentPage />
</Suspense>
```

### TanStack Query (future, if questions move to API)

```typescript
// Not used in P0 — questions are static imports
// Reserve these config values for when questions move to API:
const { data: questions } = useQuery({
  queryKey: ['assessment', 'questions'],
  queryFn: () => fetch('/api/assessment/questions').then((r) => r.json()),
  staleTime: 1000 * 60 * 60,       // 1 hour
  gcTime: 1000 * 60 * 60 * 24,     // 24 hours
});
```

---

## 15. Testing Checklist

Before this sprint is considered done, all of the following must be manually verified or covered by unit tests:

### Unit Tests — `calculateLevel()`

- [ ] 0 correct → `assessedLevel: 'kana'`
- [ ] 1 correct → `assessedLevel: 'kana'`
- [ ] 2 correct → `assessedLevel: 'kana'`
- [ ] 3 correct → `assessedLevel: 'n5'`
- [ ] 4 correct → `assessedLevel: 'n4'`
- [ ] 5 correct → `assessedLevel: 'n3'`
- [ ] 6 correct → `assessedLevel: 'n2'`
- [ ] 7 correct → `assessedLevel: 'n1'`
- [ ] `categoryBreakdown` totals match correct answers per category
- [ ] Missing question ID in responses → skipped silently, no throw
- [ ] Missing option ID in responses → skipped silently, no throw

### Manual / Integration Tests

- [ ] **Happy path (5/5):** Complete all 5 questions → result shows N3 → "Selamat!" message → navigate to `/learning/n3`
- [ ] **Happy path (0/5):** Answer all wrong → result shows Kana → encouragement message → retry link visible
- [ ] **Mid-assessment exit + resume:** Answer Q1-Q3, close tab, reopen `/assessment`, resume modal shown, "Lanjutkan" restores Q4
- [ ] **Start over:** Resume modal shown, click "Mulai Baru" → draft cleared → Q1 shown fresh
- [ ] **All answers persisted:** After completing assessment, refresh `/assessment/result` → result still shown (from localStorage)
- [ ] **localStorage full:** Mock `QuotaExceededError` → fallback to sessionStorage → warning shown → "Daftar sekarang" CTA visible
- [ ] **Progress bar:** Updates correctly after each question (2/5, 3/5, etc.)
- [ ] **Button disabled state:** "Lanjut" is disabled before any option selected, enabled after
- [ ] **Question animations:** Fade/slide animation plays on every question transition (not just first)
- [ ] **Result animation:** Scale + opacity animation plays on result page load
- [ ] **Skip assessment:** "Jelajahi semua level" from intro → `/learning`, no `user_level` in sessionStorage
- [ ] **CTA from result:** "Lihat Jalur Belajarmu" → `sessionStorage['user_level']` set → navigate to correct level path
- [ ] **Authenticated submit:** Log in, complete assessment, verify `POST /api/assessment/submit` fires and returns 200
- [ ] **Authenticated submit failure:** Mock 500 from API → no user-facing error, navigation proceeds normally
- [ ] **Content missing:** Remove/empty `onboarding-assessment.ts` → error state renders with "Coba Lagi" button
