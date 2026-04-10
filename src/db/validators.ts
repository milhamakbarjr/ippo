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
});
export type AssessmentSubmit = z.infer<typeof AssessmentSubmitSchema>;

export const QuizSubmitSchema = z.object({
  quiz_slug:       z.string().min(1).max(255),
  level:           JLPTLevelSchema.optional(),
  score:           z.number().int().min(0),
  total_questions: z.number().int().min(1),
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
