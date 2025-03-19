import { AuthLayout } from '@/shared/auth-layout/auth-layout'
import { NewPasswordForm } from './new-password-form'
import { NewPasswordProvider } from './new-password-provider'

export const NewPasswordPage = () => {
  return (
    <AuthLayout>
      <NewPasswordProvider>
        <NewPasswordForm />
      </NewPasswordProvider>
    </AuthLayout>
  )
}
