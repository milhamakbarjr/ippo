import type { ReactNode } from 'react';
import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { PathNode } from '@/components/application/learning-path/path-node';
import { PathConnector } from '@/components/application/learning-path/path-connector';
import { PathMascot } from '@/components/application/learning-path/path-mascot';
import { SectionHeader } from '@/components/application/learning-path/section-header';
import { SectionDivider } from '@/components/application/learning-path/section-divider';
import { SectionQuizCard } from '@/components/application/learning-path/section-quiz-card';
import type { LevelPathConfig, Step } from '@/types/learning';

interface LearningPathProps {
  config: LevelPathConfig;
  steps: Step[];
  completedSlugs: string[];
  recommendedNextSlug?: string;
  youAreHereCard: ReactNode;
  levelCompleteCard?: ReactNode;
}

export function LearningPath({
  config,
  steps,
  completedSlugs,
  recommendedNextSlug,
  youAreHereCard,
  levelCompleteCard,
}: LearningPathProps) {
  const currentNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentNodeRef.current) return;
    const id = requestAnimationFrame(() => {
      currentNodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => cancelAnimationFrame(id);
  }, [config.levelId]);

  const stepMap = useMemo(() => {
    const map: Record<string, Step> = {};
    for (const step of steps) {
      map[step.slug] = step;
    }
    return map;
  }, [steps]);

  const globalStepSlugs = useMemo(
    () =>
      config.sections.flatMap((section) =>
        section.units.flatMap((unit) => unit.stepSlugs),
      ),
    [config.sections],
  );

  function getNodeStatus(slug: string): 'completed' | 'current' | 'locked' {
    if (completedSlugs.includes(slug)) return 'completed';
    if (slug === recommendedNextSlug) return 'current';
    return 'locked';
  }

  return (
    <div className="flex flex-col items-center w-full pb-16">
      {config.sections.map((section, sectionIndex) => {
        // Determine the active unit: the one containing recommendedNextSlug, or first
        let activeUnitIndex = 0;
        if (recommendedNextSlug) {
          const idx = section.units.findIndex((u) =>
            u.stepSlugs.includes(recommendedNextSlug),
          );
          if (idx >= 0) activeUnitIndex = idx;
        }
        const activeUnit = section.units[activeUnitIndex];

        return (
          <div key={section.slug} className="w-full">
            {activeUnit && (
              <SectionHeader
                section={section}
                unitNumber={activeUnitIndex + 1}
                currentUnit={activeUnit}
                levelId={config.levelId}
              />
            )}

            {sectionIndex === 0 && (
              <div className="w-full mb-6">{youAreHereCard}</div>
            )}

            {sectionIndex === 0 && levelCompleteCard && (
              <div className="w-full mb-6">{levelCompleteCard}</div>
            )}

            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center py-4"
            >
              {section.units.map((unit) =>
                unit.stepSlugs.map((slug) => {
                  const step = stepMap[slug];
                  if (!step) return null;

                  const globalIndex = globalStepSlugs.indexOf(slug);
                  const status = getNodeStatus(slug);
                  const isCurrent = status === 'current';
                  const isFirstNode = globalIndex === 0;

                  const prevSlug =
                    globalIndex > 0
                      ? globalStepSlugs[globalIndex - 1]
                      : null;
                  const prevCompleted = prevSlug
                    ? completedSlugs.includes(prevSlug)
                    : false;

                  const showMascot =
                    globalIndex > 0 && globalIndex % 3 === 2;
                  const mascotSide: 'left' | 'right' =
                    Math.floor(globalIndex / 3) % 2 === 0 ? 'right' : 'left';

                  return (
                    <motion.div
                      key={slug}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0 },
                      }}
                      className="flex flex-col items-center relative w-full"
                    >
                      {globalIndex > 0 && (
                        <PathConnector completed={prevCompleted} />
                      )}

                      <div
                        className="relative w-full flex justify-center"
                        ref={isCurrent ? currentNodeRef : undefined}
                      >
                        <PathNode
                          step={step}
                          levelId={config.levelId}
                          status={status}
                          isFirst={isFirstNode}
                          hasProgress={completedSlugs.length > 0}
                          sectionSlug={section.slug}
                          unitSlug={unit.slug}
                        />

                        {showMascot && (
                          <div
                            className={`absolute top-0 ${
                              mascotSide === 'right'
                                ? 'right-4 sm:right-12'
                                : 'left-4 sm:left-12'
                            }`}
                          >
                            <PathMascot side={mascotSide} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                }),
              )}
            </motion.div>

            {section.quizSlug && (
              <div className="w-full mt-4">
                <SectionQuizCard
                  section={section}
                  quizSlug={section.quizSlug}
                />
              </div>
            )}

            {sectionIndex < config.sections.length - 1 && (
              <SectionDivider
                title={config.sections[sectionIndex + 1].title}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
