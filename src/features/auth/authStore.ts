import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../../domain/models'
import { demoUser } from '../../mocks/data'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (phone: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (phone, password) => {
    await new Promise(resolve => setTimeout(resolve, 550))
    if (!phone.trim() || !password.trim()) return false
    set({ user: { ...demoUser, phone }, isAuthenticated: true })
    return true
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}), {
  name: 'food-campus-auth',
  version: 2,
  migrate: () => ({ user: null, isAuthenticated: false }),
}))
