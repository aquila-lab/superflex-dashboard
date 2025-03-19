import { AuthLayout } from '@/shared/auth-layout/auth-layout'
import { LoginForm } from './login-form'
import { LoginProvider } from './login-provider'

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginProvider>
        <LoginForm />
      </LoginProvider>
    </AuthLayout>
  )
}
