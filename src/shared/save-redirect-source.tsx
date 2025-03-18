import { memo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SaveRedirectSource = memo(() => {
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const redirect = searchParams.get('redirect')
    const source = searchParams.get('source')

    if (redirect === 'true' && source) {
      let sourceType = ''

      if (source.includes('vscode')) {
        sourceType = 'vscode'
      } else if (source.includes('cursor')) {
        sourceType = 'cursor'
      }

      if (sourceType) {
        localStorage.setItem('redirectSource', sourceType)
      }
    }
  }, [location.search])

  return null
})
