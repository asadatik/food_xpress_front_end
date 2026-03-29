import { Variants, TargetAndTransition } from 'framer-motion'

/* Entrance Animations */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

/* Container for staggered animations */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

/* Staggered child animation */
export const childVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

/* Hover Animations */
export const hoverScale: TargetAndTransition = {
  scale: 1.05,
  transition: { duration: 0.3, ease: 'easeInOut' },
}

export const hoverLift: TargetAndTransition = {
  y: -8,
  boxShadow: '0 20px 40px rgba(226, 27, 112, 0.15)',
  transition: { duration: 0.3, ease: 'easeInOut' },
}

export const hoverGlow: TargetAndTransition = {
  boxShadow: '0 0 30px rgba(226, 27, 112, 0.25)',
  transition: { duration: 0.3 },
}

/* Floating animation for hero elements */
export const float: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/* Pulse animation */
export const pulse: Variants = {
  animate: {
    opacity: [1, 0.6, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/* Rotate animation */
export const rotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

/* Spring physics transition for natural motion */
export const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
}

export const softSpringTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
}

/* Flying animation for cart interactions */
export const flyToCart: (targetX: number, targetY: number) => Variants =
  (targetX: number, targetY: number) => ({
    initial: { opacity: 1, scale: 1 },
    exit: {
      opacity: 0,
      scale: 0,
      x: targetX,
      y: targetY,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  })

/* Page transition */
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
