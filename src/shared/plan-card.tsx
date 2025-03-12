import { cn, type BillingPeriod } from '@/lib/utils'
import type { ExtendedPlanCard } from '@/lib/utils'
import { Button } from '@/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/ui/card'
import { CheckIcon } from 'lucide-react'
import { Separator } from '@/ui/separator'
import { Badge } from '@/ui/badge'

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

  const currentPricing = pricing[billingPeriod]
  const isTeamPlan = title === 'Team Plan'

  return (
    <Card
      className={cn(
        'flex flex-col shadow-sm hover:shadow transition-shadow duration-200',
        popular && 'border-primary shadow-md hover:shadow-lg'
      )}
    >
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

      <CardContent>
        {isTeamPlan && teamSize && (
          <div>
            <div className='flex justify-between items-center'>
              <span className='text-sm'>{teamSize[billingPeriod].users}</span>
              <span className='text-sm font-light text-muted-foreground'>
                {teamSize[billingPeriod].price}
              </span>
            </div>
            <Separator className='my-6' />
          </div>
        )}

        <ul className='space-y-3'>
          {features.map(feature => (
            <li
              key={feature.text}
              className='flex items-start gap-3'
            >
              <CheckIcon className='text-primary size-4 mt-0.5 flex-shrink-0' />
              <span className='text-sm'>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className='flex flex-col gap-4'>
        <Separator />

        <Button
          variant={popular ? 'default' : 'outline'}
          className='w-full py-5'
          size='lg'
          onClick={onSelect}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
