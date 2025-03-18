import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { ChevronDown, ExternalLink } from 'lucide-react'

export const TriggerButton = ({
  isAttemptingLaunch,
  dropdownLabel
}: {
  isAttemptingLaunch: boolean
  dropdownLabel: string
}) => {
  return (
    <Button
      variant='outline'
      className='flex items-center gap-2'
      disabled={isAttemptingLaunch}
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
}
