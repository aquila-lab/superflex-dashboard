import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './api-client'
import type {
  AuthTokenResponse,
  GoogleAuthRequest,
  LoginRequest,
  RegisterRequest,
  User,
  UserSubscription,
  UserUpdate
} from './types'
import { onboardingStepMapping, parseJwtToken } from './utils'

const queryKeys = {
  user: ['user'] as const,
  subscription: ['subscription'] as const
}

const TOKEN_KEY = 'token'

export const useAuth = () => {
  const getToken = () => localStorage.getItem(TOKEN_KEY)
  const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token)
  const clearToken = () => localStorage.removeItem(TOKEN_KEY)

  const getAuthHeader = () => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : undefined
  }

  const getTokenExpiry = () => {
    const token = getToken()
    if (!token) {
      return null
    }

    const payload = parseJwtToken(token)
    return payload?.exp || null
  }

  return {
    token: getToken(),
    setToken,
    clearToken,
    getAuthHeader,
    getTokenExpiry
  }
}

export const useUser = () => {
  const { token } = useAuth()

  return useQuery({
    queryKey: queryKeys.user,
    queryFn: async () => {
      const { data } = await apiClient.get<User>('/user')
      return data
    },
    enabled: !!token
  })
}

export const useSubscription = () => {
  const { token } = useAuth()

  return useQuery({
    queryKey: queryKeys.subscription,
    queryFn: async () => {
      const { data } = await apiClient.get<UserSubscription>(
        '/billing/subscription'
      )
      return data
    },
    enabled: !!token
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { setToken } = useAuth()

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const { data } = await apiClient.post<AuthTokenResponse>(
        '/auth/login',
        credentials
      )
      setToken(data.token)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user })
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription })
    }
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  const { setToken } = useAuth()

  return useMutation({
    mutationFn: async (credentials: RegisterRequest) => {
      const { data } = await apiClient.post<AuthTokenResponse>(
        '/auth/register',
        credentials
      )
      setToken(data.token)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user })
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription })
    }
  })
}

export const useGoogleAuth = () => {
  const queryClient = useQueryClient()
  const { setToken } = useAuth()

  return useMutation({
    mutationFn: async ({ code, redirect_uri }: GoogleAuthRequest) => {
      const { data } = await apiClient.get<AuthTokenResponse>(
        `/auth/google-callback?code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(
          redirect_uri ?? ''
        )}`
      )
      setToken(data.token)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user })
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription })
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { clearToken } = useAuth()

  return useMutation({
    mutationFn: async () => {
      clearToken()
      sessionStorage.clear()
      apiClient.defaults.headers.common.Authorization = undefined
    },
    onSuccess: () => {
      queryClient.clear()
      window.location.href = '/login'
    }
  })
}

export const useOnboardingStep = () => {
  const { data: user } = useUser()

  const currentStep = user?.onboarding_step ?? 0
  const currentStepName = onboardingStepMapping.getStepName(currentStep)

  const isStepCompleted = (stepNumber: number) => {
    if (!user || user.onboarding_step === null) {
      return false
    }

    if (user.onboarding_step === null) {
      return true
    }

    return user.onboarding_step > stepNumber
  }

  const isComplete = currentStepName === 'complete'

  return {
    currentStep,
    currentStepName,
    isStepCompleted,
    isComplete
  }
}

export const useUpdateOnboardingStep = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (step: number) => {
      const { data } = await apiClient.patch<User>('/user', {
        onboarding_step: step
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user })
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: UserUpdate) => {
      const { data } = await apiClient.patch<User>('/user', userData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user })
    }
  })
}
