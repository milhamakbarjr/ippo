import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from '@untitledui/icons';
import type { QuizSubmission } from '@/db/schema';
import type { QuizQuestionInput } from '@/db/validators';
import { QuizSubmissionCreateSchema } from '@/db/validators';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { TextArea } from '@/components/base/textarea/textarea';
import { NativeSelect } from '@/components/base/select/select-native';
import { LEVEL_LABELS, LEVEL_ORDER } from '@/content/levels';
import { CATEGORY_LABELS } from '@/utils/submission-status';
import { JLPT_EXAM_CONFIG } from '@/config/jlpt-exam-config';
import { QuestionForm } from './components/question-form';
import { BulkUpload } from './components/bulk-upload';
import { toast } from '@/lib/toast';

interface SubmissionFormPageProps {
  submissionId?: string;
}

type SubmissionResponse = { submission: QuizSubmission };

const LEVEL_OPTIONS = LEVEL_ORDER.map((value) => ({ value, label: LEVEL_LABELS[value] }));
const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }));

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function blankQuestion(level: string, category: string): QuizQuestionInput {
  return {
    id: crypto.randomUUID(),
    questionText: '',
    options: [
      { id: crypto.randomUUID(), text: '', isCorrect: true },
      { id: crypto.randomUUID(), text: '', isCorrect: false },
      { id: crypto.randomUUID(), text: '', isCorrect: false },
      { id: crypto.randomUUID(), text: '', isCorrect: false },
    ],
    explanation: '',
    category: category as QuizQuestionInput['category'],
    level: level as QuizQuestionInput['level'],
  };
}

export function SubmissionFormPage({ submissionId }: SubmissionFormPageProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!submissionId;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('n5');
  const [category, setCategory] = useState('vocab');
  const [questions, setQuestions] = useState<QuizQuestionInput[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const initialized = useRef(false);

  // Fetch existing submission when editing
  const { data: submissionsData } = useQuery<SubmissionResponse>({
    queryKey: ['contributor', 'submission', submissionId],
    queryFn: () =>
      fetch(`/api/contributor/submissions/${submissionId}`).then((r) => {
        if (!r.ok) throw new Error('Gagal memuat submission');
        return r.json() as Promise<SubmissionResponse>;
      }),
    enabled: isEditMode,
    staleTime: 1000 * 30,
  });

  // Populate form when editing
  useEffect(() => {
    if (!isEditMode || initialized.current) return;
    const existing = submissionsData?.submission;
    if (!existing) return;
    setTitle(existing.title);
    setSlug(existing.slug);
    setSlugTouched(true);
    setDescription(existing.description ?? '');
    setLevel(existing.level);
    setCategory(existing.category);
    setQuestions(existing.questions as QuizQuestionInput[]);
    initialized.current = true;
  }, [submissionsData, submissionId, isEditMode]);

  // Auto-fill slug from title when not manually edited
  useEffect(() => {
    if (!slugTouched && title) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  // Keep question level/category in sync with submission-level values
  useEffect(() => {
    setQuestions((prev) =>
      prev.map((q) => ({
        ...q,
        level: level as QuizQuestionInput['level'],
        category: category as QuizQuestionInput['category'],
      })),
    );
  }, [level, category]);

  const saveMutation = useMutation<SubmissionResponse, Error, { method: 'POST' | 'PUT' }>({
    mutationFn: async ({ method }) => {
      const url = isEditMode
        ? `/api/contributor/submissions/${submissionId}`
        : '/api/contributor/submissions';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, title, description: description || undefined, level, category, questions }),
      });
      if (!res.ok) {
        const err = await res.json() as { error?: string };
        throw new Error(err.error ?? 'Gagal menyimpan submission');
      }
      return res.json() as Promise<SubmissionResponse>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['contributor', 'submission', data.submission.id], data);
    },
  });

  const submitForReviewMutation = useMutation<{ success: boolean }, Error, string>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/contributor/submissions/${id}/submit`, { method: 'POST' });
      if (!res.ok) {
        const err = await res.json() as { error?: string };
        throw new Error(err.error ?? 'Gagal mengirim submission');
      }
      return res.json() as Promise<{ success: boolean }>;
    },
    onSuccess: () => {
      toast.success('Submission berhasil dikirim untuk review!');
      void navigate({ to: '/contributor/submissions' });
    },
  });

  const validate = () => {
    const result = QuizSubmissionCreateSchema.safeParse({ slug, title, description: description || undefined, level, category, questions });
    if (!result.success) {
      const firstError = result.error.issues[0];
      setValidationError(`${firstError.path.join('.')}: ${firstError.message}`);
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validate()) return;
    await saveMutation.mutateAsync({ method: isEditMode ? 'PUT' : 'POST' });
  };

  const handleSubmitForReview = async () => {
    if (!validate()) return;
    const saved = await saveMutation.mutateAsync({ method: isEditMode ? 'PUT' : 'POST' });
    await submitForReviewMutation.mutateAsync(saved.submission.id);
  };

  const addQuestion = () => {
    if (questions.length >= 50) return;
    setQuestions((prev) => [...prev, blankQuestion(level, category)]);
  };

  const updateQuestion = (idx: number, val: QuizQuestionInput) => {
    setQuestions((prev) => prev.map((q, i) => (i === idx ? val : q)));
  };

  const removeQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleBulkLoad = (loaded: QuizQuestionInput[]) => {
    const withMeta = loaded.map((q) => ({
      ...q,
      level: level as QuizQuestionInput['level'],
      category: category as QuizQuestionInput['category'],
    }));
    setQuestions((prev) => [...prev, ...withMeta].slice(0, 50));
  };

  const isBusy = saveMutation.isPending || submitForReviewMutation.isPending;

  const jlptTarget = JLPT_EXAM_CONFIG[level]?.[category as QuizQuestionInput['category']];
  const jlptHint = jlptTarget === undefined || jlptTarget === 0 ? (
    <p className="text-xs text-tertiary">Kanji termasuk dalam bagian Kosakata di ujian JLPT resmi.</p>
  ) : (
    <p className="text-xs text-tertiary">
      Target JLPT {LEVEL_LABELS[level as keyof typeof LEVEL_LABELS]}:{' '}
      <span className="font-medium text-secondary">{jlptTarget} soal</span> untuk kategori {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]?.toLowerCase()}.
    </p>
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-primary">
          {isEditMode ? 'Edit Submission' : 'Buat Submission Baru'}
        </h1>
        <p className="text-sm text-tertiary mt-0.5">
          {isEditMode ? 'Perbarui draft quiz kamu' : 'Isi informasi quiz yang ingin kamu kontribusikan'}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="Judul"
          isRequired
          placeholder="Contoh: Latihan Kosakata N4 - Kata Kerja"
          value={title}
          onChange={setTitle}
        />

        <Input
          label="Slug"
          isRequired
          placeholder="contoh-latihan-n4"
          value={slug}
          onChange={(v) => {
            setSlugTouched(true);
            setSlug(v);
          }}
          hint="Identifikasi unik URL. Auto-diisi dari judul."
        />

        <TextArea
          label="Deskripsi (opsional)"
          placeholder="Jelaskan secara singkat isi kuis ini..."
          rows={3}
          maxLength={500}
          value={description}
          onChange={setDescription}
          hint={`${description.length}/500`}
          size="sm"
        />

        <div className="grid grid-cols-2 gap-4">
          <NativeSelect
            label="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            options={LEVEL_OPTIONS}
          />
          <NativeSelect
            label="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={CATEGORY_OPTIONS}
          />
        </div>

        {jlptHint}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-secondary">
            Pertanyaan ({questions.length}/50)
          </h2>
          <BulkUpload onQuestionsLoaded={handleBulkLoad} />
        </div>

        {questions.map((q, idx) => (
          <QuestionForm
            key={q.id}
            value={q}
            onChange={(v) => updateQuestion(idx, v)}
            onRemove={() => removeQuestion(idx)}
            index={idx}
          />
        ))}

        {questions.length < 50 && (
          <Button
            type="button"
            color="secondary"
            size="sm"
            iconLeading={Plus}
            onClick={addQuestion}
          >
            Tambah Pertanyaan
          </Button>
        )}
      </div>

      {(validationError ?? saveMutation.error ?? submitForReviewMutation.error) && (
        <p className="text-sm text-error-primary">
          {validationError ??
            saveMutation.error?.message ??
            submitForReviewMutation.error?.message}
        </p>
      )}

      {saveMutation.isSuccess && !submitForReviewMutation.isPending && (
        <p className="text-sm text-success-primary">Draft berhasil disimpan.</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          color="secondary"
          size="md"
          isDisabled={isBusy}
          onClick={() => void handleSaveDraft()}
        >
          {saveMutation.isPending && !submitForReviewMutation.isPending
            ? 'Menyimpan...'
            : 'Simpan Draft'}
        </Button>

        <Button
          type="button"
          color="primary"
          size="md"
          isDisabled={isBusy || questions.length === 0}
          onClick={() => void handleSubmitForReview()}
        >
          {submitForReviewMutation.isPending ? 'Mengirim...' : 'Kirim untuk Review'}
        </Button>
      </div>
    </main>
  );
}
