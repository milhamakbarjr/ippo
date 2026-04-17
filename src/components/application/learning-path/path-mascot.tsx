interface PathMascotProps {
  side: 'left' | 'right';
}

export function PathMascot(_props: PathMascotProps) {
  return (
    <img
      src="/images/onboarding-mascot.png"
      alt=""
      aria-hidden="true"
      className="w-16 h-20 object-contain"
    />
  );
}
