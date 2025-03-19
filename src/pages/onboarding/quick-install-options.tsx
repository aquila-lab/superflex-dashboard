import { useExtensionLauncher } from '@/lib/hooks'
import { InfoBox } from '@/shared/onboarding-components/info-box'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { ExternalLink, Rocket } from 'lucide-react'
import { memo } from 'react'

export const QuickInstallOptions = memo(() => {
  const {
    isAttemptingLaunch,
    currentApp,
    launchVSCodeExtension,
    launchCursorExtension,
    openMarketplace
  } = useExtensionLauncher()

  return (
    <InfoBox
      icon={<Rocket className='size-5 text-yellow-500' />}
      title='Quick Install Options'
    >
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
    </InfoBox>
  )
})
