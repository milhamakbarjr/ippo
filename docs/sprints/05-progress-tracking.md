# Sprint 05 — Progress Tracking

**Phase:** P0 / P1  
**Depends on:** Sprint 01 (progress table schema), Sprint 02 (auth session), Sprint 04 (learning path UI — completion UI elements live there)  
**Effort:** 3 days design + 4 days dev + 1 day QA  
**Target completion:** April 30, 2026  
**Status:** Not started

---

## 1. Overview

Sprint 05 delivers step completion persistence for both guests (localStorage) and authenticated users (Neon DB via API). It wires up the "Tandai Selesai" checkbox introduced in Sprint 04's UI, handles optimistic updates, XP rewards, streak tracking, and completion toasts.

**What this sprint adds on top of Sprint 04:**
- The write side of step completion (Sprint 04 only rendered read state)
- `POST /api/progress/complete` API endpoint (Zod validated, UPSERT pattern)
- Optimistic UI update via TanStack Query mutation with rollback on error
- localStorage write for guests + guest-to-registered nudge toast
- XP award logic (+10 XP per step completion, no duplicate awards)
- Streak tracking (last_completion_date comparison)
- Achievement unlock check after each completion (trigger only — rendering in Sprint 06)
- All completion-related toasts (guest, authenticated, error, achievement)
- Step completion animation (checkbox scale bounce + confetti)

---

## 2. Dependencies

| Dependency | What is needed | Risk if missing |
|---|---|---|
| Sprint 01 | `progress` table with columns: `user_id`, `level`, `step_slug`, `completed`, `completed_at`; index on `(user_id, level)` | Cannot persist to DB; falls back to localStorage only for all users |
| Sprint 01 | `users` table with `xp` and `streak` columns | Cannot award XP or track streak |
| Sprint 02 | Auth session — `user_id` available in API route | Cannot identify user in POST endpoint; treat all requests as unauthenticated |
| Sprint 04 | Learning path UI — checkbox rendered, step detail page exists | Completion mutation has no UI to attach to |

Sprint 05 must not begin until Sprint 01's migrations have run. Sprint 02 must be complete before the authenticated flow works end-to-end, but the guest flow (localStorage) can be tested independently.

---

## 3. User Flows

### 3a. Guest Completes a Step

```
[Entry point: step detail page, user not authenticated]
  ↓
  [ACTION] User taps "Tandai Selesai" checkbox
  ↓
  [SYSTEM] Detect: no auth session → guest flow
  ↓
  [SYSTEM] Write to localStorage:
    localStorage.setItem(`step_${slug}`, JSON.stringify({
      completed: true,
      timestamp: Date.now(),
    }))
  ↓
  [ANIMATE] Checkbox scale bounce: 1 → 1.2 → 1 (300ms ease-in-out)
  ↓
  [ANIMATE] Brief confetti burst (Framer Motion, 200ms appear, 500ms fade out)
  ↓
  [RENDER] Toast (6 seconds, bottom on mobile / top-right on desktop):
    ┌──────────────────────────────────────────────┐
    │ ✓ Selamat! Progres disimpan di browser ini.  │
    │   Buat akun untuk sinkronisasi ke perangkat  │
    │   lain.                [Daftar Gratis →]      │
    └──────────────────────────────────────────────┘
  ↓
  [STATE] Checkbox remains checked (reads from localStorage on next render)
  ↓
  [EFFECT] Progress bar on level page updates on next visit (reads localStorage)

[Return visit — same browser]
  ↓
  [SYSTEM] Page load reads localStorage
  ↓
  [RENDER] Checkbox shows as checked ✓, step shows completion styling
```

### 3b. Authenticated User Completes a Step

```
[Entry point: step detail page, user authenticated]
  ↓
  [ACTION] User taps "Tandai Selesai" checkbox
  ↓
  [SYSTEM] Detect: auth session present → authenticated flow
  ↓
  [OPTIMISTIC] Immediately update TanStack Query cache:
    Mark step as completed in cached progress data
    → Checkbox visually checks instantly (no perceived latency)
  ↓
  [ANIMATE] Checkbox scale bounce: 1 → 1.2 → 1 (300ms ease-in-out)
  ↓
  [ANIMATE] Brief confetti burst (Framer Motion, 200ms appear, 500ms fade out)
  ↓
  [ASYNC] POST /api/progress/complete:
    Body: { user_id, level, step_slug }
  ↓
  [SERVER] Zod validate request body
  ↓
  [SERVER] Check: is step already completed?
    → Already completed: return 200, skip XP award (idempotent)
    → Not yet completed: continue
  ↓
  [SERVER] UPSERT progress row:
    INSERT INTO progress (user_id, level, step_slug, completed, completed_at)
    VALUES ($1, $2, $3, true, now())
    ON CONFLICT (user_id, level, step_slug) DO UPDATE
    SET completed = true, completed_at = now()
  ↓
  [SERVER] Award XP:
    UPDATE users SET xp = xp + 10 WHERE id = $user_id
  ↓
  [SERVER] Update streak:
    Read last_completion_date from users table
    Compare with today:
      → Same day: no change
      → Yesterday: increment streak
      → >1 day ago: reset streak to 1
    UPDATE users SET streak = $new_streak, last_completion_date = today
  ↓
  [SERVER] Check achievement conditions (see Sprint 06):
    → Achievement unlocked: include in response
    → No achievement: omit from response
  ↓
  [SERVER] Compute next step (first incomplete step by index)
  ↓
  [SERVER] Return 200:
    { success, completed_at, levelProgress, nextStep, achievementUnlocked, xpAwarded: 10, totalXP }
  ↓
  [CLIENT] On success:
    → Invalidate TanStack Query cache (triggers background refetch)
    → Show toast (4 seconds):
      "Selamat! +10 XP. Berikutnya: {nextStep.title}"
    → If achievementUnlocked: show achievement toast (5 seconds, after main toast)
    → Flash "+10 XP" badge: opacity 0→1→0, 1s duration
  ↓
  [RENDER] Progress bar animates to new percentage (CSS transition: width 0.5s ease)

[Error path]
  ↓
  [SYSTEM] POST fails (network error, 500, etc.)
  ↓
  [OPTIMISTIC ROLLBACK] Restore previous cache state (step unchecked)
  ↓
  [RENDER] Error toast (no auto-dismiss):
    "Gagal menyimpan. Coba lagi." [Coba Lagi] button
    → [Coba Lagi] retries the same mutation
```

### 3c. Return Visit — Authenticated

```
[Entry point: /learning/[level] page (any visit after first completion)]
  ↓
  [SYSTEM] TanStack Query: GET /api/learning/[level]/progress
    (staleTime: 5 min — refetches if stale)
  ↓
  [RENDER] Completed steps show ✓ icon, text-secondary, line-through
  ↓
  [RENDER] First incomplete step highlighted as "Berikutnya"
  ↓
  [RENDER] Streak badge (if streak > 1):
    BadgeWithDot color="warning" — "3-day streak 🔥"
  ↓
  [RENDER] Progress bar at correct percentage
```

### 3d. Return Visit — Guest

```
[Entry point: /learning/[level] page]
  ↓
  [SYSTEM] No auth session → read localStorage
  ↓
  [SYSTEM] Filter level steps against localStorage keys (step_{slug})
  ↓
  [RENDER] Same completion indicators as authenticated (✓, strikethrough)
  ↓
  Note: Streak and XP are not tracked for guests
```

---

## 4. Functional Requirements

### 4.1 Dual Storage Architecture

| User state | Storage | Key format | Contents |
|---|---|---|---|
| Guest | localStorage | `step_{slug}` | `{ completed: boolean, timestamp: number }` |
| Authenticated | Neon DB (progress table) + TanStack Query cache | Row: `(user_id, level, step_slug)` | `completed`, `completed_at` |

Guest data is **never** migrated automatically. Sprint 07 handles optional localStorage → DB migration when a guest registers.

### 4.2 Step Completion Mutation (Client)

```typescript
// /src/hooks/use-complete-step.ts

const mutation = useMutation({
  mutationFn: (data: { user_id: string; level: string; step_slug: string }) =>
    fetch('/api/progress/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => {
      if (!r.ok) throw new Error('Failed to save progress');
      return r.json();
    }),

  onMutate: async (data) => {
    // Cancel in-flight queries to prevent overwriting optimistic update
    await queryClient.cancelQueries({ queryKey: ['progress', data.user_id, data.level] });

    // Snapshot current state for rollback
    const previous = queryClient.getQueryData(['progress', data.user_id, data.level]);

    // Optimistic update
    queryClient.setQueryData(['progress', data.user_id, data.level], (old: ProgressResponse) => ({
      ...old,
      completedSteps: old.completedSteps + 1,
      steps: old.steps.map((s) =>
        s.slug === data.step_slug ? { ...s, completed: true } : s
      ),
    }));

    return { previous };
  },

  onError: (_err, data, context) => {
    // Roll back optimistic update
    queryClient.setQueryData(
      ['progress', data.user_id, data.level],
      context?.previous
    );
    toast.error('Gagal menyimpan. Coba lagi.');
  },

  onSuccess: (response) => {
    // Show XP + next step toast
    toast.success(`Selamat! +${response.xpAwarded} XP. Berikutnya: ${response.nextStep}`);

    // Show achievement toast if unlocked
    if (response.achievementUnlocked) {
      setTimeout(() => {
        toast.success(`Achievement dibuka! ${response.achievementUnlocked.title}`);
      }, 1000);
    }
  },

  onSettled: (_data, _err, data) => {
    // Always refetch to reconcile optimistic state with server truth
    queryClient.invalidateQueries({ queryKey: ['progress', data.user_id, data.level] });
  },
});
```

### 4.3 Guest Completion (localStorage)

```typescript
// /src/utils/guest-progress.ts

export function markStepComplete(slug: string): void {
  try {
    localStorage.setItem(
      `step_${slug}`,
      JSON.stringify({ completed: true, timestamp: Date.now() })
    );
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      // Fallback: try sessionStorage (lost on browser close)
      try {
        sessionStorage.setItem(
          `step_${slug}`,
          JSON.stringify({ completed: true, timestamp: Date.now() })
        );
        toast.error(
          'Penyimpanan lokal penuh. Daftar akun untuk simpan di cloud.',
          { duration: 8000 }
        );
      } catch {
        // Both storages full — silent fail; no data loss risk beyond this session
      }
    }
  }
}
```

### 4.4 API Server Logic — POST /api/progress/complete

```typescript
// /src/api/progress/complete.ts (Vite + server function, or separate Express route)

import { z } from 'zod';
import { db } from '@/lib/db';
import { progress, users } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

const ProgressUpdateSchema = z.object({
  user_id: z.string().uuid(),
  level: z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
  step_slug: z.string().min(1).max(255),
  completed: z.boolean(),
});

export async function POST(request: Request) {
  // 1. Auth check
  const session = await getSession(request);
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Validate body
  const body = await request.json();
  const parsed = ProgressUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.message }, { status: 400 });
  }
  const { user_id, level, step_slug } = parsed.data;

  // 3. Guard: user_id must match session
  if (user_id !== session.user.id) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 4. Check if already completed (to prevent duplicate XP)
  const existing = await db
    .select()
    .from(progress)
    .where(
      and(
        eq(progress.user_id, user_id),
        eq(progress.level, level),
        eq(progress.step_slug, step_slug)
      )
    )
    .limit(1);
  const alreadyCompleted = existing[0]?.completed === true;

  // 5. UPSERT progress
  await db
    .insert(progress)
    .values({ user_id, level, step_slug, completed: true, completed_at: new Date() })
    .onConflictDoUpdate({
      target: [progress.user_id, progress.level, progress.step_slug],
      set: { completed: true, completed_at: new Date() },
    });

  let xpAwarded = 0;
  let totalXP = 0;

  // 6. Award XP (only if not previously completed)
  if (!alreadyCompleted) {
    const [updatedUser] = await db
      .update(users)
      .set({ xp: sql`${users.xp} + 10` })
      .where(eq(users.id, user_id))
      .returning({ xp: users.xp });
    xpAwarded = 10;
    totalXP = updatedUser.xp;
  }

  // 7. Update streak
  const newStreak = await updateStreak(user_id);

  // 8. Check achievements
  const achievementUnlocked = await checkAchievements(user_id, level);

  // 9. Compute next step
  const levelConfig = await getLevelConfig(level);
  const completedSlugs = await getCompletedSlugs(user_id, level);
  const nextStep = levelConfig.steps.find((s) => !completedSlugs.includes(s.slug));

  // 10. Compute level progress counts
  const completedCount = completedSlugs.length + (alreadyCompleted ? 0 : 1);

  return Response.json({
    success: true,
    completed_at: new Date(),
    levelProgress: { completed: completedCount, total: levelConfig.steps.length },
    nextStep: nextStep?.slug,
    achievementUnlocked,
    xpAwarded,
    totalXP,
  });
}
```

### 4.5 Streak Tracking Logic

```typescript
// /src/lib/streak.ts

export async function updateStreak(user_id: string): Promise<number> {
  const [user] = await db
    .select({ streak: users.streak, last_completion_date: users.last_completion_date })
    .from(users)
    .where(eq(users.id, user_id))
    .limit(1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDate = user.last_completion_date
    ? new Date(user.last_completion_date)
    : null;
  if (lastDate) lastDate.setHours(0, 0, 0, 0);

  let newStreak: number;

  if (!lastDate) {
    // First ever completion
    newStreak = 1;
  } else {
    const diffDays = Math.round(
      (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      // Completed again today — no change
      newStreak = user.streak;
    } else if (diffDays === 1) {
      // Consecutive day — increment
      newStreak = user.streak + 1;
    } else {
      // Gap in study — reset
      newStreak = 1;
    }
  }

  await db
    .update(users)
    .set({ streak: newStreak, last_completion_date: today })
    .where(eq(users.id, user_id));

  return newStreak;
}
```

### 4.6 Zod Validation Schema

```typescript
// /src/lib/schemas/progress.ts

import { z } from 'zod';

export const ProgressUpdateSchema = z.object({
  user_id: z.string().uuid(),
  level: z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
  step_slug: z.string().min(1).max(255),
  completed: z.boolean(),
});

export type ProgressUpdate = z.infer<typeof ProgressUpdateSchema>;
```

### 4.7 Progress Query

```typescript
// /src/hooks/use-level-progress.ts

export function useLevelProgress(user_id: string | null, level: string) {
  return useQuery({
    queryKey: ['progress', user_id, level],
    queryFn: () =>
      fetch(`/api/learning/${level}/progress`).then((r) => r.json()),
    staleTime: 1000 * 60 * 5,   // 5 minutes
    gcTime: 1000 * 60 * 30,     // 30 minutes
    enabled: !!user_id,
  });
}
```

---

## 5. API Contracts

### POST /api/progress/complete

```typescript
// Request
POST /api/progress/complete
Content-Type: application/json
Authorization: Bearer <session_token>

Body: {
  user_id: string;    // UUID — must match session user
  level: string;      // 'kana' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1'
  step_slug: string;  // e.g. 'hiragana-gojuuon'
}

// Response 200 — success
{
  success: true;
  completed_at: string;             // ISO 8601 date string
  levelProgress: {
    completed: number;              // e.g. 2
    total: number;                  // e.g. 8
  };
  nextStep?: string;                // slug of next incomplete step, omitted if none
  achievementUnlocked?: {
    slug: string;                   // e.g. 'kana-master'
    title: string;                  // English: 'Kana Master'
    titleId: string;                // Indonesian: 'Master Kana'
  };
  xpAwarded: number;                // 10 if first completion, 0 if duplicate
  totalXP: number;                  // user's new total XP
}

// Response 400 — validation error
{ error: string }

// Response 401 — unauthenticated
{ error: "Unauthorized" }

// Response 403 — user_id mismatch
{ error: "Forbidden" }
```

### GET /api/learning/[level]/progress

```typescript
// Request
GET /api/learning/kana/progress
Authorization: Bearer <session_token>

// Response 200
{
  level: string;                    // 'kana'
  totalSteps: number;               // 8
  completedSteps: number;           // 2
  steps: Array<{
    slug: string;
    title: string;
    completed: boolean;
    completed_at?: string;          // ISO 8601 date string, if completed
  }>;
  recommendedNextStep?: string;     // slug of first incomplete step
}

// Response 401
{ error: "Unauthorized" }

// Response 404
{ error: "Level tidak ditemukan" }
```

---

## 6. State Management

### Progress Query (authenticated)

```typescript
const { data: progress } = useQuery({
  queryKey: ['progress', user_id, level],
  queryFn: () =>
    fetch(`/api/learning/${level}/progress`).then((r) => r.json()),
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  enabled: !!user_id,
});
```

### Step Completion Mutation

```typescript
const mutation = useMutation({
  mutationFn: (data) =>
    fetch('/api/progress/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => {
      if (!r.ok) throw new Error('Failed');
      return r.json();
    }),

  onMutate: async (data) => {
    await queryClient.cancelQueries({ queryKey: ['progress', user_id, level] });
    const previous = queryClient.getQueryData(['progress', user_id, level]);
    queryClient.setQueryData(['progress', user_id, level], (old) => ({
      ...old,
      completedSteps: old.completedSteps + 1,
      steps: old.steps.map((s) =>
        s.slug === data.step_slug ? { ...s, completed: true } : s
      ),
    }));
    return { previous };
  },

  onError: (_err, data, context) => {
    queryClient.setQueryData(['progress', user_id, level], context.previous);
    toast.error('Gagal menyimpan. Coba lagi.');
  },

  onSuccess: (response) => {
    toast.success(`Selamat! +${response.xpAwarded} XP. Berikutnya: ${response.nextStep}`);
    if (response.achievementUnlocked) {
      setTimeout(() => {
        toast.success(`Achievement dibuka! ${response.achievementUnlocked.title}`);
      }, 1000);
    }
  },

  onSettled: (_data, _err, data) => {
    queryClient.invalidateQueries({ queryKey: ['progress', user_id, level] });
  },
});
```

### Guest State (localStorage)

No Zustand or React state needed. Guest completion state is read directly from localStorage on each render via a utility function. The Checkbox `checked` prop is derived from `isStepComplete(slug)`.

```typescript
// In StepDetailPage component
const isAuthenticated = !!session?.user;
const isComplete = isAuthenticated
  ? progress?.steps.find((s) => s.slug === slug)?.completed ?? false
  : isStepComplete(slug); // reads localStorage

function handleComplete() {
  if (isAuthenticated) {
    mutation.mutate({ user_id: session.user.id, level, step_slug: slug });
  } else {
    markStepComplete(slug);
    showGuestToast();
    playCompletionAnimation();
  }
}
```

---

## 7. UI/UX Specifications

### 7.1 Component Mapping

| UI Element | Untitled UI Component | Notes |
|---|---|---|
| Completion checkbox | `Checkbox size="sm"` | "Tandai Selesai" label; `aria-label="Tandai langkah ini selesai"` |
| Guest toast | `Toast` | icon=success, 6s duration, "Daftar Gratis" action button |
| Authenticated toast | `Toast` | icon=success+sparkle, 4s duration |
| Achievement toast | `Toast` | icon=trophy, 5s duration |
| Error toast | `Toast` | icon=error, no auto-dismiss, retry action |
| Streak badge | `BadgeWithDot color="warning"` | "3-day streak 🔥" |
| XP flash badge | `Badge color="brand"` | "+10 XP", fades in/out |
| Progress bar | `ProgressBar` | CSS `transition: width 0.5s ease`, NOT Framer Motion |

### 7.2 Checkbox Behavior

```typescript
// Checkbox is disabled once checked (P0 — no unchecking)
// P1: allow undo within 5 minutes
<Checkbox
  isSelected={isComplete}
  isDisabled={isComplete}   // P0: prevent unchecking
  onChange={handleComplete}
  aria-label="Tandai langkah ini selesai"
>
  Tandai Selesai
</Checkbox>
```

### 7.3 Completion Animation Sequence

```
T+0ms:   User taps checkbox
T+0ms:   Optimistic update fires (authenticated) OR localStorage write (guest)
T+0ms:   Checkbox visually checks
T+0ms:   Framer Motion: checkbox scale 1 → 1.2 (150ms ease-out)
T+150ms: Framer Motion: checkbox scale 1.2 → 1 (150ms ease-in)
T+0ms:   Confetti burst begins (Framer Motion particles, 200ms appear)
T+200ms: Confetti fades out (500ms fade)
T+300ms: Toast appears
T+1000ms (auth only): "+10 XP" badge flashes (opacity 0 → 1 → 0, 1s total)
```

### 7.4 Confetti Implementation

```typescript
// Framer Motion confetti — allowed exception (no Untitled UI equivalent)
// /src/components/application/learning-path/confetti-burst.tsx

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 120,
  y: -(Math.random() * 80 + 40),
  rotate: Math.random() * 360,
  color: i % 3 === 0 ? 'bg-brand-solid' : i % 3 === 1 ? 'bg-success-primary' : 'bg-warning-primary',
}));

// Render particles relative to checkbox position
// Each particle: initial { opacity: 1, x: 0, y: 0 }
//               animate { opacity: 0, x: particle.x, y: particle.y, rotate: particle.rotate }
//               transition { duration: 0.7, ease: "easeOut" }
```

### 7.5 Toast Specifications

**Guest toast:**
```
Icon: ✓ (CheckCircle, fg-success-secondary)
Title: "Selamat!"
Body: "Progres disimpan di browser ini. Buat akun untuk sinkronisasi ke perangkat lain."
Action: Button color="primary" size="sm" → /auth/register — "Daftar Gratis"
Duration: 6000ms
Position: bottom-center on mobile, top-right on desktop
```

**Authenticated toast:**
```
Icon: ✓ (CheckCircle, fg-success-secondary)
Body: "Selamat! +10 XP. Berikutnya: {step_title}"
Duration: 4000ms
Position: bottom-center on mobile, top-right on desktop
```

**Achievement toast (stacked after auth toast):**
```
Icon: trophy (fg-brand-primary)
Body: "Achievement dibuka! {achievement_title}"
Duration: 5000ms
Delay: 1000ms after auth toast appears
```

**Error toast:**
```
Icon: ✗ (XCircle, fg-error-secondary)
Body: "Gagal menyimpan. Coba lagi."
Action: Button color="secondary" size="sm" — "Coba Lagi" (retries mutation)
Duration: no auto-dismiss
```

### 7.6 Progress Bar Update

```css
/* CSS only — NOT Framer Motion */
.progress-bar-fill {
  transition: width 0.5s ease;
}
```

```typescript
// ProgressBar component receives updated completedSteps after mutation onSuccess
// CSS handles the animation automatically
<ProgressBar
  value={(completedSteps / totalSteps) * 100}
  aria-valuenow={(completedSteps / totalSteps) * 100}
  aria-valuemin={0}
  aria-valuemax={100}
/>
```

### 7.7 Streak Badge

```typescript
// Shown on level page if streak > 1 (data from /api/learning/[level]/progress or separate /api/user/stats)
{streak > 1 && (
  <BadgeWithDot color="warning">
    {streak}-day streak 🔥
  </BadgeWithDot>
)}
```

### 7.8 XP Flash Badge

```typescript
// Shown briefly after authenticated completion
{showXPFlash && (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: [0, 1, 1, 0], y: [-8, 0, 0, -8] }}
    transition={{ duration: 1, times: [0, 0.2, 0.8, 1] }}
    onAnimationComplete={() => setShowXPFlash(false)}
  >
    <Badge color="brand">+10 XP</Badge>
  </motion.div>
)}
```

---

## 8. All Microcopy (Indonesian / English)

| Key | Indonesian | English (reference) |
|---|---|---|
| Completion checkbox | "Tandai Selesai" | Mark Complete |
| Checkbox aria-label | "Tandai langkah ini selesai" | Mark this step as complete |
| Guest toast body | "Selamat! Progres disimpan di browser ini. Buat akun untuk sinkronisasi ke perangkat lain." | Congrats! Progress saved in this browser. Create account to sync across devices. |
| Guest toast CTA | "Daftar Gratis" | Sign Up Free |
| Auth toast | "Selamat! +{X} XP. Berikutnya: {step_title}" | Congrats! +{X} XP. Next: {step_title} |
| Error toast | "Gagal menyimpan. Coba lagi." | Failed to save. Try again. |
| Error retry button | "Coba Lagi" | Try Again |
| Streak badge | "{X}-day streak! 🔥" | {X}-day streak! 🔥 |
| XP flash | "+{X} XP" | +{X} XP |
| Achievement toast | "Achievement dibuka! {title}" | Achievement unlocked! {title} |
| Next step toast | "Berikutnya: {step_title}" | Next: {step_title} |
| Storage full error | "Penyimpanan lokal penuh. Daftar akun untuk simpan di cloud." | Local storage full. Sign up to save in the cloud. |
| Level all complete | "🎉 Level {LEVEL} Selesai! Siap untuk {NEXT}?" | Level {LEVEL} Complete! Ready for {NEXT}? |

---

## 9. Animations

| Animation | Mechanism | Timing |
|---|---|---|
| Checkbox completion bounce | Framer Motion `scale: [1, 1.2, 1]` | 300ms ease-in-out |
| Confetti burst | Framer Motion particles | 200ms appear, 500ms fade |
| Progress bar fill | CSS `transition: width 0.5s ease` | 500ms — do NOT use Framer Motion |
| XP badge flash | Framer Motion `opacity: [0, 1, 1, 0]` | 1s total |
| Toast entry/exit | Untitled UI Toast built-in | Default |

---

## 10. Responsive & Mobile

| Rule | Detail |
|---|---|
| Checkbox hit area | `min-h-[48px] min-w-[48px]` — pad the label to extend tap zone |
| Toast position | `bottom-center` on mobile (below content), `top-right` on desktop (`md:top-right`) |
| Toast stacking | Multiple toasts stack vertically, newest on top; max 3 visible at once |
| Toast width | Full-width on mobile (`w-full`), auto width on desktop (`md:w-auto md:max-w-sm`) |

---

## 11. Accessibility

| Element | ARIA attribute | Value |
|---|---|---|
| Completion checkbox | `aria-label` | "Tandai langkah ini selesai" |
| Progress bar | `aria-valuenow` | Current percentage (0–100) |
| Progress bar | `aria-valuemin` | 0 |
| Progress bar | `aria-valuemax` | 100 |
| Success toast | `aria-live` | "polite" |
| Error toast | `aria-live` | "polite" |
| Achievement toast | `aria-live` | "assertive" (important, interrupts) |
| Confetti container | `aria-hidden` | "true" (decorative) |
| XP flash badge | `aria-live` | "polite" |

All Untitled UI components (Checkbox, ProgressBar, Toast) handle their own ARIA internally via React Aria. Apply the above attributes on wrapping elements or custom additions only — do not duplicate ARIA that Untitled UI already manages.

---

## 12. Edge Cases & Error Handling

| Scenario | Handling |
|---|---|
| Network failure on POST | Rollback optimistic update → uncheck checkbox → error toast with "Coba Lagi" button that retries |
| localStorage quota exceeded (guest) | Catch `QuotaExceededError` → try sessionStorage → toast: "Penyimpanan lokal penuh. Daftar akun untuk simpan di cloud." |
| Unchecking a completed step (P0) | Disable the checkbox once checked (`isDisabled={isComplete}`) — no uncheck in P0 |
| Unchecking a completed step (P1) | Allow undo within 5 minutes: show "Batalkan" button in toast for 5 minutes post-completion |
| Completing same step in two concurrent tabs | UPSERT handles gracefully (ON CONFLICT DO UPDATE). XP check (`alreadyCompleted`) prevents duplicate award |
| Step slug not in content files | Server still saves progress row (forward-compatible). Log warning. No user-facing error. |
| Level completion (all steps done) | After each completion, check if `completedCount === totalSteps`. If yes: trigger "🎉 Level Selesai!" card (rendered in Sprint 06). This sprint returns the data; Sprint 06 renders the celebration. |
| POST with user_id that doesn't match session | Return 403 Forbidden. Client shows generic error toast. |
| Authenticated user with no XP column yet | Run Sprint 01 migration before Sprint 05 deploy. If column missing: API returns 500, client shows error toast. |
| Guest completes step, then registers | Sprint 07 handles localStorage → DB migration. Sprint 05 does not auto-migrate. |

---

## 13. Performance

| Target | Requirement |
|---|---|
| POST /api/progress/complete | < 300ms (simple UPSERT on indexed table) |
| Optimistic UI update | Instant (0ms perceived delay — no network wait for visual feedback) |
| TanStack Query invalidation after success | Background refetch; UI already updated optimistically — user never waits |
| localStorage read on guest page load | < 5ms |
| Progress bar CSS transition | 500ms — smooth, no jank |

**Neon DB index required (Sprint 01):**
```sql
CREATE UNIQUE INDEX progress_user_level_step_idx
  ON progress (user_id, level, step_slug);

CREATE INDEX progress_user_level_idx
  ON progress (user_id, level);
```

The `UNIQUE INDEX` on `(user_id, level, step_slug)` enables the `ON CONFLICT DO UPDATE` UPSERT pattern. The covering index on `(user_id, level)` ensures the GET progress query completes in < 500ms even as the table grows.

---

## 14. Testing Checklist

**Guest flow:**
- [ ] Checking checkbox writes to `localStorage['step_{slug}']` with `{ completed: true, timestamp }`
- [ ] Page refresh: checkbox still checked (reads localStorage correctly)
- [ ] Guest toast appears with "Daftar Gratis" button that navigates to `/auth/register`
- [ ] localStorage quota error: fallback to sessionStorage + storage-full toast shown
- [ ] Completion animation plays (scale bounce + confetti)

**Authenticated flow:**
- [ ] Checking checkbox fires POST to `/api/progress/complete` with correct `{ user_id, level, step_slug }`
- [ ] Optimistic update: checkbox checks instantly before server responds
- [ ] POST success: toast shows "+10 XP" and next step title
- [ ] POST success: TanStack Query cache invalidated and refetched
- [ ] POST failure: optimistic update rolled back (checkbox unchecks)
- [ ] POST failure: error toast shown with "Coba Lagi" button
- [ ] "Coba Lagi" retries the mutation
- [ ] XP badge flashes "+10 XP" for 1 second after success
- [ ] Achievement toast appears 1 second after success toast (if achievement unlocked)

**Progress loading:**
- [ ] Authenticated: level page shows ✓ on all previously completed steps
- [ ] Authenticated: progress bar reflects correct percentage
- [ ] Authenticated: first incomplete step highlighted as "Berikutnya"
- [ ] Guest: same completion indicators rendered from localStorage

**Streak:**
- [ ] Completing step on day 1: streak = 1
- [ ] Completing step on day 2 (consecutive): streak = 2
- [ ] Completing step on day 2 again (same day): streak stays at 2
- [ ] Gap of 2+ days: streak resets to 1
- [ ] Streak badge shows on level page when streak > 1

**API:**
- [ ] POST with invalid UUID → 400 with error message
- [ ] POST with invalid level → 400
- [ ] POST unauthenticated → 401
- [ ] POST with mismatched user_id → 403
- [ ] POST idempotent: completing same step twice does not award XP twice
- [ ] UPSERT: concurrent POST on same step (two tabs) → no duplicate rows

**Level completion:**
- [ ] Completing final step in a level returns `levelProgress.completed === levelProgress.total`
- [ ] Sprint 06 receives the data signal correctly (manual verification in Sprint 06)

---

## 15. File Deliverables

| File path | Description |
|---|---|
| `/src/api/progress/complete.ts` | POST endpoint — Zod validation, UPSERT, XP, streak, achievement check |
| `/src/api/learning/[level]/progress.ts` | GET endpoint — level progress with step completion states |
| `/src/hooks/use-complete-step.ts` | TanStack Query mutation hook — optimistic update + rollback |
| `/src/hooks/use-level-progress.ts` | TanStack Query query hook — level progress for authenticated users |
| `/src/utils/guest-progress.ts` | `markStepComplete`, `isStepComplete`, `getLevelProgress` — localStorage helpers |
| `/src/lib/streak.ts` | `updateStreak` — streak calculation and DB update |
| `/src/lib/schemas/progress.ts` | `ProgressUpdateSchema` Zod schema |
| `/src/components/application/learning-path/confetti-burst.tsx` | Framer Motion confetti particle animation |
| `/src/components/application/learning-path/xp-flash-badge.tsx` | "+X XP" animated Badge component |
| `/src/components/application/learning-path/completion-checkbox.tsx` | Wired-up checkbox: handles guest + auth flows, triggers animation |
