import { createFileRoute } from '@tanstack/react-router';
import { TipsPage } from '@/pages/letters/tips-page';

export const Route = createFileRoute('/letters/tips/$type/')({
  component: TipsPage,
});
