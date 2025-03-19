import { EmailField } from '@/shared/form-components/email-field'
import { SubmitButton } from '@/shared/form-components/submit-button'
import { useResetPasswordContext } from './reset-password-provider'

export const ResetPasswordFormContent = () => {
  const { email, setEmail, isSubmitting } = useResetPasswordContext()

  return (
    <div className='grid gap-6'>
      <EmailField
        email={email}
        setEmail={setEmail}
        isSubmitting={isSubmitting}
      />
      <SubmitButton
        isSubmitting={isSubmitting}
        text='Reset password'
        loadingText='Resetting password...'
      />
    </div>
  )
}
