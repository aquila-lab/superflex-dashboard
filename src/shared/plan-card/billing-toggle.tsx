import type { BillingPeriod } from '@/lib/types'
import { useCallback } from 'react'
import { BillingOption } from './billing-option'

export const BillingToggle = ({
  billingPeriod,
  onChangeBillingPeriod
}: {
  billingPeriod: BillingPeriod
  onChangeBillingPeriod: (period: BillingPeriod) => void
}) => {
  const handleChangePeriod = useCallback(
    (period: BillingPeriod) => {
      onChangeBillingPeriod(period)
    },
    [onChangeBillingPeriod]
  )

  return (
    <div className='inline-flex items-center rounded-full border p-1 bg-muted/30'>
      <BillingOption
        isActive={billingPeriod === 'monthly'}
        label='Monthly'
        period='monthly'
        onClick={handleChangePeriod}
      />
      <BillingOption
        isActive={billingPeriod === 'annual'}
        label='Annual'
        period='annual'
        onClick={handleChangePeriod}
        discount='(Save 33%)'
      />
    </div>
  )
}
