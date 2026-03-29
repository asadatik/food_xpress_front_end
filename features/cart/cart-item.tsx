'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Trash2, Minus, Plus } from 'lucide-react'
import { type CartItem } from './cart-context'

interface CartItemProps {
  item: CartItem
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export function CartItemComponent({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 pb-4 border-b border-card-border last:border-b-0"
    >
      {/* Image */}
      <div className="w-20 h-20 relative flex-shrink-0 rounded-lg overflow-hidden bg-background-subtle">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
        <p className="text-sm text-foreground-muted truncate">
          {item.description}
        </p>
        <p className="text-sm font-bold text-primary mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            onQuantityChange(item.quantity > 1 ? item.quantity - 1 : 0)
          }
          className="p-2 hover:bg-background-subtle rounded-lg transition-colors"
        >
          <Minus className="w-4 h-4 text-foreground-muted" />
        </motion.button>

        <span className="w-8 text-center font-semibold text-foreground">
          {item.quantity}
        </span>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onQuantityChange(item.quantity + 1)}
          className="p-2 hover:bg-background-subtle rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 text-foreground-muted" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, color: '#DC2626' }}
          whileTap={{ scale: 0.95 }}
          onClick={onRemove}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors ml-2"
        >
          <Trash2 className="w-4 h-4 text-foreground-muted" />
        </motion.button>
      </div>
    </motion.div>
  )
}
