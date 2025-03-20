import {
  useAuth,
  useExtensionLauncher,
  useOnboardingStep,
  useSubscription,
  useUpdateOnboardingStep
} from '@/lib/hooks'
import type { SuccessConfig, SuccessType } from '@/lib/types'
import { CreditCard, ExternalLink, FileCode } from 'lucide-react'
import {
  type ReactNode,
  createContext,
  memo,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const SuccessContext = createContext<{
  config: SuccessConfig
  successType: SuccessType | null
} | null>(null)

export const SuccessProvider = memo(({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams()
  const { token } = useAuth()
  const { data: subscription } = useSubscription()
  const updateOnboardingStep = useUpdateOnboardingStep()
  const onboardingStep = useOnboardingStep()
  const { openVSCodeSuperflex, openCursorSuperflex } = useExtensionLauncher()
  const hasUpdatedOnboardingStep = useRef(false)

  const successType = searchParams.get('type') as SuccessType | null

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

  useEffect(() => {
    if (successType === 'extension-login') {
      const decodedState = sessionStorage.getItem('decodedState')

      if (decodedState) {
        queueMicrotask(() => {
          window.location.href = `${decodedState}&access_token=${token}`
          sessionStorage.clear()
        })
      }
    }
  }, [successType, token])

  useEffect(() => {
    if (
      successType === 'payment' &&
      subscription?.plan?.name !== 'Free' &&
      subscription !== undefined &&
      !hasUpdatedOnboardingStep.current
    ) {
      if (onboardingStep.currentStep === 0) {
        hasUpdatedOnboardingStep.current = true
        updateOnboardingStep.mutate(1, {
          onError: error => {
            hasUpdatedOnboardingStep.current = false
            toast.error(error ? error.message : 'An unexpected error occurred')
          }
        })
      }

      const redirectSource = localStorage.getItem('redirectSource')
      if (redirectSource) {
        if (redirectSource === 'vscode') {
          openVSCodeSuperflex()
        } else if (redirectSource === 'cursor') {
          openCursorSuperflex()
        }
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

  useEffect(() => {
    if (successType === 'figma') {
      const decodedState = sessionStorage.getItem('decodedState')

      if (decodedState) {
        queueMicrotask(() => {
          window.location.href = decodedState
          sessionStorage.clear()
        })
      }
    }
  }, [successType])

  const contextValue = useMemo(
    () => ({
      config,
      successType
    }),
    [config, successType]
  )

  return (
    <SuccessContext.Provider value={contextValue}>
      {children}
    </SuccessContext.Provider>
  )
})

export const useSuccessContext = () => {
  const context = useContext(SuccessContext)
  if (!context) {
    throw new Error('useSuccessContext must be used within a SuccessProvider')
  }
  return context
}
