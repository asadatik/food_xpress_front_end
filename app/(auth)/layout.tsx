
'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#FAF9F6' }}
    >
      {/*Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(226,27,112,0.07) 0%, transparent 70%)' }}
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -right-32 w-[560px] h-[560px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,177,0,0.07) 0%, transparent 70%)' }}
        />
        {/*soft pink wash */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(226,27,112,0.04) 0%, transparent 65%)' }}
        />

      
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #E21B70 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* nav bar*/}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E21B70] to-[#FFB100] flex items-center justify-center shadow-[0_4px_12px_rgba(226,27,112,0.4)] group-hover:shadow-[0_6px_20px_rgba(226,27,112,0.55)] transition-shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-black italic bg-gradient-to-r from-[#E21B70] to-[#FFB100] bg-clip-text text-transparent tracking-tight">
            FoodExpress
          </span>
        </Link>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="hidden sm:inline font-medium">Need help?</span>
          <a
            href="mailto:hello@foodexpress.io"
            className="font-semibold text-[#E21B70] hover:underline transition-colors"
          >
            Contact us
          </a>
        </div>
      </header>

      {/*Page content*/}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        {children}
      </main>

    
      <footer className="relative z-10 py-5 px-6 text-center">
        <p className="text-[11px] text-slate-300 font-medium">
          © {new Date().getFullYear()} FoodExpress Technologies Ltd. · All rights reserved.
        </p>
      </footer>
    </div>
  )
}