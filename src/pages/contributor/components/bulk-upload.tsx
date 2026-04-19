import { useRef, useState } from 'react';
import { UploadCloud02 } from '@untitledui/icons';
import { z } from 'zod';
import type { QuizQuestionInput } from '@/db/validators';
import { QuizQuestionInputSchema } from '@/db/validators';
import { Button } from '@/components/base/buttons/button';

interface BulkUploadProps {
  onQuestionsLoaded: (questions: QuizQuestionInput[]) => void;
}

export function BulkUpload({ onQuestionsLoaded }: BulkUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setSuccessCount(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const raw = JSON.parse(evt.target?.result as string);
        const parsed = z.array(QuizQuestionInputSchema).safeParse(raw);
        if (!parsed.success) {
          const msgs = parsed.error.issues
            .slice(0, 3)
            .map((err) => `${err.path.join('.')}: ${err.message}`);
          setErrors(msgs);
          return;
        }
        setSuccessCount(parsed.data.length);
        onQuestionsLoaded(parsed.data);
      } catch {
        setErrors(['File JSON tidak valid. Pastikan format file benar.']);
      }
      // Reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        className="sr-only"
        id="bulk-upload-input"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        color="secondary"
        size="sm"
        iconLeading={UploadCloud02}
        onClick={() => inputRef.current?.click()}
      >
        Upload JSON
      </Button>

      {successCount !== null && (
        <p className="text-sm text-success-primary">
          Berhasil memuat {successCount} pertanyaan dari file JSON.
        </p>
      )}

      {errors.length > 0 && (
        <ul className="flex flex-col gap-1">
          {errors.map((err, i) => (
            <li key={i} className="text-sm text-error-primary">
              {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
