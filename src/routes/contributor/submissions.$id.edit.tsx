import { createFileRoute } from '@tanstack/react-router';
import { SubmissionFormPage } from '@/pages/contributor/submission-form-page';

export const Route = createFileRoute('/contributor/submissions/$id/edit')({
  component: function EditSubmissionPage() {
    const { id } = Route.useParams();
    return <SubmissionFormPage submissionId={id} />;
  },
});
