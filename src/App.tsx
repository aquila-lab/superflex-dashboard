import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Router } from './router/router'
import { GOOGLE_CLIENT_ID } from './lib/constants'
import { getQueryClient } from './lib/utils'

export const App = () => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Router />
        <Toaster position='bottom-right' />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}
