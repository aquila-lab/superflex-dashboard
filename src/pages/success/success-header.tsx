import { useOnboardingStep } from '@/lib/hooks'
import { DashboardHeader } from '@/shared/dashboard-header/dashboard-header'
import { OnboardingHeader } from '@/shared/onboarding-header/onboarding-header'
import { memo } from 'react'

export const SuccessHeader = memo(() => {
  const { currentStep } = useOnboardingStep()

  if (currentStep < 2) {
    return <OnboardingHeader currentStep={1} />
  }

  return <DashboardHeader />
})
