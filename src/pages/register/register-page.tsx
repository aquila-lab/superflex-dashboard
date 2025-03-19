import { RegisterForm } from './register-form'
import { RegisterProvider } from './register-provider'
import { AuthLayout } from '@/shared/auth-layout/auth-layout'

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterProvider>
        <RegisterForm />
      </RegisterProvider>
    </AuthLayout>
  )
}
