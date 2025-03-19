import { type ReactNode, memo } from 'react'

export const OnboardingSection = memo(
  ({
    children
  }: {
    children: ReactNode
  }) => {
    return <div className='space-y-6'>{children}</div>
  }
)
