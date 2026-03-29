'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PremiumBadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  children: React.ReactNode
  className?: string
}

export const PremiumBadge = React.forwardRef<
  HTMLDivElement,
  PremiumBadgeProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      animated = true,
      children,
      className,
    },
    ref
  ) => {
    const baseClass =
      'inline-flex items-center font-semibold rounded-full text-white'

    const sizeClass = {
      sm: 'px-3 py-1 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2 text-base',
    }[size]

    const variantClass = {
      primary: 'bg-primary shadow-lg shadow-primary/30',
      secondary: 'bg-secondary text-foreground shadow-lg shadow-secondary/30',
      success: 'bg-success shadow-lg shadow-success/30',
      warning: 'bg-warning text-foreground shadow-lg shadow-warning/30',
      destructive: 'bg-destructive shadow-lg shadow-destructive/30',
    }[variant]

    const content = (
      <div className={cn(baseClass, sizeClass, variantClass, className)}>
        {children}
      </div>
    )

    if (!animated) return content

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {content}
      </motion.div>
    )
  }
)

PremiumBadge.displayName = 'PremiumBadge'
