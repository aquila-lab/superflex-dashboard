import { QueryClient } from '@tanstack/react-query'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  ALLOWED_ONBOARDING_STEPS,
  COMPLETED_ONBOARDING_STEP,
  ONBOARDING_PATH_MAPPING,
  PROTECTED_PATH_WHITELIST,
  SUCCESS_TYPES,
  UNLIMITED_THRESHOLD
} from './constants'
import type { BillingPeriod, PlanId, RedirectInfo, User } from './types'

// Query client singleton
export const getQueryClient = (() => {
  let queryClient: QueryClient | null = null

  return () => {
    if (!queryClient) {
      queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1
          }
        }
      })
    }

    return queryClient
  }
})()

// UI utilities
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return 'Not available'
  }

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return 'Not available'
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

// JWT utilities
export const parseJwtToken = <T extends Record<string, unknown>>(
  token: string
): T | null => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => {
          const hex = c.charCodeAt(0).toString(16)
          const paddedHex = `00${hex}`.slice(-2)
          return `%${paddedHex}`
        })
        .join('')
    )

    return JSON.parse(jsonPayload) as T
  } catch {
    return null
  }
}

export const isTokenExpired = (token: string): boolean => {
  const payload = parseJwtToken(token)

  if (!payload) {
    return true
  }

  const now = Math.floor(Date.now() / 1000)

  if ('valid_to' in payload) {
    return (payload.valid_to as number) < now
  }

  if ('exp' in payload) {
    return (payload.exp as number) < now
  }

  return true
}

// Onboarding utilities
export const onboardingStepMapping = {
  steps: [
    'plan-selection',
    'user-info',
    'vscode-download',
    'extension-installation',
    'connect-figma',
    'complete'
  ] as const,

  getStepName: (step: number | null): string => {
    if (
      step === null ||
      step < 0 ||
      step >= onboardingStepMapping.steps.length
    ) {
      return 'complete'
    }
    return onboardingStepMapping.steps[step]
  },

  getStepNumber: (stepName: string): number => {
    const index = onboardingStepMapping.steps.indexOf(stepName as any)
    return index === -1 ? onboardingStepMapping.steps.length - 1 : index
  }
}

export const isOnboardingComplete = (
  onboardingStep: number | null
): boolean => {
  return onboardingStep === null || onboardingStep === COMPLETED_ONBOARDING_STEP
}

// Routing and redirection
export const getRedirectInfo = (
  user: User | null | undefined,
  currentStep: number
): RedirectInfo => {
  if (!user) {
    return {
      path: '/login',
      shouldRedirect: false
    }
  }

  return {
    path: ONBOARDING_PATH_MAPPING[currentStep] || '/dashboard/onboarding',
    shouldRedirect: true
  }
}

export const getProtectedRedirectInfo = (
  user: User | null | undefined,
  currentStep: number,
  pathname: string,
  search: string
): RedirectInfo => {
  if (!user) {
    return {
      path: '/login',
      shouldRedirect: true
    }
  }

  if (pathname !== '/success') {
    sessionStorage.removeItem('redirected')
  }

  const searchParams = new URLSearchParams(search)
  const success = searchParams.get('type')

  if (
    pathname === '/success' &&
    success &&
    SUCCESS_TYPES.includes(success as any)
  ) {
    return {
      path: pathname + search,
      shouldRedirect: false
    }
  }

  if (user) {
    const redirected = sessionStorage.getItem('redirected')

    if (!redirected && currentStep >= 2) {
      const decodedState = sessionStorage.getItem('decodedState')
      sessionStorage.setItem('redirected', 'true')

      if (decodedState) {
        return {
          path: '/success?type=extension-login',
          shouldRedirect: true
        }
      }
    }
  }

  const correctPath =
    ONBOARDING_PATH_MAPPING[currentStep] || '/dashboard/onboarding'

  if (
    PROTECTED_PATH_WHITELIST.includes(pathname as any) &&
    ALLOWED_ONBOARDING_STEPS.includes(currentStep as any)
  ) {
    return {
      path: correctPath,
      shouldRedirect: false
    }
  }

  const isOnCorrectPath = pathname === correctPath

  return {
    path: correctPath,
    shouldRedirect: !isOnCorrectPath
  }
}

// Subscription and plan utilities
export const getRequestPercentage = (
  used: number,
  limit: number | null
): number => {
  if (!limit || limit > UNLIMITED_THRESHOLD) {
    return 0
  }
  return (used / limit) * 100
}

export const isUnlimitedPlan = (limit: number | null): boolean => {
  return (limit || 0) > UNLIMITED_THRESHOLD
}

export const getPlanIdFromTitle = (
  title: string,
  billingPeriod: BillingPeriod
): PlanId | null => {
  const mapping: Record<string, Record<BillingPeriod, PlanId>> = {
    'Free Plan': {
      monthly: 'free',
      annual: 'free'
    },
    'Individual Pro Plan': {
      monthly: 'individual_pro_monthly',
      annual: 'individual_pro_yearly'
    },
    'Team Plan': {
      monthly: 'team_monthly',
      annual: 'team_yearly'
    }
  }

  return mapping[title]?.[billingPeriod] || null
}
