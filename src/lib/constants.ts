import type { ApiError, Editor, PlanCard, SuccessType } from './types'

// Environment constants
export const IS_PROD = import.meta.env.VITE_NODE_ENV === 'production'
export const IS_DEV = import.meta.env.VITE_NODE_ENV === 'development'

// API constants
export const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
}/v1`
export const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN ?? ''

// Error constants
export const INTERNAL_SERVER_ERROR: ApiError = {
  statusCode: 500,
  slug: 'internal_server',
  message: 'Internal server error'
}

// Query constants
export const QUERY_KEYS = {
  user: ['user'] as const,
  subscription: ['subscription'] as const
}

// Authentication constants
export const TOKEN_KEY = 'token'
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''
export const GOOGLE_OAUTH_REDIRECT_URI =
  import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI ?? 'http://localhost:5173'

// Analytics constants
export const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY ?? ''

// Subscription constants
export const UNLIMITED_THRESHOLD = 9999

// UI constants
export const LOADING_CONTAINER_CLASSES =
  'h-screen w-screen flex items-center justify-center'

export const TITLE_COLOR_MAP = {
  default: 'text-foreground',
  success: 'text-green-800',
  warning: 'text-amber-800'
}

export const VARIANT_CLASS_MAP = {
  default: 'rounded-lg border p-4 space-y-4',
  success: 'rounded-lg bg-green-50 border border-green-200 p-4 space-y-1',
  warning: 'rounded-lg bg-amber-50 border border-amber-200 p-4 space-y-1'
}

export const USER_INFO_LAYOUT_CLASSES = {
  container: 'flex flex-col min-h-svh',
  content: 'flex flex-1 items-center justify-center p-4 lg:p-8',
  formWrapper: 'w-full max-w-md'
}

// Form options
export const REFERAL_SOURCE_OPTIONS = [
  { value: 'vscode', label: 'VSCode' },
  { value: 'google', label: 'Google' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'twitter', label: 'X/Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'friend', label: 'Friend' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'other', label: 'Other' }
] as const

export const TECHNICAL_LEVEL_OPTIONS = [
  { value: 'non-technical', label: 'Non Technical' },
  { value: 'technical', label: 'Technical' },
  { value: 'highly-technical', label: 'Highly Technical' }
] as const

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

// Success flow constants
export const SUCCESS_TYPES: SuccessType[] = [
  'extension-login',
  'payment',
  'figma'
]

// Extension related constants
export const EXTENSION_URIS: {
  [K in Editor]: { install: string; open: string }
} & {
  marketplace: string
} = {
  vscode: {
    install: 'vscode:extension/aquilalabs.superflex',
    open: 'vscode://aquilalabs.superflex?open=true'
  },
  cursor: {
    install: 'cursor:extension/aquilalabs.superflex',
    open: 'cursor://aquilalabs.superflex?open=true'
  },
  marketplace:
    'https://marketplace.visualstudio.com/items?itemName=aquilalabs.superflex'
}

export const FIGMA_CONNECTION_STEPS = [
  {
    id: 'step-1',
    text: 'Click "Connect Figma" in the lower panel of Superflex.'
  },
  {
    id: 'step-2',
    text: 'A new tab will open—click Allow to grant Superflex permission to read your Figma projects.'
  },
  {
    id: 'step-3',
    text: "Once connected, you'll be able to copy Figma selections and use the Figma link feature to provide design context directly to Superflex."
  }
]

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
