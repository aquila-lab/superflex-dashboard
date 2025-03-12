import { Toaster } from 'sonner'
import { ApiProvider } from './global/providers/api-provider'
import { Router } from './global/router/router'
import { GOOGLE_CLIENT_ID } from './store/model'
import { GoogleOAuthProvider } from '@react-oauth/google'

export const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ApiProvider>
        <Router />
        <Toaster position='bottom-right' />
      </ApiProvider>
    </GoogleOAuthProvider>
  )
}
