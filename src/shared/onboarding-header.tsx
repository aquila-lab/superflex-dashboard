import { stepsData } from '@/lib/constants'
import { useLogout } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card'
import { Icons } from '@/ui/icons'
import { Check, LogOut, Pen } from 'lucide-react'
import { type HTMLAttributes, useCallback, useMemo } from 'react'

export const OnboardingHeader = ({
  className,
  currentStep,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  currentStep?: number
}) => {
  const { mutate: logout } = useLogout()

  const handleLogout = useCallback(async () => {
    logout()
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

      {currentStep !== undefined && (
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
          <LogOut className='size-4' />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  )
}

const OnboardingStepsCompact = ({
  currentStep
}: {
  currentStep: number
}) => {
  return (
    <div className='flex items-center'>
      {stepsData.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isUpcoming = index > currentStep

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
                      ? 'bg-green-200 border-green-600 text-green-700'
                      : isCurrent
                        ? 'border-primary/40 text-primary/80'
                        : 'border-primary/20 text-primary/40'
                  )}
                >
                  {isCompleted ? (
                    <Check className='size-4' />
                  ) : isCurrent ? (
                    <Pen className='size-3' />
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
                          ? 'bg-green-200 border-green-600 text-green-700'
                          : isCurrent
                            ? 'border-primary/40 text-primary/80'
                            : 'border-primary/20 text-primary/40'
                      )}
                    >
                      {isCompleted ? (
                        <Check className='size-3' />
                      ) : isCurrent ? (
                        <Pen className='size-3' />
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
                      <span className='text-green-700 font-medium'>
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
                  index < currentStep ? 'bg-green-600' : 'bg-muted'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
