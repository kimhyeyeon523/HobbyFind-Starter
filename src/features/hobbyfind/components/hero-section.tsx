'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type HeroSectionProps = {
  title: string;
  subtitle: string;
  align?: 'center' | 'left';
  className?: string;
  fadeInOnMount?: boolean;
};

export function HeroSection({
  title,
  subtitle,
  align = 'center',
  className,
  fadeInOnMount = false,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  const sectionClassName = cn(
    'border-b border-neutral-200 bg-neutral-50 px-6 py-12 md:px-10 md:py-16 lg:px-20 xl:px-24',
    className,
  );

  const inner = (
    <div
      className={cn(
        'mx-auto max-w-7xl',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
      )}
    >
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
        {title}
      </h1>
      <p
        className={cn(
          'mt-4 max-w-2xl text-base text-neutral-600 md:text-lg',
          align === 'center' && 'mx-auto',
        )}
      >
        {subtitle}
      </p>
    </div>
  );

  if (fadeInOnMount) {
    return (
      <motion.section
        className={sectionClassName}
        initial={
          reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {inner}
      </motion.section>
    );
  }

  return <section className={sectionClassName}>{inner}</section>;
}
