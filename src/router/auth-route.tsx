import { useOnboardingStep, useUser } from '@/lib/hooks'
import type { RedirectInfo } from '@/lib/types'
import { getRedirectInfo } from '@/lib/utils'
import { Loading } from '@/ui/loading'
import { useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const AuthRoute = () => {
  const { data: user, isLoading } = useUser()
  const { currentStep } = useOnboardingStep()
  const location = useLocation()

  const redirectInfo: RedirectInfo = useMemo(
    () => getRedirectInfo(user, currentStep),
    [user, currentStep]
  )

  if (isLoading) {
    return <Loading size='lg' />
  }

  if (redirectInfo.shouldRedirect && redirectInfo.path) {
    return (
      <Navigate
        to={redirectInfo.path}
        replace
        state={{ from: location }}
      />
    )
  }

  return <Outlet />
}
