'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
   Variants
} from 'framer-motion'
import {
  Smartphone,
  Play,
  ArrowRight,
  CheckCircle2,
  Zap,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  
} from 'lucide-react'

// GrainOverlay component for subtle noise texture
function GrainOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.055] mix-blend-overlay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

//3D Order Mockup Card 
function OrderMockup() {
  const [confirmPulse, setConfirmPulse] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setConfirmPulse(p => !p), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full max-w-100 mx-auto select-none">
      {/* Glow aura behind card */}
      <div className="absolute -inset-6 bg-gradient-radial from-[#E21B70]/25 via-[#00FFFF]/10 to-transparent blur-3xl opacity-70 pointer-events-none" />

      {/* Main card */}
      <div className="relative bg-white/[0.07] backdrop-blur-2xl border border-white/10 rounded-3xl p-3 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

        {/* Top status bar */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest">FoodExpress</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-[11px] font-bold">Live</span>
          </div>
        </div>

        {/* Order confirmed badge */}
        <motion.div
          animate={{ scale: confirmPulse ? 1.03 : 1, boxShadow: confirmPulse ? '0 0 24px rgba(226,27,112,0.5)' : '0 0 0px rgba(226,27,112,0)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="bg-gradient-to-r from-[#E21B70] to-[#ff4d9e] rounded-2xl px-4 py-3.5 mb-4 flex items-center gap-3"
        >
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-xl">
            🛵
          </div>
          <div>
            <p className="text-white font-black text-sm leading-tight">Order Confirmed!</p>
            <p className="text-white/70 text-[11px] mt-0.5">Arriving in 22 minutes</p>
          </div>
          <CheckCircle2 size={18} className="text-white ml-auto shrink-0" />
        </motion.div>

        {/* Order items */}
        {[
          { emoji: '🍔', name: 'Wagyu Burger', price: '$14.99', qty: 1 },
          { emoji: '🍕', name: 'Margherita', price: '$13.99', qty: 2 },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-3 mb-3 last:mb-0">
            <div className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center text-xl border border-white/10 shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1">
              <p className="text-white text-[13px] font-semibold leading-tight">{item.name}</p>
              <p className="text-white/40 text-[11px]">Qty: {item.qty}</p>
            </div>
            <span className="text-white/80 text-[13px] font-bold">{item.price}</span>
          </div>
        ))}

   
        <div className="border-t border-white/8 my-4" />

          {/* Total and rating */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[11px] font-medium">Total</p>
            <p className="text-white font-black text-lg leading-tight">$43.97</p>
          </div>
          <div className="flex items-center gap-1 bg-[#FFB100]/15 border border-[#FFB100]/30 rounded-xl px-3 py-1.5">
            <Star size={12} fill="#FFB100" stroke="none" />
            <span className="text-[#FFB100] text-[12px] font-bold">4.9 Rating</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] text-white/40 font-medium mb-1.5">
            <span>Order placed</span>
            <span>On the way</span>
            <span>Delivered</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '65%' }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
              className="h-full bg-gradient-to-r from-[#E21B70] to-[#FFB100] rounded-full"
            />
          </div>
        </div>

        {/* Bottom: driver info */}
        <div className="mt-4 flex items-center gap-2.5 bg-white/5 rounded-xl px-3 py-2.5 border border-white/8">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E21B70]/30 to-[#FFB100]/30 flex items-center justify-center text-base">
            🧑‍🦱
          </div>
          <div className="flex-1">
            <p className="text-white text-[12px] font-semibold">Karim R.</p>
            <p className="text-white/40 text-[10px]">Your delivery partner</p>
          </div>
          <div className="flex items-center gap-0.5">
            <Star size={10} fill="#FFB100" stroke="none" />
            <span className="text-[#FFB100] text-[11px] font-bold">4.97</span>
          </div>
        </div>
      </div>

      {/* Floating stat pills */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-16 -bottom-6 bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl px-2 flex items-center gap-2"
      >
        <Zap size={13} className="text-[#FFB100]" />
        <span className="text-white text-[12px] font-bold">22 min</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -right-10 -top-8 bg-[#E21B70]/20 backdrop-blur-xl border border-[#E21B70]/30 rounded-2xl px-2"
      >
        <span className="text-[#E21B70] text-[12px] font-bold">500+ places</span>
      </motion.div>
    </div>
  )
}

// PulseButton component with a glowing ripple effect on hover

function PulseButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Ripple glow */}
      <span className="absolute inset-0 rounded-2xl bg-[#E21B70] animate-ping opacity-20 group-hover:opacity-30" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}

//main section

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  // Mouse parallax for the mockup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 100, damping: 20 })
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 20 })
  const floatX = useTransform(mouseX, [-0.5, 0.5], [-12, 12])
  const floatY = useTransform(mouseY, [-0.5, 0.5], [-10, 10])
  const sfX = useSpring(floatX, { stiffness: 60, damping: 18 })
  const sfY = useSpring(floatY, { stiffness: 60, damping: 18 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [mouseX, mouseY])

  const onMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  // Stagger variants
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const item : Variants= {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
      {/* Outer container — the "capsule" */}
      <div
        ref={sectionRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative max-w-7xl mx-auto rounded-[48px] overflow-hidden border border-white/5"
        style={{ background: '#0A0A0A' }}
      >
        {/* Grain texture */}
        <GrainOverlay />

        {/* Neon radial glows */}
        <div className="absolute top-[-80px] left-[10%] w-[500px] h-[500px] rounded-full bg-[#E21B70]/18 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[5%] w-[400px] h-[400px] rounded-full bg-[#00FFFF]/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] left-[40%] w-72 h-72 rounded-full bg-[#E21B70]/8 blur-[80px] pointer-events-none" />

  
        <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.72fr] gap-12 lg:gap-0 items-center px-8 sm:px-12 lg:px-16 py-16 sm:py-20">

          {/*left side */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="max-w-xl"
          >
            {/* Eyebrow */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-7">
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">
                  Exclusive Access
                </span>
                <span className="w-1 h-1 rounded-full bg-[#E21B70]" />
                <span className="text-[10px] font-bold text-[#E21B70] uppercase tracking-[0.15em]">
                  Download Now
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={item}
              className="text-5xl sm:text-6xl xl:text-[68px] font-black leading-[0.95] tracking-tight text-white mb-6"
            >
              The World's{' '}
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #E21B70 0%, #ff4d9e 40%, #FFB100 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Best Food,
              </span>
              <br />
              At Your Door.
            </motion.h2>

            {/* Sub-copy */}
            <motion.p variants={item} className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-md font-medium">
              500+ curated restaurants. Real-time tracking. 22-minute delivery. For those who refuse to compromise on taste.
            </motion.p>

            {/* Trust bullets */}
            <motion.div variants={item} className="flex flex-col gap-2.5 mb-10">
              {[
                'No hidden fees, ever',
                'Live order tracking in real-time',
                '4.9★ rated by 24,000+ customers',
              ].map((point) => (
                <div key={point} className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} className="text-[#E21B70] shrink-0" />
                  <span className="text-white/60 text-sm font-medium">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              {/* Primary — Pulse Glow */}
              <PulseButton className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#E21B70] to-[#ff4d9e] text-white text-sm font-black shadow-[0_8px_32px_rgba(226,27,112,0.5)] hover:shadow-[0_12px_48px_rgba(226,27,112,0.65)] transition-shadow">
                <Smartphone size={16} />
                App Store
                <ArrowRight size={15} className="opacity-80" />
              </PulseButton>

              {/* Secondary — Frosted Glass */}
              <motion.button
                whileHover={{ scale: 1.035, borderColor: 'rgba(255,255,255,0.25)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/6 backdrop-blur-md border border-white/12 text-white text-sm font-black hover:bg-white/10 transition-colors"
              >
                <Play size={15} className="fill-white" />
                Google Play
              </motion.button>
            </motion.div>

            {/* Download count */}
            <motion.p variants={item} className="text-white/25 text-xs font-medium mt-5">
              2.4M+ downloads worldwide · iOS & Android
            </motion.p>
          </motion.div>

          {/*RIGHT*/}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end items-center"
          >
            <motion.div
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                x: sfX,
                y: sfY,
                transformStyle: 'preserve-3d',
              }}
            >
              <OrderMockup />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 border-t border-white/6 mx-8 sm:mx-12 lg:mx-16 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-white/8"
        >
          {[
            { icon: <Star size={14} className="text-[#FFB100]" />, value: '4.9★', label: 'Average rating' },
            { icon: <Clock size={14} className="text-[#E21B70]" />, value: '22 min', label: 'Avg. delivery' },
            { icon: <MapPin size={14} className="text-[#00FFFF]" />, value: '500+', label: 'Partner restaurants' },
            { icon: <Zap size={14} className="text-[#FFB100]" />, value: '2.4M+', label: 'Happy customers' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 sm:px-8 first:pl-0 last:pr-0">
              <div className="w-8 h-8 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-white font-black text-base leading-tight">{s.value}</p>
                <p className="text-white/35 text-[11px] font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}