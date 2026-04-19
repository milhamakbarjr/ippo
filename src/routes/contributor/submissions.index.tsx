import { createFileRoute } from '@tanstack/react-router';
import { MySubmissionsPage } from '@/pages/contributor/my-submissions-page';

export const Route = createFileRoute('/contributor/submissions/')({
  component: MySubmissionsPage,
});
