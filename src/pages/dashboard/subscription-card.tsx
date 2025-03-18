import { useSubscription } from '@/lib/hooks'
import { formatDate } from '@/lib/utils'
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
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const SubscriptionCard = () => {
  const { data: subscription } = useSubscription()
  const navigate = useNavigate()

  const formattedStartDate = useMemo(() => {
    return formatDate(subscription?.created_at)
  }, [subscription?.created_at])

  const formattedEndDate = useMemo(() => {
    return formatDate(subscription?.end_date)
  }, [subscription?.end_date])

  const isFreePlan = useMemo(() => {
    return subscription?.plan?.name === 'Free Plan'
  }, [subscription?.plan?.name])

  const hasBillingPortalUrl = useMemo(() => {
    return Boolean(subscription?.billing_portal_url)
  }, [subscription?.billing_portal_url])

  const handleManageBilling = useCallback(() => {
    if (subscription?.billing_portal_url) {
      window.open(subscription.billing_portal_url, '_blank')
    }
  }, [subscription?.billing_portal_url])

  const handleUpgradeClick = useCallback(() => {
    navigate('/dashboard/upgrade-subscription')
  }, [navigate])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Your current plan and usage</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex justify-between'>
          <span className='font-medium'>Plan:</span>
          <Badge variant={isFreePlan ? 'secondary' : 'default'}>
            <span>{subscription?.plan?.name || 'Free Plan'}</span>
          </Badge>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium'>Start Date:</span>
          <span>{formattedStartDate}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium'>End Date:</span>
          <span>{formattedEndDate}</span>
        </div>
      </CardContent>
      <CardFooter>
        {isFreePlan ? (
          <Button
            className='w-full'
            onClick={handleUpgradeClick}
          >
            Upgrade Subscription
          </Button>
        ) : hasBillingPortalUrl ? (
          <Button
            className='w-full'
            variant='outline'
            onClick={handleManageBilling}
          >
            Manage Billing
          </Button>
        ) : (
          <Badge
            variant='outline'
            className='w-full py-2 flex justify-center'
          >
            Infinite subscription
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}
