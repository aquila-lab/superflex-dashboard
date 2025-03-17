import { IS_PROD, POSTHOG_API_KEY } from './lib/constants'
import posthog from 'posthog-js'

export const PostHogProvider = ({
  children
}: { children: React.ReactNode }) => {
  if (IS_PROD) {
    posthog.init(POSTHOG_API_KEY, { api_host: 'https://app.posthog.com' })
  }

  return children
}
