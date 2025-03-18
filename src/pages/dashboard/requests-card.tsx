import { useSubscription } from '@/lib/hooks'
import { getRequestPercentage, isUnlimitedPlan } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/ui/card'
import { Progress } from '@/ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/ui/tooltip'
import { useMemo } from 'react'

export const RequestsCard = () => {
  const { data: subscription } = useSubscription()

  const isBasicUnlimited = useMemo(() => {
    return isUnlimitedPlan(subscription?.plan?.basic_request_limit || null)
  }, [subscription?.plan?.basic_request_limit])

  const isPremiumUnlimited = useMemo(() => {
    return isUnlimitedPlan(subscription?.plan?.premium_request_limit || null)
  }, [subscription?.plan?.premium_request_limit])

  const basicRequestsUsed = useMemo(() => {
    return subscription?.basic_requests_used || 0
  }, [subscription?.basic_requests_used])

  const premiumRequestsUsed = useMemo(() => {
    return subscription?.premium_requests_used || 0
  }, [subscription?.premium_requests_used])

  const basicRequestsPercentage = useMemo(() => {
    return getRequestPercentage(
      basicRequestsUsed,
      subscription?.plan?.basic_request_limit || null
    )
  }, [basicRequestsUsed, subscription?.plan?.basic_request_limit])

  const premiumRequestsPercentage = useMemo(() => {
    return getRequestPercentage(
      premiumRequestsUsed,
      subscription?.plan?.premium_request_limit || null
    )
  }, [premiumRequestsUsed, subscription?.plan?.premium_request_limit])

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Usage</CardTitle>
        <CardDescription>Monitor your API request usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <RequestProgressBar
            title='Basic Requests'
            isUnlimited={isBasicUnlimited}
            usedRequests={basicRequestsUsed}
            totalRequests={subscription?.plan?.basic_request_limit || 0}
            percentage={basicRequestsPercentage}
          />

          <RequestProgressBar
            title='Premium Requests'
            isUnlimited={isPremiumUnlimited}
            usedRequests={premiumRequestsUsed}
            totalRequests={subscription?.plan?.premium_request_limit || 0}
            percentage={premiumRequestsPercentage}
          />
        </div>
      </CardContent>
    </Card>
  )
}

type RequestProgressBarProps = {
  title: string
  isUnlimited: boolean
  usedRequests: number
  totalRequests: number
  percentage: number
}

const RequestProgressBar = ({
  title,
  isUnlimited,
  usedRequests,
  totalRequests,
  percentage
}: RequestProgressBarProps) => {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-baseline text-sm'>
        <span>{title}</span>
        {isUnlimited ? (
          <span className='text-muted-foreground text-xs leading-none'>
            Unlimited requests available
          </span>
        ) : (
          <span>
            {usedRequests} / {totalRequests}
          </span>
        )}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Progress value={percentage} />
            </div>
          </TooltipTrigger>
          <TooltipContent>{usedRequests} requests used</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
