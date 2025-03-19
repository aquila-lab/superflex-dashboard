import { AuthLayout } from '@/shared/auth-layout/auth-layout'
import { RegisterForm } from './register-form'
import { RegisterProvider } from './register-provider'

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterProvider>
        <RegisterForm />
      </RegisterProvider>
    </AuthLayout>
  )
}
