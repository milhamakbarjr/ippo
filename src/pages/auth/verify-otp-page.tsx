import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { OTPInput, OTPInputContext, REGEXP_ONLY_DIGITS } from 'input-otp';
import { motion } from 'motion/react';
import { Route } from '@/routes/auth/verify-otp';
import { Badge } from '@/components/base/badges/badges';
import { Button } from '@/components/base/buttons/button';

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  return `${local[0]}***@${domain}`;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const TIMER_TOTAL = 10 * 60; // 10 minutes in seconds
const RESEND_COOLDOWN = 30; // seconds

export function VerifyOtpPage() {
  const navigate = useNavigate();
  const { email: rawEmail, mode } = Route.useSearch();

  // Decode the email from search params
  const email = decodeURIComponent(rawEmail);
  const maskedEmail = maskEmail(email);

  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [isOtpError, setIsOtpError] = useState(false);

  // Countdown timer (seconds remaining)
  const [timeLeft, setTimeLeft] = useState(TIMER_TOTAL);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Resend cooldown
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN);
  const resendRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Confetti state
  const [showConfetti, setShowConfetti] = useState(false);

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(TIMER_TOTAL);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function startResendCooldown() {
    if (resendRef.current) clearInterval(resendRef.current);
    setResendCooldown(RESEND_COOLDOWN);
    resendRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(resendRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    startTimer();
    startResendCooldown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (resendRef.current) clearInterval(resendRef.current);
    };
  }, []);

  async function verifyOtp(value: string) {
    if (value.length !== 6 || isVerifying) return;
    setIsVerifying(true);
    setErrorMsg(null);
    setIsOtpError(false);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: value, mode }),
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('auth_user', JSON.stringify(data.user));

        if (mode === 'register') {
          setShowConfetti(true);
          setTimeout(() => {
            navigate({ to: '/' });
          }, 1000);
        } else {
          navigate({ to: '/' });
        }
      } else {
        const data = await res.json().catch(() => ({}));
        const code = data?.code ?? data?.error;

        if (code === 'OTP_EXPIRED') {
          setErrorMsg('Kode sudah kadaluarsa. Kirim ulang');
          setResendCooldown(0);
        } else {
          // OTP_INVALID or other 400
          setErrorMsg('Kode tidak valid. Coba lagi');
          setIsOtpError(true);
          setShakeKey((k) => k + 1);
        }
        setOtp('');
        setIsVerifying(false);
      }
    } catch {
      setErrorMsg('Verifikasi gagal. Coba lagi.');
      setIsVerifying(false);
    }
  }

  function handleOtpChange(value: string) {
    setOtp(value);
    setIsOtpError(false);
    if (errorMsg && value.length > 0) setErrorMsg(null);

    if (value.length === 6) {
      verifyOtp(value);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setErrorMsg(null);
    setOtp('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mode }),
      });

      if (res.ok) {
        startTimer();
        startResendCooldown();
      } else {
        setErrorMsg('Gagal mengirim ulang. Cek koneksi.');
      }
    } catch {
      setErrorMsg('Gagal mengirim ulang. Cek koneksi.');
    }
  }

  const timerColor: 'warning' | 'error' = timeLeft < 120 ? 'error' : 'warning';

  const confettiParticles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="mx-auto w-full max-w-sm px-4 pt-12">
      {/* Confetti burst */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
          {confettiParticles.map((i) => (
            <motion.div
              key={i}
              className="absolute size-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 40}%`,
                backgroundColor: ['#7f56d9', '#9e77ed', '#53389e', '#f9a8d4', '#86efac'][i % 5],
              }}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{
                y: [0, -80, 200],
                opacity: [1, 1, 0],
                scale: [1, 1.2, 0.5],
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 0.5, delay: Math.random() * 0.2, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      <h1 className="mb-2 text-2xl font-bold text-primary">Masukkan Kode dari Email</h1>
      <p className="mb-8 text-base text-tertiary">
        Kami kirim ke <span className="font-medium text-secondary">{maskedEmail}</span>
      </p>

      {/* OTP input */}
      <motion.div
        key={shakeKey}
        animate={shakeKey > 0 ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.2 }}
        className="mb-6"
      >
        <OTPInput
          maxLength={6}
          value={otp}
          onChange={handleOtpChange}
          pattern={REGEXP_ONLY_DIGITS}
          disabled={isVerifying}
          containerClassName="flex gap-2 justify-center"
          render={({ slots }) => (
            <OTPInputContext.Consumer>
              {() => (
                <>
                  {slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className={[
                        'flex h-14 w-11 items-center justify-center rounded-lg text-xl font-semibold text-primary ring-1 ring-inset transition duration-100 ease-linear',
                        slot.isActive
                          ? 'ring-2 ring-brand'
                          : isOtpError
                            ? 'ring-error bg-error-primary/5'
                            : 'ring-primary bg-primary',
                      ].join(' ')}
                    >
                      {slot.char ?? (
                        slot.hasFakeCaret ? (
                          <div className="h-5 w-px animate-pulse bg-primary" />
                        ) : (
                          <span className="text-placeholder">-</span>
                        )
                      )}
                    </div>
                  ))}
                </>
              )}
            </OTPInputContext.Consumer>
          )}
        />
      </motion.div>

      {/* Error message */}
      {errorMsg && (
        <p className="mb-4 text-center text-sm text-error-primary">{errorMsg}</p>
      )}

      {/* Countdown timer badge */}
      <div className="mb-6 flex justify-center">
        <Badge type="pill-color" color={timerColor} size="md">
          Kode berlaku dalam {formatTime(timeLeft)}
        </Badge>
      </div>

      {/* Verify button */}
      <Button
        type="button"
        color="primary"
        size="md"
        isDisabled={otp.length !== 6 || isVerifying}
        isLoading={isVerifying}
        className="w-full"
        onClick={() => verifyOtp(otp)}
      >
        Verifikasi Kode
      </Button>

      {/* Resend button */}
      <div className="mt-4 text-center">
        <Button
          type="button"
          color="link-color"
          size="md"
          isDisabled={resendCooldown > 0}
          onClick={handleResend}
        >
          {resendCooldown > 0
            ? `Kirim ulang dalam ${resendCooldown}s`
            : 'Tidak terima kode? Kirim ulang'}
        </Button>
      </div>

      {/* Back link */}
      <div className="mt-3 text-center">
        <Button
          type="button"
          color="link-color"
          size="md"
          href={mode === 'register' ? '/auth/register' : '/auth/login'}
        >
          ← Ganti Email
        </Button>
      </div>
    </div>
  );
}
