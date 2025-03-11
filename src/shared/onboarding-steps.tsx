import { cn } from '@/lib/utils'
import { Check, Pen } from 'lucide-react'
import { useMemo, type HTMLAttributes } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card'

export type OnboardingStep =
  | 'sign-up'
  | 'choose-plan'
  | 'profile-setup'
  | 'get-started'

export const stepsData = [
  {
    id: 'sign-up',
    label: 'Sign Up',
    description: 'Covers registration'
  },
  {
    id: 'choose-plan',
    label: 'Choose Plan',
    description: 'Plan selection and subscription'
  },
  {
    id: 'profile-setup',
    label: 'Profile Setup',
    description: 'Covers additional user info'
  },
  {
    id: 'get-started',
    label: 'Get Started',
    description: 'VSCode extension onboarding flow'
  }
] as const

export const OnboardingSteps = ({
  currentStep,
  className,
  ...props
}: {
  currentStep: OnboardingStep
} & HTMLAttributes<HTMLDivElement>) => {
  const currentStepIndex = useMemo(() => {
    return stepsData.findIndex(step => step.id === currentStep)
  }, [currentStep])

  return (
    <div
      className={cn('w-full max-w-6xl mx-auto px-4 py-6', className)}
      {...props}
    >
      <div className='flex justify-center'>
        <div className='flex items-center'>
          {stepsData.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex
            const isUpcoming = index > currentStepIndex

            return (
              <div
                key={step.id}
                className='flex items-center'
              >
                <HoverCard openDelay={200}>
                  <HoverCardTrigger>
                    <div
                      className={cn(
                        'flex flex-col items-center cursor-pointer'
                      )}
                    >
                      <div
                        className={cn(
                          'flex items-center justify-center w-8 h-8 rounded-full border transition-colors',
                          isCompleted
                            ? 'bg-green-100 border-green-500 text-green-600'
                            : isCurrent
                              ? 'border-primary/40 text-primary/80'
                              : 'border-primary/20 text-primary/40'
                        )}
                      >
                        {isCompleted ? (
                          <Check className='h-4 w-4' />
                        ) : isCurrent ? (
                          <Pen className='h-4 w-4' />
                        ) : (
                          <span className='text-sm font-medium'>
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent
                    align='center'
                    className='w-64 p-4'
                  >
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <div
                          className={cn(
                            'flex items-center justify-center w-6 h-6 rounded-full border',
                            isCompleted
                              ? 'bg-green-100 border-green-500 text-green-600'
                              : isCurrent
                                ? 'border-primary/40 text-primary/80'
                                : 'border-primary/20 text-primary/40'
                          )}
                        >
                          {isCompleted ? (
                            <Check className='h-3 w-3' />
                          ) : isCurrent ? (
                            <Pen className='h-3 w-3' />
                          ) : (
                            <span className='text-xs font-medium'>
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <h4 className='text-sm font-semibold'>{step.label}</h4>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        {step.description}
                      </p>

                      <div className='pt-2 text-xs'>
                        {isCompleted && (
                          <span className='text-green-600 font-medium'>
                            Completed
                          </span>
                        )}
                        {isCurrent && (
                          <span className='text-primary font-medium'>
                            Current step
                          </span>
                        )}
                        {isUpcoming && (
                          <span className='text-muted-foreground'>
                            Coming up
                          </span>
                        )}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {index < stepsData.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 w-12 mx-1 sm:mx-3',
                      index < currentStepIndex ? 'bg-green-500' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
