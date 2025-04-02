import { LOADING_CONTAINER_CLASSES } from '@/lib/constants'
import { useUrlParamsStorage, useUser } from '@/lib/hooks'
import type { RouterContainerProps } from '@/lib/types'
import { TrackingProvider } from '@/router/tracking-provider'
import { ExtensionOnboardingHandler } from '@/shared/extension-handler/extension-onboarding-handler'
import { Loading } from '@/ui/loading'
import { useMemo } from 'react'

export const RouterContainer = ({ children }: RouterContainerProps) => {
  useUrlParamsStorage()
  const { isLoading: userLoading } = useUser()

  const isReady = useMemo(() => !userLoading, [userLoading])

  if (!isReady) {
    return (
      <div className={LOADING_CONTAINER_CLASSES}>
        <Loading size='lg' />
      </div>
    )
  }

  return (
    <TrackingProvider>
      <ExtensionOnboardingHandler />
      {children}
    </TrackingProvider>
  )
}
