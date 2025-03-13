import { useAuth } from '@/global/hooks/use-auth'
import { useOnboardingStep } from '@/global/hooks/use-onboarding-step'
import { useAuthExtensionParams } from '@/lib/auth-utils'
import { Loading } from '@/ui/loading'
import { useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const { currentStep } = useOnboardingStep()
  const location = useLocation()
  const { appendExtensionParams } = useAuthExtensionParams()

  const redirectInfo = useMemo(() => {
    if (!isAuthenticated) {
      return {
        path: appendExtensionParams('/login'),
        shouldRedirect: true
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

    const correctPath = pathMapping[currentStep] || '/dashboard/onboarding'

    if (
      ['/dashboard', '/dashboard/onboarding'].includes(location.pathname) &&
      [
        'vscode-download',
        'extension-installation',
        'connect-figma',
        'complete'
      ].includes(currentStep)
    ) {
      return {
        path: appendExtensionParams(correctPath),
        shouldRedirect: false
      }
    }

    const isOnCorrectPath = location.pathname === correctPath

    return {
      path: appendExtensionParams(correctPath),
      shouldRedirect: !isOnCorrectPath
    }
  }, [isAuthenticated, currentStep, location.pathname, appendExtensionParams])

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
