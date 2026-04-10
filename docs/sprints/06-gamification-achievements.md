# Sprint 06 — Gamification & Achievements

**Phase:** P1 (Month 2)
**Depends on:** Sprint 05 (step completion events + XP/streak columns), Sprint 01 (achievements table schema), Sprint 02 (auth/user context)
**Effort:** 3 days design + 4 days dev + 1 day QA
**Target completion:** May 14, 2026
**Status:** Not started

---

## 1. Overview

Sprint 06 delivers the full gamification layer: XP awards, achievement badges, and streak tracking. These systems are triggered by the step completion events wired up in Sprint 05. The goal is to create visible, emotionally rewarding feedback loops that drive daily return visits and encourage users to push through difficult levels.

**What Sprint 05 already set up (don't rebuild):**
- `POST /api/progress/complete` endpoint that awards +10 XP and updates streak on the server
- `xp`, `current_streak`, and `last_activity_date` columns on the `users` table
- Achievement unlock trigger call (stubbed in Sprint 05's response field `achievementUnlocked`)
- Streak display on learning path via `BadgeWithDot color="warning"`

**What this sprint adds:**
- Full `checkAchievements()` logic wired into the progress complete endpoint
- `updateStreak()` logic extracted into a reusable server utility
- Achievement gallery page (profile/dashboard view)
- Achievement unlock toast (5-second, `aria-live="assertive"`)
- XP flash animation on step completion
- Drizzle schema additions for XP and streak columns (if not already migrated)
- All achievement definitions — 11 slugs with Indonesian + English titles

---

## 2. Dependencies

| Dependency | What is needed | Risk if missing |
|---|---|---|
| Sprint 01 | `achievements` table with `(user_id, achievement_slug, unlocked_at)`; unique index on `(user_id, achievement_slug)` | Cannot persist achievements; gallery and toasts non-functional |
| Sprint 01 | `users` table with `xp INTEGER DEFAULT 0`, `current_streak INTEGER DEFAULT 0`, `last_activity_date DATE` | XP and streak cannot be stored; return derived counts only (fragile) |
| Sprint 02 | Auth session — `user_id` resolvable in server functions | Achievement check cannot be user-scoped |
| Sprint 05 | `POST /api/progress/complete` exists and calls into achievement check hook (even if stub returns `null`) | Sprint 06 cannot integrate achievement results into the step completion response |

Sprint 06 must not begin until Sprint 05 is merged and the `achievements` table migration from Sprint 01 has run.

---

## 3. Relevant Personas

### Budi — The Motivated Visa Applicant
Budi is goal-driven and wants external validation of his progress. Achievement badges are his primary retention mechanism — seeing "Juara N5" in his profile confirms he is on track for his visa deadline. He checks the achievement gallery between study sessions to see how many remain locked, which motivates the next session.

**Design implication:** The achievement gallery must surface locked achievements with clear unlock conditions, not just hide them. Budi needs the gap to be visible.

### Siti — The Cautious Self-Learner
Siti needs encouragement for even tiny steps. She does not chase badges consciously, but when an achievement toast fires after her first ever step completion ("Langkah Pertama"), that moment of delight anchors her to the app emotionally. XP rewards must fire immediately — even a delayed 200ms makes the moment feel disconnected.

**Design implication:** The XP flash and achievement toast must fire within the same animation frame as the step completion confetti from Sprint 05. Both are part of one unified celebration moment.

### Yuki — The Returning N3 Learner
Yuki is metrics-driven. She wants to see N3 completion percentage alongside N2 preview. The achievement system provides milestone clarity: "Juara N3" confirms readiness to advance. Yuki also notices streak data — she is motivated by streaks as a proxy for consistency, not just total step count.

**Design implication:** Achievement gallery must show per-level completion percentage alongside the badge, so Yuki can assess exactly how close she is to each level-master achievement.

---

## 4. Achievement Definitions

All achievements are append-only (never revoked, even if the user deletes progress).

| Slug | Title (ID) | Title (EN) | XP Bonus | Unlock Condition |
|---|---|---|---|---|
| `first-step` | Langkah Pertama | First Step | 0 | Complete any first step (total completed count = 1) |
| `sound-learner` | Pelajar Suara | Sound Learner | 0 | Complete the first Kana step (step index 0 in the Kana level) |
| `kana-master` | Kana Master | Kana Master | 0 | All Kana steps complete |
| `n5-master` | Juara N5 | N5 Champion | 0 | All N5 steps complete |
| `n4-master` | Juara N4 | N4 Champion | 0 | All N4 steps complete |
| `n3-master` | Juara N3 | N3 Champion | 0 | All N3 steps complete |
| `n2-master` | Juara N2 | N2 Champion | 0 | All N2 steps complete |
| `streak-3` | Api 3 Hari | 3-Day Fire | 0 | 3-day study streak |
| `streak-7` | Api 7 Hari | 7-Day Fire | 0 | 7-day study streak |
| `streak-30` | Api 30 Hari | 30-Day Fire | 0 | 30-day study streak |
| `early-bird` | Burung Pagi | Early Bird | 0 | (P2: first step completed before 8:00 AM local time) |

Notes:
- `early-bird` is defined in the schema but the unlock check is **not** implemented in Sprint 06 — it is a P2 item. The slug is pre-registered so the DB unique index is stable.
- XP bonuses for achievements are 0 in Sprint 06. If product decides to add bonus XP per achievement, add a `bonus_xp` column to the achievements definition map and award it via a separate `UPDATE users SET xp = xp + bonus_xp` call.

---

## 5. XP System

### Rules

- **+10 XP** per step completion (awarded by Sprint 05's `POST /api/progress/complete`)
- XP is **not** awarded twice for the same step (idempotent check in Sprint 05)
- XP is stored on the `users` table in the `xp` column (integer, default 0)
- XP is never reduced or revoked

### Level Thresholds

| XP Range | Level Label |
|---|---|
| 0–49 | Pemula (Beginner) |
| 50–99 | Pelajar (Learner) |
| 100–249 | Mahir (Proficient) |
| 250–499 | Ahli (Expert) |
| 500–999 | Master |
| 1000+ | Legenda (Legend) |

These labels are display-only in Sprint 06. No separate DB column is needed — level is derived from `xp` at read time.

### XP Display

On step completion:
1. Badge `color="brand"` flashes with text `"+10 XP"` (opacity 0 → 1 → 0, 1s duration, Framer Motion)
2. After fade, the profile bar or XP counter updates to show new total XP

In profile/dashboard:
- Show total XP and derived level label
- Example: "120 XP — Mahir"

---

## 6. Streak System

### Rules

| Scenario | Outcome |
|---|---|
| First ever step completion | Set `current_streak = 1`, `last_activity_date = today` |
| Same calendar day as `last_activity_date` | No change (idempotent) |
| `last_activity_date` = yesterday | `current_streak += 1`, `last_activity_date = today` |
| `last_activity_date` is 2+ days ago | `current_streak = 1` (reset), `last_activity_date = today` |

### Storage

Columns on the `users` table (see Section 9 for migration):
- `current_streak INTEGER DEFAULT 0`
- `last_activity_date DATE`

Streak is updated inside the same server transaction as the progress UPSERT in `POST /api/progress/complete`. Do not run streak update separately.

### Display

- `BadgeWithDot color="warning"` with text `"{n}-day streak 🔥"`
- Position: near the "Kamu di sini" card on the learning path page, or in the profile bar
- For streaks > 30 days: show `"30+ day streak 🔥🔥🔥"` with special `color="error"` badge (more intense)
- For streak = 0 or 1: hide badge (don't display "1-day streak" — it's not motivating)

---

## 7. DB Schema Updates

These columns should have been added in Sprint 01. If the migration did not include them, apply now.

### SQL Migration

```sql
-- Add gamification columns to users table (idempotent: check column existence first)
ALTER TABLE users ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_activity_date DATE;
```

### Drizzle Schema Addition (`/src/db/schema.ts`)

```typescript
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  preferred_language: varchar('preferred_language', { length: 2 }).default('id'),
  assessed_level: varchar('assessed_level', { length: 10 }),
  // Gamification columns — added Sprint 06
  xp: integer('xp').default(0).notNull(),
  current_streak: integer('current_streak').default(0).notNull(),
  last_activity_date: date('last_activity_date'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const achievements = pgTable('achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  achievement_slug: varchar('achievement_slug', { length: 255 }).notNull(),
  unlocked_at: timestamp('unlocked_at').defaultNow(),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => [
  unique('idx_achievements_unique').on(table.user_id, table.achievement_slug),
  index('idx_achievements_user').on(table.user_id),
]);
```

---

## 8. Achievement Check Logic

File location: `/src/server/achievements.ts`

This function is called by `POST /api/progress/complete` **after** the progress row has been committed and XP has been awarded. It runs async and does not block the HTTP response — the response is sent to the client, then `checkAchievements` fires. If it fails, log the error and move on; the next completion will retry naturally.

```typescript
import { db } from '@/db';
import { achievements, progress, users } from '@/db/schema';
import { and, eq, count } from 'drizzle-orm';
import { getStepsForLevel } from '@/content';

type Achievement = {
  slug: string;
  titleId: string;
  titleEn: string;
};

const achievementTitles: Record<string, { id: string; en: string }> = {
  'first-step':     { id: 'Langkah Pertama', en: 'First Step' },
  'sound-learner':  { id: 'Pelajar Suara',   en: 'Sound Learner' },
  'kana-master':    { id: 'Kana Master',      en: 'Kana Master' },
  'n5-master':      { id: 'Juara N5',         en: 'N5 Champion' },
  'n4-master':      { id: 'Juara N4',         en: 'N4 Champion' },
  'n3-master':      { id: 'Juara N3',         en: 'N3 Champion' },
  'n2-master':      { id: 'Juara N2',         en: 'N2 Champion' },
  'streak-3':       { id: 'Api 3 Hari',       en: '3-Day Fire' },
  'streak-7':       { id: 'Api 7 Hari',       en: '7-Day Fire' },
  'streak-30':      { id: 'Api 30 Hari',      en: '30-Day Fire' },
};

/**
 * Grant an achievement if not already unlocked.
 * Returns the achievement if newly granted, undefined if already existed.
 */
async function grantAchievement(
  userId: string,
  slug: string
): Promise<Achievement | undefined> {
  try {
    const result = await db
      .insert(achievements)
      .values({ user_id: userId, achievement_slug: slug })
      .onConflictDoNothing()
      .returning();

    if (result.length === 0) return undefined; // already existed

    const titles = achievementTitles[slug];
    return { slug, titleId: titles.id, titleEn: titles.en };
  } catch (error) {
    console.error(`Failed to grant achievement ${slug} for user ${userId}:`, error);
    return undefined;
  }
}

/**
 * Check and grant all applicable achievements after a step completion.
 * Called async (fire-and-forget) from POST /api/progress/complete.
 *
 * @param userId - The authenticated user's ID
 * @param level  - The level of the step just completed (e.g. 'kana', 'n5')
 * @param stepSlug - The slug of the step just completed
 * @param currentStreak - The user's streak count after the current completion
 * @returns Array of newly granted achievements (may be empty)
 */
export async function checkAchievements(
  userId: string,
  level: string,
  stepSlug: string,
  currentStreak: number
): Promise<Achievement[]> {
  const unlocked: Achievement[] = [];

  // --- First step ever ---
  const [{ totalCompleted }] = await db
    .select({ totalCompleted: count() })
    .from(progress)
    .where(and(eq(progress.user_id, userId), eq(progress.completed, true)));

  if (Number(totalCompleted) === 1) {
    const a = await grantAchievement(userId, 'first-step');
    if (a) unlocked.push(a);
  }

  // --- First Kana step (sound-learner) ---
  if (level === 'kana') {
    const kanaSteps = getStepsForLevel('kana');
    if (kanaSteps[0]?.slug === stepSlug) {
      const a = await grantAchievement(userId, 'sound-learner');
      if (a) unlocked.push(a);
    }
  }

  // --- Level master achievement ---
  const levelSteps = getStepsForLevel(level);
  const [{ completedInLevel }] = await db
    .select({ completedInLevel: count() })
    .from(progress)
    .where(
      and(
        eq(progress.user_id, userId),
        eq(progress.level, level),
        eq(progress.completed, true)
      )
    );

  if (Number(completedInLevel) >= levelSteps.length && levelSteps.length > 0) {
    const levelSlug = `${level}-master`;
    if (achievementTitles[levelSlug]) {
      const a = await grantAchievement(userId, levelSlug);
      if (a) unlocked.push(a);
    }
  }

  // --- Streak achievements ---
  if (currentStreak >= 3) {
    const a = await grantAchievement(userId, 'streak-3');
    if (a) unlocked.push(a);
  }
  if (currentStreak >= 7) {
    const a = await grantAchievement(userId, 'streak-7');
    if (a) unlocked.push(a);
  }
  if (currentStreak >= 30) {
    const a = await grantAchievement(userId, 'streak-30');
    if (a) unlocked.push(a);
  }

  return unlocked;
}
```

---

## 9. Streak Update Logic

File location: `/src/server/streak.ts`

This function runs inside the `POST /api/progress/complete` handler, within the same DB transaction as the progress UPSERT. The updated streak value is then passed to `checkAchievements`.

```typescript
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Update the user's streak based on today's date vs last_activity_date.
 * Returns the new streak count.
 */
export async function updateStreak(userId: string): Promise<number> {
  const [user] = await db
    .select({
      current_streak: users.current_streak,
      last_activity_date: users.last_activity_date,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (!user) throw new Error(`User ${userId} not found`);

  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const lastActivity = user.last_activity_date
    ? new Date(user.last_activity_date).toISOString().split('T')[0]
    : null;

  // Same day — no change, return current streak
  if (lastActivity === today) {
    return user.current_streak ?? 0;
  }

  const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
  const newStreak =
    lastActivity === yesterday
      ? (user.current_streak ?? 0) + 1 // consecutive day
      : 1;                              // gap > 1 day — reset

  await db
    .update(users)
    .set({
      current_streak: newStreak,
      last_activity_date: new Date(),
      updated_at: new Date(),
    })
    .where(eq(users.id, userId));

  return newStreak;
}
```

### Integration into `POST /api/progress/complete`

After the progress UPSERT and XP award (from Sprint 05), add:

```typescript
// 1. Update streak (synchronous — needed before checkAchievements)
const newStreak = await updateStreak(userId);

// 2. Check achievements async (fire-and-forget — don't await in hot path)
const achievementPromise = checkAchievements(userId, level, stepSlug, newStreak)
  .then((unlocked) => {
    // Store in response context if still available, or log
    if (unlocked.length > 0) {
      console.log(`Achievements unlocked for ${userId}:`, unlocked.map(a => a.slug));
    }
  })
  .catch((err) => {
    console.error('Achievement check failed (non-fatal):', err);
  });

// 3. Return response immediately (don't block on achievementPromise)
return json({
  success: true,
  completed_at: new Date(),
  levelProgress: { completed: completedCount, total: totalSteps },
  nextStep: nextStepSlug,
  xpAwarded: 10,
  totalXP: user.xp + 10,
  currentStreak: newStreak,
  // achievementUnlocked is best-effort: only included if check completes in <50ms
  // Otherwise client polls /api/achievements on next page load
});
```

> **Note on achievement response timing:** Because `checkAchievements` is fire-and-forget, the `achievementUnlocked` field in the response may be `undefined` on the first completion. The achievement toast can also be triggered via a polling pattern: on page load, compare `achievements` count against the previous visit's count (stored in localStorage as `achievements_count`). If new achievements exist, show the toast. This avoids any timing dependency. Decide which approach to use in implementation and be consistent.

---

## 10. UI/UX Specifications

### Component Map

| UI Element | Untitled UI Component | Notes |
|---|---|---|
| Achievement badge | `BadgeWithIcon` + `FeaturedIcon` | Unlock animation via Framer Motion |
| XP counter flash | `Badge color="brand"` | "+10 XP" format, fades in then out |
| Streak indicator | `BadgeWithDot color="warning"` | "3-day streak 🔥" — hidden if streak < 2 |
| 30+ day streak | `BadgeWithDot color="error"` | "30+ day streak 🔥🔥🔥" |
| Level completion card | `Card` + `FeaturedIcon color="success"` | "Level selesai!" message |
| Progress dashboard | `Card` grid | Per-level completion percentage |
| User profile bar | `AvatarLabelGroup` | Name + XP level label |
| Achievement toast | `Toast` + `FeaturedIcon color="warning"` | Trophy icon, 5s duration |
| Achievement gallery | Grid of `BadgeWithIcon` | Unlocked: color; Locked: grayscale + lock |
| XP level label | `Badge color="brand"` | "120 XP — Mahir" |

---

### Achievement Toast

Fires immediately after step completion if an achievement was newly unlocked. If multiple achievements unlock simultaneously, queue them sequentially (500ms gap between each).

```
┌────────────────────────────────────────────────────┐
│  🏆  Achievement Dibuka!                           │
│      Langkah Pertama                               │
│      Kamu menyelesaikan step pertamamu!            │
└────────────────────────────────────────────────────┘
```

- Icon: `FeaturedIcon` `color="warning"` `theme="light"` (trophy icon from `@untitledui/icons`)
- Heading: **"Achievement Dibuka!"** (Achievement Unlocked!)
- Body: `{achievement_title_id}` (Indonesian title from definitions table)
- Sub (optional): `"+{xp} XP"` if XP bonus is non-zero (P2)
- Duration: 5 seconds
- `aria-live="assertive"` (announces immediately, interrupts screen reader)
- Fires after the step completion toast from Sprint 05 (sequential, not concurrent)

---

### Achievement Gallery

Route: `/profile` or `/achievements` (a subsection of the dashboard page)

Layout:
- Grid: 3 columns on mobile (375px), 4 columns on tablet (768px), 6 columns on desktop (1024px+)
- Each cell: `BadgeWithIcon` + title below + unlock hint for locked ones

**Unlocked state:**
- Full brand color badge
- Icon from the achievement definition
- Title in `text-primary`
- `unlocked_at` date in `text-tertiary` (e.g., "10 Apr 2026")

**Locked state:**
- Badge: grayscale (`filter: grayscale(1) opacity(0.4)`)
- Lock icon overlaid (bottom-right corner, `Lock01` from `@untitledui/icons`)
- Title in `text-tertiary`
- Unlock hint below: see microcopy section

**Unlock animation (on the moment of unlock):**
- Framer Motion spring: `scale 0 → 1`, `type: "spring"`, `stiffness: 200`, `damping: 20`
- Duration: 400ms
- Follows confetti from step completion; starts 300ms after confetti

---

### Streak Indicator on Learning Path

Position: Inside the "Kamu di sini" card, or in the top profile bar if the user is authenticated.

```tsx
{currentStreak >= 2 && (
  <BadgeWithDot
    color={currentStreak >= 30 ? "error" : "warning"}
    label={currentStreak >= 30 ? "30+ day streak 🔥🔥🔥" : `${currentStreak}-day streak 🔥`}
  />
)}
```

CSS fire pulse animation (for the 🔥 emoji container):
```css
@keyframes fire-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

.streak-fire {
  animation: fire-pulse 1s ease-in-out infinite;
  display: inline-block;
}
```

---

### XP Flash Animation

```tsx
// Framer Motion — fires on step completion
<AnimatePresence>
  {showXpFlash && (
    <motion.div
      key="xp-flash"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Badge color="brand">+10 XP</Badge>
    </motion.div>
  )}
</AnimatePresence>
```

Show for 1.5 seconds, then fade and replace with updated total XP.

---

## 11. All Microcopy

All Indonesian strings are primary. English translations are provided for reference and for `titleEn` fields in the data layer.

| Context | Indonesian | English |
|---|---|---|
| Achievement toast heading | "Achievement Dibuka!" | "Achievement Unlocked!" |
| Level complete heading | "🎉 Level {level} Selesai!" | "Level {level} Complete!" |
| Level complete sub | "{title} dibuka!" | "{title} unlocked!" |
| Streak badge (n days) | "{n}-day streak 🔥" | "{n}-day streak 🔥" |
| Streak badge (30+ days) | "30+ day streak 🔥🔥🔥" | "30+ day streak 🔥🔥🔥" |
| XP flash | "+{n} XP" | "+{n} XP" |
| XP display | "{total} XP — {label}" | "{total} XP — {label}" |
| Locked achievement hint (level master) | "Selesaikan semua {X} langkah di level {level}" | "Complete all {X} steps in level {level}" |
| Locked achievement hint (streak) | "Belajar {n} hari berturut-turut" | "Study for {n} consecutive days" |
| Locked achievement hint (first-step) | "Selesaikan langkah pertamamu" | "Complete your first step" |
| Streak reset nudge | "Streak terputus. Yuk mulai lagi! 💪" | "Streak broken. Let's start again! 💪" |
| Achievement gallery heading | "Koleksi Achievementmu" | "Your Achievements" |
| Locked state label | "Terkunci" | "Locked" |

---

## 12. Animations

| Animation | Trigger | Spec |
|---|---|---|
| Achievement unlock badge | Achievement just granted | Framer Motion spring: `scale 0→1`, `stiffness: 200`, `damping: 20`, 400ms |
| Achievement shimmer on hover | Mouse hover / focus on unlocked badge | CSS shimmer keyframe, 800ms, `overflow: hidden` |
| XP flash | Step marked complete | Framer Motion: `opacity 0→1→0`, `y -8→0→-16`, 1.5s total |
| Streak fire pulse | Always visible when streak ≥ 2 | CSS: `scale 1→1.15→1`, 1s `ease-in-out`, `infinite` |
| Toast entry | Achievement toast shown | Framer Motion: `x 100%→0`, `opacity 0→1`, 300ms `ease-out` |
| Badge shimmer CSS |  | `@keyframes shimmer { 0%{background-position:-200%} 100%{background-position:200%} }` linear gradient overlay |

---

## 13. Edge Cases & Error Handling

| Scenario | Handling |
|---|---|
| Achievement already unlocked | `onConflictDoNothing()` silently skips INSERT; no toast fires; no error |
| Race condition: two simultaneous completions | UNIQUE index on `(user_id, achievement_slug)` prevents duplicates at DB level; both requests succeed, only one INSERT lands |
| Achievement check throws DB error | Log error to console; do NOT fail the step completion response; achievement is granted on the next successful `checkAchievements` call for the same conditions |
| Streak update fails | Catch error; log; return current streak from DB as fallback; do not fail the entire `POST /api/progress/complete` |
| Streak > 30 days | Show `"30+ day streak 🔥🔥🔥"` with `BadgeWithDot color="error"`; streak counter continues incrementing normally |
| User deletes all progress | Achievements are **not** revoked (append-only). `first-step` stays unlocked. |
| Level with 0 steps configured | `getStepsForLevel()` returns empty array; level master check: `completedInLevel >= 0` would always be true — guard with `levelSteps.length > 0` before granting |
| `early-bird` slug | Schema row can be inserted; unlock check function skips it (returns early) with a `// P2: not implemented` comment |
| Multiple achievements at once | Queue toasts: show first, wait 500ms after dismiss, show next |

---

## 14. Performance

| Concern | Spec |
|---|---|
| Achievement check query | Target <100ms; indexed on `(user_id, achievement_slug)` and `(user_id, level)` on progress table |
| Achievement check blocking | Run **after** HTTP response is sent (fire-and-forget); never blocks step completion latency |
| Streak update | Runs synchronously inside the progress complete transaction; target <50ms (single UPDATE by primary key) |
| Achievement gallery page | TanStack Query, `staleTime: 60s`; refetch on window focus |
| Toast queue | In-memory array in client state (Zustand or component state); max 3 pending toasts to prevent spam |

---

## 15. Files to Create / Modify

| Path | Action | Notes |
|---|---|---|
| `/src/server/achievements.ts` | Create | `checkAchievements()` + `grantAchievement()` |
| `/src/server/streak.ts` | Create | `updateStreak()` |
| `/src/api/progress/complete.ts` | Modify | Call `updateStreak()` + fire `checkAchievements()` |
| `/src/db/schema.ts` | Modify | Add `xp`, `current_streak`, `last_activity_date` to users; add `achievements` table if not present |
| `/src/db/migrations/0006_gamification.sql` | Create | `ALTER TABLE users ADD COLUMN IF NOT EXISTS ...` |
| `/src/pages/profile.tsx` | Create | Achievement gallery + XP display + streak summary |
| `/src/components/application/achievement-gallery.tsx` | Create | Grid of unlocked/locked badges |
| `/src/components/application/achievement-toast.tsx` | Create | Toast wrapper with trophy icon and queue logic |
| `/src/components/application/xp-flash.tsx` | Create | Framer Motion XP badge animation |
| `/src/hooks/use-achievements.ts` | Create | TanStack Query hook for fetching user achievements |

---

## 16. Testing Checklist

- [ ] First step completion grants "Langkah Pertama" achievement
- [ ] First Kana step completion grants "Pelajar Suara" achievement
- [ ] Completing all Kana steps grants "Kana Master" badge
- [ ] "Kana Master" is NOT granted twice if completion endpoint called again (idempotent)
- [ ] Level master achievement fires for N5, N4, N3, N2 similarly
- [ ] 3-day streak grants "Api 3 Hari" badge on day 3 exactly
- [ ] 7-day streak grants "Api 7 Hari" badge on day 7 exactly
- [ ] Streak resets to 1 after a 2-day gap (skip 1 day)
- [ ] Streak stays unchanged when completing multiple steps on the same calendar day
- [ ] Achievement toast fires with correct Indonesian title
- [ ] Achievement toast has `aria-live="assertive"` attribute
- [ ] Multiple simultaneous achievements queue as sequential toasts
- [ ] Achievement gallery renders all 11 achievement slugs (10 active + 1 P2)
- [ ] Locked achievements show grayscale + lock icon
- [ ] Unlocked achievements show full color + unlock date
- [ ] XP flash "+10 XP" appears then fades after step completion
- [ ] XP total updates correctly after flash
- [ ] Streak badge hidden when streak < 2
- [ ] Streak badge shows "30+ day streak 🔥🔥🔥" at streak = 30+
- [ ] DB: `achievements` table has no duplicate rows after concurrent requests
- [ ] Achievement check failure does not cause step completion to return an error to the client

---

## Definition of Done

- [ ] `checkAchievements()` and `updateStreak()` functions implemented and tested
- [ ] All 10 active achievement slugs grantable via automated test
- [ ] Achievement toast visible in browser with correct copy
- [ ] XP flash animation fires on step completion
- [ ] Achievement gallery page accessible at `/profile` or `/achievements`
- [ ] Locked/unlocked states render correctly with all 11 slugs
- [ ] `0006_gamification.sql` migration runs cleanly on a fresh Neon branch
- [ ] No step completion latency regression (P95 < 400ms, same as Sprint 05)
- [ ] WCAG: achievement gallery keyboard-navigable, achievement toast announced via `aria-live`
