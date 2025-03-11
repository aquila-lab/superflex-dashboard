import { cn } from '@/lib/utils'
import { type PlanCard as PlanCardType, planCards } from '@/lib/utils'
import { OnboardingHeader } from '@/shared/onboarding-header'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/ui/card'
import { Separator } from '@/ui/separator'
import { CheckIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { usePlanSelection } from './use-plan-selection'

type BillingPeriod = 'monthly' | 'annual'

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

type ExtendedPlanCard = PlanCardType & {
  teamSize?: {
    monthly: {
      users: string
      price: string
    }
    annual: {
      users: string
      price: string
    }
  }
}

const PlanCard = ({
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
