import { AuthLayout } from '@/shared/auth-layout/auth-layout'
import { ResetPasswordForm } from './reset-password-form'
import { ResetPasswordProvider } from './reset-password-provider'

export const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPasswordProvider>
        <ResetPasswordForm />
      </ResetPasswordProvider>
    </AuthLayout>
  )
}
