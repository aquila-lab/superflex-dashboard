export interface User {
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

export interface Plan {
  name: string
  basic_request_limit: number | null
  premium_request_limit: number | null
}

export interface UserSubscription {
  plan: Plan | null
  basic_requests_used: number
  premium_requests_used: number
  last_reset_date: string
  created_at: string
  end_date: string | null
  billing_portal_url: string | null
}

export interface AuthTokenResponse {
  token: string
}

export interface LoginRequest {
  username_or_email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  username: string
}

export interface GoogleAuthRequest {
  code: string
  redirect_uri?: string
}
