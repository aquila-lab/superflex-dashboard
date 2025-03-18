import { DropdownMenuItem } from '@/ui/dropdown-menu'
import { Icons } from '@/ui/icons'
import { ExternalLink } from 'lucide-react'

export const InstallMenuItems = ({
  launchVSCodeExtension,
  launchCursorExtension,
  openMarketplace,
  isAttemptingLaunch
}: {
  launchVSCodeExtension: () => void
  launchCursorExtension: () => void
  openMarketplace: () => void
  isAttemptingLaunch: boolean
}) => {
  return (
    <>
      <DropdownMenuItem
        onClick={launchVSCodeExtension}
        className='cursor-pointer'
        disabled={isAttemptingLaunch}
      >
        <Icons.VSCode className='size-4 text-blue-600' />
        <span>Install in VS Code</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={launchCursorExtension}
        className='cursor-pointer'
        disabled={isAttemptingLaunch}
      >
        <Icons.Cursor className='size-4 text-purple-600' />
        <span>Install in Cursor</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={openMarketplace}
        className='cursor-pointer'
      >
        <ExternalLink className='size-4' />
        <span>VS Marketplace</span>
      </DropdownMenuItem>
    </>
  )
}
