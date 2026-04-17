import { Lock01 } from '@untitledui/icons';
import { motion } from 'motion/react';
import { Badge } from '@/components/base/badges/badges';
import { Button } from '@/components/base/buttons/button';
import type { Section } from '@/types/learning';

interface SectionQuizCardProps {
  section: Section;
  quizSlug: string;
}

export function SectionQuizCard({ section, quizSlug }: SectionQuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-secondary bg-secondary p-5 text-center my-4"
    >
      <Badge type="pill-color" color="brand" size="sm">
        UP NEXT
      </Badge>
      <Lock01 className="size-5 text-fg-quaternary mt-3 mx-auto" aria-hidden="true" />
      <p className="text-primary font-bold text-xl mt-2">{section.title}</p>
      <p className="text-tertiary text-sm mt-1">
        Uji penguasaan {section.title} kamu dengan kuis!
      </p>
      <Button
        color="primary"
        size="md"
        className="mt-4 w-full"
        href={`/quizzes/${quizSlug}`}
      >
        Mulai Kuis
      </Button>
    </motion.div>
  );
}
