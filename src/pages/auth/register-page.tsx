import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { Input } from '@/components/base/input/input';
import { Button } from '@/components/base/buttons/button';
import { RadioGroup, RadioButton } from '@/components/base/radio-buttons/radio-buttons';

const emailSchema = z.string().email();

function getDefaultLanguage(): 'id' | 'en' {
  const lang = navigator.language.toLowerCase();
  return lang.startsWith('id') ? 'id' : 'en';
}

export function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [language, setLanguage] = useState<'id' | 'en'>(getDefaultLanguage);

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
        body: JSON.stringify({ email, name: name || undefined, language, mode: 'register' }),
      });

      if (res.status === 409) {
        setServerError('Akun sudah terdaftar. Coba ');
        setServerErrorLinkTo('/auth/login');
      } else if (!res.ok) {
        setServerError('Gagal mengirim kode. Cek koneksi.');
      } else {
        navigate({ to: '/auth/verify-otp', search: { email: encodeURIComponent(email), mode: 'register' } });
      }
    } catch {
      setServerError('Gagal mengirim kode. Cek koneksi.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm px-4 pt-12">
      <h1 className="mb-8 text-2xl font-bold text-primary">Buat Akun Baru</h1>

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

        <Input
          type="text"
          label="Nama (opsional)"
          placeholder="Nama kamu"
          value={name}
          onChange={setName}
        />

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-secondary">Bahasa</span>
          <RadioGroup
            value={language}
            onChange={(val) => setLanguage(val as 'id' | 'en')}
            aria-label="Pilih bahasa"
          >
            <RadioButton value="id" label="Bahasa Indonesia" />
            <RadioButton value="en" label="English" />
          </RadioGroup>
        </div>

        {serverError && (
          <p className="text-sm text-error-primary">
            {serverError}
            {serverErrorLinkTo && (
              <Link to={serverErrorLinkTo} className="font-semibold underline">
                Login
              </Link>
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
        <Button color="link-color" size="md" href="/auth/login">
          Sudah punya akun? Masuk
        </Button>
      </div>
    </div>
  );
}
