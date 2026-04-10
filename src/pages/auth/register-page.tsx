import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from '@/lib/toast';
import { Input } from '@/components/base/input/input';
import { Button } from '@/components/base/buttons/button';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mode: 'register' }),
      });
      if (!res.ok) {
        const data = await res.json() as { message?: string };
        toast.error(data.message ?? 'Gagal mengirim OTP');
        return;
      }
      // Store email in sessionStorage for verify-otp page
      sessionStorage.setItem('otp_email', email);
      sessionStorage.setItem('otp_mode', 'register');
      void navigate({ to: '/auth/verify-otp' });
    } catch {
      toast.error('Gagal mengirim OTP. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 pb-[env(safe-area-inset-bottom)]">
      <div className="w-full max-w-sm">
        <h1 className="text-primary text-2xl font-bold mb-2">Daftar ke Ippo</h1>
        <p className="text-tertiary text-sm mb-6">Masukkan email untuk menerima kode OTP</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="nama@email.com"
            value={email}
            onChange={setEmail}
            isRequired
          />
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            isDisabled={isLoading || !email}
            className="w-full"
          >
            Kirim Kode OTP
          </Button>
        </form>
        <p className="text-tertiary text-sm mt-4 text-center">
          Sudah punya akun?{' '}
          <Button color="link-color" href="/auth/login">Masuk</Button>
        </p>
      </div>
    </div>
  );
}
