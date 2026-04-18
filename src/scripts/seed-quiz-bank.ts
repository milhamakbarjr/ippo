// src/scripts/seed-quiz-bank.ts
// Purpose: One-time seed to populate quiz_bank from static TypeScript quiz files
// Run: npx tsx src/scripts/seed-quiz-bank.ts
// Idempotent: INSERT ON CONFLICT (question_id) DO NOTHING

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL env var is required');
  process.exit(1);
}

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../db/schema';
import { quiz_bank } from '../db/schema';
import type { QuizContent } from '../types/quiz';

import kanamastery from '../content/quizzes/kana-mastery';
import n5vocab from '../content/quizzes/n5-vocab';
import n5grammar from '../content/quizzes/n5-grammar';
import n5kanji from '../content/quizzes/n5-kanji';
import n4vocab from '../content/quizzes/n4-vocab';
import n4grammar from '../content/quizzes/n4-grammar';
import n3vocab from '../content/quizzes/n3-vocab';
import n3grammar from '../content/quizzes/n3-grammar';
import n3reading from '../content/quizzes/n3-reading';
import n2grammar from '../content/quizzes/n2-grammar';
import n2reading from '../content/quizzes/n2-reading';
import n1grammar from '../content/quizzes/n1-grammar';
import n5review from '../content/quizzes/n5-review';
import n4review from '../content/quizzes/n4-review';
import n3review from '../content/quizzes/n3-review';
import n2review from '../content/quizzes/n2-review';
import n1review from '../content/quizzes/n1-review';

const quizzes: QuizContent[] = [
  kanamastery,
  n5vocab,
  n5grammar,
  n5kanji,
  n4vocab,
  n4grammar,
  n3vocab,
  n3grammar,
  n3reading,
  n2grammar,
  n2reading,
  n1grammar,
  n5review,
  n4review,
  n3review,
  n2review,
  n1review,
];

async function seed() {
  const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

  let totalSeeded = 0;

  for (const quiz of quizzes) {
    const rows = quiz.questions.map((question, i) => ({
      slug: quiz.slug,
      title: quiz.title,
      question_id: question.id,
      question_text: question.questionText,
      options: question.options,
      explanation: question.explanation,
      category: question.category,
      level: question.level,
      sort_order: i,
    }));

    if (rows.length > 0) {
      await db.insert(quiz_bank).values(rows).onConflictDoNothing();
    }

    console.log(`Seeded: ${quiz.slug} (${rows.length} questions)`);
    totalSeeded += rows.length;
  }

  console.log(`Done. Total: ${totalSeeded} questions seeded.`);
  process.exit(0);
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
