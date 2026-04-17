import { createFileRoute } from '@tanstack/react-router';
import { TipDetailPage } from '@/pages/letters/tip-detail-page';

export const Route = createFileRoute('/letters/tips/$type/$tipSlug')({
  component: TipDetailPage,
});
