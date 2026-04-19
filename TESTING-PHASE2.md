# Phase 2 Browser Testing Guide — Admin & Contributor Workflow

## Context

Phase 2 adds admin and contributor pages for the quiz content pipeline. This guide walks through manually testing the full workflow: role setup → contributor creates & submits a quiz → admin reviews, approves/rejects → questions appear in quiz_bank.

**Dev server:** `http://localhost:6690/`

---

## Prerequisites

### 1. Set user roles via SQL (Neon MCP or psql)

All users start with `role = 'user'`. You need at least one admin and one contributor.

```sql
-- Make your main account admin
UPDATE users SET role = 'admin' WHERE email = 'propertycerdautama@gmail.com';

-- Option A: Use the same account for both (admin can do contributor actions)
-- Option B: Create a second test account and set it to contributor
-- UPDATE users SET role = 'contributor' WHERE email = 'test@example.com';
```

Verify: `SELECT email, role FROM users;`

### 2. Confirm dev server is running at `:6690`

Navigate to `http://localhost:6690/` — should load the app. Login with your admin account.

### 3. Verify session returns role

Open Chrome DevTools → Network tab → check `GET /api/auth/session` returns:
```json
{ "user": { "role": "admin", ... } }
```
The sidebar should now show the **"Submission"** nav item.

---

## Test Flow A: Contributor Creates & Submits a Quiz

> If using the same admin account (admin can do contributor actions), navigate directly. Otherwise login as contributor.

### Step 1: Navigate to contributor page
- Go to `http://localhost:6690/contributor/submissions`
- **Expected:** Empty state — "Belum ada submission. Mulai buat quiz pertamamu!"
- **Check:** "Buat Submission Baru" button is visible

### Step 2: Create a new submission
- Click **"Buat Submission Baru"** → navigates to `/contributor/submissions/new`
- Fill in:
  - **Judul:** `Latihan Kosakata N4 - Test`
  - **Slug:** should auto-fill to `latihan-kosakata-n4-test`
  - **Level:** N4
  - **Kategori:** Kosakata
- Click **"Tambah Pertanyaan"** to add a question:
  - **Teks Pertanyaan:** `「食べる」の意味はどれですか。`
  - **Option A:** `Makan` (select radio as correct answer)
  - **Option B:** `Minum`
  - **Option C:** `Tidur`
  - **Option D:** `Berjalan`
  - **Penjelasan:** `食べる (たべる) berarti "makan"`
- Click **"Simpan Draft"**
- **Expected:** Success message "Draft berhasil disimpan."

### Step 3: Verify draft in list
- Navigate back to `/contributor/submissions`
- **Expected:** Submission shows with status badge **"Draf"** (gray)

### Step 4: Edit the draft
- Click on the draft row → navigates to `/contributor/submissions/$id/edit`
- **Expected:** Form pre-filled with saved data
- Add another question, click "Simpan Draft" again

### Step 5: Submit for review
- From the edit page, click **"Kirim untuk Review"**
- **Expected:** Navigates back to `/contributor/submissions`, status changes to **"Menunggu Review"** (yellow/warning badge)
- **Check in DevTools:** `POST /api/contributor/submissions/$id/submit` returns `{ success: true }`

---

## Test Flow B: Admin Reviews Submissions

### Step 1: Navigate to admin page
- Go to `http://localhost:6690/admin/submissions`
- **Expected:** Tab bar shows: **Semua / Menunggu Review / Diterbitkan / Ditolak**
- The submission from Flow A should appear

### Step 2: Filter by status
- Click **"Menunggu Review"** tab
- **Expected:** Only pending_review submissions shown
- Click **"Semua"** → all submissions shown again

### Step 3: View submission detail
- Click on the test submission → navigates to `/admin/submissions/$id`
- **Expected:**
  - Title, slug, level, category displayed
  - Status badge "Menunggu Review" (warning)
  - Questions listed with correct answer marked in green
  - **"Setujui & Terbitkan"** and **"Tolak"** buttons visible

### Step 4a: Test REJECT flow
- Click **"Tolak"** → inline textarea appears
- Type a review note: `Perlu tambah lebih banyak pertanyaan`
- Click **"Konfirmasi Tolak"**
- **Expected:** Navigates back to `/admin/submissions`, submission now shows **"Ditolak"** (red badge)
- **Check in DevTools:** `POST /api/admin/submissions/$id/reject` returns `{ success: true }`
- **Verify contributor side:** Go to `/contributor/submissions` → status shows "Ditolak"

### Step 4b: Test APPROVE flow (create another submission first)
- Create a new submission via `/contributor/submissions/new` and submit for review
- Go to `/admin/submissions/$id` for the new submission
- Click **"Setujui & Terbitkan"**
- **Expected:** Navigates back to list, status is **"Diterbitkan"** (green badge)
- **Check in DevTools:** `POST /api/admin/submissions/$id/approve` returns `{ success: true, questionsAdded: N }`

### Step 5: Verify questions in quiz_bank
After approving, verify the questions were inserted into `quiz_bank`:

```sql
SELECT slug, title, question_id, question_text FROM quiz_bank
WHERE slug = 'latihan-kosakata-n4-test'
ORDER BY sort_order;
```

**Expected:** All questions from the approved submission appear.

---

## Test Flow C: Bulk Upload (JSON)

### Step 1: Prepare a JSON file
Create a file `test-questions.json` with:

```json
[
  {
    "id": "bulk-test-1",
    "questionText": "「走る」の読み方は？",
    "options": [
      { "id": "a", "text": "はしる", "isCorrect": true },
      { "id": "b", "text": "あるく", "isCorrect": false },
      { "id": "c", "text": "およぐ", "isCorrect": false },
      { "id": "d", "text": "とぶ", "isCorrect": false }
    ],
    "explanation": "走る = はしる = berlari",
    "category": "vocab",
    "level": "n4"
  }
]
```

### Step 2: Upload on submission form
- Go to `/contributor/submissions/new`, fill title/slug/level/category
- Click **"Upload JSON"** button
- Select the file
- **Expected:** Question appears in the form, success message shows count

### Step 3: Test invalid JSON
- Upload a malformed JSON file (e.g., missing required fields)
- **Expected:** Error messages appear inline (up to 3 errors shown)

---

## Test Flow D: Error Cases & Edge Cases

### D1: Unauthorized access
- Set role back to `'user'`: `UPDATE users SET role = 'user' WHERE email = '...'`
- Navigate to `/contributor/submissions`
- **Expected:** API returns 403 → page shows error or empty state
- Navigate to `/admin/submissions`
- **Expected:** API returns 403

### D2: Direct URL access while logged out
- Log out, then navigate to `/admin/submissions`
- **Expected:** API calls return 401/503, page handles gracefully

### D3: Double-approve prevention
- Try approving an already-published submission (replay request in DevTools console)
- **Expected:** Returns `{ error: "Submission is not pending review" }`, status 400

### D4: Reject already-rejected
- Try rejecting a submission that's already rejected
- **Expected:** Returns status 400 — "Submission is not pending review"

### D5: Edit non-draft submission
- Try navigating to `/contributor/submissions/$id/edit` for a published submission
- Try PUT request via DevTools
- **Expected:** Returns `{ error: "Only draft submissions can be edited" }`, status 400

---

## Test Flow E: Navigation & Role-Based UI

### E1: Admin sees admin nav
- Login as admin
- **Expected:** Sidebar shows **"Submission"** item pointing to `/admin/submissions`

### E2: Contributor sees contributor nav
- Login as contributor
- **Expected:** Sidebar shows **"Submission Saya"** item pointing to `/contributor/submissions`

### E3: Regular user sees no extra nav
- Login as regular user (role = 'user')
- **Expected:** Sidebar shows only: Belajar, Jalur Belajar, Huruf, Pencapaian

---

## Verification Checklist

| # | Test | Status |
|---|------|--------|
| A1 | Contributor page shows empty state | ⬜ |
| A2 | Create submission form works | ⬜ |
| A3 | Draft appears in list with gray badge | ⬜ |
| A4 | Edit draft loads pre-filled data | ⬜ |
| A5 | Submit for review changes status | ⬜ |
| B1 | Admin list shows all submissions | ⬜ |
| B2 | Status tab filtering works | ⬜ |
| B3 | Detail page shows questions correctly | ⬜ |
| B4 | Reject flow works with review note | ⬜ |
| B5 | Approve flow inserts into quiz_bank | ⬜ |
| C1 | Bulk JSON upload loads questions | ⬜ |
| C2 | Invalid JSON shows errors | ⬜ |
| D1 | 403 for unauthorized role | ⬜ |
| D3 | Double-approve returns 400 | ⬜ |
| E1 | Admin nav shows "Submission" | ⬜ |
| E2 | Contributor nav shows "Submission Saya" | ⬜ |
| E3 | Regular user sees no extra nav | ⬜ |
