import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from '@/lib/toast';
import { collectMigrationPayload, clearMigrationKeys } from '@/lib/migration-collector';
import { Input } from '@/components/base/input/input';
import { Button } from '@/components/base/buttons/button';

type VerifyOtpResponse = {
  success: boolean;
  user: { id: string; email: string; assessed_level: string | null };
  migration: { success: boolean; migratedSteps: number; assessmentMigrated: boolean; error?: string } | null;
  message?: string;
};

export function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const email = sessionStorage.getItem('otp_email') ?? '';
  const mode = sessionStorage.getItem('otp_mode') ?? 'register';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) return;
    setIsLoading(true);

    // Collect localStorage progress before submission
    const migrationPayload = mode === 'register' ? collectMigrationPayload() : null;

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          mode,
          ...(migrationPayload ? { migrationPayload } : {}),
        }),
      });

      const data = await res.json() as VerifyOtpResponse;

      if (!res.ok) {
        toast.error(data.message ?? 'Kode tidak valid. Coba lagi.');
        setIsLoading(false);
        return;
      }

      // Handle migration result
      if (data.migration?.success) {
        clearMigrationKeys();
        toast.success('Progres sebelumnya sudah disinkronisasi! ✓', { duration: 5000 });
      } else if (data.migration && !data.migration.success) {
        // Non-fatal: user is registered but migration failed
        toast.error('Migrasi gagal. Hubungi support jika ini terus terjadi.', { duration: 8000 });
      }

      // Navigate regardless (user is now registered)
      const targetLevel = data.user.assessed_level ?? 'kana';
      void navigate({ to: '/learning/$level', params: { level: targetLevel } });
    } catch {
      toast.error('Verifikasi gagal. Coba lagi.');
      setIsLoading(false);
    }
  }

  async function handleResend() {
    try {
      await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mode }),
      });
      toast.success('Kode OTP baru sudah dikirim');
    } catch {
      toast.error('Gagal mengirim ulang OTP');
    }
  }

  if (!email) {
    void navigate({ to: '/auth/register' });
    return null;
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 pb-[env(safe-area-inset-bottom)]">
      <div className="w-full max-w-sm">
        <h1 className="text-primary text-2xl font-bold mb-2">Masukkan Kode OTP</h1>
        <p className="text-tertiary text-sm mb-6">
          Kode dikirim ke <span className="text-secondary font-medium">{email}</span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Kode OTP"
            placeholder="123456"
            value={otp}
            onChange={setOtp}
            inputMode="numeric"
            maxLength={6}
            pattern="[0-9]*"
            isRequired
          />
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            isDisabled={isLoading || otp.length !== 6}
            className="w-full"
          >
            Verifikasi
          </Button>
        </form>
        <p className="text-tertiary text-sm mt-4 text-center">
          Tidak menerima kode?{' '}
          <Button color="link-color" onClick={handleResend}>Kirim ulang</Button>
        </p>
      </div>
    </div>
  );
}
