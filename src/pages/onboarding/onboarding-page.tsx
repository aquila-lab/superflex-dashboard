import { DashboardHeader } from '@/shared/dashboard-header/dashboard-header'
import { Footer } from '@/shared/footer/footer'
import { OnboardingForm } from './onboarding-form'
import { OnboardingProvider } from './onboarding-provider'
import {
  useOnboardingStep,
  useUpdateOnboardingStep,
  useUser,
  useTrackOnboardingDropoff
} from '@/lib/hooks'
import { Button } from '@/ui/button'
import { RotateCcw, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { trackConversion } from '@/lib/utils'

export const OnboardingPage = () => {
  const { isComplete } = useOnboardingStep()
  const updateOnboardingStep = useUpdateOnboardingStep()
  const { data: user } = useUser()
  const navigate = useNavigate()

  useTrackOnboardingDropoff()

  const handleRestartOnboarding = useCallback(() => {
    trackConversion.onboardingReset(user?.onboarding_step ?? null)

    updateOnboardingStep.mutate(2, {
      onSuccess: () => {
        toast.success('Onboarding restarted successfully!')
      }
    })
  }, [updateOnboardingStep, user?.onboarding_step])

  const handleGoToDashboard = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  return (
    <div className='flex flex-col min-h-svh'>
      <DashboardHeader />
      <div className='flex flex-col items-center justify-start p-4 max-w-4xl mx-auto w-full gap-8 pt-8 pb-12'>
        <div className='text-center'>
          {isComplete ? (
            <>
              <h1 className='text-3xl font-bold mb-2'>Onboarding Complete</h1>
              <p className='text-muted-foreground max-w-2xl mb-6'>
                You've successfully completed all the onboarding steps. You can
                now access all features of Superflex.
              </p>
              <div className='flex items-center justify-center gap-4'>
                <Button
                  onClick={handleRestartOnboarding}
                  variant='outline'
                  className='gap-2'
                >
                  <RotateCcw className='h-4 w-4' />
                  Restart Onboarding
                </Button>
                <Button
                  onClick={handleGoToDashboard}
                  className='gap-2'
                >
                  <Home className='h-4 w-4' />
                  Go to Dashboard
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className='text-3xl font-bold mb-2'>Setup Superflex</h1>
              <p className='text-muted-foreground max-w-2xl'>
                Follow these steps to get started with Superflex and supercharge
                your development workflow.
              </p>
            </>
          )}
        </div>

        <OnboardingProvider>
          <OnboardingForm />
        </OnboardingProvider>
      </div>
      <Footer />
    </div>
  )
}
