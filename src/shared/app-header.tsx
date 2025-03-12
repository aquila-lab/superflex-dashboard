import { useAuth } from '@/global/hooks/use-auth'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu'
import { Icons } from '@/ui/icons'
import { Info, LogOut, User } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

const UserAvatar = () => {
  const { user } = useUserStore()

  const userInitials = useMemo(() => {
    if (!user?.username) {
      return 'U'
    }

    return user.username.substring(0, 2).toUpperCase()
  }, [user])

  return (
    <Avatar>
      {user?.picture && (
        <AvatarImage
          key={user.picture}
          src={user.picture}
          alt={user?.username || 'User'}
          width={40}
          height={40}
          className='object-cover'
        />
      )}
      <AvatarFallback>{userInitials}</AvatarFallback>
    </Avatar>
  )
}

export const AppHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { logout } = useAuth()
  const { user } = useUserStore()

  const handleLogout = useCallback(async () => {
    await logout()
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
      <div className='flex items-center justify-start'>
        <Link
          to='/dashboard'
          className='flex items-center gap-2'
        >
          <div className='flex items-center justify-start w-24'>
            <Icons.Logo className='h-10 w-8' />
          </div>
        </Link>
      </div>

      <div className='flex items-center justify-end gap-2'>
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
                <User className='mr-2 h-4 w-4' />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className='cursor-pointer'
            >
              <Link to='/dashboard/onboarding'>
                <Info className='mr-2 h-4 w-4' />
                <span>Setup Superflex</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className='cursor-pointer'
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
