import { useLogout } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { LogOut } from 'lucide-react'
import { type HTMLAttributes, useCallback, useMemo } from 'react'
import { OnboardingStepsCompact } from './onboarding-steps-compact'

export const OnboardingHeader = ({
  className,
  currentStep,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  currentStep?: number
}) => {
  const { mutateAsync: logout } = useLogout()

  const handleLogout = useCallback(async () => {
    logout()
  }, [logout])

  const headerClasses = useMemo(
    () => cn('flex w-full items-center justify-between px-6 py-4', className),
    [className]
  )

  return (
    <header
      className={headerClasses}
      {...props}
    >
      <div className='flex items-center justify-start w-24'>
        <Icons.Logo className='h-10 w-8' />
      </div>

      {currentStep !== undefined && (
        <div className='flex-1 flex justify-center'>
          <OnboardingStepsCompact currentStep={currentStep} />
        </div>
      )}

      <div className='flex items-center justify-end w-24'>
        <Button
          variant='ghost'
          size='sm'
          onClick={handleLogout}
          className='flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground'
        >
          <LogOut className='size-4' />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  )
}
