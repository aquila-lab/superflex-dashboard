import { cn } from '@/lib/utils'
import { type HTMLAttributes, useMemo } from 'react'
import { HeaderLeft } from './header-left'
import { HeaderRight } from './header-right'

export const DashboardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const headerClasses = useMemo(
    () => cn('flex w-full items-center justify-between px-6 py-4', className),
    [className]
  )

  return (
    <header
      className={headerClasses}
      {...props}
    >
      <HeaderLeft />
      <HeaderRight />
    </header>
  )
}
