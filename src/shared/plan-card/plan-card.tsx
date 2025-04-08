import type { BillingPeriod, ExtendedPlanCard } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/ui/card'
import { useMemo } from 'react'
import { FeatureList } from './feature-list'
import { PlanCardFooter } from './plan-card-footer'
import { PlanCardHeader } from './plan-card-header'
import { TeamSizeInfo } from './team-size-info'

export const PlanCard = ({
  plan,
  billingPeriod,
  onSelect
}: {
  plan: ExtendedPlanCard
  billingPeriod: BillingPeriod
  onSelect: () => void
}) => {
  const {
    title,
    description,
    pricing,
    buttonText,
    popular,
    features,
    teamSize
  } = plan

  const isTeamPlan = useMemo(() => title === 'Team Plan', [title])

  return (
    <Card
      className={cn(
        'flex flex-col shadow-sm hover:shadow transition-shadow duration-200',
        popular && 'border-primary shadow-md hover:shadow-lg'
      )}
    >
      <PlanCardHeader
        title={title}
        description={description}
        pricing={pricing}
        billingPeriod={billingPeriod}
        popular={popular && !isTeamPlan}
      />

      <CardContent>
        <TeamSizeInfo
          teamSize={teamSize}
          billingPeriod={billingPeriod}
          isTeamPlan={isTeamPlan}
        />
        <FeatureList features={features} />
      </CardContent>

      <PlanCardFooter
        buttonText={buttonText}
        popular={popular}
        onSelect={onSelect}
      />
    </Card>
  )
}
