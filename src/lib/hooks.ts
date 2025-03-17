import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './api-client'
import type {
  AuthTokenResponse,
  GoogleAuthRequest,
  LoginRequest,
  PlanId,
  RegisterRequest,
  User,
  UserSubscription,
  UserUpdate
} from './types'
import { onboardingStepMapping, parseJwtToken } from './utils'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { TOKEN_KEY, queryKeys } from './constants'

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

export const useUrlParamsStorage = () => {
  const location = useLocation()

  useEffect(() => {
    const saveUrlParamsToSession = () => {
      const searchParams = new URLSearchParams(location.search)
      const uniqueID = searchParams.get('uniqueID')
      const encodedState = searchParams.get('state')

      if (uniqueID) {
        sessionStorage.setItem('uniqueID', uniqueID)
      }

      if (encodedState) {
        let decodedState = decodeURIComponent(encodedState)

        if (decodedState.includes('%')) {
          decodedState = decodeURIComponent(decodedState)
        }

        sessionStorage.setItem('encodedState', encodedState)
        sessionStorage.setItem('decodedState', decodedState)

        try {
          if (decodedState.includes('?') && decodedState.includes('=')) {
            const stateUrl = new URL(
              decodedState.includes('://')
                ? decodedState
                : `https://app.superflex.ai/${decodedState}`
            )

            const stateParams: Record<string, string> = {}
            stateUrl.searchParams.forEach((value, key) => {
              stateParams[key] = value
              sessionStorage.setItem(`state_${key}`, value)
            })

            sessionStorage.setItem('stateParams', JSON.stringify(stateParams))
          }
        } catch (_error) {}
      }
    }

    saveUrlParamsToSession()
  }, [location.search])
}

export const useResetPassword = () => {
  const queryClient = useQueryClient()
  const { setToken } = useAuth()

  return useMutation({
    mutationFn: async ({
      code,
      new_password
    }: {
      code: string
      new_password: string
    }) => {
      const { data } = await apiClient.post<AuthTokenResponse>(
        '/auth/reset-password-set',
        { code, new_password }
      )
      return data
    },
    onSuccess: (data: AuthTokenResponse) => {
      setToken(data.token)
      queryClient.invalidateQueries({ queryKey: queryKeys.user })
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription })
    }
  })
}

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await apiClient.post('/auth/reset-password', { email })
      return data
    }
  })
}

export const usePlanSelection = () => {
  const navigate = useNavigate()
  const { data: user } = useUser()
  const updateOnboardingStep = useUpdateOnboardingStep()

  const handleFreePlanSelection = useCallback(() => {
    updateOnboardingStep.mutate(1, {
      onSuccess: () => {
        toast.success('Free plan successfully activated!')
        navigate('/user-info')
      },
      onError: () => {
        toast.error('Failed to update your profile. Please try again.')
      }
    })
  }, [updateOnboardingStep, navigate])

  const getStripeUrl = useCallback(
    (planId: PlanId): string | null => {
      if (!user) {
        return null
      }

      if (import.meta.env.DEV && planId !== 'free') {
        return `https://buy.stripe.com/test_7sI03HdeB15hcX6cN4?client_reference_id=${user.id}&prefilled_email=${user.email}`
      }

      switch (planId) {
        case 'individual_pro_monthly': {
          return `https://buy.stripe.com/eVag2Q3mm1Mm7qEbIZ?client_reference_id=${user.id}&prefilled_email=${user.email}`
        }
        case 'individual_pro_yearly': {
          return `https://buy.stripe.com/dR6aIw4qq3UufXa3cu?client_reference_id=${user.id}&prefilled_email=${user.email}`
        }
        case 'team_monthly': {
          return `https://buy.stripe.com/bIYbMAcWW3UufXafZe?client_reference_id=${user.id}&prefilled_email=${user.email}`
        }
        case 'team_yearly': {
          return `https://buy.stripe.com/fZe3g4aOObmWdP2eVd?client_reference_id=${user.id}&prefilled_email=${user.email}`
        }
        case 'free': {
          return null
        }
        default: {
          return null
        }
      }
    },
    [user]
  )

  const handlePlanSelection = useCallback(
    (planId: PlanId) => {
      if (planId === 'free') {
        handleFreePlanSelection()
        return
      }

      sessionStorage.setItem('planId', planId)

      const stripeUrl = getStripeUrl(planId)
      if (stripeUrl) {
        window.location.href = stripeUrl
      }
    },
    [getStripeUrl, handleFreePlanSelection]
  )

  return {
    handlePlanSelection
  }
}
