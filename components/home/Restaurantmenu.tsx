'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  Variants
} from 'framer-motion'
import {
  X,
  Star,
  Clock,
  MapPin,
  Bike,
  Plus,
  Minus,
  ShoppingBag,
  UtensilsCrossed,
  ChevronDown,
  Flame,
  BadgeCheck,
} from 'lucide-react'
import { MenuItem, Restaurant } from '@/data/mock-data'
import { useCart } from '@/features/cart/cart-context' 


interface LocalCartItem {
  item: MenuItem
  qty: number
}

type LocalCart = Record<string, LocalCartItem>

interface RestaurantMenuProps {
  restaurant: Restaurant
  onClose: () => void
}

function groupByCategory(menu: MenuItem[]): Record<string, MenuItem[]> {
  return menu.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const key = item.category.charAt(0).toUpperCase() + item.category.slice(1)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
}

function formatCategory(raw: string) {
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

function QtyControl({
  qty,
  onAdd,
  onRemove,
}: {
  qty: number
  onAdd: () => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-center gap-2 bg-[#E21B70]/8 border border-[#E21B70]/20 rounded-xl px-1 py-1">
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onRemove}
        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-sm text-[#E21B70] hover:bg-[#E21B70] hover:text-white transition-colors"
      >
        <Minus size={13} strokeWidth={2.5} />
      </motion.button>

      <AnimatePresence mode="popLayout">
        <motion.span
          key={qty}
          initial={{ opacity: 0, y: -6, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="w-5 text-center text-sm font-bold text-[#E21B70] tabular-nums"
        >
          {qty}
        </motion.span>
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onAdd}
        className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#E21B70] text-white shadow-sm hover:bg-[#c4175f] transition-colors"
      >
        <Plus size={13} strokeWidth={2.5} />
      </motion.button>
    </div>
  )
}

function MenuItemCard({
  item,
  cart,
  onAdd,
  onRemove,
}: {
  item: MenuItem
  cart: LocalCart
  onAdd: (item: MenuItem) => void
  onRemove: (id: string) => void
}) {
  const [imgErr, setImgErr] = useState(false)
  const cartItem = cart[item.id]
  const qty = cartItem?.qty ?? 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50/80 transition-colors duration-200"
    >
      <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-sm bg-slate-100">
        {!imgErr ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UtensilsCrossed size={22} className="text-slate-300" />
          </div>
        )}
        {item.isPopular && (
          <div className="absolute top-1 left-1 bg-[#E21B70] rounded-full p-0.5">
            <Flame size={9} className="text-white" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h4 className="font-semibold text-gray-900 text-[14px] leading-tight truncate">{item.name}</h4>
              {item.isPopular && (
                <span className="shrink-0 text-[9px] font-bold text-[#E21B70] bg-[#E21B70]/10 border border-[#E21B70]/20 rounded-full px-1.5 py-0.5 uppercase tracking-wide">
                  Popular
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-2">{item.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-gray-900">${item.price.toFixed(2)}</span>
              {item.rating && (
                <span className="flex items-center gap-0.5 text-xs text-gray-400">
                  <Star size={10} fill="#FFB100" stroke="none" />
                  <span className="font-medium text-gray-600">{item.rating}</span>
                </span>
              )}
            </div>
          </div>

          <div className="shrink-0 mt-1">
            <AnimatePresence mode="wait">
              {qty === 0 ? (
                <motion.button
                  key="add"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.18 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => onAdd(item)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E21B70] to-[#ff4d9e] text-white text-xs font-bold shadow-[0_3px_12px_rgba(226,27,112,0.35)] hover:shadow-[0_5px_18px_rgba(226,27,112,0.5)] transition-shadow"
                >
                  <Plus size={12} strokeWidth={3} />
                  Add
                </motion.button>
              ) : (
                <motion.div
                  key="qty"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.18 }}
                >
                  <QtyControl qty={qty} onAdd={() => onAdd(item)} onRemove={() => onRemove(item.id)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ParallaxHero({
  restaurant,
  onClose,
  scrollRef,
}: {
  restaurant: Restaurant
  onClose: () => void
  scrollRef: React.RefObject<HTMLDivElement | null>
}) {
  const [imgErr, setImgErr] = useState(false)
  const { scrollY } = useScroll({ container: scrollRef as React.RefObject<HTMLElement> })
  const rawY = useTransform(scrollY, [0, 280], [0, 100])
  const y = useSpring(rawY, { stiffness: 80, damping: 20 })
  const opacity = useTransform(scrollY, [0, 220], [1, 0])
  const scale = useTransform(scrollY, [0, 280], [1, 1.06])

  return (
    <div className="relative h-64 sm:h-80 overflow-hidden shrink-0">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        {!imgErr ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#E21B70]/20 to-[#FFB100]/20 flex items-center justify-center">
            <UtensilsCrossed size={48} className="text-white/40" />
          </div>
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
      >
        <X size={16} />
      </motion.button>

      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/30 sm:hidden" />

      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 p-4"
      >
        <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-white leading-tight mb-1">{restaurant.name}</h2>
              <p className="text-xs text-white/70 font-medium">{restaurant.cuisineType}</p>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shrink-0">
              <Star size={12} fill="#FFB100" stroke="none" />
              <span className="text-sm font-bold text-white">{restaurant.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-white/80 font-medium">
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-white/60" />
              {restaurant.deliveryTime} min
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-white/60" />
              {restaurant.distance} km
            </span>
            <span className="flex items-center gap-1">
              <Bike size={11} className="text-white/60" />
              {restaurant.deliveryFee === 0 ? (
                <span className="text-green-400 font-bold">Free delivery</span>
              ) : (
                `$${restaurant.deliveryFee.toFixed(2)} delivery`
              )}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function FloatingCartBar({ cart }: { cart: LocalCart }) {
  const items = Object.values(cart)
  const totalQty = items.reduce((s, c) => s + c.qty, 0)
  const totalPrice = items.reduce((s, c) => s + c.qty * c.item.price, 0)

  return (
    <AnimatePresence>
      {totalQty > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="absolute bottom-0 left-0 right-0 p-4 z-30 pointer-events-none"
        >
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            className="pointer-events-auto w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-[#E21B70] to-[#ff4d9e] shadow-[0_8px_32px_rgba(226,27,112,0.45)] hover:shadow-[0_12px_40px_rgba(226,27,112,0.6)] transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={17} className="text-white" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={totalQty}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[10px] font-black text-[#E21B70] tabular-nums"
                    >
                      {totalQty}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <span className="text-white font-bold text-[14px]">
                {totalQty} {totalQty === 1 ? 'item' : 'items'} in cart
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.span
                key={totalPrice.toFixed(2)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="text-white font-black text-[15px] tabular-nums"
              >
                ${totalPrice.toFixed(2)}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CategorySection({
  category,
  items,
  cart,
  onAdd,
  onRemove,
}: {
  category: string
  items: MenuItem[]
  cart: LocalCart
  onAdd: (item: MenuItem) => void
  onRemove: (id: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="mb-6">
      <button
        onClick={() => setCollapsed(p => !p)}
        className="w-full flex items-center justify-between gap-3 mb-3 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-gray-900 tracking-tight">{category}</span>
          <span className="text-xs font-semibold text-gray-400 bg-slate-100 rounded-full px-2 py-0.5">
            {items.length}
          </span>
        </div>
        <motion.div
          animate={{ rotate: collapsed ? -90 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-400 group-hover:text-gray-600 transition-colors"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-1 border border-slate-100 rounded-2xl overflow-hidden bg-white/60 divide-y divide-slate-50">
              {items.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  cart={cart}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main Component 
export function RestaurantMenu({ restaurant, onClose }: RestaurantMenuProps) {

  const { addItem, updateQuantity, items: globalItems } = useCart() 

  const scrollRef = useRef<HTMLDivElement>(null)
  const grouped = groupByCategory(restaurant.menu)

  // Create a local cart structure for easy access and manipulation within this component
  const cart: LocalCart = React.useMemo(() => {
    return globalItems.reduce((acc, item) => {
      acc[item.id] = { item, qty: item.quantity }
      return acc
    }, {} as LocalCart)
  }, [globalItems])

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])


  const addToCart = useCallback((item: MenuItem) => {
    addItem(item, restaurant.id, restaurant.name)
  }, [addItem, restaurant.id, restaurant.name])


  const removeFromCart = useCallback((id: string) => {
    const existing = globalItems.find(i => i.id === id)
    if (existing) {
      updateQuantity(id, existing.quantity - 1)
    }
  }, [globalItems, updateQuantity])

  // animation config 
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  const panelVariants: Variants = {
    hidden: isMobile
      ? { y: '100%', opacity: 1 }
      : { opacity: 0, scale: 0.97, y: 20 },
    visible: isMobile
      ? { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 30 } }
      : { opacity: 1, scale: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
    exit: isMobile
      ? { y: '100%', opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }
      : { opacity: 0, scale: 0.97, y: 12, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed z-50 inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-6 pointer-events-none"
      >
        <div className="pointer-events-auto relative w-full sm:max-w-2xl sm:h-auto max-h-[92dvh] sm:max-h-[88vh] bg-white sm:rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.22)] overflow-hidden flex flex-col rounded-t-3xl">

          <ParallaxHero restaurant={restaurant} onClose={onClose} scrollRef={scrollRef} />

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain"
            style={{ scrollbarWidth: 'none' }}
          >
            {restaurant.minOrder > 0 && (
              <div className="mx-4 mt-4 flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                <BadgeCheck size={14} className="text-blue-500 shrink-0" />
                <p className="text-xs text-blue-600 font-medium">
                  Minimum order: <span className="font-bold">${restaurant.minOrder}</span>
                </p>
              </div>
            )}

            <div className="px-4 pt-5 pb-32">
              {Object.entries(grouped).map(([category, items]) => (
                <CategorySection
                  key={category}
                  category={formatCategory(category)}
                  items={items}
                  cart={cart}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>

          <FloatingCartBar cart={cart} />
        </div>
      </motion.div>
    </>
  )
}