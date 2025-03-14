import { useAuth } from '@/global/hooks/use-auth'
import { useOnboardingStep } from '@/global/hooks/use-onboarding-step'
import { Loading } from '@/ui/loading'
import { useMemo } from 'react'
import {
  Navigate,
  Outlet,
  useLocation,
  useSearchParams
} from 'react-router-dom'

export const PaymentSuccessRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const { currentStep } = useOnboardingStep()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const successType = searchParams.get('type')

  const redirectInfo = useMemo(() => {
    if (!isAuthenticated) {
      return {
        path: '/login',
        shouldRedirect: true
      }
    }

    if (successType === 'payment' && currentStep !== 0) {
      return {
        path: '/dashboard',
        shouldRedirect: true
      }
    }

    return {
      path: '',
      shouldRedirect: false
    }
  }, [isAuthenticated, currentStep, successType])

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
