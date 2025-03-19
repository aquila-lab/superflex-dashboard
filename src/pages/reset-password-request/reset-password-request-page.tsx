import { AuthLayout } from '@/shared/auth-layout/auth-layout'
import { ResetPasswordRequestForm } from './reset-password-request-form'

export const ResetPasswordRequestPage = () => {
  return (
    <AuthLayout>
      <ResetPasswordRequestForm />
    </AuthLayout>
  )
}
