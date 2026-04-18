import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  integer,
  index,
  unique,
  text,
  jsonb,
} from 'drizzle-orm/pg-core';

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id:                  uuid('id').primaryKey().defaultRandom(),
  email:               varchar('email', { length: 255 }).unique().notNull(),
  name:                varchar('name', { length: 255 }),
  preferred_language:  varchar('preferred_language', { length: 2 }).default('id'),
  assessed_level:      varchar('assessed_level', { length: 10 }),
  xp:                  integer('xp').default(0).notNull(),
  streak:              integer('streak').default(0).notNull(),
  last_completion_date: timestamp('last_completion_date'),
  role:                varchar('role', { length: 20 }).default('user').notNull(),
  created_at:          timestamp('created_at').defaultNow(),
  updated_at:          timestamp('updated_at').defaultNow(),
});

// ─── Progress ─────────────────────────────────────────────────────────────────

export const progress = pgTable(
  'progress',
  {
    id:           uuid('id').primaryKey().defaultRandom(),
    user_id:      uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    level:        varchar('level', { length: 10 }).notNull(),
    step_slug:    varchar('step_slug', { length: 255 }).notNull(),
    completed:    boolean('completed').default(false),
    completed_at: timestamp('completed_at'),
    created_at:   timestamp('created_at').defaultNow(),
    updated_at:   timestamp('updated_at').defaultNow(),
  },
  (table) => [
    index('idx_progress_user_level').on(table.user_id, table.level),
    unique('idx_progress_unique').on(table.user_id, table.level, table.step_slug),
  ],
);

// ─── Quiz Results ─────────────────────────────────────────────────────────────

export const quiz_results = pgTable(
  'quiz_results',
  {
    id:              uuid('id').primaryKey().defaultRandom(),
    user_id:         uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    quiz_slug:       varchar('quiz_slug', { length: 255 }).notNull(),
    level:           varchar('level', { length: 10 }),
    score:           integer('score').notNull(),
    total_questions: integer('total_questions').notNull(),
    completed_at:    timestamp('completed_at').defaultNow(),
    created_at:      timestamp('created_at').defaultNow(),
  },
  (table) => [
    index('idx_quiz_results_user').on(table.user_id, table.completed_at),
  ],
);

// ─── Achievements ─────────────────────────────────────────────────────────────

export const achievements = pgTable(
  'achievements',
  {
    id:               uuid('id').primaryKey().defaultRandom(),
    user_id:          uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    achievement_slug: varchar('achievement_slug', { length: 255 }).notNull(),
    unlocked_at:      timestamp('unlocked_at').defaultNow(),
    created_at:       timestamp('created_at').defaultNow(),
  },
  (table) => [
    unique('idx_achievements_unique').on(table.user_id, table.achievement_slug),
  ],
);

// ─── OTP Codes ────────────────────────────────────────────────────────────────

export const otp_codes = pgTable(
  'otp_codes',
  {
    id:         uuid('id').primaryKey().defaultRandom(),
    email:      varchar('email', { length: 255 }).notNull(),
    otp_hash:   varchar('otp_hash', { length: 255 }).notNull(),
    expires_at: timestamp('expires_at').notNull(),
    used:       boolean('used').default(false),
    created_at: timestamp('created_at').defaultNow(),
  },
  (table) => [
    index('idx_otp_email').on(table.email),
    index('idx_otp_expires_at').on(table.expires_at),
  ],
);

// ─── Better Auth Tables ───────────────────────────────────────────────────────

export const ba_user = pgTable('ba_user', {
  id:            text('id').primaryKey(),
  name:          varchar('name', { length: 255 }),
  email:         varchar('email', { length: 255 }).unique().notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image:         varchar('image', { length: 500 }),
  createdAt:     timestamp('created_at').defaultNow().notNull(),
  updatedAt:     timestamp('updated_at').defaultNow().notNull(),
});

export const ba_session = pgTable('ba_session', {
  id:        text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token:     text('token').unique().notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId:    text('user_id').notNull().references(() => ba_user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const ba_account = pgTable('ba_account', {
  id:                     text('id').primaryKey(),
  accountId:              text('account_id').notNull(),
  providerId:             text('provider_id').notNull(),
  userId:                 text('user_id').notNull().references(() => ba_user.id, { onDelete: 'cascade' }),
  accessToken:            text('access_token'),
  refreshToken:           text('refresh_token'),
  idToken:                text('id_token'),
  accessTokenExpiresAt:   timestamp('access_token_expires_at'),
  refreshTokenExpiresAt:  timestamp('refresh_token_expires_at'),
  scope:                  text('scope'),
  password:               text('password'),
  createdAt:              timestamp('created_at').defaultNow().notNull(),
  updatedAt:              timestamp('updated_at').defaultNow().notNull(),
});

export const ba_verification = pgTable('ba_verification', {
  id:         text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value:      text('value').notNull(),
  expiresAt:  timestamp('expires_at').notNull(),
  createdAt:  timestamp('created_at').defaultNow(),
  updatedAt:  timestamp('updated_at').defaultNow(),
});

// ─── Quiz Bank ────────────────────────────────────────────────────────────────

export const quiz_bank = pgTable(
  'quiz_bank',
  {
    id:            uuid('id').primaryKey().defaultRandom(),
    slug:          varchar('slug', { length: 255 }).notNull(),
    title:         varchar('title', { length: 255 }).notNull(),
    question_id:   varchar('question_id', { length: 100 }).notNull().unique(),
    question_text: text('question_text').notNull(),
    options:       jsonb('options').notNull(),
    explanation:   text('explanation').notNull(),
    category:      varchar('category', { length: 20 }).notNull(),
    level:         varchar('level', { length: 10 }).notNull(),
    sort_order:    integer('sort_order').default(0).notNull(),
    created_at:    timestamp('created_at').defaultNow(),
    updated_at:    timestamp('updated_at').defaultNow(),
  },
  (table) => [
    index('idx_quiz_bank_slug').on(table.slug),
    index('idx_quiz_bank_level_cat').on(table.level, table.category),
  ],
);

// ─── Quiz Submissions ─────────────────────────────────────────────────────────

export const quiz_submissions = pgTable(
  'quiz_submissions',
  {
    id:           uuid('id').primaryKey().defaultRandom(),
    submitted_by: uuid('submitted_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
    slug:         varchar('slug', { length: 255 }).notNull(),
    title:        varchar('title', { length: 255 }).notNull(),
    level:        varchar('level', { length: 10 }).notNull(),
    category:     varchar('category', { length: 20 }).notNull(),
    questions:    jsonb('questions').notNull(),
    status:       varchar('status', { length: 20 }).default('draft').notNull(),
    reviewer_id:  uuid('reviewer_id').references(() => users.id),
    review_note:  text('review_note'),
    submitted_at: timestamp('submitted_at'),
    reviewed_at:  timestamp('reviewed_at'),
    created_at:   timestamp('created_at').defaultNow(),
    updated_at:   timestamp('updated_at').defaultNow(),
  },
  (table) => [
    index('idx_submissions_status').on(table.status),
    index('idx_submissions_user').on(table.submitted_by),
  ],
);

// ─── Game Results ─────────────────────────────────────────────────────────────

export const game_results = pgTable(
  'game_results',
  {
    id:           uuid('id').primaryKey().defaultRandom(),
    user_id:      uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    game_type:    varchar('game_type', { length: 50 }).notNull(),
    level:        varchar('level', { length: 10 }).notNull(),
    score:        integer('score').notNull(),
    max_score:    integer('max_score').notNull(),
    time_seconds: integer('time_seconds'),
    completed_at: timestamp('completed_at').defaultNow(),
    created_at:   timestamp('created_at').defaultNow(),
  },
  (table) => [
    index('idx_game_results_user').on(table.user_id, table.completed_at),
  ],
);

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type User           = typeof users.$inferSelect;
export type NewUser        = typeof users.$inferInsert;

export type Progress       = typeof progress.$inferSelect;
export type NewProgress    = typeof progress.$inferInsert;

export type QuizResult     = typeof quiz_results.$inferSelect;
export type NewQuizResult  = typeof quiz_results.$inferInsert;

export type Achievement    = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;

export type OtpCode    = typeof otp_codes.$inferSelect;
export type NewOtpCode = typeof otp_codes.$inferInsert;

export type QuizBankEntry    = typeof quiz_bank.$inferSelect;
export type NewQuizBankEntry = typeof quiz_bank.$inferInsert;
export type QuizSubmission    = typeof quiz_submissions.$inferSelect;
export type NewQuizSubmission = typeof quiz_submissions.$inferInsert;
export type GameResult        = typeof game_results.$inferSelect;
export type NewGameResult     = typeof game_results.$inferInsert;
