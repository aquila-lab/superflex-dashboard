import { useOnboardingStep, useUser } from '@/lib/hooks'
import { Loading } from '@/ui/loading'
import { useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const AuthRoute = () => {
  const { data: user, isLoading } = useUser()
  const { currentStep } = useOnboardingStep()
  const location = useLocation()

  const redirectInfo = useMemo(() => {
    if (!user) {
      return {
        path: null,
        shouldRedirect: false
      }
    }

    const pathMapping: Record<number, string> = {
      0: '/select-plan',
      1: '/user-info',
      2: '/dashboard/onboarding',
      3: '/dashboard/onboarding',
      4: '/dashboard/onboarding',
      5: '/dashboard'
    }

    return {
      path: pathMapping[currentStep] || '/dashboard/onboarding',
      shouldRedirect: true
    }
  }, [user, currentStep])

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
