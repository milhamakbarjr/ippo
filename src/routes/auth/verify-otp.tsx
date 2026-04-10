import { createFileRoute } from '@tanstack/react-router';
import { VerifyOtpPage } from '@/pages/auth/verify-otp-page';

export const Route = createFileRoute('/auth/verify-otp')({
  validateSearch: (search) => ({
    email: (search.email as string) ?? '',
    mode: ((search.mode as string) ?? 'register') as 'register' | 'login',
  }),
  component: VerifyOtpPage,
});
