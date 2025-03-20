import type { BillingPeriod } from '@/lib/types'
import { BillingToggle } from '../../shared/plan-card/billing-toggle'

export const SelectPlanHeader = ({
  billingPeriod,
  onChangeBillingPeriod
}: {
  billingPeriod: BillingPeriod
  onChangeBillingPeriod: (period: BillingPeriod) => void
}) => {
  return (
    <div className='mb-12 text-center'>
      <h1 className='text-3xl font-bold'>Choose your plan</h1>
      <p className='text-muted-foreground mt-2'>
        Select the plan that best fits your needs
      </p>
      <div className='mt-8'>
        <BillingToggle
          billingPeriod={billingPeriod}
          onChangeBillingPeriod={onChangeBillingPeriod}
        />
      </div>
    </div>
  )
}
