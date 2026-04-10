import { createFileRoute } from '@tanstack/react-router';
import { VerifyOtpPage } from '@/pages/auth/verify-otp-page';

export const Route = createFileRoute('/auth/verify-otp')({
  component: VerifyOtpPage,
});
