import { z } from 'zod';

export const JLPTLevelSchema = z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']);

export const ProgressSchema = z.object({
  user_id:      z.string().uuid(),
  level:        JLPTLevelSchema,
  step_slug:    z.string().min(1).max(255),
  completed:    z.boolean(),
  completed_at: z.date().optional(),
});
export type ProgressInput = z.infer<typeof ProgressSchema>;

export const ProgressUpdateSchema = z.object({
  level:     JLPTLevelSchema,
  step_slug: z.string().min(1).max(255),
});
export type ProgressUpdate = z.infer<typeof ProgressUpdateSchema>;

export const AssessmentSubmitSchema = z.object({
  assessed_level:  JLPTLevelSchema,
  score:           z.number().int().min(0).max(7),
  total_questions: z.number().int().min(1).max(7),
  completed_at:    z.date().optional(),
  onboarding_responses: z.object({
    source:     z.string().optional(),
    motivation: z.string().optional(),
    knowledge:  z.string().optional(),
    path:       z.enum(['from-scratch', 'find-my-level']).optional(),
  }).optional(),
}).refine((d) => d.score <= d.total_questions, {
  message: 'score cannot exceed total_questions',
  path: ['score'],
});
export type AssessmentSubmit = z.infer<typeof AssessmentSubmitSchema>;

export const QuizSubmitSchema = z.object({
  quiz_slug:       z.string().min(1).max(255),
  level:           JLPTLevelSchema.optional(),
  score:           z.number().int().min(0).max(20),
  total_questions: z.number().int().min(1).max(20),
}).refine((d) => d.score <= d.total_questions, {
  message: 'score cannot exceed total_questions',
  path: ['score'],
});
export type QuizSubmit = z.infer<typeof QuizSubmitSchema>;

export const CreateUserSchema = z.object({
  email:              z.string().email(),
  name:               z.string().max(255).optional(),
  preferred_language: z.enum(['id', 'en']).default('id'),
});
export type CreateUser = z.infer<typeof CreateUserSchema>;

export const SendOtpSchema = z.object({
  email: z.string().email(),
  mode:  z.enum(['register', 'login']).default('register'),
});
export type SendOtp = z.infer<typeof SendOtpSchema>;

export const VerifyOtpSchema = z.object({
  email: z.string().email(),
  otp:   z.string().length(6).regex(/^\d{6}$/),
  mode:  z.enum(['register', 'login']).default('register'),
  migrationPayload: z.object({
    assessmentResult: z.object({
      assessedLevel: z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
    }).optional(),
    steps: z.array(z.object({
      step_slug:    z.string().min(1).max(255),
      level:        z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
      completed_at: z.coerce.date(),
    })).max(200),
  }).optional(),
});
export type VerifyOtp = z.infer<typeof VerifyOtpSchema>;

// ─── Quiz Bank ────────────────────────────────────────────────────────────────

export const QuizCategorySchema = z.enum(['vocab', 'kanji', 'grammar', 'reading']);
export type QuizCategory = z.infer<typeof QuizCategorySchema>;

export const QuizOptionSchema = z.object({
  id:        z.string(),
  text:      z.string().min(1),
  isCorrect: z.boolean(),
});
export type QuizOption = z.infer<typeof QuizOptionSchema>;

export const QuizQuestionInputSchema = z.object({
  id:           z.string().min(1),
  questionText: z.string().min(1),
  options:      z.array(QuizOptionSchema).length(4),
  explanation:  z.string().min(1),
  category:     QuizCategorySchema,
  level:        JLPTLevelSchema,
});
export type QuizQuestionInput = z.infer<typeof QuizQuestionInputSchema>;

export const QuizBankInsertSchema = z.object({
  slug:          z.string().min(1).max(255),
  title:         z.string().min(1).max(255),
  question_id:   z.string().min(1).max(100),
  question_text: z.string().min(1),
  options:       z.array(QuizOptionSchema).length(4),
  explanation:   z.string().min(1),
  category:      QuizCategorySchema,
  level:         JLPTLevelSchema,
  sort_order:    z.number().int().default(0),
});
export type QuizBankInsert = z.infer<typeof QuizBankInsertSchema>;

export const QuizSubmissionCreateSchema = z.object({
  slug:      z.string().min(1).max(255),
  title:     z.string().min(1).max(255),
  level:     JLPTLevelSchema,
  category:  QuizCategorySchema,
  questions: z.array(QuizQuestionInputSchema).min(1).max(50),
});
export type QuizSubmissionCreate = z.infer<typeof QuizSubmissionCreateSchema>;

export const GameResultSubmitSchema = z.object({
  game_type:    z.enum(['flashcard-match', 'word-sort']),
  level:        JLPTLevelSchema,
  score:        z.number().int().min(0),
  max_score:    z.number().int().min(1),
  time_seconds: z.number().int().min(0).optional(),
});
export type GameResultSubmit = z.infer<typeof GameResultSubmitSchema>;
