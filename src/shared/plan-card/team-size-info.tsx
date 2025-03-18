import type { BillingPeriod, ExtendedPlanCard } from '@/lib/types'
import { Separator } from '@/ui/separator'

export const TeamSizeInfo = ({
  teamSize,
  billingPeriod,
  isTeamPlan
}: {
  teamSize?: ExtendedPlanCard['teamSize']
  billingPeriod: BillingPeriod
  isTeamPlan: boolean
}) => {
  if (!isTeamPlan || !teamSize) {
    return null
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <span className='text-sm'>{teamSize[billingPeriod].users}</span>
        <span className='text-sm font-light text-muted-foreground'>
          {teamSize[billingPeriod].price}
        </span>
      </div>
      <Separator className='my-6' />
    </div>
  )
}
