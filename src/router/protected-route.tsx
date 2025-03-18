import { useOnboardingStep, useUser } from '@/lib/hooks'
import type { RedirectInfo } from '@/lib/types'
import { getProtectedRedirectInfo } from '@/lib/utils'
import { Loading } from '@/ui/loading'
import { useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { data: user, isLoading } = useUser()
  const { currentStep } = useOnboardingStep()
  const location = useLocation()

  const redirectInfo: RedirectInfo = useMemo(
    () =>
      getProtectedRedirectInfo(
        user,
        currentStep,
        location.pathname,
        location.search
      ),
    [user, currentStep, location.pathname, location.search]
  )

  if (isLoading) {
    return <Loading size='lg' />
  }

  if (redirectInfo.shouldRedirect) {
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
