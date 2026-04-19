import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/base/buttons/button';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { QuizQuestionInputSchema } from '@/db/validators';
import type { QuizQuestionInput } from '@/db/validators';
import { z } from 'zod';
import {
  submissionBadgeColor,
  submissionStatusLabel,
  formatSubmissionDate,
  CATEGORY_LABELS,
} from '@/utils/submission-status';
import { LEVEL_LABELS } from '@/content/levels';
import type { JLPTLevelId } from '@/types/learning';

type ContributorSubmissionDetail = {
  id: string;
  submitted_by: string;
  slug: string;
  title: string;
  level: string;
  category: string;
  questions: unknown;
  status: string;
  review_note: string | null;
  submitted_at: Date | string | null;
  reviewed_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

interface ContributorSubmissionDetailPageProps {
  submissionId: string;
}

export function ContributorSubmissionDetailPage({ submissionId }: ContributorSubmissionDetailPageProps) {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<{ submission: ContributorSubmissionDetail }>({
    queryKey: ['contributor', 'submission', submissionId],
    queryFn: async () => {
      const res = await fetch(`/api/contributor/submissions/${submissionId}`);
      if (!res.ok) throw new Error('Submission tidak ditemukan');
      return res.json() as Promise<{ submission: ContributorSubmissionDetail }>;
    },
    staleTime: 1000 * 30,
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="space-y-4">
          <div className="h-8 w-1/2 animate-pulse rounded-lg bg-secondary" />
          <div className="h-48 animate-pulse rounded-xl bg-secondary" />
        </div>
      </main>
    );
  }

  if (error || !data?.submission) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-6">
        <p className="text-sm text-error-primary">Submission tidak ditemukan.</p>
        <Button
          color="tertiary"
          size="sm"
          className="mt-4"
          onClick={() => void navigate({ to: '/contributor/submissions' })}
        >
          Kembali
        </Button>
      </main>
    );
  }

  const sub = data.submission;

  const parsedQuestions = z.array(QuizQuestionInputSchema).safeParse(sub.questions);
  const questions: QuizQuestionInput[] = parsedQuestions.success ? parsedQuestions.data : [];

  const levelLabel = LEVEL_LABELS[sub.level as JLPTLevelId] ?? sub.level.toUpperCase();
  const categoryLabel = CATEGORY_LABELS[sub.category] ?? sub.category;
  const isDraft = sub.status === 'draft';

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <Button
            color="tertiary"
            size="sm"
            className="mb-3"
            onClick={() => void navigate({ to: '/contributor/submissions' })}
          >
            &larr; Kembali
          </Button>
          <h1 className="text-xl font-semibold text-primary">{sub.title}</h1>
          <p className="mt-1 text-sm text-tertiary">
            {sub.slug} &middot; Level {levelLabel} &middot; {categoryLabel}
          </p>
        </div>
        <BadgeWithDot
          type="pill-color"
          size="md"
          color={submissionBadgeColor(sub.status)}
        >
          {submissionStatusLabel(sub.status)}
        </BadgeWithDot>
      </div>

      {/* Metadata card */}
      <div className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-secondary bg-primary p-4">
        <div>
          <p className="text-xs text-tertiary">Dikirim</p>
          <p className="mt-0.5 text-sm font-medium text-primary">
            {formatSubmissionDate(sub.submitted_at)}
          </p>
        </div>
        {sub.reviewed_at && (
          <div>
            <p className="text-xs text-tertiary">Direview</p>
            <p className="mt-0.5 text-sm font-medium text-primary">
              {formatSubmissionDate(sub.reviewed_at)}
            </p>
          </div>
        )}
        <div>
          <p className="text-xs text-tertiary">Jumlah Soal</p>
          <p className="mt-0.5 text-sm font-medium text-primary">
            {questions.length} soal
          </p>
        </div>
      </div>

      {/* Rejection note */}
      {sub.status === 'rejected' && sub.review_note && (
        <div className="mb-6 rounded-xl border border-error bg-primary px-4 py-3">
          <p className="text-xs font-semibold text-error-primary">Catatan Penolakan</p>
          <p className="mt-1 text-sm text-tertiary">{sub.review_note}</p>
        </div>
      )}

      {/* Questions */}
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
                <li
                  key={opt.id}
                  className="flex items-center gap-2 text-sm"
                >
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

      {/* Edit button for drafts */}
      {isDraft && (
        <Button
          color="primary"
          size="sm"
          onClick={() =>
            void navigate({
              to: '/contributor/submissions/$id/edit',
              params: { id: sub.id },
            })
          }
        >
          Edit Submission
        </Button>
      )}
    </main>
  );
}
