import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Plus } from '@untitledui/icons';
import type { QuizSubmission } from '@/db/schema';
import { Button } from '@/components/base/buttons/button';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { submissionBadgeColor, submissionStatusLabel, formatSubmissionDate } from '@/utils/submission-status';

type SubmissionsResponse = { submissions: QuizSubmission[] };

const LEVEL_LABELS: Record<string, string> = {
  kana: 'Kana',
  n5: 'N5',
  n4: 'N4',
  n3: 'N3',
  n2: 'N2',
  n1: 'N1',
};

const CATEGORY_LABELS: Record<string, string> = {
  vocab: 'Kosakata',
  kanji: 'Kanji',
  grammar: 'Tata Bahasa',
  reading: 'Membaca',
};


export function MySubmissionsPage() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<SubmissionsResponse>({
    queryKey: ['contributor', 'submissions'],
    queryFn: () =>
      fetch('/api/contributor/submissions').then((r) => {
        if (!r.ok) throw new Error('Gagal memuat submissions');
        return r.json() as Promise<SubmissionsResponse>;
      }),
    staleTime: 1000 * 30,
  });

  const submissions = data?.submissions ?? [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-primary">Submission Saya</h1>
          <p className="text-sm text-tertiary mt-0.5">Kelola quiz yang kamu buat</p>
        </div>
        <Button
          color="primary"
          size="sm"
          iconLeading={Plus}
          onClick={() => void navigate({ to: '/contributor/submissions/new' })}
        >
          Buat Submission Baru
        </Button>
      </div>

      {isLoading && (
        <p className="text-sm text-tertiary">Memuat submissions...</p>
      )}

      {isError && (
        <p className="text-sm text-error-primary">Gagal memuat submissions. Coba lagi nanti.</p>
      )}

      {!isLoading && !isError && submissions.length === 0 && (
        <div className="rounded-xl border border-secondary bg-secondary px-6 py-12 text-center">
          <p className="text-sm text-tertiary">
            Belum ada submission. Mulai buat quiz pertamamu!
          </p>
        </div>
      )}

      {submissions.length > 0 && (
        <div className="flex flex-col divide-y divide-secondary rounded-xl border border-secondary bg-primary overflow-hidden">
          {submissions.map((s) => {
            const isDraft = s.status === 'draft';
            return (
              <div
                key={s.id}
                role={isDraft ? 'button' : undefined}
                tabIndex={isDraft ? 0 : undefined}
                className={`flex items-start justify-between gap-4 px-4 py-3 ${isDraft ? 'cursor-pointer transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-brand' : ''}`}
                onClick={
                  isDraft
                    ? () => void navigate({ to: '/contributor/submissions/$id/edit', params: { id: s.id } })
                    : undefined
                }
                onKeyDown={
                  isDraft
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          void navigate({ to: '/contributor/submissions/$id/edit', params: { id: s.id } });
                        }
                      }
                    : undefined
                }
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-sm font-medium text-primary truncate">{s.title}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-tertiary">{LEVEL_LABELS[s.level] ?? s.level}</span>
                    <span className="text-xs text-tertiary">•</span>
                    <span className="text-xs text-tertiary">{CATEGORY_LABELS[s.category] ?? s.category}</span>
                    <span className="text-xs text-tertiary">•</span>
                    <span className="text-xs text-tertiary">{formatSubmissionDate(s.created_at)}</span>
                  </div>
                </div>
                <BadgeWithDot
                  type="pill-color"
                  color={submissionBadgeColor(s.status)}
                  size="sm"
                >
                  {submissionStatusLabel(s.status)}
                </BadgeWithDot>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
