import posthog from 'posthog-js'
import type { ReactNode } from 'react'
import { IS_PROD, POSTHOG_API_KEY } from './lib/constants'

export const PostHogProvider = ({ children }: { children: ReactNode }) => {
  if (IS_PROD) {
    posthog.init(POSTHOG_API_KEY, { api_host: 'https://app.posthog.com' })
  }

  return children
}
