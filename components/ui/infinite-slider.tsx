'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const size = direction === 'horizontal' ? width : height;
    if (size === 0) return;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    const start = isTransitioning ? translation.get() : from;
    const time = isTransitioning
      ? currentDuration * Math.abs((translation.get() - to) / contentSize)
      : currentDuration;

    const controls = animate(translation, [start, to], {
      ease: 'linear',
      duration: Math.max(0.02, time),
      repeat: isTransitioning ? 0 : Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
      onComplete: isTransitioning
        ? () => { setIsTransitioning(false); setKey((n) => n + 1); }
        : undefined,
      onRepeat: () => translation.set(from),
    });
    return () => controls.stop();
  }, [key, translation, currentDuration, width, height, gap, isTransitioning, direction, reverse]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => { setIsTransitioning(true); setCurrentDuration(durationOnHover); },
        onHoverEnd: () => { setIsTransitioning(true); setCurrentDuration(duration); }
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
          gap: gap + 'px',
          flexDirection: direction === 'horizontal' ? 'row' : 'column'
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
