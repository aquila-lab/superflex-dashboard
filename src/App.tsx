import { Toaster } from 'sonner'
import { ApiProvider } from './global/providers/api-provider'
import { Router } from './global/router/router'

export const App = () => {
  return (
    <ApiProvider>
      <Router />
      <Toaster position='bottom-right' />
    </ApiProvider>
  )
}
