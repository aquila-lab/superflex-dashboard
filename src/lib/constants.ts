import type { ApiError, PlanCard, SuccessType } from './types'

// Environment & API constants
export const IS_PROD = import.meta.env.VITE_NODE_ENV === 'production'
export const IS_DEV = import.meta.env.VITE_NODE_ENV === 'development'
export const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
}/v1`
export const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN ?? ''

// Authentication constants
export const TOKEN_KEY = 'token'
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''
export const GOOGLE_OAUTH_REDIRECT_URI =
  import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI ?? 'http://localhost:5173'

// Analytics constants
export const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY ?? ''

// Query keys
export const queryKeys = {
  user: ['user'] as const,
  subscription: ['subscription'] as const
}

// Subscription constants
export const UNLIMITED_THRESHOLD = 9999

// Onboarding constants
export const COMPLETED_ONBOARDING_STEP = 5
export const STEPS_DATA = [
  {
    id: 0,
    label: 'Sign Up',
    description: 'Covers registration'
  },
  {
    id: 1,
    label: 'Choose Plan',
    description: 'Plan selection and subscription'
  },
  {
    id: 2,
    label: 'Profile Setup',
    description: 'Covers additional user info'
  },
  {
    id: 3,
    label: 'Get Started',
    description: 'VSCode extension onboarding flow'
  }
] as const

export const ONBOARDING_PATH_MAPPING: Record<number, string> = {
  0: '/select-plan',
  1: '/user-info',
  2: '/dashboard/onboarding',
  3: '/dashboard/onboarding',
  4: '/dashboard/onboarding',
  5: '/dashboard'
}

export const PROTECTED_PATH_WHITELIST = [
  '/dashboard',
  '/dashboard/onboarding',
  '/dashboard/upgrade-subscription',
  '/pricing'
] as const

export const ALLOWED_ONBOARDING_STEPS = [2, 3, 4, 5] as const

// Extension related constants
export const EXTENSION_URIS = {
  'VS Code': {
    install: 'vscode:extension/aquilalabs.superflex',
    open: 'vscode://aquilalabs.superflex?open=true'
  },
  Cursor: {
    install: 'cursor:extension/aquilalabs.superflex',
    open: 'cursor://aquilalabs.superflex?open=true'
  },
  marketplace:
    'https://marketplace.visualstudio.com/items?itemName=aquilalabs.superflex'
} as const

// Success flow constants
export const SUCCESS_TYPES: SuccessType[] = [
  'extension-login',
  'payment',
  'figma'
]

// UI constants
export const LOADING_CONTAINER_CLASSES =
  'h-screen w-screen flex items-center justify-center'

// Error constants
export const INTERNAL_SERVER_ERROR: ApiError = {
  statusCode: 500,
  slug: 'internal_server',
  message: 'Internal server error'
}

// Plan data
export const PLAN_CARD = [
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
