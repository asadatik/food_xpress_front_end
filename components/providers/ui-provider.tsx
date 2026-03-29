"use client";

import { createContext, useContext, useState } from 'react';
import { CartDrawer } from '@/features/cart/cart-drawer';

const UIContext = createContext({
  openCart: () => {},
});

export const useUI = () => useContext(UIContext);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <UIContext.Provider value={{ openCart: () => setIsCartOpen(true) }}>
      {children}
  {/* */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </UIContext.Provider>
  );
}