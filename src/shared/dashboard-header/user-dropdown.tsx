import { Button } from '@/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import { UserAvatar } from '../user-avatar/user-avatar'
import { UserDropdownContent } from './user-dropdown-content'

export const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
        >
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <UserDropdownContent />
    </DropdownMenu>
  )
}
