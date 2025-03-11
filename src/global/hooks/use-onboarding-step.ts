import { onboardingStepMapping } from '@/lib/utils'
import type { OnboardingStep } from '@/store/model'
import { useUserStore } from '@/store/user-store'
import { useCallback, useMemo } from 'react'

export const useOnboardingStep = () => {
  const { user } = useUserStore()

  const currentStep = useMemo<OnboardingStep>(() => {
    return onboardingStepMapping.numberToStep(user?.onboarding_step ?? null)
  }, [user?.onboarding_step])

  const isStepCompleted = useCallback(
    (step: OnboardingStep) => {
      if (!user || user.onboarding_step === null) {
        return false
      }

      const stepNumber = onboardingStepMapping.stepToNumber(step)

      if (user.onboarding_step === null) {
        return true
      }

      return user.onboarding_step > stepNumber
    },
    [user, user?.onboarding_step]
  )

  const isComplete = useMemo(() => {
    return currentStep === 'complete'
  }, [currentStep])

  return {
    currentStep,
    isStepCompleted,
    isComplete
  }
}
