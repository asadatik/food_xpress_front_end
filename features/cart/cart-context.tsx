'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MenuItem } from '@/data/mock-data'

export interface CartItem extends MenuItem {
  quantity: number
  restaurantId: string
  restaurantName: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string,
    quantity?: number
  ) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalPrice: number
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string,
    quantity: number = 1
  ) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.id === item.id && i.restaurantId === restaurantId
      )

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.restaurantId === restaurantId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }

      return [
        ...prevItems,
        {
          ...item,
          quantity,
          restaurantId,
          restaurantName,
        },
      ]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
