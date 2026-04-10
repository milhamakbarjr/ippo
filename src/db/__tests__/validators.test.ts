import { describe, it, expect } from 'vitest';
import {
  JLPTLevelSchema,
  ProgressUpdateSchema,
  AssessmentSubmitSchema,
  QuizSubmitSchema,
  CreateUserSchema,
  SendOtpSchema,
  VerifyOtpSchema,
} from '@/db/validators';

describe('JLPTLevelSchema', () => {
  it.each(['kana', 'n5', 'n4', 'n3', 'n2', 'n1'])('accepts valid level %s', (level) => {
    expect(JLPTLevelSchema.safeParse(level).success).toBe(true);
  });

  it.each(['n6', 'N5', 'beginner', '', 'KANA'])('rejects invalid level %s', (level) => {
    expect(JLPTLevelSchema.safeParse(level).success).toBe(false);
  });
});

describe('ProgressUpdateSchema', () => {
  it('accepts valid level and step_slug', () => {
    expect(ProgressUpdateSchema.safeParse({ level: 'n5', step_slug: 'some-slug' }).success).toBe(true);
  });

  it('rejects empty step_slug', () => {
    expect(ProgressUpdateSchema.safeParse({ level: 'n5', step_slug: '' }).success).toBe(false);
  });

  it('rejects slug over 255 chars', () => {
    expect(ProgressUpdateSchema.safeParse({ level: 'n5', step_slug: 'a'.repeat(256) }).success).toBe(false);
  });

  it('rejects invalid level', () => {
    expect(ProgressUpdateSchema.safeParse({ level: 'n7', step_slug: 'some-slug' }).success).toBe(false);
  });
});

describe('AssessmentSubmitSchema', () => {
  const valid = { assessed_level: 'n5', score: 3, total_questions: 5 };

  it('accepts valid input', () => {
    expect(AssessmentSubmitSchema.safeParse(valid).success).toBe(true);
  });

  it('fails when score > total_questions', () => {
    const r = AssessmentSubmitSchema.safeParse({ ...valid, score: 6, total_questions: 5 });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toContain('score');
  });

  it('passes when score === total_questions', () => {
    expect(AssessmentSubmitSchema.safeParse({ ...valid, score: 5, total_questions: 5 }).success).toBe(true);
  });

  it('rejects score < 0', () => {
    expect(AssessmentSubmitSchema.safeParse({ ...valid, score: -1 }).success).toBe(false);
  });

  it('rejects score > 7', () => {
    expect(AssessmentSubmitSchema.safeParse({ ...valid, score: 8 }).success).toBe(false);
  });

  it('rejects total_questions < 1', () => {
    expect(AssessmentSubmitSchema.safeParse({ ...valid, total_questions: 0 }).success).toBe(false);
  });

  it('rejects total_questions > 7', () => {
    expect(AssessmentSubmitSchema.safeParse({ ...valid, total_questions: 8 }).success).toBe(false);
  });
});

describe('QuizSubmitSchema', () => {
  const valid = { quiz_slug: 'n5-vocab', score: 8, total_questions: 10 };

  it('accepts valid input', () => {
    expect(QuizSubmitSchema.safeParse(valid).success).toBe(true);
  });

  it('fails when score > total_questions', () => {
    const r = QuizSubmitSchema.safeParse({ ...valid, score: 11, total_questions: 10 });
    expect(r.success).toBe(false);
  });

  it('rejects score > 20', () => {
    expect(QuizSubmitSchema.safeParse({ ...valid, score: 21, total_questions: 21 }).success).toBe(false);
  });

  it('rejects total_questions > 20', () => {
    expect(QuizSubmitSchema.safeParse({ ...valid, total_questions: 21 }).success).toBe(false);
  });

  it('rejects empty quiz_slug', () => {
    expect(QuizSubmitSchema.safeParse({ ...valid, quiz_slug: '' }).success).toBe(false);
  });

  it('accepts without optional level field', () => {
    expect(QuizSubmitSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts with valid optional level', () => {
    expect(QuizSubmitSchema.safeParse({ ...valid, level: 'n5' }).success).toBe(true);
  });
});

describe('CreateUserSchema', () => {
  it('accepts valid email', () => {
    const r = CreateUserSchema.safeParse({ email: 'user@example.com' });
    expect(r.success).toBe(true);
  });

  it('defaults preferred_language to id', () => {
    const r = CreateUserSchema.safeParse({ email: 'user@example.com' });
    if (r.success) expect(r.data.preferred_language).toBe('id');
  });

  it('accepts en as preferred_language', () => {
    expect(CreateUserSchema.safeParse({ email: 'u@e.com', preferred_language: 'en' }).success).toBe(true);
  });

  it('rejects invalid preferred_language', () => {
    expect(CreateUserSchema.safeParse({ email: 'u@e.com', preferred_language: 'fr' }).success).toBe(false);
  });

  it('rejects invalid email', () => {
    expect(CreateUserSchema.safeParse({ email: 'not-an-email' }).success).toBe(false);
  });
});

describe('SendOtpSchema', () => {
  it('accepts valid email and mode', () => {
    expect(SendOtpSchema.safeParse({ email: 'u@e.com', mode: 'register' }).success).toBe(true);
    expect(SendOtpSchema.safeParse({ email: 'u@e.com', mode: 'login' }).success).toBe(true);
  });

  it('defaults mode to register', () => {
    const r = SendOtpSchema.safeParse({ email: 'u@e.com' });
    if (r.success) expect(r.data.mode).toBe('register');
  });

  it('rejects invalid mode', () => {
    expect(SendOtpSchema.safeParse({ email: 'u@e.com', mode: 'forgot' }).success).toBe(false);
  });

  it('rejects invalid email', () => {
    expect(SendOtpSchema.safeParse({ email: 'bad' }).success).toBe(false);
  });
});

describe('VerifyOtpSchema', () => {
  const valid = { email: 'u@e.com', otp: '123456', mode: 'register' as const };

  it('accepts valid 6-digit OTP', () => {
    expect(VerifyOtpSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects OTP shorter than 6 digits', () => {
    expect(VerifyOtpSchema.safeParse({ ...valid, otp: '12345' }).success).toBe(false);
  });

  it('rejects OTP longer than 6 digits', () => {
    expect(VerifyOtpSchema.safeParse({ ...valid, otp: '1234567' }).success).toBe(false);
  });

  it('rejects non-numeric OTP', () => {
    expect(VerifyOtpSchema.safeParse({ ...valid, otp: 'abcdef' }).success).toBe(false);
  });

  it('accepts without migrationPayload', () => {
    expect(VerifyOtpSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts with valid migrationPayload', () => {
    const payload = {
      ...valid,
      migrationPayload: {
        steps: [{ step_slug: 'hiragana-01', level: 'kana', completed_at: new Date().toISOString() }],
      },
    };
    expect(VerifyOtpSchema.safeParse(payload).success).toBe(true);
  });

  it('rejects migrationPayload.steps with over 200 items', () => {
    const steps = Array.from({ length: 201 }, (_, i) => ({
      step_slug: `slug-${i}`,
      level: 'kana',
      completed_at: new Date().toISOString(),
    }));
    expect(VerifyOtpSchema.safeParse({ ...valid, migrationPayload: { steps } }).success).toBe(false);
  });
});
