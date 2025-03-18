import { useLogout, useUser } from '@/lib/hooks'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/ui/dropdown-menu'
import { Info, LogOut, User } from 'lucide-react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

export const UserDropdownContent = () => {
  const { mutateAsync: logout } = useLogout()
  const { data: user } = useUser()

  const handleLogout = useCallback(async () => {
    await logout()
  }, [logout])

  return (
    <DropdownMenuContent
      align='end'
      className='w-56'
    >
      <DropdownMenuLabel className='font-normal'>
        <div className='flex flex-col space-y-1'>
          <p className='text-sm font-medium leading-none'>
            {user?.username || 'User'}
          </p>
          <p className='text-xs leading-none text-muted-foreground'>
            {user?.email || ''}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        asChild
        className='cursor-pointer'
      >
        <Link to='/dashboard'>
          <User className='size-4' />
          <span>Account Settings</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className='cursor-pointer'
      >
        <Link to='/dashboard/onboarding'>
          <Info className='size-4' />
          <span>Setup Superflex</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={handleLogout}
        className='cursor-pointer'
      >
        <LogOut className='size-4' />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
