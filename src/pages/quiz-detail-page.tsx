import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { BookOpen01, GraduationHat01, ChevronLeft, CheckCircle } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { ProgressBarBase } from '@/components/base/progress-indicators/progress-indicators';
import { LEVEL_LABELS } from '@/content/levels';
import { CATEGORY_LABELS, getExamLevel } from '@/utils/submission-status';
import { usePoolStats } from '@/hooks/use-quiz-catalog';
import type { JLPTLevelId } from '@/types/learning';

type QuizSetDetail = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  level: string;
  set_type: string;
  categories: string[];
  created_at: string | null;
  author_name: string | null;
  questions: unknown[];
  isCompleted: boolean;
  best_score: { score: number; total: number; percentage: number } | null;
};

function RelativeTime({ dateStr }: { dateStr: string }) {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return <>Hari ini</>;
  if (diffDays === 1) return <>Kemarin</>;
  if (diffDays < 30) return <>{diffDays} hari lalu</>;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return <>{diffMonths} bulan lalu</>;
  return <>{Math.floor(diffMonths / 12)} tahun lalu</>;
}

function ExamDetailView({ level, onStart }: { level: string; onStart: () => void }) {
  const { data: poolStats, isLoading } = usePoolStats(level);
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-lg px-4 py-6 flex flex-col gap-6">
      <Button
        color="tertiary"
        size="sm"
        iconLeading={ChevronLeft}
        onClick={() => void navigate({ to: '/quizzes' })}
      >
        Kembali ke Katalog
      </Button>

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <FeaturedIcon icon={GraduationHat01} color="brand" theme="light" size="lg" />
          <div>
            <h1 className="text-primary text-xl font-bold">
              Simulasi Ujian JLPT {level.toUpperCase()}
            </h1>
            <p className="text-tertiary text-sm mt-0.5">
              {isLoading ? '...' : `${poolStats?.total_needed ?? 0} soal · Soal diacak setiap kali`}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-secondary bg-secondary p-4">
          <p className="text-secondary text-sm font-medium mb-1">Cara kerja</p>
          <p className="text-tertiary text-sm">
            Soal diambil secara acak dari kontribusi komunitas sesuai proporsi ujian JLPT resmi.
            Setiap simulasi akan menghadirkan set soal yang berbeda.
          </p>
        </div>
      </div>

      <Button
        color="primary"
        size="lg"
        onClick={onStart}
        isDisabled={!poolStats?.ready}
        className="w-full"
      >
        Mulai Kuis
      </Button>
    </main>
  );
}

interface QuizDetailPageProps {
  slug: string;
  onStart: () => void;
}

export function QuizDetailPage({ slug, onStart }: QuizDetailPageProps) {
  const navigate = useNavigate();

  const examLevel = getExamLevel(slug);
  const isExam = examLevel !== null;

  const { data, isLoading, error } = useQuery<{ id: string } & QuizSetDetail>({
    queryKey: ['quiz-detail', slug],
    queryFn: async () => {
      const res = await fetch(`/api/quiz-sets/${slug}`);
      if (!res.ok) throw new Error('Quiz tidak ditemukan');
      return res.json() as Promise<{ id: string } & QuizSetDetail>;
    },
    enabled: !isExam,
    staleTime: 1000 * 60,
  });

  if (isExam && examLevel) {
    return <ExamDetailView level={examLevel} onStart={onStart} />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-tertiary text-sm">Memuat...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4">
        <p className="text-secondary text-center text-sm">Kuis tidak ditemukan.</p>
        <Button color="tertiary" onClick={() => void navigate({ to: '/quizzes' })}>
          Kembali ke Katalog
        </Button>
      </div>
    );
  }

  const isExamSet = data.set_type === 'exam';
  const categoryLabels = (data.categories as string[]).map(
    (c) => CATEGORY_LABELS[c as keyof typeof CATEGORY_LABELS] ?? c,
  );

  return (
    <main className="mx-auto max-w-lg px-4 py-6 flex flex-col gap-6">
      <Button
        color="tertiary"
        size="sm"
        iconLeading={ChevronLeft}
        onClick={() => void navigate({ to: '/quizzes' })}
      >
        Kembali ke Katalog
      </Button>

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <FeaturedIcon
            icon={isExamSet ? GraduationHat01 : BookOpen01}
            color={isExamSet ? 'brand' : 'gray'}
            theme="light"
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap">
              <h1 className="text-primary text-xl font-bold leading-snug">{data.title}</h1>
              {data.isCompleted && (
                <CheckCircle className="size-5 text-success-primary shrink-0 mt-0.5" aria-label="Sudah selesai" />
              )}
            </div>
            <p className="text-tertiary text-sm mt-0.5">
              {data.questions.length} soal ·{' '}
              {categoryLabels.join(', ')} ·{' '}
              {LEVEL_LABELS[data.level as JLPTLevelId] ?? data.level}
            </p>
            {(data.author_name ?? data.created_at) && (
              <p className="text-tertiary text-xs mt-1">
                {data.author_name ? `oleh ${data.author_name}` : ''}
                {data.author_name && data.created_at ? ' · ' : ''}
                {data.created_at ? <RelativeTime dateStr={data.created_at} /> : null}
              </p>
            )}
          </div>
        </div>

        {data.description && (
          <p className="text-tertiary text-sm leading-relaxed">{data.description}</p>
        )}

        {data.best_score && (
          <div className="rounded-xl border border-secondary bg-secondary p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-secondary text-sm font-medium">Skor Terbaik</p>
              <BadgeWithDot color="success" size="sm">
                {data.best_score.percentage}%
              </BadgeWithDot>
            </div>
            <ProgressBarBase value={data.best_score.percentage} className="w-full" />
            <p className="text-tertiary text-xs">
              {data.best_score.score} dari {data.best_score.total} benar
            </p>
          </div>
        )}
      </div>

      <Button color="primary" size="lg" onClick={onStart} className="w-full">
        {data.isCompleted ? 'Ulangi Kuis' : 'Mulai Kuis'}
      </Button>
    </main>
  );
}
