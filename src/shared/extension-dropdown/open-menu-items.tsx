import { DropdownMenuItem } from '@/ui/dropdown-menu'
import { Icons } from '@/ui/icons'

export const OpenMenuItems = ({
  openVSCodeSuperflex,
  openCursorSuperflex,
  isAttemptingLaunch
}: {
  openVSCodeSuperflex: () => void
  openCursorSuperflex: () => void
  isAttemptingLaunch: boolean
}) => {
  return (
    <>
      <DropdownMenuItem
        onClick={openVSCodeSuperflex}
        className='cursor-pointer'
        disabled={isAttemptingLaunch}
      >
        <Icons.VSCode className='size-4 text-blue-600' />
        <span>Open in VS Code</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={openCursorSuperflex}
        className='cursor-pointer'
        disabled={isAttemptingLaunch}
      >
        <Icons.Cursor className='size-4 text-purple-600' />
        <span>Open in Cursor</span>
      </DropdownMenuItem>
    </>
  )
}
