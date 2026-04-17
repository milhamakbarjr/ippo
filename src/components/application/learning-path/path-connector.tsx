import { motion } from 'motion/react';

interface PathConnectorProps {
  completed: boolean;
}

export function PathConnector({ completed }: PathConnectorProps) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3 }}
      style={{ transformOrigin: 'top' }}
      className={`w-0.5 h-10 mx-auto ${completed ? 'bg-success-primary' : 'bg-border-secondary'}`}
    />
  );
}
