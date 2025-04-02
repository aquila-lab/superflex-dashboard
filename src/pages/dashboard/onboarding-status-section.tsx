import { Badge } from '@/ui/badge'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useUpdateOnboardingStep, useUser } from '@/lib/hooks'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { trackConversion } from '@/lib/utils'

export const OnboardingStatusSection = ({
  isComplete
}: {
  isComplete: boolean
}) => {
  const updateOnboardingStep = useUpdateOnboardingStep()
  const { data: user } = useUser()
  const navigate = useNavigate()

  const handleRestartOnboarding = useCallback(() => {
    trackConversion.onboardingReset(user?.onboarding_step ?? null)

    updateOnboardingStep.mutate(2, {
      onSuccess: () => {
        toast.success('Onboarding restarted successfully!')
        queueMicrotask(() => {
          navigate('/dashboard/onboarding')
        })
      }
    })
  }, [updateOnboardingStep, navigate, user?.onboarding_step])

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium'>Onboarding Status</span>
          <div className='flex items-center gap-2'>
            <Badge variant={isComplete ? 'default' : 'secondary'}>
              {isComplete ? 'Complete' : 'In Progress'}
            </Badge>
            {!isComplete && (
              <Badge
                variant='default'
                className='cursor-pointer'
              >
                <Link
                  to='/dashboard/onboarding'
                  className='flex items-center gap-1'
                >
                  Continue Onboarding
                  <ArrowRight className='h-3 w-3' />
                </Link>
              </Badge>
            )}
            {isComplete && (
              <Badge
                variant='outline'
                className='cursor-pointer'
                onClick={handleRestartOnboarding}
              >
                <div className='flex items-center gap-1'>
                  <RotateCcw className='h-3 w-3' />
                  Restart Onboarding
                </div>
              </Badge>
            )}
          </div>
        </div>
        {!isComplete && (
          <div className='text-sm text-muted-foreground'>
            Complete the onboarding process to access all features
          </div>
        )}
      </div>
    </div>
  )
}
