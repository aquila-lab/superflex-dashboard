import { LoginForm } from './login-form'
import { LoginProvider } from './login-provider'
import { AuthLayout } from '@/shared/auth-layout/auth-layout'

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginProvider>
        <LoginForm />
      </LoginProvider>
    </AuthLayout>
  )
}
