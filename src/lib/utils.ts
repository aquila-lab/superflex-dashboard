import type { OnboardingStep } from '@/store/model'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const onboardingStepMapping = {
  steps: [
    'plan-selection',
    'user-info',
    'vscode-download',
    'extension-installation',
    'connect-figma',
    'complete'
  ] as const,

  numberToStep: (step: number | null): OnboardingStep => {
    if (
      step === null ||
      step < 0 ||
      step >= onboardingStepMapping.steps.length
    ) {
      return 'complete'
    }
    return onboardingStepMapping.steps[step]
  },

  stepToNumber: (step: OnboardingStep): number => {
    const index = onboardingStepMapping.steps.indexOf(step)
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
    return 'Unlimited'
  }

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return 'Unlimited'
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export type PlanCardFeature = {
  text: string
  included: boolean
}

export type PlanCardPricing = {
  monthly: {
    price: string
    billingLabel: string
  }
  annual: {
    price: string
    billingLabel: string
  }
}

export type PlanCard = {
  title: string
  description: string
  pricing: PlanCardPricing
  buttonText: string
  popular?: boolean
  features: PlanCardFeature[]
}

export const planCards = [
  {
    title: 'Free Plan',
    description:
      "Explore Superflex with no commitment. Get access to essential features and see if it's the right fit for you.",
    pricing: {
      monthly: {
        price: 'Free',
        billingLabel: ''
      },
      annual: {
        price: 'Free',
        billingLabel: ''
      }
    },
    buttonText: 'Get started',
    features: [
      { text: 'One project', included: true },
      { text: '15 premium requests per month', included: true },
      { text: '100 basic requests per month', included: true }
    ]
  },
  {
    title: 'Individual Pro Plan',
    description:
      'Perfect for building and scaling projects. Unlock premium tools, gain deeper insights, and maximize efficiency.',
    pricing: {
      monthly: {
        price: '$29',
        billingLabel: '/mo *billed monthly'
      },
      annual: {
        price: '$19',
        billingLabel: '/mo *billed yearly'
      }
    },
    buttonText: 'Subscribe',
    popular: true,
    features: [
      { text: 'Up to 3 projects', included: true },
      { text: '250 premium requests per month', included: true },
      { text: 'Unlimited basic requests per month', included: true },
      { text: 'Import from Figma', included: true },
      { text: 'Priority email support', included: true }
    ]
  },
  {
    title: 'Team Plan',
    description:
      'Empower your team with unlimited requests, centralized billing, and advanced analytics for seamless collaboration.',
    pricing: {
      monthly: {
        price: '$299',
        billingLabel: '/mo *billed monthly'
      },
      annual: {
        price: '$199',
        billingLabel: '/mo *billed yearly'
      }
    },
    buttonText: 'Subscribe',
    features: [
      { text: 'Centralized team billing', included: true },
      { text: 'Advanced Figma to code generation', included: true },
      { text: 'Unlimited projects', included: true },
      { text: 'Unlimited premium requests per month', included: true },
      { text: 'Zero data retention policy', included: true },
      { text: 'Priority support via Slack Connect', included: true }
    ],
    teamSize: {
      monthly: {
        users: '5 users ',
        price: '$69 per new user'
      },
      annual: {
        users: '5 users ',
        price: '$59 per new user'
      }
    }
  }
] as PlanCard[]
