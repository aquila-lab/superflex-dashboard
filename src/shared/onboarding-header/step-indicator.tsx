import type { StepStatus } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Check, Pen } from 'lucide-react'
import { useMemo } from 'react'

export const StepIndicator = ({
  status,
  size = 'large'
}: { status: StepStatus; size?: 'small' | 'large' }) => {
  const { isCompleted, isCurrent, index } = status

  const sizeClasses = useMemo(
    () => (size === 'large' ? 'w-8 h-8' : 'w-6 h-6'),
    [size]
  )

  const iconSize = useMemo(
    () => (size === 'large' ? 'size-4' : 'size-3'),
    [size]
  )

  const statusClasses = useMemo(
    () =>
      isCompleted
        ? 'bg-green-200 border-green-600 text-green-700'
        : isCurrent
          ? 'border-primary/40 text-primary/80'
          : 'border-primary/20 text-primary/40',
    [isCompleted, isCurrent]
  )

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full border transition-colors',
        sizeClasses,
        statusClasses
      )}
    >
      {isCompleted ? (
        <Check className={iconSize} />
      ) : isCurrent ? (
        <Pen className={size === 'large' ? 'size-3' : 'size-3'} />
      ) : (
        <span className='text-xs font-medium'>{index + 1}</span>
      )}
    </div>
  )
}
