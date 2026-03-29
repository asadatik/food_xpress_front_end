'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export const PremiumButton = React.forwardRef<
  HTMLButtonElement,
  PremiumButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClass =
      'relative font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const sizeClass = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }[size]

    const variantClass = {
      primary:
        'bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary-glow hover:shadow-xl',
      secondary:
        'bg-secondary text-foreground shadow-lg shadow-secondary/20 hover:shadow-secondary-glow hover:shadow-xl',
      outline:
        'border-2 border-primary text-primary hover:bg-primary/5 hover:shadow-soft',
      ghost: 'text-primary hover:bg-primary/10 hover:shadow-soft',
    }[variant]

    return (
      <motion.button
        ref={ref}
        className={cn(baseClass, sizeClass, variantClass, className, {
          'w-full': fullWidth,
        })}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <motion.div
            className="w-4 h-4 border-2 border-transparent border-t-current rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {children}
      </motion.button>
    )
  }
)

PremiumButton.displayName = 'PremiumButton'
