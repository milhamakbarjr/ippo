import { createFileRoute } from '@tanstack/react-router';
import { GuidebookPage } from '@/pages/guidebook-page';

export const Route = createFileRoute('/learning/$level/guidebook/$sectionSlug/$unitSlug')({
  component: GuidebookPage,
});
