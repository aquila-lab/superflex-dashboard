import type { BillingPeriod, ExtendedPlanCard } from '@/lib/types'
import { Badge } from '@/ui/badge'
import { CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Separator } from '@/ui/separator'

export const PlanCardHeader = ({
  title,
  description,
  pricing,
  billingPeriod,
  popular
}: {
  title: string
  description: string
  pricing: ExtendedPlanCard['pricing']
  billingPeriod: BillingPeriod
  popular?: boolean
}) => {
  const currentPricing = pricing[billingPeriod]

  return (
    <CardHeader className='pb-0 space-y-5'>
      <div className='space-y-1.5'>
        {!popular && <CardTitle className='leading-10'>{title}</CardTitle>}
        {popular && (
          <div className='flex justify-between items-center'>
            <CardTitle className='leading-10'>{title}</CardTitle>
            <Badge
              className='w-fit inline-flex'
              variant='success'
            >
              Most popular
            </Badge>
          </div>
        )}
        <CardDescription className='font-light text-muted-foreground'>
          {description}
        </CardDescription>
      </div>

      <div className='flex items-baseline'>
        <span className='text-4xl font-bold leading-none tracking-tight'>
          {currentPricing.price}
        </span>
        {currentPricing.billingLabel && (
          <span className='text-muted-foreground font-light text-sm ml-1.5'>
            {currentPricing.billingLabel}
          </span>
        )}
      </div>

      <Separator />
    </CardHeader>
  )
}
