# Sprint 02 — Authentication Flow (Email OTP)

**Phase:** P0 — Launch
**Depends on:** Sprint 01 (users table must exist in Neon Postgres)
**Estimated effort:** 5-7 days
**Routes introduced:** `/auth/register`, `/auth/login`, `/auth/verify-otp`
**API endpoints introduced:** `POST /api/auth/send-otp`, `POST /api/auth/verify-otp`, `POST /api/auth/logout`, `GET /api/auth/session`

---

## 1. Overview

This sprint delivers the full email-only authentication system for Ippo. There are no passwords — users register and log in exclusively via a 6-digit OTP sent to their email. The implementation uses **Better Auth** for session management and **Resend** for email delivery.

On successful registration, all guest progress stored in `localStorage` (assessment results, completed steps, achievements) is migrated to the user's new database record, `localStorage` is cleared, and the user is redirected to their learning path. The auth flow must feel frictionless — Budi should complete registration in under 2 minutes; Siti should never feel confused about what just happened.

**Key outcomes of this sprint:**
- Guest users can create an account without a password
- Existing users can log back in via OTP
- `localStorage` progress is migrated to Neon Postgres on first registration
- Sessions persist across browser restarts (Better Auth cookie-based sessions)

---

## 2. Dependencies

| Dependency | Why Required | Status |
|---|---|---|
| Sprint 01 — `users` table | `INSERT INTO users` on registration | Must be done |
| Resend account + API key | Email delivery for OTP codes | Must be provisioned before dev |
| Better Auth installed + configured | Session creation and session reading | Must be configured in Sprint 02 |
| Neon Postgres connection string | All DB queries in auth routes | Carried from Sprint 01 |

**Environment variables required:**

```bash
RESEND_API_KEY=re_...
BETTER_AUTH_SECRET=...           # 32+ char random string
DATABASE_URL=postgresql://...    # from Sprint 01
VITE_APP_URL=http://localhost:5173
```

---

## 3. Relevant Personas

### Budi — The Motivated Visa Applicant
- Wants frictionless entry: sees "Daftar Gratis" → done in 2 minutes
- Expects his localStorage progress (completed 3 steps as a guest) to carry over automatically
- Will be confused if asked to "re-do" anything he already did as a guest
- **Key requirement:** Migration toast must fire and confirm progress was saved

### Siti — The Cautious Self-Learner
- Distrusts complex interfaces; needs every state to be clearly communicated
- Needs inline error messages in Indonesian, not generic "Something went wrong"
- Will not understand an OTP if the email copy is unclear — email template must explain what to do
- **Key requirement:** All error states must render Indonesian copy, no raw HTTP error messages

---

## 4. User Flows

### 4a. Registration Flow (New User)

```
[Trigger] User clicks "Daftar Gratis" CTA (from anywhere in app)
  ↓
Navigate to /auth/register

[Email Input Page — /auth/register]
  Display:
    - Heading: "Daftar untuk Sinkronisasi Progres"
    - Email input (type="email", placeholder "nama@email.com")
    - Name input (optional, placeholder "Nama kamu")
    - Language RadioGroup (Bahasa Indonesia | English, default from navigator.language)
    - CTA button: "Kirim Kode OTP" (disabled until email passes Zod validation)
    - Footer link: "Sudah punya akun? Masuk" → /auth/login

  User types email + clicks CTA
    ↓
  Client validates: Zod.string().email()
    ├─ INVALID → Show inline error "Email tidak valid" (red, 14px, below input)
    └─ VALID →
        ↓
      POST /api/auth/send-otp { email, name?, language? }
        ├─ 409 Duplicate → Show error "Akun sudah terdaftar. Coba Login"
        │                   + link to /auth/login
        ├─ 400 Invalid    → Show error "Email tidak valid"
        ├─ Network error  → Show error "Gagal mengirim kode. Cek koneksi." + retry button
        └─ 200 Success    →
            ↓
          Set button isLoading state
          Navigate to /auth/verify-otp?email={encoded_email}

[OTP Verification Page — /auth/verify-otp]
  Display:
    - Heading: "Masukkan Kode dari Email"
    - Sub: "Kami kirim ke b***@gmail.com" (masked email)
    - 6 individual digit input boxes (auto-advance, auto-submit on 6th digit)
    - Timer: "Kode berlaku dalam 9:45" (red when < 2 min remaining)
    - CTA: "Verifikasi Kode"
    - Resend: "Tidak terima kode? Kirim ulang" (disabled for 30s, shows countdown)
    - Back: "← Ganti Email" → navigate to /auth/register, clear OTP state

  User enters 6-digit code
    ↓
  Auto-submit on 6th digit
    ↓
  POST /api/auth/verify-otp { email, otp }
    ├─ 400 Expired  → Error "Kode sudah kadaluarsa. Kirim ulang"
    │                 + Enable resend immediately (skip 30s cooldown)
    ├─ 400 Mismatch → Error "Kode tidak valid. Coba lagi"
    │                 + Highlight all 6 boxes red + shake animation
    ├─ Network error → Error "Verifikasi gagal. Coba lagi." + retry
    └─ 200 Success  →
        ↓
      Server:
        1. INSERT INTO users { email, name, language, created_at }
        2. createSession() via Better Auth → set session cookie
        3. Return { success: true, user: User }
      ↓
      Client:
        1. Read localStorage (assessment_result, step_*, achievement_*)
        2. POST /api/progress/migrate with all local data
        3. localStorage.clear()
        4. Fire confetti animation (Framer Motion, 500ms)
        5. Show toast: "Selamat datang! Progres tersimpan."
        6. If migration had data: show second toast "Progres sebelumnya sudah disinkronisasi!"
        7. Navigate to /learning/[user_level] (from migrated assessment_result)
           or /learning if no assessment result exists
```

### 4b. Login Flow (Existing User)

```
[Trigger] User clicks "Sudah punya akun? Masuk" or navigates to /auth/login

[Login Page — /auth/login]
  Display:
    - Heading: "Masuk ke Akun"
    - Email input (type="email")
    - CTA: "Kirim Kode OTP" (disabled until valid email)
    - Footer link: "Belum punya akun? Daftar" → /auth/register

  User types email + clicks CTA
    ↓
  POST /api/auth/send-otp { email, mode: 'login' }
    ├─ 404 Not found → Error "Akun tidak ditemukan. Daftar baru?"
    │                  + link to /auth/register
    ├─ Network error → "Gagal mengirim kode. Cek koneksi."
    └─ 200 Success  →
        ↓
      Navigate to /auth/verify-otp?email={encoded_email}&mode=login

[OTP Verification — same page as registration]
  Difference: On success, no user creation or localStorage migration
    ↓
  POST /api/auth/verify-otp { email, otp, mode: 'login' }
    └─ 200 Success →
        1. createSession() via Better Auth
        2. Navigate to /learning/[user_level] or /learning
        3. Show toast: "Selamat datang kembali!" (no confetti — not a new account)
```

### 4c. Resend OTP Flow

```
User on /auth/verify-otp, 30 seconds have passed since OTP sent
  ↓
"Kirim ulang" button becomes enabled (countdown "Kirim ulang dalam {30-n}s" turns into active link)
  ↓
User clicks "Tidak terima kode? Kirim ulang"
  ↓
POST /api/auth/send-otp { email } (re-send, generates new OTP, invalidates old one)
  ├─ Network error → "Gagal mengirim ulang. Cek koneksi."
  └─ 200 Success  →
      - Show toast: "Kode baru dikirim ke {email}"
      - Reset 10-minute countdown timer
      - Restart 30-second resend cooldown
      - Clear all 6 OTP input boxes
      - Auto-focus box 1
```

### 4d. Change Email Flow

```
User on /auth/verify-otp, wants to fix email typo
  ↓
Clicks "← Ganti Email"
  ↓
Client:
  - Clear OTP input state (all 6 boxes emptied)
  - Clear timer state
  - Navigate to /auth/register (or /auth/login if in login mode)
  - Pre-fill email input with the previously entered email (so user only needs to fix it)

Note: Old OTP remains valid in server until expiry — no explicit invalidation needed.
The new OTP sent after correcting email will supersede it.
```

---

## 5. Functional Requirements

### Better Auth Configuration

Config file location: `/src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.VITE_APP_URL!,
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24,       // Refresh if > 1 day old
  },
});
```

### OTP Implementation

- **Generation:** `crypto.randomInt(100000, 999999).toString()` — always 6 digits
- **Hashing:** `bcrypt.hash(otp, 10)` before storing (never store plaintext OTP)
- **Storage:** Server-side session store or temporary DB table `otp_codes`:
  ```
  otp_codes(id, email, otp_hash, expires_at, used, created_at)
  ```
- **Expiry:** `now + 10 minutes` (set at generation time)
- **Validation:** `bcrypt.compare(incoming_otp, stored_hash)` + check `expires_at > now` + check `used = false`
- **Single use:** Mark `used = true` immediately after successful verification

### API Endpoints

| Endpoint | Method | Auth Required | Purpose |
|---|---|---|---|
| `/api/auth/send-otp` | POST | No | Send OTP to email (register or login) |
| `/api/auth/verify-otp` | POST | No | Verify OTP, create session |
| `/api/auth/logout` | POST | Yes | Destroy session |
| `/api/auth/session` | GET | No | Return current user or null |

---

## 6. API Contracts

### POST /api/auth/send-otp

**Request:**
```typescript
{
  email: string;       // required, must pass Zod email validation
  name?: string;       // optional, stored on user creation
  language?: 'id' | 'en'; // optional, defaults to 'id'
  mode?: 'register' | 'login'; // defaults to 'register'
}
```

**Response (200 OK):**
```typescript
{ success: true }
```

**Error responses:**

| HTTP Status | Error Code | Indonesian Message |
|---|---|---|
| 400 | `INVALID_EMAIL` | "Email tidak valid" |
| 409 | `EMAIL_EXISTS` | "Akun sudah terdaftar. Coba Login" |
| 404 | `USER_NOT_FOUND` | "Akun tidak ditemukan. Daftar baru?" |
| 500 | `SEND_FAILED` | "Gagal mengirim kode. Coba beberapa saat lagi." |

All error responses follow this shape:
```typescript
{
  error: string;       // machine-readable code e.g. "EMAIL_EXISTS"
  messageId: string;   // Indonesian human-readable message
}
```

---

### POST /api/auth/verify-otp

**Request:**
```typescript
{
  email: string;
  otp: string;         // 6-digit string e.g. "482910"
  mode?: 'register' | 'login';
}
```

**Response (200 OK):**
```typescript
{
  success: true;
  user: {
    id: string;
    email: string;
    name: string | null;
    language: 'id' | 'en';
    createdAt: string;  // ISO 8601
  };
}
```

**Error responses:**

| HTTP Status | Error Code | Indonesian Message |
|---|---|---|
| 400 | `OTP_EXPIRED` | "Kode sudah kadaluarsa. Kirim ulang" |
| 400 | `OTP_INVALID` | "Kode tidak valid. Coba lagi" |
| 400 | `OTP_USED` | "Kode sudah digunakan. Kirim ulang" |
| 404 | `USER_NOT_FOUND` | "Akun tidak ditemukan. Daftar baru?" |

---

### GET /api/auth/session

**Response (200 OK):**
```typescript
{
  user: {
    id: string;
    email: string;
    name: string | null;
    language: 'id' | 'en';
  } | null;
}
```

No auth required — returns `{ user: null }` for unauthenticated requests (never 401).

---

### POST /api/auth/logout

**Request:** No body required (reads session cookie).

**Response (200 OK):**
```typescript
{ success: true }
```

Destroys the Better Auth session and clears the session cookie.

---

## 7. State Management

### Auth Context Provider

Location: `/src/providers/auth-provider.tsx`

```typescript
type AuthContext = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  logout: () => Promise<void>;
};
```

- Wraps the entire app in `router-provider.tsx`
- On mount: calls `GET /api/auth/session` to hydrate user state
- `isLoading = true` during initial session fetch — prevents flash of unauthenticated UI
- After logout: sets `user = null`, clears session, navigates to `/`

### localStorage Migration on Registration

On successful OTP verification (register mode only):

```typescript
// Run immediately after session cookie is set
async function migrateLocalStorage(userId: string) {
  const keysToMigrate = [
    'assessment_result',
    'assessment_level',
    ...Object.keys(localStorage).filter(k => k.startsWith('step_')),
    ...Object.keys(localStorage).filter(k => k.startsWith('achievement_')),
  ];

  const payload = keysToMigrate.reduce((acc, key) => {
    const value = localStorage.getItem(key);
    if (value) acc[key] = JSON.parse(value);
    return acc;
  }, {} as Record<string, unknown>);

  if (Object.keys(payload).length > 0) {
    await fetch('/api/progress/migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, data: payload }),
    });
  }

  localStorage.clear(); // Always clear after migration attempt
}
```

---

## 8. UI/UX Specifications

### Component Mapping

| UI Element | Untitled UI Component | Notes |
|---|---|---|
| Email input | `Input` type="email" label="Email" | Full-width, 48px height, Zod validation |
| Name input | `Input` label="Nama" | Optional field, full-width |
| Language selector | `RadioGroup` with `Radio` items | "Bahasa Indonesia" / "English", default from `navigator.language` |
| OTP input boxes | 6× `Input` single-digit | `type="number"` `maxLength={1}`, auto-advance on input |
| OTP countdown timer | `Badge` color="warning" → color="error" | Switches color at < 2 min remaining |
| Submit button | `Button` color="primary" `isLoading` | Disabled until valid email; shows spinner when loading |
| Resend link | `Button` color="link-color" `isDisabled` | Shows "Kirim ulang dalam {n}s" when disabled |
| Toast notifications | `Toast` | Stacked; success green, error red |
| Confetti overlay | Framer Motion custom | Exception: no Untitled UI equivalent |
| Auth page links | `Button` color="link-color" href="..." | "Sudah punya akun? Masuk" etc. |

### Email Input Page Layout (`/auth/register` and `/auth/login`)

```
┌─ Page ─────────────────────────────────────┐
│                                            │
│  Daftar untuk Sinkronisasi Progres         │ ← h1, text-primary, 24px/700
│  (or "Masuk ke Akun" for login)            │
│                                            │
│  ┌─ Input ──────────────────────────────┐  │
│  │ Email                                │  │ ← label text-secondary
│  │ nama@email.com                       │  │ ← placeholder text-placeholder
│  └──────────────────────────────────────┘  │
│  ← Error: "Email tidak valid" (if any)     │ ← text-error-primary, 14px
│                                            │
│  ┌─ Input (register only) ─────────────┐  │
│  │ Nama (opsional)                     │  │
│  │ Nama kamu                           │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Bahasa (register only)                    │ ← RadioGroup label
│  ● Bahasa Indonesia  ○ English             │
│                                            │
│  ┌─ Button ─────────────────────────────┐  │
│  │  Kirim Kode OTP                     │  │ ← primary, full-width, 48px
│  └──────────────────────────────────────┘  │
│                                            │
│  Sudah punya akun? Masuk                   │ ← link-color button
│                                            │
└────────────────────────────────────────────┘
```

### OTP Verification Page Layout (`/auth/verify-otp`)

```
┌─ Page ─────────────────────────────────────┐
│                                            │
│  Masukkan Kode dari Email                  │ ← h1, text-primary, 24px/700
│  Kami kirim ke b***@gmail.com              │ ← text-tertiary, 16px
│                                            │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐           │ ← 6 digit boxes
│  │  │ │  │ │  │ │  │ │  │ │  │           │   44px wide × 56px tall
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘           │   8px gap
│                                            │
│  Kode berlaku dalam 9:45                   │ ← Badge warning → error < 2min
│                                            │
│  ┌─ Button ─────────────────────────────┐  │
│  │  Verifikasi Kode                    │  │ ← primary, full-width, 48px
│  └──────────────────────────────────────┘  │
│                                            │
│  Tidak terima kode? Kirim ulang            │ ← link-color, disabled 30s
│  (or "Kirim ulang dalam 28s" when cooling) │
│                                            │
│  ← Ganti Email                             │ ← link-color button
│                                            │
└────────────────────────────────────────────┘
```

---

## 9. All Microcopy

All primary copy is Indonesian. English equivalents are for developer reference only — they are not rendered in the UI.

| Key | Indonesian (rendered) | English (reference) |
|---|---|---|
| register_heading | Daftar untuk Sinkronisasi Progres | Sign up to sync your progress |
| login_heading | Masuk ke Akun | Sign into your account |
| email_label | Email | Email |
| email_placeholder | nama@email.com | nama@email.com |
| name_label | Nama (opsional) | Name (optional) |
| name_placeholder | Nama kamu | Your name |
| language_label | Bahasa | Language |
| send_otp_button | Kirim Kode OTP | Send OTP Code |
| otp_heading | Masukkan Kode dari Email | Enter the code from your email |
| otp_sent_sub | Kami kirim ke {email} | We sent it to {email} |
| timer_label | Kode berlaku dalam {time} | Code valid for {time} |
| verify_button | Verifikasi Kode | Verify Code |
| resend_label | Tidak terima kode? Kirim ulang | Didn't receive code? Resend |
| resend_cooldown | Kirim ulang dalam {n}s | Resend in {n}s |
| change_email | ← Ganti Email | ← Change Email |
| register_link | Sudah punya akun? Masuk | Already have an account? Sign in |
| login_link | Belum punya akun? Daftar | Don't have an account? Sign up |
| success_welcome | Selamat datang! Progres tersimpan. | Welcome! Progress saved. |
| success_return | Selamat datang kembali! | Welcome back! |
| migration_toast | Progres sebelumnya sudah disinkronisasi! | Previous progress synced! |
| error_duplicate | Akun sudah terdaftar. Coba Login | Account already exists. Try login |
| error_not_found | Akun tidak ditemukan. Daftar baru? | Account not found. Sign up? |
| error_invalid_email | Email tidak valid | Invalid email address |
| error_otp_expired | Kode sudah kadaluarsa. Kirim ulang | Code expired. Resend |
| error_otp_invalid | Kode tidak valid. Coba lagi | Code invalid. Try again |
| error_send_failed | Gagal mengirim kode. Cek koneksi. | Failed to send code. Check connection. |
| error_verify_failed | Verifikasi gagal. Coba lagi. | Verification failed. Try again. |
| new_code_sent | Kode baru dikirim ke {email} | New code sent to {email} |

---

## 10. Animations

All animations use Framer Motion. Do not use CSS transitions for these.

### Confetti on Successful Registration

```typescript
// Trigger: immediately after navigate() on successful new account creation
// Duration: 500ms burst, 1000ms fade
// Implementation: custom Framer Motion component; no Untitled UI equivalent

// Confetti particles: 50 small colored circles
// Colors: brand-solid, success-primary, warning-primary
// Animation: radiate from center, fade out while falling
```

### OTP Invalid Shake

```typescript
// Trigger: 400 OTP_INVALID response
<motion.fieldset
  animate={isInvalid ? { x: [-8, 8, -8, 8, 0] } : {}}
  transition={{ duration: 0.2, ease: "easeInOut" }}
>
```

All 6 input boxes also get `border-error` color applied.

### OTP Digit Box Focus

```css
/* Not Framer Motion — CSS is sufficient */
input:focus {
  transform: scale(1.05);
  border-color: var(--border-brand);
  transition: transform 100ms ease-linear, border-color 100ms ease-linear;
}
```

---

## 11. Responsive & Mobile Behavior

| Property | Mobile (< 640px) | Desktop (≥ 640px) |
|---|---|---|
| Input width | Full-width | max-w-sm, centered |
| Buttons | Full-width, 48px height | max-w-sm, centered |
| OTP boxes | 44px wide × 56px tall | Same |
| OTP gap | 8px | 8px |
| Page padding | 16px horizontal | 24px horizontal |
| Safe area bottom | `padding-bottom: env(safe-area-inset-bottom)` | N/A |

The email keyboard must open on mobile — `<input type="email">` triggers the correct keyboard on iOS and Android.

---

## 12. Accessibility

- All form inputs have associated `<label>` via `htmlFor` / `id` pairing
- `aria-live="polite"` on validation error containers (so screen readers announce errors without interrupting)
- `aria-live="polite"` on the OTP countdown timer region
- OTP inputs wrapped in `<fieldset>` with `<legend>Kode OTP (6 digit)</legend>`
- First OTP input box auto-focused on page load (`autoFocus` prop)
- Tab order through OTP boxes is natural (DOM order); auto-advance does not break tab focus
- Pressing Escape on `/auth/verify-otp` navigates back to the email input page
- Error messages are associated with inputs via `aria-describedby`
- `isDisabled` on the resend button sets `aria-disabled="true"` automatically (Untitled UI handles this)

---

## 13. Edge Cases & Error Handling

| Scenario | System Response |
|---|---|
| Invalid email format typed | Inline error "Email tidak valid" (below input, text-error-primary, 14px); button stays disabled |
| Email already registered (register mode) | 409 → toast + inline "Akun sudah terdaftar. Coba Login" + link to `/auth/login` |
| User not found (login mode) | 404 → toast + inline "Akun tidak ditemukan. Daftar baru?" + link to `/auth/register` |
| OTP expired (> 10 min) | "Kode sudah kadaluarsa. Kirim ulang" + resend button enabled immediately (bypass cooldown) |
| OTP mismatch | "Kode tidak valid. Coba lagi" + all 6 boxes → `border-error` + shake animation |
| Network failure sending OTP | "Gagal mengirim kode. Cek koneksi." + "Coba Lagi" retry button on page |
| Network failure verifying OTP | "Verifikasi gagal. Coba lagi." + retry; OTP boxes retain their values |
| Resend clicked during cooldown | Button is `isDisabled` (not possible to click); shows countdown text |
| User clicks "← Ganti Email" | Clear OTP state, navigate back, pre-fill email field with previous value |
| localStorage migration fails | Log error silently; do not block auth completion; `localStorage.clear()` still runs |
| Session already active on page load | Redirect to `/learning` or user's level — skip auth pages entirely |

**No OTP lockout in P0.** Unlimited attempts are allowed. Lockout / rate limiting is a P1 concern.

---

## 14. Resend Email Integration

| Property | Value |
|---|---|
| From | `noreply@ippo.jp` |
| Reply-To | `support@ippo.jp` |
| Subject | `Kode OTP Ippo Kamu: {code}` |
| Template | HTML email with 6-digit code in large, prominent type |
| Expiry note in email | "Kode ini berlaku selama 10 menit." |
| Free tier capacity | 3,000 emails/month — sufficient for ~500 users (500 OTP/month expected) |

**Environments:**

| Environment | Behavior |
|---|---|
| Development | Resend sandbox mode — no real emails sent; code logged to server console |
| Staging | Real Resend, restricted to `@yourdomain.com` test emails |
| Production | Full Resend, all emails delivered |

---

## 15. Performance Targets

| Action | Target |
|---|---|
| Button click → OTP email sent toast | < 1 second |
| OTP submit → session created → navigate | < 500ms |
| Session fetch on page load (`GET /api/auth/session`) | < 200ms |
| All buttons show `isLoading` state | Immediate (synchronous UI update) |

No blocking states — all async operations show loading UI. Never disable the entire page.

---

## 16. Testing Checklist

Before this sprint is considered done, all of the following must be manually verified:

- [ ] **Registration happy path:** New email → OTP email received → code entered → user created → session active → navigate to learning path
- [ ] **Login happy path:** Existing email → OTP received → code entered → session restored → navigate
- [ ] **Invalid email format:** "notanemail" → button stays disabled, inline error shown
- [ ] **Duplicate email:** Existing email on register route → 409 → "Akun sudah terdaftar" error + Login link
- [ ] **User not found:** Unknown email on login route → 404 → "Akun tidak ditemukan" error + Register link
- [ ] **OTP expiry:** Manually set `expires_at` to past → submit OTP → "Kode sudah kadaluarsa" error
- [ ] **OTP mismatch:** Enter wrong code → "Kode tidak valid" + all boxes red + shake animation
- [ ] **Resend cooldown:** Resend button disabled for 30s, shows countdown, re-enables after
- [ ] **Confetti animation:** Plays on successful new account creation (not on login)
- [ ] **localStorage migration:** Guest user with assessment_result and step_* keys → register → all migrated to DB → localStorage cleared
- [ ] **Migration toast:** "Progres sebelumnya sudah disinkronisasi!" toast fires when migration data was non-empty
- [ ] **"← Ganti Email" link:** Returns to email input, clears OTP, pre-fills previous email
- [ ] **Session persistence:** Log in, close browser, reopen → still logged in (30-day session)
- [ ] **Logout:** Session destroyed, user state cleared, redirected to `/`
- [ ] **Already authenticated:** Visiting `/auth/register` or `/auth/login` while logged in → redirect to `/learning`
- [ ] **`GET /api/auth/session` unauthenticated:** Returns `{ user: null }` (not 401)
