import { QueryClient } from '@tanstack/react-query'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

export const parseJwtToken = (token: string): Record<string, any> | null => {
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

    return JSON.parse(jsonPayload)
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

  if (payload.valid_to) {
    return payload.valid_to < now
  }

  if (payload.exp) {
    return payload.exp < now
  }

  return true
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
