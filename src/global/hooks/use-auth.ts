import { useApi } from '@/global/providers/api-provider'
import { isTokenExpired } from '@/lib/utils'
import { useAuthStore } from '@/store/auth-store'
import { useUserStore } from '@/store/user-store'
import { useCallback, useEffect, useMemo } from 'react'

export const useAuth = () => {
  const { user, isLoading, error } = useUserStore()
  const { token } = useAuthStore()
  const api = useApi()

  const isAuthenticated = useMemo(() => {
    if (!token || isTokenExpired(token)) {
      return false
    }

    return !!user
  }, [token, user])

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      api.logout()
    }
  }, [token, api.logout, api])

  useEffect(() => {
    if (token && !user && !isLoading && api && !isTokenExpired(token)) {
      api.fetchUserData()
    }
  }, [token, user, isLoading, api])

  const login = useCallback(
    async (email: string, password: string) => {
      if (!api) {
        return
      }
      return api.login(email, password)
    },
    [api]
  )

  const register = useCallback(
    async (email: string, password: string) => {
      if (!api) {
        return
      }
      return api.register(email, password)
    },
    [api]
  )

  const logout = useCallback(async () => {
    if (!api) {
      return
    }
    return api.logout()
  }, [api])

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    token
  }
}
