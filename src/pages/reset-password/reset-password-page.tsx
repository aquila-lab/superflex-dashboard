import { ResetPasswordForm } from './reset-password-form'
import { ResetPasswordProvider } from './reset-password-provider'
import { AuthLayout } from '@/shared/auth-layout/auth-layout'

export const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPasswordProvider>
        <ResetPasswordForm />
      </ResetPasswordProvider>
    </AuthLayout>
  )
}
