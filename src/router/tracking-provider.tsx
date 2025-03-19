import { type ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '@/lib/utils'

export const TrackingProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)

    if (location.pathname === '/' || location.pathname === '/landing') {
      trackPageView('landing_page')
    }
  }, [location.pathname])

  return children
}
