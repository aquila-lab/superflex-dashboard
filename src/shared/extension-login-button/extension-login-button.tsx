import { useExtensionLauncher } from '@/lib/hooks'
import { Button } from '@/ui/button'
import { LogIn } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

export const ExtensionLoginButton = ({
  className,
  variant = 'default',
  size = 'default'
}: {
  className?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const { isAttemptingLaunch } = useExtensionLauncher()

  const extensionSource = useMemo(() => {
    const registrationSource = localStorage.getItem('registrationSource')
    const loginSource = localStorage.getItem('loginSource')
    return registrationSource || loginSource || 'vscode'
  }, [])

  const extensionName = useMemo(() => {
    return extensionSource === 'cursor' ? 'Cursor' : 'VSCode'
  }, [extensionSource])

  const handleLoginToExtension = () => {
    setIsLoggingIn(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('You need to be logged in to connect to the extension')
      setIsLoggingIn(false)
      return
    }

    try {
      const extensionType = extensionSource === 'cursor' ? 'cursor' : 'vscode'
      const extensionUrl = `${extensionType}://aquilalabs.superflex?open=true&access_token=${token}`

      window.location.href = extensionUrl
      sessionStorage.setItem('redirected', 'true')
      sessionStorage.setItem('loggedIn', 'true')

      toast.success(`Logging in to ${extensionName} extension`, {
        description: 'You will be redirected to your editor'
      })

      setTimeout(() => {
        setIsLoggingIn(false)
      }, 3000)
    } catch (error) {
      console.error('Error logging in to extension:', error)
      toast.error(`Failed to log in to ${extensionName} extension`)
      setIsLoggingIn(false)
    }
  }

  const buttonText = useMemo(() => {
    if (isLoggingIn || isAttemptingLaunch) {
      return 'Logging in...'
    }
    return `Login to ${extensionName}`
  }, [isLoggingIn, extensionName, isAttemptingLaunch])

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLoginToExtension}
      disabled={isLoggingIn || isAttemptingLaunch}
      className={className}
    >
      <LogIn className='h-4 w-4 mr-2' />
      {buttonText}
    </Button>
  )
}
