import { cn } from '@/lib/utils'
import { Check, Lock } from 'lucide-react'
import { useMemo } from 'react'

export const OnboardingSectionIcon = ({
  completed,
  disabled,
  index
}: {
  completed: boolean
  disabled: boolean
  index: number
}) => {
  const iconClasses = useMemo(() => {
    if (completed) {
      return 'bg-green-200 border-green-600 text-green-700'
    }

    if (disabled) {
      return 'bg-muted border-muted-foreground/40 text-muted-foreground'
    }

    return 'border-primary/40'
  }, [completed, disabled])

  return (
    <div
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
        iconClasses
      )}
    >
      {completed && <Check className='size-5' />}
      {disabled && !completed && <Lock className='size-4' />}
      {!completed && !disabled && (
        <span className='text-base font-medium'>{index + 1}</span>
      )}
    </div>
  )
}
