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
  billing_portal_url: string | null
}

export type AuthTokenResponse = {
  token: string
}
