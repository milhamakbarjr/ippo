import { motion } from 'motion/react';

const COLORS = ['bg-brand-solid', 'bg-success-primary', 'bg-warning-primary'];

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 120,
  y: -(Math.random() * 80 + 40),
  rotate: Math.random() * 360,
  color: COLORS[i % 3],
}));

interface ConfettiBurstProps {
  show: boolean;
}

export function ConfettiBurst({ show }: ConfettiBurstProps) {
  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute left-1/2 top-1/2 size-2 rounded-sm ${p.color}`}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rotate }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
