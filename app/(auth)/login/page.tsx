
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, Variants } from 'framer-motion'

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Facebook,


} from 'lucide-react'

import { FcGoogle } from 'react-icons/fc' 

import { loginSchema, type LoginFormValues } from '@/lib/auth/auth.schemas'
import { authService } from '@/lib/auth/auth.service'

//Variants 

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}
//socialButtons
const socialButtons = [
  {
    icon: FcGoogle,
    label: 'Google',
    bg: 'hover:border-red-200 hover:bg-red-50/80 data-[state=active]:bg-red-50',
    shadow: 'shadow-red/10'
  },
  {
    icon: Facebook,
    label: 'Facebook',
    bg: 'hover:border-blue-200 hover:bg-blue-50/80 data-[state=active]:bg-blue-50',
    shadow: 'shadow-blue/10'
  },

]



//Field Wrapper 

interface FieldProps {
  label: string
  error?: string
  icon: React.ReactNode
  children: React.ReactNode
}

function Field({ label, error, icon, children }: FieldProps) {
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
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-1.5 text-[12px] text-red-500 font-medium pl-1"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}



const inputCls = (hasError?: boolean) =>
  `w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-300 bg-white/60 border transition-all duration-200 outline-none
   focus:ring-2 focus:ring-[#E21B70]/20 focus:border-[#E21B70]/50 focus:bg-white/90
   ${hasError ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200/80 hover:border-slate-300'}`



function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-semibold mb-5 ${type === 'success'
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

//Page

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  })

  const onSubmit = async (values: any) => {
    setToast(null)
    const res = await authService.login(values)

    if (!res.success) {
      setToast({ type: 'error', message: res.message ?? 'Login failed. Please try again.' })
      return
    }

    setToast({ type: 'success', message: `Welcome back, ${res.user?.fullName}! Redirecting…` })
    setTimeout(() => router.push('/'), 1400)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xl"
    >
      {/* Glass card */}
      <div className="bg-white/70 backdrop-blur-3xl border border-white/50 rounded-3xl shadow-[0_32px_64px_-16px_rgba(226,27,112,0.12),0_16px_32px_-8px_rgba(0,0,0,0.06)]  p-4 md:p-8 ">

        {/* Header */}
        <motion.div variants={container} initial="hidden" animate="visible" className="mb-8">
          <motion.div variants={item}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E21B70] to-[#FFB100] flex items-center justify-center shadow-[0_6px_20px_rgba(226,27,112,0.38)] mb-5">
              <Lock className="w-5 h-5 text-white" />
            </div>
          </motion.div>
          <motion.h1 variants={item} className=" text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-1">
            Welcome back
          </motion.h1>
          <motion.p variants={item} className="text-sm text-slate-400 font-medium">
            Sign in to your FoodExpress account
          </motion.p>
        </motion.div>

        {/* Toast */}
        <AnimatePresence>
          {toast && <Toast message={toast.message} type={toast.type} />}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <motion.div variants={container} initial="hidden" animate="visible" className="space-y-5">

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

            {/* Password */}
            <motion.div variants={item}>
              <Field label="Password" error={errors.password?.message} icon={<Lock size={15} />}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`${inputCls(!!errors.password)} pr-11`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </Field>
            </motion.div>

            {/* Remember me + Forgot */}
            <motion.div variants={item} className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...register('rememberMe')}
                  />
                  <div className="w-4.5 h-4.5 w-[18px] h-[18px] rounded-md border-2 border-slate-300 peer-checked:border-[#E21B70] peer-checked:bg-[#E21B70] transition-all flex items-center justify-center">
                    <motion.div
                      initial={false}
                      className="text-white"
                    >
                      <CheckCircle2 size={10} className="opacity-0 peer-checked:opacity-100" />
                    </motion.div>
                  </div>
                </div>
                <span className="text-[13px] font-medium text-slate-500 group-hover:text-slate-700 transition-colors select-none">
                  Remember me
                </span>
              </label>

              <Link
                href="/forgot-password"
                className="text-[13px] font-semibold text-[#E21B70] hover:underline transition-colors"
              >
                Forgot password?
              </Link>
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
                {/* Shimmer */}
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
                      Authenticating…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Sign in
                      <ArrowRight size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div variants={item} className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[12px] text-slate-600 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-slate-100" />
            </motion.div>

            {/* Social stubs */}
            <motion.div
              variants={item}
              className="flex justify-center gap-3 w-full     "
            >
              {socialButtons.map((social, i) => (
                <motion.button
                  key={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`
        group flex items-center justify-center gap-2 p-2
        rounded-2xl border-2 border-slate-200/70 backdrop-blur-sm
        bg-white/70 shadow-lg hover:shadow-xl transition-all duration-300
        font-semibold text-slate-700 text-md hover:scale-[1.02] active:scale-[0.98]
        ${social.bg} ${social.shadow}
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50
        focus-visible:ring-offset-2 focus-visible:ring-offset-background
      `}
                  onClick={() => console.log(`${social.label} clicked`)}
                >
                  <social.icon className="h-8 w-8 text-blue-500 group-hover:text-shadow-blue-600" />
                  <span>{social.label}</span>
                </motion.button>
              ))}
            </motion.div>

          </motion.div>
        </form>

        {/* Switch to Register */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="text-center text-[16px] text-slate-500 font-medium mt-7"
        >
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-extrabold text-[#E21B70] hover:underline transition-colors"
          >
            Create one free →
          </Link>
        </motion.p>
      </div>

      {/* Demo hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-center text-md text-slate-600 font-medium mt-4"
      >
        Demo: <span className="font-semibold">demo@foodexpress.io</span> / <span className="font-semibold">Demo@1234</span>
      </motion.p>
    </motion.div>
  )
}