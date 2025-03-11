import { parseJwtToken } from '@/lib/utils'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useAuthStore = create<{
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
  getAuthHeader: () => Record<string, string> | undefined
  getTokenExpiry: () => number | null
}>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,

        setToken: token => {
          set({ token })
        },
        clearToken: () => {
          set({ token: null })
        },
        getAuthHeader: () => {
          const { token } = get()
          return token ? { Authorization: `Bearer ${token}` } : undefined
        },
        getTokenExpiry: () => {
          const { token } = get()
          if (!token) {
            return null
          }

          const payload = parseJwtToken(token)
          return payload?.exp || null
        }
      }),
      {
        name: 'auth-storage'
      }
    )
  )
)
