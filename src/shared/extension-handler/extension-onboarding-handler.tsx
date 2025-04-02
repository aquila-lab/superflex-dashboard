import { useExtensionOnboardingCompletion, useUser } from '@/lib/hooks'
import { useEffect } from 'react'

export const ExtensionOnboardingHandler = () => {
  const { data: user, isLoading } = useUser()
  const { completeOnboardingForExtensionUser } =
    useExtensionOnboardingCompletion()

  useEffect(() => {
    const handleExtensionUser = async () => {
      if (isLoading || !user) {
        return
      }

      if (user.onboarding_step !== null && user.onboarding_step >= 2) {
        await completeOnboardingForExtensionUser()
      }
    }

    handleExtensionUser()
  }, [user, isLoading, completeOnboardingForExtensionUser])

  return null
}
