import { PLAN_CARD } from '@/lib/constants'
import type { BillingPeriod, PlanId } from '@/lib/types'
import { getPlanIdFromTitle } from '@/lib/utils'
import { PlanCard } from '@/shared/plan-card/plan-card'
import { useMemo } from 'react'

export const PlanGrid = ({
  billingPeriod,
  onSelectPlan
}: {
  billingPeriod: BillingPeriod
  onSelectPlan: (planId: PlanId) => void
}) => {
  const handlePlanSelect = useMemo(() => {
    return (planTitle: string) => {
      const planId = getPlanIdFromTitle(planTitle, billingPeriod)
      if (planId) {
        onSelectPlan(planId)
      }
    }
  }, [billingPeriod, onSelectPlan])

  return (
    <div className='grid gap-8 md:grid-cols-3 items-start'>
      {PLAN_CARD.map(plan => (
        <PlanCard
          key={plan.title}
          plan={plan}
          billingPeriod={billingPeriod}
          onSelect={() => handlePlanSelect(plan.title)}
        />
      ))}
    </div>
  )
}
