import { Trash01 } from '@untitledui/icons';
import type { QuizQuestionInput } from '@/db/validators';
import { Button } from '@/components/base/buttons/button';
import { TextArea } from '@/components/base/textarea/textarea';
import { Input } from '@/components/base/input/input';
import { Label } from '@/components/base/input/label';
import { RadioGroup, RadioButton } from '@/components/base/radio-buttons/radio-buttons';

interface QuestionFormProps {
  value: QuizQuestionInput;
  onChange: (v: QuizQuestionInput) => void;
  onRemove: () => void;
  index: number;
}

export function QuestionForm({ value, onChange, onRemove, index }: QuestionFormProps) {
  const correctIndex = value.options.findIndex((o) => o.isCorrect);

  const handleOptionText = (optIdx: number, text: string) => {
    const newOptions = value.options.map((o, i) =>
      i === optIdx ? { ...o, text } : o,
    );
    onChange({ ...value, options: newOptions });
  };

  const handleCorrectAnswer = (optIdx: number) => {
    const newOptions = value.options.map((o, i) => ({
      ...o,
      isCorrect: i === optIdx,
    }));
    onChange({ ...value, options: newOptions });
  };

  return (
    <div className="rounded-xl border border-secondary bg-secondary p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-secondary">Pertanyaan {index + 1}</span>
        <Button
          type="button"
          color="tertiary"
          size="sm"
          iconLeading={Trash01}
          onClick={onRemove}
        >
          Hapus
        </Button>
      </div>

      <TextArea
        label="Teks Pertanyaan"
        isRequired
        value={value.questionText}
        onChange={(v) => onChange({ ...value, questionText: v })}
        placeholder="Masukkan teks pertanyaan..."
        rows={3}
      />

      <div className="flex flex-col gap-3">
        <Label>Pilihan Jawaban</Label>
        <RadioGroup
          value={correctIndex.toString()}
          onChange={(val) => handleCorrectAnswer(Number(val))}
          aria-label="Pilih jawaban benar"
          className="gap-3"
        >
          {value.options.map((option, optIdx) => (
            <div key={option.id} className="flex items-center gap-3">
              <RadioButton
                value={optIdx.toString()}
                aria-label={`Tandai pilihan ${String.fromCharCode(65 + optIdx)} sebagai jawaban benar`}
              />
              <Input
                aria-label={`Pilihan ${String.fromCharCode(65 + optIdx)}`}
                placeholder={`Pilihan ${String.fromCharCode(65 + optIdx)}`}
                value={option.text}
                onChange={(v) => handleOptionText(optIdx, v)}
                className="flex-1"
              />
            </div>
          ))}
        </RadioGroup>
        <p className="text-xs text-tertiary">Pilih tombol radio di kiri untuk menandai jawaban benar</p>
      </div>

      <TextArea
        label="Penjelasan"
        isRequired
        value={value.explanation}
        onChange={(v) => onChange({ ...value, explanation: v })}
        placeholder="Jelaskan mengapa jawaban tersebut benar..."
        rows={2}
      />
    </div>
  );
}
