import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export const Loading = ({
  className,
  size = 'default'
}: {
  className?: string
  size?: 'sm' | 'default' | 'lg'
}) => {
  const sizeClass = {
    sm: 'size-4',
    default: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Loader2
        className={cn('animate-spin text-primary', sizeClass[size], className)}
      />
    </div>
  )
}
