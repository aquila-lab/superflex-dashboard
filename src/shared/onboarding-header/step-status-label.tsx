import type { StepStatus } from '@/lib/types'

export const StepStatusLabel = ({ status }: { status: StepStatus }) => {
  const { isCompleted, isCurrent, isUpcoming } = status

  if (isCompleted) {
    return <span className='text-green-700 font-medium'>Completed</span>
  }

  if (isCurrent) {
    return <span className='text-primary font-medium'>Current step</span>
  }

  if (isUpcoming) {
    return <span className='text-muted-foreground'>Coming up</span>
  }

  return null
}
