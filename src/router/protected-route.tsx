import { useOnboardingStep, useUser } from '@/lib/hooks'
import { Loading } from '@/ui/loading'
import { useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { data: user, isLoading } = useUser()
  const { currentStep } = useOnboardingStep()
  const location = useLocation()

  const redirectInfo = useMemo(() => {
    if (!user) {
      return {
        path: '/login',
        shouldRedirect: true
      }
    }

    if (location.pathname !== '/success') {
      sessionStorage.removeItem('redirected')
    }

    const searchParams = new URLSearchParams(location.search)
    const success = searchParams.get('type')

    if (
      location.pathname === '/success' &&
      (success === 'extension-login' ||
        success === 'payment' ||
        success === 'figma')
    ) {
      return {
        path: location.pathname + location.search,
        shouldRedirect: false
      }
    }

    if (user) {
      const redirected = sessionStorage.getItem('redirected')

      if (!redirected && currentStep >= 2) {
        const decodedState = sessionStorage.getItem('decodedState')
        sessionStorage.setItem('redirected', 'true')

        if (decodedState) {
          return {
            path: '/success?type=extension-login',
            shouldRedirect: true
          }
        }
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
      [
        '/dashboard',
        '/dashboard/onboarding',
        '/dashboard/upgrade-subscription'
      ].includes(location.pathname) &&
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
  }, [user, currentStep, location.pathname, location.search])

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
