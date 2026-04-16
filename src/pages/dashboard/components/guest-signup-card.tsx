import { Button } from '@/components/base/buttons/button';

export function GuestSignupCard() {
  return (
    <div className="rounded-xl border border-secondary bg-secondary p-4">
      <p className="text-primary text-sm font-semibold mb-1">Simpan progresmu!</p>
      <p className="text-tertiary text-xs mb-3">
        Daftar gratis untuk menyinkronkan progres belajarmu di semua perangkat.
      </p>
      <Button color="primary" size="sm" href="/auth/register" className="w-full">
        Daftar Sekarang
      </Button>
    </div>
  );
}
