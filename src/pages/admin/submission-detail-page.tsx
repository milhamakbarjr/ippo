import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/base/buttons/button';
import { BadgeWithDot } from '@/components/base/badges/badges';
import type { QuizSubmission } from '@/db/schema';
import { QuizQuestionInputSchema } from '@/db/validators';
import type { QuizQuestionInput } from '@/db/validators';
import { z } from 'zod';
import { submissionBadgeColor, submissionStatusLabel } from '@/utils/submission-status';

export function AdminSubmissionDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/admin/submissions/$id' });

  const [showRejectForm, setShowRejectForm] = useState(false);
  const [reviewNote, setReviewNote]         = useState('');
  const [rejectError, setRejectError]       = useState('');

  const { data, isLoading, error } = useQuery<{ submission: QuizSubmission }>({
    queryKey: ['admin-submission', id],
    queryFn:  async () => {
      const res = await fetch(`/api/admin/submissions/${id}`);
      if (!res.ok) throw new Error('Submission tidak ditemukan');
      return res.json() as Promise<{ submission: QuizSubmission }>;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/admin/submissions/${id}/approve`, { method: 'POST' });
      if (!res.ok) {
        const body = await res.json() as { error?: string };
        throw new Error(body.error ?? 'Gagal menyetujui submission');
      }
      return res.json() as Promise<{ success: boolean; questionsAdded: number }>;
    },
    onSuccess: () => {
      void navigate({ to: '/admin/submissions' });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (note: string) => {
      const res = await fetch(`/api/admin/submissions/${id}/reject`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ review_note: note }),
      });
      if (!res.ok) {
        const body = await res.json() as { error?: string };
        throw new Error(body.error ?? 'Gagal menolak submission');
      }
      return res.json() as Promise<{ success: boolean }>;
    },
    onSuccess: () => {
      void navigate({ to: '/admin/submissions' });
    },
  });

  const handleReject = () => {
    if (!reviewNote.trim()) {
      setRejectError('Catatan review wajib diisi.');
      return;
    }
    setRejectError('');
    rejectMutation.mutate(reviewNote);
  };

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
          onClick={() => void navigate({ to: '/admin/submissions' })}
        >
          Kembali
        </Button>
      </main>
    );
  }

  const sub = data.submission;

  const parsedQuestions = z.array(QuizQuestionInputSchema).safeParse(sub.questions);
  const questions: QuizQuestionInput[] = parsedQuestions.success
    ? (parsedQuestions.data as QuizQuestionInput[])
    : [];

  const isPending = sub.status === 'pending_review';

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <Button
            color="tertiary"
            size="sm"
            className="mb-3"
            onClick={() => void navigate({ to: '/admin/submissions' })}
          >
            &larr; Kembali
          </Button>
          <h1 className="text-xl font-semibold text-primary">{sub.title}</h1>
          <p className="mt-1 text-sm text-tertiary">
            {sub.slug} &middot; Level {sub.level.toUpperCase()} &middot; {sub.category}
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

      {/* Actions for pending_review */}
      {isPending && (
        <div className="space-y-3">
          {/* Approve */}
          <div className="flex gap-3">
            <Button
              color="primary"
              size="sm"
              isLoading={approveMutation.isPending}
              isDisabled={approveMutation.isPending || rejectMutation.isPending}
              onClick={() => approveMutation.mutate()}
            >
              Setujui & Terbitkan
            </Button>
            <Button
              color="secondary-destructive"
              size="sm"
              isDisabled={approveMutation.isPending || rejectMutation.isPending}
              onClick={() => {
                setShowRejectForm((v) => !v);
                setRejectError('');
              }}
            >
              Tolak
            </Button>
          </div>

          {/* Reject form */}
          {showRejectForm && (
            <div className="rounded-xl border border-secondary bg-primary p-4">
              <label
                htmlFor="review-note"
                className="mb-1.5 block text-sm font-medium text-secondary"
              >
                Catatan Penolakan
              </label>
              <textarea
                id="review-note"
                rows={3}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Jelaskan alasan penolakan..."
                className="w-full rounded-lg border border-primary bg-primary px-3 py-2 text-sm text-primary placeholder:text-placeholder focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-50"
              />
              {rejectError && (
                <p className="mt-1 text-xs text-error-primary">{rejectError}</p>
              )}
              {rejectMutation.error && (
                <p className="mt-1 text-xs text-error-primary">
                  {rejectMutation.error.message}
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <Button
                  color="primary-destructive"
                  size="sm"
                  isLoading={rejectMutation.isPending}
                  isDisabled={rejectMutation.isPending}
                  onClick={handleReject}
                >
                  Konfirmasi Tolak
                </Button>
                <Button
                  color="tertiary"
                  size="sm"
                  isDisabled={rejectMutation.isPending}
                  onClick={() => {
                    setShowRejectForm(false);
                    setReviewNote('');
                    setRejectError('');
                  }}
                >
                  Batal
                </Button>
              </div>
            </div>
          )}

          {approveMutation.error && (
            <p className="text-sm text-error-primary">{approveMutation.error.message}</p>
          )}
        </div>
      )}
    </main>
  );
}
