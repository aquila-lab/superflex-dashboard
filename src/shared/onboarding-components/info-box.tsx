import { TITLE_COLOR_MAP, VARIANT_CLASS_MAP } from '@/lib/constants'
import type { InfoBoxVariant } from '@/lib/types'
import { cn } from '@/lib/utils'
import { type ReactNode, memo } from 'react'

export const InfoBox = memo(
  ({
    icon,
    title,
    variant = 'default',
    children,
    className
  }: {
    icon: ReactNode
    title: string
    variant?: InfoBoxVariant
    children: ReactNode
    className?: string
  }) => {
    return (
      <div className={cn(VARIANT_CLASS_MAP[variant], className)}>
        {variant === 'default' ? (
          <div className='flex items-center gap-2 font-medium'>
            {icon}
            <h3 className='text-lg'>{title}</h3>
          </div>
        ) : (
          <div className='flex items-start gap-3'>
            <span className='mt-0.5 flex-shrink-0'>{icon}</span>
            <div>
              <p className={`font-medium ${TITLE_COLOR_MAP[variant]}`}>
                {title}
              </p>
              {children}
            </div>
          </div>
        )}

        {variant === 'default' && children}
      </div>
    )
  }
)
