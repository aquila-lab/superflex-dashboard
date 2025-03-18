import { planCards } from '@/lib/constants'
import { withErrorHandling } from '@/lib/error-handling'
import {
  usePlanSelection,
  useSubscription,
  useUpdateUser,
  useUser
} from '@/lib/hooks'
import type { BillingPeriod } from '@/lib/types'
import { cn, formatDate } from '@/lib/utils'
import { AppFooter } from '@/shared/app-footer'
import { AppHeader } from '@/shared/app-header'
import { PlanCard } from '@/shared/plan-card'
import { SaveRedirectSource } from '@/shared/save-redirect-source'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/ui/drawer'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Progress } from '@/ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/ui/tooltip'
import { Pen } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const RequestsCard = () => {
  const { data: subscription } = useSubscription()

  const isBasicUnlimited = useMemo(() => {
    return (subscription?.plan?.basic_request_limit || 0) > 9999
  }, [subscription?.plan?.basic_request_limit])

  const isPremiumUnlimited = useMemo(() => {
    return (subscription?.plan?.premium_request_limit || 0) > 9999
  }, [subscription?.plan?.premium_request_limit])

  const basicRequestsUsed = useMemo(() => {
    return subscription?.basic_requests_used || 0
  }, [subscription?.basic_requests_used])

  const premiumRequestsUsed = useMemo(() => {
    return subscription?.premium_requests_used || 0
  }, [subscription?.premium_requests_used])

  const basicRequestsPercentage = useMemo(() => {
    if (isBasicUnlimited) {
      return 0
    }
    const limit = subscription?.plan?.basic_request_limit || 0
    return (basicRequestsUsed / limit) * 100
  }, [
    basicRequestsUsed,
    isBasicUnlimited,
    subscription?.plan?.basic_request_limit
  ])

  const premiumRequestsPercentage = useMemo(() => {
    if (isPremiumUnlimited) {
      return 0
    }
    const limit = subscription?.plan?.premium_request_limit || 0
    return (premiumRequestsUsed / limit) * 100
  }, [
    premiumRequestsUsed,
    isPremiumUnlimited,
    subscription?.plan?.premium_request_limit
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Usage</CardTitle>
        <CardDescription>Monitor your API request usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <div className='flex justify-between items-baseline text-sm'>
              <span>Basic Requests</span>
              {isBasicUnlimited ? (
                <span className='text-muted-foreground text-xs leading-none'>
                  Unlimited requests available
                </span>
              ) : (
                <span>
                  {basicRequestsUsed} /{' '}
                  {subscription?.plan?.basic_request_limit || 0}
                </span>
              )}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Progress value={basicRequestsPercentage} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {basicRequestsUsed} requests used
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-baseline text-sm'>
              <span>Premium Requests</span>
              {isPremiumUnlimited ? (
                <span className='text-muted-foreground text-xs leading-none'>
                  Unlimited requests available
                </span>
              ) : (
                <span>
                  {premiumRequestsUsed} /{' '}
                  {subscription?.plan?.premium_request_limit || 0}
                </span>
              )}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Progress value={premiumRequestsPercentage} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {premiumRequestsUsed} requests used
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const UserInfoCard = () => {
  const { data: user } = useUser()
  const [username, setUsername] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const updateUser = useUpdateUser()

  const handleSubmit = useCallback(async () => {
    if (!username.trim()) {
      toast.error('Username cannot be empty')
      return
    }

    const updateUsername = withErrorHandling(
      async () => {
        const result = await updateUser.mutateAsync({ username })
        return result
      },
      {
        successMessage: 'Username updated successfully',
        errorMessage: 'Failed to update username. Please try again.',
        onSuccess: () => {
          setIsDialogOpen(false)
        }
      }
    )

    await updateUsername()
  }, [username, updateUser])

  const usernameInitials = useMemo(() => {
    if (!user?.username) {
      return '?'
    }
    return user.username.substring(0, 2).toUpperCase()
  }, [user?.username])

  const isOnboardingComplete = useMemo(() => {
    if (user?.onboarding_step === null || user?.onboarding_step === 5) {
      return true
    }
    return false
  }, [user?.onboarding_step])

  return (
    <Card>
      <CardHeader className='flex flex-row items-center gap-4'>
        <Avatar className='h-14 w-14'>
          <AvatarImage
            src={user?.picture || undefined}
            alt={user?.username || 'User'}
          />
          <AvatarFallback>{usernameInitials}</AvatarFallback>
        </Avatar>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <CardTitle>{user?.username || 'User'}</CardTitle>
            <Dialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            >
              <DialogTrigger asChild>
                <button
                  type='button'
                  className='text-muted-foreground hover:text-primary transition-colors'
                  aria-label='Edit username'
                >
                  <Pen className='size-3 cursor-pointer' />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Username</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='username'>New Username</Label>
                    <Input
                      id='username'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder={user?.username || 'Username'}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleSubmit}
                    disabled={updateUser.isPending || !username.trim()}
                  >
                    {updateUser.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>{user?.email || ''}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Onboarding Status</span>
              <Badge variant={isOnboardingComplete ? 'default' : 'secondary'}>
                {isOnboardingComplete ? 'Complete' : 'In Progress'}
              </Badge>
            </div>
            {!isOnboardingComplete && (
              <div className='text-sm text-muted-foreground'>
                Complete the onboarding process to access all features
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const SubscriptionCard = () => {
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

const PlanSelectionDrawer = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('annual')
  const { handlePlanSelection } = usePlanSelection()
  const navigate = useNavigate()
  const location = useLocation()

  const isOpen = useMemo(() => {
    return location.pathname === '/dashboard/upgrade-subscription'
  }, [location.pathname])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        navigate('/dashboard')
      }
    },
    [navigate]
  )

  const planIdMapping = useMemo(() => {
    return {
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

            <div className='grid gap-8 md:grid-cols-2 items-start'>
              {planCards
                .filter(plan => plan.title !== 'Free Plan')
                .map(plan => (
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
      </DrawerContent>
    </Drawer>
  )
}

export const DashboardPage = () => {
  return (
    <div className='flex flex-col min-h-svh'>
      <SaveRedirectSource />
      <AppHeader />
      <div className='flex-1 p-6 container mx-auto max-w-6xl flex flex-col gap-8'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Account Settings</h1>
          <p className='text-muted-foreground max-w-2xl'>
            You can manage your account, billing, and team settings here.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 items-start'>
          <div className='flex flex-col gap-6'>
            <UserInfoCard />
            <RequestsCard />
          </div>
          <SubscriptionCard />
        </div>
      </div>
      <AppFooter />
      <PlanSelectionDrawer />
    </div>
  )
}
