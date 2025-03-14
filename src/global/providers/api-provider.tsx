import { API_BASE_URL, GOOGLE_OAUTH_REDIRECT_URI } from '@/lib/constants'
import { useAuthStore } from '@/store/auth-store'
import type { AuthTokenResponse } from '@/store/model'
import {
  type User,
  type UserSubscription,
  useUserStore
} from '@/store/user-store'
import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'

export const ApiContext = createContext<{
  login: (email: string, password: string) => Promise<string>
  register: (email: string, password: string) => Promise<void>
  googleAuth: (code: string, redirectUri?: string) => Promise<string>
  logout: () => Promise<void>
  fetchUserData: () => Promise<void>
  fetchSubscription: () => Promise<void>
} | null>(null)

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, clearUser, setError, setLoading, setSubscription } =
    useUserStore()

  const { setToken, clearToken, getAuthHeader } = useAuthStore()

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: {
          ...getAuthHeader()
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }

      const userData: User = await response.json()

      setUser(userData)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
    } finally {
      setLoading(false)
    }
  }, [setLoading, setUser, setError, getAuthHeader])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true)

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username_or_email: email, password })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to login')
        }

        const authResponse: AuthTokenResponse = await response.json()

        setToken(authResponse.token)

        await fetchUserData()

        return authResponse.token
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        )
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, setToken, fetchUserData]
  )

  const googleAuth = useCallback(
    async (code: string, redirectUri = GOOGLE_OAUTH_REDIRECT_URI) => {
      try {
        setLoading(true)

        const response = await fetch(
          `${API_BASE_URL}/auth/google-callback?code=${encodeURIComponent(
            code
          )}&redirect_uri=${encodeURIComponent(redirectUri)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        )

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to authenticate with Google')
        }

        const authResponse: AuthTokenResponse = await response.json()

        setToken(authResponse.token)

        await fetchUserData()

        return authResponse.token
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        )
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, setToken, fetchUserData]
  )

  const register = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true)

        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, username: email })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to register')
        }

        const authResponse: AuthTokenResponse = await response.json()
        setToken(authResponse.token)

        await fetchUserData()
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        )
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, setToken, fetchUserData]
  )

  const logout = useCallback(async () => {
    try {
      setLoading(true)
      clearUser()
      clearToken()
      sessionStorage.clear()
      localStorage.clear()
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
    } finally {
      setLoading(false)
    }
  }, [setLoading, clearUser, setError, clearToken])

  const fetchSubscription = useCallback(async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_BASE_URL}/billing/subscription`, {
        headers: {
          ...getAuthHeader()
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch subscription')
      }

      const subscriptionData: UserSubscription = await response.json()

      setSubscription(subscriptionData)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
    } finally {
      setLoading(false)
    }
  }, [setLoading, setSubscription, setError, getAuthHeader])

  const contextValue = useMemo(
    () => ({
      login,
      register,
      googleAuth,
      logout,
      fetchUserData,
      fetchSubscription
    }),
    [login, register, googleAuth, logout, fetchUserData, fetchSubscription]
  )

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  )
}

export const useApi = () => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}
