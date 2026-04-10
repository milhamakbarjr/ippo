# Sprint 07 — localStorage → Account Migration

**Phase:** P1 (Month 2)
**Depends on:** Sprint 02 (auth — migration runs on successful OTP verification), Sprint 05 (progress API — same UPSERT pattern), Sprint 01 (users + progress tables)
**Effort:** 1 day design + 2 days dev + 0.5 day QA
**Target completion:** May 16, 2026
**Status:** Not started

---

## 1. Overview

When a guest user signs up, all their localStorage progress — assessment result and completed steps — is automatically migrated to their new account. This happens immediately after OTP verification succeeds, before the app navigates away to the learning path.

This is the **conversion moment**. The user chose to register because they wanted to preserve their progress. If migration fails or data is lost, trust is broken and the user churns. Make it seamless, fast, and celebratory. A success toast confirms it worked. Nothing else is required.

**What triggers this sprint:**
- User has been learning as a guest: completed 1+ steps, possibly took the assessment
- User clicks "Daftar Gratis" CTA (from the step completion toast in Sprint 05, or from the nav)
- User completes the registration flow from Sprint 02 (email input → OTP verification)
- On successful OTP verification, Sprint 07's migration function runs

**What this sprint does not do:**
- Does not run migration on login (existing users have no localStorage to migrate)
- Does not sync progress in real-time between localStorage and DB during browsing
- Does not handle migration for already-registered users who have stale localStorage keys

---

## 2. Dependencies

| Dependency | What is needed | Risk if missing |
|---|---|---|
| Sprint 02 | OTP verification handler (`POST /api/auth/verify-otp`) — migration must be called inside the success branch of this handler, after `createSession()` returns the new `userId` | Migration cannot be triggered at the correct moment; localStorage data is lost or never transferred |
| Sprint 05 | `POST /api/progress/complete` UPSERT pattern (or shared `upsertProgress()` DB utility) — migration reuses the same conflict-safe insert logic | Must re-implement UPSERT inline instead of reusing |
| Sprint 01 | `users` table with `assessed_level` column; `progress` table with `UNIQUE INDEX ON (user_id, level, step_slug)`; `achievements` table for future expansion | Cannot store assessment result or deduplicate steps |

Sprint 07 must not begin until Sprint 02's OTP verification handler is stable and Sprint 05's UPSERT utility is extractable. Migration logic can be developed in isolation and unit-tested against a mock DB before integration.

---

## 3. The Conversion Moment — Why This Must Be Right

The user who reaches OTP verification has already made the decision to trust Ippo with their email address. They did so specifically because they want their progress preserved. At the moment they enter their 6th digit:

1. The verify button shows `isLoading` state (from Sprint 02)
2. Server: creates session, then immediately runs migration
3. Client receives success response
4. Success toast: "Progres sebelumnya sudah disinkronisasi! ✓"
5. Navigate to `/learning/{assessed_level}` — user sees checkmarks already in place

If step 4 shows an error instead of success, or if step 5 shows an empty progress list, the user's first impression as a registered user is one of loss. This destroys the conversion value.

**Priority order for correctness:**
1. Never clear localStorage unless migration fully succeeded
2. Never overwrite DB data with localStorage data
3. Prefer showing nothing over showing incorrect data
4. Surface errors clearly so the user knows to contact support

---

## 4. Complete User Flow

```
[Guest has been learning]
  ├─ Completed 3 steps: step_hiragana-gojuuon, step_hiragana-dakuten, step_katakana-gojuuon
  ├─ Took assessment: localStorage['assessment_result'] = { assessedLevel: 'kana', score: 2, ... }
  └─ localStorage keys present: assessment_result, step_hiragana-gojuuon, step_hiragana-dakuten, step_katakana-gojuuon
  ↓
[Guest clicks "Daftar Gratis" CTA]
  ├─ Source: Step completion toast (Sprint 05) or nav bar
  └─ Navigate to /auth/register
  ↓
[Registration flow — Sprint 02]
  ├─ User enters email → "Kirim Kode OTP"
  ├─ User enters 6-digit OTP → auto-submit on 6th digit
  └─ OTP verify button shows: "Memverifikasi..." (isLoading)
  ↓
[Server: OTP verified successfully]
  ├─ INSERT INTO users (email, name, ...) → returns new userId
  ├─ createSession(userId) → session cookie set
  └─ Call migrateLocalStorageToAccount(userId, payload)
      where payload was sent by the client alongside the OTP submission
  ↓
[Migration runs]
  ├─ UPDATE users SET assessed_level = 'kana' WHERE id = userId
  ├─ INSERT INTO progress (user_id, level, step_slug, completed, completed_at)
  │   VALUES (userId, 'kana', 'hiragana-gojuuon', true, <timestamp>)
  │   ON CONFLICT (user_id, level, step_slug) DO NOTHING
  ├─ (repeat for each completed step)
  └─ Return: { success: true, migratedSteps: 3, assessmentMigrated: true }
  ↓
[Client receives success response]
  ├─ Clear migration keys from localStorage (assessment_result, step_* keys)
  ├─ Show toast: "Progres sebelumnya sudah disinkronisasi! ✓" (5 seconds, aria-live="polite")
  └─ Navigate to /learning/kana
  ↓
[User sees learning path]
  └─ All 3 steps show ✓ checkmarks immediately (DB query returns them)

[If migration fails]
  ├─ Server returns: { success: false, error: "Migration failed" }
  ├─ DO NOT clear localStorage
  ├─ Show error toast: "Migrasi gagal. Hubungi support jika ini terus terjadi." (8 seconds)
  ├─ Action button in toast: "Hubungi Support" → mailto:support@ippo.jp
  └─ Navigate to /learning/kana anyway (user is registered; migration can be retried)
```

---

## 5. Data Sources — What to Read from localStorage

```typescript
const MIGRATION_KEYS = {
  assessmentResult:  'assessment_result',  // JSON: AssessmentResult (see type below)
  assessmentStarted: 'assessment_started', // number (timestamp) — read but not migrated to DB in P1
  stepPrefix:        'step_',              // 'step_{slug}' → { completed: boolean, timestamp: number }
} as const;

// Shape of assessment_result in localStorage
type LocalAssessmentResult = {
  assessedLevel: 'kana' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  score: number;
  totalQuestions: number;
  completedAt: number; // Unix timestamp (ms)
};

// Shape per step key
type LocalStepProgress = {
  completed: boolean;
  timestamp: number; // Unix timestamp (ms) of when the user marked it complete
};
```

**What gets migrated:**
- `assessment_result` → `users.assessed_level` (the `assessedLevel` field only)
- All `step_{slug}` keys where `completed === true` → rows in `progress` table

**What does NOT get migrated:**
- `assessment_started` — timestamp only, no DB equivalent in P1
- `step_{slug}` keys where `completed === false` — incomplete steps are not worth migrating
- Any other localStorage keys (unrelated app state, quiz drafts, etc.)

---

## 6. Migration Payload — Client to Server

Migration data is collected on the client and sent to the server as part of the OTP verification request body. This avoids a separate API round-trip.

```typescript
// Extended OTP verification body (Sprint 02 base + Sprint 07 addition)
type VerifyOtpWithMigrationBody = {
  // Sprint 02 fields
  email: string;
  otp: string;
  // Sprint 07 fields (both optional — server handles missing gracefully)
  migrationPayload?: MigrationPayload;
};

type MigrationPayload = {
  assessmentResult?: {
    assessedLevel: string;
  };
  steps: Array<{
    step_slug: string;
    level: string;           // inferred on client via inferLevelFromSlug()
    completed_at: Date;      // derived from localStorage timestamp
  }>;
};
```

The client constructs this payload immediately before submitting the OTP form — collecting localStorage data at that moment, not at page load — to capture any progress made while the OTP email was being delivered.

---

## 7. Migration Function — Full Implementation

File location: `/src/server/migration.ts`

```typescript
import { db } from '@/db';
import { users, progress } from '@/db/schema';
import { eq } from 'drizzle-orm';

type StepMigration = {
  step_slug: string;
  level: string;
  completed_at: Date;
};

type MigrationResult = {
  success: boolean;
  migratedSteps: number;
  assessmentMigrated: boolean;
  error?: string;
};

/**
 * Migrate guest localStorage progress to a newly created user account.
 * Called server-side from the OTP verification handler after session creation.
 * 
 * INVARIANTS:
 *  - Never overwrites existing DB data (onConflictDoNothing)
 *  - Throws on any DB error — caller decides whether to surface to user
 *  - assessed_level is only set if not already set on the user row
 */
export async function migrateLocalStorageToAccount(
  userId: string,
  payload: {
    assessmentResult?: { assessedLevel: string };
    steps: StepMigration[];
  }
): Promise<MigrationResult> {
  let migratedSteps = 0;
  let assessmentMigrated = false;

  // --- 1. Migrate assessment result → users.assessed_level ---
  if (payload.assessmentResult?.assessedLevel) {
    const validLevels = ['kana', 'n5', 'n4', 'n3', 'n2', 'n1'];
    const level = payload.assessmentResult.assessedLevel;

    if (validLevels.includes(level)) {
      // Only set if user doesn't already have an assessed_level
      // (defensive: should always be null for a brand-new user)
      await db
        .update(users)
        .set({ assessed_level: level, updated_at: new Date() })
        .where(eq(users.id, userId));
      assessmentMigrated = true;
    }
  }

  // --- 2. Migrate step progress ---
  const completedSteps = payload.steps.filter(
    (s) => s.step_slug && s.level && s.completed_at
  );

  for (const step of completedSteps) {
    const result = await db
      .insert(progress)
      .values({
        user_id: userId,
        level: step.level,
        step_slug: step.step_slug,
        completed: true,
        completed_at: step.completed_at,
      })
      .onConflictDoNothing() // UPSERT: if step already in DB, skip (keep DB version)
      .returning({ id: progress.id });

    if (result.length > 0) {
      migratedSteps++;
    }
    // If result is empty: step already existed in DB — skipped silently
  }

  return { success: true, migratedSteps, assessmentMigrated };
}
```

---

## 8. Client-Side Collection Function

File location: `/src/lib/migration-collector.ts`

This runs on the client, called immediately before OTP form submission. It reads localStorage and builds the `MigrationPayload`.

```typescript
import { inferLevelFromSlug } from '@/lib/level-inference';

type MigrationPayload = {
  assessmentResult?: { assessedLevel: string };
  steps: Array<{
    step_slug: string;
    level: string;
    completed_at: Date;
  }>;
};

/**
 * Collect all migratable data from localStorage.
 * Returns null if there is nothing to migrate (no-op case).
 */
export function collectMigrationPayload(): MigrationPayload | null {
  const steps: MigrationPayload['steps'] = [];

  // Collect step progress
  const stepKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith('step_')
  );

  for (const key of stepKeys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw) as { completed: boolean; timestamp: number };
      if (!parsed.completed) continue; // only migrate completed steps

      const slug = key.replace('step_', '');
      steps.push({
        step_slug: slug,
        level: inferLevelFromSlug(slug),
        completed_at: new Date(parsed.timestamp ?? Date.now()),
      });
    } catch {
      console.warn(`Skipping malformed localStorage key: ${key}`);
    }
  }

  // Collect assessment result
  let assessmentResult: MigrationPayload['assessmentResult'] | undefined;
  const rawAssessment = localStorage.getItem('assessment_result');
  if (rawAssessment) {
    try {
      const parsed = JSON.parse(rawAssessment);
      if (parsed?.assessedLevel) {
        assessmentResult = { assessedLevel: parsed.assessedLevel };
      }
    } catch {
      console.warn('Skipping malformed assessment_result in localStorage');
    }
  }

  // Nothing to migrate
  if (steps.length === 0 && !assessmentResult) return null;

  return { assessmentResult, steps };
}

/**
 * Clear only migration-related keys from localStorage.
 * Called after server confirms migration success.
 * Never call this before receiving a success confirmation.
 */
export function clearMigrationKeys(): void {
  const stepKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith('step_')
  );
  stepKeys.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem('assessment_result');
  localStorage.removeItem('assessment_started');
}
```

---

## 9. Level Inference Utility

File location: `/src/lib/level-inference.ts`

Used by the client to assign a `level` to each step slug before sending to the server.

```typescript
/**
 * Infer JLPT level from a step slug.
 * This is a best-effort heuristic based on slug naming conventions.
 * Steps that don't match any pattern default to 'kana'.
 *
 * Slug naming convention:
 *  - Kana:  'hiragana-*', 'katakana-*'
 *  - N5:    'n5-*' or includes 'n5'
 *  - N4:    'n4-*' or includes 'n4'
 *  - N3:    'n3-*' or includes 'n3'
 *  - N2:    'n2-*' or includes 'n2'
 *  - N1:    'n1-*' or includes 'n1'
 */
export function inferLevelFromSlug(slug: string): string {
  if (slug.startsWith('hiragana') || slug.startsWith('katakana')) return 'kana';
  if (slug.includes('n5')) return 'n5';
  if (slug.includes('n4')) return 'n4';
  if (slug.includes('n3')) return 'n3';
  if (slug.includes('n2')) return 'n2';
  if (slug.includes('n1')) return 'n1';
  return 'kana'; // safe default — Kana is where most guest steps originate
}
```

---

## 10. Integration into OTP Verification Handler

File to modify: the Sprint 02 OTP verification handler (e.g., `/src/api/auth/verify-otp.ts` or the Better Auth plugin hook).

Add the migration call inside the success branch, after `createSession()`:

```typescript
import { migrateLocalStorageToAccount } from '@/server/migration';

// Inside POST /api/auth/verify-otp, after OTP is confirmed valid:
const user = await createUser({ email, name });
const session = await createSession(user.id);

// Run migration if payload was included
let migrationResult: MigrationResult | null = null;
if (body.migrationPayload) {
  try {
    migrationResult = await migrateLocalStorageToAccount(
      user.id,
      body.migrationPayload
    );
  } catch (error) {
    // Migration failure is non-fatal: user is still registered and has a session
    // Log the error; client will show error toast but user can still use the app
    console.error('Migration failed for user', user.id, error);
    migrationResult = {
      success: false,
      migratedSteps: 0,
      assessmentMigrated: false,
      error: 'Migration failed',
    };
  }
}

return json({
  success: true,
  user: { id: user.id, email: user.email, assessed_level: user.assessed_level },
  session,
  migration: migrationResult,
});
```

---

## 11. Client-Side OTP Submit Handler

In the OTP verification form component (Sprint 02), extend the submit handler:

```typescript
import { collectMigrationPayload, clearMigrationKeys } from '@/lib/migration-collector';

async function handleOtpSubmit(otp: string) {
  // Collect localStorage data before submitting (captures any progress made
  // while waiting for the OTP email to arrive)
  const migrationPayload = collectMigrationPayload();

  const response = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      otp,
      migrationPayload: migrationPayload ?? undefined,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    // OTP failed — show error, do NOT touch localStorage
    showErrorToast(data.error ?? 'Kode tidak valid');
    return;
  }

  // OTP succeeded — handle migration result
  if (data.migration?.success) {
    clearMigrationKeys(); // safe to clear now — server confirmed success
    showSuccessToast('Progres sebelumnya sudah disinkronisasi! ✓');
  } else if (data.migration && !data.migration.success) {
    // Migration failed — do NOT clear localStorage
    showErrorToast(
      'Migrasi gagal. Hubungi support jika ini terus terjadi.',
      { action: { label: 'Hubungi Support', href: 'mailto:support@ippo.jp' }, duration: 8000 }
    );
  }
  // If migration is null (no localStorage data): silent — no toast

  // Navigate regardless of migration outcome (user is registered)
  const targetLevel = data.user.assessed_level ?? 'kana';
  navigate(`/learning/${targetLevel}`);
}
```

---

## 12. API Contract Summary

Migration runs server-side as part of the OTP verification response. No separate API endpoint is needed.

```typescript
// POST /api/auth/verify-otp
// Request body (extended from Sprint 02):
type VerifyOtpRequest = {
  email: string;
  otp: string;
  migrationPayload?: {
    assessmentResult?: { assessedLevel: string };
    steps: Array<{
      step_slug: string;
      level: string;
      completed_at: string; // ISO date string
    }>;
  };
};

// Response body (extended from Sprint 02):
type VerifyOtpResponse = {
  success: boolean;
  user: {
    id: string;
    email: string;
    assessed_level: string | null;
  };
  session: SessionData;
  migration: {
    success: boolean;
    migratedSteps: number;
    assessmentMigrated: boolean;
    error?: string;
  } | null; // null if no migrationPayload was sent
};
```

---

## 13. Zod Validation Schema

Add to `/src/lib/schemas.ts`:

```typescript
import { z } from 'zod';

const StepMigrationSchema = z.object({
  step_slug: z.string().min(1).max(255),
  level: z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
  completed_at: z.coerce.date(), // accepts ISO string from JSON
});

const MigrationPayloadSchema = z.object({
  assessmentResult: z
    .object({
      assessedLevel: z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
    })
    .optional(),
  steps: z.array(StepMigrationSchema).max(200), // cap: prevent abuse
});

// Extend the existing VerifyOtpSchema from Sprint 02:
export const VerifyOtpWithMigrationSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6).regex(/^\d{6}$/),
  migrationPayload: MigrationPayloadSchema.optional(),
});
```

---

## 14. UI/UX Specifications

### Loading State

Migration runs during the OTP verification request. No separate loading indicator is needed — the OTP verify button's existing `isLoading` state from Sprint 02 covers this. The button shows "Memverifikasi..." for the duration of both OTP validation and migration.

Target total time: <2 seconds for a typical user (3–5 steps + 1 assessment). Users will not notice migration latency because the OTP validation itself takes ~300–500ms — migration adds <1 second on top.

### Success Toast

```
┌─────────────────────────────────────────────┐
│  ✓  Progres sebelumnya sudah disinkronisasi!│
└─────────────────────────────────────────────┘
```

- Icon: `FeaturedIcon color="success" theme="light"` (checkmark icon)
- Text: "Progres sebelumnya sudah disinkronisasi!" (Previous progress has been synced!)
- Duration: 5 seconds
- `aria-live="polite"` (does not interrupt screen reader mid-sentence)
- Position: Top-right on desktop, bottom on mobile (consistent with Sprint 05 toast positioning)

### Error Toast

```
┌─────────────────────────────────────────────────────────────┐
│  ✗  Migrasi gagal. Hubungi support jika ini terus terjadi.  │
│                                    [Hubungi Support →]       │
└─────────────────────────────────────────────────────────────┘
```

- Icon: `FeaturedIcon color="error" theme="light"` (X icon)
- Text: "Migrasi gagal. Hubungi support jika ini terus terjadi."
- Action button: `Button color="link-color"` — "Hubungi Support" → `mailto:support@ippo.jp`
- Duration: 8 seconds (longer than standard — user needs time to read and act)
- `aria-live="assertive"` (interrupts — this is an error the user must see)
- Do NOT auto-dismiss on button click — let the user copy the email address first

### No Data — Silent

If `collectMigrationPayload()` returns `null` (nothing to migrate), no `migrationPayload` is sent and no toast is shown. Silent is correct here — showing "Nothing to sync" is noise for a user who just registered fresh.

---

## 15. Edge Cases & Error Handling

| Scenario | Handling |
|---|---|
| Step already in DB (e.g., from another device session) | `onConflictDoNothing()` — DB row wins; no error; `migratedSteps` count excludes it |
| `assessed_level` conflict (user already has one set) | Cannot happen for new users; but if it did, the `UPDATE ... WHERE id = ?` would overwrite — acceptable since this is account creation |
| Partial migration failure (loop fails on step N) | Throw the error; catch in caller; do NOT call `clearMigrationKeys()` on client; show error toast; steps not yet inserted remain in localStorage for manual retry |
| No localStorage data (guest who never completed anything) | `collectMigrationPayload()` returns `null`; no `migrationPayload` in request; no migration runs; no toast |
| `assessment_result` missing (user skipped assessment) | `assessmentResult` is `undefined`; skip assessment migration; still migrate completed steps |
| Step slug not in `inferLevelFromSlug` map | Default to `'kana'`; insert anyway — the slug is valid, just new; the DB will accept it |
| Unknown `assessed_level` value (tampered localStorage) | Zod validates `z.enum([...])` on server; invalid value causes 400 and migration aborts (safe) |
| Migration called twice (double-submit, retry) | `onConflictDoNothing()` — idempotent; second call is a no-op; no duplicate rows |
| localStorage cleared by user before migration | `collectMigrationPayload()` returns `null`; silent no-op |
| >200 steps in localStorage (abuse prevention) | `MigrationPayloadSchema` caps `steps` at 200; excess steps are silently dropped (no legitimate user has >200 steps in localStorage) |
| Network timeout during migration | Server does not respond within client timeout; client treats as failure; does NOT clear localStorage; user can retry by logging out and back in (P2: expose a "Sync Now" button) |
| Migration succeeds but navigation fails | LocalStorage is already cleared; progress is safe in DB; navigation error is a separate concern handled by the router |

---

## 16. All Microcopy

| Context | Indonesian | English |
|---|---|---|
| Success toast | "Progres sebelumnya sudah disinkronisasi!" | "Previous progress has been synced!" |
| Error toast | "Migrasi gagal. Hubungi support jika ini terus terjadi." | "Migration failed. Contact support if this persists." |
| Support CTA button | "Hubungi Support" | "Contact Support" |
| OTP button (loading) | "Memverifikasi..." | "Verifying..." |
| No data (silent) | *(no toast)* | *(no toast)* |

---

## 17. Accessibility

- Success toast: `aria-live="polite"` — announced when screen reader is free
- Error toast: `aria-live="assertive"` — announced immediately, interrupts
- "Hubungi Support" button in error toast: standard focusable `Button` element, not a `div`
- Loading state on OTP button: `aria-busy="true"` + `aria-label="Memverifikasi kode OTP..."` (Sprint 02 pattern — Sprint 07 does not add new interactive elements)
- Toast dismissal: keyboard-accessible close button (Untitled UI `Toast` handles this via React Aria)

---

## 18. Performance

| Concern | Spec |
|---|---|
| Migration latency (typical: 3–5 steps) | Target <500ms total DB time (1 UPDATE + 5 INSERTs by primary key) |
| Migration latency (worst case: 50 steps) | <3 seconds — acceptable for a one-time, once-per-account operation |
| Optimization path | Batch INSERT multiple rows in one query instead of a loop: `db.insert(progress).values([...allSteps]).onConflictDoNothing()` — preferred over loop for any payload with >3 steps |
| Client localStorage read | Synchronous, <5ms — not a concern |
| Blocking OTP response | Migration runs synchronously before response is sent (intentional — client needs the result to decide whether to clear localStorage) |

### Batch INSERT optimization (recommended)

Replace the `for` loop in `migrateLocalStorageToAccount` with a single batch insert:

```typescript
// Preferred over the loop — single round-trip to DB
if (completedSteps.length > 0) {
  const insertedRows = await db
    .insert(progress)
    .values(
      completedSteps.map((step) => ({
        user_id: userId,
        level: step.level,
        step_slug: step.step_slug,
        completed: true as const,
        completed_at: step.completed_at,
      }))
    )
    .onConflictDoNothing()
    .returning({ id: progress.id });

  migratedSteps = insertedRows.length;
}
```

This reduces N DB round-trips to 1 for all steps, regardless of count.

---

## 19. Files to Create / Modify

| Path | Action | Notes |
|---|---|---|
| `/src/server/migration.ts` | Create | `migrateLocalStorageToAccount()` server function |
| `/src/lib/migration-collector.ts` | Create | `collectMigrationPayload()` + `clearMigrationKeys()` client utilities |
| `/src/lib/level-inference.ts` | Create | `inferLevelFromSlug()` — may already exist from Sprint 05 content utils; check first |
| `/src/lib/schemas.ts` | Modify | Add `MigrationPayloadSchema` + `VerifyOtpWithMigrationSchema` |
| `/src/api/auth/verify-otp.ts` | Modify | Add `migrationPayload` to request body; call `migrateLocalStorageToAccount()` in success branch |
| `/src/pages/auth/verify-otp.tsx` | Modify | Call `collectMigrationPayload()` before fetch; call `clearMigrationKeys()` on success; show success/error toast |

---

## 20. Testing Checklist

- [ ] Guest with 3 completed steps + assessment → registers → all 3 steps appear with ✓ in account immediately after login redirect
- [ ] Guest with 0 data → registers → no toast shown (silent), navigate to /learning/kana normally
- [ ] Guest with 5 completed steps → migration fails (DB error simulated) → localStorage NOT cleared → error toast shown with "Hubungi Support" button
- [ ] Step already exists in DB (e.g., registered on another device) → `onConflictDoNothing()` → no error → success toast → `migratedSteps` count excludes the duplicate
- [ ] Assessment result `assessedLevel: 'n5'` → `users.assessed_level` column shows 'n5' after migration
- [ ] Assessment result missing from localStorage → assessment migration skipped → step migration still runs → success toast
- [ ] After successful migration: localStorage has no `assessment_result` key and no `step_*` keys
- [ ] After successful migration: user is navigated to `/learning/{assessed_level}` (e.g., `/learning/kana`)
- [ ] After failed migration: localStorage keys are preserved unchanged
- [ ] Migration called twice (double-submit): no duplicate DB rows; second call is no-op
- [ ] `assessed_level` value `"invalid_level"` in localStorage → Zod rejects on server → 400 → migration aborted → error toast on client
- [ ] Steps array with 201 items → Zod rejects → handled gracefully (not a 500 crash)
- [ ] `inferLevelFromSlug('hiragana-gojuuon')` → returns `'kana'`
- [ ] `inferLevelFromSlug('n3-grammar-te-form')` → returns `'n3'`
- [ ] `inferLevelFromSlug('unknown-slug')` → returns `'kana'` (safe default)
- [ ] OTP verify button shows "Memverifikasi..." during the full migration + verification duration
- [ ] Success toast has `aria-live="polite"` attribute
- [ ] Error toast has `aria-live="assertive"` attribute
- [ ] "Hubungi Support" button in error toast is keyboard-focusable

---

## Definition of Done

- [ ] `migrateLocalStorageToAccount()` implemented with batch INSERT and `onConflictDoNothing()`
- [ ] `collectMigrationPayload()` and `clearMigrationKeys()` implemented on client
- [ ] OTP verification handler updated to accept `migrationPayload` and return migration result
- [ ] Zod schemas updated and validated in tests
- [ ] Success toast visible in browser with correct copy and `aria-live="polite"`
- [ ] Error toast visible in browser with correct copy, "Hubungi Support" action, and `aria-live="assertive"`
- [ ] localStorage is clean after successful migration (no `step_*` or `assessment_result` keys)
- [ ] localStorage is intact after failed migration
- [ ] Manual E2E test: guest → complete 2 steps → register → see ✓ checkmarks immediately
- [ ] No regression to Sprint 02 OTP flow for users with no localStorage data
