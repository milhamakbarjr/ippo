import { createFileRoute } from '@tanstack/react-router';
import { ContributorSubmissionDetailPage } from '@/pages/contributor/submission-detail-page';

export const Route = createFileRoute('/contributor/submissions/$id/')({
  component: function ContributorSubmissionDetailRoute() {
    const { id } = Route.useParams();
    return <ContributorSubmissionDetailPage submissionId={id} />;
  },
});
