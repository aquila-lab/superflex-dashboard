import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/ui/dialog'
import { Icons } from '@/ui/icons'
import { ExternalLink } from 'lucide-react'
import { useCallback, useState } from 'react'

export type ExtensionType = 'VS Code' | 'Cursor'

export const useExtensionLauncher = () => {
  const [isAttemptingLaunch, setIsAttemptingLaunch] = useState(false)
  const [showFallbackDialog, setShowFallbackDialog] = useState(false)
  const [currentApp, setCurrentApp] = useState<ExtensionType | ''>('')

  const launchWithFallback = useCallback(
    (uri: string, appName: ExtensionType) => {
      try {
        setIsAttemptingLaunch(true)
        setCurrentApp(appName)

        const a = document.createElement('a')
        a.href = uri
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        const timeoutId = setTimeout(() => {
          setIsAttemptingLaunch(false)

          if (document.visibilityState === 'visible') {
            setShowFallbackDialog(true)
          }
        }, 2500)

        const handleVisibilityChange = () => {
          if (document.visibilityState === 'hidden') {
            clearTimeout(timeoutId)
            setIsAttemptingLaunch(false)
          }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        setTimeout(() => {
          document.removeEventListener(
            'visibilitychange',
            handleVisibilityChange
          )
        }, 3000)
      } catch (_error) {
        setIsAttemptingLaunch(false)
        setShowFallbackDialog(true)
      }
    },
    []
  )

  const launchVSCodeExtension = useCallback(() => {
    launchWithFallback('vscode:extension/aquilalabs.superflex', 'VS Code')
  }, [launchWithFallback])

  const launchCursorExtension = useCallback(() => {
    launchWithFallback('cursor:extension/aquilalabs.superflex', 'Cursor')
  }, [launchWithFallback])

  const openVSCodeSuperflex = useCallback(() => {
    launchWithFallback('vscode://aquilalabs.superflex?open=true', 'VS Code')
  }, [launchWithFallback])

  const openCursorSuperflex = useCallback(() => {
    launchWithFallback('cursor://aquilalabs.superflex?open=true', 'Cursor')
  }, [launchWithFallback])

  const openMarketplace = useCallback(() => {
    window.open(
      'https://marketplace.visualstudio.com/items?itemName=aquilalabs.superflex',
      '_blank'
    )
  }, [])

  const FallbackDialog = useCallback(() => {
    if (!currentApp) {
      return null
    }

    // Extract whether this was an open operation by checking the URL
    const isOpenOperation =
      document.activeElement instanceof HTMLAnchorElement &&
      document.activeElement.href.includes('open=true')

    const actionText = isOpenOperation ? 'Open' : 'Launch'
    const actionFailedText = isOpenOperation ? 'open' : 'launch'

    return (
      <Dialog
        open={showFallbackDialog}
        onOpenChange={setShowFallbackDialog}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>
              Failed to {actionText} {currentApp}
            </DialogTitle>
            <DialogDescription>
              We couldn't {actionFailedText} {currentApp} automatically. You
              have the following options:
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col gap-4 py-4'>
            {currentApp === 'VS Code' ? (
              <Button
                onClick={
                  isOpenOperation ? openCursorSuperflex : launchCursorExtension
                }
                className='flex items-center gap-2'
                variant='outline'
              >
                <Icons.Cursor className='size-4' />
                Try in Cursor Instead
              </Button>
            ) : (
              <Button
                onClick={
                  isOpenOperation ? openVSCodeSuperflex : launchVSCodeExtension
                }
                className='flex items-center gap-2'
              >
                <Icons.VSCode className='size-4' />
                Try in VS Code Instead
              </Button>
            )}
            {!isOpenOperation && (
              <Button
                variant='outline'
                onClick={openMarketplace}
                className='flex items-center gap-2'
              >
                <ExternalLink className='size-4' />
                Go to VS Code Marketplace
              </Button>
            )}
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
    )
  }, [
    currentApp,
    showFallbackDialog,
    launchVSCodeExtension,
    launchCursorExtension,
    openVSCodeSuperflex,
    openCursorSuperflex,
    openMarketplace
  ])

  return {
    isAttemptingLaunch,
    currentApp,
    launchVSCodeExtension,
    launchCursorExtension,
    openVSCodeSuperflex,
    openCursorSuperflex,
    openMarketplace,
    FallbackDialog
  }
}
