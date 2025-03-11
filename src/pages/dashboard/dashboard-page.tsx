import { useUser } from '@/global/hooks/use-user'
import { formatDate } from '@/lib/utils'
import { AppFooter } from '@/shared/app-footer'
import { AppHeader } from '@/shared/app-header'
import { useUserStore } from '@/store/user-store'
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
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Progress } from '@/ui/progress'
import { Pen } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RequestsCard = () => {
  const { basicRequestsPercentage, premiumRequestsPercentage, subscription } =
    useUser()

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Usage</CardTitle>
        <CardDescription>Monitor your API request usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span>Basic Requests</span>
              <span>
                {subscription?.basic_requests_used || 0} /{' '}
                {subscription?.plan?.basic_request_limit || 0}
              </span>
            </div>
            <Progress value={basicRequestsPercentage} />
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span>Premium Requests</span>
              <span>
                {subscription?.premium_requests_used || 0} /{' '}
                {subscription?.plan?.premium_request_limit || 0}
              </span>
            </div>
            <Progress value={premiumRequestsPercentage} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const UserInfoCard = () => {
  const { user } = useUser()
  const [username, setUsername] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const updateUser = useUserStore(state => state.updateUser)
  const navigate = useNavigate()

  const handleSubmit = useCallback(() => {
    if (username.trim()) {
      updateUser({ username })
      setIsDialogOpen(false)
    }
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
            src={user?.picture || ''}
            alt={user?.username || ''}
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
                  <Pen className='h-3 w-3 cursor-pointer' />
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
                  <Button onClick={handleSubmit}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>{user?.email || ''}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium'>Onboarding:</span>
          <Badge variant={isOnboardingComplete ? 'secondary' : 'destructive'}>
            {isOnboardingComplete ? 'Complete' : 'In progress'}
          </Badge>
          {!isOnboardingComplete && (
            <span className='text-sm text-muted-foreground'>
              Complete setup to unlock all features
            </span>
          )}
        </div>
      </CardContent>
      {!isOnboardingComplete && (
        <CardFooter>
          <Button
            size='sm'
            onClick={() => navigate('/dashboard/onboarding')}
          >
            Continue Setup
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

const SubscriptionCard = () => {
  const { subscription } = useUser()

  const formattedStartDate = useMemo(() => {
    return formatDate(subscription?.created_at)
  }, [subscription?.created_at])

  const formattedEndDate = useMemo(() => {
    return formatDate(subscription?.end_date)
  }, [subscription?.end_date])

  const isFreePlan = useMemo(() => {
    if (subscription?.plan?.name === 'Free Plan') {
      return true
    }
    return false
  }, [subscription?.plan?.name])

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
        <Button
          className='w-full'
          variant={isFreePlan ? 'default' : 'outline'}
        >
          {isFreePlan ? 'Upgrade Subscription' : 'Manage Billing'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export const DashboardPage = () => {
  return (
    <div className='flex flex-col min-h-svh'>
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
    </div>
  )
}
