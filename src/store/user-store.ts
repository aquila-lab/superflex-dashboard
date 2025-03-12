import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User, UserSubscription } from './model'
export type { OnboardingStep, Plan, User, UserSubscription } from './model'

export const useUserStore = create<{
  user: User | null
  isLoading: boolean
  error: string | null
  subscription: UserSubscription | null
  setUser: (user: User) => void
  updateUser: (userData: Partial<User>) => void
  clearUser: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setSubscription: (subscription: UserSubscription | null) => void
}>()(
  devtools(
    persist(
      set => ({
        user: null,
        isLoading: false,
        error: null,
        subscription: null,

        setUser: user => set({ user, error: null }),
        updateUser: userData =>
          set(state => ({
            user: state.user ? { ...state.user, ...userData } : null
          })),
        clearUser: () => set({ user: null, subscription: null }),
        setLoading: isLoading => set({ isLoading }),
        setError: error => set({ error }),
        setSubscription: subscription => set({ subscription })
      }),
      {
        name: 'user-storage',
        partialize: state => ({
          user: state.user,
          subscription: state.subscription
        })
      }
    )
  )
)
