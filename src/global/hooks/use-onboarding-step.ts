import { onboardingStepMapping } from '@/lib/utils'
import { useUserStore } from '@/store/user-store'
import { useCallback, useMemo } from 'react'

export const useOnboardingStep = () => {
  const { user } = useUserStore()

  const currentStep = useMemo(() => {
    return user?.onboarding_step ?? 0
  }, [user?.onboarding_step])

  const currentStepName = useMemo(() => {
    return onboardingStepMapping.getStepName(currentStep)
  }, [currentStep])

  const isStepCompleted = useCallback(
    (stepNumber: number) => {
      if (!user || user.onboarding_step === null) {
        return false
      }

      if (user.onboarding_step === null) {
        return true
      }

      return user.onboarding_step > stepNumber
    },
    [user, user?.onboarding_step]
  )

  const isComplete = useMemo(() => {
    return currentStepName === 'complete'
  }, [currentStepName])

  return {
    currentStep,
    currentStepName,
    isStepCompleted,
    isComplete
  }
}
