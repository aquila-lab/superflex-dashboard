import { useAuth } from '@/global/hooks/use-auth'
import { useOnboardingStep } from '@/global/hooks/use-onboarding-step'
import { useUser } from '@/global/hooks/use-user'
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
import { ChevronDown, ExternalLink, Info, LogOut, User } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { useExtensionLauncher } from './extension-launcher'

const UserAvatar = () => {
  const { user } = useUser()

  const userInitials = useMemo(() => {
    if (!user?.username) {
      return 'U'
    }

    return user.username.substring(0, 2).toUpperCase()
  }, [user])

  return (
    <Avatar>
      <AvatarImage
        key={user?.picture}
        src={user?.picture || undefined}
        alt={user?.username || 'User'}
        width={40}
        height={40}
        className='object-cover'
      />
      <AvatarFallback>{userInitials}</AvatarFallback>
    </Avatar>
  )
}

const SuperflexExtensionDropdown = () => {
  const {
    isAttemptingLaunch,
    launchVSCodeExtension,
    launchCursorExtension,
    openVSCodeSuperflex,
    openCursorSuperflex,
    openMarketplace,
    FallbackDialog
  } = useExtensionLauncher()

  const { isComplete } = useOnboardingStep()

  const dropdownLabel = useMemo(() => {
    if (isComplete) {
      return 'Open Superflex'
    }
    return 'Install Superflex'
  }, [isComplete])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-56'
        >
          <DropdownMenuLabel>
            {isComplete ? 'Extension options' : 'Install options'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isComplete ? (
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
          ) : (
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
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <FallbackDialog />
    </>
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
          <div className='flex items-center justify-start'>
            <Icons.Logo className='h-10 w-8' />
          </div>
        </Link>
      </div>

      <div className='flex items-center justify-end gap-4'>
        <SuperflexExtensionDropdown />

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
        </DropdownMenu>
      </div>
    </header>
  )
}
