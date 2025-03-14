import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useUrlParamsStorage = () => {
  const location = useLocation()

  useEffect(() => {
    const saveUrlParamsToSession = () => {
      const searchParams = new URLSearchParams(location.search)
      const uniqueID = searchParams.get('uniqueID')
      const encodedState = searchParams.get('state')

      if (uniqueID) {
        sessionStorage.setItem('uniqueID', uniqueID)
      }

      if (encodedState) {
        let decodedState = decodeURIComponent(encodedState)

        if (decodedState.includes('%')) {
          decodedState = decodeURIComponent(decodedState)
        }

        sessionStorage.setItem('encodedState', encodedState)
        sessionStorage.setItem('decodedState', decodedState)

        try {
          if (decodedState.includes('?') && decodedState.includes('=')) {
            const stateUrl = new URL(
              decodedState.includes('://')
                ? decodedState
                : `https://app.superflex.ai/${decodedState}`
            )

            const stateParams: Record<string, string> = {}
            stateUrl.searchParams.forEach((value, key) => {
              stateParams[key] = value
              sessionStorage.setItem(`state_${key}`, value)
            })

            sessionStorage.setItem('stateParams', JSON.stringify(stateParams))
          }
        } catch (error) {
          console.error('Error parsing state parameter:', error)
        }
      }
    }

    saveUrlParamsToSession()
  }, [location.search])
}
