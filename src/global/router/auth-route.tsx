import { useAuth } from '@/global/hooks/use-auth'
import { useOnboardingStep } from '@/global/hooks/use-onboarding-step'
import { useAuthExtensionParams } from '@/lib/auth-utils'
import { Loading } from '@/ui/loading'
import { useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const { currentStep } = useOnboardingStep()
  const location = useLocation()
  const { appendExtensionParams } = useAuthExtensionParams()

  const redirectInfo = useMemo(() => {
    if (!isAuthenticated) {
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
      path: appendExtensionParams(
        pathMapping[currentStep] || '/dashboard/onboarding'
      ),
      shouldRedirect: true
    }
  }, [isAuthenticated, currentStep, appendExtensionParams])

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
