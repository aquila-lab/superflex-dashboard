import { PLAN_CARD } from '@/lib/constants'
import { useUser } from '@/lib/hooks'
import type { BillingPeriod, PlanId } from '@/lib/types'
import { cn, getPlanIdFromTitle, shouldShowFreePlan } from '@/lib/utils'
import { PlanCard } from '@/shared/plan-card/plan-card'
import { useMemo } from 'react'

export const PlanGrid = ({
  billingPeriod,
  onSelectPlan
}: {
  billingPeriod: BillingPeriod
  onSelectPlan: (planId: PlanId) => void
}) => {
  const { data: user } = useUser()

  const handlePlanSelect = useMemo(() => {
    return (planTitle: string) => {
      const planId = getPlanIdFromTitle(planTitle, billingPeriod)
      if (planId) {
        onSelectPlan(planId)
      }
    }
  }, [billingPeriod, onSelectPlan])

  const filteredPlans = useMemo(() => {
    const showFreePlan = shouldShowFreePlan(user?.id)
    return PLAN_CARD.filter(plan => showFreePlan || plan.title !== 'Free Plan')
  }, [user?.id, user])

  const gridClassName = useMemo(() => {
    return cn(
      'grid gap-8 items-start',
      filteredPlans.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
    )
  }, [filteredPlans.length])

  return (
    <div className={gridClassName}>
      {filteredPlans.map(plan => (
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
