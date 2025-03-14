import { useAuth } from '@/global/hooks/use-auth'
import { useUser } from '@/global/hooks/use-user'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/ui/dialog'
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
import { useCallback, useMemo, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

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
  const [isAttemptingLaunch, setIsAttemptingLaunch] = useState(false)
  const [showFallbackDialog, setShowFallbackDialog] = useState(false)
  const [currentApp, setCurrentApp] = useState<string>('')

  const launchWithFallback = useCallback((uri: string, appName: string) => {
    try {
      setIsAttemptingLaunch(true)
      setCurrentApp(appName)

      window.location.href = uri

      setTimeout(() => {
        setIsAttemptingLaunch(false)

        if (document.visibilityState === 'visible') {
          setShowFallbackDialog(true)
        }
      }, 1000)
    } catch (_error) {
      setIsAttemptingLaunch(false)
      setShowFallbackDialog(true)
    }
  }, [])

  const launchVSCodeExtension = useCallback(() => {
    launchWithFallback('vscode:extension/aquilalabs.superflex', 'VS Code')
  }, [launchWithFallback])

  const launchCursorExtension = useCallback(() => {
    launchWithFallback('cursor:extension/aquilalabs.superflex', 'Cursor')
  }, [launchWithFallback])

  const openMarketplace = useCallback(() => {
    window.open(
      'https://marketplace.visualstudio.com/items?itemName=aquilalabs.superflex',
      '_blank'
    )
    setShowFallbackDialog(false)
  }, [])

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
                <span>Install Superflex</span>
                <ChevronDown className='size-4 ml-1' />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-56'
        >
          <DropdownMenuLabel>Install Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={launchVSCodeExtension}
            className='cursor-pointer'
            disabled={isAttemptingLaunch}
          >
            <span>Try in VS Code</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={launchCursorExtension}
            className='cursor-pointer'
            disabled={isAttemptingLaunch}
          >
            <span>Try in Cursor</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={openMarketplace}
            className='cursor-pointer'
          >
            <span>Visit VS Code Marketplace</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={showFallbackDialog}
        onOpenChange={setShowFallbackDialog}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Failed to Launch {currentApp}</DialogTitle>
            <DialogDescription>
              We couldn't open {currentApp} automatically. You have the
              following options:
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col gap-4 py-4'>
            {currentApp === 'VS Code' ? (
              <Button onClick={launchCursorExtension}>
                Try in Cursor Instead
              </Button>
            ) : (
              <Button onClick={launchVSCodeExtension}>
                Try in VS Code Instead
              </Button>
            )}
            <Button
              variant='outline'
              onClick={openMarketplace}
            >
              Go to VS Code Marketplace
            </Button>
          </div>
          <DialogFooter className='sm:justify-start'>
            <Button
              variant='secondary'
              onClick={() => setShowFallbackDialog(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
                <User className='mr-2 size-4' />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className='cursor-pointer'
            >
              <Link to='/dashboard/onboarding'>
                <Info className='mr-2 size-4' />
                <span>Setup Superflex</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className='cursor-pointer'
            >
              <LogOut className='mr-2 size-4' />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
