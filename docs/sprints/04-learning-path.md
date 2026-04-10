# Sprint 04 — Guided Learning Path

**Phase:** P0  
**Depends on:** Sprint 01 (progress table schema), Sprint 03 (assessment result feeds recommended level)  
**Effort:** 4 days design + 5 days dev + 1 day QA  
**Target completion:** April 27, 2026  
**Status:** Not started

---

## 1. Overview

Sprint 04 delivers the hierarchical learning path UI — the core experience of Ippo. Users navigate a structured curriculum across six levels (Kana → N5 → N4 → N3 → N2 → N1), view step lists with completion indicators, access step detail pages with curated external resources, and toggle step completion.

**No gating.** All levels and all steps are accessible to all users at all times. There are no prerequisites and no locked content. The experience is guided but not restrictive.

Key outputs:
- `/learning/[level]` — level page with step list, "Kamu di sini" card, and recommended next step
- `/learning/[level]/[step-slug]` — step detail page with description, resources, checkbox, and navigation
- Six level content files at `/src/content/[level]/index.ts`
- Progress query integration for authenticated users (TanStack Query)
- Guest localStorage read integration
- Event tracking on resource clicks

**What this sprint does NOT include:** Writing progress to DB or localStorage — that is Sprint 05. This sprint renders completion state read from storage/DB, but the write side (the "Tandai Selesai" mutation) is implemented in Sprint 05.

---

## 2. Dependencies

| Dependency | What is needed | Risk if missing |
|---|---|---|
| Sprint 01 | `progress` table schema (user_id, level, step_slug, completed, completed_at) | Cannot query DB for completion state; fall back to localStorage only |
| Sprint 03 | Assessment stores `user_level` in sessionStorage | "Kamu di sini" card cannot render; show no-assessment banner instead |
| Content files | `/src/content/[level]/index.ts` for each of 6 levels, each with ≥5 steps | Level page cannot render; 404 fallback |

Sprints 03 and 04 can run in parallel. Sprint 04 does not need Sprint 03 to be complete before development begins — the "Kamu di sini" card simply does not render when `sessionStorage['user_level']` is absent.

---

## 3. Relevant Personas

### Budi — The Motivated Visa Applicant
Budi needs a clear, unambiguous path to N2 with time estimates and visible proof of progress. He wants to see exactly how many weeks each level will take, how many steps he has completed, and what to do next. He will return daily and expects his position in the path to be remembered.

**What this sprint must deliver for Budi:**
- "Kamu di sini: KANA" card with weeks estimate and progress bar
- "Berikutnya" badge on the recommended next step
- Step counts: "1 dari 8 steps (12%)"
- Return visit restores exact state (completed steps highlighted)

### Siti — The Cautious Self-Learner
Siti is easily overwhelmed. She must never face a screen with too many choices. The step list must be linear and obvious. The "next" action must be visually dominant — she should not have to read instructions to know what to do.

**What this sprint must deliver for Siti:**
- Single-column layout on mobile, no sidebars
- One visually dominant "Berikutnya" step with a "Mulai Step Ini" button
- Bite-sized step detail page: title, short description, 2–3 links, checkbox, and two navigation buttons
- All labels in Indonesian

### Yuki — The Returning N3 Learner
Yuki already knows Japanese at N3 and wants to jump directly to N3 or N2. She must not be forced through the assessment or blocked from any level. She navigates directly to `/learning/n3` and expects it to work immediately.

**What this sprint must deliver for Yuki:**
- No forced assessment redirect — `/learning/n3` loads normally without `sessionStorage['user_level']`
- Visible tab or navigation to switch between levels
- Info banner (not a blocker) if she has no assessment result
- Efficient level navigation via Tabs component

---

## 4. User Flows

### 4a. Happy Path — First Visit with Assessment Result (Flow 1, Steps 5–7)

```
[Entry point: /assessment/result]
  ↓
  [SYSTEM] sessionStorage['user_level'] = 'kana' (set by Sprint 03)
  ↓
  [ACTION] User taps "Mulai Belajar" CTA on assessment result page
  ↓
  [NAVIGATE] → /learning/kana
  ↓
  [SYSTEM] Load level config from /src/content/kana/index.ts
  ↓
  [SYSTEM] Check auth session:
    → Authenticated: GET /api/learning/kana/progress (TanStack Query)
    → Guest: Read localStorage keys matching step_*
  ↓
  [SYSTEM] Merge: { steps[], completed_steps[] }
  ↓
  [RENDER] Level page:
    ┌ "Kamu di sini" card: level=KANA, estimatedWeeks=6–8, progress=12%, "1 dari 8 steps"
    ├ Step 1: [Coral badge: BERIKUTNYA] Hiragana Gojuuon — 15 menit [Mulai Step Ini]
    ├ Step 2: Hiragana Dakuten-Youon — 10 menit
    ├ Step 3: Katakana Gojuuon — 15 menit
    └ ...
  ↓
  [ACTION] User taps "Mulai Step Ini" on recommended step
  ↓
  [NAVIGATE] → /learning/kana/hiragana-gojuuon
  ↓
  [RENDER] Step detail page:
    ┌ Title: Hiragana Gojuuon
    ├ Description: "Belajar 46 hiragana dasar..."
    ├ ⏱ 15 menit
    ├ [NHK World Hiragana ↗]
    ├ [YouTube — Hiragana Song ↗]
    ├ [Tae Kim's Guide ↗]
    ├ [☐ Tandai Selesai]  ← write handled in Sprint 05
    ├ [← Kembali ke Jalur]
    └ [Lanjut ke Step Berikutnya →]
  ↓
  [ACTION] User taps resource link
  ↓
  [SYSTEM] track event('step:resource_click', { level: 'kana', step: 'hiragana-gojuuon', resource_url })
  ↓
  [SYSTEM] Open resource in new tab (target="_blank" rel="noopener noreferrer")
  ↓
  [ACTION] User taps "Lanjut ke Step Berikutnya"
  ↓
  [NAVIGATE] → /learning/kana/hiragana-dakuten-youon
```

### 4b. Return Visit (Next Day)

```
[Entry point: /learning/kana (direct or via bottom nav)]
  ↓
  [SYSTEM] Load kana config + progress (DB or localStorage)
  ↓
  [SYSTEM] Query returns: step 1 completed=true, step 2 completed=false
  ↓
  [RENDER] Level page:
    ┌ "Kamu di sini" card: progress=25%, "2 dari 8 steps"
    ├ Step 1: ✓ Hiragana Gojuuon [completed styling + strikethrough]
    ├ Step 2: [BERIKUTNYA badge] Hiragana Dakuten-Youon — 10 menit [Mulai Step Ini]
    └ Step 3: Katakana Gojuuon — 15 menit
  ↓
  [RENDER] Streak indicator (if applicable, from Sprint 06 data):
    "3-day streak! 🔥"
```

### 4c. Skip Assessment → Jump to Specific Level (Flow 2)

```
[Entry point: user types /learning/n3 directly, or taps "Jelajahi semua level"]
  ↓
  [SYSTEM] Check sessionStorage['user_level'] → undefined
  ↓
  [DECISION] No user_level in session
    → DO NOT redirect to assessment
    → DO NOT block access
    → Load N3 learning path normally
  ↓
  [RENDER] Level page (N3):
    ┌ [NO "Kamu di sini" card]
    ├ [Info banner]: "💡 Belum tahu level kamu? Coba Assessment" [Ambil Assessment Sekarang →]
    ├ Step 1: N3 Grammar Dasar — 30 menit [Mulai Step Ini]
    ├ Step 2: N3 Kanji Set 1 — 45 menit
    └ ...
  ↓
  [ACTION] User taps "Mulai Step Ini" on any step
  ↓
  [NAVIGATE] → /learning/n3/[step-slug]
  ↓
  [RENDER] Step detail: all features available (resources, nav buttons)
  ↓
  [ACTION] User checks "Tandai Selesai" without account
  ↓
  [SYSTEM] Store in localStorage (Sprint 05)
  ↓
  [RENDER] Toast: "Selamat! Progres disimpan di browser ini." + "Daftar Gratis" CTA (Sprint 05)
```

### 4d. Mobile Navigation (375px Portrait)

```
[Portrait, 375px]
  ↓
  [RENDER] Single column layout:
    ┌ Top bar (48px): [← arrow, 48px touch target] "Jalan Belajarmu ke N2"
    ├ "Kamu di sini" card: full width
    ├ Step list: full width cards, stacked vertically, 64px min row height, 12px gap
    └ Each step's "Mulai Step Ini": full width, 48px height

[Step detail, portrait]
  ↓
  [RENDER]:
    ┌ Top bar: [← Kembali, 48px target]
    ├ Content: title, description, time estimate
    ├ Resource links: full-width buttons, 48px height, stacked vertically
    ├ Checkbox: 48px tap zone
    ├ [← Kembali ke Jalur] — full width
    └ [Lanjut ke Step Berikutnya →] — full width

[Landscape / iPad, 768px+]
  ↓
  [RENDER] Two-column layout:
    ┌ Left (60%): title, description, resource links (flex-wrap, 2 per row)
    └ Right (40%): progress sidebar, achievements preview

[Desktop, 1024px+]
  ↓
  [RENDER]:
    ┌ max-w-2xl container, centered
    ├ Nav buttons: inline (Back left, Next right), not stacked
    └ Resource links: auto width, flex-wrap
```

---

## 5. Functional Requirements

### 5.1 Type Definitions

```typescript
// /src/types/learning.ts

type Step = {
  slug: string;           // e.g. 'hiragana-gojuuon'
  title: string;          // e.g. 'Hiragana Gojuuon'
  titleEn?: string;       // e.g. 'Basic Hiragana'
  description: string;    // Indonesian description
  descriptionEn?: string;
  estimatedMinutes: number;
  resources: Array<{
    title: string;
    titleEn?: string;
    url: string;
    type: 'video' | 'article' | 'interactive' | 'tool';
    language: 'id' | 'en' | 'ja';
  }>;
  category: 'vocabulary' | 'kanji' | 'grammar' | 'reading';
};

type Level = {
  id: 'kana' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  steps: Step[];
  estimatedWeeks: number;
  description: string;
};

type StepProgress = {
  user_id: string;
  level: string;
  step_slug: string;
  completed: boolean;
  completed_at?: Date;
};
```

### 5.2 Level Access Rules

- All 6 levels (Kana, N5, N4, N3, N2, N1) accessible at all times
- No prerequisites, no gating, no locked steps
- Any user (guest or authenticated) can view any level and any step detail

### 5.3 Recommended Path Logic

| Condition | Behavior |
|---|---|
| `sessionStorage['user_level']` is set | Show "Kamu di sini" card for that level; highlight first incomplete step as "Berikutnya" |
| `sessionStorage['user_level']` is not set | Hide "Kamu di sini" card; show info banner with assessment CTA; no step highlighted |
| User navigates to a different level than assessed | Show level normally; "Kamu di sini" card shows assessed level name as reference |

### 5.4 Step Ordering

Steps are linear (index 0, 1, 2, ...). No branching. The recommended next step is always the first incomplete step in the current level (by array index).

### 5.5 Progress Aggregation

```typescript
// Per-level progress
const levelProgress = completedSteps.length / totalSteps.length;

// Overall progress (all levels combined)
const overallCompleted = allLevels.reduce((sum, level) => sum + completedInLevel(level), 0);
const overallTotal = allLevels.reduce((sum, level) => sum + level.steps.length, 0);
const overallProgress = overallCompleted / overallTotal;
```

### 5.6 Content File Locations

Each level has a content file exporting the `Level` type:

```
/src/content/kana/index.ts
/src/content/n5/index.ts
/src/content/n4/index.ts
/src/content/n3/index.ts
/src/content/n2/index.ts
/src/content/n1/index.ts
```

Each file must export a default `Level` object with at least 5 steps, each with at least 2 resources.

### 5.7 Event Tracking

```typescript
// On resource link click — before opening new tab
track('step:resource_click', {
  level: string,
  step_slug: string,
  resource_url: string,
  resource_type: 'video' | 'article' | 'interactive' | 'tool',
  resource_language: 'id' | 'en' | 'ja',
});
```

---

## 6. API Contracts

### GET /api/learning/[level]/progress

Used by TanStack Query to load completion state for authenticated users.

```typescript
// Request
GET /api/learning/kana/progress
Authorization: Bearer <session_token>

// Response 200
{
  level: string;                    // 'kana'
  totalSteps: number;               // 8
  completedSteps: number;           // 1
  steps: Array<{
    slug: string;                   // 'hiragana-gojuuon'
    title: string;                  // 'Hiragana Gojuuon'
    completed: boolean;
  }>;
  recommendedNextStep?: string;     // slug of first incomplete step
}

// Response 401 — not authenticated
{ error: "Unauthorized" }

// Response 404 — unknown level
{ error: "Level tidak ditemukan" }
```

### POST /api/progress/complete

Handled in Sprint 05 but contract defined here for integration.

```typescript
// Request body
{ user_id: string; level: string; step_slug: string }

// Response 200
{
  success: boolean;
  completed_at: Date;
  levelProgress: { completed: number; total: number };
  nextStep?: string;
  achievementUnlocked?: { slug: string; title: string };
}
```

---

## 7. State Management

### Authenticated Users — TanStack Query

```typescript
// /src/hooks/use-level-progress.ts

const { data: progress, isLoading } = useQuery({
  queryKey: ['progress', user_id, level],
  queryFn: () =>
    fetch(`/api/learning/${level}/progress`).then((r) => r.json()),
  staleTime: 1000 * 60 * 5,   // 5 minutes — do not refetch on every tab focus
  gcTime: 1000 * 60 * 30,     // 30 minutes — keep in memory across navigation
  enabled: !!user_id,
});
```

### Guest Users — localStorage

```typescript
// /src/utils/guest-progress.ts

// Read completion state for a given step
function isStepComplete(slug: string): boolean {
  try {
    const raw = localStorage.getItem(`step_${slug}`);
    if (!raw) return false;
    const { completed } = JSON.parse(raw);
    return completed === true;
  } catch {
    return false;
  }
}

// Read all completed steps for a level
function getLevelProgress(level: Level): { completed: string[] } {
  const completed = level.steps
    .filter((step) => isStepComplete(step.slug))
    .map((step) => step.slug);
  return { completed };
}
```

### sessionStorage — Assessment Result

```typescript
// Written by Sprint 03, read here
const assessedLevel = sessionStorage.getItem('user_level') as Level['id'] | null;
const showYouAreHereCard = assessedLevel !== null;
```

---

## 8. UI/UX Specifications

### 8.1 Component Mapping

| UI Element | Untitled UI Component | Notes |
|---|---|---|
| Level navigation | `Tabs` (horizontal) | One tab per JLPT level |
| Step list item | `Card` + `Badge` + `Button` | Step title, time estimate, state variant |
| "Kamu di sini" card | `Badge color="brand"` + card layout | See specs below |
| Completion indicator | Checkmark icon (`fg-success-secondary`) | Read-only in Sprint 04; write in Sprint 05 |
| Progress summary | `ProgressBar` | % complete per level |
| Step detail layout | Full page, `max-w-2xl` on desktop | Title, description, resource list |
| External resource links | `Button color="secondary" iconLeading={Globe}` | `target="_blank"` |
| Back navigation | `Button color="tertiary"` | "← Kembali" |
| Next navigation | `Button color="primary"` | "Lanjut ke Step Berikutnya →" |
| Recommended badge | `Badge color="brand"` | "Berikutnya" label |
| Info banner (no assessment) | Untitled UI `Alert` or inline banner | See specs below |

### 8.2 Mobile Level Page Layout (375px Portrait)

```
┌─ Top Bar ─────────────────────────────────┐
│ ← Jalan Belajarmu ke N2                   │  48px height, pt-[safe-area-inset-top]
└───────────────────────────────────────────┘

┌─ "Kamu di sini" Card ─────────────────────┐  Only if sessionStorage['user_level'] set
│ ✨ Kamu di sini: KANA                     │  Border-left: 4px solid fg-success-secondary
│ Estimasi: 6-8 bulan                       │  text-secondary, 14px
│ [████░░░░░░░░░░░░░░░░] 12%               │  ProgressBar, 4px height
│ 1 dari 8 steps (12%)                      │  text-secondary, 12px
│ [Ambil Assessment Ulang]                  │  Button color="tertiary", small
└───────────────────────────────────────────┘

┌─ Step 1 ──────────────────────────────────┐  Recommended step
│ [BERIKUTNYA badge]                        │  Badge color="brand"
│ Hiragana Gojuuon                          │  text-primary, 16px, font-semibold
│ ⏱ 15 menit                               │  text-tertiary, 14px
│ [Mulai Step Ini →]                        │  Button color="primary", full-width, 48px
└───────────────────────────────────────────┘  Border-left: 4px solid bg-brand-solid

┌─ Step 2 ──────────────────────────────────┐  Default (not completed)
│ Hiragana Dakuten-Youon                    │
│ ⏱ 10 menit                               │
└───────────────────────────────────────────┘  border-secondary

┌─ Step 3 ──────────────────────────────────┐  Completed step (Sprint 05 writes this)
│ ✓ Hiragana Vokal                          │  ✓ icon: fg-success-secondary
│ ⏱ 10 menit                               │  text-secondary + line-through
└───────────────────────────────────────────┘
```

### 8.3 Step Detail Page Layout (375px Portrait)

```
┌─ Top Bar ─────────────────────────────────┐
│ ← Kembali                                 │  48px touch target
└───────────────────────────────────────────┘

┌─ Content ─────────────────────────────────┐
│ Hiragana Gojuuon                          │  Heading 1: 28px, text-primary
│ Belajar 46 hiragana dasar sebelum         │  Body: 16px, text-tertiary
│ melanjutkan ke materi lainnya.            │
│                                           │
│ ⏱ 15 menit                               │  Caption: text-secondary
│                                           │
│ Sumber Belajar                            │  Heading 2: 20px, text-secondary
│ ┌─────────────────────────────────────┐   │
│ │ 🌐 NHK World — Hiragana        [↗] │   │  Button color="secondary", full-width, 48px
│ └─────────────────────────────────────┘   │
│ ┌─────────────────────────────────────┐   │
│ │ 🎥 YouTube — Hiragana Song     [↗] │   │
│ └─────────────────────────────────────┘   │
│ ┌─────────────────────────────────────┐   │
│ │ 📖 Tae Kim's Guide             [↗] │   │
│ └─────────────────────────────────────┘   │
│                                           │
│ [☐ Tandai Selesai]                       │  Checkbox — write handled in Sprint 05
│                                           │
│ [← Kembali ke Jalur]                     │  Button color="tertiary", full-width
│ [Lanjut ke Step Berikutnya →]            │  Button color="primary", full-width
└───────────────────────────────────────────┘
```

### 8.4 "Kamu di sini" Card — Visual Specs

- Background: `bg-success-primary` at low opacity (via Tailwind opacity modifier)
- Border left: `border-l-4 border-l-[--color-fg-success-secondary]` — use CSS variable token
- Icon: ✨ emoji (not an icon component — emoji in span) + "Kamu di sini:" label
- Level name: uppercase, `text-primary`, `font-semibold`
- Time estimate text: `text-secondary`, 14px
- Progress bar: `ProgressBar` component, 4px height, `fg-success-secondary` fill color
- Progress text: `"{X} dari {Y} steps ({Z}%)"`, 12px, `text-secondary`
- Reassess button: `Button color="tertiary" size="sm"` — "Ambil Assessment Ulang"

### 8.5 Step Item — Visual Specs

| State | Left border | Text color | Icon |
|---|---|---|---|
| Recommended | `border-l-4 border-l-[--color-bg-brand-solid]` | `text-primary` | Badge "Berikutnya" |
| Default | `border-l-4 border-l-[--color-border-secondary]` | `text-primary` | None |
| Completed | `border-l-4 border-l-[--color-fg-success-secondary]` | `text-secondary line-through` | ✓ fg-success-secondary |

- Touch target: `min-h-[64px]` for entire step row
- Gap between steps: `gap-3` (12px)

### 8.6 Info Banner — No Assessment State

```
┌─ Info Banner ─────────────────────────────┐
│ 💡 Belum tahu level kamu? Coba Assessment  │
│        [Ambil Assessment Sekarang →]       │
└───────────────────────────────────────────┘
```

- Background: `bg-secondary`
- Border: `border border-secondary`
- Link: `Button color="link-color"` → `/assessment`
- Dismissible: No (always visible if no assessment)

### 8.7 Tablet / Desktop Adjustments

| Viewport | Layout change |
|---|---|
| `md:` (768px+) | Two-column: `grid-cols-[60%_40%]`. Left: content. Right: progress/achievement sidebar |
| `md:` | Resource links: `flex flex-wrap`, 2 per row (`w-[calc(50%-8px)]`) |
| `lg:` (1024px+) | `max-w-2xl mx-auto` container |
| `lg:` | Navigation buttons: `flex justify-between` (Back left, Next right), not stacked |

---

## 9. Animations

All animations use Framer Motion. Progress bar increments use CSS `transition` only (not Framer Motion).

### Step List Entry (Stagger)

```typescript
// Wrap step list in motion.div
<motion.div
  variants={{
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }}
  initial="hidden"
  animate="show"
>
  {steps.map((step) => (
    <motion.div
      key={step.slug}
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
      }}
    >
      <StepItem step={step} />
    </motion.div>
  ))}
</motion.div>
```

### Recommended Step Pulse

```typescript
// On the recommended step card's box-shadow
<motion.div
  animate={{
    boxShadow: [
      "0 0 0 0px rgba(255, 107, 53, 0)",
      "0 0 0 4px rgba(255, 107, 53, 0.1)",
      "0 0 0 0px rgba(255, 107, 53, 0)",
    ],
  }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
>
  {recommendedStepCard}
</motion.div>
```

### Page Entry

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  {pageContent}
</motion.div>
```

### Step Completion Animation

Handled entirely in Sprint 05. Sprint 04 only renders the static checkbox.

---

## 10. All Microcopy (Indonesian / English)

| Key | Indonesian | English (reference only) |
|---|---|---|
| Page heading | "Jalan Belajarmu ke N2" | Your Learning Path to N2 |
| You are here | "Kamu di sini: {LEVEL}" | You are here: {LEVEL} |
| Estimated time | "Estimasi: {X} bulan" | Estimate: {X} months |
| Progress text | "{X} dari {Y} steps ({Z}%)" | {X} of {Y} steps ({Z}%) |
| Recommended badge | "Berikutnya" | Next |
| Start step CTA | "Mulai Step Ini" | Start This Step |
| Continue step | "Lanjut ke Step Berikutnya" | Continue to Next Step |
| Back to path | "← Kembali ke Jalur" | Back to Path |
| Back nav | "← Kembali" | Back |
| Complete checkbox | "Tandai Selesai" | Mark Complete |
| Estimated minutes | "{X} menit" | {X} minutes |
| No assessment banner | "💡 Belum tahu level kamu? Coba Assessment" | Don't know your level? Try Assessment |
| Assessment CTA | "Ambil Assessment Sekarang" | Take Assessment Now |
| Reassess | "Ambil Assessment Ulang" | Retake Assessment |
| Level complete | "🎉 Level {LEVEL} Selesai! Siap untuk {NEXT}?" | Level {LEVEL} Complete! Ready for {NEXT}? |
| Level complete CTA | "Mulai Level {NEXT}" | Start Level {NEXT} |
| Learning resources heading | "Sumber Belajar" | Learning Resources |
| Unknown level 404 | "Level tidak ditemukan" | Level not found |
| Empty step error | "Step ini belum siap. Coba later" | This step isn't ready yet |

---

## 11. Keyboard Accessibility

| Key | Context | Action |
|---|---|---|
| `Tab` | Level page | Move through steps in order |
| `Enter` | Focused step row | Navigate to step detail |
| `Enter` | "Mulai Step Ini" button | Navigate to step detail |
| `Escape` | Step detail page | Navigate back to level page |
| `Tab` | Step detail | Back button → resource links (in order) → completion checkbox → navigation buttons |
| Arrow keys | Tabs component (level switcher) | Switch between level tabs |

All Untitled UI components handle focus management via React Aria. Do not add custom ARIA attributes on top of Untitled UI components unless adding a custom element.

---

## 12. Responsive & Mobile

- **Portrait (375px):** Single column. All buttons `w-full`. Minimum 48px button height. Back arrow touch target 48px.
- **Landscape / Tablet (768px+):** Two-column grid. Resource links `flex-wrap`, 2 per row.
- **Desktop (1024px+):** `max-w-2xl mx-auto`. Navigation buttons `flex justify-between` (not stacked).
- **iOS safe area:** `pt-[env(safe-area-inset-top)]` on top bar. `pb-[env(safe-area-inset-bottom)]` on bottom navigation.
- **Resource link buttons:** Full-width 48px on mobile; `w-auto` on desktop.
- **Swipe navigation (FUTURE P2):** Framer Motion `drag="x"`, `onDragEnd` handler → navigate prev/next step. Do not implement in Sprint 04.

---

## 13. Edge Cases & Error Handling

| Scenario | Behavior |
|---|---|
| No assessment → `/learning/n4` | No "Kamu di sini" card; show info banner with assessment CTA; all steps accessible |
| All steps in level completed | Show "🎉 Level Kana Selesai! Siap untuk N5?" + CTA to `/learning/n5`; ProgressBar at 100%; "Kana Master" badge (rendered in Sprint 06) |
| Dead resource link (P2) | Background job marks resource offline → show "⚠️ Satu link sedang offline. Coba link lain" inline under that resource button |
| Empty step (< 2 resources) | Validation at content load: steps must have ≥ 2 resources. If misconfigured: "Step ini belum siap. Coba later" replaces resource list |
| Network error loading progress (authenticated) | Fall back to reading localStorage; show stale indicator on progress bar ("Data lama — sinkronisasi gagal") |
| Direct URL to unknown level (e.g. `/learning/n9`) | Render 404 page: "Level tidak ditemukan" + `Button color="link-color" href="/learning"` |
| Direct URL to unknown step slug | Render 404 page with back link to level |
| Progress query loading | Show skeleton loading state on step list (not spinner) |

---

## 14. Performance

| Target | Requirement |
|---|---|
| `/learning/[level]` to step list visible | < 1.5s |
| Level config cache (TanStack Query) | `staleTime: 1000 * 60 * 60` (1 hour) — content changes rarely |
| Progress query (authenticated) | < 500ms (Neon DB indexed on `user_id + level`) |
| Step detail navigation (click → render) | < 100ms |
| Code splitting | Learning path page as a separate async chunk; step detail lazy-loaded on demand |

```typescript
// Route-level code splitting
const LearningLevelPage = lazy(() => import('./pages/learning-level-page'));
const StepDetailPage = lazy(() => import('./pages/step-detail-page'));
```

---

## 15. Testing Checklist

- [ ] Level page renders correct steps for each of 6 levels (Kana, N5, N4, N3, N2, N1)
- [ ] "Kamu di sini" card renders only when `sessionStorage['user_level']` is set
- [ ] "Kamu di sini" card does not render when `sessionStorage['user_level']` is absent
- [ ] Info banner renders when no assessment result
- [ ] Recommended step is the first incomplete step (by array index) and has "Berikutnya" badge
- [ ] "Mulai Step Ini" button navigates to correct step detail URL
- [ ] Step detail renders: title, description, time estimate, all resources, checkbox, both nav buttons
- [ ] Resource links open in new tab (`target="_blank"`)
- [ ] `track('step:resource_click', ...)` fires on resource link click
- [ ] Completed steps show ✓ icon and `text-secondary line-through` styling
- [ ] No-assessment state: info banner visible, step list still accessible
- [ ] All-steps-complete state: level complete celebration rendered
- [ ] Mobile (375px): all buttons full-width, min-h-[48px], single column
- [ ] Mobile: back arrow touch target ≥ 48px
- [ ] Tablet (768px+): two-column layout, resource links 2 per row
- [ ] Keyboard: Tab through steps in order on level page
- [ ] Keyboard: Enter on step navigates to step detail
- [ ] Keyboard: Escape on step detail returns to level page
- [ ] Unknown level URL → 404 page with correct message
- [ ] Progress loading: skeleton state shown while fetching
- [ ] Network error on progress fetch: localStorage fallback, stale indicator shown

---

## 16. File Deliverables

| File path | Description |
|---|---|
| `/src/pages/learning-level-page.tsx` | Level route page (`/learning/[level]`) |
| `/src/pages/step-detail-page.tsx` | Step detail route page (`/learning/[level]/[step-slug]`) |
| `/src/components/application/learning-path/step-item.tsx` | Individual step list item component |
| `/src/components/application/learning-path/you-are-here-card.tsx` | "Kamu di sini" card component |
| `/src/components/application/learning-path/step-resource-link.tsx` | Resource link button component |
| `/src/components/application/learning-path/no-assessment-banner.tsx` | Info banner for unevaluated users |
| `/src/components/application/learning-path/level-complete-card.tsx` | All-steps-complete celebration card |
| `/src/hooks/use-level-progress.ts` | TanStack Query hook for progress (authenticated) |
| `/src/utils/guest-progress.ts` | localStorage read helpers for guest users |
| `/src/types/learning.ts` | `Step`, `Level`, `StepProgress` types |
| `/src/content/kana/index.ts` | Kana level content (steps + resources) |
| `/src/content/n5/index.ts` | N5 level content |
| `/src/content/n4/index.ts` | N4 level content |
| `/src/content/n3/index.ts` | N3 level content |
| `/src/content/n2/index.ts` | N2 level content |
| `/src/content/n1/index.ts` | N1 level content |
