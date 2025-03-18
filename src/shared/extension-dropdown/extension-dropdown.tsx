import { useExtensionLauncher, useOnboardingStep } from '@/lib/hooks'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu'
import { useMemo } from 'react'
import { InstallMenuItems } from './install-menu-items'
import { OpenMenuItems } from './open-menu-items'
import { TriggerButton } from './trigger-button'

export const ExtensionDropdown = () => {
  const {
    isAttemptingLaunch,
    launchVSCodeExtension,
    launchCursorExtension,
    openVSCodeSuperflex,
    openCursorSuperflex,
    openMarketplace
  } = useExtensionLauncher()

  const { isComplete } = useOnboardingStep()

  const dropdownLabel = useMemo(() => {
    if (isComplete) {
      return 'Open Superflex'
    }
    return 'Install Superflex'
  }, [isComplete])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TriggerButton
          isAttemptingLaunch={isAttemptingLaunch}
          dropdownLabel={dropdownLabel}
        />
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
          <OpenMenuItems
            openVSCodeSuperflex={openVSCodeSuperflex}
            openCursorSuperflex={openCursorSuperflex}
            isAttemptingLaunch={isAttemptingLaunch}
          />
        ) : (
          <InstallMenuItems
            launchVSCodeExtension={launchVSCodeExtension}
            launchCursorExtension={launchCursorExtension}
            openMarketplace={openMarketplace}
            isAttemptingLaunch={isAttemptingLaunch}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
