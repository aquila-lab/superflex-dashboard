export type OnboardingStep =
  | 'plan-selection'
  | 'user-info'
  | 'vscode-download'
  | 'extension-installation'
  | 'connect-figma'
  | 'complete'

export type User = {
  id: string
  email: string
  username: string
  picture?: string | null
  stripe_customer_id?: string | null
  onboarding_step: number | null
}

export type Plan = {
  name: string
  basic_request_limit: number
  premium_request_limit: number
}

export type UserSubscription = {
  plan: Plan | null
  basic_requests_used: number
  premium_requests_used: number
  last_reset_date: string
  created_at: string
  end_date: string | null
}

export type AuthTokenResponse = {
  token: string
}

export const API_BASE_URL = 'https://api.superflex.ai/v1'
export const GOOGLE_CLIENT_ID =
  '195168488301-1b5i1hcnigjraer96pbnubqtbmduu19r.apps.googleusercontent.com'
export const GOOGLE_OAUTH_REDIRECT_URI = 'http://localhost:5173'
