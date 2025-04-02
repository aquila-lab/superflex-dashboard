import { useUpdateOnboardingStep } from '@/lib/hooks'
import { COMPLETED_ONBOARDING_STEP } from '@/lib/constants'
import { Button } from '@/ui/button'
import { FastForward } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { trackConversion } from '@/lib/utils'

export const SkipOnboarding = () => {
  const [isSkipping, setIsSkipping] = useState(false)
  const updateOnboardingStep = useUpdateOnboardingStep()
  const navigate = useNavigate()

  const handleSkipOnboarding = () => {
    if (isSkipping) {
      return
    }

    setIsSkipping(true)
    trackConversion.onboardingSkipped()

    try {
      updateOnboardingStep.mutate(COMPLETED_ONBOARDING_STEP, {
        onSuccess: () => {
          toast.success('Onboarding completed successfully!')

          const decodedState = sessionStorage.getItem('decodedState')
          const hasExtensionState = !!decodedState
          const redirected = JSON.parse(
            sessionStorage.getItem('redirected') || 'false'
          )
          const loggedIn = JSON.parse(
            sessionStorage.getItem('loggedIn') || 'false'
          )

          setTimeout(() => {
            try {
              if (hasExtensionState && !redirected && !loggedIn) {
                sessionStorage.setItem('redirected', 'true')
                navigate('/success?type=extension-login', { replace: true })
              } else {
                navigate('/dashboard', { replace: true })
              }
            } catch (error) {
              console.error('Navigation error:', error)
              if (hasExtensionState && !redirected && !loggedIn) {
                window.location.href = '/success?type=extension-login'
              } else {
                window.location.href = '/dashboard'
              }
            }
          }, 500)
        },
        onError: error => {
          toast.error(
            error ? (error as Error).message : 'Failed to skip onboarding'
          )
          setIsSkipping(false)
        },
        onSettled: () => {
          setIsSkipping(false)
        }
      })
    } catch (error) {
      console.error('Skip onboarding error:', error)
      toast.error('An unexpected error occurred')
      setIsSkipping(false)
    }
  }

  const buttonText = useMemo(
    () => (isSkipping ? 'Skipping...' : 'Skip Onboarding'),
    [isSkipping]
  )

  return (
    <Button
      variant='outline'
      size='sm'
      className='flex items-center gap-2'
      onClick={handleSkipOnboarding}
      disabled={isSkipping}
    >
      <FastForward className='h-4 w-4' />
      {buttonText}
    </Button>
  )
}
