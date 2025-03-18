import type { STEPS_DATA } from '@/lib/constants'
import type { StepStatus } from '@/lib/types'
import { StepIndicator } from './step-indicator'
import { StepStatusLabel } from './step-status-label'

export const StepHoverContent = ({
  step,
  status
}: { step: (typeof STEPS_DATA)[number]; status: StepStatus }) => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2'>
        <StepIndicator
          status={status}
          size='small'
        />
        <h4 className='text-sm font-semibold'>{step.label}</h4>
      </div>

      <p className='text-xs text-muted-foreground'>{step.description}</p>

      <div className='pt-2 text-xs'>
        <StepStatusLabel status={status} />
      </div>
    </div>
  )
}
