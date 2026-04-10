import { Button } from '@/components/base/buttons/button';

type QuizPromptProps = {
  quizSlug: string;
  onDismiss: () => void;
};

export function QuizPrompt({ quizSlug, onDismiss }: QuizPromptProps) {
  return (
    <div className="mt-6 rounded-xl border border-secondary bg-secondary p-4 flex flex-col gap-3">
      <p className="text-secondary text-sm font-medium">
        Uji pemahaman kamu dengan kuis!
      </p>
      <div className="flex gap-2">
        <Button
          color="primary"
          size="sm"
          href={`/quizzes/${quizSlug}`}
        >
          Mulai Kuis
        </Button>
        <Button
          color="link-gray"
          size="sm"
          onClick={onDismiss}
        >
          Lewati
        </Button>
      </div>
    </div>
  );
}
