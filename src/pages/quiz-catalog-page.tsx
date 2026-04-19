import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle, BookOpen01, GraduationHat01, ArrowRight, ChevronRight, Lock01 } from '@untitledui/icons';
import { Tabs, Tab, TabList, TabPanel } from '@/components/application/tabs/tabs';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { Button } from '@/components/base/buttons/button';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';
import { NativeSelect } from '@/components/base/select/select-native';
import { useQuizCatalog, usePoolStats } from '@/hooks/use-quiz-catalog';
import { LEVEL_LABELS } from '@/content/levels';
import type { JLPTLevelId } from '@/types/learning';
import type { QuizSetListItem } from '@/hooks/use-quiz-catalog';
import { CATEGORY_LABELS } from '@/utils/submission-status';

const CATALOG_LEVELS: JLPTLevelId[] = ['n5', 'n4', 'n3', 'n2', 'n1'];
const EMPTY_SETS: QuizSetListItem[] = [];

type CategoryFilter = 'all' | 'vocab' | 'kanji' | 'grammar' | 'reading' | 'exam';
type SortOption = 'newest' | 'incomplete' | 'questions';

const CATEGORY_CHIPS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'vocab', label: 'Kosakata' },
  { id: 'kanji', label: 'Kanji' },
  { id: 'grammar', label: 'Tata Bahasa' },
  { id: 'reading', label: 'Membaca' },
  { id: 'exam', label: 'Ujian' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'incomplete', label: 'Belum Selesai' },
  { value: 'questions', label: 'Jumlah Soal' },
];

function sortSets(sets: QuizSetListItem[], sort: SortOption): QuizSetListItem[] {
  return [...sets].sort((a, b) => {
    if (sort === 'incomplete') {
      if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
    }
    if (sort === 'questions') return b.question_count - a.question_count;
    // newest (default)
    return (b.created_at ?? '') > (a.created_at ?? '') ? 1 : -1;
  });
}

function ExamCard({ level, onStart }: { level: JLPTLevelId; onStart: () => void }) {
  const { data: poolStats, isLoading } = usePoolStats(level);
  const ready = poolStats?.ready ?? false;
  const shortage = poolStats?.shortage ?? 0;
  const totalNeeded = poolStats?.total_needed ?? 0;

  return (
    <div
      className={`rounded-xl border bg-primary flex items-center gap-3 px-4 py-3 transition duration-100 ease-linear ${
        ready
          ? 'border-brand cursor-pointer hover:bg-primary_hover'
          : 'border-secondary opacity-70'
      }`}
      onClick={ready ? onStart : undefined}
      onKeyDown={ready ? (e) => { if (e.key === 'Enter' || e.key === ' ') onStart(); } : undefined}
      role={ready ? 'button' : undefined}
      tabIndex={ready ? 0 : undefined}
      aria-label={ready ? `Mulai Simulasi Ujian JLPT ${level.toUpperCase()}` : undefined}
    >
      <FeaturedIcon
        icon={ready ? GraduationHat01 : Lock01}
        color={ready ? 'brand' : 'gray'}
        theme="light"
        size="sm"
      />
      <div className="flex-1 min-w-0">
        <p className="text-secondary font-semibold text-sm">
          Simulasi Ujian JLPT {level.toUpperCase()}
        </p>
        <p className="text-tertiary text-xs">
          {isLoading
            ? 'Mengecek pool soal...'
            : ready
              ? `${totalNeeded} soal · Diacak setiap sesi`
              : `Segera Hadir — butuh ${shortage} soal lagi`}
        </p>
      </div>
      {ready && <ChevronRight className="size-4 text-fg-tertiary shrink-0" aria-hidden="true" />}
    </div>
  );
}

function QuizRow({ set, onOpen }: { set: QuizSetListItem; onOpen: (slug: string) => void }) {
  const isExam = set.set_type === 'exam';
  const cats = set.categories as string[];
  const categoryLabel = isExam && cats.length > 1
    ? `${cats.length} kategori`
    : cats[0]
      ? (CATEGORY_LABELS[cats[0] as keyof typeof CATEGORY_LABELS] ?? cats[0])
      : null;

  return (
    <div
      className="rounded-xl border border-secondary bg-primary flex items-center gap-3 px-4 py-3 cursor-pointer transition duration-100 ease-linear hover:bg-primary_hover"
      onClick={() => onOpen(set.slug)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(set.slug); }}
      role="button"
      tabIndex={0}
      aria-label={set.title}
    >
      <FeaturedIcon
        icon={isExam ? GraduationHat01 : BookOpen01}
        color={isExam ? 'brand' : 'gray'}
        theme="light"
        size="sm"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-secondary font-semibold text-sm truncate">{set.title}</p>
          {set.isNew && (
            <BadgeWithDot color="brand" size="sm">Baru</BadgeWithDot>
          )}
          {set.isCompleted && (
            <CheckCircle className="size-4 text-success-primary shrink-0" aria-label="Sudah selesai" />
          )}
        </div>
        <p className="text-tertiary text-xs">
          {set.question_count} soal
          {categoryLabel ? ` · ${categoryLabel}` : ''}
        </p>
      </div>
      <ChevronRight className="size-4 text-fg-tertiary shrink-0" aria-hidden="true" />
    </div>
  );
}

function LevelContent({ level }: { level: JLPTLevelId }) {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [sort, setSort] = useState<SortOption>('newest');

  const { data, isLoading } = useQuizCatalog(level);
  const allSets = data?.quizSets ?? EMPTY_SETS;

  const filtered = useMemo(() => {
    let sets = allSets;
    if (categoryFilter === 'exam') {
      sets = sets.filter((s) => s.set_type === 'exam');
    } else if (categoryFilter !== 'all') {
      sets = sets.filter(
        (s) => s.set_type !== 'exam' && (s.categories as string[]).includes(categoryFilter),
      );
    }
    return sortSets(sets, sort);
  }, [allSets, categoryFilter, sort]);

  const handleOpen = (slug: string) => {
    void navigate({ to: '/quizzes/$slug', params: { slug } });
  };

  const handleExamStart = () => {
    void navigate({ to: '/quizzes/$slug', params: { slug: `exam-${level}` } });
  };

  return (
    <div className="flex flex-col gap-4 pt-4">
      {/* Category chips + sort row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0 overflow-x-auto">
          <Tabs
            selectedKey={categoryFilter}
            onSelectionChange={(key) => setCategoryFilter(key as CategoryFilter)}
          >
            <TabList type="button-gray" size="sm">
              {CATEGORY_CHIPS.map((chip) => (
                <Tab key={chip.id} id={chip.id}>
                  {chip.label}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </div>
        <div className="shrink-0">
          <NativeSelect
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            options={SORT_OPTIONS}
          />
        </div>
      </div>

      {/* Virtual exam card (always at top, visible when not filtering by category) */}
      {(categoryFilter === 'all' || categoryFilter === 'exam') && (
        <ExamCard level={level} onStart={handleExamStart} />
      )}

      {/* Quiz set list */}
      {isLoading ? (
        <p className="text-tertiary text-sm py-6 text-center">Memuat kuis...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-secondary bg-secondary p-6 text-center">
          <p className="text-tertiary text-sm">Belum ada soal untuk filter ini.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((set) => (
            <QuizRow key={set.id} set={set} onOpen={handleOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

export function QuizCatalogPage() {
  const [activeLevel, setActiveLevel] = useState<JLPTLevelId>('n5');

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-primary text-2xl font-bold">Katalog Kuis</h1>
        <p className="text-tertiary text-sm mt-1">
          Latihan soal JLPT per kategori atau simulasi ujian lengkap.
        </p>
      </div>

      <Tabs
        selectedKey={activeLevel}
        onSelectionChange={(key) => setActiveLevel(key as JLPTLevelId)}
      >
        <TabList type="underline" size="sm">
          {CATALOG_LEVELS.map((level) => (
            <Tab key={level} id={level}>
              {LEVEL_LABELS[level]}
            </Tab>
          ))}
        </TabList>

        {CATALOG_LEVELS.map((level) => (
          <TabPanel key={level} id={level}>
            {activeLevel === level && <LevelContent level={level} />}
          </TabPanel>
        ))}
      </Tabs>

      <div className="mt-8 rounded-xl border border-secondary bg-secondary p-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-secondary text-sm font-medium">Punya soal untuk dikontribusikan?</p>
          <p className="text-tertiary text-xs mt-0.5">Bantu komunitas dengan menambah soal baru.</p>
        </div>
        <Button color="secondary" size="sm" href="/contributor/submissions" iconTrailing={ArrowRight}>
          Kontribusi
        </Button>
      </div>
    </main>
  );
}
