import { createFileRoute } from '@tanstack/react-router';
import { LettersPage } from '@/pages/letters/letters-page';

export const Route = createFileRoute('/letters/')({
  component: LettersPage,
});
