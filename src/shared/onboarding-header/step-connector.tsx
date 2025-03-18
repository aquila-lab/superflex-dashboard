import { cn } from '@/lib/utils'

export const StepConnector = ({ isCompleted }: { isCompleted: boolean }) => {
  return (
    <div
      className={cn(
        'h-0.5 w-8 mx-1',
        isCompleted ? 'bg-green-600' : 'bg-muted'
      )}
    />
  )
}
