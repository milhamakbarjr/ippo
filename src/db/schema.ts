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

export const otp_codes = pgTable('otp_codes', {
  id:         uuid('id').primaryKey().defaultRandom(),
  email:      varchar('email', { length: 255 }).notNull(),
  otp_hash:   varchar('otp_hash', { length: 255 }).notNull(),
  expires_at: timestamp('expires_at').notNull(),
  used:       boolean('used').default(false),
  created_at: timestamp('created_at').defaultNow(),
});

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
