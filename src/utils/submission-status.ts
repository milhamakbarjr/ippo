export type SubmissionBadgeColor = 'warning' | 'success' | 'error' | 'gray';

export const CATEGORY_LABELS: Record<string, string> = {
  vocab:   'Kosakata',
  kanji:   'Kanji',
  grammar: 'Tata Bahasa',
  reading: 'Membaca',
};

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

/** Returns the JLPT level string from an exam slug (`exam-n5` → `'n5'`), or null if not an exam slug. */
export function getExamLevel(slug: string): string | null {
  return slug.startsWith('exam-') ? slug.slice(5) : null;
}
