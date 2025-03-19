import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { forwardRef } from 'react'

export const TriggerButton = forwardRef<
  HTMLButtonElement,
  {
    isAttemptingLaunch: boolean
    dropdownLabel: string
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ isAttemptingLaunch, dropdownLabel, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type='button'
      variant='outline'
      className='flex items-center gap-2'
      disabled={isAttemptingLaunch}
      {...props}
    >
      {isAttemptingLaunch ? (
        <>
          <Icons.Spinner className='size-4 animate-spin' />
          <span>Launching...</span>
        </>
      ) : (
        <>
          <ExternalLink className='size-4' />
          <span>{dropdownLabel}</span>
          <ChevronDown className='size-4 ml-1' />
        </>
      )}
    </Button>
  )
})
