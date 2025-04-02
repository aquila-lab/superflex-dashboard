import { useExtensionLauncher, useOnboardingStep } from '@/lib/hooks'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu'
import { COMPLETED_ONBOARDING_STEP } from '@/lib/constants'
import { useMemo } from 'react'
import { InstallMenuItems } from './install-menu-items'
import { OpenMenuItems } from './open-menu-items'
import { TriggerButton } from './trigger-button'
import { SkipOnboarding } from '../skip-onboarding/skip-onboarding'

export const ExtensionDropdown = () => {
  const {
    isAttemptingLaunch,
    launchVSCodeExtension,
    launchCursorExtension,
    openVSCodeSuperflex,
    openCursorSuperflex,
    openMarketplace
  } = useExtensionLauncher()

  const { currentStep } = useOnboardingStep()

  const isOnboardingComplete = useMemo(() => {
    return currentStep >= COMPLETED_ONBOARDING_STEP
  }, [currentStep])

  const isExtensionSetupComplete = useMemo(() => {
    return currentStep >= 2
  }, [currentStep])

  const dropdownLabel = useMemo(() => {
    if (isExtensionSetupComplete) {
      return 'Open Superflex'
    }
    return 'Install Superflex'
  }, [isExtensionSetupComplete])

  return isOnboardingComplete ? (
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
          {isExtensionSetupComplete ? 'Extension options' : 'Install options'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isExtensionSetupComplete ? (
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
  ) : (
    <SkipOnboarding />
  )
}
