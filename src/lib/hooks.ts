import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import posthog from 'posthog-js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { apiClient } from './api-client'
import { EXTENSION_URIS, QUERY_KEYS, TOKEN_KEY } from './constants'
import { useErrorHandler, withErrorHandling } from './error-handling'
import type {
  AuthTokenResponse,
  Editor,
  ExtensionAction,
  GoogleAuthRequest,
  LoginRequest,
  PlanId,
  RegisterRequest,
  User,
  UserSubscription,
  UserUpdate
} from './types'
import { onboardingStepMapping, parseJwtToken, trackConversion } from './utils'

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
    queryKey: QUERY_KEYS.user,
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
    queryKey: QUERY_KEYS.subscription,
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
      if (data?.token) {
        setToken(data.token)
        return data
      }
      throw new Error('Invalid response from server')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.subscription })
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.subscription })
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.subscription })
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
      localStorage.clear()
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user })
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: UserUpdate) => {
      const { data } = await apiClient.patch<User>('/user', {
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        title: userData.title,
        company: userData.company,
        onboarding_step: userData.onboarding_step
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user })
    }
  })
}

export const useUrlParamsStorage = () => {
  const location = useLocation()
  const { data: user } = useUser()

  useEffect(() => {
    const saveUrlParamsToSession = () => {
      const searchParams = new URLSearchParams(location.search)
      const uniqueID = searchParams.get('uniqueID')
      const encodedState = searchParams.get('state')

      if (uniqueID) {
        sessionStorage.setItem('uniqueID', uniqueID)
        localStorage.setItem('uniqueID', uniqueID)

        posthog.identify(uniqueID, {
          userID: user?.id,
          email: user?.email
        })
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
  }, [location.search, user?.id, user?.email])
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.subscription })
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
    trackConversion.freePlanClick()

    const activateFreePlan = withErrorHandling(
      async () => {
        const result = await updateOnboardingStep.mutateAsync(1)
        return result
      },
      {
        successMessage: 'Free plan successfully activated!',
        onSuccess: () => {
          navigate('/user-info')
        }
      }
    )

    activateFreePlan()
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

      const planName = planId.includes('individual') ? 'Individual Pro' : 'Team'
      trackConversion.paidPlanClick(planName)

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

export const useWithErrorToast = <
  TData = unknown,
  TError = unknown,
  TVariables = void
>() => {
  const { handleError } = useErrorHandler()

  return useMutation<TData, TError, TVariables>({
    onError: (error: any) => {
      handleError(error)
    }
  })
}

export const useExtensionLauncher = () => {
  const [isAttemptingLaunch, setIsAttemptingLaunch] = useState(false)
  const [currentApp, setCurrentApp] = useState<Editor | ''>('')
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleExtensionAction = useCallback(
    (action: ExtensionAction, app?: Editor) => {
      try {
        if (action === 'marketplace') {
          window.open(EXTENSION_URIS.marketplace, '_blank')
          return
        }

        if (!app) {
          return
        }

        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current)
        }

        setIsAttemptingLaunch(true)
        setCurrentApp(app)

        if (action === 'install') {
          if (app === 'vscode') {
            trackConversion.installVSCodeClick()
          } else if (app === 'cursor') {
            trackConversion.installCursorClick()
          }
        }

        const uri = EXTENSION_URIS[app][action]
        window.location.href = uri

        timeoutRef.current = window.setTimeout(() => {
          setIsAttemptingLaunch(false)
        }, 3000)
      } catch (_error) {
        setIsAttemptingLaunch(false)
      }
    },
    []
  )

  const helpers = useMemo(
    () => ({
      launchVSCodeExtension: () => handleExtensionAction('install', 'vscode'),
      launchCursorExtension: () => handleExtensionAction('install', 'cursor'),
      openVSCodeSuperflex: () => handleExtensionAction('open', 'vscode'),
      openCursorSuperflex: () => handleExtensionAction('open', 'cursor'),
      openMarketplace: () => handleExtensionAction('marketplace')
    }),
    [handleExtensionAction]
  )

  return {
    isAttemptingLaunch,
    currentApp,
    handleExtensionAction,
    ...helpers
  }
}

export const useSourceDetection = () => {
  const [searchParams] = useSearchParams()

  const detectSource = useCallback(() => {
    const source = searchParams.get('source')
    const state = searchParams.get('state')

    let detectedSource = ''

    if (source === 'website') {
      detectedSource = 'website'
    } else if (state) {
      let decodedState = decodeURIComponent(state)
      if (decodedState.includes('%')) {
        decodedState = decodeURIComponent(decodedState)
      }

      if (decodedState.includes('cursor')) {
        detectedSource = 'cursor'
      } else if (decodedState.includes('vscode')) {
        detectedSource = 'vscode'
      }
    }

    return detectedSource
  }, [searchParams])

  return { detectSource }
}
