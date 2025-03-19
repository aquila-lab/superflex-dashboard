import type { BillingPeriod } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useCallback, useMemo } from 'react'

export const BillingOption = ({
  isActive,
  label,
  period,
  onClick,
  discount
}: {
  isActive: boolean
  label: string
  period: BillingPeriod
  onClick: (period: BillingPeriod) => void
  discount?: string
}) => {
  const handleClick = useCallback(() => {
    onClick(period)
  }, [onClick, period])

  const className = useMemo(() => {
    return cn(
      'px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors duration-200',
      isActive
        ? 'bg-primary text-primary-foreground shadow-sm'
        : 'text-muted-foreground hover:text-foreground'
    )
  }, [isActive])

  const discountClassName = useMemo(() => {
    return cn('text-primary font-medium', isActive && 'text-primary-foreground')
  }, [isActive])

  return (
    <div
      className={className}
      onClick={handleClick}
    >
      {label}
      {discount && (
        <>
          {' '}
          <span className={discountClassName}>{discount}</span>
        </>
      )}
    </div>
  )
}
