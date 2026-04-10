import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { Input } from '@/components/base/input/input';
import { Button } from '@/components/base/buttons/button';

const emailSchema = z.string().email();

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverErrorLinkTo, setServerErrorLinkTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = emailSchema.safeParse(email).success;

  function handleEmailChange(value: string) {
    setEmail(value);
    setServerError(null);
    setServerErrorLinkTo(null);
    if (value && !emailSchema.safeParse(value).success) {
      setEmailError('Email tidak valid');
    } else {
      setEmailError(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmailValid) {
      setEmailError('Email tidak valid');
      return;
    }

    setIsSubmitting(true);
    setServerError(null);
    setServerErrorLinkTo(null);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mode: 'login' }),
      });

      if (res.status === 404) {
        setServerError('Akun tidak ditemukan. ');
        setServerErrorLinkTo('/auth/register');
      } else if (!res.ok) {
        setServerError('Gagal mengirim kode. Cek koneksi.');
      } else {
        navigate({ to: '/auth/verify-otp', search: { email: encodeURIComponent(email), mode: 'login' } });
      }
    } catch {
      setServerError('Gagal mengirim kode. Cek koneksi.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm px-4 pt-12">
      <h1 className="mb-8 text-2xl font-bold text-primary">Masuk ke Akun</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          type="email"
          label="Email"
          placeholder="nama@email.com"
          value={email}
          onChange={handleEmailChange}
          isInvalid={!!emailError}
          hint={emailError ? <span className="text-error-primary">{emailError}</span> : undefined}
        />

        {serverError && (
          <p className="text-sm text-error-primary">
            {serverError}
            {serverErrorLinkTo && (
              <Button color="link-color" size="sm" href={serverErrorLinkTo}>
                Daftar baru?
              </Button>
            )}
          </p>
        )}

        <Button
          type="submit"
          color="primary"
          size="md"
          isDisabled={!isEmailValid || isSubmitting}
          isLoading={isSubmitting}
          className="mt-2 w-full"
        >
          Kirim Kode OTP
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Button color="link-color" size="md" href="/auth/register">
          Belum punya akun? Daftar
        </Button>
      </div>
    </div>
  );
}
