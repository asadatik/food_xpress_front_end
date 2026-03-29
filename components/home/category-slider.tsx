'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { categories, type Category } from '@/data/mock-data'
import { containerVariants, childVariants } from '@/lib/animations'

interface CategorySliderProps {
  onCategorySelect?: (category: Category) => void
}

export function CategorySlider({ onCategorySelect }: CategorySliderProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id)

  const handleSelectCategory = (category: Category) => {
    setActiveCategory(category.id)
    onCategorySelect?.(category)
  }

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center"
      >
        Browse by Cuisine
      </motion.h2>

      {/* Horizontal Scrollable Category List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            variants={childVariants}
            onClick={() => handleSelectCategory(category)}
            className="relative flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-4 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-3 ${
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-background-subtle text-foreground hover:bg-card hover:shadow-soft'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
            </motion.div>

            {/* Active Indicator */}
            {activeCategory === category.id && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </section>
  )
}
