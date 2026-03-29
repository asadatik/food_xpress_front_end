'use client'

import { motion } from 'framer-motion'
import { PremiumButton } from '@/components/ui/premium-button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-8xl font-bold mb-6"
        >
          <span className="gradient-primary bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-foreground-muted mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back
          to ordering delicious food.
        </p>

        {/* Emoji Animation */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-6xl mb-8"
        >
          🍔
        </motion.div>

        {/* Back Button */}
        <Link href="/">
          <PremiumButton variant="primary" size="lg" fullWidth>
            Back to Home
          </PremiumButton>
        </Link>
      </motion.div>
    </div>
  )
}
