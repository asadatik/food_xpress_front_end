
'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from 'lucide-react'

import { registerSchema, type RegisterFormValues } from '@/lib/auth/auth.schemas'
import { authService } from '@/lib/auth/auth.service'

// Variants

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item : Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
}

// Password strength

function getStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: '', color: '' }
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  const map = [
    { score: 0, label: '', color: '' },
    { score: 1, label: 'Weak', color: '#ef4444' },
    { score: 2, label: 'Fair', color: '#f97316' },
    { score: 3, label: 'Good', color: '#eab308' },
    { score: 4, label: 'Strong', color: '#22c55e' },
  ]
  return map[s]
}

function StrengthBar({ password }: { password: string }) {
  const { score, label, color } = useMemo(() => getStrength(password), [password])
  if (!password) return null

  return (
    <div className="mt-2.5 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full overflow-hidden bg-slate-100"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: i <= score ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.05 }}
              style={{ background: color, transformOrigin: 'left' }}
              className="h-full w-full rounded-full"
            />
          </motion.div>
        ))}
      </div>
      {label && (
        <p className="text-[11px] font-bold" style={{ color }}>
          {label} password
        </p>
      )}
    </div>
  )
}

//Field component 

interface FieldProps {
  label: string
  error?: string
  icon: React.ReactNode
  hint?: string
  children: React.ReactNode
}

function Field({ label, error, icon, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-semibold text-slate-600 pl-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#E21B70] transition-colors pointer-events-none">
          {icon}
        </div>
        {children}
      </div>
      <AnimatePresence>
        {error ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-[12px] text-red-500 font-medium pl-1"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        ) : hint ? (
          <p className="text-[11px] text-slate-400 font-medium pl-1">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (hasError?: boolean) =>
  `w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-300 bg-white/60 border transition-all duration-200 outline-none
   focus:ring-2 focus:ring-[#E21B70]/20 focus:border-[#E21B70]/50 focus:bg-white/90
   ${hasError ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200/80 hover:border-slate-300'}`

//
function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-semibold mb-5 ${
        type === 'success'
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'bg-red-50 border-red-200 text-red-600'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
      ) : (
        <AlertCircle size={16} className="text-red-500 shrink-0" />
      )}
      {message}
    </motion.div>
  )
}


//main page
export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const passwordValue = watch('password', '')

  const onSubmit = async (values: RegisterFormValues) => {
    setToast(null)
    const res = await authService.register(values)

    if (!res.success) {
      setToast({ type: 'error', message: res.message ?? 'Registration failed. Please try again.' })
      return
    }

    setToast({
      type: 'success',
      message: `Account created! Welcome, ${res.user?.fullName}! Redirecting…`,
    })
    setTimeout(() => router.push('/'), 1600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl"
    >
      {/* Glass card */}
      <div className="bg-white/70 backdrop-blur-3xl border border-white/50 rounded-3xl shadow-[0_32px_64px_-16px_rgba(226,27,112,0.12),0_16px_32px_-8px_rgba(0,0,0,0.06)] p-4 md:p-8 ">

        {/* Header */}
        <motion.div variants={container} initial="hidden" animate="visible" className="mb-7">
          <motion.div variants={item}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E21B70] to-[#FFB100] flex items-center justify-center shadow-[0_6px_20px_rgba(226,27,112,0.38)] mb-5">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
          </motion.div>
          <motion.h1 variants={item} className="text-3xl font-black text-slate-900 tracking-tight mb-1">
            Create your account
          </motion.h1>
          <motion.p variants={item} className="text-sm text-slate-400 font-medium">
            Join 24,000+ food lovers on FoodExpress
          </motion.p>
        </motion.div>

        {/* Toast */}
        <AnimatePresence>
          {toast && <Toast message={toast.message} type={toast.type} />}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">

            {/* Full Name */}
            <motion.div variants={item}>
              <Field label="Full name" error={errors.fullName?.message} icon={<User size={15} />}>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  autoComplete="name"
                  className={inputCls(!!errors.fullName)}
                  {...register('fullName')}
                />
              </Field>
            </motion.div>

            {/* Email */}
            <motion.div variants={item}>
              <Field label="Email address" error={errors.email?.message} icon={<Mail size={15} />}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputCls(!!errors.email)}
                  {...register('email')}
                />
              </Field>
            </motion.div>

            {/* Phone */}
            <motion.div variants={item}>
              <Field
                label="Phone number"
                error={errors.phone?.message}
                hint="We'll only use this for order updates"
                icon={<Phone size={15} />}
              >
                <input
                  type="tel"
                  placeholder="+880 17XX XXX XXX"
                  autoComplete="tel"
                  className={inputCls(!!errors.phone)}
                  {...register('phone')}
                />
              </Field>
            </motion.div>

            {/* Password */}
            <motion.div variants={item}>
              <Field
                label="Password"
                error={errors.password?.message}
                icon={<Lock size={15} />}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className={`${inputCls(!!errors.password)} pr-11`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide' : 'Show'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </Field>
              <StrengthBar password={passwordValue} />
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={item}>
              <Field
                label="Confirm password"
                error={errors.confirmPassword?.message}
                icon={<Lock size={15} />}
              >
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className={`${inputCls(!!errors.confirmPassword)} pr-11`}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(p => !p)}
                  tabIndex={-1}
                  aria-label={showConfirm ? 'Hide' : 'Show'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </Field>
            </motion.div>

            {/* Terms note */}
            <motion.div variants={item}>
              <p className="text-[12px] text-slate-400 font-medium leading-relaxed">
                By creating an account you agree to our{' '}
                <Link href="/legal/terms" className="text-[#E21B70] font-semibold hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy" className="text-[#E21B70] font-semibold hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </motion.div>

            {/* Submit */}
            <motion.div variants={item}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="relative w-full overflow-hidden flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-[#E21B70] to-[#ff4d9e] text-white text-sm font-black shadow-[0_8px_24px_rgba(226,27,112,0.38)] hover:shadow-[0_10px_32px_rgba(226,27,112,0.55)] disabled:opacity-70 disabled:cursor-not-allowed transition-shadow duration-300"
              >
                {/* Shimmer on hover */}
                {!isSubmitting && (
                  <span className="absolute inset-0 -translate-x-full hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />
                )}

                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 size={16} className="animate-spin" />
                      Creating account…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Create free account
                      <ArrowRight size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

          </motion.div>
        </form>

        {/* Switch to Login */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="text-center text-[13px] text-slate-400 font-medium mt-7"
        >
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-bold text-[#E21B70] hover:underline transition-colors"
          >
            Sign in →
          </Link>
        </motion.p>
      </div>
    </motion.div>
  )
}