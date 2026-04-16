import { RadioGroup } from '@/components/base/radio-buttons/radio-buttons';
import { useAssessmentStore } from '@/stores/assessment-store';
import { questions } from '@/content/onboarding-assessment';
import { MascotTooltip } from '../components/mascot-tooltip';
import { OptionCard } from '../components/option-card';

interface QuizStepProps {
  questionIndex: number; // 0-based
}

export function QuizStep({ questionIndex }: QuizStepProps) {
  const { answers, setAnswer } = useAssessmentStore();

  const question = questions[questionIndex];
  if (!question) return null;

  const selectedOptionId = answers[question.id] ?? '';

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-6 max-w-lg mx-auto w-full">
      {/* Mascot with Untitled UI Tooltip carrying the question */}
      <MascotTooltip
        tooltipText={question.questionText}
        size="sm"
        placement="right"
      />

      {/* Answer cards using Untitled UI RadioGroup */}
      <RadioGroup
        value={selectedOptionId}
        onChange={(val) => setAnswer(question.id, val)}
        aria-label={question.questionText}
        className="w-full gap-0"
      >
        <div className="flex flex-col gap-2">
          {question.options.map((opt) => (
            <OptionCard
              key={opt.id}
              value={opt.id}
              label={opt.text}
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
