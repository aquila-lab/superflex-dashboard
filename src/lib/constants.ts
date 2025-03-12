export const IS_PROD = import.meta.env.VITE_NODE_ENV === 'production'
export const IS_DEV = import.meta.env.VITE_NODE_ENV === 'development'
export const API_BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
}/v1`
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''
export const GOOGLE_OAUTH_REDIRECT_URI =
  import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI ?? 'http://localhost:5173'
export const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN ?? ''
export const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY ?? ''
