export type SubmissionBadgeColor = 'warning' | 'success' | 'error' | 'gray';

export function submissionBadgeColor(status: string): SubmissionBadgeColor {
  switch (status) {
    case 'pending_review': return 'warning';
    case 'published':      return 'success';
    case 'rejected':       return 'error';
    default:               return 'gray';
  }
}

export function submissionStatusLabel(status: string): string {
  switch (status) {
    case 'pending_review': return 'Menunggu Review';
    case 'published':      return 'Diterbitkan';
    case 'rejected':       return 'Ditolak';
    case 'draft':          return 'Draf';
    default:               return status;
  }
}

export function formatSubmissionDate(date: Date | string | null): string {
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(date));
}
