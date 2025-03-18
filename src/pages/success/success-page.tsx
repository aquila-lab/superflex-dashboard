import {
  useAuth,
  useOnboardingStep,
  useSubscription,
  useUpdateOnboardingStep
} from '@/lib/hooks'
import type { SuccessConfig, SuccessType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { AppHeader } from '@/shared/app-header'
import { OnboardingHeader } from '@/shared/onboarding-header'
import { useExtensionLauncher } from '@/shared/extension-launcher'
import { Button } from '@/ui/button'
import confetti from 'canvas-confetti'
import { CreditCard, ExternalLink, FileCode } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const globalExecutionState = {
  extensionLoginProcessed: false,
  paymentSuccessProcessed: false,
  figmaSuccessProcessed: false
}

const useHandleExtensionLogin = () => {
  const [searchParams] = useSearchParams()
  const { token } = useAuth()
  const successType = searchParams.get('type') as SuccessType | null

  if (
    successType === 'extension-login' &&
    !globalExecutionState.extensionLoginProcessed
  ) {
    const decodedState = sessionStorage.getItem('decodedState')

    if (decodedState) {
      globalExecutionState.extensionLoginProcessed = true

      queueMicrotask(() => {
        window.location.href = `${decodedState}&access_token=${token}`
        sessionStorage.clear()
      })
    }
  }
}

const useHandlePaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const successType = searchParams.get('type') as SuccessType | null
  const { data: subscription } = useSubscription()
  const updateOnboardingStep = useUpdateOnboardingStep()
  const onboardingStep = useOnboardingStep()
  const { openVSCodeSuperflex, openCursorSuperflex } = useExtensionLauncher()

  useEffect(() => {
    if (
      successType === 'payment' &&
      subscription?.plan?.name !== 'Free' &&
      !globalExecutionState.paymentSuccessProcessed &&
      subscription !== undefined
    ) {
      globalExecutionState.paymentSuccessProcessed = true

      if (onboardingStep.currentStep === 0) {
        updateOnboardingStep.mutate(1, {
          onError: error => {
            toast.error(error ? error.message : 'An unexpected error occurred')
          }
        })
      }

      // Check if redirect source exists in localStorage
      const redirectSource = localStorage.getItem('redirectSource')
      if (redirectSource) {
        // Open the appropriate IDE based on the source
        if (redirectSource === 'vscode') {
          openVSCodeSuperflex()
        } else if (redirectSource === 'cursor') {
          openCursorSuperflex()
        }
        // Clear the localStorage after use
        localStorage.removeItem('redirectSource')
      }
    }
  }, [
    successType,
    subscription,
    updateOnboardingStep,
    onboardingStep.currentStep,
    openVSCodeSuperflex,
    openCursorSuperflex
  ])
}

const useHandleFigmaSuccess = () => {
  const [searchParams] = useSearchParams()
  const successType = searchParams.get('type') as SuccessType | null

  if (successType === 'figma' && !globalExecutionState.figmaSuccessProcessed) {
    globalExecutionState.figmaSuccessProcessed = true

    const decodedState = sessionStorage.getItem('decodedState')

    if (decodedState) {
      globalExecutionState.extensionLoginProcessed = true

      queueMicrotask(() => {
        window.location.href = decodedState
        sessionStorage.clear()
      })
    }
  }
}

const useSuccessConfig = () => {
  const [searchParams] = useSearchParams()
  const successType = searchParams.get('type') as SuccessType | null

  useHandleExtensionLogin()
  useHandlePaymentSuccess()
  useHandleFigmaSuccess()

  const successConfigs = useMemo<Record<SuccessType, SuccessConfig>>(() => {
    return {
      figma: {
        pageTitle: 'Figma Connection Success',
        pageDescription: 'Your Figma account is now connected to Superflex',
        cardTitle: 'Figma Connected Successfully!',
        cardDescription:
          'Your Figma account has been connected to Superflex. You can now close this tab and return to your IDE to continue with the next steps.',
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
        icon: <CreditCard className='h-10 w-10 text-green-600' />
      },
      'extension-login': {
        pageTitle: 'Extension Login Complete',
        pageDescription: 'You are now logged in to the Superflex extension',
        cardTitle: 'Extension Login Successful!',
        cardDescription:
          'You have successfully logged in to the Superflex extension. You can now close this tab and return to your IDE to continue with the next steps.',
        toastMessage: 'Extension login successful!',
        ctaText: 'Continue',
        icon: <ExternalLink className='h-10 w-10 text-green-500' />
      }
    }
  }, [])

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
  const onboardingStep = useOnboardingStep()

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
      {onboardingStep.currentStep < 2 && <OnboardingHeader currentStep={1} />}
      {onboardingStep.currentStep >= 2 && <AppHeader />}
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
