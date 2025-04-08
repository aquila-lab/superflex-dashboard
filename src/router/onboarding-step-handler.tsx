import { useOnboardingStep, useUpdateOnboardingStep } from '@/lib/hooks'
import { useEffect } from 'react'

export const OnboardingStepHandler = () => {
  const { mutateAsync: updateOnboardingStep } = useUpdateOnboardingStep()
  const { currentStep } = useOnboardingStep()

  const registrationSource = localStorage.getItem('registrationSource')
  const loginSource = localStorage.getItem('loginSource')
  const redirected = sessionStorage.getItem('redirected')

  useEffect(() => {
    if (
      registrationSource === 'cursor' ||
      loginSource === 'cursor' ||
      registrationSource === 'vscode' ||
      loginSource === 'vscode' ||
      redirected === 'true'
    ) {
      if (currentStep < 4) {
        updateOnboardingStep(4)
      }
    }
  }, [
    registrationSource,
    loginSource,
    updateOnboardingStep,
    currentStep,
    redirected
  ])

  return null
}
