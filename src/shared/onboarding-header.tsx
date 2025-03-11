import { useAuth } from '@/global/hooks/use-auth'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card'
import { Icons } from '@/ui/icons'
import { Check, LogOut, Pen } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import type { HTMLAttributes } from 'react'
import { stepsData } from './onboarding-steps'
import type { OnboardingStep } from './onboarding-steps'

export const OnboardingHeader = ({
  className,
  currentStep,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  currentStep?: OnboardingStep
}) => {
  const { logout } = useAuth()

  const handleLogout = useCallback(async () => {
    await logout()
  }, [logout])

  const headerClasses = useMemo(
    () => cn('flex w-full items-center justify-between px-6 py-4', className),
    [className]
  )

  return (
    <header
      className={headerClasses}
      {...props}
    >
      <div className='flex items-center justify-start w-24'>
        <Icons.Logo className='h-10 w-8' />
      </div>

      {currentStep && (
        <div className='flex-1 flex justify-center'>
          <OnboardingStepsCompact currentStep={currentStep} />
        </div>
      )}

      <div className='flex items-center justify-end w-24'>
        <Button
          variant='ghost'
          size='sm'
          onClick={handleLogout}
          className='flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground'
        >
          <LogOut className='h-4 w-4' />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  )
}

const OnboardingStepsCompact = ({
  currentStep
}: {
  currentStep: OnboardingStep
}) => {
  const currentStepIndex = useMemo(() => {
    return stepsData.findIndex(step => step.id === currentStep)
  }, [currentStep])

  return (
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
                    'flex items-center justify-center w-8 h-8 rounded-full border transition-colors cursor-pointer',
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
                    <span className='text-xs font-medium'>{index + 1}</span>
                  )}
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
                        <span className='text-xs font-medium'>{index + 1}</span>
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
                      <span className='text-muted-foreground'>Coming up</span>
                    )}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            {index < stepsData.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-8 mx-1',
                  index < currentStepIndex ? 'bg-green-500' : 'bg-muted'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
