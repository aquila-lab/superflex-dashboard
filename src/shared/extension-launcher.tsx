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
import { useCallback, useEffect, useRef, useState } from 'react'

export type ExtensionType = 'VS Code' | 'Cursor'

export const useExtensionLauncher = () => {
  const [isAttemptingLaunch, setIsAttemptingLaunch] = useState(false)
  const [showFallbackDialog, setShowFallbackDialog] = useState(false)
  const [currentApp, setCurrentApp] = useState<ExtensionType | ''>('')
  const [launchStartTime, setLaunchStartTime] = useState(0)
  const [wasHidden, setWasHidden] = useState(false)
  const previousLaunchRef = useRef<string | null>(null)
  const preventDialogChaining = useRef(false)

  useEffect(() => {
    if (!isAttemptingLaunch) {
      return
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setWasHidden(true)
      } else if (document.visibilityState === 'visible' && wasHidden) {
        setIsAttemptingLaunch(false)
        preventDialogChaining.current = false
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isAttemptingLaunch, wasHidden])

  useEffect(() => {
    if (!isAttemptingLaunch || !launchStartTime) {
      return
    }

    const timeoutId = setTimeout(() => {
      if (
        isAttemptingLaunch &&
        document.visibilityState === 'visible' &&
        !wasHidden &&
        !preventDialogChaining.current
      ) {
        setIsAttemptingLaunch(false)
        setShowFallbackDialog(true)
      } else {
        preventDialogChaining.current = false
      }
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isAttemptingLaunch, launchStartTime, wasHidden])

  useEffect(() => {
    if (!showFallbackDialog) {
      preventDialogChaining.current = false
    }
  }, [showFallbackDialog])

  const resetLaunchState = useCallback(() => {
    setIsAttemptingLaunch(false)
    setWasHidden(false)
    setShowFallbackDialog(false)
  }, [])

  const launchWithFallback = useCallback(
    (uri: string, appName: ExtensionType) => {
      try {
        if (showFallbackDialog) {
          setShowFallbackDialog(false)
          preventDialogChaining.current = true
        }

        const currentLaunch = `${appName}:${uri}`
        const isRepeatedLaunch = previousLaunchRef.current === currentLaunch

        if (isRepeatedLaunch && Date.now() - launchStartTime < 5000) {
          preventDialogChaining.current = true
        }

        previousLaunchRef.current = currentLaunch
        setIsAttemptingLaunch(true)
        setCurrentApp(appName)
        setLaunchStartTime(Date.now())
        setWasHidden(false)

        const a = document.createElement('a')
        a.href = uri
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } catch (_error) {
        resetLaunchState()
        setShowFallbackDialog(true)
      }
    },
    [launchStartTime, resetLaunchState, showFallbackDialog]
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

    const isOpenOperation =
      document.activeElement instanceof HTMLAnchorElement &&
      document.activeElement.href.includes('open=true')

    const actionText = isOpenOperation ? 'Open' : 'Launch'
    const actionFailedText = isOpenOperation ? 'open' : 'launch'

    return (
      <Dialog
        open={showFallbackDialog}
        onOpenChange={open => {
          if (!open) {
            resetLaunchState()
          } else {
            setShowFallbackDialog(open)
          }
        }}
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
              onClick={() => resetLaunchState()}
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
    openMarketplace,
    resetLaunchState
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
