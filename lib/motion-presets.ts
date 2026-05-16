export const editorialEase = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  fast: 0.32,
  base: 0.6,
  slow: 0.9,
  reveal: 1.2,
} as const;

export const motionStagger = {
  tight: 0.025,
  base: 0.06,
  loose: 0.12,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.slow, ease: editorialEase },
  },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: motionDurations.base, ease: editorialEase },
  },
} as const;
