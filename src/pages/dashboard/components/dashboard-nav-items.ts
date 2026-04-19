import { Home01, BookOpen02, Trophy01, RefreshCw05, LetterSpacing01, CheckSquare, Edit05 } from '@untitledui/icons';
import type { NavItemType } from '@/components/application/app-navigation/config';

export const dashboardNavItems: NavItemType[] = [
  { label: 'Belajar',       href: '/',         icon: Home01 },
  { label: 'Jalur Belajar', href: '/learning', icon: BookOpen02 },
  { label: 'Huruf',         href: '/letters',  icon: LetterSpacing01 },
  { label: 'Pencapaian',    href: '/profile',  icon: Trophy01 },
];

export const dashboardFooterItems: NavItemType[] = [
  { label: 'Ambil Ulang Penilaian', href: '/onboarding', icon: RefreshCw05 },
];

export const adminNavItems: NavItemType[] = [
  { label: 'Submission', href: '/admin/submissions', icon: CheckSquare },
];

export const contributorNavItems: NavItemType[] = [
  { label: 'Submission Saya', href: '/contributor/submissions', icon: Edit05 },
];
