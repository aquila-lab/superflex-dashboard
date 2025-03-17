import type { ExtensionType } from '@/lib/types'
import { useCallback, useEffect, useState } from 'react'

export const useExtensionLauncher = () => {
  const [isAttemptingLaunch, setIsAttemptingLaunch] = useState(false)
  const [currentApp, setCurrentApp] = useState<ExtensionType | ''>('')

  useEffect(() => {
    if (!isAttemptingLaunch) {
      return
    }

    const timeoutId = setTimeout(() => {
      setIsAttemptingLaunch(false)
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isAttemptingLaunch])

  const launchExtension = useCallback((uri: string, appName: ExtensionType) => {
    try {
      setIsAttemptingLaunch(true)
      setCurrentApp(appName)

      const a = document.createElement('a')
      a.href = uri
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (_error) {
      setIsAttemptingLaunch(false)
    }
  }, [])

  const launchVSCodeExtension = useCallback(() => {
    launchExtension('vscode:extension/aquilalabs.superflex', 'VS Code')
  }, [launchExtension])

  const launchCursorExtension = useCallback(() => {
    launchExtension('cursor:extension/aquilalabs.superflex', 'Cursor')
  }, [launchExtension])

  const openVSCodeSuperflex = useCallback(() => {
    launchExtension('vscode://aquilalabs.superflex?open=true', 'VS Code')
  }, [launchExtension])

  const openCursorSuperflex = useCallback(() => {
    launchExtension('cursor://aquilalabs.superflex?open=true', 'Cursor')
  }, [launchExtension])

  const openMarketplace = useCallback(() => {
    window.open(
      'https://marketplace.visualstudio.com/items?itemName=aquilalabs.superflex',
      '_blank'
    )
  }, [])

  return {
    isAttemptingLaunch,
    currentApp,
    launchVSCodeExtension,
    launchCursorExtension,
    openVSCodeSuperflex,
    openCursorSuperflex,
    openMarketplace
  }
}
