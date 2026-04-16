import { cx } from '@/utils/cx';

interface IppoLogoProps {
  className?: string;
}

export function IppoLogo({ className }: IppoLogoProps) {
  return (
    <span className={cx('font-bold text-primary tracking-tight', className)}>
      一歩 <span className="text-brand-primary">Ippo</span>
    </span>
  );
}
