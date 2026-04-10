# Sprint 08 — Practice Quizzes

**Phase:** P1 (Month 2 — Target: May 31, 2026)
**Effort:** 5 days design + 8 days dev + 2 days QA = 15 days
**Depends On:** Sprint 01 (DB schema + quiz_results table), Sprint 02 (auth/session), Sprint 05 (progress tracking patterns)
**Status:** Not started

---

## 1. Overview

This sprint delivers JLPT-format multiple-choice practice quizzes for N5–N1 levels. After completing a learning step, the user is offered an optional quiz to validate their understanding before moving on. Quizzes are 5–10 questions, presented one at a time, with immediate feedback after each answer — including an Indonesian-language explanation for why an answer is correct or incorrect. Final scores are saved to the `quiz_results` database table (created in Sprint 01) and displayed on a score results page, where the user can retry or continue to the next step.

**What this sprint delivers:**
- Quiz content files at `/src/content/quizzes/[quiz-slug].ts`
- Quiz session state management via Zustand
- `/quizzes/[level]-[category]` route + page
- Feedback UI after each answer (correct/incorrect + explanation)
- Score results page
- `POST /api/quiz/submit` and `GET /api/quiz/[quiz-slug]/history` API endpoints
- Network failure handling: toast + retry + sessionStorage safety net
- Offline mode: persistent banner + localStorage queue + online sync

---

## 2. Dependencies

| Sprint | What We Rely On |
|---|---|
| Sprint 01 | `quiz_results` table already created in Drizzle schema |
| Sprint 02 | `auth.session` available for `user_id` on submit; unauthenticated quizzes still score locally |
| Sprint 05 | Progress tracking patterns (Zustand store shape, localStorage keys, POST patterns) |

**Note:** Quizzes are accessible without a login. If the user is a guest, the score is shown but not persisted to the database. The same offline/retry patterns from Sprint 05 apply here.

---

## 3. Relevant Personas

### Budi — The Motivated Visa Applicant
Wants concrete proof that he is learning, not just consuming. The post-step quiz gives him a measurable, structured checkpoint. Scores track his progress toward N2 readiness. He will retry a quiz if he scores below 70% because he is goal-driven and wants to know he is ready before moving on.

### Yuki — The Returning N3 Learner
Uses quizzes to pinpoint specific grammar and vocabulary gaps in N3/N2 — she has prior Japanese knowledge but needs to identify exactly which areas are rusty. The per-category quiz slugs (e.g., `n3-grammar`, `n3-vocab`) let her target weak areas without reviewing everything.

---

## 4. User Flows

### 4a. Happy Path — Quiz Flow

```
[Post-Step Completion]
  User marks step complete → "Uji pemahaman kamu dengan kuis!" prompt appears
  Note: This is NOT forced — user can dismiss and proceed
  ├─ User taps "Mulai Kuis"
  └─ Navigate to /quizzes/[level]-[category] (e.g., /quizzes/n5-vocab)

[Quiz Session]
  System:
    ├─ Load questions from /src/content/quizzes/n5-vocab.ts
    ├─ Determine question count (5–10 questions)
    ├─ Show question 1 with 4 options
    └─ sessionStorage.setItem('quiz_session_n5-vocab', { currentQuestion: 0, answers: {} })

  Per question:
    ├─ User selects an option (tap/click)
    ├─ System: immediate feedback
    │   ├─ Correct: green highlight + ✓ icon + Indonesian explanation
    │   └─ Incorrect: red highlight + ✗ icon + correct answer shown in green + explanation
    ├─ "Lanjut" button becomes enabled
    ├─ User taps "Lanjut" → fade out current question, fade in next
    └─ Progress bar updates: "{n} dari {total}"

[Last Question → Score Page]
  User answers final question → feedback shown
  User taps "Lanjut" → score calculation:
    ├─ score = count of correct answers
    ├─ percentage = (score / total) × 100
    ├─ POST /api/quiz/submit (if authenticated)
    │   Body: { user_id, quiz_slug, level, answers: [...] }
    │   Response: { success, score, total_questions, results, quiz_result_id }
    └─ Navigate to score results view (same page, different state)

[Score Results Page]
  Display:
    ├─ Heading: "Hasilmu: {score} dari {total} benar"
    ├─ FeaturedIcon:
    │   ├─ ≥70%: color="success"
    │   ├─ 50–69%: color="warning"
    │   └─ <50%: color="error"
    ├─ ProgressBar showing percentage
    ├─ If <50%: encouragement message (not just error state)
    └─ Two actions:
        ├─ "Coba Lagi" → reset quiz state, re-run from question 1
        └─ "Lanjut ke Step Berikutnya" → navigate to next step

[Guest User]
  Score shown locally; no DB write
  Toast: "Buat akun untuk menyimpan hasilmu!"
```

### 4b. Network Failure During Quiz (Flow 3 from PRD)

```
[Mid-Quiz Network Failure]
  User taps answer to question 3
  └─ POST /api/quiz/answer → 5-second timeout triggers

[Error Handling]
  System:
    ├─ Do NOT submit answer to DB
    ├─ Keep answer selection visible (do not clear UI)
    ├─ Store to sessionStorage: quiz_session_{slug}.answers[q3] = selectedOptionId
    └─ Show error Toast:
        Message: "Koneksi terputus. Cek internet kamu."
        Actions:
          ├─ "Coba Lagi" button → retry POST
          └─ "Simpan & Kembali" button → save session, navigate to /

[User Retries]
  ├─ Taps "Coba Lagi"
  ├─ System: retry POST /api/quiz/answer (same payload)
  │   ├─ Success:
  │   │   ├─ Dismiss error toast
  │   │   ├─ Show success toast: "Tersimpan! ✓"
  │   │   └─ Advance to question 4
  │   └─ Failure again:
  │       ├─ Show: "Masih error. Kembali nanti?"
  │       └─ Show: "Kembali Ke Beranda" button → navigate to /
  └─ Note: sessionStorage holds all answers as safety net throughout

[User Taps "Simpan & Kembali"]
  ├─ sessionStorage['quiz_session_{slug}'] already has partial answers
  └─ On return visit to same quiz URL:
      └─ Detect saved session → offer "Lanjut dari pertanyaan {n}?" or "Mulai dari Awal"
```

### 4c. Offline Mode

```
[User Opens Quiz While Offline]
  navigator.onLine === false detected:
    ├─ Show persistent top banner (aria-live="assertive"):
    │   "📡 Offline Mode — jawaban akan disimpan saat online"
    ├─ Disable all submit buttons (visually and functionally)
    ├─ Allow reading questions (do not block the UI entirely)
    └─ Cache answers as user selects:
        localStorage['offline_quiz_answers'] = {
          quizSlug: 'n5-vocab',
          answers: { q1: 'opt-a', q2: 'opt-c', ... },
          startedAt: ISO_TIMESTAMP
        }

[User Returns Online]
  window 'online' event fires:
    ├─ Remove persistent banner (animate out)
    ├─ Show toast: "Online! Menyinkronkan..."
    ├─ POST /api/quiz/submit with cached answers from localStorage
    │   ├─ Success:
    │   │   ├─ Clear localStorage['offline_quiz_answers']
    │   │   ├─ Show score results
    │   │   └─ Show toast: "Sinkronisasi selesai! ✓"
    │   └─ Failure:
    │       └─ Keep cached; retry on next online event
    └─ Re-enable submit buttons
```

---

## 5. Functional Requirements

### 5.1 Quiz Format

| Property | Value |
|---|---|
| Question type | Multiple choice, 4 options |
| Format | JLPT-style (vocab in context, grammar completion, kanji reading) |
| Questions per quiz | 5–10 (defined per slug in content file) |
| Presentation | One question at a time |
| Feedback | Immediate after each answer (before advancing) |
| Retry | Allowed, from question 1, same questions same order |
| Score display | Score page after final question |

### 5.2 Quiz Slugs

Format: `[level]-[category]`

| Slug | Level | Category |
|---|---|---|
| `n5-vocab` | N5 | Vocabulary |
| `n5-kanji` | N5 | Kanji |
| `n5-grammar` | N5 | Grammar |
| `n4-vocab` | N4 | Vocabulary |
| `n4-kanji` | N4 | Kanji |
| `n4-grammar` | N4 | Grammar |
| `n3-vocab` | N3 | Vocabulary |
| `n3-kanji` | N3 | Kanji |
| `n3-grammar` | N3 | Grammar |
| `n3-reading` | N3 | Reading |
| `n2-vocab` | N2 | Vocabulary |
| `n2-grammar` | N2 | Grammar |
| `n2-reading` | N2 | Reading |
| `n1-grammar` | N1 | Grammar |
| `n1-reading` | N1 | Reading |

### 5.3 Content Location

```
/src/content/quizzes/
  n5-vocab.ts
  n5-kanji.ts
  n5-grammar.ts
  n4-vocab.ts
  n4-grammar.ts
  n3-vocab.ts
  n3-grammar.ts
  n3-reading.ts
  ... (one file per slug)
```

### 5.4 Type Definitions

```typescript
// src/types/quiz.ts

type QuizQuestion = {
  id: string;
  questionText: string;       // Japanese question text (shown to user)
  questionTextEn?: string;    // English translation (code comment reference only)
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;        // Indonesian explanation — shown after answer
  explanationEn?: string;     // English for developer reference
  category: 'vocab' | 'kanji' | 'grammar' | 'reading';
  level: 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
};

type QuizResult = {
  quiz_slug: string;
  level: string;
  score: number;              // Number of correct answers
  total_questions: number;
  answers: Array<{
    questionId: string;
    selectedId: string;
    correct: boolean;
  }>;
  completed_at: Date;
};

// Used for Zustand store
type QuizSessionAnswer = {
  questionId: string;
  selectedOptionId: string;
  correct: boolean;
};
```

### 5.5 Score Calculation

```typescript
// Pure function — unit-testable
export function calculateQuizScore(
  questions: QuizQuestion[],
  answers: Record<string, string> // { [questionId]: selectedOptionId }
): { score: number; total: number; percentage: number } {
  const total = questions.length;
  const score = questions.filter(
    (q) => q.options.find((o) => o.id === answers[q.id])?.isCorrect === true
  ).length;
  return { score, total, percentage: Math.round((score / total) * 100) };
}
```

---

## 6. API Contracts

### POST /api/quiz/submit

**Auth:** Optional (no auth → score shown but not saved to DB)

```typescript
// Request body (Zod schema: QuizSubmitSchema)
{
  user_id: string;       // from session; omit if guest
  quiz_slug: string;     // e.g., "n5-vocab"
  level: string;         // e.g., "n5"
  answers: Array<{
    question_id: string;
    selected_option_id: string;
  }>;
}

// Response
{
  success: boolean;
  score: number;                  // number correct
  total_questions: number;
  results: Array<{
    question_id: string;
    correct: boolean;
    explanation: string;          // Indonesian
  }>;
  quiz_result_id: string;         // UUID of saved quiz_results row
}

// Error responses
400: { error: "Invalid quiz_slug" }
401: { error: "Unauthenticated" }  // only if user_id provided but session invalid
500: { error: "Failed to save result" }
```

**DB Write:**
```typescript
// Drizzle ORM — Sprint 01 schema already has quiz_results table
await db
  .insert(quizResults)
  .values({
    userId,
    quizSlug,
    level,
    score,
    totalQuestions,
    answers: JSON.stringify(gradedAnswers),
    completedAt: new Date(),
  })
  .onConflictDoNothing(); // prevent duplicate submits
```

### GET /api/quiz/[quiz-slug]/history

**Auth:** Required

```typescript
// Response
{
  quizSlug: string;
  attempts: Array<{
    score: number;
    total: number;
    percentage: number;
    completed_at: Date;
  }>;
  bestScore: number;
  bestPercentage: number;
  lastAttempt: Date;
  attemptCount: number;
}

// Error responses
401: { error: "Unauthenticated" }
404: { error: "No attempts found" }
```

### Request Timeout

All quiz API calls use a 5-second timeout. Implement with `AbortController`:

```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch('/api/quiz/submit', {
    method: 'POST',
    body: JSON.stringify(payload),
    signal: controller.signal,
  });
  clearTimeout(timeout);
  return res.json();
} catch (err) {
  if (err instanceof Error && err.name === 'AbortError') {
    throw new Error('NETWORK_TIMEOUT');
  }
  throw err;
}
```

---

## 7. State Management

### 7.1 Zustand Store

```typescript
// src/stores/quiz-store.ts
import { create } from 'zustand';

type QuizStore = {
  // Session state
  quizSlug: string | null;
  questions: QuizQuestion[];
  currentQuestion: number;
  answers: Record<string, string>; // { [questionId]: selectedOptionId }

  // Feedback state (shown after each answer)
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;

  // Submit state
  isSubmitting: boolean;
  submitError: string | null;
  scoreResult: QuizScoreResult | null;

  // Actions
  initQuiz: (slug: string, questions: QuizQuestion[]) => void;
  setAnswer: (questionId: string, optionId: string) => void;
  showFeedbackFor: (correct: boolean) => void;
  advance: () => void;
  submit: () => Promise<void>;
  reset: () => void;
};

const useQuizStore = create<QuizStore>((set, get) => ({
  quizSlug: null,
  questions: [],
  currentQuestion: 0,
  answers: {},
  showFeedback: false,
  lastAnswerCorrect: null,
  isSubmitting: false,
  submitError: null,
  scoreResult: null,

  initQuiz: (slug, questions) => {
    // Restore from sessionStorage if mid-quiz session exists
    const saved = sessionStorage.getItem(`quiz_session_${slug}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      set({ quizSlug: slug, questions, ...parsed });
    } else {
      set({ quizSlug: slug, questions, currentQuestion: 0, answers: {}, showFeedback: false });
    }
  },

  setAnswer: (questionId, optionId) => {
    set((state) => {
      const answers = { ...state.answers, [questionId]: optionId };
      // Persist to sessionStorage as safety net
      sessionStorage.setItem(
        `quiz_session_${state.quizSlug}`,
        JSON.stringify({ currentQuestion: state.currentQuestion, answers })
      );
      return { answers };
    });
  },

  showFeedbackFor: (correct) =>
    set({ showFeedback: true, lastAnswerCorrect: correct }),

  advance: () =>
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
      showFeedback: false,
      lastAnswerCorrect: null,
    })),

  submit: async () => {
    const { quizSlug, questions, answers } = get();
    set({ isSubmitting: true, submitError: null });
    try {
      const payload = {
        quiz_slug: quizSlug,
        level: questions[0]?.level,
        answers: Object.entries(answers).map(([question_id, selected_option_id]) => ({
          question_id,
          selected_option_id,
        })),
      };
      const result = await postQuizSubmit(payload); // uses 5s timeout
      set({ scoreResult: result, isSubmitting: false });
      // Clear session on success
      sessionStorage.removeItem(`quiz_session_${quizSlug}`);
    } catch (err) {
      set({ isSubmitting: false, submitError: err instanceof Error ? err.message : 'UNKNOWN' });
    }
  },

  reset: () =>
    set({
      currentQuestion: 0,
      answers: {},
      showFeedback: false,
      lastAnswerCorrect: null,
      submitError: null,
      scoreResult: null,
    }),
}));
```

### 7.2 Storage Keys

| Key | Storage | Purpose |
|---|---|---|
| `quiz_session_{slug}` | sessionStorage | Mid-quiz safety net (survives page refresh, not tab close) |
| `offline_quiz_answers` | localStorage | Offline mode queue (survives tab close) |

```typescript
// Offline quiz cache shape
type OfflineQuizCache = {
  quizSlug: string;
  answers: Record<string, string>; // { [questionId]: selectedOptionId }
  startedAt: string; // ISO timestamp
};
```

---

## 8. UI/UX Specifications

### 8.1 Quiz Entry Prompt (Post-Step)

Rendered on the step detail page after "Tandai Selesai":

```
[Card]
  Text: "Uji pemahaman kamu dengan kuis!" (Test your understanding with a quiz!)
  Button (primary): "Mulai Kuis" → navigate to /quizzes/[slug]
  Button (link): "Lewati" (Skip) → dismiss card
```

Untitled UI components: `Card`, `Button color="primary"`, `Button color="link-gray"`

### 8.2 Quiz Question Page

```
[Page Layout — same pattern as Assessment]
  ProgressBar: value={currentQuestion / totalQuestions * 100}
               label="{n} dari {total}"
  
  [Question Card — motion.div entry animation]
    <fieldset>
      <legend>{questionText}</legend>
      <RadioGroup>
        {options.map((option) => (
          <Radio key={option.id} value={option.id}>
            {option.text}
          </Radio>
        ))}
      </RadioGroup>
    </fieldset>

  [Feedback Section — shown after selection, aria-live="polite"]
    If correct:
      Icon: CheckCircle (fg-success-secondary, size-5)
      Text: "Benar! ✓" (text-success-primary)
      Text: {explanation} (text-tertiary)
    
    If incorrect:
      Icon: XCircle (fg-error-secondary, size-5)
      Text: "Salah. ✗" (text-error-primary)
      Text: "Jawaban yang benar: {correctOptionText}" (text-success-primary)
      Text: {explanation} (text-tertiary)

  Button (primary, disabled until feedback shown): "Lanjut"
    → On last question: "Lihat Hasil" instead of "Lanjut"
```

### 8.3 Option States

| State | Visual |
|---|---|
| Unselected | Default Radio style |
| Selected (pending feedback) | Radio selected state + scale 1.02 (Framer Motion) |
| Correct (after submit) | Green background `bg-success-primary` + ✓ icon |
| Incorrect (selected wrong) | Red background `bg-error-primary` + ✗ icon |
| Correct (not selected — revealed) | Green background `bg-success-primary` (shows correct answer) |
| All options (after feedback) | Disabled — no further interaction until "Lanjut" |

**Important:** Correct vs. incorrect is NEVER communicated by color alone. Always pair with ✓/✗ icon.

### 8.4 Score Results Page

```
[Page — motion entry animation]
  FeaturedIcon:
    ├─ ≥70%: color="success", icon=CheckCircle
    ├─ 50–69%: color="warning", icon=Star01
    └─ <50%: color="error", icon=AlertCircle

  Heading (text-primary): "Hasilmu: {score} dari {total} benar"
  
  ProgressBar:
    value={percentage}
    label="{percentage}% benar"
    color based on threshold (success/warning/error)
  
  If percentage < 50%:
    Text (text-tertiary): "Jangan menyerah! Coba lagi untuk memperkuat pemahamanmu."
    (Don't give up! Try again to strengthen your understanding.)
  
  If percentage ≥ 70%:
    Text (text-tertiary): "Kerja bagus! Kamu siap lanjut ke step berikutnya."
    (Great work! You're ready to move to the next step.)
  
  Actions (stacked on mobile, side-by-side on md+):
    Button (secondary): "Coba Lagi" → reset quiz
    Button (primary): "Lanjut ke Step Berikutnya" → navigate to next step
```

### 8.5 Offline Banner

```typescript
// Persistent top bar — only shown when offline
{!isOnline && (
  <div
    role="status"
    aria-live="assertive"
    className="bg-warning-primary text-primary_on-brand px-4 py-2 text-sm text-center"
  >
    📡 Offline Mode — jawaban akan disimpan saat online
  </div>
)}
```

### 8.6 Network Error Toast

Rendered via Untitled UI `Toast`:

```
Title: "Koneksi terputus. Cek internet kamu."
Actions:
  Button (primary, small): "Coba Lagi"
  Button (secondary, small): "Simpan & Kembali"
```

If second retry also fails:

```
Title: "Masih error. Kembali nanti?"
Actions:
  Button (primary, small): "Kembali Ke Beranda"
```

---

## 9. Animations

Same Framer Motion patterns as Assessment (Sprint 03):

```typescript
// Question entry
<motion.div
  key={currentQuestion} // triggers re-animation on question change
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {questionContent}
</motion.div>

// Option selection micro-interaction
<motion.div
  animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
  transition={{ duration: 0.2 }}
>
  <Radio ...>{option.text}</Radio>
</motion.div>

// Score results reveal
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  {scoreContent}
</motion.div>
```

---

## 10. All Microcopy

| Context | Indonesian | English (reference) |
|---|---|---|
| Quiz entry prompt | "Uji pemahaman kamu dengan kuis!" | Test your understanding with a quiz! |
| Start button | "Mulai Kuis" | Start Quiz |
| Skip quiz | "Lewati" | Skip |
| Question counter | "{n} dari {total}" | {n} of {total} |
| Correct feedback | "Benar! ✓" | Correct! |
| Incorrect feedback | "Salah. ✗" | Incorrect. |
| Show correct answer | "Jawaban yang benar: {text}" | The correct answer is: {text} |
| Advance question | "Lanjut" | Next |
| Final question | "Lihat Hasil" | See Results |
| Score heading | "Hasilmu: {score} dari {total} benar" | Your result: {score} of {total} correct |
| Encouragement (<50%) | "Jangan menyerah! Coba lagi untuk memperkuat pemahamanmu." | Don't give up! Try again to strengthen your understanding. |
| Success (≥70%) | "Kerja bagus! Kamu siap lanjut ke step berikutnya." | Great work! You're ready to move to the next step. |
| Retry | "Coba Lagi" | Try Again |
| Continue | "Lanjut ke Step Berikutnya" | Continue to Next Step |
| Network error | "Koneksi terputus. Cek internet kamu." | Connection lost. Check your internet. |
| Retry button | "Coba Lagi" | Try Again |
| Save & exit | "Simpan & Kembali" | Save & Exit |
| Still failing | "Masih error. Kembali nanti?" | Still error. Come back later? |
| Home button | "Kembali Ke Beranda" | Back to Home |
| Offline banner | "📡 Offline Mode — jawaban akan disimpan saat online" | Offline Mode — answers saved when online |
| Syncing toast | "Online! Menyinkronkan..." | Online! Syncing... |
| Synced toast | "Sinkronisasi selesai! ✓" | Sync complete! |
| No content | "Kuis sedang disiapkan. Coba nanti." | Quiz being prepared. Try later. |
| Guest save nudge | "Buat akun untuk menyimpan hasilmu!" | Create an account to save your results! |

---

## 11. Responsive & Mobile

Follows the same patterns established in Sprint 03 (Assessment):

- **Primary viewport:** 375px (iPhone 12 mini)
- **Touch targets:** Minimum 56px height on all interactive options (exceeds WCAG 48px minimum for comfortable Japanese text)
- **Buttons:** `w-full` on mobile, `w-auto` on `md:` and above
- **Option grid:** Single-column stacked list on mobile; options do not wrap into grid (JLPT readability)
- **Score page actions:** Stacked vertically on mobile (`flex-col`), side-by-side on `md:` (`flex-row`)
- **iOS safe areas:** Apply `pb-[env(safe-area-inset-bottom)]` to bottom action bar

```typescript
// Score page action layout
<div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
  <Button color="secondary" className="w-full md:w-auto">Coba Lagi</Button>
  <Button color="primary" className="w-full md:w-auto">Lanjut ke Step Berikutnya</Button>
</div>
```

---

## 12. Accessibility

| Requirement | Implementation |
|---|---|
| Question grouping | Each question: `<fieldset>` with `<legend>` containing the question text |
| Answer feedback | `aria-live="polite"` on feedback container — announced after answer selection |
| Offline banner | `aria-live="assertive"` — immediately announced |
| Color + icon | Correct/incorrect states ALWAYS use ✓/✗ icon in addition to color |
| Progress bar | `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=100`, `aria-label="{n} dari {total}"` |
| Disabled buttons | `disabled` attribute (not just `opacity-50`) so screen readers report state |
| Focus management | After feedback appears: focus moves to feedback text; after "Lanjut": focus moves to next question `<legend>` |
| Score page | `aria-live="polite"` on score result container; announced when mounted |

---

## 13. Edge Cases & Error Handling

| Scenario | Handling |
|---|---|
| Network timeout on submit | 5s `AbortController` → error toast with Retry + Save & Exit |
| Retry fails again | Second error state toast: "Masih error. Kembali nanti?" + Home button |
| Offline when quiz starts | Persistent warning banner; disable submit; cache to localStorage |
| Returns online | Sync from localStorage['offline_quiz_answers'] → POST → clear cache |
| User exits mid-quiz | sessionStorage['quiz_session_{slug}'] preserves answers; offer resume on return |
| Quiz content missing/empty | Show: "Kuis sedang disiapkan. Coba nanti." — no broken state |
| Score = 0/total | Show FeaturedIcon color="error" + encouragement text, never just red screen |
| Duplicate submit | Drizzle `.onConflictDoNothing()` on quiz_results insert prevents duplicates |
| Guest user completes quiz | Score calculated and shown; no DB write; nudge toast to create account |
| Resume session offer | On /quizzes/[slug] load: check sessionStorage → if exists, show dialog: "Lanjut dari pertanyaan {n}?" (Yes / Start Over) |
| All questions same answer | Valid edge case; no special handling needed |

---

## 14. Performance

| Concern | Strategy |
|---|---|
| Quiz question loading | Static content files (`/src/content/quizzes/*.ts`) — bundled at build time, no API fetch needed |
| Score submission | Target <300ms; matches Step completion POST from Sprint 05 |
| Offline sync | Best-effort on `window 'online'` event; one retry; no retry loop |
| sessionStorage writes | Synchronous; written per answer selection — acceptable for quiz session size |
| Bundle size | Quiz content files are code-split per route; lazy-loaded on /quizzes/* navigation |

---

## 15. File & Route Structure

```
src/
├── content/
│   └── quizzes/
│       ├── n5-vocab.ts
│       ├── n5-kanji.ts
│       ├── n5-grammar.ts
│       ├── n4-vocab.ts
│       ├── n4-grammar.ts
│       ├── n3-vocab.ts
│       ├── n3-grammar.ts
│       ├── n3-reading.ts
│       ├── n2-grammar.ts
│       └── n2-reading.ts
├── pages/
│   └── quiz.tsx              # /quizzes/[quiz-slug] route
├── stores/
│   └── quiz-store.ts         # Zustand quiz session store
├── types/
│   └── quiz.ts               # QuizQuestion, QuizResult types
└── hooks/
    └── use-quiz.ts           # Quiz logic hook (load questions, handle offline)

api/
└── quiz/
    ├── submit.ts             # POST /api/quiz/submit
    └── [slug]/
        └── history.ts        # GET /api/quiz/[quiz-slug]/history
```

---

## 16. Testing Checklist

### Happy Path
- [ ] Complete all questions → score page shown with correct count
- [ ] Score ≥70%: success FeaturedIcon shown
- [ ] Score 50–69%: warning FeaturedIcon shown
- [ ] Score <50%: error FeaturedIcon shown + encouragement text
- [ ] Score saved to quiz_results DB (verify with SELECT)
- [ ] "Coba Lagi" resets quiz to question 1
- [ ] "Lanjut ke Step Berikutnya" navigates correctly

### Per-Question Feedback
- [ ] Correct answer: green highlight + ✓ + explanation shown
- [ ] Incorrect answer: red highlight + ✗ + correct answer shown in green + explanation
- [ ] "Lanjut" button disabled until option selected and feedback shown
- [ ] Feedback never shows color without icon

### Network Failure
- [ ] Answer submit times out → error toast shown (not page crash)
- [ ] Toast shows "Coba Lagi" and "Simpan & Kembali" buttons
- [ ] Selected answer remains selected after timeout
- [ ] Retry succeeds → success toast → advance to next question
- [ ] Retry fails again → "Masih error. Kembali nanti?" + Home button
- [ ] sessionStorage holds answers throughout failure scenario

### Offline Mode
- [ ] navigator.onLine = false → persistent banner shown
- [ ] Banner has aria-live="assertive"
- [ ] Submit buttons disabled when offline
- [ ] Answers cached to localStorage['offline_quiz_answers']
- [ ] Return online → sync toast → POST fires → success toast → cache cleared

### Mid-Quiz Exit & Resume
- [ ] Refresh page mid-quiz → sessionStorage session restored
- [ ] Navigate away and back → resume dialog shown
- [ ] Choose "Mulai dari Awal" → quiz resets

### Guest User
- [ ] Score shown without DB write
- [ ] Nudge toast to create account shown
- [ ] No error thrown when user_id absent

### Accessibility
- [ ] All questions use fieldset + legend
- [ ] Feedback announced via aria-live="polite"
- [ ] Offline banner announced via aria-live="assertive"
- [ ] axe DevTools: no critical violations on quiz page
