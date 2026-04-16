import { Button } from '@/components/base/buttons/button';

export function NoAssessmentBanner() {
  return (
    <div className="rounded-xl border border-secondary bg-secondary p-4">
      <p className="text-secondary text-sm font-medium mb-2">
        💡 Belum tahu level kamu? Coba Assessment
      </p>
      <Button color="link-color" size="sm" href="/onboarding">
        Ambil Assessment Sekarang
      </Button>
    </div>
  );
}
