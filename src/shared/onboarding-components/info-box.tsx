import { type ReactNode, memo } from 'react'

export const InfoBox = memo(
  ({
    icon,
    title,
    variant = 'default',
    children
  }: {
    icon: ReactNode
    title: string
    variant?: 'default' | 'success' | 'warning'
    children: ReactNode
  }) => {
    const variantClassMap = {
      default: 'rounded-lg border p-4 space-y-4',
      success: 'rounded-lg bg-green-50 border border-green-200 p-4 space-y-1',
      warning: 'rounded-lg bg-amber-50 border border-amber-200 p-4 space-y-1'
    }

    const titleColorMap = {
      default: 'text-foreground',
      success: 'text-green-800',
      warning: 'text-amber-800'
    }

    return (
      <div className={variantClassMap[variant]}>
        {variant === 'default' ? (
          <div className='flex items-center gap-2 font-medium'>
            {icon}
            <h3 className='text-lg'>{title}</h3>
          </div>
        ) : (
          <div className='flex items-start gap-3'>
            <span className='mt-0.5 flex-shrink-0'>{icon}</span>
            <div>
              <p className={`font-medium ${titleColorMap[variant]}`}>{title}</p>
              {children}
            </div>
          </div>
        )}

        {variant === 'default' && children}
      </div>
    )
  }
)
