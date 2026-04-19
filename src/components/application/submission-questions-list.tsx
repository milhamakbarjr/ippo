import type { QuizQuestionInput } from '@/db/validators';

interface SubmissionQuestionsListProps {
  questions: QuizQuestionInput[];
}

export function SubmissionQuestionsList({ questions }: SubmissionQuestionsListProps) {
  return (
    <div className="mb-6 space-y-4">
      <h2 className="text-sm font-semibold text-secondary">
        Pertanyaan ({questions.length})
      </h2>

      {questions.map((q, qIdx) => (
        <div
          key={q.id}
          className="rounded-xl border border-secondary bg-primary p-4"
        >
          <p className="text-sm font-medium text-primary">
            {qIdx + 1}. {q.questionText}
          </p>
          <ul className="mt-3 space-y-2">
            {q.options.map((opt) => (
              <li key={opt.id} className="flex items-center gap-2 text-sm">
                {opt.isCorrect ? (
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-success-primary">
                    <span className="block size-2 rounded-full bg-white" />
                  </span>
                ) : (
                  <span className="size-4 shrink-0 rounded-full border border-secondary" />
                )}
                <span className={opt.isCorrect ? 'font-medium text-success-primary' : 'text-tertiary'}>
                  {opt.text}
                </span>
              </li>
            ))}
          </ul>
          {q.explanation && (
            <p className="mt-3 border-t border-secondary pt-3 text-xs text-tertiary">
              <span className="font-medium">Penjelasan:</span> {q.explanation}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
