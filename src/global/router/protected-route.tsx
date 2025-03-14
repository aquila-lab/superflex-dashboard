import { useAuth } from '@/global/hooks/use-auth'
import { useOnboardingStep } from '@/global/hooks/use-onboarding-step'
import { Loading } from '@/ui/loading'
import { useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const { currentStep } = useOnboardingStep()
  const location = useLocation()

  const redirectInfo = useMemo(() => {
    if (!isAuthenticated) {
      return {
        path: '/login',
        shouldRedirect: true
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

    const correctPath = pathMapping[currentStep] || '/dashboard/onboarding'

    if (
      ['/dashboard', '/dashboard/onboarding'].includes(location.pathname) &&
      [2, 3, 4, 5].includes(currentStep)
    ) {
      return {
        path: correctPath,
        shouldRedirect: false
      }
    }

    const isOnCorrectPath = location.pathname === correctPath

    return {
      path: correctPath,
      shouldRedirect: !isOnCorrectPath
    }
  }, [isAuthenticated, currentStep, location.pathname])

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
