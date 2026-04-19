import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Tab, TabList, TabPanel, Tabs } from '@/components/application/tabs/tabs';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { submissionBadgeColor, submissionStatusLabel, formatSubmissionDate, CATEGORY_LABELS } from '@/utils/submission-status';
import { LEVEL_LABELS } from '@/content/levels';

type AdminSubmissionListItem = {
  id: string;
  submitted_by: string;
  slug: string;
  title: string;
  level: string;
  category: string;
  status: string;
  review_note: string | null;
  submitted_at: Date | string | null;
  reviewed_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  reviewer_id: string | null;
  submitter: { id: string; name: string | null; email: string };
  question_count: number;
};

type StatusFilter = 'all' | 'pending_review' | 'published' | 'rejected' | 'draft';

const STATUS_TABS: { id: StatusFilter; label: string }[] = [
  { id: 'all',            label: 'Semua' },
  { id: 'pending_review', label: 'Menunggu Review' },
  { id: 'published',      label: 'Diterbitkan' },
  { id: 'rejected',       label: 'Ditolak' },
];

export function AdminSubmissionsListPage() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<StatusFilter>('all');

  const apiStatus = activeStatus === 'all' ? undefined : activeStatus;

  const { data, isLoading } = useQuery<{ submissions: AdminSubmissionListItem[] }>({
    queryKey: ['admin-submissions', apiStatus],
    queryFn:  async () => {
      const url = apiStatus
        ? `/api/admin/submissions?status=${apiStatus}`
        : '/api/admin/submissions';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Gagal memuat submissions');
      return res.json() as Promise<{ submissions: AdminSubmissionListItem[] }>;
    },
    staleTime: 30_000,
  });

  const submissions = data?.submissions ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary">Review Submissions</h1>
        <p className="mt-1 text-sm text-tertiary">
          Kelola dan tinjau konten yang dikirimkan oleh kontributor.
        </p>
      </div>

      <Tabs
        selectedKey={activeStatus}
        onSelectionChange={(key) => setActiveStatus(key as StatusFilter)}
      >
        <div className="overflow-x-auto">
          <TabList type="underline" size="sm">
            {STATUS_TABS.map((tab) => (
              <Tab key={tab.id} id={tab.id} label={tab.label} />
            ))}
          </TabList>
        </div>

        {STATUS_TABS.map((tab) => (
          <TabPanel key={tab.id} id={tab.id}>
            <div className="mt-4">
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 animate-pulse rounded-lg bg-secondary"
                    />
                  ))}
                </div>
              ) : submissions.length === 0 ? (
                <p className="py-10 text-center text-sm text-tertiary">
                  Belum ada submission.
                </p>
              ) : (
                <div className="divide-y divide-secondary rounded-xl border border-secondary bg-primary">
                  {submissions.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => void navigate({ to: '/admin/submissions/$id', params: { id: sub.id } })}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand first:rounded-t-xl last:rounded-b-xl"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-primary">
                          {sub.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-tertiary">
                          {sub.slug} &middot; {(LEVEL_LABELS as Record<string, string>)[sub.level] ?? `Level ${sub.level.toUpperCase()}`} &middot; {CATEGORY_LABELS[sub.category] ?? sub.category} &middot; {sub.question_count} soal
                        </p>
                        <p className="mt-0.5 text-xs text-tertiary">
                          {sub.submitter.name ?? sub.submitter.email} &middot; {formatSubmissionDate(sub.status === 'draft' ? sub.created_at : (sub.submitted_at ?? sub.created_at))}
                        </p>
                      </div>

                      <BadgeWithDot
                        type="pill-color"
                        size="sm"
                        color={submissionBadgeColor(sub.status)}
                      >
                        {submissionStatusLabel(sub.status)}
                      </BadgeWithDot>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </main>
  );
}
