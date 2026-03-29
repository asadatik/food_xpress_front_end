'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
  Variants
} from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Heart,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  CheckCircle2,
  ChevronUp,
  UtensilsCrossed,

} from 'lucide-react'

//data
const LINKS = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press & Media', href: '/press' },
    { label: 'Investor Relations', href: '/investors' },
    { label: 'Blog', href: '/blog' },
  ],
  Platform: [
    { label: 'Restaurants', href: '/restaurants' },
    { label: 'Offers & Deals', href: '/offers' },
    { label: 'FoodExpress Pro', href: '/pro' },
    { label: 'Gift Cards', href: '/gift-cards' },
    { label: 'Track My Order', href: '/track' },
  ],
  Partners: [
    { label: 'List Your Restaurant', href: '/partners/list' },
    { label: 'Become a Rider', href: '/partners/rider' },
    { label: 'Affiliate Program', href: '/partners/affiliate' },
    { label: 'API Access', href: '/partners/api' },
    { label: 'Bulk Orders', href: '/partners/bulk' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
    { label: 'Refund Policy', href: '/legal/refunds' },
    { label: 'Accessibility', href: '/legal/accessibility' },
  ],
}

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-400' },
  { icon: Twitter, label: 'Twitter / X', href: '#', color: 'hover:text-sky-400' },
  { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:text-blue-500' },
  { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:text-red-500' },
]

const BADGES = [
  { icon: Shield, label: 'SSL Secured' },
  { icon: Zap, label: '22-min Delivery' },
  { icon: Star, label: '4.9★ Rated' },
  { icon: CheckCircle2, label: 'GDPR Compliant' },
]

const CITIES = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi',
  'Khulna', 'Barishal', 'Mymensingh', 'Cumilla',
]

//Helpers 
const fadeUp : Variants= {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: (delay = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

//Newsletter Bar

function NewsletterBar() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setTimeout(() => setSent(false), 3500)
    setEmail('')
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E21B70] to-[#ff4d9e] p-px shadow-[0_12px_48px_rgba(226,27,112,0.35)]">
      <div className="relative bg-[#0f0508] rounded-[calc(1.5rem-1px)] px-6 sm:px-10 py-8 sm:py-10 overflow-hidden">
        {/* Inner glows */}
        <div className="absolute top-0 left-1/4 w-64 h-32 bg-[#E21B70]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-48 h-24 bg-[#FFB100]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-sm">
            <p className="text-[10px] font-bold text-[#E21B70] uppercase tracking-[0.18em] mb-2">
              Stay in the loop
            </p>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Exclusive deals, straight to your inbox.
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="flex items-stretch gap-2 w-full sm:w-auto sm:min-w-[360px]">
            <div className="relative flex-1">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl pl-9 pr-4 py-3.5 text-sm text-white placeholder-white/30 font-medium outline-none focus:border-[#E21B70]/60 focus:ring-2 focus:ring-[#E21B70]/20 transition-all"
              />
            </div>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1.5 px-5 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm font-bold whitespace-nowrap"
                >
                  <CheckCircle2 size={14} /> Done!
                </motion.div>
              ) : (
                <motion.button
                  key="sub"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-3.5 bg-gradient-to-r from-[#E21B70] to-[#ff4d9e] rounded-xl text-white text-sm font-black shadow-[0_4px_16px_rgba(226,27,112,0.45)] hover:shadow-[0_6px_24px_rgba(226,27,112,0.65)] transition-shadow whitespace-nowrap"
                >
                  Subscribe <ArrowRight size={13} />
                </motion.button>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  )
}



function MagneticSocial({
  icon: Icon, label, href, color,
}: {
  icon: React.ElementType
  label: string
  href: string
  color: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 16 })
  const sy = useSpring(y, { stiffness: 200, damping: 16 })

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.9 }}
      className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 ${color} hover:bg-white/10 hover:border-white/20 transition-colors duration-200`}
    >
      <Icon size={17} />
    </motion.a>
  )
}



function LinkColumn({ title, links, delay }: { title: string; links: { label: string; href: string }[]; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] mb-5">{title}</p>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center gap-1.5 text-[13px] text-white/55 hover:text-white font-medium transition-colors duration-200"
            >
              <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 opacity-0 group-hover:opacity-100">
                <ArrowRight size={10} className="text-[#E21B70] shrink-0" />
              </span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}



function BackToTop() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className="flex items-center gap-2 text-xs font-bold text-white/30 hover:text-[#E21B70] transition-colors group"
    >
      <span>Back to top</span>
      <div className="w-7 h-7 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center group-hover:border-[#E21B70]/40 group-hover:bg-[#E21B70]/10 transition-all">
        <ChevronUp size={13} />
      </div>
    </motion.button>
  )
}


// 
export function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer ref={ref} className="relative bg-[#080508] overflow-hidden">


      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E21B70]/40 to-transparent" />
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-[#E21B70]/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFB100]/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="fn"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#fn)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">


        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="pt-16 pb-14"
        >
          <NewsletterBar />
        </motion.div>

       
        <div className="border-t border-white/6" />

      
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-12">

          {/* Brand column */}
          <motion.div
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
           {/* logo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href="/" className="flex items-center gap-1 group">
                
                    <motion.div
                      whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E21B70] to-[#FFB100] flex items-center justify-center shadow-[0_4px_16px_rgba(226,27,112,0.3)] border border-white/50"
                    >
                      <UtensilsCrossed className="w-5 h-5 text-white stroke-[2.5]" />
                    </motion.div>
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-[#E21B70] via-[#ff4d9e] to-[#f09c00] bg-clip-text text-transparent italic tracking-tight leading-none ">
                      FoodExpress
                    </span>
                  </Link>
                </motion.div>

            <p className="text-[13px] text-white/40 leading-relaxed max-w-[220px] font-medium mb-7">
              The world's most loved food delivery platform. Fast, curated, and always premium.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-7">
              {[
                { icon: MapPin, text: 'Dhaka, Bangladesh' },
                { icon: Phone, text: '+880 1700 000000' },
                { icon: Mail, text: 'hello@foodexpress.io' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-[12px] text-white/35 font-medium">
                  <Icon size={12} className="text-[#E21B70] shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(s => (
                <MagneticSocial key={s.label} {...s} />
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links], i) => (
            <LinkColumn key={title} title={title} links={links} delay={0.1 + i * 0.07} />
          ))}
        </div>


        <div className="border-t border-white/6" />

  
        <motion.div
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="py-8 flex flex-wrap items-center gap-3"
        >
          {BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3.5 py-2 bg-white/4 border border-white/8 rounded-xl text-[11px] font-bold text-white/40"
            >
              <Icon size={12} className="text-[#E21B70]" />
              {label}
            </div>
          ))}

          {/* App store pills */}
          <div className="flex items-center gap-2 ml-auto">
            {[
              { label: '🍎 App Store', sub: '4.9 · 180K ratings' },
              { label: '▶ Google Play', sub: '4.8 · 220K ratings' },
            ].map(a => (
              <div
                key={a.label}
                className="flex flex-col items-start px-3.5 py-2 bg-white/4 border border-white/8 rounded-xl cursor-pointer hover:bg-white/8 hover:border-white/15 transition-colors"
              >
                <span className="text-[11px] font-bold text-white/60">{a.label}</span>
                <span className="text-[10px] text-white/25 font-medium">{a.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          custom={0.45}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="pb-8"
        >
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.18em] mb-3">
            Available in
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {CITIES.map((city, i) => (
              <span key={city} className="text-[12px] text-white/30 font-medium">
                {city}
                {i < CITIES.length - 1 && <span className="ml-4 text-white/10">·</span>}
              </span>
            ))}
          </div>
        </motion.div>


        <div className="border-t border-white/6" />

      
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-[12px] text-white/22 font-medium">
            © {new Date().getFullYear()} FoodExpress Technologies Ltd. All rights reserved.
          </p>

        
        </motion.div>

      </div>
  
      <div className="relative overflow-hidden h-20 select-none pointer-events-none">
        <p
          className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 text-[96px] sm:text-[120px] font-black italic text-white/[0.025] tracking-tighter whitespace-nowrap"
          style={{ letterSpacing: '-0.04em' }}
        >
          FoodExpress
        </p>
      </div>

    </footer>
  )
}