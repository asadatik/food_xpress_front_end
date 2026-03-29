
// Mock auth service — swap the internals for real fetch() calls when your
// Node.js / JWT backend is ready. The public API (login / register signatures)
// stays identical.


export interface AuthUser {
  id: string
  fullName: string
  email: string
  phone?: string
  token: string
  createdAt: string
}

export interface LoginPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterPayload {
  fullName: string
  email: string
  phone: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: AuthUser
  message?: string
}

//Storage helpers

const TOKEN_KEY = 'fe_auth_token'
const USER_KEY  = 'fe_auth_user'

function persist(user: AuthUser, remember: boolean) {
  const storage = remember ? localStorage : sessionStorage
  storage.setItem(TOKEN_KEY, user.token)
  storage.setItem(USER_KEY, JSON.stringify(user))
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  const raw =
    localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY)
  return raw ? (JSON.parse(raw) as AuthUser) : null
}

export function clearAuth() {
  ;[localStorage, sessionStorage].forEach(s => {
    s.removeItem(TOKEN_KEY)
    s.removeItem(USER_KEY)
  })
}

//Mock data store (single user per session)

const MOCK_DELAY = 1500

function fakeToken() {
  return `eyJmb29kZXhwcmVzc18${Math.random().toString(36).slice(2)}`
}

// Seed one pre-existing user so login demo works
const SEED_EMAIL    = 'demo@foodexpress.io'
const SEED_PASSWORD = 'Demo@1234'



export const authService = {
  /**
   * Replace body with: `fetch('/api/auth/login', { method:'POST', body: JSON.stringify(payload) })`
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Check if a registered user exists in storage
        const stored = getStoredUser()
        const emailMatch =
          stored?.email === payload.email || payload.email === SEED_EMAIL

        if (!emailMatch) {
          resolve({ success: false, message: 'No account found with this email.' })
          return
        }

        const passwordOk =
          payload.email === SEED_EMAIL
            ? payload.password === SEED_PASSWORD
            : true // trust stored user for demo

        if (!passwordOk) {
          resolve({ success: false, message: 'Incorrect password. Please try again.' })
          return
        }

        const user: AuthUser = stored ?? {
          id: 'usr_seed_001',
          fullName: 'Demo User',
          email: SEED_EMAIL,
          token: fakeToken(),
          createdAt: new Date().toISOString(),
        }

        persist({ ...user, token: fakeToken() }, payload.rememberMe ?? false)
        resolve({ success: true, user })
      }, MOCK_DELAY)
    })
  },

  /**
   * Replace body with: `fetch('/api/auth/register', { method:'POST', body: JSON.stringify(payload) })`
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return new Promise(resolve => {
      setTimeout(() => {
        const existing = getStoredUser()
        if (existing?.email === payload.email || payload.email === SEED_EMAIL) {
          resolve({ success: false, message: 'An account with this email already exists.' })
          return
        }

        const user: AuthUser = {
          id: `usr_${Date.now()}`,
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          token: fakeToken(),
          createdAt: new Date().toISOString(),
        }

        persist(user, true)
        resolve({ success: true, user })
      }, MOCK_DELAY)
    })
  },
}