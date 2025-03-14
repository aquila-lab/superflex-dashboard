import { API_BASE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { AppHeader } from '@/shared/app-header'
import { OnboardingHeader } from '@/shared/onboarding-header'
import { useAuthStore } from '@/store/auth-store'
import { type UserSubscription, useUserStore } from '@/store/user-store'
import { Button } from '@/ui/button'
import confetti from 'canvas-confetti'
import { CreditCard, ExternalLink, FileCode } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

type SuccessType = 'figma' | 'payment' | 'extension-login'

type SuccessConfig = {
  pageTitle: string
  pageDescription: string
  cardTitle: string
  cardDescription: string
  toastMessage: string
  ctaText: string
  icon: React.ReactNode
  onboardingStep?: number
}

const useSuccessConfig = () => {
  const [searchParams] = useSearchParams()
  const successType = searchParams.get('type') as SuccessType | null
  const { getAuthHeader } = useAuthStore()
  const updateUser = useUserStore(state => state.updateUser)

  const successConfigs = useMemo<Record<SuccessType, SuccessConfig>>(() => {
    return {
      figma: {
        pageTitle: 'Figma Connection Success',
        pageDescription: 'Your Figma account is now connected to Superflex',
        cardTitle: 'Figma Connected Successfully!',
        cardDescription:
          'Your Figma account has been connected to Superflex. You can now import your designs directly into your projects.',
        toastMessage: 'Figma account successfully connected!',
        ctaText: 'Continue',
        icon: <FileCode className='h-10 w-10 text-green-500' />
      },
      payment: {
        pageTitle: 'Payment Confirmation',
        pageDescription: 'Your payment has been processed successfully',
        cardTitle: 'Payment Successful!',
        cardDescription:
          'Thank you for your payment. Your subscription has been activated and you now have access to all premium features.',
        toastMessage: 'Payment processed successfully!',
        ctaText: 'Continue',
        icon: <CreditCard className='h-10 w-10 text-green-600' />,
        onboardingStep: 2
      },
      'extension-login': {
        pageTitle: 'Extension Login Complete',
        pageDescription: 'You are now logged in to the Superflex extension',
        cardTitle: 'Extension Login Successful!',
        cardDescription:
          'You have successfully logged in to the Superflex extension. You can now use all the features of the extension.',
        toastMessage: 'Extension login successful!',
        ctaText: 'Continue',
        icon: <ExternalLink className='h-10 w-10 text-green-500' />
      }
    }
  }, [])

  useEffect(() => {
    const handleExtensionLogin = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/billing/subscription`, {
          headers: {
            ...getAuthHeader()
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch subscription')
        }

        const subscriptionData: UserSubscription = await response.json()

        if (subscriptionData.plan?.name !== 'Free') {
          try {
            const response = await fetch(`${API_BASE_URL}/user`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
              },
              body: JSON.stringify({
                onboarding_step: 1
              })
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(
                errorData.message || 'Failed to update user information'
              )
            }

            updateUser({ onboarding_step: 1 })
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : 'An unexpected error occurred'
            )
          }
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        )
      }
    }

    if (successType === 'extension-login') {
      const decodedState = sessionStorage.getItem('decodedState')

      if (decodedState) {
        window.location.href = decodedState
        sessionStorage.clear()
      }
    }

    if (successType === 'payment') {
      handleExtensionLogin()
    }
  }, [successType, getAuthHeader, updateUser])

  const config = useMemo(() => {
    if (!successType || !successConfigs[successType]) {
      return successConfigs.payment
    }
    return successConfigs[successType]
  }, [successType, successConfigs])

  return config
}

const SuccessIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        'rounded-full bg-green-50 p-6 transition-all duration-700',
        'animate-in zoom-in-50 fade-in-0',
        'relative after:absolute after:inset-0 after:rounded-full',
        'after:border-4 after:border-green-100 after:animate-pulse'
      )}
    >
      {children}
    </div>
  )
}

const SuccessContent = () => {
  const config = useSuccessConfig()

  return (
    <div className='max-w-md w-full mx-auto p-4'>
      <div className='flex flex-col items-center justify-center text-center space-y-8'>
        <SuccessIcon>{config.icon}</SuccessIcon>

        <div className='space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {config.cardTitle}
          </h1>
          <p className='text-muted-foreground'>{config.cardDescription}</p>
        </div>

        <div className='flex flex-col w-full gap-3'>
          <Button asChild>
            <Link to='/'>{config.ctaText}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export const SuccessPage = memo(() => {
  const config = useSuccessConfig()
  const hasTriggeredNotification = useRef(false)
  const particleColors = useMemo(() => ['#10b981', '#3b82f6', '#8b5cf6'], [])

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: particleColors
    })
  }, [particleColors])

  useEffect(() => {
    if (!hasTriggeredNotification.current) {
      toast.success(config.toastMessage)
      triggerConfetti()
      hasTriggeredNotification.current = true
    }
  }, [config.toastMessage, triggerConfetti])

  return (
    <div className='flex min-h-screen flex-col'>
      {config.onboardingStep && (
        <OnboardingHeader currentStep={config.onboardingStep} />
      )}
      {!config.onboardingStep && <AppHeader />}
      <main className='flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full'>
          <div className='bg-card rounded-xl p-6'>
            <SuccessContent />
          </div>
        </div>
      </main>
    </div>
  )
})
