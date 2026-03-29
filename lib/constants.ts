/* FoodExpress Brand Colors */
export const BRAND_COLORS = {
  primary: '#E21B70',
  primaryLight: '#F28BB8',
  primaryDark: '#B71558',
  secondary: '#FFB100',
  secondaryLight: '#FFD966',
  success: '#10B981',
  warning: '#F59E0B',
  destructive: '#DC2626',
} as const

/* Typography Sizes */
export const TYPOGRAPHY = {
  h1: 'text-5xl md:text-6xl font-bold tracking-tight',
  h2: 'text-4xl md:text-5xl font-bold tracking-tight',
  h3: 'text-3xl md:text-4xl font-bold tracking-tight',
  h4: 'text-2xl md:text-3xl font-bold tracking-tight',
  h5: 'text-xl md:text-2xl font-semibold',
  h6: 'text-lg md:text-xl font-semibold',
  body: 'text-base md:text-lg leading-relaxed',
  small: 'text-sm md:text-base',
  tiny: 'text-xs md:text-sm',
} as const

/* Spacing */
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
} as const

/* Border Radius */
export const RADIUS = {
  sm: '0.5rem',
  md: '0.875rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  full: '9999px',
} as const

/* Shadows */
export const SHADOWS = {
  soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
  medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
  xl: '0 12px 32px rgba(0, 0, 0, 0.18)',
  primaryGlow: '0 0 20px rgba(226, 27, 112, 0.2)',
  secondaryGlow: '0 0 20px rgba(255, 177, 0, 0.2)',
} as const

/* Transition Duration */
export const DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms',
} as const

/* Z-Index */
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  offcanvas: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const

/* Breakpoints */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

/* Animation Presets */
export const ANIMATION_PRESET = {
  fast: {
    duration: 0.2,
    ease: 'easeInOut',
  },
  normal: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  slow: {
    duration: 0.5,
    ease: 'easeInOut',
  },
} as const

/* Premium Effects */
export const EFFECTS = {
  glassmorphism: 'backdrop-blur-md bg-white/30 border border-white/20',
  glassmorphismDark: 'backdrop-blur-md bg-black/20 border border-white/10',
  softGlow: 'shadow-lg shadow-primary/20',
  hoverLift: 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
} as const
