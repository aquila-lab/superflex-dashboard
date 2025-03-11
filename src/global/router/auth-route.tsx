import { Loading } from '@/ui/loading'
import { useAuth } from '@/global/hooks/use-auth'
import { useOnboardingStep } from '@/global/hooks/use-onboarding-step'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const { currentStep } = useOnboardingStep()
  const location = useLocation()

  const redirectInfo = useMemo(() => {
    if (!isAuthenticated) {
      return {
        path: null,
        shouldRedirect: false
      }
    }

    const pathMapping = {
      complete: '/dashboard',
      'plan-selection': '/select-plan',
      'user-info': '/user-info',
      'vscode-download': '/dashboard/onboarding',
      'extension-installation': '/dashboard/onboarding',
      'connect-figma': '/dashboard/onboarding'
    }

    return {
      path: pathMapping[currentStep] || '/dashboard/onboarding',
      shouldRedirect: true
    }
  }, [isAuthenticated, currentStep])

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
