'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, MapPin, Clock, Plus } from 'lucide-react'
import { type Restaurant } from '@/data/mock-data'
import { scaleIn } from '@/lib/animations'

// Custom Hooks
import { useUI } from '@/components/providers/ui-provider'
import { useCart } from '@/features/cart/cart-context'

interface RestaurantCardProps {
  restaurant: Restaurant
  onCardClick?: (restaurant: Restaurant) => void
}

export function RestaurantCard({
  restaurant,
  onCardClick,
}: RestaurantCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Extracting functions from hooks
  const { openCart } = useUI()
  const { addItem } = useCart()

  // Logic to add item and open cart drawer
  const handleAddQuickly = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click event
    
    if (restaurant.menu && restaurant.menu.length > 0) {
      const firstItem = restaurant.menu[0]
      // Add to global cart state
      addItem(firstItem, restaurant.id, restaurant.name, 1)
      // Open the global cart drawer
      openCart()
    }
  }

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full cursor-pointer"
      onClick={() => onCardClick?.(restaurant)}
    >
      <div className="h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
        
        {/* Image Section */}
        <motion.div className="relative h-48 sm:h-56 overflow-hidden bg-slate-50">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badge (e.g., Free Delivery, Top Rated) */}
          {restaurant.badge && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`absolute top-3 right-3 px-3 py-1 ${restaurant.badgeColor || 'bg-[#E21B70]'} text-white text-xs font-bold rounded-full shadow-lg z-10`}
            >
              {restaurant.badge}
            </motion.div>
          )}

          {/* Quick Add Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddQuickly}
            className="absolute bottom-4 right-4 w-12 h-12 bg-[#E21B70] text-white rounded-full flex items-center justify-center shadow-xl z-20 hover:bg-[#c21760] transition-colors"
          >
            <Plus className="w-7 h-7" />
          </motion.button>

          {/* Closed Overlay */}
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-30">
              <span className="bg-white/90 text-black px-4 py-1 rounded-full font-bold text-sm">Closed Now</span>
            </div>
          )}
        </motion.div>

        {/* Info Section */}
        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">
            {restaurant.name}
          </h3>

          <p className="text-xs text-slate-500 mb-3 font-medium">
            {restaurant.cuisineType}
          </p>

          <div className="flex items-center gap-4 mb-4 text-xs">
            {/* Rating */}
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-bold">{restaurant.rating}</span>
            </div>

            {/* Delivery Time */}
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{restaurant.deliveryTime} mins</span>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 pt-3 border-t border-slate-50">
            <span>Delivery: ৳{restaurant.deliveryFee}</span>
            <span className="text-[#E21B70]">Min: ৳{restaurant.minOrder}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}