import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  integer,
  index,
  unique,
} from 'drizzle-orm/pg-core';

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id:                  uuid('id').primaryKey().defaultRandom(),
  email:               varchar('email', { length: 255 }).unique().notNull(),
  name:                varchar('name', { length: 255 }),
  preferred_language:  varchar('preferred_language', { length: 2 }).default('id'),
  assessed_level:      varchar('assessed_level', { length: 10 }),
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

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type User           = typeof users.$inferSelect;
export type NewUser        = typeof users.$inferInsert;

export type Progress       = typeof progress.$inferSelect;
export type NewProgress    = typeof progress.$inferInsert;

export type QuizResult     = typeof quiz_results.$inferSelect;
export type NewQuizResult  = typeof quiz_results.$inferInsert;

export type Achievement    = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;

// ─── OTP Codes ────────────────────────────────────────────────────────────────

export const otp_codes = pgTable('otp_codes', {
  id:         uuid('id').primaryKey().defaultRandom(),
  email:      varchar('email', { length: 255 }).notNull(),
  otp_hash:   varchar('otp_hash', { length: 255 }).notNull(),
  expires_at: timestamp('expires_at').notNull(),
  used:       boolean('used').default(false),
  created_at: timestamp('created_at').defaultNow(),
});

export type OtpCode    = typeof otp_codes.$inferSelect;
export type NewOtpCode = typeof otp_codes.$inferInsert;
