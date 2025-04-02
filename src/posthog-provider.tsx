import posthog from 'posthog-js'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { IS_PROD, POSTHOG_API_KEY } from './lib/constants'
import { useUser } from './lib/hooks'

export const PostHogUserIdentifier = () => {
  const { data: user } = useUser()

  useEffect(() => {
    if (user) {
      const uniqueID = localStorage.getItem('uniqueID') || user.id

      posthog.identify(uniqueID, {
        userID: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        onboardingStep: user.onboarding_step,
        signupDate: user.created_at
      })
    }
  }, [user])

  return null
}

export const PostHogProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    posthog.init(POSTHOG_API_KEY, {
      api_host: 'https://app.posthog.com',
      capture_pageview: true,
      autocapture: IS_PROD,
      loaded: posthog => {
        if (!IS_PROD) {
          posthog.debug()
        }
      }
    })
  }, [])

  return children
}
