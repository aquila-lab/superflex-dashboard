import { usePlanSelection, useTrackOnboardingDropoff } from '@/lib/hooks'
import type { BillingPeriod } from '@/lib/types'
import { OnboardingHeader } from '@/shared/onboarding-header/onboarding-header'
import { useMemo, useState } from 'react'
import { PlanGrid } from './plan-grid'
import { SelectPlanHeader } from './select-plan-header'

export const SelectPlanPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('annual')
  const { handlePlanSelection } = usePlanSelection()

  useTrackOnboardingDropoff()

  const handleBillingPeriodChange = useMemo(() => {
    return (period: BillingPeriod) => {
      setBillingPeriod(period)
    }
  }, [])

  return (
    <div className='flex flex-col min-h-svh'>
      <OnboardingHeader currentStep={1} />
      <div className='flex flex-1 items-center justify-center pb-12'>
        <div className='w-full max-w-6xl px-4'>
          <SelectPlanHeader
            billingPeriod={billingPeriod}
            onChangeBillingPeriod={handleBillingPeriodChange}
          />
          <PlanGrid
            billingPeriod={billingPeriod}
            onSelectPlan={handlePlanSelection}
          />
        </div>
      </div>
    </div>
  )
}
