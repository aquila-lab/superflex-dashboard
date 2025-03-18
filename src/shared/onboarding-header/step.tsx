import { STEPS_DATA } from '@/lib/constants'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/ui/hover-card'
import { useMemo } from 'react'
import { StepConnector } from './step-connector'
import { StepHoverContent } from './step-hover-content'
import { StepIndicator } from './step-indicator'

export const Step = ({
  step,
  index,
  currentStep
}: {
  step: (typeof STEPS_DATA)[number]
  index: number
  currentStep: number
}) => {
  const status = useMemo(
    () => ({
      isCompleted: index < currentStep,
      isCurrent: index === currentStep,
      isUpcoming: index > currentStep,
      index
    }),
    [index, currentStep]
  )

  const isLastStep = useMemo(() => index === STEPS_DATA.length - 1, [index])

  return (
    <div className='flex items-center'>
      <HoverCard openDelay={200}>
        <HoverCardTrigger>
          <div className='cursor-pointer'>
            <StepIndicator status={status} />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align='center'
          className='w-64 p-4'
        >
          <StepHoverContent
            step={step}
            status={status}
          />
        </HoverCardContent>
      </HoverCard>

      {!isLastStep && <StepConnector isCompleted={status.isCompleted} />}
    </div>
  )
}
