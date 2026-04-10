# Sprint Overview — Ippo JLPT Learning Platform

**Document Version:** 1.0  
**Last Updated:** 2026-04-10  
**Status:** Active  
**Audience:** Engineering, Design, Product

---

## 1. Sprint Index Table

| # | Sprint Name | Phase | Depends On | Effort Estimate |
|---|---|---|---|---|
| 01 | Foundation & Database Schema | P0 | None | 2 days dev + 0.5 day QA |
| 02 | Authentication (Email OTP) | P0 | Sprint 01 | 2 days design + 3 days dev + 1 day QA |
| 03 | Level Assessment Feature | P0 | Sprint 01 | 3 days design + 4 days dev + 1 day QA |
| 04 | Guided Learning Path | P0 | Sprint 01, content finalization | 4 days design + 5 days dev + 1 day QA |
| 05 | Progress Tracking | P0 | Sprints 01, 02, 04 | 3 days design + 4 days dev + 1 day QA |
| 06 | Gamification (XP, Achievements, Streaks) | P1 | Sprint 05 | 3 days design + 4 days dev + 1 day QA |
| 07 | localStorage → Account Migration | P1 | Sprints 02, 05 | 1 day design + 2 days dev + 0.5 day QA |
| 08 | Practice Quizzes | P1 | Sprints 01, 02, 05 | 5 days design + 8 days dev + 2 days QA |
| 09 | Polish, Dark Mode & Future Features | P2+ | Enhances all | 4+ weeks rolling |

---

## 2. Dependency Graph

```
Sprint 01 (DB Schema) ───────────────────────────────────────┐
Sprint 03 (Assessment) ──────────────────────────────────────┤
Sprint 02 (Auth) ────────────────────────────────────────────┤──► Sprint 05 (Progress) ──► Sprint 06 (Gamification)
Sprint 04 (Learning Path) ───────────────────────────────────┤                        ──► Sprint 07 (Migration)
                                                             │
Sprint 08 (Quizzes) ─────────────────────────────────────────┘

Sprint 09 (Polish/Future) — no hard dependencies, enhances all sprints
```

**Notes:**
- Sprints 03 and 04 can run in parallel once Sprint 01 is complete.
- Sprint 02 (Auth) can start in parallel with Sprints 03 and 04, but must complete before Sprint 05.
- Sprint 07 is a short sprint that can be merged with Sprint 05 delivery or deferred to Phase 1 week 2.

---

## 3. Phase Mapping

### P0 — Launch (Target: April 30, 2026)

| Sprint | Name | Goal |
|---|---|---|
| 01 | Foundation & Database | All tables, migrations, Drizzle schema |
| 02 | Authentication | Email OTP via Better Auth + Resend |
| 03 | Level Assessment | 5-question assessment, result page, localStorage |
| 04 | Guided Learning Path | Step list, step detail, external links |
| 05 | Progress Tracking | Completion API, localStorage + DB hybrid |

### P1 — Month 2 (Target: May 31, 2026)

| Sprint | Name | Goal |
|---|---|---|
| 06 | Gamification | XP, achievement badges, streak tracking |
| 07 | localStorage Migration | Guest → registered user data transfer |
| 08 | Practice Quizzes | JLPT-format MC quizzes, score tracking |

### P2+ — Month 4+ (Target: July 2026+)

| Sprint | Name | Goal |
|---|---|---|
| 09 | Polish & Future | Dark mode, spaced repetition, community, analytics dashboard |

---

## 4. Critical Path

The critical path from PRD Section 10.3, ordered by dependency:

```
1. Schema Design (2 days)
   └─ Users, Progress, Quiz Results, Achievements tables
   └─ Drizzle migrations, indexes

2. Auth System (4 days) — gates all persistent features
   └─ Better Auth + email OTP integration
   └─ Resend email templates
   └─ OTP verification UI

3. Content Structure Finalization (3 days) — gates Learning Path
   └─ Verify all levels have ≥5 steps
   └─ Spot-check resource URLs

4. Assessment Feature (5 days) — parallel with Auth + Content
   └─ Question set (already exists in code)
   └─ UI + scoring logic
   └─ QA

5. Learning Path UI (6 days) — depends on content structure
   └─ Step list + step detail pages
   └─ Progress indicator
   └─ Navigation

6. Progress Tracking (3 days) — depends on Schema + Auth
   └─ Completion logic (localStorage + DB)
   └─ Account migration path

7. QA & Polish (2 weeks, starts early, overlaps sprints)
   └─ Cross-device testing
   └─ Performance optimization
   └─ Accessibility audit
```

---

## 5. Effort Estimates

From PRD Section 10.2:

| Feature | Complexity | Design | Dev | QA | Total |
|---|---|---|---|---|---|
| Assessment | Medium | 3 days | 4 days | 1 day | 8 days |
| Learning Path | Medium | 4 days | 5 days | 1 day | 10 days |
| Auth (Email OTP) | Medium | 2 days | 3 days | 1 day | 6 days |
| Practice Quizzes (P1) | Large | 5 days | 8 days | 2 days | 15 days |
| Progress/Achievements (P1) | Medium | 3 days | 4 days | 1 day | 8 days |
| localStorage Migration (P1) | Small | 1 day | 2 days | 0.5 day | 3.5 days |

**P0 Total:** ~2.5 weeks (design + dev + QA running in parallel where dependencies allow)  
**P1 Total:** ~3 weeks (largely sequential)  
**P2 Total:** 4+ weeks (rolling, based on feedback)

---

## 6. User Personas

### Persona 1: "Budi" — The Motivated Visa Applicant

**Demographics:**
- Age 26, Jakarta-based software engineer
- Education: Bachelor's in Computer Science
- Languages: Native Indonesian, intermediate English, no prior Japanese
- Device: iPhone 12, occasional laptop access
- Motivation: Japan company job offer requires JLPT N2 in 6 months; has budget but wants free option first

**Psychographics:**
- Goal-driven; impatient with inefficiency
- Values structured learning — "tell me what to do"
- Suspicious of unvetted resources
- Prefers mobile study during commute (40 min each way)
- Wants visible proof of progress (badges, milestones)

**Success Criteria:**
1. Quickly understand his level (assessment in <10 minutes)
2. See clear path to N2 with time estimates
3. Access resources without account friction
4. Track progress and celebrate milestones
5. Return to exact study point across devices

**Frustration Points:**
- Scattered YouTube videos with no structure
- Paywalls after investing time
- Unclear which resource teaches what
- Mobile apps that fail on poor WiFi
- No visible progress indicator

**Critical Journey Map:**
```
START: Landing page (referral from job prep blog)
  ↓
  [DECISION] "Should I try this?"
    → "Yes, curious" → Browse vocab step (no signup)
    → "No, unclear" → LOST
  ↓
  [ACTION] Browse 3-4 steps without registering
  ↓
  [DECISION] "Worth investing time?"
    → "Yes, looks useful" → Click "Start Assessment"
    → "No, let me search more" → LOST
  ↓
  [ACTION] Complete 5-question assessment in 7 minutes
  ↓
  [SYSTEM] "You're N5 level. Here's your path to N2: 4 weeks Kana → 8 weeks N5 → ..."
  ↓
  [DECISION] "Should I sign up to track progress?"
    → "Yes, want badges" → Register via email OTP (2 min)
    → "Not yet, just browse" → Continue as guest (localStorage)
  ↓
  [ACTION] Complete Hiragana step (5 links: 3 YouTube videos, 2 flashcard sites)
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
- Age 32, Surabaya, high school teacher with side gig
- Education: High school + online courses
- Languages: Native Indonesian, basic English, some self-taught hiragana
- Device: Android phone (budget model, 3GB RAM), rare desktop access
- Motivation: Personal interest in Japanese culture; considering career pivot; free only

**Psychographics:**
- Distrusts complex interfaces
- Prefers Indonesian language (limited English reading)
- Values incremental, bite-sized lessons
- Easily overwhelmed by too many choices
- Needs gentle encouragement, not competition

**Success Criteria:**
1. Confirm content is in Indonesian (or has Indonesian support)
2. Do one small lesson today without thinking
3. See an achievement even for tiny progress
4. Know what to do next without reading instructions
5. Never feel lost or confused

**Frustration Points:**
- English-only interfaces
- Choice paralysis ("which resource do I click?")
- Cluttered screens with too much information
- Unclear meaning of "progress"
- Afraid of making "wrong" choices

**Critical Journey Map:**
```
START: Friend says "ada aplikasi JLPT gratis, coba deh"
  ↓
  [DECISION] "Should I download app or open web?"
    → "Laptop tidak ada, buka via phone" → Mobile site
    → "Takut download aplikasi (storage)" → Web only ✓
  ↓
  [ACTION] Opens site; sees "Belajar JLPT" headline + assessment button
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
- Age 29, Bandung, freelance translator
- Education: Bachelor's degree; some Japanese language background (N3 certified 2 years ago)
- Languages: Native Indonesian, fluent English, advanced but rusty Japanese
- Device: MacBook Pro + iPhone; desktop-primary
- Motivation: Preparing for N2 to increase freelance rates; needs structured review

**Psychographics:**
- Already familiar with learning structure
- Values efficiency and time optimization
- Wants to skip basics; jump to relevant content
- Appreciates advanced features (spaced repetition future)
- Motivated by clear metrics and comparisons

**Success Criteria:**
1. Place at N3/N2 level immediately
2. Skip Kana/N5 content
3. See N3 progress vs N2 requirements
4. Track which grammar gaps exist
5. Estimate time to N2 readiness

**Frustration Points:**
- Being forced through beginner content
- Opaque algorithm (why this resource and not another?)
- No dark mode for late-night study
- Unclear mastery thresholds
- No community to compare progress

**Critical Journey Map:**
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
  [DECISION] "Too many choices"
    → "Video only" (no filter, but uses browser find)
  ↓
  [ACTION] Clicks YouTube link → watches 8-minute video
  ↓
  [DECISION] "Mark done or come back?"
    → "Yes, learned" → Check
  ↓
  [ACTION] Signs up to track progress across devices
  ↓
  [SUCCESS] Returns 3x/week; tracks N3 completion % alongside N2 preview
```

---

## 7. Shared Design System Rules

### 7.1 Core Rule: No Custom UI Components

All visual output uses **Untitled UI React** components exclusively. Do not create custom styled elements.

**Allowed exceptions:**
- Page-level layout composition (assembling Untitled UI components into page layouts)
- Framer Motion wrappers around Untitled UI components
- Data-fetching/logic wrappers with zero visual output (e.g., a query hook that passes data down)

**Workflow — mandatory before implementing any screen:**
1. `search_components` (MCP) — find the right Untitled UI component
2. `get_component` (MCP) — read the full props API and examples
3. Adapt exactly to Ippo's domain; never copy raw hex values or arbitrary pixel dimensions

### 7.2 Ippo → Untitled UI Component Map

| Ippo UI Pattern | Untitled UI Component |
|---|---|
| Assessment question card | `Card` + `RadioGroup` |
| Answer options | `Radio` in `RadioGroup` |
| Level result display | `FeaturedIcon` + card layout |
| Learning path step | `Checkbox` + `Button` composition |
| JLPT level tabs | `Tabs` |
| Progress percentage | `ProgressBar` |
| Achievement badge | `BadgeWithIcon` + `FeaturedIcon` |
| Auth email input | `Input` type="email" |
| OTP code input | `Input` (6x single-digit) |
| Toasts/notifications | `Toast` |
| External resource links | `Button` color="secondary" + icon |
| Navigation buttons | `Button` color="tertiary"/"primary" |
| User avatar | `Avatar` / `AvatarLabelGroup` |
| Status indicators | `BadgeWithDot` |
| Links | `Button` color="link-color" href="..." |

### 7.3 Semantic Color Token Reference

**Rule: Never use raw hex colors (`#FF6B35`, `#1A1A2E`) or Tailwind color scale values (`text-gray-900`, `bg-blue-700`). Always use semantic tokens.**

#### Text Colors

| Token | Use Case |
|---|---|
| `text-primary` | Page headings |
| `text-secondary` | Labels, section headings |
| `text-tertiary` | Body/paragraph text |
| `text-placeholder` | Input placeholder text |
| `text-brand-primary` | Brand headings |
| `text-brand-secondary` | Brand accents, highlights |
| `text-error-primary` | Error messages |
| `text-warning-primary` | Warning messages |
| `text-success-primary` | Success messages |
| `text-white` | Always white (on dark backgrounds) |
| `text-*_on-brand` | Text on solid brand backgrounds |

#### Background Colors

| Token | Use Case |
|---|---|
| `bg-primary` | Page/card background (white) |
| `bg-primary_hover` | Hover on white backgrounds |
| `bg-primary_alt` | Alternate card backgrounds |
| `bg-secondary` | Section contrast |
| `bg-secondary_hover` | Hover on gray-50 backgrounds |
| `bg-tertiary` | Toggles |
| `bg-overlay` | Modal backdrops |
| `bg-brand-solid` | Solid brand CTA buttons |
| `bg-brand-solid_hover` | Brand CTA hover state |
| `bg-brand-section` | Dark brand sections |
| `bg-error-primary` | Error states |
| `bg-success-primary` | Success states |
| `bg-warning-primary` | Warning states |

#### Foreground (Icons, Non-Text Elements)

| Token | Use Case |
|---|---|
| `fg-primary` | Highest contrast icons |
| `fg-secondary` | High contrast icons |
| `fg-tertiary` | Medium contrast icons |
| `fg-quaternary` | Input icons, help icons |
| `fg-brand-primary` | Brand icons, progress bar fill |
| `fg-error-secondary` | Error state icons |
| `fg-success-secondary` | Success icons, online dots |
| `fg-white` | Always white icons |

#### Border Colors

| Token | Use Case |
|---|---|
| `border-primary` | Inputs, checkboxes, button groups |
| `border-secondary` | Cards, tables, dividers (default) |
| `border-tertiary` | Subtle dividers |
| `border-brand` | Active/focused inputs |
| `border-error` | Error state inputs |

`ring-` and `outline-` accept the same tokens (e.g., `ring-primary`).

#### Migration Table — Raw Hex to Semantic Token

| Old (PRD draft raw hex) | Correct Token |
|---|---|
| `#FFFFFF` (white bg) | `bg-primary` |
| `#E5E7EB` (border) | `border-secondary` |
| `#1A1A2E` (navy text) | `text-primary` |
| `#6B7280` (gray text) | `text-tertiary` |
| `#FF6B35` (coral/brand CTA) | `bg-brand-solid` / `text-brand-secondary` |
| `#F3F4F6` (hover bg) | `bg-primary_hover` |
| `#2EC4B6` (teal/completed) | `fg-success-secondary` / `bg-success-primary` |

---

## 8. Shared Typography

| Style | Size | Weight | Color Token |
|---|---|---|---|
| Heading 1 | 28px | 700 | `text-primary` |
| Heading 2 | 20px | 600 | `text-secondary` |
| Body | 16px | 400 | `text-tertiary` |
| Label | 12px | 600 | `text-secondary` |
| Caption | 12px | 500 | `text-tertiary` |

**Minimum body text:** 16px on mobile (iOS accessibility requirement).

---

## 9. Shared Animation Guidelines

Framer Motion is used for **meaningful transitions only**. Do not animate for decoration.

### 9.1 Approved Patterns

**Page/element entry:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {content}
</motion.div>
```

**Micro-interaction (selection feedback):**
```typescript
<motion.div
  animate={selected ? { scale: 1.02 } : { scale: 1 }}
  transition={{ duration: 0.2 }}
>
  {option}
</motion.div>
```

**Result reveal:**
```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  {resultCard}
</motion.div>
```

**Loading states:** Use Untitled UI `Button isLoading` prop (built-in spinner) — do not build custom spinners.

**Success celebrations:** Confetti on account creation or level completion (Framer Motion custom — allowed exception, no Untitled UI equivalent).

### 9.2 CSS Hover/Focus Transitions

Use CSS transitions for hover and focus — NOT Framer Motion:

```css
transition duration-100 ease-linear
```

### 9.3 Do Not Animate

- Navigation changes (browser-native handles these)
- Form validation errors (instant feedback is preferred)
- Progress bar increments (use CSS transition only)

---

## 10. Shared Accessibility Requirements

### 10.1 WCAG 2.1 Level AA

- Color contrast: 4.5:1 minimum for text on background
- Do not use color alone to convey meaning (always pair with icon or text)
- All images must have alt text

### 10.2 Language

- Set `lang="id"` on the root `<html>` element (Indonesian default)
- Switchable to `lang="en"` based on user preference

### 10.3 Touch Targets

- All interactive elements: **48px minimum height** (WCAG 2.5.5)
- Buttons: use `size="lg"` on mobile, `size="md"` on desktop
- Checkbox and radio tap zones: padded to 48px

### 10.4 Keyboard Navigation

- All buttons and links focusable with Tab
- Focus visible: 2px outline, 2px offset, `border-brand` color
- Focus order: logical (top-to-bottom, left-to-right)
- No keyboard traps (except modals that trap intentionally)
- Assessment: each question is `<fieldset>` with `<legend>`

### 10.5 Screen Readers

- Decorative icons: `aria-hidden="true"`
- Meaningful icons: `aria-label` set
- Error messages: `aria-live="polite"`
- Toast notifications: `aria-live="polite"`
- Progress bar: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Form labels: associated via `htmlFor`

### 10.6 React Aria

All Untitled UI components use React Aria underneath. Do not layer additional ARIA on top unless extending a component with a custom element.

---

## 11. Shared Mobile-First Rules

### 11.1 Primary Viewport

**375px width** (iPhone 12 mini). All layouts must work at this width before being extended to larger screens.

### 11.2 Breakpoints (Tailwind v4.2)

| Breakpoint | Width | Prefix |
|---|---|---|
| Mobile (primary) | 375px–767px | (default) |
| Tablet | 768px–1023px | `md:` |
| Desktop | 1024px+ | `lg:` |

### 11.3 Layout Patterns

- **Mobile:** Single-column, full-width buttons, vertical stacking
- **Tablet:** Two-column where applicable (e.g., step detail: content + sidebar)
- **Desktop:** Constrained max-width container (`max-w-2xl` for learning path)

**Example:**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>

<button className="w-full md:w-auto">
  {/* Full-width on mobile, auto on tablet+ */}
</button>
```

### 11.4 Safe Area Support (iOS Notch/Dynamic Island)

```css
.safe-top {
  padding-top: env(safe-area-inset-top);
}

.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

In Tailwind:
```typescript
<div className="pt-[env(safe-area-inset-top)]">
  {/* Top bar */}
</div>

<nav className="pb-[env(safe-area-inset-bottom)]">
  {/* Bottom navigation */}
</nav>
```

### 11.5 Touch Feedback

- Tap: color shift + scale 1.02x
- Duration: 100–200ms
- No hover states on touch devices (detect via `@media (hover: hover)`)

---

## 12. Deployment Checklist

From PRD Section 16.2 — complete all items before each production deploy:

- [ ] Database migrations run successfully (verify with `SELECT * FROM schema_migrations`)
- [ ] Environment variables configured in Vercel: Resend API key, Better Auth secret, Neon connection string
- [ ] Content files updated: all levels have ≥5 steps, all resources have working URLs (spot-check)
- [ ] Analytics events tested in staging environment
- [ ] Error logging configured (Sentry — P2, but set up before production launch)
- [ ] Email templates tested: OTP delivery confirmed (test in Resend sandbox, then real)
- [ ] Mobile testing completed: iOS Safari + Android Chrome on at least 2 physical devices
- [ ] Accessibility audit: run axe DevTools on all critical flows
- [ ] Lighthouse score ≥85 on mobile for all primary pages

---

## 13. Rollout Plan

From PRD Section 16.3:

### Phase 1 Launch — Week 1

1. Deploy to Vercel production environment
2. Soft launch: invite 50 beta users via direct email
3. Monitor error logs, session duration, and step completion rates
4. Gather qualitative feedback from beta users
5. Fix all critical bugs (those occurring 5+ times)
6. Public launch: blog post, Reddit (r/LearnJapanese, Indonesian tech communities), LinkedIn

### Phase 1 — Weeks 2–4

- Monitor KPIs: acquisition, engagement (40%+ assessment completion), retention (30% day-7)
- Iterate on UX based on data: "You are here" card positioning, button copy, etc.
- Begin development of Phase 2 features: Quizzes, Progress Tracking, Achievements

### Phase 2 Launch — Month 2

- Deploy Gamification (Sprint 06) and localStorage Migration (Sprint 07)
- Deploy Practice Quizzes (Sprint 08)
- Re-launch announcement to existing users

---

## 14. Glossary

### JLPT Levels

| Level | Description |
|---|---|
| N1 | Most advanced — business fluency |
| N2 | Advanced — Japan work visa requirement |
| N3 | Intermediate |
| N4 | Lower-intermediate |
| N5 | Beginner |
| Kana | Hiragana + Katakana — prerequisite (not a JLPT level) |

### Key Abbreviations

| Term | Meaning |
|---|---|
| OTP | One-Time Password |
| PWA | Progressive Web App |
| SPA | Single Page Application |
| DAU | Daily Active Users |
| WAU | Weekly Active Users |
| CTA | Call-to-Action |
| TTI | Time to Interactive |
| FCP | First Contentful Paint |
| LCP | Largest Contentful Paint |
| CLS | Cumulative Layout Shift |

### Brand Terms

| Term | Definition |
|---|---|
| "Senpai tone" | Supportive, experienced, non-patronizing mentor voice in all copy |
| "Casual Indonesian" | "kamu" (you), "yuk" (let's), exclamation marks, emojis in moderation |
| "One step forward" | Core progress metaphor — the app name Ippo (一歩) means "one step" in Japanese |
| "Mount Fuji" | Internal metaphor for the N2 goal — climbing one step at a time |

---

## 15. Performance Targets

| Metric | Target | Measurement Tool |
|---|---|---|
| Initial Load | <2.0s | Lighthouse CI, RUM |
| First Contentful Paint (FCP) | <1.5s | Web Vitals |
| Largest Contentful Paint (LCP) | <2.5s | Web Vitals |
| Cumulative Layout Shift (CLS) | <0.1 | Web Vitals |
| Time to Interactive (TTI) | <3.0s | Lighthouse |
| Assessment question load | <200ms | React Profiler |
| Step completion POST API | <300ms | Network tab |
| Progress DB query | <500ms | Postgres EXPLAIN ANALYZE |
