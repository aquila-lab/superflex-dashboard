import type { ReactNode } from 'react'

// Common UI types
export type Option = {
  readonly value: string
  readonly label: string
}

export type TabOption = {
  id: string
  label: string
  icon: ReactNode
}

export type InfoBoxVariant = 'default' | 'success' | 'warning'

export type RouterContainerProps = {
  children: ReactNode
}

// User related types
export type User = {
  id: string
  email: string
  username: string
  first_name: string | null
  last_name: string | null
  title: string | null
  company: string | null
  picture: string | null
  onboarding_step: number | null
  created_at: string
  updated_at: string
  stripe_customer_id: string | null
}

export type UserUpdate = Partial<
  Pick<
    User,
    | 'username'
    | 'first_name'
    | 'last_name'
    | 'title'
    | 'company'
    | 'onboarding_step'
  >
>

export type UpdateUserMutation = {
  mutateAsync: (data: UserUpdate) => Promise<User>
  isPending: boolean
}

export type TechnicalLevel = 'non-technical' | 'technical' | 'highly-technical'

export type ReferralSource =
  | 'vscode'
  | 'google'
  | 'reddit'
  | 'tiktok'
  | 'youtube'
  | 'twitter'
  | 'instagram'
  | 'friend'
  | 'linkedin'
  | 'other'

// Authentication types
export type AuthTokenResponse = {
  token: string
}

export type LoginRequest = {
  username_or_email: string
  password: string
}

export type RegisterRequest = {
  email: string
  password: string
  username: string
}

export type GoogleAuthRequest = {
  code: string
  redirect_uri?: string
}

// API types
export type ApiError = {
  statusCode: number
  slug: string
  message: string
} | null

// Routing types
export type RedirectInfo = {
  path: string
  shouldRedirect: boolean
}

// Subscription and plan types
export type Plan = {
  name: string
  basic_request_limit: number | null
  premium_request_limit: number | null
  figma_request_limit: number | null
}

export type UserSubscription = {
  plan: Plan | null
  basic_requests_used: number
  premium_requests_used: number
  figma_requests_used: number
  last_reset_date: string
  created_at: string
  end_date: string | null
  billing_portal_url: string | null
}

export type BillingPeriod = 'monthly' | 'annual'

export type PlanId =
  | 'free'
  | 'individual_pro_monthly'
  | 'individual_pro_yearly'
  | 'team_monthly'
  | 'team_yearly'

// Plan card types
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

export type ExtendedPlanCard = PlanCard & {
  teamSize?: {
    monthly: {
      users: string
      price: string
    }
    annual: {
      users: string
      price: string
    }
  }
}

// Onboarding types
export type OnboardingSection = {
  id: string
  title: string
  defaultOpen: boolean
  completed: boolean
  stepNumber: number
}

export type StepStatus = {
  isCompleted: boolean
  isCurrent: boolean
  isUpcoming: boolean
  index: number
}

export type SuccessType = 'figma' | 'payment' | 'extension-login'

export type SuccessConfig = {
  pageTitle: string
  pageDescription: string
  cardTitle: string
  cardDescription: string
  toastMessage: string
  ctaText: string
  icon: ReactNode
}

// Extension types
export type Editor = 'vscode' | 'cursor'
export type ExtensionAction = 'install' | 'open' | 'marketplace'
