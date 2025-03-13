import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Extracts uniqueID and state parameters from the URL
 *
 * @returns Object containing auth extension parameters and utility functions
 */
export const useAuthExtensionParams = () => {
  const [searchParams] = useSearchParams()

  // Extract the VSCode extension params from the URL
  const uniqueID = useMemo(() => {
    return searchParams.get('uniqueID')
  }, [searchParams])

  const state = useMemo(() => {
    return searchParams.get('state')
  }, [searchParams])

  // Check if we have VSCode extension parameters
  const hasExtensionParams = useMemo(() => {
    return uniqueID !== null && state !== null
  }, [uniqueID, state])

  // Create query string with extension parameters if they exist
  const extensionQueryString = useMemo(() => {
    if (!hasExtensionParams) {
      return ''
    }

    const params = new URLSearchParams()
    if (uniqueID) {
      params.set('uniqueID', uniqueID)
    }
    if (state) {
      params.set('state', state)
    }

    return `?${params.toString()}`
  }, [hasExtensionParams, uniqueID, state])

  // Append extension parameters to a URL if they exist
  const appendExtensionParams = useCallback(
    (url: string) => {
      if (!hasExtensionParams) {
        return url
      }

      // Check if URL already has query parameters
      const hasQueryParams = url.includes('?')

      if (hasQueryParams) {
        // Append params to existing query string
        const urlObj = new URL(url, window.location.origin)
        if (uniqueID) {
          urlObj.searchParams.set('uniqueID', uniqueID)
        }
        if (state) {
          urlObj.searchParams.set('state', state)
        }
        return urlObj.pathname + urlObj.search
      }

      // Add params as new query string
      return `${url}${extensionQueryString}`
    },
    [hasExtensionParams, extensionQueryString, uniqueID, state]
  )

  return {
    uniqueID,
    state,
    hasExtensionParams,
    extensionQueryString,
    appendExtensionParams
  }
}

/**
 * Builds VSCode redirect URL from state parameter
 *
 * @param state The state parameter containing VSCode URI
 * @returns The VSCode URI to redirect back to extension
 */
export const buildVSCodeRedirect = (
  state: string | null,
  token: string | null
): string | null => {
  if (!state) {
    return null
  }

  try {
    const baseRedirectUrl = decodeURIComponent(state)
    return `${baseRedirectUrl}${baseRedirectUrl.includes('?') ? '&' : '?'}access_token=${token}`
  } catch (error) {
    console.error('Failed to parse VSCode redirect URL:', error)
    return null
  }
}
