'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { restaurants, type Restaurant } from '@/data/mock-data'
import { RestaurantCard } from './restaurant-card'
import { containerVariants, childVariants } from '@/lib/animations'

export function RestaurantGrid() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
          Popular Restaurants
        </h2>
        <p className="text-slate-500 text-lg">
          Order from your favorite restaurants and get delivered fast.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
      >
        {restaurants.map((restaurant) => (
          <motion.div key={restaurant.id} variants={childVariants}>
            <RestaurantCard restaurant={restaurant} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-center mt-16"
      >
        <button className="px-8 py-3 border-2 border-[#E21B70] text-[#E21B70] font-semibold rounded-full hover:bg-[#E21B70]/5 transition-colors">
          Load More Restaurants
        </button>
      </motion.div>
    </section>
  )
}