import { type BillingPeriod, cn, planCards } from '@/lib/utils'
import { OnboardingHeader } from '@/shared/onboarding-header'
import { PlanCard } from '@/shared/plan-card'
import { useMemo, useState } from 'react'
import { usePlanSelection } from './use-plan-selection'

export const SelectPlanPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('annual')
  const { handlePlanSelection } = usePlanSelection()

  const planIdMapping = useMemo(() => {
    return {
      'Free Plan': 'free' as const,
      'Individual Pro Plan':
        billingPeriod === 'monthly'
          ? ('individual_pro_monthly' as const)
          : ('individual_pro_yearly' as const),
      'Team Plan':
        billingPeriod === 'monthly'
          ? ('team_monthly' as const)
          : ('team_yearly' as const)
    }
  }, [billingPeriod])

  return (
    <div className='flex flex-col min-h-svh'>
      <OnboardingHeader currentStep='choose-plan' />
      <div className='flex flex-1 items-center justify-center pb-12'>
        <div className='w-full max-w-6xl px-4'>
          <div className='mb-12 text-center'>
            <h1 className='text-3xl font-bold'>Choose your plan</h1>
            <p className='text-muted-foreground mt-2'>
              Select the plan that best fits your needs
            </p>

            <div className='mt-8 inline-flex items-center rounded-full border p-1 bg-muted/30'>
              <div
                className={cn(
                  'px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors duration-200',
                  billingPeriod === 'monthly'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </div>
              <div
                className={cn(
                  'px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors duration-200',
                  billingPeriod === 'annual'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => setBillingPeriod('annual')}
              >
                Annual{' '}
                <span
                  className={cn(
                    'text-primary font-medium',
                    billingPeriod === 'annual' && 'text-primary-foreground'
                  )}
                >
                  (Save 33%)
                </span>
              </div>
            </div>
          </div>

          <div className='grid gap-8 md:grid-cols-3 items-start'>
            {planCards.map(plan => (
              <PlanCard
                key={plan.title}
                plan={plan}
                billingPeriod={billingPeriod}
                onSelect={() => {
                  const planId =
                    planIdMapping[plan.title as keyof typeof planIdMapping]
                  if (planId) {
                    handlePlanSelection(planId)
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
