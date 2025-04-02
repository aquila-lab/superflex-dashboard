import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { GOOGLE_CLIENT_ID } from './lib/constants'
import { getQueryClient } from './lib/utils'
import { PostHogProvider, PostHogUserIdentifier } from './posthog-provider'
import { Router } from './router/router'

export const App = () => {
  return (
    <PostHogProvider>
      <QueryClientProvider client={getQueryClient()}>
        <PostHogUserIdentifier />
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Router />
          <Toaster position='bottom-right' />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </PostHogProvider>
  )
}
