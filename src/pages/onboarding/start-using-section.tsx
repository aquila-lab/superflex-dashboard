import { useExtensionLauncher } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { CompleteButton } from '@/shared/complete-button/complete-button'
import { YouTubeVideo } from '@/shared/youtube-video/youtube-video'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { ExternalLink, Rocket } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

export const StartUsingSection = ({
  isCompleted,
  onComplete
}: {
  isCompleted: boolean
  onComplete: (id: string, completed: boolean) => void
}) => {
  const [activeTab, setActiveTab] = useState<'vscode' | 'cursor'>('vscode')
  const {
    isAttemptingLaunch,
    currentApp,
    launchVSCodeExtension,
    launchCursorExtension,
    openMarketplace
  } = useExtensionLauncher()

  const handleTabChange = useCallback((tab: 'vscode' | 'cursor') => {
    setActiveTab(tab)
  }, [])

  const content = useMemo(() => {
    return (
      <div className='space-y-6'>
        <div className='space-y-4 text-base'>
          <p>
            Now that you have VS Code or Cursor installed, it's time to set up
            Superflex. Follow the instructions below based on your editor of
            choice.
          </p>
        </div>

        <div className='flex space-x-2 border-b'>
          <button
            type='button'
            onClick={() => handleTabChange('vscode')}
            className={cn(
              'px-4 py-2 font-medium text-sm transition-colors cursor-pointer flex items-center gap-2',
              activeTab === 'vscode'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icons.VSCode className='size-4' />
            VS Code
          </button>
          <button
            type='button'
            onClick={() => handleTabChange('cursor')}
            className={cn(
              'px-4 py-2 font-medium text-sm transition-colors cursor-pointer flex items-center gap-2',
              activeTab === 'cursor'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icons.Cursor className='size-4' />
            Cursor
          </button>
        </div>

        <div className={cn('space-y-6', activeTab !== 'vscode' && 'hidden')}>
          <YouTubeVideo videoId='wB7Um6n9bBA' />
          <div className='rounded-lg border p-4 space-y-4'>
            <div className='flex items-center gap-2 font-medium'>
              <Icons.VSCode className='size-5 text-blue-600' />
              <h3 className='text-lg'>Installing Superflex in VS Code</h3>
            </div>

            <div className='space-y-3 pl-2'>
              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>1</span>
                </div>
                <p>Open VS Code</p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>2</span>
                </div>
                <p>
                  Click on the Extensions tab (
                  <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                    Ctrl + Shift + X
                  </kbd>{' '}
                  /
                  <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                    Cmd + Shift + X
                  </kbd>
                  )
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>3</span>
                </div>
                <p>
                  Search for <span className='font-medium'>Superflex</span>
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>4</span>
                </div>
                <p>
                  Click <span className='font-medium'>Install</span>
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-lg border p-4 space-y-4'>
            <div className='flex items-center gap-2 font-medium'>
              <Rocket className='size-5 text-red-300' />
              <h3 className='text-lg'>Using Superflex</h3>
            </div>

            <div className='space-y-3 pl-2'>
              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>1</span>
                </div>
                <p>Open your project in VS Code</p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>2</span>
                </div>
                <p>
                  Access Superflex from the sidebar or press (
                  <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                    Ctrl + ;
                  </kbd>{' '}
                  /
                  <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                    Cmd + ;
                  </kbd>
                  ) to open Superflex
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>3</span>
                </div>
                <p>
                  Move Superflex to the secondary sidebar for better
                  multitasking
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>4</span>
                </div>
                <p>Start coding at superhuman speed!</p>
              </div>
            </div>
          </div>
        </div>

        <div className={cn('space-y-6', activeTab !== 'cursor' && 'hidden')}>
          <YouTubeVideo videoId='pM3YPWC_4Oo' />
          <div className='rounded-lg border p-4 space-y-4'>
            <div className='flex items-center gap-2 font-medium'>
              <Icons.Cursor className='size-5 text-purple-600' />
              <h3 className='text-lg'>Installing Superflex in Cursor</h3>
            </div>

            <div className='space-y-3 pl-2'>
              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>1</span>
                </div>
                <p>Open Cursor</p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>2</span>
                </div>
                <p>
                  Click on the Extensions tab (
                  <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                    Ctrl + Shift + X
                  </kbd>{' '}
                  /
                  <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                    Cmd + Shift + X
                  </kbd>
                  )
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>3</span>
                </div>
                <p>
                  Search for <span className='font-medium'>Superflex</span>
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>4</span>
                </div>
                <p>
                  Click <span className='font-medium'>Install</span>
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-lg border p-4 space-y-4'>
            <div className='flex items-center gap-2 font-medium'>
              <Rocket className='size-5 text-red-300' />
              <h3 className='text-lg'>Using Superflex</h3>
            </div>

            <div className='space-y-3 pl-2'>
              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>1</span>
                </div>
                <p>Open your project in Cursor</p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>2</span>
                </div>
                <p>
                  Access Superflex from the sidebar or press{' '}
                  <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                    ⌘;
                  </kbd>{' '}
                  to open Superflex
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>3</span>
                </div>
                <p>
                  Move Superflex to the secondary sidebar for better
                  multitasking
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <span className='text-xs font-medium'>4</span>
                </div>
                <p>Start coding at superhuman speed!</p>
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-lg border p-4 space-y-4'>
          <div className='flex items-center gap-2 font-medium'>
            <Rocket className='size-5 text-yellow-500' />
            <h3 className='text-lg'>Quick Install Options</h3>
          </div>
          <p>Use these options to install Superflex directly:</p>

          <div className='flex flex-wrap gap-3'>
            <Button
              variant='outline'
              onClick={launchVSCodeExtension}
              disabled={isAttemptingLaunch}
              className='flex items-center'
            >
              {isAttemptingLaunch && currentApp === 'VS Code' ? (
                <>
                  <Icons.Spinner className='size-4 animate-spin' />
                  <span>Launching...</span>
                </>
              ) : (
                <>
                  <Icons.VSCode className='size-4 text-blue-600' />
                  <span>Install in VS Code</span>
                </>
              )}
            </Button>

            <Button
              variant='outline'
              onClick={launchCursorExtension}
              disabled={isAttemptingLaunch}
              className='flex items-center'
            >
              {isAttemptingLaunch && currentApp === 'Cursor' ? (
                <>
                  <Icons.Spinner className='size-4 animate-spin' />
                  <span>Launching...</span>
                </>
              ) : (
                <>
                  <Icons.Cursor className='size-4 text-purple-600' />
                  <span>Install in Cursor</span>
                </>
              )}
            </Button>

            <Button
              variant='outline'
              onClick={openMarketplace}
            >
              <ExternalLink className='size-4' />
              <span>Visit VS Code Marketplace</span>
            </Button>
          </div>
        </div>

        <div className='pt-2 flex justify-between items-center'>
          <p className='text-sm text-muted-foreground'>
            Once installed, you're ready for the next step! 🚀
          </p>
          <CompleteButton
            sectionId='start-using-superflex'
            onComplete={onComplete}
            isCompleted={isCompleted}
          />
        </div>
      </div>
    )
  }, [
    activeTab,
    handleTabChange,
    isAttemptingLaunch,
    currentApp,
    launchVSCodeExtension,
    launchCursorExtension,
    openMarketplace,
    isCompleted,
    onComplete
  ])

  return content
}
