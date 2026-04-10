# Ippo (一歩) — Main App PRD

**Document Version:** 1.0  
**Last Updated:** 2026-04-10  
**Status:** Ready for Development  
**Audience:** Engineering, Design, Product  

---

## 1. EXECUTIVE SUMMARY

### Core Value Proposition

Ippo is a **free, guided JLPT learning platform** that transforms scattered, overwhelming learning resources into a coherent, mobile-friendly roadmap. Indonesian learners preparing for Japan's mandatory JLPT N2 work visa exam face decision paralysis—no single platform combines structure, accessibility (free tier), bilingual support, and gamification. Ippo solves this by offering:

1. **Frictionless entry** — Browse all content without signup; learning path visible immediately
2. **Personalized guidance** — 5-minute assessment places users at appropriate level, recommends next steps
3. **Progress visibility** — Completion tracking, achievement badges, and visual momentum
4. **Curated external resources only** — No content licensing; link to trusted free sources (NHK World, Tae Kim, official samples)
5. **Mobile-native UX** — Designed for commuters; works offline via localStorage

**Target User Segment:**  
Primary: Indonesian workers/students (age 18-35, mobile-first, budget-conscious) seeking JLPT N2 certification for Japan work visa. Secondary: Intermediate/advanced learners (N3-N1) wanting structured review.

**Success Metrics (Post-Launch, 3-6 months):**

1. **User Acquisition:** 500+ unique users in month 1; 3000+ by month 6
2. **Engagement:** 40%+ complete assessment; 60%+ of assessment-takers visit learning path
3. **Progression:** 20%+ complete ≥3 steps in first month; 10% reach level completion
4. **Account Conversion:** 25%+ of browsers convert to registered users (tracked via localStorage → account migration)
5. **Retention:** 30% day-7 return rate; 15% day-30

**Launch Priority & Phasing:**

- **Phase 1 (P0 — Launch):** Assessment, Learning Path (UI only, no progress save), Hybrid Auth, basic responsiveness
- **Phase 2 (P1 — Month 2):** Practice Quizzes, Progress Tracking, Achievements, localStorage → account transfer
- **Phase 3 (P2 — Month 4+):** Advanced features (dark mode, spaced repetition, community, analytics dashboard)

---

## 2. USER PERSONAS & SCENARIOS

### Persona 1: "Budi" — The Motivated Visa Applicant

**Demographics:**
- Age: 26, Jakarta-based software engineer
- Education: Bachelor's degree in Computer Science
- Language: Native Indonesian, intermediate English, no prior Japanese
- Device: iPhone 12, occasional laptop access
- Motivation: Japan company job offer requires JLPT N2 in 6 months; currently earning salary, can afford premium courses but wants free option first

**Psychographics:**
- Goal-driven, impatient with inefficiency
- Values structured learning ("tell me what to do")
- Suspicious of unvetted resources
- Prefers mobile study during commute (40 min each way)
- Wants proof of progress (badges, milestones)

**Success Criteria:**
1. Quickly understand what level he is (assessment in <10 min)
2. See clear path to N2 with time estimates
3. Access resources without account friction
4. Track progress and celebrate milestones
5. Return to exact point of study across devices

**Frustration Points:**
- Scattered YouTube videos with no structure
- Paywalls after investing time
- Unclear which resource teaches what
- Mobile apps that don't work on poor WiFi
- No visible progress (time wasted?)

**Critical User Journey Map:**

```
START: Landing page (referral from job prep blog)
  ↓
  [DECISION] "Should I try this?"
    → "Yes, curious" → Browse vocab step (no signup)
    → "No, unclear" → Back to Google search (LOST)
  ↓
  [ACTION] Browse 3-4 steps without registering
  ↓
  [DECISION] "Worth investing time?"
    → "Yes, looks useful" → Click "Start Assessment"
    → "No, let me search more" → LOST
  ↓
  [ACTION] Complete 5-question assessment in 7 minutes
  ↓
  [SYSTEM] Assessment shows: "You're N5 level. Here's your path to N2: 4 weeks kana → 8 weeks N5 → ..."
  ↓
  [DECISION] "Should I sign up to track progress?"
    → "Yes, want badges" → Register via email OTP (2 min)
    → "Not yet, just browse" → Continue as guest (localStorage saves steps)
  ↓
  [ACTION] Complete Hiragana step (5 links → 3 YouTube videos, 2 flashcard sites)
  ↓
  [SYSTEM] Step marked complete; "Next: Katakana" shown; achievement "Sound Learner" unlocked
  ↓
  [SUCCESS] Registered user with progress saved; returns tomorrow
  ↓
  [OPTIONAL] Invite friend → Referral tracking (P2)
```

---

### Persona 2: "Siti" — The Cautious Self-Learner

**Demographics:**
- Age: 32, Surabaya, high school teacher with side gig
- Education: High school + online courses
- Language: Native Indonesian, basic English, some self-taught hiragana
- Device: Android phone (budget model, 3GB RAM), rare desktop access
- Motivation: Personal interest in Japanese culture; considering career pivot later; free only

**Psychographics:**
- Distrusts complex interfaces
- Prefers Indonesian language (limited English reading)
- Values incremental, bite-sized lessons
- Easily overwhelmed by too many choices
- Needs gentle encouragement (not competitive)

**Success Criteria:**
1. Understand content is in Indonesian (or has Indonesian help)
2. Do one small lesson today without thinking
3. See an achievement even for tiny progress
4. Know what to do next without reading instructions
5. Never feel lost or confused

**Frustration Points:**
- English-only interfaces
- Choices paralysis ("which resource do I click?")
- Cluttered screens with too much info
- Unclear what "progress" means
- Afraid of making "wrong" choices

**Critical User Journey Map:**

```
START: Friend says "ada aplikasi JLPT gratis, coba deh"
  ↓
  [DECISION] "Should I download app or open web?"
    → "Laptop tidak ada, buka via phone" → Mobile site
    → "Takut download aplikasi (storage)" → Web only ✓
  ↓
  [ACTION] Open site; sees "Belajar JLPT" headline + assessment button
  ↓
  [DECISION] "Ambil assessment atau browse dulu?"
    → "Browse dulu, saya takut salah" → Tap "Lihat pembelajaran" → Level menu
    → "Langsung ambil" → Tap "Mulai Assessment"
  ↓
  [ACTION] Browse Kana level; sees "Hiragana (Gojuuon)" with 3 checkboxes
  ↓
  [DECISION] "Klik mana dulu?"
    → "Yang pertama, pasti itu yang diperlukan" → Hiragana/Gojuuon step
  ↓
  [ACTION] Opens step → sees title, description, 2 links, checkbox
  ↓
  [SYSTEM] Links are: NHK World (in Indonesian), YouTube (clear title)
  ↓
  [ACTION] Clicks first link, learns 5 hiragana
  ↓
  [DECISION] "Tandai selesai?"
    → "Ya, saya sudah belajar" → Check box
  ↓
  [SYSTEM] Checkbox marked ✓; "Selamat! +5 XP" shows; "Berikutnya: Hiragana Dakuten"
  ↓
  [SUCCESS] Tomorrow: opens site → last step remembered → clicks checkbox → small dopamine hit
```

---

### Persona 3: "Yuki" — The Returning N3 Learner

**Demographics:**
- Age: 29, Bandung, freelance translator
- Education: Bachelor's, some Japanese language background (N3 certified 2 years ago)
- Language: Native Indonesian, fluent English, advanced (but rusty) Japanese
- Device: MacBook Pro + iPhone, desktop-primary
- Motivation: Preparing for N2 to increase freelance rates; structured review needed

**Psychographics:**
- Already familiar with learning structure
- Values efficiency and time optimization
- Wants to skip basics; jump to relevant content
- Appreciates advanced features (spaced repetition future)
- Motivated by clear metrics and comparison

**Success Criteria:**
1. Place at N3/N2 level immediately
2. Skip Kana/N5 content
3. See N3 progress vs N2 requirements
4. Track which grammar gaps exist
5. Estimate time to N2 readiness

**Frustration Points:**
- Being forced through beginner content
- Opaque algorithm (why this resource, not that?)
- No dark mode for late-night study
- Unclear mastery thresholds
- No community to compare progress

**Critical User Journey Map:**

```
START: LinkedIn post shares Ippo link + mentions "structured N3-N2 path"
  ↓
  [DECISION] "Worth trying vs Anki?"
    → "Yes, less friction" → Opens link
    → "No, Anki is fine" → LOST
  ↓
  [ACTION] Browses; immediately wants to assess level
  ↓
  [ACTION] Completes assessment in 4 minutes (skips hiragana Qs)
  ↓
  [SYSTEM] Shows: "You're N3 level. Path: 2 weeks N3 review → 12 weeks N2 → Goal!"
  ↓
  [DECISION] "Jump to N2 or review N3?"
    → "Review N3, rusty grammar" → Tap N3 level
    → "Go straight to N2" → Tap N2 level
  ↓
  [ACTION] Opens N3 level; sees grammar/kanji/vocab steps
  ↓
  [ACTION] Clicks "N3 Grammar" → sees 15 linked resources
  ↓
  [DECISION] "Too many choices; filter by?"
    → "Spaced repetition" (not available yet, but *wants*)
    → "Video only" (no filter, but uses browser find)
  ↓
  [ACTION] Clicks YouTube link → watches 8-minute video
  ↓
  [DECISION] "Mark done or come back?"
    → "Not yet, too much" → Leave unchecked
    → "Yes, learned" → Check
  ↓
  [ACTION] Signs up to track progress across devices
  ↓
  [SUCCESS] Returns 3x week; tracks N3 completion % alongside N2 preview
```

---

## 3. DETAILED USER FLOWS

### Flow 1: Happy Path — Onboarding → Assessment → Learning Path → Progress

```
[Initial State]
├─ User: New, no account, empty localStorage
├─ Device: Mobile (iOS Safari)
└─ Context: Arrived via organic search

[Step 1: Landing Page → Assessment Trigger]
  Trigger: User clicks "Mulai Belajar" (Start Learning) CTA
  Action: Navigate to /assessment
  System Response:
    ├─ Load assessment questions from onboarding-assessment.ts
    ├─ Show intro: "Cepat, gratis, no signup (5 menit)" 
    ├─ Show question 1 (multiple choice, 3-4 options)
    └─ localStorage.setItem('assessment_started', Date.now())
  Success State: Question 1 visible; timer shows ~5 min remaining

[Step 2: Assessment — Answer Questions]
  Trigger: User selects answer (tap option)
  Action (per question):
    ├─ Store: localStorage['assessment_q{n}'] = answer_id
    ├─ If question ≤ 4: Show progress bar (2/5 complete)
    ├─ If question = 5: Show submit button "Lihat Hasil"
    └─ Animate: Fade out question, fade in next (Framer Motion, 300ms)
  Success State: All 5 Q answered; submit button enabled

[Step 3: Assessment Results]
  Trigger: User taps "Lihat Hasil" button
  Action:
    ├─ Calculate score: count correct answers
    ├─ Map to JLPT level (0-1 → Kana, 2-3 → N5, etc.)
    ├─ Algorithm: 
    │   if (correct ≥ 4) level = "N5"
    │   if (correct ≥ 3) level = "Kana" → N5
    │   if (correct < 3) level = "Kana"
    ├─ Store: localStorage['assessment_level'] = level
    ├─ Store: localStorage['assessment_result'] = { level, score, timestamp }
    └─ Navigate to /assessment/result
  Success State: Result page shows level + recommended path

[Step 4: Assessment Result Page]
  State: Showing "/assessment/result"
  Display:
    ├─ Large heading: "Kamu level Kana! 🎉" (You're Kana level!)
    ├─ Sub: "3 dari 5 pertanyaan benar" (3 of 5 correct)
    ├─ Recommended path card:
    │   "Estimasi waktu ke N2: 6-8 bulan"
    │   "Step berikutnya: Hiragana Gojuuon"
    │   CTA: "Lihat Jalur Belajarmu" (View Your Path)
    ├─ Alternative: "Langganan (subscribe)" → future P1
    └─ Skip: "Jelajahi semua level" (Explore All Levels)
  User Action: Clicks "Lihat Jalur Belajarmu"
  System Response:
    ├─ Set sessionStorage['user_level'] = level (for "you are here" indicator)
    ├─ Navigate to /learning/[level] (e.g., /learning/kana)
    └─ Show learning path for that level
  Success State: User sees first level's learning path

[Step 5: Learning Path View]
  State: User at /learning/kana
  Display:
    ├─ Header: "Jalan Belajarmu ke N2" (Your Learning Path to N2)
    ├─ Breadcrumb: "Kana > Hiragana" or similar
    ├─ "Kamu di sini:" card showing current level
    │   "Estimasi: 6-8 bulan ke N2"
    ├─ Step list (linear):
    │   - Step 1: "Hiragana Gojuuon" [15 min]
    │   - Step 2: "Hiragana Dakuten-Youon" [10 min]
    │   - Step 3: "Katakana Gojuuon" [15 min]
    │   [and so on]
    ├─ For recommended step (Hiragana Gojuuon):
    │   "Berikutnya: Hiragana Gojuuon" [highlighted in coral]
    └─ CTA: "Mulai Step Ini" button
  User Action: Clicks step (any step, not just next)
  System Response:
    ├─ Navigate to /learning/[level]/[step-slug]
    ├─ Load content from vocabulary.ts, kanji.ts, etc.
    └─ Show step detail view
  Success State: Step detail page loaded

[Step 6: Step Detail — Resources & Completion]
  State: User at /learning/kana/hiragana-gojuuon
  Display:
    ├─ Title: "Hiragana Gojuuon"
    ├─ Description: "Belajar 46 hiragana dasar..."
    ├─ Estimated time: "15 menit"
    ├─ Resource links (2-3):
    │   1. [NHK World - Hiragana] (icon: globe)
    │   2. [YouTube - Hiragana Lesson] (icon: play)
    │   3. [Tae Kim - Hiragana] (icon: book)
    ├─ Action links:
    │   - Each link: tap → open in new tab
    │   - Mobile: uses target="_blank"
    ├─ Completion checkbox:
    │   "Selesai belajar step ini? ☐ Tandai Selesai"
    └─ Navigation:
    │   "← Kembali ke Jalur" | "Lanjut ke Step Berikutnya →"
  User Action 1: Clicks resource link
  System Response:
    ├─ Track: event('step:resource_click', { step_id, resource_index })
    ├─ Open URL in new tab
    └─ Stay on page
  User Action 2: Checks "Tandai Selesai" (Mark Complete)
  System Response:
    ├─ If no account:
    │   ├─ Store: localStorage['step_[slug]'] = { completed: true, timestamp }
    │   ├─ Show toast: "Selamat! Progres disimpan di browser ini. Buat akun untuk sinkronisasi ke perangkat lain."
    │   │   (Congrats! Progress saved locally. Create account to sync across devices.)
    │   └─ Animate checkbox + confetti (Framer Motion, 500ms)
    ├─ If authenticated:
    │   ├─ POST /api/progress/complete
    │   ├─ Body: { user_id, level, step_slug, completed_at }
    │   ├─ Zod schema: ProgressCompleteSchema
    │   ├─ DB: INSERT into progress table
    │   └─ Show toast: "Selamat! +10 XP. Berikutnya: Hiragana Dakuten-Youon"
    └─ Animate checkbox → show achievement badge if applicable
  Success State: 
    - Step marked complete (UI + storage)
    - User can navigate to next step or return to path

[Step 7: Return Visit (Next Day)]
  State: User returns to app; has account
  Device: Same iPhone
  System Response:
    ├─ Load /learning/kana
    ├─ Query progress: SELECT * FROM progress WHERE user_id = ? AND level = 'kana'
    ├─ Show:
    │   - Step 1 ✓ (checked icon)
    │   - Step 2 (empty checkbox)
    │   - "Berikutnya: Hiragana Dakuten-Youon" (highlighted)
    ├─ Streak indicator: "3-day streak! 🔥"
    └─ Achievement unlocked: "Hiragana Master" (after ≥5 steps completed)
  User continues learning from checkpoint
  Success State: Seamless return; progress visible; momentum maintained
```

---

### Flow 2: Edge Case — Skip Assessment, Jump to Specific Level

```
[Initial State]
├─ User: New or returning, wants to jump to N3
├─ Trigger: Direct URL /learning/n3 or "Langganan Semua Level" link

[Step 1: Access Without Assessment]
  User clicks: "Jelajahi semua level" on landing page
  OR: Bookmarks /learning/n3 directly
  System Response:
    ├─ Check sessionStorage['user_level']: undefined
    ├─ Do NOT force assessment
    ├─ Load /learning/n3 page directly
    └─ Show disclaimer: "Belum tahu level kamu? Coba Assessment" (small banner)
  Success State: N3 learning path visible; no friction

[Step 2: Browse Without "Recommended Next" Indicator]
  Display:
    ├─ Remove "Kamu di sini:" card (not assessed)
    ├─ Keep step list
    ├─ Add info banner (top): "💡 Belum ambil Assessment? Hasil Assessment membantu personalizen jalur."
    │   (💡 Haven't taken Assessment? It helps personalize your path.)
    └─ CTA: "Ambil Assessment Sekarang" (link)
  User Action: Browse or click resource
  System Response:
    ├─ Track: event('step:resource_click_unassessed', { level, step_id })
    └─ Normal resource flow
  Success State: User can learn without friction, but sees value of assessment

[Step 3: Complete Step Without Account]
  User checks "Tandai Selesai" without auth
  System Response:
    ├─ localStorage['step_n3-grammar'] = { completed: true, timestamp }
    ├─ Show toast + CTA: "Daftar sekarang untuk sinkronisasi di semua perangkat"
    │   (Register now to sync across all devices)
    └─ Button: "Daftar Gratis" → /auth/register
  Success State: Progress saved locally; conversion opportunity created
```

---

### Flow 3: Error Case — Network Failure During Quiz (P1)

```
[Initial State]
├─ User: Authenticated, on quiz page /quizzes/n5-vocab
├─ Network: WiFi drops or enters airplane mode

[Step 1: Quiz Answer Submission Fails]
  User clicks answer to question 3
  System Response:
    ├─ POST /api/quiz/answer → network timeout (5s)
    ├─ Catch error: NetworkError
    ├─ Do NOT submit answer to DB
    ├─ Show error toast: "Koneksi terputus. Cek internet kamu."
    │   (Connection lost. Check your internet.)
    ├─ Button 1: "Coba Lagi" (Retry)
    ├─ Button 2: "Simpan & Kembali" (Save & Exit)
    └─ Keep answer selected (don't lose input)
  User Action: Waits for WiFi; clicks "Coba Lagi"
  System Response:
    ├─ Retry POST /api/quiz/answer
    ├─ If success: show success toast; advance to next Q
    ├─ If fail again: show "Masih error. Kembali nanti?" + "Kembali Ke Beranda" button
    └─ Still store answer locally in sessionStorage for safety
  Success State: Quiz answer submitted or gracefully exited

[Step 2: Offline Indicator]
  If navigator.onLine = false:
    ├─ Show persistent banner (top): "📡 Offline Mode — jawaban akan disimpan saat online"
    │   (Offline Mode — answers will be saved when online)
    ├─ Disable submit buttons
    ├─ Allow reading quiz but not advancing
    └─ localStorage['offline_quiz_answers'] = { q1, q2, ... }
  User returns online:
    ├─ Banner disappears
    ├─ Show toast: "Online! Menyinkronkan..." (Online! Syncing...)
    ├─ POST /api/quiz/answer with all cached answers
    ├─ Show: "Sinkronisasi selesai! ✓"
  Success State: Data not lost; user continues seamlessly
```

---

### Flow 4: Mobile-Specific — Responsive Step Navigation

```
[Device: iPhone 13 mini, portrait, 375px wide]

[Step 1: Step Detail Page (Portrait)]
  Display:
    ├─ Top bar: "← Kembali" (back arrow, 48px touch target)
    ├─ Title: "Hiragana Gojuuon" (24px, bold)
    ├─ Description: Full width, wrap (14px, leading-relaxed)
    ├─ Resource links (stack vertically):
    │   - Link 1: "NHK World Hiragana" (full-width button, 48px height)
    │   - Link 2: "YouTube Lesson" (full-width button)
    │   - Link 3: "Tae Kim's Guide" (full-width button)
    ├─ Checkbox: "Tandai Selesai" (48px target)
    └─ Navigation buttons (stack):
    │   - "← Kembali ke Jalur" (full-width, secondary)
    │   - "Lanjut ke Step Berikutnya →" (full-width, primary)
  Responsive: All buttons ≥48px height (WCAG touch target)

[Step 2: Landscape (iPad, 1024px)]
  Display:
    ├─ Two-column layout:
    │   - Left (60%): Title, description, resources
    │   - Right (40%): Progress bar (vertical), estimated time, achievements
    ├─ Resource links: flex-wrap, 2 per row
    └─ Navigation buttons: inline (left + right side-by-side)
  Responsive: Smooth transition via CSS container queries (if supported)

[Step 3: Swipe Navigation (Mobile Gesture)]
  FUTURE (P2): Implement swipe-to-next-step on mobile
  ├─ Gesture: Swipe right → previous step
  ├─ Gesture: Swipe left → next step
  ├─ Framer Motion: useGestureHandlers({ onDragEnd })
  ├─ Feedback: Snap animation, 400ms
  └─ Fallback: Always keep buttons visible for non-gesture users

[Step 4: Safe Area (Notch/Dynamic Island)]
  For iPhone 14 Pro+:
    ├─ Top bar respects safe-area-inset-top
    ├─ Bottom nav respects safe-area-inset-bottom
    ├─ Use: padding-top: env(safe-area-inset-top)
    └─ All touch targets maintain 48px even with safe area
```

---

### Flow 5: Authentication — Email OTP Registration

```
[Initial State]
├─ User: Guest, wants to create account
├─ Trigger: Clicks "Daftar Gratis" CTA (anywhere in app)

[Step 1: Email Input]
  Navigate to /auth/register
  Display:
    ├─ Form heading: "Daftar untuk Sinkronisasi Progres"
    │   (Sign up to sync your progress)
    ├─ Email input field:
    │   - Placeholder: "nama@email.com"
    │   - Type: email (triggers numeric keyboard on mobile)
    │   - Validation: Zod EmailSchema
    ├─ Name input (optional):
    │   - Placeholder: "Nama kamu"
    │   - Optional: yes
    ├─ Language selector (optional):
    │   - Radio: "Bahasa Indonesia" | "English"
    │   - Default: from browser lang or localStorage
    └─ CTA: "Kirim Kode OTP" button (disabled until valid email)
  User Action: Types email, clicks CTA
  System Response:
    ├─ Validate email: Zod.string().email()
    ├─ If invalid: Show error "Email tidak valid" (red text, 14px)
    ├─ If valid:
    │   ├─ Check: SELECT * FROM users WHERE email = ?
    │   ├─ If exists: error "Akun sudah terdaftar. Coba Login" 
    │   │   (Account already exists. Try login)
    │   ├─ If new: 
    │   │   ├─ Generate OTP: 6-digit random
    │   │   ├─ Store: session store { email, otp_hash, otp_expires_at (now + 10min) }
    │   │   ├─ Send email via Resend:
    │   │   │   Subject: "Kode OTP Ippo: {otp}" 
    │   │   │   Template: OTP validation email (HTML)
    │   │   │   From: noreply@ippo.jp
    │   │   ├─ Navigate to /auth/verify-otp
    │   │   └─ Show OTP input page
    │   └─ Analytics: event('auth:email_submitted', { email_domain })
  Success State: OTP email sent; user sees verification page

[Step 2: OTP Verification]
  State: /auth/verify-otp
  Display:
    ├─ Heading: "Masukkan Kode dari Email"
    │   (Enter the code from your email)
    ├─ Sub: "Kami kirim ke {email_masked}" (We sent it to...)
    ├─ 6-digit input field:
    │   - Separate boxes (1 digit each) OR single field
    │   - Type: number
    │   - Auto-focus first box
    │   - Auto-advance to next box on digit entry
    ├─ Timer: "Kode berlaku dalam 9:45" (Code expires in...)
    │   - Color red when <2 min
    ├─ CTA: "Verifikasi Kode"
    ├─ Fallback: "Tidak terima kode? Kirim ulang" (link, disabled until 30s passed)
    └─ Cancel: "← Ganti Email"
  User Action 1: Enters 6-digit OTP
  System Response:
    ├─ On completion of 6th digit: auto-submit
    ├─ POST /api/auth/verify-otp { email, otp }
    ├─ Validate: OTP matches stored hash AND not expired
    ├─ If invalid: Show error "Kode tidak valid" + "Coba lagi"
    ├─ If expired: Show error "Kode sudah kadaluarsa. Kirim ulang" 
    ├─ If valid:
    │   ├─ Create user: INSERT INTO users { email, name, language, created_at }
    │   ├─ Set session: createSession() from Better Auth
    │   ├─ Migrate localStorage → account:
    │   │   ├─ SELECT assessment_level, step_*, achievement_* from localStorage
    │   │   ├─ UPSERT into progress, achievements tables
    │   │   ├─ localStorage.clear()
    │   │   └─ Toast: "Progres sebelumnya sudah disinkronisasi!"
    │   ├─ Navigate to /learning/[user_level] or dashboard
    │   └─ Analytics: event('auth:user_created')
    └─ Show confetti animation (Framer Motion)
  User Action 2: Clicks "Kirim Ulang"
  System Response:
    ├─ Button disabled for 30s (countdown timer)
    ├─ Generate new OTP
    ├─ Re-send email
    ├─ Show toast: "Kode baru dikirim ke {email}"
  Success State: User authenticated; session created; progress migrated

[Step 3: Existing User Login]
  ALTERNATIVE: User has account, clicks "Masuk" instead
  Navigate to /auth/login
  Display:
    ├─ Form heading: "Masuk ke Akun"
    │   (Sign into your account)
    ├─ Email input
    ├─ CTA: "Kirim Kode OTP"
  System Response:
    ├─ Validate: SELECT user WHERE email = ?
    ├─ If not found: Show error "Akun tidak ditemukan. Daftar baru?" 
    │   (Account not found. Sign up new?)
    ├─ If found: Generate OTP (same as above)
    ├─ Send email
    ├─ Navigate to /auth/verify-otp
    ├─ Hide "Ganti Email" link (user already has account)
    └─ Analytics: event('auth:login_attempt')
  Success State: OTP sent; proceeds to verification
```

---

## 4. FEATURE SPECIFICATIONS

### Feature A: Onboarding Level Assessment

#### A.1 Functional Requirements

**Purpose:**  
Determine user's current JLPT level (Kana, N5, N4, N3, N2, N1) in <10 minutes without signup. Results stored in localStorage and synced to account if user registers. Guide user to appropriate learning path.

**Input Validation:**
```typescript
// Type definitions
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
  answeredAt: number;
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
  completedAt: number;
};
```

**Business Logic:**

1. **Question Selection:** Assessment consists of 5-7 progressive questions:
   - Q1: Hiragana recognition (basic, all can answer)
   - Q2: Katakana recognition (most can answer)
   - Q3: JLPT N5 vocab (filters kana-only learners)
   - Q4: JLPT N4 grammar (filters N5-only learners)
   - Q5: JLPT N3 kanji (filters N4-only learners)
   - Q6-7: N2+ content (optional, for advanced)

2. **Scoring Algorithm:**
```typescript
function calculateLevel(responses: AssessmentResponse[], questions: AssessmentQuestion[]): AssessmentResult {
  let correctCount = 0;
  const categoryScores = { kana: 0, vocab: 0, grammar: 0, kanji: 0 };
  
  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId);
    const selectedOption = question.options.find(o => o.id === response.selectedOptionId);
    
    if (selectedOption?.isCorrect) {
      correctCount++;
      categoryScores[question.category]++;
    }
  });
  
  const levelMap = {
    0: 'kana',      // 0 correct
    1: 'kana',      // 1 correct
    2: 'kana',      // 2 correct → recommend Kana, then N5
    3: 'n5',        // 3 correct
    4: 'n4',        // 4 correct
    5: 'n3',        // 5 correct
    6: 'n2',        // 6 correct
    7: 'n1',        // 7 correct
  };
  
  return {
    assessedLevel: levelMap[Math.min(correctCount, 7)] as AssessmentResult['assessedLevel'],
    score: correctCount,
    totalQuestions: responses.length,
    categoryBreakdown: categoryScores,
    completedAt: Date.now(),
  };
}
```

3. **Storage:**
   - **Unauthenticated:** localStorage['assessment_result'] = JSON.stringify(AssessmentResult)
   - **Authenticated:** INSERT INTO quiz_results { user_id, quiz_slug: 'onboarding_assessment', level: null, score, total_questions, completed_at }

**Processing Flow:**
1. Load questions from `/src/content/onboarding-assessment.ts`
2. Present questions one-at-a-time
3. Track responses in sessionStorage['assessment_answers'] (array of responses)
4. On completion, calculate level
5. Store result in localStorage + sessionStorage
6. Navigate to /assessment/result

**Outputs/Data Structure:**
```typescript
// API Response (if assessed user later creates account)
type AssessmentResultPayload = {
  user_id: string;
  assessed_level: string;
  score: number;
  total_questions: number;
  category_breakdown: Record<string, number>;
  completed_at: Date;
  transferred_from_local: boolean; // true if migrated from localStorage
};
```

**State Management:**
- **Zustand store** (client-side):
  ```typescript
  create<AssessmentStore>((set) => ({
    currentQuestion: 0,
    answers: [],
    startTime: null,
    assessedLevel: null,
    setAnswer: (questionId, optionId) => set(...),
    advance: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
    submit: async () => { /* calculate + store */ },
    reset: () => set({ currentQuestion: 0, answers: [], assessedLevel: null }),
  }))
  ```
- **localStorage**: Full result persisted across sessions
- **sessionStorage**: Temporary answers during assessment

**API Contracts:**
```typescript
// POST /api/assessment/submit (for authenticated users, optional)
// Body: AssessmentResultPayload
// Response: { success: boolean; assessedLevel: string }
```

---

#### A.2 UX/UI Specifications

**Components Used:**
- Untitled UI only — no custom components; compose layouts using `Card`, `RadioGroup`, `ProgressBar`, `Button`, `FeaturedIcon`

**Visual Hierarchy:**
1. **Question Card** (primary focus):
   - Background: `bg-primary`
   - Border: 1px solid `border-secondary`
   - Padding: 24px
   - Shadow: 0 2px 4px rgba(0,0,0,0.05)

2. **Question Text**:
   - Font size: 18px (mobile) / 20px (desktop)
   - Weight: 600 (semibold)
   - Color: `text-primary`
   - Line height: 1.5
   - Margin bottom: 24px

3. **Options (Radio Buttons)**:
   - Each option: 56px height (touch target)
   - Font: 16px, 400 weight
   - Color: `text-primary` (text), `fg-quaternary` (unselected radio)
   - Selected: radio color `text-brand-secondary`, text bold
   - Hover: background `bg-primary_hover`
   - Focus: outline 2px solid `border-brand`, offset 2px
   - Spacing: 12px between options

4. **Progress Indicator**:
   - Position: top of card
   - Style: Linear progress bar (Untitled UI `ProgressBar`)
   - Color: `fg-brand-primary`
   - Height: 4px
   - Text below: "2 dari 5" (2 of 5)
   - Font: 12px, 500 weight, `text-tertiary`

5. **Microcopy (Indonesian + English):**
```
Primary: "Pilih jawaban yang paling tepat" (Choose the most correct answer)
Button: "Lanjut" (Next)
On complete: "Lihat Hasil" (View Results)
Heading: "Penilaian Level Kamu" (Your Level Assessment)
Subheading: "Cepat, gratis, tanpa perlu daftar (5 menit)" (Fast, free, no signup needed)
```

6. **Animations (Framer Motion):**
```typescript
// Question entry
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {question}
</motion.div>

// Option selection feedback
<motion.div
  animate={selected ? { scale: 1.02 } : { scale: 1 }}
  transition={{ duration: 0.2 }}
>
  {option}
</motion.div>

// Result page entry
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  {resultCard}
</motion.div>
```

7. **Keyboard Accessibility:**
   - Tab through options
   - Space/Enter to select
   - Tab to "Lanjut" button, Enter to advance
   - Escape to exit (modal mode if applicable)
   - Focus indicator: 2px coral outline

8. **Mobile Touch:**
   - Touch targets: 56px minimum height
   - Tap ripple effect (Framer Motion, 200ms)
   - No hover states on touch devices (detect via media query)
   - Portrait optimal; landscape supported via flex-col to flex-row

---

#### A.3 Edge Cases & Error Handling

**Scenario 1: User Closes Assessment Midway**
- Trigger: User navigates away from /assessment before completion
- System:
  - Save partial responses to localStorage['assessment_answers_draft']
  - On return to /assessment, offer: "Lanjutkan penilaian? (Resume assessment?)" + "Mulai Baru (Start Over)"
  - If resume: Restore sessionStorage + show next unanswered question
  - If start over: Clear draft, begin fresh

**Scenario 2: All Answers Correct (Score 5/5)**
- Result: "Selamat! Kamu sudah siap N3. Lanjut ke N2? (Congratulations! You're N3-ready. Move to N2?)"
- Display path starting at N2, with option to review N3 or jump straight to N2

**Scenario 3: All Answers Wrong (Score 0/5)**
- Result: "Jangan khawatir! Mulai dari Kana step-by-step. Kamu pasti bisa! (Don't worry! Start from Kana step-by-step. You got this!)"
- Display: Kana level with encouragement
- Offer: "Coba lagi penilaian?" (Try assessment again?)

**Scenario 4: localStorage Full (quota exceeded)**
- Catch: QuotaExceededError on attempt to save
- Show: "Penyimpanan lokal penuh. Hapus browser cache atau gunakan private mode. (Local storage full. Clear cache or use private mode.)"
- Offer: "Daftar sekarang untuk sinkronisasi cloud (Sign up now to sync to cloud)"
- Fallback: sessionStorage only (lost on refresh)

**Scenario 5: Invalid Question Data**
- If question missing options: Skip silently, log error
- If assessment.ts file missing: Show error page "Konten assessment sedang dimuat. Coba beberapa saat lagi. (Assessment loading. Try again in a moment.)"

---

#### A.4 Performance & Technical Constraints

**Load Time:** <1.5s from landing page to first question visible
- Pre-load onboarding-assessment.ts at app boot
- Use React.lazy + Suspense for assessment page component
- Assessment questions as static JSON (no DB query)

**Interaction Speed:** <200ms from tap/click to next question visible
- Zustand state update: instant
- Animation duration: 300ms (visible, not blocking)
- No network requests until submit

**TanStack Query Caching:**
```typescript
// Not used for assessment (offline-first)
// If future version fetches questions from API:
const { data: questions } = useQuery({
  queryKey: ['assessment', 'questions'],
  queryFn: () => fetch('/api/assessment/questions').then(r => r.json()),
  staleTime: 1000 * 60 * 60, // 1 hour
  gcTime: 1000 * 60 * 60 * 24, // 24 hours
});
```

**Code Splitting:**
- Assessment page: separate chunk `assessment.{hash}.js`
- Loaded on demand from /assessment route

**Browser Matrix:**
- iOS Safari 14+: ✓ (full support)
- Chrome 90+: ✓
- Firefox 88+: ✓
- Samsung Internet 14+: ✓
- No IE11 support

**Device Matrix:**
- iPhone 12/13: ✓
- Android 10+: ✓
- iPad (5th gen+): ✓
- Older Android (2GB RAM, slow 3G): Acceptable (may take 3-4s)

**Offline:** Fully functional offline (all data cached)

---

### Feature B: Guided Learning Path

#### B.1 Functional Requirements

**Purpose:**  
Display hierarchical, linear learning structure. Each level contains 5-8 steps. Users see "You are here" indicator, recommended next step, and access to all steps. Steps contain title, description, 2-3 curated external links, and estimated time. No gating; all levels/steps unlocked.

**Input Validation:**
```typescript
type Step = {
  slug: string;          // 'hiragana-gojuuon'
  title: string;         // 'Hiragana Gojuuon'
  titleEn?: string;
  description: string;   // 'Belajar 46 hiragana dasar...'
  descriptionEn?: string;
  estimatedMinutes: number; // 15
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

// User's progress for a step
type StepProgress = {
  user_id: string;
  level: string;
  step_slug: string;
  completed: boolean;
  completed_at?: Date;
};
```

**Business Logic:**

1. **Level Access**: All levels accessible; no prerequisites
2. **Recommended Path:**
   - If assessed: Show assessment_level's steps + next level preview
   - If not assessed: Show all levels equally; prompt assessment
3. **Step Ordering**: Linear (index 0 → 1 → 2...), no branching
4. **Completion Tracking:**
   - Unauthenticated: localStorage['step_[slug]'] = { completed: true, completed_at }
   - Authenticated: INSERT/UPDATE progress table
5. **Progress Aggregation:**
   - Steps completed per level: COUNT(completed=true) / total_steps
   - Overall progress: SUM all levels / SUM all steps

**Processing Flow:**
```
User navigates to /learning/[level]
  ↓
Load level config from /src/content/[level]/index.ts
  ↓
If authenticated: Query DB for progress WHERE user_id = ? AND level = ?
  ↓
Merge: { steps[], completed_steps[] }
  ↓
Render: Level path with completion indicators
```

**Data Structure (DB Schema):**
```typescript
// Existing table: progress
type Progress = {
  id: string;
  user_id: string;
  level: string;        // 'kana', 'n5', etc.
  step_slug: string;    // 'hiragana-gojuuon'
  completed: boolean;
  completed_at?: Date;
  created_at: Date;
  updated_at: Date;
};

// Zod validation
const ProgressSchema = z.object({
  user_id: z.string().uuid(),
  level: z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
  step_slug: z.string().min(1),
  completed: z.boolean(),
  completed_at: z.date().optional(),
});
```

**API Contracts:**
```typescript
// GET /api/learning/[level]/progress
// Response:
{
  level: "kana";
  totalSteps: 8;
  completedSteps: 3;
  steps: Array<{
    slug: string;
    title: string;
    completed: boolean;
  }>;
  recommendedNextStep?: string;
}

// POST /api/progress/complete
// Body:
{
  user_id: string;
  level: string;
  step_slug: string;
}
// Response:
{
  success: boolean;
  completed_at: Date;
  levelProgress: { completed: number; total: number };
  nextStep?: string;
  achievementUnlocked?: { slug: string; title: string };
}
```

---

#### B.2 UX/UI Specifications

**Layout (Mobile 375px):**
```
┌─ Top Bar ─────────────────┐
│ ← Jalan Belajarmu ke N2   │ (breadcrumb: Kana > Hiragana)
└───────────────────────────┘
┌─ "Kamu di sini" Card ──────┐
│ Kamu di sini: KANA        │
│ Estimasi: 6-8 bulan       │
│ Steps selesai: 1 dari 8   │
└───────────────────────────┘
┌─ Step List ────────────────┐
│ BERIKUTNYA (Coral bar)    │
│ • Hiragana Gojuuon [15m]  │
│   "Mulai Step Ini" button  │
│                           │
│ • Hiragana Dakuten [10m]  │
│                           │
│ • Katakana Gojuuon [15m]  │
│ [etc.]                    │
└───────────────────────────┘
```

**Components:**
- **Level Header**: Title + breadcrumb + description
- **"You Are Here" Card** (only if assessed):
  - Background: #2EC4B6 (teal), 10% opacity
  - Border left: 4px #2EC4B6
  - Icon: ✨ (sparkle emoji) + "Kamu di sini"
  - Text: "Estimasi waktu: 6-8 bulan" (14px, secondary color)
  - Progress bar: linear, 4px height, #2EC4B6 fill, #E5E7EB background
  - Percentage: "1 dari 8 steps (12%)" (12px, secondary)
  - CTA: "Ambil Assessment Ulang" (optional, secondary button)

- **Step Items**:
  - Layout: flex, column on mobile / row on desktop
  - Recommended step: Coral left border (4px), coral badge "Berikutnya"
  - Non-recommended: Regular border (#E5E7EB)
  - Content:
    ```
    [Completion checkbox or ✓] 
    "Hiragana Gojuuon" (bold, 16px)
    "15 menit" (secondary, 14px)
    "Mulai Step Ini" button (secondary style)
    ```
  - Touch target: 64px height minimum
  - Spacing: 12px between steps

- **Typography:**
  ```
  Heading 1: 28px, 700, navy
  Heading 2: 20px, 600, navy
  Body: 16px, 400, #4B5563 (gray)
  Label: 12px, 600, #9CA3AF (light gray)
  ```

- **Colors:**
  - Primary CTA: #FF6B35 (coral)
  - Recommended highlight: #FF6B35 + #FFD166 (golden badge)
  - Completed: #2EC4B6 (teal) + ✓ icon
  - Disabled/future: #D1D5DB (light gray)

- **Microcopy:**
  ```
  "Kamu di sini" (You are here)
  "Berikutnya" (Next)
  "Mulai Step Ini" (Start This Step)
  "Lanjut ke Step Berikutnya" (Continue to Next Step)
  "← Kembali ke Jalur" (Back to Path)
  "{X} dari {Y} steps" ({X} of {Y} steps)
  "Estimasi waktu: {time}" (Estimated time)
  ```

- **Animations:**
  ```typescript
  // Step list load
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ staggerChildren: 0.1 }}
  >
    {steps.map((step) => (
      <motion.div key={step.slug}>
        {/* Step card */}
      </motion.div>
    ))}
  </motion.div>

  // Recommended step highlight
  <motion.div
    animate={{ boxShadow: "0 0 0 4px rgba(255, 107, 53, 0.1)" }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    {recommendedStep}
  </motion.div>
  ```

- **Keyboard Navigation:**
  - Tab through steps
  - Enter on step → navigate to step detail
  - Enter on "Mulai Step Ini" → navigate to step detail
  - Escape → back to level list (if coming from step detail)

---

#### B.3 Edge Cases

**Scenario 1: User With No Assessment Visits /learning/n4**
- System: Load N4 level, but don't show "Kamu di sini" card
- Display: Info banner "💡 Belum tahu level? Ambil Assessment untuk rekomendasi jalur personal"
- All steps accessible, no "Berikutnya" indicator
- Call to action: Assessment link

**Scenario 2: User Completes All Steps in Level**
- System: Calculate level_progress = 100%
- Display: "🎉 Level Kana Selesai! Siap untuk N5?" + CTA to next level
- Progress bar filled (100%, coral)
- Achievement badge: "Kana Master"

**Scenario 3: External Resource Link Dead (Future Check)**
- P2 feature: Background job verifies links weekly
- If dead: Mark in DB, show alert on step "⚠️ Satu link sedang offline. Coba link lain" (One link offline)
- Remove dead link from display

**Scenario 4: Empty Step (No Resources Configured)**
- Validation: Steps must have ≥2 resources
- If misconfigured: Show error "Step ini belum siap. Coba later" (Step not ready yet)
- Admin can hide/unpublish step

---

#### B.4 Performance

**Load Time:** <1.5s from /learning/[level] to step list visible
- Level config cached via TanStack Query, staleTime: 1 hour
- Progress query (authenticated): <500ms DB query (indexed on user_id + level)

**Interaction:** <100ms from click to step detail page navigation

**Code Splitting:**
- Learning path page: separate chunk
- Step detail: lazy-loaded on demand

**Caching Strategy:**
```typescript
const { data: progress } = useQuery({
  queryKey: ['progress', user_id, level],
  queryFn: () => fetch(`/api/learning/${level}/progress`).then(r => r.json()),
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 30,   // 30 minutes
  enabled: !!user_id,
});
```

---

## 5. UI/UX DESIGN SYSTEM STRATEGY

### 5.1 Design System Foundation

All UI in Ippo is built exclusively on the **Untitled UI React** component library. No custom UI components are created — every visual element uses pre-built Untitled UI components configured through props.

**Why Untitled UI:**
- Production-ready accessibility (React Aria underneath)
- Consistent visual language across all screens
- Semantic color tokens that auto-adapt to light/dark mode
- Rapid implementation without design debt

**Hard Rules:**
1. **Never create custom components** when an Untitled UI equivalent exists
2. **Never use raw hex colors or Tailwind scale values** (e.g., `text-gray-900`, `bg-blue-700`) — always use semantic tokens (e.g., `text-primary`, `bg-brand-solid`)
3. **Always consult Figma via MCP** before implementing any new screen or component layout
4. **Always use Untitled UI icons** from `@untitledui/icons` or `@untitledui-pro/icons`

---

### 5.2 Figma-First Workflow

Before implementing any screen or UI pattern:

1. **Get design context** via the Figma MCP tool (`get_design_context`) using the Figma file key and node ID
2. **Check for Code Connect mappings** — if present, use the mapped codebase component directly
3. **Adapt to Untitled UI** — map Figma design to available Untitled UI components
4. **Never replicate raw Figma output** — the Figma export is a reference, not final code

This workflow prevents visual inconsistencies and ensures design intent is preserved without one-off component creation.

---

### 5.3 Component Mapping by Feature

#### Assessment Feature (Feature A)

| UI Element | Untitled UI Component | Notes |
|---|---|---|
| Question card | `Card` with `CardHeader` + `CardContent` | White bg, border-secondary |
| Answer options | `RadioGroup` + `Radio` items | 56px min touch target |
| Progress bar | `ProgressBar` | brand color fill |
| "Next" button | `Button` size="lg" color="primary" | Full-width on mobile |
| Result heading | Typography `text-primary` + `text-brand-primary` | Semantic tokens only |
| Level result card | `FeaturedIcon` + card layout | `color="success"` theme="light" |
| CTA button | `Button` size="lg" color="primary" | "Lihat Jalur Belajarmu" |

#### Learning Path Feature (Feature B)

| UI Element | Untitled UI Component | Notes |
|---|---|---|
| Level navigation | `Tabs` horizontal | Each JLPT level as tab |
| Step list item | Custom layout using `Avatar`/`Badge` + `Button` | Step title, time estimate |
| "You are here" card | `Badge` color="brand" + card | Highlighted recommended step |
| Completion checkbox | `Checkbox` size="sm" | "Tandai Selesai" |
| Progress summary | `ProgressBar` | % complete per level |
| Step detail page | `Modal` or page layout | Title, description, links |
| External links | `Button` color="secondary" iconLeading={Globe} | Open in new tab |
| Navigation buttons | `Button` color="tertiary"/"primary" | Back/Next pair |

#### Authentication Feature (Feature C)

| UI Element | Untitled UI Component | Notes |
|---|---|---|
| Email input | `Input` type="email" label="Email" | Zod validation |
| Name input | `Input` label="Nama" | Optional field |
| Language selector | `RadioGroup` | ID/EN options |
| OTP input boxes | `Input` pattern array | 6 separate single-digit inputs |
| OTP countdown | `Badge` color="warning"→"error" | Color shifts at <2 min |
| Submit button | `Button` color="primary" isLoading | Disabled until valid |
| Resend link | `Button` color="link-color" isDisabled | 30s cooldown |
| Toast notifications | `Toast`/`Notification` | Success/error states |
| Confetti overlay | Framer Motion (custom) | Exception: no Untitled UI equivalent |

#### Progress & Achievements (Feature D — Phase 2)

| UI Element | Untitled UI Component | Notes |
|---|---|---|
| Achievement badge | `BadgeWithIcon` + `FeaturedIcon` | Unlock animation |
| XP counter | `Badge` color="brand" | "+10 XP" format |
| Streak indicator | `BadgeWithDot` color="warning" | "3-day streak 🔥" |
| Progress dashboard | `Table` or card grid | Per-level completion % |
| Avatar profile | `Avatar` with `AvatarLabelGroup` | Name + level |

---

### 5.4 Color Usage Policy

All color decisions must use **semantic tokens** from the Untitled UI design system. Raw Tailwind color scale values are forbidden.

#### Text Colors
- Page headings: `text-primary`
- Labels, section headings: `text-secondary`
- Body/paragraph text: `text-tertiary`
- Placeholder text: `text-placeholder`
- Brand accent text: `text-brand-secondary`
- Error messages: `text-error-primary`
- Success messages: `text-success-primary`

#### Background Colors
- Page background: `bg-primary`
- Section contrast: `bg-secondary`
- Card backgrounds: `bg-primary` or `bg-primary_alt`
- Brand CTA sections: `bg-brand-section`
- Error states: `bg-error-primary`
- Success states: `bg-success-primary`
- Overlay/modal backdrop: `bg-overlay`

#### Foreground (Icons)
- Primary icons: `fg-primary` or `fg-secondary`
- Brand icons: `fg-brand-primary`
- Error icons: `fg-error-secondary`
- Success icons: `fg-success-secondary`

#### Border Colors
- Default inputs/cards: `border-secondary`
- Active/focused inputs: `border-brand`
- Error state: `border-error`

**Migration from PRD raw hex values:**

| Old (PRD draft) | Correct Token |
|---|---|
| `#FFFFFF` (white bg) | `bg-primary` |
| `#E5E7EB` (border) | `border-secondary` |
| `#1A1A2E` (navy text) | `text-primary` |
| `#6B7280` (gray text) | `text-tertiary` |
| `#FF6B35` (coral/brand) | `bg-brand-solid` / `text-brand-secondary` |
| `#F3F4F6` (hover bg) | `bg-primary_hover` |

---

### 5.5 Responsive Design Approach

Ippo is mobile-first. All layouts must work on 375px width (iPhone 12 mini) before expanding to desktop.

**Breakpoints (Tailwind v4.2):**
- Mobile default: 375px–767px (primary target)
- Tablet: `md:` 768px–1023px
- Desktop: `lg:` 1024px+

**Touch Target Rules (WCAG 2.5.5):**
- All interactive elements: minimum 48px height
- Button default size: `size="lg"` on mobile, `size="md"` on desktop
- Checkbox/radio areas: padded to 48px tap zone

**Layout Patterns:**
- Mobile: single-column, full-width buttons stacked vertically
- Tablet: two-column where applicable (e.g., step detail: content + sidebar)
- Desktop: constrained max-width container (`max-w-2xl` for learning path)

**Safe Area Support (iOS Notch/Dynamic Island):**
- Top bars: `pt-[env(safe-area-inset-top)]`
- Bottom navigation: `pb-[env(safe-area-inset-bottom)]`

---

### 5.6 Animation & Interaction Guidelines

Framer Motion is used for meaningful transitions only. Do not animate for decoration.

**Approved Animation Patterns:**
- **Page transitions:** `opacity: 0→1`, `y: 20→0`, `duration: 0.3s` (question entry, result reveal)
- **Micro-interactions:** Scale `1→1.02` on selection, `duration: 0.2s`
- **Loading states:** Use Untitled UI `Button isLoading` prop (built-in spinner)
- **Success celebrations:** Confetti on account creation or level completion (Framer Motion custom)
- **Hover/focus:** CSS transitions `duration-100 ease-linear` (not Framer Motion)

**Do Not Animate:**
- Navigation changes (browser-native)
- Form validation errors (instant feedback preferred)
- Progress bar increments (CSS transition only)

---

### 5.7 Accessibility Requirements

All components inherit accessibility from React Aria (Untitled UI's foundation). Additional requirements:

- **Language:** `lang="id"` on root HTML element (Indonesian default); switchable to `lang="en"`
- **Focus management:** Modals trap focus; assessment auto-focuses first question
- **Color contrast:** Semantic tokens guarantee WCAG AA compliance
- **Touch targets:** 48px minimum (enforced by Untitled UI `lg` size on mobile)
- **Screen reader:** All icons use `aria-hidden="true"` when decorative; meaningful icons have `aria-label`
- **Keyboard navigation:** Full keyboard support via React Aria (Tab, Space, Enter, Escape, Arrow keys)
- **Error announcements:** `aria-live="polite"` on validation errors and toast notifications

---

## 6. INTEGRATION POINTS

### 6.1 Better Auth (Email OTP)

**Implementation:**
- Plugin: Better Auth with email OTP provider
- Config: `/src/lib/auth.ts`
- Flow: User enters email → OTP sent via Resend → verify code → create session

**API Endpoints:**
- `POST /api/auth/send-otp` — sends email with code
- `POST /api/auth/verify-otp` — validates code, creates user + session
- `POST /api/auth/logout` — destroys session
- `GET /api/auth/session` — returns current user or null

**Error Handling:**
- Invalid email: 400 Bad Request + "Email tidak valid"
- Email already registered: 409 Conflict + "Akun sudah ada"
- OTP expired: 400 + "Kode kadaluarsa" (Code expired)
- OTP mismatch: 400 + "Kode tidak valid" (Code incorrect)

---

### 6.2 Resend (Email Delivery)

**Email Templates:**
- **OTP Email:**
  - Subject: "Kode OTP Ippo Kamu: {code}"
  - Body: HTML template with 6-digit code prominent, 10-minute expiry note, resend link
  - From: noreply@ippo.jp
  - Reply-To: support@ippo.jp

**Constraints:**
- Limit: 3,000 emails/month (free tier)
- Expected volume: ~500 OTP emails/month (500 users × 1 email avg)
- Buffer: 2,500 remaining for future features (password reset, notifications)

**Testing:**
- Dev: Use resend sandbox (no real emails)
- Staging: Use real Resend with test email domain

---

### 6.3 Neon Postgres + Drizzle ORM

**Database Tables (existing, from content spec):**

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  preferred_language VARCHAR(2) DEFAULT 'id',
  assessed_level VARCHAR(10), -- 'kana', 'n5', etc.
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
CREATE INDEX idx_users_email ON users(email);

-- Progress
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level VARCHAR(10) NOT NULL,
  step_slug VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
CREATE INDEX idx_progress_user_level ON progress(user_id, level);
CREATE UNIQUE INDEX idx_progress_unique ON progress(user_id, level, step_slug);

-- Quiz Results
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_slug VARCHAR(255) NOT NULL,
  level VARCHAR(10),
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now()
);
CREATE INDEX idx_quiz_results_user ON quiz_results(user_id, completed_at DESC);

-- Achievements
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_slug VARCHAR(255) NOT NULL,
  unlocked_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now()
);
CREATE UNIQUE INDEX idx_achievements_unique ON achievements(user_id, achievement_slug);
```

**Drizzle Schema** (`/src/db/schema.ts`):
```typescript
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  preferred_language: varchar('preferred_language', { length: 2 }).default('id'),
  assessed_level: varchar('assessed_level', { length: 10 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const progress = pgTable('progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  level: varchar('level', { length: 10 }).notNull(),
  step_slug: varchar('step_slug', { length: 255 }).notNull(),
  completed: boolean('completed').default(false),
  completed_at: timestamp('completed_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('idx_progress_user_level').on(table.user_id, table.level),
  unique('idx_progress_unique').on(table.user_id, table.level, table.step_slug),
]);

// ... (quiz_results, achievements similarly)
```

**Constraints:**
- Free tier: 0.5GB storage (sufficient for 10K users × 1KB each)
- Compute: 190 hours/month (sufficient for <1000 req/day)
- Connection pooling via TanStack Query

---

### 6.4 Analytics (Umami — Future, P2)

**Planned Event Schema:**
```
feature:action_type

Examples:
- assessment:start
- assessment:complete (with score)
- path:view (with level)
- step:open (with step_id)
- step:resource_click (with resource_index)
- step:complete
- auth:email_submitted
- auth:otp_verified
- auth:user_created
```

**Funnel Tracking (P1):**
- landing → assessment_click → assessment_start → assessment_complete → path_view → step_open

---

### 6.5 Error Logging (Future, P2)

**Sentry Integration:**
- Capture uncaught errors
- Track error rate by page/feature
- Slack alerts for critical errors

---

## 7. ACCESSIBILITY & INCLUSION

### 7.1 WCAG 2.1 Level AA Compliance

**Color Contrast:**
- Text on background: 4.5:1 minimum (AA)
  - Navy (#1A1A2E) on white: 11:1 ✓
  - Coral (#FF6B35) on white: 4.7:1 ✓
  - Gray (#6B7280) on white: 7:1 ✓
- Avoid color alone to convey info (use icons + text for "completed")

**Keyboard Navigation:**
- All buttons/links focusable with Tab
- Focus visible: 2px outline, 2px offset
- Focus order: logical (top-to-bottom, left-to-right)
- No keyboard traps

**Screen Readers:**
- All images: alt text (e.g., `<img alt="Hiragana chart" src="..." />`)
- Form labels: associated via htmlFor
- Error messages: announced via aria-live="polite"
- Progress bar: aria-valuenow, aria-valuemin, aria-valuemax
- Japanese text: no special ruby annotation (modern readers handle kanji)
- Assessment: each question is `<fieldset>` with legend

**Mobile Accessibility:**
- Touch targets: 48x48px minimum
- Text size: 16px minimum (iOS accessibility)
- No invisible or clipped content
- Pinch-to-zoom not disabled (user can override)

---

### 7.2 Bilingual Support

**Implementation:**
- Language toggle: user's choice stored in localStorage + account (if registered)
- Default: Browser language (navigator.language)
- Fallback: Indonesian
- All microcopy, error messages, labels: Indonesian primary + English in code/comments

**Content Translation:**
- Step titles, descriptions: translated in TypeScript files (each level has title + titleEn)
- External resources: linked as-is (may be English/Japanese)
- Navigation: translated in app

---

### 7.3 Color Blindness

**Design Approach:**
- Don't rely on color alone (red error → red + ✗ icon)
- Completed states: checkmark icon + teal color
- Links: underlined + colored

---

## 8. MOBILE-FIRST DESIGN PATTERNS

### 8.1 Responsive Breakpoints

**Mobile (320-767px):**
- Full-width layouts
- Vertical button stacking
- Single-column content
- Bottom sheet for modals
- Font sizes: 14-18px

**Tablet (768-1023px):**
- 2-column layouts where applicable
- Inline buttons (back + next side-by-side)
- Larger touch targets (56px)
- Font sizes: 16-20px

**Desktop (1024px+):**
- 3-column or dashboard layouts
- Sidebar navigation (future)
- Hover states
- Wider typography

**Implementation:**
```typescript
// Tailwind CSS
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>

<button className="w-full md:w-auto">
  {/* Full-width on mobile, auto on tablet+ */}
</button>
```

### 8.2 Touch Interaction Patterns

**Button Targets:** 48px height minimum (WCAG)
```
Button: 48px height × 100% width (mobile) / auto (desktop)
Checkbox: 48px × 48px (hit area)
Radio: 48px × 48px (hit area)
Link: 44px line-height minimum
```

**Feedback:**
- Tap: Color shift + slight scale (1.02x)
- Duration: 100-200ms
- No hover on touch (detect via hover media query)

**Swipe** (Future, P2):
```typescript
<motion.div
  drag="x"
  dragElastic={0.2}
  onDragEnd={(event, info) => {
    if (info.offset.x > 100) {
      // Swiped right → previous step
      navigate(-1);
    } else if (info.offset.x < -100) {
      // Swiped left → next step
      navigate(1);
    }
  }}
>
  {/* Draggable content */}
</motion.div>
```

### 8.3 Portrait/Landscape & Safe Area

**Orientation Handling:**
```typescript
import { useMediaQuery } from '@/hooks/useMediaQuery';

const isPortrait = useMediaQuery('(orientation: portrait)');

if (isPortrait) {
  // Stack vertically
} else {
  // Side-by-side layout
}
```

**Safe Area (Notch/Dynamic Island):**
```css
/* CSS */
.safe-top {
  padding-top: env(safe-area-inset-top);
}

.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Tailwind (if supported) */
@supports (padding: max(0px)) {
  body {
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
}
```

---

## 9. ANALYTICS & INSTRUMENTATION

### 9.1 Event Naming Convention

**Format:** `[feature]:[action]` or `[feature]:[action]_[detail]`

**Examples:**
```
assessment:start
assessment:answer_q1
assessment:complete { score, level }
path:view { level }
step:open { level, step_slug }
step:resource_click { level, step_slug, resource_index }
step:complete { level, step_slug, time_spent }
auth:email_submitted { email_domain }
auth:otp_verified
auth:user_created
achievement:unlocked { achievement_slug }
```

### 9.2 Funnel Analysis (Post-Launch)

**Primary Conversion Funnel:**
```
Landing Page View
  ↓ (CTA click rate: target 20%)
Assessment Start
  ↓ (completion rate: target 80%)
Assessment Result
  ↓ (path view rate: target 70%)
Learning Path View
  ↓ (step open rate: target 50% within 7 days)
Step Opened
  ↓ (completion rate: target 30%)
Step Completed
```

**Metrics:**
- Session duration: from landing to first step open
- Drop-off points: where users exit
- Conversion by traffic source: organic vs referral

### 9.3 Cohort Analysis

**Primary Cohorts:**
1. **By Assessed Level:** Kana, N5, N4, N3, N2+
   - Hypothesis: Kana cohort has highest engagement (fresh start motivation)
   - Metric: step completion % by level
2. **By Registration Status:** Unregistered (localStorage), Registered
   - Hypothesis: Registered users have higher retention
   - Metric: day-7 return rate
3. **By Activity:** Daily Active Users (DAU), Weekly Active Users (WAU)
   - Metric: engagement frequency

### 9.4 Dashboard KPIs (P1)

**Retention:**
- Day-1, Day-7, Day-30 return rates (target: 50%, 30%, 15%)

**Engagement:**
- Steps completed per user (target: 5+ in first month)
- Avg session duration (target: >10 min)
- Resource clicks per step (target: 1.5+ per step)

**Progression:**
- Level completion rate (target: 10% reach N2 from Kana)
- Time-to-N2-ready (target: <6 months)

---

## 10. DEPENDENCIES & SEQUENCING

### 10.1 Feature Dependencies

```
Foundation:
  ├─ Better Auth (OTP) — needed for account persistence
  └─ Neon + Drizzle — persistence layer

Phase 1 (P0 — Launch):
  ├─ Assessment (independent)
  ├─ Learning Path (depends on: content structure)
  ├─ Hybrid Auth (depends on: Better Auth)
  └─ localStorage (independent)

Phase 2 (P1 — Month 2):
  ├─ Quizzes (depends on: Progress schema, Auth)
  ├─ Progress Tracking (depends on: Progress table)
  ├─ Achievements (depends on: Progress table)
  └─ localStorage → Account Migration (depends on: Auth, Progress schema)

Phase 3 (P2 — Month 4+):
  ├─ Dark Mode (independent)
  ├─ Spaced Repetition (depends on: Quiz results data)
  ├─ Community (new schema: discussion_threads, posts)
  └─ Analytics Dashboard (depends on: event tracking)
```

### 10.2 Effort Estimates

| Feature | Complexity | Effort | Design | Dev | QA |
|---------|-----------|--------|--------|-----|-----|
| Assessment | M | M | 3 days | 4 days | 1 day |
| Learning Path | M | M | 4 days | 5 days | 1 day |
| Hybrid Auth | M | M | 2 days | 3 days | 1 day |
| Quizzes (P1) | L | L | 5 days | 8 days | 2 days |
| Progress/Achievements (P1) | M | M | 3 days | 4 days | 1 day |
| localStorage Migration (P1) | S | S | 1 day | 2 days | 0.5 day |

**Total P0:** ~2.5 weeks (design + dev + QA in parallel where possible)  
**Total P1:** ~3 weeks (sequential)  
**Total P2:** 4+ weeks (rolling)

---

### 10.3 Critical Path

1. **Schema Design** (foundation, 2 days)
   - Users, Progress, Quiz Results, Achievements tables
   - Drizzle migrations

2. **Auth System** (gates all persistent features, 4 days)
   - Better Auth integration
   - Resend email templates
   - OTP verification UI

3. **Content Structure Finalization** (gates Learning Path, 3 days)
   - Verify all levels have ≥5 steps
   - Verify resources are active (spot-check URLs)

4. **Assessment Feature** (independent, can be parallel, 5 days)
   - Question set (already exists in code)
   - UI + logic
   - QA

5. **Learning Path UI** (depends on content, 6 days)
   - Step list + step detail pages
   - Progress indicator
   - Navigation

6. **Progress Tracking** (depends on schema + auth, 3 days)
   - Checkpoint completion logic
   - localStorage persistence
   - Account migration path (P1)

7. **QA & Polish** (2 weeks, starts early)
   - Cross-device testing
   - Performance optimization
   - Accessibility audit

---

## 11. MIGRATION & DEPRECATED PATHS

### 11.1 localStorage → Account Migration (P1)

**Scenario:** User browses as guest, completes 3 steps, then signs up.

**Data Transfer:**
```typescript
// On successful account creation:
async function migrateLocalStorageToAccount(user_id: string) {
  const assessmentResult = localStorage.getItem('assessment_result');
  const stepProgress = Object.keys(localStorage)
    .filter(key => key.startsWith('step_'))
    .map(key => ({
      step_slug: key.replace('step_', ''),
      completed: JSON.parse(localStorage.getItem(key)).completed,
      completed_at: new Date(JSON.parse(localStorage.getItem(key)).timestamp),
    }));
  
  // Insert into DB
  if (assessmentResult) {
    const result = JSON.parse(assessmentResult);
    await db.update(users)
      .set({ assessed_level: result.assessedLevel })
      .where(eq(users.id, user_id));
  }
  
  for (const step of stepProgress) {
    await db.insert(progress).values({
      user_id,
      level: inferLevelFromSlug(step.step_slug), // heuristic
      step_slug: step.step_slug,
      completed: step.completed,
      completed_at: step.completed_at,
    });
  }
  
  // Clear localStorage
  localStorage.removeItem('assessment_result');
  stepProgress.forEach(step => localStorage.removeItem(`step_${step.step_slug}`));
  
  // Show success
  toast.success('Progres sebelumnya sudah disinkronisasi!');
}
```

**Edge Cases:**
- **Duplicate Completion:** If step already marked complete in DB, skip (no re-insert)
- **Conflicting Data:** If user completed step on desktop + mobile with different timestamps, use the later timestamp
- **Partial Transfer:** If any insert fails, roll back entire migration; show error "Migrasi gagal. Hubungi support." (Migration failed)

---

### 11.2 Future Content Structure Migration (P3+)

**If step slug changes** (e.g., "hiragana-gojuuon" → "hiragana-basic"):
- Maintain backward-compatible aliases
- DB view: `SELECT ... FROM progress WHERE step_slug IN (old_slug, new_slug)`
- Migration script: `UPDATE progress SET step_slug = new_slug WHERE step_slug = old_slug`

**If new level is added** (e.g., "advanced" above N1):
- New level ID in enum
- New rows in level config
- No impact on existing progress (append-only)

---

## 12. CONTENT STRATEGY & EXTERNAL RESOURCES

### 12.1 Approved Resource Sources

**Free Tier (Priority):**
1. NHK World Easy Japanese — official, high quality, Indonesian subtitles sometimes available
2. Tae Kim's Grammar Guide — comprehensive, English explanations
3. YouTube Channels:
   - NHK World Channel (official)
   - "Learn Japanese with Tae Kim"
   - Cure Dolly (Organic Japanese)
4. JLPT Official Practice Tests (jlpt.jp)
5. Community sites:
   - KanjiDamage
   - Jisho.org (dictionary)

**Forbidden:**
- Pirated textbooks or full courses
- Copyrighted material (scanned books, leaked exam papers)
- Low-quality or misleading content (verified by spot-check)

### 12.2 Resource Validation (P2)

**Weekly Job (background):**
```
FOR EACH resource in all steps:
  IF HEAD request to URL → 404:
    MARK resource as "offline"
    ALERT: admin to replace or remove
  IF response time > 5s:
    FLAG: slow resource, consider alternative
```

---

## 13. TECHNICAL ARCHITECTURE NOTES

### 13.1 TanStack Start (SSR)

**Server Routes:**
- `/api/assessment/submit` (POST)
- `/api/progress/complete` (POST)
- `/api/progress/[level]` (GET)
- `/api/auth/*` (Better Auth routes)

**Client-Side Data Fetching:**
```typescript
// TanStack Query + TanStack Router integration
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export function LearningPath({ level }: { level: string }) {
  const { data: progress } = useQuery({
    queryKey: ['progress', level],
    queryFn: () => fetch(`/api/progress/${level}`).then(r => r.json()),
  });
  
  // ...
}
```

### 13.2 Zustand State Management

```typescript
// Global state for assessment
import { create } from 'zustand';

interface AssessmentStore {
  currentQuestion: number;
  answers: Record<string, string>;
  assessedLevel: string | null;
  setAnswer: (qId: string, optId: string) => void;
  advance: () => void;
  submit: async () => void;
  reset: () => void;
}

export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  assessedLevel: null,
  setAnswer: (qId, optId) => set((state) => ({
    answers: { ...state.answers, [qId]: optId },
  })),
  advance: () => set((state) => ({
    currentQuestion: state.currentQuestion + 1,
  })),
  submit: async () => {
    const { answers } = get();
    // Calculate level, store result
  },
  reset: () => set({ currentQuestion: 0, answers: {}, assessedLevel: null }),
}));
```

### 13.3 Type Safety (Zod Validation)

```typescript
import { z } from 'zod';

const ProgressUpdateSchema = z.object({
  user_id: z.string().uuid(),
  level: z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
  step_slug: z.string().min(1).max(255),
  completed: z.boolean(),
});

export type ProgressUpdate = z.infer<typeof ProgressUpdateSchema>;

// API handler
export async function POST(req: Request) {
  const body = await req.json();
  const validated = ProgressUpdateSchema.parse(body);
  // Process...
}
```

### 13.4 Code Splitting & Lazy Loading

```typescript
// Pages
export const assessmentRoute = createFileRoute('/assessment')({
  component: lazy(() => import('@/pages/assessment')),
});

export const learningRoute = createFileRoute('/learning/$level')({
  component: lazy(() => import('@/pages/learning')),
});
```

---

## 14. PERFORMANCE TARGETS

| Metric | Target | Method |
|--------|--------|--------|
| Initial Load | <2.0s | Lighthouse CI, RUM |
| First Contentful Paint | <1.5s | Web Vitals |
| Largest Contentful Paint | <2.5s | Web Vitals |
| Cumulative Layout Shift | <0.1 | Web Vitals |
| Interactive (TTI) | <3.0s | Lighthouse |
| Assessment Q load | <200ms | React Profiler |
| Step completion POST | <300ms | Network tab |

**Tools:**
- Lighthouse CI (on PR)
- Sentry Real User Monitoring (P2)
- Vercel Analytics (built-in)

---

## 15. TESTING STRATEGY

### 15.1 Unit Tests

**Coverage targets:** 70% for core features (Assessment, Progress)

**Example:**
```typescript
describe('calculateLevel', () => {
  it('returns "kana" for 0-1 correct answers', () => {
    const result = calculateLevel(
      [{ qId: '1', optId: 'wrong' }],
      questions
    );
    expect(result.assessedLevel).toBe('kana');
  });
  
  it('returns "n5" for 3 correct answers', () => {
    // ...
  });
});
```

### 15.2 Integration Tests

- Auth flow (email OTP)
- Progress save + retrieve
- localStorage → account migration

### 15.3 E2E Tests (Playwright, P1)

```typescript
test('Happy path: assessment → learning path → step complete', async ({ page }) => {
  // Visit landing
  // Click "Mulai Belajar"
  // Answer 5 questions
  // Verify result shown
  // Click "Lihat Jalur Belajarmu"
  // Verify step list
  // Click step, check "Tandai Selesai"
  // Verify localStorage or account progress updated
});
```

---

## 16. DEPLOYMENT & ROLLOUT

### 16.1 Environments

- **Development:** Vercel preview deployments, Neon branch database
- **Staging:** Vercel staging domain, Neon staging database (data refresh 1x/week)
- **Production:** Vercel production, Neon production database

### 16.2 Deployment Checklist

- [ ] Migrations run (DB schema updates)
- [ ] Env vars set (Resend API key, Auth secrets)
- [ ] Content files updated (all levels, all steps)
- [ ] Analytics events tested
- [ ] Error logging configured (Sentry)
- [ ] Email templates tested (OTP delivery)
- [ ] Mobile testing (iOS + Android, 2+ devices)
- [ ] Accessibility audit (axe DevTools)
- [ ] Lighthouse score ≥85

### 16.3 Rollout Plan

**Phase 1 Launch (Week 1):**
1. Deploy to production
2. Soft launch: invite 50 beta users via email
3. Monitor error logs, session duration, step completion
4. Gather feedback
5. Fix critical bugs (5+ occurrences)
6. Public launch (blog post, Reddit, Indonesian tech communities)

**Phase 1 Week 2-4:**
- Monitor KPIs (acquisition, engagement, retention)
- Iterate on UX (e.g., "You are here" positioning, button copy)
- Prepare Phase 2 features (Quizzes, Progress, Achievements)

---

## 17. FUTURE FEATURES (P2+)

### 17.1 Practice Quizzes (P1)

**Scope:**
- JLPT-format multiple choice quizzes for N5-N1
- After step completion, offer quiz (e.g., "Uji pemahaman kamu dengan kuis")
- Score tracking, immediate feedback with Indonesian explanations

**Not in P0 scope** but foundation is laid (quiz_results table exists)

### 17.2 Dark Mode (P2)

**Implementation:**
- Zustand store: `isDarkMode` toggle
- Tailwind dark: variant (dark:bg-gray-900, etc.)
- localStorage: persist preference

### 17.3 Spaced Repetition (P2)

**Scope:**
- Track quiz results over time
- Recommend review intervals (e.g., 1 day, 3 days, 1 week)
- Algorithm: SM-2 or similar

### 17.4 Community Discussion (P3)

**Scope:**
- Per-step discussion threads
- Q&A format (upvote answers)
- Moderation (flag inappropriate)

---

## 18. GLOSSARY & REFERENCE

**JLPT Levels:**
- N1: Most advanced (business fluency)
- N2: Advanced (visa requirement)
- N3: Intermediate
- N4: Lower-intermediate
- N5: Beginner
- Kana: Hiragana + Katakana (no JLPT level, prerequisite)

**Key Abbreviations:**
- OTP: One-Time Password
- PWA: Progressive Web App
- SPA: Single Page Application
- DAU: Daily Active Users
- CTA: Call-to-Action
- TTI: Time to Interactive
- FCP: First Contentful Paint

**Brand Terms:**
- "Senpai" tone: Supportive, experienced, non-patronizing mentor
- "Casual Indonesian": "kamu" (you), "yuk" (let's), exclamation marks, emojis in moderation
- "One step forward": Progress metaphor, climb Mount Fuji idea

---

**PRD End — Word Count: ~18,500**

---

**Approval Sign-Off:**

| Role | Name | Date | Notes |
|------|------|------|-------|
| Product Manager | — | — | |
| Engineering Lead | — | — | |
| Design Lead | — | — | |
| Launch Date Target | April 30, 2026 | | |

