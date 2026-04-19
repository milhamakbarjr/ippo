import { createFileRoute } from '@tanstack/react-router';
import { SubmissionFormPage } from '@/pages/contributor/submission-form-page';

export const Route = createFileRoute('/contributor/submissions/new')({
  component: SubmissionFormPage,
});
