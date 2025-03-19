import { PLAN_CARD } from '@/lib/constants'
import { usePlanSelection } from '@/lib/hooks'
import type { BillingPeriod } from '@/lib/types'
import { cn, getPlanIdFromTitle, trackConversion } from '@/lib/utils'
import { PlanCard } from '@/shared/plan-card/plan-card'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/ui/drawer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const PlanSelectionDrawer = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('annual')
  const { handlePlanSelection } = usePlanSelection()
  const navigate = useNavigate()
  const location = useLocation()

  const isOpen = useMemo(() => {
    return location.pathname === '/dashboard/upgrade-subscription'
  }, [location.pathname])

  useEffect(() => {
    if (isOpen) {
      trackConversion.pricingPageVisit()
    }
  }, [isOpen])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        navigate('/dashboard')
      }
    },
    [navigate]
  )

  const handlePlanSelect = useCallback(
    (title: string) => {
      const planId = getPlanIdFromTitle(title, billingPeriod)
      if (planId) {
        handlePlanSelection(planId)
      }
    },
    [billingPeriod, handlePlanSelection]
  )

  return (
    <Drawer
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <DrawerContent className='min-h-fit'>
        <div className='max-w-4xl mx-auto pb-12 pt-6'>
          <DrawerHeader>
            <DrawerTitle className='text-2xl text-center'>
              Upgrade Your Subscription
            </DrawerTitle>
            <DrawerDescription className='text-center'>
              Choose the plan that best fits your needs
            </DrawerDescription>
          </DrawerHeader>

          <div className='flex flex-col p-4 gap-6 px-4'>
            <BillingToggle
              billingPeriod={billingPeriod}
              setBillingPeriod={setBillingPeriod}
            />

            <div className='grid gap-8 md:grid-cols-2 items-start'>
              {PLAN_CARD.filter(plan => plan.title !== 'Free Plan').map(
                plan => (
                  <PlanCard
                    key={plan.title}
                    plan={plan}
                    billingPeriod={billingPeriod}
                    onSelect={() => handlePlanSelect(plan.title)}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

type BillingToggleProps = {
  billingPeriod: BillingPeriod
  setBillingPeriod: (period: BillingPeriod) => void
}

const BillingToggle = ({
  billingPeriod,
  setBillingPeriod
}: BillingToggleProps) => {
  return (
    <div className='mb-6 text-center'>
      <div className='inline-flex items-center rounded-full border p-1 bg-muted/30'>
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
  )
}
