import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { memo } from 'react'

export const SuccessIcon = memo(({ children }: { children: ReactNode }) => (
  <div
    className={cn(
      'rounded-full bg-green-50 p-6 transition-all duration-700',
      'animate-in zoom-in-50 fade-in-0',
      'relative after:absolute after:inset-0 after:rounded-full',
      'after:border-4 after:border-green-100 after:animate-pulse'
    )}
  >
    {children}
  </div>
))
